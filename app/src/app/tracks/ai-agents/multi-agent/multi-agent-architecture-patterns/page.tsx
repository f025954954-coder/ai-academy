"use client";

import { Network, ArrowRightLeft, GitBranch } from "lucide-react";
import { LessonShell, type LessonMeta, type LessonSection } from "@/components/lesson/lesson-shell";
import { SlideDeck, type Slide } from "@/components/slides/slide-deck";
import { StepDiagram, type DiagramStep } from "@/components/diagrams/step-diagram";
import { PromptComparisonLab } from "@/components/comparisons/prompt-comparison-lab";
import { EngineeringInsights } from "@/components/lesson/engineering-insights";
import { QuizEngine, type QuizQuestion } from "@/components/quiz/quiz-engine";
import { RealWorldTask } from "@/components/exercises/real-world-task";

const META: LessonMeta = {
  trackSlug: "ai-agents",
  moduleSlug: "multi-agent",
  lessonSlug: "multi-agent-architecture-patterns",
  title: "תבניות ארכיטקטורה רב-סוכניות",
  objectives: [
    "להכיר שלוש תבניות יסוד: orchestrator-worker, sequential, parallel",
    "להבין מתי סוכן בודד לא מספיק ומתי כמה סוכנים משתלמים",
    "לזהות את העלות הנוספת (תיאום, latency) של ריבוי סוכנים",
  ],
  estMinutes: 30,
  difficulty: "מתקדם",
  prerequisites: ["פרויקט מודול: AtlasDesk מקבל סוכן עם החלטה אוטונומית"],
};

const SLIDES: Slide[] = [
  {
    title: "מתי סוכן בודד לא מספיק",
    bullets: [
      "הסוכן שבנית ב-AtlasDesk (מודול קודם) מומחה בדבר אחד: תמיכה כללית + בדיקת סטטוס פנייה. אבל מה קורה כששאלה דורשת מומחיות עמוקה בתחום אחר (למשל חיוב/billing מורכב) שה-system prompt הכללי לא מכסה טוב?",
      "פתרון אחד: system prompt ענק שמכיל הכל. פתרון אחר (רב-סוכני): כמה 'מומחים' נפרדים, כל אחד עם system prompt ממוקד, שמתאמים ביניהם.",
    ],
  },
  {
    title: "שלוש תבניות יסוד",
    bullets: [
      "Orchestrator-worker: סוכן 'מנהל' מפנה משימות לסוכני 'עובד' מומחים ומרכיב את התוצאות.",
      "Sequential: סוכן א' מסיים לגמרי, מעביר תוצאה לסוכן ב', וכן הלאה — צינור.",
      "Parallel: כמה סוכנים עובדים בו-זמנית על היבטים שונים של אותה בעיה, והתוצאות משולבות בסוף.",
    ],
  },
];

const STEPS: DiagramStep[] = [
  { icon: Network, label: "Orchestrator-Worker", detail: "סוכן מנהל מחליט איזה מומחה מתאים ומפנה אליו — בדיוק כמו נציג תמיכה שמעביר שיחה למחלקה הנכונה." },
  { icon: GitBranch, label: "Sequential", detail: "סוכן א' (למשל: מסכם בעיה) → סוכן ב' (מנסח פתרון) → סוכן ג' (מנסח תשובה ללקוח) — צינור עם שלבים ברורים." },
  { icon: ArrowRightLeft, label: "Parallel", detail: "כמה סוכנים בודקים בו-זמנית היבטים שונים (למשל: אבטחה + ביצועים + עלות) ומאחדים תובנות בסוף." },
];

const QUIZ: QuizQuestion[] = [
  {
    id: "q1",
    question: "מה ההבדל בין תבנית orchestrator-worker לתבנית sequential?",
    options: [
      "אין הבדל, שני השמות מתארים את אותו דבר",
      "ב-orchestrator-worker סוכן מנהל בוחר איזה מומחה מתאים ומפנה אליו; ב-sequential הסוכנים עובדים בסדר קבוע אחד אחרי השני, כמו צינור",
      "sequential תמיד מהיר יותר מ-orchestrator-worker",
      "orchestrator-worker עובד רק עם 2 סוכנים בדיוק"
    ],
    correctIndex: 1,
    explanation: "orchestrator-worker כולל החלטה דינמית (איזה מומחה מתאים כרגע); sequential הוא זרימה קבועה מראש בין שלבים.",
    optionNotes: [
      "לא נכון: יש הבדל מהותי בין השתיים — החלטה דינמית מול זרימה קבועה.",
      "התשובה הנכונה: זו בדיוק ההבחנה — orchestrator בוחר דינמית, sequential עובר בסדר קבוע.",
      "לא נכון: sequential לא בהכרח מהיר יותר — זה תלוי במשימה הספציפית, לא בתבנית עצמה.",
      "לא נכון: orchestrator-worker יכול לעבוד עם כל מספר של worker agents, לא מוגבל ל-2.",
    ],
  },
  {
    id: "q2",
    question: "מה העלות הנוספת (trade-off) של מערכת רב-סוכנית לעומת סוכן בודד?",
    options: [
      "אין עלות נוספת, רב-סוכנים תמיד עדיף",
      "תיאום בין סוכנים מוסיף latency (כל 'העברה' היא קריאת API נוספת) ומורכבות ניהול — לא כדאי אלא אם המומחיות הנפרדת שווה את זה",
      "רב-סוכנים תמיד זול יותר כי כל סוכן קטן יותר",
      "העלות היחידה היא זמן פיתוח, אין השפעה בזמן ריצה"
    ],
    correctIndex: 1,
    explanation: "כל מעבר בין סוכנים הוא קריאת API נוספת (זמן+עלות) — משתלם רק כשהמומחיות הנפרדת של כל סוכן מצדיקה את זה.",
    optionNotes: [
      "לא נכון: יש עלות אמיתית — רב-סוכנים לא תמיד עדיף, זה תלוי אם המשימה באמת דורשת התמחויות נפרדות.",
      "התשובה הנכונה: זו בדיוק הפשרה — יותר קריאות API, יותר latency, יותר מורכבות תיאום.",
      "לא נכון: זה תלוי במשימה — לפעמים סוכן אחד עם system prompt טוב זול יותר מכמה סוכנים.",
      "לא נכון: יש גם השפעה ממשית בזמן ריצה (latency, עלות קריאות API), לא רק בזמן פיתוח.",
    ],
  },
];

