"use client";

import { useState } from "react";
import Link from "next/link";
import { songs } from "@/lib/songs";

export default function SongIndexPage() {
  const [query, setQuery] = useState("");

  const filtered = songs.filter((s) =>
    s.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="min-h-screen p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">🎄 Carol Song Book</h1>

      <input
        placeholder="Search songs… (Malayalam supported)"
        className="w-full p-2 border rounded mb-6"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <div className="space-y-3">
        {filtered.map((song) => (
          <Link
            key={song.slug}
            href={`/carol/${song.slug}`}
            className="block p-4 border rounded hover:bg-gray-100"
          >
            {song.title}
          </Link>
        ))}

        {filtered.length === 0 && <p className="text-center text-gray-400">No songs found</p>}
      </div>
    </div>
  );
}
