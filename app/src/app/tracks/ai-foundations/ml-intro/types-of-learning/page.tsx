"use client";

import { LessonShell, type LessonMeta, type LessonSection } from "@/components/lesson/lesson-shell";
import { SlideDeck, type Slide } from "@/components/slides/slide-deck";
import { RoleSort, type RoleSortItem } from "@/components/interactive/role-sort";
import { QuizEngine, type QuizQuestion } from "@/components/quiz/quiz-engine";

const META: LessonMeta = {
  trackSlug: "ai-foundations",
  moduleSlug: "ml-intro",
  lessonSlug: "types-of-learning",
  title: "סוגי למידה: מונחית, לא-מונחית, חיזוקית",
  objectives: [
    "להבין למידה מונחית (supervised) — לומדים מדוגמאות מתויגות",
    "להבין למידה לא-מונחית (unsupervised) — מוצאים דפוסים בלי תיוג",
    "להבין למידת חיזוק (reinforcement) — לומדים מניסוי וטעייה עם פרס/עונש",
  ],
  estMinutes: 25,
  difficulty: "מתחיל",
  prerequisites: ["מהי בינה מלאכותית — AI מול ML מול DL מול LLM"],
};

const SLIDES: Slide[] = [
  {
    title: "Supervised Learning — למידה מונחית",
    bullets: [
      "המודל לומד מדוגמאות שכבר מתויגות: 'זה ספאם', 'זה לא ספאם'.",
      "המטרה: לחזות תווית נכונה על דוגמאות חדשות שלא ראה.",
      "דוגמה: זיהוי ספאם, זיהוי תמונות, ותרגום שפות (בשלבים הראשונים של האימון).",
    ],
  },
  {
    title: "Unsupervised Learning — למידה לא-מונחית",
    bullets: [
      "אין תוויות בכלל — המודל מוצא דפוסים וקבוצות בעצמו.",
      "דוגמה: לקבץ לקוחות דומים (clustering) בלי לדעת מראש איזה 'סוג' לקוח כל אחד.",
      "חלק מהאימון הראשוני של LLMs (לפני fine-tuning) הוא סוג של למידה לא-מונחית על טקסט לא מתויג.",
    ],
  },
  {
    title: "Reinforcement Learning — למידת חיזוק",
    bullets: [
      "המודל 'מנסה' פעולות בסביבה ומקבל פרס או עונש על התוצאה.",
      "דוגמה קלאסית: AlphaGo למד לשחק גו על ידי משחק נגד עצמו מיליוני פעמים.",
      "RLHF (Reinforcement Learning from Human Feedback) הוא חלק חשוב באימון מודלים כמו Claude — משוב אנושי 'מתגמל' תשובות טובות.",
    ],
  },
];

const ITEMS: RoleSortItem[] = [
  { id: "1", label: "לימוד לזהות תמונות חתולים מתוך אלף תמונות מתויגות 'חתול'/'לא חתול'", correctBucket: "supervised" },
  { id: "2", label: "קיבוץ לקוחות חנות לפי דפוסי קנייה דומים, בלי לדעת קטגוריות מראש", correctBucket: "unsupervised" },
  { id: "3", label: "רובוט שלומד לרוץ על ידי ניסוי וטעייה, מקבל פרס כשהוא לא נופל", correctBucket: "reinforcement" },
  { id: "4", label: "חיזוי מחיר דירה על סמך אלפי דירות עם מחיר ידוע", correctBucket: "supervised" },
  { id: "5", label: "מציאת קבוצות נושאים חבויות במיליון מאמרי חדשות, בלי תיוג", correctBucket: "unsupervised" },
  { id: "6", label: "AI ששוחק שחמט נגד עצמו מיליוני פעמים ומשתפר בכל משחק", correctBucket: "reinforcement" },
];

const QUIZ: QuizQuestion[] = [
  {
    id: "q1",
    question: "מה מבדיל למידה מונחית מלא-מונחית?",
    options: [
      "אין הבדל אמיתי",
      "מונחית לומדת מדוגמאות מתויגות; לא-מונחית מוצאת דפוסים ללא תיוג",
      "לא-מונחית תמיד מדויקת יותר",
      "מונחית משמשת רק לתמונות",
    ],
    correctIndex: 1,
    explanation: "התיוג הוא ההבדל המרכזי — יש 'תשובה נכונה' ידועה מראש במונחית, ואין בלא-מונחית.",
  },
  {
    id: "q2",
    question: "מה תפקיד ה'פרס' (reward) בלמידת חיזוק?",
    options: [
      "אין לו תפקיד אמיתי",
      "הוא מנחה את המודל אילו פעולות היו טובות ואילו לא, כדי לשפר התנהגות עתידית",
      "הוא רק מספר סטטיסטי בלי משמעות",
      "הוא תחליף לתיוג נתונים",
    ],
    correctIndex: 1,
    explanation: "הפרס/עונש הוא איתות שמנחה את המודל לחזור על פעולות טובות ולהימנע מרעות.",
  },
];

const SECTIONS: LessonSection[] = [
  { id: "slides", label: "מצגת: שלושת סוגי הלמידה", content: <SlideDeck slides={SLIDES} /> },
  {
    id: "sort-game",
    label: "משחק: איזה סוג למידה זה?",
    content: (
      <RoleSort
        items={ITEMS}
        buckets={[
          { id: "supervised", label: "מונחית" },
          { id: "unsupervised", label: "לא-מונחית" },
          { id: "reinforcement", label: "חיזוקית" },
        ]}
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
          ["Supervised Learning", "למידה מדוגמאות מתויגות עם תשובה נכונה ידועה."],
          ["Unsupervised Learning", "מציאת דפוסים בנתונים ללא תיוג מוקדם."],
          ["Reinforcement Learning", "למידה מניסוי וטעייה עם פרס/עונש."],
          ["RLHF", "למידת חיזוק ממשוב אנושי — משמש לאימון מודלי שפה."],
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
          חפש בקצרה: מה זה RLHF, ולמה חשבים ש-Claude ומודלים דומים משתמשים בו בשלב האימון האחרון?
        </p>
      </div>
    ),
  },
];

export default function Page() {
  return <LessonShell meta={META} sections={SECTIONS} />;
}
