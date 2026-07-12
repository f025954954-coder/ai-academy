"use client";

import { LessonShell, type LessonMeta, type LessonSection } from "@/components/lesson/lesson-shell";
import { SlideDeck, type Slide } from "@/components/slides/slide-deck";
import { EngineeringInsights } from "@/components/lesson/engineering-insights";
import { QuizEngine, type QuizQuestion } from "@/components/quiz/quiz-engine";
import { RealWorldTask } from "@/components/exercises/real-world-task";

const META: LessonMeta = {
  trackSlug: "claude-code-mastery",
  moduleSlug: "foundations-setup",
  lessonSlug: "project-atlasdesk-onboarding",
  title: "פרויקט מודול: קליטת AtlasDesk ל-Claude Code",
  objectives: [
    "לכתוב CLAUDE.md אמיתי לפרויקט AtlasDesk",
    "לבצע סבב תכנון ראשון עם Claude Code על קוד אמיתי בפרודקשן",
    "לתעד את ה-onboarding כתהליך חוזר לכל פרויקט עתידי",
  ],
  estMinutes: 40,
  difficulty: "בינוני",
  prerequisites: ["context-management-fundamentals"],
};

const SLIDES: Slide[] = [
  {
    title: "פרויקט המודול: הפעם זה אמיתי",
    bullets: [
      "עד עכשיו תרגלת על דוגמאות מבודדות. עכשיו תבצע את התהליך המלא — התקנה, CLAUDE.md, ניהול context — על AtlasDesk עצמו: אפליקציה אמיתית שרצה בפרודקשן, עם קוד אמיתי, שממשיכה לגדול בכל מודול הבא.",
      "מה שתבנה כאן (CLAUDE.md מתועד + תהליך onboarding) יישאר חלק מהריפו וישרת אותך (ואת כל תלמיד אחר) בכל שיעור עתידי בטראק.",
    ],
  },
  {
    title: "מה זה 'onboarding' לפרויקט קיים",
    bullets: [
      "כשמצטרפים לפרויקט קיים (בין אם כמפתח אנושי או כסוכן AI), יש שלב ראשוני של הבנת המבנה, המוסכמות, וההיסטוריה — לפני שנוגעים בקוד.",
      "מהנדסים מנוסים לא מדלגים על השלב הזה גם כשהם 'ממהרים' — כי דילוג עליו הוא הדרך הכי בטוחה לייצר קוד שלא מתאים לפרויקט.",
      "onboarding טוב מסתיים בתוצר: CLAUDE.md מעודכן, לא רק 'הבנה בראש' של מי שעשה אותו.",
    ],
  },
];

const QUIZ: QuizQuestion[] = [
  {
    id: "q1",
    question: "למה onboarding טוב חייב להסתיים בתוצר כתוב (כמו CLAUDE.md מעודכן), לא רק בהבנה?",
    options: [
      "כדי שיהיה מסמך רשמי לצורך פורמליות",
      "כי הבנה שנשארת רק אצל אדם/סשן אחד לא עוברת הלאה לסשן הבא או למפתח הבא — צריך שהמידע יהיה נגיש לכל מי שיצטרף אחר כך",
      "אין סיבה אמיתית, זו רק מוסכמה",
      "כי Claude Code דורש את זה טכנית",
    ],
    correctIndex: 1,
    explanation: "הידע חייב 'לצאת מהראש' ולהיכתב — אחרת כל סשן/מפתח חדש יצטרך לעשות את אותה עבודת גילוי מחדש.",
    optionNotes: [
      "לא נכון: זו לא שאלה של פורמליות — יש סיבה תפקודית ממשית, לא רק 'רשמיות' חסרת תוכן.",
      "התשובה הנכונה: Claude Code לא 'זוכר' סשנים קודמים, וגם מפתחים אנושיים מתחלפים — התוצר הכתוב הוא הדרך היחידה שהידע לא ילך לאיבוד ברגע שהסשן/האדם שגילה אותו עוזב.",
      "לא נכון: יש סיבה מאוד אמיתית וקונקרטית (ראה התשובה הנכונה) — זו לא רק מוסכמה שרירותית.",
      "לא נכון: אין דרישה טכנית מ-Claude Code עצמו — התוצר הכתוב נחוץ מסיבות הנדסיות/ארגוניות, לא בגלל מגבלת תוכנה.",
    ],
  },
];

