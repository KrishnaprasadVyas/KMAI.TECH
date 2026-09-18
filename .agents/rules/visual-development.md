# KMAI.tech — Visual Development Workflow

This document outlines the mandatory 10-step visual development workflow for creating, refactoring, and polishing UI components, animations, and layouts in the KMAI.tech project.

---

## The 10-Step Visual Development Cycle

Every visual or interactive change must proceed through these ten steps in sequence:

```
[1. Inspect] ───► [2. Research] ───► [3. Plan] ───► [4. Implement Section] ───► [5. Run App]
                                                                                     │
                                                                                     ▼
[10. Complete] ◄── [9. Fix] ◄── [8. Critique] ◄── [7. Screenshots] ◄── [6. Browser Inspect]
```

### Step 1: Inspect the Current Implementation
- View the target component file, its parent container, styling classes, and any associated GSAP animations or hooks.
- Identify all call sites and potential side effects before touching code.

### Step 2: Research & Reference Intended Interaction
- Consult the design references (e.g., Cappen for portfolio-first immersive presentation, Dennis Snellenberg for magnetic work previews and transitions, Minh Pham for editorial testimonials, Uncommon Studio for typographic clarity).
- Verify appropriate motion curves, easing equations (`power3.out`, `power4.inOut`), and trigger positions.

### Step 3: Create an Implementation Plan
- Document specific changes to be made (markup, Tailwind utility updates, GSAP timelines, responsive variants).
- Maintain minimal, focused diffs.

### Step 4: Implement One Section at a Time
- Do not refactor multiple unrelated sections simultaneously.
- Complete the implementation of a single section or atomic component thoroughly before proceeding.

### Step 5: Run the Site
- Start the Vite development server (`npm run dev`) or verify the running instance on `http://localhost:5173/`.

### Step 6: Inspect the Actual Rendered Browser Result
- Open the live page in Chromium via Playwright or automated script.
- Verify that elements render correctly without clipping, zero-width SVG bounding box issues, or unintended layout shifts.

### Step 7: Capture Desktop & Mobile Screenshots
- Capture high-resolution screenshots at target viewports:
  - **Desktop**: 1440 × 900
  - **Mobile**: 390 × 844
  - **Tablet**: 768 × 1024
- Store visual artifacts for review.

### Step 8: Critique Spacing, Hierarchy, Typography, Responsiveness & Motion
- Systematically evaluate the captured output:
  - **Hierarchy**: Is the primary focal point immediately obvious?
  - **Typography**: Are line heights, tracking (`letter-spacing`), and font weights optically balanced?
  - **Spacing**: Is negative space intentional and consistent across screen widths?
  - **Responsiveness**: Does mobile have an independent, purposeful composition rather than a cramped desktop shrink?
  - **Motion**: Does the animation feel tactile, smooth (60fps), and purposeful?

### Step 9: Fix Problems
- Immediately resolve any discovered clipping, font collisions, alignment glitches, or console errors.
- Re-verify in the browser.

### Step 10: Complete
- Only after visual confirmation and passing smoke checks should the section be considered complete.
