# KMAI.tech — Design System Documentation

This document records the current visual system, design tokens, styling conventions, and aesthetic constraints for KMAI.tech as implemented in the codebase.

---

## 1. Color Palette & Token Hierarchy

| Token Name | Hex / Value | Semantic Role |
| :--- | :--- | :--- |
| `brand.darkest` | `#05070B` | Deep near-black page background canvas |
| `brand.dark` | `#08111F` | Primary card, container, and navbar background |
| `brand.surface` | `#0B1F3A` | Elevated surface, drawer backgrounds, progress track |
| `brand.surfaceLight` | `#11294D` | Scrollbar thumb, secondary borders |
| `brand.blue` | `#006EFF` | Core electric blue brand accent (CTAs, glow, active state) |
| `brand.blueLight` | `#1683FF` | Gradient stepping & hover accent |
| `brand.blueGlow` | `rgba(0, 110, 255, 0.25)` | Drop-shadows and ambient light rings |
| `brand.white` | `#FFFFFF` | Primary monumental typography |
| `brand.offwhite` | `#F3F5F7` | Body text highlights, quotes |
| `brand.muted` | `#A0A7B1` | Secondary body text, subheadings, unselected labels |
| `brand.border` | `rgba(255, 255, 255, 0.08)` | Default subtle card/divider borders |
| `brand.borderHover` | `rgba(0, 110, 255, 0.35)` | Interactive hover border highlight |
| Accent Cyan | `#38BDF8` | Gradient terminals, tag highlights, WhatsApp icon |
| Success Green | `#4ADE80` | COMPLETED status pill (`#14532D` background) |

---

## 2. Typography & Hierarchy

- **Primary Sans-Serif**: `Plus Jakarta Sans`, `Inter`, `system-ui`, `sans-serif`
  - Loaded via Google Fonts (`weights: 300, 400, 500, 600, 700, 800`).
  - Used for monumental headlines (`text-5xl` to `text-8xl` / `text-[7.5rem]`), section headers, and editorial narrative body.
- **Technical Monospace**: `JetBrains Mono`, `monospace`
  - Loaded via Google Fonts (`weights: 400, 500, 600`).
  - Used for metadata tags, phase counters (`01 //`), button labels, technical stack badges, and telemetry text.
- **Letter Spacing Conventions**:
  - `tracking-tighter` (`-0.04em`): Monumental display headlines (Hero, Contact).
  - `tracking-tight` (`-0.02em`): Section titles (`h2`, `h3`).
  - `tracking-widest` (`0.2em` to `0.25em`): Monospace metadata headers (`// PHILOSOPHY & ARCHITECTURE`, `PHASE // 01`).

---

## 3. Spacing & Layout Rhythm

- **Global Page Max-Width**: `max-w-7xl mx-auto w-full`
- **Horizontal Viewport Padding**: `px-6 md:px-12`
- **Vertical Section Padding**: `py-28 md:py-40` (standard) / `py-28 md:py-44` (Hero & Contact)
- **Section Dividers**: Every major section is delineated by `border-b border-white/5` or `border-white/10`.
- **Section Headers**: Standardized 2-column header pattern:
  - Left: Monospace tag + bold `h2` title (`text-4xl sm:text-6xl md:text-7xl font-extrabold`).
  - Right: Brief explanatory description (`max-w-md text-sm sm:text-base text-[#A0A7B1] font-light`).

---

## 4. Border & Surface Treatment

- **Subtle Glass Layers**:
  - `bg-glass`: `rgba(8, 17, 31, 0.7)` with `backdrop-filter: blur(12px)`.
  - `bg-glass-card`: `rgba(11, 31, 58, 0.35)` with `backdrop-filter: blur(16px)`.
- **Border Hierarchy**:
  - Default borders: `border border-white/5` to `border-white/10`.
  - Hover states: `hover:border-[#006EFF]/50` with subtle glow.
- **Corner Radii**:
  - Buttons, pills, chips, status tags: `rounded-full`.
  - Standard cards (About, Process, Tech, Trust): `rounded-2xl` (`16px`).
  - Flagship showcase & Modals: `rounded-3xl` (`24px`).
  - Monogram badges & small icons: `rounded-xl` (`12px`).

---

## 5. Major Visual Motifs

- **The Geometric 'K'**:
  - Primary mark composed of a vertical spine, an upper diagonal arm, and a lower diagonal leg.
  - Used in Navbar (`K.`), Hero centerpiece (340px 3D tilt SVG), Favicon, and Footer signature.
- **Status Indicators / Pips**:
  - `w-2 h-2` or `w-2.5 h-2.5` rounded full electric-blue circle with box-shadow (`shadow-[0_0_10px_#006EFF]`).
- **Telemetry Headings**:
  - Prefixed with `//` in monospace cyan/blue (`// EXPERTISE & CAPABILITIES`).
- **Infinite Work Ticker**:
  - Smooth horizontal marquee displaying core studio offerings separated by glowing blue pips.

---

## 6. Existing Animation Conventions

- **Preloader**: Double split-panel vertical slide (`yPercent: -100` / `yPercent: 100`) triggered when progress hits 100%.
- **Cursor Tracking**: `CustomCursor` and `ProjectPreview` follow cursor coordinates using GSAP `quickTo`.
- **Magnetic Buttons**: Parallax movement on hover using mouse offset delta multiplied by strength coefficient.
- **Scroll Scrubber**: Words in `IntroStatement` gradually illuminate from `opacity: 0.15` to `1.0` synced with scroll position.
- **Reduced Motion**: All animations immediately disable or simplify when `prefers-reduced-motion` is active.

---

## 7. Anti-Generic-Design Directives

As established in `AGENTS.md`, KMAI must maintain an elite creative technology studio aesthetic:
- **NO Generic SaaS Clichés**: Avoid rounded cards outlined in neon purple/pink, floating gradient blobs, or cookie-cutter template layouts.
- **NO Resume Tech Grids**: Do not present tools as an isolated catalog checklist; integrate stack details naturally into case studies.
- **NO Stock / AI-Generated Imagery**: Use real, authentic screenshots, client assets, and high-fidelity device mockups.
- **Purpose-Driven Motion**: Every transition must guide attention or communicate physical structure; avoid gratuitous floating elements.
