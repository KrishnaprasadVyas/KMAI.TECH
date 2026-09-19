# KMAI.TECH — Interaction & Motion Design Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement the complete art-directed interaction and motion design specification defined in `KMAI_Interaction_and_Motion_Spec.md`, turning KMAI.tech into an unforgettable, desktop-first creative experience with intentional mobile degradation.

**Architecture:** A layered motion architecture leveraging GSAP 3.15 + ScrollTrigger, Lenis smooth scrolling with ticker integration, hardware-accelerated GPU transforms (`clip-path`, `transform`, `opacity`), and adaptive viewport composition. State and cursor interactions are decoupled via lightweight reactive listeners and context hooks with robust touch-device and `prefers-reduced-motion` fallbacks.

**Tech Stack:** React 19, TypeScript 5+, Vite 8, Tailwind CSS 3.4, GSAP 3.15 (ScrollTrigger), Lenis 1.3, Lucide React, Playwright for E2E verification.

**Spec:** `file:///c:/Users/abuna/Desktop/proj/KMAI.TECH/KMAI_Interaction_and_Motion_Spec.md`

## Global Constraints

- **Source of Truth**: `KMAI_Interaction_and_Motion_Spec.md` dictates all motion hierarchy, timing, physics, and responsive degradation.
- **Visual Anti-Generic SaaS Rules**: No rounded cards with colored borders, no purple/neon glows, no repetitive fade-up animations, no fake tech metadata.
- **Palette**: Warm ivory canvas (`#F2F0EA`), deep ink dark canvas (`#07090E`), primary text (`#0A0C0F`), muted text (`#595D65` / `#73777F`), electric blue graphic accent (`#216BFF`).
- **Performance Budget**: Native CSS transforms and compositing-friendly properties (`transform`, `opacity`, `clip-path`). Zero heavy SVG turbulence filters. Lenis paused during modal states. Cleanup of all GSAP contexts and event listeners on unmount.
- **Touch & Reduced Motion**: Disable custom cursor, magnetic physics, free-floating physics, and pinned scrub sequences on touch devices (`pointer: coarse`) and when `prefers-reduced-motion: reduce` is detected. Provide immediate accessible states.

---

## File Structure & Responsibilities

| File | Responsibility |
|---|---|
| `src/hooks/useSmoothScroll.ts` | Lenis smooth scroll provider, GSAP ticker sync, velocity tracking subscriber |
| `src/hooks/useScrollVelocity.ts` | Reusable hook tracking normalized scroll velocity for skew/parallax reactions |
| `src/components/common/CustomCursor.tsx` | Contextual cursor follower (`default`, `VIEW`, `OPEN`, `DRAG`, `↗`), dark/light contrast adaptation |
| `src/components/common/MagneticButton.tsx` | Physical magnetic button wrapper with spring dampening and mobile bypass |
| `src/components/common/GeometricK.tsx` | Visual grammar emblem with modular polygon layers capable of split/expansion |
| `src/components/layout/Navbar.tsx` | Minimal persistent navigation with smooth section contrast switching |
| `src/components/layout/Preloader.tsx` | Fast architectural opening transition resolving directly into hero |
| `src/components/sections/Hero.tsx` | **Signature 01**: Pinned portal / curtain scroll reveal with geometric K expansion |
| `src/components/sections/IntroStatement.tsx` | **Signature 09**: Dramatic dark plate manifesto with word-level scrub reveal |
| `src/components/sections/SelectedWork.tsx` | **Signature 02 & 03**: Floating asymmetric project field with hover preview & cursor tracking |
| `src/components/projects/ProjectPreview.tsx` | Floating Dennis Snellenberg-style cursor preview with inertia tilt |
| `src/components/projects/CaseStudyModal.tsx` | **Signature 04**: Shared-element / FLIP full-screen expansion into project breakdown |
| `src/components/sections/Services.tsx` | **Signature 05 & 06**: Giant typography transitions with scroll-driven spatial state switching |
| `src/components/sections/Process.tsx` | **Signature 07**: Continuous 4-phase transformation (DISCOVER → ARCHITECT → ENGINEER → SCALE) |
| `src/components/sections/About.tsx` | Human studio founders showcase and animated metric counters |
| `src/components/sections/Testimonials.tsx` | **Signature 08**: Monumental editorial quote sequence with clean transitions |
| `src/components/sections/Contact.tsx` | Monumental climax CTA and direct inquiry spread |
| `src/components/layout/Footer.tsx` | Quiet architectural resolution |
| `tests/e2e/motion-spec.spec.ts` | Comprehensive Playwright tests verifying interaction behaviors, responsiveness, and performance |

