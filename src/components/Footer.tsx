"use client";

import { motion, useReducedMotion } from "motion/react";
import { COUPLE, WEDDING } from "@/lib/constants";

export function Footer() {
  const reduce = useReducedMotion();

  return (
    <footer className="relative bg-surface-alt overflow-hidden">
      {/* Large photo placeholder with gradient fade */}
      <div className="relative w-full max-w-lg mx-auto">
        {/* Photo */}
        <div className="w-full aspect-[4/5] bg-gradient-to-br from-border via-surface-alt to-border rounded-b-[30px] overflow-hidden" />

        {/* Gradient fade overlay on top */}
        <div
          className="absolute top-0 left-0 right-0 h-32 pointer-events-none"
          style={{ background: "linear-gradient(to bottom, #f5efe4 0%, transparent 100%)" }}
        />
      </div>

      {/* Text */}
      <motion.div
        className="text-center py-16 px-6"
        initial={reduce ? false : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <p className="font-display text-3xl md:text-4xl gold-text mb-2">
          {COUPLE.latin}
        </p>
        <p className="font-arabic text-xl text-gold-accent/60 mb-1" dir="rtl">
          {COUPLE.arabic}
        </p>
        <p className="font-body text-sm text-text/50 mt-6">
          {WEDDING.dateTime} — {WEDDING.location}
        </p>
      </motion.div>

      {/* Mandala background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.04]">
        <svg width="320" height="320" viewBox="0 0 320 320" fill="none" xmlns="http://www.w3.org/2000/svg" className="animate-spin-slow">
          <circle cx="160" cy="160" r="158" stroke="#d4a843" strokeWidth="1" />
          <circle cx="160" cy="160" r="130" stroke="#d4a843" strokeWidth="0.5" />
          <circle cx="160" cy="160" r="100" stroke="#d4a843" strokeWidth="0.5" />
          <circle cx="160" cy="160" r="70" stroke="#d4a843" strokeWidth="0.5" />
          <path d="M160 2L168.5 80L160 158L248 85L160 2Z" fill="#d4a843" opacity="0.3" />
          <path d="M160 318L151.5 240L160 162L72 235L160 318Z" fill="#d4a843" opacity="0.3" />
          <path d="M2 160L80 151.5L158 160L85 72L2 160Z" fill="#d4a843" opacity="0.3" />
          <path d="M318 160L240 168.5L162 160L235 248L318 160Z" fill="#d4a843" opacity="0.3" />
          <circle cx="160" cy="160" r="4" fill="#d4a843" />
          <circle cx="160" cy="160" r="30" stroke="#d4a843" strokeWidth="0.3" strokeDasharray="4 4" />
          <circle cx="160" cy="160" r="60" stroke="#d4a843" strokeWidth="0.3" strokeDasharray="4 4" />
        </svg>
      </div>
    </footer>
  );
}
