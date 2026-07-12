"use client";

import { LessonShell, type LessonMeta, type LessonSection } from "@/components/lesson/lesson-shell";
import { SlideDeck, type Slide } from "@/components/slides/slide-deck";
import { NestedCircles, type CircleLevel } from "@/components/diagrams/nested-circles";
import { QuizEngine, type QuizQuestion } from "@/components/quiz/quiz-engine";

const META: LessonMeta = {
  trackSlug: "ai-foundations",
  moduleSlug: "ml-intro",
  lessonSlug: "what-is-ai",
  title: "מהי בינה מלאכותית — AI מול ML מול DL מול LLM",
  objectives: [
    "להבחין בין AI (המושג הרחב), ML (למידת מכונה), DL (למידה עמוקה) ו-LLM (מודלי שפה)",
    "להבין שכל 'עיגול' הוא תת-קבוצה של הקודם לו",
    "להבין למה Claude הוא LLM ולא סתם 'תוכנה חכמה'",
  ],
  estMinutes: 25,
  difficulty: "מתחיל",
  prerequisites: ["פרויקט מודול: קריאה אמיתית ל-AI Mentor API"],
};

const SLIDES: Slide[] = [
  {
    title: "ברוך הבא לליבה האמיתית של האקדמיה",
    bullets: [
      "עד עכשיו בנית את היסודות. מכאן והלאה, כל מה שנלמד תורם ישירות למטרה: לבנות מערכות AI אמיתיות עם Claude Code.",
      "השלב הראשון: להבין את אוצר המילים הבסיסי — כי כל שיחה מקצועית על AI משתמשת במונחים AI/ML/DL/LLM לסירוגין, ולא במקרה.",
    ],
  },
  {
    title: "ארבע העיגולים המקוננים",
    bullets: [
      "AI (Artificial Intelligence) — המושג הרחב ביותר: כל שיטה שגורמת למחשב 'להתנהג בחוכמה'.",
      "ML (Machine Learning) — תת-קבוצה של AI: מערכות שלומדות מנתונים במקום שמתכנתים אותן ידנית לכל מקרה.",
      "DL (Deep Learning) — תת-קבוצה של ML: למידה באמצעות רשתות נוירונים עמוקות (הרבה שכבות).",
      "LLM (Large Language Model) — תת-קבוצה של DL: רשת נוירונים ענקית שאומנה על טקסט כדי להבין וליצור שפה — זה בדיוק מה ש-Claude הוא.",
    ],
  },
];

const CIRCLES: CircleLevel[] = [
  {
    label: "AI",
    detail: "המושג הרחב ביותר — כל שיטה (גם לא-לומדת, כמו כללי if/else) שגורמת למחשב להתנהג בחוכמה.",
    color: "#f59e0b",
  },
  {
    label: "ML",
    detail: "תת-קבוצה של AI: מערכות שלומדות דפוסים מנתונים, במקום שמתכנתים כל חוק ידנית.",
    color: "#22d3ee",
  },
  {
    label: "DL",
    detail: "תת-קבוצה של ML: למידה באמצעות רשתות נוירונים עמוקות (הרבה שכבות מחוברות).",
    color: "#818cf8",
  },
  {
    label: "LLM",
    detail: "תת-קבוצה של DL: רשת נוירונים ענקית שאומנה על כמויות עצומות של טקסט — זה מה ש-Claude הוא.",
    color: "#5b5bf6",
  },
];

const QUIZ: QuizQuestion[] = [
  {
    id: "q1",
    question: "מה הקשר בין AI, ML, DL ו-LLM?",
    options: [
      "הם ארבעה תחומים נפרדים לגמרי",
      "כל אחד הוא תת-קבוצה מקוננת בתוך הקודם לו (AI ⊃ ML ⊃ DL ⊃ LLM)",
      "LLM הוא הרחב ביותר",
      "אין קשר ביניהם",
    ],
    correctIndex: 1,
    explanation: "זהו מבנה מקונן: LLM הוא סוג של DL, שהוא סוג של ML, שהוא סוג של AI.",
  },
  {
    id: "q2",
    question: "האם תוכנת שחמט מבוססת-כללים (לא לומדת) היא AI?",
    options: [
      "לא, זה לא AI כי היא לא לומדת",
      "כן — AI הוא מושג רחב שכולל גם שיטות לא-לומדות",
      "היא ML אבל לא AI",
      "היא LLM",
    ],
    correctIndex: 1,
    explanation: "AI הוא המושג הרחב ביותר וכולל גם מערכות מבוססות-כללים; רק תת-הקבוצה ML מתמקדת בלמידה מנתונים.",
  },
];

