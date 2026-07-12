"use client";

import { LessonShell, type LessonMeta, type LessonSection } from "@/components/lesson/lesson-shell";
import { SlideDeck, type Slide } from "@/components/slides/slide-deck";
import { PromptComparisonLab } from "@/components/comparisons/prompt-comparison-lab";
import { EngineeringInsights } from "@/components/lesson/engineering-insights";
import { QuizEngine, type QuizQuestion } from "@/components/quiz/quiz-engine";
import { RealWorldTask } from "@/components/exercises/real-world-task";

const META: LessonMeta = {
  trackSlug: "claude-code-mastery",
  moduleSlug: "foundations-setup",
  lessonSlug: "project-structure-claude-md",
  title: "מבנה פרויקט ו-CLAUDE.md",
  objectives: [
    "להבין מה תפקיד קובץ CLAUDE.md ומה כדאי/לא כדאי לשים בו",
    "לכתוב CLAUDE.md ראשון לפרויקט אמיתי",
    "להבין איך מבנה תיקיות וקונבנציות משפיעים על איכות עבודת ה-AI",
  ],
  estMinutes: 30,
  difficulty: "מתחיל",
  prerequisites: ["installation-configuration"],
};

const SLIDES: Slide[] = [
  {
    title: "למה CLAUDE.md קיים בכלל",
    bullets: [
      "בכל סשן חדש, Claude Code מתחיל 'בלי זיכרון' מהסשן הקודם. CLAUDE.md הוא הדרך לתת לו הקשר קבוע — מבנה הפרויקט, מוסכמות, פקודות חשובות — בלי לחזור ולהסביר כל פעם מחדש.",
      "זה בדיוק כמו onboarding doc למפתח חדש בצוות: מה שהיית רוצה שמפתח חדש ידע ביום הראשון, זה מה ש-CLAUDE.md צריך להכיל.",
    ],
  },
  {
    title: "מה כן לשים ב-CLAUDE.md",
    bullets: [
      "פקודות מפתח: איך מריצים build, טסטים, dev server (לא כל flag אפשרי — רק מה שבאמת בשימוש יומיומי).",
      "מוסכמות קוד ייחודיות לפרויקט: מבנה תיקיות, דפוסי קומפוננטות, איך לוגיקת עסק מאורגנת.",
      "אילוצים אמיתיים: 'אל תשנה קובץ X ידנית — הוא נוצר אוטומטית', 'תמיד תרוץ typecheck לפני commit'.",
    ],
  },
  {
    title: "מה לא לשים ב-CLAUDE.md",
    bullets: [
      "תיעוד כללי שכבר קיים ב-README — כפילות שמתיישנת (אחד יתעדכן, השני לא).",
      "מידע שמשתנה תדיר (רשימת TODOs נוכחית, סטטוס פיצ'רים) — זה שייך ל-issue tracker, לא לקובץ שנשלח כ-context בכל סשן.",
      "הוראות ארוכות מדי — CLAUDE.md נשלח כחלק מה-context של כל סשן; קובץ תפוח מבזבז טוקנים ומקשה על הסוכן למצוא את מה שבאמת חשוב.",
    ],
  },
];

