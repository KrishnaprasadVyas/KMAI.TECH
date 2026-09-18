# KMAI.TECH Art-Directed Visual Redesign Implementation Plan (First 4 Areas)

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Completely eliminate the generic AI/vibe-coded aesthetic (glowing borders, cyan gradients, repeated card boxes, tiny technical text, decorative noise) and execute an art-directed creative technology studio redesign for the first four areas (Header, Hero, Manifesto, First Selected Work project) inspired by Cappen, Uncommon Studio, Dennis Snellenberg, and Minh Pham.

**Architecture:** Implement "Architectural Monolith" visual direction featuring an asymmetric 12-column Swiss editorial grid, monumental display typography (8vw–11vw), deep near-black canvas (`#08090C`), crisp off-white (`#F5F6F8`), and electric cobalt (`#0066FF`) used strictly as a graphic accent/rule. Hero and Selected Work are transformed from card stacks into full-bleed editorial case study moments with physical cursor follower mechanics and zero decorative glow.

**Tech Stack:** React 19, TypeScript, Vite, Tailwind CSS, GSAP 3, ScrollTrigger, Lenis Smooth Scroll, Playwright.

**Spec:** Derived directly from the user's prompt specifications and live browser inspection of the 4 reference websites (`cappen.com`, `uncommonstudio.com.au`, `dennissnellenberg.com`, `minhpham.design`).

## Global Constraints

- Never introduce `any` or disable TypeScript strictness (`tsc -b` must pass with 0 errors).
- Do not install new dependencies without necessity; reuse existing GSAP, Lenis, Lucide, and Tailwind setup.
- Eliminate all default glow effects (`text-glow`, `box-glow`, `noise-overlay`, cyan gradient text, blurry radial blobs).
- Electric blue (`#0066FF`) must be used strictly as a graphic accent (hairlines, active indicators, vertex crosshairs), NEVER as a blurry neon glow or full-gradient background.
- Desktop and mobile layouts must be treated as independent compositions; mobile must never simply be a squished 11,000px card stack.
- Touch-device safety: Disable pointer-dependent followers and magnetic physics on touch devices (`pointer: coarse`).
- Scope limitation (Step 16): Implement ONLY Header, Hero, Manifesto, and the First Selected Work project (Shri Gurudev Ashram). Leave remaining sections untouched until this design foundation is validated in real browser viewports.

---

## Reference Analysis & Synthesis

### Reference 01: Cappen (https://cappen.com/)
- **Visual Distinctiveness:** Radical negative space (~90% open canvas), pure architectural off-white/dark restraint, extreme contrast between micro-labels (`12px`) and massive void, 4-corner spatial boundary anchors.
- **Interaction Principles:** Progressive reveal of case studies, magnetic focal elements, zero decorative borders or card wrappers.
- **Layout Principles:** Extreme spatial tension; content anchored to viewport corners rather than center-stacked.
- **What NOT to Copy:** Extreme emptiness that hides what the business actually does; all-white canvas (KMAI is deep navy/near-black).
- **Translation to KMAI:** Use spatial tension and radical decluttering. Anchor telemetry to grid bounds and let primary case studies dominate the visual field without boxed containers.

### Reference 02: Uncommon Studio (https://uncommonstudio.com.au/)
- **Visual Distinctiveness:** Monumental display typography (Neue Montreal at `67.5px`–`90px` with tight negative tracking `-0.9px` and tight line-height `1.05`), full-width architectural wordmark anchored to the bottom edge, asymmetric 12-column grid.
- **Interaction Principles:** Text mask reveals (`textMask`), clean video/interactive focal point, understated pill triggers (`WORK WITH US`, `PLAY REEL`).
- **Layout Principles:** Asymmetric column assignment (headline in cols 1–7, featured work preview in cols 10–12); full-width chapter transitions.
- **What NOT to Copy:** Warm beige/editorial serif pairing; video reel player.
- **Translation to KMAI:** Use massive, tightly kerned display type with deliberate line breaks (`WE ARCHITECT / HIGH-VELOCITY / DIGITAL SYSTEMS.`), an asymmetric 12-column grid, and clean hairlines instead of boxed cards.

