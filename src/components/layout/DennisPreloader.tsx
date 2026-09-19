import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { usePrefersReducedMotion } from '../../hooks/useMediaQuery';

interface DennisPreloaderProps {
  onComplete: () => void;
}

export const DennisPreloader: React.FC<DennisPreloaderProps> = ({ onComplete }) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const kRef = useRef<HTMLDivElement>(null);
  const prefersReduced = usePrefersReducedMotion();
  const [dim, setDim] = useState(() => ({
    w: typeof window !== 'undefined' ? window.innerWidth : 1440,
    h: typeof window !== 'undefined' ? window.innerHeight : 900,
  }));

  // Update window dimensions on resize
  useEffect(() => {
    const handleResize = () => {
      setDim({ w: window.innerWidth, h: window.innerHeight });
    };
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (dim.w === 0) return; // Wait for dimensions

    const overlay = overlayRef.current;
    const path = pathRef.current;
    const kEl = kRef.current;
    if (!overlay || !path || !kEl) return;

    if (prefersReduced) {
      // Instant reveal for reduced-motion users
      sessionStorage.setItem('kmai_intro_completed', 'true');
      onComplete();
      return;
    }

    const { w, h } = dim;

    // Initial SVG state: curved bottom arch bulging downward
    const curvedPath = `M0 0 L${w} 0 L${w} ${h} Q${w / 2} ${h + 300} 0 ${h} L0 0`;
    const flatPath = `M0 0 L${w} 0 L${w} ${h} Q${w / 2} ${h} 0 ${h} L0 0`;

    path.setAttribute('d', curvedPath);

    // Phase 1: KMAI wordmark scale-in entrance (0 → 0.6s)
    gsap.fromTo(
      kEl,
      { scale: 0.9, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.6, ease: 'power3.out' }
    );

    // Phase 2: After 1.2s hold, begin exit sequence
    const timer = window.setTimeout(() => {
      // KMAI wordmark fades and scales smoothly
      gsap.to(kEl, {
        scale: 1.1,
        opacity: 0,
        duration: 0.45,
        ease: 'power2.in',
      });

      // Curved SVG flattens (0.3s delay, so curve flattens as overlay starts moving)
      gsap.to(path, {
        attr: { d: flatPath },
        duration: 0.7,
        ease: [0.76, 0, 0.24, 1] as unknown as string,
        delay: 0.25,
      });

      // Overlay slides upward — pure transform, no pinning
      gsap.to(overlay, {
        yPercent: -100,
        duration: 0.95,
        ease: 'power3.inOut',
        delay: 0.35,
        onComplete: () => {
          sessionStorage.setItem('kmai_intro_completed', 'true');
          onComplete();
        },
      });
    }, 1200);

    return () => {
      window.clearTimeout(timer);
      gsap.killTweensOf([kEl, path, overlay]);
    };
  }, [dim, prefersReduced, onComplete]);

  const { w, h } = dim;
  const curvedPath = `M0 0 L${w} 0 L${w} ${h} Q${w / 2} ${h + 300} 0 ${h} L0 0`;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[999999] bg-[#07090E] flex items-center justify-center will-change-transform"
      aria-hidden="true"
    >
      {/* Editorial Studio Brandmark — matching top-left signature typography */}
      <div
        ref={kRef}
        className="flex items-center justify-center pointer-events-none will-change-transform select-none"
        style={{ opacity: 0 }}
      >
        <span className="font-poppins font-black text-6xl sm:text-8xl md:text-9xl tracking-[-0.04em] uppercase text-white leading-none">
          KMAI
        </span>
      </div>

      {/* Dennis Snellenberg curved bottom SVG — clips the exit */}
      <svg
        ref={svgRef}
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
        style={{ zIndex: -1 }}
        aria-hidden="true"
      >
        <path ref={pathRef} d={curvedPath} fill="#07090E" />
      </svg>
    </div>
  );
};
