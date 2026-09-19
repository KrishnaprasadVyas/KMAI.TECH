# Opening Scroll Experience — Full-Screen K to Normal Document Flow

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rework the entire opening scroll experience so the website begins as a full-screen animated composition dominated by the KMAI geometric K, scrubs continuously through the progressive reveal of all real sections in their actual document positions (Hero → Selected Work → Services → Studio → Process → Client Voices → Contact), and upon reaching Contact, seamlessly unlocks into a normal, unrestrained scrollable webpage without any visual jump or snap.

**Architecture:** 
- A master pinned scroll orchestrator (`OpeningExperience.tsx`) controls the initial animated composition.
- The real semantic webpage exists in the DOM underneath.
- Phase 1: Monumental K aperture dominates the viewport, parting/scaling to unmask the Hero directly in its final layout position.
- Phase 2: One continuous scrubbed timeline unmasks and glides through the real sections in their authentic document coordinates.
- Phase 3: At Contact, the pinned cinematic experience concludes, transitioning seamlessly into standard document flow with native/Lenis 120Hz scrolling across the entire site.
- Restores the clean editorial `Process` section as explicitly requested in the section sequence.
- Responsive adaptation: Full cinematic experience on desktop, proportional scrub distance on tablet, and streamlined sequence on mobile.

**Tech Stack:** React 19, TypeScript, GSAP (ScrollTrigger), Tailwind CSS, Lenis Smooth Scroll, Playwright.

---

## Open Questions & Clarifications

1. **Process Section Restoration**:
   - In previous feedback, the Process section was removed. In this prompt, the sequence explicitly lists `HERO → SELECTED WORK → SERVICES → STUDIO → PROCESS → CLIENT VOICES → CONTACT`.
   - **Resolution in Plan**: Restore `Process.tsx` with pure editorial typography (large numerical indices `01–04`, phase names, and descriptions) without card containers or `//` slop.

2. **Session Persistence**:
   - Does the opening sequence replay on every page refresh?
   - **Resolution in Plan**: Plays on initial page load / refresh. Once Contact is reached during a session, the page remains unlocked in normal document flow so the user can freely explore all sections. A manual reload restarts the cinematic composition.

---

## Global Constraints

- **No Slideshow / No Separate Horizontal Panels**: Sections must appear in the exact vertical order and positions they occupy in the final webpage.
- **Zero Snapping or Jumps**: Transitioning from the pinned cinematic sequence into normal document flow must maintain exact pixel alignment.
- **Strict Anti-Generic SaaS Aesthetics**: Sharp geometric lines, generous negative space, monumental typography, zero neon glow or cards.
- **Touch-Safe & Reduced-Motion**: If `prefers-reduced-motion: reduce` is active, skip the pinned sequence and render the full document directly in normal scroll.
- **Zero Runtime Errors & Strict Type Safety**: All TypeScript checks (`npm run build`) and Playwright tests must pass with 0 errors.

---

## File Structure & Responsibilities

```
src/
├── components/
│   ├── layout/
│   │   ├── OpeningExperience.tsx    # [NEW] Master pinned reveal orchestrator (K -> Hero -> ... -> Contact -> unlock)
│   │   ├── Navbar.tsx               # Coordinates brandmark reveal with the settled header state
│   │   └── Preloader.tsx            # Seamless handoff to the monumental K opening
│   ├── common/
│   │   └── GeometricK.tsx           # Provides monumental aperture mode with vector paths
│   └── sections/
│       ├── Process.tsx              # [RESTORE] Clean editorial 4-stage engineering sequence
│       ├── Hero.tsx                 # Settles into exact physical page position
│       └── Contact.tsx              # Final climax section triggering normal document unlock
├── App.tsx                          # Integrates OpeningExperience, Main stream, and unlock state
tests/
└── e2e/
    └── opening-sequence.spec.ts     # [NEW] Playwright E2E tests for the complete sequence
```

---

## Detailed Task Breakdown

### Task 1: Restore Editorial `Process.tsx` Section
**Files:**
- Create: `src/components/sections/Process.tsx`
- Modify: `src/App.tsx`
- Test: `tests/e2e/opening-sequence.spec.ts`

**Interfaces:**
- Consumes: Standard React FC props (`onCursorChange?: (variant: CursorVariant, text?: string) => void`)
- Produces: `<Process />` component adhering strictly to editorial design guidelines.

- [ ] **Step 1: Re-create `src/components/sections/Process.tsx` with pure editorial layout**
  - Four phases: `01 DISCOVER`, `02 ARCHITECT`, `03 ENGINEER`, `04 SCALE`.
  - Monumental typography, blue index numbers, flowing narrative, zero rounded boxes.
- [ ] **Step 2: Add to `App.tsx` between About (Studio) and Testimonials (Client Voices)**
- [ ] **Step 3: Run `npm run build` to verify type safety**

---

