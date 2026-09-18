---
name: KMAI.tech
description: Independent digital technology studio architecting high-performance software, bespoke web experiences, and operational automation.
colors:
  primary: "#0A0C0F"
  neutral-bg: "#F2F0EA"
  accent: "#216BFF"
  accent-dark: "#0D43B8"
  muted: "#73777F"
  canvas-dark: "#07090E"
  surface-dark-line: "rgba(255, 255, 255, 0.08)"
  surface-light-line: "rgba(10, 12, 15, 0.08)"
typography:
  display:
    fontFamily: "Instrument Sans, sans-serif"
    fontSize: "clamp(3.5rem, 9.5vw, 9.5rem)"
    fontWeight: 800
    lineHeight: 0.88
    letterSpacing: "-0.05em"
  headline:
    fontFamily: "Instrument Sans, sans-serif"
    fontSize: "clamp(2.25rem, 5vw, 4.5rem)"
    fontWeight: 700
    lineHeight: 0.92
    letterSpacing: "-0.04em"
  title:
    fontFamily: "Instrument Sans, sans-serif"
    fontSize: "clamp(1.5rem, 2.5vw, 2.25rem)"
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Geist, sans-serif"
    fontSize: "clamp(1rem, 1.2vw, 1.25rem)"
    fontWeight: 400
    lineHeight: 1.45
    letterSpacing: "normal"
  serif-quote:
    fontFamily: "Instrument Serif, serif"
    fontSize: "clamp(1.75rem, 3.5vw, 3.25rem)"
    fontWeight: 400
    lineHeight: 1.15
  label:
    fontFamily: "IBM Plex Mono, monospace"
    fontSize: "0.75rem"
    fontWeight: 500
    letterSpacing: "0.15em"
rounded:
  none: "0px"
  xs: "2px"
  sm: "4px"
spacing:
  xs: "8px"
  sm: "16px"
  md: "24px"
  lg: "48px"
  xl: "80px"
  2xl: "128px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.neutral-bg}"
    rounded: "{rounded.xs}"
    padding: "12px 24px"
  button-primary-hover:
    backgroundColor: "{colors.accent}"
    textColor: "#FFFFFF"
  button-accent:
    backgroundColor: "{colors.accent}"
    textColor: "#FFFFFF"
    rounded: "{rounded.xs}"
    padding: "12px 24px"
---

# Design System: KMAI.tech

## Overview

**Creative North Star: "The Kinetic Blueprint"**

KMAI's design system is an art-directed editorial framework architected for an independent creative technology studio. It rejects the clichés of generic SaaS landing pages, AI startup templates, and junior developer portfolios—banning glowing neon blur spheres, boxy card grids, pill buttons, and fake monospace metadata.

The system is defined by six inviolable visual tenets:
- **Enormous black typography**: Colossal, tightly tracked display type that commands the viewport with structural authority.
- **Warm white space**: Generous, uncrowded negative space that lets typography and compositions breathe.
- **Massive project imagery**: High-impact editorial spreads showcasing authentic client artifacts and systems.
- **Occasional blue intervention**: Electric Blue (`#216BFF`) used strictly as an intentional graphic punctuation mark (~5%), never as continuous background noise.
- **Almost no borders**: Borderless, free-flowing compositions where spatial hierarchy is created through scale, whitespace, and layout rather than boxed card containers.
- **Occasional black full-bleed sections**: Intentional, monolithic near-black plates (`#07090E`) that punctuate the warm white space for dramatic architectural pacing.

**Key Characteristics:**
- Disciplined editorial typography pairing colossal sans display with high-contrast italic serif quotations.
- Flat tonal layering with zero artificial drop shadows.
- Micro-radii (`2px`) for interactive controls maintaining sharp angular precision.
- Purposeful GPU-accelerated motion choreographed at 120Hz via Lenis and GSAP.

## Colors

The palette is rooted in stark architectural contrast: monumental black and deep obsidian grounded by warm paper whitespace, punctuated by precise electric blue signal marks.

### Primary
- **Enormous Black / Ink** (`#0A0C0F`): Used for monumental display typography, primary headlines, active text, and dark button states on light canvas.

