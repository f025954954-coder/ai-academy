// כלים (tools) אמיתיים ל-AtlasDesk — שכבת ה-function calling שה-MCP protocol עוטף.
// לצורך האקדמיה: "מסד נתונים" מדומה בזיכרון (לא Supabase) כדי שהדוגמה תרוץ תמיד, גם בלי חיבור DB.

export interface MockTicket {
  id: string;
  subject: string;
  status: "פתוח" | "בטיפול" | "סגור";
  plan: "Starter" | "Team" | "Enterprise";
  lastUpdate: string;
}

const MOCK_TICKETS: Record<string, MockTicket> = {
  "AD-1042": { id: "AD-1042", subject: "בעיית סנכרון לוח שנה", status: "בטיפול", plan: "Team", lastUpdate: "לפני יומיים" },
  "AD-2087": { id: "AD-2087", subject: "בקשה לשדרוג ל-Enterprise", status: "פתוח", plan: "Starter", lastUpdate: "היום" },
  "AD-3311": { id: "AD-3311", subject: "שגיאת התחברות SSO", status: "סגור", plan: "Enterprise", lastUpdate: "לפני שבוע" },
};

/** Anthropic tool schema — זה בדיוק המבנה ש-MCP server היה חושף כ-"tool" גם הוא. */
export const ATLASDESK_TOOLS = [
  {
    name: "check_ticket_status",
    description:
      "בודק את הסטטוס העדכני של פניית תמיכה (ticket) לפי מספר הפנייה. השתמש בכלי הזה כל פעם שהלקוח שואל על סטטוס פנייה קיימת.",
    input_schema: {
      type: "object" as const,
      properties: {
        ticket_id: {
          type: "string",
          description: "מספר הפנייה, לדוגמה AD-1042",
        },
      },
      required: ["ticket_id"],
    },
  },
];

export function executeTool(name: string, input: Record<string, unknown>): string {
  if (name === "check_ticket_status") {
    const ticketId = String(input.ticket_id ?? "").toUpperCase();
    const ticket = MOCK_TICKETS[ticketId];
    if (!ticket) {
      return JSON.stringify({ found: false, message: `לא נמצאה פנייה במספר ${ticketId}` });
    }
    return JSON.stringify({ found: true, ...ticket });
  }
  return JSON.stringify({ error: `כלי לא מוכר: ${name}` });
}

export const DEMO_TICKET_IDS = Object.keys(MOCK_TICKETS);
