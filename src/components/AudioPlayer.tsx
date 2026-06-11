"use client";

import { useState, useRef, useEffect, useCallback } from "react";

export function AudioPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    audioRef.current = new Audio("/audio/wedding-song.mp3");
    audioRef.current.loop = true;
    audioRef.current.volume = 0.4;
    return () => {
      audioRef.current?.pause();
    };
  }, []);

  const startAudio = useCallback(() => {
    if (!audioRef.current) return;
    setVisible(true);
    audioRef.current.play().then(() => setPlaying(true)).catch(() => {});
  }, []);

  useEffect(() => {
    const handler = () => startAudio();
    window.addEventListener("start-wedding-audio", handler);
    return () => window.removeEventListener("start-wedding-audio", handler);
  }, [startAudio]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      audioRef.current.play().then(() => setPlaying(true)).catch(() => {});
    }
  };

  return (
    <div
      className="fixed bottom-6 right-6 z-[2147483647] transition-all duration-500"
      style={{
        opacity: visible ? 1 : 0,
        visibility: visible ? "visible" : "hidden",
      }}
    >
      <button
        onClick={togglePlay}
        className="w-14 h-14 rounded-full bg-indigo-midnight border border-gold-accent/40 flex items-center justify-center hover:border-gold-accent hover:scale-105 hover:shadow-[0_0_25px_rgba(212,168,67,0.25)] transition-all duration-300"
        aria-label={playing ? "Pause musique" : "Jouer musique"}
      >
        {playing ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="#d4a843" xmlns="http://www.w3.org/2000/svg">
            <rect x="6" y="4" width="4" height="16" rx="1" />
            <rect x="14" y="4" width="4" height="16" rx="1" />
          </svg>
        ) : (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="#d4a843" xmlns="http://www.w3.org/2000/svg">
            <polygon points="5,3 19,12 5,21" />
          </svg>
        )}
      </button>
    </div>
  );
}
