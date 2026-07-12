"use client";

import { LessonShell, type LessonMeta, type LessonSection } from "@/components/lesson/lesson-shell";
import { SlideDeck, type Slide } from "@/components/slides/slide-deck";
import { ConfusionMatrixLab } from "@/components/simulators/confusion-matrix-lab";
import { ExerciseValidator, type ExerciseConfig } from "@/components/exercises/exercise-validator";
import { QuizEngine, type QuizQuestion } from "@/components/quiz/quiz-engine";

const META: LessonMeta = {
  trackSlug: "ai-foundations",
  moduleSlug: "ml-intro",
  lessonSlug: "success-metrics",
  title: "מדדי הצלחה: Accuracy, Precision, Recall, Overfitting",
  objectives: [
    "להבין למה 'accuracy' לבד יכול להטעות (למשל בזיהוי מחלה נדירה)",
    "להבין Precision ו-Recall ומתי כל אחד חשוב יותר",
    "להבין Overfitting — כשמודל 'משנן' במקום 'מבין'",
  ],
  estMinutes: 25,
  difficulty: "בינוני",
  prerequisites: ["סוגי למידה: מונחית, לא-מונחית, חיזוקית"],
};

const SLIDES: Slide[] = [
  {
    title: "המלכודת של Accuracy",
    bullets: [
      "Accuracy = כמה אחוז מהחיזויים היו נכונים בסך הכל.",
      "בעיה: אם 95% מהמקרים הם 'שליליים' (למשל אנשים בריאים), מודל שתמיד עונה 'שלילי' מקבל 95% accuracy — בלי ללמוד כלום!",
      "לכן צריך מדדים נוספים שמסתכלים על הביצועים לפי סוג הטעות.",
    ],
  },
  {
    title: "Precision ו-Recall",
    bullets: [
      "Precision: מתוך כל מה שהמודל סימן כ'חיובי', כמה באמת היו חיוביים? (חשוב כשטעות חיובית-כוזבת יקרה)",
      "Recall: מתוך כל המקרים החיוביים האמיתיים, כמה המודל תפס? (חשוב כשפספוס מסוכן — כמו אבחון מחלה)",
      "לרוב יש trade-off ביניהם: הידוק אחד מרפה את השני.",
    ],
  },
  {
    title: "Overfitting — כשהמודל 'משנן'",
    bullets: [
      "מודל overfit מבצע מעולה על נתוני האימון, אבל גרוע על נתונים חדשים.",
      "זה כמו תלמיד שלמד בעל פה את התשובות לתרגילים הספציפיים, בלי להבין את העיקרון.",
      "הפתרון: לבדוק תמיד על נתוני test נפרדים שהמודל לא ראה באימון.",
    ],
  },
];

const EXERCISE: ExerciseConfig = {
  id: "success-metrics-ex1",
  prompt:
    "כתוב פונקציה בשם calculateRecall שמקבלת truePositives ו-falseNegatives ומחזירה את ה-Recall כאחוז (0-100), מעוגל למספר שלם.",
  starterCode: `function calculateRecall(truePositives, falseNegatives) {
  // Recall = TP / (TP + FN) * 100
  // TODO: החזר את התוצאה מעוגלת (Math.round)
}`,
  hints: [
    "הנוסחה נתונה בהערה — רק תממש אותה ב-JavaScript.",
    "נסה: return Math.round((truePositives / (truePositives + falseNegatives)) * 100);",
    "טעות נפוצה: לשכוח את הסוגריים סביב truePositives + falseNegatives לפני החילוק — סדר פעולות שגוי ייתן תוצאה שגויה.",
  ],
  solutionCode: `function calculateRecall(truePositives, falseNegatives) {
  return Math.round((truePositives / (truePositives + falseNegatives)) * 100);
}`,
  check: (userFn) => {
    const fn = userFn as (tp: number, fn: number) => number;
    try {
      const result = fn(3, 2);
      if (result === 60) {
        return { passed: true, message: "מדויק! 3/(3+2) = 60% — בדיוק כמו בתרחיש שראית בסימולטור." };
      }
      return { passed: false, message: `קיבלתי ${result}, ציפיתי ל-60.` };
    } catch (e) {
      return { passed: false, message: `שגיאת הרצה: ${(e as Error).message}` };
    }
  },
};

const QUIZ: QuizQuestion[] = [
  {
    id: "q1",
    question: "מודל שמקבל 95% accuracy תמיד טוב?",
    options: [
      "כן, זה תמיד סימן למודל מעולה",
      "לא בהכרח — אם הנתונים לא מאוזנים, accuracy גבוה יכול להסתיר ביצועים גרועים",
      "accuracy הוא המדד היחיד שחשוב",
      "accuracy תמיד שווה ל-recall",
    ],
    correctIndex: 1,
    explanation: "בנתונים לא מאוזנים (כמו מחלה נדירה), accuracy גבוה יכול להיות מטעה — צריך לבדוק גם recall/precision.",
  },
  {
    id: "q2",
    question: "מה זה Overfitting?",
    options: [
      "כשהמודל מהיר מדי",
      "כשהמודל מבצע מעולה על נתוני האימון אבל גרוע על נתונים חדשים",
      "כשיש יותר מדי נתונים",
      "כשהמודל לא רץ בכלל",
    ],
    correctIndex: 1,
    explanation: "Overfitting הוא 'שינון' של נתוני האימון הספציפיים, במקום למידת דפוסים כלליים.",
  },
];

const SECTIONS: LessonSection[] = [
  { id: "slides", label: "מצגת: הרעיון המרכזי", content: <SlideDeck slides={SLIDES} /> },
  {
    id: "simulator",
    label: "סימולטור: מטריצת בלבול (Confusion Matrix) חיה",
    content: <ConfusionMatrixLab />,
  },
  { id: "exercise", label: "תרגיל מודרך", content: <ExerciseValidator exercise={EXERCISE} /> },
  { id: "quiz", label: "בוחן ידע", content: <QuizEngine questions={QUIZ} /> },
  {
    id: "glossary",
    label: "מונחון",
    content: (
      <dl className="grid gap-3 sm:grid-cols-2">
        {[
          ["Accuracy", "אחוז החיזויים הנכונים מתוך כל החיזויים."],
          ["Precision", "מתוך מה שסומן חיובי, כמה היה נכון."],
          ["Recall", "מתוך כל החיוביים האמיתיים, כמה נתפסו."],
          ["Overfitting", "מודל ש'משנן' את נתוני האימון במקום להכליל."],
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
    id: "homework",
    label: "שיעורי בית",
    content: (
      <div className="rounded-xl bg-primary/5 p-4 text-sm">
        <p className="font-semibold">שיעורי בית:</p>
        <p className="mt-1 text-muted">
          בסימולטור למעלה, איזה מהשלושה תרחישים היית בוחר עבור מערכת שסורקת דואר נכנס לזיהוי וירוסים
          מסוכנים? נמק לפי precision מול recall.
        </p>
      </div>
    ),
  },
];

export default function Page() {
  return <LessonShell meta={META} sections={SECTIONS} />;
}
