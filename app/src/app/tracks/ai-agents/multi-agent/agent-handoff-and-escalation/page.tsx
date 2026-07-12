"use client";

import { LessonShell, type LessonMeta, type LessonSection } from "@/components/lesson/lesson-shell";
import { SlideDeck, type Slide } from "@/components/slides/slide-deck";
import { PromptComparisonLab } from "@/components/comparisons/prompt-comparison-lab";
import { EngineeringInsights } from "@/components/lesson/engineering-insights";
import { QuizEngine, type QuizQuestion } from "@/components/quiz/quiz-engine";
import { RealWorldTask } from "@/components/exercises/real-world-task";

const META: LessonMeta = {
  trackSlug: "ai-agents",
  moduleSlug: "multi-agent",
  lessonSlug: "agent-handoff-and-escalation",
  title: "העברת שליטה ואסקלציה בין סוכנים",
  objectives: [
    "להבין מתי סוכן כללי צריך 'להעביר' למומחה ייעודי",
    "לתכנן איך context עובר בין סוכנים בהעברה (handoff)",
    "לזהות סימנים שסוכן צריך לבקש אסקלציה במקום להמשיך לנחש",
  ],
  estMinutes: 30,
  difficulty: "מתקדם",
  prerequisites: ["multi-agent-architecture-patterns"],
};

const SLIDES: Slide[] = [
  {
    title: "מ-tool calling ל-agent handoff",
    bullets: [
      "כבר יודע tool calling: מודל 'מבקש' להריץ פונקציה (check_ticket_status). Handoff הוא דומה — אבל במקום להריץ פונקציה, 'מפעילים' סוכן אחר עם system prompt שונה, ומעבירים לו את כל השיחה עד כה כ-context.",
      "זה בדיוק כמו כלי נוסף בארגז הכלים של הסוכן: escalate_to_billing_specialist(reason) — אבל התוצאה שלו היא לא נתון, היא תשובה שלמה מסוכן אחר.",
    ],
  },
  {
    title: "מה חייב לעבור ב-handoff",
    bullets: [
      "כל ההיסטוריה הרלוונטית — הסוכן המומחה לא צריך להתחיל מאפס, אחרת הלקוח יחזור על עצמו.",
      "סיבת ההעברה — 'למה' זה עבר אליו, כדי שהמומחה יידע איך למקד את התשובה.",
      "בלי context מלא, ה-handoff יוצר חוויה גרועה — בדיוק כמו נציג תמיכה אנושי שמעביר שיחה בלי לספר לעמית מה כבר קרה.",
    ],
  },
];

const QUIZ: QuizQuestion[] = [
  {
    id: "q1",
    question: "למה קריטי להעביר את כל ההיסטוריה הרלוונטית בזמן handoff בין סוכנים?",
    options: [
      "זה לא כל כך קריטי, אפשר להתחיל מאפס",
      "בלי context מלא, הסוכן המומחה 'לא יודע' מה כבר נאמר — הלקוח ייאלץ לחזור על עצמו, בדיוק כמו העברת שיחה גרועה בתמיכה אנושית",
      "כי זה חוסך טוקנים",
      "כי Claude API דורש את זה טכנית"
    ],
    correctIndex: 1,
    explanation: "handoff בלי context שלם יוצר בדיוק את חוויית המשתמש הגרועה שכולנו מכירים מהעברת שיחה בתמיכה אנושית — 'תסביר שוב מההתחלה'.",
    optionNotes: [
      "לא נכון: זה קריטי מאוד — התחלה מאפס פוגעת ישירות בחוויית המשתמש.",
      "התשובה הנכונה: זו בדיוק האנלוגיה הנכונה — handoff גרוע גורם ללקוח לחזור על עצמו, כמו בתמיכה אנושית גרועה.",
      "לא נכון: זה בכיוון ההפוך — העברת context מלא עולה יותר טוקנים, לא פחות, אבל משתלם בחוויית משתמש.",
      "לא נכון: זו החלטת עיצוב שלך, לא דרישה טכנית של ה-API.",
    ],
  },
];

