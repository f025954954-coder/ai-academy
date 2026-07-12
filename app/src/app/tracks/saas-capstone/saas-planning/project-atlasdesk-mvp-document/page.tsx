"use client";

import { LessonShell, type LessonMeta, type LessonSection } from "@/components/lesson/lesson-shell";
import { SlideDeck, type Slide } from "@/components/slides/slide-deck";
import { EngineeringInsights } from "@/components/lesson/engineering-insights";
import { QuizEngine, type QuizQuestion } from "@/components/quiz/quiz-engine";
import { RealWorldTask } from "@/components/exercises/real-world-task";

const META: LessonMeta = {
  trackSlug: "saas-capstone",
  moduleSlug: "saas-planning",
  lessonSlug: "project-atlasdesk-mvp-document",
  title: "פרויקט מודול: מסמך MVP מלא ל-AtlasDesk",
  objectives: [
    "לכתוב מסמך MVP שמגדיר בדיוק מה כלול ומה לא בגרסה הראשונה למכירה",
    "לתעדף את 8+ היכולות הקיימות לפי ערך ללקוח מול עלות תחזוקה",
    "לזהות את הפער הגדול ביותר בין AtlasDesk הנוכחי למוצר SaaS מסחרי אמיתי",
  ],
  estMinutes: 40,
  difficulty: "מתקדם",
  prerequisites: ["pricing-strategy-for-ai-saas"],
};

const SLIDES: Slide[] = [
  {
    title: "פרויקט המודול: לקבל החלטה — לא רק לתעד יכולות",
    bullets: [
      "AtlasDesk כולל היום: שיחה+זיכרון, Tool Calling, RAG, סוכן אוטונומי, מערכת רב-סוכנית, webhook automation, ניטור, והגנת אבטחה. זה הרבה יותר ממה שרוב ה-MVPs האמיתיים כוללים ביום הראשון.",
      "המשימה: להחליט מה באמת חייב להיות ב-MVP הראשון (הגרסה שמוכרים ללקוח הראשון), ומה 'נחמד שיהיה' לגרסה 2.",
    ],
  },
];

const QUIZ: QuizQuestion[] = [
  {
    id: "q1",
    question: "למה MVP אמיתי כמעט תמיד כולל פחות יכולות ממה ש-AtlasDesk כבר בנה, למרות שכולן 'עובדות'?",
    options: [
      "כי יכולות שעובדות לא שוות כלום",
      "כי MVP מוגדר לפי מה שהלקוח הראשון *חייב* כדי לקבל ערך, לא לפי כל מה שטכנית אפשרי — כל יכולת נוספת מוסיפה מורכבות תחזוקה וסיכון לפני שיש בכלל אימות שוק",
      "כי AtlasDesk בנוי גרוע מדי למכירה",
      "כי חוק המדינה מגביל את מספר היכולות ב-MVP"
    ],
    correctIndex: 1,
    explanation: "MVP הוא לא 'הכל שבנינו' — הוא הגרעין המינימלי שמוכיח ערך ללקוח האמיתי הראשון, לפני שמשקיעים בתחזוקת יכולות נוספות שאולי אף אחד לא צריך.",
    optionNotes: [
      "לא נכון: כל היכולות עובדות ותורמות ערך — השאלה היא סדר עדיפויות, לא איכות.",
      "התשובה הנכונה: MVP מוגדר לפי צורך אמיתי מוכח, לא לפי מה שטכנית קיים — פחות זה לפעמים יותר חכם.",
      "לא נכון: AtlasDesk בנוי היטב עם כל התכונות שנבנו — זו לא הסיבה לצמצום MVP.",
      "לא נכון: אין דרישה חוקית כזו — זו החלטה עסקית-הנדסית.",
    ],
  },
];

const SECTIONS: LessonSection[] = [
  { id: "slides", label: "מצגת: הפרויקט המסכם של המודול", content: <SlideDeck slides={SLIDES} /> },
  {
    id: "engineering",
    label: "לחשוב כמו מהנדס AI",
    content: (
      <EngineeringInsights
        why="מסמך MVP קיים כי הוא מכריח החלטה מפורשת (מה בפנים, מה בחוץ) לפני שמשווקים — בלי זה, 'MVP' הופך למילה ריקה שמשמעה 'כל מה שבנינו'."
        alternatives="להשיק 'הכל' כי הכל כבר עובד — נשמע אטרקטיבי, אבל מגדיל את משטח התחזוקה/אבטחה בלי אימות שיש ביקוש אמיתי לכל יכולת."
        whenNotTo="—"
        commonMistakes="להגדיר MVP לפי 'מה קל לי לבנות' במקום 'מה הלקוח באמת צריך' — בדיוק ההפך מה-personas שהוגדרו בשיעור הראשון."
        cost="MVP מצומצם דורש משמעת (לוותר על יכולות מוכנות) — אבל חוסך עלות תחזוקה/אבטחה על יכולות שאולי אף לקוח לא צריך בשלב הזה."
        realWorld="זו בדיוק ההחלטה שכל חברת SaaS אמיתית מקבלת לפני launch — מה בגרסה 1.0, מה נדחה ל-1.1."
      />
    ),
  },
  {
    id: "real-world-task",
    label: "המשימה המרכזית של המודול",
    content: (
      <RealWorldTask
        id="saas-planning-project-atlasdesk-mvp-document"
        title="כתוב מסמך MVP מלא ל-AtlasDesk"
        context="עבוד עם Claude Code על סמך כל מה שנבנה ב-AtlasDesk לאורך האקדמיה."
        steps={[
          "רשמו את כל 8+ היכולות הקיימות (שיחה, זיכרון, tools, RAG, agent, multi-agent, webhook, monitoring, security).",
          "לכל אחת, דרגו: ערך ללקוח (גבוה/בינוני/נמוך) ועלות תחזוקה/סיכון (גבוה/בינוני/נמוך).",
          "החליטו: אילו 4-5 יכולות הן ה-MVP האמיתי (ערך גבוה, סיכון מנוהל), ואילו נדחות לגרסה הבאה.",
          "כתבו מסמך MVP קצר (חצי עמוד): מה כלול, מה לא, ולמה — ל-persona הראשונה שהגדרתם (שיעור 1).",
        ]}
        successCriteria={[
          "יש לך טבלת ערך/סיכון לכל 8 היכולות, לא רק רשימה",
          "יש לך החלטת MVP ברורה עם נימוק, לא 'הכל בפנים'",
          "המסמך מתייחס ל-persona ספציפית, לא 'לכולם'",
        ]}
      />
    ),
  },
  { id: "quiz", label: "בוחן ידע", content: <QuizEngine questions={QUIZ} /> },
  {
    id: "homework",
    label: "סיכום מודול",
    content: (
      <div className="rounded-xl bg-primary/5 p-4 text-sm">
        <p className="font-semibold">סיימת את מודול תכנון מוצר SaaS AI!</p>
        <p className="mt-1 text-muted">
          יש לך עכשיו personas מוגדרות, אסטרטגיית תמחור, ומסמך MVP. במודול הבא (בנייה מלאה)
          נוסיף ל-AtlasDesk את מה שחסר הכי הרבה למוצר SaaS אמיתי: שכבת הרשאות.
        </p>
      </div>
    ),
  },
];

export default function Page() {
  return <LessonShell meta={META} sections={SECTIONS} />;
}