### Reference 03: Dennis Snellenberg (https://dennissnellenberg.com/)
- **Visual Distinctiveness:** Warm charcoal canvas (`#1c1d20`), massive running typographic marquee (`216px`), borderless editorial project lists with hairline dividing rules.
- **Interaction Principles:** Floating circular cursor preview with physical velocity skew and smooth damping (`gsap.quickTo`); tactile magnetic buttons.
- **Layout Principles:** Zero cards in portfolio presentation; projects presented as an elegant editorial index with large typographic titles, metadata columns, and cursor-hover image reveals.
- **What NOT to Copy:** Solo freelancer personal portrait hero.
- **Translation to KMAI:** First Selected Work project presented as a colossal case study spread with Dennis Snellenberg cursor follower physics, horizontal hairline dividers, and authentic client deliverables.

### Reference 04: Minh Pham (https://minhpham.design/)
- **Visual Distinctiveness:** Brutally confident, colossal display typography (`116.7px` Avant Garde with `-5.8px` letter-spacing) juxtaposed with razor-sharp micro-typography (`10px`–`11px` with `+5.8px` tracking), editorial pull-quotes acting as illustrations.
- **Interaction Principles:** Scroll-scrubbed opacity reveals, high-contrast inverted hover states.
- **Layout Principles:** Dramatic scale contrasts (10x ratio between headline and utility labels); intentional asymmetry.
- **What NOT to Copy:** Meme/casual copy tone; sand/beige colorway.
- **Translation to KMAI:** Dramatic typographic scale contrast: Display headlines dominate the viewport, supported by razor-sharp monospace metadata and deliberate asymmetric alignment.

---

## The Three Visual Directions & Selection

### Direction 1: "ARCHITECTURAL MONOLITH" (Selected Direction)
- **Visual Concept:** The digital studio as an architectural monograph. Structural purity, rigorous typographic tension, monumental black-and-white contrast with singular electric blue graphic hairlines. Zero card containers, zero gradients, zero glowing blur.
- **Typography:** Display: Colossal Neo-Grotesk (`text-6xl sm:text-8xl lg:text-[7.5rem]`, tracking `-0.05em`, leading `0.92`). Body: Clean neutral sans (`16px`, leading `1.6`). Utility: Monospace (`11px`, tracking `+0.15em`).
- **Color:** Canvas: Deep Near-Black (`#08090C`). Text: Chalk White (`#F5F6F8`), Slate (`#8A92A0`). Accent: Electric Cobalt (`#0066FF`) strictly for hairlines, crosshair vertex markers, and active index marks.
- **Grid:** Asymmetric 12-column architectural grid with 1px hairline dividing axes and intentional negative space voids.
- **Hero:** Monumental 3-tier typographic statement, structural geometric K watermark integration, pinned corner telemetry, zero glowing balls.
- **First Project:** Full-bleed editorial showcase for Shri Gurudev Ashram (65% width cinematic viewport, typographic title overlay, live URL link, zero card borders).

### Direction 2: "EDITORIAL ATELIER"
- **Visual Concept:** Cappen-inspired gallery canvas with alternating charcoal and ivory chapter plates, high spatial emptiness, and editorial magazine pacing.
- **Rejected because:** Alternating light/dark chapter plates dilutes KMAI's deep technical studio identity and softens the punch of the engineering pillars.

### Direction 3: "BRUTALIST PRECISION LAB"
- **Visual Concept:** Edge-to-edge brutalist typography (`text-[14vw]`), raw terminal coordinates, crosshair overlays, high-density telemetry.
- **Rejected because:** Leans too close to hacker/cyberpunk clichés and risks alienating executive and enterprise clients (e.g. trustees, institutional directors).

---

## File Structure Map

```
src/
├── index.css                             # Purged of AI glow tokens, updated with Architectural Monolith foundation
├── components/
│   ├── layout/
│   │   └── Navbar.tsx                    # Minimal architectural boundary header
│   ├── sections/
│   │   ├── Hero.tsx                      # Monumental typographic hero with structural K geometry
│   │   ├── IntroStatement.tsx            # Asymmetric 12-column editorial manifesto
│   │   └── SelectedWork.tsx              # Full-bleed flagship showcase for Project 01 (Shri Gurudev Ashram)
│   └── projects/
│       ├── ProjectItem.tsx               # Borderless editorial project row
│       └── ProjectPreview.tsx            # Dennis Snellenberg physical cursor follower
tests/
└── e2e/
    └── redesign-first-four.spec.ts       # Automated Playwright verification for the 4 redesigned areas
```

