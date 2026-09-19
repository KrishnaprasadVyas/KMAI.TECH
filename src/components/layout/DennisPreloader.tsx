import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { GeometricK } from '../common/GeometricK';
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
  const [dim, setDim] = useState({ w: 0, h: 0 });

  // Capture window dimensions after mount (SSR-safe)
  useEffect(() => {
    setDim({ w: window.innerWidth, h: window.innerHeight });
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

    // Phase 1: K scale-in entrance (0 → 0.6s)
    gsap.fromTo(
      kEl,
      { scale: 0.85, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.6, ease: 'power3.out' }
    );

    // Phase 2: After 1.2s hold, begin exit sequence
    const timer = window.setTimeout(() => {
      // K fades + scales up (like iris reveal)
      gsap.to(kEl, {
        scale: 1.4,
        opacity: 0,
        duration: 0.55,
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

  if (dim.w === 0) return null;

  const { w, h } = dim;
  const curvedPath = `M0 0 L${w} 0 L${w} ${h} Q${w / 2} ${h + 300} 0 ${h} L0 0`;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[999999] bg-[#07090E] flex items-center justify-center will-change-transform"
      aria-hidden="true"
    >
      {/* Geometric K centrepiece */}
      <div
        ref={kRef}
        className="pointer-events-none will-change-transform"
        style={{ opacity: 0 }}
      >
        <GeometricK size={320} theme="dark" variant="monumental" />
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
