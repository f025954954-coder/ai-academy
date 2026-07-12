"use client";

import { LessonShell, type LessonMeta, type LessonSection } from "@/components/lesson/lesson-shell";
import { SlideDeck, type Slide } from "@/components/slides/slide-deck";
import { PromptComparisonLab } from "@/components/comparisons/prompt-comparison-lab";
import { EngineeringInsights } from "@/components/lesson/engineering-insights";
import { QuizEngine, type QuizQuestion } from "@/components/quiz/quiz-engine";
import { RealWorldTask } from "@/components/exercises/real-world-task";

const META: LessonMeta = {
  trackSlug: "ai-integration",
  moduleSlug: "mcp-tools",
  lessonSlug: "building-first-mcp-server",
  title: "בניית שרת MCP ראשון עם Claude Code",
  objectives: [
    "לתכנן ולממש שרת MCP מינימלי (כלי בודד) בעזרת Claude Code",
    "להבין מתי MCP server נפרד עדיף על tool calling מובנה, ומתי לא",
    "לחבר את השרת ל-Claude Code עצמו ולבדוק אותו בסשן אמיתי",
  ],
  estMinutes: 40,
  difficulty: "מתקדם",
  prerequisites: ["mcp-protocol-architecture"],
};

const SLIDES: Slide[] = [
  {
    title: "מה נבנה בשיעור הזה",
    bullets: [
      "שרת MCP מינימלי, מקומי (stdio transport) — כלי בודד: 'ספירת קבצים בתיקייה'. פשוט מספיק להבין את המבנה, אמיתי מספיק שתראה אותו עובד בפועל בתוך Claude Code.",
      "זה קורה על המחשב שלך, לא בפרויקט AtlasDesk (Vercel serverless) — בדיוק כי למדת בשיעור הקודם ש-MCP server נפרד לא מתאים ל-AtlasDesk. פרויקט נפרד, קטן, הוא הדרך הנכונה לתרגל את זה.",
    ],
  },
  {
    title: "תהליך העבודה: architecture-first, כמו שלמדת",
    bullets: [
      "1. תכנון: מה בדיוק הכלי עושה, אילו פרמטרים הוא מקבל, מה הוא מחזיר.",
      "2. מימוש: שימוש ב-SDK הרשמי של MCP (יש חבילות npm רשמיות) עם Claude Code.",
      "3. חיבור: הוספת השרת להגדרות Claude Code (קובץ קונפיגורציה שמצביע על השרת).",
      "4. בדיקה: פתיחת סשן Claude Code חדש ווידוא שהכלי החדש 'מופיע' ונקרא נכון.",
    ],
  },
];

const QUIZ: QuizQuestion[] = [
  {
    id: "q1",
    question: "למה השיעור הזה בונה שרת MCP בפרויקט נפרד ולא בתוך AtlasDesk?",
    options: [
      "כי אי אפשר טכנית להוסיף MCP server ל-Next.js",
      "כי בשיעור הקודם נלמד ש-AtlasDesk (אפליקציית Vercel serverless) לא מתאימה לתהליך MCP נפרד — הפרויקט הנפרד הוא הבחירה ההנדסית הנכונה להדגמה",
      "כי AtlasDesk כבר מלא מדי ואין מקום לעוד קוד",
      "אין סיבה מיוחדת, זה שרירותי",
    ],
    correctIndex: 1,
    explanation: "זו החלטה ארכיטקטונית מודעת, לא מגבלה טכנית — כפי שנלמד בשיעור הקודם, MCP server נפרד דורש תהליך שרץ, מה שלא מתאים לאפליקציית serverless כמו AtlasDesk.",
    optionNotes: [
      "לא נכון: זה כן טכנית אפשרי (אפשר להריץ תהליכי Node נפרדים גם לצד Next.js) — הבעיה היא ארכיטקטונית/תפעולית, לא טכנית.",
      "התשובה הנכונה: זו יישום ישיר של מה שנלמד בשיעור הקודם — MCP server דורש תהליך תמידי, וזה לא מתאים ל-serverless.",
      "לא נכון: אין מגבלת 'מקום' בקוד — זו לא הסיבה האמיתית.",
      "לא נכון: ההחלטה מבוססת בדיוק על הנימוק ההנדסי מהשיעור הקודם, לא שרירותית.",
    ],
  },
];

