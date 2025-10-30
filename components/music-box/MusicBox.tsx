"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import {
  SkipBack,
  SkipForward,
  Radio,
  Play,
  Pause,
} from "lucide-react";
import Image from "next/image";
import HiddenYouTubeAudioHandler from "./HiddenYouTubeAudioHandler";
import diskImg from "@/public/assets/images/disk.png";

// 🎵 YouTube Tracks
const youtubeRadioLinks = [
  { url: "https://www.youtube.com/watch?v=kHGGf1qk6lI", start: 10, end: 100 },
  { url: "https://www.youtube.com/watch?v=bF6bFy5oUno", start: 10, end: 100 },
  { url: "https://www.youtube.com/watch?v=FRx6rQ606oE", start: 10, end: 100 },
  { url: "https://www.youtube.com/watch?v=ibz-xC1YCgk", start: 10, end: 100 },
  { url: "https://www.youtube.com/watch?v=nKhh3aqNRWA", start: 10, end: 100 },
];

// 🔊 Sound Effects
const clickSoundPath = "/assets/audio/click.mp3";
const scrollSoundPath = "/assets/audio/slider.mp3";

const MusicBox = () => {
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
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

  // 🎚 Scroll sound
  const playScroll = () => {
    if (scrollRef.current) {
      scrollRef.current.currentTime = 0;
      scrollRef.current.play();
    }
  };

  // ⏭ Next track
  const handleNextChannel = () => {
    playClick();
    setIsMuted(false);
    setCurrentTrack((prev) => (prev + 1) % youtubeRadioLinks.length);
  };

  // ⏮ Previous track
  const handlePrevChannel = () => {
    playClick();
    setIsMuted(false);
    setCurrentTrack((prev) =>
      prev === 0 ? youtubeRadioLinks.length - 1 : prev - 1
    );
  };

  // ▶️ / ⏸ Toggle play/pause
  const handlePlayPause = () => {
    playClick();
    setIsMuted(false);
    setIsPlaying((prev) => !prev);
  };

  // 🔊 Volume control
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    setIsMuted(false);
    playScroll();
  };

  return (
    <motion.div
      className="relative w-[220px] h-[160px] bg-[url('/assets/wood-texture.jpg')] bg-cover bg-center rounded-2xl shadow-xl border border-border flex flex-col justify-between p-4 backdrop-blur-sm overflow-hidden"
      initial={{ opacity: 1, y: 0 }}
      animate={{
        opacity: 1,
        y: [0, -2, 0, 2, 0],
        rotate: [0, 0.6, -0.6, 0],
      }}
      transition={{
        duration: 8,
        ease: "easeInOut",
        repeat: Infinity,
      }}
    >
      {/* ✨ Soft Glow Overlay */}
      <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-primary/10 via-transparent to-transparent blur-2xl pointer-events-none" />

      {/* 💿 Spinning Disk */}
      <motion.div
        animate={
          isPlaying
            ? { rotate: [0, 360] }
            : { rotate: undefined }
        }
        transition={
          isPlaying
            ? {
              repeat: Infinity,
              ease: "linear",
              duration: 4,
            }
            : { duration: 0 }
        }
        className="absolute -top-4 -right-6 w-20 h-20 sm:w-24 sm:h-24 opacity-90 z-20"
      >
        <Image
          src={diskImg}
          alt="Spinning Disk"
          width={100}
          height={100}
          className="object-contain drop-shadow-md rounded-full"
        />
      </motion.div>


      {/* Header */}
      <div className="flex justify-between items-center relative z-10">
        <span className="text-[10px] uppercase text-foreground/60 tracking-widest font-semibold drop-shadow">
          My Jukebox
        </span>
        <Radio className="w-4 h-4 text-primary/70 drop-shadow" />
      </div>

      {/* Track Display */}
      <div className="flex flex-col items-center justify-center mt-4 mb-2 relative z-10">
        <div
          className="w-[140px] h-[40px] bg-stone-800/80 text-primary text-center flex items-center justify-center rounded-md shadow-inner border border-border font-mono text-sm"
        >
          <p className="text-white">
            Track {currentTrack + 1}
          </p>
        </div>
      </div>

      {/* Controls */}
      <div className="flex justify-around items-center mt-auto relative z-10">
        <button
          onClick={handlePrevChannel}
          className="w-8 h-8 rounded-full bg-zinc-700 hover:bg-zinc-600 text-white cursor-pointer shadow-md flex items-center justify-center active:scale-90 transition-transform duration-150"
        >
          <SkipBack size={16} />
        </button>

        <motion.button
          onClick={handlePlayPause}
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.05 }}
          className="w-8 h-8 rounded-full bg-primary hover:bg-primary/80 text-white cursor-pointer shadow-lg flex items-center justify-center transition-all"
        >
          {isPlaying ? <Pause size={16} /> : <Play size={16} />}
        </motion.button>

        <button
          onClick={handleNextChannel}
          className="w-8 h-8 rounded-full bg-zinc-700 hover:bg-zinc-600 text-white cursor-pointer shadow-md flex items-center justify-center active:scale-90 transition-transform duration-150"
        >
          <SkipForward size={16} />
        </button>
      </div>

      {/* Volume Slider */}
      <div className="mt-2 flex flex-col items-center relative z-10">
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

      {/* Hidden YouTube Audio Handler */}
      <HiddenYouTubeAudioHandler
        youtubeRadioLinks={youtubeRadioLinks}
        currentTrack={currentTrack}
        isMuted={isMuted}
        isPlaying={isPlaying}
        volume={volume}
        onNextTrack={handleNextChannel}
      />

      {/* Sound Effects */}
      <audio ref={clickRef} src={clickSoundPath} preload="auto" />
      <audio ref={scrollRef} src={scrollSoundPath} preload="auto" />
    </motion.div>
  );
};

export default MusicBox;




