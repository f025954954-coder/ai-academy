"use client";

import { LessonShell, type LessonMeta, type LessonSection } from "@/components/lesson/lesson-shell";
import { SlideDeck, type Slide } from "@/components/slides/slide-deck";
import { PromptComparisonLab } from "@/components/comparisons/prompt-comparison-lab";
import { EngineeringInsights } from "@/components/lesson/engineering-insights";
import { QuizEngine, type QuizQuestion } from "@/components/quiz/quiz-engine";
import { RealWorldTask } from "@/components/exercises/real-world-task";

const META: LessonMeta = {
  trackSlug: "claude-code-mastery",
  moduleSlug: "planning-architecture",
  lessonSlug: "architecture-first-development",
  title: "פיתוח Architecture-First",
  objectives: [
    "להבין למה לתכנן ממשקים/מבנה לפני מימוש מונע 'בלגן' בקוד שנוצר ע\"י AI",
    "לתרגל הגדרת חוזה (interface) לפני שמבקשים מימוש",
    "להשוות תוצאה עם ובלי תכנון ארכיטקטוני מקדים",
  ],
  estMinutes: 30,
  difficulty: "בינוני",
  prerequisites: ["planning-workflows"],
};

const SLIDES: Slide[] = [
  {
    title: "מ'תוכנית' ל'ארכיטקטורה'",
    bullets: [
      "בשיעור הקודם למדת לבקש תוכנית לפני ביצוע. עכשיו נלך שלב עמוק יותר: לתכנן את הצורה (shape) של הפתרון עצמו — ממשקים, טיפוסים, גבולות אחריות — לפני שמבקשים מימוש.",
      "'Architecture-first' פירושו: קודם מגדירים 'מה הפונקציה מקבלת ומחזירה', ורק אז 'איך היא עושה את זה בפנים'.",
    ],
  },
  {
    title: "למה AI בלי ארכיטקטורה נוטה ל'בלגן'",
    bullets: [
      "בלי חוזה מוגדר מראש, כל בקשת feature חדשה עלולה להוליד מבנה נתונים מעט שונה, קונבנציית שמות אחרת, או כפילות קוד — כי אין 'תבנית' מוסכמת לחזור אליה.",
      "עם ממשק מוגדר מראש (למשל: כל הודעת AtlasDesk היא `{role, content, tokens, cost}`), כל feature חדש נבנה סביב אותו חוזה — התוצאה עקבית לאורך זמן.",
    ],
  },
  {
    title: "איך זה נראה בפועל",
    bullets: [
      "במקום 'תוסיף שמירת עלויות שיחה', מגדירים קודם: 'טיפוס ConversationCost { totalTokens: number, totalCostUsd: number, perMessage: MessageCost[] }' — ורק אז מבקשים מימוש שמשתמש בטיפוס הזה.",
      "זה נשמע כמו עבודה נוספת, אבל בפועל זה חוסך זמן: הסוכן לא צריך 'לנחש' טיפוסים, וקל יותר לשלב את הקוד החדש עם קוד קיים.",
    ],
  },
];

const QUIZ: QuizQuestion[] = [
  {
    id: "q1",
    question: "מה זה 'architecture-first' בהקשר של עבודה עם Claude Code?",
    options: [
      "לכתוב מסמך ארכיטקטורה של 50 עמודים לפני כל שינוי",
      "להגדיר קודם את הצורה (חוזה/טיפוסים/ממשקים) של הפתרון, ורק אז לבקש מימוש פנימי",
      "לתת ל-AI לבחור את הארכיטקטורה לגמרי לבד",
      "להימנע משימוש ב-TypeScript",
    ],
    correctIndex: 1,
    explanation: "הרעיון הוא לקבוע את ה'חוזה' החיצוני (מה נכנס, מה יוצא) לפני שממלאים את המימוש הפנימי.",
  },
  {
    id: "q2",
    question: "למה בלי ארכיטקטורה מוגדרת מראש, AI נוטה ליצור אי-עקביות בין features שונים?",
    options: [
      "AI תמיד מבולגן ללא קשר",
      "בלי חוזה/תבנית מוסכמת לחזור אליה, כל בקשה חדשה עלולה להוליד מבנה מעט שונה משלה",
      "אין קשר לארכיטקטורה, זה תמיד קורה בגלל טעויות אקראיות",
      "זה קורה רק בפרויקטים גדולים מאוד",
    ],
    correctIndex: 1,
    explanation: "בלי 'תקן' מוגדר, אין מנגנון שמונע מכל feature חדש להמציא מבנה נתונים משלו.",
  },
];

