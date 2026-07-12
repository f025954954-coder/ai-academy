"use client";

import { Send, Clock, CheckCircle2, XCircle } from "lucide-react";
import { LessonShell, type LessonMeta, type LessonSection } from "@/components/lesson/lesson-shell";
import { SlideDeck, type Slide } from "@/components/slides/slide-deck";
import { StepDiagram, type DiagramStep } from "@/components/diagrams/step-diagram";
import { CodePlayground } from "@/components/playground/code-playground";
import { ExerciseValidator, type ExerciseConfig } from "@/components/exercises/exercise-validator";
import { QuizEngine, type QuizQuestion } from "@/components/quiz/quiz-engine";

const META: LessonMeta = {
  trackSlug: "programming-essentials-ai",
  moduleSlug: "js-ts-for-ai",
  lessonSlug: "async-fetch-apis",
  title: "Async JavaScript ו-fetch — לדבר עם שירותים חיצוניים",
  objectives: [
    "להבין Promises ו-async/await — איך JS מתמודד עם פעולות שלוקחות זמן",
    "להשתמש ב-fetch כדי לקרוא ל-API אמיתי ולקבל תשובה",
    "להבין את זה כתשתית הכרחית לכל אינטגרציה עם LLM API בהמשך",
  ],
  estMinutes: 30,
  difficulty: "בינוני",
  prerequisites: ["JavaScript: משתנים, פונקציות, מבני נתונים"],
};

const SLIDES: Slide[] = [
  {
    title: "הבעיה: פעולות שלוקחות זמן",
    bullets: [
      "קריאה ל-Claude API לוקחת זמן (שנייה-שתיים) — אי אפשר 'לחכות' בלי לתקוע את כל הדף.",
      "Promise הוא 'הבטחה' לתוצאה עתידית — הקוד ממשיך לרוץ בזמן שממתינים.",
      "async/await היא תחביר נוח שגורם לקוד אסינכרוני להיראות כמו קוד רגיל, שורה-שורה.",
    ],
  },
  {
    title: "fetch — הדרך לקרוא ל-API",
    bullets: [
      "fetch(url) שולחת בקשת HTTP ומחזירה Promise.",
      "await response.json() ממתין לתשובה ומפרש אותה כאובייקט JavaScript.",
      "זו בדיוק הפעולה שתעשה כשתקרא ל-Claude API בפרויקטים הבאים.",
    ],
  },
];

const PROMISE_STEPS: DiagramStep[] = [
  { icon: Send, label: "יצירת בקשה", detail: "הקוד קורא ל-fetch() ומקבל מיד Promise — 'הבטחה' לתשובה עתידית." },
  { icon: Clock, label: "Pending (ממתין)", detail: "הבקשה בדרך לשרת. שאר הקוד (שלא תלוי בתשובה) ממשיך לרוץ." },
  { icon: CheckCircle2, label: "Fulfilled (הצליח)", detail: "התשובה חזרה! await מחזיר את הערך, והקוד ממשיך לשורה הבאה." },
  { icon: XCircle, label: "Rejected (נכשל)", detail: "אם משהו השתבש (רשת/שרת), ה-Promise נדחה — טוב לתפוס עם try/catch." },
];

