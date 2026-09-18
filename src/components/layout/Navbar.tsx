import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { GeometricK } from '../common/GeometricK';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: 'Work', href: '#work' },
    { label: 'Capabilities', href: '#capabilities' },
    { label: 'Personnel', href: '#personnel' },
    { label: 'Intake', href: '#contact' },
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
        className={`fixed top-0 left-0 w-full z-[9000] transition-colors duration-200 h-16 md:h-20 flex items-center border-b ${
          scrolled
            ? 'bg-[#F3EFE7]/95 backdrop-blur-sm border-[#15130F]/20'
            : 'bg-[#F3EFE7] border-[#15130F]/15'
        }`}
      >
        <div className="w-full max-w-[1540px] mx-auto px-6 sm:px-10 md:px-16 flex items-center justify-between">
          {/* Brand Spec Header */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-3 select-none group"
          >
            <GeometricK size={20} theme="light" />
            <div className="flex items-baseline gap-2">
              <span className="font-serif font-semibold text-lg md:text-xl tracking-tight text-[#15130F]">
                KMAI
              </span>
              <span className="font-mono text-[10px] text-[#636059] uppercase tracking-wider hidden sm:inline">
                SPEC // STUDIO
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <div className="flex items-center gap-7">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="font-sans text-sm text-[#15130F]/80 hover:text-[#15130F] hover:underline underline-offset-4 decoration-[#FF3B1F] decoration-1 transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Redline Spec Inquiry Action */}
            <a
              href="#contact"
              onClick={(e) => handleLinkClick(e, '#contact')}
              className="relative inline-flex items-center gap-2 px-4 py-1.5 border border-[#15130F] bg-transparent hover:bg-[#15130F] text-[#15130F] hover:text-[#F3EFE7] font-mono text-xs tracking-wider uppercase transition-all duration-150"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF3B1F]" />
              <span>Start Project</span>
            </a>
          </nav>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-9 h-9 border border-[#15130F]/30 flex items-center justify-center text-[#15130F] focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      <div
        className={`fixed inset-0 z-[8999] bg-[#F3EFE7] flex flex-col justify-between p-8 sm:p-12 transition-all duration-300 md:hidden border-b border-[#15130F] ${
          mobileMenuOpen
            ? 'opacity-100 pointer-events-auto translate-y-0'
            : 'opacity-0 pointer-events-none -translate-y-4'
        }`}
      >
        <div className="pt-20 space-y-6">
          <div className="font-mono text-xs text-[#636059] tracking-widest uppercase border-b border-[#15130F]/15 pb-2">
            INDEX DIRECTORY
          </div>
          <div className="space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="block font-serif text-3xl text-[#15130F] hover:text-[#FF3B1F] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        <div className="border-t border-[#15130F]/15 pt-6 flex justify-between items-end font-mono text-xs text-[#636059]">
          <span>KMAI STUDIO // MUMBAI & PUNE</span>
          <span className="text-[#FF3B1F]">REV 2026.04</span>
        </div>
      </div>
    </>
  );
};
