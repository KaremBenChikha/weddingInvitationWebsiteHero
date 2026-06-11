# Envelope Reveal — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace WelcomePopup with a full-screen interactive envelope that blooms open to reveal Arabic calligraphy names, then auto-dissolves into the main site.

**Architecture:** Single new React component (`EnvelopeReveal.tsx`) using `motion/react` + CSS 3D transforms for flap animations. Follows existing WelcomePopup pattern (fullscreen overlay, body scroll lock, `onDismiss` callback). Integrates via direct swap in `page.tsx`.

**Tech Stack:** Next.js 16 (static export), Tailwind v4, motion/react v12.40.0, Aref Ruqaa (Google Fonts)

---

### Task 1: Add Aref Ruqaa font + CSS variables

**Files:**
- Modify: `src/app/globals.css:1-2`
- Modify: `src/app/globals.css:5-17`

- [ ] **Step 1: Add Aref Ruqaa to Google Fonts @import**

Add `Aref+Ruqaa:wght@400;700` to the existing `@import` URL on line 1. Split the single long URL into two for readability:

Change:
```css
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,500;1,600;1,700;1,800;1,900&family=Amiri:ital,wght@0,400;0,700;1,400;1,700&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&display=swap');
```

To:
```css
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,500;1,600;1,700;1,800;1,900&family=Amiri:ital,wght@0,400;0,700;1,400;1,700&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&family=Aref+Ruqaa:wght@400;700&display=swap');
```

- [ ] **Step 2: Add `--font-arabic-display` CSS variable**

In the `@theme inline` block, add after `--font-arabic`:

```css
--font-arabic-display: 'Aref Ruqaa', serif;
```

- [ ] **Step 3: Add envelope 3D perspective CSS**

Add a new `@layer components` block (or append to existing) after the `.gold-text` rule:

```css
.perspective-envelope {
  perspective: 1200px;
}

.envelope-flap {
  backface-visibility: hidden;
}
```

- [ ] **Step 4: Commit**

```bash
git add src/app/globals.css
git commit -m "feat: add Aref Ruqaa font and envelope CSS tokens"
```

---

### Task 2: Add envelope text to constants

**Files:**
- Modify: `src/lib/constants.ts`

- [ ] **Step 1: Read current constants file to find insertion point**

Read `src/lib/constants.ts` and locate the `CONTENT` object — specifically `popupTitle`, `popupTitleAr`, etc. We'll add envelope-specific strings.

- [ ] **Step 2: Add envelope keys**

Add these keys to the `CONTENT` object (before or after existing popup keys):

```ts
envelopeHint: "Ouvrez l'invitation",
envelopeHintAr: "افتح الدعوة",
envelopeSkip: "Passer",
envelopeSkipAr: "تخطي",
envelopeLabel: "Invitation de mariage — اضغط لفتح الدعوة",
```

- [ ] **Step 3: Commit**

```bash
git add src/lib/constants.ts
git commit -m "feat: add envelope reveal text strings"
```

---

### Task 3: Create EnvelopeReveal component

**Files:**
- Create: `src/components/EnvelopeReveal.tsx`

- [ ] **Step 1: Create the component file with full implementation**

Write the complete `EnvelopeReveal.tsx`:

