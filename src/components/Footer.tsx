import { COUPLE } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="relative py-16 px-6 text-center bg-surface-alt overflow-hidden">
      {/* Large mandala background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03]">
        <svg width="320" height="320" viewBox="0 0 320 320" fill="none" xmlns="http://www.w3.org/2000/svg" className="animate-spin-slow">
          <circle cx="160" cy="160" r="158" stroke="#d4a843" strokeWidth="1" />
          <circle cx="160" cy="160" r="130" stroke="#d4a843" strokeWidth="0.5" />
          <circle cx="160" cy="160" r="100" stroke="#d4a843" strokeWidth="0.5" />
          <circle cx="160" cy="160" r="70" stroke="#d4a843" strokeWidth="0.5" />
          <path d="M160 2L168.5 80L160 158L248 85L160 2Z" fill="#d4a843" opacity="0.3" />
          <path d="M160 318L151.5 240L160 162L72 235L160 318Z" fill="#d4a843" opacity="0.3" />
          <path d="M2 160L80 151.5L158 160L85 72L2 160Z" fill="#d4a843" opacity="0.3" />
          <path d="M318 160L240 168.5L162 160L235 248L318 160Z" fill="#d4a843" opacity="0.3" />
          <circle cx="160" cy="160" r="4" fill="#d4a843" />
          <circle cx="160" cy="160" r="30" stroke="#d4a843" strokeWidth="0.3" strokeDasharray="4 4" />
          <circle cx="160" cy="160" r="60" stroke="#d4a843" strokeWidth="0.3" strokeDasharray="4 4" />
        </svg>
      </div>

      <div className="relative z-10">
        <p className="font-display text-2xl md:text-3xl gold-text mb-2">
          {COUPLE.latin}
        </p>
        <p className="font-arabic text-xl text-gold-accent/50" dir="rtl">
          {COUPLE.arabic}
        </p>
        <p className="font-body text-sm text-text/30 mt-8">
          11.07.2026 — Trois-Rivières, Québec
        </p>
      </div>
    </footer>
  );
}
