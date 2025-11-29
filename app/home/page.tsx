"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import ResumeButton from "@/components/resume-button/ResumeButton";

export default function Home() {
  return (
    <main className="relative min-h-screen flex flex-col justify-center items-center text-foreground overflow-hidden">
      {/* 🖼 HERO SECTION */}
      <section
        className="
          flex flex-col md:flex-row items-center justify-center
          w-full px-4 sm:px-6 md:px-10 lg:px-16
          py-8 sm:py-10 md:py-20 lg:py-24
          gap-6 sm:gap-8 md:gap-14 lg:gap-20
          max-w-6xl mx-auto
        "
      >
        {/* LEFT SIDE - Hero Image */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="w-[70%] sm:w-[320px] md:w-[380px] lg:w-[460px] flex justify-center md:justify-end"
        >
          <div className="relative w-full aspect-[4/5] overflow-hidden rounded-xl border border-border bg-card shadow-[0_6px_30px_rgba(0,0,0,0.2)]">
            <Image
              src="/assets/images/actor-5.png"
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
          className="
            w-full md:w-1/2
            text-center md:text-left
            space-y-3 sm:space-y-4 md:space-y-6
            px-2 sm:px-0
          "
        >
          {/* Name + Subtitle Closer Together */}
          <div className="space-y-1 sm:space-y-1.5">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-primary leading-tight tracking-tight">
              Adharsh D
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl font-semibold bg-gradient-to-r from-[#d1a054] to-[#8b6e4b] bg-clip-text text-transparent italic font-serif tracking-wide">
              Software Developer
            </p>
          </div>

          {/* Tagline (hidden on mobile to save space) */}
          <p className="hidden sm:block text-base md:text-lg italic text-muted-foreground max-w-md mx-auto md:mx-0 leading-snug">
            Crafting digital harmony where design, code, and music flow together.
          </p>

          {/* Description (shortened on mobile) */}
          <p className="text-sm sm:text-base text-foreground/90 max-w-lg mx-auto md:mx-0 leading-relaxed">
            <span className="sm:hidden">
              I’m a full-stack developer & music lover blending creativity and code.
            </span>
            <span className="hidden sm:inline">
              I’m a full-stack developer and a passionate music lover blending
              technology, art, and emotion to build web experiences that feel timeless.
              When not coding, I’m learning guitar strings that echo the rhythm of creativity.
            </span>
          </p>

          {/* Malayalam line */}
          <p className="text-sm sm:text-base italic text-primary/80 font-serif max-w-lg mx-auto md:mx-0 leading-relaxed">
            “സംഗീതവും കോഡും രണ്ടും എനിക്ക് മനസിലായിട്ടില്ല പക്ഷെ അതിനെ മനസിലാക്കാൻ ഉള്ള ശ്രമങ്ങൾ ഞാൻ നടത്താറുണ്ട്”
            <br />
            <span className="text-foreground/60">
              One chord or one line of code at a time.
            </span>
          </p>

          {/* Button (raised slightly) */}
          <div className="flex justify-center md:justify-end">
            <ResumeButton />
          </div>

        </motion.div>
      </section>
    </main>
  );
}
