import React from 'react';

export const WorkMarquee: React.FC = () => {
  const items = [
    'SOFTWARE',
    'WEB EXPERIENCES',
    'AUTOMATION',
    'DIGITAL PRODUCTS',
    'AI SOLUTIONS',
    'SYSTEM ARCHITECTURE',
  ];

  return (
    <div className="py-12 md:py-16 bg-[#08111F]/50 border-y border-white/5 overflow-hidden select-none group">
      <div className="flex w-fit animate-marquee group-hover:[animation-play-state:paused]">
        {/* Set 1 */}
        <div className="flex items-center gap-10 md:gap-16 pr-10 md:pr-16 shrink-0">
          {items.map((item, idx) => (
            <div key={`s1-${idx}`} className="flex items-center gap-10 md:gap-16">
              <span className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tighter text-white/20 hover:text-white transition-colors duration-300">
                {item}
              </span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#006EFF] shadow-[0_0_10px_#006EFF]" />
            </div>
          ))}
        </div>

        {/* Set 2 (Duplicate for continuous loop) */}
        <div className="flex items-center gap-10 md:gap-16 pr-10 md:pr-16 shrink-0" aria-hidden="true">
          {items.map((item, idx) => (
            <div key={`s2-${idx}`} className="flex items-center gap-10 md:gap-16">
              <span className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tighter text-white/20 hover:text-white transition-colors duration-300">
                {item}
              </span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#006EFF] shadow-[0_0_10px_#006EFF]" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
