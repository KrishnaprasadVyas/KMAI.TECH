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
      setScrolled(window.scrollY > 30);
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
    { label: 'Services', href: '#services' },
    { label: 'Studio', href: '#about' },
    { label: 'Contact', href: '#contact' },
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
        className={`fixed top-0 left-0 w-full z-[9000] transition-all duration-300 h-20 md:h-24 flex items-center ${
          scrolled
            ? 'bg-[#07090E]/85 backdrop-blur-md border-b border-white/[0.05]'
            : 'bg-transparent'
        }`}
      >
        <div className="w-full max-w-[1540px] mx-auto px-6 sm:px-10 md:px-16 flex items-center justify-between">
          {/* Brandmark */}
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
            <GeometricK size={22} theme="dark" />
            <span className="font-display font-bold text-lg md:text-xl tracking-tight text-white group-hover:text-[#216BFF] transition-colors">
              KMAI
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="font-body text-[15px] font-normal text-[#8E939E] hover:text-white transition-colors duration-200"
                onMouseEnter={() => onCursorChange?.('button')}
                onMouseLeave={() => onCursorChange?.('default')}
              >
                {link.label}
              </a>
            ))}

            <a
              href="#contact"
              onClick={(e) => handleLinkClick(e, '#contact')}
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-[2px] bg-white hover:bg-[#216BFF] text-[#07090E] hover:text-white font-body text-[14px] font-medium tracking-normal transition-all duration-200"
              onMouseEnter={() => onCursorChange?.('button')}
              onMouseLeave={() => onCursorChange?.('default')}
            >
              Start a project
            </a>
          </nav>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-10 h-10 rounded-[2px] flex items-center justify-center text-white focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      {/* Fullscreen Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-[8999] bg-[#07090E] flex flex-col justify-between p-8 sm:p-12 transition-all duration-300 md:hidden ${
          mobileMenuOpen
            ? 'opacity-100 pointer-events-auto translate-y-0'
            : 'opacity-0 pointer-events-none -translate-y-4'
        }`}
      >
        <div className="pt-24 space-y-6">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className="block font-display text-4xl font-bold text-white hover:text-[#216BFF] transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="pt-8 border-t border-white/[0.08]">
          <a
            href="#contact"
            onClick={(e) => handleLinkClick(e, '#contact')}
            className="block text-center py-4 rounded-[2px] bg-white text-[#07090E] font-medium text-base hover:bg-[#216BFF] hover:text-white transition-colors"
          >
            Start a project
          </a>
        </div>
      </div>
    </>
  );
};
