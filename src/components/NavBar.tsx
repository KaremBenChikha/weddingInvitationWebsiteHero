"use client";

import { useState, useEffect, useCallback } from "react";

const sections = [
  { id: "invitation", label: "Invitation", labelAr: "الدعوة", icon: "envelope" },
  { id: "timeline", label: "Programme", labelAr: "البرنامج", icon: "clock" },
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
      className={`fixed bottom-0 left-0 right-0 z-[2147483646] transition-all duration-500 ${
        visible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
      }`}
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
    >
      <div className="bg-surface/70 backdrop-blur-xl border-t border-border/50">
        <div className="max-w-lg mx-auto flex items-center justify-around h-16 md:h-18 px-2">
          {sections.map((s, i) => {
            const isCenter = i === 2;

            return (
              <button
                key={s.id}
                onClick={() => scrollTo(s.id)}
                className={`flex flex-col items-center justify-center gap-0.5 transition-all duration-300 cursor-pointer ${
                  isCenter
                    ? "w-12 h-12 md:w-14 md:h-14 -mt-4 rounded-full bg-gold-accent text-text shadow-[0_0_20px_rgba(212,168,67,0.3)] hover:shadow-[0_0_30px_rgba(212,168,67,0.5)] hover:scale-105"
                    : "px-2 py-1 rounded-lg"
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
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-text"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M3 12L12 3L21 12" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M5 10V20H19V10" strokeLinecap="round" strokeLinejoin="round" />
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
                  <span className="text-[10px] md:text-xs font-body leading-none">
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
