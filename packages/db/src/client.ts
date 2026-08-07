import { createBrowserClient } from "@supabase/ssr";

import { publicEnv } from "./env";
import type { Database } from "./types";

/** Supabase client for client components. Uses the anon key + RLS. */
export function createSupabaseBrowserClient() {
  const env = publicEnv();

  return createBrowserClient<Database>(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );
}
