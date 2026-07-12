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
  lessonSlug: "ai-assisted-code-review",
  title: "תהליכי Code Review עם Claude Code",
  objectives: [
    "לבקש מ-Claude Code לבקר קוד — גם קוד שהוא עצמו כתב",
    "לבנות checklist ביקורת עקבי (אבטחה, ביצועים, קריאות, כיסוי בדיקות)",
    "להבין את המגבלה: AI reviewer לא מחליף ביקורת אנושית, הוא משלים אותה",
  ],
  estMinutes: 30,
  difficulty: "בינוני",
  prerequisites: ["large-project-organization"],
};

const SLIDES: Slide[] = [
  {
    title: "לבקש ביקורת — גם על קוד שהסוכן עצמו כתב",
    bullets: [
      "נראה פרדוקסלי לבקש מ-Claude Code לבקר קוד שהוא עצמו כתב לפני רגע — אבל בפועל, פרומפט 'עכשיו תבקר את הקוד הזה בעין ביקורתית' (סבב נפרד) מוציא הערות שלא עלו בסבב הכתיבה המקורי.",
      "זה דומה לאיך שמפתחים אנושיים 'ישנים על זה' לפני שהם מגישים PR — פרספקטיבה טרייה חושפת בעיות.",
    ],
  },
  {
    title: "checklist ביקורת עקבי",
    bullets: [
      "אבטחה: קלט משתמש מטופל נכון? יש הרשאות מתאימות לפעולות רגישות?",
      "ביצועים: יש קריאות מיותרות/כפולות? לולאות לא-יעילות?",
      "קריאות: שמות משתנים ברורים? מבנה עקבי לשאר הפרויקט?",
      "בדיקות: יש כיסוי למקרי קצה? (בדיוק כמו TDD ששיעור קודם לימד)",
    ],
  },
];

const QUIZ: QuizQuestion[] = [
  {
    id: "q1",
    question: "למה יש ערך בלבקש מ-Claude Code לבקר קוד שהוא עצמו כתב לפני רגע?",
    options: [
      "אין ערך אמיתי, זה סתם חוזר על עצמו",
      "סבב ביקורת נפרד, עם פרומפט ממוקד-ביקורת, מוציא לפעמים הערות שלא עלו בסבב הכתיבה המקורי — 'פרספקטיבה טרייה' גם בתוך אותה שיחה",
      "כי אחרת הקוד לא יתקמפל",
      "כי זו דרישה טכנית של Claude Code",
    ],
    correctIndex: 1,
    explanation: "פרומפט ממוקד ('בקר את הקוד הזה') מפעיל 'מצב חשיבה' שונה מכתיבה רגילה — בדיוק כמו מפתח אנושי שחוזר לקוד שלו אחרי הפסקה.",
    optionNotes: [
      "לא נכון: יש ערך אמיתי ונצפה בפועל — לא חזרה סתמית.",
      "התשובה הנכונה: זו בדיוק התופעה — פרומפט ממוקד-ביקורת מניב תובנות שונות מפרומפט-כתיבה, גם על אותו קוד.",
      "לא נכון: קומפילציה לא קשורה לזה — ביקורת קוד היא שכבה נוספת מעל תקינות תחבירית.",
      "לא נכון: אין דרישה טכנית כזו — זו בחירת workflow שמשפרת איכות.",
    ],
  },
];

const SECTIONS: LessonSection[] = [
  { id: "slides", label: "מצגת: ביקורת קוד עם AI", content: <SlideDeck slides={SLIDES} /> },
  {
    id: "comparison",
    label: "השוואה: ביקורת מעורפלת מול checklist ממוקד",
    content: (
      <PromptComparisonLab
        title="בקשת ביקורת על קוד חדש"
        unitLabel="ניסוח בקשת ביקורת"
        bad={{
          label: "מעורפל",
          content: `"תבדוק את הקוד הזה"`,
          outcome: "תשובה כללית ('נראה טוב!' או הערות אקראיות) — בלי כיוון ברור, קשה לדעת אם כל ההיבטים החשובים נבדקו.",
        }}
        good={{
          label: "checklist ממוקד",
          content: `"בקר את הקוד הזה לפי: 1) אבטחה — טיפול בקלט משתמש
2) ביצועים — קריאות מיותרות 3) התאמה למוסכמות הקיימות
בפרויקט (בדוק מול קבצים דומים) 4) כיסוי מקרי קצה"`,
          outcome: "ביקורת שיטתית שמכסה את כל הממדים החשובים — לא תלויה במה שהמודל 'בוחר' להעיר עליו באופן חופשי.",
        }}
        takeaway="checklist ביקורת עקבי הופך AI code review מ'הימור על מה יעלה' לתהליך שיטתי וחוזר — בדיוק כמו checklist ביקורת אנושי בצוותי הנדסה בוגרים."
      />
    ),
  },
  {
    id: "engineering",
    label: "לחשוב כמו מהנדס AI",
    content: (
      <EngineeringInsights
        why="checklist ביקורת קיים כי בלעדיו, כל ביקורת AI היא 'מה שקפץ לראש' — לא שיטתית ולא חוזרת על עצמה באותה איכות בכל פעם."
        alternatives="ביקורת חופשית ('תבדוק אם יש בעיות') מהירה יותר לנסח, אבל תוצאתה תלויה במקריות — פעם תמצא בעיית אבטחה, פעם רק סגנון."
        whenNotTo="לשינוי טריוויאלי (typo, שינוי צבע) — checklist מלא הוא overhead מיותר."
        commonMistakes="לסמוך אך ורק על ביקורת AI בלי ביקורת אנושית לקוד קריטי (אבטחה, תשלומים) — AI reviewer הוא כלי משלים, לא תחליף לעין אנושית מנוסה."
        cost="checklist מפורש עולה קצת יותר טוקנים (פרומפט ארוך יותר) אבל חוסך זמן חיפוש בעיות שהיו מתגלות מאוחר יותר, ביוקר רב יותר."
        realWorld="בפרויקט המודול הבא (הרחבת AtlasDesk) תשתמש ב-checklist הזה ממש לפני commit — בדיוק כמו סקירת PR אמיתית בצוות הנדסה."
      />
    ),
  },
  { id: "quiz", label: "בוחן ידע", content: <QuizEngine questions={QUIZ} /> },
  {
    id: "real-world-task",
    label: "משימה מעשית",
    content: (
      <RealWorldTask
        id="existing-code-ai-assisted-code-review"
        title="בנה checklist ביקורת אישי ותרגל אותו על AtlasDesk"
        context="עבוד מול קוד קיים ב-AtlasDesk (למשל lib/atlasdesk/tools.ts או agent-chat/route.ts)."
        steps={[
          "בנה checklist ביקורת של 4-5 נקודות (אבטחה, ביצועים, קריאות, כיסוי בדיקות, התאמה למוסכמות).",
          "בקש מ-Claude Code ביקורת מלאה לפי ה-checklist על קובץ קיים.",
          "בדוק: האם עלתה הערה שלא היית חושב עליה לבד?",
        ]}
        successCriteria={[
          "יש לך checklist כתוב שאתה יכול לחזור עליו בעתיד",
          "קיבלת ביקורת שיטתית, לא רק 'זה נראה בסדר'",
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
          קח את ה-checklist שבנית והשתמש בו על ה-Pull Request הבא שלך (בכל פרויקט) — לפני שאתה
          מבקש ביקורת אנושית. ראה כמה הערות אתה כבר תופס בעצמך מראש.
        </p>
      </div>
    ),
  },
];

export default function Page() {
  return <LessonShell meta={META} sections={SECTIONS} />;
}
