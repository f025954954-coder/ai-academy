"use client";

import { Binary, Type, Image as ImageIcon, Music } from "lucide-react";
import { LessonShell, type LessonMeta, type LessonSection } from "@/components/lesson/lesson-shell";
import { SlideDeck, type Slide } from "@/components/slides/slide-deck";
import { StepDiagram, type DiagramStep } from "@/components/diagrams/step-diagram";
import { BinaryConverter } from "@/components/simulators/binary-converter";
import { ExerciseValidator, type ExerciseConfig } from "@/components/exercises/exercise-validator";
import { QuizEngine, type QuizQuestion } from "@/components/quiz/quiz-engine";

const META: LessonMeta = {
  trackSlug: "foundations",
  moduleSlug: "computer-basics",
  lessonSlug: "binary-representation",
  title: "ייצוג מידע: בינארי, טקסט, תמונה, קול",
  objectives: [
    "להמיר בין בינארי לעשרוני",
    "להבין קידוד טקסט (ASCII/Unicode)",
    "להבין ברמת עקרון איך תמונה וקול מיוצגים כמספרים",
  ],
  estMinutes: 30,
  difficulty: "מתחיל",
  prerequisites: ["איך קוד הופך לתוכנה רצה"],
};

const SLIDES: Slide[] = [
  {
    title: "איזו בעיה זה פותר?",
    bullets: [
      "מחשב יודע לייצג רק שני מצבים: זרם חשמל או היעדרו — 1 או 0.",
      "כל דבר שאנחנו רואים במחשב — טקסט, תמונה, סרטון, קול — הוא בסופו של דבר רק רצף של אפסים ואחדים.",
      "הבנה של זה מסבירה למה 'קידוד תווים שגוי' הופך טקסט לג'יבריש, ולמה קובץ תמונה פגום נראה כמו רעש.",
    ],
  },
  {
    title: "בינארי → עשרוני",
    bullets: [
      "כל ביט (bit) מייצג חזקה של 2: 1, 2, 4, 8, 16...",
      "8 ביטים = בייט (byte) אחד, שיכול לייצג ערך בין 0 ל-255.",
      "לדוגמה: 00101010 בבינארי = 42 בעשרוני (32+8+2).",
    ],
  },
  {
    title: "קידוד טקסט: ASCII ו-Unicode",
    bullets: [
      "ASCII: כל אות/סימן מיוצג במספר בין 0-127 (למשל 'A' = 65).",
      "Unicode/UTF-8: הרחבה שתומכת גם בעברית, אימוג'ים, ושפות נוספות — מיליוני תווים אפשריים.",
      "כשקובץ טקסט 'נראה כמו ג'יבריש' — לרוב הבעיה היא קידוד לא נכון (למשל UTF-8 מול Windows-1255).",
    ],
  },
  {
    title: "תמונה וקול כמספרים",
    bullets: [
      "תמונה = רשת של פיקסלים, כל פיקסל מיוצג ב-3 מספרים (אדום, ירוק, כחול — RGB).",
      "קול = גל אנלוגי שנדגם (sampled) אלפי פעמים בשנייה, וכל דגימה נשמרת כמספר.",
      "בשני המקרים — יותר 'רזולוציה' (יותר פיקסלים/דגימות) = יותר דיוק אבל גם יותר מקום אחסון.",
    ],
  },
];

const FLOW_STEPS: DiagramStep[] = [
  {
    icon: Binary,
    label: "ביט אחד",
    detail: "היחידה הבסיסית ביותר — 0 או 1. לבד לא אומר הרבה.",
  },
  {
    icon: Type,
    label: "טקסט",
    detail: "8 ביטים (בייט) מקודדים לפי טבלה (ASCII/Unicode) הופכים למספר שמייצג תו — כמו 'A'.",
  },
  {
    icon: ImageIcon,
    label: "תמונה",
    detail: "כל פיקסל = 3 בייטים (R,G,B). תמונה שלמה היא מיליוני בייטים כאלה מסודרים ברשת.",
  },
  {
    icon: Music,
    label: "קול",
    detail: "גל קול נדגם אלפי פעמים בשנייה; כל דגימה נשמרת כמספר שמייצג את עוצמת הגל באותו רגע.",
  },
];

const EXERCISE: ExerciseConfig = {
  id: "binary-ex1",
  prompt:
    "כתוב פונקציה בשם charToBinary שמקבלת תו בודד (למשל 'A') ומחזירה את הייצוג הבינארי שלו (8 ביט, עם אפסים מובילים).",
  starterCode: `function charToBinary(char) {
  // רמז: char.charCodeAt(0) נותן את הקוד המספרי של התו
  // TODO: החזר מחרוזת בינארית באורך 8 (למשל "01000001" עבור 'A')
}`,
  hints: [
    "השתמש ב-char.charCodeAt(0) כדי לקבל את המספר, ואז המר אותו לבינארי.",
    "נסה: char.charCodeAt(0).toString(2).padStart(8, '0')",
    "טעות נפוצה: לשכוח padStart, מה שגורם למספרים קטנים (כמו רווח) להחזיר פחות מ-8 ביטים.",
  ],
  solutionCode: `function charToBinary(char) {
  return char.charCodeAt(0).toString(2).padStart(8, '0');
}`,
  check: (userFn) => {
    const fn = userFn as (c: string) => string;
    try {
      const result = fn("A");
      if (result === "01000001") {
        return { passed: true, message: "מדויק! 'A' = 65 = 01000001 בבינארי." };
      }
      return { passed: false, message: `קיבלתי '${result}', ציפיתי ל-'01000001'.` };
    } catch (e) {
      return { passed: false, message: `שגיאת הרצה: ${(e as Error).message}` };
    }
  },
};

