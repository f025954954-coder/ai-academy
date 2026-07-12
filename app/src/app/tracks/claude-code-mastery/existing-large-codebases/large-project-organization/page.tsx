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
  lessonSlug: "large-project-organization",
  title: "ארגון פרויקטים גדולים",
  objectives: [
    "להבין מוסכמות שמסייעות ל-AI (ולבני אדם) לנווט בפרויקט גדול",
    "לזהות מתי מבנה תיקיות 'התפוצץ' ודורש ריענון",
    "להכיר את העיקרון: מודולריות טובה = כל שינוי נוגע במעט קבצים",
  ],
  estMinutes: 25,
  difficulty: "בינוני",
  prerequisites: ["incremental-safe-changes"],
};

const SLIDES: Slide[] = [
  {
    title: "AtlasDesk עצמו כדוגמה חיה",
    bullets: [
      "שים לב איך AtlasDesk מאורגן: lib/atlasdesk/ מכיל את כל הלוגיקה הייעודית למוצר (config, tools, embeddings, help-articles), ו-app/api/ai/ מכיל את נתיבי ה-API. זו הפרדה מודעת: 'לוגיקת עסק' מול 'שכבת HTTP'.",
      "כשהוספת כלים/RAG/סוכן, כל תכונה חדשה קיבלה קובץ משלה תחת lib/atlasdesk/ — לא הכל נדחס ל-support-chat.tsx.",
    ],
  },
  {
    title: "מתי מבנה 'מתפוצץ'",
    bullets: [
      "סימן אזהרה: תיקייה אחת עם 30+ קבצים לא-קשורים, או קובץ אחד שגדל ל-500+ שורות ועושה כמה דברים שונים.",
      "הפתרון הוא בדרך כלל לא 'לכתוב פחות קוד' — הוא לפצל לפי אחריות: כל קובץ/תיקייה עושה דבר אחד ברור.",
    ],
  },
];

const QUIZ: QuizQuestion[] = [
  {
    id: "q1",
    question: "מה העיקרון מאחורי ההפרדה בין lib/atlasdesk/ ל-app/api/ai/ ב-AtlasDesk?",
    options: [
      "אין עיקרון אמיתי, זה סידור אקראי",
      "הפרדה בין לוגיקת עסק (מה AtlasDesk עושה) לשכבת HTTP (איך זה נחשף כ-API) — כל שינוי בלוגיקה לא בהכרח נוגע בנתיבי ה-API וההיפך",
      "Next.js דורש את המבנה הזה טכנית",
      "זה רק כדי שהתיקיות ייראו מסודרות",
    ],
    correctIndex: 1,
    explanation: "הפרדת אחריות ברורה — שינוי בלוגיקת ה-tools (lib/atlasdesk/tools.ts) לא דורש לגעת בנתיב ה-API, וההיפך.",
    optionNotes: [
      "לא נכון: יש עיקרון ברור — הפרדת lib (לוגיקה) מ-app/api (חשיפה) היא בחירה מודעת.",
      "התשובה הנכונה: זו בדיוק ההפרדה — לוגיקה עסקית נפרדת משכבת ה-HTTP שחושפת אותה.",
      "לא נכון: Next.js לא כופה את זה — app/api הוא דרישה למבנה routes, אבל lib/ הוא ארגון חופשי של המפתח.",
      "לא נכון: יש תועלת פונקציונלית אמיתית (הפרדת אחריות), לא רק אסתטיקה.",
    ],
  },
];

