"use client";

import { useEffect, useState } from "react";
import { songs as staticSongs } from "@/lib/songs";

interface SongPart {
  type: string;
  text: string | string[]
}

export interface Song {
  slug: string;
  title: string;
  parts: SongPart[];
}

export default function SongPage({ params }: { params: Promise<{ slug: string }> }) {
  const [song, setSong] = useState<Song | null>(null);

  useEffect(() => {
    async function loadSong() {
      const awaitedParams = await params;
      const slug = awaitedParams.slug;

      // Get cached songs
      const cached = localStorage.getItem("songs-cache");
      let songList: Song[] = staticSongs;

      if (cached) {
        try {
          songList = JSON.parse(cached);
        } catch {
          localStorage.setItem("songs-cache", JSON.stringify(staticSongs));
        }
      } else {
        localStorage.setItem("songs-cache", JSON.stringify(staticSongs));
      }

      // Find song
      const found = songList.find((s) => s.slug === slug) || null;
      setSong(found);
    }

    loadSong();
  }, [params]); // params is a promise—React will not rerun until the promise ref changes

  if (!song) return <p className="p-6 text-center">Loading…</p>;

  return (
    <div className="min-h-screen px-4 py-6 max-w-xl mx-auto">
      <h1 className="text-3xl font-extrabold mb-6 text-center leading-tight">
        {song.title}
      </h1>

      <div className="space-y-8">
        {song.parts.map((part, index) => (
          <div key={index} className="bg-white/90 p-4 rounded-xl shadow-sm">
            <h3 className="text-xl font-semibold mb-3">
              {part.type === "chorus" ? "Chorus" : `Stanza ${index + 1}`}
            </h3>

            <pre className="whitespace-pre-wrap text-lg leading-8">
              {part.text}
            </pre>
          </div>
        ))}
      </div>
    </div>
  );
}
