"use client";

import { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArabesquePattern } from "./ArabesquePattern";

interface SectionWrapperProps {
  children: ReactNode;
  id?: string;
  className?: string;
  showPattern?: boolean;
  delay?: number;
}

export function SectionWrapper({
  children,
  id,
  className = "",
  showPattern = true,
  delay = 0,
}: SectionWrapperProps) {
  const reduce = useReducedMotion();

  return (
    <motion.section
      id={id}
      className={`relative min-h-screen flex flex-col items-center justify-center py-20 md:py-28 ${className}`}
      initial={reduce ? false : { opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 1,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {showPattern && <ArabesquePattern />}
      <div className="relative z-10 w-full max-w-2xl mx-auto section-padding flex flex-col items-center text-center">
        {children}
      </div>
    </motion.section>
  );
}
