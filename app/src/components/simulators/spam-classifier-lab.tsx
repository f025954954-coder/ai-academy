"use client";

import * as React from "react";
import { CheckCircle2, XCircle } from "lucide-react";

interface Sample {
  text: string;
  isSpam: boolean;
}

const SAMPLES: Sample[] = [
  { text: "זכית בפרס! לחץ כאן עכשיו כדי לקבל כסף חינם", isSpam: true },
  { text: "היי, נדבר מחר בפגישה על הפרויקט?", isSpam: false },
  { text: "הצעה מדהימה: הרווח כסף מהיר בבית, לחץ עכשיו!", isSpam: true },
  { text: "מצורף הקובץ שביקשת אתמול", isSpam: false },
  { text: "זוכה יקר, קיבלת הזמנה בלעדית לקבל מיליון דולר", isSpam: true },
  { text: "תזכורת: השיעור מתחיל בעוד 10 דקות", isSpam: false },
  { text: "לחץ כאן חינם עכשיו כדי לזכות בפרס ענק", isSpam: true },
  { text: "אמא, אני מגיע הביתה מאוחר היום", isSpam: false },
  { text: "הצעה בלעדית: הלוואה מהירה בלי ריבית, פנה עכשיו", isSpam: true },
  { text: "תודה על העזרה בשיעור האחרון", isSpam: false },
];

const KEYWORDS = ["חינם", "לחץ", "זכית", "כסף", "עכשיו", "בלעדי"];

function score(text: string, weights: Record<string, number>) {
  return KEYWORDS.reduce((sum, kw) => sum + (text.includes(kw) ? weights[kw] : 0), 0);
}

export function SpamClassifierLab() {
  const [weights, setWeights] = React.useState<Record<string, number>>(
    Object.fromEntries(KEYWORDS.map((k) => [k, 1]))
  );
  const [threshold, setThreshold] = React.useState(2);

  const results = SAMPLES.map((s) => {
    const predictedSpam = score(s.text, weights) >= threshold;
    return { ...s, predictedSpam, correct: predictedSpam === s.isSpam };
  });
  const accuracy = Math.round((results.filter((r) => r.correct).length / results.length) * 100);

  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <p className="mb-4 text-sm text-muted">
        זהו &quot;מודל&quot; פשוט: כל מילת מפתח מקבלת משקל (weight). אם סכום המשקלים בהודעה עובר את
        הסף (threshold) — המודל מסווג אותה כספאם. גרור את הסליידרים ונסה להגיע לדיוק (accuracy) הגבוה
        ביותר. זה בדיוק הרעיון מאחורי &quot;אימון מודל&quot; — רק שכאן אתה מכוון את המשקלים ידנית.
      </p>

      <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
        {KEYWORDS.map((kw) => (
          <div key={kw} className="rounded-lg bg-background p-2">
            <div className="mb-1 flex justify-between text-xs">
              <span className="font-bold text-primary">&quot;{kw}&quot;</span>
              <span className="text-muted">{weights[kw]}</span>
            </div>
            <input
              type="range"
              min={0}
              max={3}
              step={0.5}
              value={weights[kw]}
              onChange={(e) => setWeights((w) => ({ ...w, [kw]: Number(e.target.value) }))}
              className="w-full"
            />
          </div>
        ))}
      </div>

      <div className="mb-4 rounded-lg bg-background p-2">
        <div className="mb-1 flex justify-between text-xs">
          <span className="font-bold text-warning">סף סיווג (threshold)</span>
          <span className="text-muted">{threshold}</span>
        </div>
        <input
          type="range"
          min={0.5}
          max={6}
          step={0.5}
          value={threshold}
          onChange={(e) => setThreshold(Number(e.target.value))}
          className="w-full"
        />
      </div>

      <div className="mb-3 rounded-xl bg-primary/10 px-4 py-3 text-center">
        <span className="text-2xl font-extrabold text-primary">{accuracy}%</span>
        <span className="mr-2 text-sm text-muted">דיוק (accuracy) על סט הבדיקה</span>
      </div>

      <div className="space-y-1.5" style={{ direction: "rtl" }}>
        {results.map((r, i) => (
          <div
            key={i}
            className={`flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs ${
              r.correct ? "bg-success/5" : "bg-danger/10"
            }`}
          >
            {r.correct ? (
              <CheckCircle2 size={14} className="shrink-0 text-success" />
            ) : (
              <XCircle size={14} className="shrink-0 text-danger" />
            )}
            <span className="flex-1 truncate">{r.text}</span>
            <span className="shrink-0 text-muted">
              אמת: {r.isSpam ? "ספאם" : "לא ספאם"} · חיזוי: {r.predictedSpam ? "ספאם" : "לא ספאם"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
