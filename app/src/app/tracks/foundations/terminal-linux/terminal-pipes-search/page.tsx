"use client";

import { LessonShell, type LessonMeta, type LessonSection } from "@/components/lesson/lesson-shell";
import { SlideDeck, type Slide } from "@/components/slides/slide-deck";
import { TerminalSimulator } from "@/components/simulators/terminal-simulator";
import { ExerciseValidator, type ExerciseConfig } from "@/components/exercises/exercise-validator";
import { QuizEngine, type QuizQuestion } from "@/components/quiz/quiz-engine";

const META: LessonMeta = {
  trackSlug: "foundations",
  moduleSlug: "terminal-linux",
  lessonSlug: "terminal-pipes-search",
  title: "צפייה בקבצים וחיפוש: cat, grep, echo",
  objectives: [
    "לקרוא תוכן קבצים מהטרמינל עם cat",
    "לחפש טקסט בתוך קבצים עם grep — כלי שתשתמש בו כל הזמן עם AI-generated code",
    "להבין למה זה חשוב: Claude Code 'רואה' את הפרויקט שלך דרך אותם כלים בדיוק",
  ],
  estMinutes: 20,
  difficulty: "מתחיל",
  prerequisites: ["טרמינל: ניווט וקבצים"],
};

const SLIDES: Slide[] = [
  {
    title: "cat — קריאת תוכן קובץ",
    bullets: [
      "cat <קובץ> מדפיסה את תוכן הקובץ ישירות לטרמינל.",
      "זה הכלי המהיר ביותר לבדוק 'מה יש בקובץ הזה' בלי לפתוח עורך.",
      "Claude Code משתמש בפעולה דומה (Read) בכל פעם שהוא 'קורא' קובץ בפרויקט שלך.",
    ],
  },
  {
    title: "grep — חיפוש בתוך קבצים",
    bullets: [
      "grep <מילה> <קובץ> מוצא כל שורה שמכילה את המילה המבוקשת.",
      "שימושי מאוד לחיפוש שגיאות בלוגים, או מציאת שימוש בפונקציה מסוימת בקוד.",
      "זו בדיוק הפעולה ש-Claude Code מבצע (Grep tool) כשהוא מחפש קטע קוד רלוונטי בפרויקט גדול.",
    ],
  },
];

const EXERCISE: ExerciseConfig = {
  id: "terminal-pipes-ex1",
  prompt:
    "כתוב פונקציה בשם grepLines שמקבלת תוכן קובץ (מחרוזת עם \\n בין שורות) ומילת חיפוש, ומחזירה מערך של כל השורות שמכילות את המילה — בדיוק כמו grep.",
  starterCode: `function grepLines(content, needle) {
  // רמז: content.split('\\n') הופך את התוכן למערך שורות
  // TODO: החזר מערך של שורות שמכילות את needle
}`,
  hints: [
    "פצל את התוכן לשורות עם split, ואז סנן (filter) לפי includes.",
    "נסה: return content.split('\\n').filter(line => line.includes(needle));",
    "טעות נפוצה: לשכוח להחזיר מערך (return) ולא רק לבצע את הפעולה.",
  ],
  solutionCode: `function grepLines(content, needle) {
  return content.split('\\n').filter(line => line.includes(needle));
}`,
  check: (userFn) => {
    const fn = userFn as (c: string, n: string) => string[];
    try {
      const content = "INFO started\nERROR timeout\nINFO retry ok";
      const result = fn(content, "ERROR");
      if (Array.isArray(result) && result.length === 1 && result[0] === "ERROR timeout") {
        return { passed: true, message: "מדויק! מצאת בדיוק את השורה עם ERROR." };
      }
      return { passed: false, message: `קיבלתי ${JSON.stringify(result)}, ציפיתי ל-["ERROR timeout"].` };
    } catch (e) {
      return { passed: false, message: `שגיאת הרצה: ${(e as Error).message}` };
    }
  },
};

