import React from 'react';

export const About: React.FC = () => {
  const personnel = [
    {
      id: 'KM-ENG-01',
      name: 'Krishnaprasad Vyas',
      role: 'Founder // Systems Strategy & Architecture',
      focus: 'Enterprise system architecture, commercial strategy, high-concurrency design.',
      commitment:
        'Directs technical vision, database modeling, and institutional partnerships. Ensures every codebase is architected for long-term operational resilience without technical compromises.',
    },
    {
      id: 'KM-ENG-02',
      name: 'Maithili Makkar',
      role: 'Co-Founder // Operations & Delivery Systems',
      focus: 'Project execution pipelines, stakeholder synchronization, operational rigor.',
      commitment:
        'Oversees operational workflows and build milestones. Maintains two-week working build cadence and ensures strict alignment between engineering delivery and organizational objectives.',
    },
    {
      id: 'KM-ENG-03',
      name: 'Ali Abu Nazahat',
      role: 'Co-Founder // Full-Stack & Automation Architecture',
      focus: 'Edge APIs, event-driven webhooks, payment engines, machine intelligence.',
      commitment:
        'Architects backend infrastructure, distributed state protocols, and automated middleware pipelines. Eliminates manual operational debt through self-healing software.',
    },
  ];

  return (
    <section
      id="personnel"
      className="relative scroll-mt-20 w-full py-24 sm:py-32 px-6 sm:px-10 md:px-16 border-b border-[#15130F]/15 bg-[#F3EFE7]"
    >
      <div className="w-full max-w-[1540px] mx-auto">
        {/* Section Header */}
        <div className="flex flex-wrap items-end justify-between gap-4 pb-8 mb-16 border-b border-[#15130F]/15 font-mono text-xs text-[#636059]">
          <div>
            <div className="text-[#FF3B1F] uppercase tracking-widest text-[11px] mb-1">
              + PERSONNEL SPECIFICATION
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#15130F] font-normal tracking-tight">
              Engineering Personnel Register
            </h2>
          </div>
          <div className="text-right text-[11px] max-w-sm">
            <div>DIRECT ARCHITECT COLLABORATION</div>
            <div className="text-[#15130F] font-medium">
              Zero account managers. Zero intermediaries.
            </div>
          </div>
        </div>

        {/* Spec Sheet Personnel Ledger Table / Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {personnel.map((person) => (
            <article
              key={person.id}
              className="border border-[#15130F] bg-[#F3EFE7] p-6 sm:p-8 flex flex-col justify-between relative"
            >
              {/* Corner Registration Marks */}
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

              <div>
                {/* Personnel ID & Title */}
                <div className="flex justify-between items-baseline pb-3 mb-5 border-b border-[#15130F]/15 font-mono text-xs">
                  <span className="text-[#FF3B1F] font-bold">
                    {person.id}
                  </span>
                  <span className="text-[#636059]">
                    STATUS: ACTIVE
                  </span>
                </div>

                <h3 className="font-serif text-2xl sm:text-3xl text-[#15130F] font-normal tracking-tight mb-2">
                  {person.name}
                </h3>

                <div className="font-mono text-xs text-[#FF3B1F] mb-4">
                  {person.role}
                </div>

                <div className="border-t border-[#15130F]/10 pt-4 mb-4">
                  <div className="font-mono text-[10px] text-[#636059] uppercase tracking-wider mb-1">
                    PRIMARY ARCHITECTURE DOMAIN:
                  </div>
                  <p className="font-sans text-sm text-[#15130F] font-medium leading-normal">
                    {person.focus}
                  </p>
                </div>
              </div>

              <div className="border-t border-[#15130F]/10 pt-4 mt-6">
                <div className="font-mono text-[10px] text-[#636059] uppercase tracking-wider mb-1">
                  DISCIPLINE COMMITMENT:
                </div>
                <p className="font-sans text-xs text-[#15130F]/80 leading-relaxed">
                  {person.commitment}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
