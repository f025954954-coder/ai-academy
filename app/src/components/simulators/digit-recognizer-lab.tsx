"use client";

import * as React from "react";
import { PixelDrawPad, emptyGrid } from "@/components/canvas/pixel-draw-pad";
import { classifyDigit } from "@/lib/simulators/digit-templates";

export function DigitRecognizerLab() {
  const [grid, setGrid] = React.useState(() => emptyGrid(8));
  const hasDrawing = grid.some((row) => row.some((c) => c === 1));
  const result = hasDrawing ? classifyDigit(grid) : null;

  return (
    <div className="grid gap-5 sm:grid-cols-2">
      <div>
        <p className="mb-2 text-sm text-muted">צייר ספרה (0-9) ברשת 8x8:</p>
        <PixelDrawPad gridSize={8} cellPx={30} value={grid} onChange={setGrid} />
      </div>
      <div>
        <p className="mb-2 text-sm text-muted">חיזוי המודל:</p>
        {result ? (
          <div>
            <div className="rounded-xl bg-primary/10 p-4 text-center">
              <div className="text-4xl font-extrabold text-primary">{result.digit}</div>
              <div className="text-xs text-muted">ביטחון: {result.confidence}%</div>
            </div>
            <div className="mt-3 space-y-1">
              {result.distances.slice(0, 3).map((d) => (
                <div key={d.digit} className="flex justify-between text-xs text-muted">
                  <span>ספרה {d.digit}</span>
                  <span>מרחק: {d.distance.toFixed(1)}</span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex h-40 items-center justify-center rounded-xl bg-background text-sm text-muted">
            צייר משהו כדי לראות חיזוי
          </div>
        )}
      </div>
    </div>
  );
}
