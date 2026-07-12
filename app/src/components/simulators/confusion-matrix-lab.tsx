"use client";

import * as React from "react";

const SCENARIOS = [
  {
    label: "מודל 'עצל' שתמיד עונה 'בריא'",
    tp: 0,
    fp: 0,
    fn: 5,
    tn: 95,
  },
  {
    label: "מודל שמזהה חלק מהמקרים החולים",
    tp: 3,
    fp: 4,
    fn: 2,
    tn: 91,
  },
  {
    label: "מודל רגיש מאוד (חושד בהרבה מקרים)",
    tp: 5,
    fp: 20,
    fn: 0,
    tn: 75,
  },
];

function metrics(tp: number, fp: number, fn: number, tn: number) {
  const accuracy = ((tp + tn) / (tp + fp + fn + tn)) * 100;
  const precision = tp + fp === 0 ? 0 : (tp / (tp + fp)) * 100;
  const recall = tp + fn === 0 ? 0 : (tp / (tp + fn)) * 100;
  return { accuracy, precision, recall };
}

export function ConfusionMatrixLab() {
  const [selected, setSelected] = React.useState(0);
  const s = SCENARIOS[selected];
  const { accuracy, precision, recall } = metrics(s.tp, s.fp, s.fn, s.tn);

  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <p className="mb-4 text-sm text-muted">
        תרחיש: מתוך 100 אנשים, 5 באמת חולים ו-95 בריאים (מחלה נדירה). בחר מודל וראה למה
        &quot;accuracy&quot; לבד יכול להטעות:
      </p>
      <div className="mb-4 flex flex-wrap gap-2">
        {SCENARIOS.map((sc, i) => (
          <button
            key={sc.label}
            onClick={() => setSelected(i)}
            className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
              selected === i
                ? "border-primary bg-primary/10 text-primary"
                : "border-border text-muted hover:bg-background"
            }`}
          >
            {sc.label}
          </button>
        ))}
      </div>

      <div className="mb-4 grid grid-cols-2 gap-2 text-center text-xs" style={{ direction: "ltr" }}>
        <div className="rounded-lg bg-success/10 p-3">
          <div className="text-lg font-bold text-success">{s.tp}</div>
          <div className="text-muted">True Positive (חולה, זוהה נכון)</div>
        </div>
        <div className="rounded-lg bg-danger/10 p-3">
          <div className="text-lg font-bold text-danger">{s.fp}</div>
          <div className="text-muted">False Positive (בריא, זוהה בטעות כחולה)</div>
        </div>
        <div className="rounded-lg bg-danger/10 p-3">
          <div className="text-lg font-bold text-danger">{s.fn}</div>
          <div className="text-muted">False Negative (חולה, לא זוהה — מסוכן!)</div>
        </div>
        <div className="rounded-lg bg-success/10 p-3">
          <div className="text-lg font-bold text-success">{s.tn}</div>
          <div className="text-muted">True Negative (בריא, זוהה נכון)</div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 text-center">
        <div className="rounded-xl bg-background p-3">
          <div className="text-xl font-extrabold text-primary">{accuracy.toFixed(0)}%</div>
          <div className="text-xs text-muted">Accuracy</div>
        </div>
        <div className="rounded-xl bg-background p-3">
          <div className="text-xl font-extrabold text-primary">{precision.toFixed(0)}%</div>
          <div className="text-xs text-muted">Precision</div>
        </div>
        <div className="rounded-xl bg-background p-3">
          <div className="text-xl font-extrabold text-primary">{recall.toFixed(0)}%</div>
          <div className="text-xs text-muted">Recall</div>
        </div>
      </div>

      {selected === 0 && (
        <p className="mt-3 rounded-lg bg-warning/10 p-3 text-xs text-warning">
          שים לב: המודל ה&quot;עצל&quot; מקבל accuracy של 95%! אבל ה-recall שלו הוא 0% — הוא פספס את
          כל החולים האמיתיים. זו הסיבה ש-accuracy לבד לא מספיק כדי לשפוט מודל.
        </p>
      )}
    </div>
  );
}
