import { createClient } from "@supabase/supabase-js";

/*
  Service-role client — bypasses RLS. Use ONLY inside server actions / route
  handlers for privileged writes the schema keeps server-only (e.g. creating a
  booking, its location and consents). NEVER import this into a client
  component. The service-role key is read from a server-only env var and is
  never exposed to the browser.
*/
export function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceKey) {
    throw new Error(
      "Missing Supabase admin env (NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY).",
    );
  }

  return createClient(url, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}
