"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function ExperienceModal({
  data,
  onClose,
}: {
  data: any;
  onClose: () => void;
}) {
  return (
    <motion.div
      className="fixed inset-0 flex justify-center items-center bg-black/50 backdrop-blur-sm z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="bg-[#fffaf3] rounded-3xl shadow-xl overflow-hidden max-w-3xl w-[90%] flex flex-col md:flex-row"
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", stiffness: 120, damping: 12 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image */}
        <div className="relative w-full md:w-1/1 h-56 md:h-auto">
          <Image
            src={data.image}
            alt={data.title}
            fill
            className="object-cover"
          />
        </div>

        {/* Text */}
        <div className="p-6 flex flex-col justify-center">
          <h3 className="text-2xl font-bold text-[#5b4636]">{data.title}</h3>
          <p className="text-md italic text-[#7a6550]">{data.subtitle}</p>
          <p className="text-sm text-[#8b735a] mt-1">{data.year}</p>
          <p className="text-sm text-[#4a3d31] mt-4 leading-relaxed">
            {data.description}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}
