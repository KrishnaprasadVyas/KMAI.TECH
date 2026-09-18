import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ArrowDown } from 'lucide-react';

interface HeroProps {
  isLoaded: boolean;
  onCursorChange?: (variant: 'default' | 'button' | 'project' | 'image' | 'footer', text?: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ isLoaded, onCursorChange }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const thesisRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isLoaded) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      gsap.set('.hero-line-inner', { yPercent: 105, opacity: 0 });
      gsap.set(thesisRef.current, { opacity: 0, y: 24 });
      gsap.set(ctaRef.current, { opacity: 0, y: 16 });

      tl.to('.hero-line-inner', {
        yPercent: 0,
        opacity: 1,
        duration: 1.1,
        stagger: 0.12,
      })
        .to(
          thesisRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            ease: 'power3.out',
          },
          '-=0.5'
        )
        .to(
          ctaRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
            ease: 'power3.out',
          },
          '-=0.5'
        );
    }, containerRef);

    return () => ctx.revert();
  }, [isLoaded]);

  const scrollToWork = () => {
    const el = document.getElementById('work');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative min-h-[calc(100svh-84px)] w-full flex flex-col justify-between pt-24 sm:pt-28 md:pt-32 lg:pt-36 pb-8 sm:pb-10 md:pb-12 px-5 sm:px-8 md:px-12 bg-[#F2F0EA] text-[#0A0C0F] border-b border-[#D6D2C9] overflow-hidden"
    >
      {/* Top Editorial Headline Container */}
      <div className="w-full max-w-[1540px] mx-auto">
        <div className="mb-3 sm:mb-5">
          <span className="font-mono text-[11px] sm:text-[12px] uppercase tracking-[0.08em] text-[#73777F]">
            [ 00 / INDEPENDENT DIGITAL TECHNOLOGY STUDIO ]
          </span>
        </div>

        <h1
          ref={headlineRef}
          className="font-display font-extrabold uppercase text-[#0A0C0F] leading-[0.88] tracking-[-0.05em] select-none text-[50px] xs:text-[58px] sm:text-[72px] md:text-[88px] lg:text-[108px] xl:text-[124px]"
        >
          <div className="overflow-hidden">
            <span className="hero-line-inner block">SOFTWARE</span>
          </div>
          <div className="overflow-hidden">
            <span className="hero-line-inner block">WITH A</span>
          </div>
          <div className="overflow-hidden">
            <span className="hero-line-inner block font-serif italic font-normal lowercase tracking-[-0.025em] text-[#0A0C0F]">
              point of view.
            </span>
          </div>
        </h1>
      </div>

      {/* Asymmetric 12-Column Subgrid: Editorial Thesis & Navigation Action */}
      <div className="w-full max-w-[1540px] mx-auto pt-8 sm:pt-10 md:pt-12 border-t border-[#D6D2C9] mt-8 sm:mt-12 md:mt-14">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-end">
          {/* Left Metadata / Index */}
          <div className="md:col-span-3 lg:col-span-3">
            <span className="font-mono text-[11px] text-[#73777F] tracking-[0.08em] uppercase block mb-1">
              EST. 2026 // MUMBAI &amp; PUNE
            </span>
            <span className="font-body text-[13px] text-[#0A0C0F] font-medium block">
              Architecting bespoke software &amp; web experiences
            </span>
          </div>

          {/* Center Thesis Statement */}
          <div className="md:col-span-6 lg:col-span-6">
            <p
              ref={thesisRef}
              className="font-body text-[19px] sm:text-[21px] md:text-[22px] leading-[1.30] text-[#0A0C0F] font-normal"
            >
              An independent technology studio engineering custom software, bespoke web experiences, and operational automation for ambitious organizations.
            </p>
          </div>

          {/* Right Direct Action */}
          <div ref={ctaRef} className="md:col-span-3 lg:col-span-3 flex md:justify-end">
            <button
              type="button"
              onClick={scrollToWork}
              onMouseEnter={() => onCursorChange?.('button')}
              onMouseLeave={() => onCursorChange?.('default')}
              className="group inline-flex items-center gap-2 px-5 py-3 rounded-[2px] bg-[#0A0C0F] hover:bg-[#216BFF] text-white font-body text-[13px] font-medium tracking-wide transition-colors duration-200"
            >
              <span>EXPLORE SELECTED WORK</span>
              <ArrowDown size={14} className="group-hover:translate-y-0.5 transition-transform duration-150" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
