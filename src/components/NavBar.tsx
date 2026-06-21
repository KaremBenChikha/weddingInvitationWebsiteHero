"use client";

import { useState, useEffect, useCallback } from "react";
import { WEDDING } from "@/lib/constants";

const sections = [
  { id: "hero", label: "Accueil", labelAr: "الرئيسية" },
  { id: "invitation", label: "Invitation", labelAr: "الدعوة" },
  { id: "timeline", label: "Programme", labelAr: "البرنامج" },
  { id: "rsvp", label: "RSVP", labelAr: "تأكيد" },
  { id: "map", label: "Carte", labelAr: "الخريطة" },
];

export function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState("hero");
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 80);
      setShowBackToTop(y > window.innerHeight);

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i].id);
        if (el && el.getBoundingClientRect().top < 200) {
          setActive(sections[i].id);
          break;
        }
      }
    };
    const onDismiss = () => setVisible(true);

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("start-wedding-audio", onDismiss);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("start-wedding-audio", onDismiss);
    };
  }, []);

  const scrollTo = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 64;
    window.scrollTo({ top, behavior: "smooth" });
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[2147483646] transition-all duration-500 ${
          visible && scrolled
            ? "translate-y-0 opacity-100"
            : "-translate-y-full opacity-0"
        }`}
      >
        <div className="bg-surface/85 backdrop-blur-md border-b border-border/60">
          <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
            <button
              onClick={() => scrollTo("hero")}
              className="font-display text-sm text-gold-accent hover:text-gold-light transition-colors cursor-pointer whitespace-nowrap"
            >
              {WEDDING.date}
            </button>

            <div className="flex items-center gap-1 md:gap-4 overflow-x-auto scrollbar-hide" style={{ scrollbarWidth: "none" }}>
              {sections.map((s) => (
                <button
                  key={s.id}
                  onClick={() => scrollTo(s.id)}
                  className={`px-2 md:px-3 py-1.5 text-xs md:text-sm font-body transition-all duration-300 rounded-sm cursor-pointer whitespace-nowrap ${
                    active === s.id
                      ? "text-gold-accent bg-gold-accent/10"
                      : "text-text/60 hover:text-text/90 hover:bg-surface-alt"
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={`fixed bottom-20 right-6 z-[2147483646] w-10 h-10 rounded-full bg-surface/80 backdrop-blur-sm border border-gold-accent/30 flex items-center justify-center hover:border-gold-accent hover:bg-gold-accent/10 transition-all duration-300 cursor-pointer ${
          visible && showBackToTop
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-4 pointer-events-none"
        }`}
        aria-label="Retour en haut"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gold-accent">
          <path d="M12 19V5M12 5L5 12M12 5L19 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </>
  );
}
