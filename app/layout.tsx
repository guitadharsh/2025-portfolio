import type { Metadata } from "next";
import { EB_Garamond } from "next/font/google";
import "./globals.css";
import ChellomAssistant from "@/components/chellom-ai/ChellomAssistant";

const garamond = EB_Garamond({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Adharsh D | Portfolio",
  description: "Software Developer based on Kerala who thirives to build ideas to feelable things using tech stuffs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={garamond.className}>
      <body className="bg-[#FAF3E0] text-[#2E2B29]">
        {children}
        <ChellomAssistant />
      </body>
    </html>
  );
}
