import React from 'react';
import { ArrowUp } from 'lucide-react';
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
      className="relative bg-[#040609] pt-24 pb-12 px-6 md:px-12 border-t border-white/10 overflow-hidden"
      onMouseEnter={() => onCursorChange?.('footer', "LET'S TALK")}
      onMouseLeave={() => onCursorChange?.('default')}
    >
      {/* Ambient Blue Backlight */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-[#006EFF]/10 blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Top Grid: Monumental Brand Signature & Quick Navigation */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
          <div className="lg:col-span-6">
            <div className="flex items-center gap-4 mb-6">
              <GeometricK size={48} glow={false} />
              <span className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                KMAI<span className="text-[#006EFF]">.tech</span>
              </span>
            </div>

            <p className="text-base text-[#A0A7B1] font-light max-w-md leading-relaxed mb-6">
              We don't just build websites. We build digital businesses. A creative technology
              studio architecting software, automation, and high-performance digital experiences.
            </p>

            <div className="flex flex-wrap gap-2 text-xs font-mono text-[#758BAA]">
              <span>SOFTWARE</span>
              <span>•</span>
              <span>WEB</span>
              <span>•</span>
              <span>AUTOMATION</span>
              <span>•</span>
              <span>AI</span>
              <span>•</span>
              <span>DIGITAL PRODUCTS</span>
            </div>
          </div>

          {/* Nav & Contact Links */}
          <div className="lg:col-span-6 grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div>
              <span className="font-mono text-xs text-[#006EFF] tracking-widest uppercase block mb-4">
                NAVIGATION
              </span>
              <ul className="space-y-3 font-mono text-xs text-[#A0A7B1]">
                <li>
                  <a href="#work" className="hover:text-white transition-colors">
                    01 // WORK
                  </a>
                </li>
                <li>
                  <a href="#services" className="hover:text-white transition-colors">
                    02 // SERVICES
                  </a>
                </li>
                <li>
                  <a href="#about" className="hover:text-white transition-colors">
                    03 // ABOUT
                  </a>
                </li>
                <li>
                  <a href="#contact" className="hover:text-white transition-colors">
                    04 // CONTACT
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <span className="font-mono text-xs text-[#006EFF] tracking-widest uppercase block mb-4">
                LEADERSHIP
              </span>
              <ul className="space-y-3 text-xs font-mono">
                <li>
                  <span className="text-[#006EFF] block text-[10px] tracking-wider uppercase">Founder &amp; CEO</span>
                  <span className="text-white font-medium">Krishnaprasad Vyas</span>
                </li>
                <li>
                  <span className="text-[#006EFF] block text-[10px] tracking-wider uppercase">Co-Founder &amp; COO</span>
                  <span className="text-white font-medium">Maithili Makkar</span>
                </li>
                <li>
                  <span className="text-[#006EFF] block text-[10px] tracking-wider uppercase">Co-Founder &amp; CTO</span>
                  <span className="text-white font-medium">Ali Abu Nazahat</span>
                </li>
                <li className="pt-2">
                  <a
                    href="mailto:krishnaprasadvyas@gmail.com"
                    className="text-[#A0A7B1] hover:text-[#38BDF8] transition-colors break-all block"
                  >
                    krishnaprasadvyas@gmail.com
                  </a>
                </li>
                <li>
                  <a href="tel:+919309920441" className="text-[#A0A7B1] hover:text-[#38BDF8] transition-colors block">
                    +91 9309920441
                  </a>
                </li>
              </ul>
            </div>

            <div className="col-span-2 sm:col-span-1 flex flex-col sm:items-end justify-between">
              <span className="font-mono text-xs text-[#006EFF] tracking-widest uppercase block mb-4">
                BACK TO TOP
              </span>
              <MagneticButton
                variant="secondary"
                className="w-12 h-12 rounded-full border border-white/15 hover:border-[#006EFF] text-white flex items-center justify-center transition-colors"
                onClick={scrollToTop}
                onMouseEnter={() => onCursorChange?.('button')}
                onMouseLeave={() => onCursorChange?.('default')}
              >
                <ArrowUp size={18} />
              </MagneticButton>
            </div>
          </div>
        </div>

        {/* Oversized Subtle Background Brandmark */}
        <div className="select-none pointer-events-none text-center py-6 sm:py-12 border-y border-white/5">
          <span className="text-[14vw] font-extrabold tracking-tighter text-white/[0.04] leading-none block">
            KMAI.TECH
          </span>
        </div>

        {/* Bottom Credits & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#758BAA]">
          <div className="flex items-center gap-2">
            <span>© 2026 KMAI.tech</span>
            <span>•</span>
            <span>All rights reserved.</span>
          </div>

          <div className="flex items-center gap-2">
            <span>Built by Krishnaprasad Vyas, Maithili Makkar &amp; Ali Abu Nazahat</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
