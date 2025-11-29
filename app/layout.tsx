import type { Metadata } from "next";
import Script from "next/script";
import { EB_Garamond } from "next/font/google";
import "./globals.css";
import MusicBox from "@/components/music-box/MusicBox";
import ChellomAssistant from "@/components/chellom-ai/ChellomAssistant";
import FloatingBar from "@/components/floating-bar/FloatingBar";
import { siteMetadata } from "./constants";
import SnowFall from "@/components/snow-fall/SnowFall"

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

      {/* ✅ Google Analytics Scripts */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-C4MZKRLXK0"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-C4MZKRLXK0');
        `}
      </Script>

      <body className="relative bg-[#FAF3E0] text-[#2E2B29] min-h-screen overflow-x-hidden">
        {children}
        <MusicBox />
        <SnowFall />
        <FloatingBar />
        {/* <ChellomAssistant /> */}
      </body>
    </html>
  );
}
