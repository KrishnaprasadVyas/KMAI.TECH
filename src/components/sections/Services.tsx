import React from 'react';

interface Capability {
  title: string;
  italicWord?: string;
  scope: string;
  specCode: string;
  colSpan: string;
  colStart?: string;
  deliverables: string[];
  techTags: string[];
}

export const Services: React.FC = () => {
  const capabilities: Capability[] = [
    {
      title: 'Product & Web',
      italicWord: 'Architecture',
      scope:
        'Bespoke digital platforms built for sub-second edge performance, zero runtime bloat, and strict accessibility standards. We eliminate off-the-shelf templates and engineer every interaction from first principles.',
      specCode: 'DISCIPLINE // 01-PROD',
      colSpan: 'lg:col-span-8',
      deliverables: [
        'High-concurrency web platforms with zero-drift state machines',
        'Custom design engineering systems with mathematical spacing tokens',
        'Sub-second edge CDN architectures via Cloudflare & Vercel',
        'Lighthouse 100/100 performance budgets enforced via CI/CD',
      ],
      techTags: ['React 19', 'TypeScript', 'Tailwind', 'Next.js', 'Vite'],
    },
    {
      title: 'Operational Automation &',
      italicWord: 'Middleware',
      scope:
        'Eliminating manual data transfer, human transcription errors, and disconnected SaaS silos. We engineer event-driven pipelines that connect payment gateways, ERPs, CRM databases, and messaging channels.',
      specCode: 'DISCIPLINE // 02-AUTO',
      colSpan: 'lg:col-span-9',
      colStart: 'lg:col-start-4',
      deliverables: [
        'Automated 80G tax exemption & donor receipt invoicing engines',
        'Real-time webhook reconciliation with idempotent retry buffers',
        'Multi-channel transaction synchronization across banking APIs',
        'Custom internal back-office operational command dashboards',
      ],
      techTags: ['Node.js', 'PostgreSQL', 'Supabase', 'Redis', 'Webhooks'],
    },
    {
      title: 'Applied AI & Machine',
      italicWord: 'Intelligence',
      scope:
        'Pragmatic machine intelligence integrated directly into core business operations. No generic chat wrappers. We architect deterministic document classification, semantic retrieval systems, and autonomous verification engines.',
      specCode: 'DISCIPLINE // 03-INTELLIGENCE',
      colSpan: 'lg:col-span-8',
      colStart: 'lg:col-start-1',
      deliverables: [
        'Deterministic unstructured document parsing & metadata extraction',
        'High-recall semantic vector search & retrieval-augmented engines',
        'Autonomous validation workflows with human-in-the-loop review gates',
        'Custom local and on-premise model deployment protocols',
      ],
      techTags: ['Python', 'Vector DBs', 'FastAPI', 'PyTorch', 'Model Evals'],
    },
  ];

  return (
    <section
      id="capabilities"
      className="relative scroll-mt-20 w-full py-24 sm:py-32 px-6 sm:px-10 md:px-16 border-b border-[#15130F]/15 bg-drafting-grid"
    >
      <div className="w-full max-w-[1540px] mx-auto">
        {/* Section Spec Header */}
        <div className="flex flex-wrap items-end justify-between gap-4 pb-8 mb-16 border-b border-[#15130F]/15 font-mono text-xs text-[#636059]">
          <div>
            <div className="text-[#FF3B1F] uppercase tracking-widest text-[11px] mb-1">
              + SPECIFICATION REGISTER
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#15130F] font-normal tracking-tight">
              Engineering Disciplines
            </h2>
          </div>
          <div className="text-right text-[11px]">
            <div>DEPLOYMENT ARCHITECTURE</div>
            <div className="text-[#15130F] font-semibold">
              UNEVEN-WIDTH DRAFTING ROWS
            </div>
          </div>
        </div>

        {/* Asymmetric Uneven-Width Rows Grid */}
        <div className="space-y-16 lg:space-y-20">
          {capabilities.map((cap, idx) => (
            <div
              key={idx}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
            >
              <div
                className={`${cap.colSpan} ${cap.colStart || ''} border border-[#15130F] bg-[#F3EFE7] p-6 sm:p-8 md:p-10 relative`}
              >
                {/* Corner Registration Crosshairs */}
                <span className="absolute top-1.5 left-2 font-mono text-[9px] text-[#15130F]/40 select-none">
                  +
                </span>
                <span className="absolute top-1.5 right-2 font-mono text-[9px] text-[#15130F]/40 select-none">
                  +
                </span>
                <span className="absolute bottom-1.5 left-2 font-mono text-[9px] text-[#15130F]/40 select-none">
                  +
                </span>
                <span className="absolute bottom-1.5 right-2 font-mono text-[9px] text-[#15130F]/40 select-none">
                  +
                </span>

                {/* Capability Header */}
                <div className="flex flex-wrap justify-between items-baseline gap-2 pb-4 mb-6 border-b border-[#15130F]/15 font-mono text-xs">
                  <span className="text-[#FF3B1F] font-bold">
                    {cap.specCode}
                  </span>
                  <span className="text-[#636059]">
                    TOLERANCE: STRICT
                  </span>
                </div>

                {/* Title & Scope */}
                <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl text-[#15130F] font-normal tracking-tight mb-4">
                  {cap.title}{' '}
                  {cap.italicWord && (
                    <span className="italic font-normal font-serif text-[#15130F] underline decoration-[#FF3B1F] decoration-1 underline-offset-6">
                      {cap.italicWord}
                    </span>
                  )}
                </h3>

                <p className="font-sans text-base sm:text-lg text-[#15130F]/85 leading-relaxed mb-8 max-w-3xl">
                  {cap.scope}
                </p>

                {/* Real Architectural Deliverables */}
                <div className="border-t border-[#15130F]/15 pt-6">
                  <div className="font-mono text-[10px] text-[#636059] uppercase tracking-widest mb-3">
                    PRODUCTION DELIVERABLES:
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {cap.deliverables.map((item, dIdx) => (
                      <div
                        key={dIdx}
                        className="flex items-start gap-2.5 font-sans text-sm text-[#15130F]"
                      >
                        <span className="text-[#FF3B1F] font-mono text-xs select-none">
                          &ndash;&gt;
                        </span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tech Stack Indicator */}
                <div className="mt-8 pt-4 border-t border-[#15130F]/10 flex flex-wrap items-center justify-between gap-3 font-mono text-xs text-[#636059]">
                  <div className="flex flex-wrap gap-2">
                    {cap.techTags.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 border border-[#15130F]/20 text-[10px] bg-transparent text-[#15130F]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <span className="text-[10px] text-[#FF3B1F]">
                    [VERIFIED IN PRODUCTION]
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
