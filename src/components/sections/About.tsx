import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Terminal, Cpu, Compass, Users } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface AboutProps {
  onCursorChange?: (variant: 'default' | 'button' | 'project' | 'image' | 'footer', text?: string) => void;
}

export const About: React.FC<AboutProps> = ({ onCursorChange }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    if (textRef.current && containerRef.current) {
      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 75%',
            once: true,
          },
        }
      );
    }
  }, []);

  const founders = [
    {
      name: 'Krishnaprasad Vyas',
      role: 'Co-Founder',
      initials: 'KV',
    },
    {
      name: 'Maithili Makkar',
      role: 'Co-Founder',
      initials: 'MM',
    },
    {
      name: 'Ali Abu Nazahat',
      role: 'Co-Founder',
      initials: 'AN',
    },
  ];

  return (
    <section
      ref={containerRef}
      id="about"
      className="relative py-28 md:py-40 px-6 md:px-12 bg-[#05070B] border-b border-white/5 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Tag */}
        <div className="flex items-center gap-3 mb-12">
          <span className="w-2 h-2 rounded-full bg-[#006EFF]" />
          <span className="font-mono text-xs tracking-widest text-[#006EFF] uppercase">
            // LEADERSHIP &amp; STUDIO
          </span>
        </div>

        {/* Narrative Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start mb-24">
          {/* Left: Headline & Manifesto */}
          <div className="lg:col-span-6">
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-tight leading-[1.05] mb-6">
              WE BUILD WITH <span className="text-[#006EFF]">PURPOSE.</span>
            </h2>

            <p className="text-sm font-mono text-[#38BDF8] tracking-widest uppercase mb-4">
              THREE BUILDERS. ONE STUDIO.
            </p>

            <p className="text-xs font-mono text-[#758BAA] tracking-widest uppercase">
              PUNE &amp; MUMBAI, INDIA // EST. 2024–2026
            </p>
          </div>

          {/* Right: Studio Description */}
          <div ref={textRef} className="lg:col-span-6 space-y-6">
            <p className="text-xl sm:text-2xl text-[#F3F5F7] font-light leading-relaxed">
              KMAI.tech brings together design, engineering, and business thinking to build websites,
              software, automation systems, and digital products.
            </p>

            <p className="text-base sm:text-lg text-[#A0A7B1] font-light leading-relaxed">
              We combine technical craftsmanship with operational empathy to create technology that is{' '}
              <strong className="text-white font-medium">useful—not just impressive</strong>. Rather than
              treating software as isolated code or websites as static templates, we build interconnected
              digital systems that solve real business problems and elevate organizations.
            </p>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* BUILT BY THREE — EQUAL CO-FOUNDERS ROSTER */}
        {/* ========================================================================= */}
        <div className="mb-24">
          <div className="flex items-center gap-2 mb-8">
            <Users size={16} className="text-[#006EFF]" />
            <h3 className="font-mono text-xs text-[#006EFF] tracking-widest uppercase">
              BUILT BY THREE // CO-FOUNDING TEAM
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {founders.map((founder) => (
              <div
                key={founder.name}
                className="group relative p-8 rounded-2xl bg-[#08111F]/70 border border-white/10 hover:border-[#006EFF]/50 transition-all duration-300 select-none cursor-pointer overflow-hidden"
                onMouseEnter={() => onCursorChange?.('button')}
                onMouseLeave={() => onCursorChange?.('default')}
              >
                {/* Ambient back glow */}
                <div className="absolute -top-10 -right-10 w-28 h-28 rounded-full bg-[#006EFF]/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="relative z-10 flex flex-col justify-between h-full">
                  <div>
                    {/* Monogram Badge */}
                    <div className="w-14 h-14 rounded-xl bg-[#05070B] border border-white/10 group-hover:border-[#006EFF] flex items-center justify-center font-mono font-bold text-base text-white group-hover:text-[#006EFF] group-hover:shadow-[0_0_20px_rgba(0,110,255,0.3)] transition-all duration-300 mb-6">
                      {founder.initials}
                    </div>

                    <h4 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-1 group-hover:text-[#F3F5F7]">
                      {founder.name}
                    </h4>

                    <p className="font-mono text-xs text-[#006EFF] tracking-wider uppercase">
                      {founder.role}
                    </p>
                  </div>

                  <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono text-[#758BAA]">
                    <span>KMAI.tech</span>
                    <span className="group-hover:text-white transition-colors">Co-Founder</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3 Studio Philosophy Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-12 border-t border-white/10">
          <div className="p-6 rounded-xl bg-[#08111F]/40 border border-white/5">
            <Terminal size={22} className="text-[#006EFF] mb-3" />
            <h4 className="text-base font-bold text-white mb-2">Modern Engineering</h4>
            <p className="text-xs sm:text-sm text-[#A0A7B1] leading-relaxed">
              Type-safe, maintainable software engineered with React, TypeScript, Node.js, and edge architecture.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-[#08111F]/40 border border-white/5">
            <Cpu size={22} className="text-[#006EFF] mb-3" />
            <h4 className="text-base font-bold text-white mb-2">Practical Automation</h4>
            <p className="text-xs sm:text-sm text-[#A0A7B1] leading-relaxed">
              Automating payment reconciliation, notifications, and operational workflows for modern businesses.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-[#08111F]/40 border border-white/5">
            <Compass size={22} className="text-[#006EFF] mb-3" />
            <h4 className="text-base font-bold text-white mb-2">Human Dignity</h4>
            <p className="text-xs sm:text-sm text-[#A0A7B1] leading-relaxed">
              Accessible digital experiences built for genuine humanitarian trusts and real businesses.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
