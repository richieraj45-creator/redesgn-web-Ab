
import { createClient } from "@supabase/supabase-js";

let supabaseInstance = null;

export function getSupabase() {
  if (supabaseInstance) {
    return supabaseInstance;
  }

  const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
  const supabasePublishableKey =
    process.env.REACT_APP_SUPABASE_PUBLISHABLE_KEY;

  if (!supabaseUrl || !supabasePublishableKey) {
    throw new Error(
      "Admin authentication is not configured for this environment."
    );
  }

  supabaseInstance = createClient(
    supabaseUrl,
    supabasePublishableKey,
    {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    }
  );

  return supabaseInstance;
}
