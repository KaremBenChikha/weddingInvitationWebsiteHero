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
    setTimeout(() => setStage("revealed"), 700);
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
          className="fixed inset-0 z-[2147483647] flex flex-col items-center justify-center bg-[#faf8f4]"
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

          {/* Bismillah Wax Seal */}
          <motion.div
            className="relative cursor-pointer"
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
            {/* Outer gold ring */}
            <div className="w-64 h-64 md:w-72 md:h-72 rounded-full bg-gradient-to-br from-gold-accent/90 via-gold-light to-gold-accent/80 flex items-center justify-center shadow-[0_0_80px_rgba(212,168,67,0.15)]">
              {/* Inner ring */}
              <div className="w-56 h-56 md:w-64 md:h-64 rounded-full border-2 border-gold-accent/30 flex items-center justify-center bg-surface/5 backdrop-blur-sm">
                {/* Bismillah text */}
                <div className="text-center px-4">
                  <p
                    className="font-arabic-display text-3xl md:text-4xl leading-relaxed tracking-wide gold-text text-shadow-gold"
                    dir="rtl"
                  >
                    بسم الله
                  </p>
                  <p
                    className="font-arabic-display text-2xl md:text-3xl leading-relaxed gold-text text-shadow-gold mt-1"
                    dir="rtl"
                  >
                    الرحمن
                  </p>
                  <p
                    className="font-arabic-display text-2xl md:text-3xl leading-relaxed gold-text text-shadow-gold"
                    dir="rtl"
                  >
                    الرحيم
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Couple name reveal after seal opens */}
          <AnimatePresence>
            {stage === "revealed" && (
              <motion.div
                className="absolute inset-0 flex flex-col items-center justify-center px-6"
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              >
                <h1
                  className="font-arabic-display text-5xl md:text-7xl gold-text text-shadow-gold mb-4 text-center"
                  dir="rtl"
                >
                  {COUPLE.arabic}
                </h1>
                <p className="font-display text-3xl md:text-4xl text-gold-accent/70 text-center">
                  {COUPLE.latin}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Hint text */}
          {stage === "idle" && (
            <motion.p
              className="absolute bottom-24 left-1/2 -translate-x-1/2 font-body text-sm text-text/50 animate-gold-shimmer"
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
              className="absolute bottom-12 left-1/2 -translate-x-1/2 font-body text-xs text-text/40 hover:text-gold-accent transition-colors cursor-pointer"
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
