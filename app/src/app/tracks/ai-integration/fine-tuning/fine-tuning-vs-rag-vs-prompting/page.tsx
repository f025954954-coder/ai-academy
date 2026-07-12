"use client";

import { LessonShell, type LessonMeta, type LessonSection } from "@/components/lesson/lesson-shell";
import { SlideDeck, type Slide } from "@/components/slides/slide-deck";
import { PromptComparisonLab } from "@/components/comparisons/prompt-comparison-lab";
import { EngineeringInsights } from "@/components/lesson/engineering-insights";
import { QuizEngine, type QuizQuestion } from "@/components/quiz/quiz-engine";
import { RealWorldTask } from "@/components/exercises/real-world-task";

const META: LessonMeta = {
  trackSlug: "ai-integration",
  moduleSlug: "fine-tuning",
  lessonSlug: "fine-tuning-vs-rag-vs-prompting",
  title: "Fine-tuning מול RAG מול Prompt Engineering",
  objectives: [
    "להבין מתי fine-tuning נחוץ ומתי RAG/פרומפט מספיקים (ולמה זה כמעט תמיד האחרון)",
    "להכיר LoRA כשיטה יעילה יותר מ-fine-tuning מלא",
    "להבין את העלות והזמן הגבוהים של fine-tuning יחסית לחלופות",
  ],
  estMinutes: 30,
  difficulty: "מתקדם",
  prerequisites: ["פרויקט מודול: AtlasDesk מקבל אוטומציה מונעת-webhook"],
};

const SLIDES: Slide[] = [
  {
    title: "שלוש דרכים ל'התאים' מודל, מהזולה ביקרה",
    bullets: [
      "1. Prompt Engineering (מודול 6.1) — לנסח בקשה טובה יותר. זול, מיידי, אין צורך באימון נוסף.",
      "2. RAG (מודול קודם) — להזין מידע ספציפי בזמן ריצה. פותר בעיית 'ידע חסר', לא משנה את 'התנהגות' המודל עצמו.",
      "3. Fine-tuning — לאמן מחדש (חלקית) את משקלי המודל על דוגמאות ספציפיות. משנה את ההתנהגות הבסיסית של המודל, לא רק את המידע שיש לו.",
    ],
  },
  {
    title: "מתי fine-tuning באמת נחוץ",
    bullets: [
      "כשצריך שהמודל 'ידבר' בסגנון מאוד ספציפי בעקביות (למשל טון מותג ייחודי) שקשה להשיג רק בפרומפט.",
      "כשיש הרבה מאוד דוגמאות של 'קלט→פלט רצוי' (אלפים) שממחישות דפוס שקשה לתאר במילים.",
      "רוב המקרים (כולל AtlasDesk כולו!) לא מגיעים לרף הזה — RAG + פרומפט טוב פותרים את רוב הבעיות בעלות נמוכה בהרבה.",
    ],
  },
  {
    title: "LoRA — fine-tuning יעיל יותר",
    bullets: [
      "LoRA (Low-Rank Adaptation) מאמן רק שכבות קטנות נוספות במקום כל משקלי המודל — הרבה יותר זול וזריז מ-fine-tuning מלא, בעודו משיג תוצאות דומות ברוב המקרים.",
    ],
  },
];

const QUIZ: QuizQuestion[] = [
  {
    id: "q1",
    question: "למה כמעט כל היכולות שנבנו ב-AtlasDesk (RAG, tool calling, agent) לא דרשו fine-tuning בכלל?",
    options: [
      "כי fine-tuning לא קיים עבור Claude",
      "כי הבעיות שנפתרו (ידע חסר, פעולה על כלים, החלטה בלולאה) נפתרות טוב באמצעות RAG/prompt engineering/tool calling — לא דורשות שינוי בהתנהגות הבסיסית של המודל עצמו",
      "כי fine-tuning זול מדי ולא היה שווה את זה",
      "כי AtlasDesk לא באמת צריך להיות מדויק"
    ],
    correctIndex: 1,
    explanation: "כל בעיה ב-AtlasDesk נפתרה בהזרקת מידע/יכולות בזמן ריצה (RAG, tools) — לא היה צורך לשנות את ה'אישיות' הבסיסית של המודל, מה ש-fine-tuning נועד לו.",
    optionNotes: [
      "לא נכון: יש אפשרות ל-fine-tuning עבור מודלים מסוימים — זו לא הסיבה שהיא לא נדרשה כאן.",
      "התשובה הנכונה: כל הבעיות שנפתרו היו בעיות 'ידע/יכולת חסרה', לא בעיות 'התנהגות בסיסית שגויה' — RAG ו-tools הם הכלי הנכון לזה.",
      "לא נכון: זה ההפך — fine-tuning יקר יותר מהחלופות, וזו בדיוק הסיבה שהוא לא נבחר, לא ש'הוא זול מדי'.",
      "לא נכון: AtlasDesk כן צריך להיות מדויק — אבל דיוק הושג דרך grounding ו-RAG, לא fine-tuning.",
    ],
  },
];

