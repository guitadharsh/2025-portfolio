import type { Metadata } from "next";
import exp1 from "@/public/assets/images/exp-1.png"
import exp2 from "@/public/assets/images/exp-2.png"
import exp3 from "@/public/assets/images/exp-3.png"
import exp4 from "@/public/assets/images/exp-4.png"
import exp5 from "@/public/assets/images/exp-5.png"
import exp6 from "@/public/assets/images/exp-6.png"
import exp7 from "@/public/assets/images/exp-7.png"
import exp8 from "@/public/assets/images/exp-8.png"
import exp9 from "@/public/assets/images/exp-9.png"

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

// Experience
export const experiences = [
  {
    id: 1,
    title: "Softnotions Technologies pvt Ltd",
    subtitle: "Software Engineer",
    year: "July 2024 - July 2025",
    image: exp1,
    description:
      "Softnotions was one of my major companies where I learned a proper, scientific way of working. They even gave me the opportunity to work for another company called Enfin—thank you for believing in my skill set and outsourcing me! I loved the teammates, the extra activities, games, and events. I even unlocked a new skill: learning to play pool. Thank you to all who supported me during my tenure!",
  },
  {
    id: 2,
    title: "Enfin Technologies",
    subtitle: "Contract Project via Softnotions",
    year: "Nov 2024 - July 2025",
    image: exp2,
    description:
      "Amazing team and a great project in Next.js. I played as a frontend developer, working for the first time under such a big team on a single product. I managed the authentication and authorization modules of a multi-tenant SaaS product. The late nights and tight delivery schedules truly showed me my real boundaries and what I was capable of.",
  },
  {
    id: 3,
    title: "Scipy Technologies",
    subtitle: "MERN stack developer",
    year: "July 2022 - July 2024",
    image: exp4,
    description:
      "Scipy Technologies was the first firm that believed in my skill set when I had 0 experience. Thank you for that amazing opportunity, which became the kick-start for my career as a software developer.",
  },
  {
    id: 4,
    title: "Maptell Geosystems",
    subtitle: "Contract Project via Scipy Technologies",
    year: "Dec 2023 - June 2024",
    image: exp3,
    description:
      "Maptell was a career-changing firm where I got an opportunity via Scipy. I worked on a map-based project as a frontend developer, diving deep into Mapbox and Deck.gl and playing with different types of map tiles. A huge thanks to Jithesh Chettan for the mentorship and support during difficult times—that guidance became real fuel for the rest of my career.",
  },
  {
    id: 5,
    title: "Self Learning",
    subtitle: "Web development",
    year: "2021 - 2022",
    image: exp5,
    description:
      "This was the period where I researched many courses and careers. The pain of food delivery under the scorching sun gave me enough motivation to unlock a new skill and land on a dream job. Huge thanks to my dad for gifting me this laptop! My dedication to touch-typing might also be a reason for this career path! 😂",
  },
  {
    id: 6,
    title: "Part time Jobs (Food Delivery & Sales)",
    subtitle: "Side Hustles",
    year: "2021 - 2022",
    image: exp6,
    description:
      "Working for Zomato, Swiggy, and as a medical firm salesperson drove me to pursue a long-term, high-paying job. I still remember those days under the sunlight; it truly taught me the value of every rupee, where a normal delivery only earned me ₹20-30.",
  },
  {
    id: 7,
    title: "Graduation",
    subtitle: "Kerala University",
    year: "July 2018 - Mar 2021",
    image: exp7,
    description:
      "A time filled with amazing memories, friends, and events. COVID-19 ate up a year and we had to exit college during the pandemic, but I still cherish the good times. Honestly, I wasn't that interested in the subjects back then, but now I dream of going back to learn everything properly and understand the real value of each topic.",
  },
  {
    id: 8,
    title: "Higher Secondary (VHSE)",
    subtitle: "Computer Science and Information Technologoy",
    year: "July 2016 - Mar 2018",
    image: exp8,
    description:
      "This chapter felt like the beautiful, unrestricted days of my life, a true relief after the highly structured years before. If I could, I'd get stuck in this loop to relive and enjoy them again and again. Every day was lovable, filled with true friends who still carry that 18-year-old vibe. A special shout-out to Lisa Teacher, our class tutor, who was truly amazing and supportive—her teachings are something I remember throughout my life. It was a time of tasting freedom, forging true friendships, and experiencing the sweet, defining emotions of a first serious crush that perfectly captured that memorable period of growing up."
  },
  {
    id: 9,
    title: "10th Kairali Vidya Bhavan",
    subtitle: "CBSE",
    year: "July 2016 - Mar 2018",
    image: exp9,
    description:
      "My initial years weren't my most memorable, as I didn't connect with many people. But in 10th grade, I joined the school's Band troop, which changed everything! I made a lot of cherished memories there, and the photo I've used above is the one and only memory I often revisit from those times.",
  },
];
