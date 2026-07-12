"use client";

import { ClipboardList, Boxes, Hammer, CheckCircle2 } from "lucide-react";
import { LessonShell, type LessonMeta, type LessonSection } from "@/components/lesson/lesson-shell";
import { SlideDeck, type Slide } from "@/components/slides/slide-deck";
import { StepDiagram, type DiagramStep } from "@/components/diagrams/step-diagram";
import { PromptComparisonLab } from "@/components/comparisons/prompt-comparison-lab";
import { EngineeringInsights } from "@/components/lesson/engineering-insights";
import { QuizEngine, type QuizQuestion } from "@/components/quiz/quiz-engine";
import { RealWorldTask } from "@/components/exercises/real-world-task";

const META: LessonMeta = {
  trackSlug: "claude-code-mastery",
  moduleSlug: "core-dev-workflows",
  lessonSlug: "building-features-workflow",
  title: "workflow מלא לבניית פיצ'ר מאפס",
  objectives: [
    "לתרגל את התהליך המלא: תכנון→שלד→מימוש→בדיקה עם Claude Code",
    "להבין למה 'שלד קודם, מימוש אחר כך' מייצר קוד יציב יותר",
    "לזהות נקודות עצירה טבעיות לאימות תוך כדי בנייה",
  ],
  estMinutes: 30,
  difficulty: "בינוני",
  prerequisites: ["פרויקט מודול: AtlasDesk מקבל סוכן עם החלטה אוטונומית"],
};

const SLIDES: Slide[] = [
  {
    title: "מודול חדש: מהתכנון לביצוע יומיומי",
    bullets: [
      "עד כה למדת לתכנן (מודול 2) ולהרחיב את AtlasDesk עם יכולות AI (MCP/RAG/Agents). המודול הזה חוזר ליסודות: איך בונים כל פיצ'ר — לא רק AI — בעזרת Claude Code בצורה מקצועית וחוזרת.",
    ],
  },
  {
    title: "שלד לפני מימוש מלא",
    bullets: [
      "במקום לבקש 'תממש את הכל בבת אחת', בקש קודם שלד: חתימות פונקציות, טיפוסים, מבנה קבצים — בלי לוגיקה פנימית.",
      "בדוק את השלד (הוא קריא ומהיר לבדוק) לפני שממשיכים למימוש המלא — בדיוק כמו architecture-first שלמדת, אבל ברמת קוד ולא רק טיפוסים.",
    ],
  },
];

const STEPS: DiagramStep[] = [
  { icon: ClipboardList, label: "1. תכנון", detail: "מגדירים מטרה/אילוצים/קריטריון הצלחה (כמו במודול 2)." },
  { icon: Boxes, label: "2. שלד", detail: "מבקשים חתימות פונקציות/טיפוסים/מבנה קבצים — בלי לוגיקה פנימית עדיין." },
  { icon: Hammer, label: "3. מימוש", detail: "ממלאים את השלד בלוגיקה האמיתית, צעד-צעד לפי הפירוק שתוכנן." },
  { icon: CheckCircle2, label: "4. בדיקה", detail: "typecheck + build + בדיקה ידנית בדפדפן לפני שממשיכים לפיצ'ר הבא." },
];

const QUIZ: QuizQuestion[] = [
  {
    id: "q1",
    question: "למה לבקש 'שלד' (חתימות פונקציות בלי לוגיקה) לפני מימוש מלא?",
    options: [
      "כי זה חוסך זמן כתיבה בלבד",
      "כי שלד קריא ומהיר לבדוק — אפשר לתפוס בעיית מבנה/ממשק לפני שמשקיעים בלוגיקה מלאה שאולי תצטרך להיכתב מחדש",
      "כי Claude Code לא מסוגל לכתוב לוגיקה מורכבת בבת אחת",
      "זה שלב טכני שאין לו באמת תועלת",
    ],
    correctIndex: 1,
    explanation: "שלד הוא נקודת אימות זולה — הרבה יותר קל לתקן חתימת פונקציה שגויה מאשר לגלות אחרי מימוש מלא שהממשק לא נכון.",
    optionNotes: [
      "לא נכון: החיסכון האמיתי הוא במניעת כתיבה-מחדש, לא רק בזמן כתיבה ראשוני.",
      "התשובה הנכונה: שלד הוא בדיוק נקודת ביקורת זולה — בודקים את המבנה לפני שמשקיעים בפרטים.",
      "לא נכון: Claude Code בהחלט מסוגל לכתוב לוגיקה מורכבת — זו בחירת workflow, לא מגבלת יכולת.",
      "לא נכון: יש תועלת ממשית ומדידה — מניעת עבודה כפולה על מימוש שהתברר כמבוסס על ממשק שגוי.",
    ],
  },
];

