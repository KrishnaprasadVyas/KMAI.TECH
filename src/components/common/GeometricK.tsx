import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface GeometricKProps {
  className?: string;
  size?: number;
  interactive?: boolean;
  glow?: boolean;
}

export const GeometricK: React.FC<GeometricKProps> = ({
  className = '',
  size = 320,
  interactive = false,
  glow = true,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const path1Ref = useRef<SVGPathElement>(null);
  const path2Ref = useRef<SVGPathElement>(null);
  const path3Ref = useRef<SVGPathElement>(null);
  const glowRef = useRef<SVGCircleElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const container = containerRef.current;
    const cleanups: (() => void)[] = [];

    // Mouse interaction (3D tilt) — only if interactive
    if (interactive) {
      const handleMouseMove = (e: MouseEvent) => {
        const rect = container.getBoundingClientRect();
        const relX = (e.clientX - rect.left) / rect.width - 0.5;
        const relY = (e.clientY - rect.top) / rect.height - 0.5;

        gsap.to(container, {
          rotateY: relX * 25,
          rotateX: -relY * 25,
          duration: 0.8,
          ease: 'power2.out',
          transformPerspective: 800,
        });

        if (glowRef.current) {
          gsap.to(glowRef.current, {
            cx: 100 + relX * 40,
            cy: 100 + relY * 40,
            duration: 1.2,
            ease: 'power2.out',
          });
        }
      };

      const handleMouseLeave = () => {
        gsap.to(container, {
          rotateY: 0,
          rotateX: 0,
          duration: 1.2,
          ease: 'power3.out',
        });
      };

      container.addEventListener('mousemove', handleMouseMove);
      container.addEventListener('mouseleave', handleMouseLeave);

      cleanups.push(() => {
        container.removeEventListener('mousemove', handleMouseMove);
        container.removeEventListener('mouseleave', handleMouseLeave);
      });
    }

    // Scroll-based subtle rotation (max 8°)
    if (interactive) {
      const st = ScrollTrigger.create({
        trigger: container,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
        onUpdate: (self) => {
          const rotation = self.progress * 8;
          gsap.set(container, { rotate: rotation });
        },
      });

      cleanups.push(() => st.kill());
    }

    return () => {
      cleanups.forEach((fn) => fn());
    };
  }, [interactive]);

  return (
    <div
      ref={containerRef}
      className={`relative inline-block select-none w-full max-w-full ${className}`}
      style={{
        maxWidth: size,
        aspectRatio: '1 / 1',
        transformStyle: 'preserve-3d',
      }}
    >
      <svg
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full filter drop-shadow-[0_0_35px_rgba(0,110,255,0.3)]"
      >
        <defs>
          <linearGradient id="kGradientBlue" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#006EFF" />
            <stop offset="100%" stopColor="#1683FF" />
          </linearGradient>
          <linearGradient id="kGradientWhite" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#A0A7B1" />
          </linearGradient>
          <filter id="kAmbientGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="25" />
          </filter>
        </defs>

        {/* Ambient Radial Core — subtle glow pulse */}
        {glow && (
          <circle
            ref={glowRef}
            cx="100"
            cy="100"
            r="60"
            fill="#006EFF"
            className="animate-glow-pulse"
            filter="url(#kAmbientGlow)"
          />
        )}

        {/* Vertical Spine of K */}
        <path
          ref={path1Ref}
          d="M 55 30 L 55 170"
          stroke="url(#kGradientWhite)"
          strokeWidth="14"
          strokeLinecap="round"
        />

        {/* Upper Diagonal Arm */}
        <path
          ref={path2Ref}
          d="M 145 35 L 75 105"
          stroke="url(#kGradientBlue)"
          strokeWidth="14"
          strokeLinecap="round"
        />

        {/* Lower Diagonal Leg */}
        <path
          ref={path3Ref}
          d="M 85 95 L 155 165"
          stroke="url(#kGradientBlue)"
          strokeWidth="14"
          strokeLinecap="round"
        />

        {/* Subtle Geometric Connector Dots */}
        <circle cx="145" cy="35" r="4.5" fill="#FFFFFF" />
        <circle cx="155" cy="165" r="4.5" fill="#1683FF" />
        <circle cx="55" cy="30" r="4" fill="#006EFF" />
        <circle cx="55" cy="170" r="4" fill="#006EFF" />
      </svg>
    </div>
  );
};
