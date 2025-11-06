"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Home, User, Briefcase, Mail, Menu, X } from "lucide-react";

const FloatingBar = () => {
    const [activeSection, setActiveSection] = useState("home");
    const [menuOpen, setMenuOpen] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    // Load sound once
    useEffect(() => {
        audioRef.current = new Audio("/assets/audio/bubble.mp3");
        if (audioRef.current) {
            audioRef.current.volume = 0.2;
        }
    }, []);

    const playSound = () => {
        if (audioRef.current) {
            audioRef.current.currentTime = 0;
            audioRef.current.play().catch(() => {
            });
        }
    };

    const navItems = [
        { id: "home", label: "Home", icon: Home },
        { id: "about", label: "About", icon: User },
        { id: "experience", label: "Experience", icon: Briefcase },
        { id: "contact", label: "Contact", icon: Mail },
    ];

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                const visible = entries
                    .filter((entry) => entry.isIntersecting)
                    .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

                if (visible.length > 0) {
                    const newSection = visible[0].target.id;
                    setActiveSection((prev) => {
                        if (prev !== newSection) {
                            playSound();
                        }
                        return newSection;
                    });
                }
            },
            {
                threshold: [0.4, 0.6],
            }
        );

        navItems.forEach(({ id }) => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    const scrollToSection = (id: string) => {
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };

    return (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 select-none">
            {/* Desktop View */}
            <div className="hidden sm:flex items-center gap-4 px-4 py-2 bg-[#f5e6c8]/90 border border-[#c4a574]/50 rounded-full shadow-md font-serif backdrop-blur-md">
                {navItems.map(({ id, label, icon: Icon }) => (
                    <motion.button
                        key={id}
                        onClick={() => scrollToSection(id)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm transition-all cursor-pointer
            ${activeSection === id
                                ? "bg-[#e1c699] text-[#3b2f2f] border border-[#b89664] shadow-inner"
                                : "hover:bg-[#f2d9b6]/70 text-[#3b2f2f]/80"
                            }`}
                    >
                        <Icon size={16} />
                        <span>{label}</span>
                    </motion.button>
                ))}
            </div>

            {/* Mobile View */}
            <div className="md:hidden fixed bottom-155 left-26 z-50 flex flex-col items-end">
                <motion.button
                    onClick={() => setMenuOpen((prev) => !prev)}
                    whileTap={{ scale: 0.9 }}
                    className="w-12 h-12 rounded-full bg-[#f5e6c8] border border-[#b89664] shadow-lg flex justify-center items-center text-[#3b2f2f] cursor-pointer"
                >
                    {menuOpen ? <X size={22} /> : <Menu size={22} />}
                </motion.button>

                <AnimatePresence>
                    {menuOpen && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0, y: -10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0, y: -10 }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                            className="absolute top-16 right-0 flex flex-col items-end gap-3"
                        >
                            {navItems.map(({ id, icon: Icon }) => (
                                <motion.button
                                    key={id}
                                    onClick={() => scrollToSection(id)}
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    className={`w-12 h-12 rounded-full flex justify-center items-center border shadow-md transition-all cursor-pointer
                  ${activeSection === id
                                            ? "bg-[#e1c699] border-[#b89664] text-[#3b2f2f]"
                                            : "bg-[#f9edcc]/90 border-[#c4a574]/50 text-[#3b2f2f]/70 hover:bg-[#f2d9b6]"
                                        }`}
                                >
                                    <Icon size={18} />
                                </motion.button>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default FloatingBar;
