"use client";

import { motion } from "framer-motion";
import { Home, About, Contact } from "@/app";

const sections = [
  { id: "home", Component: Home },
  { id: "about", Component: About },
  { id: "contact", Component: Contact },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

export default function App() {
  return (
    <main
      id="scroll-container"
      className="h-screen w-full overflow-y-scroll overflow-x-hidden snap-y snap-mandatory scroll-smooth scrollbar-hide"
    >
      {sections.map(({ id, Component }) => (
        <motion.section
          key={id}
          id={id}
          className="h-screen w-full snap-start flex justify-center items-center px-4"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <Component />
        </motion.section>
      ))}
    </main>
  );
}
