"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft } from "lucide-react";

export interface Slide {
  title: string;
  bullets?: string[];
  visual?: React.ReactNode;
}

export function SlideDeck({ slides }: { slides: Slide[] }) {
  const [index, setIndex] = React.useState(0);
  const slide = slides[index];

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card">
      <div className="relative flex min-h-[280px] flex-col justify-center p-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.25 }}
          >
            <h3 className="mb-4 text-2xl font-extrabold text-primary">{slide.title}</h3>
            {slide.visual && <div className="mb-4">{slide.visual}</div>}
            {slide.bullets && (
              <ul className="space-y-2">
                {slide.bullets.map((b, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                    {b}
                  </li>
                ))}
              </ul>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="flex items-center justify-between border-t border-border px-6 py-3">
        <button
          onClick={() => setIndex((i) => Math.max(0, i - 1))}
          disabled={index === 0}
          className="flex items-center gap-1 text-sm text-muted disabled:opacity-30"
        >
          <ChevronRight size={16} /> קודם
        </button>
        <div className="flex gap-1.5">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`h-1.5 rounded-full transition-all ${
                i === index ? "w-6 bg-primary" : "w-1.5 bg-border"
              }`}
              aria-label={`שקף ${i + 1}`}
            />
          ))}
        </div>
        <button
          onClick={() => setIndex((i) => Math.min(slides.length - 1, i + 1))}
          disabled={index === slides.length - 1}
          className="flex items-center gap-1 text-sm text-muted disabled:opacity-30"
        >
          הבא <ChevronLeft size={16} />
        </button>
      </div>
    </div>
  );
}
