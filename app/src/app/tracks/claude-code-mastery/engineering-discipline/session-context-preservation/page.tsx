"use client";

import { LessonShell, type LessonMeta, type LessonSection } from "@/components/lesson/lesson-shell";
import { SlideDeck, type Slide } from "@/components/slides/slide-deck";
import { PromptComparisonLab } from "@/components/comparisons/prompt-comparison-lab";
import { EngineeringInsights } from "@/components/lesson/engineering-insights";
import { QuizEngine, type QuizQuestion } from "@/components/quiz/quiz-engine";
import { RealWorldTask } from "@/components/exercises/real-world-task";

const META: LessonMeta = {
  trackSlug: "claude-code-mastery",
  moduleSlug: "engineering-discipline",
  lessonSlug: "session-context-preservation",
  title: "ניהול סשן ושימור Context לטווח ארוך",
  objectives: [
    "לנהל סשנים ארוכי-טווח על פרויקט שממשיך לגדול",
    "להבין מתי לפצל לסשן חדש ומתי להמשיך (מחבר למודול 1)",
    "לתעד החלטות בין סשנים כדי לא 'לאבד' הקשר",
  ],
  estMinutes: 25,
  difficulty: "בינוני",
  prerequisites: ["documentation-workflows"],
};

const SLIDES: Slide[] = [
  {
    title: "פרויקט שממשיך לגדול — כמו האקדמיה עצמה",
    bullets: [
      "בטראק הזה, AtlasDesk גדל מ-'מנוע שיחה בסיסי' ל-7 יכולות production (זיכרון, MCP, RAG, סוכן, ...) — לאורך עשרות סשני Claude Code שונים, ימים ואולי שבועות בהפרש.",
      "בלי תיעוד בין הסשנים (docs/13-atlasdesk-features.md, הודעות commit מפורטות), כל סשן חדש היה צריך 'לגלות מחדש' את כל ההיסטוריה של הפרויקט.",
    ],
  },
  {
    title: "מה שומר את ההקשר בין סשנים",
    bullets: [
      "CLAUDE.md מעודכן (מודול 1) — מצב נוכחי של הפרויקט.",
      "תיעוד יכולות (כמו docs/13-atlasdesk-features.md) — מה כבר קיים, איפה זה חי בקוד.",
      "הודעות commit מפורטות (שיעור 1 במודול הזה) — למה כל שינוי נעשה.",
      "יחד, שלושת אלו מאפשרים לסשן חדש 'להמשיך בדיוק מאיפה שהפסקת' בלי לאבד הקשר.",
    ],
  },
];

const QUIZ: QuizQuestion[] = [
  {
    id: "q1",
    question: "מה מאפשר לפרויקט לגדול לאורך עשרות סשני Claude Code שונים בלי לאבד הקשר?",
    options: [
      "כלום מיוחד, Claude Code זוכר הכל אוטומטית בין סשנים",
      "שילוב של CLAUDE.md מעודכן, תיעוד יכולות, והודעות commit מפורטות — כל אחד תורם חלק מההקשר שסשן חדש צריך",
      "רק גודל חלון ההקשר של המודל",
      "צריך להשתמש תמיד באותו סשן, לעולם לא לפתוח חדש",
    ],
    correctIndex: 1,
    explanation: "Claude Code לא 'זוכר' סשנים קודמים באופן טבעי — שילוב התיעודים השונים הוא מה שבפועל משמר את ההקשר לאורך זמן.",
    optionNotes: [
      "לא נכון: Claude Code לא זוכר סשנים קודמים אוטומטית — ההקשר נשמר רק דרך תיעוד מפורש.",
      "התשובה הנכונה: כל אחד מהם (CLAUDE.md, תיעוד יכולות, הודעות commit) תורם חלק אחר מההקשר — יחד הם מייצרים המשכיות.",
      "לא נכון: גודל חלון ההקשר רלוונטי בתוך סשן בודד, לא בין סשנים שונים לגמרי.",
      "לא נכון: זה בדיוק הפוך ממה שנלמד במודול 1 — פיצול לסשנים ממוקדים הוא לרוב עדיף, כל עוד יש תיעוד ביניהם.",
    ],
  },
];

