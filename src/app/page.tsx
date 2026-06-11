"use client";

import { useState, useCallback } from "react";
import { WelcomePopup } from "@/components/WelcomePopup";
import { HeroSection } from "@/components/HeroSection";
import { InvitationSection } from "@/components/InvitationSection";
import { TimelineSection } from "@/components/TimelineSection";
import { GallerySection } from "@/components/GallerySection";
import { ContactSection } from "@/components/ContactSection";
import { MapSection } from "@/components/MapSection";
import { Footer } from "@/components/Footer";
import { AudioPlayer } from "@/components/AudioPlayer";
import { GoldParticles } from "@/components/GoldParticles";

export default function Home() {
  const [popupDismissed, setPopupDismissed] = useState(false);

  const handleDismiss = useCallback(() => {
    setPopupDismissed(true);
    window.dispatchEvent(new CustomEvent("start-wedding-audio"));
  }, []);

  return (
    <>
      {!popupDismissed && <WelcomePopup onDismiss={handleDismiss} />}

      <main>
        <GoldParticles />
        <HeroSection />
        <InvitationSection />
        <TimelineSection />
        <GallerySection />
        <ContactSection />
        <MapSection />
        <Footer />
      </main>

      <AudioPlayer />
    </>
  );
}
