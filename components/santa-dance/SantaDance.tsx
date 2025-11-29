"use client";
import Image from "next/image";
import santaGif from "@/public/assets/video/santa.gif";

const SantaDance = () => {
  return (
    <div
      className="pointer-events-none fixed bottom-0 right-10 z-50"
    >
      <Image
        src={santaGif}
        alt="Dancing Santa"
        width={300}
        height={300}
        unoptimized
        className="select-none"
      />
    </div>
  );
};

export default SantaDance;
