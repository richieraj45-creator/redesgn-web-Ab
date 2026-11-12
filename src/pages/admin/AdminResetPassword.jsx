
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getSupabase } from "@/lib/supabase";
import "./admin.css";

export default function AdminResetPassword() {
  const navigate = useNavigate();

  const [checking, setChecking] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    let active = true;
    let supabase;

    const checkRecoverySession = async () => {
      try {
        supabase = getSupabase();

        const { data: { session }, error: sessionError } =
          await supabase.auth.getSession();

        if (sessionError) throw sessionError;

        if (active) {
          setAuthorized(Boolean(session));
        }
      } catch (err) {
        if (active) {
          setError("The recovery link is invalid or expired. Request a new one.");
        }
      } finally {
        if (active) setChecking(false);
      }
    };

    checkRecoverySession();

    return () => {
      active = false;
    };
  }, []);

  const handleReset = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    if (password.length < 8) {
      setError("Your password must contain at least 8 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("The passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const supabase = getSupabase();

      const { error: updateError } = await supabase.auth.updateUser({
        password,
      });

      if (updateError) throw updateError;

      setSuccess("Your password has been updated successfully.");

      await supabase.auth.signOut();

      setTimeout(() => {
        navigate("/admin/login", { replace: true });
      }, 1800);
    } catch (err) {
      setError(err.message || "Unable to update your password.");
    } finally {
      setLoading(false);
    }
  };

  if (checking) {
    return (
      <div className="admin-login-shell">
        <p>Verifying password recovery link...</p>
      </div>
    );
  }

  if (!authorized) {
    return (
      <div className="admin-login-shell">
        <section className="admin-login-card">
          <div className="admin-login-heading">
            <p className="admin-login-brand">ASKARAN BINJRAJ</p>
            <h1>Recovery link unavailable</h1>
            <p>Your recovery link may have expired or already been used.</p>
          </div>

          <button
            type="button"
            className="admin-login-submit"
            onClick={() => navigate("/admin/login")}
          >
            Return to login
          </button>
        </section>
      </div>
    );
  }

  return (
    <div className="admin-login-shell">
      <section className="admin-login-card">
        <div className="admin-login-heading">
          <p className="admin-login-brand">ASKARAN BINJRAJ</p>
          <h1>Set New Password</h1>
          <p>Create a new password for your administrator account.</p>
        </div>

        <form onSubmit={handleReset} className="admin-login-form">
          <div className="admin-login-field">
            <label htmlFor="new-admin-password">New password</label>
            <input
              id="new-admin-password"
              type="password"
              autoComplete="new-password"
              minLength={8}
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Enter new password"
            />
          </div>

          <div className="admin-login-field">
            <label htmlFor="confirm-admin-password">
              Confirm new password
            </label>
            <input
              id="confirm-admin-password"
              type="password"
              autoComplete="new-password"
              minLength={8}
              required
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              placeholder="Confirm new password"
            />
          </div>

          {error && (
            <div className="admin-login-error" role="alert">
              {error}
            </div>
          )}

          {success && (
            <div className="admin-login-error" role="status">
              {success}
            </div>
          )}

          <button
            type="submit"
            disabled={loading || Boolean(success)}
            className="admin-login-submit"
          >
            {loading ? "Updating password..." : "Update password"}
          </button>
        </form>
      </section>
    </div>
  );
}
