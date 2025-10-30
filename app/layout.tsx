import type { Metadata } from "next";
import { EB_Garamond } from "next/font/google";
import "./globals.css";
import MusicBox from "@/components/music-box/MusicBox";
import ChellomAssistant from "@/components/chellom-ai/ChellomAssistant";
import FloatingBar from "@/components/floating-bar/FloatingBar";

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
        {children}
        <MusicBox />
        <FloatingBar />
        <ChellomAssistant />
      </body>
    </html>
  );
}
