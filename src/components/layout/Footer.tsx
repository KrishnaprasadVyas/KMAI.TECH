import React from 'react';
import { GeometricK } from '../common/GeometricK';

import type { CursorVariant } from '../common/CustomCursor';

interface FooterProps {
  onCursorChange?: (variant: CursorVariant, text?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onCursorChange }) => {
  const scrollToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer data-theme="dark" className="w-full py-16 sm:py-20 px-6 sm:px-10 md:px-16 border-t border-white/[0.08] bg-[#07090E]">
      <div className="w-full max-w-[1540px] mx-auto flex flex-col md:flex-row md:items-center justify-between gap-8">
        {/* Brand & Direct Links */}
        <div className="flex items-center gap-4">
          <GeometricK size={24} theme="dark" />
          <span className="font-display font-bold text-lg text-white">
            KMAI
          </span>
          <span className="text-white/20">•</span>
          <span className="font-body text-sm text-[#8E939E]">
            Creative Technology Studio
          </span>
        </div>

        {/* Footer Navigation */}
        <div className="flex flex-wrap items-center gap-8">
          <a
            href="#work"
            className="font-body text-sm text-[#8E939E] hover:text-white transition-colors"
            onMouseEnter={() => onCursorChange?.('button')}
            onMouseLeave={() => onCursorChange?.('default')}
          >
            Work
          </a>
          <a
            href="#services"
            className="font-body text-sm text-[#8E939E] hover:text-white transition-colors"
            onMouseEnter={() => onCursorChange?.('button')}
            onMouseLeave={() => onCursorChange?.('default')}
          >
            Services
          </a>
          <a
            href="#about"
            className="font-body text-sm text-[#8E939E] hover:text-white transition-colors"
            onMouseEnter={() => onCursorChange?.('button')}
            onMouseLeave={() => onCursorChange?.('default')}
          >
            Studio
          </a>
          <a
            href="#contact"
            className="font-body text-sm text-[#8E939E] hover:text-white transition-colors"
            onMouseEnter={() => onCursorChange?.('button')}
            onMouseLeave={() => onCursorChange?.('default')}
          >
            Contact
          </a>
          <a
            href="#"
            onClick={scrollToTop}
            className="font-body text-sm text-white/50 hover:text-white transition-colors"
            onMouseEnter={() => onCursorChange?.('button')}
            onMouseLeave={() => onCursorChange?.('default')}
          >
            Back to top ↑
          </a>
        </div>

        {/* Copyright */}
        <div>
          <span className="font-body text-xs text-[#8E939E]">
            © {new Date().getFullYear()} KMAI. All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  );
};
