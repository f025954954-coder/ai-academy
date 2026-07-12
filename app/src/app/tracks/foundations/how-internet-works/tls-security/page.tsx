"use client";

import { Laptop, ShieldCheck } from "lucide-react";
import { LessonShell, type LessonMeta, type LessonSection } from "@/components/lesson/lesson-shell";
import { SlideDeck, type Slide } from "@/components/slides/slide-deck";
import { NetworkJourney, type JourneyNode, type JourneyHop } from "@/components/simulators/network-journey";
import { ExerciseValidator, type ExerciseConfig } from "@/components/exercises/exercise-validator";
import { QuizEngine, type QuizQuestion } from "@/components/quiz/quiz-engine";

const META: LessonMeta = {
  trackSlug: "foundations",
  moduleSlug: "how-internet-works",
  lessonSlug: "tls-security",
  title: "אבטחת תשתית בסיסית: TLS, תעודות, HTTPS",
  objectives: [
    "להבין למה HTTP רגיל לא בטוח וHTTPS פותר את זה",
    "להבין את השלבים הבסיסיים ב-TLS Handshake",
    "להבין מהי תעודה דיגיטלית ומי 'מאשר' אותה",
  ],
  estMinutes: 25,
  difficulty: "בינוני",
  prerequisites: ["שרתים, לקוחות, ודפדפנים — מי עושה מה"],
};

const SLIDES: Slide[] = [
  {
    title: "איזו בעיה זה פותר?",
    bullets: [
      "HTTP רגיל שולח מידע כטקסט גלוי — מי שמאזין לרשת (Wi-Fi ציבורי!) יכול לקרוא הכל, כולל סיסמאות.",
      "HTTPS = HTTP + הצפנה (TLS) — המידע מוצפן כך שרק הדפדפן והשרת יכולים לקרוא אותו.",
      "בלי HTTPS, כל טופס התחברות באתר הוא סיכון אבטחה חמור.",
    ],
  },
  {
    title: "מה זו תעודה דיגיטלית (Certificate)?",
    bullets: [
      "תעודה מאמתת שהשרת הוא באמת מי שהוא טוען שהוא (למשל, שאתה מדבר עם bank.com האמיתי ולא עם מתחזה).",
      "התעודה מונפקת על ידי גורם מהימן (Certificate Authority) שכולם סומכים עליו.",
      "הדפדפן שלך כבר 'סומך' מראש ברשימת CA-ים מוכרים — לכן הוא יכול לאמת תעודות אוטומטית.",
    ],
  },
  {
    title: "TLS Handshake — בקצרה",
    bullets: [
      "לפני שליחת מידע רגיש, הדפדפן והשרת 'לוחצים ידיים' דיגיטלית כדי לסכם מפתחות הצפנה משותפים.",
      "זה קורה תוך מילישניות בכל פעם שאתה נכנס לאתר HTTPS — בלי שתשים לב.",
      "אחרי ה-handshake, כל המידע שזורם ביניכם מוצפן.",
    ],
  },
];

const NODES: JourneyNode[] = [
  { id: "browser", label: "הדפדפן שלך", icon: Laptop },
  { id: "server", label: "שרת האתר", icon: ShieldCheck },
];

const HOPS: JourneyHop[] = [
  {
    fromNodeId: "browser",
    toNodeId: "server",
    label: "1. Client Hello",
    detail: "הדפדפן פותח בהצעה: 'אני תומך בשיטות ההצפנה הבאות, בוא נתחיל'.",
  },
  {
    fromNodeId: "server",
    toNodeId: "browser",
    label: "2. Server Hello + תעודה",
    detail: "השרת בוחר שיטת הצפנה ושולח את התעודה הדיגיטלית שלו לאימות זהותו.",
  },
  {
    fromNodeId: "browser",
    toNodeId: "server",
    label: "3. אימות ותיאום מפתח",
    detail: "הדפדפן מאמת את התעודה מול רשימת CA-ים מוכרים, ושני הצדדים מסכימים על מפתח הצפנה משותף.",
  },
  {
    fromNodeId: "server",
    toNodeId: "browser",
    label: "4. חיבור מוצפן",
    detail: "מעכשיו כל התקשורת מוצפנת עם המפתח שסוכם — זה מה שהמנעול הירוק בדפדפן מייצג.",
  },
];

const EXERCISE: ExerciseConfig = {
  id: "tls-ex1",
  prompt:
    "כתוב פונקציה בשם isSecureURL שמקבלת כתובת URL (מחרוזת) ומחזירה true אם היא מתחילה ב-'https://', אחרת false.",
  starterCode: `function isSecureURL(url) {
  // TODO: החזר true אם url מתחיל ב-'https://'
}`,
  hints: [
    "יש לך פונקציית מחרוזת שבודקת אם מחרוזת מתחילה ברצף תווים מסוים.",
    "נסה: return url.startsWith('https://');",
    "טעות נפוצה: בדיקה עם includes() במקום startsWith() — includes תחזיר true גם אם 'https://' מופיע באמצע המחרוזת, לא רק בהתחלה.",
  ],
  solutionCode: `function isSecureURL(url) {
  return url.startsWith('https://');
}`,
  check: (userFn) => {
    const fn = userFn as (u: string) => boolean;
    try {
      const a = fn("https://academy.ai");
      const b = fn("http://academy.ai");
      if (a === true && b === false) {
        return { passed: true, message: "מדויק! זיהית נכון אתרים מאובטחים ולא מאובטחים." };
      }
      return { passed: false, message: `עבור https קיבלתי ${a}, עבור http קיבלתי ${b}.` };
    } catch (e) {
      return { passed: false, message: `שגיאת הרצה: ${(e as Error).message}` };
    }
  },
};

