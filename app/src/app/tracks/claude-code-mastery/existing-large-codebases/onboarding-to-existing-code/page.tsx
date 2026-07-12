"use client";

import { LessonShell, type LessonMeta, type LessonSection } from "@/components/lesson/lesson-shell";
import { SlideDeck, type Slide } from "@/components/slides/slide-deck";
import { PromptComparisonLab } from "@/components/comparisons/prompt-comparison-lab";
import { EngineeringInsights } from "@/components/lesson/engineering-insights";
import { QuizEngine, type QuizQuestion } from "@/components/quiz/quiz-engine";
import { RealWorldTask } from "@/components/exercises/real-world-task";

const META: LessonMeta = {
  trackSlug: "claude-code-mastery",
  moduleSlug: "existing-large-codebases",
  lessonSlug: "onboarding-to-existing-code",
  title: "להכיר קוד זר לפני שנוגעים בו",
  objectives: [
    "לתרגל 'סיור היכרות' עם קוד לא-מוכר לפני כל שינוי",
    "להבין למה לשנות קוד בלי להבין אותו קודם הוא הדרך הכי בטוחה לשבור דברים",
    "לזהות מוסכמות קיימות (naming, מבנה תיקיות) ולהתאים אליהן",
  ],
  estMinutes: 30,
  difficulty: "בינוני",
  prerequisites: ["פרויקט מודול: פיצ'ר AtlasDesk בגישת TDD מלאה"],
};

const SLIDES: Slide[] = [
  {
    title: "מודול חדש: קוד שאתה לא כתבת",
    bullets: [
      "עד כה עבדת בעיקר על AtlasDesk כפרויקט שאתה מכיר. במציאות, רוב הזמן ההנדסי מושקע בקוד שכתב מישהו אחר — או שאתה עצמך כתבת לפני חודשים ושכחת.",
      "הסיכון: לבקש מ-Claude Code לשנות קוד לפני שהוא (ואתה) מבינים את ההקשר המלא — מוסכמות, החלטות ישנות, תלויות נסתרות.",
    ],
  },
  {
    title: "'סיור היכרות' לפני שינוי",
    bullets: [
      "לבקש מ-Claude Code לסכם: מבנה הפרויקט, מוסכמות בולטות, ואיפה הלוגיקה הרלוונטית למשימה שלך יושבת — לפני כל בקשת שינוי.",
      "זה בדיוק מה שעשית ב-onboarding ל-AtlasDesk (מודול 1) — אבל שם היה לך CLAUDE.md מוכן; כאן, בקוד זר, אתה בונה את ההבנה הזו מאפס בכל פעם.",
    ],
  },
];

const QUIZ: QuizQuestion[] = [
  {
    id: "q1",
    question: "למה מסוכן לבקש מ-Claude Code לשנות קוד זר בלי 'סיור היכרות' קודם?",
    options: [
      "אין סיכון אמיתי, זה רק מוסיף זמן מיותר",
      "בלי הבנת מוסכמות/תלויות קיימות, השינוי עלול לשבור דברים בשקט או ליצור אי-עקביות עם שאר הקוד",
      "כי Claude Code לא מסוגל לקרוא קוד שהוא לא כתב",
      "כי זה עובד רק על קוד שנכתב באנגלית",
    ],
    correctIndex: 1,
    explanation: "קוד קיים מכיל החלטות והקשר שלא נראים מיד ממבט חטוף — סיור היכרות חושף את זה לפני שהשינוי גורם לנזק.",
    optionNotes: [
      "לא נכון: יש סיכון ממשי — לא רק 'בזבוז זמן', אלא שבירת דברים בפועל.",
      "התשובה הנכונה: זו בדיוק הסיבה — הבנה חסרה מובילה לשינויים שלא מתחשבים בהקשר הקיים.",
      "לא נכון: Claude Code כן מסוגל לקרוא כל קוד — הסיכון הוא בדילוג על שלב ההבנה, לא ביכולת קריאה.",
      "לא נכון: אין קשר לשפת הכתיבה של הקוד או ההערות — העיקרון חל תמיד.",
    ],
  },
];

