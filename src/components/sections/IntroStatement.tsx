import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const IntroStatement: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const narrativeRef = useRef<HTMLParagraphElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  const narrativeText =
    'We partner with founders and enterprise leaders to architect custom digital infrastructure, brand-defining web platforms, and automated workflows that drive measurable business outcomes.';

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // ── Manifesto headline: word-level scrub reveal ─────────────────────────
      const words = headlineRef.current?.querySelectorAll('.manifesto-word');
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
              start: 'top 80%',
              end: 'center 45%',
              scrub: 0.6,
            },
          }
        );
      }

      // ── Supporting narrative: word-level opacity + y reveal ─────────────────
      const wordSpans = narrativeRef.current?.querySelectorAll('.narrative-word');
      if (wordSpans && wordSpans.length > 0) {
        gsap.fromTo(
          wordSpans,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.05,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: narrativeRef.current,
              start: 'top 85%',
              once: true,
            },
          }
        );
      }

      // ── Horizontal line: width 0 → 100% ─────────────────────────────────────
      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { width: '0%' },
          {
            width: '100%',
            duration: 1.2,
            ease: 'power3.inOut',
            scrollTrigger: {
              trigger: lineRef.current,
              start: 'top 70%',
              once: true,
            },
          }
        );
      }
    }, containerRef.current || undefined);

    return () => ctx.revert();
  }, []);

  const statementLines = [
    'WE TURN',
    'COMPLEX IDEAS',
    'INTO DIGITAL',
    'EXPERIENCES.',
  ];

  // Split narrative text into word spans for scroll-triggered reveal
  const narrativeWords = narrativeText.split(' ');

  return (
    <section
      ref={containerRef}
      id="manifesto"
      data-theme="dark"
      className="relative w-full bg-[#07090E] text-[#F5F5F7] py-28 sm:py-36 md:py-44 px-6 sm:px-10 md:px-16 overflow-hidden"
    >
      <div className="w-full max-w-[1540px] mx-auto">
        {/* Colossal Manifesto Statement */}
        <h2
          ref={headlineRef}
          className="font-display font-bold uppercase tracking-[-0.04em] leading-[0.92] text-[42px] xs:text-[52px] sm:text-[68px] md:text-[96px] lg:text-[120px] text-white max-w-5xl"
        >
          {statementLines.map((line, lineIdx) => (
            <div key={lineIdx} className="block">
              {line.split(' ').map((word, wordIdx) => (
                <span
                  key={wordIdx}
                  className="manifesto-word inline-block mr-[0.25em] transition-opacity will-change-[opacity,transform]"
                >
                  {word}
                </span>
              ))}
            </div>
          ))}
        </h2>

        {/* Supporting Narrative */}
        <div className="mt-12 sm:mt-16 md:mt-20 max-w-2xl">
          <p
            ref={narrativeRef}
            className="font-body text-lg sm:text-xl md:text-2xl text-[#8E939E] font-light leading-relaxed"
          >
            {narrativeWords.map((word, idx) => (
              <span
                key={idx}
                className="narrative-word inline-block mr-[0.28em] will-change-[opacity,transform]"
              >
                {word}
              </span>
            ))}
          </p>

          {/* Animated horizontal rule */}
          <div
            ref={lineRef}
            className="mt-10 h-px bg-white/20"
            style={{ width: '0%' }}
          />
        </div>
      </div>
    </section>
  );
};
