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
  const isTouch = useIsTouchDevice();
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (isTouch || prefersReducedMotion) return;

    const el = containerRef.current;
    if (!el) return;

    // quickTo for ultra-smooth Dennis Snellenberg floating cursor physics
    const xTo = gsap.quickTo(el, 'x', { duration: 0.45, ease: 'power3.out' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.45, ease: 'power3.out' });
    const rotateTo = gsap.quickTo(el, 'rotation', { duration: 0.65, ease: 'power2.out' });

    let lastX = 0;

    const handleMouseMove = (e: MouseEvent) => {
      // Center preview relative to cursor offset
      xTo(e.clientX - 210);
      yTo(e.clientY - 130);

      // Velocity-based physical inertia tilt
      const deltaX = e.clientX - lastX;
      lastX = e.clientX;
      const clampedRotation = Math.max(-10, Math.min(10, deltaX * 0.35));
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
      className={`fixed top-0 left-0 w-[420px] h-[260px] z-[9999] pointer-events-none transition-all duration-300 transform-gpu ${
        isVisible && activeProject ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
      }`}
      style={{ willChange: 'transform' }}
    >
      <div className="w-full h-full rounded-[2px] overflow-hidden shadow-2xl border border-[#2A303B] bg-[#101827] relative">
        {activeProject && (
          <>
            <img
              key={activeProject.id}
              src={activeProject.image}
              alt={activeProject.title}
              className="w-full h-full object-cover object-center animate-[fadeIn_0.2s_ease-out]"
              loading="eager"
            />
            {/* Subtle Gradient & Studio Metadata Badge */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between pointer-events-none">
              <span className="font-mono text-[10px] text-white/90 bg-black/80 px-2.5 py-1 rounded-[2px] border border-[#2A303B] tracking-widest uppercase">
                {activeProject.number} // {activeProject.title}
              </span>
              <span className="font-mono text-[10px] text-[#216BFF] bg-black/80 px-2 py-1 rounded-[2px] border border-[#2A303B] font-bold">
                {activeProject.year}
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
