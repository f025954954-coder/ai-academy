"use client";

import * as React from "react";
import type { User } from "@supabase/supabase-js";
import { createSupabaseBrowserClient, isSupabaseConfigured } from "./client";

export function useUser() {
  const [user, setUser] = React.useState<User | null>(null);
  const [loading, setLoading] = React.useState(isSupabaseConfigured);

  React.useEffect(() => {
    if (!isSupabaseConfigured) return;
    const supabase = createSupabaseBrowserClient();

    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
      setLoading(false);
    });

    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => sub.subscription.unsubscribe();
  }, []);

  return { user, loading, isSupabaseConfigured };
}
