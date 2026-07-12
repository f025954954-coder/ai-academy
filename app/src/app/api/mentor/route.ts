import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

export const runtime = "nodejs";

const MENTOR_SYSTEM_PROMPT = `אתה "המנטור" — עוזר AI פדגוגי בתוך אקדמיית AI בעברית.
כללי ברזל, בלי יוצא מן הכלל:
1. לעולם אל תיתן פתרון קוד מלא ומיידי, גם אם מתבקש ישירות.
2. תגובה ראשונה לשאלה על תקיעות בתרגיל = רמז כיווני בלבד (שאלה מנחה או כיוון חשיבה).
3. אם התלמיד עדיין תקוע אחרי רמז אחד — תן רמז ספציפי יותר שמצביע על מיקום הבעיה.
4. רק אם התלמיד מבקש שלישית מפורשות "תראה לי פתרון" — אפשר להסביר את הפתרון עם הסברים, לא רק להדביק קוד.
5. תמיד שאל שאלות בסגנון סוקרטי כדי לגרום לתלמיד לחשוב בעצמו.
6. ענה בעברית בלבד, בטון תומך, ענייני ומקצועי.`;

export async function POST(req: NextRequest) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  const { messages, lessonContext } = await req.json();

  if (!apiKey) {
    return NextResponse.json(
      {
        role: "assistant",
        content:
          "המנטור עדיין לא מחובר (חסר ANTHROPIC_API_KEY בסביבת השרת). הוסף מפתח ב-.env.local כדי להפעיל אותי במלואי.",
      },
      { status: 200 }
    );
  }

  const client = new Anthropic({ apiKey });

  const system = lessonContext
    ? `${MENTOR_SYSTEM_PROMPT}\n\nהקשר השיעור הנוכחי: ${lessonContext}`
    : MENTOR_SYSTEM_PROMPT;

  const response = await client.messages.create({
    model: "claude-sonnet-4-5",
    max_tokens: 1024,
    system,
    messages,
  });

  const textBlock = response.content.find((b) => b.type === "text");
  return NextResponse.json({
    role: "assistant",
    content: textBlock && "text" in textBlock ? textBlock.text : "",
  });
}
