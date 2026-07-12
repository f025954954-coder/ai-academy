import Link from "next/link";
import { notFound } from "next/navigation";
import { TRACKS } from "@/lib/curriculum/data";
import { TrackModuleList } from "@/components/curriculum/track-module-list";

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

      <TrackModuleList track={track} />
    </div>
  );
}
