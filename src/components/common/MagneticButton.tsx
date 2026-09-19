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
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'dark';
  as?: 'button' | 'a';
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  className = '',
  magneticStrength = 0.28,
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

    // Strict touch device safety: disable magnetic physics on touch screens
    if (window.matchMedia('(pointer: coarse)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const xTo = gsap.quickTo(element, 'x', { duration: 0.65, ease: 'power3.out' });
    const yTo = gsap.quickTo(element, 'y', { duration: 0.65, ease: 'power3.out' });

    const contentXTo = contentRef.current
      ? gsap.quickTo(contentRef.current, 'x', { duration: 0.5, ease: 'power2.out' })
      : null;
    const contentYTo = contentRef.current
      ? gsap.quickTo(contentRef.current, 'y', { duration: 0.5, ease: 'power2.out' })
      : null;

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { left, top, width, height } = element.getBoundingClientRect();
      const rawX = (clientX - (left + width / 2)) * magneticStrength;
      const rawY = (clientY - (top + height / 2)) * magneticStrength;

      // Restrain magnetic jump to physical bounds (max 14px)
      const clampedX = Math.max(-14, Math.min(14, rawX));
      const clampedY = Math.max(-14, Math.min(14, rawY));

      xTo(clampedX);
      yTo(clampedY);

      if (contentXTo && contentYTo) {
        contentXTo(clampedX * 0.35);
        contentYTo(clampedY * 0.35);
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
      'bg-[#0A0C0F] hover:bg-[#216BFF] text-[#F2F0EA] hover:text-white border border-transparent active:scale-[0.98]',
    dark:
      'bg-white hover:bg-[#216BFF] text-[#07090E] hover:text-white border border-transparent active:scale-[0.98]',
    secondary:
      'bg-transparent text-[#0A0C0F] border border-black/15 hover:border-black/40 hover:bg-black/5 active:scale-[0.98]',
    outline:
      'bg-transparent text-current border border-current/20 hover:border-current/50 active:scale-[0.98]',
    ghost:
      'bg-transparent text-current/80 hover:text-current border border-transparent active:scale-[0.98]',
  };

  const baseClasses = `relative inline-flex items-center justify-center font-body text-sm font-medium rounded-[2px] transition-colors duration-200 select-none cursor-pointer ${variantStyles[variant]} ${className}`;

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