const SECTIONS: LessonSection[] = [
  { id: "slides", label: "מצגת: handoff נכון בין סוכנים", content: <SlideDeck slides={SLIDES} /> },
  {
    id: "comparison",
    label: "השוואה: handoff חלקי מול מלא",
    content: (
      <PromptComparisonLab
        title="אסקלציה משאלה טכנית לשאלת חיוב מורכבת"
        unitLabel="גישת handoff"
        bad={{
          label: "handoff חלקי",
          content: `escalate_to_billing_specialist()
→ סוכן החיוב מקבל רק: "לקוח עם שאלת חיוב"`,
          outcome: "הסוכן המומחה לא יודע מה בדיוק הלקוח שאל, ומבקש ממנו לחזור על השאלה — חוויה מתסכלת שמרגישה כמו 'התחלה מחדש'.",
        }}
        good={{
          label: "handoff מלא עם context וסיבה",
          content: `escalate_to_billing_specialist(
  reason: "לקוח בתוכנית Enterprise שואל על זיכוי חלקי
  עבור פרק זמן שבו השירות היה לא זמין",
  full_history: [...כל השיחה עד כה]
)`,
          outcome: "הסוכן המומחה ממשיך בדיוק מאיפה שהשיחה עצרה — עונה על השאלה הספציפית בלי לבקש חזרה על מידע שכבר ניתן.",
        }}
        takeaway="handoff טוב הוא שקוף ללקוח — הוא לא אמור להרגיש שהוא 'מתחיל שיחה חדשה', גם אם מאחורי הקלעים סוכן אחר עכשיו עונה."
      />
    ),
  },
  {
    id: "engineering",
    label: "לחשוב כמו מהנדס AI",
    content: (
      <EngineeringInsights
        why="handoff מלא (context+סיבה) קיים כי המטרה היא חוויית משתמש רציפה — הלקוח לא אמור לדעת (או להרגיש) שסוכן שונה עונה עכשיו."
        alternatives="handoff מינימלי (רק 'זה חיוב') מהיר יותר לממש, אבל פוגע בחוויית המשתמש ומגדיל את הסיכוי שהסוכן המומחה יחזור לשאול שאלות שכבר נענו."
        whenNotTo="אם ההעברה קורית ממש בתחילת השיחה (אין עדיין הרבה context לשמר) — handoff מינימלי מספיק שם."
        commonMistakes="לזהות שצריך אסקלציה מאוחר מדי — אחרי שהסוכן הכללי כבר 'ניסה' וטעה כמה פעמים, במקום לזהות מוקדם שזה מעבר לתחום המומחיות שלו."
        cost="handoff מלא (עם כל ההיסטוריה) עולה יותר טוקנים בקריאה למומחה — אבל חוסך סיבובי הבהרה מיותרים שהיו עולים יותר בסך הכל."
        realWorld="בפרויקט המודול הבא תממש בדיוק את זה: escalate_to_billing_specialist עם context מלא, לא רק דגל בוליאני."
      />
    ),
  },
  { id: "quiz", label: "בוחן ידע", content: <QuizEngine questions={QUIZ} /> },
  {
    id: "real-world-task",
    label: "משימה מעשית",
    content: (
      <RealWorldTask
        id="multi-agent-handoff-and-escalation"
        title="תכנן handoff schema לאסקלציה ב-AtlasDesk"
        context="עבוד עם Claude Code — תכנון, המימוש בפרויקט הבא."
        steps={[
          "בקש מ-Claude Code להציע tool schema ל-escalate_to_billing_specialist — אילו שדות הוא צריך (סיבה, היסטוריה, דחיפות)?",
          "דון: מהם 2-3 סימנים שסוכן כללי צריך לזהות כדי לדעת שהגיע הזמן לאסקלציה, במקום להמשיך לנסות בעצמו?",
        ]}
        successCriteria={[
          "יש לך tool schema מלא לאסקלציה, לא רק דגל בוליאני",
          "יש לך רשימת סימנים קונקרטיים לאסקלציה מוקדמת",
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
          חשוב על חוויית העברת שיחה שהייתה לך עם תמיכה אנושית (טובה או גרועה). מה הפך אותה לטובה
          או גרועה? זה בדיוק מה שצריך לשחזר (או להימנע ממנו) ב-handoff בין סוכני AI.
        </p>
      </div>
    ),
  },
];

export default function Page() {
  return <LessonShell meta={META} sections={SECTIONS} />;
}
