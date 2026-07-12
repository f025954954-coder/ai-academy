"use client";

import { LessonShell, type LessonMeta, type LessonSection } from "@/components/lesson/lesson-shell";
import { SlideDeck, type Slide } from "@/components/slides/slide-deck";
import { PromptComparisonLab } from "@/components/comparisons/prompt-comparison-lab";
import { EngineeringInsights } from "@/components/lesson/engineering-insights";
import { QuizEngine, type QuizQuestion } from "@/components/quiz/quiz-engine";
import { RealWorldTask } from "@/components/exercises/real-world-task";

const META: LessonMeta = {
  trackSlug: "production-ai",
  moduleSlug: "cost-security",
  lessonSlug: "cost-optimization-at-scale",
  title: "אופטימיזציית עלויות בקנה מידה",
  objectives: [
    "להכיר טכניקות הוזלה: מודל קטן יותר למשימות פשוטות, prompt caching, batching",
    "להבין את הפשרה בין עלות לאיכות תשובה",
    "לחשב עלות חזויה לאלף משתמשים על סמך נתוני AtlasDesk",
  ],
  estMinutes: 25,
  difficulty: "מתקדם",
  prerequisites: ["prompt-injection-defense"],
};

const SLIDES: Slide[] = [
  {
    title: "מ-1 בקשה ל-1000 משתמשים",
    bullets: [
      "AtlasDesk עובד מצוין בבדיקה עם קריאה בודדת. אבל כשמכפילים ב-1000 משתמשים פעילים, עלויות שנראו זניחות ($0.001 לקריאה) הופכות למשמעותיות — ובדיוק כאן שכבת הניטור שבנית במודול הקודם הופכת קריטית.",
    ],
  },
  {
    title: "טכניקות הוזלה עיקריות",
    bullets: [
      "מודל קטן יותר למשימות פשוטות — לא כל בקשה צריכה את המודל הכי חזק; משימות פשוטות (סיווג, תגיות) יכולות להסתפק במודל זול וקטן יותר.",
      "Prompt caching (מודול קודם) — חוסך על חלקי context קבועים שחוזרים בכל קריאה.",
      "Batching — לאסוף כמה בקשות לא-דחופות (למשל webhook automation) ולעבד אותן יחד, אם ה-API תומך בכך, במקום קריאה נפרדת לכל אחת.",
    ],
  },
];

const QUIZ: QuizQuestion[] = [
  {
    id: "q1",
    question: "למה עלות שנראית 'זניחה' לקריאה בודדת ($0.001) יכולה להפוך למשמעותית בקנה מידה?",
    options: [
      "היא לא באמת הופכת משמעותית, זה תמיד זניח",
      "כי עלות לקריאה בודדת מוכפלת במספר הקריאות — 1000 משתמשים עם כמה קריאות ביום כל אחד יכולים להצטבר לסכום משמעותי חודשי",
      "כי המחיר עולה עם הזמן ללא קשר לכמות השימוש",
      "כי Claude API מייקר קריאות נוספות באופן לא-לינארי"
    ],
    correctIndex: 1,
    explanation: "עלות פר-קריאה × מספר הקריאות = עלות כוללת — מה שנראה זניח בבדיקה בודדת מצטבר במהירות בקנה מידה של אלפי משתמשים.",
    optionNotes: [
      "לא נכון: היא כן יכולה להפוך משמעותית — זה בדיוק העיקרון של 'קנה מידה' (scale).",
      "התשובה הנכונה: זהו חשבון פשוט — עלות בודדת × כמות שימוש = עלות כוללת, וזה גדל מהר.",
      "לא נכון: המחיר לקריאה בודדת קבוע (לפי תמחור המודל) — מה שמשתנה זו כמות הקריאות, לא המחיר עצמו.",
      "לא נכון: התמחור הוא ליניארי (לפי מספר טוקנים) — אין תוספת לא-ליניארית מובנית.",
    ],
  },
];