---

### Task 1: Motion Foundation — Velocity Hook, Token Alignment & Cursor Contrast System

**Files:**
- Create: `src/hooks/useScrollVelocity.ts`
- Modify: `src/hooks/useSmoothScroll.ts`
- Modify: `src/components/common/CustomCursor.tsx`
- Modify: `src/components/common/MagneticButton.tsx`
- Test: `tests/e2e/smoke.spec.ts`

**Interfaces:**
- `useScrollVelocity()`: returns `{ velocity: number; direction: number }` normalized from Lenis scroll delta.
- `CustomCursor`: supports variants `'default' | 'project' | 'button' | 'image' | 'open' | 'external'`, auto-detects dark/light canvas background for contrast.
- `MagneticButton`: updated to use studio tokens (`#0A0C0F`, `#216BFF`, `#F2F0EA`), removes outdated `#0066FF` / `#121620` styling.

- [ ] **Step 1: Write `src/hooks/useScrollVelocity.ts`**
Create the velocity tracking hook with a smooth decaying velocity value synchronized with Lenis and GSAP ticker.

- [ ] **Step 2: Update `src/hooks/useSmoothScroll.ts`**
Expose Lenis instance or velocity callback so components can react to scroll speed with subtle skews.

- [ ] **Step 3: Update `src/components/common/CustomCursor.tsx`**
Refine cursor states according to Section 16 of the spec:
- Default: minimal 6px dot that turns dark on ivory and light on dark sections.
- Project: 80px ring with bold "VIEW" text.
- Open: "OPEN".
- External: "↗".
- Button: subtle magnetic dot expansion.
Ensure full cleanup and complete mobile touch exclusion.

- [ ] **Step 4: Update `src/components/common/MagneticButton.tsx`**
Update styling to clean studio aesthetic (architectural borders, restrained background fills, refined magnetic bounds of ±12px max).

- [ ] **Step 5: Verify build & tests**
Run `npm run build && npx playwright test` to ensure zero regressions.

---

### Task 2: Signature Interaction 01 — Scroll-Driven KMAI Hero Curtain Reveal

**Files:**
- Modify: `src/components/sections/Hero.tsx`
- Modify: `src/App.tsx`
- Test: `tests/e2e/motion-spec.spec.ts`

**Interfaces:**
- `Hero`: pins full viewport (`pin: true`, scrub: 1) on desktop (width >= 1024px).
- Timeline:
  - 0% - 20%: Pinned hero typography & oversized geometric K emblem.
  - 20% - 60%: Geometric K arms and curtain mask expand outward via `clip-path` and geometric translation, revealing the underlying canvas.
  - 60% - 100%: Portal completes, hero fades seamlessly into normal document flow.
- Mobile (<768px): No intrusive pinning; lightweight entry animation with immediate native momentum scrolling.

- [ ] **Step 1: Implement the Pinned Portal Structure in `Hero.tsx`**
Construct a dual-layer structure:
- Pin trigger container (`min-h-screen` or `h-[140vh]` scrub track on desktop).
- Fixed/sticky curtain viewport with `will-change: transform, clip-path`.
- Central geometric motif participating in the portal opening.

- [ ] **Step 2: Choreograph the GSAP ScrollTrigger Scrub Timeline**
Set up `ScrollTrigger.create({ trigger: containerRef.current, start: "top top", end: "+=120%", scrub: 0.8, pin: true })`.
Animate the clip path / curtain opening and K geometry expansion.

