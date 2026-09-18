import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ArrowDownRight, Sparkles } from 'lucide-react';
import { GeometricK } from '../common/GeometricK';
import { MagneticButton } from '../common/MagneticButton';

interface HeroProps {
  isLoaded: boolean;
  onCursorChange?: (variant: 'default' | 'button' | 'project' | 'image' | 'footer', text?: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ isLoaded, onCursorChange }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const subtextRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isLoaded) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      // Initial state
      gsap.set(labelRef.current, { opacity: 0, y: -20 });
      gsap.set('.hero-line-inner', { yPercent: 120, opacity: 0 });
      gsap.set(subtextRef.current, { opacity: 0, y: 30 });
      gsap.set(ctaRef.current, { opacity: 0, y: 20 });
      gsap.set(visualRef.current, { opacity: 0, scale: 0.85, rotate: -5 });

      tl.to(labelRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 0.1,
      })
        .to(
          '.hero-line-inner',
          {
            yPercent: 0,
            opacity: 1,
            duration: 1.2,
            stagger: 0.14,
            ease: 'power4.out',
          },
          '-=0.5'
        )
        .to(
          visualRef.current,
          {
            opacity: 1,
            scale: 1,
            rotate: 0,
            duration: 1.4,
            ease: 'power3.out',
          },
          '-=1.0'
        )
        .to(
          subtextRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: 'power3.out',
          },
          '-=0.8'
        )
        .to(
          ctaRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
          },
          '-=0.6'
        );
    }, containerRef);

    return () => ctx.revert();
  }, [isLoaded]);

  const scrollToWork = () => {
    const el = document.getElementById('work');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative min-h-screen w-full flex flex-col justify-between pt-32 pb-16 px-6 md:px-12 overflow-hidden bg-[#05070B]"
    >
      {/* Background Ambient Electric Blue Aura */}
      <div className="absolute top-1/4 -right-20 w-[500px] h-[500px] rounded-full bg-[#006EFF]/15 blur-[130px] pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] rounded-full bg-[#0044B0]/10 blur-[100px] pointer-events-none" />

      {/* Top Meta Label */}
      <div
        ref={labelRef}
        className="max-w-7xl mx-auto w-full flex flex-wrap items-center justify-between gap-4 border-b border-white/5 pb-6 text-xs font-mono tracking-widest text-[#A0A7B1]"
      >
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#006EFF] shadow-[0_0_10px_#006EFF]" />
          <span>CREATIVE TECHNOLOGY STUDIO</span>
        </div>
        <div className="hidden sm:flex items-center gap-6">
          <span>BUILT BY KRISHNAPRASAD VYAS, MAITHILI MAKKAR &amp; ALI ABU NAZAHAT</span>
          <span>// 2026</span>
        </div>
      </div>

      {/* Main Hero Centerpiece */}
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center my-auto py-12">
        {/* Left Column: Monumental Editorial Typography */}
        <div ref={headlineRef} className="lg:col-span-8 flex flex-col">
          <div className="overflow-hidden mb-1">
            <span className="hero-line-inner block text-5xl sm:text-7xl md:text-8xl lg:text-[7.5rem] font-extrabold tracking-tighter leading-[0.9] text-white">
              WE BUILD
            </span>
          </div>

          <div className="overflow-hidden mb-1">
            <span className="hero-line-inner block text-5xl sm:text-7xl md:text-8xl lg:text-[7.5rem] font-extrabold tracking-tighter leading-[0.9] text-white">
              SMART
            </span>
          </div>

          <div className="overflow-hidden">
            <span className="hero-line-inner block text-5xl sm:text-7xl md:text-8xl lg:text-[7.5rem] font-extrabold tracking-tighter leading-[0.9] text-transparent bg-clip-text bg-gradient-to-r from-[#006EFF] via-[#1683FF] to-[#38BDF8] drop-shadow-[0_0_40px_rgba(0,110,255,0.4)]">
              DIGITAL
            </span>
          </div>

          <div className="overflow-hidden">
            <span className="hero-line-inner block text-5xl sm:text-7xl md:text-8xl lg:text-[7.5rem] font-extrabold tracking-tighter leading-[0.9] text-white">
              BUSINESSES.
            </span>
          </div>
        </div>

        {/* Right Column: Abstract Geometric KMAI Sculpture */}
        <div
          ref={visualRef}
          className="lg:col-span-4 flex flex-col items-center justify-center relative"
        >
          <div className="relative group">
            {/* Ambient Back Glow Ring */}
            <div className="absolute inset-0 rounded-full bg-[#006EFF]/20 filter blur-2xl scale-110 group-hover:scale-125 transition-transform duration-700" />
            <GeometricK
              size={340}
              interactive={true}
              className="transform-gpu transition-all duration-300"
            />
          </div>

          <div className="mt-8 text-center">
            <span className="font-mono text-[11px] tracking-[0.25em] text-[#A0A7B1] uppercase flex items-center gap-2 justify-center">
              <Sparkles size={12} className="text-[#006EFF]" />
              INTERACTIVE IDENTITY // KMAI
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Subtext & Interactive CTAs */}
      <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row items-start md:items-end justify-between gap-8 pt-8 border-t border-white/5">
        <div ref={subtextRef} className="max-w-xl">
          <p className="font-mono text-xs text-[#006EFF] tracking-widest uppercase mb-2">
            IDEAS → SYSTEMS → IMPACT
          </p>
          <p className="text-base sm:text-lg text-[#A0A7B1] font-light leading-relaxed">
            Software. Web Experiences. Automation. AI Solutions. We engineer robust digital engines
            built around real business operations and measurable impact.
          </p>
        </div>

        <div ref={ctaRef} className="flex flex-wrap items-center gap-4">
          <MagneticButton
            variant="primary"
            className="px-7 py-4 text-xs font-mono tracking-widest uppercase"
            onClick={scrollToWork}
            onMouseEnter={() => onCursorChange?.('button')}
            onMouseLeave={() => onCursorChange?.('default')}
          >
            <span>SELECTED WORK</span>
            <ArrowDownRight size={16} />
          </MagneticButton>

          <MagneticButton
            variant="outline"
            className="px-7 py-4 text-xs font-mono tracking-widest uppercase"
            onClick={scrollToContact}
            onMouseEnter={() => onCursorChange?.('button')}
            onMouseLeave={() => onCursorChange?.('default')}
          >
            <span>START A PROJECT</span>
          </MagneticButton>
        </div>
      </div>
    </section>
  );
};
