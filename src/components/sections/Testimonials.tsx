import React, { useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { testimonials } from '../../data/testimonials';

interface TestimonialsProps {
  onCursorChange?: (variant: 'default' | 'button' | 'project' | 'image' | 'footer', text?: string) => void;
}

export const Testimonials: React.FC<TestimonialsProps> = ({ onCursorChange }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextQuote = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevQuote = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const current = testimonials[currentIndex];

  return (
    <section id="testimonials" className="relative scroll-mt-24 w-full py-28 sm:py-36 md:py-48 px-6 sm:px-10 md:px-16">
      <div className="w-full max-w-[1540px] mx-auto">
        {/* Section Header */}
        <div className="mb-16 sm:mb-24">
          <h2 className="font-display font-extrabold uppercase text-[#0A0C0F] tracking-[-0.04em] leading-[0.92] text-[48px] xs:text-[60px] sm:text-[76px] md:text-[96px] lg:text-[112px]">
            CLIENT VOICES
          </h2>
        </div>

        {/* Large Editorial Quotation (Occupies Viewport Space, Zero Cards) */}
        <div className="max-w-5xl">
          <blockquote className="font-serif italic text-2xl sm:text-3xl md:text-4xl lg:text-[44px] text-[#0A0C0F] leading-[1.25] tracking-normal mb-12 sm:mb-16">
            "{current.quote}"
          </blockquote>

          {/* Attribution & Minimal Controls */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-8 pt-8 border-t border-black/[0.08]">
            <div className="space-y-1">
              <cite className="font-display font-bold text-lg sm:text-xl text-[#0A0C0F] not-italic block">
                {current.organization}
              </cite>
              <p className="font-body text-sm text-[#595D65]">
                {current.role} • {current.author}
              </p>
            </div>

            {/* Navigation Arrows */}
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={prevQuote}
                aria-label="Previous quotation"
                onMouseEnter={() => onCursorChange?.('button')}
                onMouseLeave={() => onCursorChange?.('default')}
                className="w-12 h-12 rounded-full border border-black/20 hover:border-[#0A0C0F] hover:bg-[#0A0C0F] hover:text-[#F2F0EA] flex items-center justify-center text-[#0A0C0F] transition-all duration-200"
              >
                <ArrowLeft size={16} />
              </button>

              <span className="font-mono text-sm text-[#73777F] px-2">
                0{currentIndex + 1} / 0{testimonials.length}
              </span>

              <button
                type="button"
                onClick={nextQuote}
                aria-label="Next quotation"
                onMouseEnter={() => onCursorChange?.('button')}
                onMouseLeave={() => onCursorChange?.('default')}
                className="w-12 h-12 rounded-full border border-black/20 hover:border-[#0A0C0F] hover:bg-[#0A0C0F] hover:text-[#F2F0EA] flex items-center justify-center text-[#0A0C0F] transition-all duration-200"
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
