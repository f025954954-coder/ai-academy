"use client";

import { AlertTriangle, ShieldAlert, Gauge, Eye } from "lucide-react";
import { LessonShell, type LessonMeta, type LessonSection } from "@/components/lesson/lesson-shell";
import { SlideDeck, type Slide } from "@/components/slides/slide-deck";
import { StepDiagram, type DiagramStep } from "@/components/diagrams/step-diagram";
import { PromptComparisonLab } from "@/components/comparisons/prompt-comparison-lab";
import { EngineeringInsights } from "@/components/lesson/engineering-insights";
import { QuizEngine, type QuizQuestion } from "@/components/quiz/quiz-engine";
import { RealWorldTask } from "@/components/exercises/real-world-task";

const META: LessonMeta = {
  trackSlug: "ai-agents",
  moduleSlug: "single-agent",
  lessonSlug: "production-agent-case-study",
  title: "מקרה בוחן production: כשלים, התאוששות וניטור סוכנים",
  objectives: [
    "להכיר תרחישי כשל אופייניים לסוכנים (לולאה אינסופית, tool שגוי, drift מהמטרה)",
    "להבין אסטרטגיות התאוששות: budget מקסימלי, human-in-the-loop, circuit breakers",
    "להבין מה מנטרים בסוכן production (מספר סיבובים, עלות לריצה, אחוז השלמת משימה)",
  ],
  estMinutes: 35,
  difficulty: "מתקדם",
  prerequisites: ["agent-memory-systems"],
};

const SLIDES: Slide[] = [
  {
    title: "מקרה בוחן: סוכן AtlasDesk שיצא משליטה (תרחיש אמיתי)",
    bullets: [
      "תרחיש: לקוח שואל \"תבדוק את הסטטוס של הפנייה שלי\" בלי לציין מספר פנייה. הסוכן קורא ל-check_ticket_status עם ניחוש (\"AD-0001\"), מקבל 'לא נמצא', מנסה שוב עם ניחוש אחר, שוב 'לא נמצא' — וממשיך ככה עד מגבלת הסיבובים.",
      "זו לא 'תקלה מוזרה' — זה תרחיש כשל *צפוי* וסטנדרטי לכל סוכן שמקבל קלט לא-שלם. מהנדס AI מנוסה מתכנן לזה מראש, לא מגלה את זה בפרודקשן.",
    ],
  },
];

const FAILURE_STEPS: DiagramStep[] = [
  { icon: AlertTriangle, label: "לולאה אינסופית", detail: "הסוכן חוזר על אותה פעולה (או משפחת פעולות דומות) בלי התקדמות אמיתית לעבר המטרה — בדיוק כמו הניחושים החוזרים על מספר פנייה." },
  { icon: ShieldAlert, label: "בחירת כלי שגויה", detail: "הסוכן קורא לכלי לא-מתאים למשימה (למשל מנסה 'למחוק' כשהתבקש 'לבדוק') — תוצאה בלתי צפויה, לפעמים הרסנית אם הכלי הוא write." },
  { icon: Gauge, label: "Goal drift", detail: "לאורך סיבובים רבים, הסוכן 'שוכח' את המטרה המקורית ומתחיל לענות על שאלה שונה מזו שנשאלה — סימן ל-context שהתמלא במידע לא-רלוונטי." },
  { icon: Eye, label: "כישלון שקט (silent failure)", detail: "הסוכן 'מסיים' ומחזיר תשובה, אבל התשובה שגויה/חלקית — הכי מסוכן, כי אין אינדיקציה חיצונית שמשהו השתבש." },
];

