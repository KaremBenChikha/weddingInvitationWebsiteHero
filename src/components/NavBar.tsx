"use client";

import { useState, useEffect, useCallback } from "react";

const sections = [
  { id: "invitation", label: "Invitation", labelAr: "الدعوة", icon: "envelope" },
  { id: "countdown", label: "Compte à rebours", labelAr: "العد التنازلي", icon: "clock" },
  { id: "hero", label: "Accueil", labelAr: "الرئيسية", icon: "home" },
  { id: "rsvp", label: "RSVP", labelAr: "تأكيد", icon: "check" },
  { id: "map", label: "Carte", labelAr: "الخريطة", icon: "map" },
];

export function NavBar() {
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState("hero");

  useEffect(() => {
    const onScroll = () => {
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i].id);
        if (el && el.getBoundingClientRect().top < 300) {
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
    const top = el.getBoundingClientRect().top + window.scrollY - 16;
    window.scrollTo({ top, behavior: "smooth" });
  }, []);

  return (
    <nav
      className={`fixed bottom-6 left-4 right-4 z-[2147483646] transition-all duration-500 max-w-lg mx-auto ${
        visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      }`}
    >
      <div className="bg-surface/80 backdrop-blur-xl border border-white/20 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.12)]">
        <div className="flex items-center justify-around h-14 md:h-16 px-3">
          {sections.map((s, i) => {
            const isCenter = i === 2;

            return (
              <button
                key={s.id}
                onClick={() => scrollTo(s.id)}
                className={`flex flex-col items-center justify-center gap-0.5 transition-all duration-300 cursor-pointer ${
                  isCenter
                    ? "w-10 h-10 rounded-full bg-gold-accent/10 text-gold-accent hover:bg-gold-accent/20"
                    : "px-2 py-1 rounded-lg flex-1 min-w-0"
                } ${
                  !isCenter && active === s.id
                    ? "text-gold-accent"
                    : !isCenter
                      ? "text-text/50 hover:text-text/80"
                      : ""
                }`}
                aria-label={`${s.label} / ${s.labelAr}`}
              >
                {s.icon === "envelope" && (
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className={isCenter ? "text-text" : ""}
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="M2 6L12 13L22 6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
                {s.icon === "clock" && (
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className={isCenter ? "text-text" : ""}
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 6V12L16 14" strokeLinecap="round" />
                  </svg>
                )}
                {s.icon === "home" && (
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-gold-accent"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                  </svg>
                )}
                {s.icon === "check" && (
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className={isCenter ? "text-text" : ""}
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <rect x="3" y="4" width="18" height="18" rx="2" />
                    <path d="M8 12L11 15L16 9" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
                {s.icon === "map" && (
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className={isCenter ? "text-text" : ""}
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path d="M12 22C12 22 19 16 19 10C19 6.134 15.866 3 12 3C8.134 3 5 6.134 5 10C5 16 12 22 12 22Z" />
                    <circle cx="12" cy="10" r="2" />
                  </svg>
                )}

                {!isCenter && (
                  <span className="text-[10px] md:text-xs font-body leading-none truncate max-w-full">
                    {s.label}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
