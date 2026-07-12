"use client";

import { LessonShell, type LessonMeta, type LessonSection } from "@/components/lesson/lesson-shell";
import { SlideDeck, type Slide } from "@/components/slides/slide-deck";
import { AttentionVisualizer } from "@/components/diagrams/attention-visualizer";
import { EngineeringInsights } from "@/components/lesson/engineering-insights";
import { QuizEngine, type QuizQuestion } from "@/components/quiz/quiz-engine";

const META: LessonMeta = {
  trackSlug: "ai-foundations",
  moduleSlug: "llms",
  lessonSlug: "transformer-attention",
  title: "ארכיטקטורת הטרנספורמר ומנגנון ה-Attention",
  objectives: [
    "להבין ברמת עקרון איך טרנספורמר מעבד רצף טקסט שלם במקביל",
    "להבין את רעיון ה-Attention: כל מילה 'מסתכלת' על כל שאר המילים בעוצמות שונות",
    "להבין למה הארכיטקטורה הזו החליפה מודלים קודמים (RNN/LSTM)",
  ],
  estMinutes: 30,
  difficulty: "בינוני",
  prerequisites: ["טוקניזציה — איך טקסט הופך למספרים"],
};

const SLIDES: Slide[] = [
  {
    title: "הבעיה עם מודלים ישנים (RNN/LSTM)",
    bullets: [
      "מודלים ישנים עיבדו טקסט מילה-אחר-מילה, ברצף — כמו לקרוא ספר מילה-מילה בלי יכולת לדפדף אחורה בקלות.",
      "זה איטי (אי אפשר לעבד במקביל) וקשה למודל 'לזכור' הקשר ממילים רחוקות בתחילת המשפט.",
      "טרנספורמר (2017, מאמר 'Attention Is All You Need') פתר את שתי הבעיות בבת אחת.",
    ],
  },
  {
    title: "Self-Attention — כל מילה מסתכלת על כולן בבת אחת",
    bullets: [
      "במקום לעבד מילה-מילה, הטרנספורמר בוחן את כל המשפט בבת אחת — וכל מילה 'מחשבת' כמה היא צריכה 'להתייחס' לכל מילה אחרת.",
      "לדוגמה, במשפט 'הכלב רדף אחרי הזנב שלו', המילה 'שלו' צריכה 'להתייחס' חזק ל'הכלב' כדי להבין למי היא שייכת.",
      "זה מאפשר גם עיבוד מקבילי (מהיר בהרבה) וגם 'זיכרון' טוב יותר של הקשר רחוק.",
    ],
  },
  {
    title: "מ-Attention ל-LLM שלם",
    bullets: [
      "טרנספורמר בנוי משכבות רבות של attention + רשתות feed-forward רגילות (שנלמדו במודול הקודם).",
      "מודלים כמו Claude מכילים עשרות שכבות כאלה, עם מיליארדי פרמטרים — כל שכבה 'מעדנת' את ההבנה.",
      "זו הסיבה שמודלי שפה גדולים מסוגלים להבין הקשר מורכב ותלוי-מרחק בטקסט.",
    ],
  },
];

const QUIZ: QuizQuestion[] = [
  {
    id: "q1",
    question: "מה היתרון המרכזי של Attention על פני עיבוד מילה-אחר-מילה?",
    options: [
      "הוא זול יותר לאמן תמיד",
      "הוא מאפשר עיבוד מקבילי של כל המשפט וזיכרון טוב יותר של הקשר רחוק",
      "הוא לא דורש נתונים בכלל",
      "הוא עובד רק על משפטים קצרים",
    ],
    correctIndex: 1,
    explanation: "עיבוד כל המילים בבת אחת מאפשר גם מקביליות וגם 'ראייה' ישירה של קשרים בין מילים רחוקות.",
  },
  {
    id: "q2",
    question: "מה עושה Attention בפועל?",
    options: [
      "מוחק מידע לא חשוב",
      "מחשב לכל מילה משקל התייחסות לכל מילה אחרת במשפט",
      "מתרגם את הטקסט לשפה אחרת",
      "בודק שגיאות כתיב",
    ],
    correctIndex: 1,
    explanation: "Attention מייצר 'משקלי קשב' בין כל זוג מילים, וכך המודל יודע אילו מילים רלוונטיות זו לזו.",
  },
];

const SECTIONS: LessonSection[] = [
  { id: "slides", label: "מצגת: הרעיון המרכזי", content: <SlideDeck slides={SLIDES} /> },
  {
    id: "visualizer",
    label: "Attention Visualizer — ראה את מנגנון הקשב בפעולה",
    content: <AttentionVisualizer sentence="הכלב רדף אחרי הזנב שלו במעגלים" />,
  },
  {
    id: "engineering",
    label: "לחשוב כמו מהנדס AI",
    content: (
      <EngineeringInsights
        why="ארכיטקטורת הטרנספורמר נבחרה כי היא ניתנת להרחבה (scale) בצורה יוצאת דופן — פשוט מוסיפים עוד שכבות ופרמטרים ומקבלים מודל חזק יותר, בניגוד לארכיטקטורות קודמות שהשתפרו הרבה פחות עם גודל."
        alternatives="RNN/LSTM עדיין קיימים לבעיות ספציפיות (רצפי זמן קצרים, משאבים מוגבלים), אך כמעט ולא בשימוש למודלי שפה גדולים כיום."
        performance="גודל ה-attention גדל ריבועית עם אורך הטקסט (n²) — זו הסיבה שחלון הקשר (שנלמד בשיעור הבא) לא יכול פשוט 'לגדול לאינסוף' בלי עלות חישובית עצומה."
        commonMistakes="לחשוב ש-attention 'מבין' טקסט כמו בן אדם — בפועל זהו חישוב מתמטי של דמיון וקטורי, לא הבנה סמנטית במובן האנושי."
        realWorld="כל מודלי השפה המודרניים (Claude, GPT, Gemini) מבוססים על וריאציות של ארכיטקטורת הטרנספורמר — ההבדלים ביניהם הם בעיקר בגודל, בנתוני האימון, ובשיטות האימון הנוספות (כמו RLHF)."
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
          ["Transformer", "ארכיטקטורת רשת נוירונים מבוססת attention, הבסיס ל-LLMs מודרניים."],
          ["Self-Attention", "מנגנון שבו כל טוקן מחשב משקל קשב לכל טוקן אחר ברצף."],
          ["RNN/LSTM", "ארכיטקטורות קודמות שעיבדו טקסט ברצף, מילה-אחר-מילה."],
          ["Parameters", "המשקלים הנלמדים ברשת — מודלים גדולים מכילים מיליארדים מהם."],
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
          בוויזואלייזר למעלה, לחץ על מילים שונות ונסה לזהות איזה זוג מילים אתה חושב שאמור לקבל
          attention גבוה במציאות (למשל &quot;שלו&quot; ו&quot;הכלב&quot;), והשווה למה שהדגמה (הפסאודו-אקראית) מציגה.
        </p>
      </div>
    ),
  },
];

export default function Page() {
  return <LessonShell meta={META} sections={SECTIONS} />;
}
