import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const Process: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      number: '01',
      title: 'DISCOVER',
      tagline: 'Problem Definition & Systems Discovery',
      description:
        'We dig into your operations, user behaviors, stakeholder requirements, and technical constraints. We define measurable success metrics before writing a single line of code.',
    },
    {
      number: '02',
      title: 'DESIGN',
      tagline: 'Experience Architecture & Art Direction',
      description:
        'We construct the information architecture, user journeys, typographic system, motion choreography, and high-fidelity prototypes tailored to your brand identity.',
    },
    {
      number: '03',
      title: 'BUILD',
      tagline: 'Full-Stack Development & Automation',
      description:
        'We engineer the production codebase utilizing React, TypeScript, robust backends, and edge APIs. We integrate payment workflows, databases, and third-party services.',
    },
    {
      number: '04',
      title: 'REFINE',
      tagline: 'Rigorous Verification & Optimization',
      description:
        'Performance audits, security reviews, cross-device responsiveness, accessibility compliance, and 60fps motion fine-tuning ensure a flawless end-user experience.',
    },
    {
      number: '05',
      title: 'LAUNCH',
      tagline: 'Production Deployment & Continuous Growth',
      description:
        'Zero-downtime deployment to global CDNs, telemetry instrumentation, team handover, and ongoing iteration to scale alongside your organization.',
    },
  ];

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const cards = containerRef.current?.querySelectorAll('.process-step');
    if (!cards) return;

    cards.forEach((card, index) => {
      ScrollTrigger.create({
        trigger: card,
        start: 'top 65%',
        end: 'bottom 40%',
        onEnter: () => setActiveStep(index),
        onEnterBack: () => setActiveStep(index),
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger && (st.trigger as HTMLElement).classList?.contains('process-step')) {
          st.kill();
        }
      });
    };
  }, []);

  return (
    <section
      ref={containerRef}
      id="process"
      className="relative py-28 md:py-40 px-6 md:px-12 bg-[#05070B] border-b border-white/5"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-6 border-b border-white/10 pb-8">
          <div>
            <span className="font-mono text-xs tracking-widest text-[#006EFF] uppercase block mb-3">
              // METHODOLOGY
            </span>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-tight">
              HOW WE BUILD
            </h2>
          </div>
          <p className="max-w-md text-sm sm:text-base text-[#A0A7B1] font-light">
            A disciplined, transparent delivery framework engineered to take projects from abstract concept to production-grade deployment.
          </p>
        </div>

        {/* Steps Stack */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left: Sticky Active Indicator */}
          <div className="hidden lg:block lg:col-span-4 sticky top-36">
            <div className="p-8 rounded-2xl bg-[#08111F] border border-white/10">
              <span className="font-mono text-xs text-[#006EFF] tracking-widest uppercase block mb-4">
                ACTIVE PHASE // {steps[activeStep].number}
              </span>
              <h3 className="text-3xl font-extrabold text-white mb-2">
                {steps[activeStep].title}
              </h3>
              <p className="text-sm font-mono text-[#38BDF8] mb-6">
                {steps[activeStep].tagline}
              </p>

              {/* Progress bars indicator */}
              <div className="space-y-2">
                {steps.map((s, idx) => (
                  <div key={s.number} className="flex items-center gap-3">
                    <span
                      className={`font-mono text-xs ${
                        activeStep === idx ? 'text-[#006EFF] font-bold' : 'text-[#758BAA]'
                      }`}
                    >
                      {s.number}
                    </span>
                    <div className="flex-1 h-1 rounded-full bg-white/10 overflow-hidden">
                      <div
                        className={`h-full transition-all duration-500 ${
                          activeStep === idx
                            ? 'w-full bg-[#006EFF] shadow-[0_0_10px_#006EFF]'
                            : activeStep > idx
                            ? 'w-full bg-white/40'
                            : 'w-0'
                        }`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Scrollable Step Cards */}
          <div className="lg:col-span-8 space-y-8">
            {steps.map((step, idx) => {
              const isCurrent = activeStep === idx;

              return (
                <div
                  key={step.number}
                  className={`process-step p-8 md:p-12 rounded-2xl transition-all duration-500 border ${
                    isCurrent
                      ? 'bg-[#08111F] border-[#006EFF]/50 shadow-[0_10px_40px_rgba(0,110,255,0.15)]'
                      : 'bg-[#05070B] border-white/10 opacity-70 hover:opacity-90'
                  }`}
                >
                  <div className="flex items-baseline justify-between gap-4 mb-4">
                    <span
                      className={`font-mono text-xl sm:text-2xl font-bold transition-colors ${
                        isCurrent ? 'text-[#006EFF]' : 'text-[#A0A7B1]'
                      }`}
                    >
                      {step.number}
                    </span>
                    <span className="font-mono text-xs text-[#A0A7B1] tracking-widest uppercase">
                      PHASE // {step.number}
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-2">
                    {step.title}
                  </h3>

                  <p className="text-sm font-mono text-[#38BDF8] mb-4">
                    {step.tagline}
                  </p>

                  <p className="text-base sm:text-lg text-[#CBD5E1] font-light leading-relaxed">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