const SECTIONS: LessonSection[] = [
  { id: "slides", label: "מצגת: ברוכים הבאים לעולם ה-AI", content: <SlideDeck slides={SLIDES} /> },
  {
    id: "diagram",
    label: "דיאגרמה אינטראקטיבית: ארבעת העיגולים",
    content: <NestedCircles levels={CIRCLES} />,
  },
  { id: "quiz", label: "בוחן ידע", content: <QuizEngine questions={QUIZ} /> },
  {
    id: "glossary",
    label: "מונחון",
    content: (
      <dl className="grid gap-3 sm:grid-cols-2">
        {[
          ["AI", "בינה מלאכותית — כל שיטה שגורמת למחשב להתנהג בחוכמה."],
          ["ML", "למידת מכונה — למידת דפוסים מנתונים במקום תכנות ידני."],
          ["DL", "למידה עמוקה — למידה באמצעות רשתות נוירונים רב-שכבתיות."],
          ["LLM", "מודל שפה גדול — רשת ענקית שאומנה על טקסט (כמו Claude)."],
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
    id: "faq",
    label: "שאלות נפוצות",
    content: (
      <div className="space-y-3">
        {[
          [
            "אז Claude הוא 'רק' LLM?",
            "Claude מבוסס על LLM בליבתו, אבל Claude Code (הכלי) משלב את ה-LLM עם כלים נוספים (קריאת קבצים, הרצת פקודות, MCP) שהופכים אותו ל'סוכן' (agent) — נושא שנעמיק בו בהמשך.",
          ],
        ].map(([q, a]) => (
          <div key={q} className="rounded-lg bg-card p-4">
            <p className="font-semibold">{q}</p>
            <p className="mt-1 text-sm text-muted">{a}</p>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: "recap",
    label: "רגע לפני שממשיכים: בקצרה",
    content: (
      <div className="rounded-xl border border-border bg-card p-4 text-sm">
        <p className="mb-2 font-bold">ארבעת העיגולים, במשפט אחד לכל אחד</p>
        <ol className="list-decimal space-y-1.5 pr-5">
          <li><strong>AI</strong> — כל מערכת שמדמה קבלת החלטות חכמה, גם בלי שום למידה (למשל מנוע שחמט מבוסס חוקים).</li>
          <li><strong>Machine Learning</strong> — תת-קבוצה של AI שלומדת דפוסים מנתונים במקום שמתכנתים אותה ידנית לכל מקרה.</li>
          <li><strong>Deep Learning</strong> — תת-קבוצה של ML שמשתמשת ברשתות נוירונים בעלות שכבות רבות (עומק) — למשל זיהוי תמונות.</li>
          <li><strong>LLM</strong> — תת-קבוצה ממוקדת של Deep Learning שמתמחה בשפה — זה בדיוק מה ש-Claude הוא.</li>
        </ol>
        <p className="mt-3 text-xs text-muted">
          חזור לדיאגרמת העיגולים המקוננים למעלה ונסה להסביר לעצמך בקול רם למה כל עיגול נמצא בתוך
          קודמו — זו הדרך הכי טובה לוודא שההבנה באמת נטמעה.
        </p>
      </div>
    ),
  },
  {
    id: "homework",
    label: "שיעורי בית",
    content: (
      <div className="rounded-xl bg-primary/5 p-4 text-sm">
        <p className="font-semibold">שיעורי בית:</p>
        <p className="mt-1 text-muted">
          חשוב על 3 מוצרי טכנולוגיה שאתה משתמש בהם (נטפליקס, וויז, ChatGPT וכו&#39;) ונסה למקם כל אחד
          באחד מארבעת העיגולים.
        </p>
      </div>
    ),
  },
];

export default function Page() {
  return <LessonShell meta={META} sections={SECTIONS} />;
}
