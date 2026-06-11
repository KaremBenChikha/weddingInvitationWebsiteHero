import { CONTENT, TIMELINE } from "@/lib/constants";
import { SectionWrapper } from "./ui/SectionWrapper";

export function TimelineSection() {
  return (
    <SectionWrapper id="timeline" className="bg-indigo-midnight">
      <div className="animate-fade-in-up w-full">
        <h2 className="font-display text-3xl md:text-4xl text-gold-light mb-2">
          {CONTENT.timelineTitle}
        </h2>
        <p className="font-arabic text-xl text-gold-accent/50 mb-12" dir="rtl">
          {CONTENT.timelineTitleAr}
        </p>

        <div className="relative w-full max-w-sm mx-auto">
          {/* Vertical gold line */}
          <div className="absolute left-[19px] top-2 bottom-2 w-px bg-gradient-to-b from-gold-accent/60 via-gold-accent/30 to-gold-accent/60" />

          <div className="space-y-8">
            {TIMELINE.map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-6 opacity-0 animate-fade-in-up"
                style={{ animationDelay: `${i * 0.15}s`, animationFillMode: "forwards" }}
              >
                {/* Time badge */}
                <div className="relative z-10 flex-shrink-0 w-10 h-10 rounded-full border border-gold-accent/40 bg-indigo-midnight flex items-center justify-center">
                  <span className="font-body text-xs text-gold-accent">{item.time}</span>
                </div>

                {/* Labels */}
                <div className="pt-1.5">
                  <p className="font-body text-lg text-cream/90">{item.labelFr}</p>
                  <p className="font-arabic text-sm text-cream/50" dir="rtl">{item.labelAr}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
