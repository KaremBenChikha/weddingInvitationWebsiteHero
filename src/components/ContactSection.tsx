import { CONTACT, CONTENT } from "@/lib/constants";
import { SectionWrapper } from "./ui/SectionWrapper";
import { GoldDivider } from "./ui/GoldDivider";

export function ContactSection() {
  return (
    <SectionWrapper id="contact" className="bg-surface-alt">
        <h2 className="font-display text-3xl md:text-4xl text-gold-accent mb-2">
          {CONTENT.contactTitle}
        </h2>
        <p className="font-arabic text-xl text-gold-accent/50 mb-8" dir="rtl">
          {CONTENT.contactTitleAr}
        </p>

        <GoldDivider />

        <p className="font-body text-lg text-text/50 mb-4">
          N&apos;hésitez pas à nous contacter
        </p>
        <p className="font-arabic text-base text-text/30 mb-6" dir="rtl">
          لا تترددوا في الاتصال بنا
        </p>

        <a
          href={`tel:${CONTACT.phone}`}
          className="inline-flex items-center gap-3 px-6 py-3 border border-gold-accent/30 rounded-sm hover:border-gold-accent/60 hover:bg-gold-accent/5 transition-all duration-300"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gold-accent">
            <path d="M22 16.92V19.92C22.0011 20.1985 21.9441 20.4741 21.8325 20.7293C21.7209 20.9845 21.5573 21.2136 21.3521 21.4018C21.1469 21.5901 20.9046 21.7335 20.6407 21.8227C20.3768 21.9119 20.0974 21.9451 19.82 21.92C16.7428 21.5856 13.787 20.5341 11.19 18.85C8.77382 17.3147 6.72533 15.2662 5.18999 12.85C3.49997 10.2412 2.44824 7.27099 2.11999 4.17999C2.09501 3.90344 2.12788 3.62475 2.2165 3.36161C2.30512 3.09847 2.44757 2.85667 2.63476 2.65161C2.82195 2.44655 3.04981 2.2827 3.30379 2.17051C3.55777 2.05832 3.83234 2.00025 4.10999 2H7.10999C7.5953 1.99522 8.06581 2.16708 8.43376 2.48352C8.80171 2.79996 9.04207 3.23944 9.10999 3.71999C9.23662 4.68005 9.47145 5.62272 9.80999 6.52999C9.94454 6.88792 9.97366 7.2769 9.8939 7.65087C9.81415 8.02483 9.62886 8.3681 9.35999 8.63999L8.08999 9.90999C9.51355 12.4135 11.5865 14.4864 14.09 15.91L15.36 14.64C15.6319 14.3711 15.9752 14.1858 16.3491 14.1061C16.7231 14.0263 17.1121 14.0554 17.47 14.19C18.3773 14.5285 19.3199 14.7634 20.28 14.89C20.7659 14.9585 21.2094 15.2032 21.5259 15.5773C21.8425 15.9513 22.0105 16.4285 22 16.92Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="font-body text-2xl text-text/90 tracking-wide">{CONTACT.phone}</span>
        </a>
    </SectionWrapper>
  );
}
