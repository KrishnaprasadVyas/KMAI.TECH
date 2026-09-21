import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { usePrefersReducedMotion } from '../../hooks/useMediaQuery';
import type { CursorVariant } from '../common/CustomCursor';
import { GeometricK } from '../common/GeometricK';
import { scrollToTarget } from '../../utils/scroll';

function useWindowHeight() {
  const [H, setH] = useState(0);
  useEffect(() => { setH(window.innerHeight); }, []);
  return H;
}

interface SidebarNavProps {
  isOpen: boolean;
  onClose: () => void;
  onCursorChange?: (variant: CursorVariant, text?: string) => void;
}

interface NavItem { title: string; href: string; }

const NAV_ITEMS: NavItem[] = [
  { title: 'Home',         href: '#hero'         },
  { title: 'Work',         href: '#work'         },
  { title: 'Capabilities', href: '#services'     },
  { title: 'Studio',       href: '#about'        },
  { title: 'Process',      href: '#process'      },
  { title: 'Testimonials', href: '#testimonials' },
  { title: 'Contact',      href: '#contact'      },
  { title: 'Start a Project', href: '/start-a-project' },
];

export const SidebarNav: React.FC<SidebarNavProps> = ({ isOpen, onClose, onCursorChange }) => {
  const navigate     = useNavigate();
  const drawerRef    = useRef<HTMLDivElement>(null);
  const pathRef      = useRef<SVGPathElement>(null);
  const backdropRef  = useRef<HTMLDivElement>(null);
  const linksRef     = useRef<(HTMLAnchorElement | null)[]>([]);
  const [activeHoverIdx, setActiveHoverIdx] = useState<number | null>(null);

  const prefersReduced = usePrefersReducedMotion();
  const winH = useWindowHeight();

  // ── SVG constants ────────────────────────────────────────────────────────
  // Width of the SVG "cap" that creates the curved left edge of the sidebar.
  // 200px gives enough canvas for the curve to be clearly visible.
  const CAP_W = 200;

  useEffect(() => {
    if (winH === 0) return;
    const drawer   = drawerRef.current;
    const path     = pathRef.current;
    const backdrop = backdropRef.current;
    if (!drawer || !path || !backdrop) return;

    const H = winH;

    // initialPath: smooth organic curve on desktop entry
    // flatPath: straight vertical edge
    const curved = `M${CAP_W} 0 L${CAP_W} ${H} Q0 ${H / 2} ${CAP_W} 0`;
    const flat   = `M${CAP_W} 0 L${CAP_W} ${H} Q${CAP_W} ${H / 2} ${CAP_W} 0`;

    const OPEN_DUR  = prefersReduced ? 0.01 : 0.85;
    const CLOSE_DUR = prefersReduced ? 0.01 : 0.65;

    if (isOpen) {
      document.body.style.overflow = 'hidden';

      // Backdrop
      gsap.set(backdrop, { display: 'block', opacity: 0 });
      gsap.to(backdrop, { opacity: 1, duration: prefersReduced ? 0.01 : 0.45, ease: 'power2.out' });

      // Drawer starts off-screen right
      gsap.set(drawer, { display: 'flex', x: '100%' });
      gsap.set(path,   { attr: { d: curved } });

      const tl = gsap.timeline();

      // Drawer slides in with power3.out
      tl.to(drawer, { x: 0, duration: OPEN_DUR, ease: 'power3.out' }, 0);

      // Curve flattens smoothly as drawer settles
      tl.to(path, { attr: { d: flat }, duration: OPEN_DUR * 0.75, ease: 'power2.out' }, OPEN_DUR * 0.15);

      // Links stagger in after drawer settles
      const linkEls = linksRef.current.filter(Boolean);
      tl.fromTo(linkEls,
        { x: 40, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5, stagger: 0.04, ease: 'power3.out' },
        OPEN_DUR * 0.4
      );
    } else {
      document.body.style.overflow = '';

      const tl = gsap.timeline({
        onComplete: () => {
          gsap.set(drawer,   { display: 'none' });
          gsap.set(backdrop, { display: 'none' });
        },
      });

      // Keep edge FLAT on exit/shrink — no bulging or ugly shrinking curve
      gsap.set(path, { attr: { d: flat } });
      tl.to(backdrop, { opacity: 0, duration: CLOSE_DUR * 0.8, ease: 'power2.in' }, 0);
      tl.to(drawer, { x: '100%', duration: CLOSE_DUR, ease: 'power3.inOut' }, 0);
    }
  }, [isOpen, prefersReduced, winH]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => { if (e.key === 'Escape' && isOpen) onClose(); };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    onClose();
    if (href.startsWith('#')) {
      if (window.location.pathname !== '/') {
        navigate('/' + href);
      } else {
        scrollToTarget(href);
      }
    } else {
      navigate(href);
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        ref={backdropRef}
        onClick={onClose}
        className="fixed inset-0 z-[9500] bg-black/50 backdrop-blur-sm hidden will-change-[opacity] pointer-events-auto cursor-pointer"
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        ref={drawerRef}
        data-theme="dark"
        className="fixed top-0 right-0 h-screen w-full sm:w-[480px] md:w-[520px] bg-[#0E1015] text-[#F2F0EA] z-[9600] flex flex-col justify-between p-10 sm:p-14 md:p-16 hidden will-change-transform shadow-2xl pointer-events-auto"
      >
        {/* ── Curved SVG left cap — only on desktop (lg+), hidden when shrunk ────────────────── */}
        <svg
          className="hidden lg:block absolute top-0 h-full pointer-events-none fill-[#0E1015]"
          style={{ left: `-${CAP_W - 1}px`, width: `${CAP_W}px` }}
          viewBox={`0 0 ${CAP_W} ${winH || 900}`}
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            ref={pathRef}
            d={`M${CAP_W} 0 L${CAP_W} ${winH || 900} Q${CAP_W} ${(winH || 900) / 2} ${CAP_W} 0`}
          />
        </svg>

        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-6">
          <span className="font-body text-xs font-semibold uppercase tracking-[0.25em] text-[#8E939E]">
            Navigation
          </span>
          <GeometricK size={18} theme="dark" />
        </div>

        {/* Nav links */}
        <nav className="flex flex-col gap-4 sm:gap-6 my-auto pt-6">
          {NAV_ITEMS.map((item, idx) => (
            <div key={item.title} className="relative flex items-center">
              <span
                className={`inline-block w-2 h-2 rounded-full bg-[#216BFF] mr-4 transition-all duration-300 ${
                  activeHoverIdx === idx ? 'scale-100 opacity-100' : 'scale-0 opacity-0 -ml-2'
                }`}
              />
              <a
                ref={(el) => { linksRef.current[idx] = el; }}
                href={item.href}
                onClick={(e) => handleLinkClick(e, item.href)}
                onMouseEnter={() => { setActiveHoverIdx(idx); onCursorChange?.('button'); }}
                onMouseLeave={() => { setActiveHoverIdx(null); onCursorChange?.('default'); }}
                className="font-display font-bold text-3xl xs:text-4xl sm:text-5xl uppercase tracking-[-0.03em] text-[#F2F0EA] hover:text-[#216BFF] transition-colors leading-[1.1] select-none cursor-pointer pointer-events-auto"
              >
                {item.title}
              </a>
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div className="border-t border-white/10 pt-6 space-y-3">
          <div className="flex items-center justify-between font-body text-xs text-[#8E939E]">
            <span>KMAI STUDIO</span>
            <span>EDITION 2026</span>
          </div>
          <div className="flex items-center justify-between font-body text-xs text-white/80">
            <span>Direct Reach</span>
            <a href="mailto:contact@kmai.tech" className="text-white hover:text-[#216BFF] transition-colors pointer-events-auto cursor-pointer">
              contact@kmai.tech
            </a>
          </div>
        </div>
      </div>
    </>
  );
};
