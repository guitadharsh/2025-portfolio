// "use client";

// import { useState, useRef } from "react";
// import { motion } from "framer-motion";
// import { Volume2, VolumeX, Radio, Music } from "lucide-react";

// const radioStations = [
//   "/audio/radio1.mp3",
//   "/audio/radio2.mp3",
//   "/audio/radio3.mp3",
// ];

// const personalTracks = [
//   "/audio/mymusic1.mp3",
//   "/audio/mymusic2.mp3",
// ];

// const clickSoundPath = "/assets/audio/click.mp3";

// const MusicBox = () => {
//   const [isMuted, setIsMuted] = useState(false);
//   const [isPersonalMode, setIsPersonalMode] = useState(false);
//   const [currentTrack, setCurrentTrack] = useState(0);

//   const audioRef = useRef<HTMLAudioElement | null>(null);
//   const clickRef = useRef<HTMLAudioElement | null>(null);

//   const playClick = () => {
//     if (clickRef.current) {
//       clickRef.current.currentTime = 0;
//       clickRef.current.play();
//     }
//   };

//   const handleNextChannel = () => {
//     playClick();
//     const tracks = isPersonalMode ? personalTracks : radioStations;
//     setCurrentTrack((prev) => (prev + 1) % tracks.length);
//   };

//   const handleMuteToggle = () => {
//     playClick();
//     setIsMuted((prev) => !prev);
//   };

//   const handleModeSwitch = () => {
//     playClick();
//     setIsPersonalMode((prev) => !prev);
//     setCurrentTrack(0);
//   };

//   const tracks = isPersonalMode ? personalTracks : radioStations;

//   return (
//     <motion.div
//       className="w-[220px] h-[160px] bg-[url('/assets/wood-texture.jpg')] bg-cover bg-center rounded-lg shadow-xl border border-border flex flex-col justify-between p-4 relative"
//       initial={{ opacity: 0, y: -10 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.8 }}
//     >
//       {/* Decorative header */}
//       <div className="flex justify-between items-center">
//         <span className="text-xs uppercase text-foreground/60 tracking-widest">
//           {isPersonalMode ? "My Tunes" : "Vintage Radio"}
//         </span>
//         <Radio className="w-4 h-4 text-primary/70" />
//       </div>

//       {/* Dial / Screen */}
//       <div className="flex flex-col items-center justify-center mt-4 mb-2">
//         <div className="w-[140px] h-[40px] bg-zinc-800/80 text-primary text-center flex items-center justify-center rounded-md shadow-inner border border-border font-mono text-sm">
//           {isPersonalMode ? `Track ${currentTrack + 1}` : `Channel ${currentTrack + 1}`}
//         </div>
//       </div>

//       {/* Controls */}
//       <div className="flex justify-around items-center mt-auto">
//         <button
//           onClick={handleNextChannel}
//           className="w-10 h-10 rounded-full bg-zinc-700 hover:bg-zinc-600 text-white shadow-md flex items-center cursor-pointer justify-center active:scale-95 transition"
//         >
//           ⏭
//         </button>
//         <button
//           onClick={handleMuteToggle}
//           className="w-10 h-10 rounded-full bg-zinc-700 hover:bg-zinc-600 text-white shadow-md flex items-center cursor-pointer justify-center active:scale-95 transition"
//         >
//           {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
//         </button>
//         <button
//           onClick={handleModeSwitch}
//           className="w-10 h-10 rounded-full bg-zinc-700 hover:bg-zinc-600 text-white shadow-md flex items-center cursor-pointer justify-center active:scale-95 transition"
//         >
//           {isPersonalMode ? <Radio size={18} /> : <Music size={18} />}
//         </button>
//       </div>

//       {/* Hidden audio elements */}
//       <audio
//         ref={audioRef}
//         src={tracks[currentTrack]}
//         autoPlay
//         loop
//         muted={isMuted}
//         onEnded={handleNextChannel}
//       />
//         <audio ref={clickRef} src={clickSoundPath} preload="auto" />
//     </motion.div>
//   );
// };

// export default MusicBox;

"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import {
  Volume2,
  SkipBack,
  SkipForward,
  Radio,
  Play,
  Pause,
} from "lucide-react";
import HiddenYouTubeAudioHandler from "./HiddenYouTubeAudioHandler";

// 🎵 YouTube Tracks
const youtubeRadioLinks = [
  { url: "https://www.youtube.com/watch?v=kHGGf1qk6lI", start: 10, end: 60 },
  { url: "https://www.youtube.com/watch?v=bF6bFy5oUno", start: 0, end: 90 },
  { url: "https://www.youtube.com/watch?v=FRx6rQ606oE", start: 15, end: 75 },
  { url: "https://www.youtube.com/watch?v=ibz-xC1YCgk", start: 20, end: 100 },
  { url: "https://www.youtube.com/watch?v=nKhh3aqNRWA", start: 5, end: 120 },
];

