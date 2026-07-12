"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

export interface DiagramStep {
  icon: LucideIcon;
  label: string;
  detail: string;
}

export function StepDiagram({ steps }: { steps: DiagramStep[] }) {
  const [active, setActive] = React.useState(0);

  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      <div className="flex items-center gap-2 overflow-x-auto pb-2" style={{ direction: "ltr" }}>
        {steps.map((step, i) => (
          <React.Fragment key={step.label}>
            <button
              onClick={() => setActive(i)}
              className="flex shrink-0 flex-col items-center gap-2"
            >
              <motion.span
                animate={{
                  scale: active === i ? 1.15 : 1,
                  backgroundColor: active === i ? "var(--primary)" : "var(--background)",
                  color: active === i ? "var(--primary-foreground)" : "var(--muted)",
                }}
                className="flex size-14 items-center justify-center rounded-2xl border border-border"
              >
                <step.icon size={22} />
              </motion.span>
              <span
                className={cn(
                  "max-w-20 text-center text-xs font-medium",
                  active === i ? "text-primary" : "text-muted"
                )}
              >
                {step.label}
              </span>
            </button>
            {i < steps.length - 1 && (
              <div className="h-0.5 w-8 shrink-0 bg-border sm:w-14" />
            )}
          </React.Fragment>
        ))}
      </div>
      <motion.div
        key={active}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-6 rounded-xl bg-background p-4 text-sm"
      >
        <span className="font-bold text-primary">{steps[active].label}: </span>
        {steps[active].detail}
      </motion.div>
    </div>
  );
}