const QUIZ: QuizQuestion[] = [
  {
    id: "q1",
    question: 'בתרחיש שבו הסוכן "מנחש" מספרי פנייה שוב ושוב בלי הצלחה, מה אסטרטגיית ההתאוששות הנכונה?',
    options: [
      "לתת לו להמשיך לנחש עד שיצליח, לא משנה כמה זמן זה ייקח",
      "אחרי 1-2 ניסיונות כושלים, לעצור ולבקש מהמשתמש הבהרה מפורשת (human-in-the-loop) במקום להמשיך לנחש",
      "להסיר את הכלי check_ticket_status לגמרי כדי שזה לא יקרה שוב",
      "להגדיל את מגבלת הסיבובים כדי לתת לו יותר הזדמנויות לנחש נכון",
    ],
    correctIndex: 1,
    explanation: "כשסוכן מזהה שהוא 'מנחש' בלי מידע מספיק, האסטרטגיה הנכונה היא לעצור ולהחזיר שליטה לאדם (human-in-the-loop) — לא להמשיך לנסות, ולא רק להגדיל את מספר הניסיונות.",
    optionNotes: [
      "לא נכון: זה בדיוק תרחיש הלולאה האינסופית שהשיעור מזהיר מפניו — 'לתת לו להמשיך' הוא הבחירה הגרועה ביותר.",
      "התשובה הנכונה: human-in-the-loop הוא בדיוק המנגנון הנכון כשהסוכן מזהה חוסר ודאות — לבקש הבהרה, לא לנחש שוב ושוב.",
      "לא נכון: הכלי עצמו תקין — הבעיה היא שהסוכן לא קיבל את הפרמטר הדרוש, לא שהכלי פגום.",
      "לא נכון: הגדלת המגבלה רק דוחה את הבעיה ומייקרת אותה — לא פותרת את שורש הכשל (חוסר מידע).",
    ],
  },
  {
    id: "q2",
    question: 'למה "כישלון שקט" (silent failure) נחשב מסוכן במיוחד יחסית לשאר תרחישי הכשל?',
    options: [
      "הוא לא באמת מסוכן, זה רק עניין סמנטי",
      "כי אין שום אינדיקציה חיצונית (שגיאה, קריסה) שמשהו השתבש — המערכת 'נראית' כאילו עבדה תקין בזמן שהתשובה בפועל שגויה",
      "כי הוא תמיד קורה יותר מכל שאר סוגי הכשל",
      "כי הוא היחיד שקשור לעלות כספית",
    ],
    correctIndex: 1,
    explanation: "בלולאה אינסופית או בחירת כלי שגויה, לפחות רואים שמשהו לא תקין (timeout, שגיאה). בכישלון שקט, המערכת מחזירה תשובה 'תקינה למראה' שפשוט שגויה — קשה מאוד לזהות בלי בדיקה יזומה.",
    optionNotes: [
      "לא נכון: זה סיכון אמיתי וחמור — בדיוק בגלל שאין אינדיקציה חיצונית שמשהו השתבש.",
      "התשובה הנכונה: היעדר סימן חיצוני הוא בדיוק מה שהופך את זה למסוכן — אי אפשר לתקן בעיה שאף אחד לא יודע שקיימת.",
      "לא נכון: תדירות היחסית של סוגי הכשל השונים תלויה במערכת הספציפית — זו לא הסיבה לחומרה שלו.",
      "לא נכון: לולאה אינסופית קשורה יותר ישירות לעלות (סיבובים רבים) — כישלון שקט מסוכן מסיבה אחרת (חוסר גילוי).",
    ],
  },
];

