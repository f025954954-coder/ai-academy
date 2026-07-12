"use client";

import { LessonShell, type LessonMeta, type LessonSection } from "@/components/lesson/lesson-shell";
import { SlideDeck, type Slide } from "@/components/slides/slide-deck";
import { PromptComparisonLab } from "@/components/comparisons/prompt-comparison-lab";
import { EngineeringInsights } from "@/components/lesson/engineering-insights";
import { QuizEngine, type QuizQuestion } from "@/components/quiz/quiz-engine";
import { RealWorldTask } from "@/components/exercises/real-world-task";

const META: LessonMeta = {
  trackSlug: "claude-code-mastery",
  moduleSlug: "core-dev-workflows",
  lessonSlug: "safe-refactoring-workflows",
  title: "תהליכי Refactoring בטוחים",
  objectives: [
    "להבין את העיקרון: refactoring לא משנה התנהגות, רק מבנה",
    "לתרגל refactoring מודרך עם בדיקות לפני/אחרי",
    "לזהות מתי refactoring 'גדול מדי' דורש פירוק לצעדים",
  ],
  estMinutes: 30,
  difficulty: "בינוני",
  prerequisites: ["building-features-workflow"],
};

const SLIDES: Slide[] = [
  {
    title: "הכלל המכונן של Refactoring",
    bullets: [
      "Refactoring = שינוי מבנה הקוד בלי לשנות את ההתנהגות שלו כלפי חוץ. אם ההתנהגות משתנה, זה לא refactoring — זה feature change (או תיקון באג) בתחפושת.",
      "בדוגמה אמיתית מהאקדמיה: כשמצאנו ששלושת נתיבי ה-API (chat/tool-chat/rag-chat) חוזרים על אותו קוד יצירת client ואותה תשובת 'לא מחובר', חילצנו את זה ל-lib/api-routes/anthropic-helpers.ts — אותה התנהגות בדיוק, מבנה קוד נקי יותר.",
    ],
  },
  {
    title: "איך מאמתים ש-refactoring באמת 'בטוח'",
    bullets: [
      "לפני: להריץ/לבדוק את ההתנהגות הקיימת (build, typecheck, בדיקה ידנית).",
      "אחרי: להריץ בדיוק את אותן בדיקות ולוודא תוצאה זהה — לא רק 'זה מתקמפל', אלא 'זה מתנהג אותו דבר'.",
      "בפועל באקדמיה: אחרי חילוץ ה-helpers, נבדק ידנית ב-preview שהצ'אט הרגיל עדיין מחזיר בדיוק את אותה הודעת 'לא מחובר' — לא רק ש-build עבר.",
    ],
  },
];

const QUIZ: QuizQuestion[] = [
  {
    id: "q1",
    question: "מה מגדיר 'refactoring' לעומת שינוי פיצ'ר רגיל?",
    options: [
      "כל שינוי בקוד שנעשה על ידי Claude Code",
      "שינוי מבנה הקוד בלי לשנות את ההתנהגות החיצונית שלו — אם ההתנהגות משתנה, זה לא refactoring",
      "רק שינויים שמקצרים את מספר השורות",
      "כל שינוי שדורש הרצת build מחדש",
    ],
    correctIndex: 1,
    explanation: "ההגדרה המדויקת היא שימור התנהגות — מבנה משתנה, פלט/פעולה כלפי חוץ נשארים זהים.",
    optionNotes: [
      "לא נכון: לא כל שינוי קוד הוא refactoring — התיקון של באג, למשל, הוא שינוי התנהגות מכוון, לא refactoring.",
      "התשובה הנכונה: זו בדיוק ההגדרה — שינוי צורה פנימית, לא תוכן/פלט חיצוני.",
      "לא נכון: refactoring יכול גם להוסיף שורות (למשל הפרדה לפונקציות קטנות יותר) — אורך אינו הקריטריון.",
      "לא נכון: build רץ אחרי כל שינוי קוד, לא רק refactoring — זה לא מבחין ביניהם.",
    ],
  },
];

