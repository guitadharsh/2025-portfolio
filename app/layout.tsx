import type { Metadata } from "next";
import { EB_Garamond } from "next/font/google";
import "./globals.css";
import { motion } from "framer-motion";
import MusicBox from "@/components/music-box/MusicBox";
import ChellomAssistant from "@/components/chellom-ai/ChellomAssistant";

const garamond = EB_Garamond({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Adharsh D | Portfolio",
  description:
    "Software Developer based in Kerala who thrives to build ideas into tangible experiences using technology.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={garamond.className}>
      <body className="relative bg-[#FAF3E0] text-[#2E2B29] min-h-screen overflow-x-hidden">
        <div className="absolute top-6 right-6 md:top-10 md:right-16 z-20 scale-75 sm:scale-90 md:scale-100">
          <MusicBox />
        </div>
        {children}
        
        <ChellomAssistant />
      </body>
    </html>
  );
}
