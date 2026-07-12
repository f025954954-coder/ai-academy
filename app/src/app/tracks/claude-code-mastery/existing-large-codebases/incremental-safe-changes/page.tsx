"use client";

import { LessonShell, type LessonMeta, type LessonSection } from "@/components/lesson/lesson-shell";
import { SlideDeck, type Slide } from "@/components/slides/slide-deck";
import { PromptComparisonLab } from "@/components/comparisons/prompt-comparison-lab";
import { EngineeringInsights } from "@/components/lesson/engineering-insights";
import { QuizEngine, type QuizQuestion } from "@/components/quiz/quiz-engine";
import { RealWorldTask } from "@/components/exercises/real-world-task";

const META: LessonMeta = {
  trackSlug: "claude-code-mastery",
  moduleSlug: "existing-large-codebases",
  lessonSlug: "incremental-safe-changes",
  title: "פיתוח פיצ'רים אינקרמנטלי",
  objectives: [
    "להעדיף שינויים קטנים ובטוחים על פני 'מהפכות' גדולות",
    "להבין למה שינוי קטן שקל לבדוק עדיף על שינוי גדול שקשה לאמת",
    "לתרגל פיצול פיצ'ר גדול לסדרת PR/commits קטנים ועצמאיים",
  ],
  estMinutes: 25,
  difficulty: "בינוני",
  prerequisites: ["onboarding-to-existing-code"],
};

const SLIDES: Slide[] = [
  {
    title: "הפרש בין קוד זר לקוד חדש",
    bullets: [
      "בקוד חדש (כמו AtlasDesk בתחילת הדרך), שינוי גדול פחות מסוכן — פחות משתמשים, פחות תלויות.",
      "בקוד קיים וגדול, כל שינוי עלול לגעת בהתנהגות שמשתמשים אמיתיים כבר סומכים עליה — לכן שינויים קטנים ומדודים הם לא רק 'סגנון עבודה נחמד', הם הגנה ממשית.",
    ],
  },
  {
    title: "מ-decomposition (מודול 2) לפירוק commits",
    bullets: [
      "כבר למדת לפרק משימה גדולה לצעדים ניתנים לאימות. כאן מוסיפים שכבה: כל צעד הוא commit/PR עצמאי שאפשר לבדוק, לבקר ואף לבטל (revert) בנפרד מהשאר.",
    ],
  },
];

const QUIZ: QuizQuestion[] = [
  {
    id: "q1",
    question: "למה שינויים קטנים ועצמאיים חשובים יותר בקוד קיים גדול מאשר בפרויקט חדש?",
    options: [
      "אין הבדל אמיתי בין שני המצבים",
      "בקוד קיים יש כבר משתמשים/תלויות שסומכים על ההתנהגות הנוכחית — שינוי גדול מסכן יותר דברים בבת אחת",
      "כי קוד קיים תמיד איטי יותר לקמפל",
      "כי Git לא תומך בשינויים גדולים",
    ],
    correctIndex: 1,
    explanation: "ברגע שיש 'עולם אמיתי' שסומך על ההתנהגות הקיימת (משתמשים, מערכות אחרות), רדיוס הנזק של שינוי גדול וכושל גדול בהרבה.",
    optionNotes: [
      "לא נכון: יש הבדל משמעותי — רדיוס הסיכון שונה בתכלית בין פרויקט חדש לקוד production קיים.",
      "התשובה הנכונה: זה בדיוק ההבדל — קוד קיים 'מוגן' על ידי משתמשים אמיתיים שכל שינוי גדול מסכן.",
      "לא נכון: מהירות קומפילציה לא קשורה לגודל השינוי הלוגי.",
      "לא נכון: Git תומך בכל גודל שינוי טכנית — הסיבה להעדיף שינויים קטנים היא ניהול סיכונים, לא מגבלת כלי.",
    ],
  },
];