// 🔊 Sound Effects
const clickSoundPath = "/assets/audio/click.mp3";
const scrollSoundPath = "/assets/audio/slider.mp3";

const MusicBox = () => {
  const [isMuted, setIsMuted] = useState(true); // start muted (browser-safe autoplay)
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [volume, setVolume] = useState(0.5);

  const clickRef = useRef<HTMLAudioElement | null>(null);
  const scrollRef = useRef<HTMLAudioElement | null>(null);

  // 🔘 Click sound
  const playClick = () => {
    if (clickRef.current) {
      clickRef.current.currentTime = 0;
      clickRef.current.play();
    }
  };

  // 🔄 Scroll (volume change) sound
  const playScroll = () => {
    if (scrollRef.current) {
      scrollRef.current.currentTime = 0;
      scrollRef.current.play();
    }
  };

  // ⏭ Next Track
  const handleNextChannel = () => {
    playClick();
    setIsMuted(false); // unmute after first user interaction
    setCurrentTrack((prev) => (prev + 1) % youtubeRadioLinks.length);
  };

  // ⏮ Previous Track
  const handlePrevChannel = () => {
    playClick();
    setIsMuted(false);
    setCurrentTrack((prev) =>
      prev === 0 ? youtubeRadioLinks.length - 1 : prev - 1
    );
  };

  // ▶️ / ⏸ Toggle Play/Pause
  const handlePlayPause = () => {
    playClick();
    setIsMuted(false);
    setIsPlaying((prev) => !prev);
  };

  // 🔊 Volume change
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    setIsMuted(false);
    playScroll();
  };

  return (
    <motion.div
      className="w-[220px] h-[160px] bg-[url('/assets/wood-texture.jpg')] bg-cover bg-center rounded-lg shadow-xl border border-border flex flex-col justify-between p-4 relative"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Header */}
      <div className="flex justify-between items-center">
        <span className="text-xs uppercase text-foreground/60 tracking-widest">
          YouTube Jukebox
        </span>
        <Radio className="w-4 h-4 text-primary/70" />
      </div>

      {/* Display / Track Info */}
      <div className="flex flex-col items-center justify-center mt-4 mb-2">
        <div className="w-[140px] h-[40px] bg-zinc-800/80 text-primary text-center flex items-center justify-center rounded-md shadow-inner border border-border font-mono text-sm">
          Track {currentTrack + 1}
        </div>
      </div>

      {/* Controls */}
      <div className="flex justify-around items-center mt-auto">
        {/* Backward */}
        <button
          onClick={handlePrevChannel}
          className="w-8 h-8 rounded-full bg-zinc-700 hover:bg-zinc-600 text-white shadow-md flex items-center justify-center cursor-pointer active:scale-95 transition"
        >
          <SkipBack size={16} />
        </button>

        {/* Play / Pause */}
        <button
          onClick={handlePlayPause}
          className="w-8 h-8 rounded-full bg-primary hover:bg-primary/80 text-white shadow-md flex items-center justify-center cursor-pointer active:scale-95 transition"
        >
          {isPlaying ? <Pause size={16} /> : <Play size={16} />}
        </button>

        {/* Forward */}
        <button
          onClick={handleNextChannel}
          className="w-8 h-8 rounded-full bg-zinc-700 hover:bg-zinc-600 text-white shadow-md flex items-center justify-center cursor-pointer active:scale-95 transition"
        >
          <SkipForward size={16} />
        </button>
      </div>

      {/* Volume Slider */}
      <div className="mt-2 flex flex-col items-center">
        <input
          type="range"
          min="0"
          max="1"
          step="0.05"
          value={volume}
          onChange={handleVolumeChange}
          className="w-[140px] accent-primary cursor-pointer"
        />
      </div>

      {/* Hidden YouTube Handler */}
      <HiddenYouTubeAudioHandler
        youtubeRadioLinks={youtubeRadioLinks}
        currentTrack={currentTrack}
        isMuted={isMuted}
        isPlaying={isPlaying}
        volume={volume}
        onNextTrack={handleNextChannel}
      />

      {/* Hidden Sound Effects */}
      <audio ref={clickRef} src={clickSoundPath} preload="auto" />
      <audio ref={scrollRef} src={scrollSoundPath} preload="auto" />
    </motion.div>
  );
};

export default MusicBox;



