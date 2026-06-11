import { ReactNode } from "react";
import { ArabesquePattern } from "./ArabesquePattern";

interface SectionWrapperProps {
  children: ReactNode;
  id?: string;
  className?: string;
  showPattern?: boolean;
}

export function SectionWrapper({ children, id, className = "", showPattern = true }: SectionWrapperProps) {
  return (
    <section
      id={id}
      className={`relative min-h-screen flex flex-col items-center justify-center py-16 md:py-24 ${className}`}
    >
      {showPattern && <ArabesquePattern />}
      <div className="relative z-10 w-full max-w-2xl mx-auto section-padding flex flex-col items-center text-center">
        {children}
      </div>
    </section>
  );
}