### Accent
- **Blueprint Signal Blue** (`#216BFF`): The studio's signature accent. Used sparingly for interactive hover states, brand mark punctuation, and active status indicators.
- **Deep Cobalt** (`#0D43B8`): Active/pressed state for accent triggers.

### Neutral
- **Warm White Space / Paper** (`#F2F0EA`): The primary warm negative space ground.
- **Obsidian Void** (`#07090E`): Deep architectural near-black for occasional full-bleed contrast sections (e.g. Hero, Statement plates, and Contact).
- **Architectural Muted Slate** (`#73777F` / `#8E939E`): Secondary captions, narrative subtext, index indicators, and metadata.
- **Structural Hairlines** (`rgba(255, 255, 255, 0.08)` / `rgba(10, 12, 15, 0.08)`): Subtle 1px dividers when spatial separation requires physical demarcation.

### Named Rules
- **The 5% Intervention Rule.** Electric Blue (`#216BFF`) is strictly restricted to ≤5% of screen area. It acts as an occasional, intentional graphic intervention or punctuation mark—never as large background fills, neon gradients, or ambient glow.
- **The Tonal Alternation Rule.** The experience alternates between generous warm white space and occasional monolithic black full-bleed sections to create rhythmic, cinematic pacing.

## Typography

**Display Font:** `Instrument Sans`, sans-serif (fallbacks: `-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`)
**Body Font:** `Geist`, sans-serif
**Editorial Serif Font:** `Instrument Serif`, serif (used italicized for client voices and quotes)
**Label/Mono Font:** `IBM Plex Mono`, monospace (used strictly for index numbers like `01 / 04` and tabular data)

**Character:**
Monumental, tight, and architectural. The display type carries severe negative letter-spacing (`-0.05em`) and compressed leading (`0.88`), giving words monolithic sculptural weight. Editorial serif quotations provide a human, publication-grade counterpoint.

### Hierarchy
- **Display XL** (800 weight, `clamp(58px, 9.5vw, 152px)`, `line-height: 0.88`, `tracking: -0.055em`): Monumental statements (`WE BUILD DIGITAL EXPERIENCES.`).
- **Display L / Headline** (700 weight, `clamp(42px, 6.5vw, 96px)`, `line-height: 0.90`, `tracking: -0.045em`): Major section anchors and manifesto statements.
- **Title / H2** (600 weight, `clamp(28px, 3.5vw, 56px)`, `line-height: 1.05`, `tracking: -0.03em`): Feature titles, service names, and founder names.
- **Editorial Serif** (400 italic, `clamp(24px, 3.2vw, 48px)`, `line-height: 1.15`): Authentic client quotes and reflective commentary.
- **Body Large** (400 weight, `clamp(18px, 1.5vw, 22px)`, `line-height: 1.4`): Lead introductory narratives and section positioning.
- **Body Base** (400 weight, `16px`, `line-height: 1.5`): Standard explanations and bios.
- **Label / Index** (500 weight, `11px - 12px`, `tracking: 0.15em`, uppercase): Section indices (`01 / 04`), category tags, and studio status.

### Named Rules
- **The Enormous Scale Rule.** Display headlines must be monumental. If a headline feels like a standard SaaS H1, it is too small. It should command the composition through pure physical scale.
- **The No-Faux-Metadata Rule.** Monospace text is reserved exclusively for real numeric indices (`01 / 04`) or technical status. Never generate fake coordinates, fictional timezones, or bracketed filler like `[ 00 / INDEPENDENT DIGITAL TECHNOLOGY STUDIO ]`.

## Layout

- **Spatial Grid:** 12-column responsive layout with asymmetric groupings.
- **Max Viewport Width:** `1540px` with generous side margins (`px-6 sm:px-10 md:px-16`).
- **Section Spacing:** Generous breathing room (`py-28 sm:py-36 md:py-48`), prioritizing negative space over component packing.
- **Density:** Deliberately airy. Information is presented in clear sequential rhythm rather than dense multi-column grids.

