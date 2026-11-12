
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

      const userId = data.user.id;

      const { data: membership, error: membershipError } =
        await supabase
          .from("team_memberships")
          .select("role, is_active")
          .eq("user_id", userId)
          .maybeSingle();

      if (membershipError) {
        throw membershipError;
      }

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

      setError(
        err.message || "Unable to sign in. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-shell">
      <section className="admin-login-card">
        <div className="admin-login-heading">
          <p className="admin-login-brand">ASKARAN BINJRAJ</p>

          <h1>Admin Portal</h1>

          <p>Sign in to manage website enquiries</p>
        </div>

        <form onSubmit={handleLogin} className="admin-login-form">
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
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <p className="admin-login-footer">
          Authorized team members only
        </p>
      </section>
    </div>
  );
}
