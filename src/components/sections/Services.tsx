import React from 'react';
import { services } from '../../data/services';
import type { CursorVariant } from '../common/CustomCursor';

interface ServicesProps {
  onCursorChange?: (variant: CursorVariant, text?: string) => void;
}

export const Services: React.FC<ServicesProps> = ({ onCursorChange }) => {
  return (
    <section
      id="services"
      data-theme="light"
      className="relative scroll-mt-24 w-full py-28 sm:py-36 md:py-48 px-6 sm:px-10 md:px-16 bg-[#F2F0EA]"
    >
      <div className="w-full max-w-[1540px] mx-auto">
        {/* Section Header: Monumental Typography */}
        <div className="mb-20 sm:mb-28">
          <h2 className="font-display font-extrabold uppercase text-[#0A0C0F] tracking-[-0.04em] leading-[0.92] text-[48px] xs:text-[60px] sm:text-[76px] md:text-[96px] lg:text-[112px]">
            CAPABILITIES
          </h2>
          <p className="mt-6 font-body text-lg sm:text-xl text-[#595D65] max-w-xl font-normal">
            Four disciplines engineered to architect high-performance digital platforms and operational systems.
          </p>
        </div>

        {/* Editorial Disciplines List: Pure Typography, Zero Boxes, Zero Slop */}
        <div className="divide-y divide-black/10 border-t border-b border-black/10">
          {services.map((service) => (
            <div
              key={service.number}
              className="py-16 sm:py-20 lg:py-24 group transition-colors"
              onMouseEnter={() => onCursorChange?.('button')}
              onMouseLeave={() => onCursorChange?.('default')}
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
                {/* Left Column: Title & Summary */}
                <div className="lg:col-span-5 space-y-4">
                  <h3 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#0A0C0F] group-hover:text-[#216BFF] transition-colors leading-[1.05]">
                    {service.title}
                  </h3>
                  <p className="font-body text-base text-[#595D65] leading-relaxed pt-2 max-w-md">
                    {service.summary}
                  </p>
                </div>

                {/* Right Column: Deep Architectural Scope & Deliverables */}
                <div className="lg:col-span-7 space-y-8">
                  <p className="font-body text-base sm:text-lg text-[#0A0C0F] leading-relaxed font-normal">
                    {service.description}
                  </p>

                  <div className="space-y-4 pt-4 border-t border-black/[0.08]">
                    <span className="font-body text-xs text-[#73777F] uppercase tracking-wider block font-medium">
                      Core Deliverables
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {service.deliverables.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-2.5 text-sm sm:text-[15px] text-[#0A0C0F] font-body"
                        >
                          <span className="text-[#73777F] text-xs mt-0.5 select-none shrink-0 font-body">
                            —
                          </span>
                          <span className="leading-snug">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2">
                    <span className="font-body text-xs text-[#73777F] uppercase tracking-wider block mb-3 font-medium">
                      Production Stack
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {service.tools.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 bg-black/[0.04] text-[#0A0C0F] font-body text-xs font-medium rounded-[2px]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
