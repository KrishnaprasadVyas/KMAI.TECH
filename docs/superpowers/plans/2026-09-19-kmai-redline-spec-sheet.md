# KMAI "Redline" Spec-Sheet Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform KMAI.tech into an Awwwards-caliber portfolio site built around the "Redline" technical-drawing / print-shop spec-sheet concept (paper `#F3EFE7`, ink `#15130F`, signal redline accent `#FF3B1F`, Fraunces + Space Grotesk typography, interactive mask cursor, hold-to-view project reel, horizontal tear-sheets, and conversational stamp-approved intake).

**Architecture:** A lightweight, high-craft React 19 + TypeScript + Tailwind CSS application using GSAP for precise plotter-line orchestration and Lenis for fluid horizontal and vertical gesture handling. The mask cursor uses dynamic coordinate tracking (`--mask-x`, `--mask-y`) and CSS/SVG clip-paths to reveal the annotated blueprint layer beneath project entries on hover, while pointer-event listeners drive hold-to-view frame cycling with SVG progress indicators.

**Tech Stack:** React 19, TypeScript, Vite, Tailwind CSS, GSAP, Lucide React, Playwright.

**Spec:** User prompt directives for KMAI "Redline" technical-drawing / print-shop spec-sheet portfolio.

## Global Constraints & Hard Bans

