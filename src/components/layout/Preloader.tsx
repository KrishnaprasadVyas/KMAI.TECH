import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { usePrefersReducedMotion } from '../../hooks/useMediaQuery';

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [counter, setCounter] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const topPanelRef = useRef<HTMLDivElement>(null);
  const bottomPanelRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  const words = ['IDEAS', 'SYSTEMS', 'IMPACT'];

  useEffect(() => {
    if (prefersReducedMotion) {
      sessionStorage.setItem('kmai_visited', 'true');
      onComplete();
      return;
    }

    const hasVisited = sessionStorage.getItem('kmai_visited') === 'true';
    const duration = hasVisited ? 0.9 : 2.0;

    const counterObj = { val: 0 };
    const tl = gsap.timeline();

    // Progress counter animation
    tl.to(counterObj, {
      val: 100,
      duration: duration,
      ease: 'power2.inOut',
      onUpdate: () => {
        setCounter(Math.floor(counterObj.val));
      },
    });

    // Animate progress line width
    if (lineRef.current) {
      tl.to(
        lineRef.current,
        {
          width: '100%',
          duration: duration,
          ease: 'power2.inOut',
        },
        0
      );
    }

    // Cycle through words
    const intervalTime = (duration * 1000) / words.length;
    const wordInterval = setInterval(() => {
      setWordIndex((prev) => (prev < words.length - 1 ? prev + 1 : prev));
    }, intervalTime);

    // Split-panel reveal transition when 100 is reached
    tl.to(contentRef.current, {
      opacity: 0,
      y: -20,
      duration: 0.35,
      ease: 'power2.in',
    });

    if (topPanelRef.current && bottomPanelRef.current) {
      tl.to(
        topPanelRef.current,
        {
          yPercent: -100,
          duration: 0.85,
          ease: 'power4.inOut',
        },
        '+=0.05'
      );

      tl.to(
        bottomPanelRef.current,
        {
          yPercent: 100,
          duration: 0.85,
          ease: 'power4.inOut',
        },
        '<'
      );
    }

    tl.call(() => {
      clearInterval(wordInterval);
      sessionStorage.setItem('kmai_visited', 'true');
      onComplete();
    });

    return () => {
      clearInterval(wordInterval);
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[999999] pointer-events-none select-none overflow-hidden"
    >
      {/* Top Split Panel */}
      <div
        ref={topPanelRef}
        className="absolute top-0 left-0 w-full h-1/2 bg-[#05070B] border-b border-[#11294D]/30"
      />

      {/* Bottom Split Panel */}
      <div
        ref={bottomPanelRef}
        className="absolute bottom-0 left-0 w-full h-1/2 bg-[#05070B] border-t border-[#11294D]/30"
      />

      {/* Centered Cinematic Loading Content */}
      <div
        ref={contentRef}
        className="absolute inset-0 flex flex-col justify-between p-8 md:p-16 text-white pointer-events-auto"
      >
        {/* Brand Header */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#006EFF] shadow-[0_0_12px_#006EFF] animate-pulse" />
            <span className="font-mono text-xs tracking-[0.25em] text-[#A0A7B1] uppercase">
              KMAI.tech
            </span>
          </div>
          <span className="font-mono text-xs text-[#006EFF] tracking-wider">
            STUDIO / 2026
          </span>
        </div>

        {/* Dynamic Center Sequence */}
        <div className="flex flex-col items-center justify-center my-auto">
          <div className="h-16 flex items-center justify-center overflow-hidden">
            <span
              key={wordIndex}
              className="text-2xl md:text-5xl font-extrabold tracking-widest text-[#F3F5F7] animate-[fadeSlide_0.35s_ease-out]"
            >
              {words[wordIndex]}
            </span>
          </div>
          <p className="mt-4 text-xs md:text-sm text-[#A0A7B1] font-mono tracking-widest uppercase">
            Architecting Digital Businesses
          </p>
        </div>

        {/* Bottom Percentage & Progress */}
        <div>
          <div className="flex justify-between items-baseline mb-4">
            <span className="text-xs font-mono text-[#A0A7B1] tracking-widest">
              INITIALIZING
            </span>
            <span className="text-5xl md:text-8xl font-mono font-bold text-white tracking-tighter tabular-nums">
              {String(counter).padStart(2, '0')}
              <span className="text-2xl md:text-3xl text-[#006EFF] font-normal">%</span>
            </span>
          </div>

          {/* Electric-Blue Progress Line */}
          <div className="w-full h-[2px] bg-[#0B1F3A] overflow-hidden relative">
            <div
              ref={lineRef}
              className="h-full bg-gradient-to-r from-[#006EFF] via-[#1683FF] to-[#38BDF8] shadow-[0_0_15px_#006EFF]"
              style={{ width: '0%' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