- [ ] **Step 3: Implement Mobile Adaptive Fallback**
Use `ScrollTrigger.matchMedia` or `useMediaQuery` to completely disable pin on touch/mobile devices, replacing it with a serene 0.8s entry reveal.

- [ ] **Step 4: Verify visually and with Playwright**
Inspect viewport at 1440x900 and 390x844. Verify no jump, no duplicate scrollbars, no blank gaps.

---

### Task 3: Signature Interaction 02 & 03 — Floating Project Field & Inertia Cursor Previews

**Files:**
- Modify: `src/components/sections/SelectedWork.tsx`
- Modify: `src/components/projects/ProjectPreview.tsx`
- Modify: `src/data/projects.ts`
- Test: `tests/e2e/motion-spec.spec.ts`

**Interfaces:**
- `SelectedWork`: provides two art-directed viewing modes or an editorial floating composition:
  - Desktop: Asymmetric, floating composition with offset visual weights, generous whitespace, subtle parallax drifting driven by scroll velocity, and pointer proximity reaction.
  - Hovering a project activates the cursor-following project preview (`ProjectPreview`) with inertia tilt.
  - Clicking expands directly into the case study.
  - Mobile: Clean vertical stack with large editorial imagery, tap-to-open case study, zero hover preview lag.

- [ ] **Step 1: Refactor `SelectedWork.tsx` into an Asymmetric Spatial Field**
Compose projects with varying scales (e.g. 7-column flagship, 5-column offset, 8-column wideplate) and subtle y-parallax offsets between columns.

- [ ] **Step 2: Implement Cursor Proximity Physics**
On desktop, calculate distance to active project container. Apply subtle spring scale (1.02x) and depth shift without cartoon bounce.

- [ ] **Step 3: Enhance `ProjectPreview.tsx` with Single-Layer Handoff**
Ensure image crossfade between projects is buttery smooth without recreating DOM nodes. Clamp inertia rotation between -8deg and +8deg based on pointer velocity.

- [ ] **Step 4: Verify responsive stability & Playwright assertions**
Verify that all projects remain accessible, headers are legible, and touch devices render cleanly.

---

### Task 4: Signature Interaction 04 — Seamless Case Study Expansion

**Files:**
- Modify: `src/components/projects/CaseStudyModal.tsx`
- Modify: `src/components/sections/SelectedWork.tsx`
- Test: `tests/e2e/motion-spec.spec.ts`

**Interfaces:**
- `CaseStudyModal`: Opens with a cinematic shared-origin expand effect from the clicked project's position, fading in the full technical breakdown, architecture specs, and live site link.
- Keyboard accessibility: Escape key closes with exit animation. Focus trapped.
- Background Lenis scrolling is cleanly paused when modal is open and resumed on close.

- [ ] **Step 1: Add Origin Geometry Tracking in `SelectedWork.tsx`**
Record clicked element's bounding rect before opening the modal.

- [ ] **Step 2: Choreograph Entrance & Exit Timelines in `CaseStudyModal.tsx`**
Animate modal backdrop (`opacity: 0 -> 1`), body scale & translate (`y: 30 -> 0`, `scale: 0.98 -> 1`) with `power3.out`.
When closing, reverse smoothly before unmounting.

- [ ] **Step 3: Lenis Integration**
Pause Lenis when modal mounts (`lenis.stop()`), resume on unmount (`lenis.start()`).

- [ ] **Step 4: Verify modal open/close in Playwright**
Test desktop & mobile opening, verify body scroll lock, ESC key, and backdrop click.

---

### Task 5: Signature Interaction 05 & 06 — Services as Spatial States with Monumental Typography

**Files:**
- Modify: `src/components/sections/Services.tsx`
- Test: `tests/e2e/motion-spec.spec.ts`

**Interfaces:**
- `Services`: On desktop, features monumental typographic display (SOFTWARE, WEB DESIGN, AUTOMATION, AI SOLUTIONS) where scroll progress or interaction smoothly transitions between active service states.
- Each discipline reveals its architecture deliverables, key technical pillars, and visual atmosphere with disciplined motion.
- Mobile: Elegant sequential stack with accordion / expandable drawers.

