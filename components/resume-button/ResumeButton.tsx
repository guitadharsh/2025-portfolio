import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ResumeButton() {
  return (
    <div className="flex justify-center md:justify-start group" title="Click to download my resume">
      <Link href="/assets/docs/resume.pdf" download>
        <Button
          size="lg"
          className="relative bg-primary text-primary-foreground hover:bg-accent/90 transition-all rounded-md shadow-md text-sm sm:text-base md:text-lg px-6 sm:px-8 overflow-hidden"
        >
          <span className="relative z-10 font-serif tracking-wide">
            Resume Scroll
          </span>

          {/* Vintage shimmer effect */}
          <span className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-pulse" />
        </Button>
      </Link>
    </div>
  );
}
