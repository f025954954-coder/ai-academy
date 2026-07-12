"use client";

import { LessonShell, type LessonMeta, type LessonSection } from "@/components/lesson/lesson-shell";
import { SlideDeck, type Slide } from "@/components/slides/slide-deck";
import { PromptComparisonLab } from "@/components/comparisons/prompt-comparison-lab";
import { EngineeringInsights } from "@/components/lesson/engineering-insights";
import { QuizEngine, type QuizQuestion } from "@/components/quiz/quiz-engine";
import { RealWorldTask } from "@/components/exercises/real-world-task";

const META: LessonMeta = {
  trackSlug: "claude-code-mastery",
  moduleSlug: "engineering-discipline",
  lessonSlug: "git-workflows-with-claude-code",
  title: "תהליכי Git עם Claude Code",
  objectives: [
    "לתרגל commits משמעותיים והודעות קומיט שמסבירות 'למה', לא רק 'מה'",
    "להבין ניהול branches בעבודה עם סוכן AI",
    "להכיר את זרימת ה-PR: מ-commit ועד review",
  ],
  estMinutes: 25,
  difficulty: "בינוני",
  prerequisites: ["פרויקט מודול: הרחבת AtlasDesk תוך שמירה על ארכיטקטורה"],
};

const SLIDES: Slide[] = [
  {
    title: "מודול אחרון בטראק: המשמעת שמחזיקה הכל ביחד",
    bullets: [
      "כל מה שבנית לאורך הטראק (AtlasDesk עם 7 יכולות אמיתיות) קיים בזכות היסטוריית git מסודרת — כל commit באקדמיה הזו מתעד גם 'מה' וגם 'למה', כדי שסשן עתידי (שלך או של מישהו אחר) יבין את ההקשר בלי לשאול שוב.",
    ],
  },
  {
    title: "הודעת commit טובה כשעובדים עם AI",
    bullets: [
      "'מה' — מה השתנה בפועל (קבצים, יכולת).",
      "'למה' — למה זה נחוץ, איזו בעיה זה פותר, מה ההחלטה ההנדסית שהתקבלה.",
      "זה קריטי במיוחד עם AI: אם משהו לא ברור לך למה נעשה כך, הודעת commit טובה חוסכת לך לשאול את הסוכן שוב באותה שאלה בסשן הבא.",
    ],
  },
];

const QUIZ: QuizQuestion[] = [
  {
    id: "q1",
    question: "למה הודעת commit טובה צריכה להסביר גם 'למה' ולא רק 'מה'?",
    options: [
      "זה לא באמת חשוב, 'מה' מספיק",
      "כי 'מה' משתנה אפשר לראות מה-diff עצמו; 'למה' הוא המידע שאף פעם לא רואים בקוד עצמו, ונעלם אם לא נכתב",
      "כי git דורש הודעה ארוכה טכנית",
      "כדי שהודעת ה-commit תהיה ארוכה יותר",
    ],
    correctIndex: 1,
    explanation: "ה-diff כבר מראה 'מה השתנה' — הערך המוסף האמיתי של הודעת commit הוא ההקשר וההנמקה שלא נראים בקוד עצמו.",
    optionNotes: [
      "לא נכון: זה קריטי במיוחד בעבודה עם AI — בלי ה'למה', סשן עתידי לא יודע אם מותר לשנות את ההחלטה.",
      "התשובה הנכונה: git diff כבר מראה את ה'מה' — 'למה' הוא המידע היחיד שהודעת הקומיט מוסיפה שלא ניתן לראות בקוד עצמו.",
      "לא נכון: git לא דורש שום פורמט מסוים — זו מוסכמה הנדסית טובה, לא דרישה טכנית.",
      "לא נכון: אורך אינו המטרה — תמציתיות עם תוכן משמעותי עדיפה על אריכות ריקה.",
    ],
  },
];