### Task 2: Monumental K Aperture Geometry
**Files:**
- Modify: `src/components/common/GeometricK.tsx`

**Interfaces:**
- Consumes: `size`, `className`, `theme`, and optional `isAperture` or `standalone` props.
- Produces: Scalable SVG geometry capable of serving as a full-screen viewport graphic and masking portal.

- [ ] **Step 1: Enhance `GeometricK.tsx` with full-screen presentation mode**
  - Clean vector coordinates matching the sharp KMAI brandmark.
  - High-precision SVG viewBox allowing scale transforms up to 25x without pixelation.
- [ ] **Step 2: Verify responsive scaling across viewports**

---

### Task 3: Pinned Master Reveal Orchestrator (`OpeningExperience.tsx`)
**Files:**
- Create: `src/components/layout/OpeningExperience.tsx`
- Modify: `src/App.tsx`
- Modify: `src/components/layout/Navbar.tsx`

**Interfaces:**
- Consumes:
  - `children`: The real webpage DOM tree.
  - `isLoaded`: Initial preloader completion signal.
  - `onIntroComplete: () => void`: Callback fired when Contact is reached.
- Produces:
  - Phase 1: Full-screen K aperture scaling and revealing Hero in its real coordinates.
  - Phase 2: Smooth continuous scrub unveiling Work → Services → Studio → Process → Testimonials → Contact.
  - Phase 3: Seamless unpinning and transition into standard document flow at Contact.

- [ ] **Step 1: Construct `OpeningExperience.tsx` component scaffolding**
  - Pin the master container using GSAP ScrollTrigger.
  - Define scrub timeline with precise milestone progress values:
    - `0.00 → 0.15`: K logo full-screen aperture scale & Hero emerge.
    - `0.15 → 0.32`: Hero settled, Selected Work progressive unmask.
    - `0.32 → 0.48`: Services reveal in authentic document position.
    - `0.48 → 0.62`: Studio reveal.
    - `0.62 → 0.76`: Process reveal.
    - `0.76 → 0.88`: Client Voices (Testimonials) reveal.
    - `0.88 → 1.00`: Contact climax reveal.
- [ ] **Step 2: Implement zero-snap unlock into normal document flow**
  - When timeline reaches `progress >= 1.0` (Contact section):
    - Finalize ScrollTrigger pin cleanly.
    - Mark `isIntroComplete = true`.
    - Align scroll offset with native Contact section position so there is zero jump.
    - Remove overlay mask elements from active DOM.
    - Enable unrestricted bi-directional scrolling throughout the entire document.
- [ ] **Step 3: Integrate into `App.tsx` and wire with `useSmoothScroll`**

---

### Task 4: Responsive Adaptation & Touch Safety
**Files:**
- Modify: `src/components/layout/OpeningExperience.tsx`
- Modify: `src/index.css`

- [ ] **Step 1: Desktop, Tablet, and Mobile tuning**
  - Desktop: Full cinematic scrub distance (e.g. `+=4500px`).
  - Tablet: Reduced scrub distance (e.g. `+=3000px`).
  - Mobile: Streamlined sequence with shorter scrub distance (e.g. `+=2000px`) and hardware-accelerated transforms.
- [ ] **Step 2: Accessibility & Reduced Motion**
  - If `prefers-reduced-motion: reduce` is detected, instantly bypass the pinned intro and render the full document in standard scroll flow immediately.

---

### Task 5: End-to-End Verification & Browser Inspection
**Files:**
- Create: `tests/e2e/opening-sequence.spec.ts`

- [ ] **Step 1: Write Playwright tests verifying the exact sequence**
  - Verify initial load displays full-screen K geometry.
  - Verify scrolling expands K and settles Hero in real position.
  - Verify progressive reveal of Work, Services, Studio, Process, Testimonials, Contact.
  - Verify that reaching Contact releases the pin and unlocks normal document scrolling.
  - Verify bi-directional scrolling works freely after unlock.
- [ ] **Step 2: Run full Playwright test suite (`npx playwright test`)**
- [ ] **Step 3: Capture multi-viewport visual screenshots at key milestones (K opening, Hero settled, Contact unlock)**
- [ ] **Step 4: Update walkthrough artifact with visual evidence**

---

## Verification Plan

### Automated Tests
- `npm run build`: Strict TypeScript build verification.
- `npm run lint`: Code quality and unused variable check.
- `npx playwright test tests/e2e/opening-sequence.spec.ts`: Targeted opening sequence tests.
- `npx playwright test`: Full regression suite (smoke, motion, redesign, viewport captures).

### Manual & Visual Verification
- Inspect rendered output in Playwright browser at:
  - Desktop (1440×900)
  - Tablet (768×1024)
  - Mobile (390×844)
- Verify that opening sequence runs smoothly at 60–120fps without stutter.
- Confirm zero visual jump or repositioning when transitioning to normal document flow.
