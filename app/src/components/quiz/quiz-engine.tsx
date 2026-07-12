"use client";

import * as React from "react";
import { CheckCircle2, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export function QuizEngine({ questions }: { questions: QuizQuestion[] }) {
  const [answers, setAnswers] = React.useState<Record<string, number>>({});
  const [submitted, setSubmitted] = React.useState(false);

  const score = questions.filter((q) => answers[q.id] === q.correctIndex).length;

  return (
    <div className="space-y-6">
      {questions.map((q, qi) => {
        const chosen = answers[q.id];
        return (
          <div key={q.id} className="rounded-2xl border border-border bg-card p-5">
            <p className="font-semibold">
              {qi + 1}. {q.question}
            </p>
            <div className="mt-3 space-y-2">
              {q.options.map((opt, oi) => {
                const isChosen = chosen === oi;
                const isCorrect = submitted && oi === q.correctIndex;
                const isWrongChoice = submitted && isChosen && oi !== q.correctIndex;
                return (
                  <button
                    key={oi}
                    disabled={submitted}
                    onClick={() => setAnswers((a) => ({ ...a, [q.id]: oi }))}
                    className={cn(
                      "flex w-full items-center justify-between rounded-lg border px-3 py-2 text-right text-sm transition",
                      isChosen && !submitted && "border-primary bg-primary/5",
                      !isChosen && !submitted && "border-border hover:bg-background",
                      isCorrect && "border-success bg-success/10 text-success",
                      isWrongChoice && "border-danger bg-danger/10 text-danger"
                    )}
                  >
                    {opt}
                    {isCorrect && <CheckCircle2 size={16} />}
                    {isWrongChoice && <XCircle size={16} />}
                  </button>
                );
              })}
            </div>
            {submitted && (
              <p className="mt-2 text-xs text-muted">{q.explanation}</p>
            )}
          </div>
        );
      })}

      {!submitted ? (
        <button
          onClick={() => setSubmitted(true)}
          disabled={Object.keys(answers).length < questions.length}
          className="rounded-full bg-primary px-6 py-2.5 font-semibold text-primary-foreground disabled:opacity-40"
        >
          שלח בוחן
        </button>
      ) : (
        <div className="rounded-xl bg-primary/10 px-4 py-3 font-semibold text-primary">
          התוצאה שלך: {score}/{questions.length}
        </div>
      )}
    </div>
  );
}
