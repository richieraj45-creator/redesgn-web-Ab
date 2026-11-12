
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getSupabase } from "@/lib/supabase";
import "./admin.css";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    const verifyAccess = async () => {
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
          !membership ||
          !membership.is_active ||
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

        if (active) {
          setProfile({
            name: userProfile?.full_name || user.email,
            email: userProfile?.email || user.email,
            role: membership.role,
          });
        }
      } catch (err) {
        if (active) {
          setError(err.message || "Unable to verify admin access.");
        }
      } finally {
        if (active) setLoading(false);
      }
    };

    verifyAccess();

    return () => {
      active = false;
    };
  }, [navigate]);

  const handleLogout = async () => {
    try {
      const supabase = getSupabase();
      await supabase.auth.signOut();
      navigate("/admin/login", { replace: true });
    } catch (err) {
      setError("Unable to sign out. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="admin-dashboard-shell">
        <p>Verifying administrator access...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-dashboard-shell">
        <p className="admin-dashboard-error" role="alert">{error}</p>
        <button onClick={handleLogout}>Return to login</button>
      </div>
    );
  }

  if (!profile) return null;

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
          <span>{profile.role.replace("_", " ").toUpperCase()}</span>
        </section>

        <section className="admin-dashboard-placeholder">
          <h2>Dashboard setup</h2>
          <p>
            Your secure administrator access is connected.
            Enquiry management and team features will be added next.
          </p>
        </section>
      </div>
    </div>
  );
}