const QUIZ: QuizQuestion[] = [
  {
    id: "q1",
    question: "מה עושה הפקודה grep ERROR app.log?",
    options: [
      "מוחקת את הקובץ app.log",
      "מציגה את כל השורות ב-app.log שמכילות את המילה ERROR",
      "יוצרת קובץ חדש בשם ERROR",
      "מריצה את הקובץ app.log",
    ],
    correctIndex: 1,
    explanation: "grep מחפשת ומציגה שורות תואמות, לא משנה את הקובץ.",
  },
  {
    id: "q2",
    question: "למה הבנת cat ו-grep עוזרת לך לעבוד עם Claude Code?",
    options: [
      "היא לא קשורה בכלל",
      "כי Claude Code משתמש בכלים מקבילים (Read/Grep) כדי לחקור את הפרויקט שלך",
      "כי חייבים להשתמש רק בפקודות אלה עם AI",
      "כי זה מאיץ את המעבד",
    ],
    correctIndex: 1,
    explanation: "כלי הליבה של Claude Code (Read, Grep) מבוססים על אותם עקרונות בדיוק — הבנתם עוזרת לך להבין מה ה-AI 'רואה'.",
  },
];

const SECTIONS: LessonSection[] = [
  { id: "slides", label: "מצגת: הרעיון המרכזי", content: <SlideDeck slides={SLIDES} /> },
  {
    id: "terminal",
    label: "טרמינל חי — תרגל עכשיו",
    content: (
      <div>
        <p className="mb-3 text-sm text-muted">
          נסה: <code>cat notes.txt</code> · <code>cd logs</code> · <code>cat app.log</code> ·{" "}
          <code>grep ERROR app.log</code> · <code>grep INFO app.log</code>
        </p>
        <TerminalSimulator />
      </div>
    ),
  },
  {
    id: "mistakes",
    label: "טעויות נפוצות ו-Best Practices",
    content: (
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-danger/30 bg-danger/5 p-4">
          <p className="mb-2 font-bold text-danger">טעויות נפוצות</p>
          <ul className="space-y-1.5 text-sm">
            <li>לחפש עם grep מילה שאינה קיימת בדיוק (רגישות לאותיות גדולות/קטנות) ולחשוב שהקובץ ריק.</li>
            <li>להשתמש ב-cat על קבצים ענקיים — עדיף חיפוש ממוקד עם grep.</li>
          </ul>
        </div>
        <div className="rounded-xl border border-success/30 bg-success/5 p-4">
          <p className="mb-2 font-bold text-success">Best Practices</p>
          <ul className="space-y-1.5 text-sm">
            <li>כשמחפשים באג בלוג ארוך, grep ERROR הוא הצעד הראשון הטבעי.</li>
            <li>שלב פקודות: cd לתיקייה הנכונה, ואז grep — במקום לנחש נתיבים ארוכים.</li>
          </ul>
        </div>
      </div>
    ),
  },
  { id: "exercise", label: "תרגיל מודרך", content: <ExerciseValidator exercise={EXERCISE} /> },
  { id: "quiz", label: "בוחן ידע", content: <QuizEngine questions={QUIZ} /> },
  {
    id: "glossary",
    label: "מונחון",
    content: (
      <dl className="grid gap-3 sm:grid-cols-2">
        {[
          ["cat", "פקודה שמדפיסה תוכן קובץ לטרמינל."],
          ["grep", "פקודה שמחפשת שורות תואמות בתוך קובץ."],
          ["stdout", "הפלט הרגיל שפקודה מדפיסה למסך."],
        ].map(([term, def]) => (
          <div key={term} className="rounded-lg bg-card p-3">
            <dt className="font-bold text-primary">{term}</dt>
            <dd className="text-sm text-muted">{def}</dd>
          </div>
        ))}
      </dl>
    ),
  },
  {
    id: "faq",
    label: "שאלות נפוצות",
    content: (
      <div className="space-y-3">
        {[
          [
            "מה זה 'pipe' (|) ששמעתי עליו?",
            "pipe מעביר את הפלט של פקודה אחת כקלט לפקודה הבאה (למשל cat file.txt | grep error) — נלמד את זה בהמשך המסלול כשנעמיק ב-Linux.",
          ],
        ].map(([q, a]) => (
          <div key={q} className="rounded-lg bg-card p-4">
            <p className="font-semibold">{q}</p>
            <p className="mt-1 text-sm text-muted">{a}</p>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: "homework",
    label: "שיעורי בית",
    content: (
      <div className="rounded-xl bg-primary/5 p-4 text-sm">
        <p className="font-semibold">שיעורי בית:</p>
        <p className="mt-1 text-muted">
          בסימולטור: היכנס ל-logs, השתמש ב-grep כדי למצוא את כל השורות עם "INFO" ב-app.log. כמה שורות מצאת?
        </p>
      </div>
    ),
  },
];

export default function Page() {
  return <LessonShell meta={META} sections={SECTIONS} />;
}
