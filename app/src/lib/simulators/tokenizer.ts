// טוקנייזר פשוט להדגמה — לא BPE אמיתי (כמו זה שקלוד/GPT משתמשים בו), אלא חלוקה למילים/פיסוק.
// ההסבר בשיעור מבהיר את ההבדל: טוקנייזרים אמיתיים מפצלים גם תת-מילים (subwords).

export interface Token {
  text: string;
  id: number;
}

const TOKEN_COLORS = [
  "#5b5bf6",
  "#22d3ee",
  "#34d399",
  "#f59e0b",
  "#f87171",
  "#818cf8",
  "#fbbf24",
  "#4ade80",
];

export function simpleTokenize(text: string): Token[] {
  const parts = text.match(/[\wא-ת]+|[^\s\wא-ת]/gu) ?? [];
  return parts.map((p, i) => ({ text: p, id: 1000 + (hashCode(p) % 8999) }));
}

function hashCode(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

export function colorForIndex(i: number) {
  return TOKEN_COLORS[i % TOKEN_COLORS.length];
}

// הערכה גסה: מודלים אמיתיים סופרים ~1.3-1.5 טוקנים למילה באנגלית, ויותר בעברית (תווים בודדים לעיתים)
export function estimateRealTokenCount(text: string): number {
  return Math.ceil(text.length / 3.5);
}