const SECTIONS: LessonSection[] = [
  { id: "slides", label: "מצגת: מהתכנון לביצוע", content: <SlideDeck slides={SLIDES} /> },
  { id: "flow", label: "ה-workflow המלא", content: <StepDiagram steps={STEPS} /> },
  {
    id: "comparison",
    label: "השוואה: מימוש ישיר מול שלד-ואז-מימוש",
    content: (
      <PromptComparisonLab
        title="הוספת פיצ'ר 'תגיות לשיחות' ב-AtlasDesk"
        unitLabel="workflow"
        bad={{
          label: "מימוש מלא ישיר",
          content: `"תוסיף תגיות לשיחות ב-AtlasDesk, עם UI לניהול תגיות
וסינון לפי תגית" — בקשה אחת, מימוש מלא ישר`,
          outcome: "הסוכן בוחר מבנה נתונים וממשק בעצמו; אם זה לא תואם את הצורך האמיתי (למשל תגית אחת בלבד לשיחה, לא כמה) — מתגלה רק אחרי שהכל כבר נכתב.",
        }}
        good={{
          label: "שלד קודם",
          content: `"תציע קודם רק את הטיפוסים: Tag, ConversationWithTags,
וחתימות הפונקציות addTag/removeTag/filterByTag — בלי
לוגיקה פנימית או UI עדיין"`,
          outcome: "בודקים את החוזה (למשל: conversation.tags: Tag[] — מאפשר כמה תגיות) לפני שמשקיעים במימוש ה-UI המלא.",
        }}
        takeaway="שלד הוא הרחבה טבעית של architecture-first לרמת קוד ממשי — לא רק טיפוסי נתונים מופשטים, אלא גם חתימות הפונקציות שישתמשו בהם."
      />
    ),
  },
  {
    id: "engineering",
    label: "לחשוב כמו מהנדס AI",
    content: (
      <EngineeringInsights
        why="workflow מובנה (תכנון→שלד→מימוש→בדיקה) קיים כי הוא מפצל משימה מורכבת לנקודות אימות זולות, בדיוק כמו decomposition שלמדת — רק שכאן זה ברמת קוד קונקרטי."
        alternatives="פיתוח 'זורם' (לבקש הכל ולתקן תוך כדי) עובד למשימות קטנות שקל לתקן; הופך מסוכן ככל שהפיצ'ר גדול/מורכב יותר."
        whenNotTo="לתיקון קטן (שינוי טקסט, תיקון typo) — כל התהליך המובנה הזה הוא overhead מיותר."
        commonMistakes="לדלג משלד ישר למימוש בלי לבדוק את השלד בעצמו — מאבדים את הערך של השלב הזול הזה."
        cost="שלד+בדיקה מוסיפים סיבוב תקשורת אחד, אבל חוסכים כתיבה-מחדש יקרה כשמתגלה בעיית ממשק מאוחר מדי."
        realWorld="בפרויקט המודול תשתמש בדיוק בתהליך הזה יחד עם TDD (שיעור 4) לבניית פיצ'ר אמיתי ב-AtlasDesk."
      />
    ),
  },
  { id: "quiz", label: "בוחן ידע", content: <QuizEngine questions={QUIZ} /> },
  {
    id: "real-world-task",
    label: "משימה מעשית",
    content: (
      <RealWorldTask
        id="core-dev-building-features-workflow"
        title="תרגל שלד-לפני-מימוש על פיצ'ר קטן ב-AtlasDesk"
        context="בחר פיצ'ר קטן-בינוני (לדוגמה: מונה תווים בתיבת הקלט, או אינדיקציית 'נשלח' על הודעות)."
        steps={[
          "בקש מ-Claude Code שלד בלבד (חתימות/טיפוסים, בלי לוגיקה) לפני קוד מלא.",
          "עבור על השלד: האם הוא הגיוני? האם משהו חסר?",
          "רק אחרי אישור השלד — בקש מימוש מלא.",
          "הרץ typecheck ובדוק ידנית בדפדפן.",
        ]}
        successCriteria={[
          "ראית שלד לפני מימוש מלא, לא רק תיאורטית",
          "מצאת (או שללת בוודאות) בעיה בשלד לפני שהושקע מימוש",
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
          בפעם הבאה שאתה מבקש פיצ'ר לא-טריוויאלי מ-Claude Code (בכל פרויקט), נסה לבקש שלד קודם
          במפורש. שים לב אם זה חוסך לך סבב תיקונים מאוחר יותר.
        </p>
      </div>
    ),
  },
];

export default function Page() {
  return <LessonShell meta={META} sections={SECTIONS} />;
}
