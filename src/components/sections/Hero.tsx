import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDown } from 'lucide-react';
import type { CursorVariant } from '../common/CustomCursor';
import { KineticMarquee } from '../common/KineticMarquee';
import { scrollToTarget } from '../../utils/scroll';

gsap.registerPlugin(ScrollTrigger);

interface HeroProps {
  isLoaded?: boolean;
  onCursorChange?: (variant: CursorVariant, text?: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onCursorChange }) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const heroSectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
    let onMouseMove: ((e: MouseEvent) => void) | null = null;

    const ctx = gsap.context(() => {
      // Floating bounce on scroll trigger button
      if (triggerRef.current && !prefersReducedMotion) {
        gsap.to(triggerRef.current, {
          y: 6,
          duration: 1.2,
          repeat: -1,
          yoyo: true,
          ease: 'power1.inOut',
        });
      }

      // Mouse-parallax on headline (desktop only)
      if (!isTouchDevice && headlineRef.current && !prefersReducedMotion) {
        const xTo = gsap.quickTo(headlineRef.current, 'x', { duration: 0.8, ease: 'power3.out' });
        const yTo = gsap.quickTo(headlineRef.current, 'y', { duration: 0.8, ease: 'power3.out' });

        onMouseMove = (e: MouseEvent) => {
          const xMove = (e.clientX / window.innerWidth - 0.5) * -12;
          const yMove = (e.clientY / window.innerHeight - 0.5) * -6;
          xTo(xMove);
          yTo(yMove);
        };

        window.addEventListener('mousemove', onMouseMove, { passive: true });
      }
    }, trackRef.current || undefined);

    return () => {
      if (onMouseMove) {
        window.removeEventListener('mousemove', onMouseMove);
      }
      ctx.revert();
    };
  }, []);

  const scrollToWork = () => {
    scrollToTarget('#work');
  };

  return (
    <div ref={trackRef} className="relative w-full">
      <section
        ref={heroSectionRef}
        id="hero"
        data-theme="light"
        className="relative w-full min-h-[92vh] flex flex-col justify-between pt-20 sm:pt-24 md:pt-28 pb-0 overflow-hidden bg-[#F2F0EA]"
      >
        {/* Top Monolithic Display Typography */}
        <div className="relative z-10 w-full max-w-[1540px] mx-auto px-6 sm:px-10 md:px-16">
          <h1
            ref={headlineRef}
            className="font-display font-extrabold uppercase text-[#0A0C0F] tracking-[-0.05em] leading-[0.9] select-none text-[40px] xs:text-[52px] sm:text-[80px] md:text-[110px] lg:text-[136px] xl:text-[152px]"
          >
            {/* Line 1: WE BUILD */}
            <div className="overflow-hidden">
              <span className="block">WE BUILD</span>
            </div>

            {/* Line 2: DIGITAL */}
            <div className="overflow-hidden">
              <span className="block">DIGITAL</span>
            </div>

            {/* Line 3: EXPERIENCES. — very faint */}
            <div className="overflow-hidden">
              <span className="block text-[#0A0C0F]/25">EXPERIENCES.</span>
            </div>
          </h1>
        </div>

        {/* Bottom Sub-Composition: Calm Narrative & Direct Action */}
        <div className="relative z-10 w-full max-w-[1540px] mx-auto mt-10 sm:mt-14 md:mt-16 px-6 sm:px-10 md:px-16 pb-12 sm:pb-14 md:pb-16">
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

        {/* Dennis Snellenberg Signature Kinetic Marquee Ticker */}
        <KineticMarquee className="mt-4 sm:mt-6" />
      </section>
    </div>
  );
};