- **Strict Palette**: Paper `#F3EFE7`, Ink `#15130F`, Signal Accent `#FF3B1F` (redline/editor's-pen red) used functionally for markup/callouts only. No dark navy / electric blue palette.
- **Strict Typography**:
  - Display/Headlines: `Fraunces` (variable serif, optical size, expressive italics)
  - UI/Body: `Space Grotesk`
  - Technical annotation labels only: `Space Mono`
- **Hard Bans**:
  - No stacked headline lines fading white → gray → darker gray.
  - No rounded-xl cards, soft drop shadows, or glassmorphism. Hard edges and hairlines only.
  - No numbered sections (01/02/03) unless content is a genuine sequence.
  - No ALL-CAPS tracked eyebrow labels, middot-joined meta text, or em-dash labels.
  - No cursor that only follows the mouse with no other behavior.
  - No arrows appended to every link ("Learn more →").
  - No generic agency copy; maintain direct, technical-minded tone.
- **Motion Rules**:
  - One orchestrated hero load: thin SVG drafting guide lines draw in first (`stroke-dashoffset`), then headline snaps into place via `clip-path`.
  - Nothing else auto-animates on scroll. Motion elsewhere responds only to cursor or hold/drag.
  - Respect `prefers-reduced-motion` fully.

---

### Task 1: Foundations, Typography & Design Tokens

**Files:**
- Modify: `index.html`
- Modify: `tailwind.config.js`
- Modify: `src/index.css`

**Interfaces:**
- Typography: `font-serif` / `font-display` maps to `Fraunces`, `font-sans` / `font-body` maps to `Space Grotesk`, `font-mono` maps to `Space Mono`.
- Colors: `bg-paper` (`#F3EFE7`), `text-ink` (`#15130F`), `text-redline` / `border-redline` (`#FF3B1F`), `border-hairline` (`rgba(21, 19, 15, 0.15)`).

- [ ] **Step 1: Update `index.html` font preconnects and canvas styling**
  - Load Fraunces (variable with opsz and italic), Space Grotesk, and Space Mono.
  - Set base canvas background to `#F3EFE7` and text to `#15130F`.
- [ ] **Step 2: Update `tailwind.config.js` design tokens**
  - Configure `paper`, `ink`, `redline`, and font families.
- [ ] **Step 3: Update `src/index.css` for spec-sheet base styling**
  - Add drafting grid patterns, hairline utility classes, cut-mark registration styles, selection color `#FF3B1F` with `#F3EFE7` text.
- [ ] **Step 4: Verify build and fonts**
  - Run `npm run build` to confirm compilation.

---

### Task 2: Drafting Mask Cursor & Loupe

**Files:**
- Create: `src/components/common/RedlineCursor.tsx`
- Modify: `src/App.tsx`

**Interfaces:**
- Produces: `RedlineCursor` component which manages a global pointer tracker updating CSS custom variables `--mask-x`, `--mask-y` and renders an SVG reticle with redline crosshairs.
- In inspection mode over project entries, provides visual affordances (loupe diameter, coordinate readout, hold-to-scrub indicator).

- [ ] **Step 1: Implement `RedlineCursor.tsx`**
  - Pointer position listener with smooth lerp / raf updates.
  - Precision crosshair reticle in `#FF3B1F`.
  - Mask dimension tracking for the work section reveal mechanism.
  - Hold-to-scrub circular progress indicator for active thumbnail interaction.
- [ ] **Step 2: Mount in `App.tsx` with touch detection bypass**
  - Ensure touch devices cleanly fallback without blocking interaction.
- [ ] **Step 3: Verify cursor movement and variables**
  - Run lint and build check.

---

### Task 3: Orchestrated Plotter Hero Section

**Files:**
- Modify: `src/components/sections/Hero.tsx`
- Modify: `src/components/layout/Navbar.tsx`

**Interfaces:**
- Orchestration: SVG drafting guide lines draw in first with `stroke-dashoffset`, followed by headline snapping in via `clip-path`.
- Layout: Asymmetric 12-column grid. Fraunces display headline full-width, intro paragraph offset into columns 9–12 at a distinct baseline.
- Copy: *"We don't run a discovery phase. We show up with a working build by week two, then argue about the details."*
- Technical spec block: `SPEC NO. 2026-KM`, scale `1:1`, registration marks `+` at corners.

- [ ] **Step 1: Rebuild `Navbar.tsx`**
  - Minimal spec-sheet header with registration crop marks, ink `#15130F`, studio wordmark, direct navigation links (`Work`, `Capabilities`, `Personnel`, `Intake`), and intake button with drafting border.
- [ ] **Step 2: Rebuild `Hero.tsx`**
  - Implement drafting guide lines with SVG paths that animate via GSAP `strokeDashoffset: 0`.
  - Fraunces headline snapping into place via `clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)'`.
  - Offset copy in last 4 columns.
  - Full `prefers-reduced-motion` compliance.
- [ ] **Step 3: Verify hero rendering**
  - Capture rendered output and verify visual alignment.

---

### Task 4: Continuous Horizontal Work Reel & The Mask Reveal Interaction

**Files:**
- Create: `src/components/sections/WorkReel.tsx`
- Modify: `src/components/sections/SelectedWork.tsx`
- Modify: `src/data/projects.ts`

**Interfaces:**
- Layout: Continuous horizontal reel with wheel and drag interaction.
- Visual: Hard-edged oversized tear-sheets with thin hairline borders (`border-[#15130F]/20`), corner crop marks `+`, dimension rules.
- Mask Reveal: Circular mask reveals the underlying second "annotated / blueprint layer" (redline wireframe lines, measurement callouts, technical specs) only where the cursor passes.
- Hold-to-View: Press and hold thumbnail to scrub through a multi-frame project preview reel with a filling progress ring affordance.

- [ ] **Step 1: Enrich `src/data/projects.ts` with technical redline annotations and multi-frame preview reels**
  - Frame sequences for hold-to-view scrubbing (hero, flow diagram, interface view).
  - Technical specs (latency, frame budget, backend architecture, redline annotations).
- [ ] **Step 2: Implement dual-layer tear-sheet card in `WorkReel.tsx`**
  - Base layer: High-res authentic client photography and clean typography.
  - Annotated layer: Architectural wireframe, dimension rules, redline annotations (`#FF3B1F`).
  - Clip-path / CSS mask coordinate integration revealing the annotated layer under the mask cursor.
- [ ] **Step 3: Implement Hold-to-View scrub engine**
  - Press-and-hold pointer listeners triggering frame scrubbing with filling circular indicator.
- [ ] **Step 4: Mount horizontal scroll reel in `SelectedWork.tsx`**
  - Wheel and drag gestures for fluid horizontal movement.

---

### Task 5: Uneven-Row Capabilities Section

**Files:**
- Modify: `src/components/sections/Services.tsx` (re-engineered as unnumbered uneven-width rows)

**Interfaces:**
- Layout: 3 unnumbered capabilities laid out as uneven-width rows:
  1. Product & Web Architecture (e.g. 7 columns)
  2. Operational Automation & Middleware (e.g. 9 columns)
  3. Applied AI & Machine Intelligence (e.g. 8 columns)
- Styling: Hard horizontal hairline dividers, technical specification annotations, no generic agency copy.

- [ ] **Step 1: Rewrite `Services.tsx` into unnumbered uneven-width rows**
  - Distinct column spans per capability.
  - Direct technical scope descriptions and real architectural deliverables.
  - Functional redline callouts (`[TOLERANCE: ZERO DRIFT]`, `[RUNTIME: EDGE / WASM]`).
- [ ] **Step 2: Verify responsive grid adaptation**
  - Test desktop, tablet, and mobile stacking.

---

### Task 6: Studio & Engineering Register

**Files:**
- Modify: `src/components/sections/About.tsx`

**Interfaces:**
- Layout: Asymmetric spec-sheet engineering register.
- Content: Founders Krishnaprasad Vyas, Maithili Makkar, Ali Abu Nazahat presented with technical domain responsibilities, system architecture focus, and commit discipline. Hard hairlines and registration marks.

- [ ] **Step 1: Rebuild `About.tsx` as an Engineering Personnel Register**
  - Table-like spec-sheet structure with hairline boundaries.
  - Honest, direct founder bios and craft commitments.

---

### Task 7: Conversational Intake & Redline Approval Stamp

**Files:**
- Modify: `src/components/sections/Contact.tsx`
- Modify: `src/components/layout/Footer.tsx`

**Interfaces:**
- Conversational Intake: Step-by-step interactive intake (Step 1: Name / Organization → Step 2: System requirements / what you're building → Step 3: Deployment timeline & budget scope).
- Send Action: Stamped redline approval mark (`APPROVED FOR PRODUCTION / REDLINE PASSED`) with angled redline ink border.
- Footer: Technical print-shop colophon on paper canvas with registration marks and revision codes.

- [ ] **Step 1: Implement conversational intake sequence in `Contact.tsx`**
  - Smooth progression without page jumps.
  - Interactive selection chips and direct text inputs.
  - Final stamped approval submission button.
- [ ] **Step 2: Update `Footer.tsx`**
  - Clean colophon with coordinates, revision date, copyright, and registration targets.

---

### Task 8: Verification, Browser Inspection & E2E Tests

**Files:**
- Modify: `tests/e2e/redesign-first-four.spec.ts`
- Modify: `tests/e2e/smoke.spec.ts`
- Create: `scripts/capture-redline.mjs`

- [ ] **Step 1: Update Playwright tests for Redline spec-sheet criteria**
  - Verify paper canvas `#F3EFE7` and ink `#15130F`.
  - Verify Fraunces display typography.
  - Verify absence of banned items (no fading gray headlines, no dark navy backgrounds, no rounded-xl cards, no generic agency copy).
- [ ] **Step 2: Run build, lint, and test suite**
  - `npm run build`
  - `npm run lint`
  - `npx playwright test`
- [ ] **Step 3: Capture multi-viewport screenshots**
  - Capture desktop (1440×900), tablet (768×1024), and mobile (390×844) viewports.
- [ ] **Step 4: Update walkthrough artifact and git commit**
