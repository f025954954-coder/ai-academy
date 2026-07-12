"use client";

import { LessonShell, type LessonMeta, type LessonSection } from "@/components/lesson/lesson-shell";
import { SlideDeck, type Slide } from "@/components/slides/slide-deck";
import { PromptComparisonLab } from "@/components/comparisons/prompt-comparison-lab";
import { EngineeringInsights } from "@/components/lesson/engineering-insights";
import { QuizEngine, type QuizQuestion } from "@/components/quiz/quiz-engine";
import { RealWorldTask } from "@/components/exercises/real-world-task";

const META: LessonMeta = {
  trackSlug: "ai-agents",
  moduleSlug: "automation-scraping",
  lessonSlug: "webhook-driven-automation",
  title: "אוטומציה מונעת-Webhooks",
  objectives: [
    "להבין webhooks כאירועים שמפעילים תגובה אוטומטית",
    "להכיר את עקרון ה-idempotency — טיפול בטוח באירועים כפולים",
    "לתכנן אבטחת webhook (אימות מקור, לא לסמוך על תוכן בלבד)",
  ],
  estMinutes: 25,
  difficulty: "בינוני",
  prerequisites: ["responsible-scraping-principles"],
};

const SLIDES: Slide[] = [
  {
    title: "מה זה webhook",
    bullets: [
      "webhook הוא בקשת HTTP שמערכת חיצונית שולחת אליך אוטומטית כשמשהו קורה אצלה ('פנייה חדשה נוצרה', 'תשלום בוצע'). זה ההפך מ-polling (לשאול שוב ושוב 'יש חדש?') — המערכת החיצונית 'דוחפת' אליך את המידע ברגע שהוא קורה.",
    ],
  },
  {
    title: "Idempotency — הגנה מפני אירועים כפולים",
    bullets: [
      "מערכות webhook לפעמים שולחות את אותו אירוע פעמיים (בעיית רשת, retry אוטומטי). קוד idempotent מטפל בזה נכון — עיבוד כפול לא גורם לתוצאה כפולה (למשל: לא שולח שתי תשובות אוטומטיות לאותה פנייה).",
      "פתרון נפוץ: לשמור event ID שכבר טופל, ולבדוק לפני עיבוד אם הוא כבר קיים.",
    ],
  },
  {
    title: "אבטחת webhook",
    bullets: [
      "לעולם לא לסמוך על תוכן הבקשה בלבד — כל אחד יכול לשלוח POST ל-endpoint הפומבי שלך ולהתחזות ל'אירוע אמיתי'.",
      "אימות מקור נפוץ: חתימה קריפטוגרפית (HMAC signature) שהשולח מצרף, ושאתה מאמת לפני עיבוד.",
    ],
  },
];

const QUIZ: QuizQuestion[] = [
  {
    id: "q1",
    question: "למה חשוב לטפל ב-idempotency בעיבוד webhooks?",
    options: [
      "זה לא באמת חשוב, webhooks תמיד מגיעים בדיוק פעם אחת",
      "כי מערכות webhook עלולות לשלוח את אותו אירוע פעמיים (retry ברשת) — בלי idempotency, זה עלול לגרום לפעולה כפולה (כמו שתי תשובות אוטומטיות)",
      "כי HTTP דורש את זה מבחינה טכנית",
      "רק כדי לחסוך רוחב פס"
    ],
    correctIndex: 1,
    explanation: "webhooks יכולים להישלח יותר מפעם אחת עקב retry logic של השולח — idempotency מוודאת שזה לא גורם לתוצאה כפולה בפועל.",
    optionNotes: [
      "לא נכון: אירועים כפולים הם תרחיש נפוץ ולגיטימי (retry ברשת) — לא נדיר.",
      "התשובה הנכונה: זה בדיוק התרחיש שidempotency מגן מפניו — עיבוד בטוח גם כשאירוע מגיע יותר מפעם אחת.",
      "לא נכון: HTTP עצמו לא דורש idempotency בעיבוד — זו בחירת עיצוב של הקוד שלך.",
      "לא נכון: idempotency קשור לנכונות התוצאה, לא לחיסכון ברוחב פס.",
    ],
  },
  {
    id: "q2",
    question: "למה מסוכן לסמוך רק על תוכן הבקשה כדי לאמת שwebhook הגיע ממקור אמיתי?",
    options: [
      "אין סיכון, endpoint webhook הוא תמיד פרטי",
      "כי endpoint webhook הוא לרוב כתובת פומבית — כל אחד יכול לשלוח POST מזויף שנראה כמו אירוע אמיתי, בלי אימות (כמו חתימה קריפטוגרפית) אין דרך להבחין",
      "כי Vercel חוסם אוטומטית בקשות מזויפות",
      "זה בעיה רק אם ה-endpoint משתמש ב-HTTPS"
    ],
    correctIndex: 1,
    explanation: "כל endpoint webhook פומבי חשוף לבקשות מזויפות — רק אימות קריפטוגרפי (כמו חתימת HMAC) מבטיח שהבקשה אכן מגיעה מהמקור הצפוי.",
    optionNotes: [
      "לא נכון: endpoint webhook הוא לרוב כתובת ציבורית — לא פרטי.",
      "התשובה הנכונה: בלי אימות, אין דרך להבחין בין אירוע אמיתי לבקשה מזויפת שמישהו שלח בכוונה.",
      "לא נכון: Vercel (או כל פלטפורמת אירוח) לא חוסמת אוטומטית בקשות שנראות תקינות מבחינה טכנית — האימות הוא באחריות הקוד שלך.",
      "לא נכון: HTTPS מצפין את התעבורה אבל לא מוודא מי השולח — עדיין צריך אימות תוכן נפרד.",
    ],
  },
];