const SECTIONS: LessonSection[] = [
  { id: "slides", label: "מצגת: קטן ובטוח מול גדול ומסוכן", content: <SlideDeck slides={SLIDES} /> },
  {
    id: "comparison",
    label: "השוואה: PR ענק מול סדרת PRs קטנים",
    content: (
      <PromptComparisonLab
        title="הוספת מערכת תגיות לשיחות ב-AtlasDesk (פיצ'ר גדול)"
        unitLabel="אסטרטגיית מסירה"
        bad={{
          label: "PR ענק אחד",
          content: `commit יחיד: טיפוסים + UI + סינון + עריכה + מחיקת
תגיות — הכל ביחד, 800+ שורות שינוי`,
          outcome: "אם משהו נשבר בפרודקשן, קשה לדעת מה גרם לזה מתוך 800 שורות. גם revert (ביטול) מבטל את כל הפיצ'ר, לא רק את החלק הבעייתי.",
        }}
        good={{
          label: "סדרת PRs קטנים",
          content: `PR 1: טיפוס Tag + שדה tags בשיחה (בלי UI)
PR 2: UI בסיסי להצגת תגיות קיימות
PR 3: הוספת/הסרת תגית
PR 4: סינון שיחות לפי תגית`,
          outcome: "כל PR נבדק ומאושר בנפרד. אם PR 3 שובר משהו, אפשר לבטל רק אותו — PR 1,2,4 ממשיכים לעבוד.",
        }}
        takeaway="פיצול לשינויים עצמאיים הוא לא רק נוחות תהליכית — הוא מגביל את רדיוס הנזק של כל שינוי בודד, בדיוק כמו decomposition שלמדת, אבל ברמת ה-commit/PR."
      />
    ),
  },
  {
    id: "engineering",
    label: "לחשוב כמו מהנדס AI",
    content: (
      <EngineeringInsights
        why="שינויים אינקרמנטליים קיימים כי הם מגבילים בדיוק כמה קוד חדש 'חשוד' בכל רגע נתון — קל יותר לאתר בעיה בשינוי של 50 שורות מאשר ב-800."
        alternatives="מסירה אחת גדולה (big-bang release) עובדת לפרויקטים קטנים בסיכון נמוך; מסוכנת ככל שהמערכת גדולה/קריטית יותר."
        whenNotTo="לתיקון קטן ומבודד (typo, שינוי צבע) — אין טעם לפרק אותו לכמה PRs."
        commonMistakes="לפרק ל'שלבים' שכל אחד תלוי לגמרי בקודם ולא ניתן לבדיקה עצמאית — זה נותן תחושת פירוק בלי התועלת האמיתית (בדיקה/revert עצמאיים)."
        cost="יותר PRs = יותר overhead תהליכי (סקירות, merges) — אבל חוסך עלות תיקון כשמשהו משתבש, כי קל לאתר ולבטל את השינוי הספציפי."
        realWorld="בפרויקט המודול הבא (הרחבת AtlasDesk) תתרגל בדיוק את זה — לפרק הרחבה לשינויים עצמאיים שכל אחד נבדק בנפרד."
      />
    ),
  },
  { id: "quiz", label: "בוחן ידע", content: <QuizEngine questions={QUIZ} /> },
  {
    id: "real-world-task",
    label: "משימה מעשית",
    content: (
      <RealWorldTask
        id="existing-code-incremental-safe-changes"
        title="פרק פיצ'ר לסדרת commits עצמאיים"
        context="בחר פיצ'ר בינוני-גדול (אמיתי או היפותטי) לפרויקט שאתה מכיר."
        steps={[
          "עם Claude Code, פרק את הפיצ'ר לסדרת commits — כל אחד עומד בפני עצמו ואפשר לבדוק/לבטל בנפרד.",
          "לכל commit, נסח הודעת commit שמתארת מה הוא עושה ולמה (לא רק 'מה').",
          "בדוק: האם באמת אפשר לבטל כל commit בנפרד בלי לשבור את הקודמים?",
        ]}
        successCriteria={[
          "יש לך סדרת commits עצמאיים אמיתית, לא רק פיצול מלאכותי",
          "כל commit עומד בפני עצמו (ניתן לבטל בנפרד)",
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
          עבור על היסטוריית git של פרויקט כלשהו וחפש commit &quot;ענק&quot; (הרבה שורות שינוי). נסה
          לדמיין: איך היית מפרק אותו לסדרת commits קטנים יותר בדיעבד?
        </p>
      </div>
    ),
  },
];

export default function Page() {
  return <LessonShell meta={META} sections={SECTIONS} />;
}
