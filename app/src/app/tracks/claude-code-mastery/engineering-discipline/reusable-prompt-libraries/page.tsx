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
  lessonSlug: "reusable-prompt-libraries",
  title: "ספריות פרומפטים ותבניות לשימוש חוזר",
  objectives: [
    "לבנות 'playbook' אישי של פרומפטים שחוזרים על עצמם",
    "להבין מתי כדאי להפוך פרומפט חד-פעמי לתבנית מתועדת",
    "לתעד תבניות בצורה שקל לשתף עם צוות",
  ],
  estMinutes: 25,
  difficulty: "בינוני",
  prerequisites: ["session-context-preservation"],
};

const SLIDES: Slide[] = [
  {
    title: "כבר כתבת עשרות פרומפטים חוזרים — בלי לשים לב",
    bullets: [
      "לאורך הטראק, כתבת שוב ושוב וריאציות של אותם פרומפטים: 'תסקור את מבנה הפרויקט', 'תציע תוכנית לפני קוד', 'בקר את הקוד הזה לפי checklist'.",
      "playbook הוא פשוט לקבץ את אלו במקום אחד מתועד, כדי לא לנסח אותם מאפס בכל פעם.",
    ],
  },
  {
    title: "מתי להפוך פרומפט לתבנית",
    bullets: [
      "אם כתבת גרסה דומה של אותו פרומפט 3+ פעמים — זה מועמד טוב לתבנית.",
      "תבנית טובה כוללת: placeholder למה שמשתנה (למשל [שם הפיצ'ר]) + הקשר קבוע (המוסכמות שרלוונטיות תמיד).",
    ],
  },
];

const QUIZ: QuizQuestion[] = [
  {
    id: "q1",
    question: "מהו קריטריון טוב להחליט אם פרומפט מסוים 'שווה' להפוך לתבנית מתועדת?",
    options: [
      "כל פרומפט ששלחת פעם אחת צריך להפוך לתבנית",
      "אם שלחת גרסה דומה של אותו פרומפט 3+ פעמים — זה סימן שהוא חוזר על עצמו ושווה תיעוד",
      "רק פרומפטים שקשורים לאבטחה",
      "רק פרומפטים ארוכים מ-100 מילים",
    ],
    correctIndex: 1,
    explanation: "תדירות השימוש היא האינדיקציה הכי טובה — אם אתה מנסח משהו דומה שוב ושוב, יש ערך בתיעוד התבנית פעם אחת.",
    optionNotes: [
      "לא נכון: זה יהיה overhead עצום — לא כל פרומפט חד-פעמי שווה תיעוד.",
      "התשובה הנכונה: תדירות חזרה היא הסימן הברור ביותר לתבנית ששווה לתעד ולשמור.",
      "לא נכון: הקריטריון הוא תדירות שימוש, לא נושא ספציפי (אבטחה או אחר).",
      "לא נכון: אורך הפרומפט לא קשור לשאלה אם הוא חוזר על עצמו — פרומפט קצר יכול לחזור בדיוק כמו ארוך.",
    ],
  },
];

const SECTIONS: LessonSection[] = [
  { id: "slides", label: "מצגת: מפרומפטים חוזרים ל-playbook", content: <SlideDeck slides={SLIDES} /> },
  {
    id: "comparison",
    label: "השוואה: לנסח מחדש כל פעם מול תבנית מתועדת",
    content: (
      <PromptComparisonLab
        title="בקשת תוכנית לפני קוד (חוזרת מכל הטראק)"
        unitLabel="גישה"
        bad={{
          label: "ניסוח מחדש כל פעם",
          content: `סשן 1: "תציע תוכנית לפני שאתה כותב קוד, כולל אילו
קבצים ישתנו"
סשן 15: "קודם תראה לי תוכנית, מה בדיוק ישתנה, לפני
מימוש בפועל"`,
          outcome: "כל פעם מנוסח מעט אחרת — לפעמים שוכחים לבקש רשימת קבצים, לפעמים לא מבקשים אישור מפורש לפני ביצוע. חוסר עקביות קטן אבל מצטבר.",
        }}
        good={{
          label: "תבנית מתועדת ב-playbook",
          content: `## תבנית: תכנון-לפני-קוד
"תציע תוכנית מלאה ל-[המשימה] לפני כל קוד, כולל:
1. אילו קבצים ישתנו 2. סדר הפעולות 3. החלטות מרכזיות
והנמקתן. אל תכתוב קוד עד שאני מאשר את התוכנית."`,
          outcome: "אותו ניסוח מדויק בכל פעם, שכולל את כל האלמנטים החשובים (רשימת קבצים, סדר, אישור מפורש) — בלי להסתמך על זיכרון.",
        }}
        takeaway="playbook הוא לא בירוקרטיה — הוא הדרך למנוע 'שכחה' של אלמנטים חשובים בפרומפט שכבר גילית שעובד. בדיוק כמו CLAUDE.md, הוא תיעוד שחוסך חשיבה חוזרת."
      />
    ),
  },
  {
    id: "engineering",
    label: "לחשוב כמו מהנדס AI",
    content: (
      <EngineeringInsights
        why="ספריית פרומפטים קיימת כי פרומפטים טובים הם תוצר של איטרציה — פעם שגילית ניסוח שעובד היטב, אין טעם 'להמציא אותו מחדש' בכל פעם."
        alternatives="לנסח כל פרומפט מחדש לפי תחושת בטן — עובד, אבל לא עקבי ולא ניתן לשיתוף עם שאר הצוות."
        whenNotTo="לפרומפט חד-פעמי אמיתי (שאלה ספציפית שלא תחזור) — תיעוד שלו הוא בזבוז זמן."
        commonMistakes="לבנות playbook ואז לא להשתמש בו בפועל (לחזור לניסוח אד-הוק) — הערך שלו הוא רק אם באמת חוזרים אליו."
        cost="תיעוד תבנית עולה כמה דקות פעם אחת — חוסך את אותן דקות (וחוסר עקביות) בכל שימוש עתידי."
        realWorld="בפרויקט המודול הבא תבנה playbook אמיתי ל-AtlasDesk מכל התבניות שהשתמשת בהן לאורך הטראק כולו."
      />
    ),
  },
  { id: "quiz", label: "בוחן ידע", content: <QuizEngine questions={QUIZ} /> },
  {
    id: "real-world-task",
    label: "משימה מעשית",
    content: (
      <RealWorldTask
        id="engineering-discipline-reusable-prompt-libraries"
        title="זהה 3 פרומפטים חוזרים מהעבודה שלך והפוך אותם לתבניות"
        context="חשוב על העבודה שלך עם Claude Code לאורך כל הטראק הזה."
        steps={[
          "זהה 3 פרומפטים/בקשות שחזרת עליהם בניסוחים דומים כמה פעמים.",
          "לכל אחד, כתוב תבנית עם placeholder למה שמשתנה.",
          "שמור אותם במסמך אחד (playbook אישי) שתוכל לחזור אליו.",
        ]}
        successCriteria={[
          "יש לך 3 תבניות אמיתיות מהעבודה שלך, לא מדומיינות",
          "כל תבנית כוללת placeholder ברור למה שמשתנה בין שימושים",
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
          שתף את ה-playbook שבנית עם חבר/עמית (או קרא אותו שוב אתה עצמך בעוד שבוע) — האם הוא
          מספיק ברור שמישהו אחר יכול להשתמש בו בלי הסבר נוסף?
        </p>
      </div>
    ),
  },
];

export default function Page() {
  return <LessonShell meta={META} sections={SECTIONS} />;
}
