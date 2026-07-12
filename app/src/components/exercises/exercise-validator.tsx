"use client";

import * as React from "react";
import Editor from "@monaco-editor/react";
import { useTheme } from "next-themes";
import { CheckCircle2, XCircle, Lightbulb, Eye, Play } from "lucide-react";
import { useProgress } from "@/lib/progress/store";

export interface ExerciseConfig {
  id: string;
  prompt: string;
  starterCode: string;
  hints: string[]; // hints[0] = ראשון, hints[1] = ספציפי יותר וכו'
  solutionCode: string;
  /** מריץ את קוד התלמיד (כפונקציה) ומחזיר true/false + הודעה — יכול להיות סינכרוני או אסינכרוני */
  check: (
    userFn: () => unknown
  ) => { passed: boolean; message: string } | Promise<{ passed: boolean; message: string }>;
}

export function ExerciseValidator({ exercise }: { exercise: ExerciseConfig }) {
  const { resolvedTheme } = useTheme();
  const { recordAttempt } = useProgress();
  const [code, setCode] = React.useState(exercise.starterCode);
  const [result, setResult] = React.useState<{ passed: boolean; message: string } | null>(null);
  const [attempts, setAttempts] = React.useState(0);
  const [showSolution, setShowSolution] = React.useState(false);

  async function runCheck() {
    try {
      // eslint-disable-next-line @typescript-eslint/no-implied-eval
      const userFn = new Function(`return (${code})`)() as () => unknown;
      const outcome = await exercise.check(userFn);
      setResult(outcome);
      setAttempts((a) => a + 1);
      recordAttempt(exercise.id, outcome.passed);
    } catch (e) {
      setResult({ passed: false, message: `שגיאת הרצה: ${(e as Error).message}` });
      setAttempts((a) => a + 1);
      recordAttempt(exercise.id, false);
    }
  }

  const hintLevel = result && !result.passed ? Math.min(attempts, exercise.hints.length) : 0;

  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <p className="font-semibold">{exercise.prompt}</p>

      <div className="mt-3 overflow-hidden rounded-xl border border-border" style={{ direction: "ltr" }}>
        <Editor
          height={180}
          language="javascript"
          value={code}
          onChange={(v) => setCode(v ?? "")}
          theme={resolvedTheme === "dark" ? "vs-dark" : "light"}
          options={{ fontSize: 14, minimap: { enabled: false } }}
        />
      </div>

      <div className="mt-3 flex items-center gap-2">
        <button
          onClick={runCheck}
          className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
        >
          <Play size={14} /> בדוק את הפתרון שלי
        </button>
        {attempts >= 3 && !result?.passed && (
          <button
            onClick={() => setShowSolution(true)}
            className="flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm text-muted hover:bg-background"
          >
            <Eye size={14} /> הראה פתרון (לא מומלץ לפני שניסית)
          </button>
        )}
      </div>

      {result && (
        <div
          className={`mt-3 flex items-center gap-2 rounded-lg px-3 py-2 text-sm ${
            result.passed ? "bg-success/10 text-success" : "bg-danger/10 text-danger"
          }`}
        >
          {result.passed ? <CheckCircle2 size={16} /> : <XCircle size={16} />}
          {result.message}
        </div>
      )}

      {hintLevel > 0 && exercise.hints[hintLevel - 1] && (
        <div className="mt-2 flex items-start gap-2 rounded-lg bg-warning/10 px-3 py-2 text-sm text-warning">
          <Lightbulb size={16} className="mt-0.5 shrink-0" />
          <span>{exercise.hints[hintLevel - 1]}</span>
        </div>
      )}

      {showSolution && (
        <div className="mt-3 rounded-lg bg-background p-3 text-sm">
          <div className="mb-1 font-semibold text-muted">פתרון מוצע:</div>
          <pre className="overflow-x-auto text-xs" style={{ direction: "ltr" }}>
            {exercise.solutionCode}
          </pre>
        </div>
      )}
    </div>
  );
}
