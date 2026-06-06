# FightCamp Wizard — Premium Redesign ("Cornerman")

**Date:** 2026-06-06
**Type:** UI refactor / visual redesign (restyle in place)
**Status:** Approved design — ready for implementation plan

## Goal

Transform the marketing site from a "vibe-coded" generic-AI aesthetic into a premium,
cohesive, art-directed product. Keep **all existing content, copy, structure, and wiring**
(waitlist form, scroll-spy nav, routing, count-ups, carousel). Change only the **visual
design layer** — palette, typography, components, texture, and motion.

The chosen direction is **"Cornerman" — an all-dark, cinematic, athletic system** in the
spirit of Whoop / Nike Training, with the wizard mascot kept as a prominent, expressive
brand character and **dynamic, engaging (characterful) motion**. Premium ≠ sterile: we keep
the personality and energy, and remove only the amateur tells.

## Non-Goals

- No content rewrite, no new sections, no removed sections.
- No structural/architectural rebuild — components keep their props, state, and logic.
- No new dependencies (stay on React + Vite + Tailwind + Framer Motion).
- No backend/form/integration changes (Web3Forms, env, routing untouched).

## What Reads as "Vibe-Coded" Today (to remove)

1. Decorative emoji scattered as accents and floating confetti (✨ 🪄 💧 🎉 🥊 🔥 etc.).
2. Arbitrary 4-color accent palette (`flame`, `mint`, `grape`, `sun`) used without system.
3. `.btn-chunky` — Duolingo-style 3D "press" buttons.
4. Gradient text (`.text-gradient`) overused as the default headline treatment.
5. Frosted-glass cards (`.glass-card`) used everywhere regardless of context.
6. Cartoon motion: `wiggle`, `bounce-soft`, floating shapes, bobbing mascot amid sparkles.
7. Light theme that, combined with the above, reads as a generic SaaS template.

## Design System

### Palette (disciplined)

| Token | Value | Use |
|-------|-------|-----|
| `bg` (base) | `#0A0E14` | Page background |
| `surface` | `#10151E` | Cards, panels |
| `surface-2` | `#0D1320` | Phone/dashboard insets |
| `lift` (hero radial) | `#15233F` | Radial depth behind hero/CTA |
| `hairline` | `rgba(255,255,255,0.07)` | Borders, dividers |
| brand blue | `#2563EB` / `#3B82F6` / accent text `#5B9CFF` | Primary accent (kept) |
| **gold** | `#F59E0B` / `#FBBF24` | **Sparing** championship accent: "Pro", #1 rank, key status, select highlights |
| success | `#34D399` | Functional only: on-track / made-weight in data viz |
| warn | `#F59E0B` (shared w/ gold) | "Watch" status in dashboards |
| text | `#EAF0FB` primary / `#9FB0CC` muted | Body copy |

The old `flame` / `mint` / `grape` / `sun` tokens are **retired** (mint survives semantically
as `success`; sun is replaced by `gold`). Gold is used deliberately and rarely — it should
feel like a title belt, not a highlighter.

### Typography

- **Display:** `Archivo` (600–900), frequently **uppercase**, tight tracking — headlines, stats. Replaces Poppins.
- **Body:** `Inter` (kept).
- **Mono/labels:** `IBM Plex Mono` — eyebrows (`// LABEL`), stat labels, technical readouts.

### Texture & surface

- Fine fading grid (`bg-grid`, retuned to `rgba(91,131,214,~0.06)`) behind hero/CTA sections.
- Hairline borders instead of heavy shadows; soft inner-surface cards instead of glass blur.
- Radial navy "lift" glow behind the hero and final CTA. Ambient breathing glow allowed but subtle.

### The wizard mascot (featured, art-directed)

Kept prominent across: Hero (focal), MeetWizard (chat), Features (corner peek of AI tile),
Pricing (Pro card), FinalCTA, About. It stays **expressive and animated** — a lively idle
float and reactive motion are intended — but every placement is intentional with proper
glow/drop-shadow, never surrounded by emoji sparkles or random floating shapes.

### Motion language (dynamic & characterful)

A single shared vocabulary, applied consistently:
- Scroll reveals: fade + rise with spring easing `[0.22,1,0.36,1]` (keep `Reveal`).
- Count-ups on stats (keep), animated bar/ring fills.
- Wizard: lively idle float + subtle reactive motion (engaging, controlled — not jittery).
- Hovers: springy lift / magnetic feel on cards and buttons.
- Animated grid/glow ambience in hero & CTA.
- **Removed:** `wiggle`, `bounce-soft`, floating emoji/shape loops.
- Respect `prefers-reduced-motion` (already handled in `index.css` — keep).

## Component Kit (rebuilt primitives — restyle in place)

These changes propagate to every section automatically:

1. **`tailwind.config.ts`** — replace color tokens (retire rainbow, add `gold`/surface scale),
   update `backgroundImage` (dark hero radial, retune gradients), update shadows for dark
   (glow/float in blue), retire `wiggle`/`bounce-soft` keyframes, keep `float`/`shimmer`/`spin-slow`.
