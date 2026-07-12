import Anthropic from "@anthropic-ai/sdk";
import { NextResponse } from "next/server";

// שכבה משותפת לכל נתיבי ה-API שקוראים ל-Claude (/api/ai/chat, tool-chat, rag-chat) —
// מונעת שכפול של יצירת client, חילוץ טקסט, והודעת "לא מחובר" בין שלושת הנתיבים.

export function createAnthropicClient(apiKey: string) {
  return new Anthropic({ apiKey });
}

/** מחלץ את בלוק הטקסט הראשון מתגובת Claude — מדלג על בלוקי tool_use וכו'. */
export function extractTextBlock(content: Anthropic.Messages.ContentBlock[]): string {
  const textBlock = content.find((b) => b.type === "text");
  return textBlock && "text" in textBlock ? textBlock.text : "";
}

/** תגובת graceful-degradation אחידה כשמפתח API חסר — כל נתיב מוסיף שדות ייחודיים לו (toolLog/sources) בעצמו. */
export function missingApiKeyResponse(message: string) {
  return NextResponse.json(
    { content: message, usage: { inputTokens: 0, outputTokens: 0 }, connected: false },
    { status: 200 }
  );
}

/** תגובת שגיאה אחידה לכשל בקריאה בפועל ל-API (לא בעיית מפתח חסר — שגיאה בזמן ריצה). */
export function apiCallErrorResponse(error: unknown, prefix = "שגיאה בקריאה ל-Claude API") {
  return NextResponse.json(
    { content: `${prefix}: ${(error as Error).message}`, usage: null, connected: true },
    { status: 200 }
  );
}
