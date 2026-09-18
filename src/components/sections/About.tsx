import React from 'react';

interface AboutProps {
  onCursorChange?: (variant: 'default' | 'button' | 'project' | 'image' | 'footer', text?: string) => void;
}

export const About: React.FC<AboutProps> = ({ onCursorChange }) => {
  const founders = [
    {
      name: 'Krishnaprasad Vyas',
      role: 'Founder & CEO',
      focus: 'Systems Strategy & Architecture',
      bio: 'Directs overall studio vision, enterprise system architecture, and client partnerships. Bridges commercial strategy with scalable digital foundations.',
      initials: 'KV',
    },
    {
      name: 'Maithili Makkar',
      role: 'Co-Founder & COO',
      focus: 'Operations & Delivery',
      bio: 'Orchestrates project delivery pipelines, operational workflows, and stakeholder alignment. Ensures every build adheres to uncompromising craft.',
      initials: 'MM',
    },
    {
      name: 'Ali Abu Nazahat',
      role: 'Co-Founder & CTO',
      focus: 'Full-Stack & Automation',
      bio: 'Architects technical infrastructure, edge APIs, database systems, and automated pipelines. Builds resilient platforms without technical debt.',
      initials: 'AN',
    },
  ];

  return (
    <section id="about" className="relative scroll-mt-24 w-full py-28 sm:py-36 md:py-48 px-6 sm:px-10 md:px-16">
      <div className="w-full max-w-[1540px] mx-auto">
        {/* Section Header */}
        <div className="mb-20 sm:mb-28">
          <h2 className="font-display font-extrabold uppercase text-white tracking-[-0.04em] leading-[0.92] text-[48px] xs:text-[60px] sm:text-[76px] md:text-[96px] lg:text-[112px]">
            THE STUDIO
          </h2>
          <p className="mt-6 font-body text-lg sm:text-xl text-[#8E939E] max-w-xl font-normal">
            Direct collaboration with senior engineers and architects. Zero account managers, zero intermediaries.
          </p>
        </div>

        {/* Founders Editorial Showcase (Human, Pure Typography & Whitespace, Zero Boxed Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 sm:gap-16 lg:gap-24">
          {founders.map((founder) => (
            <div
              key={founder.name}
              className="space-y-6 group"
              onMouseEnter={() => onCursorChange?.('button')}
              onMouseLeave={() => onCursorChange?.('default')}
            >
              {/* Initials / Architectural Monogram */}
              <div className="w-16 h-16 rounded-[2px] bg-white/[0.04] group-hover:bg-[#216BFF] flex items-center justify-center text-white/90 group-hover:text-white transition-colors duration-300">
                <span className="font-display font-bold text-xl tracking-tight">
                  {founder.initials}
                </span>
              </div>

              {/* Identity & Role */}
              <div className="space-y-1">
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  {founder.name}
                </h3>
                <p className="font-body text-sm font-medium text-[#216BFF]">
                  {founder.role}
                </p>
                <p className="font-body text-xs text-[#8E939E]">
                  {founder.focus}
                </p>
              </div>

              {/* Bio */}
              <p className="font-body text-base text-[#8E939E] font-light leading-relaxed">
                {founder.bio}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
