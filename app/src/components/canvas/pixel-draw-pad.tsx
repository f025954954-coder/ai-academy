"use client";

import * as React from "react";
import { Eraser } from "lucide-react";

interface PixelDrawPadProps {
  gridSize?: number;
  cellPx?: number;
  value: number[][];
  onChange: (grid: number[][]) => void;
}

/** לוח ציור פיקסלים גנרי לשימוש חוזר — כל שיעור/פרויקט יכול להזין grid משלו ולקבל שינויים. */
export function PixelDrawPad({ gridSize = 8, cellPx = 28, value, onChange }: PixelDrawPadProps) {
  const [drawing, setDrawing] = React.useState(false);

  function setCell(row: number, col: number, val: number) {
    const next = value.map((r) => [...r]);
    next[row][col] = val;
    onChange(next);
  }

  function clear() {
    onChange(Array.from({ length: gridSize }, () => Array(gridSize).fill(0)));
  }

  return (
    <div>
      <div
        className="inline-block select-none rounded-lg border border-border bg-background p-1"
        onMouseLeave={() => setDrawing(false)}
        onMouseUp={() => setDrawing(false)}
      >
        {value.map((row, r) => (
          <div key={r} className="flex">
            {row.map((cell, c) => (
              <div
                key={c}
                onMouseDown={() => {
                  setDrawing(true);
                  setCell(r, c, 1);
                }}
                onMouseEnter={() => drawing && setCell(r, c, 1)}
                style={{
                  width: cellPx,
                  height: cellPx,
                  backgroundColor: cell ? "var(--primary)" : "transparent",
                }}
                className="cursor-crosshair border border-border/30"
              />
            ))}
          </div>
        ))}
      </div>
      <button
        onClick={clear}
        className="mt-2 flex items-center gap-1 rounded-lg border border-border px-3 py-1.5 text-xs text-muted hover:bg-background"
      >
        <Eraser size={13} /> נקה
      </button>
    </div>
  );
}

export function emptyGrid(size: number): number[][] {
  return Array.from({ length: size }, () => Array(size).fill(0));
}
