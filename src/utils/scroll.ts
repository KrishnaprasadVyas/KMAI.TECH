import type Lenis from 'lenis';

interface ScrollOptions {
  offset?: number;
  duration?: number;
  immediate?: boolean;
}

/**
 * Gets the active Lenis smooth scroll instance from window, if registered.
 */
export function getLenis(): Lenis | undefined {
  if (typeof window === 'undefined') return undefined;
  return (window as unknown as { __lenis?: Lenis }).__lenis;
}

/**
 * Smoothly scrolls to a target (selector string, HTMLElement, or number Y) using Lenis if available,
 * falling back gracefully to native browser scrolling.
 */
export function scrollToTarget(
  target: string | HTMLElement | number,
  options: ScrollOptions = {}
): void {
  if (typeof window === 'undefined') return;

  const { offset = 0, duration = 1.2, immediate = false } = options;
  const lenis = getLenis();

  // Scroll to absolute vertical position
  if (typeof target === 'number') {
    if (lenis) {
      lenis.scrollTo(target, { duration: immediate ? 0 : duration, offset, immediate });
    } else {
      window.scrollTo({ top: target, behavior: immediate ? 'auto' : 'smooth' });
    }
    return;
  }

  // Scroll to top shorthand
  if (typeof target === 'string' && (target === '#' || target === '#hero' || target === '/')) {
    if (window.location.pathname !== '/') {
      window.location.href = '/';
      return;
    }
    if (lenis) {
      lenis.scrollTo(0, { duration: immediate ? 0 : duration, immediate });
    } else {
      window.scrollTo({ top: 0, behavior: immediate ? 'auto' : 'smooth' });
    }
    return;
  }

  // Cross-page hash navigation: if not on homepage, redirect with hash
  if (typeof target === 'string' && target.startsWith('#')) {
    if (window.location.pathname !== '/') {
      window.location.href = '/' + target;
      return;
    }
  }

  // Find target element
  const element: HTMLElement | null =
    typeof target === 'string' ? (document.querySelector(target) as HTMLElement | null) : target;

  if (!element) {
    if (typeof target === 'string' && !target.startsWith('#') && !target.startsWith('/')) {
      const fallbackEl = document.getElementById(target);
      if (fallbackEl) {
        if (lenis) {
          lenis.scrollTo(fallbackEl, { offset, duration: immediate ? 0 : duration, immediate });
        } else {
          fallbackEl.scrollIntoView({ behavior: immediate ? 'auto' : 'smooth' });
        }
      }
    }
    return;
  }

  if (lenis) {
    lenis.scrollTo(element, { offset, duration: immediate ? 0 : duration, immediate });
  } else {
    element.scrollIntoView({ behavior: immediate ? 'auto' : 'smooth' });
  }
}
