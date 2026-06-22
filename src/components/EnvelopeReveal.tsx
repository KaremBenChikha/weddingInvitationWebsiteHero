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
    setTimeout(() => setStage("revealed"), 300);
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
                "linear-gradient(90deg, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.2) 100%)",
              backdropFilter: "blur(28px) saturate(140%)",
              WebkitBackdropFilter: "blur(28px) saturate(140%)",
              borderRight: "1px solid rgba(212,168,67,0.25)",
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
                "linear-gradient(270deg, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.2) 100%)",
              backdropFilter: "blur(28px) saturate(140%)",
              WebkitBackdropFilter: "blur(28px) saturate(140%)",
              borderLeft: "1px solid rgba(212,168,67,0.25)",
            }}
          />

          {/* Gold parting line — where curtain edges meet */}
          {stage === "idle" && (
            <motion.div
              className="absolute top-0 bottom-0 left-1/2 w-px z-10 pointer-events-none"
              style={{
                background:
                  "linear-gradient(180deg, transparent 15%, rgba(212,168,67,0.4) 30%, rgba(212,168,67,0.7) 45%, rgba(212,168,67,0.95) 50%, rgba(212,168,67,0.7) 55%, rgba(212,168,67,0.4) 70%, transparent 85%)",
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            />
          )}
          {stage === "opening" && (
            <motion.div
              className="absolute top-0 bottom-0 left-1/2 w-px z-10 pointer-events-none"
              style={{
                background:
                  "linear-gradient(180deg, transparent 15%, rgba(212,168,67,0.4) 30%, rgba(212,168,67,0.7) 45%, rgba(212,168,67,0.95) 50%, rgba(212,168,67,0.7) 55%, rgba(212,168,67,0.4) 70%, transparent 85%)",
              }}
              animate={{ opacity: [1, 0], scaleX: [1, 2] }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          )}

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
            {/* Ivory wax seal body — gold-text lettering */}
            <div className="w-40 h-40 md:w-48 md:h-48 rounded-full bg-gradient-to-br from-[#faf5ed] via-[#f5efe4] to-[#ede0cc] flex items-center justify-center shadow-[0_0_40px_rgba(212,168,67,0.35),0_0_80px_rgba(212,168,67,0.15),inset_0_0_30px_rgba(0,0,0,0.06)] border-2 border-gold-accent/30">
              {/* Inner stamp ring — debossed into wax */}
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-2 border-gold-accent/25 flex items-center justify-center bg-[#ede0cc]/30 shadow-[inset_0_2px_8px_rgba(0,0,0,0.08)]">
                {/* Bismillah text — gold lettering on ivory wax */}
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
                  initial={{ y: -30, opacity: 0, scale: 0.9 }}
                  animate={{ y: 0, opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.7,
                    delay: 0.05,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <svg
                    width="140"
                    height="200"
                    viewBox="0 0 140 200"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-gold-accent"
                  >
                    <line x1="70" y1="0" x2="70" y2="20" stroke="currentColor" strokeWidth="1.5" />
                    <line x1="70" y1="20" x2="70" y2="25" stroke="currentColor" strokeWidth="3" />
                    <path d="M40 25 Q55 15 70 25 Q85 15 100 25" stroke="currentColor" strokeWidth="1.5" fill="none" />
                    <path d="M40 25 Q40 35 50 38" stroke="currentColor" strokeWidth="1" fill="none" />
                    <path d="M100 25 Q100 35 90 38" stroke="currentColor" strokeWidth="1" fill="none" />
                    <ellipse cx="70" cy="30" rx="35" ry="5" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.08" />
                    <ellipse cx="70" cy="30" rx="25" ry="3" stroke="currentColor" strokeWidth="0.5" fill="none" />
                    <line x1="45" y1="30" x2="45" y2="55" stroke="currentColor" strokeWidth="0.8" />
                    <line x1="95" y1="30" x2="95" y2="55" stroke="currentColor" strokeWidth="0.8" />
                    <line x1="55" y1="30" x2="55" y2="50" stroke="currentColor" strokeWidth="0.8" />
                    <line x1="85" y1="30" x2="85" y2="50" stroke="currentColor" strokeWidth="0.8" />
                    <line x1="70" y1="30" x2="70" y2="55" stroke="currentColor" strokeWidth="0.8" />
                    <path d="M30 55 Q30 70 40 80 L100 80 Q110 70 110 55" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.06" />
                    <path d="M35 55 Q35 65 42 75 L98 75 Q105 65 105 55" stroke="currentColor" strokeWidth="0.5" fill="none" />
                    <rect x="40" y="55" width="60" height="4" rx="2" stroke="currentColor" strokeWidth="1" fill="currentColor" fillOpacity="0.1" />
                    <rect x="45" y="62" width="50" height="3" rx="1.5" stroke="currentColor" strokeWidth="0.5" fill="none" />
                    <path d="M40 75 L38 85 L42 85 Z" fill="currentColor" fillOpacity="0.3" />
                    <path d="M100 75 L98 85 L102 85 Z" fill="currentColor" fillOpacity="0.3" />
                    <path d="M55 78 L53 86 L57 86 Z" fill="currentColor" fillOpacity="0.25" />
                    <path d="M85 78 L83 86 L87 86 Z" fill="currentColor" fillOpacity="0.25" />
                    <path d="M70 80 L68 90 L72 90 Z" fill="currentColor" fillOpacity="0.35" />
                    <path d="M25 55 Q15 70 20 95" stroke="currentColor" strokeWidth="1.2" fill="none" />
                    <path d="M115 55 Q125 70 120 95" stroke="currentColor" strokeWidth="1.2" fill="none" />
                    <path d="M35 60 Q28 75 30 90" stroke="currentColor" strokeWidth="1" fill="none" />
                    <path d="M105 60 Q112 75 110 90" stroke="currentColor" strokeWidth="1" fill="none" />
                    <ellipse cx="70" cy="82" rx="30" ry="4" stroke="currentColor" strokeWidth="1" fill="currentColor" fillOpacity="0.08" />
                    <circle cx="20" cy="97" r="4" fill="currentColor" fillOpacity="0.5" stroke="currentColor" strokeWidth="0.5" />
                    <circle cx="30" cy="92" r="3.5" fill="currentColor" fillOpacity="0.4" stroke="currentColor" strokeWidth="0.5" />
                    <circle cx="50" cy="88" r="3.5" fill="currentColor" fillOpacity="0.5" stroke="currentColor" strokeWidth="0.5" />
                    <circle cx="70" cy="90" r="4" fill="currentColor" fillOpacity="0.7" stroke="currentColor" strokeWidth="0.5" />
                    <circle cx="90" cy="88" r="3.5" fill="currentColor" fillOpacity="0.5" stroke="currentColor" strokeWidth="0.5" />
                    <circle cx="110" cy="92" r="3.5" fill="currentColor" fillOpacity="0.4" stroke="currentColor" strokeWidth="0.5" />
                    <circle cx="120" cy="97" r="4" fill="currentColor" fillOpacity="0.5" stroke="currentColor" strokeWidth="0.5" />
                    <circle cx="20" cy="97" r="10" fill="currentColor" fillOpacity="0.08" />
                    <circle cx="70" cy="90" r="14" fill="currentColor" fillOpacity="0.1" />
                    <circle cx="120" cy="97" r="10" fill="currentColor" fillOpacity="0.08" />
                    <path d="M65 90 L63 105 L67 105 Z" fill="currentColor" fillOpacity="0.2" />
                    <path d="M75 90 L73 105 L77 105 Z" fill="currentColor" fillOpacity="0.2" />
                    <path d="M70 95 L68 115 L72 115 Z" fill="currentColor" fillOpacity="0.3" />
                    <circle cx="70" cy="118" r="2" fill="currentColor" fillOpacity="0.4" />
                    <path d="M67 82 L70 95 L73 82" stroke="currentColor" strokeWidth="0.8" fill="none" />
                    <circle cx="70" cy="82" r="2" fill="currentColor" fillOpacity="0.3" />
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
