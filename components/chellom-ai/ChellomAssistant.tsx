"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Send } from "lucide-react";

// 🐱 Cat poses
import catPosing from "@/public/assets/images/cat-standing.png";
import catSleeping from "@/public/assets/images/cat-sleeping.png";
import catAskingFood from "@/public/assets/images/cat-askingfood.png";
import catHappy from "@/public/assets/images/cat-happy.png";
import catStretching from "@/public/assets/images/cat-steching.png";
import catAngryPose from "@/public/assets/images/cat-angry.png";

// 🎵 Sounds
const catMeow = "/assets/audio/cat-meow.mp3";
const catAngry = "/assets/audio/cat-angry.mp3";
const catPurr = "/assets/audio/cat-purr.mp3";

export default function ChellomAssistant() {
  const [pose, setPose] = useState<
    "sleeping" | "stretching" | "askingFood" | "happy" | "posing" | "angry"
  >("posing");
  const [isOpen, setIsOpen] = useState(false);
  const [messageCount, setMessageCount] = useState(0);
  const [messages, setMessages] = useState<{ from: "user" | "cat"; text: string }[]>([]);
  const [input, setInput] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const modalRef = useRef<HTMLDivElement | null>(null);
  const purrAudioRef = useRef<HTMLAudioElement | null>(null);

  const poseImages: Record<typeof pose, any> = {
    sleeping: catSleeping,
    stretching: catStretching,
    askingFood: catAskingFood,
    happy: catHappy,
    posing: catPosing,
    angry: catAngryPose,
  };

  const randomMeows = [
    "meow meow meow~ 😺",
    "mew meow meoww!",
    "meow? meooow 😸",
    "mew meowww meow meow!",
    "mow meow~ meew~",
    "meow meow mew meow!",
    "mew? meow. meow!",
    "meooow~ mew mew 😽",
    "mew meowww!",
    "meow meow~ meeeow 🐾",
  ];

  const angryMeow = "MEOWWW!!! 😾 (Chellom is angry now...)";

  // 🎵 Play sound helper
  const playSound = (sound: string): Promise<void> => {
    return new Promise((resolve) => {
      const audio = new Audio(sound);
      audio.volume = 0.2;
      audio.play();
      audio.onended = () => resolve();
    });
  };

  // 💬 Send message handler
  const handleSend = async () => {
    if (!input.trim() || pose === "sleeping") return;

    const newMessages = [...messages, { from: "user" as const, text: input.trim() }];
    setMessages(newMessages);
    setInput("");
    setIsThinking(true);

    if (messageCount === 0) {
      // 🐱 First response → normal meow
      setTimeout(() => {
        setIsThinking(false);
        const randomResponse = randomMeows[Math.floor(Math.random() * randomMeows.length)];
        setMessages((prev) => [...prev, { from: "cat" as const, text: randomResponse }]);
        playSound(catMeow);
        setMessageCount(1);
      }, 1200);
    } else {
      // 😾 Second response → angry mode
      setIsThinking(false);
      setMessages((prev) => [...prev, { from: "cat" as const, text: angryMeow }]);
      setPose("angry");

      // Wait for angry sound to finish, then sleep
      await playSound(catAngry);

      // After sound ends, close modal & make cat sleep
      setIsOpen(false);
      setPose("sleeping");
      setMessageCount(0);
      setMessages([]);
    }
  };

  // 🧠 Handle Enter key
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSend();
  };

  // 😺 Play purr sound on hover
  const playPurrSound = () => {
    if (!purrAudioRef.current) {
      const audio = new Audio(catPurr);
      audio.volume = 0.15;
      purrAudioRef.current = audio;
    }
    purrAudioRef.current.currentTime = 0;
    purrAudioRef.current.play();
  };

  // ✋ Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    else document.removeEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <>
      {/* 🐱 Floating Cat Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50 flex items-end justify-center cursor-pointer select-none"
        onClick={() => pose !== "sleeping" && setIsOpen(true)}
        onMouseEnter={() => {
          if (pose !== "sleeping" && !isHovering) {
            setIsHovering(true);
            playPurrSound();
          }
        }}
        onMouseLeave={() => setIsHovering(false)}
        whileHover={{ scale: pose !== "sleeping" ? 1.08 : 1, rotate: 2 }}
        whileTap={{ scale: pose !== "sleeping" ? 0.95 : 1 }}
      >
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
            ref={modalRef}
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 80 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-48 right-6 w-80 bg-card border border-border rounded-xl shadow-2xl flex flex-col overflow-hidden z-[60]"
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

            {/* Chat Body */}
            <div className="flex-1 p-3 text-sm text-muted-foreground bg-background overflow-y-auto max-h-60 space-y-2">
              {messages.length === 0 && !isThinking && (
                <p className="text-muted-foreground/70">
                  Meow! I’m Chellom — your little cat companion 🐾
                </p>
              )}

              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`px-2 py-1 rounded-md ${
                    m.from === "user"
                      ? "bg-primary text-primary-foreground self-end"
                      : "bg-muted text-foreground"
                  }`}
                >
                  {m.text}
                </div>
              ))}

              {isThinking && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-1 text-muted-foreground text-lg"
                >
                  <motion.span
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ repeat: Infinity, duration: 1 }}
                  >
                    •
                  </motion.span>
                  <motion.span
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ repeat: Infinity, duration: 1, delay: 0.3 }}
                  >
                    •
                  </motion.span>
                  <motion.span
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ repeat: Infinity, duration: 1, delay: 0.6 }}
                  >
                    •
                  </motion.span>
                </motion.div>
              )}
            </div>

            {/* Footer */}
            <div className="p-2 flex items-center gap-2 border-t border-border bg-background">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={
                  pose === "sleeping"
                    ? "😴 Chellom is sleeping..."
                    : "Ask something..."
                }
                className="flex-1 bg-muted px-2 py-1 rounded-md text-sm focus:outline-none disabled:opacity-50"
                disabled={pose === "sleeping"}
              />
              <button
                onClick={handleSend}
                disabled={pose === "sleeping"}
                className="bg-primary text-primary-foreground p-2 rounded-md hover:bg-accent transition disabled:opacity-50"
              >
                <Send size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
