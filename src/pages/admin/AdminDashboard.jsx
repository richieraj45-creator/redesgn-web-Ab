
import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getSupabase } from "@/lib/supabase";
import "./admin.css";

const STATUSES = [
  "all",
  "new",
  "in_progress",
  "follow_up",
  "resolved",
  "spam",
];

const statusLabel = (status) =>
  status.replace("_", " ").replace(/\b\w/g, (c) => c.toUpperCase());

const formatDate = (value) => new Date(value).toLocaleString("en-IN");

const describeActivity = (item) => {
  const oldStatus = item.old_values?.status;
  const newStatus = item.new_values?.status;
  const oldAssigned = item.old_values?.assigned_to;
  const newAssigned = item.new_values?.assigned_to;

  if (oldStatus !== newStatus && newStatus) {
    return `Status changed from ${statusLabel(oldStatus || "unknown")} to ${statusLabel(newStatus)}.`;
  }

  if (oldAssigned !== newAssigned) {
    return "Enquiry assignment was updated.";
  }

  return "Enquiry information was updated.";
};

export default function AdminDashboard() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);
  const [userId, setUserId] = useState(null);
  const [enquiries, setEnquiries] = useState([]);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [selected, setSelected] = useState(null);
  const [updating, setUpdating] = useState(false);

  const [notes, setNotes] = useState([]);
  const [activities, setActivities] = useState([]);
  const [noteText, setNoteText] = useState("");
  const [loadingHistory, setLoadingHistory] = useState(false);
  const [savingNote, setSavingNote] = useState(false);
  const [historyError, setHistoryError] = useState("");

  const loadDashboard = useCallback(async () => {
    const supabase = getSupabase();

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      navigate("/admin/login", { replace: true });
      return;
    }

    const { data: membership, error: membershipError } = await supabase
      .from("team_memberships")
      .select("role, is_active")
      .eq("user_id", user.id)
      .maybeSingle();

    if (membershipError) throw membershipError;

    if (
      !membership?.is_active ||
      !["super_admin", "admin", "agent"].includes(membership.role)
    ) {
      await supabase.auth.signOut();
      navigate("/admin/login", { replace: true });
      return;
    }

    const { data: userProfile, error: profileError } = await supabase
      .from("profiles")
      .select("full_name, email")
      .eq("id", user.id)
      .maybeSingle();

    if (profileError) throw profileError;

    const { data, error: enquiryError } = await supabase
      .from("enquiries")
      .select(
        "id, name, phone, email, message, status, assigned_to, created_at, updated_at"
      )
      .order("created_at", { ascending: false });

    if (enquiryError) throw enquiryError;

    setUserId(user.id);
    setProfile({
      name: userProfile?.full_name || user.email,
      email: userProfile?.email || user.email,
      role: membership.role,
    });
    setEnquiries(data || []);
  }, [navigate]);

  useEffect(() => {
    let active = true;

    const initialize = async () => {
      try {
        await loadDashboard();
      } catch (err) {
        if (active) {
          setError(err.message || "Unable to load dashboard.");
        }
      } finally {
        if (active) setLoading(false);
      }
    };

    initialize();

    return () => {
      active = false;
    };
  }, [loadDashboard]);

  const refreshEnquiries = async () => {
    setError("");

    try {
      const { data, error: enquiryError } = await getSupabase()
        .from("enquiries")
        .select(
          "id, name, phone, email, message, status, assigned_to, created_at, updated_at"
        )
        .order("created_at", { ascending: false });

      if (enquiryError) throw enquiryError;

      setEnquiries(data || []);

      if (selected) {
        const updated = data?.find((item) => item.id === selected.id);
        if (updated) setSelected(updated);
      }
    } catch (err) {
      setError(err.message || "Unable to refresh enquiries.");
    }
  };

  const handleLogout = async () => {
    try {
      await getSupabase().auth.signOut();
      navigate("/admin/login", { replace: true });
    } catch {
      setError("Unable to sign out. Please try again.");
    }
  };

  const handleStatusChange = async (id, status) => {
    setUpdating(true);
    setError("");

    try {
      const { data, error: updateError } = await getSupabase()
        .from("enquiries")
        .update({ status, updated_at: new Date().toISOString() })
        .eq("id", id)
        .select(
          "id, name, phone, email, message, status, assigned_to, created_at, updated_at"
        )
        .single();

      if (updateError) throw updateError;

      setEnquiries((current) =>
        current.map((item) => (item.id === id ? data : item))
      );
      setSelected(data);
    } catch (err) {
      setError(err.message || "Unable to update enquiry status.");
    } finally {
      setUpdating(false);
    }
  };

  useEffect(() => {
    if (!selected?.id) {
      setNotes([]);
      setActivities([]);
      setNoteText("");
      setHistoryError("");
      return undefined;
    }

    let active = true;

    const loadHistory = async () => {
      setLoadingHistory(true);
      setHistoryError("");

      try {
        const supabase = getSupabase();

        const [notesResult, activityResult] = await Promise.all([
          supabase
            .from("enquiry_notes")
            .select("id, enquiry_id, created_by, note, created_at")
            .eq("enquiry_id", selected.id)
            .order("created_at", { ascending: false }),

          supabase
            .from("enquiry_activity")
            .select(
              "id, enquiry_id, actor_id, action, old_values, new_values, created_at"
            )
            .eq("enquiry_id", selected.id)
            .order("created_at", { ascending: false })
            .limit(50),
        ]);

        if (notesResult.error) throw notesResult.error;
        if (activityResult.error) throw activityResult.error;

        if (active) {
          setNotes(notesResult.data || []);
          setActivities(activityResult.data || []);
        }
      } catch (err) {
        if (active) {
          setHistoryError(
            err.message || "Unable to load notes and activity history."
          );
        }
      } finally {
        if (active) setLoadingHistory(false);
      }
    };

    loadHistory();

    return () => {
      active = false;
    };
  }, [selected?.id]);

  const handleAddNote = async (event) => {
    event.preventDefault();

    const cleanNote = noteText.trim();

    if (!cleanNote || !selected?.id || !userId) return;

    setSavingNote(true);
    setHistoryError("");

    try {
      const { data, error: insertError } = await getSupabase()
        .from("enquiry_notes")
        .insert({
          enquiry_id: selected.id,
          created_by: userId,
          note: cleanNote,
        })
        .select("id, enquiry_id, created_by, note, created_at")
        .single();

      if (insertError) throw insertError;

      setNotes((current) => [data, ...current]);
      setNoteText("");
    } catch (err) {
      setHistoryError(err.message || "Unable to save internal note.");
    } finally {
      setSavingNote(false);
    }
  };

  const filteredEnquiries = useMemo(() => {
    return enquiries.filter((item) => {
      const matchesStatus = filter === "all" || item.status === filter;
      const term = search.trim().toLowerCase();

      const matchesSearch =
        !term ||
        [item.name, item.email, item.phone, item.message].some((value) =>
          value?.toLowerCase().includes(term)
        );

      return matchesStatus && matchesSearch;
    });
  }, [enquiries, filter, search]);

  const countFor = (status) =>
    status === "all"
      ? enquiries.length
      : enquiries.filter((item) => item.status === status).length;

  if (loading) {
    return (
      <div className="admin-dashboard-shell">
        <p>Loading enquiry management...</p>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="admin-dashboard-shell">
        <p className="admin-dashboard-error" role="alert">
          {error || "Administrator profile unavailable."}
        </p>
        <button type="button" onClick={handleLogout}>
          Return to login
        </button>
      </div>
    );
  }

  return (
    <div className="admin-dashboard-shell">
      <header className="admin-dashboard-header">
        <div>
          <p className="admin-dashboard-brand">ASKARAN BINJRAJ</p>
          <h1>Enquiry Management</h1>
        </div>

        <button
          type="button"
          className="admin-dashboard-logout"
          onClick={handleLogout}
        >
          Sign out
        </button>
      </header>

      <div className="admin-dashboard-content">
        <section className="admin-dashboard-welcome">
          <p>ADMINISTRATION</p>
          <h2>Welcome, {profile.name}</h2>
          <span>{statusLabel(profile.role)}</span>
        </section>

        {error && (
          <p className="admin-dashboard-error" role="alert">
            {error}
          </p>
        )}

        <section className="admin-enquiries">
          <div className="admin-enquiries-heading">
            <div>
              <h2>Website enquiries</h2>
              <p>{enquiries.length} total enquiries</p>
            </div>

            <button type="button" onClick={refreshEnquiries}>
              Refresh
            </button>
          </div>

          <div className="admin-enquiries-stats">
            {STATUSES.filter((status) => status !== "all").map((status) => (
              <button
                type="button"
                key={status}
                onClick={() => setFilter(status)}
                className={filter === status ? "active" : ""}
              >
                <span>{statusLabel(status)}</span>
                <strong>{countFor(status)}</strong>
              </button>
            ))}
          </div>

          <div className="admin-enquiries-toolbar">
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search name, email, phone or message..."
              aria-label="Search enquiries"
            />

            <select
              value={filter}
              onChange={(event) => setFilter(event.target.value)}
              aria-label="Filter enquiries by status"
            >
              {STATUSES.map((status) => (
                <option key={status} value={status}>
                  {status === "all" ? "All statuses" : statusLabel(status)}
                </option>
              ))}
            </select>
          </div>

          <div className="admin-enquiries-table-wrap">
            <table className="admin-enquiries-table">
              <thead>
                <tr>
                  <th>Customer</th>
                  <th>Contact</th>
                  <th>Received</th>
                  <th>Status</th>
                  <th>Details</th>
                </tr>
              </thead>

              <tbody>
                {filteredEnquiries.map((item) => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>
                      <span>{item.phone}</span>
                      <small>{item.email || "No email provided"}</small>
                    </td>
                    <td>{formatDate(item.created_at)}</td>
                    <td>
                      <span className={`admin-status status-${item.status}`}>
                        {statusLabel(item.status)}
                      </span>
                    </td>
                    <td>
                      <button
                        type="button"
                        onClick={() => setSelected(item)}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}

                {filteredEnquiries.length === 0 && (
                  <tr>
                    <td colSpan="5">No enquiries found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        {selected && (
          <div
            className="admin-enquiry-overlay"
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) {
                setSelected(null);
              }
            }}
          >
            <section
              className="admin-enquiry-detail"
              role="dialog"
              aria-modal="true"
              aria-labelledby="enquiry-detail-title"
            >
              <div className="admin-enquiry-detail-heading">
                <h2 id="enquiry-detail-title">Enquiry details</h2>

                <button
                  type="button"
                  onClick={() => setSelected(null)}
                  aria-label="Close enquiry details"
                >
                  ×
                </button>
              </div>

              <h3>{selected.name}</h3>

              <p><strong>Phone:</strong> {selected.phone}</p>
              <p>
                <strong>Email:</strong> {selected.email || "Not provided"}
              </p>
              <p>
                <strong>Received:</strong> {formatDate(selected.created_at)}
              </p>
              <p><strong>Message:</strong></p>
              <p className="admin-enquiry-message">{selected.message}</p>

              <label htmlFor="enquiry-status">Update status</label>

              <select
                id="enquiry-status"
                value={selected.status}
                disabled={updating}
                onChange={(event) =>
                  handleStatusChange(selected.id, event.target.value)
                }
              >
                {STATUSES.filter((status) => status !== "all").map((status) => (
                  <option key={status} value={status}>
                    {statusLabel(status)}
                  </option>
                ))}
              </select>

              {updating && <p>Updating status...</p>}

              <div className="admin-history-section">
                <h3>Internal notes</h3>
                <p className="admin-history-description">
                  Private notes visible only to authorized team members.
                </p>

                <form onSubmit={handleAddNote}>
                  <textarea
                    value={noteText}
                    onChange={(event) => setNoteText(event.target.value)}
                    placeholder="Write an internal note..."
                    rows={4}
                    maxLength={5000}
                    required
                  />

                  <button
                    type="submit"
                    disabled={savingNote || !noteText.trim()}
                  >
                    {savingNote ? "Saving..." : "Add internal note"}
                  </button>
                </form>

                {loadingHistory && <p>Loading internal notes...</p>}

                {!loadingHistory && notes.length === 0 && (
                  <p className="admin-history-empty">
                    No internal notes yet.
                  </p>
                )}

                {notes.map((note) => (
                  <article className="admin-note-item" key={note.id}>
                    <p>{note.note}</p>
                    <small>
                      {note.created_by === userId ? "You" : "Team member"}
                      {" · "}
                      {formatDate(note.created_at)}
                    </small>
                  </article>
                )}
              </div>

              <div className="admin-history-section">
                <h3>Activity history</h3>
                <p className="admin-history-description">
                  Recorded changes to this enquiry.
                </p>

                {loadingHistory && <p>Loading enquiry history...</p>}

                {!loadingHistory && activities.length === 0 && (
                  <p className="admin-history-empty">
                    No activity recorded yet.
                  </p>
                )}

                {activities.map((activity) => (
                  <article className="admin-activity-item" key={activity.id}>
                    <p>{describeActivity(activity)}</p>
                    <small>
                      {activity.actor_id === userId ? "You" : "Team member"}
                      {" · "}
                      {formatDate(activity.created_at)}
                    </small>
                  </article>
                ))}
              </div>

              {historyError && (
                <p className="admin-dashboard-error" role="alert">
                  {historyError}
                </p>
              )}
            </section>
          </div>
        )}
      </div>
    </div>
  );
}
