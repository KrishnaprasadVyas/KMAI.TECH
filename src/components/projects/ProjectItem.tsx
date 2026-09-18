import React from 'react';
import { ArrowUpRight, ExternalLink } from 'lucide-react';
import type { Project } from '../../types';

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
  return (
    <div
      className="group relative border-b border-white/10 transition-all duration-300 cursor-pointer"
      onMouseEnter={() => {
        onHoverStart(project);
        onCursorChange?.('project', 'VIEW PROJECT');
      }}
      onMouseLeave={() => {
        onHoverEnd();
        onCursorChange?.('default');
      }}
      onClick={() => onClick(project)}
    >
      {/* Background row highlight on hover */}
      <div className="absolute inset-0 bg-white/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      {/* Desktop / Tablet Row */}
      <div className="py-8 sm:py-10 md:py-12 flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
        {/* Left Side: Index, Title, Short Description */}
        <div className="flex items-baseline gap-6 sm:gap-8 md:gap-12">
          <span className="font-mono text-sm md:text-base font-semibold text-[#8A92A0] group-hover:text-[#0066FF] transition-colors duration-300">
            {project.number}
          </span>

          <div>
            <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem] font-extrabold text-[#F3F5F7] group-hover:text-white group-hover:translate-x-3 transition-all duration-300 tracking-tight leading-tight">
              {project.title}
            </h3>
            <p className="md:hidden mt-2 text-xs sm:text-sm text-[#A0A7B1] font-light max-w-md">
              {project.shortDescription}
            </p>
          </div>
        </div>

        {/* Right Side: Category, Year & Action Icon */}
        <div className="hidden md:flex items-center gap-8 lg:gap-12">
          <div className="flex flex-col items-end text-right">
            <span className="text-xs font-mono text-white/90 group-hover:text-white transition-colors">
              {project.category}
            </span>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-[11px] font-mono text-[#758BAA]">
                {project.year}
              </span>
              <span className="text-white/20">•</span>
              <span className="text-[10px] font-mono text-[#0066FF] uppercase tracking-wider">
                {project.status}
              </span>
            </div>
          </div>

          <div className="w-11 h-11 rounded-full border border-white/12 group-hover:border-[#0066FF] group-hover:bg-[#0066FF] flex items-center justify-center text-white/40 group-hover:text-white transition-all duration-300 group-hover:scale-105">
            <ArrowUpRight size={17} className="transform group-hover:rotate-45 transition-transform duration-300" />
          </div>
        </div>
      </div>

      {/* Mobile-Only Dedicated Visual Layout */}
      <div className="md:hidden pb-6">
        <div className="overflow-hidden border border-white/10 bg-[#0A0D14] w-full">
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
            <span className="text-[11px] font-mono text-[#0066FF] font-medium tracking-wide">
              VIEW CASE STUDY →
            </span>
            <span className="text-white/20">•</span>
            <span className="text-[10px] font-mono text-[#8A92A0]">
              {project.year}
            </span>
          </div>

          {project.url && (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="text-[11px] font-mono text-[#A0A7B1] flex items-center gap-1 hover:text-white transition-colors"
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
