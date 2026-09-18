import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  onCursorChange?: (variant: 'default' | 'button' | 'project' | 'image' | 'footer', text?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onCursorChange }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is active
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: 'WORK', href: '#work', index: '01' },
    { label: 'SERVICES', href: '#services', index: '02' },
    { label: 'ABOUT', href: '#about', index: '03' },
    { label: 'CONTACT', href: '#contact', index: '04' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetElement = document.querySelector(href);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-[9000] transition-all duration-500 ${
          scrolled
            ? 'bg-[#08111F]/80 backdrop-blur-md border-b border-white/5 py-4 shadow-[0_10px_30px_rgba(0,0,0,0.5)]'
            : 'bg-transparent py-7 md:py-8'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo / Brandmark */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="group flex items-center gap-3 select-none"
            onMouseEnter={() => onCursorChange?.('button')}
            onMouseLeave={() => onCursorChange?.('default')}
          >
            <div className="w-8 h-8 rounded-lg bg-[#08111F] border border-[#006EFF]/30 flex items-center justify-center group-hover:border-[#006EFF] group-hover:shadow-[0_0_15px_rgba(0,110,255,0.4)] transition-all duration-300">
              <span className="font-bold text-sm tracking-tighter text-white">
                K<span className="text-[#006EFF]">.</span>
              </span>
            </div>
            <span className="font-bold text-base md:text-lg tracking-tight text-white group-hover:text-[#F3F5F7]">
              KMAI<span className="text-[#006EFF] font-mono font-medium text-xs ml-1">.tech</span>
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-9">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="group relative font-mono text-xs tracking-widest text-[#A0A7B1] hover:text-white transition-colors duration-200 py-1"
                onMouseEnter={() => onCursorChange?.('button')}
                onMouseLeave={() => onCursorChange?.('default')}
              >
                <span>{link.label}</span>
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#006EFF] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}

            <a
              href="#contact"
              onClick={(e) => handleLinkClick(e, '#contact')}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#006EFF]/40 hover:border-[#006EFF] bg-[#006EFF]/10 hover:bg-[#006EFF] text-xs font-mono text-white tracking-widest transition-all duration-300 shadow-[0_0_20px_rgba(0,110,255,0.2)] hover:shadow-[0_0_25px_rgba(0,110,255,0.6)]"
              onMouseEnter={() => onCursorChange?.('button')}
              onMouseLeave={() => onCursorChange?.('default')}
            >
              <span>LET'S TALK</span>
              <ArrowUpRight size={14} className="text-[#38BDF8] group-hover:text-white" />
            </a>
          </nav>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden relative w-10 h-10 rounded-full border border-white/10 bg-[#08111F] flex items-center justify-center text-white"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* Fullscreen Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-[8999] bg-[#05070B] flex flex-col justify-between p-8 md:p-16 transition-all duration-500 md:hidden ${
          mobileMenuOpen
            ? 'opacity-100 pointer-events-auto translate-y-0'
            : 'opacity-0 pointer-events-none -translate-y-6'
        }`}
      >
        <div className="pt-20">
          <p className="font-mono text-xs text-[#006EFF] tracking-widest uppercase mb-8">
            // NAVIGATION
          </p>

          <nav className="flex flex-col gap-6">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="group flex items-baseline justify-between border-b border-white/10 pb-4 text-3xl sm:text-4xl font-extrabold text-[#F3F5F7] tracking-tight hover:text-[#006EFF] transition-colors"
              >
                <span>{link.label}</span>
                <span className="font-mono text-xs text-[#A0A7B1] group-hover:text-[#006EFF]">
                  {link.index}
                </span>
              </a>
            ))}
          </nav>
        </div>

        {/* Mobile Menu Footer */}
        <div className="pt-8 border-t border-white/10">
          <p className="text-xl font-bold text-white mb-2">
            Let's build something <span className="text-[#006EFF]">useful.</span>
          </p>
          <a
            href="mailto:krishnaprasadvyas@gmail.com"
            className="font-mono text-sm text-[#A0A7B1] hover:text-[#006EFF] transition-colors block"
          >
            krishnaprasadvyas@gmail.com
          </a>
          <p className="font-mono text-xs text-white/40 mt-4">
            © 2026 KMAI.tech • All rights reserved
          </p>
        </div>
      </div>
    </>
  );
};
