"use client";

import * as React from "react";
import { Play, StepForward, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";

interface CpuState {
  a: number;
  b: number;
  memory: number[];
  pc: number; // program counter
  output: string[];
  halted: boolean;
  error: string | null;
}

const MEMORY_SIZE = 8;

function initialState(): CpuState {
  return { a: 0, b: 0, memory: Array(MEMORY_SIZE).fill(0), pc: 0, output: [], halted: false, error: null };
}

function parseProgram(source: string) {
  return source
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [op, arg] = line.split(/\s+/);
      return { op: op.toUpperCase(), arg: arg !== undefined ? Number(arg) : undefined };
    });
}

function runOneInstruction(
  state: CpuState,
  program: ReturnType<typeof parseProgram>
): CpuState {
  if (state.halted || state.error || state.pc >= program.length) {
    return { ...state, halted: true };
  }
  const instr = program[state.pc];
  const next = { ...state, memory: [...state.memory], output: [...state.output], pc: state.pc + 1 };

  switch (instr.op) {
    case "SETA":
      next.a = instr.arg ?? 0;
      break;
    case "SETB":
      next.b = instr.arg ?? 0;
      break;
    case "ADD":
      next.a = next.a + next.b;
      break;
    case "SUB":
      next.a = next.a - next.b;
      break;
    case "STORE":
      if (instr.arg === undefined || instr.arg < 0 || instr.arg >= MEMORY_SIZE) {
        return { ...next, error: `כתובת זיכרון לא חוקית: ${instr.arg}`, halted: true };
      }
      next.memory[instr.arg] = next.a;
      break;
    case "LOAD":
      if (instr.arg === undefined || instr.arg < 0 || instr.arg >= MEMORY_SIZE) {
        return { ...next, error: `כתובת זיכרון לא חוקית: ${instr.arg}`, halted: true };
      }
      next.a = next.memory[instr.arg];
      break;
    case "PRINT":
      next.output.push(String(next.a));
      break;
    case "HALT":
      next.halted = true;
      break;
    default:
      return { ...next, error: `פקודה לא מוכרת: ${instr.op}`, halted: true };
  }
  return next;
}

export function ToyComputer({ defaultProgram }: { defaultProgram: string }) {
  const [source, setSource] = React.useState(defaultProgram);
  const [state, setState] = React.useState<CpuState>(initialState());

  const program = React.useMemo(() => {
    try {
      return parseProgram(source);
    } catch {
      return [];
    }
  }, [source]);

  function step() {
    setState((s) => runOneInstruction(s, program));
  }

  function run() {
    let s = state;
    let guard = 0;
    while (!s.halted && !s.error && guard < 200) {
      s = runOneInstruction(s, program);
      guard++;
    }
    setState(s);
  }

  function reset() {
    setState(initialState());
  }

  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <p className="mb-2 text-sm font-semibold">התוכנית שלך (פקודה אחת לשורה)</p>
          <textarea
            value={source}
            onChange={(e) => {
              setSource(e.target.value);
              setState(initialState());
            }}
            rows={10}
            spellCheck={false}
            className="w-full rounded-lg border border-border bg-background p-3 font-mono text-sm"
            style={{ direction: "ltr" }}
          />
          <p className="mt-2 text-xs text-muted">
            פקודות זמינות: SETA n, SETB n, ADD, SUB, STORE addr, LOAD addr, PRINT, HALT
          </p>
        </div>

        <div>
          <p className="mb-2 text-sm font-semibold">מצב המחשב</p>
          <div className="mb-3 flex gap-3">
            <div className="flex-1 rounded-lg bg-background p-3 text-center">
              <div className="text-xs text-muted">רגיסטר A</div>
              <div className="text-2xl font-bold text-primary">{state.a}</div>
            </div>
            <div className="flex-1 rounded-lg bg-background p-3 text-center">
              <div className="text-xs text-muted">רגיסטר B</div>
              <div className="text-2xl font-bold text-primary">{state.b}</div>
            </div>
          </div>
          <p className="mb-1 text-xs text-muted">זיכרון (8 תאים)</p>
          <div className="mb-3 grid grid-cols-8 gap-1" style={{ direction: "ltr" }}>
            {state.memory.map((val, i) => (
              <div
                key={i}
                className="flex flex-col items-center rounded bg-background py-1 text-xs"
              >
                <span className="text-muted">{i}</span>
                <span className="font-bold">{val}</span>
              </div>
            ))}
          </div>
          <p className="mb-1 text-xs text-muted">פלט (PRINT)</p>
          <div className="min-h-10 rounded-lg bg-background p-2 font-mono text-sm">
            {state.output.join(", ") || "—"}
          </div>
          {state.error && <p className="mt-2 text-sm text-danger">{state.error}</p>}
          {state.halted && !state.error && (
            <p className="mt-2 text-sm text-success">התוכנית הסתיימה (HALT)</p>
          )}
          <p
            className={cn(
              "mt-2 text-xs",
              state.pc < program.length ? "text-primary" : "text-muted"
            )}
          >
            שורה נוכחית (PC): {state.pc < program.length ? state.pc + 1 : "—"}
          </p>
        </div>
      </div>

      <div className="mt-4 flex gap-2">
        <button
          onClick={step}
          disabled={state.halted}
          className="flex items-center gap-1 rounded-lg border border-border px-3 py-2 text-sm disabled:opacity-40"
        >
          <StepForward size={14} /> צעד אחד
        </button>
        <button
          onClick={run}
          disabled={state.halted}
          className="flex items-center gap-1 rounded-lg bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground disabled:opacity-40"
        >
          <Play size={14} /> הרץ הכל
        </button>
        <button
          onClick={reset}
          className="flex items-center gap-1 rounded-lg border border-border px-3 py-2 text-sm text-muted"
        >
          <RotateCcw size={14} /> איפוס
        </button>
      </div>
    </div>
  );
}
