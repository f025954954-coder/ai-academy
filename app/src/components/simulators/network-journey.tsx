"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Play, StepForward, RotateCcw, Pause } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface JourneyNode {
  id: string;
  label: string;
  icon: LucideIcon;
}

export interface JourneyHop {
  fromNodeId: string;
  toNodeId: string;
  label: string;
  detail: string;
}

export function NetworkJourney({ nodes, hops }: { nodes: JourneyNode[]; hops: JourneyHop[] }) {
  const [hopIndex, setHopIndex] = React.useState(-1); // -1 = לא התחיל
  const [playing, setPlaying] = React.useState(false);

  React.useEffect(() => {
    if (!playing) return;
    if (hopIndex >= hops.length - 1) {
      setPlaying(false);
      return;
    }
    const t = setTimeout(() => setHopIndex((i) => i + 1), 1400);
    return () => clearTimeout(t);
  }, [playing, hopIndex, hops.length]);

  const nodePosition = (nodeId: string) => {
    const idx = nodes.findIndex((n) => n.id === nodeId);
    return (idx / (nodes.length - 1)) * 100;
  };

  const dotPosition =
    hopIndex < 0
      ? nodePosition(hops[0]?.fromNodeId ?? nodes[0].id)
      : nodePosition(hops[hopIndex].toNodeId);

  const currentHop = hopIndex >= 0 ? hops[hopIndex] : null;

  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      <div className="relative mb-8 h-20" style={{ direction: "ltr" }}>
        <div className="absolute top-8 right-0 left-0 h-0.5 bg-border" />
        {nodes.map((node, i) => (
          <div
            key={node.id}
            className="absolute top-0 flex -translate-x-1/2 flex-col items-center gap-1"
            style={{ left: `${(i / (nodes.length - 1)) * 100}%` }}
          >
            <div className="flex size-14 items-center justify-center rounded-2xl border-2 border-border bg-background">
              <node.icon size={22} className="text-muted" />
            </div>
            <span className="max-w-20 text-center text-xs font-medium">{node.label}</span>
          </div>
        ))}
        <motion.div
          className="absolute top-6 size-4 -translate-x-1/2 rounded-full bg-primary shadow-lg shadow-primary/40"
          animate={{ left: `${dotPosition}%` }}
          transition={{ duration: 1, ease: "easeInOut" }}
        />
      </div>

      <div className="min-h-16 rounded-xl bg-background p-4 text-sm">
        {currentHop ? (
          <>
            <span className="font-bold text-primary">{currentHop.label}: </span>
            {currentHop.detail}
          </>
        ) : (
          <span className="text-muted">לחץ &quot;התחל&quot; כדי לעקוב אחרי המסע שלב-אחר-שלב.</span>
        )}
      </div>

      <div className="mt-4 flex gap-2">
        <button
          onClick={() => setHopIndex((i) => Math.min(hops.length - 1, i + 1))}
          disabled={hopIndex >= hops.length - 1}
          className="flex items-center gap-1 rounded-lg border border-border px-3 py-2 text-sm disabled:opacity-40"
        >
          <StepForward size={14} /> שלב הבא
        </button>
        <button
          onClick={() => setPlaying((p) => !p)}
          disabled={hopIndex >= hops.length - 1}
          className="flex items-center gap-1 rounded-lg bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground disabled:opacity-40"
        >
          {playing ? <Pause size={14} /> : <Play size={14} />} {playing ? "השהה" : "נגן הכל"}
        </button>
        <button
          onClick={() => {
            setHopIndex(-1);
            setPlaying(false);
          }}
          className="flex items-center gap-1 rounded-lg border border-border px-3 py-2 text-sm text-muted"
        >
          <RotateCcw size={14} /> איפוס
        </button>
      </div>
    </div>
  );
}
