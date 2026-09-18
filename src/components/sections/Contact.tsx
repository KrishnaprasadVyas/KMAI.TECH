import React from 'react';
import { ArrowUpRight, Mail, Phone, Globe, MessageSquare } from 'lucide-react';
import { MagneticButton } from '../common/MagneticButton';

interface ContactProps {
  onCursorChange?: (variant: 'default' | 'button' | 'project' | 'image' | 'footer', text?: string) => void;
}

export const Contact: React.FC<ContactProps> = ({ onCursorChange }) => {
  return (
    <section
      id="contact"
      className="relative py-28 md:py-44 px-6 md:px-12 bg-[#05070B] overflow-hidden"
    >
      {/* Background Electric Blue Glow */}
      <div className="absolute -bottom-32 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full bg-[#006EFF]/15 blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex items-center gap-3 mb-10">
          <span className="w-2.5 h-2.5 rounded-full bg-[#006EFF] shadow-[0_0_12px_#006EFF] animate-pulse" />
          <span className="font-mono text-xs tracking-widest text-[#006EFF] uppercase">
            // INITIATE COLLABORATION
          </span>
        </div>

        {/* Monumental Headline */}
        <div className="mb-16">
          <h2 className="text-5xl sm:text-7xl md:text-8xl lg:text-[7rem] font-extrabold text-white tracking-tighter leading-[0.92]">
            LET'S BUILD<br />
            SOMETHING<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#006EFF] via-[#1683FF] to-[#38BDF8] drop-shadow-[0_0_40px_rgba(0,110,255,0.4)]">
              USEFUL.
            </span>
          </h2>
        </div>

        {/* Narrative & Contact Triggers Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end pt-8 border-t border-white/10">
          <div className="lg:col-span-6 space-y-4">
            <p className="text-lg sm:text-2xl text-[#CBD5E1] font-light leading-relaxed">
              Have an idea? Need a high-performance website? Want custom software or business automation?
            </p>
            <p className="text-sm sm:text-base text-[#A0A7B1] font-light">
              We respond promptly with technical perspectives, transparent architecture recommendations, and project roadmaps.
            </p>
          </div>

          {/* Large Action Buttons */}
          <div className="lg:col-span-6 flex flex-wrap gap-4 lg:justify-end">
            <MagneticButton
              as="a"
              href="mailto:krishnaprasadvyas@gmail.com?subject=Project%20Inquiry%20%E2%80%94%20KMAI.tech"
              variant="primary"
              className="px-8 py-5 text-xs sm:text-sm font-mono tracking-widest uppercase"
              onMouseEnter={() => onCursorChange?.('button')}
              onMouseLeave={() => onCursorChange?.('default')}
            >
              <span>START A PROJECT</span>
              <ArrowUpRight size={18} />
            </MagneticButton>

            <MagneticButton
              as="a"
              href="https://wa.me/919309920441?text=Hello%20KMAI%20Team,%20I'm%20interested%20in%20building%20a%20project%20with%20KMAI.tech"
              target="_blank"
              rel="noopener noreferrer"
              variant="secondary"
              className="px-8 py-5 text-xs sm:text-sm font-mono tracking-widest uppercase"
              onMouseEnter={() => onCursorChange?.('button')}
              onMouseLeave={() => onCursorChange?.('default')}
            >
              <MessageSquare size={16} className="text-[#38BDF8]" />
              <span>DIRECT WHATSAPP</span>
            </MagneticButton>
          </div>
        </div>

        {/* Detailed Contact Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-16 pt-12 border-t border-white/5">
          <a
            href="mailto:krishnaprasadvyas@gmail.com"
            className="group p-6 rounded-2xl bg-[#08111F]/60 border border-white/5 hover:border-[#006EFF]/50 transition-all duration-300"
            onMouseEnter={() => onCursorChange?.('button')}
            onMouseLeave={() => onCursorChange?.('default')}
          >
            <Mail size={20} className="text-[#006EFF] mb-3 group-hover:scale-110 transition-transform" />
            <span className="font-mono text-[11px] text-[#A0A7B1] tracking-widest uppercase block mb-1">
              EMAIL DIRECT
            </span>
            <p className="font-medium text-white group-hover:text-[#38BDF8] transition-colors break-all">
              krishnaprasadvyas@gmail.com
            </p>
          </a>

          <a
            href="tel:+919309920441"
            className="group p-6 rounded-2xl bg-[#08111F]/60 border border-white/5 hover:border-[#006EFF]/50 transition-all duration-300"
            onMouseEnter={() => onCursorChange?.('button')}
            onMouseLeave={() => onCursorChange?.('default')}
          >
            <Phone size={20} className="text-[#006EFF] mb-3 group-hover:scale-110 transition-transform" />
            <span className="font-mono text-[11px] text-[#A0A7B1] tracking-widest uppercase block mb-1">
              TELEPHONE
            </span>
            <p className="font-medium text-white group-hover:text-[#38BDF8] transition-colors">
              +91 9309920441
            </p>
          </a>

          <div className="p-6 rounded-2xl bg-[#08111F]/60 border border-white/5 flex flex-col justify-between">
            <div>
              <Globe size={20} className="text-[#006EFF] mb-3" />
              <span className="font-mono text-[11px] text-[#A0A7B1] tracking-widest uppercase block mb-1">
                STUDIO PRESENCE
              </span>
              <p className="font-medium text-white">
                Pune &amp; Mumbai, India
              </p>
            </div>
            <span className="font-mono text-[11px] text-[#006EFF] mt-2">
              GMT +5:30 (IST)
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