const QUIZ: QuizQuestion[] = [
  {
    id: "q1",
    question: "כמה ערכים אפשריים יש בבייט אחד (8 ביט)?",
    options: ["8", "16", "256", "1000"],
    correctIndex: 2,
    explanation: "8 ביטים = 2⁸ = 256 ערכים אפשריים (0 עד 255).",
  },
  {
    id: "q2",
    question: "מה קורה כשקובץ טקסט נפתח עם קידוד לא נכון?",
    options: [
      "הקובץ נמחק",
      "התווים מוצגים כג'יבריש כי המספרים מתפרשים לפי טבלה שגויה",
      "שום דבר, זה תמיד עובד",
      "הקובץ הופך לתמונה",
    ],
    correctIndex: 1,
    explanation: "כל בייט מתפרש לפי טבלת קידוד מסוימת — קידוד שגוי = תרגום שגוי לתווים.",
  },
  {
    id: "q3",
    question: "איך תמונה דיגיטלית מיוצגת ברמת היסוד?",
    options: [
      "כקובץ טקסט רגיל",
      "כרשת פיקסלים, כל אחד עם ערכי RGB מספריים",
      "כקובץ קול",
      "היא לא מיוצגת כמספרים",
    ],
    correctIndex: 1,
    explanation: "כל פיקסל הוא שלושה מספרים (אדום/ירוק/כחול) שיחד קובעים את הצבע.",
  },
];

const SECTIONS: LessonSection[] = [
  { id: "slides", label: "מצגת: הרעיון המרכזי", content: <SlideDeck slides={SLIDES} /> },
  {
    id: "diagram",
    label: "דיאגרמה אינטראקטיבית: מביט בודד למדיה מורכבת",
    content: <StepDiagram steps={FLOW_STEPS} />,
  },
  {
    id: "simulator",
    label: "סימולטור: ממיר בינארי↔עשרוני",
    content: <BinaryConverter />,
  },
  { id: "exercise", label: "תרגיל מודרך", content: <ExerciseValidator exercise={EXERCISE} /> },
  { id: "quiz", label: "בוחן ידע", content: <QuizEngine questions={QUIZ} /> },
  {
    id: "glossary",
    label: "מונחון",
    content: (
      <dl className="grid gap-3 sm:grid-cols-2">
        {[
          ["Bit", "היחידה הבסיסית ביותר של מידע — 0 או 1."],
          ["Byte", "8 ביטים יחד; יכול לייצג ערך בין 0 ל-255."],
          ["ASCII", "טבלת קידוד בסיסית לתווים לועזיים (0-127)."],
          ["Unicode/UTF-8", "תקן קידוד רחב שתומך כמעט בכל שפה ואימוג'י."],
          ["RGB", "שיטת ייצוג צבע כשלושה ערכים: אדום, ירוק, כחול."],
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
            "אם הכל זה 0 ו-1, איך המחשב יודע להבדיל בין תמונה לטקסט?",
            "הפורמט של הקובץ (למשל סיומת .txt מול .png) אומר לתוכנה איך לפרש את הבייטים — אותם בייטים יכולים 'להיות' דברים שונים לגמרי תלוי בפרשנות.",
          ],
          [
            "למה קבצי תמונה גדולים יותר מקבצי טקסט?",
            "כי לכל פיקסל בתמונה יש בדרך כלל 3 בייטים, ותמונה יכולה להכיל מיליוני פיקסלים — בעוד עמוד טקסט הוא רק כמה אלפי תווים.",
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
        <p className="mb-2 font-bold">מנורה בודדת ועד תמונה שלמה</p>
        <ol className="list-decimal space-y-1.5 pr-5">
          <li>ביט בודד = דלוק/כבוי (1/0), בדיוק כמו נורה.</li>
          <li>8 ביטים = בייט אחד — מספיק כדי לייצג מספר בין 0 ל-255, או תו טקסט בודד.</li>
          <li>תמונה = רשת ענקית של פיקסלים, וכל פיקסל הוא כמה בייטים (צבע אדום/ירוק/כחול).</li>
          <li>קול = גל שנדגם אלפי פעמים בשנייה, וכל דגימה נשמרת כמספר בינארי.</li>
        </ol>
        <p className="mt-3 text-xs text-muted">
          חזור לממיר הבינארי החי למעלה ונסה להמיר בעצמך, בלי לעזור לעצמך במחשבון, מספר עשרוני
          קטן (כמו 13 או 42) לבינארי — זו הדרך הכי טובה לוודא שההבנה נטמעה.
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
          השתמש בסימולטור למעלה כדי למצוא את הייצוג הבינארי של הגיל שלך. כמה ביטים היית צריך אם היית
          רוצה לייצג מספרים עד 1000?
        </p>
      </div>
    ),
  },
];

export default function Page() {
  return <LessonShell meta={META} sections={SECTIONS} />;
}
