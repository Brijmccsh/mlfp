import "server-only";

import { createClient } from "@supabase/supabase-js";

import { publicEnv, serverEnv } from "./env";
import type { Database } from "./types";

/**
 * Bypasses RLS. Only for trusted server-side work (webhooks, admin actions).
 * `server-only` makes importing this from a client component a build error.
 */
export function createSupabaseAdminClient() {
  const { NEXT_PUBLIC_SUPABASE_URL } = publicEnv();
  const { SUPABASE_SERVICE_ROLE_KEY } = serverEnv();

  return createClient<Database>(NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}
