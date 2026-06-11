import { COUPLE, WEDDING } from "@/lib/constants";
import { GoldDivider } from "./ui/GoldDivider";
import { SectionWrapper } from "./ui/SectionWrapper";

export function HeroSection() {
  return (
    <SectionWrapper className="!min-h-screen bg-surface-alt" id="hero">
      <p className="font-body text-gold-accent/60 text-sm tracking-[0.3em] uppercase mb-8">
          {WEDDING.date}
        </p>

        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl gold-text text-shadow-gold mb-4 leading-tight">
          {COUPLE.latin}
        </h1>

        <h2 className="font-arabic text-3xl md:text-4xl text-gold-accent/70 mb-3" dir="rtl">
          {COUPLE.arabic}
        </h2>

        <GoldDivider />

        <p className="font-body text-xl md:text-2xl text-text/80 mb-2">
          {WEDDING.dateLabelFr}
        </p>

        <p className="font-body text-lg md:text-xl text-text/60">
          {WEDDING.location}
        </p>

        <p className="font-arabic text-base text-text/50 mt-1" dir="rtl">
          {WEDDING.locationAr}
        </p>

        {/* Scroll hint */}
        <div className="mt-16 animate-bounce">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gold-accent/40 mx-auto">
            <path d="M12 5L12 19M12 19L6 13M12 19L18 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
    </SectionWrapper>
  );
}
