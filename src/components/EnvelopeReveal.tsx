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
            initial={{ left: "0%", right: "50%" }}
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
            initial={{ right: "0%", left: "50%" }}
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

          {stage === "idle" && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center z-15 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <img
                src="/images/frame-abstract.svg"
                alt=""
                className="w-72 h-72 md:w-80 md:h-80 gold-svg-filter opacity-30"
              />
            </motion.div>
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
                  <img
                    src="/images/chandelier-ornate.svg"
                    alt="Chandelier"
                    className="w-auto h-[200px] md:h-[260px] gold-svg-filter"
                  />
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


        </motion.div>
      )}
    </AnimatePresence>
  );
}
