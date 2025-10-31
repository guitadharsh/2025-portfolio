import type { Metadata } from "next";

// YouTube Tracks
export const youtubeRadioLinks = [
  { url: "https://www.youtube.com/watch?v=kHGGf1qk6lI", start: 10, end: 100 },
  { url: "https://www.youtube.com/watch?v=bF6bFy5oUno", start: 10, end: 100 },
  { url: "https://www.youtube.com/watch?v=FRx6rQ606oE", start: 10, end: 100 },
  { url: "https://www.youtube.com/watch?v=ibz-xC1YCgk", start: 10, end: 100 },
  { url: "https://www.youtube.com/watch?v=nKhh3aqNRWA", start: 10, end: 100 },
];

// Meta data for seo
export const siteMetadata: Metadata = {
  title: "Adharsh D | Software Developer & Designer",
  description:
    "Portfolio of Adharsh D — Full-stack software developer and creative technologist from Kerala, India. Crafting digital harmony where design, code, and music flow together.",
  keywords: [
    "Adharsh D",
    "Software Developer Kerala",
    "Full Stack Developer",
    "Next.js Developer",
    "MERN Stack Portfolio",
  ],
  authors: [{ name: "Adharsh D" }],
  creator: "Adharsh D",
  publisher: "Adharsh D",
  metadataBase: new URL("https://adharshd.in"),
  openGraph: {
    title: "Adharsh D | Software Developer | MERN | Next js",
    description:
      "Creative full-stack developer building timeless web experiences that blend technology and art.",
    url: "https://adharshd.in",
    siteName: "Adharsh D Portfolio",
    images: [
      {
        url: "images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Adharsh D Portfolio Preview",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Adharsh D | Software Developer",
    description:
      "Full-stack developer & creative technologist from Kerala. Let’s build something beautiful.",
    images: ["images/og-image.png"],
    creator: "@adharshd",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    canonical: "https://adharshd.in",
  },
};
