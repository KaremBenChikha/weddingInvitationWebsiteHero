"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { motion, useReducedMotion } from "motion/react";
import { SectionWrapper } from "./ui/SectionWrapper";
import { CONTENT } from "@/lib/constants";

const photos = [
  { id: 1, bg: "#ede8df" },
  { id: 2, bg: "#e8e2d8" },
  { id: 3, bg: "#f0ebe5" },
  { id: 4, bg: "#ece6db" },
  { id: 5, bg: "#e5dfd4" },
  { id: 6, bg: "#f2ede8" },
  { id: 7, bg: "#f0ece3" },
  { id: 8, bg: "#eae4da" },
];

export function GallerySection() {
  const reduce = useReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);

  const scrollTo = useCallback((index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const slide = track.children[index] as HTMLElement;
    if (!slide) return;
    track.scrollTo({ left: slide.offsetLeft - 16, behavior: "smooth" });
    setCurrent(index);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const handleScroll = () => {
      if (!track) return;
      const slideWidth = track.children[0]?.clientWidth || 280;
      const idx = Math.round(track.scrollLeft / (slideWidth + 16));
      setCurrent(idx);
    };
    track.addEventListener("scroll", handleScroll, { passive: true });
    return () => track.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <SectionWrapper id="gallery" showPattern={false}>
      <motion.div
        className="w-full"
        initial={reduce ? false : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="font-display text-3xl md:text-4xl text-gold-accent mb-2 text-center">
          {CONTENT.galleryTitle}
        </h2>
        <p className="font-arabic text-xl text-gold-accent/50 mb-10 text-center" dir="rtl">
          {CONTENT.galleryTitleAr}
        </p>

        {/* Carousel track */}
        <div
          ref={trackRef}
          className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {photos.map((photo, i) => (
            <div
              key={photo.id}
              className="snap-center flex-shrink-0 w-[70vw] max-w-[300px] md:max-w-[340px] aspect-[3/4] relative"
            >
              {/* Gold frame */}
              <div className="absolute inset-0 border border-gold-accent/20 rounded-sm z-10 pointer-events-none" />
              <div className="absolute top-2 left-2 w-4 h-4 border-t border-l border-gold-accent/30 z-20 pointer-events-none" />
              <div className="absolute top-2 right-2 w-4 h-4 border-t border-r border-gold-accent/30 z-20 pointer-events-none" />
              <div className="absolute bottom-2 left-2 w-4 h-4 border-b border-l border-gold-accent/30 z-20 pointer-events-none" />
              <div className="absolute bottom-2 right-2 w-4 h-4 border-b border-r border-gold-accent/30 z-20 pointer-events-none" />

              <div
                className="w-full h-full rounded-sm"
                style={{ background: `linear-gradient(135deg, ${photo.bg}, #faf8f4)` }}
              />

              {/* Diamond center */}
              <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gold-accent/15">
                  <path d="M9 0L11.78 8.28L18 9L11.78 9.72L9 18L6.22 9.72L0 9L6.22 8.28L9 0Z" fill="currentColor" />
                </svg>
              </div>
            </div>
          ))}
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-6">
          {photos.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollTo(i)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                i === current ? "bg-gold-accent w-6" : "bg-gold-accent/20 hover:bg-gold-accent/40"
              }`}
              aria-label={`Photo ${i + 1}`}
            />
          ))}
        </div>
      </motion.div>
    </SectionWrapper>
  );
}
