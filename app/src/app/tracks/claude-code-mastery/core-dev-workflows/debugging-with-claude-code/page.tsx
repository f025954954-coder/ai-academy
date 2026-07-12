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
  lessonSlug: "debugging-with-claude-code",
  title: "תהליכי Debugging יעילים",
  objectives: [
    "לתת ל-Claude Code הקשר שגיאה נכון (הודעה מלאה, לא רק 'זה לא עובד')",
    "לתרגל debugging מונחה-השערה (hypothesis-driven)",
    "להבין מתי לתת ל-Claude Code לחקור בעצמו ומתי לצמצם את החיפוש בעצמך",
  ],
  estMinutes: 30,
  difficulty: "בינוני",
  prerequisites: ["safe-refactoring-workflows"],
};

const SLIDES: Slide[] = [
  {
    title: "מקרה אמיתי: הבאג ב'סמן שיעור כהושלם'",
    bullets: [
      "באקדמיה הזו התגלה באג אמיתי: כפתור 'סמן שיעור כהושלם' לא התעדכן ל-'הושלם ✓' גם אחרי לחיצה. הדיווח הראשוני היה מעורפל: \"אני לא מצליח לסמן שיעורים כהושלמו\".",
      "התהליך שנעשה בפועל: קריאה מלאה של store.ts (מנגנון השמירה) ושל lesson-shell.tsx (מנגנון התצוגה) — לא רק תיקון 'ניחוש' על סמך התיאור הכללי.",
      "הממצא: completeLesson() שמר את הנתון לפי lessonSlug בודד ('what-is-ai'), אבל lesson-shell.tsx בדק לפי lessonKey מלא ('ai-foundations/ml-intro/what-is-ai') — אף פעם לא תואמים. זו הייתה 'שגיאה שקטה': שום קריסה, רק UI שלא מתעדכן.",
    ],
  },
  {
    title: "מה הפך את החקירה הזו ליעילה",
    bullets: [
      "קריאת שני הקבצים הרלוונטיים *במלואם*, לא רק חיפוש טקסטואלי של 'complete' — כדי לראות את מלוא זרימת הנתונים.",
      "השוואה מפורשת בין מה שה-store שומר לבין מה שה-UI בודק — זה חשף את חוסר ההתאמה מיד.",
      "אימות בפועל בדפדפן (לא רק קריאת קוד) — כדי לוודא שהתיקון עובד, לא רק ש'זה נראה נכון'.",
    ],
  },
];

const QUIZ: QuizQuestion[] = [
  {
    id: "q1",
    question: "מה הפך את חקירת באג 'סמן שיעור כהושלם' ליעילה, לפי מה שנלמד?",
    options: [
      "ניחוש מהיר של הבעיה מתוך הכרות כללית עם React",
      "קריאה מלאה של הקבצים הרלוונטיים (לא רק חיפוש מילת מפתח) והשוואה מפורשת בין מה שנשמר למה שנבדק",
      "הרצת build שוב ושוב עד שהשגיאה נעלמה",
      "לבקש מ-Claude Code לכתוב את הקוד מחדש מאפס",
    ],
    correctIndex: 1,
    explanation: "הבאג היה 'שקט' (אין שגיאה/קריסה) — רק קריאה מלאה של שני הצדדים (שמירה ובדיקה) חשפה את חוסר ההתאמה במפתחות.",
    optionNotes: [
      "לא נכון: ניחוש כללי לא היה מוצא את הבעיה הספציפית הזו — נדרשה בדיקה קונקרטית של הקוד עצמו.",
      "התשובה הנכונה: זו בדיוק הגישה שעבדה — קריאה מלאה חשפה את אי-ההתאמה בין lessonSlug ל-lessonKey.",
      "לא נכון: build לא היה מזהה את הבאג הזה בכלל — הקוד היה תקין תחבירית, הבעיה הייתה לוגית (מפתחות לא תואמים).",
      "לא נכון: כתיבה מחדש מלאה היא overkill מסוכן — התיקון היה שינוי שורה אחת ממוקדת אחרי אבחון מדויק.",
    ],
  },
];