### Named Rules
- **The Borderless Rule.** Content hierarchy is established through typography scale, negative space, and image composition. Bordered card containers and grid boxes are strictly banned; almost no borders exist.

## Elevation & Depth

The system uses purely flat tonal surfaces. Artificial drop shadows, ambient blur halos, and diffuse glows are completely eliminated (`box-shadow: none`).

Depth is achieved through:
1. **Tonal Contrast**: Stacking warm white space against full-bleed obsidian plates.
2. **Layered Media**: Massive project imagery with natural depth and crisp aspect ratios.
3. **Kinetic Overlays**: Interactive cursor follower, smooth mask reveals, and architectural curtain wipes.

### Named Rules
- **The Flat-By-Default Rule.** All surfaces, buttons, and inputs are flat at rest. Depth is communicated through contrast and typographic scale, never through artificial drop shadows or neon glows.

## Shapes

- **Form Language:** Crisp, architectural, and razor-sharp.
- **Corner Radii:**
  - Controls & Buttons: `rounded-[2px]` (strict micro-radius).
  - Cards & Containers: `rounded-none` (borderless full-bleed or flat rectangular framing).
  - Punctuation Dots: `rounded-full` (`w-1.5 h-1.5` static geometric dots).
- **Prohibitions:** Rounded pill buttons (`rounded-full` on buttons) and bubbly card borders (`rounded-2xl`, `rounded-3xl`) are forbidden.

## Components

### Buttons & Interactive Controls
- **Shape:** Sharp rectangular with `2px` micro-radius (`rounded-[2px]`).
- **Primary:** High-contrast solid fill (`bg-white` or `bg-[#0A0C0F]`), crisp text (`px-5 py-2.5`), font-medium.
- **Hover:** Smooth color shift to Electric Blue (`hover:bg-[#216BFF] hover:text-white`), transition duration 200ms.
- **Action Triggers:** Minimal text with circular arrow indicator (`group inline-flex items-center gap-3`).

### Navigation
- **Header:** Minimal floating bar (`h-20 md:h-24`), borderless at rest, transitioning to backdrop-blur with subtle hairline (`border-b border-white/[0.05]`) on scroll.
- **Links:** Understated text (`text-[#8E939E] hover:text-white`), zero pill wrappers.

### Project & Work Showcases
- **Structure:** Massive editorial spreads. Large 16:9 and responsive media frames paired with asymmetric typographic titles and narrative descriptions.
- **Interaction:** Smooth hover transitions with custom floating cursor state and direct case study triggers.

### Inputs & Forms
- **Style:** Borderless inputs with single bottom hairline rules (`border-b border-white/20 focus:border-white`). Zero boxed input containers.
- **Focus:** Sharp contrast change; zero glowing focus rings.

### Preloader
- **Style:** Architectural loading screen. Centered `GeometricK` + `KMAI`, 1px hairline progress line, quiet tabular percentage, and a silk curtain wipe upwards (`yPercent: -100`, `ease: 'power4.inOut'`).

## Do's and Don'ts

### Do:
- **Do** use monumental typography (`clamp(58px, 9.5vw, 152px)`) with compressed leading (`0.88`) and tight tracking (`-0.05em`).
- **Do** give content generous negative space with warm white space and intentional full-bleed black plates.
- **Do** showcase massive, authentic client project imagery.
- **Do** restrict Electric Blue (`#216BFF`) strictly to occasional signal interventions (≤5% of screen area).
- **Do** use `2px` micro-radii on interactive controls for architectural precision.
- **Do** maintain 100% test pass rate, clean TypeScript builds, and zero console errors.

### Don't:
- **Don't** create boxed card grids, bordered containers, or dashboard-style tiles.
- **Don't** use glowing neon spheres, diffuse drop shadows, or background noise overlays.
- **Don't** use rounded pill buttons or bubble cards (`rounded-2xl`, `rounded-3xl`).
- **Don't** generate faux-editorial metadata, fake timestamps, GPS coordinates, or brackets like `[ 00 / INDEPENDENT DIGITAL TECHNOLOGY STUDIO ]`.
- **Don't** clutter the experience with generic marketing buzzwords or AI-slop copy.
