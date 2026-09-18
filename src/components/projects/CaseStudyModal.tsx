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
    <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/85 backdrop-blur-xl animate-[fadeIn_0.25s_ease-out]">
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

          <button
            type="button"
            onClick={onClose}
            className="w-10 h-10 rounded-full border border-white/10 hover:border-[#006EFF] bg-white/5 hover:bg-[#006EFF] text-white flex items-center justify-center transition-all duration-200"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>

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
              <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
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
            {/* Overview */}
            <div className="md:col-span-7 space-y-4">
              <h3 className="font-mono text-xs text-[#006EFF] tracking-widest uppercase flex items-center gap-2">
                <Layers size={14} />
                SYSTEM ARCHITECTURE &amp; SCOPE
              </h3>
              <p className="text-[#CBD5E1] text-base sm:text-lg leading-relaxed font-light">
                {project.description}
              </p>

              {/* Deliverables */}
              {project.deliverables && (
                <div className="pt-4">
                  <h4 className="font-mono text-xs text-[#A0A7B1] tracking-widest uppercase mb-3">
                    KEY DELIVERABLES &amp; INTEGRATIONS
                  </h4>
                  <ul className="space-y-2.5">
                    {project.deliverables.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-sm text-white">
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

              <div className="border-t border-white/10 pt-4 space-y-3 font-mono text-xs">
                <div className="flex justify-between text-[#A0A7B1]">
                  <span>CATEGORY</span>
                  <span className="text-white">{project.category}</span>
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
        </div>
      </div>
    </div>
  );
};
