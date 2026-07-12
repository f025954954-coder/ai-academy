"use client";

import { LessonShell, type LessonMeta, type LessonSection } from "@/components/lesson/lesson-shell";
import { SlideDeck, type Slide } from "@/components/slides/slide-deck";
import { NeuralNetworkVisualizer } from "@/components/diagrams/neural-network-visualizer";
import { EngineeringInsights } from "@/components/lesson/engineering-insights";
import { ExerciseValidator, type ExerciseConfig } from "@/components/exercises/exercise-validator";
import { QuizEngine, type QuizQuestion } from "@/components/quiz/quiz-engine";

const META: LessonMeta = {
  trackSlug: "ai-foundations",
  moduleSlug: "deep-learning",
  lessonSlug: "neuron-and-network",
  title: "הנוירון המלאכותי ורשת מלאה",
  objectives: [
    "להבין מהו נוירון מלאכותי: קלטים, משקלים, סכימה, פונקציית אקטיבציה",
    "להבין איך נוירונים מתחברים לשכבות ובונים רשת",
    "להריץ forward pass אינטראקטיבי ולראות איך קלט הופך לפלט",
  ],
  estMinutes: 30,
  difficulty: "בינוני",
  prerequisites: ["פרויקט מודול: בניית מסווג ספאם אינטראקטיבי"],
};

const SLIDES: Slide[] = [
  {
    title: "נוירון בודד — המחשבון הפשוט ביותר",
    bullets: [
      "כל נוירון עושה שלוש פעולות: מכפיל כל קלט במשקל שלו, מחבר הכל (+ bias), ומעביר דרך פונקציית אקטיבציה.",
      "פונקציית האקטיבציה (למשל sigmoid) 'מעצבת' את התוצאה — בלעדיה, כל הרשת הייתה רק חיבור לינארי גדול.",
      "נוירון בודד הוא בעצם וריאציה של מה שראית במסווג הספאם — סכימה משוקללת עם סף החלטה.",
    ],
  },
  {
    title: "מרשת אחת נוירונים לרשת עמוקה",
    bullets: [
      "כשמחברים הרבה נוירונים במקביל — זו שכבה (layer).",
      "כשמערימים כמה שכבות אחת אחרי השנייה — זו רשת עמוקה (Deep Neural Network).",
      "כל שכבה 'לומדת' לזהות דפוסים מורכבים יותר, בהתבסס על מה שהשכבה הקודמת זיהתה.",
    ],
  },
];

const EXERCISE: ExerciseConfig = {
  id: "neuron-ex1",
  prompt:
    "כתוב פונקציה בשם neuronOutput שמקבלת מערך inputs, מערך weights (באותו אורך), ו-bias, ומחזירה את סכימת הנוירון (בלי אקטיבציה עדיין) — sum(input[i] * weight[i]) + bias.",
  starterCode: `function neuronOutput(inputs, weights, bias) {
  // TODO: החזר את סכום המכפלות + bias
}`,
  hints: [
    "תצטרך ללולאה (או reduce) שעובר על שני המערכים במקביל.",
    "נסה: return inputs.reduce((sum, x, i) => sum + x * weights[i], 0) + bias;",
    "טעות נפוצה: לשכוח להוסיף את ה-bias בסוף, או להשתמש באינדקס לא נכון.",
  ],
  solutionCode: `function neuronOutput(inputs, weights, bias) {
  return inputs.reduce((sum, x, i) => sum + x * weights[i], 0) + bias;
}`,
  check: (userFn) => {
    const fn = userFn as (i: number[], w: number[], b: number) => number;
    try {
      const result = fn([1, 2], [0.5, 0.5], 1);
      if (Math.abs(result - 2.5) < 0.001) {
        return { passed: true, message: "מדויק! (1×0.5 + 2×0.5) + 1 = 2.5" };
      }
      return { passed: false, message: `קיבלתי ${result}, ציפיתי ל-2.5.` };
    } catch (e) {
      return { passed: false, message: `שגיאת הרצה: ${(e as Error).message}` };
    }
  },
};

