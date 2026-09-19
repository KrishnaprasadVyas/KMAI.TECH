import React, { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GeometricK } from '../common/GeometricK';
import { usePrefersReducedMotion } from '../../hooks/useMediaQuery';

gsap.registerPlugin(ScrollTrigger);

interface OpeningExperienceProps {
  children: React.ReactNode;
  onIntroComplete?: () => void;
}

export const OpeningExperience: React.FC<OpeningExperienceProps> = ({
  children,
  onIntroComplete,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const kGraphicRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);

  const prefersReducedMotion = usePrefersReducedMotion();

  const [isCompleted, setIsCompleted] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return (
        window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
        sessionStorage.getItem('kmai_intro_completed') === 'true'
      );
    }
    return false;
  });

  const completeIntro = useCallback(() => {
    sessionStorage.setItem('kmai_intro_completed', 'true');
    setIsCompleted(true);
    onIntroComplete?.();

    // Refresh ScrollTrigger so all downstream animations (Marquee, Manifesto scrub, Selected Work) compute exact natural offsets
    requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });
  }, [onIntroComplete]);

  useEffect(() => {
    if (isCompleted) return;

    if (prefersReducedMotion) {
      completeIntro();
      return;
    }

    const overlay = overlayRef.current;
    const kGraphic = kGraphicRef.current;
    const indicator = indicatorRef.current;
    if (!overlay || !kGraphic) return;

    const isMobile = window.innerWidth < 768;
    const scrubDistance = isMobile ? 500 : 750;

    const ctx = gsap.context(() => {
      // Navbar hidden during opening, fades in as K expands
      const navbarEl = document.querySelector('#kmai-navbar');
      if (navbarEl) {
        gsap.set(navbarEl, { opacity: 0 });
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: overlay,
          start: 'top top',
          end: `+=${scrubDistance}`,
          scrub: isMobile ? 0.3 : 0.2,
          pin: true,
          pinSpacing: false,
          anticipatePin: 1,
          onLeave: () => {
            gsap.to(overlay, {
              opacity: 0,
              duration: 0.3,
              ease: 'power2.out',
              onComplete: () => {
                if (overlay) overlay.style.display = 'none';
                if (navbarEl) gsap.set(navbarEl, { clearProps: 'opacity' });
                completeIntro();
              },
            });
          },
        },
      });

      // 0.00 -> 0.15: Hairline indicator fades away
      if (indicator) {
        tl.to(indicator, { opacity: 0, y: 12, duration: 0.15, ease: 'power2.out' }, 0);
      }

      // 0.00 -> 0.75: Monumental K scales up like an architectural iris/aperture
      tl.to(
        kGraphic,
        {
          scale: 4.5,
          opacity: 0,
          duration: 0.75,
          ease: 'power2.inOut',
        },
        0
      );

      // 0.25 -> 0.90: Dark overlay fades out to reveal the real Hero
      tl.to(
        overlay,
        {
          opacity: 0,
          duration: 0.65,
          ease: 'power2.inOut',
        },
        0.25
      );

      // 0.40 -> 0.90: Navbar smoothly fades into view
      if (navbarEl) {
        tl.to(navbarEl, { opacity: 1, duration: 0.5, ease: 'power2.out' }, 0.4);
      }
    }, containerRef);

    return () => ctx.revert();
  }, [isCompleted, prefersReducedMotion, completeIntro]);

  const handleScrollClick = () => {
    window.scrollTo({ top: 700, behavior: 'smooth' });
  };

  return (
    <div ref={containerRef} className="relative w-full">
      {/* ─────────────────────────────────────────────────────────────
          FULL-SCREEN CINEMATIC OPENING OVERLAY
          Dominates the viewport initially; scales/dissolves on scroll.
          ───────────────────────────────────────────────────────────── */}
      {!isCompleted && (
        <div
          ref={overlayRef}
          data-theme="dark"
          className="fixed inset-0 z-[9050] w-full h-screen bg-[#07090E] flex flex-col items-center justify-center overflow-hidden will-change-transform"
        >
          {/* Colossal Geometric K in the Center */}
          <div
            ref={kGraphicRef}
            className="relative flex items-center justify-center pointer-events-none will-change-transform"
          >
            <div className="w-[180px] xs:w-[220px] sm:w-[280px] md:w-[360px] lg:w-[420px]">
              <GeometricK size={420} theme="dark" variant="monumental" />
            </div>
          </div>

          {/* Minimal Architectural Hairline Scroll Prompt */}
          <div
            ref={indicatorRef}
            onClick={handleScrollClick}
            className="absolute bottom-8 sm:bottom-12 flex flex-col items-center gap-3 cursor-pointer select-none group"
          >
            <span className="font-body text-[10px] sm:text-xs tracking-[0.25em] uppercase text-white/40 group-hover:text-white/80 transition-colors">
              Scroll to explore
            </span>
            <div className="w-[1px] h-9 bg-white/20 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full bg-white animate-studio-scroll" />
            </div>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          REAL WEBPAGE
          Always mounted in full layout with 100% accurate dimensions.
          ───────────────────────────────────────────────────────────── */}
      <div className="relative w-full z-10">
        {children}
      </div>
    </div>
  );
};
