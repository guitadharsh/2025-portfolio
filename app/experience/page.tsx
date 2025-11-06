"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ExperienceCard from "./ExperienceCard";
import ExperienceModal from "./ExperienceModal";
import { experiences } from "../constants";

export default function ExperienceSection() {
  const [selected, setSelected] = useState<any>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Track scroll position to toggle arrows visibility
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const handleScroll = () => {
      setCanScrollLeft(el.scrollLeft > 0);
      setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
    };

    el.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => el.removeEventListener("scroll", handleScroll);
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.clientWidth * 0.8;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      id="experience"
      className="py-20 text-[#3a2f29] relative overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-6 relative">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-serif text-primary">
            Life Experiences
          </h2>
          <p className="text-sm md:text-base text-muted-foreground mt-2 font-light italic">
            Nostalgically, here I’m dropping some of the most memorable moments from the past decade of my life.
          </p>
        </div>


        {/* Arrows */}
        {canScrollLeft && (
          <button
            onClick={() => scroll("left")}
            className="cursor-pointer absolute left-0 top-[60%] -translate-y-2 z-10 bg-[#fff7eb]/80 hover:bg-[#f4e6cc] border border-[#d1bfa1]/50 p-2 rounded-full shadow-md transition"
          >
            <ChevronLeft className="w-5 h-5 text-[#6b553f]" />
          </button>
        )}
        {canScrollRight && (
          <button
            onClick={() => scroll("right")}
            className="cursor-pointer absolute right-0 top-[60%] -translate-y-2 z-10 bg-[#fff7eb]/80 hover:bg-[#f4e6cc] border border-[#d1bfa1]/50 p-2 rounded-full shadow-md transition"
          >
            <ChevronRight className="w-5 h-5 text-[#6b553f]" />
          </button>
        )}

        {/* Carousel */}
        <div
          ref={scrollRef}
          className="flex gap-6 pt-1 pb-1 overflow-x-scroll snap-x snap-mandatory px-2 scroll-smooth scrollbar-none"
        >
          {experiences?.map((exp) => (
            <motion.div
              key={exp.id}
              className="snap-center shrink-0 w-[260px] sm:w-[320px]"
            >
              <ExperienceCard data={exp} onClick={() => setSelected(exp)} />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Popup Modal */}
      <AnimatePresence>
        {selected && (
          <ExperienceModal data={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}
