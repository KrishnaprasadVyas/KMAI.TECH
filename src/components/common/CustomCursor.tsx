import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useIsTouchDevice, usePrefersReducedMotion } from '../../hooks/useMediaQuery';

interface CustomCursorProps {
  cursorState: {
    variant: 'default' | 'project' | 'button' | 'image' | 'footer';
    text?: string;
  };
}

export const CustomCursor: React.FC<CustomCursorProps> = ({ cursorState }) => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const isTouch = useIsTouchDevice();
  const prefersReducedMotion = usePrefersReducedMotion();
  const [isVisible, setIsVisible] = useState(false);
  const isVisibleRef = useRef(false);

  useEffect(() => {
    if (isTouch || prefersReducedMotion) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // Fast GSAP quickTo setters for 120fps buttery cursor tracking
    const dotX = gsap.quickTo(dot, 'x', { duration: 0.1, ease: 'power2.out' });
    const dotY = gsap.quickTo(dot, 'y', { duration: 0.1, ease: 'power2.out' });

    const ringX = gsap.quickTo(ring, 'x', { duration: 0.35, ease: 'power3.out' });
    const ringY = gsap.quickTo(ring, 'y', { duration: 0.35, ease: 'power3.out' });

    const onMouseMove = (e: MouseEvent) => {
      if (!isVisibleRef.current) {
        isVisibleRef.current = true;
        setIsVisible(true);
      }
      dotX(e.clientX);
      dotY(e.clientY);
      ringX(e.clientX);
      ringY(e.clientY);
    };

    const onMouseLeave = () => {
      isVisibleRef.current = false;
      setIsVisible(false);
    };

    const onMouseEnter = () => {
      isVisibleRef.current = true;
      setIsVisible(true);
    };

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
    };
  }, [isTouch, prefersReducedMotion]);

  // Handle cursor variant animations
  useEffect(() => {
    if (isTouch || prefersReducedMotion || !ringRef.current || !dotRef.current) return;

    const ring = ringRef.current;
    const dot = dotRef.current;
    const label = labelRef.current;

    switch (cursorState.variant) {
      case 'project':
        gsap.to(ring, {
          width: 80,
          height: 80,
          backgroundColor: '#006EFF',
          borderColor: '#1683FF',
          borderWidth: 1,
          duration: 0.3,
          ease: 'power2.out',
        });
        gsap.to(dot, { opacity: 0, scale: 0, duration: 0.2 });
        if (label) gsap.to(label, { opacity: 1, scale: 1, duration: 0.25 });
        break;

      case 'button':
        gsap.to(ring, {
          width: 50,
          height: 50,
          backgroundColor: 'rgba(0, 110, 255, 0.18)',
          borderColor: 'rgba(0, 110, 255, 0.6)',
          borderWidth: 1.5,
          duration: 0.25,
          ease: 'power2.out',
        });
        gsap.to(dot, { opacity: 1, scale: 0.5, duration: 0.2 });
        if (label) gsap.to(label, { opacity: 0, scale: 0.5, duration: 0.2 });
        break;

      case 'image':
        gsap.to(ring, {
          width: 80,
          height: 80,
          backgroundColor: 'rgba(5, 7, 11, 0.85)',
          borderColor: '#006EFF',
          borderWidth: 1.5,
          duration: 0.3,
          ease: 'power2.out',
        });
        gsap.to(dot, { opacity: 0, scale: 0, duration: 0.2 });
        if (label) gsap.to(label, { opacity: 1, scale: 1, duration: 0.25 });
        break;

      case 'footer':
        gsap.to(ring, {
          width: 80,
          height: 80,
          backgroundColor: '#006EFF',
          borderColor: '#FFFFFF',
          borderWidth: 1.5,
          duration: 0.3,
          ease: 'power2.out',
        });
        gsap.to(dot, { opacity: 0, scale: 0, duration: 0.2 });
        if (label) gsap.to(label, { opacity: 1, scale: 1, duration: 0.25 });
        break;

      case 'default':
      default:
        gsap.to(ring, {
          width: 32,
          height: 32,
          backgroundColor: 'transparent',
          borderColor: 'rgba(255, 255, 255, 0.4)',
          borderWidth: 1,
          duration: 0.3,
          ease: 'power2.out',
        });
        gsap.to(dot, { opacity: 1, scale: 1, duration: 0.2 });
        if (label) gsap.to(label, { opacity: 0, scale: 0.5, duration: 0.2 });
        break;
    }
  }, [cursorState, isTouch, prefersReducedMotion]);

  if (isTouch || prefersReducedMotion) {
    return null;
  }

  return (
    <div
      className={`pointer-events-none fixed inset-0 z-[99999] transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* Central pinpoint dot */}
      <div
        ref={dotRef}
        className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]"
      />

      {/* Outer interactive ring follower */}
      <div
        ref={ringRef}
        className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full flex items-center justify-center overflow-hidden transition-[box-shadow] duration-300"
      >
        <span
          ref={labelRef}
          className="text-[10px] font-bold tracking-widest text-white text-center uppercase pointer-events-none opacity-0 select-none px-1 leading-tight"
        >
          {cursorState.text || (cursorState.variant === 'project' ? 'VIEW ↗' : '')}
        </span>
      </div>
    </div>
  );
};