---

## Tasks

### Task 1: Purge AI Glow Tokens & Establish Architectural Typography Foundation

**Files:**
- Modify: `src/index.css:1-120`
- Test: `tests/e2e/redesign-first-four.spec.ts`

**Interfaces:**
- Consumes: Tailwind base, components, utilities
- Produces: Clean architectural CSS utility classes (`border-hairline`, `font-mono-utility`, `canvas-deep`), zero glow shadows, zero noise overlay

- [ ] **Step 1: Write the failing Playwright test checking for absence of AI glow classes**

```typescript
// tests/e2e/redesign-first-four.spec.ts
import { test, expect } from '@playwright/test';

test.describe('KMAI.tech Art-Directed Redesign (First 4 Areas)', () => {
  test('does not contain deprecated AI glow or noise overlays', async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.waitForTimeout(3000);

    // Verify noise-overlay is gone
    const noise = await page.$('.noise-overlay');
    expect(noise).toBeNull();

    // Verify no text-glow or box-glow classes exist on the page
    const glowElements = await page.$$('.text-glow, .box-glow, .box-glow-lg');
    expect(glowElements.length).toBe(0);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx playwright test tests/e2e/redesign-first-four.spec.ts`
Expected: FAIL (elements with `.noise-overlay` or `.text-glow` still exist).

- [ ] **Step 3: Refactor `src/index.css` to remove glow classes and install architectural foundation**

Replace `.noise-overlay`, `.text-glow`, `.box-glow`, `.box-glow-lg`, and glowing border styles in `src/index.css` with clean architectural hairline dividers:
```css
/* src/index.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --canvas-base: #08090C;
    --canvas-elevated: #0E1015;
    --text-primary: #F5F6F8;
    --text-secondary: #8A92A0;
    --accent-cobalt: #0066FF;
    --border-hairline: rgba(255, 255, 255, 0.08);
  }

  html {
    background-color: #08090C;
    color: #F5F6F8;
    font-family: 'Plus Jakarta Sans', Inter, -apple-system, sans-serif;
  }
}

@layer utilities {
  .border-hairline {
    border-color: rgba(255, 255, 255, 0.08);
  }

  .border-hairline-subtle {
    border-color: rgba(255, 255, 255, 0.04);
  }

  .accent-rule {
    background-color: #0066FF;
  }
}
```
Also remove `<div className="noise-overlay" />` from `src/App.tsx`.

- [ ] **Step 4: Run test to verify it passes**

