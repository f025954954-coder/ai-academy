"use client";

import { LessonShell, type LessonMeta, type LessonSection } from "@/components/lesson/lesson-shell";
import { SlideDeck, type Slide } from "@/components/slides/slide-deck";
import { PromptComparisonLab } from "@/components/comparisons/prompt-comparison-lab";
import { EngineeringInsights } from "@/components/lesson/engineering-insights";
import { QuizEngine, type QuizQuestion } from "@/components/quiz/quiz-engine";
import { RealWorldTask } from "@/components/exercises/real-world-task";

const META: LessonMeta = {
  trackSlug: "ai-agents",
  moduleSlug: "automation-scraping",
  lessonSlug: "responsible-scraping-principles",
  title: "עקרונות scraping אחראי",
  objectives: [
    "להבין את robots.txt, rate limiting, ותנאי שימוש כגבולות אתיים וחוקיים",
    "לזהות מתי API רשמי עדיף על scraping",
    "להבין את הסיכונים ההנדסיים של scraping (HTML שמשתנה, חסימות)",
  ],
  estMinutes: 25,
  difficulty: "בינוני",
  prerequisites: ["פרויקט מודול: AtlasDesk מקבל אסקלציה רב-סוכנית"],
};

const SLIDES: Slide[] = [
  {
    title: "מודול חדש: לפעול על העולם החיצוני",
    bullets: [
      "עד כה AtlasDesk 'פעל' בעולם סגור (מאמרי עזרה, כלים פנימיים). המודול הזה עוסק ביכולת לפעול על מקורות מידע חיצוניים — scraping ואוטומציה מבוססת webhooks.",
      "כלל יסוד ראשון: API רשמי תמיד עדיף על scraping כשהוא קיים — יציב יותר, חוקי יותר, ומתועד.",
    ],
  },
  {
    title: "גבולות scraping אחראי",
    bullets: [
      "robots.txt — קובץ שמצהיר אילו חלקים מהאתר מותר/אסור לסרוק אוטומטית. יש לכבד אותו.",
      "Rate limiting — לא להציף שרת בבקשות; לחכות בין בקשות כדי לא להעמיס.",
      "תנאי שימוש (ToS) — לאתרים רבים יש איסור מפורש על scraping בתנאי השימוש — הפרתו יכולה להיות בעייתית משפטית.",
    ],
  },
];

const QUIZ: QuizQuestion[] = [
  {
    id: "q1",
    question: "למה API רשמי עדיף בדרך כלל על scraping, כשהוא קיים?",
    options: [
      "אין הבדל אמיתי, שניהם מספקים את אותו מידע",
      "API רשמי יציב יותר (לא נשבר כשה-HTML משתנה), חוקי יותר (מותר לפי תנאי שימוש), ומתועד — scraping הוא 'עוקף חוקי' שברירי",
      "scraping תמיד מהיר יותר מ-API",
      "API רשמי תמיד חינמי לגמרי"
    ],
    correctIndex: 1,
    explanation: "scraping תלוי במבנה HTML שיכול להשתנות בכל רגע (שובר את הקוד), ולעיתים מפר תנאי שימוש — API רשמי הוא ממשק מוסכם ויציב.",
    optionNotes: [
      "לא נכון: יש הבדל מהותי ביציבות ובחוקיות בין השניים.",
      "התשובה הנכונה: יציבות (API לא נשבר כש-HTML משתנה) וחוקיות (תואם תנאי שימוש) הם היתרונות המרכזיים.",
      "לא נכון: מהירות תלויה במקרה הספציפי — זה לא ההבדל העקרוני.",
      "לא נכון: APIs רשמיים לעיתים דורשים תשלום/הרשמה — לא בהכרח חינמיים.",
    ],
  },
];