const SECTIONS: LessonSection[] = [
  { id: "slides", label: "מצגת: מה נבנה ולמה", content: <SlideDeck slides={SLIDES} /> },
  {
    id: "comparison",
    label: "השוואה: לבנות MCP server בלי תכנון מול עם תכנון",
    content: (
      <PromptComparisonLab
        title="גישה לבניית השרת הראשון שלך"
        unitLabel="גישה"
        bad={{
          label: "ישר לקוד",
          content: `"תבנה לי שרת MCP" (בלי לפרט מה הכלי עושה, אילו
פרמטרים, מה מוחזר)`,
          outcome: "הסוכן ינחש מבנה כלשהו — אולי לא בדיוק מה שרצית, ותצטרך סבב תיקונים כדי להגיע למה שהתכוונת אליו במקור.",
        }}
        good={{
          label: "תכנון קודם (כמו שלמדת במודול Claude Code Mastery)",
          content: `"תכנן איתי שרת MCP עם כלי בודד: count_files_in_dir.
קלט: path (string). פלט: מספר קבצים (לא תיקיות) בנתיב הזה.
תציג לי תוכנית לפני שאתה כותב קוד."`,
          outcome: "החוזה (קלט/פלט) מוגדר מראש, בדיוק כמו architecture-first שלמדת. המימוש הופך למכני ופשוט לאמת.",
        }}
        takeaway="כל מה שלמדת במודול Claude Code Mastery (פרומפט מדויק, תכנון לפני ביצוע, architecture-first) חל במלואו גם כאן — MCP הוא רק עוד סוג פרויקט, לא סיבה לזרוק את המשמעת ההנדסית."
      />
    ),
  },
  {
    id: "engineering",
    label: "לחשוב כמו מהנדס AI",
    content: (
      <EngineeringInsights
        why="שרת MCP מקומי לצורך לימוד נבנה כפרויקט נפרד קטן כי זה מבודד את מורכבות הפרוטוקול (transport, lifecycle) מהלוגיקה העסקית — קל יותר להבין ולבדוק."
        alternatives="חלופה: לדלג על בניית שרת עצמאי ולהסתפק בהבנה תיאורטית מהשיעור הקודם. מומלץ נגד זה — בניית שרת אמיתי, גם מינימלי, היא ההבדל בין 'שמעתי על MCP' ל'יודע לבנות עם MCP'."
        whenNotTo="אם אין לך שום צורך אמיתי ב-tool חדש כרגע — לבנות שרת MCP רק 'כדי להתאמן' בלי מטרה קונקרטית עלול להרגיש מלאכותי; עדיף לקשר תרגול לצורך אמיתי (גם קטן) כשאפשר."
        commonMistakes="לשכוח לבדוק שהשרת באמת מחובר ל-Claude Code (קובץ הקונפיגורציה) לפני שמתפלאים 'למה הכלי לא עובד' — תמיד לוודא את שכבת החיבור לפני שמחפשים באג בלוגיקה עצמה."
        cost="שרת MCP מקומי לצורך לימוד לא עולה כסף (אין קריאות API בשרת עצמו) — העלות היחידה היא זמן הפיתוח."
        realWorld="ארגונים אמיתיים בונים שרתי MCP פנימיים לגישה למערכות קנייניות (CRM פנימי, מסדי נתונים) — זו בדיוק אותה טכניקה שתרגלת כאן, בקנה מידה ארגוני."
      />
    ),
  },
  { id: "quiz", label: "בוחן ידע", content: <QuizEngine questions={QUIZ} /> },
  {
    id: "real-world-task",
    label: "המשימה המרכזית של השיעור",
    content: (
      <RealWorldTask
        id="mcp-building-first-mcp-server"
        title="בנה שרת MCP מינימלי עם Claude Code"
        context="פרויקט נפרד וקטן על המחשב שלך — לא בתוך AtlasDesk."
        steps={[
          "צור תיקיית פרויקט חדשה וקטנה, ופתח בה סשן Claude Code.",
          "תכנן (לפני קוד!) שרת MCP עם כלי בודד: count_files_in_dir(path) שמחזיר את מספר הקבצים בנתיב.",
          "בקש מ-Claude Code לממש את השרת עם ה-SDK הרשמי של MCP (חפש את שם החבילה העדכני בעצמך/עם הסוכן).",
          "חבר את השרת להגדרות Claude Code שלך (קובץ קונפיגורציה מקומי).",
          "פתח סשן Claude Code חדש ובדוק: כשאתה מבקש \"כמה קבצים יש בתיקייה X\", האם הכלי החדש שלך נקרא בפועל?",
        ]}
        successCriteria={[
          "יש לך שרת MCP רץ בפועל (לא רק קוד תיאורטי)",
          "Claude Code בסשן חדש מזהה ומשתמש בכלי שבנית",
          "אתה מבין את ההבדל המעשי בין זה לבין tool calling מובנה שכבר בנית ב-AtlasDesk",
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
          הוסף כלי שני לשרת ה-MCP שבנית (למשל list_file_names_in_dir). תרגל שוב את התהליך: תכנון
          קודם, ואז מימוש — ווודא שהתיאור (description) של הכלי החדש ברור מספיק שהסוכן יידע
          מתי להשתמש בו.
        </p>
      </div>
    ),
  },
];

export default function Page() {
  return <LessonShell meta={META} sections={SECTIONS} />;
}
