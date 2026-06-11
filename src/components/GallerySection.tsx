"use client";

import { motion, useReducedMotion } from "motion/react";
import { SectionWrapper } from "./ui/SectionWrapper";

export function GallerySection() {
  const reduce = useReducedMotion();

  const photos = [
    { id: 1, color: "#ede8df", aspect: "aspect-[3/4]" },
    { id: 2, color: "#e8e2d8", aspect: "aspect-square" },
    { id: 3, color: "#f0ebe5", aspect: "aspect-[4/5]" },
    { id: 4, color: "#ece6db", aspect: "aspect-[3/4]" },
    { id: 5, color: "#e5dfd4", aspect: "aspect-square" },
    { id: 6, color: "#f2ede8", aspect: "aspect-[4/3]" },
  ];

  return (
    <SectionWrapper id="gallery" showPattern={false}>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 w-full max-w-lg mx-auto">
        {photos.map((photo, i) => (
          <motion.div
            key={photo.id}
            className={`${photo.aspect} relative group`}
            initial={reduce ? false : { opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 0.6,
              delay: i * 0.1,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <div className="absolute inset-0 border border-gold-accent/20 rounded-sm group-hover:border-gold-accent/40 transition-colors duration-500 z-10 pointer-events-none" />

            <div
              className="w-full h-full rounded-sm"
              style={{ background: `linear-gradient(135deg, ${photo.color}, #faf8f4)` }}
            />

            <div className="absolute top-1.5 left-1.5 w-3 h-3 border-t border-l border-gold-accent/30 z-20 pointer-events-none" />
            <div className="absolute top-1.5 right-1.5 w-3 h-3 border-t border-r border-gold-accent/30 z-20 pointer-events-none" />
            <div className="absolute bottom-1.5 left-1.5 w-3 h-3 border-b border-l border-gold-accent/30 z-20 pointer-events-none" />
            <div className="absolute bottom-1.5 right-1.5 w-3 h-3 border-b border-r border-gold-accent/30 z-20 pointer-events-none" />

            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 pointer-events-none">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 0L10.472 7.472L16 8L10.472 8.528L8 16L5.528 8.528L0 8L5.528 7.472L8 0Z" fill="#d4a843" opacity="0.8" />
              </svg>
            </div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
