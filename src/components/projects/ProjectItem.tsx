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
      className="group relative border-b border-white/10 transition-all duration-300 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#006EFF] focus-visible:ring-offset-0 focus-visible:bg-white/[0.02]"
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

      <div className="py-8 sm:py-12 md:py-14 flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
        {/* Left Side: Index, Title, Status */}
        <div className="flex items-baseline gap-6 sm:gap-10 md:gap-14">
          <span className="font-mono text-sm md:text-base text-[#A0A7B1] group-hover:text-[#006EFF] group-hover:translate-x-1 transition-all duration-300">
            {project.number}
          </span>

          <div>
            <h3 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-[#F3F5F7] group-hover:text-white group-hover:translate-x-2 transition-all duration-300 tracking-tight">
              {project.title}
            </h3>
            <p className="md:hidden mt-2 text-sm text-[#A0A7B1] font-light">
              {project.shortDescription}
            </p>
          </div>
        </div>

        {/* Right Side: Category, Year & Action Icon */}
        <div className="flex items-center justify-between md:justify-end gap-6 sm:gap-12 pl-12 md:pl-0">
          <div className="flex flex-col md:items-end">
            <span className="text-xs sm:text-sm font-mono text-[#CBD5E1] group-hover:text-white transition-colors">
              {project.category}
            </span>
            <span className="text-xs font-mono text-[#758BAA] mt-0.5">
              {project.year} // {project.status}
            </span>
          </div>

          <div className="w-12 h-12 rounded-full border border-white/10 group-hover:border-[#006EFF] group-hover:bg-[#006EFF] flex items-center justify-center text-white/50 group-hover:text-white transition-all duration-300 group-hover:scale-110 shadow-none group-hover:shadow-[0_0_20px_rgba(0,110,255,0.4)]">
            <ArrowUpRight size={20} className="transform group-hover:rotate-45 transition-transform duration-300" />
          </div>
        </div>
      </div>

      {/* Mobile Inline Visual (rendered on touch screens where hover cursor is disabled) */}
      <div className="md:hidden pb-6 pl-12">
        <div className="rounded-xl overflow-hidden border border-white/10 bg-[#08111F] max-w-md">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-auto object-cover"
            loading="lazy"
          />
        </div>
        <div className="mt-3 flex items-center gap-4">
          <span className="text-xs font-mono text-[#006EFF]">Tap for Case Study</span>
          {project.url && (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="text-xs font-mono text-[#A0A7B1] flex items-center gap-1 hover:text-white"
            >
              Live URL <ExternalLink size={12} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
