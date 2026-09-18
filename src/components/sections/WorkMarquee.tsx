import React from 'react';

export const WorkMarquee: React.FC = () => {
  const items = [
    'SOFTWARE',
    'WEB',
    'AUTOMATION',
    'AI',
    'PRODUCT',
    'ENGINEERING',
  ];

  const separator = '×';

  return (
    <div className="py-12 md:py-16 bg-[#08111F]/50 border-y border-white/5 overflow-hidden select-none group">
      <div className="flex w-fit motion-safe:animate-marquee-slow motion-reduce:animate-none">
        {/* Set 1 */}
        <div className="flex items-center gap-8 md:gap-12 pr-8 md:pr-12 shrink-0">
          {items.map((item, idx) => (
            <div key={`s1-${idx}`} className="flex items-center gap-8 md:gap-12">
              <span className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tighter text-white/15 hover:text-white/40 transition-colors duration-500">
                {item}
              </span>
              <span className="text-2xl sm:text-3xl md:text-5xl font-light text-[#006EFF]/40 tracking-tighter">
                {separator}
              </span>
            </div>
          ))}
        </div>

        {/* Set 2 (Duplicate for continuous loop) */}
        <div className="flex items-center gap-8 md:gap-12 pr-8 md:pr-12 shrink-0" aria-hidden="true">
          {items.map((item, idx) => (
            <div key={`s2-${idx}`} className="flex items-center gap-8 md:gap-12">
              <span className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tighter text-white/15 hover:text-white/40 transition-colors duration-500">
                {item}
              </span>
              <span className="text-2xl sm:text-3xl md:text-5xl font-light text-[#006EFF]/40 tracking-tighter">
                {separator}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
