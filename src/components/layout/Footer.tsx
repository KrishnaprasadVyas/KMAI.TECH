import React from 'react';
import { GeometricK } from '../common/GeometricK';

export const Footer: React.FC = () => {
  const scrollToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full py-12 sm:py-16 px-6 sm:px-10 md:px-16 border-t border-[#15130F]/15 bg-[#F3EFE7] text-[#15130F]">
      <div className="w-full max-w-[1540px] mx-auto flex flex-col md:flex-row md:items-center justify-between gap-8 font-mono text-xs">
        {/* Brand Colophon */}
        <div className="flex items-center gap-3">
          <GeometricK size={20} theme="light" />
          <div className="flex items-baseline gap-2">
            <span className="font-serif font-semibold text-lg text-[#15130F]">
              KMAI
            </span>
            <span className="text-[#636059] text-[11px]">
              // TECHNICAL SPECIFICATION STUDIO
            </span>
          </div>
        </div>

        {/* Technical Colophon Metadata */}
        <div className="flex flex-wrap items-center gap-6 text-[11px] text-[#636059]">
          <span>MUMBAI &amp; PUNE</span>
          <span className="text-[#FF3B1F]">SPEC SHEET REV 2026.04</span>
          <span>&copy; {new Date().getFullYear()} KMAI</span>
          <a
            href="#"
            onClick={scrollToTop}
            className="text-[#15130F] hover:text-[#FF3B1F] border-b border-[#15130F] hover:border-[#FF3B1F] pb-0.5 uppercase tracking-wider transition-colors"
          >
            TOP &uarr;
          </a>
        </div>
      </div>
    </footer>
  );
};
