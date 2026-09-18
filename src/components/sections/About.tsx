import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Terminal, Cpu, Compass } from 'lucide-react';
import { GeometricK } from '../common/GeometricK';

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
            // FOUNDER &amp; STUDIO
          </span>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Left Column: Heading & Visual Identity */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <h2 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-tight leading-[1.05] mb-8">
                WE BUILD WITH <span className="text-[#006EFF]">PURPOSE.</span>
              </h2>

              <p className="text-sm font-mono text-[#A0A7B1] tracking-widest uppercase mb-12">
                EST. 2024–2026 // PUNE &amp; MUMBAI, INDIA
              </p>
            </div>

            {/* Geometric Identity Display Card */}
            <div
              className="relative rounded-2xl bg-[#08111F] border border-white/10 p-8 overflow-hidden group cursor-pointer"
              onMouseEnter={() => onCursorChange?.('button')}
              onMouseLeave={() => onCursorChange?.('default')}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#006EFF]/10 rounded-full blur-2xl" />
              <div className="flex items-center gap-6">
                <GeometricK size={90} glow={false} />
                <div>
                  <h4 className="text-lg font-bold text-white">Krishnaprasad Vyas</h4>
                  <p className="font-mono text-xs text-[#006EFF]">Founder &amp; Principal Architect</p>
                  <p className="font-mono text-xs text-[#A0A7B1] mt-1">KMAI.tech</p>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-white/10 flex items-center justify-between text-xs font-mono text-[#A0A7B1]">
                <span>krishnaprasadvyas@gmail.com</span>
                <span className="text-white">+91 9309920441</span>
              </div>
            </div>
          </div>

          {/* Right Column: Studio Narrative & Pillars */}
          <div ref={textRef} className="lg:col-span-7 space-y-10">
            <p className="text-xl sm:text-2xl md:text-3xl text-[#F3F5F7] font-light leading-relaxed">
              KMAI is a technology studio focused on building digital products, websites, software
              systems, and automation for businesses and organizations.
            </p>

            <p className="text-base sm:text-lg text-[#A0A7B1] font-light leading-relaxed">
              We combine design, engineering, and business thinking to create technology that is{' '}
              <strong className="text-white font-medium">useful—not just impressive</strong>. We
              don't treat software as isolated code or websites as static brochures; we construct
              interconnected systems that solve core organizational challenges and streamline
              real-world operations.
            </p>

            {/* 3 Studio Philosophy Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-white/10">
              <div className="p-5 rounded-xl bg-[#08111F]/60 border border-white/5">
                <Terminal size={22} className="text-[#006EFF] mb-3" />
                <h4 className="text-base font-bold text-white mb-1">Modern Engineering</h4>
                <p className="text-xs text-[#A0A7B1] leading-relaxed">
                  Type-safe, maintainable code built with React, TypeScript, Node, and edge databases.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-[#08111F]/60 border border-white/5">
                <Cpu size={22} className="text-[#006EFF] mb-3" />
                <h4 className="text-base font-bold text-white mb-1">Practical Automation</h4>
                <p className="text-xs text-[#A0A7B1] leading-relaxed">
                  Automating payment reconciliation, notifications, and operational workflows.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-[#08111F]/60 border border-white/5">
                <Compass size={22} className="text-[#006EFF] mb-3" />
                <h4 className="text-base font-bold text-white mb-1">Human Dignity</h4>
                <p className="text-xs text-[#A0A7B1] leading-relaxed">
                  Clean digital accessibility built for genuine community trusts and real businesses.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
