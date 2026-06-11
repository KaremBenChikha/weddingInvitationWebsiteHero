# Aicha & Zackaria Wedding Invitation — Design Spec

**Date:** 2026-06-11
**Project:** Static wedding invitation website
**Domain:** aichandzack.vercel.app
**Repo:** weddingInvitationWebsiteHero (public GitHub)

---

## Summary

Single-page wedding invitation for Aicha & Zackaria. Static Next.js site on Vercel. Mobile-first, Moroccan/North African aesthetic (deep indigo + gold). Bilingual: French + Arabic (RTL).

## Tech Stack

- Next.js 14 App Router, `output: "export"` (static)
- Tailwind CSS v4
- TypeScript
- Vercel hosting

## Design Tokens

| Token | Value |
|-------|-------|
| BG Primary | `#1a1a3e` |
| BG Secondary | `#0f0f2a` |
| Text Primary | `#f5f0e8` |
| Gold Accent | `#d4a843` |
| Gold Light | `#e8d5a3` |
| Muted Detail | `#3a3a6e` |
| Headline Font | Playfair Display |
| Arabic Font | Amiri |
| Latin Body Font | Cormorant Garamond |

## Sections (top to bottom)

### 1. Welcome Popup

Full-screen overlay. "Vous êtes invité·e" / "تمت دعوتكم". Subtitle. "Découvrir les détails" / "اكتشف التفاصيل" button. Dismisses on click, triggers audio.

### 2. Hero

Couple names "Aicha & Zackaria" (Playfair Display, large). Arabic names (Amiri, RTL). Date "11.07.2026". Location "Trois-Rivières, Québec". Gold arabesque divider.

### 3. Invitation

"Nous vous invitons à notre mariage" / "ندعوكم لحضور حفل زفافنا".
"Célébrons ensemble le plus beau jour de notre vie" / "لنحتفل معًا بأجمل يوم في حياتنا".

### 4. Timeline

"Déroulement de la journée" / "برنامج اليوم". Placeholder schedule (ceremony, reception, dinner, party). Gold dotted timeline with icons.

### 5. Gallery

Collage of placeholder couple photos with gold border accents.

### 6. Contact

Organizer phone number. "Des questions ?" / "أسئلة؟".

### 7. Footer

Gold mandala/rosette SVG. Names repeated. Floating audio play/pause button (bottom-right).

## Music

Royalty-free track. Auto-plays after popup dismissal. Floating toggle button.

## File Structure

```
/business/aichandzack/
├── next.config.ts
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── postcss.config.mjs
├── public/
│   ├── audio/
│   │   └── wedding-song.mp3
│   ├── images/
│   │   └── (placeholder photos)
│   └── fonts/
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── globals.css
│   ├── components/
│   │   ├── WelcomePopup.tsx
│   │   ├── HeroSection.tsx
│   │   ├── InvitationSection.tsx
│   │   ├── TimelineSection.tsx
│   │   ├── GallerySection.tsx
│   │   ├── ContactSection.tsx
│   │   ├── Footer.tsx
│   │   ├── AudioPlayer.tsx
│   │   └── ui/
│   │       ├── GoldDivider.tsx
│   │       ├── ArabesquePattern.tsx
│   │       └── SectionWrapper.tsx
│   └── lib/
│       └── constants.ts
```

## Deployment

1. Create GitHub repo `weddingInvitationWebsiteHero`
2. Push code
3. Import into Vercel, domain `aichandzack.vercel.app`
