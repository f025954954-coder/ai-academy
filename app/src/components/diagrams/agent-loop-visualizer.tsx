"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Brain, Wrench, Eye, CheckCircle2, Play, RotateCcw } from "lucide-react";

type Phase = "think" | "act" | "observe" | "done";

interface TraceStep {
  iteration: number;
  phase: Phase;
  detail: string;
}

// תרחיש מדומה: סוכן עונה על "מה סטטוס הפנייה AD-1042 ומה מחיר Enterprise?" — דורש 2 קריאות כלי.
const SCENARIO: TraceStep[] = [
  { iteration: 1, phase: "think", detail: 'המשימה דורשת שני פרטים: סטטוס פנייה ומחיר תוכנית. מתחיל בסטטוס הפנייה.' },
  { iteration: 1, phase: "act", detail: "קורא לכלי check_ticket_status(ticket_id='AD-1042')" },
  { iteration: 1, phase: "observe", detail: 'תוצאה: {status: "בטיפול", plan: "Team"}. עדיין חסר מחיר Enterprise.' },
  { iteration: 2, phase: "think", detail: "יש לי את הסטטוס. עכשיו צריך את מחיר תוכנית Enterprise." },
  { iteration: 2, phase: "act", detail: "קורא לכלי get_plan_pricing(plan='Enterprise')" },
  { iteration: 2, phase: "observe", detail: 'תוצאה: {price: "$49/משתמש"}. יש לי את כל המידע הדרוש.' },
  { iteration: 3, phase: "done", detail: "מנסח תשובה סופית ללקוח משני התוצאות שנאספו — עוצר את הלולאה." },
];

const PHASE_ICON: Record<Phase, React.ElementType> = {
  think: Brain,
  act: Wrench,
  observe: Eye,
  done: CheckCircle2,
};

const PHASE_LABEL: Record<Phase, string> = {
  think: "תכנון (Think)",
  act: "פעולה (Act)",
  observe: "תצפית (Observe)",
  done: "סיום",
};

const PHASE_COLOR: Record<Phase, string> = {
  think: "var(--primary)",
  act: "var(--warning)",
  observe: "#22d3ee",
  done: "var(--success)",
};

/** מדגים לולאת Agent אמיתית (Think-Act-Observe) על תרחיש דו-שלבי, לא דוגמה בודדת מלאכותית. */
export function AgentLoopVisualizer() {
  const [stepIndex, setStepIndex] = React.useState(-1);
  const current = stepIndex >= 0 ? SCENARIO[stepIndex] : null;
  const Icon = current ? PHASE_ICON[current.phase] : Play;

  function next() {
    setStepIndex((i) => Math.min(i + 1, SCENARIO.length - 1));
  }
  function reset() {
    setStepIndex(-1);
  }

  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <p className="mb-3 text-sm text-muted">
        משימה: &quot;מה הסטטוס של AD-1042, וכמה עולה תוכנית Enterprise?&quot; — משימה שדורשת <strong>שני</strong> כלים שונים.
        עקוב אחרי הסוכן שבונה את התשובה צעד-צעד.
      </p>

      <div className="flex items-center justify-center gap-2" style={{ direction: "ltr" }}>
        {(["think", "act", "observe"] as Phase[]).map((p, i) => (
          <React.Fragment key={p}>
            <motion.div
              animate={{
                scale: current?.phase === p ? 1.1 : 1,
                opacity: current?.phase === p ? 1 : 0.5,
              }}
              className="flex flex-col items-center gap-1"
            >
              <span
                className="flex size-12 items-center justify-center rounded-2xl border-2"
                style={{ borderColor: PHASE_COLOR[p], color: PHASE_COLOR[p] }}
              >
                {React.createElement(PHASE_ICON[p], { size: 20 })}
              </span>
              <span className="text-xs text-muted">{PHASE_LABEL[p]}</span>
            </motion.div>
            {i < 2 && <div className="h-0.5 w-8 bg-border" />}
          </React.Fragment>
        ))}
      </div>

      <motion.div
        key={stepIndex}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-5 rounded-xl bg-background p-4 text-sm"
      >
        {current ? (
          <div className="flex items-start gap-2">
            <Icon size={16} className="mt-0.5 shrink-0" style={{ color: PHASE_COLOR[current.phase] }} />
            <div>
              <span className="font-bold" style={{ color: PHASE_COLOR[current.phase] }}>
                סיבוב {current.iteration} — {PHASE_LABEL[current.phase]}:{" "}
              </span>
              {current.detail}
            </div>
          </div>
        ) : (
          <span className="text-muted">לחץ &quot;צעד הבא&quot; כדי להתחיל את הלולאה.</span>
        )}
      </motion.div>

      <div className="mt-4 flex gap-2">
        <button
          onClick={next}
          disabled={stepIndex >= SCENARIO.length - 1}
          className="flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground disabled:opacity-40"
        >
          <Play size={14} /> צעד הבא
        </button>
        <button
          onClick={reset}
          className="flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-sm text-muted hover:bg-background"
        >
          <RotateCcw size={14} /> אפס
        </button>
      </div>
    </div>
  );
}
