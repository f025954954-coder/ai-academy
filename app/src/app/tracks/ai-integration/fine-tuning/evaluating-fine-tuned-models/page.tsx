"use client";

import { LessonShell, type LessonMeta, type LessonSection } from "@/components/lesson/lesson-shell";
import { SlideDeck, type Slide } from "@/components/slides/slide-deck";
import { PromptComparisonLab } from "@/components/comparisons/prompt-comparison-lab";
import { EngineeringInsights } from "@/components/lesson/engineering-insights";
import { QuizEngine, type QuizQuestion } from "@/components/quiz/quiz-engine";
import { RealWorldTask } from "@/components/exercises/real-world-task";

const META: LessonMeta = {
  trackSlug: "ai-integration",
  moduleSlug: "fine-tuning",
  lessonSlug: "evaluating-fine-tuned-models",
  title: "הערכת מודלים מותאמים",
  objectives: [
    "להכיר מדדי הערכה בסיסיים (accuracy, human eval, A/B testing מול המודל הבסיסי)",
    "להבין את הסיכון של overfitting על סט הדוגמאות שאומן עליו",
    "לזהות מתי מודל מותאם 'משתפר' רק על הנייר אך לא בפועל",
  ],
  estMinutes: 25,
  difficulty: "מתקדם",
  prerequisites: ["fine-tuning-vs-rag-vs-prompting"],
};

const SLIDES: Slide[] = [
  {
    title: "איך יודעים שה-fine-tuning 'עבד'",
    bullets: [
      "מדד ראשון: ביצועים על סט בדיקה (test set) שהמודל לא ראה באימון — לא על אותן דוגמאות שהוא אומן עליהן (זה יראה תמיד 'מצוין' באופן מטעה).",
      "מדד שני: A/B testing מול המודל הבסיסי (עם prompt engineering טוב) — האם המודל המותאם באמת טוב יותר, או שרק 'מרגיש' שונה?",
      "מדד שלישי: human eval — בני אדם מדרגים תשובות בצורה עיוורת (בלי לדעת איזה מודל ענה) כדי למנוע הטיה.",
    ],
  },
  {
    title: "הסכנה: Overfitting",
    bullets: [
      "מודל שמשנן את דוגמאות האימון (במקום ללמוד דפוס כללי) יתפקד מצוין על אותן דוגמאות ורע על מקרים חדשים.",
      "זו בדיוק הסיבה שסט בדיקה נפרד (שהמודל מעולם לא ראה) קריטי — הוא חושף overfitting שאי אפשר לראות מסתכלים רק על ביצועים בסט האימון.",
    ],
  },
];

const QUIZ: QuizQuestion[] = [
  {
    id: "q1",
    question: "למה חובה לבדוק מודל מותאם על סט בדיקה נפרד, לא רק על דוגמאות האימון?",
    options: [
      "אין צורך אמיתי בזה, בדיקה על דוגמאות האימון מספיקה",
      "כי מודל שרק 'משנן' דוגמאות אימון (overfitting) יראה ביצועים מצוינים עליהן אך יתפקד גרוע על מקרים חדשים — סט בדיקה נפרד חושף את זה",
      "כי Claude API דורש סט בדיקה נפרד",
      "רק כדי לחסוך זמן חישוב"
    ],
    correctIndex: 1,
    explanation: "בדיקה רק על דוגמאות האימון לא יכולה לחשוף overfitting — המודל 'ראה' אותן כבר; רק דוגמאות חדשות (סט בדיקה) בודקות הכללה אמיתית.",
    optionNotes: [
      "לא נכון: זה בדיוק המלכודת — בדיקה על דוגמאות אימון בלבד מסתירה overfitting במקום לחשוף אותו.",
      "התשובה הנכונה: overfitting נראה 'מצוין' על סט האימון אבל נכשל על מקרים חדשים — רק סט בדיקה נפרד חושף את הפער.",
      "לא נכון: זו לא דרישה טכנית של ה-API — זה עיקרון מתודולוגי בהערכת מודלים.",
      "לא נכון: המטרה היא נכונות ההערכה, לא חיסכון בזמן חישוב.",
    ],
  },
];

