"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Send } from "lucide-react";

import catPosing from "@/public/assets/images/cat-standing.png";
import catSleeping from "@/public/assets/images/cat-sleeping.png";
import catAskingFood from "@/public/assets/images/cat-askingfood.png";
import catHappy from "@/public/assets/images/cat-happy.png";
import catStreching from "@/public/assets/images/cat-steching.png";

export default function ChellomAssistant() {
    const [pose, setPose] = useState<
        "sleeping" | "stretching" | "askingFood" | "happy" | "posing"
    >("sleeping");
    const [isOpen, setIsOpen] = useState(false);

    const poseImages: Record<typeof pose, any> = {
        sleeping: catSleeping,
        stretching: catStreching,
        askingFood: catAskingFood,
        happy: catHappy,
        posing: catPosing,
    };

    // 🐾 play sound (optional)
    const playSound = (src: string) => {
        const audio = new Audio(src);
        audio.volume = 0.4;
        audio.play();
    };

    // 😺 Animation flow
    const handleHover = () => {
        if (pose === "sleeping") {
            setPose("stretching");
            playSound("/sounds/stretch.mp3");

            setTimeout(() => {
                setPose("askingFood");
                playSound("/sounds/meow.mp3");
            }, 1500);

            setTimeout(() => {
                setPose("happy");
                playSound("/sounds/happy.mp3");
            }, 3500);

            setTimeout(() => {
                setPose("posing");
            }, 5500);
        }
    };

    return (
        <>
            {/* 🐈 Cat Button */}
            <motion.div
                className="fixed bottom-6 right-6 z-50 flex items-end justify-center cursor-pointer select-none"
                onMouseEnter={handleHover}
                onClick={() => setIsOpen(true)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                {/* Background circle */}
                <div className="relative w-20 h-20 rounded-full border-4 border-primary bg-card shadow-2xl overflow-visible">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={pose}
                            initial={{ opacity: 0, y: 20, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 20, scale: 0.9 }}
                            transition={{ duration: 0.4, ease: "easeInOut" }}
                            className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[140%] w-[140%] flex items-end justify-center"
                        >
                            <div className="relative w-[220px] h-[220px] translate-y-16 flex items-end justify-center overflow-visible">
                                <Image
                                    src={poseImages[pose]}
                                    alt="Chellom"
                                    fill
                                    className="object-contain drop-shadow-2xl pointer-events-none select-none"
                                    priority
                                />
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </motion.div>

            {/* 💬 Chat Modal */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 80 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 80 }}
                        transition={{ duration: 0.3 }}
                        className="fixed bottom-48 right-6 w-80 bg-card border border-border rounded-xl shadow-2xl flex flex-col overflow-hidden"
                    >
                        {/* Header */}
                        <div className="bg-primary text-primary-foreground px-4 py-3 font-semibold flex justify-between items-center">
                            <span>Chellom Assistant 🐱</span>
                            <button
                                className="text-sm opacity-80 hover:opacity-100"
                                onClick={() => setIsOpen(false)}
                            >
                                ✕
                            </button>
                        </div>

                        {/* Body */}
                        <div className="flex-1 p-3 text-sm text-muted-foreground bg-background">
                            Meow! I’m Chellom — your little cat companion 🐾
                            <br />I’ll help you when you need me!
                        </div>

                        {/* Footer */}
                        <div className="p-2 flex items-center gap-2 border-t border-border bg-background">
                            <input
                                type="text"
                                placeholder="Ask something..."
                                className="flex-1 bg-muted px-2 py-1 rounded-md text-sm focus:outline-none"
                            />
                            <button className="bg-primary text-primary-foreground p-2 rounded-md hover:bg-accent transition">
                                <Send size={16} />
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}



