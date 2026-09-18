import React from 'react';
import { ShieldCheck, CheckCircle2 } from 'lucide-react';

export const TrustClients: React.FC = () => {
  const partners = [
    {
      name: 'SHRI GURUDEV ASHRAM',
      domain: 'Spiritual Community & Global Portal',
      year: '2025',
      scope: 'Multi-lingual portal & member systems',
    },
    {
      name: 'MAVT EXPEDITIONS',
      domain: 'Expedition & Pilgrimage Venture',
      year: '2026',
      scope: 'Booking engine & reservation automation',
    },
    {
      name: 'VISHWARAJ POLYCHEM',
      domain: 'Industrial Chemical Enterprise',
      year: '2025',
      scope: 'B2B product catalog & lead engine',
    },
    {
      name: 'SHANTI ASHRAM TRUST',
      domain: 'Public Humanitarian Trust',
      year: '2025',
      scope: 'Charitable portal & administrative workflows',
    },
    {
      name: 'CHINTAMANI MOTORS',
      domain: 'Automotive Dealership & Services',
      year: '2025',
      scope: 'Inventory showcases & test drive dispatch',
    },
    {
      name: 'PUNE INVESTMENTS',
      domain: 'Wealth Advisory & Equity Research',
      year: '2025',
      scope: 'Advisory portal & client onboarding',
    },
  ];

  return (
    <section className="py-24 md:py-32 px-6 md:px-12 bg-[#05070B] border-b border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-2 mb-8">
          <ShieldCheck size={16} className="text-[#006EFF]" />
          <span className="font-mono text-xs tracking-widest text-[#006EFF] uppercase">
            // CLIENT ENGAGEMENTS &amp; PARTNERSHIPS
          </span>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
          <h3 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight max-w-2xl">
            DELIVERED FOR REAL ORGANIZATIONS.<br />
            ZERO PLACEHOLDERS.
          </h3>
          <p className="max-w-md text-sm sm:text-base text-[#A0A7B1] font-light leading-relaxed">
            We partner directly with executive leadership, managing trustees, and operations founders. Every project represents deployed, production-grade infrastructure.
          </p>
        </div>

        {/* Minimalist Grid of Organizations */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {partners.map((partner) => (
            <div
              key={partner.name}
              className="p-7 rounded-2xl bg-[#08111F]/40 border border-white/5 hover:border-[#006EFF]/40 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-0.5"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-[10px] text-[#758BAA] tracking-wider uppercase">
                    EST. {partner.year}
                  </span>
                  <span className="inline-flex items-center gap-1 font-mono text-[10px] text-[#10B981] px-2 py-0.5 rounded-full bg-[#10B981]/10 border border-[#10B981]/20">
                    <CheckCircle2 size={10} />
                    <span>PRODUCTION</span>
                  </span>
                </div>

                <h4 className="font-bold text-base tracking-wide text-white group-hover:text-[#38BDF8] transition-colors mb-2">
                  {partner.name}
                </h4>
                <p className="font-mono text-xs text-[#758BAA] mb-4">
                  {partner.domain}
                </p>
              </div>

              <div className="pt-4 border-t border-white/5 font-mono text-xs text-[#A0A7B1]">
                {partner.scope}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
