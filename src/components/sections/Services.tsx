import React, { useState } from 'react';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { services } from '../../data/services';
import { SectionLabel } from '../common/SectionLabel';

interface ServicesProps {
  onCursorChange?: (variant: 'default' | 'button' | 'project' | 'image' | 'footer', text?: string) => void;
}

export const Services: React.FC<ServicesProps> = ({ onCursorChange }) => {
  const [activeService, setActiveService] = useState<number | null>(0);

  return (
    <section
      id="services"
      className="relative py-28 md:py-40 px-6 md:px-12 bg-[#05070B] border-b border-white/5"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-6 border-b border-white/10 pb-8">
          <div>
            <SectionLabel number="01" label="SERVICES" className="mb-4" />
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-tight">
              WHAT WE BUILD
            </h2>
          </div>
          <p className="max-w-md text-sm sm:text-base text-[#A0A7B1] font-light">
            Engineered systems designed to streamline operations, engage audiences, and build sustainable enterprise value.
          </p>
        </div>

        {/* Interactive Services List */}
        <div className="flex flex-col">
          {services.map((service, idx) => {
            const isActive = activeService === idx;

            return (
              <div
                key={service.number}
                className="group relative border-b border-white/10 transition-all duration-500"
                onMouseEnter={() => {
                  setActiveService(idx);
                  onCursorChange?.('button');
                }}
                onMouseLeave={() => {
                  onCursorChange?.('default');
                }}
              >
                {/* Expanding Blue Hover Line Accent */}
                <div
                  className={`absolute top-0 left-0 h-[2px] bg-gradient-to-r from-[#006EFF] to-[#38BDF8] transition-all duration-500 ${
                    isActive ? 'w-full shadow-[0_0_15px_#006EFF]' : 'w-0 group-hover:w-16'
                  }`}
                />

                <div className="py-8 md:py-12 flex flex-col transition-all duration-300">
                  <button
                    type="button"
                    aria-expanded={isActive}
                    aria-controls={`service-content-${idx}`}
                    onClick={() => setActiveService(isActive ? null : idx)}
                    className="w-full text-left flex flex-col focus:outline-none focus-visible:ring-2 focus-visible:ring-[#006EFF] focus-visible:ring-offset-8 focus-visible:ring-offset-[#05070B] rounded-lg"
                  >
                  {/* Primary Row Header */}
                  <div className="flex items-baseline justify-between gap-4">
                    <div className="flex items-baseline gap-6 md:gap-14">
                      {/* Number with shift */}
                      <span
                        className={`font-mono text-sm md:text-base tracking-widest transition-all duration-300 ${
                          isActive
                            ? 'text-[#006EFF] translate-x-2'
                            : 'text-[#A0A7B1] group-hover:text-white'
                        }`}
                      >
                        {service.number}
                      </span>

                      {/* Title */}
                      <h3
                        className={`text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight transition-all duration-300 ${
                          isActive
                            ? 'text-white translate-x-3'
                            : 'text-[#CBD5E1] group-hover:text-white group-hover:translate-x-2'
                        }`}
                      >
                        {service.title}
                      </h3>
                    </div>

                    {/* Arrow Indicator */}
                    <div
                      className={`w-10 h-10 rounded-full border border-white/10 flex items-center justify-center transition-all duration-300 ${
                        isActive
                          ? 'bg-[#006EFF] text-white rotate-45 border-[#006EFF]'
                          : 'bg-white/5 text-[#A0A7B1] group-hover:text-white group-hover:border-white/30'
                      }`}
                    >
                      <ArrowUpRight size={18} />
                    </div>
                  </div>

                  {/* Summary line visible even when closed */}
                  <p className="mt-3 ml-12 md:ml-20 text-sm md:text-base text-[#A0A7B1] font-light max-w-2xl">
                    {service.summary}
                  </p>
                  </button>

                  {/* Expanded Content Drawer */}
                  <div
                    id={`service-content-${idx}`}
                    className={`grid transition-all duration-500 ease-in-out overflow-hidden ${
                      isActive
                        ? 'grid-rows-[1fr] opacity-100 mt-8'
                        : 'grid-rows-[0fr] opacity-0 mt-0'
                    }`}
                  >
                    <div className="min-h-0 pl-12 md:pl-20">
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-6 border-t border-white/5 bg-[#08111F]/40 p-6 rounded-2xl">
                        {/* Description */}
                        <div className="md:col-span-6">
                          <span className="font-mono text-[11px] tracking-widest text-[#006EFF] uppercase block mb-3">
                            // OVERVIEW
                          </span>
                          <p className="text-[#F3F5F7] text-base leading-relaxed">
                            {service.description}
                          </p>

                          <div className="mt-6 flex flex-wrap gap-2">
                            {service.tools.map((tool) => (
                              <span
                                key={tool}
                                className="px-3 py-1 rounded-full bg-[#0B1F3A] border border-[#162B4C] text-xs font-mono text-[#38BDF8]"
                              >
                                {tool}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Deliverables */}
                        <div className="md:col-span-6">
                          <span className="font-mono text-[11px] tracking-widest text-[#A0A7B1] uppercase block mb-3">
                            // CORE DELIVERABLES
                          </span>
                          <ul className="space-y-2.5">
                            {service.deliverables.map((item) => (
                              <li
                                key={item}
                                className="flex items-start gap-2.5 text-sm text-[#CBD5E1]"
                              >
                                <CheckCircle2 size={16} className="text-[#006EFF] shrink-0 mt-0.5" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
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
