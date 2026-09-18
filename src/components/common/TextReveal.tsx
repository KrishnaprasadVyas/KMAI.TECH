import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface TextRevealProps {
  children: string | React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  stagger?: number;
  triggerOnScroll?: boolean;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'div' | 'span';
}

export const TextReveal: React.FC<TextRevealProps> = ({
  children,
  className = '',
  delay = 0,
  duration = 1.0,
  triggerOnScroll = true,
  as: Component = 'div',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      gsap.set(el, { opacity: 1, y: 0 });
      return;
    }

    gsap.set(el, {
      y: 40,
      opacity: 0,
      clipPath: 'polygon(0 0, 100% 0, 100% 0%, 0% 0%)',
    });

    if (triggerOnScroll) {
      const anim = gsap.to(el, {
        y: 0,
        opacity: 1,
        clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)',
        duration,
        delay,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          once: true,
        },
      });

      return () => {
        anim.scrollTrigger?.kill();
        anim.kill();
      };
    } else {
      const anim = gsap.to(el, {
        y: 0,
        opacity: 1,
        clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)',
        duration,
        delay,
        ease: 'power3.out',
      });

      return () => {
        anim.kill();
      };
    }
  }, [delay, duration, triggerOnScroll]);

  return (
    <div className="overflow-hidden">
      <Component ref={containerRef as any} className={className}>
        {children}
      </Component>
    </div>
  );
};
