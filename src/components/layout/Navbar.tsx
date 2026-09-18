import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { GeometricK } from '../common/GeometricK';

interface NavbarProps {
  onCursorChange?: (variant: 'default' | 'button' | 'project' | 'image' | 'footer', text?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onCursorChange }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
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
    { label: 'WORK', href: '#work' },
    { label: 'SERVICES', href: '#services' },
    { label: 'ABOUT', href: '#about' },
    { label: 'CONTACT', href: '#contact' },
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
        className={`fixed top-0 left-0 w-full z-[9000] transition-colors duration-200 h-[68px] md:h-[84px] flex items-center bg-[#F2F0EA] border-b ${
          scrolled ? 'border-[#D6D2C9] shadow-sm' : 'border-[#D6D2C9]/60'
        }`}
      >
        <div className="w-full max-w-[1540px] mx-auto px-5 sm:px-8 md:px-12 flex items-center justify-between">
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
            <GeometricK size={22} theme="light" />
            <span className="font-display font-bold text-base md:text-lg tracking-tight text-[#0A0C0F] group-hover:text-[#216BFF] transition-colors">
              KMAI<span className="font-mono text-xs text-[#73777F] ml-0.5">.tech</span>
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 lg:gap-10">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="font-body text-[14px] font-medium tracking-[0.04em] text-[#0A0C0F] hover:text-[#216BFF] transition-colors duration-150 py-1"
                onMouseEnter={() => onCursorChange?.('button')}
                onMouseLeave={() => onCursorChange?.('default')}
              >
                {link.label}
              </a>
            ))}

            {/* Simple rectangular CTA button (2-4px radius, no pill) */}
            <a
              href="#contact"
              onClick={(e) => handleLinkClick(e, '#contact')}
              className="inline-flex items-center justify-center px-4 py-2 rounded-[2px] bg-[#0A0C0F] hover:bg-[#216BFF] text-white font-body text-[13px] font-medium tracking-wide transition-colors duration-200"
              onMouseEnter={() => onCursorChange?.('button')}
              onMouseLeave={() => onCursorChange?.('default')}
            >
              START A PROJECT →
            </a>
          </nav>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden relative w-10 h-10 rounded-[2px] border border-[#D6D2C9] bg-transparent flex items-center justify-center text-[#0A0C0F]"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </header>

      {/* Fullscreen Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-[8999] bg-[#F2F0EA] flex flex-col justify-between p-6 sm:p-10 transition-all duration-300 md:hidden ${
          mobileMenuOpen
            ? 'opacity-100 pointer-events-auto translate-y-0'
            : 'opacity-0 pointer-events-none -translate-y-4'
        }`}
      >
        <div className="pt-20">
          <span className="font-mono text-[11px] text-[#73777F] tracking-widest uppercase block mb-8">
            NAVIGATION
          </span>

          <nav className="flex flex-col gap-5">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="flex items-baseline justify-between border-b border-[#D6D2C9] pb-3 text-2xl font-display font-bold text-[#0A0C0F] hover:text-[#216BFF] transition-colors"
              >
                <span>{link.label}</span>
              </a>
            ))}
          </nav>
        </div>

        {/* Mobile Menu Bottom CTA */}
        <div className="pt-6 border-t border-[#D6D2C9] space-y-4">
          <a
            href="#contact"
            onClick={(e) => handleLinkClick(e, '#contact')}
            className="w-full py-3.5 rounded-[2px] bg-[#0A0C0F] text-white font-body text-sm font-medium tracking-wide flex items-center justify-center transition-colors"
          >
            START A PROJECT →
          </a>
          <p className="font-mono text-[11px] text-[#73777F]">
            Pune &amp; Mumbai, India
          </p>
        </div>
      </div>
    </>
  );
};