const QUIZ: QuizQuestion[] = [
  {
    id: "q1",
    question: "מה התפקיד העיקרי של תעודה דיגיטלית (Certificate)?",
    options: [
      "להאיץ את האתר",
      "לאמת שהשרת הוא באמת מי שהוא טוען שהוא",
      "לדחוס את המידע",
      "לתרגם שפות",
    ],
    correctIndex: 1,
    explanation: "התעודה מאמתת זהות, כדי שתדע שאתה מדבר עם השרת האמיתי ולא עם מתחזה.",
  },
  {
    id: "q2",
    question: "מתי קורה ה-TLS Handshake?",
    options: [
      "פעם ביום",
      "בתחילת כל חיבור HTTPS, לפני שליחת מידע רגיש",
      "רק כשיש שגיאה",
      "הוא לא קיים באמת",
    ],
    correctIndex: 1,
    explanation: "ה-handshake קורה בתחילת כל חיבור HTTPS כדי לסכם מפתחות הצפנה לפני שליחת מידע.",
  },
];

const SECTIONS: LessonSection[] = [
  { id: "slides", label: "מצגת: הרעיון המרכזי", content: <SlideDeck slides={SLIDES} /> },
  {
    id: "simulator",
    label: "סימולטור: עקוב אחרי ה-TLS Handshake",
    content: <NetworkJourney nodes={NODES} hops={HOPS} />,
  },
  {
    id: "mistakes",
    label: "טעויות נפוצות ו-Best Practices",
    content: (
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-danger/30 bg-danger/5 p-4">
          <p className="mb-2 font-bold text-danger">טעויות נפוצות</p>
          <ul className="space-y-1.5 text-sm">
            <li>להתעלם מאזהרת "החיבור אינו מאובטח" בדפדפן — זה סימן אמיתי לבעיה.</li>
            <li>לחשוב ש-HTTPS "פותר הכל" — הוא מגן על התעבורה, אבל לא על קוד לא מאובטח באתר עצמו.</li>
          </ul>
        </div>
        <div className="rounded-xl border border-success/30 bg-success/5 p-4">
          <p className="mb-2 font-bold text-success">Best Practices</p>
          <ul className="space-y-1.5 text-sm">
            <li>כל אתר עם טפסים (במיוחד התחברות/תשלום) חייב HTTPS ללא יוצא מן הכלל.</li>
            <li>השתמש בשירותים כמו Let&#39;s Encrypt לקבלת תעודות חינם ואוטומטיות.</li>
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
          ["TLS", "פרוטוקול הצפנה שמאבטח תקשורת ברשת (הבסיס ל-HTTPS)."],
          ["Certificate", "תעודה דיגיטלית שמאמתת את זהות השרת."],
          ["Certificate Authority (CA)", "גוף מהימן שמנפיק ומאמת תעודות דיגיטליות."],
          ["Handshake", "תהליך התיאום הראשוני שבו הצדדים מסכימים על מפתחות הצפנה."],
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
            "אם HTTPS מוצפן, למה עדיין יש פריצות אבטחה לאתרים?",
            "HTTPS מגן רק על התעבורה בין הדפדפן לשרת. פריצה יכולה לקרות דרך קוד פגיע באתר, סיסמה חלשה, או פרצה בשרת עצמו — HTTPS לא מגן על כל אלה.",
          ],
          [
            "מה קורה אם תעודה פגה או לא תקינה?",
            "הדפדפן יציג אזהרה חמורה ('החיבור אינו פרטי') ויחסום גישה קלה לאתר, כדי להגן על המשתמש מפני מתחזים אפשריים.",
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
    id: "video",
    label: "חבילת וידאו (סקריפט הפקה)",
    content: (
      <div className="rounded-xl border border-border bg-card p-4 text-sm">
        <p className="mb-2 font-bold">סטוריבורד מקוצר (וידאו מתוכנן, 3 דקות)</p>
        <ol className="list-decimal space-y-1 pr-5">
          <li>0:00-0:25 — אנימציה: מכתב גלוי (HTTP) מול מכתב בכספת נעולה (HTTPS).</li>
          <li>0:25-1:20 — מוטיון גרפיקס: 4 שלבי ה-handshake, מסונכרן עם הסימולטור באתר.</li>
          <li>1:20-2:00 — הדגמת מסך: לחיצה על מנעול הדפדפן, צפייה בפרטי התעודה האמיתיים.</li>
          <li>2:00-2:40 — אנימציה: CA "חותם" על תעודה, הדפדפן בודק את החתימה.</li>
          <li>2:40-3:00 — סיכום + כתוביות.</li>
        </ol>
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
          לחץ על סמל המנעול לצד כתובת האתר הזה בדפדפן שלך, וצפה בפרטי התעודה. מי הנפיק אותה? עד
          מתי היא בתוקף?
        </p>
      </div>
    ),
  },
];

export default function Page() {
  return <LessonShell meta={META} sections={SECTIONS} />;
}
