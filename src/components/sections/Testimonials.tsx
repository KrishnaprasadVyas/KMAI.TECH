import React, { useState, useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { testimonials } from '../../data/testimonials';
import type { CursorVariant } from '../common/CustomCursor';

interface TestimonialsProps {
  onCursorChange?: (variant: CursorVariant, text?: string) => void;
}

export const Testimonials: React.FC<TestimonialsProps> = ({ onCursorChange }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const quoteContainerRef = useRef<HTMLDivElement>(null);
  const quoteTextRef = useRef<HTMLQuoteElement>(null);
  const citeRef = useRef<HTMLElement>(null);
  const roleRef = useRef<HTMLParagraphElement>(null);
  const isTransitioningRef = useRef(false);

  const switchQuote = useCallback((newIndex: number, direction: 'next' | 'prev') => {
    if (isTransitioningRef.current) return;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion || !quoteTextRef.current || !citeRef.current || !roleRef.current) {
      setCurrentIndex(newIndex);
      return;
    }

    isTransitioningRef.current = true;
    const exitY = direction === 'next' ? -28 : 28;
    const enterY = direction === 'next' ? 28 : -28;

    // Exit animation: quote and attribution clip away smoothly
    const exitTl = gsap.timeline({
      defaults: { ease: 'power2.in', duration: 0.24 },
      onComplete: () => {
        setCurrentIndex(newIndex);

        // Enter animation after state update
        requestAnimationFrame(() => {
          if (!quoteTextRef.current || !citeRef.current || !roleRef.current) {
            isTransitioningRef.current = false;
            return;
          }

          gsap.fromTo(
            quoteTextRef.current,
            { opacity: 0, y: enterY },
            { opacity: 1, y: 0, duration: 0.4, ease: 'power3.out' }
          );

          gsap.fromTo(
            [citeRef.current, roleRef.current],
            { opacity: 0, y: enterY * 0.5 },
            {
              opacity: 1,
              y: 0,
              duration: 0.35,
              stagger: 0.04,
              ease: 'power3.out',
              onComplete: () => {
                isTransitioningRef.current = false;
              },
            }
          );
        });
      },
    });

    exitTl
      .to(quoteTextRef.current, { opacity: 0, y: exitY })
      .to([citeRef.current, roleRef.current], { opacity: 0, y: exitY * 0.5, stagger: 0.02 }, '-=0.15');
  }, []);

  const nextQuote = useCallback(() => {
    const nextIdx = (currentIndex + 1) % testimonials.length;
    switchQuote(nextIdx, 'next');
  }, [currentIndex, switchQuote]);

  const prevQuote = useCallback(() => {
    const prevIdx = (currentIndex - 1 + testimonials.length) % testimonials.length;
    switchQuote(prevIdx, 'prev');
  }, [currentIndex, switchQuote]);

  // Keyboard navigation support (ArrowLeft / ArrowRight)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') nextQuote();
      else if (e.key === 'ArrowLeft') prevQuote();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextQuote, prevQuote]);

  const current = testimonials[currentIndex];

  return (
    <section
      id="testimonials"
      data-theme="light"
      className="relative scroll-mt-0 w-full pt-16 sm:pt-20 md:pt-24 pb-28 sm:pb-36 md:pb-48 px-6 sm:px-10 md:px-16 bg-[#F2F0EA]"
    >
      <div className="w-full max-w-[1540px] mx-auto">
        {/* Section Header */}
        <div className="mb-16 sm:mb-24">
          <h2 className="font-display font-extrabold uppercase text-[#0A0C0F] tracking-[-0.04em] leading-[0.92] text-[48px] xs:text-[60px] sm:text-[76px] md:text-[96px] lg:text-[112px]">
            CLIENT VOICES
          </h2>
        </div>

        {/* Large Editorial Quotation Container */}
        <div ref={quoteContainerRef} className="max-w-5xl">
          <div className="overflow-hidden min-h-[160px] sm:min-h-[180px] md:min-h-[220px]">
            <blockquote
              ref={quoteTextRef}
              className="font-serif italic text-2xl sm:text-3xl md:text-4xl lg:text-[44px] text-[#0A0C0F] leading-[1.25] tracking-normal mb-12 sm:mb-16 will-change-[opacity,transform]"
            >
              "{current.quote}"
            </blockquote>
          </div>

          {/* Attribution & Precision Controls */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-8 pt-8 border-t border-black/[0.08]">
            <div className="space-y-1">
              <cite
                ref={citeRef}
                className="font-display font-bold text-lg sm:text-xl text-[#0A0C0F] not-italic block will-change-[opacity,transform]"
              >
                {current.organization}
              </cite>
              <p
                ref={roleRef}
                className="font-body text-sm text-[#595D65] will-change-[opacity,transform]"
              >
                {current.role} • {current.author}
              </p>
            </div>

            {/* Navigation Arrows with Keyboard Accessibility */}
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={prevQuote}
                aria-label="Previous quotation"
                onMouseEnter={() => onCursorChange?.('button')}
                onMouseLeave={() => onCursorChange?.('default')}
                className="w-12 h-12 rounded-[2px] border border-black/20 hover:border-[#0A0C0F] hover:bg-[#0A0C0F] hover:text-[#F2F0EA] flex items-center justify-center text-[#0A0C0F] transition-all duration-200 cursor-pointer"
              >
                <ArrowLeft size={16} />
              </button>

              <div className="flex items-center gap-1.5 px-2">
                {testimonials.map((_, idx) => (
                  <span
                    key={idx}
                    className={`h-1 rounded-full transition-all duration-300 ${
                      idx === currentIndex ? 'w-6 bg-[#0A0C0F]' : 'w-1.5 bg-black/20'
                    }`}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={nextQuote}
                aria-label="Next quotation"
                onMouseEnter={() => onCursorChange?.('button')}
                onMouseLeave={() => onCursorChange?.('default')}
                className="w-12 h-12 rounded-[2px] border border-black/20 hover:border-[#0A0C0F] hover:bg-[#0A0C0F] hover:text-[#F2F0EA] flex items-center justify-center text-[#0A0C0F] transition-all duration-200 cursor-pointer"
              >
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
