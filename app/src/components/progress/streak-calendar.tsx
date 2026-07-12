"use client";

import { Flame } from "lucide-react";
import { cn } from "@/lib/utils";

export function StreakCalendar({ streakDays }: { streakDays: number }) {
  const days = Array.from({ length: 7 }, (_, i) => i);
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <div className="mb-3 flex items-center gap-2">
        <Flame size={18} className="text-warning" />
        <span className="font-bold">{streakDays} ימי רצף</span>
      </div>
      <div className="flex gap-2">
        {days.map((d) => (
          <div
            key={d}
            className={cn(
              "flex h-8 flex-1 items-center justify-center rounded-lg text-xs font-semibold",
              d < streakDays % 7 || (streakDays > 0 && d === 6)
                ? "bg-warning/20 text-warning"
                : "bg-background text-muted"
            )}
          >
            {["א", "ב", "ג", "ד", "ה", "ו", "ש"][d]}
          </div>
        ))}
      </div>
    </div>
  );
}
