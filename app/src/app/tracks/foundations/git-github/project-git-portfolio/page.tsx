"use client";

import { Trophy, GitBranch } from "lucide-react";
import { LessonShell, type LessonMeta, type LessonSection } from "@/components/lesson/lesson-shell";
import { SlideDeck, type Slide } from "@/components/slides/slide-deck";
import { GitSimulator } from "@/components/simulators/git-simulator";
import { QuizEngine, type QuizQuestion } from "@/components/quiz/quiz-engine";

const META: LessonMeta = {
  trackSlug: "foundations",
  moduleSlug: "git-github",
  lessonSlug: "project-git-portfolio",
  title: "פרויקט מודול + קפסטון #1: תיק עבודות ראשון בגיט",
  objectives: [
    "לבנות היסטוריית קומיטים נקייה עם הודעות ברורות",
    "לדמות זרימת עבודה מלאה: branch → commits → merge",
  ],
  estMinutes: 40,
  difficulty: "בינוני",
  prerequisites: ["ענפים ומיזוג — איך Claude Code עובד בענפים"],
};

const SLIDES: Slide[] = [
  {
    title: "🏆 קפסטון #1 — האתגר",
    bullets: [
      "דמה בסימולטור פרויקט אמיתי: אתחל repo, בצע קומיט ראשוני (\"Initial project setup\"), פתח ענף feature/homepage, הוסף בו 2 קומיטים נפרדים (כל אחד עם הודעה מתארת ברורה), ולבסוף מזג אותו בחזרה ל-main.",
      "זה בדיוק תרחיש העבודה שתחווה בפועל כשתבנה פרויקטים אמיתיים עם Claude Code.",
      "בסוף, היסטוריית הקומיטים שלך תספר סיפור ברור: מה נבנה, מתי, ולמה.",
    ],
  },
];

const QUIZ: QuizQuestion[] = [
  {
    id: "q1",
    question: "מה מאפיין היסטוריית קומיטים 'נקייה' ומקצועית?",
    options: [
      "כמה שיותר קומיטים, גם אם ההודעות לא ברורות",
      "הודעות מתארות, קומיט אחד לכל שינוי הגיוני, ומבנה ענפים ברור",
      "קומיט אחד ענק בסוף הפרויקט",
      "אין באמת חשיבות למבנה",
    ],
    correctIndex: 1,
    explanation: "היסטוריה נקייה = כל commit מספר סיפור ברור, בגודל הגיוני, עם הודעה מתארת.",
  },
];

const SECTIONS: LessonSection[] = [
  { id: "slides", label: "האתגר שלך", content: <SlideDeck slides={SLIDES} /> },
  {
    id: "simulator",
    label: "בצע את הפרויקט בסימולטור",
    content: (
      <div>
        <div className="mb-3 flex items-center gap-2 rounded-xl border border-primary/30 bg-primary/5 p-4 text-sm">
          <Trophy size={18} className="shrink-0 text-primary" />
          <span>
            נסה בעצמך לפני שאתה בודק את הרצף המוצע: init → add+commit ("Initial project setup") →
            branch feature/homepage → checkout אליו → 2 קומיטים נפרדים → checkout main → merge.
          </span>
        </div>
        <GitSimulator height={340} />
      </div>
    ),
  },
  { id: "quiz", label: "בוחן ידע", content: <QuizEngine questions={QUIZ} /> },
  {
    id: "summary",
    label: "סיכום המודול והקפסטון",
    content: (
      <div className="rounded-xl bg-card p-5 text-sm">
        <div className="mb-2 flex items-center gap-2 font-bold">
          <GitBranch size={18} className="text-primary" /> מה כיסינו במודול Git
        </div>
        <ul className="space-y-1.5">
          <li>✅ המחזור הבסיסי: init → add → commit</li>
          <li>✅ ענפים ומיזוג — עבודה בטוחה על פיצ'רים נפרדים</li>
          <li>✅ 🏆 קפסטון #1: זרימת עבודה מלאה שמדמה פרויקט אמיתי</li>
        </ul>
        <p className="mt-3 text-muted">
          סיימת את טראק היסודות! מכאן ממשיכים ישר לעולם שבו האקדמיה שמה את מירב הדגש —
          תכנות ממוקד-AI, ולאחריו הליבה האמיתית: Claude Code, Prompt Engineering, MCP, RAG,
          Agents ובניית מוצרי AI מסחריים.
        </p>
      </div>
    ),
  },
];

export default function Page() {
  return <LessonShell meta={META} sections={SECTIONS} />;
}
