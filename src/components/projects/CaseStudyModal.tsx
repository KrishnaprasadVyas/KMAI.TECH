import React, { useEffect } from 'react';
import { X, ExternalLink, CheckCircle, Layers, Activity } from 'lucide-react';
import type { Project } from '../../types';

interface CaseStudyModalProps {
  project: Project | null;
  onClose: () => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
      className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/85 backdrop-blur-md animate-[fadeIn_0.2s_ease-out]"
    >
      {/* Backdrop click area */}
      <div className="absolute inset-0 cursor-pointer" onClick={onClose} aria-hidden="true" />

      {/* Modal Container */}
      <div className="relative z-10 w-full max-w-5xl max-h-[90vh] bg-[#101827] border border-[#2A303B] rounded-[2px] shadow-2xl overflow-hidden flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 sm:px-8 py-5 border-b border-[#2A303B] bg-[#0E1523]">
          <div className="flex items-center gap-3 sm:gap-4">
            <span className="font-mono text-xs sm:text-sm text-[#216BFF] font-bold tracking-wider uppercase">
              PROJECT // {project.number}
            </span>
            <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-white/20" />
            <span className="hidden sm:inline-block font-mono text-xs text-[#73777F] uppercase tracking-wider">
              {project.category}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-block font-mono text-[10px] text-[#73777F] tracking-wider uppercase">
              [ ESC TO CLOSE ]
            </span>
            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 rounded-[2px] border border-[#2A303B] hover:border-white/40 bg-transparent text-white flex items-center justify-center transition-colors"
              aria-label="Close modal"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Scrollable Modal Body */}
        <div className="overflow-y-auto p-6 sm:p-8 md:p-10 space-y-8">
          {/* Title & Metadata Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="px-2.5 py-1 rounded-[2px] text-[11px] font-mono font-medium tracking-wider bg-[#0E1523] text-[#216BFF] border border-[#2A303B] uppercase">
                  ● {project.status}
                </span>
                <span className="font-mono text-xs text-[#73777F] uppercase">
                  RELEASE YEAR: {project.year}
                </span>
              </div>
              <h2
                id="modal-project-title"
                className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight"
              >
                {project.title}
              </h2>
            </div>

            {/* Launch live site button */}
            {project.url ? (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-[2px] bg-[#216BFF] hover:bg-[#0D43B8] text-white font-body text-[13px] font-medium tracking-wide transition-colors shrink-0"
              >
                <span>OPEN LIVE WEBSITE</span>
                <ExternalLink size={14} />
              </a>
            ) : (
              <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-[2px] bg-[#0E1523] border border-[#2A303B] text-[#73777F] font-mono text-xs tracking-wider shrink-0">
                <Activity size={14} className="text-[#216BFF]" />
                <span>PRIVATE CLIENT DEPLOYMENT</span>
              </div>
            )}
          </div>

          {/* Project Visual Showcase (Hero WebP) */}
          <div className="w-full rounded-[2px] overflow-hidden border border-[#2A303B] bg-[#0A0D14]">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-auto object-cover"
            />
          </div>

          {/* Detailed Project Breakdown Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-4">
            {/* Overview & Deliverables */}
            <div className="md:col-span-7 space-y-5">
              <div>
                <h3 className="font-mono text-xs text-[#216BFF] tracking-widest uppercase flex items-center gap-2 mb-3">
                  <Layers size={14} />
                  SYSTEM ARCHITECTURE &amp; SCOPE
                </h3>
                <p className="font-body text-[#CBD5E1] text-base sm:text-lg leading-relaxed font-normal">
                  {project.description}
                </p>
              </div>

              {/* Deliverables */}
              {project.deliverables && (
                <div className="pt-4 border-t border-[#2A303B]">
                  <h4 className="font-mono text-xs text-[#73777F] tracking-widest uppercase mb-3">
                    KEY DELIVERABLES &amp; INTEGRATIONS
                  </h4>
                  <ul className="space-y-2.5">
                    {project.deliverables.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-sm text-white/90">
                        <CheckCircle size={15} className="text-[#216BFF] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Technical Specifications */}
            <div className="md:col-span-5 space-y-6 bg-[#0E1523] p-6 rounded-[2px] border border-[#2A303B]">
              <div>
                <span className="font-mono text-xs text-[#73777F] tracking-widest uppercase block mb-3">
                  PRODUCTION STACK
                </span>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-[2px] bg-[#101827] border border-[#2A303B] text-xs font-mono text-[#F2F0EA]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="border-t border-[#2A303B] pt-4 space-y-3 font-mono text-xs">
                <div className="flex justify-between text-[#73777F]">
                  <span>CATEGORY</span>
                  <span className="text-white font-medium">{project.category}</span>
                </div>
                <div className="flex justify-between text-[#73777F]">
                  <span>TIMELINE</span>
                  <span className="text-white font-medium">{project.year}</span>
                </div>
                <div className="flex justify-between text-[#73777F]">
                  <span>STATUS</span>
                  <span className="text-[#216BFF] font-semibold">{project.status}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Real Project Screenshots Gallery */}
          {project.images?.secondary && project.images.secondary.length > 0 && (
            <div className="pt-8 border-t border-[#2A303B] space-y-6">
              <div className="flex items-center justify-between">
                <h4 className="font-mono text-xs text-[#216BFF] tracking-widest uppercase">
                  // ADDITIONAL PRODUCTION SCREENS ({project.images.secondary.length})
                </h4>
                <span className="font-mono text-[11px] text-[#73777F]">AUTHENTIC VIEWPORT CAPTURES</span>
              </div>
              <div className="space-y-6">
                {project.images.secondary.map((imgSrc, idx) => (
                  <div
                    key={idx}
                    className="w-full rounded-[2px] overflow-hidden border border-[#2A303B] bg-[#0A0D14]"
                  >
                    <img
                      src={imgSrc}
                      alt={`${project.title} screen ${idx + 1}`}
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
    </div>
  );
};
