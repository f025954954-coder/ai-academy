"use client";

import * as React from "react";
import { createDefaultFS, runCommand, type ShellState } from "@/lib/simulators/virtual-fs";

interface HistoryLine {
  prompt: string;
  output: string;
  isError?: boolean;
}

export function TerminalSimulator({ height = 320 }: { height?: number }) {
  const stateRef = React.useRef<ShellState>({ root: createDefaultFS(), cwd: ["home", "student"] });
  const [cwd, setCwd] = React.useState(["home", "student"]);
  const [history, setHistory] = React.useState<HistoryLine[]>([
    { prompt: "", output: "ברוך הבא לטרמינל של האקדמיה! הקלד 'help' כדי לראות פקודות זמינות." },
  ]);
  const [input, setInput] = React.useState("");
  const bottomRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  function submit() {
    const promptLabel = `student@academy:/${cwd.join("/")}$ ${input}`;
    const result = runCommand(stateRef.current, input);
    if (result.newCwd) {
      stateRef.current.cwd = result.newCwd;
      setCwd(result.newCwd);
    }
    if (result.output === "\x00CLEAR\x00") {
      setHistory([]);
    } else {
      setHistory((h) => [...h, { prompt: promptLabel, output: result.output, isError: result.isError }]);
    }
    setInput("");
  }

  return (
    <div
      className="overflow-hidden rounded-xl border border-border bg-[#0a0e14] font-mono text-sm text-green-400"
      style={{ direction: "ltr" }}
      onClick={() => inputRef.current?.focus()}
    >
      <div className="flex items-center gap-1.5 border-b border-white/10 bg-black/40 px-3 py-2">
        <span className="size-3 rounded-full bg-red-500" />
        <span className="size-3 rounded-full bg-yellow-500" />
        <span className="size-3 rounded-full bg-green-500" />
        <span className="mr-3 text-xs text-gray-400">bash — academy-terminal</span>
      </div>
      <div style={{ height }} className="overflow-y-auto p-3">
        {history.map((line, i) => (
          <div key={i} className="mb-1">
            {line.prompt && <div className="text-blue-400">{line.prompt}</div>}
            <div className={line.isError ? "text-red-400" : "whitespace-pre-wrap text-gray-200"}>
              {line.output}
            </div>
          </div>
        ))}
        <div className="flex items-center gap-2">
          <span className="text-blue-400">student@academy:/{cwd.join("/")}$</span>
          <input
            ref={inputRef}
            autoFocus
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && submit()}
            className="flex-1 bg-transparent text-gray-100 outline-none"
            spellCheck={false}
          />
        </div>
        <div ref={bottomRef} />
      </div>
    </div>
  );
}
