import React, { useState } from 'react';
import { services } from '../../data/services';

interface ServicesProps {
  onCursorChange?: (variant: 'default' | 'button' | 'project' | 'image' | 'footer', text?: string) => void;
}

export const Services: React.FC<ServicesProps> = ({ onCursorChange }) => {
  const [activeService, setActiveService] = useState<number | null>(0);

  return (
    <section id="services" className="relative scroll-mt-24 w-full py-28 sm:py-36 md:py-48 px-6 sm:px-10 md:px-16">
      <div className="w-full max-w-[1540px] mx-auto">
        {/* Section Header */}
        <div className="mb-20 sm:mb-28">
          <h2 className="font-display font-extrabold uppercase text-[#0A0C0F] tracking-[-0.04em] leading-[0.92] text-[48px] xs:text-[60px] sm:text-[76px] md:text-[96px] lg:text-[112px]">
            CAPABILITIES
          </h2>
          <p className="mt-6 font-body text-lg sm:text-xl text-[#595D65] max-w-xl font-normal">
            Four disciplines engineered to architect high-performance digital platforms and operational systems.
          </p>
        </div>

        {/* Editorial Services List (No Cards, Pure Typography & Fluid Interaction) */}
        <div className="divide-y divide-black/[0.08]">
          {services.map((service, index) => {
            const isActive = activeService === index;

            return (
              <div
                key={service.number}
                className="py-12 sm:py-16 md:py-20 group cursor-pointer transition-colors"
                onMouseEnter={() => {
                  setActiveService(index);
                  onCursorChange?.('button');
                }}
                onMouseLeave={() => onCursorChange?.('default')}
                onClick={() => setActiveService(isActive ? null : index)}
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  {/* Service Index & Title */}
                  <div className="lg:col-span-7">
                    <div className="flex items-baseline gap-6 sm:gap-10">
                      <span className="font-display text-sm sm:text-base text-[#73777F] font-medium">
                        0{index + 1}
                      </span>
                      <h3 className="font-display text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-[#0A0C0F] group-hover:text-[#216BFF] transition-colors">
                        {service.title}
                      </h3>
                    </div>
                  </div>

                  {/* Summary & Deliverables Reveal */}
                  <div className="lg:col-span-5 space-y-6">
                    <p className="font-body text-base sm:text-lg text-[#595D65] leading-relaxed">
                      {service.description}
                    </p>

                    {/* Deliverables List */}
                    <div className="space-y-3 pt-4">
                      {service.deliverables.map((deliverable, dIdx) => (
                        <div
                          key={dIdx}
                          className="flex items-center gap-3 text-sm text-[#0A0C0F]/85 font-body"
                        >
                          <span className="w-1 h-1 rounded-full bg-[#216BFF]" />
                          <span>{deliverable}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
