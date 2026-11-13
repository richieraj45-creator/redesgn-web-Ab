
import { useEffect, useMemo, useState } from "react";
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

export default function AdminDashboard() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);
  const [enquiries, setEnquiries] = useState([]);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [selected, setSelected] = useState(null);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    let active = true;

    const loadDashboard = async () => {
      try {
        const supabase = getSupabase();

        const {
          data: { user },
          error: authError,
        } = await supabase.auth.getUser();

        if (authError || !user) {
          navigate("/admin/login", { replace: true });
          return;
        }

        const { data: membership, error: membershipError } =
          await supabase
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

        const { data: userProfile, error: profileError } =
          await supabase
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

        if (active) {
          setProfile({
            name: userProfile?.full_name || user.email,
            email: userProfile?.email || user.email,
            role: membership.role,
          });
          setEnquiries(data || []);
        }
      } catch (err) {
        if (active) setError(err.message || "Unable to load dashboard.");
      } finally {
        if (active) setLoading(false);
      }
    };

    loadDashboard();

    return () => {
      active = false;
    };
  }, [navigate]);

  const handleLogout = async () => {
    await getSupabase().auth.signOut();
    navigate("/admin/login", { replace: true });
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

  const filteredEnquiries = useMemo(() => {
    return enquiries.filter((item) => {
      const matchesStatus =
        filter === "all" || item.status === filter;

      const term = search.trim().toLowerCase();
      const matchesSearch =
        !term ||
        [item.name, item.email, item.phone, item.message]
          .some((value) => value?.toLowerCase().includes(term));

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
        <button onClick={handleLogout}>Return to login</button>
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
          <p className="admin-dashboard-error" role="alert">{error}</p>
        )}

        <section className="admin-enquiries">
          <div className="admin-enquiries-heading">
            <div>
              <h2>Website enquiries</h2>
              <p>{enquiries.length} total enquiries</p>
            </div>
            <button
              type="button"
              onClick={() => window.location.reload()}
            >
              Refresh
            </button>
          </div>

          <div className="admin-enquiries-stats">
            {STATUSES.filter((s) => s !== "all").map((status) => (
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
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search name, email, phone or message..."
              aria-label="Search enquiries"
            />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
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
                    <td>
                      {new Date(item.created_at).toLocaleString("en-IN")}
                    </td>
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
            onMouseDown={(e) => {
              if (e.target === e.currentTarget) setSelected(null);
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
              <p><strong>Email:</strong> {selected.email || "Not provided"}</p>
              <p><strong>Received:</strong> {new Date(selected.created_at).toLocaleString("en-IN")}</p>
              <p><strong>Message:</strong></p>
              <p className="admin-enquiry-message">{selected.message}</p>

              <label htmlFor="enquiry-status">Update status</label>
              <select
                id="enquiry-status"
                value={selected.status}
                disabled={updating}
                onChange={(e) =>
                  handleStatusChange(selected.id, e.target.value)
                }
              >
                {STATUSES.filter((s) => s !== "all").map((status) => (
                  <option key={status} value={status}>
                    {statusLabel(status)}
                  </option>
                ))}
              </select>

              {updating && <p>Updating status...</p>}
            </section>
          </div>
        )}
      </div>
    </div>
  );
}