```tsx
"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { CONTENT } from "@/lib/constants";

interface EnvelopeRevealProps {
  onDismiss: () => void;
}

type Stage = "idle" | "opening" | "revealed" | "dissolving";

export function EnvelopeReveal({ onDismiss }: EnvelopeRevealProps) {
  const reduce = useReducedMotion();
  const [stage, setStage] = useState<Stage>("idle");
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.body.style.overflow = "hidden";
    }
    return () => {
      if (typeof document !== "undefined") {
        document.body.style.overflow = "";
      }
    };
  }, []);

  const handleTap = useCallback(() => {
    if (stage !== "idle") return;
    setStage("opening");
    setTimeout(() => setStage("revealed"), 1400);
    setTimeout(() => setStage("dissolving"), 3900);
    setTimeout(() => {
      setVisible(false);
      if (typeof document !== "undefined") {
        document.body.style.overflow = "";
      }
      setTimeout(onDismiss, 500);
    }, 4400);
  }, [stage, onDismiss]);

  const handleSkip = useCallback(() => {
    setVisible(false);
    if (typeof document !== "undefined") {
      document.body.style.overflow = "";
    }
    setTimeout(onDismiss, 500);
  }, [onDismiss]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleTap();
      }
    },
    [handleTap]
  );

  const sealVariants = {
    idle: { scale: 1, opacity: 1 },
    opening: { scale: [1, 1.3, 0], opacity: [1, 0.8, 0], transition: { duration: 0.6, ease: "easeInOut" } },
  };

  const topFlap = {
    idle: { rotateX: 0 },
    opening: { rotateX: -105, transition: { duration: 0.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] } },
  };
  const bottomFlap = {
    idle: { rotateX: 0 },
    opening: { rotateX: 105, transition: { duration: 0.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] } },
  };
  const leftFlap = {
    idle: { rotateY: 0 },
    opening: { rotateY: 105, transition: { duration: 0.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] } },
  };
  const rightFlap = {
    idle: { rotateY: 0 },
    opening: { rotateY: -105, transition: { duration: 0.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] } },
  };

  const nameVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 24 },
    revealed: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
  };

  const dissolveBg = {
    idle: { opacity: 1 },
    dissolving: { opacity: 0, transition: { duration: 0.5 } },
  };

  // Reduced motion: simple fade
  if (reduce) {
    return (
      <AnimatePresence>
        {visible && (
          <motion.div
            className="fixed inset-0 z-[2147483647] flex items-center justify-center bg-[#faf8f4]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex flex-col items-center text-center px-6">
              <h1
                className="font-arabic-display text-5xl sm:text-6xl md:text-7xl gold-text text-shadow-gold mb-4"
                dir="rtl"
              >
                عائشة و زكريا
              </h1>
              <p className="font-display text-2xl md:text-3xl text-gold-accent/70 mb-8">
                Aicha &amp; Zakaria
              </p>
              <button
                onClick={handleSkip}
                className="font-body text-sm text-text/40 hover:text-text/70 transition-colors cursor-pointer"
              >
                {CONTENT.envelopeSkip} / {CONTENT.envelopeSkipAr}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[2147483647] flex flex-col items-center justify-center"
          variants={dissolveBg}
          animate={stage === "dissolving" ? "dissolving" : "idle"}
          style={{ background: "#faf8f4" }}
        >
          {/* Floating gold particles background — subtle */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {Array.from({ length: 30 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full"
                style={{
                  width: 2 + Math.random() * 3 + "px",
                  height: 2 + Math.random() * 3 + "px",
                  background: Math.random() > 0.5 ? "#d4a843" : "#e8d5a3",
                  left: Math.random() * 100 + "%",
                  top: Math.random() * 100 + "%",
                  opacity: 0.3 + Math.random() * 0.4,
                }}
                animate={{
                  y: [0, -(20 + Math.random() * 40)],
                  opacity: [0.3 + Math.random() * 0.4, 0],
                }}
                transition={{
                  duration: 3 + Math.random() * 4,
                  repeat: Infinity,
                  delay: Math.random() * 5,
                  ease: "linear",
                }}
              />
            ))}
          </div>

          <div className="perspective-envelope relative w-[88vw] max-w-[340px] md:max-w-[380px] aspect-[3/4]">
            {/* Envelope body (visible behind flaps when open) */}
            <div className="absolute inset-0 bg-surface border border-gold-accent/20 rounded-sm flex items-center justify-center">
              {/* Corner accents */}
              <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-gold-accent/30" />
              <div className="absolute top-2 right-2 w-3 h-3 border-t border-r border-gold-accent/30" />
              <div className="absolute bottom-2 left-2 w-3 h-3 border-b border-l border-gold-accent/30" />
              <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-gold-accent/30" />
            </div>

            {/* Names — hidden until revealed */}
            <motion.div
              className="absolute inset-0 z-0 flex flex-col items-center justify-center text-center px-4"
              variants={nameVariants}
              animate={stage === "revealed" ? "revealed" : "hidden"}
              initial="hidden"
            >
              <h1
                className="font-arabic-display text-4xl sm:text-5xl md:text-6xl gold-text text-shadow-gold mb-2 leading-normal"
                dir="rtl"
              >
                عائشة و زكريا
              </h1>
              <p className="font-display text-xl md:text-2xl text-gold-accent/60 mt-2">
                Aicha &amp; Zakaria
              </p>
            </motion.div>

            {/* Flaps layer */}
            {/* Top flap */}
            <motion.div
              className="envelope-flap absolute top-0 left-0 right-0 z-10 origin-top"
              style={{
                height: "50%",
                background: "linear-gradient(180deg, #f5efe4 0%, #ede5d5 100%)",
                clipPath: "polygon(0 0, 100% 0, 50% 100%)",
              }}
              variants={topFlap}
              animate={stage === "idle" ? "idle" : "opening"}
            />

            {/* Bottom flap */}
            <motion.div
              className="envelope-flap absolute bottom-0 left-0 right-0 z-10 origin-bottom"
              style={{
                height: "50%",
                background: "linear-gradient(0deg, #f5efe4 0%, #ede5d5 100%)",
                clipPath: "polygon(0 100%, 100% 100%, 50% 0)",
              }}
              variants={bottomFlap}
              animate={stage === "idle" ? "idle" : "opening"}
            />

            {/* Left flap */}
            <motion.div
              className="envelope-flap absolute top-0 left-0 bottom-0 z-10 origin-left"
              style={{
                width: "50%",
                background: "linear-gradient(90deg, #f5efe4 0%, #ede5d5 100%)",
                clipPath: "polygon(0 0, 100% 50%, 0 100%)",
              }}
              variants={leftFlap}
              animate={stage === "idle" ? "idle" : "opening"}
            />

            {/* Right flap */}
            <motion.div
              className="envelope-flap absolute top-0 right-0 bottom-0 z-10 origin-right"
              style={{
                width: "50%",
                background: "linear-gradient(270deg, #f5efe4 0%, #ede5d5 100%)",
                clipPath: "polygon(100% 0, 100% 100%, 0 50%)",
              }}
              variants={rightFlap}
              animate={stage === "idle" ? "idle" : "opening"}
            />

            {/* Wax Seal — centered, on top of flaps */}
            <motion.div
              className="absolute z-20 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer"
              variants={sealVariants}
              animate={stage === "opening" || stage === "revealed" || stage === "dissolving" ? "opening" : "idle"}
              onClick={handleTap}
              onKeyDown={handleKeyDown}
              role="button"
              tabIndex={0}
              aria-label={CONTENT.envelopeLabel}
              style={{ pointerEvents: stage === "idle" ? "auto" : "none" }}
            >
              {/* Outer glow ring */}
              <motion.div
                className="absolute inset-0 rounded-full"
                animate={stage === "idle" ? {
                  boxShadow: [
                    "0 0 12px rgba(212,168,67,0.3)",
                    "0 0 24px rgba(212,168,67,0.5)",
                    "0 0 12px rgba(212,168,67,0.3)",
                  ],
                } : {}}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
              {/* Seal body */}
              <svg
                width="48"
                height="48"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="24" cy="24" r="23" fill="url(#seal-grad)" stroke="#b8922e" strokeWidth="1.5" />
                <path
                  d="M24 2L28.5 22.5L48 24L28.5 25.5L24 46L19.5 25.5L0 24L19.5 22.5L24 2Z"
                  fill="#e8d5a3"
                  opacity="0.7"
                />
                <path
                  d="M24 6L26.5 22.5L42 24L26.5 25.5L24 42L21.5 25.5L6 24L21.5 22.5L24 6Z"
                  fill="#d4a843"
                />
                <defs>
                  <radialGradient id="seal-grad" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#f0e0b0" />
                    <stop offset="60%" stopColor="#d4a843" />
                    <stop offset="100%" stopColor="#a67c22" />
                  </radialGradient>
                </defs>
              </svg>
            </motion.div>

            {/* Hint text below envelope */}
            {stage === "idle" && (
              <motion.div
                className="absolute -bottom-14 left-1/2 -translate-x-1/2 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                <p className="font-body text-sm text-text/40 animate-gold-shimmer">
                  {CONTENT.envelopeHint}
                </p>
                <p className="font-arabic text-xs text-text/30 mt-0.5" dir="rtl">
                  {CONTENT.envelopeHintAr}
                </p>
              </motion.div>
            )}

            {/* Skip button */}
            {stage === "idle" && (
              <motion.button
                className="absolute -bottom-28 left-1/2 -translate-x-1/2 font-body text-xs text-text/30 hover:text-text/50 transition-colors cursor-pointer"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
                onClick={handleSkip}
              >
                {CONTENT.envelopeSkip}
              </motion.button>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
```

