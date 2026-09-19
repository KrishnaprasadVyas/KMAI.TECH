import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Magnetic } from './Magnetic';
import { usePrefersReducedMotion } from '../../hooks/useMediaQuery';

interface RoundedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  backgroundColor?: string;
  /** Text color when bubble is filled (on hover). Defaults to 'white'. */
  hoverTextColor?: string;
  /** Text color at rest. Defaults to 'inherit' (reads from className). */
  restTextColor?: string;
  className?: string;
  magneticStrength?: number;
}

export const RoundedButton: React.FC<RoundedButtonProps> = ({
  children,
  backgroundColor = '#216BFF',
  hoverTextColor = 'white',
  restTextColor,
  className = '',
  magneticStrength = 0.35,
  onClick,
  ...rest
}) => {
  const circleRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const timeoutRef = useRef<number | null>(null);
  const prefersReduced = usePrefersReducedMotion();
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (prefersReduced) return;

    const circle = circleRef.current;
    if (!circle) return;

    const tl = gsap.timeline({ paused: true });
    tl.to(circle, { top: '-25%', width: '150%', duration: 0.4, ease: 'power3.in' }, 'enter')
      .to(circle, { top: '-150%', width: '125%', duration: 0.25 }, 'exit');

    timelineRef.current = tl;

    return () => {
      tl.kill();
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [prefersReduced]);

  const handleMouseEnter = () => {
    setHovered(true);
    if (prefersReduced || !timelineRef.current) return;
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timelineRef.current.tweenFromTo('enter', 'exit');
  };

  const handleMouseLeave = () => {
    setHovered(false);
    if (prefersReduced || !timelineRef.current) return;
    timeoutRef.current = window.setTimeout(() => {
      timelineRef.current?.play();
    }, 280);
  };

  return (
    <Magnetic strength={magneticStrength}>
      <button
        onClick={onClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`group relative flex items-center justify-center overflow-hidden rounded-full border border-black/20 hover:border-transparent px-8 py-4 text-sm font-medium tracking-normal transition-colors duration-300 cursor-pointer select-none ${className}`}
        {...rest}
      >
        {/* Text — color driven by React state, never ambiguous */}
        <span
          className="relative z-10"
          style={{
            color: hovered ? hoverTextColor : (restTextColor ?? 'inherit'),
            transition: 'color 0.3s ease',
          }}
        >
          {children}
        </span>
        {/* Liquid fill bubble */}
        <div
          ref={circleRef}
          style={{ backgroundColor }}
          className="absolute left-1/2 -translate-x-1/2 top-[100%] w-full h-[150%] rounded-[50%] pointer-events-none will-change-[top,width]"
        />
      </button>
    </Magnetic>
  );
};
