"use client";

import { MousePointerClick, Server as ServerIcon, Paintbrush, Database } from "lucide-react";
import { LessonShell, type LessonMeta, type LessonSection } from "@/components/lesson/lesson-shell";
import { SlideDeck, type Slide } from "@/components/slides/slide-deck";
import { StepDiagram, type DiagramStep } from "@/components/diagrams/step-diagram";
import { RoleSort, type RoleSortItem } from "@/components/interactive/role-sort";
import { ExerciseValidator, type ExerciseConfig } from "@/components/exercises/exercise-validator";
import { QuizEngine, type QuizQuestion } from "@/components/quiz/quiz-engine";

const META: LessonMeta = {
  trackSlug: "foundations",
  moduleSlug: "how-internet-works",
  lessonSlug: "servers-clients-browsers",
  title: "שרתים, לקוחות, ודפדפנים — מי עושה מה",
  objectives: [
    "להבין את תפקיד הדפדפן כ'לקוח' וה-Server כ'ספק שירות'",
    "להבין את מחזור החיים המלא של טעינת עמוד אינטרנט",
    "לזהות אילו שלבים קורים בצד הלקוח ואילו בצד השרת",
  ],
  estMinutes: 20,
  difficulty: "מתחיל",
  prerequisites: ["פרוטוקול HTTP/HTTPS: בקשה ותגובה"],
};

const SLIDES: Slide[] = [
  {
    title: "מודל Client-Server",
    bullets: [
      "Client (לקוח) = הדפדפן שלך; מבקש מידע ומציג אותו למשתמש.",
      "Server (שרת) = מחשב חזק שמריץ תוכנה, מנהל נתונים, ועונה לבקשות.",
      "זה מודל בסיסי שחוזר בכל מקום: אפליקציית מובייל היא client, שרת ה-API הוא server.",
    ],
  },
  {
    title: "מה קורה בצד הלקוח (Frontend)",
    bullets: [
      "פענוח HTML/CSS/JavaScript שהתקבלו מהשרת.",
      "בניית מה שנקרא DOM (מבנה העמוד) והצגתו ויזואלית.",
      "טיפול באינטראקציה של המשתמש: לחיצות, הקלדה, גלילה.",
    ],
  },
  {
    title: "מה קורה בצד השרת (Backend)",
    bullets: [
      "קבלת בקשות מלקוחות ועיבודן (לוגיקה עסקית).",
      "תקשורת עם מסד נתונים לשליפה/שמירה של מידע.",
      "החזרת תגובה — HTML מוכן, או JSON שהלקוח יעבד בעצמו.",
    ],
  },
];

const FLOW_STEPS: DiagramStep[] = [
  {
    icon: MousePointerClick,
    label: "בקשת משתמש",
    detail: "המשתמש מקליד כתובת או לוחץ קישור — הדפדפן (client) יוזם בקשה.",
  },
  {
    icon: ServerIcon,
    label: "עיבוד בשרת",
    detail: "השרת (server) מקבל את הבקשה, מריץ לוגיקה עסקית, ולעיתים שואל מסד נתונים.",
  },
  {
    icon: Database,
    label: "מסד נתונים",
    detail: "אם צריך מידע שמור (כמו רשימת מוצרים), השרת שואל את מסד הנתונים ומקבל תשובה.",
  },
  {
    icon: Paintbrush,
    label: "רינדור בלקוח",
    detail: "הדפדפן מקבל את התגובה (HTML/JSON) ובונה/מעדכן את מה שהמשתמש רואה על המסך.",
  },
];

const ROLE_ITEMS: RoleSortItem[] = [
  { id: "1", label: "בניית ה-DOM והצגת העמוד למשתמש", correctBucket: "client" },
  { id: "2", label: "שאילתה למסד הנתונים", correctBucket: "server" },
  { id: "3", label: "טיפול בלחיצת כפתור", correctBucket: "client" },
  { id: "4", label: "אימות סיסמה מול מסד הנתונים", correctBucket: "server" },
  { id: "5", label: "הרצת אנימציית CSS", correctBucket: "client" },
  { id: "6", label: "יצירת קובץ PDF בעל צד השרת", correctBucket: "server" },
];

