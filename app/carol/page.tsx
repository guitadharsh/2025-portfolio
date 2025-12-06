// "use client";

// import { useEffect, useState } from "react";
// import Link from "next/link";
// import { songs as allSongs } from "@/lib/songs";

// export default function SongIndexPage() {
//   const [songs, setSongs] = useState(allSongs);
//   const [query, setQuery] = useState("");

//   useEffect(() => {
//     const cachedRaw = localStorage.getItem("songs-cache");

//     if (cachedRaw) {
//       const cached = JSON.parse(cachedRaw);

//       const isLengthDifferent = cached.length !== allSongs.length;

//       const isContentDifferent = JSON.stringify(cached) !== JSON.stringify(allSongs);

//       if (isLengthDifferent || isContentDifferent) {
//         localStorage.setItem("songs-cache", JSON.stringify(allSongs));
//         setSongs(allSongs);
//       } else {
//         setSongs(cached);
//       }
//     } else {
//       localStorage.setItem("songs-cache", JSON.stringify(allSongs));
//       setSongs(allSongs);
//     }
//   }, []);
  
//   const q = query.toLowerCase().replace(/\s+/g, "-");

//   const filtered = songs.filter((s) =>
//     s.title.toLowerCase().includes(query.toLowerCase()) ||
//     s.slug.toLowerCase().includes(q)
//   );

//   return (
//     <div className="min-h-screen p-6 max-w-xl mx-auto">
//       <h1 className="text-2xl font-bold mb-4 text-center">🎄 Carol Song Book</h1>

//       <input
//         placeholder="Search songs…"
//         className="w-full p-2 border rounded mb-6"
//         value={query}
//         onChange={(e) => setQuery(e?.target?.value)}
//       />

//       <div className="space-y-3">
//         {filtered.map((song) => (
//           <Link
//             key={song?.slug}
//             href={`/carol/${song?.slug}`}
//             className="block p-4 border rounded hover:bg-gray-100"
//           >
//             {song?.title}
//           </Link>
//         ))}

//         {filtered?.length === 0 && (
//           <p className="text-center text-gray-400">No songs found</p>
//         )}
//       </div>
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { songs as allSongs } from "@/lib/songs";
import { motion, AnimatePresence } from "framer-motion";

export default function SongIndexPage() {
  const [songs, setSongs] = useState(allSongs);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const cachedRaw = localStorage.getItem("songs-cache");

    if (cachedRaw) {
      try {
        const cached = JSON.parse(cachedRaw);

        const isSameLength = cached.length === allSongs.length;
        const isSameContent =
          JSON.stringify(cached.map((s: any) => s.slug)) ===
          JSON.stringify(allSongs.map((s) => s.slug));

        if (isSameLength && isSameContent) {
          setSongs(cached);
          return;
        }
      } catch {}
    }

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
    <div className="min-h-screen px-3 sm:px-4 pb-24">
      
      {/* Sticky Header */} 
      <div className="sticky top-0 z-40 backdrop-blur-lg bg-white/10 border-b border-gray-200/40 pt-5 pb-4 shadow-sm rounded-sm p-3">
        <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-center text-gray-800 tracking-tight">
          🎄 Carol Song Book
        </h1>

        <input
          placeholder="Search songs…"
          className="
            w-full p-3 pr-3 rounded-2xl border 
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
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              layout
            >
              <motion.div
                whileTap={{ scale: 0.97 }} // mobile tap feedback
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
                  "
                >
                  <p className="font-semibold text-gray-900 text-lg">
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

