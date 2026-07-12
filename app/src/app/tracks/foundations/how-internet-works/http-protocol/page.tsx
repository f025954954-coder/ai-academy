"use client";

import { LessonShell, type LessonMeta, type LessonSection } from "@/components/lesson/lesson-shell";
import { SlideDeck, type Slide } from "@/components/slides/slide-deck";
import { HttpPlayground } from "@/components/simulators/http-playground";
import { ExerciseValidator, type ExerciseConfig } from "@/components/exercises/exercise-validator";
import { QuizEngine, type QuizQuestion } from "@/components/quiz/quiz-engine";

const META: LessonMeta = {
  trackSlug: "foundations",
  moduleSlug: "how-internet-works",
  lessonSlug: "http-protocol",
  title: "פרוטוקול HTTP/HTTPS: בקשה ותגובה",
  objectives: [
    "להבין את מבנה בקשת HTTP (method, headers, body)",
    "להבין קודי סטטוס נפוצים (200, 404, 500 ועוד) ומה כל אחד אומר",
    "לשלוח בקשות אמיתיות למעבדת HTTP אינטראקטיבית ולפרש את התגובה",
  ],
  estMinutes: 25,
  difficulty: "מתחיל",
  prerequisites: ["רשתות, כתובות IP ו-DNS"],
};

const SLIDES: Slide[] = [
  {
    title: "איזו בעיה זה פותר?",
    bullets: [
      "אחרי ש-DNS נתן לנו כתובת IP, איך בדיוק דפדפן 'מבקש' דף אינטרנט מהשרת?",
      "HTTP הוא 'השפה המשותפת' שדפדפנים ושרתים מדברים בה — פרוטוקול בקשה-תגובה פשוט.",
      "בלי סטנדרט משותף, כל אתר היה צריך 'שפה' משלו — כאוס מוחלט.",
    ],
  },
  {
    title: "אנטומיה של בקשת HTTP",
    bullets: [
      "Method: מה רוצים לעשות — GET (לקבל), POST (ליצור), PUT (לעדכן), DELETE (למחוק).",
      "Path: איזה משאב — כמו /api/lessons/5.",
      "Headers: מטא-דאטה — סוג תוכן, אימות, שפה מועדפת ועוד.",
      "Body: התוכן עצמו (רלוונטי בעיקר ל-POST/PUT).",
    ],
  },
  {
    title: "קודי סטטוס — מה השרת עונה",
    bullets: [
      "2xx = הצלחה (200 OK, 201 Created).",
      "4xx = שגיאת לקוח (404 Not Found, 401 Unauthorized) — אתה עשית משהו לא נכון.",
      "5xx = שגיאת שרת (500 Internal Server Error) — השרת עצמו נכשל.",
    ],
  },
];

const EXERCISE: ExerciseConfig = {
  id: "http-protocol-ex1",
  prompt:
    "כתוב פונקציה בשם classifyStatus שמקבלת קוד סטטוס HTTP (מספר) ומחזירה 'success' עבור 2xx, 'client-error' עבור 4xx, 'server-error' עבור 5xx, ו-'other' לכל השאר.",
  starterCode: `function classifyStatus(code) {
  // TODO: סווג את קוד הסטטוס לפי הספרה הראשונה שלו
}`,
  hints: [
    "אפשר לבדוק את הספרה הראשונה על ידי חלוקה שלמה ב-100: Math.floor(code / 100)",
    "נסה: const first = Math.floor(code / 100); if (first === 2) return 'success'; ...",
    "טעות נפוצה: להשתמש בהשוואת טווח כמו code >= 200 && code < 300 זה גם נכון, אבל ודא שאתה מכסה את כל המקרים (2xx, 4xx, 5xx, ואחרת 'other').",
  ],
  solutionCode: `function classifyStatus(code) {
  const first = Math.floor(code / 100);
  if (first === 2) return 'success';
  if (first === 4) return 'client-error';
  if (first === 5) return 'server-error';
  return 'other';
}`,
  check: (userFn) => {
    const fn = userFn as (c: number) => string;
    try {
      const results = [fn(200), fn(404), fn(500), fn(301)];
      const expected = ["success", "client-error", "server-error", "other"];
      const ok = results.every((r, i) => r === expected[i]);
      if (ok) {
        return { passed: true, message: "מדויק! סיווגת נכון את כל טווחי קודי הסטטוס." };
      }
      return {
        passed: false,
        message: `קיבלתי [${results.join(", ")}], ציפיתי ל-[${expected.join(", ")}].`,
      };
    } catch (e) {
      return { passed: false, message: `שגיאת הרצה: ${(e as Error).message}` };
    }
  },
};

