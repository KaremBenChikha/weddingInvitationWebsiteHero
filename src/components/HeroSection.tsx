"use client";

import { motion, useReducedMotion } from "motion/react";
import { COUPLE, WEDDING } from "@/lib/constants";
import { GoldDivider } from "./ui/GoldDivider";
import { SectionWrapper } from "./ui/SectionWrapper";

export function HeroSection() {
  const reduce = useReducedMotion();

  return (
    <SectionWrapper className="!min-h-screen !flex-col md:!flex-row md:!text-left !justify-between !gap-0 !py-0 !items-stretch" id="hero" showPattern={false}>
      {/* Left: Text */}
      <motion.div
        className="flex-1 flex flex-col justify-center section-padding py-16"
        initial={reduce ? false : { opacity: 0, x: -24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      >
        <p className="font-body text-gold-accent/60 text-sm tracking-[0.3em] uppercase mb-8">
          {WEDDING.date}
        </p>

        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl gold-text text-shadow-gold mb-4 leading-tight">
          {COUPLE.latin}
        </h1>

        <h2 className="font-arabic text-3xl md:text-4xl text-gold-accent/70 mb-6" dir="rtl">
          {COUPLE.arabic}
        </h2>

        <GoldDivider />

        <p className="font-body text-xl md:text-2xl text-text/80 mb-2">
          {WEDDING.dateTime}
        </p>

        <p className="font-body text-lg md:text-xl text-text/60">
          {WEDDING.location}
        </p>

        <p className="font-arabic text-base text-text/40 mt-1" dir="rtl">
          {WEDDING.locationAr}
        </p>
      </motion.div>

      {/* Right: Photo placeholder */}
      <motion.div
        className="flex md:hidden w-full aspect-[4/3] items-center justify-center bg-surface-alt overflow-hidden order-first"
        initial={reduce ? false : { opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="relative w-full h-full flex items-center justify-center">
          <div className="absolute inset-4 border border-gold-accent/20 rounded-sm" />
          <div className="w-3/5 aspect-[3/4] bg-gradient-to-br from-border via-surface-alt to-border rounded-sm flex items-center justify-center">
            <svg width="32" height="32" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gold-accent/20">
              <path d="M20 0L24.49 15.51L40 20L24.49 24.49L20 40L15.51 24.49L0 20L15.51 15.51L20 0Z" fill="currentColor" />
            </svg>
          </div>
        </div>
      </motion.div>
      <motion.div
        className="hidden md:flex flex-1 h-full items-center justify-center bg-surface-alt overflow-hidden"
        initial={reduce ? false : { opacity: 0, x: 24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="relative w-full h-full max-h-[80vh] flex items-center justify-center">
          {/* Gold frame */}
          <div className="absolute inset-8 border border-gold-accent/20 rounded-sm" />
          <div className="absolute top-12 left-12 w-6 h-6 border-t-2 border-l-2 border-gold-accent/40" />
          <div className="absolute top-12 right-12 w-6 h-6 border-t-2 border-r-2 border-gold-accent/40" />
          <div className="absolute bottom-12 left-12 w-6 h-6 border-b-2 border-l-2 border-gold-accent/40" />
          <div className="absolute bottom-12 right-12 w-6 h-6 border-b-2 border-r-2 border-gold-accent/40" />

          <div
            className="w-4/5 aspect-[3/4] bg-gradient-to-br from-border via-surface-alt to-border rounded-sm flex items-center justify-center"
          >
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gold-accent/20">
              <path d="M20 0L24.49 15.51L40 20L24.49 24.49L20 40L15.51 24.49L0 20L15.51 15.51L20 0Z" fill="currentColor" />
            </svg>
          </div>
        </div>
      </motion.div>
    </SectionWrapper>
  );
}
