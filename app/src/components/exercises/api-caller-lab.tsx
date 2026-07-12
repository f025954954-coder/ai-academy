"use client";

import * as React from "react";
import Editor from "@monaco-editor/react";
import { useTheme } from "next-themes";
import { Play, Loader2 } from "lucide-react";

const DEFAULT_CODE = `async function callMentor(question) {
  const response = await fetch("/api/mentor", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      messages: [{ role: "user", content: question }],
    }),
  });
  const data = await response.json();
  return data.content;
}`;

export function ApiCallerLab() {
  const { resolvedTheme } = useTheme();
  const [code, setCode] = React.useState(DEFAULT_CODE);
  const [question, setQuestion] = React.useState("מה זה MCP בקצרה?");
  const [output, setOutput] = React.useState<string | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);

  async function run() {
    setLoading(true);
    setError(null);
    setOutput(null);
    try {
      // eslint-disable-next-line @typescript-eslint/no-implied-eval
      const callMentor = new Function(`"use strict"; ${code}\nreturn callMentor;`)() as (
        q: string
      ) => Promise<string>;
      const result = await callMentor(question);
      setOutput(result);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <p className="mb-3 text-sm text-muted">
        זהו קוד אמיתי שקורא ל-API אמיתי של האתר הזה (<code>/api/mentor</code>) — לא סימולציה. ערוך
        אם תרצה, ואז לחץ הרץ.
      </p>
      <div className="overflow-hidden rounded-xl border border-border" style={{ direction: "ltr" }}>
        <Editor
          height={220}
          language="typescript"
          value={code}
          onChange={(v) => setCode(v ?? "")}
          theme={resolvedTheme === "dark" ? "vs-dark" : "light"}
          options={{ fontSize: 14, minimap: { enabled: false } }}
        />
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        <input
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="min-w-0 flex-1 rounded-lg border border-border bg-background px-3 py-2 text-sm"
          placeholder="שאלה למנטור"
        />
        <button
          onClick={run}
          disabled={loading}
          className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground disabled:opacity-60"
        >
          {loading ? <Loader2 size={14} className="animate-spin" /> : <Play size={14} />} הרץ קריאה
          אמיתית
        </button>
      </div>
      {output && (
        <div className="mt-3 rounded-lg bg-success/10 p-3 text-sm text-success">{output}</div>
      )}
      {error && <div className="mt-3 rounded-lg bg-danger/10 p-3 text-sm text-danger">{error}</div>}
    </div>
  );
}