const EXERCISE: ExerciseConfig = {
  id: "async-fetch-ex1",
  prompt:
    "כתוב פונקציית async בשם getUserAge שמקבלת פונקציה fetchUser (שמחזירה Promise שמתממש לאובייקט { name, age }), וממתינה (await) לתוצאה ומחזירה רק את הגיל.",
  starterCode: `async function getUserAge(fetchUser) {
  // TODO: await לתוצאה של fetchUser(), והחזר רק את age
}`,
  hints: [
    "בתוך פונקציית async אפשר להשתמש ב-await לפני קריאה שמחזירה Promise.",
    "נסה: const user = await fetchUser(); return user.age;",
    "טעות נפוצה: לשכוח את המילה async לפני function — בלעדיה אי אפשר להשתמש ב-await.",
  ],
  solutionCode: `async function getUserAge(fetchUser) {
  const user = await fetchUser();
  return user.age;
}`,
  check: async (userFn) => {
    const fn = userFn as (f: () => Promise<{ name: string; age: number }>) => Promise<number>;
    try {
      const mockFetch = () => Promise.resolve({ name: "דנה", age: 29 });
      const result = await fn(mockFetch);
      if (result === 29) {
        return { passed: true, message: "מדויק! חיכית נכון לתוצאה האסינכרונית וחילצת את השדה הנכון." };
      }
      return { passed: false, message: `קיבלתי ${result}, ציפיתי ל-29.` };
    } catch (e) {
      return { passed: false, message: `שגיאת הרצה: ${(e as Error).message}` };
    }
  },
};

const QUIZ: QuizQuestion[] = [
  {
    id: "q1",
    question: "מה מחזירה קריאה ל-fetch()?",
    options: ["את התשובה ישירות", "Promise שיתממש לתשובה בעתיד", "undefined תמיד", "שגיאה תמיד"],
    correctIndex: 1,
    explanation: "fetch מחזירה Promise מיד — התשובה עצמה מגיעה כשה-Promise מתממש (fulfilled).",
  },
  {
    id: "q2",
    question: "למה צריך await לפני קריאה שמחזירה Promise?",
    options: [
      "זה לא חובה אף פעם",
      "כדי 'לחכות' לתוצאה בצורה נוחה לפני שממשיכים לשורה הבאה",
      "כדי למחוק את ה-Promise",
      "await משמש רק לבדיקת שגיאות",
    ],
    correctIndex: 1,
    explanation: "await משהה את הפונקציה עד שה-Promise מתממש, ואז ממשיך עם התוצאה.",
  },
];

const SECTIONS: LessonSection[] = [
  { id: "slides", label: "מצגת: הרעיון המרכזי", content: <SlideDeck slides={SLIDES} /> },
  {
    id: "diagram",
    label: "דיאגרמה אינטראקטיבית: מחזור חיים של Promise",
    content: <StepDiagram steps={PROMISE_STEPS} />,
  },
  {
    id: "playground",
    label: "דוגמה חיה: async/await בפעולה",
    content: (
      <div>
        <p className="mb-3 text-sm text-muted">
          הקוד מדמה קריאת רשת (עם השהיה קטנה) — בדיוק כמו קריאה אמיתית ל-API. הרץ וצפה בפלט:
        </p>
        <CodePlayground
          initialCode={`function mockFetchWeather() {\n  return new Promise((resolve) => {\n    setTimeout(() => resolve({ city: "תל אביב", tempC: 28 }), 500);\n  });\n}\n\nasync function main() {\n  console.log("שולח בקשה...");\n  const weather = await mockFetchWeather();\n  console.log("התקבלה תשובה:", weather.city, weather.tempC + "°C");\n}\n\nmain();`}
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
          ["Promise", "אובייקט שמייצג תוצאה עתידית של פעולה אסינכרונית."],
          ["async/await", "תחביר שגורם לקוד אסינכרוני להיראות כמו קוד סינכרוני רגיל."],
          ["fetch", "פונקציה מובנית לשליחת בקשות HTTP מ-JavaScript."],
          ["JSON", "פורמט טקסט נפוץ להעברת מידע מובנה בין שרת ללקוח."],
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
            "מה ההבדל בין .then() לבין async/await?",
            "שניהם עושים את אותו הדבר — async/await הוא רק תחביר נוח יותר לקריאה שנראה כמו קוד רגיל, במקום לשרשר .then().",
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
          במעבדה למעלה, הוסף פונקציה נוספת mockFetchNews שמדמה קריאה נוספת, וקרא לשתי הפונקציות
          ברצף בתוך main() עם await.
        </p>
      </div>
    ),
  },
];

export default function Page() {
  return <LessonShell meta={META} sections={SECTIONS} />;
}
