"use client";

import * as React from "react";
import { Search, Sparkles, Loader2 } from "lucide-react";
import { keywordSearch } from "@/lib/atlasdesk/keyword-search";

interface SemanticResult {
  id: string;
  title: string;
  content: string;
  similarity: number;
}

/**
 * מעבדה חיה: חיפוש מילולי מול חיפוש סמנטי אמיתי (embeddings) על אותם מאמרי עזרה של AtlasDesk.
 * מדגים בפועל את הפער שנלמד בשיעור — לא רק בתיאוריה.
 */
export function SemanticSearchLab() {
  const [query, setQuery] = React.useState("איך מבטלים מנוי");
  const [loading, setLoading] = React.useState(false);
  const [semanticResults, setSemanticResults] = React.useState<SemanticResult[] | null>(null);
  const [notConnectedMsg, setNotConnectedMsg] = React.useState<string | null>(null);

  const keywordResults = keywordSearch(query);

  async function runSemanticSearch() {
    setLoading(true);
    setNotConnectedMsg(null);
    try {
      const res = await fetch("/api/ai/semantic-search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });
      const data = await res.json();
      if (!data.connected) {
        setNotConnectedMsg(data.message);
        setSemanticResults(null);
      } else {
        setSemanticResults(data.results);
      }
    } catch {
      setNotConnectedMsg("שגיאת רשת — נסה שוב.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <div className="flex gap-2">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 rounded-lg border border-border bg-background px-3 py-2 text-sm"
          placeholder="נסה: איך מבטלים מנוי"
        />
        <button
          onClick={runSemanticSearch}
          disabled={loading}
          className="flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground disabled:opacity-50"
        >
          {loading ? <Loader2 size={14} className="animate-spin" /> : <Sparkles size={14} />}
          חפש סמנטית
        </button>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <div>
          <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-muted">
            <Search size={13} /> חיפוש מילולי (מיידי, בלי API)
          </p>
          {keywordResults.length === 0 ? (
            <p className="rounded-lg bg-danger/10 p-3 text-xs text-danger">לא נמצאו תוצאות — אין התאמת מילים</p>
          ) : (
            <div className="space-y-2">
              {keywordResults.map((r) => (
                <div key={r.id} className="rounded-lg bg-background p-2 text-xs">
                  <p className="font-semibold">{r.title}</p>
                  <p className="text-muted">{r.matchCount} מילים תואמות</p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-muted">
            <Sparkles size={13} /> חיפוש סמנטי (embeddings אמיתיים)
          </p>
          {notConnectedMsg && <p className="rounded-lg bg-warning/10 p-3 text-xs text-warning">{notConnectedMsg}</p>}
          {!notConnectedMsg && !semanticResults && (
            <p className="text-xs text-muted">לחץ &quot;חפש סמנטית&quot; כדי לראות תוצאות אמיתיות.</p>
          )}
          {semanticResults && (
            <div className="space-y-2">
              {semanticResults.map((r) => (
                <div key={r.id} className="rounded-lg bg-background p-2 text-xs">
                  <p className="font-semibold">{r.title}</p>
                  <p className="text-muted">similarity: {r.similarity.toFixed(3)}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
