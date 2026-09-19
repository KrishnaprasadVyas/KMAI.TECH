import React from 'react';
import type { CursorVariant } from '../common/CustomCursor';

interface ProcessProps {
  onCursorChange?: (variant: CursorVariant, text?: string) => void;
}

export const Process: React.FC<ProcessProps> = ({ onCursorChange }) => {
  const steps = [
    {
      phase: 'DISCOVER',
      tagline: 'Technical audit and operational benchmark',
      description:
        'We analyze your day-to-day operations, data schemas, user workflows, and existing bottlenecks before writing a single line of production code.',
    },
    {
      phase: 'ARCHITECT',
      tagline: 'Information hierarchy and system blueprint',
      description:
        'We design the component hierarchy, interaction models, API contracts, and database architectures tailored strictly to business outcomes.',
    },
    {
      phase: 'ENGINEER',
      tagline: 'Full-stack development and automation',
      description:
        'We build high-concurrency production platforms using modern runtimes, automated payment flows, webhook pipelines, and resilient edge backends.',
    },
    {
      phase: 'SCALE',
      tagline: 'Validation and zero-downtime release',
      description:
        'We stress-test across devices, conduct automated end-to-end testing, deploy to global edge networks, and hand over complete IP and source code.',
    },
  ];

  return (
    <section id="process" data-theme="light" className="relative scroll-mt-0 w-full pt-16 sm:pt-20 md:pt-24 pb-28 sm:pb-36 md:pb-48 px-6 sm:px-10 md:px-16">
      <div className="w-full max-w-[1540px] mx-auto">
        {/* Section Header */}
        <div className="mb-20 sm:mb-28">
          <h2 className="font-display font-extrabold uppercase text-[#0A0C0F] tracking-[-0.04em] leading-[0.92] text-[48px] xs:text-[60px] sm:text-[76px] md:text-[96px] lg:text-[112px]">
            PROCESS
          </h2>
          <p className="mt-6 font-body text-lg sm:text-xl text-[#595D65] max-w-xl font-normal">
            A disciplined, four-stage engineering sequence from diagnosis to global edge deployment.
          </p>
        </div>

        {/* Continuous Process Flow (Editorial Typography, Zero Cards) */}
        <div className="space-y-24 sm:space-y-32 md:space-y-40">
          {steps.map((step) => (
            <div
              key={step.phase}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-baseline group"
              onMouseEnter={() => onCursorChange?.('button')}
              onMouseLeave={() => onCursorChange?.('default')}
            >
              {/* Massive Phase Typography */}
              <div className="lg:col-span-6">
                <h3 className="font-display text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#0A0C0F] group-hover:text-[#216BFF] transition-colors duration-300">
                  {step.phase}
                </h3>
              </div>

              {/* Phase Narrative */}
              <div className="lg:col-span-6 space-y-4">
                <p className="font-body text-lg sm:text-xl text-[#0A0C0F] font-medium">
                  {step.tagline}
                </p>
                <p className="font-body text-base sm:text-lg text-[#595D65] font-normal leading-relaxed max-w-xl">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