const SECTIONS: LessonSection[] = [
  { id: "slides", label: "מצגת: איך יודעים שfine-tuning עבד", content: <SlideDeck slides={SLIDES} /> },
  {
    id: "comparison",
    label: "השוואה: הערכה שטחית מול הערכה אמינה",
    content: (
      <PromptComparisonLab
        title="בדיקת איכות מודל מותאם"
        unitLabel="שיטת הערכה"
        bad={{
          label: "הערכה שטחית",
          content: `"תבדוק את המודל המותאם על 5 דוגמאות מהאימון
ותגיד לי אם הוא טוב"`,
          outcome: "המודל 'ראה' את הדוגמאות האלו כבר — הוא כמעט תמיד יראה מצוין עליהן, גם אם הוא לא באמת השתפר על מקרים חדשים (overfitting מוסתר).",
        }}
        good={{
          label: "A/B testing עיוור על סט בדיקה נפרד",
          content: `בדיקה על 50 שאלות חדשות (לא מהאימון), בהשוואה
עיוורת (בלי לדעת איזה מודל ענה) מול המודל הבסיסי
עם system prompt טוב`,
          outcome: "תוצאה אמינה שמראה האם המודל המותאם באמת עדיף על החלופה הזולה יותר (פרומפט טוב), לא רק 'מרגיש' שונה.",
        }}
        takeaway="הערכה אמינה דורשת משמעת: סט בדיקה שלא נראה באימון, השוואה עיוורת, ומול חלופה ריאלית (לא רק מול 'שום דבר') — אחרת קל להטעות את עצמך."
      />
    ),
  },
  {
    id: "engineering",
    label: "לחשוב כמו מהנדס AI",
    content: (
      <EngineeringInsights
        why="הערכה קפדנית קיימת כי 'זה נראה טוב' על כמה דוגמאות לא מוכיח כלום — בדיוק כמו טסטים (מודול Claude Code Mastery), רק שכאן בודקים את המודל עצמו, לא את הקוד."
        alternatives="להסתפק ב'תחושת בטן' על איכות המודל — מהיר, אבל לא אמין ועלול להוביל להחלטה יקרה שגויה (לפרוס מודל שלא באמת טוב יותר)."
        whenNotTo="—"
        commonMistakes="להשוות מודל מותאם רק מול 'שום דבר' (המודל הבסיסי בלי שום עזרה) במקום מול החלופה הריאלית (המודל הבסיסי + system prompt טוב) — זו השוואה לא הוגנת שתמיד 'תוכיח' שה-fine-tuning הצליח."
        cost="הערכה קפדנית עולה זמן (איסוף סט בדיקה, human eval) — אבל חוסכת עלות גדולה בהרבה של לפרוס מודל מותאם שלמעשה לא משתפר על החלופה הזולה."
        realWorld="בדיוק כמו שכל תכונה ב-AtlasDesk אומתה ב-production (לא רק ב-build), מודל מותאם חייב אימות אמין לפני שסומכים עליו במוצר אמיתי."
      />
    ),
  },
  { id: "quiz", label: "בוחן ידע", content: <QuizEngine questions={QUIZ} /> },
  {
    id: "real-world-task",
    label: "משימה מעשית",
    content: (
      <RealWorldTask
        id="fine-tuning-evaluating-fine-tuned-models"
        title="תכנן מתודולוגיית הערכה למודל מותאם היפותטי"
        context="עבוד עם Claude Code — תכנון בלבד."
        steps={[
          "דמיין שיש לך מודל מותאם ל-AtlasDesk. תכנן: כמה דוגמאות בדיקה נפרדות תרצה (לא מהאימון)?",
          "תכנן A/B test: איך היית משווה בין המודל המותאם למודל הבסיסי + system prompt טוב, בלי הטיה?",
          "דון: אילו סימנים היו מרמזים לך על overfitting?",
        ]}
        successCriteria={[
          "יש לך תוכנית הערכה קונקרטית, לא רק 'נבדוק ונראה'",
          "אתה יכול לזהות סימני overfitting אפשריים",
        ]}
      />
    ),
  },
  {
    id: "homework",
    label: "סיכום מודול",
    content: (
      <div className="rounded-xl bg-primary/5 p-4 text-sm">
        <p className="font-semibold">סיימת את מודול Fine-tuning — וכל טראק ai-integration!</p>
        <p className="mt-1 text-muted">
          עברת דרך MCP, Embeddings, RAG, ו-Fine-tuning — וראית ש-AtlasDesk הגיע רחוק בלי fine-tuning
          אחד. זה בעצמו לקח הנדסי חשוב: תמיד לנסות את הפתרון הזול והמהיר קודם.
        </p>
      </div>
    ),
  },
];

export default function Page() {
  return <LessonShell meta={META} sections={SECTIONS} />;
}
