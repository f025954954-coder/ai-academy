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
  lessonSlug: "user-mapping-and-personas",
  title: "מיפוי משתמשים ו-Personas",
  objectives: [
    "להבין למה מוצר AI זקוק להגדרת קהל יעד מדויקת לפני בנייה",
    "לזהות את שלוש ה-personas האמיתיות של AtlasDesk (נציג תמיכה, מנהל צוות, לקוח קצה)",
    "להבין איך persona משפיעה על החלטות עיצוב (למשל: מצב מפתח מיועד למי בדיוק)",
  ],
  estMinutes: 25,
  difficulty: "בינוני",
  prerequisites: ["פרויקט מודול: Runbook ו-Playbook תקריות ל-AtlasDesk"],
};

const SLIDES: Slide[] = [
  {
    title: "טראק אחרון: מ-Production AI ל-SaaS מסחרי",
    bullets: [
      "AtlasDesk הוא היום מוצר AI production-ready. הטראק הזה שואל שאלה שונה: מי בדיוק ישלם עליו, ולמה?",
      "'מצב מפתח' (dev mode) שבנית לאורך כל האקדמיה — לא נועד ללקוח קצה בכלל. זו כבר החלטת persona מרומזת: הוא נועד למפתח/מנהל טכני שבודק את המערכת, לא ללקוח שרוצה רק תשובה.",
    ],
  },
  {
    title: "שלוש ה-personas של AtlasDesk",
    bullets: [
      "לקוח קצה — שולח שאלה, רוצה תשובה מהירה ומדויקת. לא מעניין אותו טוקנים/עלות/ארכיטקטורה.",
      "נציג תמיכה — משתמש ב-AtlasDesk ככלי עבודה, צריך אסקלציה חלקה (מודול Multi-Agent) כשה-AI לא מספיק.",
      "מנהל טכני/Ops — צריך את שכבת הניטור (מודול Production AI), רואה עלויות, מזהה אנומליות.",
    ],
  },
];

const QUIZ: QuizQuestion[] = [
  {
    id: "q1",
    question: "למה 'מצב מפתח' (dev mode) ב-AtlasDesk הוא בעצם עדות להחלטת persona שכבר התקבלה בלי לשים לב?",
    options: [
      "הוא לא קשור לpersonas בכלל, זה רק פיצ'ר טכני",
      "כי הוא נבנה מלכתחילה בשביל מנהל טכני/מפתח שרוצה לראות טוקנים ועלות — לא בשביל לקוח קצה, שלא מעניין אותו המידע הזה כלל",
      "כי כל משתמש רואה את מצב המפתח כברירת מחדל",
      "כי הוא נועד רק לצוות הפיתוח של האקדמיה עצמה"
    ],
    correctIndex: 1,
    explanation: "כל פיצ'ר טכני שנבנה משקף החלטה (מודעת או לא) לגבי מי הוא ה-persona שהוא משרת — dev mode הוא דוגמה מובהקת לכך.",
    optionNotes: [
      "לא נכון: כל פיצ'ר משקף החלטת persona, גם אם היא לא הייתה מודעת בזמן הבנייה.",
      "התשובה הנכונה: dev mode מוצג רק כשמישהו לוחץ עליו במפורש — עיצוב שמניח persona טכני שרוצה פרטים, בניגוד ללקוח קצה רגיל.",
      "לא נכון: dev mode כבוי כברירת מחדל — צריך ללחוץ עליו במפורש.",
      "לא נכון: הוא כלי לגיטימי בתוך AtlasDesk המוצר עצמו, לא רק כלי פנימי לצוות האקדמיה.",
    ],
  },
];

