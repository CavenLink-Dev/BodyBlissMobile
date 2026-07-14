import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  // Placeholder fallback keeps the app rendering (with failed queries and
  // visible error states) instead of crashing if env vars are missing.
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL ?? "https://placeholder.supabase.co",
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? "public-key-not-set",
  );
}
