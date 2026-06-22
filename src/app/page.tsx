"use client";

import { useState, useCallback } from "react";
import { EnvelopeReveal } from "@/components/EnvelopeReveal";
import { HeroSection } from "@/components/HeroSection";
import { InvitationSection } from "@/components/InvitationSection";
import { DressCodeSection } from "@/components/DressCodeSection";
import { TimelineSection } from "@/components/TimelineSection";
import { GallerySection } from "@/components/GallerySection";
import { RsvpSection } from "@/components/RsvpSection";
import { ContactSection } from "@/components/ContactSection";
import { MapSection } from "@/components/MapSection";
import { Footer } from "@/components/Footer";
import { AudioPlayer } from "@/components/AudioPlayer";
import { GoldParticles } from "@/components/GoldParticles";
import { NavBar } from "@/components/NavBar";

export default function Home() {
  const [popupDismissed, setPopupDismissed] = useState(false);

  const handleDismiss = useCallback(() => {
    setPopupDismissed(true);
    window.dispatchEvent(new CustomEvent("start-wedding-audio"));
  }, []);

  return (
    <>
      {!popupDismissed && <EnvelopeReveal onDismiss={handleDismiss} />}

      <main id="main-content" className="pb-20">
        <GoldParticles />
        <HeroSection />
        <InvitationSection />
        <DressCodeSection />
        <TimelineSection />
        <GallerySection />
        <RsvpSection />
        <ContactSection />
        <MapSection />
        <Footer />
      </main>

      <AudioPlayer />
      <NavBar />
    </>
  );
}
