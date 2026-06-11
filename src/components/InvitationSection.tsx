import { CONTENT } from "@/lib/constants";
import { GoldDivider } from "./ui/GoldDivider";
import { SectionWrapper } from "./ui/SectionWrapper";

export function InvitationSection() {
  return (
    <SectionWrapper id="invitation">
      <div className="animate-fade-in-up">
        <GoldDivider />

        <p className="font-body text-2xl md:text-3xl text-text/90 leading-relaxed mb-6">
          {CONTENT.invitationLine1}
        </p>

        <p className="font-arabic text-xl md:text-2xl text-gold-accent/60 leading-relaxed mb-12" dir="rtl">
          {CONTENT.invitationLine1Ar}
        </p>

        <GoldDivider />

        <p className="font-body text-xl md:text-2xl text-text/80 italic leading-relaxed">
          {CONTENT.invitationLine2}
        </p>

        <p className="font-arabic text-lg md:text-xl text-text/60 italic mt-4" dir="rtl">
          {CONTENT.invitationLine2Ar}
        </p>
      </div>
    </SectionWrapper>
  );
}
