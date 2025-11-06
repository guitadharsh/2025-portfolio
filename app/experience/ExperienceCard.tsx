"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function ExperienceCard({
  data,
  onClick,
}: {
  data: any;
  onClick: () => void;
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
      onClick={onClick}
      className="cursor-pointer rounded-2xl overflow-hidden bg-[#fff7eb]/70 border border-[#d9c5a0]/50 backdrop-blur-sm shadow-md hover:shadow-lg transition-all"
    >
      <div className="relative w-full h-44">
        <Image
          src={data.image}
          alt={data.title}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg text-[#5b4636]">{data.title}</h3>
        <p className="text-sm italic text-[#8b735a]">{data.subtitle}</p>
        <p className="text-xs mt-1 text-[#7b6a57]">{data.year}</p>
      </div>
    </motion.div>
  );
}
