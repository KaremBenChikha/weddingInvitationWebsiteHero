"use client";

import { useState, useRef, FormEvent, useCallback } from "react";
import { motion, useReducedMotion } from "motion/react";
import { SectionWrapper } from "./ui/SectionWrapper";
import { GoldDivider } from "./ui/GoldDivider";
import { CONTENT, RSVP_URL } from "@/lib/constants";

export function RsvpSection() {
  const reduce = useReducedMotion();
  const formRef = useRef<HTMLFormElement>(null);
  const [name, setName] = useState("");
  const [guests, setGuests] = useState("1");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = useCallback((e: FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    setStatus("loading");

    const iframe = document.createElement("iframe");
    iframe.name = "rsvp-frame";
    iframe.style.display = "none";
    document.body.appendChild(iframe);

    const form = formRef.current;
    if (!form) return;
    form.target = "rsvp-frame";
    form.submit();

    setTimeout(() => {
      setStatus("success");
      document.body.removeChild(iframe);
    }, 1500);
  }, [name]);

  if (status === "success") {
    return (
      <SectionWrapper id="rsvp">
        <motion.div
          className="flex flex-col items-center text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gold-accent mb-6">
            <circle cx="24" cy="24" r="22" stroke="currentColor" strokeWidth="2" />
            <path d="M14 24L21 31L34 17" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <p className="font-display text-2xl md:text-3xl text-gold-accent mb-2">{CONTENT.rsvpSuccess}</p>
          <p className="font-arabic text-lg text-gold-accent/50 mb-8" dir="rtl">{CONTENT.rsvpSuccessAr}</p>

          <a
            href="/wedding.ics"
            className="inline-flex items-center gap-3 px-6 py-3 border border-gold-accent/30 rounded-sm hover:border-gold-accent hover:bg-gold-accent/5 transition-all duration-300"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gold-accent">
              <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M16 2V6M8 2V6M3 10H21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <span className="font-body text-sm text-text/80">Ajouter au calendrier</span>
          </a>
        </motion.div>
      </SectionWrapper>
    );
  }

  return (
    <SectionWrapper id="rsvp" showPattern={false}>
      <motion.div
        className="flex flex-col items-center w-full max-w-md mx-auto"
        initial={reduce ? false : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="font-display text-3xl md:text-4xl text-gold-accent mb-2">
          {CONTENT.rsvpTitle}
        </h2>
        <p className="font-arabic text-xl text-gold-accent/50 mb-2" dir="rtl">
          {CONTENT.rsvpTitleAr}
        </p>
        <p className="font-body text-sm text-text/40 mb-8">{CONTENT.rsvpSubtitle}</p>

        <GoldDivider />

        <form ref={formRef} onSubmit={handleSubmit} action={RSVP_URL} method="POST" className="w-full space-y-5">
          <div>
            <label className="block font-body text-sm text-text/60 mb-1.5">
              {CONTENT.rsvpNameLabel}
            </label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-3 bg-surface-alt border border-border rounded-sm font-body text-text placeholder:text-text/25 focus:outline-none focus:border-gold-accent transition-colors"
              placeholder={CONTENT.rsvpNameLabelAr}
            />
          </div>

          <div>
            <label className="block font-body text-sm text-text/60 mb-1.5">
              {CONTENT.rsvpGuestsLabel}
            </label>
            <select
              name="guests"
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              className="w-full px-4 py-3 bg-surface-alt border border-border rounded-sm font-body text-text focus:outline-none focus:border-gold-accent transition-colors appearance-none cursor-pointer"
            >
              {Array.from({ length: 10 }, (_, i) => (
                <option key={i + 1} value={String(i + 1)}>
                  {i + 1}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-body text-sm text-text/60 mb-1.5">
              {CONTENT.rsvpMessageLabel}
            </label>
            <textarea
              name="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={3}
              className="w-full px-4 py-3 bg-surface-alt border border-border rounded-sm font-body text-text placeholder:text-text/25 focus:outline-none focus:border-gold-accent transition-colors resize-none"
              placeholder={CONTENT.rsvpMessageLabelAr}
            />
          </div>

          {status === "error" && (
            <p className="text-center font-body text-sm text-red-400">{CONTENT.rsvpError}</p>
          )}

          <button
            type="submit"
            disabled={status === "loading" || !name.trim()}
            className="w-full py-3 bg-gold-accent text-text font-display text-sm tracking-widest uppercase rounded-sm hover:bg-gold-light disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
          >
            {status === "loading" ? "..." : CONTENT.rsvpSubmit}
          </button>
        </form>
      </motion.div>
    </SectionWrapper>
  );
}