Run: `npx playwright test tests/e2e/redesign-first-four.spec.ts`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/index.css src/App.tsx tests/e2e/redesign-first-four.spec.ts
git commit -m "style: purge AI glow tokens and establish architectural foundation"
```

---

### Task 2: Redesign Header / Navigation (`Navbar.tsx`)

**Files:**
- Modify: `src/components/layout/Navbar.tsx:1-160`
- Test: `tests/e2e/redesign-first-four.spec.ts`

**Interfaces:**
- Consumes: `GeometricK.tsx`, `onCursorChange`
- Produces: Minimal architectural boundary header with sharp geometric K, index navigation links (`01 WORK`, `02 CAPABILITIES`, `03 STUDIO`, `04 CONTACT`), tactile pill CTA `COMMISSION`, and studio status. Zero glassmorphism/blurry pill blobs.

- [ ] **Step 1: Write failing Playwright test for Header layout and typography**

```typescript
// Add to tests/e2e/redesign-first-four.spec.ts
test('header features architectural layout without rounded glow pills', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.waitForTimeout(3000);

  const header = page.locator('header');
  await expect(header).toBeVisible();

  // Navigation links use indexed editorial format
  const workLink = header.locator('a[href="#work"]');
  await expect(workLink).toContainText('01 // WORK');

  // Verify header has clean hairline border, not a glowing pill container
  const headerClasses = await header.getAttribute('class');
  expect(headerClasses).not.toContain('blur-');
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx playwright test tests/e2e/redesign-first-four.spec.ts`
Expected: FAIL (header still uses old layout/classes).

- [ ] **Step 3: Redesign `Navbar.tsx` into a minimal architectural boundary header**

Refactor `src/components/layout/Navbar.tsx`:
- Fixed top bar spanning full width with 1px bottom hairline `border-b border-white/8`.
- Left: Sharp `GeometricK` mark (28px) + `KMAI.tech` in bold tracking-tight.
- Center: 12-column aligned navigation links (`01 // WORK`, `02 // SERVICES`, `03 // ABOUT`, `04 // CONTACT`) in clean monospace utility type (`text-xs tracking-wider`).
- Right: Studio commission pill button `COMMISSION // ACTIVE` with tactile hover state.
- Mobile: Clean minimal trigger that expands into an editorial fullscreen index.

- [ ] **Step 4: Run test to verify it passes**

Run: `npx playwright test tests/e2e/redesign-first-four.spec.ts`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/components/layout/Navbar.tsx
git commit -m "feat: redesign Navbar into minimal architectural boundary header"
```

---

### Task 3: Redesign Hero Section (`Hero.tsx`)

**Files:**
- Modify: `src/components/sections/Hero.tsx:1-240`
- Test: `tests/e2e/redesign-first-four.spec.ts`

**Interfaces:**
- Consumes: `isLoaded`, `onCursorChange`
- Produces: Monumental typographic hero. Giant display headline (`WE ARCHITECT HIGH-VELOCITY DIGITAL SYSTEMS.`), structural K watermark/masking integration, radical negative space, minimal utility telemetry (`Q2/Q3 2026 COMMISSIONS`). Zero glowing balls, zero particle clouds.

- [ ] **Step 1: Write failing Playwright test for monumental Hero typography and telemetry**

```typescript
// Add to tests/e2e/redesign-first-four.spec.ts
test('hero section features monumental typography and structural K integration', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.waitForTimeout(4000);

  const hero = page.locator('#hero');
  await expect(hero).toBeVisible();

  // Check monumental headline
  const h1 = hero.locator('h1');
  await expect(h1).toBeVisible();
  await expect(h1).toContainText('WE ARCHITECT');

  // Verify font size is monumental (at least 60px on desktop)
  const fontSize = await h1.evaluate((el) => parseFloat(window.getComputedStyle(el).fontSize));
  expect(fontSize).toBeGreaterThanOrEqual(60);

  // Verify zero glowing sphere or particle canvas in hero
  const glowingSphere = await hero.$('.rounded-full.blur-[150px], .rounded-full.blur-[160px]');
  expect(glowingSphere).toBeNull();
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx playwright test tests/e2e/redesign-first-four.spec.ts`
Expected: FAIL (old glowing spheres or outdated classes present).

- [ ] **Step 3: Redesign `Hero.tsx` with monumental typography & structural geometry**

Refactor `src/components/sections/Hero.tsx`:
- Eliminate glowing blue blurred gradient divs (`blur-[160px]`).
- Composition: Asymmetric 12-column layout.
  - Top meta-ledger: `// STUDIO LOCATION: PUNE & MUMBAI, IN // 18.5204° N, 73.8567° E` on left, `AVAILABILITY: ACCEPTING COMMISSIONS` on right.
  - Monumental Headline occupying 65% of the viewport height:
    ```
    WE ARCHITECT
    HIGH-VELOCITY
    DIGITAL SYSTEMS.
    ```
    Typeset in colossal display grotesk (`text-6xl sm:text-8xl md:text-9xl lg:text-[7.5rem]`, leading `[0.9]`, tracking `-0.05em`).
  - Integrated Structural Geometric K: Rendered as a massive architectural silhouette behind the negative space or as an angular graphic mask.
  - Bottom ledger: Two direct tactile triggers: `EXPLORE SELECTED WORK ↓` and `INITIATE COMMISSION →` separated by a 1px vertical hairline.

- [ ] **Step 4: Run test to verify it passes**

Run: `npx playwright test tests/e2e/redesign-first-four.spec.ts`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/components/sections/Hero.tsx
git commit -m "feat: redesign Hero with monumental typography and structural geometry"
```

---

### Task 4: Redesign Manifesto Section (`IntroStatement.tsx`)

**Files:**
- Modify: `src/components/sections/IntroStatement.tsx:1-180`
- Test: `tests/e2e/redesign-first-four.spec.ts`

**Interfaces:**
- Consumes: None (scroll-driven interaction)
- Produces: Asymmetric 12-column editorial spread inspired by Uncommon Studio. Radical typographic hierarchy, horizontal architectural hairlines, progressive word scrub, 3 studio engineering tenets. Zero cards.

- [ ] **Step 1: Write failing Playwright test for Manifesto editorial layout without cards**

```typescript
// Add to tests/e2e/redesign-first-four.spec.ts
test('manifesto section uses asymmetric editorial grid with zero card containers', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.waitForTimeout(3000);

  const manifesto = page.locator('#manifesto');
  await expect(manifesto).toBeVisible();

  // Verify manifesto contains core statement
  await expect(manifesto).toContainText('DIGITAL ARCHITECTURE');

  // Verify no card containers exist within manifesto (zero .rounded-2xl with borders)
  const cards = await manifesto.$$('.rounded-2xl.border, .rounded-3xl.border');
  expect(cards.length).toBe(0);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx playwright test tests/e2e/redesign-first-four.spec.ts`
Expected: FAIL (old 3-card structure still present).

- [ ] **Step 3: Redesign `IntroStatement.tsx` into an asymmetric editorial monograph spread**

Refactor `src/components/sections/IntroStatement.tsx`:
- Set ID to `manifesto`.
- Eliminate the 3 rounded bordered card containers at the bottom!
- Layout: Asymmetric 12-column spread:
  - Left column (cols 1–3): Large vertical index `01 // MANIFESTO`, followed by core studio philosophy statement in monospace.
  - Right column (cols 4–12): Monumental editorial thesis statement:
    `"MOST WEBSITES ARE ASSEMBLED FROM TEMPLATES. WE ARCHITECT BESPOKE DIGITAL SYSTEMS ENGINE TO OUTPACE COMPETITION AND GENERATE MEASURABLE ENTERPRISE VALUE."`
    Using high-contrast typography (`text-3xl sm:text-5xl md:text-6xl font-bold leading-[1.1]`) with progressive word scroll scrub.
  - Bottom ledger: 3 linear horizontal columns separated by vertical hairlines (NOT cards):
    - `01 // ZERO TEMPLATES`: Custom full-stack codebases tailored to exact organizational workflows.
    - `02 // SPEED AS FEATURE`: Sub-300ms edge rendering and 60FPS interaction assurance.
    - `03 // DIRECT TO ARCHITECTS`: Direct collaboration with founders Krishnaprasad, Maithili, and Ali.

- [ ] **Step 4: Run test to verify it passes**

Run: `npx playwright test tests/e2e/redesign-first-four.spec.ts`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/components/sections/IntroStatement.tsx
git commit -m "feat: redesign Manifesto into asymmetric editorial spread without cards"
```

---

### Task 5: Redesign First Selected Work Project — Shri Gurudev Ashram (`SelectedWork.tsx` & `ProjectItem.tsx`)

**Files:**
- Modify: `src/components/sections/SelectedWork.tsx:1-260`
- Modify: `src/components/projects/ProjectItem.tsx:1-150`
- Test: `tests/e2e/redesign-first-four.spec.ts`

**Interfaces:**
- Consumes: `projects` data, `onCursorChange`, `onSelectProject`
- Produces: Full-bleed case-study showcase for Project 01 (Shri Gurudev Ashram) with massive visual surface (65% width), typography overlapping imagery, deliverables telemetry, and Dennis Snellenberg cursor follower physics. Zero generic cards.

- [ ] **Step 1: Write failing Playwright test for Project 01 full-bleed editorial presentation**

```typescript
// Add to tests/e2e/redesign-first-four.spec.ts
test('first selected work project renders as a full-bleed case study moment', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.waitForTimeout(4000);

  const work = page.locator('#work');
  await expect(work).toBeVisible();

  // Verify Project 01 (Shri Gurudev Ashram) is presented prominently
  const flagship = work.locator('text=SHRI GURUDEV ASHRAM').first();
  await expect(flagship).toBeVisible();

  // Verify flagship image has substantial visual scale (not a small card thumbnail)
  const flagshipImage = work.locator('img[alt*="Shri Gurudev Ashram"]').first();
  await expect(flagshipImage).toBeVisible();
  const box = await flagshipImage.boundingBox();
  expect(box?.width).toBeGreaterThanOrEqual(300);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx playwright test tests/e2e/redesign-first-four.spec.ts`
Expected: FAIL (or verify behavior).

- [ ] **Step 3: Redesign `SelectedWork.tsx` to feature Project 01 as a monumental case-study spread**

Refactor `src/components/sections/SelectedWork.tsx`:
- Header: Minimal editorial title: `SELECTED WORK // 2025 — 2026` + `CASE 01 OF 06` in monospace.
- Project 01 Flagship Spread:
  - 12-column asymmetric composition:
    - Columns 1–7: Large cinematic visual plate (aspect ratio 16:10) featuring `/projects/shri-gurudev-ashram/hero.webp` with subtle hover zoom and parallax.
    - Columns 8–12: Architectural project ledger:
      - Index: `CASE STUDY // 01`
      - Title: `SHRI GURUDEV ASHRAM` (`text-4xl sm:text-6xl font-extrabold tracking-tight`)
      - Vertical: `Global Spiritual Community & Cultural Portal`
      - Scope: `Full-Stack Architecture • Multi-Lingual UX • Real-time Event Streaming • Member Database`
      - Deliverables pill tags in clean monospace.
      - Direct interactive button: `EXPLORE ARCHITECTURE →` (opens modal or live URL).
- Retain the Dennis Snellenberg cursor follower mechanics for project rows below.
- Eliminate all glowing cyan borders or neon card wrappers.

- [ ] **Step 4: Run test to verify it passes**

Run: `npx playwright test tests/e2e/redesign-first-four.spec.ts`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/components/sections/SelectedWork.tsx src/components/projects/ProjectItem.tsx
git commit -m "feat: redesign First Selected Work project into full-bleed case study spread"
```

---

### Task 6: Comprehensive Verification & Visual Inspection of First 4 Areas

**Files:**
- Create: `scripts/capture-redesign-first-four.mjs`
- Test: All automated suites + visual browser screenshots

**Interfaces:**
- Consumes: Running Vite dev server (`http://localhost:5173/`)
- Produces: Rendered screenshots for Desktop (1440×900) and Mobile (390×844) covering Header, Hero, Manifesto, and Project 01.

- [ ] **Step 1: Write capture script for the redesigned first four areas**

Create `scripts/capture-redesign-first-four.mjs` to capture:
- Desktop 1440×900: Header + Hero full viewport, Manifesto scroll view, Project 01 case study view.
- Mobile 390×844: Header + Hero mobile view, Manifesto mobile view, Project 01 mobile case study view.

- [ ] **Step 2: Execute automated build, lint, and Playwright tests**

```bash
npm run build
npm run lint
npx playwright test
```

- [ ] **Step 3: Execute visual capture script**

```bash
node scripts/capture-redesign-first-four.mjs
```

- [ ] **Step 4: Critically inspect rendered screenshots against design criteria**

Verify:
- Does it look like an AI-generated site? (Must be NO).
- Does it look like a SaaS landing page? (Must be NO).
- Does typography create visual interest without gradients/glow? (Must be YES).
- Does the project section feel like an authored creative studio portfolio? (Must be YES).
- Is mobile responsive with zero horizontal overflow? (Must be YES).

- [ ] **Step 5: Update walkthrough artifact with visual evidence and commit**

```bash
git add scripts/capture-redesign-first-four.mjs tests/
git commit -m "test: add visual capture and verification for redesigned first four areas"
```

---

## Execution Handoff

Plan complete and saved to `docs/superpowers/plans/2026-09-19-kmai-art-directed-redesign.md`. Two execution options:

1. **Subagent-Driven (recommended)** - I dispatch a fresh subagent per task, review between tasks, fast iteration
2. **Inline Execution** - Execute tasks in this session using executing-plans, batch execution with checkpoints

Which approach?
