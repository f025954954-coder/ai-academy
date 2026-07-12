"use client";

import * as React from "react";
import { Send } from "lucide-react";

type Method = "GET" | "POST" | "PUT" | "DELETE";

interface MockRoute {
  method: Method;
  path: string;
  status: number;
  body: object;
  explain: string;
}

const ROUTES: MockRoute[] = [
  {
    method: "GET",
    path: "/api/lessons",
    status: 200,
    body: { lessons: ["מה זה בכלל מחשב", "איך האינטרנט עובד"] },
    explain: "200 OK — הבקשה הצליחה, והשרת מחזיר את המידע המבוקש.",
  },
  {
    method: "GET",
    path: "/api/lessons/999",
    status: 404,
    body: { error: "Lesson not found" },
    explain: "404 Not Found — המשאב המבוקש (שיעור 999) לא קיים בשרת.",
  },
  {
    method: "POST",
    path: "/api/lessons",
    status: 201,
    body: { id: 42, status: "created" },
    explain: "201 Created — בקשת POST הצליחה ביצירת משאב חדש.",
  },
  {
    method: "POST",
    path: "/api/login",
    status: 401,
    body: { error: "Invalid credentials" },
    explain: "401 Unauthorized — חסרים או שגויים פרטי ההזדהות.",
  },
  {
    method: "DELETE",
    path: "/api/lessons/1",
    status: 204,
    body: {},
    explain: "204 No Content — המחיקה הצליחה, ואין תוכן להחזיר.",
  },
];

export function HttpPlayground() {
  const [method, setMethod] = React.useState<Method>("GET");
  const [path, setPath] = React.useState("/api/lessons");
  const [response, setResponse] = React.useState<MockRoute | null>(null);

  function send() {
    const match =
      ROUTES.find((r) => r.method === method && r.path === path) ??
      ({
        method,
        path,
        status: 404,
        body: { error: `No mock route for ${method} ${path}` },
        explain: "404 Not Found — נסה אחד מהנתיבים המוצעים למטה.",
      } as MockRoute);
    setResponse(match);
  }

  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <div className="flex flex-wrap gap-2" style={{ direction: "ltr" }}>
        <select
          value={method}
          onChange={(e) => setMethod(e.target.value as Method)}
          className="rounded-lg border border-border bg-background px-3 py-2 text-sm font-bold"
        >
          <option>GET</option>
          <option>POST</option>
          <option>PUT</option>
          <option>DELETE</option>
        </select>
        <input
          value={path}
          onChange={(e) => setPath(e.target.value)}
          className="min-w-0 flex-1 rounded-lg border border-border bg-background px-3 py-2 font-mono text-sm"
        />
        <button
          onClick={send}
          className="flex items-center gap-1 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
        >
          <Send size={14} /> שלח
        </button>
      </div>

      <p className="mt-3 text-xs text-muted">
        נסה, למשל: GET /api/lessons · GET /api/lessons/999 · POST /api/lessons · POST /api/login ·
        DELETE /api/lessons/1
      </p>

      {response && (
        <div className="mt-4 rounded-xl bg-background p-4" style={{ direction: "ltr" }}>
          <div className="mb-2 flex items-center gap-2 font-mono text-sm">
            <span
              className={`rounded px-2 py-0.5 font-bold ${
                response.status < 300
                  ? "bg-success/20 text-success"
                  : response.status < 500
                    ? "bg-warning/20 text-warning"
                    : "bg-danger/20 text-danger"
              }`}
            >
              {response.status}
            </span>
            <span className="text-muted">{method} {path}</span>
          </div>
          <pre className="overflow-x-auto text-xs">{JSON.stringify(response.body, null, 2)}</pre>
          <p className="mt-2 text-xs text-muted" style={{ direction: "rtl" }}>
            {response.explain}
          </p>
        </div>
      )}
    </div>
  );
}
