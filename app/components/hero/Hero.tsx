'use client';

import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

const containerVariants = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: 0.2,
        },
    },
};

const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: 'easeOut' },
    },
};

export default function Hero() {
    return (
        <motion.section
            className="min-h-screen w-full flex flex-col items-center justify-center px-6 text-center bg-black"
            variants={containerVariants}
            initial="hidden"
            animate="show"
        >
            {/* Heading */}
            <motion.h1
                variants={fadeInUp}
                className="font-redhat text-[2.5rem] sm:text-[4rem] md:text-[6rem] lg:text-[8rem] xl:text-[10rem] font-extrabold text-yellow-400 leading-tight drop-shadow-md"
            >
                ADHARSH D
            </motion.h1>

            {/* Subtext */}
            <motion.p
                variants={fadeInUp}
                className="mt-4 max-w-xl text-base sm:text-lg md:text-xl text-gray-300 tracking-wide font-light"
            >
                Full-stack web developer crafting scalable apps with clean design and a passion for code.
            </motion.p>

            {/* CTA Button */}
            <motion.div variants={fadeInUp} className="mt-8">
                <a
                    href="#under-construction"
                    className="inline-block px-6 py-3 text-sm sm:text-base font-medium text-black bg-yellow-400 rounded-full shadow-md hover:bg-yellow-300 transition"
                >
                    See My Work
                </a>
            </motion.div>

            {/* Social Icons */}
            <motion.div variants={fadeInUp} className="mt-6 flex gap-6 text-gray-300 text-2xl">
                <a
                    href="https://github.com/guitadharsh"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-yellow-400 transition"
                >
                    <FaGithub />
                </a>
                <a
                    href="https://www.linkedin.com/in/adharsh-d/details/experience"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-yellow-400 transition"
                >
                    <FaLinkedin />
                </a>
            </motion.div>
        </motion.section>
    );
}
