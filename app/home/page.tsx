"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import ResumeButton from "@/components/resume-button/ResumeButton";

export default function Home() {
  return (
    <main className="relative min-h-screen flex flex-col justify-center items-center text-foreground overflow-hidden">
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
              src="/assets/images/actor-3.png"
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
          className="w-full md:w-1/2 text-center md:text-left space-y-5 sm:space-y-6 px-3 sm:px-0"
        >
          {/* Name */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-primary tracking-tight leading-tight drop-shadow-sm">
            Adharsh D
          </h1>
          <p className="text-xl sm:text-2xl font-semibold bg-linear-to-r from-[#d1a054] to-[#8b6e4b] bg-clip-text text-transparent italic font-serif mt-2 tracking-wide drop-shadow-md">
            Software Developer
          </p>

          {/* Tagline */}
          <p className="text-base sm:text-lg md:text-xl italic text-muted-foreground max-w-md mx-auto md:mx-0">
            Crafting digital harmony where design, code, and music flow together.
          </p>

          {/* Description */}
          <p className="text-sm sm:text-base md:text-lg text-foreground/90 max-w-lg mx-auto md:mx-0 leading-relaxed">
            I’m a full-stack developer and a passionate music lover 🎸 who blending technology,
            art, and emotion to build web experiences that feel timeless. When not coding,
            you’ll find me learning guitar strings that echo the rhythm of creativity.
          </p>

          {/* Malayalam line for personal nostalgic touch */}
          <p className="text-sm sm:text-base italic text-primary/80 font-serif max-w-lg mx-auto md:mx-0 leading-relaxed">
            “സംഗീതവും കോഡും രണ്ടും എനിക്ക് മനസിലായിട്ടില്ല പക്ഷെ അതിനെ മനസിലാക്കാൻ ഉള്ള ശ്രമങ്ങൾ ഞാൻ നടത്താറുണ്ട് ”
            <span className="text-foreground/60"><br />One Chord or One line of code at a time.</span>
          </p>

          {/* Button */}
          <ResumeButton />
        </motion.div>

      </section>
    </main>
  );
}