const QUIZ: QuizQuestion[] = [
  {
    id: "q1",
    question: "מה תפקיד פונקציית האקטיבציה בנוירון?",
    options: [
      "רק לעצב את הקוד",
      "להוסיף אי-לינאריות, כדי שהרשת תוכל ללמוד דפוסים מורכבים ולא רק קווים ישרים",
      "להאיץ את החישוב",
      "אין לה תפקיד אמיתי",
    ],
    correctIndex: 1,
    explanation: "בלי אקטיבציה, כל הרשת (גם עם 100 שכבות) הייתה שקולה לפונקציה לינארית אחת פשוטה.",
  },
];

const SECTIONS: LessonSection[] = [
  { id: "slides", label: "מצגת: הרעיון המרכזי", content: <SlideDeck slides={SLIDES} /> },
  {
    id: "visualizer",
    label: "ויזואלייזר רשת נוירונים — הרץ Forward Pass",
    content: (
      <div>
        <p className="mb-3 text-sm text-muted">
          שנה את ערכי הקלט ולחץ &quot;הרץ Forward Pass&quot; — צפה איך הערכים זורמים דרך הרשת ומשתנים
          בכל שכבה (המשקלים קבועים לצורך ההדגמה):
        </p>
        <NeuralNetworkVisualizer layers={[3, 4, 2]} layerLabels={["קלט", "שכבה חבויה", "פלט"]} />
      </div>
    ),
  },
  {
    id: "engineering",
    label: "לחשוב כמו מהנדס AI",
    content: (
      <EngineeringInsights
        why="רשתות נוירונים נבחרו כי הן 'קירוב אוניברסלי' — עם מספיק שכבות ונוירונים, הן יכולות ללמוד כמעט כל פונקציה מורכבת ישירות מנתונים, בלי שמתכנתים צריכים לכתוב את הכללים ידנית."
        alternatives="עבור בעיות פשוטות יחסית (כמו מסווג הספאם שבנית), שיטות פשוטות יותר כמו רגרסיה לוגיסטית, עצי החלטה, או k-NN (שנראה בפרויקט המודול) יכולות להספיק — ולהיות מהירות וזולות יותר לאמן ולהריץ."
        whenNotTo="אם יש מעט מאוד נתונים, או שהבעיה פשוטה וניתנת להסבר בכללים ברורים — רשת עמוקה היא 'תותח נגד יתוש': יקרה לאמן, קשה להסביר, ולעיתים פחות מדויקת משיטה פשוטה."
        commonMistakes="מתחילים רבים בונים רשת גדולה מדי לבעיה קטנה (overfitting מיידי), או שוכחים לנרמל את נתוני הקלט (ערכים בטווחים שונים לגמרי פוגעים באימון)."
        performance="גודל הרשת (מספר פרמטרים) קובע ישירות את זמן האימון והריצה. רשתות ענקיות (כמו LLMs) דורשות חומרה ייעודית (GPU/TPU)."
        realWorld="מודלי שפה גדולים כמו Claude הם רשתות נוירונים עצומות (מיליארדי פרמטרים) מסוג טרנספורמר — נעמיק בארכיטקטורה הזו בשיעור הבא על LLMs."
      />
    ),
  },
  { id: "exercise", label: "תרגיל מודרך", content: <ExerciseValidator exercise={EXERCISE} /> },
  { id: "quiz", label: "בוחן ידע", content: <QuizEngine questions={QUIZ} /> },
  {
    id: "glossary",
    label: "מונחון",
    content: (
      <dl className="grid gap-3 sm:grid-cols-2">
        {[
          ["Neuron", "יחידת חישוב בסיסית: משקלים + סכימה + אקטיבציה."],
          ["Weight", "מספר שקובע כמה חשוב כל קלט לנוירון."],
          ["Bias", "ערך קבוע שמוסיף גמישות לנוירון."],
          ["Activation Function", "פונקציה שמוסיפה אי-לינאריות (כמו sigmoid/ReLU)."],
          ["Layer", "קבוצת נוירונים שפועלים במקביל על אותו קלט."],
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
          בוויזואלייזר למעלה, נסה להביא את שני ערכי הפלט לכמה שיותר קרובים זה לזה על ידי שינוי הקלטים
          בלבד. מה זה מלמד אותך על הרגישות של הרשת לקלט?
        </p>
      </div>
    ),
  },
];

export default function Page() {
  return <LessonShell meta={META} sections={SECTIONS} />;
}
