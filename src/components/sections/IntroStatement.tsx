import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const IntroStatement: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Split words animation for the main headline
      const words = headlineRef.current?.querySelectorAll('.statement-word');
      if (words && words.length > 0) {
        gsap.fromTo(
          words,
          { opacity: 0.15, y: 10 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.08,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 75%',
              end: 'center 45%',
              scrub: 0.8,
            },
          }
        );
      }

      // Supporting text reveal
      if (paragraphRef.current) {
        gsap.fromTo(
          paragraphRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: paragraphRef.current,
              start: 'top 85%',
              once: true,
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const headline = 'WE TURN IDEAS INTO DIGITAL SYSTEMS.';
  const words = headline.split(' ');

  return (
    <section
      ref={containerRef}
      className="relative py-28 md:py-48 px-6 md:px-12 bg-[#05070B] border-b border-white/5 overflow-hidden"
    >
      {/* Subtle background gradient beam */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-48 bg-[#006EFF]/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-[#006EFF]" />
          <span className="font-mono text-xs tracking-widest text-[#006EFF] uppercase">
            // PHILOSOPHY &amp; ARCHITECTURE
          </span>
        </div>

        {/* Oversized Progressive Scroll Headline */}
        <h2
          ref={headlineRef}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-extrabold tracking-tight leading-[1.05] text-white max-w-6xl mb-16"
        >
          {words.map((word, idx) => (
            <span
              key={idx}
              className={`statement-word inline-block mr-4 md:mr-6 transition-colors duration-200 ${
                word === 'DIGITAL' || word === 'SYSTEMS.'
                  ? 'text-white'
                  : 'text-white'
              }`}
            >
              {word === 'DIGITAL' ? (
                <span className="text-[#006EFF] drop-shadow-[0_0_25px_rgba(0,110,255,0.4)]">
                  DIGITAL
                </span>
              ) : (
                word
              )}
            </span>
          ))}
        </h2>

        {/* Supporting Editorial Paragraph */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start pt-8 border-t border-white/10">
          <div className="md:col-span-4">
            <span className="font-mono text-xs text-[#A0A7B1] tracking-widest uppercase">
              BEYOND SURFACE TEMPLATES
            </span>
          </div>
          <div className="md:col-span-8">
            <p
              ref={paragraphRef}
              className="text-xl sm:text-2xl md:text-3xl text-[#A0A7B1] font-light leading-relaxed max-w-3xl"
            >
              From custom websites and bespoke web applications to intelligent automation and
              digital products, we build technology around{' '}
              <span className="text-white font-medium">real business needs</span> and operational
              workflows.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
