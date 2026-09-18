import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import type { Project } from '../../types';
import { useIsTouchDevice, usePrefersReducedMotion } from '../../hooks/useMediaQuery';

interface ProjectPreviewProps {
  activeProject: Project | null;
  isVisible: boolean;
}

export const ProjectPreview: React.FC<ProjectPreviewProps> = ({
  activeProject,
  isVisible,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const isTouch = useIsTouchDevice();
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (isTouch || prefersReducedMotion) return;

    const el = containerRef.current;
    if (!el) return;

    // quickTo for ultra-smooth floating preview coordinates
    const xTo = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'power3.out' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power3.out' });
    const rotateTo = gsap.quickTo(el, 'rotation', { duration: 0.7, ease: 'power2.out' });

    let lastX = 0;

    const handleMouseMove = (e: MouseEvent) => {
      // Center preview on cursor with offset
      xTo(e.clientX - 225);
      yTo(e.clientY - 140);

      // Subtle rotation proportional to horizontal movement delta
      const deltaX = e.clientX - lastX;
      lastX = e.clientX;
      const clampedRotation = Math.max(-12, Math.min(12, deltaX * 0.4));
      rotateTo(clampedRotation);
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isTouch, prefersReducedMotion]);

  if (isTouch || prefersReducedMotion) return null;

  return (
    <div
      ref={containerRef}
      className={`fixed top-0 left-0 w-[450px] h-[280px] z-[9999] pointer-events-none transition-all duration-300 transform-gpu ${
        isVisible && activeProject ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
      }`}
      style={{ willChange: 'transform' }}
    >
      <div className="w-full h-full rounded-2xl overflow-hidden shadow-[0_25px_60px_-15px_rgba(0,110,255,0.45)] border border-[#006EFF]/40 bg-[#08111F]">
        {activeProject && (
          <img
            ref={imageRef}
            src={activeProject.image}
            alt={activeProject.title}
            className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
            loading="eager"
          />
        )}
      </div>
    </div>
  );
};
