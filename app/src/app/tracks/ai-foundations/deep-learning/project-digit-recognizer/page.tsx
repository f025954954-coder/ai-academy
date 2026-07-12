"use client";

import { Trophy, Cpu } from "lucide-react";
import { LessonShell, type LessonMeta, type LessonSection } from "@/components/lesson/lesson-shell";
import { SlideDeck, type Slide } from "@/components/slides/slide-deck";
import { DigitRecognizerLab } from "@/components/simulators/digit-recognizer-lab";
import { EngineeringInsights } from "@/components/lesson/engineering-insights";
import { QuizEngine, type QuizQuestion } from "@/components/quiz/quiz-engine";

const META: LessonMeta = {
  trackSlug: "ai-foundations",
  moduleSlug: "deep-learning",
  lessonSlug: "project-digit-recognizer",
  title: "פרויקט מודול: זיהוי ספרות בכתב יד",
  objectives: [
    "לבנות מסווג ספרות עובד בדפדפן ולהבין את שיקולי הבחירה בגישה (kNN מול רשת עמוקה מלאה)",
    "לחוות את המגבלות והיתרונות של גישות שונות לבעיה זהה",
  ],
  estMinutes: 40,
  difficulty: "בינוני",
  prerequisites: ["איך רשת 'לומדת': Loss, Backpropagation, Gradient Descent"],
};

const SLIDES: Slide[] = [
  {
    title: "החלטה הנדסית: לא כל בעיה צריכה רשת עמוקה",
    bullets: [
      "המסווג שתבנה עכשיו לא משתמש ברשת נוירונים בכלל — הוא משתמש ב-k-Nearest-Neighbors (kNN): משווה את הציור שלך לתבניות ידועות ובוחר את הדומה ביותר.",
      "זו החלטה הנדסית מכוונת: kNN רץ מיידית בדפדפן בלי אימון, בלי הורדת קבצים כבדים, ובלי GPU — בעוד רשת עמוקה אמיתית (כמו על מלוא מאגר MNIST) הייתה מדויקת יותר אך דורשת אימון ותשתית.",
      "מהנדס AI טוב תמיד שואל: 'מה הכי פשוט שעדיין פותר את הבעיה?' לפני שקופץ לפתרון המורכב ביותר.",
    ],
  },
];

const QUIZ: QuizQuestion[] = [
  {
    id: "q1",
    question: "למה הפרויקט הזה משתמש ב-kNN ולא ברשת נוירונים עמוקה מאומנת?",
    options: [
      "כי kNN תמיד מדויק יותר",
      "כי לבעיה בקנה מידה קטן (8x8, כמה תבניות) kNN מספיק, מיידי, וללא עלות אימון",
      "כי רשתות נוירונים לא עובדות בדפדפן",
      "אין סיבה מיוחדת",
    ],
    correctIndex: 1,
    explanation: "זו בדיוק ההחלטה ההנדסית שנדונה: לבחור את הפתרון הפשוט ביותר שמספיק, לא את המורכב ביותר האפשרי.",
  },
];

const SECTIONS: LessonSection[] = [
  { id: "slides", label: "החלטה הנדסית", content: <SlideDeck slides={SLIDES} /> },
  {
    id: "lab",
    label: "מעבדה: זהה ספרה בכתב ידך",
    content: (
      <div>
        <div className="mb-3 flex items-center gap-2 rounded-xl border border-primary/30 bg-primary/5 p-4 text-sm">
          <Trophy size={18} className="shrink-0 text-primary" />
          <span>
            צייר ספרה בין 0-9 ברשת. שים לב שברזולוציה נמוכה (8x8) חלק מהספרות (כמו 4 ו-9, או 3 ו-8)
            עלולות להתבלבל — זו בדיוק המגבלה שהמודל הפשוט הזה חושף.
          </span>
        </div>
        <DigitRecognizerLab />
      </div>
    ),
  },
  {
    id: "engineering",
    label: "לחשוב כמו מהנדס AI",
    content: (
      <EngineeringInsights
        why="בחרנו kNN על תבניות קבועות כי המטרה כאן היא להבין את *הרעיון* של סיווג מבוסס-דמיון, לא לבנות מוצר production. הגישה הזו שקופה לגמרי — אפשר לראות בדיוק למה המודל בחר תשובה מסוימת (המרחקים מוצגים)."
        alternatives="בעולם האמיתי: רשת קונבולוציונית (CNN) מאומנת על 60,000 דוגמאות MNIST מגיעה לדיוק של מעל 99%. יש גם שיטות ביניים כמו SVM על features שחולצו ידנית."
        whenNotTo="kNN לא מתאים לבעיות עם הרבה נתונים (הוא צריך להשוות לכל הדוגמאות בכל חיזוי — איטי) או לבעיות מורכבות כמו הבנת שפה טבעית."
        commonMistakes="להניח שכל בעיית AI צריכה 'רשת נוירונים ענקית' — הרבה פעמים שיטה פשוטה ומהירה עדיפה, במיוחד ב-MVP או פרוטוטייפ."
        performance="kNN כאן מהיר כי יש רק 10 תבניות להשוואה. במערכת עם מיליוני דוגמאות, kNN נהיה איטי מאוד ללא אינדקסים מיוחדים (נראה פתרון לזה בשיעורי Vector Databases בהמשך!)."
        maintenance="מודל kNN על תבניות קבועות קל מאוד לתחזק ולהבין — אין 'קופסה שחורה'. רשת עמוקה מאומנת קשה יותר לדבג כשהיא טועה."
        realWorld="הרבה מוצרי AI אמיתיים מתחילים עם היוריסטיקות/kNN פשוטים ב-MVP, ורק כשמוכיחים ערך עסקי עוברים להשקיע באימון מודל עמוק ויקר יותר."
      />
    ),
  },
  { id: "quiz", label: "בוחן ידע", content: <QuizEngine questions={QUIZ} /> },
  {
    id: "summary",
    label: "סיכום המודול",
    content: (
      <div className="rounded-xl bg-card p-5 text-sm">
        <div className="mb-2 flex items-center gap-2 font-bold">
          <Cpu size={18} className="text-primary" /> מה כיסינו במודול &quot;למידה עמוקה ורשתות נוירונים&quot;
        </div>
        <ul className="space-y-1.5">
          <li>✅ מבנה נוירון בודד ורשת מלאה, כולל forward pass אינטראקטיבי</li>
          <li>✅ איך רשת "לומדת" — loss, gradient descent, learning rate</li>
          <li>✅ פרויקט זיהוי ספרות + שיקול הנדסי מרכזי: לא כל בעיה צריכה DL</li>
        </ul>
        <p className="mt-3 text-muted">
          במודול הבא — מודלי שפה גדולים (LLMs): איך Claude בעצם עובד, מה זה טוקניזציה, ומה זה
          ארכיטקטורת הטרנספורמר. זה הבסיס הישיר לכל מה שנבנה מכאן ואילך.
        </p>
      </div>
    ),
  },
];

export default function Page() {
  return <LessonShell meta={META} sections={SECTIONS} />;
}
