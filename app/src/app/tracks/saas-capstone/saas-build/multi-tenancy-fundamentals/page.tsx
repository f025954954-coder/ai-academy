"use client";

import { LessonShell, type LessonMeta, type LessonSection } from "@/components/lesson/lesson-shell";
import { SlideDeck, type Slide } from "@/components/slides/slide-deck";
import { PromptComparisonLab } from "@/components/comparisons/prompt-comparison-lab";
import { EngineeringInsights } from "@/components/lesson/engineering-insights";
import { QuizEngine, type QuizQuestion } from "@/components/quiz/quiz-engine";
import { RealWorldTask } from "@/components/exercises/real-world-task";

const META: LessonMeta = {
  trackSlug: "saas-capstone",
  moduleSlug: "saas-build",
  lessonSlug: "multi-tenancy-fundamentals",
  title: "יסודות Multi-Tenancy",
  objectives: [
    "להבין מהו multi-tenancy ולמה מוצר SaaS זקוק לו",
    "להכיר גישות בידוד נתונים: shared DB עם tenant_id, מול DB נפרד לכל לקוח",
    "לזהות את הסיכון של 'דליפת נתונים' בין לקוחות במערכת AI",
  ],
  estMinutes: 30,
  difficulty: "מתקדם",
  prerequisites: ["פרויקט מודול: מסמך MVP מלא ל-AtlasDesk כמוצר מסחרי"],
};

const SLIDES: Slide[] = [
  {
    title: "הפער הגדול: AtlasDesk היום הוא single-tenant",
    bullets: [
      "AtlasDesk הנוכחי לא מבחין בין 'לקוחות' — כולם משתמשים באותה מערכת בלי הפרדה. זה מושלם ללימוד, אבל לא מתאים למוצר SaaS מסחרי שבו לקוח A לעולם לא אמור לראות נתונים של לקוח B.",
      "Multi-tenancy הוא הארכיטקטורה שמאפשרת למוצר אחד לשרת הרבה לקוחות ('tenants') תוך בידוד מלא בין הנתונים שלהם.",
    ],
  },
  {
    title: "שתי גישות בידוד",
    bullets: [
      "Shared DB עם tenant_id — כל הטבלאות כוללות עמודת tenant_id, וכל שאילתה מסננת לפי tenant הנוכחי. זול וגמיש, אבל דורש משמעת קפדנית (שכחת פילטר אחד = דליפת נתונים).",
      "DB נפרד לכל לקוח — בידוד מוחלט, אך יקר ומורכב לתחזוקה בקנה מידה (הרבה DBs לנהל).",
    ],
  },
];

const QUIZ: QuizQuestion[] = [
  {
    id: "q1",
    question: "מה הסיכון המרכזי בגישת 'shared DB עם tenant_id' לעומת DB נפרד לכל לקוח?",
    options: [
      "אין סיכון נוסף, שתי הגישות זהות באבטחה",
      "אם מפתח שוכח לסנן שאילתה לפי tenant_id הנוכחי (בטעות), הוא עלול לחשוף בטעות נתונים של לקוח אחר — הבידוד תלוי במשמעת קוד, לא באכיפה פיזית",
      "shared DB תמיד איטי יותר מ-DB נפרד",
      "shared DB לא נתמך על ידי Supabase"
    ],
    correctIndex: 1,
    explanation: "ב-DB נפרד, הבידוד פיזי (לא ניתן 'לטעות' ולגשת לנתונים של לקוח אחר). ב-shared DB, הבידוד לוגי — תלוי שכל שאילתה מסננת נכון, מה שיוצר סיכון אנושי.",
    optionNotes: [
      "לא נכון: יש הבדל משמעותי ברמת הסיכון — בידוד לוגי (shared) פגיע יותר לטעויות אנוש מבידוד פיזי (נפרד).",
      "התשובה הנכונה: זו בדיוק הסכנה — שכחת פילטר אחת יכולה לחשוף נתונים חוצי-לקוחות, מה שלא יכול לקרות עם DB נפרד פיזית.",
      "לא נכון: הביצועים תלויים במימוש הספציפי, לא בגישה עצמה כעיקרון גורף.",
      "לא נכון: Supabase (כמו כל Postgres) תומך במלואו בגישת shared-DB-עם-tenant_id.",
    ],
  },
];

