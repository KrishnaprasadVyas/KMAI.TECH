import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const IntroStatement: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
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

      if (textRef.current) {
        gsap.fromTo(
          textRef.current,
          { opacity: 0, y: 25 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: textRef.current,
              start: 'top 85%',
              once: true,
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const statementLines = [
    'WE TURN',
    'COMPLEX IDEAS',
    'INTO DIGITAL',
    'EXPERIENCES.',
  ];

  return (
    <section
      ref={containerRef}
      id="manifesto"
      className="relative w-full py-28 sm:py-36 md:py-44 px-6 sm:px-10 md:px-16 overflow-hidden"
    >
      <div className="w-full max-w-[1540px] mx-auto">
        {/* Colossal Manifesto Statement */}
        <h2
          ref={headlineRef}
          className="font-display font-bold uppercase tracking-[-0.04em] leading-[0.92] text-[42px] xs:text-[52px] sm:text-[68px] md:text-[88px] lg:text-[108px] text-white max-w-5xl"
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
            ref={textRef}
            className="font-body text-lg sm:text-xl md:text-2xl text-[#8E939E] font-light leading-relaxed"
          >
            We partner with founders and enterprise leaders to architect custom digital infrastructure, brand-defining web platforms, and automated workflows that drive measurable business outcomes.
          </p>
        </div>
      </div>
    </section>
  );
};
