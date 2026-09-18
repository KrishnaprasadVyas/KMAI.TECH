import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, ExternalLink } from 'lucide-react';
import { projects } from '../../data/projects';
import type { Project } from '../../types';
import { ProjectItem } from '../projects/ProjectItem';
import { ProjectPreview } from '../projects/ProjectPreview';
import { CaseStudyModal } from '../projects/CaseStudyModal';
import { MagneticButton } from '../common/MagneticButton';
import { SectionLabel } from '../common/SectionLabel';

gsap.registerPlugin(ScrollTrigger);

interface SelectedWorkProps {
  onCursorChange?: (variant: 'default' | 'button' | 'project' | 'image' | 'footer', text?: string) => void;
}

export const SelectedWork: React.FC<SelectedWorkProps> = ({ onCursorChange }) => {
  const [hoveredProject, setHoveredProject] = useState<Project | null>(null);
  const [isPreviewVisible, setIsPreviewVisible] = useState(false);
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<Project | null>(null);

  const featuredRef = useRef<HTMLDivElement>(null);
  const featuredImgRef = useRef<HTMLImageElement>(null);

  const featuredProject = projects[0]; // Shri Gurudev Ashram
  const remainingProjects = projects.slice(1);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    if (featuredImgRef.current && featuredRef.current) {
      gsap.fromTo(
        featuredImgRef.current,
        { scale: 1.0 },
        {
          scale: 1.08,
          ease: 'none',
          scrollTrigger: {
            trigger: featuredRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      );
    }
  }, []);

  const handleHoverStart = (project: Project) => {
    setHoveredProject(project);
    setIsPreviewVisible(true);
  };

  const handleHoverEnd = () => {
    setIsPreviewVisible(false);
  };

  return (
    <section
      id="work"
      className="relative py-28 md:py-40 px-6 md:px-12 bg-[#05070B] border-b border-white/5"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 border-b border-white/10 pb-8">
          <div>
            <SectionLabel number="02" label="SELECTED WORK" className="mb-4" />
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-tight">
              SELECTED WORK.
            </h2>
          </div>
          <div className="max-w-md">
            <p className="text-sm sm:text-base text-[#A0A7B1] font-light">
              Selected client platforms, software systems, and mobile applications engineered for high performance, reliability, and growth.
            </p>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* FEATURED FLAGSHIP SPOTLIGHT (01: SHRI GURUDEV ASHRAM) */}
        {/* ========================================================================= */}
        <div className="mb-24">
          <div className="flex items-center gap-2 mb-4">
            <span className="font-mono text-xs text-[#006EFF] tracking-widest uppercase">
              FLAGSHIP SPOTLIGHT // 01
            </span>
          </div>

          <div
            ref={featuredRef}
            className="group relative rounded-3xl overflow-hidden border border-white/10 bg-[#08111F] shadow-[0_20px_60px_rgba(0,0,0,0.7)] cursor-pointer"
            onClick={() => setSelectedCaseStudy(featuredProject)}
            onMouseEnter={() => onCursorChange?.('image', 'EXPLORE')}
            onMouseLeave={() => onCursorChange?.('default')}
          >
            {/* Parallax Container */}
            <div className="w-full h-[450px] sm:h-[560px] md:h-[680px] overflow-hidden relative">
              <img
                ref={featuredImgRef}
                src={featuredProject.image}
                alt={featuredProject.title}
                className="w-full h-full object-cover object-center transform-gpu will-change-transform"
              />

              {/* Gradient Dark Overlay for Legibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#05070B] via-[#05070B]/40 to-transparent opacity-90 group-hover:opacity-75 transition-opacity duration-500" />
            </div>

            {/* Content Overlay */}
            <div className="absolute inset-0 p-8 sm:p-12 md:p-16 flex flex-col justify-between pointer-events-none">
              {/* Top Tags */}
              <div className="flex flex-wrap gap-2 pointer-events-auto">
                {['WEB PLATFORM', 'DONATION ENGINE', 'WORKFLOW AUTOMATION'].map((badge) => (
                  <span
                    key={badge}
                    className="px-3 py-1 rounded-full bg-[#05070B]/70 backdrop-blur-md border border-white/15 text-[11px] font-mono tracking-wider text-white"
                  >
                    {badge}
                  </span>
                ))}
              </div>

              {/* Bottom Info & CTAs */}
              <div className="pointer-events-auto flex flex-col lg:flex-row lg:items-end justify-between gap-6">
                <div>
                  <span className="font-mono text-sm text-[#006EFF] font-bold block mb-2">
                    01 // FLAGSHIP CASE STUDY
                  </span>
                  <h3 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight">
                    {featuredProject.title}
                  </h3>
                  <p className="mt-3 text-sm sm:text-base text-[#CBD5E1] max-w-2xl font-light">
                    {featuredProject.description}
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <MagneticButton
                    variant="primary"
                    className="px-6 py-3.5 text-xs font-mono tracking-widest uppercase"
                    onClick={() => setSelectedCaseStudy(featuredProject)}
                  >
                    <span>VIEW CASE STUDY</span>
                    <ArrowUpRight size={16} />
                  </MagneticButton>

                  {featuredProject.url && (
                    <a
                      href={featuredProject.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-white font-mono text-xs tracking-widest transition-colors"
                      title="Launch Live Project"
                    >
                      <span>LIVE SITE</span>
                      <ExternalLink size={14} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* EDITORIAL PROJECTS LIST (PROJECTS 02 THROUGH 06) */}
        {/* ========================================================================= */}
        <div className="flex flex-col">
          <div className="hidden md:flex items-center justify-between pb-4 border-b border-white/15 font-mono text-xs text-[#758BAA] uppercase tracking-widest">
            <span>INDEX &amp; CLIENT</span>
            <span>CATEGORY &amp; STATUS</span>
          </div>

          {remainingProjects.map((project) => (
            <ProjectItem
              key={project.id}
              project={project}
              onHoverStart={handleHoverStart}
              onHoverEnd={handleHoverEnd}
              onClick={(p) => setSelectedCaseStudy(p)}
              onCursorChange={onCursorChange}
            />
          ))}
        </div>
      </div>

      {/* Dennis Snellenberg Floating Cursor Follower Preview */}
      <ProjectPreview
        activeProject={hoveredProject}
        isVisible={isPreviewVisible}
      />

      {/* Case Study Deep Dive Modal */}
      <CaseStudyModal
        project={selectedCaseStudy}
        onClose={() => setSelectedCaseStudy(null)}
      />
    </section>
  );
};
