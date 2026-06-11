"use client";

import { motion, useReducedMotion } from "motion/react";
import { SectionWrapper } from "./ui/SectionWrapper";
import { GoldDivider } from "./ui/GoldDivider";
import { COUPLE, CONTENT } from "@/lib/constants";

export function InvitationSection() {
  const reduce = useReducedMotion();

  return (
    <SectionWrapper id="invitation">
      <motion.div
        className="flex flex-col items-center"
        initial={reduce ? false : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <GoldDivider />

        {/* Arabic calligraphy header SVG */}
        <motion.div
          className="w-full max-w-lg mx-auto mb-6"
          initial={reduce ? false : { opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <img
            src="/images/arabic-bismillah.svg"
            alt="بسم الله الرحمن الرحيم"
            className="w-full h-auto"
          />
        </motion.div>

        {/* Letter card */}
        <div className="relative max-w-lg mx-auto bg-surface/80 backdrop-blur-sm rounded-sm shadow-[0_2px_48px_rgba(0,0,0,0.05)] border border-gold-accent/15 px-8 py-10 md:px-14 md:py-16">
          {/* Decorative corners */}
          <div className="absolute top-3 left-3 w-5 h-5 border-t border-l border-gold-accent/30" />
          <div className="absolute top-3 right-3 w-5 h-5 border-t border-r border-gold-accent/30" />
          <div className="absolute bottom-3 left-3 w-5 h-5 border-b border-l border-gold-accent/30" />
          <div className="absolute bottom-3 right-3 w-5 h-5 border-b border-r border-gold-accent/30" />

          <p className="font-body text-xl md:text-2xl text-text/90 leading-relaxed mb-6">
            {CONTENT.invitationLine1}
          </p>

          <p className="font-arabic text-lg md:text-xl text-gold-accent/60 leading-relaxed mb-8" dir="rtl">
            {CONTENT.invitationLine1Ar}
          </p>

          <div className="w-16 h-px bg-gold-accent/30 mx-auto mb-8" />

          <p className="font-body text-base md:text-lg text-text/60 leading-relaxed whitespace-pre-line mb-8">
            {CONTENT.invitationBody}
          </p>

          <div className="w-16 h-px bg-gold-accent/30 mx-auto mb-8" />

          <p className="font-arabic text-base md:text-lg text-text/60 leading-[2.2] whitespace-pre-line mb-8" dir="rtl">
            {CONTENT.invitationBodyAr}
          </p>

          <p className="font-display text-2xl md:text-3xl gold-text text-center">
            {COUPLE.latin}
          </p>
        </div>

        <GoldDivider />

        <p className="font-body text-xl md:text-2xl text-text/80 italic leading-relaxed mt-4">
          {CONTENT.invitationLine2}
        </p>

        <p className="font-arabic text-lg md:text-xl text-text/60 italic mt-2" dir="rtl">
          {CONTENT.invitationLine2Ar}
        </p>
      </motion.div>
    </SectionWrapper>
  );
}
