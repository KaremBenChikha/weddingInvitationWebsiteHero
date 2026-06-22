"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { CONTENT, COUPLE } from "@/lib/constants";

interface EnvelopeRevealProps {
  onDismiss: () => void;
}

type Stage = "idle" | "opening" | "revealed" | "dissolving";

export function EnvelopeReveal({ onDismiss }: EnvelopeRevealProps) {
  const reduce = useReducedMotion();
  const [stage, setStage] = useState<Stage>("idle");
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const handleTap = useCallback(() => {
    if (stage !== "idle") return;
    setStage("opening");
    setTimeout(() => setStage("revealed"), 500);
    setTimeout(() => {
      setStage("dissolving");
      document.body.style.overflow = "";
    }, 2200);
    setTimeout(() => {
      setVisible(false);
      setTimeout(onDismiss, 400);
    }, 2600);
  }, [stage, onDismiss]);

  const handleSkip = useCallback(() => {
    setVisible(false);
    document.body.style.overflow = "";
    setTimeout(onDismiss, 500);
  }, [onDismiss]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleTap();
      }
    },
    [handleTap]
  );

  if (reduce) {
    return (
      <AnimatePresence>
        {visible && (
          <motion.div
            className="fixed inset-0 z-[2147483647] flex items-center justify-center bg-[#faf8f4]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex flex-col items-center text-center px-6">
              <h1
                className="font-arabic-display text-5xl sm:text-6xl md:text-7xl gold-text text-shadow-gold mb-4"
                dir="rtl"
              >
                {COUPLE.arabic}
              </h1>
              <p className="font-display text-2xl md:text-3xl text-gold-accent/70 mb-8">
                {COUPLE.latin}
              </p>
              <button
                onClick={handleSkip}
                className="font-body text-sm text-text/60 hover:text-gold-accent transition-colors cursor-pointer"
              >
                {CONTENT.envelopeSkip} / {CONTENT.envelopeSkipAr}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[2147483647] flex flex-col items-center justify-center bg-[#faf8f4] overflow-hidden"
          animate={stage === "dissolving" ? { opacity: 0 } : { opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Gold particles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full"
                style={{
                  width: 2 + Math.random() * 3 + "px",
                  height: 2 + Math.random() * 3 + "px",
                  background: Math.random() > 0.5 ? "#d4a843" : "#e8d5a3",
                  left: Math.random() * 100 + "%",
                  top: Math.random() * 100 + "%",
                  opacity: 0.3 + Math.random() * 0.4,
                }}
                animate={{
                  y: [0, -(20 + Math.random() * 40)],
                  opacity: [0.3 + Math.random() * 0.4, 0],
                }}
                transition={{
                  duration: 3 + Math.random() * 4,
                  repeat: Infinity,
                  delay: Math.random() * 5,
                  ease: "linear",
                }}
              />
            ))}
          </div>

          {/* Glass curtain - left */}
          <motion.div
            className="absolute top-0 bottom-0 z-10 pointer-events-none"
            animate={{
              left: stage === "idle" ? "0%" : "-50%",
              right: stage === "idle" ? "50%" : "100%",
            }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            style={{
              background:
                "linear-gradient(90deg, rgba(250,248,244,0.97) 0%, rgba(250,248,244,0.65) 100%)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
            }}
          />

          {/* Glass curtain - right */}
          <motion.div
            className="absolute top-0 bottom-0 z-10 pointer-events-none"
            animate={{
              right: stage === "idle" ? "0%" : "-50%",
              left: stage === "idle" ? "50%" : "100%",
            }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            style={{
              background:
                "linear-gradient(270deg, rgba(250,248,244,0.97) 0%, rgba(250,248,244,0.65) 100%)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
            }}
          />

          {/* Bismillah Wax Seal */}
          <motion.div
            className="relative cursor-pointer z-20"
            onClick={handleTap}
            onKeyDown={handleKeyDown}
            role="button"
            tabIndex={0}
            aria-label="اضغط لفتح الدعوة — Ouvrir l'invitation"
            animate={
              stage === "idle"
                ? { scale: 1, opacity: 1 }
                : stage === "opening"
                  ? { scale: 1.12, opacity: 1 }
                  : { scale: 0, opacity: 0 }
            }
            transition={
              stage === "idle"
                ? { duration: 0 }
                : stage === "opening"
                  ? { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
                  : { duration: 0.6, ease: "easeInOut" }
            }
          >
            {/* Outer dark amber ring */}
            <div className="w-40 h-40 md:w-48 md:h-48 rounded-full bg-gradient-to-br from-amber-800 via-amber-700 to-amber-900 flex items-center justify-center shadow-[0_0_60px_rgba(212,168,67,0.25)]">
              {/* Inner ring */}
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-2 border-gold-accent/40 flex items-center justify-center bg-amber-950/30 backdrop-blur-sm">
                {/* Bismillah text */}
                <div className="text-center px-3">
                  <p
                    className="font-arabic-display text-xl md:text-2xl leading-relaxed tracking-wide gold-text text-shadow-gold"
                    dir="rtl"
                  >
                    بسم الله
                  </p>
                  <p
                    className="font-arabic-display text-lg md:text-xl leading-relaxed gold-text text-shadow-gold mt-0.5"
                    dir="rtl"
                  >
                    الرحمن
                  </p>
                  <p
                    className="font-arabic-display text-lg md:text-xl leading-relaxed gold-text text-shadow-gold"
                    dir="rtl"
                  >
                    الرحيم
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Revealed stage: chandelier + names */}
          <AnimatePresence>
            {stage === "revealed" && (
              <motion.div
                className="absolute inset-0 flex flex-col items-center justify-center px-6 z-20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                {/* Golden chandelier */}
                <motion.div
                  initial={{ y: -60, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    duration: 0.8,
                    delay: 0.1,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <svg
                    width="100"
                    height="90"
                    viewBox="0 0 100 90"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-gold-accent"
                  >
                    <line x1="50" y1="0" x2="50" y2="12" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M45 3C45 3 47 2 50 2C53 2 55 3 55 3" stroke="currentColor" strokeWidth="1.5" fill="none" />
                    <path d="M28 12L38 16L50 12L62 16L72 12" stroke="currentColor" strokeWidth="1.5" fill="none" />
                    <path d="M24 16C24 16 20 28 24 36" stroke="currentColor" strokeWidth="1" fill="none" />
                    <path d="M76 16C76 16 80 28 76 36" stroke="currentColor" strokeWidth="1" fill="none" />
                    <rect x="30" y="16" width="40" height="14" rx="2" fill="currentColor" fillOpacity="0.12" stroke="currentColor" strokeWidth="1" />
                    <rect x="34" y="20" width="32" height="7" rx="1.5" fill="currentColor" fillOpacity="0.08" />
                    <circle cx="18" cy="34" r="2.5" fill="currentColor" fillOpacity="0.5" />
                    <circle cx="32" cy="36" r="2.5" fill="currentColor" fillOpacity="0.5" />
                    <circle cx="50" cy="37" r="2.5" fill="currentColor" fillOpacity="0.7" />
                    <circle cx="68" cy="36" r="2.5" fill="currentColor" fillOpacity="0.5" />
                    <circle cx="82" cy="34" r="2.5" fill="currentColor" fillOpacity="0.5" />
                    <circle cx="50" cy="37" r="16" fill="currentColor" fillOpacity="0.06" />
                    <circle cx="50" cy="37" r="10" fill="currentColor" fillOpacity="0.04" />
                  </svg>
                </motion.div>

                {/* Couple names */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.4,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="text-center mt-4"
                >
                  <h1
                    className="font-arabic-display text-5xl md:text-7xl gold-text text-shadow-gold mb-3"
                    dir="rtl"
                  >
                    {COUPLE.arabic}
                  </h1>
                  <p className="font-display text-3xl md:text-4xl text-gold-accent/70">
                    {COUPLE.latin}
                  </p>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Hint text */}
          {stage === "idle" && (
            <motion.p
              className="absolute bottom-24 left-1/2 -translate-x-1/2 font-body text-sm text-text/50 animate-gold-shimmer z-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              {CONTENT.envelopeHint}
            </motion.p>
          )}

          {/* Skip button */}
          {stage === "idle" && (
            <motion.button
              className="absolute bottom-12 left-1/2 -translate-x-1/2 font-body text-xs text-text/40 hover:text-gold-accent transition-colors cursor-pointer z-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2 }}
              onClick={handleSkip}
            >
              {CONTENT.envelopeSkip} / {CONTENT.envelopeSkipAr}
            </motion.button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
