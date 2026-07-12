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
  lessonSlug: "documentation-workflows",
  title: "תהליכי תיעוד תוך כדי עבודה",
  objectives: [
    "לתעד החלטות ארכיטקטוניות תוך כדי הפיתוח, לא בדיעבד",
    "להבין את ההבדל בין תיעוד ל-AI (CLAUDE.md) לתיעוד לבני אדם (README)",
    "לזהות מתי תיעוד מתיישן ודורש עדכון",
  ],
  estMinutes: 25,
  difficulty: "בינוני",
  prerequisites: ["git-workflows-with-claude-code"],
};

const SLIDES: Slide[] = [
  {
    title: "תיעוד 'תוך כדי' מול 'בדיעבד'",
    bullets: [
      "תיעוד שנכתב בדיעבד (אחרי שהכל 'עובד') נוטה להיות שטחי — הכותב כבר שכח את הספקות וההחלטות שהיו בדרך.",
      "תיעוד תוך-כדי-עבודה (כמו docs/13-atlasdesk-features.md שמתעדכן אחרי כל מודול באקדמיה הזו) לוכד את ההחלטות בזמן אמת, כשההקשר עוד טרי.",
    ],
  },
  {
    title: "תיעוד ל-AI מול תיעוד לבני אדם",
    bullets: [
      "CLAUDE.md (מודול 1): פעולתי, תמציתי, נטען בכל סשן — 'מה AI צריך לדעת כדי לעבוד נכון עכשיו'.",
      "README/docs: יכול להיות מפורט יותר, נועד להסביר לבן אדם את התמונה הגדולה — 'למה הפרויקט הזה קיים, מה הארכיטקטורה שלו'.",
      "לערבב בין השניים (CLAUDE.md ארוך מדי, או README שהוא בעצם רשימת TODO) הוא בזבוז — לכל סוג תיעוד יש קהל ומטרה שונים.",
    ],
  },
];

const QUIZ: QuizQuestion[] = [
  {
    id: "q1",
    question: "למה תיעוד שנכתב 'תוך כדי' עבודה נוטה להיות טוב יותר מתיעוד שנכתב בדיעבד?",
    options: [
      "אין הבדל אמיתי באיכות",
      "כשההקשר עדיין טרי, הכותב זוכר את הספקות וההחלטות בדרך — בדיעבד, פרטים חשובים כבר נשכחו",
      "כי תיעוד בדיעבד לוקח יותר זמן לכתוב",
      "כי Claude Code לא יכול לעזור בתיעוד בדיעבד",
    ],
    correctIndex: 1,
    explanation: "תיעוד תוך-כדי לוכד את ה'למה' בזמן אמת — בדיעבד, הרבה מהניואנסים (מה נוסה ולא עבד, מה השיקולים) כבר התאדו מהזיכרון.",
    optionNotes: [
      "לא נכון: יש הבדל איכותי משמעותי — טריות ההקשר משפיעה ישירות על עומק ודיוק התיעוד.",
      "התשובה הנכונה: זו בדיוק הסיבה — הקשר טרי מייצר תיעוד עשיר יותר מזיכרון שכבר התכהה.",
      "לא נכון: זמן הכתיבה לא בהכרח שונה — האיכות היא ההבדל העיקרי, לא משך הזמן.",
      "לא נכון: Claude Code יכול לעזור בשני המקרים — ההבדל הוא באיכות המידע הגולמי שיש לתעד, לא ביכולת הכלי.",
    ],
  },
];