const SECTIONS: LessonSection[] = [
  { id: "slides", label: "מצגת: מקריאה בודדת לקנה מידה", content: <SlideDeck slides={SLIDES} /> },
  {
    id: "comparison",
    label: "השוואה: אותו מודל לכל משימה מול בחירה לפי מורכבות",
    content: (
      <PromptComparisonLab
        title="בחירת מודל לכל סוגי הבקשות ב-AtlasDesk"
        unitLabel="אסטרטגיית מודל"
        bad={{
          label: "אותו מודל חזק לכל דבר",
          content: `כל קריאה (גם 'האם זו שאלת חיוב?' הפשוטה בsulti-
agent-chat) משתמשת ב-claude-sonnet-4-5 המלא`,
          outcome: "משימות סיווג פשוטות (שקל היה לפתור במודל קטן וזול) עולות באותו מחיר גבוה כמו תשובה מורכבת — בזבוז עלות מיותר.",
        }}
        good={{
          label: "בחירת מודל לפי מורכבות המשימה",
          content: `סיווג/החלטה פשוטה (כמו "האם צריך אסקלציה?")
→ מודל קטן וזול יותר
תשובה מורכבת ללקוח → המודל המלא`,
          outcome: "עלות כוללת נמוכה יותר משמעותית — מודל יקר משמש רק היכן שהוא באמת נחוץ.",
        }}
        takeaway="לא כל קריאת AI זהה במורכבותה — התאמת עוצמת המודל לצורך האמיתי היא אחת האופטימיזציות הכי משתלמות בקנה מידה."
      />
    ),
  },
  {
    id: "engineering",
    label: "לחשוב כמו מהנדס AI",
    content: (
      <EngineeringInsights
        why="אופטימיזציית עלויות בקנה מידה קיימת כי הבדל קטן בעלות פר-קריאה מוכפל באלפי/מיליוני קריאות — אופטימיזציה שנראית זניחה בבדיקה הופכת קריטית בפרודקשן."
        alternatives="להתעלם מעלויות עד שהן הופכות לבעיה — עובד לפרויקט קטן, אבל מסוכן ברגע שהשימוש גדל — בדיוק כמו שנלמד בשיעור הקודם (מדידה לפני אופטימיזציה)."
        whenNotTo="לפרויקט לימודי/דמו קטן (כמו AtlasDesk הנוכחי) — אופטימיזציה אגרסיבית היא overhead מיותר לפני שיש בכלל שימוש בקנה מידה."
        commonMistakes="לבצע אופטימיזציית עלות על חשבון איכות התשובה בלי לבדוק את ההשפעה בפועל — לפעמים 'החיסכון' עולה יותר בתלונות משתמשים."
        cost="זו בדיוק ההגדרה של השיעור — עלות היא הנושא המרכזי, וההחלטות כאן נשענות ישירות על הנתונים שנאספו בשכבת הניטור (מודול קודם)."
        realWorld="בפרויקט המודול הבא, בעת ה-red-team העצמי, תשתמש בדיוק בנתוני /api/atlasdesk/stats כדי לזהות אילו נתיבים הכי יקרים ולתעדף אופטימיזציה שם."
      />
    ),
  },
  { id: "quiz", label: "בוחן ידע", content: <QuizEngine questions={QUIZ} /> },
  {
    id: "real-world-task",
    label: "משימה מעשית",
    content: (
      <RealWorldTask
        id="cost-security-cost-optimization-at-scale"
        title="חשב עלות חזויה ל-AtlasDesk באלף משתמשים"
        context="עבוד מול /api/atlasdesk/stats (מודול קודם) על AtlasDesk האמיתי."
        steps={[
          "שלח כמה הודעות ב-/atlasdesk (מצבים שונים) ובדוק את העלות הממוצעת לקריאה ב-/api/atlasdesk/stats.",
          "עם Claude Code, חשב: אם 1000 משתמשים שולחים 5 הודעות ביום כל אחד, מה העלות החודשית המשוערת?",
          "דון: איזה שינוי (caching, מודל קטן יותר לסיווג) היה הכי משתלם להוזיל את זה?",
        ]}
        successCriteria={[
          "יש לך נתון עלות ממוצעת אמיתי מהמערכת, לא ניחוש",
          "יש לך חישוב עלות חודשית חזוי מבוסס נתונים",
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
          חשוב על פיצ'ר AI שהיית רוצה להוסיף לפרויקט שלך. נסה להעריך מראש: כמה זה יעלה
          ב-1000 שימושים ביום? התשובה מפתיעה אותך?
        </p>
      </div>
    ),
  },
];

export default function Page() {
  return <LessonShell meta={META} sections={SECTIONS} />;
}
