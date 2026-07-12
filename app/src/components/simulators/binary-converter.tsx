"use client";

import * as React from "react";

function decToBin(n: number) {
  return Math.max(0, Math.min(255, n)).toString(2).padStart(8, "0");
}

export function BinaryConverter() {
  const [decimal, setDecimal] = React.useState(42);
  const bin = decToBin(decimal);

  function toggleBit(index: number) {
    const bits = bin.split("");
    bits[index] = bits[index] === "0" ? "1" : "0";
    setDecimal(parseInt(bits.join(""), 2));
  }

  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      <p className="mb-4 text-sm text-muted">
        לחץ על הביטים כדי לשנות אותם ולראות איך הערך העשרוני משתנה בזמן אמת (8 ביט, 0-255):
      </p>
      <div className="flex justify-center gap-2" style={{ direction: "ltr" }}>
        {bin.split("").map((bit, i) => (
          <button
            key={i}
            onClick={() => toggleBit(i)}
            className={`flex size-12 items-center justify-center rounded-lg border-2 font-mono text-xl font-bold transition ${
              bit === "1"
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-background text-muted"
            }`}
          >
            {bit}
          </button>
        ))}
      </div>
      <div className="mt-5 flex items-center justify-center gap-3">
        <span className="text-sm text-muted">= ערך עשרוני:</span>
        <input
          type="number"
          min={0}
          max={255}
          value={decimal}
          onChange={(e) => setDecimal(Math.max(0, Math.min(255, Number(e.target.value))))}
          className="w-20 rounded-lg border border-border bg-background px-2 py-1 text-center font-mono text-lg font-bold text-primary"
        />
      </div>
      <p className="mt-3 text-center text-xs text-muted">
        {`${decimal} = ${bin.replace(/(.)(?=(.{4})+$)/g, "$1 ")} (בסיס 2)`}
      </p>
    </div>
  );
}
