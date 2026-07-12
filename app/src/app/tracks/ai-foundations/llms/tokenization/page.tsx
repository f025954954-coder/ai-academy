"use client";

import { LessonShell, type LessonMeta, type LessonSection } from "@/components/lesson/lesson-shell";
import { SlideDeck, type Slide } from "@/components/slides/slide-deck";
import { TokenVisualizer } from "@/components/diagrams/token-visualizer";
import { EngineeringInsights } from "@/components/lesson/engineering-insights";
import { ExerciseValidator, type ExerciseConfig } from "@/components/exercises/exercise-validator";
import { QuizEngine, type QuizQuestion } from "@/components/quiz/quiz-engine";

const META: LessonMeta = {
  trackSlug: "ai-foundations",
  moduleSlug: "llms",
  lessonSlug: "tokenization",
  title: "טוקניזציה — איך טקסט הופך למספרים",
  objectives: [
    "להבין מהו טוקן ולמה מודלים לא 'רואים' אותיות אלא טוקנים",
    "להבין למה עברית ושפות אחרות לרוב 'יקרות' יותר בטוקנים מאנגלית",
    "לנתח טקסט אמיתי ולראות איך הוא מתפרק לטוקנים",
  ],
  estMinutes: 25,
  difficulty: "מתחיל",
  prerequisites: ["פרויקט מודול: זיהוי ספרות בכתב יד"],
};

const SLIDES: Slide[] = [
  {
    title: "מודל שפה לא קורא אותיות — הוא קורא טוקנים",
    bullets: [
      "טוקן הוא היחידה הבסיסית שמודל שפה מעבד — יכול להיות מילה שלמה, חלק ממילה, או אפילו סימן פיסוק בודד.",
      "לפני שטקסט נכנס למודל, הוא עובר תהליך טוקניזציה: חלוקה לטוקנים, ואז המרה למספרים (IDs) שהמודל מכיר.",
      "זה בדיוק כמו ייצוג בינארי שלמדת בשיעור הראשון — רק שכאן 'היחידה' היא טוקן ולא ביט.",
    ],
  },
  {
    title: "למה עברית 'יקרה' יותר?",
    bullets: [
      "רוב הטוקנייזרים אומנו בעיקר על טקסט אנגלי — מילים אנגליות נפוצות מקבלות טוקן שלם.",
      "בעברית (ושפות אחרות עם פחות ייצוג באימון), מילים מתפרקות לעיתים קרובות לכמה טוקנים קטנים יותר, ולפעמים אפילו לתו בודד.",
      "המשמעות המעשית: אותה כמות מידע בעברית עשויה לעלות יותר טוקנים — ולכן יותר כסף — מאשר באנגלית.",
    ],
  },
];

const EXERCISE: ExerciseConfig = {
  id: "tokenization-ex1",
  prompt:
    "כתוב פונקציה בשם estimateCost שמקבלת מספר טוקנים ומחיר לכל מיליון טוקנים (pricePerMillion), ומחזירה את העלות המשוערת (מספר, לא מעוגל).",
  starterCode: `function estimateCost(tokenCount, pricePerMillion) {
  // TODO: החזר (tokenCount / 1,000,000) * pricePerMillion
}`,
  hints: [
    "המרה בין 'טוקנים בודדים' ל'מיליוני טוקנים' דורשת חלוקה ב-1,000,000.",
    "נסה: return (tokenCount / 1_000_000) * pricePerMillion;",
    "טעות נפוצה: לשכוח את סדר הפעולות — קודם לחלק ב-1,000,000 ואז לכפול, לא ההפך (זה מתמטית זהה, אבל ודא שאתה לא מכפיל קודם במספר גדול וגורם לבעיות דיוק).",
  ],
  solutionCode: `function estimateCost(tokenCount, pricePerMillion) {
  return (tokenCount / 1_000_000) * pricePerMillion;
}`,
  check: (userFn) => {
    const fn = userFn as (t: number, p: number) => number;
    try {
      const result = fn(500_000, 3);
      if (Math.abs(result - 1.5) < 0.001) {
        return { passed: true, message: "מדויק! חצי מיליון טוקנים במחיר 3$ למיליון = 1.5$." };
      }
      return { passed: false, message: `קיבלתי ${result}, ציפיתי ל-1.5.` };
    } catch (e) {
      return { passed: false, message: `שגיאת הרצה: ${(e as Error).message}` };
    }
  },
};

