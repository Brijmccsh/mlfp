/**
 * Service-role Supabase client for server-side writes.
 *
 * The `server-only` import is a build-time guard: if this module is ever
 * imported from a client component, the build fails rather than shipping the
 * service-role key to the browser. The key must never gain a NEXT_PUBLIC_
 * prefix — it bypasses RLS.
 */
import "server-only";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let client: SupabaseClient | null = null;

/**
 * Returns null when the environment is not configured, so the route can answer
 * 503 with a way to reach us. Built lazily rather than at module scope so a
 * build without Supabase env still succeeds.
 */
export function getSupabaseAdmin(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceRoleKey) return null;

  if (!client) {
    client = createClient(url, serviceRoleKey, {
      // No user session on a server-side write-only client.
      auth: { persistSession: false, autoRefreshToken: false },
    });
  }
  return client;
}