const SECTIONS: LessonSection[] = [
  { id: "slides", label: "מצגת: webhooks כאוטומציה מונעת-אירועים", content: <SlideDeck slides={SLIDES} /> },
  {
    id: "comparison",
    label: "השוואה: טיפול webhook נאיבי מול בטוח",
    content: (
      <PromptComparisonLab
        title="קבלת webhook 'פנייה חדשה נוצרה'"
        unitLabel="גישה"
        bad={{
          label: "טיפול נאיבי",
          content: `app.post('/webhook', (req) => {
  sendAutoResponse(req.body.ticketId) // בלי אימות מקור,
})                                    // בלי בדיקת כפילות`,
          outcome: "כל אחד יכול לשלוח בקשות מזויפות שיגרמו לתשובות אוטומטיות שגויות. גם אם הספק שולח את אותו אירוע פעמיים, נשלחות שתי תשובות זהות ללקוח.",
        }}
        good={{
          label: "אימות + idempotency",
          content: `app.post('/webhook', (req) => {
  verifySignature(req) // אימות מקור
  if (alreadyProcessed(req.body.eventId)) return // idempotency
  sendAutoResponse(req.body.ticketId)
  markProcessed(req.body.eventId)
})`,
          outcome: "רק אירועים אמיתיים ומאומתים מעובדים, וכל אירוע מטופל בדיוק פעם אחת גם אם הוא מגיע כמה פעמים.",
        }}
        takeaway="שני הגנות בסיסיות (אימות מקור + idempotency) הופכות webhook endpoint מ'פרצה פוטנציאלית' למנגנון אוטומציה אמין."
      />
    ),
  },
  {
    id: "engineering",
    label: "לחשוב כמו מהנדס AI",
    content: (
      <EngineeringInsights
        why="webhooks קיימים כי הם יעילים בהרבה מ-polling — במקום לשאול 'יש חדש?' כל דקה, המערכת החיצונית מודיעה לך ברגע שיש משהו."
        alternatives="Polling (לשאול שוב ושוב) — פשוט יותר למימוש, אבל מבזבז משאבים ומוסיף עיכוב (delay) בין קרות האירוע לזיהוי שלו."
        whenNotTo="אם המערכת החיצונית לא תומכת ב-webhooks בכלל — אז polling הוא האפשרות היחידה."
        commonMistakes="לבנות endpoint webhook בלי שום אימות מקור — פרצת אבטחה נפוצה ומסוכנת."
        cost="webhooks חוסכים משאבים לעומת polling — אבל דורשים תשתית קבלה (endpoint שרץ תמיד) ולוגיקת אבטחה/idempotency."
        realWorld="בפרויקט המודול הבא תממש בדיוק endpoint כזה ל-AtlasDesk — קבלת אירוע 'פנייה חדשה' וייצור תשובה אוטומטית מה-RAG הקיים."
      />
    ),
  },
  { id: "quiz", label: "בוחן ידע", content: <QuizEngine questions={QUIZ} /> },
  {
    id: "real-world-task",
    label: "משימה מעשית",
    content: (
      <RealWorldTask
        id="automation-webhook-driven-automation"
        title="תכנן endpoint webhook מאובטח ואידמפוטנטי"
        context="עבוד עם Claude Code — תכנון, המימוש בפרויקט הבא."
        steps={[
          "בקש מ-Claude Code להציע מבנה payload ל-webhook 'פנייה חדשה נוצרה' (מה השדות הנחוצים: eventId, ticketId, content).",
          "דון: איך היית מאמת שהבקשה מגיעה ממקור אמיתי (בלי לממש בפועל עדיין)?",
          "דון: איפה היית שומר event IDs שכבר טופלו כדי למנוע כפילות?",
        ]}
        successCriteria={[
          "יש לך מבנה payload ברור",
          "יש לך תוכנית לאימות מקור ול-idempotency, לא רק רעיון כללי",
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
          חפש שירות שאתה מכיר שמשתמש ב-webhooks (Stripe, GitHub, Slack) וקרא בקצרה איך הוא
          מממש אימות חתימה. השווה לתוכנית שהצעת בעצמך.
        </p>
      </div>
    ),
  },
];

export default function Page() {
  return <LessonShell meta={META} sections={SECTIONS} />;
}
