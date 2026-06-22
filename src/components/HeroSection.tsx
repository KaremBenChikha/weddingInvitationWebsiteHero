"use client";

import { motion, useReducedMotion } from "motion/react";
import { COUPLE, WEDDING } from "@/lib/constants";
import { GoldDivider } from "./ui/GoldDivider";
import { SectionWrapper } from "./ui/SectionWrapper";

export function HeroSection() {
  const reduce = useReducedMotion();

  return (
    <SectionWrapper className="!min-h-[100dvh] !flex-col md:!flex-row md:!text-left !justify-center !gap-0 !py-0 !items-stretch" id="hero" showPattern={false}>
      {/* Left: Text */}
      <motion.div
        className="flex-1 flex flex-col justify-center section-padding py-12 md:py-16 lg:py-24"
        initial={reduce ? false : { opacity: 0, x: -24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Chandelier */}
        <div className="flex justify-center mb-4">
          <div className="overflow-hidden h-[120px] md:h-[160px]">
            <img
              src="/images/chandelier-ornate.svg"
              alt=""
              className="w-auto h-full"
              style={{ objectFit: "cover", objectPosition: "bottom center" }}
            />
          </div>
        </div>

        <p className="font-body text-gold-accent/80 text-sm tracking-[0.25em] uppercase mb-4">
          {WEDDING.date}
        </p>

        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl gold-text text-shadow-gold mb-3 leading-tight">
          {COUPLE.latin}
        </h1>

        <h2 className="font-arabic text-3xl md:text-4xl text-gold-accent/70 mb-4" dir="rtl">
          {COUPLE.arabic}
        </h2>

        <GoldDivider />

        <p className="font-body text-xl md:text-2xl text-text/80 mb-1">
          {WEDDING.dateTime}
        </p>

        <p className="font-body text-lg md:text-xl text-text/60 mb-1">
          {WEDDING.location}
        </p>

        <p className="font-arabic text-base text-text/60" dir="rtl">
          {WEDDING.locationAr}
        </p>
      </motion.div>

      {/* Right: Photo placeholder - desktop only */}
      <motion.div
        className="hidden md:flex flex-1 h-full items-center justify-center bg-surface-alt overflow-hidden"
        initial={reduce ? false : { opacity: 0, x: 24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="relative w-full h-full max-h-[80vh] flex items-center justify-center">
          <div className="absolute inset-8 border border-gold-accent/20 rounded-sm" />
          <div className="absolute top-12 left-12 w-6 h-6 border-t-2 border-l-2 border-gold-accent/40" />
          <div className="absolute top-12 right-12 w-6 h-6 border-t-2 border-r-2 border-gold-accent/40" />
          <div className="absolute bottom-12 left-12 w-6 h-6 border-b-2 border-l-2 border-gold-accent/40" />
          <div className="absolute bottom-12 right-12 w-6 h-6 border-b-2 border-r-2 border-gold-accent/40" />

          <div className="w-4/5 aspect-[3/4] bg-gradient-to-br from-border via-surface-alt to-border rounded-sm" />
        </div>
      </motion.div>
    </SectionWrapper>
  );
}
