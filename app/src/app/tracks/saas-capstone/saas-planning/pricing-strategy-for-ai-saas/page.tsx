"use client";

import { LessonShell, type LessonMeta, type LessonSection } from "@/components/lesson/lesson-shell";
import { SlideDeck, type Slide } from "@/components/slides/slide-deck";
import { PromptComparisonLab } from "@/components/comparisons/prompt-comparison-lab";
import { EngineeringInsights } from "@/components/lesson/engineering-insights";
import { QuizEngine, type QuizQuestion } from "@/components/quiz/quiz-engine";
import { RealWorldTask } from "@/components/exercises/real-world-task";

const META: LessonMeta = {
  trackSlug: "saas-capstone",
  moduleSlug: "saas-planning",
  lessonSlug: "pricing-strategy-for-ai-saas",
  title: "אסטרטגיית תמחור למוצרי SaaS מבוססי-AI",
  objectives: [
    "להבין את האתגר הייחודי בתמחור AI: עלות משתנה (טוקנים) מול מחיר קבוע ללקוח",
    "להכיר מודלים נפוצים: per-seat, usage-based, hybrid",
    "לתכנן תמחור ל-AtlasDesk על בסיס נתוני העלות האמיתיים שנאספו (מודול Monitoring)",
  ],
  estMinutes: 30,
  difficulty: "מתקדם",
  prerequisites: ["user-mapping-and-personas"],
};

const SLIDES: Slide[] = [
  {
    title: "האתגר הייחודי בתמחור AI",
    bullets: [
      "ב-SaaS מסורתי, העלות לכל משתמש כמעט קבועה (שרת, אחסון). ב-SaaS מבוסס-AI, כל אינטראקציה עולה כסף אמיתי (טוקנים) — משתמש שמשתמש הרבה עולה הרבה יותר מלקוח שקוראים לו 'אותה תוכנית'.",
      "בדיוק בגלל זה שכבת הניטור (/api/atlasdesk/stats) שבנית קריטית — בלי לדעת כמה משתמש 'עולה' בפועל, אי אפשר לתמחר בביטחון.",
    ],
  },
  {
    title: "שלושה מודלי תמחור",
    bullets: [
      "Per-seat — מחיר קבוע למשתמש בחודש. פשוט להבנה, אבל מסוכן אם משתמש 'כבד' משתמש הרבה יותר מהממוצע (מפסידים כסף עליו).",
      "Usage-based — משלמים לפי שימוש בפועל (כמו טוקנים/קריאות). הוגן יותר, אבל פחות צפוי ללקוח (קשה לתקצב מראש).",
      "Hybrid — בסיס קבוע (per-seat) + תוספת usage מעבר למכסה. הכי נפוץ במוצרי AI מסחריים אמיתיים.",
    ],
  },
];

const QUIZ: QuizQuestion[] = [
  {
    id: "q1",
    question: "למה תמחור per-seat טהור (מחיר קבוע למשתמש) מסוכן יותר במוצר AI מאשר ב-SaaS מסורתי?",
    options: [
      "אין הבדל, זה אותו סיכון בשני המקרים",
      "כי בעלות AI, משתמש 'כבד' (שולח הרבה שאלות) עולה משמעותית יותר מהממוצע — אם המחיר קבוע, יכול להיווצר מצב שמפסידים כסף על משתמשים כאלה",
      "כי per-seat תמיד יקר יותר מ-usage-based",
      "כי לקוחות תמיד מעדיפים usage-based"
    ],
    correctIndex: 1,
    explanation: "בעוד ש-SaaS מסורתי כמעט אינו רגיש לכמות השימוש (עלות שרת קבועה יחסית), במוצר AI כל שימוש עולה כסף אמיתי — משתנה גדול בין משתמשים.",
    optionNotes: [
      "לא נכון: יש הבדל אמיתי — הרגישות לשימוש בפועל גבוהה בהרבה במוצרי AI.",
      "התשובה הנכונה: זה בדיוק הסיכון — משתמש כבד יכול לעלות הרבה יותר מהמחיר הקבוע שהוא משלם, מה שגורם להפסד על אותו לקוח.",
      "לא נכון: אין קשר עקבי בין סוג המודל למחיר עצמו — זה תלוי בפרטי התמחור הספציפיים.",
      "לא נכון: העדפת לקוחות משתנה — חלק מעדיפים ודאות (per-seat), חלק מעדיפים לשלם רק על מה שהם משתמשים בו.",
    ],
  },
];

