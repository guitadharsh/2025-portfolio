"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { songs as allSongs } from "@/lib/songs";
import { motion, AnimatePresence } from "framer-motion";

export default function SongIndexPage() {
  const [songs, setSongs] = useState(allSongs);
  const [query, setQuery] = useState("");

  useEffect(() => {
    localStorage.setItem("visitedCarol", "true");
  }, [])

  // useEffect(() => {
  //   const cachedRaw = localStorage.getItem("songs-cache");

  //   if (cachedRaw) {
  //     try {
  //       const cached = JSON.parse(cachedRaw);
  //       const isSameLength = cached.length === allSongs.length;
  //       const isSameContent =
  //         JSON.stringify(cached.map((s: any) => s.slug)) ===
  //         JSON.stringify(allSongs.map((s) => s.slug));
  //       if (isSameLength && isSameContent) {
  //         setSongs(cached);
  //         return;
  //       }
  //     } catch { }
  //   }

  //   localStorage.setItem("songs-cache", JSON.stringify(allSongs));
  //   setSongs(allSongs);
  // }, []);

  useEffect(() => {
    const cachedRaw = localStorage.getItem("songs-cache");

    if (cachedRaw) {
      try {
        const cached = JSON.parse(cachedRaw);

        // Compare the entire JSON string
        const isSameContent = JSON.stringify(cached) === JSON.stringify(allSongs);

        if (isSameContent) {
          setSongs(cached);
          return;
        }
      } catch (err) {
        console.error("Failed to parse cached songs", err);
      }
    }

    // Save fresh data to localStorage
    localStorage.setItem("songs-cache", JSON.stringify(allSongs));
    setSongs(allSongs);
  }, []);


  const normalizedQuery = query.toLowerCase().replace(/\s+/g, "-");

  const filteredSongs = songs.filter(
    (s) =>
      s.title.toLowerCase().includes(query.toLowerCase()) ||
      s.slug.toLowerCase().includes(normalizedQuery)
  );

  return (
    <div className="min-h-screen px-4 pb-24 max-w-xl mx-auto">

      {/* Sticky Header */}
      <div className="sticky top-0 z-40 backdrop-blur-lg bg-white/20 border-b border-gray-200/30 pt-5 pb-4 shadow-sm rounded-sm px-2 sm:px-0">
        <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-center text-gray-800 tracking-tight">
          🎄 Carol Song Book
        </h1>

        <input
          placeholder="Search songs…"
          className="
            w-full p-3 rounded-2xl border 
            shadow-md transition-all
            focus:outline-none 
            focus:ring-2 focus:ring-green-500 
            focus:border-transparent
            bg-white backdrop-blur-xl
            text-base sm:text-lg
          "
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {/* Song List */}
      <div className="mt-6 space-y-3">
        <AnimatePresence mode="popLayout">
          {filteredSongs.map((song) => (
            <motion.div
              key={song.slug}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              layout
            >
              <motion.div
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Link
                  href={`/carol/${song.slug}`}
                  className="
                    block p-4 rounded-xl border 
                    bg-white/90 backdrop-blur 
                    shadow-sm hover:shadow-lg 
                    transition-all duration-200
                    hover:bg-green-50 hover:border-green-200
                    active:bg-green-100
                    text-center
                  "
                >
                  <p className="font-medium text-gray-900 text-lg">
                    {song.title}
                  </p>
                </Link>
              </motion.div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Empty State */}
        {filteredSongs.length === 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-gray-400 mt-12 text-lg"
          >
            No songs found 😕
          </motion.p>
        )}
      </div>
    </div>
  );
}