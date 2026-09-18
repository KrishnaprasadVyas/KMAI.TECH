import React from 'react';
import { SectionLabel } from '../common/SectionLabel';

export const TrustClients: React.FC = () => {
  const partners = [
    { name: 'SHRI GURUDEV ASHRAM', type: 'Digital Platform' },
    { name: 'SHANTI ASHRAM TRUST', type: 'Web Experience' },
    { name: 'MAVT EXPEDITIONS', type: 'Pilgrimage Platform' },
    { name: 'VISHWARAJ POLYCHEM', type: 'Industrial Web Presence' },
    { name: 'PRIYA SURANA', type: 'Professional Identity Archive' },
  ];

  return (
    <section className="py-20 md:py-28 px-6 md:px-12 bg-[#05070B] border-b border-white/5">
      <div className="max-w-7xl mx-auto">
        <SectionLabel number="04" label="CLIENTS & PROJECTS" className="mb-8" />

        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
          <h3 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            BUILT FOR REAL PEOPLE.<br />
            REAL BUSINESSES.
          </h3>
          <p className="max-w-md text-sm sm:text-base text-[#A0A7B1] font-light">
            We partner directly with founders, trustees, operations teams, and researchers to build high-consequence digital infrastructure.
          </p>
        </div>

        {/* Minimalist Grid of Organizations */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {partners.map((partner) => (
            <div
              key={partner.name}
              className="group p-6 rounded-2xl bg-[#08111F]/40 border border-white/5 hover:border-[#006EFF]/40 transition-all duration-300 flex flex-col justify-between"
            >
              <h4 className="font-bold text-sm tracking-wide text-white mb-2">
                {partner.name}
              </h4>
              <p className="font-mono text-[11px] text-[#758BAA]">
                {partner.type}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
