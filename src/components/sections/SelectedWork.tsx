import React, { useState } from 'react';
import { ArrowUpRight, ExternalLink } from 'lucide-react';
import { projects } from '../../data/projects';
import type { Project } from '../../types';
import { CaseStudyModal } from '../projects/CaseStudyModal';
import { ProjectPreview } from '../projects/ProjectPreview';

interface SelectedWorkProps {
  onCursorChange?: (variant: 'default' | 'button' | 'project' | 'image' | 'footer', text?: string) => void;
}

export const SelectedWork: React.FC<SelectedWorkProps> = ({ onCursorChange }) => {
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<Project | null>(null);
  const [hoveredProject, setHoveredProject] = useState<Project | null>(null);
  const [isPreviewVisible, setIsPreviewVisible] = useState(false);

  const handleHoverStart = (project: Project) => {
    setHoveredProject(project);
    setIsPreviewVisible(true);
  };

  const handleHoverEnd = () => {
    setIsPreviewVisible(false);
  };

  return (
    <section id="work" className="relative scroll-mt-24 w-full py-24 sm:py-32 md:py-40 px-6 sm:px-10 md:px-16">
      <div className="w-full max-w-[1540px] mx-auto">
        {/* Section Header: Bold & Minimal */}
        <div className="mb-20 sm:mb-28 md:mb-36">
          <h2 className="font-display font-extrabold uppercase text-white tracking-[-0.04em] leading-[0.92] text-[48px] xs:text-[60px] sm:text-[76px] md:text-[96px] lg:text-[112px]">
            SELECTED WORK
          </h2>
          <p className="mt-6 font-body text-lg sm:text-xl text-[#8E939E] max-w-xl font-normal">
            Real production systems, bespoke platforms, and digital experiences engineered for measurable impact.
          </p>
        </div>

        {/* Immersive Editorial Projects Showcase */}
        <div className="space-y-32 sm:space-y-40 md:space-y-52">
          {projects.map((project, index) => {
            const isEven = index % 2 === 0;

            return (
              <article
                key={project.id}
                className="group relative"
                data-project-id={project.id}
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
                  {/* Visual Presentation (Oversized Image Plate) */}
                  <div
                    className={`lg:col-span-8 ${
                      isEven ? 'lg:order-1' : 'lg:order-2'
                    } overflow-hidden cursor-pointer`}
                    onClick={() => setSelectedCaseStudy(project)}
                    onMouseEnter={() => {
                      onCursorChange?.('image', 'EXPLORE');
                      handleHoverStart(project);
                    }}
                    onMouseLeave={() => {
                      onCursorChange?.('default');
                      handleHoverEnd();
                    }}
                  >
                    <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden bg-[#0F1420]">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                        loading={index === 0 ? 'eager' : 'lazy'}
                      />
                    </div>
                  </div>

                  {/* Editorial Narrative & Direct Actions */}
                  <div
                    className={`lg:col-span-4 ${
                      isEven ? 'lg:order-2' : 'lg:order-1'
                    } space-y-6 sm:space-y-8`}
                  >
                    <div>
                      <span className="font-body text-xs sm:text-sm text-[#8E939E] tracking-normal block mb-2">
                        {project.category}
                      </span>
                      <h3
                        className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight cursor-pointer hover:text-[#216BFF] transition-colors"
                        onClick={() => setSelectedCaseStudy(project)}
                      >
                        {project.title}
                      </h3>
                    </div>

                    <p className="font-body text-base sm:text-lg text-[#8E939E] font-normal leading-relaxed">
                      {project.description}
                    </p>

                    {/* Clean Action Links */}
                    <div className="flex flex-wrap items-center gap-6 pt-2">
                      <button
                        type="button"
                        onClick={() => setSelectedCaseStudy(project)}
                        onMouseEnter={() => onCursorChange?.('button')}
                        onMouseLeave={() => onCursorChange?.('default')}
                        className="inline-flex items-center gap-2 text-white hover:text-[#216BFF] font-body text-sm font-medium transition-colors"
                      >
                        <span>View case study</span>
                        <ArrowUpRight size={16} />
                      </button>

                      {project.url && (
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          onMouseEnter={() => onCursorChange?.('button')}
                          onMouseLeave={() => onCursorChange?.('default')}
                          className="inline-flex items-center gap-2 text-[#8E939E] hover:text-white font-body text-sm font-normal transition-colors"
                        >
                          <span>Live site</span>
                          <ExternalLink size={14} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* Floating Cursor Preview */}
      <ProjectPreview
        activeProject={hoveredProject}
        isVisible={isPreviewVisible}
      />

      {/* Deep Dive Case Study Modal */}
      <CaseStudyModal
        project={selectedCaseStudy}
        onClose={() => setSelectedCaseStudy(null)}
      />
    </section>
  );
};
