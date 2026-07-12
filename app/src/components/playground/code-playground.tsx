"use client";

import * as React from "react";
import Editor from "@monaco-editor/react";
import { useTheme } from "next-themes";
import { Play, RotateCcw } from "lucide-react";

interface CodePlaygroundProps {
  initialCode: string;
  language?: "javascript" | "typescript" | "html" | "css";
  height?: number;
  onRun?: (code: string) => void;
}

function buildPreviewHTML(code: string, language: string) {
  if (language === "html") return code;
  return `<!doctype html><html dir="ltr"><head><style>body{font-family:sans-serif;padding:12px;color:#111}</style></head><body>
  <div id="app"></div>
  <script>
    const log = [];
    console.log = (...args) => { log.push(args.map(String).join(' ')); render(); };
    console.error = (...args) => { log.push('❌ ' + args.map(String).join(' ')); render(); };
    function render(){ document.getElementById('app').innerHTML = '<pre>' + log.join('\\n') + '</pre>'; }
    try { ${code} } catch (e) { console.error(e.message); }
  </script>
  </body></html>`;
}

export function CodePlayground({
  initialCode,
  language = "javascript",
  height = 300,
  onRun,
}: CodePlaygroundProps) {
  const { resolvedTheme } = useTheme();
  const [code, setCode] = React.useState(initialCode);
  const [previewSrc, setPreviewSrc] = React.useState("");

  function run() {
    setPreviewSrc(buildPreviewHTML(code, language));
    onRun?.(code);
  }

  function reset() {
    setCode(initialCode);
    setPreviewSrc("");
  }

  return (
    <div className="overflow-hidden rounded-xl border border-border">
      <div className="flex items-center justify-between border-b border-border bg-card px-3 py-2">
        <span className="text-xs font-semibold text-muted">עורך קוד חי</span>
        <div className="flex gap-2">
          <button
            onClick={reset}
            className="flex items-center gap-1 rounded-lg px-2 py-1 text-xs text-muted hover:bg-background"
          >
            <RotateCcw size={12} /> איפוס
          </button>
          <button
            onClick={run}
            className="flex items-center gap-1 rounded-lg bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground"
          >
            <Play size={12} /> הרץ
          </button>
        </div>
      </div>
      <div style={{ direction: "ltr" }}>
        <Editor
          height={height}
          language={language}
          value={code}
          onChange={(v) => setCode(v ?? "")}
          theme={resolvedTheme === "dark" ? "vs-dark" : "light"}
          options={{ fontSize: 14, minimap: { enabled: false }, scrollBeyondLastLine: false }}
        />
      </div>
      {previewSrc && (
        <iframe
          title="preview"
          sandbox="allow-scripts"
          srcDoc={previewSrc}
          className="h-40 w-full border-t border-border bg-white"
        />
      )}
    </div>
  );
}