const SECTIONS: LessonSection[] = [
  { id: "slides", label: "מצגת: הפרויקט הראשון בטראק", content: <SlideDeck slides={SLIDES} /> },
  {
    id: "engineering",
    label: "לחשוב כמו מהנדס AI",
    content: (
      <EngineeringInsights
        why="פרויקט מודול זה קיים כי קריאה על תהליך לא שקולה לביצוע שלו בפועל על קוד אמיתי — עם כל האי-סדר, ההיסטוריה, וההחלטות הישנות שקוד אמיתי מכיל, בניגוד לדוגמאות נקיות מספר לימוד."
        alternatives="יכולנו לתת פרויקט 'AtlasDesk mini' מנוקה במיוחד לצורך התרגול — אבל זה בדיוק מפספס את הנקודה: הקושי האמיתי הוא לעבוד עם קוד אמיתי שכבר קיים, לא עם דוגמה מלאכותית."
        whenNotTo="—"
        commonMistakes="לכתוב CLAUDE.md 'תיאורטי' בלי לפתוח באמת סשן ולבדוק אם הוא עוזר בפועל — האימות האמיתי הוא בשימוש, לא בכתיבה."
        cost="השקעה חד-פעמית של 30-40 דקות עכשיו חוסכת עשרות דקות בכל סשן עתידי על הפרויקט — לאורך כל שאר הטראק."
        realWorld="זו בדיוק העבודה שכל מהנדס AI עושה ביום הראשון שלו בכל חברה: מכיר את הקוד, כותב/מעדכן הנחיות לסוכן, ומוודא שהתהליך עובד לפני שממשיכים."
      />
    ),
  },
  {
    id: "real-world-task",
    label: "המשימה המרכזית של המודול",
    content: (
      <RealWorldTask
        id="cc-project-atlasdesk-onboarding"
        title="בצע קליטה מלאה של AtlasDesk ל-Claude Code"
        context="זהו פרויקט המודול — המשימה המסכמת של מודול היסודות. עבוד מול הריפו האמיתי של AtlasDesk (המשובט אצלך ממשימות קודמות)."
        steps={[
          "ודא ש-Claude Code מותקן ומחובר (משיעור 1), ופתח סשן בתוך תיקיית הריפו.",
          "בקש מהסוכן לסקור את מבנה הפרויקט המלא ולסכם לך: אילו routes/רכיבים/API endpoints קיימים כרגע.",
          "כתוב/עדכן את CLAUDE.md לפי מה שלמדת בשיעור 2 — ממוקד, פעולתי, ללא כפילות מה-README.",
          "פתח סשן חדש (טרי) ובדוק: הסוכן 'מתנהג' נכון לפי ה-CLAUDE.md בלי שהזכרת את הכללים בפרומפט?",
          "תעד בקצרה (יכול להיות בהערה בסוף השיעור) את תהליך ה-onboarding שביצעת — כדי שתוכל לחזור עליו בקלות בפרויקט הבא שלך.",
        ]}
        successCriteria={[
          "יש CLAUDE.md מעודכן ואמיתי בריפו של AtlasDesk",
          "בדקת בפועל (סשן טרי) שהוא משפיע על התנהגות הסוכן",
          "אתה מסוגל לתאר במילים שלך את 4 השלבים של תהליך ה-onboarding שעברת",
        ]}
      />
    ),
  },
  { id: "quiz", label: "בוחן ידע", content: <QuizEngine questions={QUIZ} /> },
  {
    id: "homework",
    label: "סיכום מודול",
    content: (
      <div className="rounded-xl bg-primary/5 p-4 text-sm">
        <p className="font-semibold">סיימת את מודול היסודות של Claude Code Mastery!</p>
        <p className="mt-1 text-muted">
          למדת: התקנה והגדרה, CLAUDE.md, וניהול context — ויישמת הכל בפועל על AtlasDesk. במודול
          הבא נעבור לחלק המרכזי ביותר של העבודה עם Claude Code: איך לחשוב וכ<em>לתכנן</em> לפני
          שכותבים שורת קוד אחת.
        </p>
      </div>
    ),
  },
];

export default function Page() {
  return <LessonShell meta={META} sections={SECTIONS} />;
}
