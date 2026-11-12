
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getSupabase } from "@/lib/supabase";

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

    try {
      const supabase = getSupabase();

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

      if (membershipError) throw membershipError;

      if (!membership || !membership.is_active) {
        await supabase.auth.signOut();
        throw new Error("Your admin account is inactive or not authorized.");
      }

      if (!["super_admin", "admin", "agent"].includes(membership.role)) {
        await supabase.auth.signOut();
        throw new Error("Your account does not have a valid admin role.");
      }

      navigate("/admin", { replace: true });
    } catch (err) {
      setError(err.message || "Unable to sign in. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#f7f6f2] flex items-center justify-center px-5 py-12">
      <section className="w-full max-w-md bg-white border border-[#e7e3dc] p-8 md:p-10 shadow-sm">
        <div className="text-center mb-8">
          <p className="text-xs tracking-[0.3em] uppercase text-[#a98b55] mb-4">
            Askaran Binjraj
          </p>

          <h1 className="text-2xl font-semibold text-[#171717]">
            Admin Portal
          </h1>

          <p className="text-sm text-gray-500 mt-2">
            Sign in to manage website enquiries
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label
              htmlFor="admin-email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email address
            </label>

            <input
              id="admin-email"
              type="email"
              autoComplete="username"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Enter your email"
              className="w-full border border-gray-300 px-4 py-3 text-sm outline-none focus:border-[#a98b55]"
            />
          </div>

          <div>
            <label
              htmlFor="admin-password"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Password
            </label>

            <input
              id="admin-password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Enter your password"
              className="w-full border border-gray-300 px-4 py-3 text-sm outline-none focus:border-[#a98b55]"
            />
          </div>

          {error && (
            <div
              role="alert"
              className="bg-red-50 border border-red-200 text-red-700 text-sm p-3"
            >
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#171717] text-white py-3 text-sm font-medium tracking-wide hover:bg-[#a98b55] disabled:opacity-60 transition-colors"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <p className="text-xs text-center text-gray-400 mt-8">
          Authorized team members only
        </p>
      </section>
    </main>
  );
}
