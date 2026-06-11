"use client";

import { motion, useReducedMotion } from "motion/react";
import { SectionWrapper } from "./ui/SectionWrapper";
import { CONTENT, DRESS_CODE_COLORS } from "@/lib/constants";
import { GoldDivider } from "./ui/GoldDivider";

export function DressCodeSection() {
  const reduce = useReducedMotion();

  return (
    <SectionWrapper id="dresscode">
      <motion.div
        className="flex flex-col items-center"
        initial={reduce ? false : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="font-display text-3xl md:text-4xl text-gold-accent mb-2">
          {CONTENT.dressCodeTitle}
        </h2>
        <p className="font-arabic text-xl text-gold-accent/50 mb-6" dir="rtl">
          {CONTENT.dressCodeTitleAr}
        </p>

        <GoldDivider />

        <div className="flex gap-4 md:gap-6 justify-center flex-wrap mb-8">
          {DRESS_CODE_COLORS.map((color, i) => (
            <motion.div
              key={color.hex}
              className="flex flex-col items-center gap-2"
              initial={reduce ? false : { opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
            >
              <div
                className="w-14 h-14 md:w-16 md:h-16 rounded-full border-2 border-gold-accent/20 shadow-sm"
                style={{ backgroundColor: color.hex }}
              />
              <span className="font-body text-xs text-text/50">{color.label}</span>
            </motion.div>
          ))}
        </div>

        <p className="font-body text-base md:text-lg text-text/60 max-w-md leading-relaxed">
          {CONTENT.dressCodeBody}
        </p>
        <p className="font-arabic text-sm text-text/40 mt-3 max-w-md" dir="rtl">
          {CONTENT.dressCodeBodyAr}
        </p>
      </motion.div>
    </SectionWrapper>
  );
}
