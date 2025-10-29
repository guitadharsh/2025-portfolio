"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import MusicBox from "@/components/music-box/MusicBox";

export default function Home() {
  return (
    <main className="relative min-h-screen flex flex-col justify-center items-center text-foreground overflow-hidden">
      {/* 🎵 Floating MusicBox */}
      <motion.div
        animate={{ rotate: [0, 2, -2, 0] }}
        transition={{ duration: 6, repeat: Infinity }}
        className="absolute top-6 right-6 md:top-10 md:right-16 z-20 scale-75 sm:scale-90 md:scale-100"
      >
        <MusicBox />
      </motion.div>

      {/* 🖼 HERO SECTION */}
      <section className="flex flex-col md:flex-row items-center justify-center w-full px-4 sm:px-8 md:px-16 py-12 md:py-20 lg:py-28 gap-10 md:gap-16 max-w-7xl mx-auto">
        {/* LEFT SIDE - Hero Image */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="w-full md:w-1/2 flex justify-center md:justify-end"
        >
          <div className="relative w-[80%] sm:w-[340px] md:w-[420px] lg:w-[500px] aspect-3/4 overflow-hidden rounded-xl border border-border bg-card shadow-[0_6px_30px_rgba(0,0,0,0.2)]">
            <Image
              src="/assets/actor-3.png"
              alt="Adharsh D portrait"
              fill
              className="object-cover saturate-[0.9] contrast-[1.1]"
              priority
            />
          </div>
        </motion.div>

        {/* RIGHT SIDE - Text */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="w-full md:w-1/2 text-center md:text-left space-y-4 sm:space-y-5 md:space-y-6 px-2 sm:px-0"
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-primary tracking-tight leading-tight">
            Adharsh D
          </h1>

          <p className="text-base sm:text-lg md:text-xl italic text-muted-foreground max-w-md mx-auto md:mx-0">
            Crafting modern digital experiences with a timeless vintage touch.
          </p>

          <p className="text-sm sm:text-base md:text-lg text-foreground/90 max-w-lg mx-auto md:mx-0 leading-relaxed">
            I’m a full-stack developer passionate about creating thoughtful,
            aesthetic, and high-performing web applications — blending design,
            technology, and nostalgia.
          </p>

          <div className="pt-4 flex justify-center md:justify-start">
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-accent transition-all rounded-md shadow-md text-sm sm:text-base md:text-lg px-5 sm:px-7"
            >
              View My Work
            </Button>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
