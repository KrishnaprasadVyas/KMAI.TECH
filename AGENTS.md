# KMAI.tech — Engineering & Design Rules for Autonomous Agents

This document defines persistent development, architectural, design, and verification rules for the KMAI.tech codebase. Every agent and contributor working on this repository must strictly adhere to these guidelines.

---

## 1. GENERAL PRINCIPLES

- **Inspect First**: Always inspect existing code and all relevant call sites before modifying anything.
- **Minimal Diffs**: Never rewrite unrelated files. Prefer small, focused, disciplined diffs.
- **Preserve Functionality**: Preserve existing working behavior unless an intentional refactor has been requested and documented.
- **Dependency Discipline**: Do not install a new package unless an existing dependency cannot reasonably solve the problem.
- **Strict TypeScript**: Never introduce `any` without explicit, documented justification. Ensure type safety across props, data structures, and hooks.

---

## 2. ARCHITECTURE & CODEBASE STRUCTURE

- **Respect Current Architecture**: Follow the established React 19 + TypeScript + Vite architecture. Do not migrate to another framework (e.g., Next.js) or rewrite build configurations without explicit instruction.
- **Local State Over Global State**: Keep component state local unless shared state across multiple distinct tree nodes is genuinely required.
- **Component & Utility Reuse**: Reuse existing components (e.g., `MagneticButton`, `GeometricK`, `TextReveal`) and hooks (`useSmoothScroll`, `useMediaQuery`) before introducing duplicate abstractions.
- **Clean Separation of Concerns**:
  - `src/components/common/`: Reusable primitives, geometric brand assets, interactive buttons.
  - `src/components/layout/`: Navigation, Preloader, Footer.
  - `src/components/sections/`: Landing page sections (`Hero`, `Services`, `SelectedWork`, `About`, `Process`, `Technology`, `Testimonials`, `Contact`).
  - `src/components/projects/`: Case study modals, project list items, floating cursor previews.
  - `src/data/`: Structured TypeScript data models and static project/testimonial content.
  - `src/hooks/`: Reusable stateful hooks (scrolling, media queries, pointer events).
  - `src/types/`: Domain interfaces and type definitions.

---

## 3. DESIGN & AESTHETIC DIRECTIVES

- **Studio Identity**: KMAI is a premium digital technology studio architecting high-performance software, bespoke web experiences, and operational automation.
- **Anti-Generic SaaS Rules**:
  - The site must **never** resemble a generic SaaS landing page, AI startup template, or junior developer portfolio.
  - Avoid predictable dark-mode SaaS clichés: excessive rounded cards with bright colored borders, purple neon gradients, repetitive fade-up scroll animations, random floating blurry blobs, or decorative effects without purpose.
  - Prioritize strong typography, disciplined composition, generous negative space, authentic client imagery, structural geometry, and intentional motion.
- **Brand Geometry**: The KMAI geometric 'K' is a central visual motif and architectural system, not merely a static logo badge. Sharp angular precision must be maintained.
- **Motion with Purpose**: Animation must have deliberate choreography, pacing, and hierarchy. Never animate purely for the sake of animation.

---

## 4. RESPONSIVE & ADAPTIVE COMPOSITION

- **Independent Compositions**: Desktop and mobile layouts must be treated as distinct compositions. Never merely shrink down the desktop arrangement.
- **Touch-Device Safety**: All pointer-dependent interactions (custom cursor followers, magnetic button tracking, hover-triggered previews) must have immediate, clean touch-safe alternatives on touch devices.
- **Reduced-Motion Compliance**: Always respect `prefers-reduced-motion: reduce`. When active, disable continuous animations, rotational quickTo tracking, and scroll-scrub opacity reveals, providing instant accessible states.

---

## 5. RUNTIME PERFORMANCE & BUDGETS

- **Lean Client Footprint**: Avoid unnecessary client-side JavaScript libraries. Prioritize native CSS transforms and GPU-accelerated properties (`transform`, `opacity`).
- **Eliminate Continuous Heavy Filters**: Avoid full-screen live SVG turbulence or heavy continuous filters that force perpetual GPU rasterization.
- **Media Optimization**: Lazy-load secondary images and modal assets. Use modern formats (WebP/AVIF).
- **WebGL Justification**: WebGL/Three.js is permitted only when it provides a distinct, essential visual experience with acceptable frame rates and memory footprint on mobile devices.
- **Scroll Economics**: On mobile touch viewports, rely on native 120Hz hardware momentum scrolling; avoid virtual scroll interference.

---

## 6. CODE QUALITY & MAINTAINABILITY

- **Explicit Error Handling**: Do not swallow errors silently. Handle async states, missing data, and fallbacks cleanly.
- **Modular Sizing**: Avoid giant monolithic components (>300 lines). Break composite sections into clean sub-components.
- **Pragmatic Code**: Avoid over-engineering, speculative abstraction layers, or redundant wrapper components.

---

## 7. VERIFICATION & WORKFLOW

- **Behavioral & Functional Changes**:
  - Run typecheck (`npm run build` or `tsc -b`).
  - Run linter (`npm run lint`).
  - Run automated Playwright end-to-end smoke tests (`npx playwright test`).
- **Visual, Styling & Animation Changes**:
  - Do **not** require failing automated tests before every purely visual change.
  - Run the application (`npm run dev`) and inspect the actual rendered output in real browser viewports (desktop 1440×900, tablet 768×1024, mobile 390×844).
  - Capture screenshots to verify layout, alignment, typography, and responsive stability.
  - Inspect console logs to verify zero runtime errors or warnings.
  - Never report a visual task as complete without confirming the rendered result.
