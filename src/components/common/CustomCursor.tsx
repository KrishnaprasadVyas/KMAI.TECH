import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useIsTouchDevice, usePrefersReducedMotion } from '../../hooks/useMediaQuery';

export type CursorVariant = 'default' | 'project' | 'button' | 'image' | 'footer' | 'open' | 'external';

export interface CursorState {
  variant: CursorVariant;
  text?: string;
}

interface CustomCursorProps {
  cursorState: CursorState;
}

export const CustomCursor: React.FC<CustomCursorProps> = ({ cursorState }) => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const pointerImgRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const rippleContainerRef = useRef<HTMLDivElement>(null);

  const isTouch = useIsTouchDevice();
  const prefersReducedMotion = usePrefersReducedMotion();
  const [isVisible, setIsVisible] = useState(false);
  const [isDarkBg, setIsDarkBg] = useState(false);

  // Hotspot offset: apex of arrow is at (27, 16) in 360x424 asset.
  // When rendered at 24px width (height ~28.2px):
  // HOTSPOT_X = 24 * (27 / 360) = 1.8px
  // HOTSPOT_Y = 28.2 * (16 / 424) = 1.06px
  const HOTSPOT_X = 1.8;
  const HOTSPOT_Y = 1.1;

  // Ref to track last mouse coordinate for scroll updates
  const lastPosRef = useRef({ x: -100, y: -100 });
  const isDarkBgRef = useRef(false);

  // Helper to parse rgb or rgba string
  const parseRgb = (colorStr: string): { r: number; g: number; b: number; a: number } | null => {
    const match = colorStr.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
    if (!match) return null;
    return {
      r: parseInt(match[1], 10),
      g: parseInt(match[2], 10),
      b: parseInt(match[3], 10),
      a: match[4] !== undefined ? parseFloat(match[4]) : 1,
    };
  };

  const isColorDark = (colorStr: string): boolean | null => {
    const rgb = parseRgb(colorStr);
    if (!rgb || rgb.a < 0.15) return null; // Transparent or invisible, keep searching
    // Standard relative luminance approximation (ITU-R BT.601)
    const luminance = 0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b;
    return luminance < 128;
  };

  // High-performance background brightness detector
  const checkDarkBg = (x: number, y: number): boolean => {
    if (x < 0 || y < 0) return false;

    // 1. Fast elementFromPoint hierarchy check
    const el = document.elementFromPoint(x, y);
    if (el) {
      // Check nearest explicit theme container first
      const themedParent = el.closest('[data-theme]');
      if (themedParent) {
        return themedParent.getAttribute('data-theme') === 'dark';
      }

      // Check explicit light selectors
      const explicitLight = el.closest('.bg-\\[\\#F2F0EA\\], .bg-white');
      if (explicitLight) return false;

      // Check explicit dark selectors
      const explicitDark = el.closest(
        '#manifesto, #contact, footer, [data-cursor-invert="true"], .bg-\\[\\#07090E\\], .bg-\\[\\#0A0C0F\\], .bg-\\[\\#05070B\\], .bg-\\[\\#101827\\], .bg-black'
      );
      if (explicitDark) return true;

      // 2. Computed background color inspection (traverse up to 6 ancestors)
      let curr: Element | null = el;
      let depth = 0;
      while (curr && depth < 6 && curr !== document.documentElement) {
        const style = window.getComputedStyle(curr);
        const bg = style.backgroundColor;
        if (bg && bg !== 'transparent' && bg !== 'rgba(0, 0, 0, 0)') {
          const dark = isColorDark(bg);
          if (dark !== null) return dark;
        }
        curr = curr.parentElement;
        depth++;
      }
    }

    // 3. Section geometry fallback
    const darkSections = document.querySelectorAll('#manifesto, #contact, footer, [data-theme="dark"]');
    for (let i = 0; i < darkSections.length; i++) {
      const rect = darkSections[i].getBoundingClientRect();
      if (x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom) {
        return true;
      }
    }

    return false;
  };

  useEffect(() => {
    if (isTouch || prefersReducedMotion) return;

    const cursor = cursorRef.current;
    if (!cursor) return;

    // Fast, ultra-responsive GSAP quickTo setters for 120fps hardware-accelerated tracking
    const xTo = gsap.quickTo(cursor, 'x', { duration: 0.05, ease: 'power2.out' });
    const yTo = gsap.quickTo(cursor, 'y', { duration: 0.05, ease: 'power2.out' });

    const updateBgState = (x: number, y: number) => {
      const overDark = checkDarkBg(x, y);
      if (overDark !== isDarkBgRef.current) {
        isDarkBgRef.current = overDark;
        setIsDarkBg(overDark);
      }
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);
      lastPosRef.current = { x: e.clientX, y: e.clientY };

      // Translate container so pointer tip lands exactly at clientX, clientY
      xTo(e.clientX - HOTSPOT_X);
      yTo(e.clientY - HOTSPOT_Y);

      updateBgState(e.clientX, e.clientY);
    };

    const onScroll = () => {
      if (lastPosRef.current.x >= 0) {
        updateBgState(lastPosRef.current.x, lastPosRef.current.y);
      }
    };

    const onMouseLeave = () => {
      setIsVisible(false);
    };

    const onMouseEnter = () => {
      setIsVisible(true);
    };

    // Clicking animation: Small, really simple ripple blooming strictly from cursor tip
    const onMouseDown = (e: MouseEvent) => {
      // Tactile micro-press feedback on pointer arrow
      if (pointerImgRef.current) {
        gsap.to(pointerImgRef.current, {
          scale: 0.88,
          duration: 0.08,
          ease: 'power1.out',
        });
      }

      const rippleWrap = rippleContainerRef.current;
      if (!rippleWrap) return;

      const clickX = e.clientX;
      const clickY = e.clientY;
      const currentDark = isDarkBgRef.current;

      const burst = document.createElement('div');
      burst.className = 'pointer-events-none absolute';
      burst.style.left = `${clickX}px`;
      burst.style.top = `${clickY}px`;
      burst.style.transform = 'translate(-50%, -50%)';

      // 1-2 small, minimal delicate hairline rings
      const ring = document.createElement('div');
      ring.className = 'absolute rounded-full pointer-events-none';
      ring.style.left = '50%';
      ring.style.top = '50%';
      ring.style.transform = 'translate(-50%, -50%)';
      ring.style.width = '0px';
      ring.style.height = '0px';
      ring.style.border = currentDark
        ? '1px solid rgba(255, 255, 255, 0.75)'
        : '1px solid rgba(10, 12, 15, 0.55)';
      ring.style.opacity = '0.9';

      burst.appendChild(ring);

      gsap.to(ring, {
        width: 38,
        height: 38,
        opacity: 0,
        duration: 0.32,
        ease: 'power2.out',
      });

      // Second micro-pulse ring for tactile feedback
      const microRing = document.createElement('div');
      microRing.className = 'absolute rounded-full pointer-events-none';
      microRing.style.left = '50%';
      microRing.style.top = '50%';
      microRing.style.transform = 'translate(-50%, -50%)';
      microRing.style.width = '0px';
      microRing.style.height = '0px';
      microRing.style.border = currentDark
        ? '1px solid rgba(255, 255, 255, 0.45)'
        : '1px solid rgba(10, 12, 15, 0.35)';
      microRing.style.opacity = '0.7';

      burst.appendChild(microRing);

      gsap.to(microRing, {
        width: 22,
        height: 22,
        opacity: 0,
        duration: 0.22,
        delay: 0.04,
        ease: 'power1.out',
      });

      rippleWrap.appendChild(burst);

      // Fast cleanup
      setTimeout(() => {
        burst.remove();
      }, 400);
    };

    const onMouseUp = () => {
      if (pointerImgRef.current) {
        gsap.to(pointerImgRef.current, {
          scale: 1,
          duration: 0.16,
          ease: 'back.out(2)',
        });
      }
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('mousedown', onMouseDown, { passive: true });
    window.addEventListener('mouseup', onMouseUp, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
    };
  }, [isTouch, prefersReducedMotion, isVisible]);

  // Contextual badge animations
  useEffect(() => {
    if (isTouch || prefersReducedMotion) return;

    const badge = badgeRef.current;
    if (!badge) return;

    const isInteractive = cursorState.variant !== 'default';
    if (isInteractive && (cursorState.text || cursorState.variant === 'project' || cursorState.variant === 'open')) {
      gsap.to(badge, {
        opacity: 1,
        scale: 1,
        x: 0,
        duration: 0.18,
        ease: 'power2.out',
      });
    } else {
      gsap.to(badge, {
        opacity: 0,
        scale: 0.8,
        x: -4,
        duration: 0.14,
        ease: 'power2.in',
      });
    }
  }, [cursorState, isTouch, prefersReducedMotion]);

  if (isTouch || prefersReducedMotion) {
    return null;
  }

  const isInteractive = cursorState.variant !== 'default';

  // Determine displayed text badge
  let labelText = cursorState.text;
  if (!labelText) {
    if (cursorState.variant === 'project') labelText = 'VIEW';
    else if (cursorState.variant === 'open') labelText = 'OPEN';
    else if (cursorState.variant === 'external') labelText = '↗';
    else if (cursorState.variant === 'image') labelText = 'EXPAND';
    else if (cursorState.variant === 'footer') labelText = 'TOP ↑';
  }

  // Active cursor assets based on background & interaction state
  const solidSrc = isDarkBg ? '/cursor-solid-white.png' : '/cursor-solid-black.png';
  const outlineSrc = isDarkBg ? '/cursor-outline-white.png' : '/cursor-outline-black.png';

  return (
    <>
      {/* Click ripple layer spanning fixed screen */}
      <div
        ref={rippleContainerRef}
        className="pointer-events-none fixed inset-0 z-[999998] z-[99998] cursor-ripple-container overflow-hidden"
        aria-hidden="true"
      />

      {/* Main cursor follower container */}
      <div
        ref={cursorRef}
        className={`pointer-events-none fixed top-0 left-0 z-[999999] transition-opacity duration-150 will-change-transform ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        aria-hidden="true"
      >
        <div className="relative flex items-center">
          {/* Custom Arrow Pointer Container (w-[24px] h-[28px]) */}
          <div
            ref={pointerImgRef}
            className="relative w-6 h-7 select-none pointer-events-none drop-shadow-sm will-change-transform"
          >
            {/* Resting solid arrow */}
            <img
              src={solidSrc}
              alt=""
              className={`absolute inset-0 w-full h-full object-contain pointer-events-none select-none transition-opacity duration-120 ${
                isInteractive ? 'opacity-0' : 'opacity-100'
              }`}
              draggable={false}
            />

            {/* Interactive outline arrow */}
            <img
              src={outlineSrc}
              alt=""
              className={`absolute inset-0 w-full h-full object-contain pointer-events-none select-none transition-opacity duration-120 ${
                isInteractive ? 'opacity-100' : 'opacity-0'
              }`}
              draggable={false}
            />
          </div>

          {/* Contextual Action Badge */}
          {labelText && (
            <div
              ref={badgeRef}
              className={`ml-1.5 px-2 py-0.5 rounded-[2px] shadow-lg font-body text-[10px] font-semibold tracking-wider uppercase select-none pointer-events-none opacity-0 scale-75 whitespace-nowrap transition-colors duration-200 ${
                isDarkBg
                  ? 'bg-[#F2F0EA] text-[#0A0C0F] border border-white/20'
                  : 'bg-[#0A0C0F] text-[#F2F0EA] border border-black/20'
              }`}
            >
              {labelText}
            </div>
          )}
        </div>
      </div>
    </>
  );
};