const SECTIONS: LessonSection[] = [
  { id: "slides", label: "מצגת: לפעול על העולם החיצוני באחריות", content: <SlideDeck slides={SLIDES} /> },
  {
    id: "comparison",
    label: "השוואה: scraping ראשוני מול API רשמי",
    content: (
      <PromptComparisonLab
        title="קבלת מחירי מתחרים לצורך השוואה"
        unitLabel="גישה"
        bad={{
          label: "scraping ישיר של אתר המתחרה",
          content: `"תכתוב סקריפט שסורק את דף המחירים של המתחרה
כל שעה" (בלי לבדוק robots.txt או תנאי שימוש)`,
          outcome: "אם המתחרה משנה את מבנה ה-HTML, הסקריפט נשבר בשקט. אם תנאי השימוש אוסרים scraping, יש חשיפה משפטית. אם אין rate limiting, זה יכול להיחסם כ-'תעבורה חשודה'.",
        }}
        good={{
          label: "בדיקת API רשמי + חלופות חוקיות",
          content: `"בדוק אם יש API רשמי/feed לנתוני מחירים. אם אין,
בדוק את robots.txt ותנאי השימוש לפני שאתה מציע
scraping, ותכנן rate limiting מכבד"`,
          outcome: "פתרון בר-קיימא: אם יש API, משתמשים בו; אם צריך scraping, הוא נעשה בגבולות המותרים ועם rate limiting שלא יעמיס על השרת.",
        }}
        takeaway="scraping אחראי הוא לא רק 'טכני נכון' — הוא גם עמידות (API רשמי לא נשבר) וגם עמידה בגבולות חוקיים/אתיים. שני השיקולים חשובים באותה מידה."
      />
    ),
  },
  {
    id: "engineering",
    label: "לחשוב כמו מהנדס AI",
    content: (
      <EngineeringInsights
        why="עקרונות scraping אחראי קיימים כי scraping לא-מבוקר יכול לגרום נזק (עומס על שרתים אחרים) ולחשוף סיכון משפטי/עסקי."
        alternatives="API רשמי (כשקיים) — יציב וחוקי, אבל לא תמיד קיים לכל מקור מידע."
        whenNotTo="אם תנאי השימוש אוסרים scraping במפורש, או אם אין דרך לבצע אותו בכבוד (rate limiting סביר) — עדיף לוותר על המקור הזה."
        commonMistakes="לבנות scraper בלי מנגנון rate limiting, מה שעלול להיראות כמו מתקפת עומס (DoS) בטעות ולגרום לחסימת ה-IP שלך."
        cost="scraping דורש תחזוקה שוטפת (HTML משתנה = קוד נשבר) — עלות נסתרת שלא קיימת עם API רשמי יציב."
        realWorld="ב-AtlasDesk, פרויקט המודול ישתמש ב-webhooks (לא scraping) לקבלת מידע חיצוני — בדיוק כי זו הדרך הרשמית והיציבה יותר."
      />
    ),
  },
  { id: "quiz", label: "בוחן ידע", content: <QuizEngine questions={QUIZ} /> },
  {
    id: "real-world-task",
    label: "משימה מעשית",
    content: (
      <RealWorldTask
        id="automation-responsible-scraping-principles"
        title="בדוק robots.txt ו-API רשמי לפני scraping היפותטי"
        context="בחר אתר ציבורי כלשהו (חנות, בלוג, מאגר מידע ציבורי)."
        steps={[
          "בדוק את robots.txt של האתר (domain.com/robots.txt) — מה מותר/אסור?",
          "עם Claude Code, חפש אם יש API רשמי לאותו מקור מידע.",
          "אם אין API, תכננו (בלי לממש) rate limiting סביר ל-scraping היפותטי.",
        ]}
        successCriteria={[
          "בדקת robots.txt אמיתי, לא ניחוש",
          "יש לך תשובה ברורה: API רשמי קיים או לא, ואם לא — תוכנית rate limiting",
        ]}
      />
    ),
  },
  {
    id: "homework",
    label: "שיעורי בית",
    content: (
      <div className="rounded-xl bg-primary/5 p-4 text-sm">
        <p className="font-semibold">שיעורי בית:</p>
        <p className="mt-1 text-muted">
          חפש שירות/אתר שאתה משתמש בו לעתים קרובות ובדוק אם יש לו API רשמי לפני שהיית שוקל
          scraping. הפתעת לגלות שיש (או אין) API?
        </p>
      </div>
    ),
  },
];

export default function Page() {
  return <LessonShell meta={META} sections={SECTIONS} />;
}
