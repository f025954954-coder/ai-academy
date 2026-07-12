"use client";

import { LessonShell, type LessonMeta, type LessonSection } from "@/components/lesson/lesson-shell";
import { SlideDeck, type Slide } from "@/components/slides/slide-deck";
import { EmbeddingExplorer } from "@/components/diagrams/embedding-explorer";
import { PromptComparisonLab } from "@/components/comparisons/prompt-comparison-lab";
import { EngineeringInsights } from "@/components/lesson/engineering-insights";
import { QuizEngine, type QuizQuestion } from "@/components/quiz/quiz-engine";
import { RealWorldTask } from "@/components/exercises/real-world-task";

const META: LessonMeta = {
  trackSlug: "ai-integration",
  moduleSlug: "embeddings-vector-db",
  lessonSlug: "what-are-embeddings",
  title: "מהם Embeddings",
  objectives: [
    "להבין איך טקסט הופך לוקטור מספרים שמייצג משמעות",
    "להבין את המושג similarity (cosine similarity) ולמה הוא מודד קרבה סמנטית",
    "להתנסות בוויזואלייזר embeddings אינטראקטיבי",
  ],
  estMinutes: 30,
  difficulty: "בינוני",
  prerequisites: ["פרויקט מודול: AtlasDesk מקבל כלי אמיתי"],
};

const SLIDES: Slide[] = [
  {
    title: "הבעיה: איך משווים משמעות של שני משפטים?",
    bullets: [
      "חיפוש מילולי (keyword search) מוצא רק התאמות מדויקות של מילים. חיפוש 'איך מבטלים מנוי' לא ימצא מאמר שכתוב 'הליך סיום התחייבות חודשית' — למרות שהם אותו רעיון.",
      "Embeddings פותרים את זה: הופכים כל טקסט לוקטור (רשימת מספרים) שממקם אותו במרחב רב-ממדי לפי משמעות — טקסטים דומים במשמעות מקבלים וקטורים קרובים במרחב, גם אם המילים שונות לגמרי.",
    ],
  },
  {
    title: "איך זה עובד בפועל",
    bullets: [
      "מודל embedding (למשל text-embedding-3 של OpenAI, או מודלים ייעודיים אחרים) מקבל טקסט ומחזיר וקטור באורך קבוע (למשל 1536 מספרים).",
      "הוקטור הזה 'נלמד' באימון כך שמשפטים בעלי משמעות דומה מקבלים וקטורים קרובים גיאומטרית.",
      "המרחק/הקרבה בין שני וקטורים נמדד לרוב ב-cosine similarity — ציון בין 0 (לא קשור) ל-1 (זהה במשמעות).",
    ],
  },
];

const QUIZ: QuizQuestion[] = [
  {
    id: "q1",
    question: "למה חיפוש מילולי (keyword search) נכשל למצוא 'הליך סיום התחייבות חודשית' כשמחפשים 'איך מבטלים מנוי'?",
    options: [
      "כי חיפוש מילולי תמיד שבור ולא עובד בכלל",
      "כי אין אף מילה זהה בין שתי המחרוזות, למרות שהמשמעות זהה — חיפוש מילולי לא 'מבין' משמעות, רק מתאים מחרוזות",
      "כי המשפטים באורכים שונים",
      "כי חיפוש מילולי עובד רק באנגלית",
    ],
    correctIndex: 1,
    explanation: "חיפוש מילולי מתאים מחרוזות/מילים, לא משמעות — embeddings פותרים בדיוק את זה על ידי ייצוג משמעות כוקטור.",
    optionNotes: [
      "לא נכון: חיפוש מילולי עובד מצוין כשיש התאמת מילים — הבעיה כאן ספציפית: אין שום מילה משותפת בין שני הביטויים.",
      "התשובה הנכונה: זו בדיוק המגבלה של התאמת מחרוזות — היא עיוורת למשמעות, רק בודקת אם אותן מילים מופיעות.",
      "לא נכון: אורך המחרוזת לא רלוונטי לבעיה — גם משפטים קצרים לגמרי יכולים לסבול מאותה בעיה.",
      "לא נכון: הבעיה קיימת בכל שפה — אין קשר לשפה ספציפית.",
    ],
  },
  {
    id: "q2",
    question: "מה מודד cosine similarity בין שני embeddings?",
    options: [
      "את מספר המילים הזהות בין שני הטקסטים",
      "את הקרבה הגיאומטרית בין שני וקטורים במרחב — ציון גבוה יותר = משמעות דומה יותר",
      "את אורך הטקסט המקורי",
      "את מספר הטוקנים שנוצרו מהטקסט",
    ],
    correctIndex: 1,
    explanation: "cosine similarity מודד את הזווית בין שני וקטורים — קרוב ל-1 כשהם 'מצביעים' לאותו כיוון במרחב, כלומר משמעות דומה.",
    optionNotes: [
      "לא נכון: זו הגדרת התאמה מילולית, לא similarity וקטורי — embeddings לא סופרים מילים זהות בכלל.",
      "התשובה הנכונה: cosine similarity הוא מדד גיאומטרי טהור — הוא לא 'יודע' כלום על המילים המקוריות, רק על המיקום היחסי של הוקטורים.",
      "לא נכון: אורך הטקסט המקורי לא נכנס לחישוב ה-similarity בין הוקטורים.",
      "לא נכון: מספר הטוקנים קשור לעלות/tokenization (נלמד במודול הקודם), לא ל-similarity.",
    ],
  },
];

