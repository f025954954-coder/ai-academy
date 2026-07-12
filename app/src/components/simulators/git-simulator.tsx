"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { GitCommit, GitMerge } from "lucide-react";
import { createInitialGitState, runGitCommand, type GitState } from "@/lib/simulators/git-sim";

interface HistoryLine {
  prompt: string;
  output: string;
  isError?: boolean;
}

const BRANCH_COLORS: Record<string, string> = {
  main: "#7c7cfd",
  feature: "#22d3ee",
  "feature/login": "#22d3ee",
  dev: "#f59e0b",
};

function colorFor(branch: string) {
  return BRANCH_COLORS[branch] ?? "#34d399";
}

export function GitSimulator({ height = 260 }: { height?: number }) {
  const stateRef = React.useRef<GitState>(createInitialGitState());
  const [, forceRender] = React.useReducer((x) => x + 1, 0);
  const [history, setHistory] = React.useState<HistoryLine[]>([
    { prompt: "", output: "סימולטור Git — נסה: git init" },
  ]);
  const [input, setInput] = React.useState("");
  const bottomRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  function submit() {
    const promptLabel = `(${stateRef.current.currentBranch}) $ ${input}`;
    const result = runGitCommand(stateRef.current, input);
    setHistory((h) => [...h, { prompt: promptLabel, output: result.output, isError: result.isError }]);
    setInput("");
    forceRender();
  }

  const branches = Object.entries(stateRef.current.branches).filter(([, head]) => head !== undefined);
  const commits = stateRef.current.commits;

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <div
        className="overflow-hidden rounded-xl border border-border bg-[#0a0e14] font-mono text-sm text-green-400"
        style={{ direction: "ltr" }}
        onClick={(e) => (e.currentTarget.querySelector("input") as HTMLInputElement)?.focus()}
      >
        <div className="flex items-center gap-1.5 border-b border-white/10 bg-black/40 px-3 py-2">
          <span className="size-3 rounded-full bg-red-500" />
          <span className="size-3 rounded-full bg-yellow-500" />
          <span className="size-3 rounded-full bg-green-500" />
          <span className="mr-3 text-xs text-gray-400">git — academy-repo</span>
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
            <span className="text-blue-400">({stateRef.current.currentBranch}) $</span>
            <input
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

      <div className="rounded-xl border border-border bg-card p-4">
        <p className="mb-3 text-xs font-semibold text-muted">עץ הקומיטים שלך (חי)</p>
        {commits.length === 0 ? (
          <p className="text-sm text-muted">עוד אין קומיטים — התחל עם git init ו-git commit.</p>
        ) : (
          <div className="space-y-2" style={{ direction: "ltr" }}>
            {commits.map((c) => (
              <motion.div
                key={c.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-2 rounded-lg bg-background px-3 py-2 text-xs"
              >
                <span
                  className="flex size-6 shrink-0 items-center justify-center rounded-full"
                  style={{ backgroundColor: colorFor(c.branch) + "33", color: colorFor(c.branch) }}
                >
                  {c.parentIds.length > 1 ? <GitMerge size={13} /> : <GitCommit size={13} />}
                </span>
                <span className="font-bold" style={{ color: colorFor(c.branch) }}>
                  {c.branch}
                </span>
                <span className="font-mono text-muted">{c.id}</span>
                <span className="truncate">{c.message}</span>
              </motion.div>
            ))}
          </div>
        )}
        <div className="mt-3 flex flex-wrap gap-2 border-t border-border pt-3">
          {branches.map(([name]) => (
            <span
              key={name}
              className="rounded-full px-2 py-1 text-xs font-semibold"
              style={{ backgroundColor: colorFor(name) + "22", color: colorFor(name) }}
            >
              {name}
              {name === stateRef.current.currentBranch && " (HEAD)"}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
