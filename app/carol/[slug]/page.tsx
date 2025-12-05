import { songs } from "@/lib/songs";

export default async function SongPage({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const song = songs.find((s) => s.slug === slug);

  if (!song) return <p className="p-6 text-center">Song not found</p>;

  return (
    <div className="min-h-screen px-4 py-6 max-w-xl mx-auto">
      {/* Title */}
      <h1 className="text-3xl font-extrabold mb-6 text-center leading-tight">
        {song.title}
      </h1>

      {/* Render stanzas and chorus */}
      <div className="space-y-8">
        {song.parts.map((part, index) => (
          <div key={index} className="bg-white/90 p-4 rounded-xl shadow-sm">
            <h3 className="text-xl font-semibold mb-3">
              {part?.type === "chorus" ? "Chorus" : `Stanza ${index + 1}`}
            </h3>

            <pre className="whitespace-pre-wrap text-lg leading-8">
              {part?.text}
            </pre>
          </div>
        ))}
      </div>
    </div>
  );
}
