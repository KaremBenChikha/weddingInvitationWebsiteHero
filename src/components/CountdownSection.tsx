"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, useReducedMotion } from "motion/react";
import { SectionWrapper } from "./ui/SectionWrapper";
import { GoldDivider } from "./ui/GoldDivider";
import { CONTENT, WEDDING } from "@/lib/constants";

const COUNT_TO = new Date("2026-07-11T14:00:00").getTime();

interface Count {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calcCount(): Count {
  const diff = Math.max(0, COUNT_TO - Date.now());
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

const statKeys: (keyof Count)[] = ["days", "hours", "minutes", "seconds"];
const statLabelsFr: Record<keyof Count, string> = {
  days: "Jours",
  hours: "Heures",
  minutes: "Minutes",
  seconds: "Secondes",
};
const statLabelsAr: Record<keyof Count, string> = {
  days: "يوم",
  hours: "ساعة",
  minutes: "دقيقة",
  seconds: "ثانية",
};

export function CountdownSection() {
  const reduce = useReducedMotion();
  const [count, setCount] = useState<Count>(calcCount);

  useEffect(() => {
    const timer = setInterval(() => setCount(calcCount()), 1000);
    return () => clearInterval(timer);
  }, []);

  const pad = useCallback((n: number) => String(n).padStart(2, "0"), []);

  return (
    <SectionWrapper id="countdown">
      <motion.div
        className="flex flex-col items-center"
        initial={reduce ? false : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="font-display text-3xl md:text-4xl text-gold-accent mb-2">
          {CONTENT.countdownTitle}
        </h2>
        <p className="font-arabic text-xl text-gold-accent/60 mb-8" dir="rtl">
          {CONTENT.countdownTitleAr}
        </p>

        <GoldDivider />

        <div className="grid grid-cols-4 gap-3 md:gap-5 w-full max-w-lg mt-8">
          {statKeys.map((key) => (
            <motion.div
              key={key}
              className="flex flex-col items-center"
              initial={reduce ? false : { opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * statKeys.indexOf(key) }}
            >
              <div className="relative w-full aspect-square bg-surface/80 backdrop-blur-sm rounded-sm shadow-[0_2px_24px_rgba(0,0,0,0.04)] border border-gold-accent/15 flex items-center justify-center mb-2">
                <div className="absolute top-1.5 left-1.5 w-2 h-2 border-t border-l border-gold-accent/20" />
                <div className="absolute top-1.5 right-1.5 w-2 h-2 border-t border-r border-gold-accent/20" />
                <div className="absolute bottom-1.5 left-1.5 w-2 h-2 border-b border-l border-gold-accent/20" />
                <div className="absolute bottom-1.5 right-1.5 w-2 h-2 border-b border-r border-gold-accent/20" />
                <span className="font-display text-2xl md:text-3xl gold-text tabular-nums">
                  {pad(count[key])}
                </span>
              </div>
              <span className="font-body text-xs md:text-sm text-text/50 uppercase tracking-widest">
                {statLabelsFr[key]}
              </span>
              <span className="font-arabic text-xs text-text/30 mt-0.5" dir="rtl">
                {statLabelsAr[key]}
              </span>
            </motion.div>
          ))}
        </div>

        <p className="font-body text-sm text-text/40 mt-10 text-center leading-relaxed">
          {WEDDING.dateTime}
        </p>
        <p className="font-arabic text-sm text-text/25 mt-1" dir="rtl">
          {WEDDING.dateLabelAr}
        </p>
      </motion.div>
    </SectionWrapper>
  );
}