const SECTIONS: LessonSection[] = [
  { id: "slides", label: "מצגת: מי בדיוק ה-persona", content: <SlideDeck slides={SLIDES} /> },
  {
    id: "comparison",
    label: "השוואה: מוצר בלי personas מוגדרים מול עם",
    content: (
      <PromptComparisonLab
        title="עיצוב תכונה חדשה ל-AtlasDesk"
        unitLabel="גישת עיצוב"
        bad={{
          label: "בלי persona מוגדר",
          content: `"תוסיף דשבורד עם כל המידע האפשרי — עלויות, לוגים,
תשובות, הכל באותו מסך"`,
          outcome: "דשבורד עמוס ומבלבל — לקוח קצה לא צריך לראות עלויות טוקנים, ומנהל טכני לא רוצה לחפש נתונים בין שיחות לקוחות.",
        }}
        good={{
          label: "עיצוב לפי persona מוגדר",
          content: `לקוח קצה: ממשק צ'אט נקי (מה שכבר קיים)
מנהל טכני: /api/atlasdesk/stats + מצב מפתח
(מה שכבר נבנה במודול Monitoring)`,
          outcome: "כל persona רואה בדיוק את מה שרלוונטי לו — בדיוק כמו ההפרדה שכבר קיימת בפועל ב-AtlasDesk.",
        }}
        takeaway="AtlasDesk כבר מיישם את העיקרון הזה בלי שנקרא לו כך במפורש — עכשיו אתה יודע לתת לו שם ולהשתמש בו במודע בהחלטות עתידיות."
      />
    ),
  },
  {
    id: "engineering",
    label: "לחשוב כמו מהנדס AI",
    content: (
      <EngineeringInsights
        why="הגדרת personas קיימת כי בלעדיה, כל החלטת עיצוב היא ניחוש — עם personas ברורות, אפשר לשאול 'מי צריך את זה ולמה' לפני שבונים."
        alternatives="לבנות תכונות 'לכולם' בלי הבחנה — מוביל למוצר עמוס שלא משרת אף persona טוב."
        whenNotTo="לכלי פנימי קטן עם משתמש אחד ברור (כמו סקריפט אישי) — personas מיותרות שם."
        commonMistakes="להניח persona בלי לאמת אותה מול משתמשים אמיתיים — 'אני חושב שזה מה שהם רוצים' שונה מ'בדקתי עם משתמשים אמיתיים'."
        cost="הגדרת personas מראש עולה זמן תכנון — חוסכת בנייה של תכונות שאף persona אמיתית לא צריכה."
        realWorld="בפרויקט המודול הבא (מסמך MVP) תשתמש בדיוק ב-3 ה-personas האלו כדי לתעדף אילו יכולות קיימות חשובות ל-MVP, ואילו הן 'נחמד שיהיה'."
      />
    ),
  },
  { id: "quiz", label: "בוחן ידע", content: <QuizEngine questions={QUIZ} /> },
  {
    id: "real-world-task",
    label: "משימה מעשית",
    content: (
      <RealWorldTask
        id="saas-planning-user-mapping-and-personas"
        title="מפה את 3 ה-personas של AtlasDesk לעומק"
        context="עבוד עם Claude Code על הריפו האמיתי של AtlasDesk."
        steps={[
          "עברו יחד על כל תכונות AtlasDesk (8+ יכולות) וסווגו כל אחת: לאיזו persona היא משרתת בעיקר?",
          "מצאו תכונה (אם יש) שלא ברור לאיזו persona היא משרתת — האם היא באמת נחוצה?",
          "דון: מה persona רביעית (למשל: מנהל ארגון שקונה את המוצר) הייתה צריכה שעדיין לא קיים?",
        ]}
        successCriteria={[
          "יש לך טבלה של תכונה→persona לכל 8 היכולות",
          "זיהית לפחות פער אחד (persona שלא משרתים היטב)",
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
          חשוב על מוצר SaaS שאתה משתמש בו. נסה לזהות 2-3 personas שהוא משרת, ואיזה חלק בממשק
          מיועד לכל אחת מהן.
        </p>
      </div>
    ),
  },
];

export default function Page() {
  return <LessonShell meta={META} sections={SECTIONS} />;
}
