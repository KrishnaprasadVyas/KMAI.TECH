import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ArrowDown } from 'lucide-react';
import { GeometricK } from '../common/GeometricK';

interface HeroProps {
  isLoaded: boolean;
  onCursorChange?: (variant: 'default' | 'button' | 'project' | 'image' | 'footer', text?: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ isLoaded, onCursorChange }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isLoaded) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      gsap.set('.hero-title-line', { yPercent: 110, opacity: 0 });
      gsap.set(subtextRef.current, { opacity: 0, y: 30 });
      gsap.set(triggerRef.current, { opacity: 0, y: 20 });

      tl.to('.hero-title-line', {
        yPercent: 0,
        opacity: 1,
        duration: 1.2,
        stagger: 0.12,
      })
        .to(
          subtextRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: 'power3.out',
          },
          '-=0.6'
        )
        .to(
          triggerRef.current,
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
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative min-h-[92vh] w-full flex flex-col justify-between pt-28 sm:pt-32 md:pt-36 lg:pt-40 pb-12 sm:pb-14 md:pb-16 px-6 sm:px-10 md:px-16 overflow-hidden"
    >
      {/* Top Monolithic Display Typography */}
      <div className="w-full max-w-[1540px] mx-auto">
        <div className="flex items-center gap-4 mb-8 sm:mb-12">
          <GeometricK size={36} theme="light" />
          <span className="font-display font-semibold text-lg sm:text-xl tracking-tight text-[#0A0C0F]">
            KMAI
          </span>
        </div>

        <h1
          ref={headlineRef}
          className="font-display font-extrabold uppercase text-[#0A0C0F] tracking-[-0.05em] leading-[0.9] select-none text-[40px] xs:text-[52px] sm:text-[80px] md:text-[110px] lg:text-[136px] xl:text-[152px]"
        >
          <div className="overflow-hidden">
            <span className="hero-title-line block">WE BUILD</span>
          </div>
          <div className="overflow-hidden">
            <span className="hero-title-line block">DIGITAL</span>
          </div>
          <div className="overflow-hidden">
            <span className="hero-title-line block text-[#73777F]/60">EXPERIENCES.</span>
          </div>
        </h1>
      </div>

      {/* Bottom Sub-Composition: Calm Narrative & Direct Action */}
      <div className="w-full max-w-[1540px] mx-auto mt-10 sm:mt-14 md:mt-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
          <div className="md:col-span-8 lg:col-span-7">
            <p
              ref={subtextRef}
              className="font-body text-lg sm:text-xl md:text-2xl text-[#595D65] font-normal leading-relaxed max-w-2xl"
            >
              An independent studio engineering high-performance software, bespoke web platforms, and operational systems for ambitious organizations.
            </p>
          </div>

          <div ref={triggerRef} className="md:col-span-4 lg:col-span-5 flex md:justify-end">
            <button
              type="button"
              onClick={scrollToWork}
              onMouseEnter={() => onCursorChange?.('button')}
              onMouseLeave={() => onCursorChange?.('default')}
              className="group inline-flex items-center gap-3 text-[#0A0C0F] hover:text-[#216BFF] font-body text-sm md:text-base font-medium transition-colors"
            >
              <span>Explore Selected Work</span>
              <div className="w-9 h-9 rounded-full border border-[#0A0C0F]/20 group-hover:border-[#216BFF] group-hover:bg-[#216BFF] group-hover:text-white flex items-center justify-center transition-all duration-200">
                <ArrowDown size={14} className="group-hover:translate-y-0.5 transition-transform" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
