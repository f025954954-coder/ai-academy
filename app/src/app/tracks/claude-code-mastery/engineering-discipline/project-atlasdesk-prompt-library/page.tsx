"use client";

import { LessonShell, type LessonMeta, type LessonSection } from "@/components/lesson/lesson-shell";
import { SlideDeck, type Slide } from "@/components/slides/slide-deck";
import { EngineeringInsights } from "@/components/lesson/engineering-insights";
import { QuizEngine, type QuizQuestion } from "@/components/quiz/quiz-engine";
import { RealWorldTask } from "@/components/exercises/real-world-task";

const META: LessonMeta = {
  trackSlug: "claude-code-mastery",
  moduleSlug: "engineering-discipline",
  lessonSlug: "project-atlasdesk-prompt-library",
  title: "פרויקט מודול: prompt-library מתועד ל-AtlasDesk",
  objectives: [
    "לבנות prompt-library אמיתי לפרויקט AtlasDesk, מבוסס על כל הפרומפטים שנוצרו לאורך הטראק",
    "לתעד כל תבנית עם הקשר שימוש והדוגמה שהובילה אליה",
    "ליצור CONTRIBUTING.md שמנחה תורם עתידי איך לעבוד עם Claude Code על הפרויקט",
  ],
  estMinutes: 40,
  difficulty: "מתקדם",
  prerequisites: ["reusable-prompt-libraries"],
};

const SLIDES: Slide[] = [
  {
    title: "פרויקט המודול האחרון בטראק: לסגור מעגל",
    bullets: [
      "לאורך כל הטראק (6 מודולים!) כתבת עשרות פרומפטים: onboarding, תכנון-לפני-קוד, architecture-first, TDD, ביקורת קוד, ודיווח באגים. הגיע הזמן לאסוף אותם למסמך אחד.",
      "המשימה: prompt-library אמיתי + CONTRIBUTING.md שיאפשרו למפתח חדש (או לך, בעוד חצי שנה) להצטרף ל-AtlasDesk ולעבוד איתו נכון מהיום הראשון.",
    ],
  },
];

const QUIZ: QuizQuestion[] = [
  {
    id: "q1",
    question: "מה תפקיד CONTRIBUTING.md שמבוסס על prompt-library, לעומת CLAUDE.md?",
    options: [
      "אין הבדל, זה אותו קובץ בשם אחר",
      "CLAUDE.md מיועד להיטען אוטומטית על ידי הסוכן בכל סשן; CONTRIBUTING.md מיועד למפתח אנושי שמצטרף לפרויקט ורוצה להבין איך לעבוד בו עם Claude Code",
      "CONTRIBUTING.md מיועד רק לתיעוד קוד, לא לפרומפטים",
      "CLAUDE.md מיותר ברגע שיש CONTRIBUTING.md",
    ],
    correctIndex: 1,
    explanation: "שני הקבצים משרתים קהלים שונים — CLAUDE.md ל-AI (נטען אוטומטית), CONTRIBUTING.md לבן אדם שרוצה להבין את תהליך העבודה, כולל שימוש בפרומפטים מוכנים.",
    optionNotes: [
      "לא נכון: יש הבדל ברור בקהל היעד ובאופן הטעינה של כל קובץ.",
      "התשובה הנכונה: זו בדיוק ההפרדה — CLAUDE.md ל-AI אוטומטית, CONTRIBUTING.md למפתח אנושי שרוצה הקשר.",
      "לא נכון: CONTRIBUTING.md יכול (וכדאי שיכלול) גם קישור ל-prompt-library — הוא לא מוגבל לתיעוד קוד בלבד.",
      "לא נכון: שני הקבצים ממשיכים לשרת תפקידים משלימים — אחד לא מייתר את השני.",
    ],
  },
];

