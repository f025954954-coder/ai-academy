"use client";

import { Laptop, Globe2, Server, BookOpenCheck } from "lucide-react";
import { LessonShell, type LessonMeta, type LessonSection } from "@/components/lesson/lesson-shell";
import { SlideDeck, type Slide } from "@/components/slides/slide-deck";
import { NetworkJourney, type JourneyNode, type JourneyHop } from "@/components/simulators/network-journey";
import { ExerciseValidator, type ExerciseConfig } from "@/components/exercises/exercise-validator";
import { QuizEngine, type QuizQuestion } from "@/components/quiz/quiz-engine";

const META: LessonMeta = {
  trackSlug: "foundations",
  moduleSlug: "how-internet-works",
  lessonSlug: "ip-dns-journey",
  title: "רשתות, כתובות IP ו-DNS",
  objectives: [
    "להבין מהי כתובת IP ולמה כל מכשיר ברשת צריך אחת",
    "להבין איך DNS מתרגם שמות דומיין (google.com) לכתובות IP",
    "לעקוב אחרי מסע חבילת מידע שלב-אחר-שלב מהדפדפן ועד השרת ובחזרה",
  ],
  estMinutes: 25,
  difficulty: "מתחיל",
  prerequisites: ["פרויקט: מחשב צעצוע ויזואלי"],
};

const SLIDES: Slide[] = [
  {
    title: "איזו בעיה זה פותר?",
    bullets: [
      "כשאתה מקליד google.com, המחשב שלך צריך לדעת בדיוק לאיזה שרת (מתוך מיליארדים) לפנות.",
      "בלי כתובת ייחודית, אין דרך 'לשלוח מכתב' לשרת הנכון — בדיוק כמו שצריך כתובת בית לדואר רגיל.",
      "DNS פותר בעיה נוספת: אנשים זוכרים שמות (google.com), לא מספרים (142.250.185.78).",
    ],
  },
  {
    title: "כתובת IP",
    bullets: [
      "כל מכשיר המחובר לאינטרנט מקבל כתובת IP ייחודית (זמנית או קבועה).",
      "זה בדיוק כמו כתובת דואר: מספיק כדי לדעת בדיוק לאן לשלוח מידע.",
      "יש שתי גרסאות: IPv4 (למשל 142.250.185.78) ו-IPv6 החדשה יותר (הרבה יותר כתובות אפשריות).",
    ],
  },
  {
    title: "DNS — ספר הטלפונים של האינטרנט",
    bullets: [
      "DNS (Domain Name System) הוא מנגנון שמתרגם שמות דומיין לכתובות IP.",
      "כשאתה מקליד google.com, המחשב שלך שואל 'שרת DNS' — 'מה הכתובת IP של google.com?'",
      "התשובה חוזרת תוך אלפיות שנייה, והדפדפן שלך פונה ישירות לכתובת ה-IP שהתקבלה.",
    ],
  },
];

const NODES: JourneyNode[] = [
  { id: "browser", label: "הדפדפן שלך", icon: Laptop },
  { id: "dns", label: "שרת DNS", icon: BookOpenCheck },
  { id: "server", label: "שרת האתר", icon: Server },
  { id: "browser2", label: "הדפדפן שלך", icon: Laptop },
];

const HOPS: JourneyHop[] = [
  {
    fromNodeId: "browser",
    toNodeId: "dns",
    label: "שאילתת DNS",
    detail: "הדפדפן שולח שאלה: 'מה כתובת ה-IP של google.com?'",
  },
  {
    fromNodeId: "dns",
    toNodeId: "browser",
    label: "תשובת DNS",
    detail: "שרת ה-DNS עונה: '142.250.185.78' — עכשיו הדפדפן יודע לאן לפנות.",
  },
  {
    fromNodeId: "browser",
    toNodeId: "server",
    label: "בקשה לשרת",
    detail: "הדפדפן שולח בקשה ישירות לכתובת ה-IP שהתקבלה, מבקש את דף הבית.",
  },
  {
    fromNodeId: "server",
    toNodeId: "browser2",
    label: "תגובת השרת",
    detail: "השרת מחזיר את תוכן העמוד (HTML/CSS/JS), והדפדפן מציג אותו על המסך.",
  },
];

