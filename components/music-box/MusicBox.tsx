"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import diskImg from "@/public/assets/images/disk.png";
import HiddenYouTubeAudioHandler from "./HiddenYouTubeAudioHandler";
import { youtubeRadioLinks } from "@/app/constants";
import { SkipBack, SkipForward, Radio, Play, Pause } from "lucide-react";

const clickSoundPath = "/assets/audio/click.mp3";
const scrollSoundPath = "/assets/audio/slider.mp3";

const MusicBox = () => {
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const clickRef = useRef<HTMLAudioElement | null>(null);
  const scrollRef = useRef<HTMLAudioElement | null>(null);

  const playClick = () => {
    if (clickRef.current) {
      clickRef.current.currentTime = 0;
      clickRef.current.play();
    }
  };

  const playScroll = () => {
    if (scrollRef.current) {
      scrollRef.current.currentTime = 0;
      scrollRef.current.play();
    }
  };

  const handleNextChannel = () => {
    playClick();
    setIsMuted(false);
    setCurrentTrack((prev) => (prev + 1) % youtubeRadioLinks.length);
  };

  const handlePrevChannel = () => {
    playClick();
    setIsMuted(false);
    setCurrentTrack((prev) =>
      prev === 0 ? youtubeRadioLinks.length - 1 : prev - 1
    );
  };

  const handlePlayPause = () => {
    playClick();
    setIsMuted(false);
    setIsPlaying((prev) => !prev);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    setIsMuted(false);
    playScroll();
  };

  return (
    <>
      {/* 💻 Desktop Version - Original Fancy UI */}
      <motion.div
        className="hidden sm:flex fixed top-10 right-10 
        w-[180px] sm:w-[220px] h-[130px] sm:h-[160px]
        bg-[url('/assets/wood-texture.jpg')] bg-cover bg-center rounded-2xl shadow-xl 
        border border-border flex flex-col justify-between p-4 backdrop-blur-sm 
        overflow-hidden z-50"
        initial={{ opacity: 1 }}
        animate={{
          y: [0, -1.5, 1.5, -1, 0],
          rotate: [0, 0.3, -0.3, 0.2, 0],
        }}
        transition={{
          duration: 14,
          ease: "easeInOut",
          repeat: Infinity,
        }}
      >
        <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-primary/10 via-transparent to-transparent blur-2xl pointer-events-none" />

        <motion.div
          animate={
            isPlaying ? { rotate: [0, 360] } : { rotate: [null, -8] }
          }
          transition={
            isPlaying
              ? { repeat: Infinity, ease: "linear", duration: 5 }
              : { duration: 0.8, ease: "easeOut" }
          }
          className="absolute -top-2 -right-4 w-14 h-14 sm:w-20 sm:h-20 opacity-90 z-20"
        >
          <Image
            src={diskImg}
            alt="Spinning Disk"
            width={100}
            height={100}
            className="object-contain drop-shadow-md rounded-full"
          />
        </motion.div>

        <div className="flex justify-between items-center relative z-10">
          <span className="text-[10px] uppercase text-foreground/60 tracking-widest font-semibold drop-shadow">
            My Jukebox
          </span>
          <Radio className="w-4 h-4 text-primary/70 drop-shadow" />
        </div>

        <div className="flex flex-col items-center justify-center mt-4 mb-2 relative z-10">
          <div className="w-[120px] h-[34px] bg-stone-800/80 text-primary text-center flex items-center justify-center rounded-md shadow-inner border border-border font-mono text-xs">
            <p className="text-white">Track {currentTrack + 1}</p>
          </div>
        </div>

        <div className="flex justify-around items-center mt-auto relative z-10">
          <button
            onClick={handlePrevChannel}
            className="w-8 h-8 rounded-full bg-zinc-700 hover:bg-zinc-600 text-white shadow-md flex items-center justify-center active:scale-90 transition-transform duration-150"
          >
            <SkipBack size={16} />
          </button>

          <motion.button
            onClick={handlePlayPause}
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.05 }}
            className="w-8 h-8 rounded-full bg-primary hover:bg-primary/80 text-white shadow-lg flex items-center justify-center transition-all"
          >
            {isPlaying ? <Pause size={16} /> : <Play size={16} />}
          </motion.button>

          <button
            onClick={handleNextChannel}
            className="w-8 h-8 rounded-full bg-zinc-700 hover:bg-zinc-600 text-white shadow-md flex items-center justify-center active:scale-90 transition-transform duration-150"
          >
            <SkipForward size={16} />
          </button>
        </div>

        <div className="mt-2 flex flex-col items-center relative z-10">
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={volume}
            onChange={handleVolumeChange}
            className="w-[120px] accent-primary cursor-pointer"
          />
        </div>
      </motion.div>

      {/* 📱 Mobile Version - Only Disk */}
      <div className="sm:hidden fixed bottom-10 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center">
        <motion.button
          onClick={handlePlayPause}
          animate={
            isPlaying ? { rotate: [0, 360] } : { rotate: [null, -8] }
          }
          transition={
            isPlaying
              ? { repeat: Infinity, ease: "linear", duration: 6 }
              : { duration: 0.8, ease: "easeOut" }
          }
          className="w-16 h-16 rounded-full shadow-xl border border-primary/40 bg-[#f5e6c8]/90 flex items-center justify-center overflow-hidden"
        >
          <Image
            src={diskImg}
            alt="Music Disk"
            width={70}
            height={70}
            className="rounded-full"
          />
        </motion.button>

        <p className="text-[11px] mt-1 text-white/70 font-serif">
          {isPlaying ? "Playing..." : "Tap to Play"}
        </p>
      </div>

      {/* 🎧 Hidden YouTube Audio Handler */}
      <HiddenYouTubeAudioHandler
        youtubeRadioLinks={youtubeRadioLinks}
        currentTrack={currentTrack}
        isMuted={isMuted}
        isPlaying={isPlaying}
        volume={volume}
        onNextTrack={handleNextChannel}
      />

      {/* 🔈 Sounds */}
      <audio ref={clickRef} src={clickSoundPath} preload="auto" />
      <audio ref={scrollRef} src={scrollSoundPath} preload="auto" />
    </>
  );
};

export default MusicBox;
