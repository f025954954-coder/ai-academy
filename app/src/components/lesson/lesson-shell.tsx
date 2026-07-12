"use client";

import * as React from "react";
import { Clock, BarChart3, ListChecks, CheckCircle2 } from "lucide-react";
import { useProgress } from "@/lib/progress/store";

export interface LessonMeta {
  trackSlug: string;
  moduleSlug: string;
  lessonSlug: string;
  title: string;
  objectives: string[];
  estMinutes: number;
  difficulty: string;
  prerequisites: string[];
}

export interface LessonSection {
  id: string;
  label: string;
  content: React.ReactNode;
}

export function LessonShell({
  meta,
  sections,
}: {
  meta: LessonMeta;
  sections: LessonSection[];
}) {
  const lessonKey = `${meta.trackSlug}/${meta.moduleSlug}/${meta.lessonSlug}`;
  const { state, completeLesson } = useProgress();
  const isComplete = state.completedLessons.includes(lessonKey);

  return (
    <div className="mx-auto flex max-w-6xl gap-8 px-6 py-10">
      <aside className="sticky top-20 hidden h-fit w-56 shrink-0 lg:block">
        <nav className="space-y-1 text-sm">
          {sections.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="block rounded-lg px-3 py-1.5 text-muted transition hover:bg-card hover:text-foreground"
            >
              {s.label}
            </a>
          ))}
        </nav>
      </aside>

      <div className="min-w-0 flex-1">
        <header className="mb-8 border-b border-border pb-6">
          <h1 className="text-3xl font-extrabold">{meta.title}</h1>
          <div className="mt-3 flex flex-wrap gap-4 text-sm text-muted">
            <span className="flex items-center gap-1.5">
              <Clock size={15} /> {meta.estMinutes} דקות
            </span>
            <span className="flex items-center gap-1.5">
              <BarChart3 size={15} /> רמת קושי: {meta.difficulty}
            </span>
            {meta.prerequisites.length > 0 && (
              <span className="flex items-center gap-1.5">
                <ListChecks size={15} /> דרישות קדם: {meta.prerequisites.join(", ")}
              </span>
            )}
          </div>
          <div className="mt-4 rounded-xl bg-primary/5 p-4">
            <p className="mb-2 text-sm font-semibold text-primary">מטרות למידה</p>
            <ul className="space-y-1 text-sm">
              {meta.objectives.map((o, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                  {o}
                </li>
              ))}
            </ul>
          </div>
        </header>

        <div className="space-y-12">
          {sections.map((s) => (
            <section key={s.id} id={s.id} className="scroll-mt-24">
              <h2 className="mb-4 text-xl font-bold">{s.label}</h2>
              {s.content}
            </section>
          ))}
        </div>

        <div className="mt-12 flex justify-center border-t border-border pt-8">
          <button
            onClick={() => completeLesson(lessonKey)}
            disabled={isComplete}
            className="flex items-center gap-2 rounded-full bg-success px-8 py-3 font-bold text-white disabled:opacity-60"
          >
            <CheckCircle2 size={18} />
            {isComplete ? "השיעור הושלם ✓" : "סמן שיעור כהושלם (+50 XP)"}
          </button>
        </div>
      </div>
    </div>
  );
}
