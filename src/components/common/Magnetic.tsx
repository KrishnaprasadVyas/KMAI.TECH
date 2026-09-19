import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useIsTouchDevice, usePrefersReducedMotion } from '../../hooks/useMediaQuery';

interface MagneticProps {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}

export const Magnetic: React.FC<MagneticProps> = ({
  children,
  strength = 0.35,
  className = '',
}) => {
  const magneticRef = useRef<HTMLDivElement>(null);
  const isTouch = useIsTouchDevice();
  const prefersReduced = usePrefersReducedMotion();

  useEffect(() => {
    if (isTouch || prefersReduced) return;

    const el = magneticRef.current;
    if (!el) return;

    const xTo = gsap.quickTo(el, 'x', { duration: 1, ease: 'elastic.out(1, 0.3)' });
    const yTo = gsap.quickTo(el, 'y', { duration: 1, ease: 'elastic.out(1, 0.3)' });

    const onMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { height, width, left, top } = el.getBoundingClientRect();
      const x = clientX - (left + width / 2);
      const y = clientY - (top + height / 2);
      xTo(x * strength);
      yTo(y * strength);
    };

    const onMouseLeave = () => {
      xTo(0);
      yTo(0);
    };

    el.addEventListener('mousemove', onMouseMove);
    el.addEventListener('mouseleave', onMouseLeave);

    return () => {
      el.removeEventListener('mousemove', onMouseMove);
      el.removeEventListener('mouseleave', onMouseLeave);
      xTo(0);
      yTo(0);
    };
  }, [isTouch, prefersReduced, strength]);

  return (
    <div ref={magneticRef} className={`inline-block ${className}`}>
      {children}
    </div>
  );
};
