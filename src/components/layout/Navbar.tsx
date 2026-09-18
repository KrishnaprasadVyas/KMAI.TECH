import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { GeometricK } from '../common/GeometricK';

interface NavbarProps {
  onCursorChange?: (variant: 'default' | 'button' | 'project' | 'image' | 'footer', text?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onCursorChange }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
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
    { label: '01 // WORK', href: '#work' },
    { label: '02 // SERVICES', href: '#services' },
    { label: '03 // ABOUT', href: '#about' },
    { label: '04 // CONTACT', href: '#contact' },
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
        className={`fixed top-0 left-0 w-full z-[9000] transition-all duration-300 ${
          scrolled
            ? 'bg-[#08090C]/90 backdrop-blur-md border-b border-white/8 py-3.5'
            : 'bg-transparent border-b border-transparent py-6'
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
            <div className="w-8 h-8 rounded-lg bg-[#0E1015] border border-white/10 flex items-center justify-center group-hover:border-[#0066FF] transition-colors duration-200">
              <GeometricK size={18} glow={false} variant="badge" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-sm md:text-base tracking-tight text-white group-hover:text-[#F5F6F8] leading-none">
                KMAI<span className="text-[#0066FF] font-mono text-xs ml-0.5">.tech</span>
              </span>
              <span className="font-mono text-[9px] text-[#8A92A0] tracking-widest uppercase mt-0.5">
                STUDIO // PUNE &amp; MUMBAI
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="font-mono text-xs tracking-wider text-[#8A92A0] hover:text-white transition-colors duration-200 py-1"
                onMouseEnter={() => onCursorChange?.('button')}
                onMouseLeave={() => onCursorChange?.('default')}
              >
                <span>{link.label}</span>
              </a>
            ))}

            <a
              href="#contact"
              onClick={(e) => handleLinkClick(e, '#contact')}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/15 hover:border-[#0066FF] bg-[#0E1015] hover:bg-[#0066FF] text-[11px] font-mono text-white tracking-wider transition-colors duration-200"
              onMouseEnter={() => onCursorChange?.('button')}
              onMouseLeave={() => onCursorChange?.('default')}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#0066FF] group-hover:bg-white" />
              <span>COMMISSION</span>
              <ArrowUpRight size={12} className="text-[#8A92A0]" />
            </a>
          </nav>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden relative w-10 h-10 rounded-lg border border-white/10 bg-[#0E1015] flex items-center justify-center text-white"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </header>

      {/* Fullscreen Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-[8999] bg-[#08090C] flex flex-col justify-between p-8 sm:p-12 transition-all duration-400 md:hidden ${
          mobileMenuOpen
            ? 'opacity-100 pointer-events-auto translate-y-0'
            : 'opacity-0 pointer-events-none -translate-y-4'
        }`}
      >
        <div className="pt-24">
          <p className="font-mono text-xs text-[#0066FF] tracking-widest uppercase mb-8">
            // STUDIO DIRECTORY
          </p>

          <nav className="flex flex-col gap-6">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="flex items-baseline justify-between border-b border-white/10 pb-4 text-3xl font-extrabold text-[#F5F6F8] tracking-tight hover:text-[#0066FF] transition-colors"
              >
                <span>{link.label}</span>
              </a>
            ))}
          </nav>
        </div>

        {/* Mobile Menu Footer */}
        <div className="pt-8 border-t border-white/10 font-mono text-xs text-[#8A92A0] space-y-2">
          <div className="flex items-center gap-2 text-white">
            <span className="w-2 h-2 rounded-full bg-[#0066FF]" />
            <span>KMAI.tech // CREATIVE TECHNOLOGY STUDIO</span>
          </div>
          <p>Pune &amp; Mumbai, India • GMT +5:30</p>
          <a
            href="mailto:krishnaprasadvyas@gmail.com"
            className="text-[#F5F6F8] underline block pt-2"
          >
            krishnaprasadvyas@gmail.com
          </a>
        </div>
      </div>
    </>
  );
};