const SECTIONS: LessonSection[] = [
  { id: "slides", label: "מצגת: Git כמנגנון זיכרון פרויקט", content: <SlideDeck slides={SLIDES} /> },
  {
    id: "comparison",
    label: "השוואה: הודעת commit חלשה מול חזקה (דוגמאות אמיתיות מהאקדמיה)",
    content: (
      <PromptComparisonLab
        title="תיעוד שינוי אמיתי מהיסטוריית האקדמיה"
        unitLabel="הודעת commit"
        bad={{
          label: "רק 'מה'",
          content: `"fix bug in support-chat.tsx"`,
          outcome: "לא ברור איזה באג, למה הוא קרה, או למה הפתרון הזה נבחר. סשן עתידי שרואה את השורה הזו בהיסטוריה לא לומד כלום.",
        }}
        good={{
          label: "'מה' + 'למה' (כפי שנעשה בפועל)",
          content: `"fix: lesson completion check used the full lessonKey
instead of the bare lessonSlug that the progress store
actually saves — button never flipped to 'completed'"`,
          outcome: "כל מי שקורא את זה מבין מיד את הבאג, את שורש הבעיה, ולמה התיקון נכון — בלי לחפור בקוד מחדש.",
        }}
        takeaway="הודעת commit היא תיעוד ל-'סשן העתידי', בין אם זה אתה בעוד חודש או Claude Code בסשן חדש שקורא git log. השקעה קטנה שם חוסכת הרבה זמן חקירה מאוחר יותר."
      />
    ),
  },
  {
    id: "engineering",
    label: "לחשוב כמו מהנדס AI",
    content: (
      <EngineeringInsights
        why="הודעות commit מפורטות קיימות כי git log הוא תיעוד שאף אחד לא צריך לתחזק בנפרד — הוא נכתב ברגע שההקשר הכי טרי בזיכרון."
        alternatives="לתעד החלטות במסמך נפרד (design doc) — עובד להחלטות גדולות, אבל overhead מיותר לרוב השינויים היומיומיים; commit message הוא 'התיעוד הזול' לרוב המקרים."
        whenNotTo="לתיקון טריוויאלי (typo) — הודעת commit קצרה מספיקה, אין צורך בפסקת 'למה' לכל שינוי."
        commonMistakes="לכתוב הודעות commit גנריות ('update', 'fix', 'wip') שלא אומרות כלום — בעוד חודש אף אחד (כולל אתה) לא יזכור מה זה היה."
        cost="הודעת commit טובה עולה כמה שניות נוספות בזמן הכתיבה — חוסכת דקות/שעות של חקירה מאוחרת יותר כשמישהו שואל 'למה זה נעשה ככה'."
        realWorld="כל הקומיטים באקדמיה הזו (אם תסתכל בהיסטוריית ה-git) עוקבים אחר התבנית הזו — זו לא תיאוריה, זו העבודה בפועל."
      />
    ),
  },
  { id: "quiz", label: "בוחן ידע", content: <QuizEngine questions={QUIZ} /> },
  {
    id: "real-world-task",
    label: "משימה מעשית",
    content: (
      <RealWorldTask
        id="engineering-discipline-git-workflows"
        title="שפר הודעת commit קיימת ל'מה+למה'"
        context="עבוד עם היסטוריית git של כל פרויקט (כולל AtlasDesk אם יש לך גישה)."
        steps={[
          "מצא commit ישן עם הודעה גנרית ('fix bug', 'update').",
          "עם Claude Code, קרא את ה-diff של אותו commit ונסה לשחזר: מה השתנה, ולמה (אם אפשר לנחש מהקוד עצמו).",
          "כתוב הודעת commit משופרת (לא חייב להריץ amend על ההיסטוריה האמיתית — רק לתרגל את הניסוח).",
        ]}
        successCriteria={[
          "יש לך דוגמה אמיתית להשוואה בין הודעה גנרית למשופרת",
          "אתה מבין למה ה'למה' חסר בהודעה המקורית",
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
          בקומיט הבא שלך (בכל פרויקט), נסה במודע לכתוב שורה אחת של 'למה' לפני שאתה כותב 'מה'.
          שים לב אם זה משנה את איך אתה חושב על השינוי עצמו.
        </p>
      </div>
    ),
  },
];

export default function Page() {
  return <LessonShell meta={META} sections={SECTIONS} />;
}