const SECTIONS: LessonSection[] = [
  { id: "slides", label: "מצגת: AtlasDesk כ-single-tenant היום", content: <SlideDeck slides={SLIDES} /> },
  {
    id: "comparison",
    label: "השוואה: שאילתה בלי בידוד מול עם",
    content: (
      <PromptComparisonLab
        title="שליפת שיחות שמורות במערכת multi-tenant היפותטית"
        unitLabel="שאילתת DB"
        bad={{
          label: "בלי סינון tenant",
          content: `SELECT * FROM conversations WHERE user_id = 123`,
          outcome: "אם user_id 123 קיים בשני tenants שונים (למשל שני לקוחות עסקיים נפרדים), השאילתה עלולה להחזיר שיחות של שני הלקוחות מעורבבות יחד.",
        }}
        good={{
          label: "עם סינון tenant מפורש",
          content: `SELECT * FROM conversations
WHERE tenant_id = current_tenant AND user_id = 123`,
          outcome: "כל שאילתה מוגבלת במפורש ל-tenant הנוכחי — אין אפשרות (גם בטעות) לקבל נתונים חוצי-לקוחות.",
        }}
        takeaway="בגישת shared-DB, כל שאילתה חייבת לכלול סינון tenant — עדיף לאכוף את זה ברמת קוד משותפת (middleware/helper) ולא לסמוך על כל מפתח לזכור זאת בכל שאילתה בנפרד."
      />
    ),
  },
  {
    id: "engineering",
    label: "לחשוב כמו מהנדס AI",
    content: (
      <EngineeringInsights
        why="multi-tenancy קיים כי מוצר SaaS משרת הרבה לקוחות על אותה תשתית — בלי בידוד, נתונים של לקוח אחד עלולים לדלוף ללקוח אחר."
        alternatives="instance נפרד לכל לקוח (deployment שלם משלו) — בידוד מושלם, אבל יקר ומסובך לתחזוקה בקנה מידה של מאות/אלפי לקוחות."
        whenNotTo="למוצר לקוח-יחיד (internal tool) — multi-tenancy הוא overhead מיותר."
        commonMistakes="לממש tenant_id filtering ידנית בכל שאילתה בנפרד במקום דרך שכבה משותפת (middleware) — בדיוק כמו השכפול שנמצא ונפתר ב-anthropic-helpers.ts, רק עם השלכות אבטחה חמורות יותר אם משהו נשכח."
        cost="multi-tenancy נכון דורש תכנון מראש (סכמת DB, middleware) — אבל קריטי מרגע שיש יותר מלקוח אחד."
        realWorld="בפרויקט המודול הבא (בסיסי, לא מלא) תוסיף שכבת הרשאה ראשונה ל-AtlasDesk — לא multi-tenancy מלא, אבל צעד ראשון בכיוון."
      />
    ),
  },
  { id: "quiz", label: "בוחן ידע", content: <QuizEngine questions={QUIZ} /> },
  {
    id: "real-world-task",
    label: "משימה מעשית",
    content: (
      <RealWorldTask
        id="saas-build-multi-tenancy-fundamentals"
        title="תכנן סכמת multi-tenancy עתידית ל-AtlasDesk"
        context="עבוד עם Claude Code — תכנון בלבד, לא מימוש מלא (זה יקרה בהדרגה בעתיד)."
        steps={[
          "בקש מ-Claude Code להציע איך טבלת conversations (אם הייתה קיימת ב-DB, לא רק localStorage) הייתה נראית עם tenant_id.",
          "דון: איזו גישה (shared DB או DB נפרד) הייתה מתאימה יותר ל-AtlasDesk בשלב הראשוני, ולמה?",
          "תכננו middleware/helper משותף שהיה אוכף סינון tenant_id בכל שאילתה, כדי למנוע טעויות אנוש.",
        ]}
        successCriteria={[
          "יש לך סכמת טבלה עם tenant_id ברורה",
          "יש לך החלטה מנומקת בין shared/DB-נפרד",
          "יש לך רעיון קונקרטי למניעת שכחת פילטר",
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
          חפש דוגמה תיעודית (blog post) של חברת SaaS שסבלה מדליפת נתונים בין לקוחות בגלל בעיית
          multi-tenancy. מה הייתה הסיבה השורשית?
        </p>
      </div>
    ),
  },
];

export default function Page() {
  return <LessonShell meta={META} sections={SECTIONS} />;
}
