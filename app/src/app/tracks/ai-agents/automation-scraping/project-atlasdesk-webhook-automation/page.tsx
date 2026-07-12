"use client";

import { LessonShell, type LessonMeta, type LessonSection } from "@/components/lesson/lesson-shell";
import { SlideDeck, type Slide } from "@/components/slides/slide-deck";
import { EngineeringInsights } from "@/components/lesson/engineering-insights";
import { QuizEngine, type QuizQuestion } from "@/components/quiz/quiz-engine";
import { RealWorldTask } from "@/components/exercises/real-world-task";

const META: LessonMeta = {
  trackSlug: "ai-agents",
  moduleSlug: "automation-scraping",
  lessonSlug: "project-atlasdesk-webhook-automation",
  title: "פרויקט מודול: AtlasDesk מקבל אוטומציה מונעת-webhook",
  objectives: [
    "לממש endpoint webhook שמקבל אירוע חיצוני (פנייה חדשה) ומייצר טיוטת תשובה אוטומטית",
    "לשלב את ה-RAG הקיים בתהליך האוטומציה — לא רק בצ'אט האינטראקטיבי",
    "לתכנן idempotency ואבטחה בסיסית ל-endpoint",
  ],
  estMinutes: 40,
  difficulty: "מתקדם",
  prerequisites: ["webhook-driven-automation"],
};

const SLIDES: Slide[] = [
  {
    title: "האוטומציה כבר חיה: /api/webhooks/new-ticket",
    bullets: [
      "endpoint זה מדמה מערכת טיקטים חיצונית ששולחת אירוע 'פנייה חדשה' — AtlasDesk מייצר טיוטת תשובה אוטומטית מה-RAG הקיים, בלי שום צורך שאדם יפתח את הצ'אט.",
      "שתי הגנות production מהשיעור הקודם ממומשות בפועל: אימות חתימה (HMAC, לא סומכים על תוכן הבקשה) ו-idempotency (event ID שכבר טופל לא מעובד שוב).",
      "שים לב: מאגר event IDs שכבר טופלו הוא in-memory (Set) כאן — מספיק להדגמה, אך בפרודקשן אמיתי זה חייב להיות שורה ב-DB (אחרת נעלם ב-restart של השרת).",
    ],
  },
];

const QUIZ: QuizQuestion[] = [
  {
    id: "q1",
    question: "למה מאגר ה-event IDs (processedEventIds) שממומש כ-Set in-memory הוא מספיק להדגמה אך לא לפרודקשן אמיתי?",
    options: [
      "אין הבדל, Set הוא מבנה נתונים תקין תמיד",
      "כי in-memory נעלם כשהשרת מופעל מחדש (restart) או כשיש כמה instances של השרת — פרודקשן דורש שמירה מתמשכת ב-DB",
      "כי JavaScript לא תומך ב-Set",
      "כי Set איטי מדי לבדיקת קיום"
    ],
    correctIndex: 1,
    explanation: "שרתים ב-production מופעלים מחדש (deploy, קריסה) ולעיתים רצים בכמה instances — Set in-memory ספציפי לתהליך אחד ולא שורד את זה; DB הוא הפתרון הנכון.",
    optionNotes: [
      "לא נכון: יש הבדל קריטי — Set in-memory לא שורד restart או ריצה מרובת-instances.",
      "התשובה הנכונה: זו בדיוק המגבלה — persistence הוא הדבר שחסר, ו-DB פותר את זה.",
      "לא נכון: JavaScript תומך ב-Set במלואו — זו לא הבעיה.",
      "לא נכון: מהירות Set אינה הבעיה — הבעיה היא persistence (שמירה לאורך זמן/restarts).",
    ],
  },
];

const SECTIONS: LessonSection[] = [
  { id: "slides", label: "מצגת: הפרויקט המסכם של המודול", content: <SlideDeck slides={SLIDES} /> },
  {
    id: "engineering",
    label: "לחשוב כמו מהנדס AI",
    content: (
      <EngineeringInsights
        why="פרויקט זה קיים כדי לחבר RAG (שכבר בנוי) לתהליך אוטומציה אמיתי — לא רק לצ'אט אינטראקטיבי, אלא לתגובה על אירוע חיצוני בלי מעורבות אנושית."
        alternatives="אפשר היה לבנות את זה כ-polling (לבדוק כל דקה אם יש פנייה חדשה) — פחות יעיל, יותר delay, בדיוק מה שהשיעור הקודם הסביר."
        whenNotTo="—"
        commonMistakes="לשכוח שה-endpoint הזה פומבי ונגיש לכל אחד — בלי אימות החתימה (HMAC), כל אחד יכול להזין 'פניות מזויפות'."
        cost="כל אירוע webhook עולה קריאת embedding + קריאת Claude (בדיוק כמו RAG רגיל) — אבל חוסך זמן נציג אנושי שהיה צריך לכתוב טיוטה ידנית לכל פנייה."
        realWorld="זו בדיוק הארכיטקטורה שמערכות תמיכה אמיתיות (Zendesk, Intercom) מציעות: תגובה ראשונית אוטומטית שנציג בודק ומאשר לפני שליחה, לא תשובה סופית ללא פיקוח."
      />
    ),
  },
  {
    id: "real-world-task",
    label: "המשימה המרכזית של המודול",
    content: (
      <RealWorldTask
        id="automation-project-atlasdesk-webhook-automation"
        title="בדוק והרחב את ה-webhook endpoint של AtlasDesk"
        context="עבוד מול הריפו האמיתי של AtlasDesk. ה-endpoint כבר קיים ב-app/api/webhooks/new-ticket/route.ts."
        steps={[
          "עם Claude Code, קרא את כל הקובץ והבן את זרימת האימות + הidempotency + ה-RAG.",
          "כתוב סקריפט קטן (או השתמש ב-curl) ששולח בקשת webhook עם חתימת HMAC תקינה (תצטרך ATLASDESK_WEBHOOK_SECRET מקומי) — בדוק שהוא עובד.",
          "שלח את אותו eventId פעמיים — ודא שהפעם השנייה מזוהה כ-'already_processed'.",
          "דון עם Claude Code: איך היית משנה את מאגר ה-event IDs מ-in-memory ל-DB אמיתי (Supabase) בפרודקשן?",
        ]}
        successCriteria={[
          "שלחת webhook תקין וקיבלת טיוטת תשובה אמיתית",
          "אימתת בפועל את הגנת ה-idempotency (אירוע כפול לא מעובד שוב)",
          "יש לך תוכנית ברורה למעבר ל-DB persistence, לא רק רעיון כללי",
        ]}
      />
    ),
  },
  { id: "quiz", label: "בוחן ידע", content: <QuizEngine questions={QUIZ} /> },
  {
    id: "homework",
    label: "סיכום מודול",
    content: (
      <div className="rounded-xl bg-primary/5 p-4 text-sm">
        <p className="font-semibold">סיימת את מודול האוטומציה ו-Web Scraping — וכל טראק AI Agents!</p>
        <p className="mt-1 text-muted">
          AtlasDesk עכשיו: סוכן אוטונומי, מערכת רב-סוכנית עם אסקלציה, ואוטומציה מונעת-webhook.
          במודול הבא (Production AI) נעבור לניטור, אבטחה, ו-best practices ברמת production אמיתית.
        </p>
      </div>
    ),
  },
];

export default function Page() {
  return <LessonShell meta={META} sections={SECTIONS} />;
}