const SECTIONS: LessonSection[] = [
  { id: "slides", label: "מצגת: תיעוד כשההקשר טרי", content: <SlideDeck slides={SLIDES} /> },
  {
    id: "comparison",
    label: "השוואה: תיעוד בדיעבד מול תוך-כדי-עבודה",
    content: (
      <PromptComparisonLab
        title="תיעוד תכונת ה-RAG שנוספה ל-AtlasDesk"
        unitLabel="תזמון תיעוד"
        bad={{
          label: "בדיעבד, חודשים אחר כך",
          content: `"# RAG
הוספנו RAG למערכת. זה עוזר לתשובות להיות
יותר מדויקות."`,
          outcome: "אין זכר לשיקול העיצוב הקריטי (סף similarity 0.3 כדי למנוע הזרקת מסמכים לא-רלוונטיים), ולשיקולי העלות/ביצועים שהובילו להחלטות. המידע פשוט אבד.",
        }}
        good={{
          label: "תוך כדי עבודה (כפי שנעשה בפועל)",
          content: `"רק המאמרים עם similarity סביר נכנסים ל-context —
אם כלום לא רלוונטי מספיק, המודל יקבל את זה ריק ויאלץ
להודות שאין לו מידע (grounding אמיתי, לא רק בתיאוריה)."`,
          outcome: "ההערה הזו (מ-rag-chat/route.ts בפועל) מסבירה בדיוק למה הסף קיים — כל מי שקורא את זה בעתיד מבין את ההחלטה, לא רק את התוצאה שלה.",
        }}
        takeaway="תיעוד ש'נכתב תוך כדי' לא חייב להיות מסמך נפרד — הערת קוד קצרה שנכתבת ברגע ההחלטה (כמו זו שראית ב-rag-chat/route.ts) שווה יותר מפסקת README שנכתבת חודשים אחר כך."
      />
    ),
  },
  {
    id: "engineering",
    label: "לחשוב כמו מהנדס AI",
    content: (
      <EngineeringInsights
        why="תיעוד תוך-כדי-עבודה קיים כי החלטות הנדסיות מתקבלות ברגע ספציפי עם הקשר ספציפי — תיעוד מאוחר מאבד את הדיוק הזה."
        alternatives="לתעד רק בסוף פרויקט/ספרינט (retrospective) — עובד לתמונה כללית, אבל מפספס פרטי החלטה עדינים שכבר נשכחו."
        whenNotTo="לקוד ניסיוני שעדיין משתנה כל הזמן — תיעוד מוקדם מדי עלול להתיישן מיד ולבזבז זמן."
        commonMistakes="לכתוב תיעוד ולשכוח לעדכן אותו כשהקוד משתנה — תיעוד שקרי (שמתאר משהו שכבר לא נכון) גרוע מהיעדר תיעוד."
        cost="תיעוד תוך-כדי עולה כמה דקות נוספות בכל שלב — חוסך שעות של 'ניסיון לזכור למה עשינו ככה' מאוחר יותר."
        realWorld="docs/13-atlasdesk-features.md באקדמיה מתעדכן אחרי כל מודול (לא בסוף הטראק) — בדיוק הדפוס שהשיעור הזה מלמד."
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
          ["תיעוד תוך-כדי-עבודה", "תיעוד שנכתב ברגע קבלת ההחלטה, לא בדיעבד."],
          ["CLAUDE.md", "תיעוד לAI — פעולתי ותמציתי, נטען בכל סשן."],
          ["README/docs", "תיעוד לבני אדם — יכול להיות מפורט יותר, מסביר תמונה גדולה."],
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
    id: "real-world-task",
    label: "משימה מעשית",
    content: (
      <RealWorldTask
        id="engineering-discipline-documentation-workflows"
        title="תעד החלטה הנדסית אמיתית תוך כדי עבודה"
        context="עבוד על שינוי קטן-בינוני בכל פרויקט (או AtlasDesk)."
        steps={[
          "לפני שאתה מבקש מ-Claude Code לממש שינוי, כתוב משפט אחד: איזו החלטה אתה עומד לקבל, ולמה.",
          "בצע את השינוי.",
          "הוסף את המשפט הזה כהערת קוד או שורה בתיעוד — עכשיו, לא מאוחר יותר.",
        ]}
        successCriteria={[
          "יש לך תיעוד אמיתי שנכתב ברגע ההחלטה, לא בדיעבד",
          "אתה מבין את ההבדל בין זה לתיעוד שהיית כותב בעוד שבוע",
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
          עבור על README של פרויקט שלך וחפש קטע שאתה חושד שהתיישן (לא תואם את הקוד הנוכחי).
          עדכן אותו עכשיו, לא &quot;כשיהיה זמן&quot;.
        </p>
      </div>
    ),
  },
];

export default function Page() {
  return <LessonShell meta={META} sections={SECTIONS} />;
}
