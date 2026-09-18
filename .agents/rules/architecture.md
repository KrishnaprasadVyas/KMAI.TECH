# KMAI.tech — Architecture Documentation

This document describes the actual, verified architecture of the KMAI.tech repository. Do not assume or introduce unverified architectural patterns.

---

## 1. Core Technology Stack

- **Runtime / Framework**: React 19.2.8
- **Language**: TypeScript (~6.0.2) in strict mode (`tsconfig.app.json`)
- **Build Tool / Dev Server**: Vite 8.3.0 with `@vitejs/plugin-react`
- **Styling Engine**: Tailwind CSS 3.4.19 with PostCSS 8.5.28 and Autoprefixer 10.6.1
- **Motion & Kinetic Physics**: GSAP 3.15.0 with ScrollTrigger plugin
- **Inertial Smooth Scrolling**: Lenis 1.3.26 synchronized directly with `gsap.ticker`
- **Iconography**: Lucide React 1.47.0 + bespoke SVG branding
- **Linter**: Oxlint 1.81.0 (`.oxlintrc.json`)
- **End-to-End & Visual Testing**: Playwright (`@playwright/test`)

---

## 2. Directory Structure & Organization

```
KMAI.TECH/
├── .agents/
│   └── rules/                  # Persistent agent guidelines and system docs
│       ├── architecture.md
│       ├── design-system.md
│       ├── quality.md
│       └── visual-development.md
├── AGENTS.md                   # Root persistent rules
├── index.html                  # HTML entry with font preconnects and dark theme meta
├── package.json                # Dependencies, build & lint scripts
├── playwright.config.ts        # Playwright E2E and visual regression configuration
├── postcss.config.js           # PostCSS configuration with Tailwind & Autoprefixer
├── tailwind.config.js          # Brand colors, typography, letter-spacing, keyframes
├── tsconfig.json               # Root TS references
├── tsconfig.app.json           # Client app TS compilation rules
├── tsconfig.node.json          # Node/Vite TS compilation rules
├── vite.config.ts              # Vite bundle configuration
├── public/                     # Static production assets
│   ├── favicon.svg             # Brand favicon mark
│   ├── icons.svg               # SVG sprite definitions
│   ├── robots.txt              # Search engine directives
│   ├── sitemap.xml             # Static URL sitemap
│   └── projects/               # Client project screenshots & assets
│       ├── gurudev-app/        # Real project captures (hero.webp, etc.)
│       ├── gurudev-ashram/
│       ├── mavt/
│       ├── priya-surana/
│       ├── shanti-ashram/
│       └── vishwaraj/
├── scripts/                    # Maintenance, screenshot capture, and audit tools
├── src/
│   ├── main.tsx                # Entry point rendering <App /> to #root
│   ├── App.tsx                 # Top-level orchestrator (preloader, cursor, sections)
│   ├── App.css                 # Root component styles
│   ├── index.css               # Tailwind directives, custom scrollbars, glass utilities
│   ├── assets/                 # Local image & SVG assets
│   ├── types/
│   │   └── index.ts            # Type definitions (Project, Service, Testimonial, etc.)
│   ├── data/                   # Static data models
│   │   ├── projects.ts         # Portfolio item metadata, images, and deliverables
│   │   ├── services.ts         # Service offerings, summaries, and deliverables
│   │   ├── technologies.ts     # Tech stack items categorized
│   │   └── testimonials.ts     # Client feedback entries & schema
│   ├── hooks/
│   │   ├── useMediaQuery.ts    # Media query, touch device, and reduced-motion detectors
│   │   ├── useMousePosition.ts # Raw mouse coordinate tracker
│   │   └── useSmoothScroll.ts  # Lenis initialization & GSAP ticker sync
│   └── components/
│       ├── common/             # Reusable atomic UI elements
│       │   ├── CustomCursor.tsx    # Desktop follower with GSAP quickTo tracking
│       │   ├── GeometricK.tsx      # Interactive 3D SVG brand mark
│       │   ├── MagneticButton.tsx  # Magnetic cursor-attraction button primitive
│       │   └── TextReveal.tsx      # Clip-path scroll-reveal typography wrapper
│       ├── layout/             # Structural frame components
│       │   ├── Navbar.tsx          # Fixed glass navigation bar with mobile overlay
│       │   ├── Preloader.tsx       # Branded counter & split-panel screen reveal
│       │   └── Footer.tsx          # Architectural site footer with leadership index
│       ├── projects/           # Portfolio showcase modules
│       │   ├── CaseStudyModal.tsx  # Fullscreen deep-dive modal
│       │   ├── ProjectItem.tsx     # Single project row with hover / touch triggers
│       │   └── ProjectPreview.tsx  # Floating cursor-following preview card
│       └── sections/           # Landing page content sections
│           ├── Hero.tsx            # Headline, 3D brandmark, direct CTAs
│           ├── IntroStatement.tsx  # Studio manifesto with scrub text reveal
│           ├── Services.tsx        # Accordion-style service capability list
│           ├── SelectedWork.tsx    # Flagship spotlight + project archive rows
│           ├── WorkMarquee.tsx     # Continuous kinetic text ticker
│           ├── About.tsx           # Three co-founders cards & craft philosophy
│           ├── Process.tsx         # Five-phase engineering delivery framework
│           ├── Technology.tsx      # Technology stack catalog
│           ├── Testimonials.tsx    # Minh Pham inspired quote carousel
│           ├── TrustClients.tsx    # Real-world client entity grid
│           └── Contact.tsx         # Monumental conversion banner & contact triggers
└── tests/                      # Testing infrastructure
    ├── e2e/                    # Playwright smoke and visual verification specs
    └── screenshots/            # Multi-viewport screenshot captures
        └── baseline/           # Baseline visual state for regression testing
```

---

## 3. State Management & Data Flow

- **Zero Heavy State Stores**: The application currently has no external state management libraries (no Redux, Zustand, or Jotai in the client bundle).
- **Orchestration State (`App.tsx`)**:
  - `isLoaded` (`boolean`): Controlled by `Preloader.tsx` (`onComplete`). Once true, triggers `Hero` entrance timelines and enables `useSmoothScroll`.
  - `cursorState` (`{ variant, text }`): Bubbled via `onCursorChange` callback from buttons, project rows, and images to `CustomCursor.tsx`.
- **Local Section State**:
  - `activeService` index in `Services.tsx`.
  - `hoveredProject` and `selectedCaseStudy` in `SelectedWork.tsx`.
  - `currentIndex` in `Testimonials.tsx`.
  - `mobileMenuOpen` in `Navbar.tsx`.

---

## 4. Animation & Interaction Architecture

- **Lenis + GSAP ScrollTrigger Integration**:
  ```typescript
  // Lenis drives vertical scroll; GSAP ticker updates Lenis on every frame
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
  ```
- **Magnetic Physics (`MagneticButton.tsx`)**:
  - Calculates coordinate deltas `(clientX - (left + width/2)) * strength`.
  - Animates the button shell and inner content independently using `gsap.quickTo` for a physical parallax feel.
  - Automatically skipped when `pointer: coarse` matches.
- **Pointer Follower (`CustomCursor.tsx` & `ProjectPreview.tsx`)**:
  - Uses `gsap.quickTo(el, 'x')` and `'y'` with short durations (`0.1s` – `0.35s`) for high-refresh-rate mouse tracking without requestAnimationFrame overhead.