- [ ] **Step 2: Build to verify TypeScript compiles**

```bash
npm run build 2>&1 | tail -15
```
Expected: Build succeeds with no errors. May have unused `CONTENT` keys warning — ignore.

- [ ] **Step 3: Commit**

```bash
git add src/components/EnvelopeReveal.tsx
git commit -m "feat: add EnvelopeReveal component with bloom-open animation"
```

---

### Task 4: Wire EnvelopeReveal into page.tsx

**Files:**
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Replace WelcomePopup import**

Change line 4 from:
```tsx
import { WelcomePopup } from "@/components/WelcomePopup";
```
To:
```tsx
import { EnvelopeReveal } from "@/components/EnvelopeReveal";
```

- [ ] **Step 2: Replace WelcomePopup usage**

Change line 27 from:
```tsx
{!popupDismissed && <WelcomePopup onDismiss={handleDismiss} />}
```
To:
```tsx
{!popupDismissed && <EnvelopeReveal onDismiss={handleDismiss} />}
```

- [ ] **Step 3: Build and verify**

```bash
npm run build 2>&1 | tail -15
```
Expected: Build succeeds. Static pages generated.

- [ ] **Step 4: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat: wire EnvelopeReveal into main page"
```

---

### Task 5: Final verification

**Files:** None new

- [ ] **Step 1: Run full build**

```bash
npm run build 2>&1
```
Expected: No errors, static export to `out/`.

- [ ] **Step 2: Check no WelcomePopup references remain**

```bash
grep -r "WelcomePopup" src/ --include="*.tsx" --include="*.ts"
```
Expected: Only `WelcomePopup.tsx` itself (archived, not imported anywhere).

- [ ] **Step 3: Check CSS syntax**

```bash
npx tailwindcss --help > /dev/null 2>&1
```
The build would have caught CSS errors. Confirming it passed.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "chore: final verification of envelope reveal feature"
```

---

### Task 6: Push and deploy

- [ ] **Step 1: Push to GitHub**

```bash
git push
```

- [ ] **Step 2: Verify Vercel deploy**

Check `aichandzack.vercel.app` — envelope should appear as the landing gate.