const EXERCISE: ExerciseConfig = {
  id: "ip-dns-ex1",
  prompt:
    "כתוב פונקציה בשם lookupDNS שמקבלת אובייקט 'ספר טלפונים' (מיפוי domain->ip) ושם דומיין, ומחזירה את כתובת ה-IP, או null אם הדומיין לא קיים.",
  starterCode: `function lookupDNS(dnsTable, domain) {
  // dnsTable הוא אובייקט כמו { "example.com": "1.2.3.4" }
  // TODO: החזר את כתובת ה-IP המתאימה, או null אם לא נמצא
}`,
  hints: [
    "זה בדיוק כמו לחפש מפתח באובייקט רגיל ב-JavaScript.",
    "נסה: return dnsTable[domain] ?? null;",
    "טעות נפוצה: להשתמש ב-dnsTable.domain (נקודה) במקום dnsTable[domain] (סוגריים מרובעים) — כשdomain הוא משתנה, חייבים סוגריים מרובעים.",
  ],
  solutionCode: `function lookupDNS(dnsTable, domain) {
  return dnsTable[domain] ?? null;
}`,
  check: (userFn) => {
    const fn = userFn as (t: Record<string, string>, d: string) => string | null;
    const table = { "example.com": "93.184.216.34", "academy.ai": "10.0.0.1" };
    try {
      const a = fn(table, "academy.ai");
      const b = fn(table, "nonexistent.com");
      if (a === "10.0.0.1" && b === null) {
        return { passed: true, message: "מדויק! גם המציאה וגם המקרה של 'לא נמצא' עובדים נכון." };
      }
      return {
        passed: false,
        message: `עבור 'academy.ai' קיבלתי '${a}' (ציפיתי '10.0.0.1'), עבור דומיין לא קיים קיבלתי '${b}' (ציפיתי null).`,
      };
    } catch (e) {
      return { passed: false, message: `שגיאת הרצה: ${(e as Error).message}` };
    }
  },
};

const QUIZ: QuizQuestion[] = [
  {
    id: "q1",
    question: "מה תפקידו העיקרי של DNS?",
    options: [
      "להצפין תעבורת אינטרנט",
      "לתרגם שמות דומיין לכתובות IP",
      "להאיץ טעינת עמודים",
      "לחסום אתרים מזיקים",
    ],
    correctIndex: 1,
    explanation: "DNS הוא בדיוק 'ספר טלפונים' שמתרגם שם קריא (google.com) לכתובת IP.",
  },
  {
    id: "q2",
    question: "מה קורה קודם — הדפדפן שולח בקשה לשרת האתר, או שאילתת DNS?",
    options: ["בקשה לשרת האתר קודם", "שאילתת DNS קודם", "שניהם קורים בו-זמנית תמיד", "תלוי בדפדפן"],
    correctIndex: 1,
    explanation: "חייבים לדעת את כתובת ה-IP לפני שאפשר לשלוח בקשה — לכן DNS תמיד קודם.",
  },
];

const SECTIONS: LessonSection[] = [
  { id: "slides", label: "מצגת: הרעיון המרכזי", content: <SlideDeck slides={SLIDES} /> },
  {
    id: "simulator",
    label: "סימולטור: עקוב אחרי מסע הבקשה",
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
            <li>לחשוב שכתובת IP קבועה לתמיד — הרבה שרתים משנים IP עם הזמן.</li>
            <li>לבלבל בין דומיין (google.com) לכתובת IP (142.250...) — הם לא אותו דבר, רק מקושרים.</li>
          </ul>
        </div>
        <div className="rounded-xl border border-success/30 bg-success/5 p-4">
          <p className="mb-2 font-bold text-success">Best Practices</p>
          <ul className="space-y-1.5 text-sm">
            <li>כשמאבחנים בעיית חיבור — תמיד תבדוק אם DNS בכלל מצליח לפתור את הכתובת.</li>
            <li>כלים כמו <code>nslookup</code> או <code>dig</code> עוזרים לבדוק DNS ידנית.</li>
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
          ["IP Address", "כתובת ייחודית שמזהה מכשיר ברשת האינטרנט."],
          ["DNS", "מערכת שמתרגמת שמות דומיין לכתובות IP."],
          ["Domain", "שם קריא לבני אדם (כמו google.com) שמייצג אתר."],
          ["Packet", "'חבילת' מידע קטנה שנשלחת ברשת בין מכשירים."],
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
            "אם ה-DNS 'לא עובד', למה אני עדיין יכול לגלוש לפעמים?",
            "תוצאות DNS נשמרות ב-cache (מטמון) לזמן מה, כך שאם כבר פנית לאתר לאחרונה, המחשב שלך 'זוכר' את הכתובת בלי לשאול שוב.",
          ],
          [
            "למה יש גם IPv4 וגם IPv6?",
            "ל-IPv4 יש כ-4 מיליארד כתובות אפשריות בלבד — לא מספיק למספר המכשירים בעולם היום. IPv6 נותן כמות עצומה של כתובות נוספות.",
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
          <li>0:00-0:25 — אנימציה: מכתב עם כתובת לא ברורה חוזר לשולח; לעומתו מכתב עם כתובת מדויקת מגיע.</li>
          <li>0:25-1:15 — מוטיון גרפיקס: 'ספר טלפונים' ענק (DNS) עם שם וכתובת IP לצידו.</li>
          <li>1:15-2:10 — הדגמת מסך: פתיחת טרמינל, פקודת <code>nslookup google.com</code> אמיתית.</li>
          <li>2:10-2:45 — אנימציית המסע המלא (תואמת לסימולטור באתר) — דפדפן→DNS→שרת→דפדפן.</li>
          <li>2:45-3:00 — סיכום + כתוביות.</li>
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
          פתח טרמינל (או Command Prompt) והרץ <code>nslookup github.com</code>. מה כתובת ה-IP
          שקיבלת? נסה שוב אחרי כמה דקות — האם היא זהה?
        </p>
      </div>
    ),
  },
];

export default function Page() {
  return <LessonShell meta={META} sections={SECTIONS} />;
}
