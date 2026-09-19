import React, { useEffect, useRef } from 'react';
import { usePrefersReducedMotion } from '../../hooks/useMediaQuery';

interface KineticMarqueeProps {
  items?: string[];
  baseSpeed?: number;
  className?: string;
}

const DEFAULT_ITEMS = [
  'HIGH PERFORMANCE SOFTWARE',
  'BESPOKE WEB PLATFORMS',
  'OPERATIONAL SYSTEMS',
  'SYSTEM ARCHITECTURE',
  'DIGITAL CRAFT',
];

export const KineticMarquee: React.FC<KineticMarqueeProps> = ({
  items = DEFAULT_ITEMS,
  baseSpeed = 0.8,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const prefersReduced = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReduced) return;

    const track = trackRef.current;
    if (!track) return;

    let x = 0;
    let targetVelocity = 0;
    let currentVelocity = 0;
    let lastScrollY = window.scrollY;
    let scrollTimeout: number | undefined;
    let animationFrameId: number;

    const onScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY;
      lastScrollY = currentScrollY;

      // Accelerate in scroll direction
      targetVelocity = delta * 0.12;

      // Clear any pending zero-out timeout
      if (scrollTimeout) window.clearTimeout(scrollTimeout);
      scrollTimeout = window.setTimeout(() => {
        targetVelocity = 0;
      }, 120);
    };

    window.addEventListener('scroll', onScroll, { passive: true });

    const singleBlockWidth = track.scrollWidth / 2;

    const tick = () => {
      // Smooth decay toward target velocity
      currentVelocity += (targetVelocity - currentVelocity) * 0.08;

      // Base direction is to the left (-1), adjusted by scroll impulse
      const moveBy = baseSpeed + currentVelocity;
      x -= moveBy;

      // Infinite loop wrap
      if (x <= -singleBlockWidth) {
        x += singleBlockWidth;
      } else if (x > 0) {
        x -= singleBlockWidth;
      }

      track.style.transform = `translate3d(${x}px, 0, 0)`;
      animationFrameId = requestAnimationFrame(tick);
    };

    animationFrameId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (scrollTimeout) window.clearTimeout(scrollTimeout);
      cancelAnimationFrame(animationFrameId);
    };
  }, [baseSpeed, prefersReduced]);

  const renderContent = () => (
    <div className="flex items-center shrink-0">
      {items.map((item, idx) => (
        <span key={idx} className="flex items-center whitespace-nowrap">
          <span className="font-display font-bold uppercase tracking-[-0.03em] text-[#0A0C0F]/[0.18] hover:text-[#0A0C0F]/50 transition-colors text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl px-4 sm:px-6">
            {item}
          </span>
          <span className="inline-block w-2 h-2 rounded-full bg-[#0A0C0F]/[0.15] mx-2 sm:mx-4" />
        </span>
      ))}
    </div>
  );

  return (
    <div
      ref={containerRef}
      className={`relative w-full overflow-hidden select-none py-3 sm:py-4 border-y border-[#0A0C0F]/[0.08] pointer-events-none ${className}`}
      aria-hidden="true"
    >
      <div
        ref={trackRef}
        className="flex w-max will-change-transform"
        style={{ transform: 'translate3d(0, 0, 0)' }}
      >
        {renderContent()}
        {renderContent()}
      </div>
    </div>
  );
};
