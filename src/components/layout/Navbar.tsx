import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { GeometricK } from '../common/GeometricK';
import { SidebarNav } from './SidebarNav';
import type { CursorVariant } from '../common/CustomCursor';

interface NavbarProps {
  onCursorChange?: (variant: CursorVariant, text?: string) => void;
  isIntroActive?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ onCursorChange, isIntroActive = false }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isOverDarkSection, setIsOverDarkSection] = useState(false);
  const [mounted, setMounted] = useState(false);

  const ctaWrapRef = useRef<HTMLAnchorElement>(null);
  const ctaBubbleRef = useRef<HTMLDivElement>(null);
  const ctaContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => { setMounted(true); }, []);

  // Dark section detection with 160px buffer before contact (catches CurvedHorizon arch)
  useEffect(() => {
    const handleScroll = () => {
      const darkSelectors = ['#manifesto', '#contact', 'footer'];
      const checkY = window.scrollY + 40;
      let overDark = false;
      for (const sel of darkSelectors) {
        const el = document.querySelector(sel);
        if (el) {
          const rect = el.getBoundingClientRect();
          const top = rect.top + window.scrollY;
          const bottom = top + rect.height;
          const bufferTop = (sel === '#contact' || sel === 'footer') ? top - 160 : top;
          if (checkY >= bufferTop && checkY <= bottom) { overDark = true; break; }
        }
      }
      setIsOverDarkSection(overDark);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ── Slime Magnetic Physics for CTA ──────────────────────────────────────────
  useEffect(() => {
    const wrap = ctaWrapRef.current;
    const bubble = ctaBubbleRef.current;
    const content = ctaContentRef.current;
    if (!wrap || !bubble || !content) return;

    let isHovering = false;

    const onMouseMove = (e: MouseEvent) => {
      const rect = wrap.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const dx = e.clientX - centerX;
      const dy = e.clientY - centerY;
      const dist = Math.hypot(dx, dy);

      // Trigger radius: 110px from button center
      if (dist < 110) {
        if (!isHovering) {
          isHovering = true;
          onCursorChange?.('button');
        }

        const angle = Math.atan2(dy, dx) * (180 / Math.PI);
        // Magnetic pull offset
        const moveX = dx * 0.42;
        const moveY = dy * 0.42;

        // Viscous slime stretch: stretches towards cursor, squashes perpendicularly
        const stretch = 1 + Math.min(dist * 0.0032, 0.28);
        const squash = 1 - Math.min(dist * 0.0022, 0.16);

        gsap.to(wrap, {
          x: moveX,
          y: moveY,
          duration: 0.25,
          ease: 'power2.out',
          overwrite: 'auto',
        });

        // Bubble deforms like slime along pull angle
        gsap.to(bubble, {
          rotation: angle,
          scaleX: stretch,
          scaleY: squash,
          duration: 0.3,
          ease: 'power2.out',
          overwrite: 'auto',
        });

        // Counter-rotate inner content so 'BEGIN' text stays upright and readable
        gsap.to(content, {
          rotation: -angle,
          duration: 0.3,
          ease: 'power2.out',
          overwrite: 'auto',
        });
      } else if (isHovering) {
        handleLeave();
      }
    };

    const handleLeave = () => {
      isHovering = false;
      onCursorChange?.('default');

      // Elastic gel snap-back
      gsap.to(wrap, {
        x: 0,
        y: 0,
        duration: 1.0,
        ease: 'elastic.out(1.2, 0.35)',
        overwrite: 'auto',
      });

      gsap.to(bubble, {
        rotation: 0,
        scaleX: 1,
        scaleY: 1,
        duration: 1.0,
        ease: 'elastic.out(1.2, 0.35)',
        overwrite: 'auto',
      });

      gsap.to(content, {
        rotation: 0,
        duration: 1.0,
        ease: 'elastic.out(1.2, 0.35)',
        overwrite: 'auto',
      });
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    wrap.addEventListener('mouseleave', handleLeave);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      wrap.removeEventListener('mouseleave', handleLeave);
    };
  }, [onCursorChange]);

  const scrollToSection = (href: string) => {
    setSidebarOpen(false);
    if (href === '#' || href === '/') {
      if (window.location.pathname !== '/') {
        window.location.href = '/';
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      return;
    }
    if (href.startsWith('#')) {
      if (window.location.pathname !== '/') {
        window.location.href = '/' + href;
      } else {
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }
    window.location.href = href;
  };

  const visible = mounted && !isIntroActive;

  const SIDEBAR_DUR_MS = 850;
  const K_DELAY_MS     = 350;
  const K_IN_DUR_MS    = 300;
  const K_OUT_DUR_MS   = 180;

  return (
    <header role="banner" className="fixed top-0 left-0 w-full h-16 pointer-events-none z-[9700]">
      {/* ── Brand mark — KMAI text only, placed slightly right ── */}
      <a
        href="/"
        onClick={(e) => { e.preventDefault(); scrollToSection('/'); }}
        aria-label="KMAI Home"
        className={`fixed top-6 left-8 sm:left-10 md:left-14 lg:left-16 z-[9700] select-none transition-opacity duration-500 group ${
          visible ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onMouseEnter={() => onCursorChange?.('button')}
        onMouseLeave={() => onCursorChange?.('default')}
      >
        <span
          className={`font-poppins font-black text-[17px] sm:text-[19px] tracking-[-0.03em] uppercase transition-colors duration-300 ${
            isOverDarkSection ? 'text-white' : 'text-[#0A0C0F]'
          } group-hover:text-[#216BFF]`}
        >
          KMAI
        </span>
      </a>

      {/* ── K-morph burger — top-right, synced with sidebar ─────────── */}
      <div
        className={`fixed top-5 right-5 sm:top-7 sm:right-7 md:top-8 md:right-10 z-[9700] transition-opacity duration-500 ${
          visible ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <button
          type="button"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          onMouseEnter={() => onCursorChange?.('button')}
          onMouseLeave={() => onCursorChange?.('default')}
          className={`relative w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center cursor-pointer shadow-lg border overflow-hidden ${
            sidebarOpen
              ? 'bg-[#216BFF] border-[#216BFF]'
              : isOverDarkSection
              ? 'bg-white/10 hover:bg-white/20 border-white/20 backdrop-blur-md'
              : 'bg-[#0A0C0F] hover:bg-[#216BFF] border-black/10'
          }`}
          style={{ transition: `background-color ${SIDEBAR_DUR_MS}ms cubic-bezier(0.16,1,0.3,1), border-color ${SIDEBAR_DUR_MS}ms cubic-bezier(0.16,1,0.3,1)` }}
          aria-label={sidebarOpen ? 'Close navigation' : 'Open navigation'}
        >
          {/* Two burger bars — fade out immediately when opening */}
          <span
            className="absolute inset-0 flex flex-col items-center justify-center gap-[7px]"
            style={{
              opacity: sidebarOpen ? 0 : 1,
              transform: sidebarOpen ? 'scale(0.7)' : 'scale(1)',
              transition: sidebarOpen
                ? `opacity ${K_OUT_DUR_MS}ms ease, transform ${K_OUT_DUR_MS}ms ease`
                : `opacity ${K_IN_DUR_MS}ms ease ${K_DELAY_MS}ms, transform ${K_IN_DUR_MS}ms ease ${K_DELAY_MS}ms`,
            }}
          >
            <span className="block w-5 h-[1.5px] bg-white" />
            <span className="block w-5 h-[1.5px] bg-white" />
          </span>

          {/* GeometricK — fades in after sidebar has entered viewport */}
          <span
            className="absolute inset-0 flex items-center justify-center"
            style={{
              opacity: sidebarOpen ? 1 : 0,
              transform: sidebarOpen ? 'scale(1)' : 'scale(0.5)',
              transition: sidebarOpen
                ? `opacity ${K_IN_DUR_MS}ms ease ${K_DELAY_MS}ms, transform ${K_IN_DUR_MS}ms ease ${K_DELAY_MS}ms`
                : `opacity ${K_OUT_DUR_MS}ms ease, transform ${K_OUT_DUR_MS}ms ease`,
            }}
          >
            <GeometricK size={20} theme="dark" />
          </span>
        </button>
      </div>

      {/* ── Slime Magnetic CTA — BEGIN (bottom-right, desktop only) ── */}
      <a
        ref={ctaWrapRef}
        href="#contact"
        onClick={(e) => { e.preventDefault(); scrollToSection('#contact'); }}
        className={`fixed bottom-9 right-9 z-[8900] hidden md:flex items-center justify-center select-none cursor-pointer will-change-transform transition-opacity duration-500 ${
          visible ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        style={{ width: 88, height: 88 }}
        aria-label="Begin project conversation"
      >
        {/* Slime Deforming Bubble Body */}
        <div
          ref={ctaBubbleRef}
          className="w-full h-full rounded-full bg-[#216BFF] flex items-center justify-center will-change-transform"
          style={{
            boxShadow: '0 14px 40px rgba(33,107,255,0.48), 0 2px 10px rgba(33,107,255,0.3)',
          }}
        >
          {/* Inner Content — Counter-rotated so text stays upright */}
          <div
            ref={ctaContentRef}
            className="flex flex-col items-center justify-center will-change-transform select-none"
          >
            {/* Minimalist Arrow */}
            <svg
              width="17"
              height="17"
              viewBox="0 0 24 24"
              fill="none"
              className="text-white mb-0.5"
            >
              <path
                d="M7 17L17 7M17 7H9M17 7V15"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            {/* Stylized Poppins typography: BEGIN */}
            <span className="font-poppins font-black text-[11px] uppercase tracking-[0.22em] text-white leading-none">
              BEGIN
            </span>
          </div>
        </div>
      </a>

      {/* ── Sidebar ───────────────────────────────────────────────── */}
      <SidebarNav
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onCursorChange={onCursorChange}
      />
    </header>
  );
};
