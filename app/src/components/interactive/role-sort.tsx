"use client";

import * as React from "react";
import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface RoleSortItem {
  id: string;
  label: string;
  correctBucket: string;
}

export function RoleSort({
  items,
  buckets,
}: {
  items: RoleSortItem[];
  buckets: { id: string; label: string }[];
}) {
  const [assignments, setAssignments] = React.useState<Record<string, string>>({});
  const [checked, setChecked] = React.useState(false);

  const correctCount = items.filter((i) => assignments[i.id] === i.correctBucket).length;

  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <p className="mb-4 text-sm text-muted">שייך כל משימה לצד הנכון — הדפדפן (Client) או השרת (Server):</p>
      <div className="space-y-2">
        {items.map((item) => (
          <div key={item.id} className="flex flex-wrap items-center gap-2 rounded-lg bg-background p-2">
            <span className="flex-1 text-sm">{item.label}</span>
            {buckets.map((bucket) => {
              const selected = assignments[item.id] === bucket.id;
              const isCorrect = checked && selected && item.correctBucket === bucket.id;
              const isWrong = checked && selected && item.correctBucket !== bucket.id;
              return (
                <button
                  key={bucket.id}
                  onClick={() => setAssignments((a) => ({ ...a, [item.id]: bucket.id }))}
                  className={cn(
                    "flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-semibold transition",
                    selected && !checked && "border-primary bg-primary/10 text-primary",
                    !selected && "border-border text-muted",
                    isCorrect && "border-success bg-success/10 text-success",
                    isWrong && "border-danger bg-danger/10 text-danger"
                  )}
                >
                  {bucket.label}
                  {isCorrect && <Check size={12} />}
                  {isWrong && <X size={12} />}
                </button>
              );
            })}
          </div>
        ))}
      </div>
      {!checked ? (
        <button
          onClick={() => setChecked(true)}
          disabled={Object.keys(assignments).length < items.length}
          className="mt-4 rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground disabled:opacity-40"
        >
          בדוק שיוך
        </button>
      ) : (
        <div className="mt-4 rounded-lg bg-primary/10 px-3 py-2 text-sm font-semibold text-primary">
          {correctCount}/{items.length} נכונים
        </div>
      )}
    </div>
  );
}