const QUIZ: QuizQuestion[] = [
  {
    id: "q1",
    question: "מה קורה אם CLAUDE.md ארוך ומפורט מדי (הרבה מעבר לצורך)?",
    options: [
      "שום דבר, יותר מידע תמיד עדיף",
      "הוא נשלח כחלק מה-context של כל סשן — קובץ תפוח מבזבז טוקנים ומקשה על הסוכן לאתר את מה שבאמת חשוב",
      "Claude Code פשוט מתעלם מקבצים ארוכים",
      "זה משפר את הדיוק אוטומטית",
    ],
    correctIndex: 1,
    explanation: "CLAUDE.md הוא context שנטען בכל סשן — איכות עדיפה על כמות; קובץ ממוקד וקצר עדיף על 'מדריך שלם' תפוח.",
    optionNotes: [
      "לא נכון: יותר מידע לא תמיד עדיף — מידע שאינו פעולתי/ספציפי לפרויקט רק 'מרעיש' את ההקשר בלי לתרום דיוק.",
      "התשובה הנכונה: כל שורה ב-CLAUDE.md נספרת כטוקנים בכל סשן שנפתח — קובץ תפוח עולה כסף וזמן, ומקשה על הסוכן למצוא את מה שבאמת רלוונטי בתוך ים של טקסט.",
      "לא נכון: Claude Code קורא את הקובץ במלואו — הוא לא 'מתעלם' מחלקים ארוכים, מה שאומר שכל מילה מיותרת נטענת ועולה בפועל.",
      "לא נכון: אורך הקובץ כשלעצמו לא משפר דיוק — דיוק תלוי ברלוונטיות ובבהירות התוכן, לא בכמות.",
    ],
  },
  {
    id: "q2",
    question: "למה עדיף לא לשכפל תוכן מ-README ל-CLAUDE.md?",
    options: [
      "אסור טכנית",
      "כי כפילות נוטה להתיישן — אחד יתעדכן והשני לא, וייווצר מידע סותר",
      "README לא נטען אף פעם",
      "CLAUDE.md לא תומך בטקסט חופשי",
    ],
    correctIndex: 1,
    explanation: "שני מקורות אמת לאותו מידע הם מתכון לחוסר עקביות — עדיף CLAUDE.md ל'מה AI צריך לדעת' ו-README ל'מה בן אדם צריך לדעת', עם קישור ביניהם אם צריך.",
    optionNotes: [
      "לא נכון: אין מניעה טכנית לשכפל תוכן — הבעיה היא הנדסית/תחזוקתית, לא מגבלת מערכת.",
      "התשובה הנכונה: לשני מקורות אמת לאותו מידע יש נטייה טבעית להתפצל עם הזמן — מישהו מעדכן קובץ אחד ושוכח את השני, וכעבור זמן הם סותרים.",
      "לא נכון: README נטען בהחלט על ידי בני אדם (ולעיתים גם על ידי הסוכן אם מבקשים ממנו לקרוא אותו) — הטענה הזו פשוט לא נכונה עובדתית.",
      "לא נכון: CLAUDE.md הוא קובץ Markdown רגיל שתומך בטקסט חופשי לחלוטין — זו לא הסיבה.",
    ],
  },
];

