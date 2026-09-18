import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { X, ExternalLink, CheckCircle, Layers, Activity } from 'lucide-react';
import type { Project } from '../../types';

interface CaseStudyModalProps {
  project: Project | null;
  onClose: () => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({ project, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!project) return;
    
    document.body.style.overflow = 'hidden';
    const rootEl = document.getElementById('root');
    if (rootEl) {
      rootEl.setAttribute('aria-hidden', 'true');
      rootEl.setAttribute('inert', 'true');
    }

    const previousFocus = document.activeElement as HTMLElement;

    if (modalRef.current) {
      modalRef.current.focus();
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      
      if (e.key === 'Tab' && modalRef.current) {
        const focusable = Array.from(
          modalRef.current.querySelectorAll<HTMLElement>(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          )
        );
        if (focusable.length === 0) return;
        
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        
        if (e.shiftKey) {
          if (document.activeElement === first || document.activeElement === modalRef.current) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      if (rootEl) {
        rootEl.removeAttribute('aria-hidden');
        rootEl.removeAttribute('inert');
      }
      window.removeEventListener('keydown', handleKeyDown);
      if (previousFocus) {
        previousFocus.focus();
      }
    };
  }, [project, onClose]);

  if (!project) return null;

  return createPortal(
    <div 
      className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/85 backdrop-blur-xl animate-[fadeIn_0.25s_ease-out]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      ref={modalRef}
      tabIndex={-1}
    >
      {/* Backdrop click area */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Container */}
      <div className="relative z-10 w-full max-w-5xl max-h-[90vh] bg-[#08111F] border border-[#162B4C] rounded-2xl md:rounded-3xl shadow-[0_25px_70px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 sm:px-8 py-5 border-b border-white/10 bg-[#05070B]/50">
          <div className="flex items-center gap-4">
            <span className="font-mono text-sm text-[#006EFF] font-bold">
              PROJECT // {project.number}
            </span>
            <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-white/30" />
            <span className="hidden sm:inline-block font-mono text-xs text-[#A0A7B1] uppercase">
              {project.category}
            </span>
          </div>
        </div>

        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 md:top-6 md:right-6 z-50 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/20 transition-all text-white shadow-xl"
          aria-label="Close case study"
        >
          <X size={18} />
        </button>

        {/* Scrollable Modal Body */}
        <div className="overflow-y-auto p-6 sm:p-8 md:p-10 space-y-8">
          {/* Title & Metadata Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-mono font-semibold tracking-wider ${
                    project.status === 'COMPLETED'
                      ? 'bg-[#14532D]/60 text-[#4ADE80] border border-[#22C55E]/30'
                      : 'bg-[#1E3A8A]/60 text-[#60A5FA] border border-[#006EFF]/30'
                  }`}
                >
                  ● {project.status}
                </span>
                <span className="font-mono text-xs text-[#A0A7B1]">
                  YEAR {project.year}
                </span>
              </div>
              <h2 id="modal-title" className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
                {project.title}
              </h2>
            </div>

            {/* Launch live site button */}
            {project.url ? (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-[#006EFF] hover:bg-[#1683FF] text-white font-mono text-xs tracking-widest uppercase transition-all duration-300 shadow-[0_0_25px_rgba(0,110,255,0.4)]"
              >
                <span>OPEN LIVE WEBSITE</span>
                <ExternalLink size={15} />
              </a>
            ) : (
              <div className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white/5 border border-white/10 text-[#A0A7B1] font-mono text-xs tracking-wider">
                <Activity size={14} className="text-[#006EFF]" />
                <span>PRIVATE CLIENT ECOSYSTEM</span>
              </div>
            )}
          </div>

          {/* Project Visual Showcase */}
          <div className="w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-[#05070B]">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-auto object-cover"
            />
          </div>

          {/* Detailed Project Breakdown Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-4">
            {/* Story & Scope (Challenge/Solution) */}
            <div className="md:col-span-7 space-y-6">
              {project.challenge && (
                <div>
                  <h3 className="font-mono text-xs text-[#006EFF] tracking-widest uppercase mb-3 flex items-center gap-2">
                    <Activity size={14} />
                    THE CHALLENGE
                  </h3>
                  <p className="text-[#CBD5E1] text-base leading-relaxed font-light">
                    {project.challenge}
                  </p>
                </div>
              )}
              
              {project.solution && (
                <div>
                  <h3 className="font-mono text-xs text-[#006EFF] tracking-widest uppercase mb-3 flex items-center gap-2">
                    <Layers size={14} />
                    THE SOLUTION
                  </h3>
                  <p className="text-[#CBD5E1] text-base leading-relaxed font-light">
                    {project.solution}
                  </p>
                </div>
              )}
              
              {!project.challenge && !project.solution && (
                <div>
                  <h3 className="font-mono text-xs text-[#006EFF] tracking-widest uppercase mb-3 flex items-center gap-2">
                    <Layers size={14} />
                    SYSTEM ARCHITECTURE &amp; SCOPE
                  </h3>
                  <p className="text-[#CBD5E1] text-base leading-relaxed font-light">
                    {project.description}
                  </p>
                </div>
              )}

              {/* Key Features */}
              {(project.keyFeatures || project.deliverables) && (
                <div className="pt-2">
                  <h4 className="font-mono text-xs text-[#A0A7B1] tracking-widest uppercase mb-4">
                    KEY FEATURES &amp; DELIVERABLES
                  </h4>
                  <ul className="space-y-3">
                    {(project.keyFeatures || project.deliverables)?.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm text-white">
                        <CheckCircle size={16} className="text-[#006EFF] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Technical Specifications */}
            <div className="md:col-span-5 space-y-6 bg-[#05070B]/60 p-6 rounded-2xl border border-white/5">
              <div>
                <span className="font-mono text-xs text-[#A0A7B1] tracking-widest uppercase block mb-3">
                  PRODUCTION STACK
                </span>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1.5 rounded-lg bg-[#0E1E38] border border-[#162F54] text-xs font-mono text-[#38BDF8]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {project.outcome && (
                <div className="border-t border-white/10 pt-4">
                  <span className="font-mono text-xs text-[#A0A7B1] tracking-widest uppercase block mb-2">
                    DELIVERABLE / OUTCOME
                  </span>
                  <p className="text-sm text-white leading-relaxed">
                    {project.outcome}
                  </p>
                </div>
              )}

              <div className="border-t border-white/10 pt-4 space-y-3 font-mono text-xs">
                <div className="flex justify-between text-[#A0A7B1]">
                  <span>CATEGORY</span>
                  <span className="text-white text-right">{project.category}</span>
                </div>
                <div className="flex justify-between text-[#A0A7B1]">
                  <span>TIMELINE</span>
                  <span className="text-white">{project.year}</span>
                </div>
                <div className="flex justify-between text-[#A0A7B1]">
                  <span>STATUS</span>
                  <span className="text-[#006EFF] font-semibold">{project.status}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Real Project Screenshots Gallery */}
          {project.images?.secondary && project.images.secondary.length > 0 && (
            <div className="pt-8 border-t border-white/10 space-y-6">
              <div className="flex items-center justify-between">
                <h4 className="font-mono text-xs text-[#006EFF] tracking-widest uppercase">
                  // ADDITIONAL PRODUCTION SCREENS ({project.images.secondary.length})
                </h4>
                <span className="font-mono text-[11px] text-[#A0A7B1]">AUTHENTIC VIEWPORT CAPTURES</span>
              </div>
              <div className="space-y-6">
                {project.images.secondary.map((imgSrc, idx) => (
                  <div
                    key={idx}
                    className="w-full rounded-2xl overflow-hidden border border-white/10 bg-[#05070B] shadow-lg"
                  >
                    <img
                      src={imgSrc}
                      alt={`${project.title} detailed screen ${idx + 1}`}
                      className="w-full h-auto object-cover"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
          {/* Link to Full Case Study */}
          <div className="pt-8 flex justify-center pb-4">
            <Link
              to={`/work/${project.slug}`}
              onClick={onClose}
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full border border-[#006EFF] hover:bg-[#006EFF] text-[#006EFF] hover:text-white font-mono text-xs tracking-widest uppercase transition-all duration-300"
            >
              READ FULL CASE STUDY
            </Link>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};