const SECTIONS: LessonSection[] = [
  { id: "slides", label: "מצגת: ארגון AtlasDesk כדוגמה", content: <SlideDeck slides={SLIDES} /> },
  {
    id: "comparison",
    label: "השוואה: הכל בקובץ אחד מול מודולריות",
    content: (
      <PromptComparisonLab
        title="הוספת יכולת RAG ל-AtlasDesk"
        unitLabel="ארגון קוד"
        bad={{
          label: "הכל בתוך support-chat.tsx",
          content: `כל לוגיקת ה-embeddings, החיפוש הסמנטי, ובניית
ה-context — נכתבת ישירות בתוך הקומפוננטה
support-chat.tsx (שכבר מטפלת ב-UI ובמצבי הצ'אט)`,
          outcome: "הקובץ מתנפח למאות שורות שעושות כמה דברים לא-קשורים (UI, לוגיקת רשת, embeddings) — קשה לבדוק, לתחזק, ולהבין מי אחראי על מה.",
        }}
        good={{
          label: "הפרדה לפי אחריות (מה שקרה בפועל)",
          content: `lib/atlasdesk/embeddings.ts — חישוב embeddings בלבד
lib/atlasdesk/help-articles.ts — הנתונים
app/api/ai/rag-chat/route.ts — ה-pipeline המלא
components/atlasdesk/support-chat.tsx — רק UI + מצבים`,
          outcome: "כל קובץ עושה דבר אחד ברור. שינוי בלוגיקת embeddings (למשל שדרוג למודל אחר) נוגע בקובץ אחד, לא ב-UI כולו.",
        }}
        takeaway="זו בדיוק החלוקה שקרתה בפועל באקדמיה כשנבנו MCP/RAG/Agents — כל יכולת חדשה קיבלה קובץ ייעודי תחת lib/atlasdesk/, לא נדחסה לקומפוננטת ה-UI."
      />
    ),
  },
  {
    id: "engineering",
    label: "לחשוב כמו מהנדס AI",
    content: (
      <EngineeringInsights
        why="מודולריות טובה קיימת כי היא מגבילה את 'רדיוס ההשפעה' של כל שינוי — קובץ שעושה דבר אחד ברור קל יותר לבדוק, לבקר, ולתחזק מקובץ שעושה הכל."
        alternatives="קובץ אחד גדול ('God file') מהיר יותר לכתוב בהתחלה — אבל מאט משמעותית ככל שהפרויקט גדל, כי כל שינוי דורש להבין את כל הקובץ."
        whenNotTo="לפרויקט קטן וזמני — פיצול מוקדם מדי לקבצים רבים יכול להיות over-engineering לפני שיש בכלל צורך אמיתי בהפרדה."
        commonMistakes="לפצל לפי 'סוג טכני' (כל ה-helpers בקובץ helpers.ts) במקום לפי 'תחום עסקי' (כל מה שקשור ל-embeddings ביחד) — הפרדה לפי תחום קלה יותר לניווט."
        cost="פיצול נכון לא עולה יותר בזמן ריצה — היתרון כולו בתחזוקתיות: מציאת קוד, הבנתו, ותיקונו מהר יותר."
        realWorld="ב-AtlasDesk, כל מודול AI חדש (MCP, embeddings, RAG, agent) קיבל בדיוק את אותה תבנית ארגון — עקביות שמקלה על ניווט בפרויקט שממשיך לגדול."
      />
    ),
  },
  { id: "quiz", label: "בוחן ידע", content: <QuizEngine questions={QUIZ} /> },
  {
    id: "real-world-task",
    label: "משימה מעשית",
    content: (
      <RealWorldTask
        id="existing-code-large-project-organization"
        title="נתח את מבנה lib/atlasdesk/ ותציע שיפור"
        context="עבוד מול הריפו האמיתי של AtlasDesk."
        steps={[
          "עם Claude Code, מפה את כל הקבצים תחת lib/atlasdesk/ ותאר את האחריות של כל אחד במשפט אחד.",
          "שאל: האם יש קובץ שמתחיל 'להתנפח' ועושה יותר מדי דברים?",
          "אם כן, בקש הצעת פיצול (רק הצעה — לא חובה לממש עכשיו).",
        ]}
        successCriteria={[
          "יש לך מפה ברורה של כל קובץ ותפקידו",
          "בדקת בפועל אם יש מועמד לפיצול, לא רק ניחוש כללי",
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
          עבור על פרויקט אישי שלך וחפש קובץ אחד גדול/מבולגן. נסה לתאר בכתב איך היית מפצל אותו
          לפי תחום אחריות (לא לפי סוג טכני) — לא חייב לממש, רק לתכנן.
        </p>
      </div>
    ),
  },
];

export default function Page() {
  return <LessonShell meta={META} sections={SECTIONS} />;
}