const SECTIONS: LessonSection[] = [
  { id: "slides", label: "מצגת: לתמחר מוצר עם עלות משתנה", content: <SlideDeck slides={SLIDES} /> },
  {
    id: "comparison",
    label: "השוואה: תמחור בלי נתונים מול מבוסס-נתונים",
    content: (
      <PromptComparisonLab
        title="קביעת מחיר לתוכנית 'Team' של AtlasDesk"
        unitLabel="גישת תמחור"
        bad={{
          label: "תמחור מנחש",
          content: `"$29 לחודש למשתמש, כי זה נשמע סביר"
(בלי לבדוק עלות שימוש בפועל)`,
          outcome: "אם עלות ה-AI הממוצעת למשתמש היא $35 (יותר מהמחיר!), החברה מפסידה כסף על כל לקוח — מתגלה רק אחרי שכבר יש הרבה לקוחות.",
        }}
        good={{
          label: "תמחור מבוסס נתוני שימוש אמיתיים",
          content: `בדיקה ב-/api/atlasdesk/stats: עלות ממוצעת לשיחה
$0.02, ממוצע 50 שיחות למשתמש בחודש = $1 עלות AI
→ תמחור $29 משאיר מרווח בריא`,
          outcome: "החלטת תמחור מבוססת על עלות אמיתית, לא ניחוש — יודעים בביטחון שהמחיר מכסה את העלות ומשאיר רווח.",
        }}
        takeaway="שכבת הניטור שבנית (מודול Production AI) היא לא רק לזיהוי תקלות — היא בסיס קריטי להחלטות תמחור מבוססות-נתונים, לא ניחושים."
      />
    ),
  },
  {
    id: "engineering",
    label: "לחשוב כמו מהנדס AI",
    content: (
      <EngineeringInsights
        why="תמחור מבוסס-נתונים קיים כי תמחור AI בלי נתוני עלות אמיתיים הוא הימור — בדיוק כמו אופטימיזציית ביצועים בלי מדידה (מודול Claude Code Mastery)."
        alternatives="להעתיק תמחור ממתחרה — מהיר, אבל לא מבטיח שהוא מתאים למבנה העלות שלך (אולי אתה משתמש במודל יקר יותר, או שהמשתמשים שלך 'כבדים' יותר)."
        whenNotTo="לשלב ה-MVP הראשוני, לפני שיש נתוני שימוש אמיתיים — אז תמחור ראשוני הוא בהכרח הערכה, לא מדע מדויק."
        commonMistakes="לתמחר per-seat בלי מנגנון הגנה (usage cap, hybrid) — חושף לסיכון הפסד ממשתמשים כבדים."
        cost="זה השיעור עצמו — כל התמחור הוא בעצם ניהול הפשרה בין הכנסה לעלות."
        realWorld="בפרויקט המודול הבא (מסמך MVP) תשלב את התמחור הזה יחד עם ה-personas לכדי מסמך MVP מלא."
      />
    ),
  },
  { id: "quiz", label: "בוחן ידע", content: <QuizEngine questions={QUIZ} /> },
  {
    id: "real-world-task",
    label: "משימה מעשית",
    content: (
      <RealWorldTask
        id="saas-planning-pricing-strategy-for-ai-saas"
        title="תכנן תמחור hybrid ל-AtlasDesk מבוסס נתונים אמיתיים"
        context="עבוד עם /api/atlasdesk/stats על AtlasDesk האמיתי."
        steps={[
          "שלח כמה הודעות ב-/atlasdesk (מצבים שונים) ובדוק עלות ממוצעת לקריאה.",
          "עם Claude Code, חשב תרחיש: אם לקוח 'ממוצע' שולח X הודעות בחודש, כמה עולה זה בפועל?",
          "תכננו תמחור hybrid (בסיס + usage מעבר למכסה) שמכסה את העלות ומשאיר מרווח סביר.",
        ]}
        successCriteria={[
          "יש לך תמחור מבוסס נתוני עלות אמיתיים, לא ניחוש",
          "יש לך מנגנון הגנה (usage cap או hybrid) נגד משתמשים כבדים",
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
          חפש מוצר AI מסחרי (ChatGPT Plus, GitHub Copilot) ובדוק את מבנה התמחור שלו. האם זה
          per-seat, usage-based, או hybrid? מה זה מספר לך על מבנה העלות שלהם?
        </p>
      </div>
    ),
  },
];

export default function Page() {
  return <LessonShell meta={META} sections={SECTIONS} />;
}
