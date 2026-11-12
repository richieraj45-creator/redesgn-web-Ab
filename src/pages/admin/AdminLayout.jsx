
import { Outlet, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getSupabase } from "@/lib/supabase";
import "./admin.css";

export default function AdminLayout() {
  const [checking, setChecking] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    let active = true;

    const verifySession = async () => {
      try {
        const supabase = getSupabase();

        const {
          data: { user },
          error: authError,
        } = await supabase.auth.getUser();

        if (authError || !user) {
          if (active) setAuthorized(false);
          return;
        }

        const { data: membership, error } = await supabase
          .from("team_memberships")
          .select("role, is_active")
          .eq("user_id", user.id)
          .maybeSingle();

        if (error) throw error;

        const validRole = [
          "super_admin",
          "admin",
          "agent",
        ].includes(membership?.role);

        if (active) {
          setAuthorized(Boolean(membership?.is_active && validRole));
        }

        if (!membership?.is_active || !validRole) {
          await supabase.auth.signOut();
        }
      } catch (error) {
        if (active) setAuthorized(false);
      } finally {
        if (active) setChecking(false);
      }
    };

    verifySession();

    return () => {
      active = false;
    };
  }, []);

  if (checking) {
    return (
      <div className="admin-dashboard-shell">
        <p>Checking administrator access...</p>
      </div>
    );
  }

  if (!authorized) {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <div className="admin-app-shell">
      <Outlet />
    </div>
  );
}
