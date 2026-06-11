"use client";

import { motion, useReducedMotion } from "motion/react";
import { CONTENT, TIMELINE } from "@/lib/constants";
import { SectionWrapper } from "./ui/SectionWrapper";

export function TimelineSection() {
  const reduce = useReducedMotion();

  return (
    <SectionWrapper id="timeline" className="bg-surface-alt">
      <h2 className="font-display text-3xl md:text-4xl text-gold-accent mb-2">
        {CONTENT.timelineTitle}
      </h2>
      <p className="font-arabic text-xl text-gold-accent/50 mb-12" dir="rtl">
        {CONTENT.timelineTitleAr}
      </p>

      <div className="relative w-full max-w-sm mx-auto">
        <div className="absolute left-[19px] top-2 bottom-2 w-px bg-gradient-to-b from-gold-accent/60 via-gold-accent/30 to-gold-accent/60" />

        <div className="space-y-8">
          {TIMELINE.map((item, i) => (
            <motion.div
              key={i}
              className="flex items-start gap-6"
              initial={reduce ? false : { opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.6,
                delay: i * 0.12,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <div className="relative z-10 flex-shrink-0 w-10 h-10 rounded-full border border-gold-accent/50 bg-surface-alt/90 backdrop-blur-sm flex items-center justify-center shadow-sm">
                <span className="font-body text-xs text-gold-accent">{item.time}</span>
              </div>

              <div className="pt-1.5">
                <p className="font-body text-lg text-text/90">{item.labelFr}</p>
                <p className="font-arabic text-sm text-text/60" dir="rtl">{item.labelAr}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
