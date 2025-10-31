import type { Metadata } from "next";
import { EB_Garamond } from "next/font/google";
import "./globals.css";
import MusicBox from "@/components/music-box/MusicBox";
import ChellomAssistant from "@/components/chellom-ai/ChellomAssistant";
import FloatingBar from "@/components/floating-bar/FloatingBar";
import { siteMetadata } from "./constants";

const garamond = EB_Garamond({ subsets: ["latin"] });

export const metadata: Metadata = {
  ...siteMetadata,
  manifest: "/manifest.json",
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
