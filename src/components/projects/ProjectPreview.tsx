import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import type { Project } from '../../types';
import { useIsTouchDevice, usePrefersReducedMotion } from '../../hooks/useMediaQuery';

interface ProjectPreviewProps {
  projects?: Project[];
  activeIdx: number | null;
  isVisible: boolean;
}

export const ProjectPreview: React.FC<ProjectPreviewProps> = ({
  projects = [],
  activeIdx,
  isVisible,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isTouch = useIsTouchDevice();
  const prefersReducedMotion = usePrefersReducedMotion();

  const cardW = 380;
  const cardH = 240;
  const margin = 24;

  const mousePosRef = useRef({
    x: typeof window !== 'undefined' ? window.innerWidth / 2 : 0,
    y: typeof window !== 'undefined' ? window.innerHeight / 2 : 0,
  });
  const xToRef = useRef<((value: number) => void) | null>(null);
  const yToRef = useRef<((value: number) => void) | null>(null);
  const rotateToRef = useRef<((value: number) => void) | null>(null);
  const wasVisibleRef = useRef(false);

  // Global mouse tracking to guarantee cursor coordinate is known before hover
  useEffect(() => {
    if (isTouch || prefersReducedMotion || !isVisible) return;

    const el = containerRef.current;
    if (!el) return;

    // Initial hidden state
    gsap.set(el, { opacity: 0, scale: 0.85 });

    const xTo = gsap.quickTo(el, 'x', { duration: 0.2, ease: 'power2.out' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.2, ease: 'power2.out' });
    const rotateTo = gsap.quickTo(el, 'rotation', { duration: 0.35, ease: 'power2.out' });

    xToRef.current = xTo;
    yToRef.current = yTo;
    rotateToRef.current = rotateTo;

    let lastX = 0;
    let settleTimer: number | null = null;

    const handleMouseMove = (e: MouseEvent) => {
      mousePosRef.current = { x: e.clientX, y: e.clientY };

      const targetX = Math.max(
        margin,
        Math.min(window.innerWidth - cardW - margin, e.clientX - cardW / 2)
      );
      const targetY = Math.max(
        margin,
        Math.min(window.innerHeight - cardH - margin, e.clientY - cardH / 2)
      );

      xTo(targetX);
      yTo(targetY);

      // Dennis Snellenberg subtle velocity tilt
      const deltaX = e.clientX - lastX;
      lastX = e.clientX;
      const clampedRotation = Math.max(-5, Math.min(5, deltaX * 0.18));
      rotateTo(clampedRotation);

      if (settleTimer) window.clearTimeout(settleTimer);
      settleTimer = window.setTimeout(() => {
        rotateTo(0);
      }, 100);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      if (settleTimer) window.clearTimeout(settleTimer);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isTouch, prefersReducedMotion, isVisible]);

  // Dennis Snellenberg scale in / scale out animation
  useEffect(() => {
    if (isTouch || prefersReducedMotion) return;
    const el = containerRef.current;
    if (!el) return;

    if (isVisible && activeIdx !== null) {
      const targetX = Math.max(
        margin,
        Math.min(window.innerWidth - cardW - margin, mousePosRef.current.x - cardW / 2)
      );
      const targetY = Math.max(
        margin,
        Math.min(window.innerHeight - cardH - margin, mousePosRef.current.y - cardH / 2)
      );

      if (!wasVisibleRef.current) {
        gsap.set(el, { x: targetX, y: targetY, rotation: 0 });
      }

      gsap.to(el, {
        opacity: 1,
        scale: 1,
        duration: 0.35,
        ease: 'power3.out',
        overwrite: 'auto',
      });
      wasVisibleRef.current = true;
    } else if (wasVisibleRef.current) {
      gsap.to(el, {
        opacity: 0,
        scale: 0.85,
        duration: 0.25,
        ease: 'power2.in',
        overwrite: 'auto',
      });
      wasVisibleRef.current = false;
    }
  }, [isVisible, activeIdx, isTouch, prefersReducedMotion]);

  if (isTouch || prefersReducedMotion) return null;

  const currentIdx = activeIdx ?? 0;

  return (
    <div
      ref={containerRef}
      className="fixed top-0 left-0 w-[380px] h-[240px] z-[9999] pointer-events-none transform-gpu will-change-transform"
      style={{ opacity: 0 }}
      aria-hidden="true"
    >
      {/* Outer Card Container */}
      <div className="w-full h-full rounded-[4px] overflow-hidden shadow-2xl border border-black/15 bg-[#0E1015] relative">
        {/* Dennis Snellenberg Sliding Vertical Modal Track */}
        <div
          className="w-full h-full will-change-transform"
          style={{
            transform: `translate3d(0, -${currentIdx * 100}%, 0)`,
            transition: 'transform 0.45s cubic-bezier(0.76, 0, 0.24, 1)',
          }}
        >
          {projects.map((proj) => (
            <div
              key={proj.id}
              className="w-full h-[240px] flex items-center justify-center relative overflow-hidden bg-[#14161C]"
            >
              <img
                src={proj.image}
                alt={proj.title}
                className="w-full h-full object-cover select-none"
                draggable={false}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between pointer-events-none">
                <span className="font-display text-xs font-bold text-white uppercase tracking-wider">
                  {proj.title}
                </span>
                <span className="font-body text-[10px] text-white/70 uppercase tracking-widest">
                  {proj.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
