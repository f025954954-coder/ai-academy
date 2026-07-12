"use client";

import * as React from "react";
import { ThumbsDown, ThumbsUp } from "lucide-react";

export interface ComparisonSide {
  label: string;
  content: string;
  /** תוצאה/תגובה בפועל, או השלכה הנדסית של הבחירה הזו */
  outcome: string;
}

export interface PromptComparisonLabProps {
  title: string;
  /** "פרומפט" (ברירת מחדל), "workflow", "session" וכו' — מה שם היחידה שמושווית */
  unitLabel?: string;
  bad: ComparisonSide;
  good: ComparisonSide;
  takeaway: string;
}

/**
 * רכיב גנרי להשוואת "רע מול טוב" — פרומפט, workflow, החלטת ארכיטקטורה, ניהול context ועוד.
 * לא ספציפי לפרומפטים בלבד; משמש בכל טראק Claude Code Mastery.
 */
export function PromptComparisonLab({ title, unitLabel = "פרומפט", bad, good, takeaway }: PromptComparisonLabProps) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <h3 className="font-bold">{title}</h3>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-danger/30 bg-danger/5 p-4">
          <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-danger">
            <ThumbsDown size={16} /> {unitLabel} גרוע: {bad.label}
          </div>
          <pre className="whitespace-pre-wrap rounded-lg bg-background p-3 text-xs" style={{ direction: "ltr" }}>
            {bad.content}
          </pre>
          <p className="mt-2 text-xs text-muted">{bad.outcome}</p>
        </div>
        <div className="rounded-xl border border-success/30 bg-success/5 p-4">
          <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-success">
            <ThumbsUp size={16} /> {unitLabel} טוב: {good.label}
          </div>
          <pre className="whitespace-pre-wrap rounded-lg bg-background p-3 text-xs" style={{ direction: "ltr" }}>
            {good.content}
          </pre>
          <p className="mt-2 text-xs text-muted">{good.outcome}</p>
        </div>
      </div>
      <div className="mt-4 rounded-lg bg-primary/5 p-3 text-sm">
        <span className="font-semibold text-primary">התובנה: </span>
        {takeaway}
      </div>
    </div>
  );
}
