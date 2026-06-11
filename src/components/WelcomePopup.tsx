"use client";

import { useState, useEffect } from "react";
import { ArabesquePattern } from "./ui/ArabesquePattern";
import { CONTENT } from "@/lib/constants";

interface WelcomePopupProps {
  onDismiss: () => void;
}

export function WelcomePopup({ onDismiss }: WelcomePopupProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const handleDismiss = () => {
    setVisible(false);
    document.body.style.overflow = "";
    setTimeout(onDismiss, 400);
  };

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[2147483647] flex items-center justify-center bg-overlay transition-opacity duration-500"
      style={{ opacity: visible ? 1 : 0 }}
    >
      <ArabesquePattern opacity={0.08} />
      <div className="relative z-10 w-[90vw] max-w-[420px] aspect-[1.15] border border-gold-accent/30 rounded-sm flex flex-col items-center justify-center text-center px-8 py-10 bg-surface/95 backdrop-blur-sm">
        {/* Decorative border frame */}
        <div className="absolute top-3 left-3 w-4 h-4 border-t border-l border-gold-accent/40" />
        <div className="absolute top-3 right-3 w-4 h-4 border-t border-r border-gold-accent/40" />
        <div className="absolute bottom-3 left-3 w-4 h-4 border-b border-l border-gold-accent/40" />
        <div className="absolute bottom-3 right-3 w-4 h-4 border-b border-r border-gold-accent/40" />

        <GoldDiamond className="mb-6" />

        <h2 className="font-display text-3xl md:text-4xl text-gold-light mb-2 tracking-wide">
          {CONTENT.popupTitle}
        </h2>

        <p className="font-arabic text-lg text-gold-accent/80 mb-1" dir="rtl">
          {CONTENT.popupTitleAr}
        </p>

        <p className="font-body text-lg text-text/70 mb-8">
          {CONTENT.popupSubtitle}
        </p>

        <p className="font-arabic text-base text-text/60 mb-8" dir="rtl">
          {CONTENT.popupSubtitleAr}
        </p>

        <button
          onClick={handleDismiss}
          className="px-8 py-3 bg-gold-accent text-text font-display text-sm tracking-widest uppercase rounded-sm hover:bg-gold-light hover:scale-105 transition-all duration-300 hover:shadow-[0_0_30px_rgba(212,168,67,0.3)]"
        >
          {CONTENT.popupCta}
          <span className="block font-arabic text-xs mt-0.5" dir="rtl">{CONTENT.popupCtaAr}</span>
        </button>
      </div>
    </div>
  );
}

function GoldDiamond({ className = "" }: { className?: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M10 1L14 10L10 19L6 10L10 1Z" fill="#d4a843" opacity="0.8" />
      <path d="M10 4L12.5 10L10 16L7.5 10L10 4Z" fill="#e8d5a3" opacity="0.6" />
    </svg>
  );
}
