"use client";

import { LessonShell, type LessonMeta, type LessonSection } from "@/components/lesson/lesson-shell";
import { SlideDeck, type Slide } from "@/components/slides/slide-deck";
import { ContextWindowVisualizer } from "@/components/diagrams/context-window-visualizer";
import { EngineeringInsights } from "@/components/lesson/engineering-insights";
import { QuizEngine, type QuizQuestion } from "@/components/quiz/quiz-engine";

const META: LessonMeta = {
  trackSlug: "ai-foundations",
  moduleSlug: "llms",
  lessonSlug: "context-window-limits",
  title: "Context Window, יכולות ומגבלות",
  objectives: [
    "להבין מהו חלון הקשר ומה קורה כשחורגים ממנו",
    "להבין הזיות (hallucinations) ומקורן",
    "להבין הטיות (biases) ומגבלות ידע (knowledge cutoff)",
  ],
  estMinutes: 25,
  difficulty: "בינוני",
  prerequisites: ["ארכיטקטורת הטרנספורמר ומנגנון ה-Attention"],
};

const SLIDES: Slide[] = [
  {
    title: "Context Window — כמה המודל 'זוכר' בבת אחת",
    bullets: [
      "חלון ההקשר הוא הכמות המקסימלית של טוקנים (קלט + פלט יחד) שהמודל יכול 'לראות' בבת אחת בשיחה.",
      "כשחורגים מהחלון, ההודעות הישנות ביותר בשיחה 'נופלות' ממנו — המודל פשוט לא רואה אותן יותר.",
      "Claude תומך בחלונות הקשר גדולים במיוחד (מאות אלפי טוקנים) — מה שמאפשר לעבוד עם מסמכים שלמים.",
    ],
  },
  {
    title: "הזיות (Hallucinations)",
    bullets: [
      "מודל שפה לא 'יודע' עובדות כמו מסד נתונים — הוא חוזה את הטוקן הבא הכי סביר, בהתבסס על דפוסים שלמד.",
      "כשאין לו מידע מהימן, הוא עלול 'להמציא' תשובה שנשמעת סבירה אך שגויה — זו הזיה.",
      "פתרונות: לבסס תשובות על מקורות אמיתיים (RAG, שנלמד בהמשך), ולעודד את המודל להודות ב'אני לא יודע'.",
    ],
  },
  {
    title: "הטיות ו-Knowledge Cutoff",
    bullets: [
      "מודל אומן על נתונים עד תאריך מסוים (knowledge cutoff) — אירועים אחריו הוא פשוט לא מכיר.",
      "הטיות בנתוני האימון (למשל ייצוג לא מאוזן של קבוצות/דעות) יכולות לבוא לידי ביטוי בתשובות המודל.",
      "מהנדס AI אחראי מודע למגבלות האלה ובונה מערכות שמפצות עליהן (למשל, חיפוש מידע עדכני בפועל).",
    ],
  },
];

const QUIZ: QuizQuestion[] = [
  {
    id: "q1",
    question: "מה קורה כשחורגים מחלון ההקשר של מודל?",
    options: [
      "המודל קורס",
      "ההודעות הישנות ביותר 'נופלות' מהחלון והמודל לא רואה אותן יותר",
      "המודל מוחק את כל השיחה",
      "אין השפעה כלל",
    ],
    correctIndex: 1,
    explanation: "חלון הקשר הוא מגבלה קשיחה — כשעוברים אותה, המידע הישן ביותר מפסיק להיות נגיש למודל.",
  },
  {
    id: "q2",
    question: "למה מודל 'מהזה' (hallucinates) לפעמים?",
    options: [
      "יש לו כוונה להטעות",
      "הוא חוזה את הטוקן הבא הסביר ביותר גם כשאין לו מידע מהימן, ולכן עלול 'להמציא' תשובה שנשמעת הגיונית",
      "יש לו באג בקוד",
      "זה קורה רק במודלים ישנים",
    ],
    correctIndex: 1,
    explanation: "הזיה נובעת מהאופי הסטטיסטי של יצירת טקסט — לא ממודעות שקרית של המודל.",
  },
];

const SECTIONS: LessonSection[] = [
  { id: "slides", label: "מצגת: הרעיון המרכזי", content: <SlideDeck slides={SLIDES} /> },
  {
    id: "visualizer",
    label: "Context Window Visualizer — מלא את החלון וראה מה קורה בגלישה",
    content: <ContextWindowVisualizer windowLimit={150} />,
  },
  {
    id: "engineering",
    label: "לחשוב כמו מהנדס AI",
    content: (
      <EngineeringInsights
        why="חלון הקשר קיים כי attention (מהשיעור הקודם) גדל ריבועית עם אורך הרצף — אין חלון אינסופי בלי עלות חישובית/זיכרון עצומה."
        alternatives="לשיחות ארוכות: סיכום היסטוריה (summarization), חיתוך חכם של הודעות ישנות, או RAG (שליפת מידע רלוונטי במקום לשמור הכל בהקשר)."
        cost="חלון הקשר גדול יותר לא רק 'נחמד להיות' — כל טוקן בהקשר נספר בעלות! שיחה ארוכה עם היסטוריה מלאה יכולה להיות יקרה משמעותית מבקשה ממוקדת."
        performance="ככל שההקשר ארוך יותר, כך זמן העיבוד (latency) גדל — יש trade-off ישיר בין 'לתת למודל יותר הקשר' לבין מהירות תגובה."
        security="הזיות הן גם סיכון אבטחה/אמינות: מערכת AI שנותנת מידע רפואי/משפטי/פיננסי שגוי בביטחון מלא יכולה לגרום נזק ממשי — לכן חשוב grounding (ביסוס בעובדות) במערכות קריטיות."
        commonMistakes="לסמוך על תשובת LLM כ'אמת מוחלטת' בלי אימות, במיוחד בנושאים עובדתיים/מספריים — זה תפקידו של RAG ואימות חיצוני."
        realWorld="מוצרי AI מסחריים בדרך כלל מגבילים בכוונה כמה הקשר הם שולחים (גם אם המודל תומך ביותר) כדי לשלוט בעלויות ובזמן תגובה."
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
          ["Context Window", "כמות הטוקנים המקסימלית שהמודל יכול לעבד בבת אחת."],
          ["Hallucination", "יצירת מידע שגוי שנשמע סביר בביטחון."],
          ["Knowledge Cutoff", "התאריך האחרון שממנו יש למודל מידע מהאימון."],
          ["Grounding", "ביסוס תשובות המודל על מקורות מידע אמיתיים."],
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
          בוויזואלייזר למעלה, שלח מספיק הודעות כדי לגרום לחריגה מהחלון. אילו הודעות &quot;נשכחו&quot;
          ראשונות — הישנות או החדשות?
        </p>
      </div>
    ),
  },
];

export default function Page() {
  return <LessonShell meta={META} sections={SECTIONS} />;
}
