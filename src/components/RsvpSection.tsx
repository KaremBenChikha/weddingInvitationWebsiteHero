"use client";

import { useState, FormEvent, useCallback } from "react";
import { motion, useReducedMotion } from "motion/react";
import { SectionWrapper } from "./ui/SectionWrapper";
import { GoldDivider } from "./ui/GoldDivider";
import { CONTENT, RSVP_URL } from "@/lib/constants";

export function RsvpSection() {
  const reduce = useReducedMotion();
  const [name, setName] = useState("");
  const [guests, setGuests] = useState("1");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = useCallback(async (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    setStatus("loading");

    try {
      const res = await fetch(RSVP_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), guests: Number(guests), message: message.trim() }),
      });
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }, [name, guests, message]);

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
          <p className="font-arabic text-lg text-gold-accent/50" dir="rtl">{CONTENT.rsvpSuccessAr}</p>
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

        <form onSubmit={handleSubmit} className="w-full space-y-5">
          <div>
            <label className="block font-body text-sm text-text/60 mb-1.5">
              {CONTENT.rsvpNameLabel}
            </label>
            <input
              type="text"
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
