import Link from "next/link";
import { notFound } from "next/navigation";
import { TRACKS } from "@/lib/curriculum/data";

export function generateStaticParams() {
  return TRACKS.map((t) => ({ track: t.slug }));
}

export default async function TrackPage({
  params,
}: {
  params: Promise<{ track: string }>;
}) {
  const { track: trackSlug } = await params;
  const track = TRACKS.find((t) => t.slug === trackSlug);
  if (!track) notFound();

  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <Link href="/tracks" className="text-sm text-muted hover:text-foreground">
        ← כל המסלולים
      </Link>
      <h1 className="mt-3 text-3xl font-extrabold">{track.title}</h1>
      <p className="mt-2 text-muted">{track.goal}</p>

      <div className="mt-10 space-y-4">
        {track.modules.map((module, i) => (
          <div key={module.slug} className="rounded-2xl border border-border bg-card p-5">
            <div className="flex items-center justify-between">
              <h2 className="font-bold">
                מודול {i + 1}: {module.title}
              </h2>
              {module.lessons.length > 0 && (
                <span className="rounded-full bg-success/10 px-3 py-1 text-xs font-semibold text-success">
                  בנוי במלואו
                </span>
              )}
            </div>
            <p className="mt-1 text-sm text-muted">{module.description}</p>
            <p className="mt-2 text-xs text-muted">
              <strong>פרויקט מודול:</strong> {module.projectBrief}
            </p>
            {module.lessons.length > 0 ? (
              <ol className="mt-4 space-y-2">
                {module.lessons.map((lesson, li) => (
                  <li key={lesson.slug}>
                    <Link
                      href={`/tracks/${track.slug}/${module.slug}/${lesson.slug}`}
                      className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition hover:bg-background"
                    >
                      <span className="flex size-6 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                        {li + 1}
                      </span>
                      {lesson.title}
                      <span className="mr-auto text-xs text-muted">{lesson.estMinutes} דק&#39;</span>
                    </Link>
                  </li>
                ))}
              </ol>
            ) : (
              <p className="mt-3 text-xs italic text-muted">שיעורי המודול בתהליך בנייה</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
