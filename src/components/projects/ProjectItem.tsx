import React, { useState } from 'react';
import { ArrowUpRight, ExternalLink } from 'lucide-react';
import type { Project } from '../../types';
import { AccentLine } from '../common/AccentLine';

interface ProjectItemProps {
  project: Project;
  onHoverStart: (project: Project) => void;
  onHoverEnd: () => void;
  onClick: (project: Project) => void;
  onCursorChange?: (variant: 'default' | 'button' | 'project' | 'image' | 'footer', text?: string) => void;
}

export const ProjectItem: React.FC<ProjectItemProps> = ({
  project,
  onHoverStart,
  onHoverEnd,
  onClick,
  onCursorChange,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      role="button"
      tabIndex={0}
      className="group relative border-b border-[#2A303B] transition-all duration-300 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#216BFF] focus-visible:ring-offset-0 focus-visible:bg-white/[0.02]"
      onMouseEnter={() => {
        setIsHovered(true);
        onHoverStart(project);
        onCursorChange?.('project', 'VIEW ↗');
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        onHoverEnd();
        onCursorChange?.('default');
      }}
      onClick={() => onClick(project)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick(project);
        }
      }}
    >
      {/* Expanding accent line at top */}
      <AccentLine active={isHovered} />
      {/* Background row highlight on hover */}
      <div className="absolute inset-0 bg-white/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      {/* Desktop / Tablet Row */}
      <div className="py-8 sm:py-10 md:py-12 flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
        {/* Left Side: Index, Title, Short Description */}
        <div className="flex items-baseline gap-6 sm:gap-8 md:gap-12">
          <span className="font-mono text-sm md:text-base font-semibold text-[#73777F] group-hover:text-[#216BFF] transition-colors duration-300">
            {project.number}
          </span>

          <div>
            <h3 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem] font-extrabold text-[#F2F0EA] group-hover:text-white group-hover:translate-x-3 transition-all duration-300 tracking-tight leading-tight">
              {project.title}
            </h3>
            <p className="md:hidden mt-2 font-body text-xs sm:text-sm text-[#73777F] font-normal max-w-md">
              {project.shortDescription}
            </p>
          </div>
        </div>

        {/* Right Side: Category, Year & Action Icon */}
        <div className="hidden md:flex items-center gap-8 lg:gap-12">
          <div className="flex flex-col items-end text-right">
            <span className="text-xs font-mono text-white/90 group-hover:text-white transition-colors uppercase">
              {project.category}
            </span>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-[11px] font-body text-[#73777F]">
                {project.year}
              </span>
            </div>
          </div>

          <div className="w-10 h-10 rounded-[2px] border border-[#2A303B] group-hover:border-[#216BFF] group-hover:bg-[#216BFF] flex items-center justify-center text-white/40 group-hover:text-white transition-all duration-200">
            <ArrowUpRight size={16} className="transform group-hover:rotate-45 transition-transform duration-200" />
          </div>
        </div>
      </div>

      {/* Mobile-Only Dedicated Visual Layout */}
      <div className="md:hidden pb-6">
        <div className="overflow-hidden border border-[#2A303B] bg-[#0A0D14] rounded-[2px] w-full">
          <div className="aspect-[16/10] w-full overflow-hidden">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        </div>

        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono text-[#216BFF] font-medium tracking-wide uppercase">
              VIEW CASE STUDY →
            </span>
            <span className="text-white/20">•</span>
            <span className="text-[10px] font-mono text-[#73777F]">
              {project.year}
            </span>
          </div>

          {project.url && (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="text-[11px] font-mono text-[#73777F] flex items-center gap-1 hover:text-white transition-colors"
            >
              <span>LIVE</span>
              <ExternalLink size={11} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
