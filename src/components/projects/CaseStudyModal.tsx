import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import gsap from 'gsap';
import { X, ExternalLink } from 'lucide-react';
import type { Project } from '../../types';
import { pauseLenis, resumeLenis } from '../../hooks/useScrollVelocity';
import type { CursorVariant } from '../common/CustomCursor';

interface CaseStudyModalProps {
  project: Project | null;
  onClose: () => void;
  onCursorChange?: (variant: CursorVariant, text?: string) => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({ project, onClose, onCursorChange }) => {
  const backdropRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeProject, setActiveProject] = useState<Project | null>(project);

  // Sync internal state with prop
  useEffect(() => {
    if (project) {
      setActiveProject(project);
    }
  }, [project]);

  useEffect(() => {
    if (!activeProject) return;

    // Pause Lenis smooth scrolling during modal view
    pauseLenis();

    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.paddingRight = `${scrollbarWidth}px`;
    document.body.style.overflow = 'hidden';

    // Cinematic expansion entrance animation
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!prefersReducedMotion && backdropRef.current && containerRef.current) {
      gsap.fromTo(
        backdropRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.32, ease: 'power2.out' }
      );

      gsap.fromTo(
        containerRef.current,
        { opacity: 0, scale: 0.96, y: 24 },
        { opacity: 1, scale: 1, y: 0, duration: 0.38, ease: 'power3.out' }
      );
    }

    // Direct wheel scrolling listener ensuring native mouse wheel response
    const scrollEl = scrollContainerRef.current;
    const handleWheel = (e: WheelEvent) => {
      e.stopPropagation();
      if (scrollEl) {
        scrollEl.scrollTop += e.deltaY;
      }
    };

    if (scrollEl) {
      scrollEl.addEventListener('wheel', handleWheel, { passive: true });
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
      resumeLenis();
      window.removeEventListener('keydown', handleKeyDown);
      if (scrollEl) {
        scrollEl.removeEventListener('wheel', handleWheel);
      }
    };
  }, [activeProject]);

  const handleClose = () => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!prefersReducedMotion && backdropRef.current && containerRef.current) {
      gsap.to(backdropRef.current, { opacity: 0, duration: 0.22, ease: 'power2.in' });
      gsap.to(containerRef.current, {
        opacity: 0,
        scale: 0.97,
        y: 16,
        duration: 0.24,
        ease: 'power3.in',
        onComplete: () => {
          setActiveProject(null);
          onClose();
        },
      });
    } else {
      setActiveProject(null);
      onClose();
    }
  };

  if (!project && !activeProject) return null;
  const current = project || activeProject;
  if (!current) return null;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
      data-lenis-prevent="true"
      data-lenis-prevent-wheel="true"
      className="fixed inset-0 z-[99950] flex items-center justify-center p-4 sm:p-6 md:p-10"
    >
      {/* Cinematic Blur Backdrop */}
      <div
        ref={backdropRef}
        data-theme="dark"
        className="absolute inset-0 bg-black/85 backdrop-blur-md cursor-pointer transition-opacity"
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Expanded Modal Shell */}
      <div
        ref={containerRef}
        data-theme="light"
        data-lenis-prevent="true"
        data-lenis-prevent-wheel="true"
        className="relative z-10 w-full max-w-5xl max-h-[90vh] bg-[#F2F0EA] text-[#0A0C0F] border border-black/[0.08] rounded-[2px] shadow-2xl overflow-hidden flex flex-col"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 sm:px-8 py-4 border-b border-black/[0.08] bg-[#F2F0EA] shrink-0">
          <span className="font-body text-sm text-[#73777F]">{current.category}</span>
          <button
            type="button"
            onClick={handleClose}
            onMouseEnter={() => onCursorChange?.('button')}
            onMouseLeave={() => onCursorChange?.('default')}
            className="w-8 h-8 rounded-[2px] border border-black/[0.08] hover:border-black/30 bg-transparent text-[#0A0C0F] flex items-center justify-center transition-colors"
            aria-label="Close modal"
          >
            <X size={16} />
          </button>
        </div>

        {/* Scrollable Case Study Body */}
        <div
          ref={scrollContainerRef}
          data-lenis-prevent="true"
          data-lenis-prevent-wheel="true"
          className="overflow-y-auto flex-1 min-h-0 p-6 sm:p-8 md:p-10 space-y-8"
        >
          {/* Title & Metadata */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="font-body text-sm text-[#595D65]">{current.year}</span>
              </div>
              <h2
                id="modal-project-title"
                className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0A0C0F] tracking-tight"
              >
                {current.title}
              </h2>
            </div>

            {/* Action link */}
            {current.url ? (
              <a
                href={current.url}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => onCursorChange?.('button')}
                onMouseLeave={() => onCursorChange?.('default')}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-[2px] bg-[#0A0C0F] hover:bg-[#216BFF] text-[#F2F0EA] font-body text-[13px] font-medium transition-colors shrink-0"
              >
                <span>Visit live site</span>
                <ExternalLink size={14} />
              </a>
            ) : (
              <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-[2px] bg-[#0A0C0F]/[0.06] text-[#595D65] font-body text-sm shrink-0">
                <span>Private deployment</span>
              </div>
            )}
          </div>

          {/* Monumental Hero Image */}
          <div className="w-full rounded-[2px] overflow-hidden border border-black/[0.08] bg-[#E5E2D8]">
            <img
              src={current.image}
              alt={current.title}
              className="w-full h-auto object-cover"
            />
          </div>

          {/* Project Architecture & Stack */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-4">
            <div className="md:col-span-7 space-y-5">
              <div>
                <h3 className="font-display font-semibold text-lg text-[#0A0C0F] mb-3">
                  About the project
                </h3>
                <p className="font-body text-[#595D65] text-base sm:text-lg leading-relaxed font-normal">
                  {current.description}
                </p>
              </div>

              {current.deliverables && (
                <div className="pt-4 border-t border-black/[0.08]">
                  <h4 className="font-display font-semibold text-lg text-[#0A0C0F] mb-3">
                    What was delivered
                  </h4>
                  <ul className="space-y-2.5">
                    {current.deliverables.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-sm text-[#595D65]">
                        <span className="text-[#73777F] select-none font-body text-xs mt-0.5 shrink-0">—</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="md:col-span-5 space-y-6 bg-[#E5E2D8] p-6 rounded-[2px] border border-black/[0.08]">
              <div>
                <h4 className="font-display font-semibold text-lg text-[#0A0C0F] mb-3">
                  Production stack
                </h4>
                <div className="flex flex-wrap gap-2">
                  {current.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-[2px] bg-[#0A0C0F]/[0.06] text-[#0A0C0F] font-body text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="border-t border-black/[0.08] pt-4 space-y-3">
                <div className="flex justify-between">
                  <span className="font-body text-sm text-[#595D65]">Category</span>
                  <span className="font-body text-sm text-[#0A0C0F] font-medium">{current.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-body text-sm text-[#595D65]">Timeline</span>
                  <span className="font-body text-sm text-[#0A0C0F] font-medium">{current.year}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Secondary Gallery */}
          {current.images?.secondary && current.images.secondary.length > 0 && (
            <div className="pt-8 border-t border-black/[0.08] space-y-6">
              <div className="space-y-6">
                {current.images.secondary.map((imgSrc, idx) => (
                  <div
                    key={idx}
                    className="w-full rounded-[2px] overflow-hidden border border-black/[0.08] bg-[#E5E2D8]"
                  >
                    <img
                      src={imgSrc}
                      alt={`${current.title} screen ${idx + 1}`}
                      className="w-full h-auto object-cover"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
};
