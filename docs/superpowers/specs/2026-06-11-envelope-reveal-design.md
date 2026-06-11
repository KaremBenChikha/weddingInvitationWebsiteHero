# Envelope Reveal — Design Spec

**Date:** 2026-06-11  
**Feature:** Animated envelope landing page gate for Aicha & Zakaria wedding site

## Overview

Replace the current `WelcomePopup` card overlay with a full-screen interactive envelope that opens via "bloom" animation. The envelope acts as the introductory gate — visitors tap to open it, revealing the couple's names in Arabic calligraphy before auto-transitioning into the main site.

## Decisions Made

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Style direction | Luxe Ivory | Matches existing palette (#faf8f4, #d4a843) |
| Opening animation | Bloom Open (4-petal split) | Dramatic, cinematic, fits "magical invitation" tone |
| Arabic font | Aref Ruqaa (Google Fonts) | Authentic Ruq'ah calligraphy, closest to real Arabic wedding invitations |
| Content inside | Just the names | Minimal, elegant; details already in HeroSection |
| After open | Auto dissolve → HeroSection | No extra tap needed; smooth transition |
| Audio trigger | On dismiss (existing mechanism) | Reuse `start-wedding-audio` CustomEvent |

## User Flow

```
Visit site → see closed envelope → tap → seal shatters → 
4 petals bloom open → names appear → 2.5s pause → 
dissolve → HeroSection (audio starts)
```

## Technical Architecture

### Component: `EnvelopeReveal.tsx`

A single React component rendered as a full-screen overlay (z-[2147483647] like current WelcomePopup). Uses `motion/react` (already installed, v12.40.0) for all animations.

**States:**
1. `idle` — envelope closed, wobbling subtly, hint text pulsing
2. `seal-breaking` — wax seal scales to 0 + opacity fade + gold particle burst
3. `opening` — 4 flaps rotate outward simultaneously (400ms per flap)
4. `revealed` — names visible, 2.5s timer
5. `dissolving` — entire overlay fades out

**Sub-components (div-based, no external assets):**

- **Envelope body**: Cream `div` with gold border, decorative arabesque corners (reuse existing SVG pattern)
- **4 Flaps**: `motion.div` elements with `clip-path: polygon(...)` shaped like envelope flaps. Each rotates around its hinge point.
  - Top flap: `transformOrigin: "top center"`, rotates backward (rotateX)
  - Bottom flap: `transformOrigin: "bottom center"`, rotates forward
  - Left flap: `transformOrigin: "left center"`, rotates left
  - Right flap: `transformOrigin: "right center"`, rotates right
- **Wax Seal**: Centered SVG circle with radial gold gradient + drop-shadow. Diamond/star SVG inside (reuse favicon shape).
- **Names**: `motion.div` containing `عائشة و زكريا` in Aref Ruqaa (text-4xl→6xl) + "Aicha & Zakaria" in Playfair Display below
- **Background**: Reuse `GoldParticles` canvas with 2x particle density during opening

### Animation Sequence

```
0ms     → Idle: envelope scale 0.95→1 (entrance)
+200ms  → Seal glow pulse (goldShimmer animation, 2s loop)
[tap]
0ms     → Seal: scale 1→0, opacity 0, gold particle burst (8-12 extra particles)
+300ms  → Top flap: rotateX 0°→-100°
+300ms  → Bottom flap: rotateX 0°→100°
+300ms  → Left flap: rotateY 0°→100°
+300ms  → Right flap: rotateY 0°→-100°
+800ms  → Names: opacity 0→1, scale 0.8→1, y 20→0
+3300ms → Dissolve: entire component opacity→0, GoldParticles reduce
+3700ms → Dispatch start-wedding-audio, unmount component
```

### CSS 3D Setup

```css
.perspective-container {
  perspective: 1200px;
  perspective-origin: center;
}
.flap {
  transform-style: preserve-3d;
  backface-visibility: hidden;
}
```

### Accessibility

- `prefers-reduced-motion`: Skip animation entirely — show names immediately with fade-in, then auto-dissolve after 1.5s
- `aria-label` on envelope: "Ouvrir l'invitation de mariage — اضغط لفتح الدعوة"
- Keyboard: Enter/Space triggers tap action
- Focus trap: envelope is the only interactive element when visible

### Mobile

- Envelope max-width: `max-w-[320px]` on mobile, `max-w-[400px]` on desktop
- Maintain aspect ratio ~5:7 (portrait envelope)
- Touch target: full envelope area is tappable
- Hint text scales down: text-sm mobile, text-base desktop

## Files Changed

| File | Action | Details |
|------|--------|---------|
| `src/components/EnvelopeReveal.tsx` | **Create** | ~200 lines, full component |
| `src/app/page.tsx` | **Modify** | Replace `WelcomePopup` import/usage |
| `src/app/globals.css` | **Modify** | Add Aref Ruqaa @import, `--font-arabic-display` token, envelope CSS |
| `src/lib/constants.ts` | **Modify** | Add envelope hint strings |
| `src/components/WelcomePopup.tsx` | **Archive** | Not deleted, just unused (can delete later if desired) |

## New Dependencies

**None.** All existing: `motion/react` + Tailwind CSS + CSS @keyframes.

## Verification

- [ ] Build passes (`npm run build`)
- [ ] Static export works (`out/` directory generated)
- [ ] Mobile: 375px viewport — envelope fits, tap works
- [ ] Desktop: 1440px — envelope centered, tap/click works
- [ ] Keyboard: Enter/Space triggers open
- [ ] Reduced motion: animation skipped, still functional
- [ ] After dissolve: HeroSection visible, audio playing