const SECTIONS: LessonSection[] = [
  { id: "slides", label: "מצגת: תפקיד CLAUDE.md", content: <SlideDeck slides={SLIDES} /> },
  {
    id: "comparison",
    label: "השוואה: CLAUDE.md גרוע מול טוב",
    content: (
      <PromptComparisonLab
        title="שני קבצי CLAUDE.md לאותו פרויקט"
        unitLabel="CLAUDE.md"
        bad={{
          label: "תפוח, כללי, ולא מתעדכן",
          content: `# הפרויקט שלנו

זהו פרויקט מגניב שבנינו. יש בו הרבה קוד.

## TODO
- [ ] לתקן את הבאג ההוא
- [ ] אולי להוסיף פיצ'ר X
- [ ] לבדוק עם דני לגבי העיצוב

## הערות כלליות
תמיד לכתוב קוד נקי ולהשתמש ב-best practices.
נשתמש ב-React כי הוא הכי טוב.`,
          outcome: "אין שום מידע פעולתי אמיתי (איך מריצים בדיקות? מה מבנה התיקיות?), יש TODO-list שמתיישן תוך שבוע, ו'best practices' כלליים שלא אומרים כלום ספציפי לפרויקט הזה.",
        }}
        good={{
          label: "ממוקד ופעולתי",
          content: `# AtlasDesk — CLAUDE.md

## פקודות
- npm run dev — שרת פיתוח (localhost:3000)
- npm run build — build פרודקשן, תמיד להריץ לפני commit
- npx tsc --noEmit — typecheck

## ארכיטקטורה
- Next.js App Router. כל route בעל layout.tsx (metadata) + page.tsx ("use client").
- קריאות ל-Claude דרך /api/ai/chat בלבד — אל תוסיף קריאות API ישירות מרכיבי לקוח.
- חיבור Supabase אופציונלי: הכל חייב לעבוד גם בלי מפתחות מוגדרים (graceful degradation).

## מוסכמות
- Tailwind בלבד לעיצוב, RTL קבוע (dir="rtl" ב-root).
- טוקנים/עלות: תמיד להשתמש ב-lib/simulators/pricing.ts, לא לשכפל טבלת תמחור.`,
          outcome: "כל שורה פעולתית וספציפית לפרויקט הזה. אין מידע שמתיישן מהר. סוכן חדש שקורא את זה יודע בדיוק איך לעבוד נכון תוך שניות.",
        }}
        takeaway="CLAUDE.md טוב נקרא כמו checklist הנדסי קצר, לא כמו מסמך שיווקי. שאלת המבחן: 'האם השורה הזו הייתה עוזרת למפתח חדש ביום הראשון שלו?' אם לא — היא לא שייכת שם."
      />
    ),
  },
  {
    id: "engineering",
    label: "לחשוב כמו מהנדס AI",
    content: (
      <EngineeringInsights
        why="CLAUDE.md נטען בתחילת כל סשן כדי לפתור בעיה אמיתית: סוכן AI לא 'זוכר' פרויקטים בין סשנים, ובלי הקשר קבוע הוא חוזר לשאול/לנחש דברים בסיסיים בכל פעם מחדש."
        alternatives="חלופה: להסביר את ההקשר בעל-פה בתחילת כל סשן. עובד לסשן חד-פעמי, אבל לא מתרחב — בפרויקט שחוזרים אליו עשרות פעמים, ההשקעה החד-פעמית ב-CLAUDE.md משתלמת אחרי סשן שני-שלישי."
        whenNotTo="לסקריפט חד-פעמי בן כמה שורות שלא ימשיך להתקיים — אין טעם ב-CLAUDE.md, ההסבר בפרומפט עצמו מספיק."
        commonMistakes="לכתוב CLAUDE.md פעם אחת בתחילת הפרויקט ולעולם לא לעדכן אותו — אחרי כמה חודשים הוא מתאר ארכיטקטורה שכבר לא קיימת, וגרוע מקובץ שלא קיים בכלל כי הוא מטעה."
        cost="כל שורה ב-CLAUDE.md נספרת כטוקנים בכל סשן. קובץ של 2000 מילים שנטען ב-50 סשנים ביום זה עלות אמיתית ומצטברת — תמציתיות היא גם שיקול כלכלי, לא רק סגנוני."
        realWorld="בשיעור זה תכתוב את ה-CLAUDE.md הראשון עבור AtlasDesk עצמו — ותראה אותו בשימוש בפועל בסשן הבא כשתמשיך לפתח את הפרויקט."
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
          ["CLAUDE.md", "קובץ הנחיות בשורש הפרויקט הנטען אוטומטית בתחילת כל סשן Claude Code."],
          ["Onboarding doc", "אנלוגיה: מה שהיית מסביר למפתח חדש ביום הראשון שלו בצוות."],
          ["Context בזבזני", "מידע ב-CLAUDE.md שאינו פעולתי או שמתיישן מהר — עולה טוקנים בלי לתרום דיוק."],
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
        id="cc-project-structure-claude-md"
        title="כתוב CLAUDE.md אמיתי לפרויקט (או שפר את הקיים ב-AtlasDesk)"
        context="עבוד מול פרויקט AtlasDesk המשובט אצלך, או מול פרויקט אישי אחר אם עדיין אין לך גישה לריפו."
        steps={[
          "בקש מ-Claude Code: \"סקור את מבנה הפרויקט הזה ותציע לי טיוטת CLAUDE.md ראשונית\".",
          "עבור על הטיוטה וצמצם: מחק כל שורה שאינה פעולתית או ספציפית לפרויקט הזה (לפי הכללים שלמדת).",
          "הוסף לפחות סעיף אחד שהסוכן לא הציע בעצמו אך אתה יודע שחשוב (מוסכמה, אילוץ, פקודה).",
          "שמור את הקובץ, פתח סשן Claude Code חדש (טרי), ובדוק: האם הוא 'מתנהג' לפי מה שכתבת, בלי שהזכרת את זה בפרומפט?",
        ]}
        successCriteria={[
          "יש לך CLAUDE.md בפועל, לא רק טיוטה בראש",
          "כל שורה בקובץ עונה 'כן' לשאלה: 'זה היה עוזר למפתח חדש ביום הראשון?'",
          "בדקת בסשן חדש שהסוכן באמת מיישם את מה שכתוב, לא רק שהקובץ 'נראה טוב'",
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
          קח את ה-CLAUDE.md שכתבת והראה אותו לעצמך אחרי שבוע (או קרא אותו שוב מחר בעין ביקורתית).
          שאל: האם השורה הזו התיישנה? האם היא עדיין נכונה? זו בדיוק המשמעת שמפרידה CLAUDE.md
          שנשאר שימושי מ-CLAUDE.md שנשכח.
        </p>
      </div>
    ),
  },
];

export default function Page() {
  return <LessonShell meta={META} sections={SECTIONS} />;
}