const SECTIONS: LessonSection[] = [
  { id: "slides", label: "מצגת: מטקסט לוקטור משמעות", content: <SlideDeck slides={SLIDES} /> },
  {
    id: "explorer",
    label: "Embedding Explorer — נסה בעצמך",
    content: (
      <div>
        <p className="mb-3 text-sm text-muted">
          לחץ על שתי מילים כדי לראות איך הקרבה במרחב (מדומה כאן לצורך המחשה — ב-embeddings אמיתיים
          יש מאות/אלפי ממדים, לא רק 2) משקפת קרבה סמנטית.
        </p>
        <EmbeddingExplorer />
      </div>
    ),
  },
  {
    id: "comparison",
    label: "השוואה: חיפוש מילולי מול חיפוש סמנטי",
    content: (
      <PromptComparisonLab
        title="שאילתת חיפוש במאמרי עזרה של AtlasDesk"
        unitLabel="שיטת חיפוש"
        bad={{
          label: "חיפוש מילולי (keyword match)",
          content: `שאילתה: "איך מבטלים מנוי"
מאמרי עזרה זמינים: "הליך סיום התחייבות חודשית", "שינוי תוכנית תשלום"`,
          outcome: "אף מאמר לא נמצא — אין התאמת מילים בין 'מבטלים מנוי' ל'סיום התחייבות'. המשתמש מקבל 'לא נמצאו תוצאות' על שאלה שיש לה תשובה מצוינת במאמרים.",
        }}
        good={{
          label: "חיפוש סמנטי (embeddings + similarity)",
          content: `שאילתה: "איך מבטלים מנוי"
→ embedding של השאילתה מושווה ל-embeddings של כל המאמרים
→ "הליך סיום התחייבות חודשית" מקבל similarity גבוה (0.87)`,
          outcome: "המאמר הרלוונטי נמצא למרות שאין מילה משותפת אחת — כי המשמעות דומה, לא הניסוח.",
        }}
        takeaway="חיפוש סמנטי לא 'טוב יותר' תמיד — הוא פותר בעיה ספציפית (משמעות דומה, ניסוח שונה) שחיפוש מילולי לא יכול לפתור מטבעו. לפעמים שילוב של שניהם (hybrid search) הוא הפתרון הטוב ביותר."
      />
    ),
  },
  {
    id: "engineering",
    label: "לחשוב כמו מהנדס AI",
    content: (
      <EngineeringInsights
        why="embeddings קיימים כי מחשבים לא 'מבינים' טקסט גולמי — הם צריכים ייצוג מספרי שניתן להשוות/לחשב עליו. וקטור הוא הדרך שנמצאה הכי יעילה לייצג משמעות בצורה שניתן למדוד קרבה ביניה."
        alternatives="חלופה: thesaurus/מילון מילים נרדפות ידני — עובד לתחום מוגבל וידוע מראש, אבל לא מתמודד עם ניסוחים חדשים/יצירתיים שלא נצפו מראש."
        whenNotTo="לחיפוש שבו דיוק מילולי מדויק חשוב (למשל חיפוש מספר הזמנה או קוד שגיאה ספציפי) — embeddings לא מתאימים, כי הם מוצאים 'דומה', לא 'זהה'."
        commonMistakes="להשתמש ב-embeddings לבד בלי fallback לחיפוש מילולי — לפעמים המשתמש מחפש בדיוק ID/קוד ספציפי, ואז חיפוש סמנטי 'מדויק מדי כלפי משמעות' עלול לפספס.בשילוב (hybrid) עדיף."
        cost="חישוב embedding לכל טקסט הוא קריאת API (עולה טוקנים, אם כי בעלות נמוכה משמעותית מקריאת שיחה מלאה) — וגם צריך לאחסן ולחפש בין הוקטורים (השיעור הבא: מסדי נתונים וקטוריים)."
        realWorld="בפרויקט המודול הבא תבנה בדיוק את זה: embeddings למאמרי העזרה של AtlasDesk, כדי לאפשר חיפוש סמנטי אמיתי."
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
          ["Embedding", "וקטור מספרים שמייצג את המשמעות הסמנטית של טקסט."],
          ["Cosine Similarity", "מדד גיאומטרי לקרבה בין שני וקטורים — 0 עד 1."],
          ["Semantic Search", "חיפוש לפי משמעות (embeddings), בניגוד לחיפוש מילולי."],
          ["Hybrid Search", "שילוב חיפוש מילולי וסמנטי לתוצאות טובות יותר."],
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
        id="embeddings-what-are-embeddings"
        title="חקור embeddings אמיתיים עם Claude Code"
        context="לא צריך API key בשיעור הזה — המשימה היא הבנה והכנה לקראת השיעורים הבאים."
        steps={[
          "שאל את Claude Code: \"אילו מודלי embedding ידועים לך (OpenAI, Cohere, מודלים פתוחים) ומה ההבדלים המרכזיים ביניהם?\"",
          "בקש ממנו לכתוב פונקציית JS/TS קטנה (בלי להריץ בפועל) שמחשבת cosine similarity בין שני מערכים של מספרים.",
          "בדוק את הקוד: האם אתה מבין כל שורה? אם לא, בקש הסבר.",
        ]}
        successCriteria={[
          "אתה מכיר לפחות 2 אפשרויות אמיתיות למודל embedding",
          "יש לך פונקציית cosine similarity שאתה מבין לעומק, לא רק מעתיק",
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
          חשוב על 3 זוגות משפטים: זוג אחד עם משמעות דומה וניסוח שונה לגמרי (embeddings ימצאו),
          זוג אחד עם ID/קוד מדויק שצריך להתאים (embeddings לא מתאימים, keyword כן), וזוג אחד
          שקשה להחליט. זה יעזור לך לפתח אינטואיציה למתי כל שיטת חיפוש מתאימה.
        </p>
      </div>
    ),
  },
];

export default function Page() {
  return <LessonShell meta={META} sections={SECTIONS} />;
}
