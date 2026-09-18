# KMAI.tech — Engineering Quality & Verification Standards

This document establishes the code quality, static analysis, build verification, accessibility, and visual testing standards for all contributions to KMAI.tech.

---

## 1. TypeScript Expectations

- **Strict Mode**: The codebase enforces strict type checking via `tsconfig.app.json` (`"strict": true`, `"noUnusedLocals": true`, `"noUnusedParameters": true`).
- **No Unjustified `any`**: Do not use `any` as an escape hatch. Define explicit interfaces in `src/types/` for all props, domain models, and API payloads.
- **Props Typing**: All React functional components must have explicitly typed props (`React.FC<Props>` or `({ prop }: Props)`).
- **Type Check Command**:
  ```bash
  npm run build    # executes: tsc -b && vite build
  ```
  Ensure typechecking completes with zero diagnostics before committing changes.

---

## 2. Linting Standards

- **Oxlint**: The repository uses `oxlint` for high-performance static analysis configured in `.oxlintrc.json`.
- **Command**:
  ```bash
  npm run lint     # executes: oxlint
  ```
  All lint rules must pass with 0 warnings and 0 errors.

---

## 3. Build Verification

- Prior to considering any feature or refactoring complete, verify that the production bundle compiles cleanly:
  ```bash
  npm run build
  ```
- **Asset Integrity**: Ensure no broken import paths, missing image assets in `public/`, or circular dependency warnings.

---

## 4. Test Expectations

- **Behavioral & Functional Tests**:
  - Run with Playwright:
    ```bash
    npx playwright test
    ```
  - Covers smoke tests, core routing, modal triggers, console error absence, and viewport layout integrity.
- **Visual Design Verification**:
  - Do **not** demand failing unit tests prior to pure visual or styling iterations.
  - Rely on Playwright visual baseline snapshots and manual browser inspection across standard resolutions.

---

## 5. Accessibility (a11y) Checks

- **Reduced Motion**: All animations must respect `prefers-reduced-motion: reduce`. Test by enabling the reduced-motion media feature in DevTools.
- **Keyboard Navigation**:
  - All interactive elements (`<button>`, `<a>`) must be focusable.
  - Modals (e.g., `CaseStudyModal`) must capture focus and close gracefully via the `Escape` key.
  - Links must have meaningful accessible text or `aria-label`.
- **Color Contrast**:
  - Maintain WCAG AA contrast ratio for all critical body text against `#05070B` and `#08111F`.

---

## 6. Browser Verification

- Test in a real browser across three primary responsive categories:
  1. **Desktop**: 1440 × 900 (full navigation, cursor follower, magnetic physics, floating previews)
  2. **Tablet**: 768 × 1024 / 1024 × 768 (adaptive navigation, touch cursor fallback)
  3. **Mobile**: 390 × 844 (stacked vertical hierarchy, native momentum scrolling, touch-safe buttons)
- **Check for Zero Horizontal Overflow**:
  - Ensure `document.documentElement.scrollWidth === window.innerWidth` across all viewports.
- **Inspect Console**:
  - Confirm 0 uncaught errors, 0 unhandled promise rejections, and 0 React hydration/key warnings.
