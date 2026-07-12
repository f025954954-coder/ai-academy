"use client";

import { LessonShell, type LessonMeta, type LessonSection } from "@/components/lesson/lesson-shell";
import { SlideDeck, type Slide } from "@/components/slides/slide-deck";
import { GradientDescentVisualizer } from "@/components/diagrams/gradient-descent-visualizer";
import { EngineeringInsights } from "@/components/lesson/engineering-insights";
import { QuizEngine, type QuizQuestion } from "@/components/quiz/quiz-engine";

const META: LessonMeta = {
  trackSlug: "ai-foundations",
  moduleSlug: "deep-learning",
  lessonSlug: "training-gradient-descent",
  title: "איך רשת 'לומדת': Loss, Backpropagation, Gradient Descent",
  objectives: [
    "להבין מהי פונקציית loss ולמה מודל שואף למזער אותה",
    "להבין את הרעיון מאחורי gradient descent — צעד-צעד לכיוון מינימום",
    "להבין את ההשפעה הקריטית של learning rate על יציבות האימון",
  ],
  estMinutes: 30,
  difficulty: "בינוני",
  prerequisites: ["הנוירון המלאכותי ורשת מלאה"],
};

const SLIDES: Slide[] = [
  {
    title: "Loss — כמה 'טעינו'",
    bullets: [
      "Loss (פונקציית שגיאה) מודדת כמה רחוקה תחזית המודל מהתשובה הנכונה.",
      "מטרת האימון היא פשוטה מאוד להגדרה: למצוא משקלים שממזערים את ה-loss הממוצע על כל דוגמאות האימון.",
      "ה'קושי' הוא שיש מיליארדי משקלים אפשריים — אי אפשר לנסות את כולם.",
    ],
  },
  {
    title: "Gradient Descent — לרדת במורד ההר",
    bullets: [
      "הגרדיאנט מראה לאיזה כיוון לשנות כל משקל כדי להקטין את ה-loss הכי מהר.",
      "המודל 'צועד' שוב ושוב בכיוון ההפוך לגרדיאנט — כמו כדור שמתגלגל במורד גבעה לכיוון העמק.",
      "Backpropagation הוא האלגוריתם היעיל לחשב את הגרדיאנט הזה עבור כל משקל ברשת עמוקה, שכבה אחורה משכבה.",
    ],
  },
  {
    title: "Learning Rate — גודל הצעד",
    bullets: [
      "Learning rate קטן מדי: האימון איטי מאוד, לוקח נצח להתכנס.",
      "Learning rate גדול מדי: המודל 'קופץ' מעבר למינימום ולפעמים מתבדר לגמרי במקום להתכנס.",
      "מציאת ה-learning rate הנכון היא אחת ההחלטות המעשיות החשובות ביותר באימון מודל.",
    ],
  },
];

const QUIZ: QuizQuestion[] = [
  {
    id: "q1",
    question: "מה קורה אם ה-learning rate גבוה מדי?",
    options: [
      "האימון תמיד ייגמר מהר יותר בהצלחה",
      "המודל עלול 'לקפוץ' מעבר למינימום ולא להתכנס בכלל",
      "אין השפעה על התהליך",
      "המודל תמיד ייתן תוצאה מדויקת יותר",
    ],
    correctIndex: 1,
    explanation: "צעדים גדולים מדי גורמים לכדור 'לדלג' מעבר לעמק במקום לרדת אליו בעדינות.",
  },
  {
    id: "q2",
    question: "מה תפקידו של Backpropagation?",
    options: [
      "לטעון נתונים לזיכרון",
      "לחשב ביעילות את הגרדיאנט עבור כל משקל ברשת, שכבה אחר שכבה מהסוף להתחלה",
      "להציג את תוצאות המודל למשתמש",
      "למחוק משקלים לא נחוצים",
    ],
    correctIndex: 1,
    explanation: "Backpropagation מפיץ את השגיאה אחורה דרך הרשת כדי לחשב כמה כל משקל 'אשם' בשגיאה.",
  },
];

const SECTIONS: LessonSection[] = [
  { id: "slides", label: "מצגת: הרעיון המרכזי", content: <SlideDeck slides={SLIDES} /> },
  {
    id: "visualizer",
    label: "ויזואלייזר: גרור את הכדור למינימום",
    content: <GradientDescentVisualizer />,
  },
  {
    id: "engineering",
    label: "לחשוב כמו מהנדס AI",
    content: (
      <EngineeringInsights
        why="Gradient Descent נבחר כי הוא היעיל ביותר שידוע כרגע לחיפוש משקלים טובים במרחב עצום של אפשרויות — הוא לא מבטיח את הפתרון המושלם, אבל 'מספיק טוב' בפרקטיקה."
        alternatives="קיימות וריאציות רבות: SGD, Adam, RMSprop — כולן וריאציות על אותו רעיון בסיסי עם התאמות לקצב למידה אדפטיבי. לבעיות קטנות, אפילו חיפוש גריד (grid search) יכול לעבוד."
        whenNotTo="אם פונקציית ה-loss אינה גזירה (לא ניתן לחשב גרדיאנט), gradient descent לא רלוונטי — שם משתמשים בשיטות אחרות כמו אלגוריתמים גנטיים."
        commonMistakes="learning rate קבוע לאורך כל האימון (עדיף בדרך כלל להקטין אותו בהדרגה — 'learning rate schedule'), ואי-נרמול נתונים לפני האימון."
        performance="אימון רשתות ענקיות (LLMs) יכול לקחת שבועות על אלפי GPUs — זו הסיבה שאימון מודל שפה מאפס עולה מיליוני דולרים."
        cost="ברוב הפרויקטים המסחריים לא מאמנים LLM מאפס — במקום זאת קוראים ל-API של מודל קיים (כמו Claude), מה שהופך את כל נושא ה-gradient descent לרלוונטי בעיקר להבנה, לא לפעולה יומיומית."
        realWorld="כשאתה קורא ל-Claude API, כל האימון הזה כבר קרה מראש — אתה 'רק' משתמש במודל המאומן. אבל הבנת התהליך עוזרת להבין למה למודלים יש מגבלות ולמה fine-tuning (שנלמד בהמשך) עולה כסף וזמן."
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
          ["Loss Function", "פונקציה שמודדת כמה תחזיות המודל רחוקות מהאמת."],
          ["Gradient", "כיוון השינוי המהיר ביותר של פונקציה — 'שיפוע'."],
          ["Gradient Descent", "אלגוריתם שמעדכן משקלים נגד כיוון הגרדיאנט כדי למזער loss."],
          ["Learning Rate", "גודל הצעד בכל עדכון משקלים."],
          ["Backpropagation", "אלגוריתם יעיל לחישוב גרדיאנטים ברשת רב-שכבתית."],
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
          בוויזואלייזר, נסה learning rate = 1.0 ולחץ &quot;צעד גרדיאנט&quot; כמה פעמים. מה קורה לכדור?
          עכשיו נסה 0.05 — כמה צעדים לוקח להגיע קרוב למינימום?
        </p>
      </div>
    ),
  },
];

export default function Page() {
  return <LessonShell meta={META} sections={SECTIONS} />;
}