const SECTIONS: LessonSection[] = [
  { id: "slides", label: "מצגת: הפרויקט המסכם של הטראק", content: <SlideDeck slides={SLIDES} /> },
  {
    id: "engineering",
    label: "לחשוב כמו מהנדס AI",
    content: (
      <EngineeringInsights
        why="פרויקט זה קיים כדי להפוך את כל מה שלמדת ב-6 מודולים למשאב קונקרטי וחוזר — לא רק 'ידע שיש לך בראש' אלא תיעוד שכל מפתח עתידי (כולל אתה) יכול להשתמש בו."
        alternatives="להשאיר את הידע 'בראש' בלי לתעד — עובד כל עוד אתה היחיד שעובד על הפרויקט; נשבר ברגע שמישהו אחר מצטרף, או שאתה עצמך שוכח."
        whenNotTo="—"
        commonMistakes="לבנות prompt-library ולעולם לא לעדכן אותו כשמתגלות תבניות חדשות טובות יותר — הוא צריך להיות מסמך חי, לא חד-פעמי."
        cost="השקעת זמן חד-פעמית (40 דקות) לאיסוף ותיעוד — חוסכת שעות של ניסוח מחדש לכל מפתח עתידי שיעבוד על AtlasDesk."
        realWorld="זו בדיוק העבודה שצוותי הנדסה בוגרים עושים: 'runbooks' ו-'playbooks' מתועדים שמאפשרים לכל חבר צוות לעבוד באותה רמת איכות."
      />
    ),
  },
  {
    id: "real-world-task",
    label: "המשימה המרכזית של המודול",
    content: (
      <RealWorldTask
        id="engineering-discipline-project-atlasdesk-prompt-library"
        title="בנה prompt-library + CONTRIBUTING.md ל-AtlasDesk"
        context="עבוד מול הריפו האמיתי של AtlasDesk — סקור את כל הטראק (6 מודולים) לאיסוף התבניות."
        steps={[
          "עם Claude Code, עברו יחד על כל שיעורי הטראק וזהו 5-8 תבניות פרומפט חוזרות (onboarding, תכנון-לפני-קוד, architecture-first, decomposition, TDD, ביקורת קוד, דיווח באג).",
          "צרו קובץ prompt-library.md עם כל תבנית: שם, מתי להשתמש, הטקסט המדויק, דוגמה מהטראק.",
          "צרו CONTRIBUTING.md קצר שמסביר: איך להתקין Claude Code על הפרויקט (מודול 1), איפה prompt-library.md, ואיזה workflow לצפות ממנו (תכנון לפני קוד, TDD כשרלוונטי).",
          "ודאו ששני הקבצים תואמים למוסכמות התיעוד הקיימות בפרויקט (docs/).",
        ]}
        successCriteria={[
          "יש prompt-library.md אמיתי עם תבניות מהטראק כולו, לא רק דוגמה אחת",
          "יש CONTRIBUTING.md שמפתח חדש (או Claude Code בסשן חדש) יכול לקרוא ולהבין איך לעבוד על הפרויקט",
        ]}
      />
    ),
  },
  { id: "quiz", label: "בוחן ידע", content: <QuizEngine questions={QUIZ} /> },
  {
    id: "homework",
    label: "סיכום הטראק",
    content: (
      <div className="rounded-xl bg-primary/5 p-4 text-sm">
        <p className="font-semibold">סיימת את כל טראק Claude Code Mastery! 🎉</p>
        <p className="mt-1 text-muted">
          עברת 6 מודולים: יסודות, תכנון וארכיטקטורה, תהליכי פיתוח ליבה, עבודה עם קוד קיים,
          ומשמעת הנדסית — ולאורך הדרך AtlasDesk גדל ליכולת production אמיתית: זיכרון, MCP,
          RAG, וסוכן אוטונומי. הכישורים האלו הם בדיוק מה שמבדיל מהנדס AI מתחיל ממהנדס בכיר.
        </p>
      </div>
    ),
  },
];

export default function Page() {
  return <LessonShell meta={META} sections={SECTIONS} />;
}
