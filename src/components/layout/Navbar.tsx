import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

interface NavbarProps {
  onCursorChange?: (variant: 'default' | 'button' | 'project' | 'image' | 'footer', text?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onCursorChange }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isHomepage = location.pathname === '/';

  const [scrolled, setScrolled] = useState(!isHomepage);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!isHomepage) {
        setScrolled(true);
      } else {
        setScrolled(window.scrollY > 40);
      }
    };

    handleScroll(); // Init
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHomepage]);

  // Lock body scroll when menu is active
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && menuOpen) {
        setMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [menuOpen]);

  // Using /# for cross-page compatibility
  const navLinks = [
    { label: 'WORK', href: '/#work', index: '01' },
    { label: 'SERVICES', href: '/#services', index: '02' },
    { label: 'ABOUT', href: '/#about', index: '03' },
    { label: 'CONTACT', href: '/#contact', index: '04' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMenuOpen(false);
    
    const isHash = href.startsWith('/#');
    const hashTarget = isHash ? href.substring(2) : '';

    if (isHash) {
      if (location.pathname === '/') {
        const targetElement = document.getElementById(hashTarget);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        // We are on an inner page, route to home and pass hash
        navigate(href);
      }
    } else {
      navigate(href);
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-[9000] transition-all duration-500 ${
          scrolled
            ? 'bg-[#08111F]/80 backdrop-blur-md border-b border-white/5 py-3 md:py-4 shadow-[0_10px_30px_rgba(0,0,0,0.5)]'
            : 'bg-transparent py-5 md:py-6 lg:py-8'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo / Brandmark */}
          <a
            href="/"
            onClick={(e) => {
              if (isHomepage) {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
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

          {/* Right Side Control Wrapper */}
          <div className="relative flex items-center justify-end min-h-[44px]">
            {/* Inline Navigation (Desktop >= 1024px, Visible only when scrolled) */}
            <nav 
              className={`hidden lg:flex items-center gap-7 transition-all duration-500 origin-right ${
                scrolled ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none absolute right-0'
              }`}
            >
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
                href="/start-a-project"
                onClick={(e) => handleLinkClick(e, '/start-a-project')}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#006EFF]/40 hover:border-[#006EFF] bg-[#006EFF]/10 hover:bg-[#006EFF] text-[11px] font-mono text-white tracking-widest transition-all duration-300 shadow-[0_0_20px_rgba(0,110,255,0.2)] hover:shadow-[0_0_25px_rgba(0,110,255,0.6)]"
                onMouseEnter={() => onCursorChange?.('button')}
                onMouseLeave={() => onCursorChange?.('default')}
              >
                <span>START A PROJECT</span>
                <ArrowUpRight size={14} className="text-[#38BDF8] group-hover:text-white" />
              </a>
            </nav>

            {/* Menu Trigger Button (Always visible < 1024px, Visible on Desktop when !scrolled) */}
            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              className={`relative w-11 h-11 rounded-full border border-white/10 bg-[#08111F] flex items-center justify-center text-white transition-all duration-500 ${
                scrolled ? 'lg:opacity-0 lg:pointer-events-none lg:absolute lg:right-0 lg:scale-75' : 'opacity-100 scale-100'
              }`}
              aria-label="Toggle navigation menu"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              onMouseEnter={() => onCursorChange?.('button')}
              onMouseLeave={() => onCursorChange?.('default')}
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen Menu Overlay (Now used for both Mobile and Desktop Option B) */}
      <div
        id="mobile-menu"
        className={`fixed inset-0 z-[8999] bg-[#05070B] flex flex-col justify-between p-8 md:p-16 lg:p-24 transition-all duration-500 ${
          menuOpen
            ? 'opacity-100 pointer-events-auto translate-y-0'
            : 'opacity-0 pointer-events-none -translate-y-6'
        }`}
      >
        <div className="pt-20 max-w-4xl mx-auto w-full">
          <p className="font-mono text-xs text-[#006EFF] tracking-widest uppercase mb-8 md:mb-12">
            // NAVIGATION
          </p>

          <nav className="flex flex-col gap-6 md:gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="group flex items-baseline justify-between border-b border-white/10 pb-4 md:pb-6 text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#F3F5F7] tracking-tight hover:text-[#006EFF] transition-colors"
                onMouseEnter={() => onCursorChange?.('button')}
                onMouseLeave={() => onCursorChange?.('default')}
              >
                <span>{link.label}</span>
                <span className="font-mono text-xs md:text-sm text-[#A0A7B1] group-hover:text-[#006EFF]">
                  {link.index}
                </span>
              </a>
            ))}
            
            <a
              href="/start-a-project"
              onClick={(e) => handleLinkClick(e, '/start-a-project')}
              className="group flex items-baseline justify-between border-b border-white/10 pb-4 md:pb-6 text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#F3F5F7] tracking-tight hover:text-[#006EFF] transition-colors"
              onMouseEnter={() => onCursorChange?.('button')}
              onMouseLeave={() => onCursorChange?.('default')}
            >
              <span className="flex items-center gap-4">
                START A PROJECT <ArrowUpRight size={28} className="hidden sm:block text-[#38BDF8] group-hover:text-[#006EFF]" />
              </span>
              <span className="font-mono text-xs md:text-sm text-[#A0A7B1] group-hover:text-[#006EFF]">
                05
              </span>
            </a>
          </nav>
        </div>

        {/* Menu Footer */}
        <div className="pt-8 border-t border-white/10 max-w-4xl mx-auto w-full flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <p className="text-xl font-bold text-white mb-2">
              Let's build something <span className="text-[#006EFF]">useful.</span>
            </p>
            <a
              href="mailto:krishnaprasadvyas@gmail.com"
              className="font-mono text-sm text-[#A0A7B1] hover:text-[#006EFF] transition-colors block"
            >
              krishnaprasadvyas@gmail.com
            </a>
          </div>
          <p className="font-mono text-xs text-white/40">
            © 2026 KMAI.tech • All rights reserved
          </p>
        </div>
      </div>
    </>
  );
};
