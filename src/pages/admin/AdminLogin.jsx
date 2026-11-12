
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getSupabase } from "@/lib/supabase";
import "./admin.css";

export default function AdminLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [recoveryMode, setRecoveryMode] = useState(false);
  const [recoverySent, setRecoverySent] = useState(false);

  const handleLogin = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    let supabase;

    try {
      supabase = getSupabase();

      const { data, error: loginError } =
        await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        });

      if (loginError) throw loginError;

      const { data: membership, error: membershipError } =
        await supabase
          .from("team_memberships")
          .select("role, is_active")
          .eq("user_id", data.user.id)
          .maybeSingle();

      if (membershipError) throw membershipError;

      if (
        !membership ||
        !membership.is_active ||
        !["super_admin", "admin", "agent"].includes(membership.role)
      ) {
        throw new Error(
          "Your account is not authorized to access the admin portal."
        );
      }

      navigate("/admin", { replace: true });
    } catch (err) {
      if (supabase) {
        await supabase.auth.signOut();
      }

      setError(err.message || "Unable to sign in. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordRecovery = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const supabase = getSupabase();

      const { error: recoveryError } =
        await supabase.auth.resetPasswordForEmail(email.trim(), {
          redirectTo: `${window.location.origin}/admin/reset-password`,
        });

      if (recoveryError) throw recoveryError;

      setRecoverySent(true);
    } catch (err) {
      setError(
        err.message || "Unable to send the password recovery email."
      );
    } finally {
      setLoading(false);
    }
  };

  const returnToLogin = () => {
    setRecoveryMode(false);
    setRecoverySent(false);
    setError("");
    setPassword("");
  };

  return (
    <div className="admin-login-shell">
      <section className="admin-login-card">
        <div className="admin-login-heading">
          <p className="admin-login-brand">ASKARAN BINJRAJ</p>

          <h1>
            {recoveryMode ? "Reset Password" : "Admin Portal"}
          </h1>

          <p>
            {recoveryMode
              ? "Enter your registered email to receive a password recovery link."
              : "Sign in to manage website enquiries"}
          </p>
        </div>

        {recoverySent ? (
          <>
            <div className="admin-login-error" role="status">
              If an account exists for this email, a password recovery
              link has been sent. Please check your inbox.
            </div>

            <button
              type="button"
              className="admin-login-submit"
              onClick={returnToLogin}
            >
              Return to login
            </button>
          </>
        ) : (
          <form
            onSubmit={
              recoveryMode ? handlePasswordRecovery : handleLogin
            }
            className="admin-login-form"
          >
            <div className="admin-login-field">
              <label htmlFor="admin-email">Email address</label>

              <input
                id="admin-email"
                type="email"
                autoComplete="username"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Enter your email"
              />
            </div>

            {!recoveryMode && (
              <div className="admin-login-field">
                <label htmlFor="admin-password">Password</label>

                <input
                  id="admin-password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Enter your password"
                />
              </div>
            )}

            {error && (
              <div className="admin-login-error" role="alert">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="admin-login-submit"
            >
              {loading
                ? "Please wait..."
                : recoveryMode
                  ? "Send recovery email"
                  : "Sign in"}
            </button>

            {!recoveryMode && (
              <button
                type="button"
                className="admin-login-footer"
                onClick={() => {
                  setRecoveryMode(true);
                  setError("");
                }}
              >
                Forgot password?
              </button>
            )}

            {recoveryMode && (
              <button
                type="button"
                className="admin-login-footer"
                onClick={returnToLogin}
              >
                Back to login
              </button>
            )}
          </form>
        )}

        <p className="admin-login-footer">
          Authorized team members only
        </p>
      </section>
    </div>
  );
}