const SECTIONS: LessonSection[] = [
  { id: "slides", label: "מצגת: מקרה בוחן debugging אמיתי", content: <SlideDeck slides={SLIDES} /> },
  {
    id: "comparison",
    label: "השוואה: דיווח מעורפל מול הקשר מלא",
    content: (
      <PromptComparisonLab
        title="דיווח על הבאג ל-Claude Code"
        unitLabel="ניסוח דיווח"
        bad={{
          label: "מעורפל",
          content: `"אני לא מצליח לסמן שיעורים כהושלמו, תקן את זה"`,
          outcome: "אין מספיק הקשר לדעת איפה לחפש — הסוכן עלול להתחיל לבדוק מקומות לא-רלוונזיים (Supabase? React state? UI styling?) לפני שמגיע לבעיה האמיתית.",
        }}
        good={{
          label: "עם הקשר קונקרטי",
          content: `"לוחצים על כפתור 'סמן שיעור כהושלם' — הכפתור לא הופך ל-
disabled ולא מציג 'הושלם'. קרא את src/lib/progress/store.ts
ו-src/components/lesson/lesson-shell.tsx במלואם והשווה איך
כל אחד מהם מתייחס למזהה השיעור."`,
          outcome: "כיוון ישיר לשני הקבצים הרלוונטיים ולסוג ההשוואה הנדרשת — בדיוק מה שהוביל לגילוי המהיר של אי-ההתאמה בין lessonSlug ל-lessonKey.",
        }}
        takeaway="דיווח באג טוב הוא לא רק 'מה קרה' — הוא גם 'איפה כדאי לחפש' ו'מה בדיוק ההתנהגות השגויה'. ככל שההקשר מדויק יותר, כך פחות סבבי ניחוש נדרשים."
      />
    ),
  },
  {
    id: "engineering",
    label: "לחשוב כמו מהנדס AI",
    content: (
      <EngineeringInsights
        why="debugging יעיל עם Claude Code דורש הקשר מדויק כי הסוכן, כמו מפתח אנושי, לא יכול לתקן מה שהוא לא רואה — קריאת קוד רלוונטי במלואו (לא קטעים) חושפת קשרים שקטע קוד בודד מחביא."
        alternatives="'לתת ל-AI לחקור בעצמו' (לחפש בכל הפרויקט) עובד כשאין לך מושג איפה הבעיה; אבל אם אתה כבר יודע את התסמין המדויק (כמו במקרה הזה — כפתור ספציפי), לכוון ישירות לקבצים הרלוונטיים חוסך זמן וטוקנים."
        whenNotTo="לשגיאה ברורה עם stack trace מפורש (למשל TypeError בשורה ספציפית) — שם אין צורך בתהליך חקירה ארוך, ההקשר כבר נתון בהודעת השגיאה עצמה."
        commonMistakes="לדווח על התנהגות ('זה לא עובד') בלי לתאר את ההתנהגות הצפויה מולה — 'לא עובד' יכול להיות עשרות דברים שונים."
        cost="חקירה ממוקדת (קריאת 2 קבצים ספציפיים) עולה הרבה פחות טוקנים מ'תחפש בכל הפרויקט' — דיווח טוב הוא גם אופטימיזציית עלות."
        realWorld="הבאג הזה תועד ב-docs (known-issues / commit history) של האקדמיה עצמה — דוגמה אמיתית ל'שגיאה שקטה' שרק קריאה מלאה ומדויקת חושפת."
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
          ["שגיאה שקטה (silent bug)", "באג שלא גורם לקריסה/שגיאה גלויה — רק להתנהגות שגויה."],
          ["Hypothesis-driven debugging", "לנסח השערה קונקרטית ('הבעיה במפתחות'), ואז לבדוק אותה ישירות."],
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
        id="core-dev-debugging-with-claude-code"
        title="תרגל דיווח באג מדויק על AtlasDesk"
        context="חפש התנהגות שגויה קטנה כלשהי ב-AtlasDesk (או צור אחת בכוונה, למשל שנה זמנית שורה בקוד)."
        steps={[
          "נסח דיווח באג ראשוני 'טבעי' (מה היית כותב באופן ספונטני) — שים בצד.",
          "שכתב אותו לפי העקרונות: התנהגות בפועל מול התנהגות צפויה, קבצים רלוונטיים אם ידועים.",
          "שלח את הגרסה המדויקת ל-Claude Code ובדוק כמה סיבובים לקח לאבחן את הבעיה.",
        ]}
        successCriteria={[
          "יש לך שתי גרסאות דיווח להשוואה",
          "אתה יכול להצביע על פרט קונקרטי שהגרסה המדויקת חסכה זמן חקירה",
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
          בפעם הבאה שאתה נתקל בבאג (בכל פרויקט), לפני שאתה פונה ל-Claude Code, כתוב לעצמך: מה
          קורה בפועל? מה ציפית שיקרה? אילו קבצים לדעתי קשורים? זה בדיוק מבנה הדיווח היעיל שלמדת.
        </p>
      </div>
    ),
  },
];

export default function Page() {
  return <LessonShell meta={META} sections={SECTIONS} />;
}
