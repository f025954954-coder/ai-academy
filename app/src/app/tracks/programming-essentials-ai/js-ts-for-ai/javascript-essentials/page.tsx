"use client";

import { LessonShell, type LessonMeta, type LessonSection } from "@/components/lesson/lesson-shell";
import { SlideDeck, type Slide } from "@/components/slides/slide-deck";
import { CodePlayground } from "@/components/playground/code-playground";
import { ExerciseValidator, type ExerciseConfig } from "@/components/exercises/exercise-validator";
import { QuizEngine, type QuizQuestion } from "@/components/quiz/quiz-engine";

const META: LessonMeta = {
  trackSlug: "programming-essentials-ai",
  moduleSlug: "js-ts-for-ai",
  lessonSlug: "javascript-essentials",
  title: "JavaScript: משתנים, פונקציות, מבני נתונים",
  objectives: [
    "לכתוב ולהבין קוד JS בסיסי: משתנים, פונקציות, תנאים, לולאות",
    "לעבוד עם מערכים ואובייקטים — מבני הנתונים שכל API מחזיר",
    "להריץ ולנפות קוד במעבדת קוד חיה",
  ],
  estMinutes: 30,
  difficulty: "מתחיל",
  prerequisites: ["פרויקט מודול + קפסטון #1: תיק עבודות ראשון בגיט"],
};

const SLIDES: Slide[] = [
  {
    title: "למה JavaScript, ולמה עכשיו?",
    bullets: [
      "JavaScript היא השפה שרוב עולם ה-web ו-AI tooling כתובים בה (כולל האתר הזה!).",
      "Claude Code כותב הרבה קוד JS/TS — כדי לבדוק, להבין ולתקן מה שהוא כותב, אתה צריך שפה משותפת.",
      "המטרה כאן: לא לשנן תחביר, אלא לבנות אינטואיציה שתאפשר לך לקרוא קוד AI-generated בביטחון.",
    ],
  },
  {
    title: "מבני הנתונים שתראה כל הזמן",
    bullets: [
      "אובייקט { } — אוסף של מפתח-ערך, בדיוק כמו תשובת JSON מ-API.",
      "מערך [ ] — רשימה מסודרת, כמו רשימת הודעות בשיחה עם AI.",
      "כל תשובה מ-Claude API, למשל, מגיעה כאובייקט עם שדה content שהוא מערך.",
    ],
  },
];

const EXERCISE: ExerciseConfig = {
  id: "js-essentials-ex1",
  prompt:
    "כתוב פונקציה בשם extractNames שמקבלת מערך של אובייקטים (כל אחד עם שדה name) ומחזירה מערך של השמות בלבד. זו בדיוק סוג הפעולה שתעשה על תשובות API.",
  starterCode: `function extractNames(users) {
  // users הוא מערך כמו: [{ name: "דנה", age: 28 }, { name: "יוסי", age: 34 }]
  // TODO: החזר מערך של השמות בלבד
}`,
  hints: [
    "יש פונקציית מערך שמייצרת מערך חדש על ידי הפעלת פעולה על כל איבר — מה שמה?",
    "נסה: return users.map(u => u.name);",
    "טעות נפוצה: לשכוח להחזיר (return) את התוצאה של map, ולא רק להריץ אותה.",
  ],
  solutionCode: `function extractNames(users) {
  return users.map(u => u.name);
}`,
  check: (userFn) => {
    const fn = userFn as (u: { name: string; age: number }[]) => string[];
    try {
      const result = fn([
        { name: "דנה", age: 28 },
        { name: "יוסי", age: 34 },
      ]);
      if (JSON.stringify(result) === JSON.stringify(["דנה", "יוסי"])) {
        return { passed: true, message: "מדויק! בדיוק ככה מחלצים שדה ספציפי ממערך אובייקטים." };
      }
      return { passed: false, message: `קיבלתי ${JSON.stringify(result)}, ציפיתי ל-["דנה","יוסי"].` };
    } catch (e) {
      return { passed: false, message: `שגיאת הרצה: ${(e as Error).message}` };
    }
  },
};

const QUIZ: QuizQuestion[] = [
  {
    id: "q1",
    question: "מה ההבדל בין מערך לאובייקט ב-JavaScript?",
    options: [
      "אין הבדל",
      "מערך הוא רשימה מסודרת; אובייקט הוא אוסף מפתח-ערך",
      "אובייקט תמיד מהיר יותר",
      "מערך יכול להכיל רק מספרים",
    ],
    correctIndex: 1,
    explanation: "מערכים מסודרים ומבוססים על אינדקס; אובייקטים מבוססים על מפתחות בעלי שם.",
  },
  {
    id: "q2",
    question: "מה עושה users.map(u => u.name)?",
    options: [
      "מוחק את השדה name מכל אובייקט",
      "יוצר מערך חדש עם רק שדה name מכל אובייקט",
      "ממיין את המערך לפי name",
      "סופר כמה אובייקטים יש",
    ],
    correctIndex: 1,
    explanation: "map מייצר מערך חדש שבו כל איבר הוא תוצאה של הפונקציה שהופעלה על האיבר המקורי.",
  },
];

const SECTIONS: LessonSection[] = [
  { id: "slides", label: "מצגת: הרעיון המרכזי", content: <SlideDeck slides={SLIDES} /> },
  {
    id: "playground",
    label: "דוגמה חיה: עבודה עם נתונים",
    content: (
      <div>
        <p className="mb-3 text-sm text-muted">
          הרץ ושחק עם הקוד — נסה לשנות את המערך ולראות איך הפלט משתנה:
        </p>
        <CodePlayground
          initialCode={`const messages = [\n  { role: "user", text: "מה זה MCP?" },\n  { role: "assistant", text: "פרוטוקול לחיבור כלים ל-AI" },\n];\n\nconst userMessages = messages.filter(m => m.role === "user");\nconsole.log("הודעות משתמש:", userMessages.length);\nconsole.log(userMessages[0].text);`}
        />
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
          ["Variable", "מיכל בעל שם לאחסון ערך (let/const)."],
          ["Function", "בלוק קוד שניתן להריץ שוב ושוב עם קלטים שונים."],
          ["Array", "רשימה מסודרת של ערכים."],
          ["Object", "אוסף מפתחות-ערכים בעלי שם."],
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
            "אני לא זוכר תחביר בעל פה — זה בעיה?",
            "לא. גם מפתחים ותיקים משתמשים בכלים (כולל Claude Code) לתחביר. המטרה היא להבין את ההיגיון והמבנה.",
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
          במעבדת הקוד למעלה, הוסף שדה timestamp לכל הודעה, וכתוב שורת קוד שמדפיסה רק את ההודעות
          מה-assistant.
        </p>
      </div>
    ),
  },
];

export default function Page() {
  return <LessonShell meta={META} sections={SECTIONS} />;
}