const SECTIONS: LessonSection[] = [
  { id: "slides", label: "מצגת: להכיר לפני שנוגעים", content: <SlideDeck slides={SLIDES} /> },
  {
    id: "comparison",
    label: "השוואה: קפיצה ישר לשינוי מול סיור היכרות",
    content: (
      <PromptComparisonLab
        title="הוספת פיצ'ר לפרויקט קוד פתוח לא-מוכר"
        unitLabel="גישה"
        bad={{
          label: "קפיצה ישר לשינוי",
          content: `"תוסיף כפתור export ל-CSV" (בלי שום סיור בפרויקט)`,
          outcome: "הסוכן עלול ליצור פונקציה חדשה במקום להשתמש בפונקציית export קיימת שכבר משמשת פיצ'רים אחרים — כפילות ואי-עקביות.",
        }}
        good={{
          label: "סיור קודם",
          content: `"קודם תסכם לי: איך הפרויקט מטפל בייצוא נתונים היום
(אם בכלל), ומה המוסכמות למבנה קבצים/naming כאן"
→ ואז מבקשים את הפיצ'ר בהתאם למה שנמצא`,
          outcome: "מתגלה שכבר יש exportToFile() כללית — הפיצ'ר החדש משתמש בה במקום ליצור לוגיקה מקבילה.",
        }}
        takeaway="סיור היכרות הוא השקעה קטנה שמונעת כפילות ואי-עקביות — בדיוק כמו שראית ב-architecture-first, רק שכאן המידע כבר קיים בקוד ורק צריך לחשוף אותו."
      />
    ),
  },
  {
    id: "engineering",
    label: "לחשוב כמו מהנדס AI",
    content: (
      <EngineeringInsights
        why="סיור היכרות קיים כי קוד קיים מגלם החלטות שלא נראות ממבט ראשון — מוסכמות, תלויות, פתרונות לבעיות ישנות שכבר נפתרו."
        alternatives="לסמוך על 'זה נראה סטנדרטי, אני יודע איך לעשות את זה' — עובד לפרויקטים קטנים מוכרים, מסוכן בפרויקט גדול או זר."
        whenNotTo="לפרויקט קטן מאוד שכבר מוכר לך היטב — סיור פורמלי הוא overhead מיותר."
        commonMistakes="לבקש סיור אבל לא לקרוא את התשובה בעיון לפני שממשיכים לבקשת השינוי — הסיור נועד לשנות את הבקשה הבאה, לא רק 'להיות שם'."
        cost="סיור מוסיף סיבוב תקשורת אחד — זול לעומת עלות תיקון קוד כפול/לא-עקבי שהתגלה מאוחר."
        realWorld="ב-AtlasDesk כבר יש לך CLAUDE.md מוכן ממודול 1 — בפרויקטים אחרים תצטרך לבנות את ההבנה הזו מחדש בכל פעם, בדיוק כמו בשיעור הזה."
      />
    ),
  },
  { id: "quiz", label: "בוחן ידע", content: <QuizEngine questions={QUIZ} /> },
  {
    id: "real-world-task",
    label: "משימה מעשית",
    content: (
      <RealWorldTask
        id="existing-code-onboarding-to-existing-code"
        title="בצע סיור היכרות בפרויקט קוד פתוח לא-מוכר"
        context="בחר פרויקט open-source קטן-בינוני שמעולם לא ראית את הקוד שלו (או פרויקט ישן שלך ששכחת)."
        steps={[
          "שבט את הפרויקט ופתח סשן Claude Code.",
          "בקש סיכום: מבנה, מוסכמות, ואיפה לוגיקה מרכזית יושבת — לפני כל בקשת שינוי.",
          "בחר משימה קטנה היפותטית ושאל: 'לפי המוסכמות שגילית, איך היית ניגש למשימה הזו?'",
        ]}
        successCriteria={[
          "יש לך סיכום אמיתי של פרויקט זר, לא רק ניחוש",
          "אתה יכול להצביע על מוסכמה קונקרטית שגילית ולא ידעת מראש",
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
          חשוב על פרויקט ישן שלך (חודשים-שנים) שאתה כבר לא זוכר טוב. תעשה עליו את אותו סיור
          היכרות — כמה מהמוסכמות שלך עצמך הפתיעו אותך?
        </p>
      </div>
    ),
  },
];

export default function Page() {
  return <LessonShell meta={META} sections={SECTIONS} />;
}
