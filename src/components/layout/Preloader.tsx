import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { GeometricK } from '../common/GeometricK';

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [counter, setCounter] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Respect reduced motion accessibility
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      sessionStorage.setItem('kmai_visited', 'true');
      onComplete();
      return;
    }

    const hasVisited = sessionStorage.getItem('kmai_visited') === 'true';
    const duration = hasVisited ? 0.5 : 1.2;

    const counterObj = { val: 0 };

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power2.inOut' } });

      // Initial serene entrance of centered brand elements
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.4, ease: 'power3.out' }
      );

      // Precise tabular progress counter from 0 to 100
      tl.to(counterObj, {
        val: 100,
        duration: duration,
        onUpdate: () => {
          setCounter(Math.floor(counterObj.val));
        },
      });

      // Subtle fade & scale-out of centered elements
      tl.to(
        contentRef.current,
        {
          opacity: 0,
          y: -12,
          scale: 0.98,
          duration: 0.28,
          ease: 'power3.in',
        },
        '+=0.08'
      );

      // Architectural curtain wipe upwards out of view
      tl.to(containerRef.current, {
        yPercent: -100,
        duration: 0.75,
        ease: 'power4.inOut',
        onComplete: () => {
          sessionStorage.setItem('kmai_visited', 'true');
          onComplete();
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[999999] bg-[#07090E] flex items-center justify-center select-none overflow-hidden pointer-events-auto"
      aria-hidden="true"
    >
      <div
        ref={contentRef}
        className="flex flex-col items-center justify-center text-center px-6"
      >
        {/* Architectural Studio Brandmark */}
        <div className="flex items-center gap-3.5 mb-6">
          <GeometricK size={36} theme="dark" />
          <span className="font-display font-bold text-2xl sm:text-3xl tracking-tight text-white">
            KMAI
          </span>
        </div>

        {/* Minimal Hairline Progress Line */}
        <div className="w-48 sm:w-56 h-[1px] bg-white/10 overflow-hidden relative mb-3">
          <div
            className="h-full bg-white/80 transition-all duration-75 ease-out"
            style={{ width: `${counter}%` }}
          />
        </div>

        {/* Quiet Tabular Metadata & Progress */}
        <div className="flex items-center justify-between w-48 sm:w-56 font-mono text-[11px] tracking-widest text-[#8E939E] uppercase">
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#216BFF]" />
            <span>STUDIO</span>
          </span>
          <span className="tabular-nums text-white/90">
            {String(counter).padStart(2, '0')}%
          </span>
        </div>
      </div>
    </div>
  );
};
