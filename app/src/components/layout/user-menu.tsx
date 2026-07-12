"use client";

import Link from "next/link";
import { LogOut, User } from "lucide-react";
import { useUser } from "@/lib/supabase/use-user";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

export function UserMenu() {
  const { user, loading, isSupabaseConfigured } = useUser();

  if (!isSupabaseConfigured) {
    return (
      <Link
        href="/dashboard"
        className="hidden sm:inline-flex items-center rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
      >
        התחל ללמוד
      </Link>
    );
  }

  if (loading) return <div className="h-9 w-24" />;

  if (!user) {
    return (
      <Link
        href="/auth/login"
        className="hidden sm:inline-flex items-center rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
      >
        התחברות
      </Link>
    );
  }

  return (
    <div className="hidden items-center gap-2 sm:flex">
      <Link
        href="/dashboard"
        className="flex items-center gap-1.5 rounded-full border border-border px-3 py-2 text-sm font-medium"
      >
        <User size={14} /> {user.user_metadata?.full_name ?? user.email}
      </Link>
      <button
        onClick={async () => {
          const supabase = createSupabaseBrowserClient();
          await supabase.auth.signOut();
          window.location.href = "/";
        }}
        className="flex size-9 items-center justify-center rounded-full border border-border text-muted hover:text-danger"
        aria-label="התנתק"
      >
        <LogOut size={15} />
      </button>
    </div>
  );
}
