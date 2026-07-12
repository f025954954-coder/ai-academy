"use client";

import * as React from "react";
import { simpleTokenize, colorForIndex, estimateRealTokenCount } from "@/lib/simulators/tokenizer";

/** Tokenizer Visualizer — רכיב כללי לשימוש חוזר בכל שיעור שנוגע בטוקניזציה/עלויות/context window. */
export function TokenVisualizer({ defaultText }: { defaultText: string }) {
  const [text, setText] = React.useState(defaultText);
  const tokens = React.useMemo(() => simpleTokenize(text), [text]);
  const realEstimate = React.useMemo(() => estimateRealTokenCount(text), [text]);

  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={3}
        className="w-full rounded-lg border border-border bg-background p-3 text-sm"
        placeholder="הקלד טקסט לניתוח..."
      />
      <div className="mt-3 flex flex-wrap gap-1.5" style={{ direction: "ltr" }}>
        {tokens.map((t, i) => (
          <span
            key={i}
            className="rounded px-2 py-1 text-sm font-mono"
            style={{ backgroundColor: colorForIndex(i) + "33", color: colorForIndex(i) }}
            title={`token id: ${t.id}`}
          >
            {t.text}
          </span>
        ))}
      </div>
      <div className="mt-4 grid grid-cols-2 gap-3 text-center">
        <div className="rounded-lg bg-background p-3">
          <div className="text-xl font-extrabold text-primary">{tokens.length}</div>
          <div className="text-xs text-muted">טוקנים (חלוקה פשוטה — הדגמה)</div>
        </div>
        <div className="rounded-lg bg-background p-3">
          <div className="text-xl font-extrabold text-primary">~{realEstimate}</div>
          <div className="text-xs text-muted">הערכת טוקנים אמיתית (BPE, בקירוב)</div>
        </div>
      </div>
      <p className="mt-3 text-xs text-muted">
        שים לב: הצבעים למעלה מראים חלוקה פשוטה למילים/פיסוק לצורך הדגמה. טוקנייזרים אמיתיים (BPE)
        מפצלים גם בתוך מילים — מילה אחת יכולה להפוך ל-2-3 טוקנים, ולכן ההערכה הימנית קרובה יותר
        למציאות עבור עלויות בפועל.
      </p>
    </div>
  );
}