const QUIZ: QuizQuestion[] = [
  {
    id: "q1",
    question: "מהו טוקן?",
    options: [
      "תמיד אות בודדת",
      "היחידה הבסיסית שמודל שפה מעבד — יכולה להיות מילה, חלק ממילה, או סימן",
      "תמיד מילה שלמה",
      "יחידת זיכרון במחשב",
    ],
    correctIndex: 1,
    explanation: "טוקן הוא היחידה שהטוקנייזר בחר לחלק אליה את הטקסט — לא בהכרח מילה שלמה.",
  },
  {
    id: "q2",
    question: "למה טקסט בעברית עשוי לעלות יותר טוקנים מאשר אותו טקסט באנגלית?",
    options: [
      "עברית 'קשה' יותר למודל להבין מבחינה לוגית",
      "רוב הטוקנייזרים אומנו בעיקר על אנגלית, כך שמילים עבריות מתפרקות ליותר טוקנים קטנים",
      "אין הבדל אמיתי",
      "עברית תמיד משתמשת בפחות טוקנים",
    ],
    correctIndex: 1,
    explanation: "הטיה זו נובעת מהרכב נתוני האימון של הטוקנייזר, לא ממאפיין אינהרנטי של השפה עצמה.",
  },
];

const SECTIONS: LessonSection[] = [
  { id: "slides", label: "מצגת: הרעיון המרכזי", content: <SlideDeck slides={SLIDES} /> },
  {
    id: "visualizer",
    label: "Tokenizer Visualizer — נתח טקסט משלך",
    content: (
      <TokenVisualizer defaultText="שלום! אני לומד באקדמיית AI ובונה מערכות עם Claude Code." />
    ),
  },
  {
    id: "engineering",
    label: "לחשוב כמו מהנדס AI",
    content: (
      <EngineeringInsights
        why="טוקניזציה (בפרט BPE — Byte Pair Encoding) נבחרה כי היא מאזנת בין אוצר מילים קטן וניהולי (עשרות אלפי טוקנים) לבין היכולת לייצג כל טקסט, כולל מילים נדירות או שגויות-כתיב, על ידי פירוק לתת-יחידות."
        alternatives="חלוקה ברמת תו בודד (character-level) פשוטה יותר אך יוצרת רצפים ארוכים מדי; חלוקה ברמת מילה שלמה (word-level) קצרה יותר אך לא מתמודדת טוב עם מילים חדשות/נדירות."
        cost="עלות API נמדדת בטוקנים, לא במילים או תווים — זו הסיבה שכתיבת פרומפטים תמציתיים (prompt engineering יעיל) חוסכת כסף ממש, לא רק 'מסודר יותר'."
        performance="מספר הטוקנים משפיע ישירות על זמן העיבוד — יותר טוקנים = יותר זמן חישוב = latency גבוה יותר."
        commonMistakes="מתכנתים מתחילים מניחים ש-1 מילה = 1 טוקן; זה נכון לרוב באנגלית פשוטה אך שגוי לעברית, קוד, או טקסט טכני עם הרבה סימנים מיוחדים."
        realWorld="כשאתה בונה מוצר AI מסחרי, מעקב אחרי טוקנים (input+output) לכל בקשה הוא חלק סטנדרטי מהניטור — לא רק לצורך עלות אלא גם לזיהוי בעיות ביצועים."
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
          ["Token", "יחידת הטקסט הבסיסית שמודל שפה מעבד."],
          ["Tokenizer", "הרכיב שמפרק טקסט לטוקנים וממיר אותם למספרים."],
          ["BPE", "Byte Pair Encoding — אלגוריתם נפוץ לבניית אוצר טוקנים."],
          ["Vocabulary", "אוסף כל הטוקנים האפשריים שהמודל מכיר."],
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
          בוויזואלייזר למעלה, הקלד את אותו משפט פעם אחת בעברית ופעם באנגלית (תרגום). השווה את מספר
          הטוקנים המוערך — האם ההבדל תואם את מה שלמדת?
        </p>
      </div>
    ),
  },
];

export default function Page() {
  return <LessonShell meta={META} sections={SECTIONS} />;
}