const SECTIONS: LessonSection[] = [
  { id: "slides", label: "מצגת: איך פרויקט גדל בין סשנים", content: <SlideDeck slides={SLIDES} /> },
  {
    id: "comparison",
    label: "השוואה: סשן חדש בלי תיעוד מול עם תיעוד",
    content: (
      <PromptComparisonLab
        title="חזרה לפרויקט AtlasDesk אחרי הפסקה של שבוע"
        unitLabel="גישה"
        bad={{
          label: "בלי לקרוא תיעוד קודם",
          content: `"תוסיף עוד יכולת ל-AtlasDesk" (בלי לבדוק מה כבר
קיים, אילו החלטות התקבלו, מה המוסכמות)`,
          outcome: "הסוכן עלול להציע פתרון שכבר קיים (למשל embeddings משלו, בעוד lib/atlasdesk/embeddings.ts כבר קיים), או לסתור החלטה קודמת (כמו הבחירה ב-OpenAI ל-embeddings).",
        }}
        good={{
          label: "קריאת תיעוד קודם לפני המשך",
          content: `"תקרא את docs/13-atlasdesk-features.md ואת CLAUDE.md,
תסכם לי מה כבר קיים ב-AtlasDesk, ואז נדבר על היכולת
הבאה"`,
          outcome: "הסוכן מתחיל מהמצב האמיתי של הפרויקט, לא מהתחלה — בדיוק כמו שסשן חדש שלך היה עושה.",
        }}
        takeaway="'לחזור לפרויקט אחרי הפסקה' זה בדיוק אותו אתגר בין אם אתה בן אדם שחוזר בעצמו או Claude Code בסשן חדש — הפתרון זהה: לקרוא את התיעוד שנשאר לפני שממשיכים."
      />
    ),
  },
  {
    id: "engineering",
    label: "לחשוב כמו מהנדס AI",
    content: (
      <EngineeringInsights
        why="ניהול הקשר בין סשנים קיים כי אין 'זיכרון' טבעי בין הרצות נפרדות של Claude Code — כל המשכיות חייבת להיות מתועדת במפורש."
        alternatives="לנסות לזכור הכל בראש (בלי תיעוד) — עובד לפרויקט קטן וקצר-טווח; נשבר לגמרי ככל שהפרויקט גדל וכמות הסשנים גדלה."
        whenNotTo="לפרויקט חד-פעמי שלא ימשיך להתקיים — אין 'סשן הבא' לדאוג לו."
        commonMistakes="לבנות תיעוד מפורט פעם אחת ולעולם לא לעדכן אותו — תיעוד שלא מתעדכן הופך למטעה יותר משאין תיעוד בכלל (מודול 1 כבר לימד את זה על CLAUDE.md)."
        cost="תחזוקת תיעוד עולה זמן שוטף קטן — חוסכת שעות של 'לגלות מחדש' הקשר בכל סשן חדש."
        realWorld="בדיוק ככה האקדמיה הזו עצמה נבנתה — עשרות מודולים, כל אחד בסשן נפרד, עם תיעוד רציף שאפשר את ההמשכיות."
      />
    ),
  },
  { id: "quiz", label: "בוחן ידע", content: <QuizEngine questions={QUIZ} /> },
  {
    id: "real-world-task",
    label: "משימה מעשית",
    content: (
      <RealWorldTask
        id="engineering-discipline-session-context-preservation"
        title="חזור לפרויקט AtlasDesk אחרי 'הפסקה' מדומה"
        context="עבוד מול הריפו האמיתי של AtlasDesk."
        steps={[
          "פתח סשן Claude Code חדש (בלי הקשר משיחות קודמות).",
          "בקש ממנו לקרוא את docs/13-atlasdesk-features.md ואת CLAUDE.md, ולסכם את מצב הפרויקט הנוכחי.",
          "בדוק: האם הסיכום מדויק? האם משהו חסר בתיעוד שהיה עוזר?",
          "אם מצאת פער, עדכן את התיעוד עכשיו.",
        ]}
        successCriteria={[
          "יש לך סיכום מדויק ממקור התיעוד, לא מניחוש",
          "אם מצאת פער, תיקנת אותו במקום להשאיר אותו",
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
          חשוב על פרויקט שלך שלא נגעת בו כמה שבועות. נסה לתאר: אילו 3 מסמכים/הודעות היו עוזרים
          לך הכי הרבה לחזור אליו מהר? אם הם לא קיימים — זה הזמן ליצור אותם.
        </p>
      </div>
    ),
  },
];

export default function Page() {
  return <LessonShell meta={META} sections={SECTIONS} />;
}
