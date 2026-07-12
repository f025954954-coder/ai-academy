"use client";

import * as React from "react";
import { CheckCircle2, Circle, Terminal } from "lucide-react";
import { useProgress } from "@/lib/progress/store";

export interface RealWorldTaskProps {
  id: string;
  title: string;
  /** ההקשר: על איזה קוד/ריפו התלמיד עובד (בד"כ AtlasDesk) */
  context: string;
  /** הוראות המשימה, צעד-צעד */
  steps: string[];
  /** קריטריונים לבדיקה עצמית — "איך אני יודע שהצלחתי" */
  successCriteria: string[];
}

/**
 * משימה מעשית אמיתית: התלמיד פותח את Claude Code שלו (על מחשבו, מול קוד אמיתי — AtlasDesk)
 * ומבצע משימת הנדסה אמיתית. לא ניתן לוולד אוטומטית בדפדפן (בניגוד ל-ExerciseValidator),
 * אז המנגנון הוא checklist + רפלקציה כתובה שנשמרת (local + Supabase) כמו הערות שיעור.
 */
export function RealWorldTask({ id, title, context, steps, successCriteria }: RealWorldTaskProps) {
  const { state, saveNote } = useProgress();
  const noteKey = `task:${id}`;
  const [checked, setChecked] = React.useState<boolean[]>(() => steps.map(() => false));
  const [reflection, setReflection] = React.useState(state.notes[noteKey] ?? "");

  const allDone = checked.every(Boolean);

  return (
    <div className="rounded-2xl border-2 border-primary/30 bg-primary/5 p-5">
      <div className="mb-2 flex items-center gap-2 text-sm font-bold text-primary">
        <Terminal size={16} /> משימה מעשית — פתח את Claude Code שלך
      </div>
      <h3 className="font-bold">{title}</h3>
      <p className="mt-1 text-sm text-muted">{context}</p>

      <ol className="mt-4 space-y-2">
        {steps.map((step, i) => (
          <li key={i}>
            <button
              onClick={() =>
                setChecked((c) => c.map((v, idx) => (idx === i ? !v : v)))
              }
              className="flex w-full items-start gap-2 rounded-lg bg-background p-2 text-right text-sm hover:bg-card"
            >
              {checked[i] ? (
                <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-success" />
              ) : (
                <Circle size={16} className="mt-0.5 shrink-0 text-muted" />
              )}
              <span className={checked[i] ? "text-muted line-through" : ""}>{step}</span>
            </button>
          </li>
        ))}
      </ol>

      <div className="mt-4 rounded-lg bg-background p-3">
        <p className="text-xs font-semibold text-muted">איך תדע שהצלחת:</p>
        <ul className="mt-1 list-inside list-disc text-xs text-muted">
          {successCriteria.map((c, i) => (
            <li key={i}>{c}</li>
          ))}
        </ul>
      </div>

      <label className="mt-4 block text-xs font-semibold text-muted">
        רפלקציה: מה עבד טוב? מה היה מפתיע? מה היית עושה אחרת בפעם הבאה?
      </label>
      <textarea
        value={reflection}
        onChange={(e) => setReflection(e.target.value)}
        onBlur={() => saveNote(noteKey, reflection)}
        rows={3}
        placeholder="כתוב כמה משפטים על החוויה שלך עם המשימה..."
        className="mt-1 w-full rounded-lg border border-border bg-background p-2 text-sm"
      />

      {allDone && (
        <div className="mt-3 flex items-center gap-2 rounded-lg bg-success/10 px-3 py-2 text-sm text-success">
          <CheckCircle2 size={16} /> סימנת את כל הצעדים כבוצעו. כל הכבוד — זו הנדסה אמיתית, לא רק קריאה.
        </div>
      )}
    </div>
  );
}
