import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const IntroStatement: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const progressLineRef = useRef<HTMLDivElement>(null);
  const tenetsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      const words = headlineRef.current?.querySelectorAll('.statement-word');

      if (!prefersReducedMotion && words && words.length > 0) {
        gsap.fromTo(
          words,
          { opacity: 0.2, y: 6 },
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

        if (progressLineRef.current) {
          gsap.fromTo(
            progressLineRef.current,
            { scaleY: 0 },
            {
              scaleY: 1,
              ease: 'none',
              scrollTrigger: {
                trigger: containerRef.current,
                start: 'top 70%',
                end: 'bottom 45%',
                scrub: 0.8,
              },
            }
          );
        }

        if (paragraphRef.current) {
          gsap.fromTo(
            paragraphRef.current,
            { opacity: 0, y: 20 },
            {
              opacity: 1,
              y: 0,
              duration: 0.9,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: paragraphRef.current,
                start: 'top 85%',
                once: true,
              },
            }
          );
        }

        if (tenetsRef.current) {
          gsap.fromTo(
            tenetsRef.current.children,
            { opacity: 0, y: 15 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              stagger: 0.12,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: tenetsRef.current,
                start: 'top 90%',
                once: true,
              },
            }
          );
        }
      } else if (prefersReducedMotion && words) {
        gsap.set(words, { opacity: 1, y: 0 });
        if (paragraphRef.current) gsap.set(paragraphRef.current, { opacity: 1, y: 0 });
        if (tenetsRef.current) gsap.set(tenetsRef.current.children, { opacity: 1, y: 0 });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const headlinePhrases = [
    { text: 'MOST', isMuted: false },
    { text: 'AGENCIES', isMuted: false },
    { text: 'DELIVER', isMuted: false },
    { text: 'TEMPLATES.', isMuted: true },
    { text: 'WE', isMuted: false },
    { text: 'ARCHITECT', isMuted: false },
    { text: 'DIGITAL', isMuted: false },
    { text: 'ENGINES', isMuted: false },
    { text: 'BUILT', isMuted: false },
    { text: 'FOR', isMuted: false },
    { text: 'MEASURABLE', isMuted: false },
    { text: 'REVENUE', isMuted: false },
    { text: '&', isMuted: false },
    { text: 'OPERATIONAL', isMuted: false },
    { text: 'SCALE.', isMuted: false },
  ];

  return (
    <section
      ref={containerRef}
      id="manifesto"
      className="relative scroll-mt-24 py-24 md:py-36 px-6 md:px-12 lg:px-16 bg-[#08090C] border-b border-white/8 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Left Column: Asymmetric Studio Sidebar & Vertical Progress Hairline */}
          <div className="lg:col-span-3 flex flex-col justify-between">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0066FF]" />
              <span className="font-mono text-xs tracking-widest text-[#0066FF] uppercase">
                // 02 MANIFESTO
              </span>
            </div>

            <div className="relative pl-5 border-l border-white/8 my-4 hidden lg:block">
              {/* Dynamic scroll progress indicator */}
              <div
                ref={progressLineRef}
                className="absolute top-0 left-[-1px] w-[2px] h-full bg-[#0066FF] origin-top scale-y-0"
              />
              <p className="font-mono text-xs text-[#8A92A0] leading-relaxed mb-4">
                THE KMAI CODEBASE &amp; SYSTEMS MANIFESTO
              </p>
              <span className="font-mono text-[10px] text-[#5A6270] block">
                VERSION 2.4 // 2026 RELEASE
              </span>
            </div>
          </div>

          {/* Right Column: Monumental Scrub Headline & Linear Tenets */}
          <div className="lg:col-span-9 space-y-12">
            {/* Oversized Progressive Scroll Headline */}
            <h2
              ref={headlineRef}
              className="text-3xl sm:text-5xl md:text-6xl lg:text-[4.5rem] font-extrabold tracking-tight leading-[1.08] text-white select-none"
            >
              {headlinePhrases.map((phrase, idx) => (
                <span
                  key={idx}
                  className={`statement-word inline-block mr-2.5 sm:mr-3.5 md:mr-4 transition-opacity duration-150 ${
                    phrase.isMuted
                      ? 'text-[#5A6270] line-through decoration-[#0066FF] decoration-2'
                      : 'text-[#F5F6F8]'
                  }`}
                >
                  {phrase.text}
                </span>
              ))}
            </h2>

            {/* Supporting Editorial Paragraph */}
            <div className="pt-8 border-t border-white/8">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start mb-12">
                <div className="md:col-span-3">
                  <span className="font-mono text-xs text-[#8A92A0] tracking-widest uppercase block">
                    BEYOND THE SURFACE
                  </span>
                </div>
                <div className="md:col-span-9">
                  <p
                    ref={paragraphRef}
                    className="text-base sm:text-lg md:text-xl text-[#8A92A0] font-light leading-relaxed"
                  >
                    From custom software architectures and high-velocity web platforms to autonomous agent workflows and operational automation, we engineer software around{' '}
                    <span className="text-white font-medium">real business models</span>.
                    No off-the-shelf shortcuts. No generic bloat. Only clean architecture engineered for lasting operational advantage.
                  </p>
                </div>
              </div>

              {/* 3 Core Architecture Tenets: Linear Borderless Columns (ZERO CARDS) */}
              <div
                ref={tenetsRef}
                className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-white/8"
              >
                <div className="space-y-2">
                  <div className="font-mono text-xs font-semibold tracking-wider uppercase text-white flex items-center gap-2">
                    <span className="text-[#0066FF]">01 //</span>
                    <span>ZERO BLOAT</span>
                  </div>
                  <p className="text-xs font-mono text-[#8A92A0] leading-relaxed">
                    Custom native codebases with minimal bundle footprint, zero template baggage, and strict 100 lighthouse compliance.
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="font-mono text-xs font-semibold tracking-wider uppercase text-white flex items-center gap-2">
                    <span className="text-[#0066FF]">02 //</span>
                    <span>SCALABLE ARCHITECTURE</span>
                  </div>
                  <p className="text-xs font-mono text-[#8A92A0] leading-relaxed">
                    Modular domain architectures and edge deployment topologies that scale seamlessly as transaction volumes surge.
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="font-mono text-xs font-semibold tracking-wider uppercase text-white flex items-center gap-2">
                    <span className="text-[#0066FF]">03 //</span>
                    <span>FULL IP OWNERSHIP</span>
                  </div>
                  <p className="text-xs font-mono text-[#8A92A0] leading-relaxed">
                    Zero lock-in. Complete Git repositories, container definitions, and intellectual property handed directly to your team.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
