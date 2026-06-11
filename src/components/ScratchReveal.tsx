"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { SectionWrapper } from "./ui/SectionWrapper";
import { CONTENT } from "@/lib/constants";

function ScratchCard({
  label,
  width,
  height,
  onScratched,
}: {
  label: string;
  width: number;
  height: number;
  onScratched: () => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDrawing = useRef(false);
  const scratchedRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    const grad = ctx.createLinearGradient(0, 0, width, height);
    grad.addColorStop(0, "#c4943a");
    grad.addColorStop(0.4, "#d4a843");
    grad.addColorStop(0.7, "#e8d5a3");
    grad.addColorStop(1, "#d4a843");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = "rgba(255,255,255,0.08)";
    for (let i = 0; i < 8; i++) {
      const y = (i / 7) * height;
      ctx.fillRect(0, y, width, 1);
    }

    for (let i = 0; i < 15; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      const r = Math.random() * 1.2 + 0.3;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255,255,255,0.15)";
      ctx.fill();
    }

    ctx.globalCompositeOperation = "destination-out";
    ctx.lineWidth = 28;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    const getPos = (e: MouseEvent | Touch) => {
      const rect = canvas.getBoundingClientRect();
      return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    let lastX = 0;
    let lastY = 0;

    const start = (x: number, y: number) => {
      isDrawing.current = true;
      lastX = x;
      lastY = y;
    };

    const move = (x: number, y: number) => {
      if (!isDrawing.current) return;
      ctx.beginPath();
      ctx.moveTo(lastX, lastY);
      ctx.lineTo(x, y);
      ctx.stroke();
      lastX = x;
      lastY = y;
    };

    const stop = () => {
      isDrawing.current = false;
      if (scratchedRef.current) return;
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const pixels = imageData.data;
      let transparent = 0;
      for (let i = 3; i < pixels.length; i += 4) {
        if (pixels[i] === 0) transparent++;
      }
      const total = pixels.length / 4;
      if (transparent / total > 0.35) {
        scratchedRef.current = true;
        onScratched();
      }
    };

    const onMouseDown = (e: MouseEvent) => start(e.offsetX, e.offsetY);
    const onMouseMove = (e: MouseEvent) => move(e.offsetX, e.offsetY);
    const onTouchStart = (e: TouchEvent) => {
      e.preventDefault();
      const t = e.touches[0];
      const pos = getPos(t);
      start(pos.x, pos.y);
    };
    const onTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      const t = e.touches[0];
      const pos = getPos(t);
      move(pos.x, pos.y);
    };

    canvas.addEventListener("mousedown", onMouseDown);
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mouseup", stop);
    canvas.addEventListener("mouseleave", stop);
    canvas.addEventListener("touchstart", onTouchStart, { passive: false });
    canvas.addEventListener("touchmove", onTouchMove, { passive: false });
    canvas.addEventListener("touchend", stop);

    return () => {
      canvas.removeEventListener("mousedown", onMouseDown);
      canvas.removeEventListener("mousemove", onMouseMove);
      canvas.removeEventListener("mouseup", stop);
      canvas.removeEventListener("mouseleave", stop);
      canvas.removeEventListener("touchstart", onTouchStart);
      canvas.removeEventListener("touchmove", onTouchMove);
      canvas.removeEventListener("touchend", stop);
    };
  }, [width, height, onScratched]);

  return (
    <div className="relative" style={{ width, height }}>
      <div className="absolute inset-0 flex items-center justify-center font-body text-3xl md:text-4xl text-text/20 pointer-events-none select-none">
        {label}
      </div>
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        className="absolute inset-0 cursor-pointer rounded-sm"
        style={{ width, height, touchAction: "none" }}
      />
    </div>
  );
}

function ConfettiOverlay() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const colors = ["#d4a843", "#e8d5a3", "#c4943a", "#f5efe4", "#c4825a"];
    const particles: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
      rotation: number;
      rotSpeed: number;
      opacity: number;
    }[] = [];

    for (let i = 0; i < 100; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: -20 - Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 4,
        vy: 2 + Math.random() * 4,
        size: 4 + Math.random() * 6,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        rotSpeed: (Math.random() - 0.5) * 10,
        opacity: 1,
      });
    }

    let animId: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      let alive = false;
      for (const p of particles) {
        if (p.opacity <= 0) continue;
        alive = true;
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.05;
        p.rotation += p.rotSpeed;
        p.opacity -= 0.003;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.globalAlpha = Math.max(0, p.opacity);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
        ctx.restore();
      }

      if (alive) {
        animId = requestAnimationFrame(draw);
      }
    };
    draw();

    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[9999] pointer-events-none"
      aria-hidden="true"
    />
  );
}

export function ScratchReveal() {
  const [scratched, setScratched] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const reduce = useReducedMotion();

  const handleScratched = useCallback(() => {
    setScratched((s) => {
      const next = s + 1;
      if (next >= 3 && !showConfetti) {
        setShowConfetti(true);
      }
      return next;
    });
  }, [showConfetti]);

  const allDone = scratched >= 3;
  const cardW = 100;
  const cardH = 72;
  const gap = 12;
  const totalW = cardW * 3 + gap * 2;

  return (
    <SectionWrapper id="scratch">
      <motion.div
        className="flex flex-col items-center"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="font-display text-3xl md:text-4xl text-gold-accent mb-2">
          {CONTENT.scratchTitle}
        </h2>
        <p className="font-arabic text-xl text-gold-accent/50 mb-3" dir="rtl">
          {CONTENT.scratchTitleAr}
        </p>
        <p className="font-body text-sm text-text/40 mb-10 tracking-wide">
          {CONTENT.scratchHint}
        </p>

        <div
          className="flex gap-3 justify-center"
          style={{ width: totalW }}
        >
          {reduce ? (
            <>
              <div className="flex items-center justify-center font-body text-3xl text-gold-accent border border-gold-accent/30 rounded-sm" style={{ width: cardW, height: cardH }}>
                {CONTENT.scratchDay}
              </div>
              <div className="flex items-center justify-center font-body text-3xl text-gold-accent border border-gold-accent/30 rounded-sm" style={{ width: cardW, height: cardH }}>
                {CONTENT.scratchMonth}
              </div>
              <div className="flex items-center justify-center font-body text-3xl text-gold-accent border border-gold-accent/30 rounded-sm" style={{ width: cardW, height: cardH }}>
                {CONTENT.scratchYear}
              </div>
            </>
          ) : (
            <>
              <ScratchCard label={CONTENT.scratchDay} width={cardW} height={cardH} onScratched={handleScratched} />
              <ScratchCard label={CONTENT.scratchMonth} width={cardW} height={cardH} onScratched={handleScratched} />
              <ScratchCard label={CONTENT.scratchYear} width={cardW} height={cardH} onScratched={handleScratched} />
            </>
          )}
        </div>

        <AnimatePresence>
          {allDone && (
            <motion.div
              className="mt-10 text-center"
              initial={{ opacity: 0, y: 16, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="font-display text-4xl md:text-5xl gold-text mb-3">
                {CONTENT.scratchReveal}
              </p>
              <p className="font-arabic text-2xl text-gold-accent/70" dir="rtl">
                {CONTENT.scratchRevealAr}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {showConfetti && <ConfettiOverlay />}
    </SectionWrapper>
  );
}
