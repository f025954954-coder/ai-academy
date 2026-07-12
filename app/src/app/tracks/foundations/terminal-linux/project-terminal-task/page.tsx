"use client";

import { Trophy, TerminalSquare } from "lucide-react";
import { LessonShell, type LessonMeta, type LessonSection } from "@/components/lesson/lesson-shell";
import { SlideDeck, type Slide } from "@/components/slides/slide-deck";
import { TerminalSimulator } from "@/components/simulators/terminal-simulator";
import { QuizEngine, type QuizQuestion } from "@/components/quiz/quiz-engine";

const META: LessonMeta = {
  trackSlug: "foundations",
  moduleSlug: "terminal-linux",
  lessonSlug: "project-terminal-task",
  title: "פרויקט מודול: פתרון משימה אמיתית בטרמינל",
  objectives: [
    "לשלב ניווט, יצירת קבצים וחיפוש כדי לפתור משימה מקצה לקצה",
    "לבנות ביטחון בעבודה עם שורת פקודה לפני שממשיכים ל-Git",
  ],
  estMinutes: 30,
  difficulty: "בינוני",
  prerequisites: ["צפייה בקבצים וחיפוש: cat, grep, echo"],
};

const SLIDES: Slide[] = [
  {
    title: "המשימה",
    bullets: [
      "בתיקיית logs יש קובץ app.log עם שורות INFO ו-ERROR מעורבבות.",
      "המשימה: מצא את כל שגיאות ה-ERROR, ואז תעד את הממצא בקובץ חדש בשם incident-report.txt בתיקיית projects.",
      "זו בדיוק סוג המשימה ש-Claude Code מבצע עבורך בפרויקטים אמיתיים — עכשיו תבין מה קורה 'מתחת למכסה המנוע'.",
    ],
  },
];

const QUIZ: QuizQuestion[] = [
  {
    id: "q1",
    question: "מה סדר הפעולות ההגיוני לפתרון המשימה?",
    options: [
      "mkdir → grep → cd",
      "cd logs → grep ERROR app.log → cd ../projects → touch incident-report.txt",
      "rm app.log → cat incident-report.txt",
      "אין סדר משנה",
    ],
    correctIndex: 1,
    explanation: "קודם ניגשים לתיקייה עם המידע, מחפשים בו, ואז עוברים לתיקיית היעד ליצור את הדוח.",
  },
];

const SECTIONS: LessonSection[] = [
  { id: "slides", label: "המשימה שלך", content: <SlideDeck slides={SLIDES} /> },
  {
    id: "terminal",
    label: "בצע את המשימה בטרמינל",
    content: (
      <div>
        <div className="mb-3 flex items-center gap-2 rounded-xl border border-primary/30 bg-primary/5 p-4 text-sm">
          <Trophy size={18} className="shrink-0 text-primary" />
          <span>
            נסה לפתור בעצמך לפני שאתה מציץ ברמז: היכנס ל-logs, הרץ grep ERROR app.log, עבור ל-projects,
            וצור קובץ incident-report.txt.
          </span>
        </div>
        <TerminalSimulator height={360} />
      </div>
    ),
  },
  { id: "quiz", label: "בוחן ידע", content: <QuizEngine questions={QUIZ} /> },
  {
    id: "summary",
    label: "סיכום המודול",
    content: (
      <div className="rounded-xl bg-card p-5 text-sm">
        <div className="mb-2 flex items-center gap-2 font-bold">
          <TerminalSquare size={18} className="text-primary" /> מה כיסינו במודול הטרמינל
        </div>
        <ul className="space-y-1.5">
          <li>✅ ניווט בין תיקיות וניהול קבצים (pwd/ls/cd/mkdir/touch/rm)</li>
          <li>✅ קריאת קבצים וחיפוש טקסט (cat/grep)</li>
          <li>✅ פתרון משימה אמיתית משולבת בטרמינל</li>
        </ul>
        <p className="mt-3 text-muted">
          עכשיו, כשאתה מרגיש בנוח בטרמינל, נעבור ל-Git — הכלי שינהל את כל הקוד שתכתוב (או ש-Claude
          Code יכתוב עבורך) לאורך זמן.
        </p>
      </div>
    ),
  },
];

export default function Page() {
  return <LessonShell meta={META} sections={SECTIONS} />;
}