const SECTIONS: LessonSection[] = [
  { id: "slides", label: "מקרה בוחן פתיחה", content: <SlideDeck slides={SLIDES} /> },
  { id: "failures", label: "ארבעה תרחישי כשל אופייניים לסוכנים", content: <StepDiagram steps={FAILURE_STEPS} /> },
  {
    id: "comparison",
    label: "השוואה: הגנה נאיבית מול production-grade",
    content: (
      <PromptComparisonLab
        title="התמודדות עם קלט חסר (אין מספר פנייה)"
        unitLabel="עיצוב הגנה"
        bad={{
          label: "בלי הגנה — הסוכן מנחש",
          content: `system: "יש לך כלי check_ticket_status. השתמש בו כשצריך."
(אין הנחיה מה לעשות כשחסר מידע)`,
          outcome: "כשחסר ticket_id, הסוכן 'ממלא את החלל' בעצמו — מנחש מספרים, מבזבז סיבובים וטוקנים, ולבסוף מחזיר תשובה גרועה או נכשל בשקט.",
        }}
        good={{
          label: "הגנה מפורשת: זיהוי חוסר מידע + עצירה",
          content: `system: "...אם המשתמש לא ציין מספר פנייה (בפורמט
AD-XXXX), אל תנחש — עצור מיד ובקש ממנו את המספר
המדויק. אל תקרא ל-check_ticket_status בלי מספר תקין."`,
          outcome: "הסוכן מזהה בעצמו את חוסר המידע ועוצר לבקש הבהרה — בדיוק human-in-the-loop, לפני שהוא מבזבז סיבובים על ניחושים.",
        }}
        takeaway="הגנה טובה נכתבת מראש בהנחיות המערכת (system prompt), לא מתגלה אחרי שהמשתמש הראשון נתקל בה. חשוב על תרחישי קלט חסר/עמום *לפני* פריסה ל-production, לא אחרי."
      />
    ),
  },
  {
    id: "engineering",
    label: "לחשוב כמו מהנדס AI — ניטור, עלות, אבטחה",
    content: (
      <EngineeringInsights
        why="ניטור סוכנים קיים כי, בניגוד לקוד דטרמיניסטי, סוכן יכול 'להצליח' טכנית (לא קרס, החזיר תשובה) אבל בכל זאת לפעול לא נכון — צריך מדדים ייעודיים כדי לתפוס את זה."
        alternatives="ניטור בסיסי (רק שגיאות/timeouts, כמו שרות web רגיל) תופס רק חלק מהכשלים — לא תופס goal drift או כישלון שקט. ניטור ייעודי לסוכנים (מעקב אחר מספר סיבובים, tool calls שנכשלו, זמן עד השלמה) תופס יותר."
        whenNotTo="לסוכן דמו/לימודי בהיקף קטן (כמו זה שב-AtlasDesk) — ניטור production מלא הוא overkill; מספיק לוג בסיסי ומגבלת סיבובים."
        commonMistakes="למדוד רק 'הצלחה/כישלון בינארי' במקום מדדים עדינים יותר — סוכן שמשלים משימה ב-6 סיבובים כשהיה אמור להשלים ב-2 'הצליח' טכנית, אבל זה עדיין דגל אדום לבדיקה."
        cost="כל סיבוב נוסף = קריאת API נוספת. מדד קריטי ל-production: עלות ממוצעת לריצת סוכן, ופיזור (distribution) — לא רק ממוצע, כי סוכן ש'נתקע' לפעמים יכול לייקר משמעותית את הזנב העליון (p99) של העלות."
        realWorld="בפרויקט המודול הבא, תוסיף בדיוק את ההגנות האלו (זיהוי חוסר מידע, מגבלת סיבובים, לוג מלא) לסוכן האמיתי שתבנה ב-AtlasDesk — לא כתוספת מאוחרת, אלא כחלק מהתכנון הראשוני."
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
          ["Goal drift", "הסוכן 'סוטה' מהמטרה המקורית לאורך סיבובים רבים."],
          ["Silent failure", "הסוכן מסיים בהצלחה טכנית אבל התשובה שגויה/חלקית."],
          ["Human-in-the-loop", "עצירת הסוכן והחזרת שליטה לאדם כשיש אי-ודאות."],
          ["Circuit breaker", "מנגנון שעוצר פעולה אחרי מספר כשלונות רצופים, כדי למנוע נזק מצטבר."],
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
        id="single-agent-production-case-study"
        title="עצב הגנות production לתרחיש הכשל שנלמד"
        context="עבוד עם Claude Code — תכנון בלבד, המימוש יקרה בפרויקט המודול הבא."
        steps={[
          "בקש מ-Claude Code להציע 3 תרחישי קלט-חסר/עמום נוספים (מעבר לדוגמת מספר הפנייה) שרלוונטיים לסוכן AtlasDesk.",
          "לכל תרחיש, נסח משפט הנחיה ל-system prompt שהיה מונע אותו (בסגנון הדוגמה בשיעור).",
          "דון עם הסוכן: אילו 2-3 מדדים (metrics) היית רוצה לראות בדשבורד ניטור לסוכן הזה, ולמה?",
        ]}
        successCriteria={[
          "יש לך 3 תרחישי כשל נוספים עם הנחיית הגנה קונקרטית לכל אחד",
          "יש לך רשימת מדדי ניטור מנומקת, לא רק 'לנטר הכל'",
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
          חשוב על אינטראקציה שהייתה לך עם צ'אטבוט/סוכן AI כלשהו שבה קיבלת תשובה &quot;תקינה
          למראה&quot; אבל שגויה (כישלון שקט). נסה לשחזר: מה קרה שגרם לזה, ואיזו הגנה הייתה
          מונעת את זה?
        </p>
      </div>
    ),
  },
];

export default function Page() {
  return <LessonShell meta={META} sections={SECTIONS} />;
}
