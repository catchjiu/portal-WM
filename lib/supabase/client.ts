"use client";

import { createBrowserClient } from "@supabase/ssr";

import type { Database } from "@/lib/types/database";
import { getSupabaseEnv } from "@/lib/supabase/env";

let browserClient: ReturnType<typeof createBrowserClient<Database>> | null = null;

export function getSupabaseBrowserClient() {
  if (browserClient) {
    return browserClient;
  }

  const env = getSupabaseEnv();
  if (!env.url || !env.anonKey) {
    return null;
  }

  browserClient = createBrowserClient<Database>(env.url, env.anonKey);
  return browserClient;
}
