"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { CONTENT } from "@/lib/constants";

interface EnvelopeRevealProps {
  onDismiss: () => void;
}

type Stage = "idle" | "opening" | "revealed" | "dissolving";

export function EnvelopeReveal({ onDismiss }: EnvelopeRevealProps) {
  const reduce = useReducedMotion();
  const [stage, setStage] = useState<Stage>("idle");
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.body.style.overflow = "hidden";
    }
    return () => {
      if (typeof document !== "undefined") {
        document.body.style.overflow = "";
      }
    };
  }, []);

  const handleTap = useCallback(() => {
    if (stage !== "idle") return;
    setStage("opening");
    setTimeout(() => setStage("revealed"), 1400);
    setTimeout(() => setStage("dissolving"), 3900);
    setTimeout(() => {
      setVisible(false);
      if (typeof document !== "undefined") {
        document.body.style.overflow = "";
      }
      setTimeout(onDismiss, 500);
    }, 4400);
  }, [stage, onDismiss]);

  const handleSkip = useCallback(() => {
    setVisible(false);
    if (typeof document !== "undefined") {
      document.body.style.overflow = "";
    }
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

  const sealVariants = {
    idle: { scale: 1, opacity: 1 },
    opening: {
      scale: [1, 1.3, 0],
      opacity: [1, 0.8, 0],
      transition: { duration: 0.6, ease: "easeInOut" as const },
    },
  };

  const topFlap = {
    idle: { rotateX: 0 },
    opening: {
      rotateX: -105,
      transition: { duration: 0.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] as const },
    },
  };
  const bottomFlap = {
    idle: { rotateX: 0 },
    opening: {
      rotateX: 105,
      transition: { duration: 0.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] as const },
    },
  };
  const leftFlap = {
    idle: { rotateY: 0 },
    opening: {
      rotateY: 105,
      transition: { duration: 0.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] as const },
    },
  };
  const rightFlap = {
    idle: { rotateY: 0 },
    opening: {
      rotateY: -105,
      transition: { duration: 0.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  const nameVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 24 },
    revealed: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  const dissolveBg = {
    idle: { opacity: 1 },
    dissolving: { opacity: 0, transition: { duration: 0.5 } },
  };

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
                عائشة و زكريا
              </h1>
              <p className="font-display text-2xl md:text-3xl text-gold-accent/70 mb-8">
                Aicha &amp; Zakaria
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
          className="fixed inset-0 z-[2147483647] flex flex-col items-center justify-center"
          variants={dissolveBg}
          animate={stage === "dissolving" ? "dissolving" : "idle"}
          style={{ background: "#faf8f4" }}
        >
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {Array.from({ length: 30 }).map((_, i) => (
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

          <div className="perspective-envelope relative w-[88vw] max-w-[340px] md:max-w-[380px] aspect-[3/4]">
            <div className="absolute inset-0 bg-surface/90 backdrop-blur-sm border border-gold-accent/25 rounded-sm flex items-center justify-center">
              <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-gold-accent/30" />
              <div className="absolute top-2 right-2 w-3 h-3 border-t border-r border-gold-accent/30" />
              <div className="absolute bottom-2 left-2 w-3 h-3 border-b border-l border-gold-accent/30" />
              <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-gold-accent/30" />
            </div>

            <motion.div
              className="absolute inset-0 z-0 flex flex-col items-center justify-center text-center px-4"
              variants={nameVariants}
              animate={stage === "revealed" ? "revealed" : "hidden"}
              initial="hidden"
            >
              <h1
                className="font-arabic-display text-4xl sm:text-5xl md:text-6xl gold-text text-shadow-gold mb-2 leading-normal"
                dir="rtl"
              >
                عائشة و زكريا
              </h1>
              <p className="font-display text-xl md:text-2xl text-gold-accent/60 mt-2">
                Aicha &amp; Zakaria
              </p>
            </motion.div>

            <motion.div
              className="envelope-flap absolute top-0 left-0 right-0 z-10 origin-top"
              style={{
                height: "50%",
                background: "linear-gradient(180deg, #f5efe4 0%, #ede5d5 100%)",
                clipPath: "polygon(0 0, 100% 0, 50% 100%)",
              }}
              variants={topFlap}
              animate={stage === "idle" ? "idle" : "opening"}
            />

            <motion.div
              className="envelope-flap absolute bottom-0 left-0 right-0 z-10 origin-bottom"
              style={{
                height: "50%",
                background: "linear-gradient(0deg, #f5efe4 0%, #ede5d5 100%)",
                clipPath: "polygon(0 100%, 100% 100%, 50% 0)",
              }}
              variants={bottomFlap}
              animate={stage === "idle" ? "idle" : "opening"}
            />

            <motion.div
              className="envelope-flap absolute top-0 left-0 bottom-0 z-10 origin-left"
              style={{
                width: "50%",
                background: "linear-gradient(90deg, #f5efe4 0%, #ede5d5 100%)",
                clipPath: "polygon(0 0, 100% 50%, 0 100%)",
              }}
              variants={leftFlap}
              animate={stage === "idle" ? "idle" : "opening"}
            />

            <motion.div
              className="envelope-flap absolute top-0 right-0 bottom-0 z-10 origin-right"
              style={{
                width: "50%",
                background: "linear-gradient(270deg, #f5efe4 0%, #ede5d5 100%)",
                clipPath: "polygon(100% 0, 100% 100%, 0 50%)",
              }}
              variants={rightFlap}
              animate={stage === "idle" ? "idle" : "opening"}
            />

            <motion.div
              className="absolute z-20 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer hover:scale-110 transition-transform duration-300"
              variants={sealVariants}
              animate={
                stage !== "idle" ? "opening" : "idle"
              }
              onClick={handleTap}
              onKeyDown={handleKeyDown}
              role="button"
              tabIndex={0}
              aria-label={CONTENT.envelopeLabel}
              style={{ pointerEvents: stage === "idle" ? "auto" : "none" }}
            >
              <svg
                width="48"
                height="48"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="24"
                  cy="24"
                  r="23"
                  fill="url(#seal-grad)"
                  stroke="#b8922e"
                  strokeWidth="1.5"
                />
                <path
                  d="M24 2L28.5 22.5L48 24L28.5 25.5L24 46L19.5 25.5L0 24L19.5 22.5L24 2Z"
                  fill="#e8d5a3"
                  opacity="0.7"
                />
                <path
                  d="M24 6L26.5 22.5L42 24L26.5 25.5L24 42L21.5 25.5L6 24L21.5 22.5L24 6Z"
                  fill="#d4a843"
                />
                <defs>
                  <radialGradient id="seal-grad" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#f0e0b0" />
                    <stop offset="60%" stopColor="#d4a843" />
                    <stop offset="100%" stopColor="#a67c22" />
                  </radialGradient>
                </defs>
              </svg>
            </motion.div>

            {stage === "idle" && (
              <motion.div
                className="absolute -bottom-14 left-1/2 -translate-x-1/2 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                <p className="font-body text-sm text-text/60 animate-gold-shimmer">
                  {CONTENT.envelopeHint}
                </p>
                <p className="font-arabic text-xs text-text/40 mt-0.5" dir="rtl">
                  {CONTENT.envelopeHintAr}
                </p>
              </motion.div>
            )}

            {stage === "idle" && (
              <motion.button
                className="absolute -bottom-28 left-1/2 -translate-x-1/2 font-body text-xs text-text/40 hover:text-gold-accent transition-colors cursor-pointer"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
                onClick={handleSkip}
              >
                {CONTENT.envelopeSkip}
              </motion.button>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
