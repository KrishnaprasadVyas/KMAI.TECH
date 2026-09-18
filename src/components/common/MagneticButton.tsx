import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  magneticStrength?: number;
  onClick?: () => void;
  href?: string;
  target?: string;
  rel?: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  as?: 'button' | 'a';
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  className = '',
  magneticStrength = 0.35,
  onClick,
  href,
  target,
  rel,
  variant = 'primary',
  as = 'button',
  onMouseEnter,
  onMouseLeave,
}) => {
  const buttonRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const element = buttonRef.current;
    if (!element) return;

    // Disable magnetic physics on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const xTo = gsap.quickTo(element, 'x', { duration: 0.8, ease: 'power3.out' });
    const yTo = gsap.quickTo(element, 'y', { duration: 0.8, ease: 'power3.out' });
    
    const contentXTo = contentRef.current
      ? gsap.quickTo(contentRef.current, 'x', { duration: 0.6, ease: 'power2.out' })
      : null;
    const contentYTo = contentRef.current
      ? gsap.quickTo(contentRef.current, 'y', { duration: 0.6, ease: 'power2.out' })
      : null;

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { left, top, width, height } = element.getBoundingClientRect();
      const x = (clientX - (left + width / 2)) * magneticStrength;
      const y = (clientY - (top + height / 2)) * magneticStrength;

      xTo(x);
      yTo(y);

      if (contentXTo && contentYTo) {
        contentXTo(x * 0.4);
        contentYTo(y * 0.4);
      }
    };

    const handleMouseLeaveInner = () => {
      xTo(0);
      yTo(0);
      if (contentXTo && contentYTo) {
        contentXTo(0);
        contentYTo(0);
      }
      onMouseLeave?.();
    };

    const handleMouseEnterInner = () => {
      onMouseEnter?.();
    };

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeaveInner);
    element.addEventListener('mouseenter', handleMouseEnterInner);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeaveInner);
      element.removeEventListener('mouseenter', handleMouseEnterInner);
    };
  }, [magneticStrength, onMouseEnter, onMouseLeave]);

  const variantStyles = {
    primary:
      'bg-[#006EFF] hover:bg-[#1683FF] text-white border border-[#006EFF] shadow-[0_0_30px_rgba(0,110,255,0.35)] hover:shadow-[0_0_45px_rgba(0,110,255,0.6)]',
    secondary:
      'bg-[#0B1F3A] hover:bg-[#11294D] text-white border border-[#162B4C] hover:border-[#006EFF]/50',
    outline:
      'bg-transparent hover:bg-white/5 text-white border border-white/20 hover:border-[#006EFF]',
    ghost:
      'bg-transparent hover:bg-white/5 text-white/80 hover:text-white border border-transparent',
  };

  const baseClasses = `relative inline-flex items-center justify-center font-medium rounded-full transition-colors duration-300 select-none cursor-pointer ${variantStyles[variant]} ${className}`;

  if (as === 'a' && href) {
    return (
      <a
        ref={buttonRef as any}
        href={href}
        target={target}
        rel={rel}
        className={baseClasses}
        onClick={onClick}
      >
        <span ref={contentRef} className="relative z-10 inline-flex items-center gap-2 pointer-events-none">
          {children}
        </span>
      </a>
    );
  }

  return (
    <button
      ref={buttonRef as any}
      type="button"
      className={baseClasses}
      onClick={onClick}
    >
      <span ref={contentRef} className="relative z-10 inline-flex items-center gap-2 pointer-events-none">
        {children}
      </span>
    </button>
  );
};
