import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SectionLabel } from '../common/SectionLabel';

gsap.registerPlugin(ScrollTrigger);

export const Results: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const items = containerRef.current?.querySelectorAll('.impact-item');
    if (items && items.length > 0) {
      gsap.fromTo(
        items,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 75%',
            once: true,
          },
        }
      );
    }
  }, []);

  const impacts = [
    {
      label: 'DIGITAL PLATFORMS',
      description: 'Websites, portals, and content systems delivered.',
    },
    {
      label: 'BUSINESS WORKFLOWS',
      description: 'Custom operational flows and automation.',
    },
    {
      label: 'FULL-STACK DELIVERY',
      description: 'Frontend, backend, database, and integration work.',
    },
    {
      label: 'PRODUCT EXPERIENCES',
      description: 'Responsive web and mobile experiences.',
    },
  ];

  return (
    <section
      ref={containerRef}
      id="impact"
      className="relative py-28 md:py-40 px-6 md:px-12 bg-[#05070B] border-b border-white/5"
    >
      <div className="max-w-7xl mx-auto">
        <SectionLabel number="03" label="IMPACT" className="mb-16" />

        <div className="border-t border-white/10 pt-16">
          {impacts.map((impact, idx) => (
            <div
              key={idx}
              className="impact-item group flex flex-col md:flex-row md:items-baseline justify-between gap-4 py-10 md:py-14 border-b border-white/5 last:border-b-0 cursor-default"
            >
              <h3 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-[#CBD5E1] group-hover:text-white group-hover:translate-x-2 transition-all duration-300 tracking-tight">
                {impact.label}
              </h3>
              <p className="text-base sm:text-lg text-[#A0A7B1] font-light max-w-md md:text-right">
                {impact.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
