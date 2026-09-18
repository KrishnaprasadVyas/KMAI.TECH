import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { testimonials } from '../../data/testimonials';

interface TestimonialsProps {
  onCursorChange?: (variant: 'default' | 'button' | 'project' | 'image' | 'footer', text?: string) => void;
}

export const Testimonials: React.FC<TestimonialsProps> = ({ onCursorChange }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const current = testimonials[currentIndex];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // Auto slide every 9 seconds
  useEffect(() => {
    const timer = setInterval(nextSlide, 9000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  return (
    <section
      id="testimonials"
      className="relative py-28 md:py-40 px-6 md:px-12 bg-[#05070B] border-b border-white/5 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 border-b border-white/10 pb-8">
          <div>
            <span className="font-mono text-xs tracking-widest text-[#006EFF] uppercase block mb-3">
              // CLIENT TESTIMONIALS
            </span>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-tight">
              WORDS FROM THE PEOPLE WE BUILT WITH.
            </h2>
          </div>
          <p className="max-w-md text-sm sm:text-base text-[#A0A7B1] font-light">
            Editorial insights and feedback from organization leaders, trustees, and business partners.
          </p>
        </div>

        {/* Minh Pham Inspired Massive Editorial Testimonial Slider */}
        <div className="relative min-h-[380px] sm:min-h-[340px] flex flex-col justify-between">
          {/* Giant Background Quote Mark */}
          <div className="absolute -top-10 -left-6 md:-left-12 text-[#006EFF]/10 pointer-events-none select-none">
            <Quote size={180} />
          </div>

          {/* Active Quote Content */}
          <div key={current.id} className="relative z-10 animate-[fadeIn_0.5s_ease-out]">
            <p className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#F3F5F7] tracking-tight leading-[1.15] max-w-5xl">
              “{current.quote}”
            </p>

            <div className="mt-12 flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-t border-white/10 pt-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#08111F] border border-[#006EFF]/50 flex items-center justify-center font-mono font-bold text-sm text-[#006EFF]">
                  {current.author.substring(0, 2).toUpperCase()}
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white tracking-wide">
                    {current.author}
                  </h4>
                  <p className="font-mono text-xs text-[#A0A7B1]">
                    {current.role} • <span className="text-[#38BDF8]">{current.organization}</span>
                  </p>
                </div>
              </div>

              {/* Slider Navigation & Indicators */}
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  {testimonials.map((_, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setCurrentIndex(idx)}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        currentIndex === idx
                          ? 'w-8 bg-[#006EFF] shadow-[0_0_8px_#006EFF]'
                          : 'w-2 bg-white/20 hover:bg-white/40'
                      }`}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={prevSlide}
                    onMouseEnter={() => onCursorChange?.('button')}
                    onMouseLeave={() => onCursorChange?.('default')}
                    className="w-11 h-11 rounded-full border border-white/15 hover:border-[#006EFF] bg-white/5 hover:bg-[#006EFF] text-white flex items-center justify-center transition-colors"
                    aria-label="Previous testimonial"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    type="button"
                    onClick={nextSlide}
                    onMouseEnter={() => onCursorChange?.('button')}
                    onMouseLeave={() => onCursorChange?.('default')}
                    className="w-11 h-11 rounded-full border border-white/15 hover:border-[#006EFF] bg-white/5 hover:bg-[#006EFF] text-white flex items-center justify-center transition-colors"
                    aria-label="Next testimonial"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