const SECTIONS: LessonSection[] = [
  { id: "slides", label: "מצגת: שלוש דרכים להתאמת מודל", content: <SlideDeck slides={SLIDES} /> },
  {
    id: "comparison",
    label: "השוואה: מתי לבחור fine-tuning מול RAG",
    content: (
      <PromptComparisonLab
        title="AtlasDesk צריך לענות תמיד בטון מותג ספציפי מאוד"
        unitLabel="גישה"
        bad={{
          label: "fine-tuning ישר (over-engineering)",
          content: `אימון מודל מותאם על אלפי דוגמאות שיחה כדי
"ללמד" אותו את הטון — עלות גבוהה, זמן הכנה ארוך,
ותחזוקה מתמשכת (לאמן מחדש בכל שינוי מדיניות)`,
          outcome: "השקעה גדולה לפני שבכלל בדקו אם system prompt טוב היה פותר את זה — ברוב המקרים, זה היה.",
        }}
        good={{
          label: "לנסות פרומפט קודם (מה שנעשה בפועל ב-AtlasDesk)",
          content: `ATLASDESK_SYSTEM_PROMPT מגדיר טון מפורש: "טון
מקצועי, חם וממוקד-פתרון... תשובות קצרות וברורות"
— הושג בלי שום fine-tuning`,
          outcome: "הטון הרצוי הושג במלואו רק דרך ניסוח system prompt קפדני — אין צורך ב-fine-tuning כלל למקרה הזה.",
        }}
        takeaway="הכלל המעשי: תמיד תתחיל בפרומפט הכי טוב שאתה יכול לנסח, ואז RAG אם חסר ידע — fine-tuning הוא המוצא האחרון, לא הראשון, בגלל העלות והזמן הגבוהים שלו."
      />
    ),
  },
  {
    id: "engineering",
    label: "לחשוב כמו מהנדס AI",
    content: (
      <EngineeringInsights
        why="הסדר (פרומפט → RAG → fine-tuning) קיים כי כל שלב עולה יותר ולוקח יותר זמן מהקודם — תמיד משתלם לנסות את הזול והמהיר קודם."
        alternatives="לקפוץ ישר ל-fine-tuning 'כי זה נשמע מתקדם יותר' — כמעט תמיד טעות; רוב הבעיות שנראות כמו 'המודל לא מתנהג נכון' הן בעיות פרומפט/ידע, לא בעיות שדורשות שינוי משקלים."
        whenNotTo="כשיש מעט מאוד דוגמאות אימון (פחות מכמה מאות) — fine-tuning לא ילמד דפוס אמיתי, רק ירעיש."
        commonMistakes="לבצע fine-tuning בלי לבדוק קודם אם system prompt משופר או RAG פותרים את הבעיה בעלות נמוכה בהרבה."
        cost="fine-tuning דורש: איסוף/ניקוי דוגמאות, זמן אימון, ותשתית הרצת מודל מותאם — עלות סדרי גודל גבוהה יותר מפרומפט/RAG."
        realWorld="AtlasDesk הוא הדוגמה החיה: כל 8 היכולות שנבנו (כולל טון עקבי, ידע ספציפי, כלים, אסקלציה) הושגו בלי שום fine-tuning."
      />
    ),
  },
  { id: "quiz", label: "בוחן ידע", content: <QuizEngine questions={QUIZ} /> },
  {
    id: "glossary",
    label: "מונחון",
    content: (
      <dl className="grid gap-3 sm:grid-cols-2">
        {[
          ["Fine-tuning", "אימון מחדש (חלקי) של משקלי מודל על דוגמאות ספציפיות."],
          ["LoRA", "שיטת fine-tuning יעילה שמאמנת שכבות קטנות נוספות במקום כל המודל."],
          ["Overfitting", "מודל ש'משנן' את דוגמאות האימון במקום להכליל לתרחישים חדשים."],
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
    id: "real-world-task",
    label: "משימה מעשית",
    content: (
      <RealWorldTask
        id="fine-tuning-vs-rag-vs-prompting"
        title="נתח החלטה של 'פרומפט מול fine-tuning' על מקרה אמיתי"
        context="עבוד עם Claude Code — דיון ותכנון, לא מימוש."
        steps={[
          "חשוב על תרחיש (בדיוני או אמיתי) שבו 'נראה' שצריך fine-tuning.",
          "בקש מ-Claude Code להציע: איך פרומפט משופר או RAG יכולים לפתור את אותה בעיה בלי fine-tuning?",
          "דון: אם עדיין נראה ש-fine-tuning נחוץ, מה בדיוק מצדיק את זה (כמות דוגמאות, סוג הבעיה)?",
        ]}
        successCriteria={[
          "בדקת חלופה זולה יותר (פרומפט/RAG) לפני שקבעת שצריך fine-tuning",
          "יש לך נימוק ברור למה fine-tuning כן/לא נחוץ במקרה הספציפי",
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
          חפש דוגמה אמיתית (בלוג/מאמר) של חברה שהשתמשה ב-fine-tuning בפועל. מה הביא אותם
          למסקנה שפרומפט/RAG לא מספיקים במקרה שלהם?
        </p>
      </div>
    ),
  },
];

export default function Page() {
  return <LessonShell meta={META} sections={SECTIONS} />;
}
