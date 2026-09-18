import React from 'react';
import { ArrowUp, Globe, Mail, Phone, MessageSquare } from 'lucide-react';
import { GeometricK } from '../common/GeometricK';
import { MagneticButton } from '../common/MagneticButton';

interface FooterProps {
  onCursorChange?: (variant: 'default' | 'button' | 'project' | 'image' | 'footer', text?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onCursorChange }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      className="relative bg-[#040609] pt-28 pb-14 px-6 md:px-12 border-t border-white/10 overflow-hidden"
      onMouseEnter={() => onCursorChange?.('footer', "LET'S TALK")}
      onMouseLeave={() => onCursorChange?.('default')}
    >
      {/* Ambient Electric Blue Glow in footer header */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[350px] bg-[#006EFF]/10 blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Top Grid: Brand Identity & Architectural Navigation */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-24">
          {/* Brand & Studio Mission */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center gap-4">
              <GeometricK size={44} theme="dark" />
              <div className="flex flex-col">
                <span className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-none">
                  KMAI<span className="text-[#006EFF]">.tech</span>
                </span>
                <span className="font-mono text-[10px] text-[#758BAA] tracking-widest uppercase mt-1">
                  DIGITAL TECHNOLOGY STUDIO
                </span>
              </div>
            </div>

            <p className="text-base text-[#A0A7B1] font-light max-w-md leading-relaxed">
              We architect high-velocity software, bespoke web experiences, and operational automation for ambitious organizations worldwide.
            </p>

            {/* Core Pillars List */}
            <div className="pt-2 space-y-2 font-mono text-xs text-[#758BAA]">
              <div className="text-[#006EFF] font-semibold tracking-wider text-[11px] uppercase">
                // 4 CORE ARCHITECTURAL PILLARS
              </div>
              <div className="flex flex-wrap gap-2 text-[11px]">
                <span className="px-2.5 py-1 rounded bg-[#08111F] border border-white/5 text-[#CBD5E1]">
                  01 SOFTWARE ARCHITECTURE
                </span>
                <span className="px-2.5 py-1 rounded bg-[#08111F] border border-white/5 text-[#CBD5E1]">
                  02 BESPOKE WEB DESIGN
                </span>
                <span className="px-2.5 py-1 rounded bg-[#08111F] border border-white/5 text-[#CBD5E1]">
                  03 WORKFLOW AUTOMATION
                </span>
                <span className="px-2.5 py-1 rounded bg-[#08111F] border border-white/5 text-[#CBD5E1]">
                  04 AI &amp; AUTONOMOUS SYSTEMS
                </span>
              </div>
            </div>
          </div>

          {/* Navigation Sitemap */}
          <div className="lg:col-span-3">
            <span className="font-mono text-xs text-[#006EFF] tracking-widest uppercase block mb-5">
              // STUDIO SITEMAP
            </span>
            <ul className="space-y-3 font-mono text-xs text-[#A0A7B1]">
              <li>
                <a href="#work" className="hover:text-white transition-colors flex items-center gap-2">
                  <span className="text-[#758BAA]">01 //</span>
                  <span>SELECTED WORK</span>
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors flex items-center gap-2">
                  <span className="text-[#758BAA]">02 //</span>
                  <span>CAPABILITIES</span>
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-white transition-colors flex items-center gap-2">
                  <span className="text-[#758BAA]">03 //</span>
                  <span>STUDIO LEADERSHIP</span>
                </a>
              </li>
              <li>
                <a href="#process" className="hover:text-white transition-colors flex items-center gap-2">
                  <span className="text-[#758BAA]">04 //</span>
                  <span>METHODOLOGY</span>
                </a>
              </li>
              <li>
                <a href="#technology" className="hover:text-white transition-colors flex items-center gap-2">
                  <span className="text-[#758BAA]">05 //</span>
                  <span>ENGINEERING STACK</span>
                </a>
              </li>
              <li>
                <a href="#testimonials" className="hover:text-white transition-colors flex items-center gap-2">
                  <span className="text-[#758BAA]">06 //</span>
                  <span>CLIENT VOICES</span>
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white transition-colors flex items-center gap-2">
                  <span className="text-[#758BAA]">07 //</span>
                  <span>COMMISSIONS</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Founders & Direct Contacts */}
          <div className="lg:col-span-4 space-y-6">
            <div>
              <span className="font-mono text-xs text-[#006EFF] tracking-widest uppercase block mb-4">
                // LEADERSHIP TRIUMVIRATE
              </span>
              <div className="space-y-3 font-mono text-xs">
                <div className="p-3 rounded-xl bg-[#08111F]/40 border border-white/5">
                  <div className="text-[#006EFF] text-[10px] tracking-wider uppercase">Founder &amp; CEO</div>
                  <div className="text-white font-medium">Krishnaprasad Vyas</div>
                  <div className="text-[#758BAA] text-[11px] mt-0.5">Systems Strategy &amp; Commercial Direction</div>
                </div>

                <div className="p-3 rounded-xl bg-[#08111F]/40 border border-white/5">
                  <div className="text-[#006EFF] text-[10px] tracking-wider uppercase">Co-Founder &amp; COO</div>
                  <div className="text-white font-medium">Maithili Makkar</div>
                  <div className="text-[#758BAA] text-[11px] mt-0.5">Operational Governance &amp; Delivery Management</div>
                </div>

                <div className="p-3 rounded-xl bg-[#08111F]/40 border border-white/5">
                  <div className="text-[#006EFF] text-[10px] tracking-wider uppercase">Co-Founder &amp; CTO</div>
                  <div className="text-white font-medium">Ali Abu Nazahat</div>
                  <div className="text-[#758BAA] text-[11px] mt-0.5">Full-Stack Architecture &amp; System Automation</div>
                </div>
              </div>
            </div>

            {/* Quick Dispatch Links */}
            <div className="flex flex-wrap gap-3 font-mono text-xs">
              <a
                href="mailto:krishnaprasadvyas@gmail.com"
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#08111F] border border-white/10 text-white hover:border-[#006EFF] hover:text-[#38BDF8] transition-colors"
              >
                <Mail size={13} className="text-[#006EFF]" />
                <span>EMAIL</span>
              </a>
              <a
                href="https://wa.me/919309920441"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#08111F] border border-white/10 text-white hover:border-[#10B981] hover:text-[#38BDF8] transition-colors"
              >
                <MessageSquare size={13} className="text-[#10B981]" />
                <span>WHATSAPP</span>
              </a>
              <a
                href="tel:+919309920441"
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#08111F] border border-white/10 text-white hover:border-[#006EFF] hover:text-[#38BDF8] transition-colors"
              >
                <Phone size={13} className="text-[#006EFF]" />
                <span>CALL</span>
              </a>
            </div>
          </div>
        </div>

        {/* Oversized Architectural Brandmark Watermark */}
        <div className="select-none pointer-events-none text-center py-8 sm:py-16 border-y border-white/5 relative overflow-hidden">
          <span className="text-[15vw] font-black tracking-tighter text-white/[0.035] leading-none block font-mono">
            KMAI.TECH
          </span>
          <div className="absolute inset-0 flex items-center justify-between px-4 sm:px-12 pointer-events-auto">
            <div className="font-mono text-[11px] text-[#758BAA] hidden sm:flex items-center gap-2">
              <Globe size={14} className="text-[#006EFF]" />
              <span>18.5204° N, 73.8567° E // PUNE &amp; MUMBAI, IN</span>
            </div>

            <div className="ml-auto">
              <MagneticButton
                variant="secondary"
                className="w-14 h-14 rounded-full border border-white/15 hover:border-[#006EFF] text-white flex items-center justify-center transition-colors shadow-[0_0_15px_rgba(0,110,255,0.15)]"
                onClick={scrollToTop}
                onMouseEnter={() => onCursorChange?.('button')}
                onMouseLeave={() => onCursorChange?.('default')}
              >
                <ArrowUp size={20} />
              </MagneticButton>
            </div>
          </div>
        </div>

        {/* Bottom Credits & Status Bar */}
        <div className="pt-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#758BAA]">
          <div className="flex flex-wrap items-center gap-3">
            <span>© 2026 KMAI.tech Studio</span>
            <span>•</span>
            <span className="inline-flex items-center gap-1.5 text-white">
              <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
              <span>ALL SYSTEMS OPERATIONAL</span>
            </span>
          </div>

          <div className="flex items-center gap-2 text-right">
            <span>Engineered by Krishnaprasad Vyas, Maithili Makkar &amp; Ali Abu Nazahat</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