2. **`src/index.css`** — dark `body` base; rework component classes:
   - `.btn-chunky` → refined solid primary (crisp depth, hover lift, focus glow) — keep class name to avoid touching every callsite, or introduce `.btn-primary` and alias. **Decision: keep `.btn-chunky` class name, restyle its rules** (minimizes churn; callsites unchanged).
   - `.btn-ghost` → hairline-bordered dark ghost.
   - `.eyebrow` → mono `// LABEL`, dark-on-surface.
   - `.glass-card` → dark inner-surface card (`surface` + hairline). Keep class name, restyle.
   - `.text-gradient` → keep but use sparingly (blue→light-blue); headlines default to solid.
   - `.bg-grid` → retuned for dark.
   - `::selection`, focus rings → dark-appropriate.
3. **Fonts** — add Archivo + IBM Plex Mono to `index.html` (Google Fonts) alongside Inter.

Because most sections consume these shared classes/tokens, restyling them does the majority
of the work. Per-section passes then fix layout-specific color literals and remove emoji.

## Section-by-Section Plan

All sections are **restyled, not rebuilt** — same JSX structure, props, and logic; updated
classes, colors, and decoration removal.

- **Navbar** — dark translucent on scroll; restyle CTA; keep scroll-spy + mobile menu logic.
- **Hero** — dark radial + grid; Archivo uppercase headline w/ blue accent; mono eyebrow;
  remove `SPARKLES` emoji array; keep wizard (art-directed float, halo glow); keep waitlist +
  app-store CTAs, avatar stack, star rating, scroll cue.
- **SocialProof** — dark stat cards; retire rainbow; discipline badges → clean text/mono pills
  (drop emoji icons); keep count-ups.
- **MeetWizard** — dark chat bubbles; keep wizard + chat thread; remove floating ✨/💧.
- **Features (bento)** — dark tiles (`surface` + hairline); recolor mini-viz to blue/gold/success;
  keep SVG icons, charts, macro ring; keep wizard corner peek (refined).
- **HowItWorks** — dark step cards; replace emoji step icons with the existing SVG/icon style or
  numbered mono badges; keep connector line + traveling dot; remove floating shapes/sparkles.
- **Showcase** — dark stage; keep phone mockup, tabs, auto-advance carousel; retune blobs to
  subtle blue ambience; remove sun/mint floating shapes.
- **Community** — dark feed/gym/leaderboard; gold for #1 rank + streak; success/warn for status;
  remove confetti dots & floating emoji reactions; keep avatars, layout, gamification.
- **Coaches** — already dark; refine to the token system (status colors, gold accents, glow).
- **Pricing** — dark cards; Pro card uses gold "Popular" badge + blue glow; keep monthly/yearly
  toggle, price animation, feature lists, wizard accent.
- **FAQ** — dark accordion; keep behavior.
- **FinalCTA** — dark radial + grid (replace bright brand-grad block); keep wizard hero + glow;
  remove the 6 floating emoji; keep waitlist + app-store.
- **Footer** — already dark; align to tokens.
- **About page** — dark hero, mission panel, values grid; remove emoji accents & sparkle;
  keep narrative + mascot.
- **PhoneMockup / WaitlistForm / AppStoreButton / Reveal / ScrollProgress** — restyle for dark
  (form input contrast, button states); logic untouched. Replace ⚠️/checkmark emoji in
  WaitlistForm states with inline SVG or styled marks.

## Approach

**Restyle in place** (chosen): rework `tailwind.config.ts` + `index.css` tokens/primitives
first, then a per-section pass for color literals, emoji removal, and motion cleanup. Preserves
all wiring (form, routing, scroll-spy, carousel). Fastest path to premium with lowest risk.

Rejected alternatives: (a) full component rebuild — unnecessary churn, risks breaking working
integrations; (b) introduce a UI component library — adds dependencies and restructuring for no
benefit here.

## Success Criteria

- Zero decorative emoji remain (emoji only if functionally part of copy, by deliberate choice).
- No `flame`/`mint`/`grape`/`sun` arbitrary usage; palette is base + blue + gold + functional.
- No `.btn-chunky` cartoon press buttons, no `wiggle`/`bounce-soft`.
- Consistent dark system across **all** sections and the About page.
- Wizard featured and lively, but art-directed (no sparkle halos).
- `npm run build` succeeds; `prefers-reduced-motion` respected; existing functionality
  (waitlist submit, nav scroll-spy, carousel, pricing toggle, FAQ accordion) intact.
- Responsive (mobile → desktop) preserved.

## Risks / Notes

- Mini-mockups inside Features/Community/Coaches contain many inline color literals — the
  per-section pass must catch these so nothing stays light-themed.
- Dark forms need deliberate input contrast/placeholder/focus states for accessibility.
- Keep contrast ratios AA for body text on dark.
```