- [ ] **Step 1: Structure Monumental Typographic System**
Create oversized display titles with active state transitions driven by scroll position or hover/click index.

- [ ] **Step 2: Choreograph Spatial Transition**
Use GSAP to slide, clip, and reveal deliverables as the active discipline changes, ensuring zero sudden layout shifts.

- [ ] **Step 3: Mobile Touch Accordion Fallback**
Ensure mobile users can tap each discipline to cleanly expand deliverables with immediate feedback.

- [ ] **Step 4: Verify with Playwright**
Check typography size (minimum 64px on desktop), active state switching, and no overflow.

---

### Task 6: Signature Interaction 07 — Process as One Continuous Transformation

**Files:**
- Modify: `src/components/sections/Process.tsx`
- Test: `tests/e2e/motion-spec.spec.ts`

**Interfaces:**
- `Process`: 4 stages (01 DISCOVER → 02 ARCHITECT → 03 ENGINEER → 04 SCALE).
- Desktop: Pinned container where scroll scrub drives a continuous transformation of the central architectural composition and narrative focus.
- Mobile: Sequential 4-part layout with scroll-triggered entrance reveals.

- [ ] **Step 1: Build Continuous Sequence in `Process.tsx`**
Create a pinned scrub section on desktop (`pin: true`, scrub: 0.8) where the active phase indicators, diagrams, and taglines transition into one another seamlessly.

- [ ] **Step 2: Add Geometric Architectural Visual Motif**
Integrate geometric line art / K-motif states that morph/resolve across the 4 stages.

- [ ] **Step 3: Implement Mobile Stack Fallback**
Disable pin on mobile; render a clean editorial sequence with hairline progress connectors.

- [ ] **Step 4: Verify with Playwright**
Verify scroll scrub, phase titles present, and no layout jumps.

---

### Task 7: Signature Interaction 08 & 09 — Editorial Testimonials & Dramatic Dark Event Section

**Files:**
- Modify: `src/components/sections/Testimonials.tsx`
- Modify: `src/components/sections/IntroStatement.tsx`
- Modify: `src/components/sections/Contact.tsx`
- Test: `tests/e2e/motion-spec.spec.ts`

**Interfaces:**
- `Testimonials`: Monumental quote display dominating viewport, with smooth clip/mask slide transitions between quotes, keyboard arrow navigation, and draggable or button controls.
- `IntroStatement` & `Contact`: Implement the Dark Event background transitions specified in Section 13 (ivory background clips away into deep ink `#07090E`).

- [ ] **Step 1: Refine `Testimonials.tsx` Transitions**
Implement GSAP text split / slide masking for quote transitions. Ensure silky quote swaps.

- [ ] **Step 2: Implement Background Canvas Continuity**
Incorporate clip-path or rising dark plate transitions between `#work` and dark sections, ensuring smooth navbar contrast updates.

- [ ] **Step 3: Verify with Playwright**
Verify client quotes, author attributions, and dark background transitions.

---

### Task 8: Comprehensive Verification & Visual Inspection Across All Viewports

**Files:**
- Create: `tests/e2e/motion-spec.spec.ts`
- Run: Playwright test suite against desktop, tablet, and mobile viewports.
- Capture screenshots at:
  - 1440 × 900 (Desktop)
  - 1024 × 768 (Laptop)
  - 768 × 1024 (Tablet)
  - 390 × 844 (Mobile)

- [ ] **Step 1: Write `tests/e2e/motion-spec.spec.ts`**
Add automated verification for:
- Hero portal pin and scroll progress completion.
- Custom cursor state transitions on desktop.
- Custom cursor absence on mobile/touch.
- Selected work preview display on hover.
- Case study modal open, escape key close, and body scroll lock.
- Services spatial state switching.
- Process continuous scroll sequence.
- Zero horizontal overflow across all viewports.
- Reduced-motion compliance.

- [ ] **Step 2: Run test suite**
Execute `npx playwright test` and confirm all tests pass.

- [ ] **Step 3: Visual Inspection**
Capture screenshots using Playwright or custom script at all 4 key breakpoints to confirm typography, spacing, and composition.