const QUIZ: QuizQuestion[] = [
  {
    id: "q1",
    question: "איזה HTTP method משתמשים כדי ליצור משאב חדש?",
    options: ["GET", "POST", "DELETE", "HEAD"],
    correctIndex: 1,
    explanation: "POST משמש ליצירת משאב חדש בשרת (למשל הרשמת משתמש חדש).",
  },
  {
    id: "q2",
    question: "קוד סטטוס 404 אומר...",
    options: [
      "השרת קרס",
      "המשאב המבוקש לא נמצא",
      "הבקשה הצליחה",
      "אין הרשאה",
    ],
    correctIndex: 1,
    explanation: "404 Not Found — המשאב שביקשת לא קיים בשרת.",
  },
  {
    id: "q3",
    question: "מה ההבדל בין שגיאת 4xx לשגיאת 5xx?",
    options: [
      "אין הבדל",
      "4xx = טעות של הלקוח, 5xx = טעות של השרת",
      "4xx = טעות של השרת, 5xx = טעות של הלקוח",
      "4xx תמיד חמור יותר",
    ],
    correctIndex: 1,
    explanation: "4xx מציין שהבקשה עצמה הייתה בעייתית; 5xx מציין שהשרת נכשל בעיבודה.",
  },
];

const SECTIONS: LessonSection[] = [
  { id: "slides", label: "מצגת: הרעיון המרכזי", content: <SlideDeck slides={SLIDES} /> },
  {
    id: "simulator",
    label: "מעבדה אינטראקטיבית: שלח בקשת HTTP אמיתית",
    content: <HttpPlayground />,
  },
  {
    id: "mistakes",
    label: "טעויות נפוצות ו-Best Practices",
    content: (
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-danger/30 bg-danger/5 p-4">
          <p className="mb-2 font-bold text-danger">טעויות נפוצות</p>
          <ul className="space-y-1.5 text-sm">
            <li>להשתמש ב-GET כשמבצעים פעולה שמשנה מידע (לא idempotent) — זה שובר את סמנטיקת HTTP.</li>
            <li>להתעלם מקוד הסטטוס ולבדוק רק את תוכן התגובה — קוד הסטטוס הוא המקור הראשון לאמת.</li>
          </ul>
        </div>
        <div className="rounded-xl border border-success/30 bg-success/5 p-4">
          <p className="mb-2 font-bold text-success">Best Practices</p>
          <ul className="space-y-1.5 text-sm">
            <li>תמיד תטפל בקוד סטטוס — הצלחה ושגיאה כאחד, לא רק ה-"happy path".</li>
            <li>בחר method לפי הפעולה בפועל: GET לקריאה, POST ליצירה, PUT/PATCH לעדכון, DELETE למחיקה.</li>
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
          ["HTTP", "פרוטוקול תקשורת בקשה-תגובה בין דפדפנים לשרתים."],
          ["Method", "הפעולה המבוקשת: GET, POST, PUT, DELETE ועוד."],
          ["Status Code", "מספר בן 3 ספרות שמתאר את תוצאת הבקשה."],
          ["Header", "מטא-דאטה שמצורפת לבקשה או לתגובה."],
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
            "מה ההבדל בין PUT ל-PATCH?",
            "PUT בדרך כלל מחליף את כל המשאב, בעוד PATCH מעדכן רק חלק ממנו. בפועל הרבה APIs מטשטשים את ההבדל.",
          ],
          [
            "האם אפשר לשלוח body בבקשת GET?",
            "טכנית כן, אבל זה לא מקובל ורוב השרתים/ספריות מתעלמים ממנו — GET אמור לשמש רק לקריאת מידע.",
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
        <p className="mb-2 font-bold">HTTP כמו מסעדה: לקוח מזמין, מלצר מגיש</p>
        <ol className="list-decimal space-y-1.5 pr-5">
          <li><strong>בקשה (request)</strong> — method (GET/POST וכו&#39;) + path + headers + body — כמו "הזמנה" מפורטת למלצר.</li>
          <li><strong>תשובה (response)</strong> — status code + headers + body — כמו המנה שמגיעה בחזרה, עם "תג" שאומר אם ההזמנה הצליחה.</li>
          <li><strong>קודי סטטוס</strong> — 2xx = הצליח, 4xx = טעות מצד הלקוח, 5xx = טעות מצד השרת — בדיוק כמו רמזור.</li>
        </ol>
        <p className="mt-3 text-xs text-muted">
          חזור למעבדת ה-HTTP החיה למעלה ונסה לשלוח בקשה שתקבל בכוונה קוד 4xx — זו הדרך הכי טובה
          להבין את ההבדל בין טעות לקוח לטעות שרת בפועל.
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
          פתח את כלי המפתחים בדפדפן (F12) → לשונית Network, גלוש לאתר כלשהו, ומצא בקשת GET אחת
          ובקשה אחת עם סטטוס שאינו 200. מה קרה בכל אחת?
        </p>
      </div>
    ),
  },
];

export default function Page() {
  return <LessonShell meta={META} sections={SECTIONS} />;
}
