import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { GeometricK } from '../common/GeometricK';

interface HeroProps {
  isLoaded: boolean;
  onCursorChange?: (variant: 'default' | 'button' | 'project' | 'image' | 'footer', text?: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ isLoaded, onCursorChange }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const telemetryRef = useRef<HTMLDivElement>(null);
  const subtextRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isLoaded) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      gsap.set(telemetryRef.current, { opacity: 0, y: -15 });
      gsap.set('.monumental-line', { yPercent: 100, opacity: 0 });
      gsap.set(subtextRef.current, { opacity: 0, y: 20 });
      gsap.set(ctaRef.current, { opacity: 0, y: 15 });

      tl.to(telemetryRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 0.1,
      })
        .to(
          '.monumental-line',
          {
            yPercent: 0,
            opacity: 1,
            duration: 1.1,
            stagger: 0.1,
            ease: 'power4.out',
          },
          '-=0.4'
        )
        .to(
          subtextRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
          },
          '-=0.6'
        )
        .to(
          ctaRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
          },
          '-=0.5'
        );
    }, containerRef);

    return () => ctx.revert();
  }, [isLoaded]);

  const scrollToWork = () => {
    const el = document.getElementById('work');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative min-h-[100svh] w-full flex flex-col justify-between pt-20 sm:pt-32 pb-6 sm:pb-10 px-5 sm:px-8 md:px-12 lg:px-16 bg-[#08090C] border-b border-white/8 overflow-hidden"
    >
      {/* Structural Architectural Watermark K (Subtle 3D Background Geometry) */}
      <div className="absolute right-4 md:right-16 top-1/2 -translate-y-1/2 pointer-events-none select-none opacity-[0.035] w-[350px] sm:w-[500px] lg:w-[680px]">
        <GeometricK size={680} glow={false} variant="badge" />
      </div>

      {/* Top Architectural Telemetry Bar */}
      <div
        ref={telemetryRef}
        className="max-w-7xl mx-auto w-full relative z-10 border-b border-white/8 pb-3 sm:pb-4 mb-4 sm:mb-12"
      >
        <div className="flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-[#8A92A0]">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-[#0066FF]" />
            <span className="text-white font-medium">STUDIO STATUS: ACTIVE</span>
            <span className="text-[#8A92A0]">// ACCEPTING COMMISSIONS [2026]</span>
          </div>

          <div className="hidden sm:flex items-center gap-4 text-[11px] text-[#5A6270]">
            <span>18.5204° N, 73.8567° E</span>
            <span>•</span>
            <span>PUNE &amp; MUMBAI, IN</span>
            <span>•</span>
            <span>GMT +5:30</span>
          </div>
        </div>
      </div>

      {/* Centerpiece: Monumental Display Typography */}
      <div
        ref={headlineRef}
        className="max-w-7xl mx-auto w-full relative z-10 my-2 sm:my-auto py-2 sm:py-8"
      >
        <h1 className="text-[2.05rem] xs:text-[2.25rem] sm:text-6xl md:text-8xl lg:text-[7.25rem] font-extrabold text-[#F5F6F8] tracking-tighter leading-[0.94] max-w-6xl">
          <div className="overflow-hidden">
            <span className="monumental-line block">WE ARCHITECT</span>
          </div>
          <div className="overflow-hidden">
            <span className="monumental-line block text-white">HIGH-VELOCITY</span>
          </div>
          <div className="overflow-hidden flex items-baseline gap-4 flex-wrap">
            <span className="monumental-line block text-[#8A92A0]">DIGITAL SYSTEMS.</span>
          </div>
        </h1>
      </div>

      {/* Bottom Ledger: Asymmetric 12-Column Sub-Grid */}
      <div className="max-w-7xl mx-auto w-full relative z-10 pt-4 sm:pt-10 border-t border-white/8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 lg:gap-8 items-end">
          {/* Studio Manifesto Subtext */}
          <div ref={subtextRef} className="lg:col-span-7 space-y-3 sm:space-y-4">
            <p className="text-sm sm:text-lg md:text-xl text-[#F5F6F8] font-light leading-relaxed max-w-2xl">
              A creative technology studio engineering bespoke software, high-performance web experiences, and operational automation.
            </p>

            <div className="flex flex-wrap gap-2 text-[10px] sm:text-[11px] font-mono text-[#8A92A0]">
              <span className="text-white">01</span> SOFTWARE
              <span className="text-[#5A6270]">•</span>
              <span className="text-white">02</span> WEB DESIGN
              <span className="text-[#5A6270]">•</span>
              <span className="text-white">03</span> AUTOMATION
              <span className="text-[#5A6270]">•</span>
              <span className="text-white">04</span> AI SOLUTIONS
            </div>
          </div>

          {/* Action Ledger */}
          <div
            ref={ctaRef}
            className="lg:col-span-5 flex flex-col sm:flex-row items-stretch sm:items-center justify-start lg:justify-end gap-2.5 sm:gap-4"
          >
            <button
              type="button"
              onClick={scrollToWork}
              onMouseEnter={() => onCursorChange?.('button')}
              onMouseLeave={() => onCursorChange?.('default')}
              className="px-5 py-3 sm:px-6 sm:py-4 rounded-xl border border-white/15 hover:border-white bg-[#0E1015] hover:bg-[#181B22] text-white font-mono text-xs tracking-wider uppercase flex items-center justify-between gap-4 transition-colors duration-200"
            >
              <span>EXPLORE WORK</span>
              <ArrowDown size={14} className="text-[#0066FF]" />
            </button>

            <button
              type="button"
              onClick={scrollToContact}
              onMouseEnter={() => onCursorChange?.('button')}
              onMouseLeave={() => onCursorChange?.('default')}
              className="px-5 py-3 sm:px-6 sm:py-4 rounded-xl bg-[#0066FF] hover:bg-[#0055DD] text-white font-mono text-xs tracking-wider uppercase flex items-center justify-between gap-4 transition-colors duration-200 shadow-none"
            >
              <span>INITIATE COMMISSION</span>
              <ArrowUpRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