const SECTIONS: LessonSection[] = [
  { id: "slides", label: "מצגת: פיתוח מונחה-ארכיטקטורה", content: <SlideDeck slides={SLIDES} /> },
  {
    id: "comparison",
    label: "השוואה: מימוש בלי חוזה מוגדר מול עם חוזה מוגדר",
    content: (
      <PromptComparisonLab
        title="הוספת מעקב עלויות שיחה ל-AtlasDesk"
        unitLabel="גישה"
        bad={{
          label: "מימוש ישיר, בלי טיפוס מוגדר",
          content: `"תוסיף מעקב עלויות לשיחה ב-AtlasDesk"
→ הסוכן מוסיף state בשם costTotal: number, ומעדכן אותו inline
  בתוך handleSend. עובד, אבל אין טיפוס מוגדר לפירוט לפי הודעה,
  ואם בעתיד תרצה להציג פירוט — צריך לפרק הכל מחדש.`,
          outcome: "פתרון שעובד היום, אבל שביר להרחבה — הרחבה עתידית (למשל 'הצג פירוט עלות לכל הודעה') דורשת שינוי ארכיטקטוני, לא רק תוספת.",
        }}
        good={{
          label: "חוזה מוגדר מראש",
          content: `"לפני מימוש: הגדר טיפוס MessageCost { messageId: string, tokens:
{input:number, output:number}, costUsd: number }, וטיפוס
ConversationCost { total: MessageCost, perMessage: MessageCost[] }.
רק אחרי שאתה מציג לי את הטיפוסים — נממש את הלוגיקה שמשתמשת בהם."`,
          outcome: "החוזה מוגדר מראש בצורה שתומכת גם בהווה (סה'כ) וגם בעתיד (פירוט). הרחבה עתידית היא תוספת, לא שינוי ארכיטקטוני.",
        }}
        takeaway="חוזה טוב הוא כזה שחושב קדימה על שימושים סבירים, בלי לבנות יותר מדי 'למקרה שיהיה צריך'. האיזון הזה (YAGNI מול extensibility) הוא בדיוק מה שהופך תכנון ארכיטקטוני לכישור, לא לפורמליות."
      />
    ),
  },
  {
    id: "engineering",
    label: "לחשוב כמו מהנדס AI",
    content: (
      <EngineeringInsights
        why="הגדרת חוזה (טיפוסים/ממשקים) לפני מימוש קיימת כי היא מפרידה 'מה' מ'איך' — מאפשרת לבדוק שההחלטה הארכיטקטונית נכונה לפני שמשקיעים בכתיבת הלוגיקה הפנימית."
        alternatives="פיתוח 'מבפנים החוצה' (מתחילים מהלוגיקה, מגדירים טיפוסים תוך כדי) יכול להיות מהיר יותר לפרוטוטייפ חד-פעמי — אבל מסוכן בקוד שממשיך לחיות ולהתרחב."
        whenNotTo="לסקריפט או פרוטוטייפ חד-פעמי שלא ימשיך להתקיים — הגדרת חוזה פורמלי היא over-engineering שם."
        commonMistakes="להגדיר חוזה 'גנרי מדי' מתוך רצון 'להיות מוכן לכל דבר' — זה מוסיף מורכבות בלי תועלת אמיתית (YAGNI: You Aren't Gonna Need It). הכלל: תכנן לצרכים ידועים, לא להשערות."
        cost="השקעת זמן קטנה בהגדרת חוזה חוסכת refactoring יקר יותר בהמשך, כשפיצ'רים נוספים נבנים על בסיס לא-עקבי."
        realWorld="ב-AtlasDesk, המבנה {content, usage: {inputTokens, outputTokens}, connected} של /api/ai/chat הוא בדיוק חוזה כזה — כל קומפוננטה עתידית שמשתמשת ב-API הזה יודעת בדיוק למה לצפות."
      />
    ),
  },
  { id: "quiz", label: "בוחן ידע", content: <QuizEngine questions={QUIZ} /> },
  {
    id: "real-world-task",
    label: "משימה מעשית",
    content: (
      <RealWorldTask
        id="cc-architecture-first-development"
        title="הגדר חוזה (טיפוס) לפני מימוש פיצ'ר ב-AtlasDesk"
        context="עבוד מול AtlasDesk. בחר פיצ'ר קטן-בינוני שדורש מבנה נתונים חדש (למשל: תיוג הודעות כ'חשובות', או שמירת timestamp לכל הודעה)."
        steps={[
          "לפני שאתה מבקש כל מימוש, בקש מ-Claude Code להציע טיפוס TypeScript שמייצג את הנתון החדש.",
          "בדוק את הטיפוס המוצע: האם הוא תומך גם בצורך הנוכחי וגם בהרחבה סבירה (לא הזויה) בעתיד?",
          "בקש שינוי בטיפוס אם צריך, ורק אז אשר מימוש שמשתמש בו.",
          "אחרי המימוש, בדוק שכל שימוש בנתון החדש בקוד עקבי עם הטיפוס שהוגדר.",
        ]}
        successCriteria={[
          "הגדרת טיפוס/ממשק לפני שנכתב קוד מימוש",
          "הטיפוס לא 'תפוח' מיותר (YAGNI) אבל גם לא מוגבל מדי",
          "המימוש הסופי עקבי עם החוזה שהוגדר מראש",
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
          עבור על קוד קיים (שלך או פרויקט אחר) וחפש מקום שבו נתון דומה מיוצג בכמה צורות שונות
          (למשל: פעם מערך, פעם אובייקט, פעם string מפוענח ידנית). זו בדיוק התוצאה של פיתוח בלי
          חוזה מוגדר מראש — סימן טוב לזהות כדי לדעת מתי architecture-first היה מונע את זה.
        </p>
      </div>
    ),
  },
];

export default function Page() {
  return <LessonShell meta={META} sections={SECTIONS} />;
}