const SECTIONS: LessonSection[] = [
  { id: "slides", label: "מצגת: refactoring אמיתי מהאקדמיה עצמה", content: <SlideDeck slides={SLIDES} /> },
  {
    id: "comparison",
    label: "השוואה: refactoring בלי רשת ביטחון מול עם",
    content: (
      <PromptComparisonLab
        title="חילוץ lib/api-routes/anthropic-helpers.ts (מקרה אמיתי מהאקדמיה)"
        unitLabel="גישה"
        bad={{
          label: "בלי אימות לפני/אחרי",
          content: `"תחלץ קוד משותף משלושת נתיבי ה-API"
→ מיד commit + push, בלי לבדוק שההתנהגות זהה`,
          outcome: "אם הריפקטור בטעות שינה את מבנה תגובת ה-JSON (למשל השמיט שדה usage), זה נשבר בשקט — הצ'אט בפרודקשן יחזיר תשובות לא-תקינות בלי שאף אחד ישים לב עד שמשתמש מדווח.",
        }}
        good={{
          label: "עם אימות מפורש לפני ואחרי",
          content: `לפני: לבדוק (curl/preview) שהתשובה כשאין מפתח API
נראית כך: {content, usage:{0,0}, connected:false}
אחרי הריפקטור: לבדוק שוב את אותה קריאה בדיוק —
לוודא תגובה זהה byte-for-byte`,
          outcome: "זה בדיוק מה שנעשה באקדמיה עצמה — אחרי חילוץ ה-helpers, /api/ai/chat נבדק שוב ב-preview וב-production וקיבל תגובה זהה למה שהיה לפני הריפקטור.",
        }}
        takeaway="refactoring 'בטוח' לא אומר 'זהיר יותר בכתיבה' — הוא אומר שיש לך דרך קונקרטית לאמת שההתנהגות לא השתנתה, ושאתה באמת מריץ את האימות הזה, לא רק סומך על 'זה נראה בסדר'."
      />
    ),
  },
  {
    id: "engineering",
    label: "לחשוב כמו מהנדס AI",
    content: (
      <EngineeringInsights
        why="refactoring קיים כי קוד תקין אבל מבולגן מאט פיתוח עתידי — אבל בלי אימות שההתנהגות נשמרת, refactoring הופך לגורם סיכון בעצמו."
        alternatives="'להשאיר את זה ככה כי זה עובד' — עובד לטווח קצר, אבל שכפול קוד (כמו שהיה בשלושת נתיבי ה-API) מצטבר לחוב טכני שמאט כל שינוי עתידי."
        whenNotTo="לקוד שעומד להימחק/להתחלף בקרוב — אין טעם ל'לנקות' קוד שלא ימשיך להתקיים."
        commonMistakes="לבצע refactoring גדול מדי בבת אחת (לשנות 5 קבצים בו-זמנית) — אם משהו נשבר, קשה לדעת מה גרם לזה. עדיף refactoring קטן, מאומת, אחד בכל פעם."
        cost="refactoring לא מוסיף value נראה-לעין מיידי (המוצר 'נראה אותו דבר') — אבל חוסך זמן פיתוח עתידי; קשה למכור את זה להנהלה, אבל קריטי לבריאות הקוד לטווח ארוך."
        realWorld="חילוץ ה-anthropic-helpers.ts באקדמיה עצמה הוא הדוגמה החיה — קוד production אמיתי, לא תרגיל מלאכותי."
      />
    ),
  },
  { id: "quiz", label: "בוחן ידע", content: <QuizEngine questions={QUIZ} /> },
  {
    id: "real-world-task",
    label: "משימה מעשית",
    content: (
      <RealWorldTask
        id="core-dev-safe-refactoring-workflows"
        title="מצא ובצע refactoring בטוח בפרויקט אמיתי"
        context="עבוד על AtlasDesk או כל פרויקט אחר שיש לך גישה אליו."
        steps={[
          "עם Claude Code, חפש שכפול קוד (2+ מקומות עם לוגיקה כמעט-זהה).",
          "לפני כל שינוי: הרץ/תעד את ההתנהגות הנוכחית (מה קורה בפועל).",
          "בקש refactoring שמאחד את השכפול, בלי לשנות התנהגות.",
          "אמת שוב את אותה התנהגות בדיוק אחרי השינוי.",
        ]}
        successCriteria={[
          "מצאת שכפול קוד אמיתי, לא רק דוגמה מדומיינת",
          "יש לך תיעוד ברור של 'לפני' ו'אחרי' שמראה התנהגות זהה",
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
          קרא את הקומיט של חילוץ anthropic-helpers.ts (אם יש לך גישה להיסטוריית ה-git של הפרויקט) —
          שים לב איך הודעת הקומיט מתעדת גם את הבעיה (שכפול) וגם את האימות שבוצע.
        </p>
      </div>
    ),
  },
];

export default function Page() {
  return <LessonShell meta={META} sections={SECTIONS} />;
}
