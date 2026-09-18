import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const offsetTextRef = useRef<HTMLDivElement>(null);
  const specBlockRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      if (headlineRef.current) {
        headlineRef.current.style.clipPath = 'polygon(0 0, 100% 0, 100% 100%, 0 100%)';
        headlineRef.current.style.opacity = '1';
      }
      if (offsetTextRef.current) offsetTextRef.current.style.opacity = '1';
      if (specBlockRef.current) specBlockRef.current.style.opacity = '1';
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.inOut' } });

      // 1. Plotter drafting lines draw in first
      const lines = containerRef.current?.querySelectorAll<SVGPathElement>('.plotter-line');
      if (lines && lines.length > 0) {
        lines.forEach((line) => {
          const length = line.getTotalLength ? line.getTotalLength() : 1000;
          gsap.set(line, {
            strokeDasharray: length,
            strokeDashoffset: length,
            opacity: 1,
          });
        });

        tl.to('.plotter-line', {
          strokeDashoffset: 0,
          duration: 0.9,
          stagger: 0.08,
          ease: 'power2.inOut',
        });
      }

      // 2. Headline snaps into place via clip-path
      tl.fromTo(
        headlineRef.current,
        {
          clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)',
          y: 20,
          opacity: 0,
        },
        {
          clipPath: 'polygon(0 0%, 100% 0%, 100% 100%, 0 100%)',
          y: 0,
          opacity: 1,
          duration: 0.65,
          ease: 'power4.out',
        },
        '-=0.25'
      );

      // 3. Offset paragraph and spec metadata reveal
      tl.fromTo(
        [offsetTextRef.current, specBlockRef.current],
        { opacity: 0, y: 14 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: 'power2.out',
        },
        '-=0.3'
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative min-h-[92vh] w-full pt-28 sm:pt-36 pb-16 px-6 sm:px-10 md:px-16 flex flex-col justify-between overflow-hidden border-b border-[#15130F]/15 bg-drafting-grid"
    >
      {/* SVG Plotter Drafting Guide Lines */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Horizontal datum line across sheet */}
        <path
          d="M 0 110 L 2400 110"
          className="plotter-line"
          stroke="rgba(21, 19, 15, 0.2)"
          strokeWidth="1"
          fill="none"
        />
        {/* Mid-sheet division guide */}
        <path
          d="M 0 460 L 2400 460"
          className="plotter-line"
          stroke="rgba(21, 19, 15, 0.12)"
          strokeWidth="1"
          strokeDasharray="4 4"
          fill="none"
        />
        {/* Vertical column-9 guide line */}
        <path
          d="M 1040 0 L 1040 1800"
          className="plotter-line hidden lg:block"
          stroke="rgba(255, 59, 31, 0.25)"
          strokeWidth="1"
          fill="none"
        />
      </svg>

      {/* Top Technical Spec Sheet Register */}
      <div className="relative z-10 w-full max-w-[1540px] mx-auto flex flex-wrap items-center justify-between gap-4 font-mono text-[11px] text-[#636059] uppercase tracking-wider pb-6 border-b border-[#15130F]/10">
        <div className="flex items-center gap-4">
          <span className="text-[#FF3B1F] font-bold">+ REG. 01/KM</span>
          <span>SCALE: 1:1 PRODUCTION</span>
          <span className="hidden sm:inline">FORMAT: SPEC-SHEET</span>
        </div>
        <div className="flex items-center gap-6">
          <span className="hidden md:inline">SYSTEM: HIGH-CONCURRENCY</span>
          <span>REVISION: 2026.04</span>
          <span className="text-[#15130F] font-bold">[APPROVED]</span>
        </div>
      </div>

      {/* Asymmetric 12-Column Display Grid */}
      <div className="relative z-10 w-full max-w-[1540px] mx-auto my-auto py-12 md:py-16">
        {/* Full-width Fraunces Monumental Headline */}
        <div className="w-full">
          <h1
            ref={headlineRef}
            className="font-serif text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-[88px] xl:text-[100px] text-[#15130F] font-normal leading-[0.98] tracking-tight max-w-6xl"
          >
            We engineer software with{' '}
            <span className="italic font-normal text-[#15130F] underline decoration-[#FF3B1F] decoration-1 underline-offset-8">
              structural rigor
            </span>{' '}
            and zero decorative fat.
          </h1>
        </div>

        {/* Asymmetric 12-Column Division with Offset Paragraph at Columns 9-12 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mt-12 md:mt-16 items-start">
          {/* Columns 1-8: Technical Spec Block & Drawing Notes */}
          <div
            ref={specBlockRef}
            className="lg:col-span-8 flex flex-col justify-between border-t lg:border-t-0 pt-6 lg:pt-0"
          >
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 font-mono text-xs">
              <div className="border-l-2 border-[#15130F] pl-3">
                <span className="text-[#636059] block text-[10px] uppercase">
                  DISCIPLINE
                </span>
                <span className="text-[#15130F] font-medium">
                  Digital Architecture
                </span>
              </div>
              <div className="border-l-2 border-[#15130F] pl-3">
                <span className="text-[#636059] block text-[10px] uppercase">
                  DELIVERY CADENCE
                </span>
                <span className="text-[#15130F] font-medium">
                  Two-Week Working Builds
                </span>
              </div>
              <div className="border-l-2 border-[#FF3B1F] pl-3">
                <span className="text-[#FF3B1F] block text-[10px] uppercase">
                  REDLINE DIRECTIVE
                </span>
                <span className="text-[#15130F] font-medium">
                  Zero Agency Fluff
                </span>
              </div>
            </div>

            {/* Dimension guide markings */}
            <div className="mt-8 pt-4 border-t border-[#15130F]/10 flex items-center justify-between font-mono text-[10px] text-[#636059]">
              <span>|&larr; 1540PX CONTAINER DATUM &rarr;|</span>
              <span>GRID: ASYMMETRIC 12-COL</span>
            </div>
          </div>

          {/* Columns 9-12: Offset Intro Paragraph at Distinct Baseline */}
          <div
            ref={offsetTextRef}
            className="lg:col-span-4 lg:border-l lg:border-[#15130F]/15 lg:pl-8 flex flex-col justify-between"
          >
            <p className="font-sans text-base sm:text-lg text-[#15130F] font-normal leading-relaxed">
              We don't run a discovery phase. We show up with a working build by
              week two, then argue about the details.
            </p>

            <div className="mt-6 pt-4 border-t border-[#FF3B1F]/30 font-mono text-xs space-y-1.5">
              <div className="text-[#15130F] font-medium">
                // FULL-STACK // AUTOMATION // APPLIED AI
              </div>
              <div className="text-[#FF3B1F] flex items-center gap-1.5 text-[11px]">
                <span className="inline-block w-1.5 h-1.5 bg-[#FF3B1F]" />
                <span>SCROLL DOWN TO INSPECT DRAWING REEL</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sheet Footer Cut Marks */}
      <div className="relative z-10 w-full max-w-[1540px] mx-auto flex justify-between items-center pt-4 border-t border-[#15130F]/10 font-mono text-[10px] text-[#636059]">
        <span>&lfloor; CORNER CROP 01</span>
        <span>KMAI // AUTONOMOUS TECHNOLOGY SPECIFICATION</span>
        <span>CORNER CROP 02 &rfloor;</span>
      </div>
    </section>
  );
};
