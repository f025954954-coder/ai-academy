import { NextRequest, NextResponse } from "next/server";
import { HELP_ARTICLES } from "@/lib/atlasdesk/help-articles";

export const runtime = "nodejs";

/**
 * חיפוש סמנטי אמיתי במאמרי העזרה של AtlasDesk — מודול Embeddings.
 * משתמש ב-OpenAI embeddings API (text-embedding-3-small) — Anthropic אינו מספק embeddings
 * ילידיים, ולכן זהו מקור embeddings אמיתי נפוץ ופשוט לשילוב. דורש OPENAI_API_KEY נפרד
 * מ-ANTHROPIC_API_KEY (אותה פילוסופיית graceful degradation: בלי מפתח, מוחזרת הודעה ברורה
 * ושאר האתר ממשיך לעבוד רגיל).
 */

interface EmbeddingResponse {
  data: { embedding: number[] }[];
}

function cosineSimilarity(a: number[], b: number[]): number {
  let dot = 0, normA = 0, normB = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }
  return dot / (Math.sqrt(normA) * Math.sqrt(normB));
}

async function embed(texts: string[], apiKey: string): Promise<number[][]> {
  const res = await fetch("https://api.openai.com/v1/embeddings", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({ model: "text-embedding-3-small", input: texts }),
  });
  if (!res.ok) throw new Error(`OpenAI embeddings API error: ${res.status}`);
  const data = (await res.json()) as EmbeddingResponse;
  return data.data.map((d) => d.embedding);
}

export async function POST(req: NextRequest) {
  const apiKey = process.env.OPENAI_API_KEY;
  const { query } = (await req.json()) as { query: string };

  if (!apiKey) {
    return NextResponse.json(
      {
        connected: false,
        results: [],
        message:
          "אין עדיין חיבור לחיפוש הסמנטי (חסר OPENAI_API_KEY בסביבת השרת — נפרד מ-ANTHROPIC_API_KEY). הוסף מפתח כדי להפעיל את הדגמה זו במלואה.",
      },
      { status: 200 }
    );
  }

  if (!query?.trim()) {
    return NextResponse.json({ error: "query is required" }, { status: 400 });
  }

  try {
    const articleTexts = HELP_ARTICLES.map((a) => `${a.title}: ${a.content}`);
    const [queryVec, ...articleVecs] = await embed([query, ...articleTexts], apiKey);

    const scored = HELP_ARTICLES.map((article, i) => ({
      ...article,
      similarity: cosineSimilarity(queryVec, articleVecs[i]),
    })).sort((a, b) => b.similarity - a.similarity);

    return NextResponse.json({ connected: true, results: scored });
  } catch (e) {
    return NextResponse.json(
      { connected: true, results: [], message: `שגיאה בחיפוש הסמנטי: ${(e as Error).message}` },
      { status: 200 }
    );
  }
}
