"use client";

// שכבת התקדמות: local-first (מהיר, עובד גם ללא חשבון) + סנכרון ל-Supabase כשמחובר.
import { useEffect, useState, useCallback } from "react";
import { createSupabaseBrowserClient, isSupabaseConfigured } from "@/lib/supabase/client";
import { useUser } from "@/lib/supabase/use-user";

const STORAGE_KEY = "ai-academy:progress:v1";

export interface ProgressState {
  xp: number;
  streakDays: number;
  lastActiveDate: string | null;
  completedLessons: string[]; // lesson slug (ייחודי בכל הקוריקולום)
  exerciseAttempts: Record<string, number>; // exerciseId -> attempts
}

const DEFAULT_STATE: ProgressState = {
  xp: 0,
  streakDays: 0,
  lastActiveDate: null,
  completedLessons: [],
  exerciseAttempts: {},
};

function loadLocal(): ProgressState {
  if (typeof window === "undefined") return DEFAULT_STATE;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? { ...DEFAULT_STATE, ...JSON.parse(raw) } : DEFAULT_STATE;
  } catch {
    return DEFAULT_STATE;
  }
}

function saveLocal(state: ProgressState) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

function lessonSlugFromKey(lessonKey: string) {
  // lessonKey בפורמט "track/module/lesson" -> Supabase שומר לפי lesson slug בלבד
  return lessonKey.split("/").pop() ?? lessonKey;
}

export function useProgress() {
  const [state, setState] = useState<ProgressState>(DEFAULT_STATE);
  const { user } = useUser();

  // טעינה ראשונית: local תמיד, ואז Supabase דורס אם מחובר
  useEffect(() => {
    setState(loadLocal());
  }, []);

  useEffect(() => {
    if (!isSupabaseConfigured || !user) return;
    const supabase = createSupabaseBrowserClient();

    (async () => {
      const [{ data: profile }, { data: progress }] = await Promise.all([
        supabase.from("profiles").select("xp, streak_days, last_active_date").eq("id", user.id).single(),
        supabase.from("lesson_progress").select("lesson_slug"),
      ]);

      if (profile) {
        const next: ProgressState = {
          xp: profile.xp ?? 0,
          streakDays: profile.streak_days ?? 0,
          lastActiveDate: profile.last_active_date,
          completedLessons: (progress ?? []).map((p) => p.lesson_slug),
          exerciseAttempts: {},
        };
        setState(next);
        saveLocal(next);
      }
    })();
  }, [user]);

  const touchStreak = useCallback((s: ProgressState): ProgressState => {
    const today = todayISO();
    if (s.lastActiveDate === today) return s;
    const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
    const streakDays = s.lastActiveDate === yesterday ? s.streakDays + 1 : 1;
    return { ...s, streakDays, lastActiveDate: today };
  }, []);

  const completeLesson = useCallback(
    (lessonKey: string, xpReward = 50) => {
      const lessonSlug = lessonSlugFromKey(lessonKey);

      setState((prev) => {
        if (prev.completedLessons.includes(lessonSlug)) return prev;
        const next = touchStreak({
          ...prev,
          xp: prev.xp + xpReward,
          completedLessons: [...prev.completedLessons, lessonSlug],
        });
        saveLocal(next);

        if (isSupabaseConfigured && user) {
          const supabase = createSupabaseBrowserClient();
          supabase.from("lesson_progress").upsert({ user_id: user.id, lesson_slug: lessonSlug }).then();
          supabase
            .from("profiles")
            .update({ xp: next.xp, streak_days: next.streakDays, last_active_date: next.lastActiveDate })
            .eq("id", user.id)
            .then();
        }

        return next;
      });
    },
    [touchStreak, user]
  );

  const recordAttempt = useCallback(
    (exerciseId: string, passed = false) => {
      setState((prev) => {
        const next = {
          ...prev,
          exerciseAttempts: {
            ...prev.exerciseAttempts,
            [exerciseId]: (prev.exerciseAttempts[exerciseId] ?? 0) + 1,
          },
        };
        saveLocal(next);
        return next;
      });

      if (isSupabaseConfigured && user) {
        const supabase = createSupabaseBrowserClient();
        supabase.from("exercise_attempts").insert({ user_id: user.id, exercise_id: exerciseId, passed }).then();
      }
    },
    [user]
  );

  return { state, completeLesson, recordAttempt };
}

export function levelFromXP(xp: number) {
  return Math.floor(xp / 200) + 1;
}

export function xpIntoLevel(xp: number) {
  return xp % 200;
}