const SECTIONS: LessonSection[] = [
  { id: "slides", label: "מצגת: מתי צריך יותר מסוכן אחד", content: <SlideDeck slides={SLIDES} /> },
  { id: "patterns", label: "שלוש תבניות יסוד", content: <StepDiagram steps={STEPS} /> },
  {
    id: "comparison",
    label: "השוואה: system prompt ענק מול סוכן מומחה נפרד",
    content: (
      <PromptComparisonLab
        title="טיפול בשאלת חיוב מורכבת ב-AtlasDesk"
        unitLabel="ארכיטקטורה"
        bad={{
          label: "system prompt ענק שמכיל הכל",
          content: `system prompt כללי + 200 שורות כללי חיוב מפורטים
(הנחות, שוברי זיכוי, סוגי תשלום, מדיניות ביטול...)`,
          outcome: "system prompt מתנפח ומשמש בכל בקשה — גם כשהשאלה כלל לא קשורה לחיוב, ה'ידע' הזה נשלח ותופס טוקנים. גם קשה לתחזק system prompt ענק אחד.",
        }}
        good={{
          label: "סוכן מומחה נפרד לחיוב",
          content: `סוכן כללי מזהה: "זו שאלת חיוב מורכבת" ומעביר
(handoff) לסוכן billing-specialist עם system prompt
ממוקד רק בחיוב — נטען רק כשבאמת נחוץ`,
          outcome: "system prompt הכללי נשאר קטן ומהיר לרוב הבקשות; ה'ידע העמוק' בחיוב נטען רק כשבאמת רלוונטי.",
        }}
        takeaway="הבחירה בין system prompt ענק לסוכנים נפרדים היא בדיוק כמו הבחירה בין monolith למיקרו-שירותים — תלויה בגודל/מורכבות התחום ובתדירות השימוש בכל חלק."
      />
    ),
  },
  {
    id: "engineering",
    label: "לחשוב כמו מהנדס AI",
    content: (
      <EngineeringInsights
        why="ארכיטקטורות רב-סוכניות קיימות כי לפעמים תחום ידע ספציפי (חיוב, אבטחה, משפט) דורש system prompt עמוק וממוקד שלא כדאי לטעון בכל בקשה כללית."
        alternatives="system prompt אחד גדול שמכסה הכל — פשוט יותר לתחזק (קובץ אחד), אבל נהיה יקר ומסורבל ככל שהתחום גדל."
        whenNotTo="אם כל השאלות דומות בהיקף המידע הנדרש (כמו AtlasDesk בשלביו המוקדמים) — סוכן בודד עם system prompt סביר מספיק, בלי overhead של תיאום."
        commonMistakes="לבנות מערכת רב-סוכנית 'כי זה נשמע מתקדם' בלי שיש באמת התמחויות שונות שמצדיקות את זה — over-engineering קלאסי."
        cost="כל handoff בין סוכנים הוא קריאת API נוספת — יקר יותר מסוכן בודד, אבל עשוי לחסוך טוקנים בטווח הארוך (system prompts קטנים יותר לרוב הבקשות)."
        realWorld="בפרויקט המודול הבא תממש בדיוק את זה: אסקלציה מסוכן כללי לסוכן מומחה-חיוב ב-AtlasDesk."
      />
    ),
  },
  { id: "quiz", label: "בוחן ידע", content: <QuizEngine questions={QUIZ} /> },
  {
    id: "real-world-task",
    label: "משימה מעשית",
    content: (
      <RealWorldTask
        id="multi-agent-architecture-patterns"
        title="עצב ארכיטקטורה רב-סוכנית ל-AtlasDesk"
        context="עבוד עם Claude Code — תכנון בלבד, המימוש בפרויקט הבא."
        steps={[
          "זהה תחום ידע ב-AtlasDesk שהיה שווה סוכן מומחה נפרד (חיוב, אבטחה, טכני מעמיק).",
          "בקש מ-Claude Code להציע system prompt ממוקד לאותו מומחה.",
          "דון: איזו תבנית (orchestrator-worker/sequential/parallel) הכי מתאימה למקרה הזה, ולמה?",
        ]}
        successCriteria={[
          "יש לך תחום מומחיות קונקרטי, לא כללי",
          "אתה יכול להסביר למה התבנית שבחרת מתאימה יותר מהאלטרנטיבות",
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
          חשוב על מוצר AI שאתה מכיר (למשל עוזר קוד, צ'אטבוט תמיכה). האם יש לו (או שהיה כדאי
          שיהיה לו) יותר מ"סוכן" אחד? איזו תבנית הייתה הכי מתאימה?
        </p>
      </div>
    ),
  },
];

export default function Page() {
  return <LessonShell meta={META} sections={SECTIONS} />;
}