const EXERCISE: ExerciseConfig = {
  id: "servers-clients-ex1",
  prompt:
    "כתוב פונקציה בשם whoHandles שמקבלת שם משימה (מחרוזת) ומחזירה 'client' אם המשימה כוללת את המילה 'render' או 'click', אחרת 'server'.",
  starterCode: `function whoHandles(task) {
  // TODO: אם task מכיל 'render' או 'click' -> 'client', אחרת -> 'server'
}`,
  hints: [
    "אפשר להשתמש ב-task.includes('render') כדי לבדוק אם מחרוזת מכילה תת-מחרוזת.",
    "נסה: return (task.includes('render') || task.includes('click')) ? 'client' : 'server';",
    "טעות נפוצה: רגישות לאותיות — ודא ש-task ו-'render'/'click' כתובים באותה צורה (קטנות/גדולות).",
  ],
  solutionCode: `function whoHandles(task) {
  return (task.includes('render') || task.includes('click')) ? 'client' : 'server';
}`,
  check: (userFn) => {
    const fn = userFn as (t: string) => string;
    try {
      const a = fn("render the page");
      const b = fn("query the database");
      if (a === "client" && b === "server") {
        return { passed: true, message: "מדויק! זיהית נכון מי מטפל במה." };
      }
      return { passed: false, message: `עבור 'render the page' קיבלתי '${a}', עבור 'query the database' קיבלתי '${b}'.` };
    } catch (e) {
      return { passed: false, message: `שגיאת הרצה: ${(e as Error).message}` };
    }
  },
};

const QUIZ: QuizQuestion[] = [
  {
    id: "q1",
    question: "מי בדרך כלל אחראי לבניית ה-DOM והצגת העמוד?",
    options: ["השרת", "הדפדפן (client)", "מסד הנתונים", "שרת ה-DNS"],
    correctIndex: 1,
    explanation: "בניית ה-DOM ורינדור העמוד הוא תפקיד הדפדפן (client-side).",
  },
  {
    id: "q2",
    question: "מי בדרך כלל מתקשר ישירות עם מסד הנתונים?",
    options: ["הדפדפן", "השרת", "שרת ה-DNS", "אף אחד"],
    correctIndex: 1,
    explanation: "מטעמי אבטחה, הדפדפן כמעט אף פעם לא ניגש ישירות ל-DB — זה תפקיד השרת.",
  },
];

const SECTIONS: LessonSection[] = [
  { id: "slides", label: "מצגת: הרעיון המרכזי", content: <SlideDeck slides={SLIDES} /> },
  {
    id: "diagram",
    label: "דיאגרמה אינטראקטיבית: מחזור חיים של בקשה",
    content: <StepDiagram steps={FLOW_STEPS} />,
  },
  {
    id: "rolesort",
    label: "משחק: מי עושה מה?",
    content: (
      <RoleSort
        items={ROLE_ITEMS}
        buckets={[
          { id: "client", label: "דפדפן (Client)" },
          { id: "server", label: "שרת (Server)" },
        ]}
      />
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
          ["Client", "התוכנה שמבקשת מידע ומציגה אותו (למשל דפדפן)."],
          ["Server", "המחשב שמריץ לוגיקה עסקית ועונה לבקשות."],
          ["DOM", "המבנה שהדפדפן בונה כדי לייצג ולהציג עמוד HTML."],
          ["Backend/Frontend", "שמות נפוצים לצד השרת ולצד הלקוח בהתאמה."],
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
            "מה זה 'Server-Side Rendering' (SSR) אם כך שהצד לקוח בונה DOM?",
            "ב-SSR השרת בונה חלק מה-HTML מראש (כדי לחסוך זמן/SEO), אבל הדפדפן עדיין 'משתלט' על העמוד (hydration) ומטפל באינטראקציות מאותה נקודה.",
          ],
          [
            "האם שרת יכול להיות גם client?",
            "כן! שרת יכול לפנות לשרת אחר (כמו API חיצוני) — במקרה הזה הוא פועל בתור client כלפי אותו שרת.",
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
    id: "recap",
    label: "רגע לפני שממשיכים: בקצרה",
    content: (
      <div className="rounded-xl border border-border bg-card p-4 text-sm">
        <p className="mb-2 font-bold">מי עושה מה: לקוח מול שרת</p>
        <ol className="list-decimal space-y-1.5 pr-5">
          <li><strong>Client (דפדפן)</strong> — מציג את הממשק, מגיב לקליקים, שולח בקשות — "חזית הבית" של המסעדה.</li>
          <li><strong>Server</strong> — מריץ לוגיקה, שומר/שולף מהמסד נתונים, מחזיר תוצאות — "המטבח" שלא רואים.</li>
          <li>כל אתר אמיתי הוא שיתוף פעולה בין השניים — אף אחד לבד לא מספיק.</li>
        </ol>
        <p className="mt-3 text-xs text-muted">
          פתח את כלי המפתחים בדפדפן (F12) בכל אתר, עבור ללשונית Network, ורענן את הדף — תראה
          בזמן אמת את הבקשות שהלקוח שולח לשרת ואת התשובות שחוזרות.
        </p>
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
          בחר אתר שאתה משתמש בו הרבה (כמו רשת חברתית). נסה לרשום 3 דברים שקורים לדעתך בצד הלקוח
          ו-3 דברים שקורים בצד השרת.
        </p>
      </div>
    ),
  },
];

export default function Page() {
  return <LessonShell meta={META} sections={SECTIONS} />;
}
