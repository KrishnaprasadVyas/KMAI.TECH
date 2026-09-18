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
          scale: 1.06,
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
      className="relative scroll-mt-24 py-24 md:py-36 px-6 md:px-12 lg:px-16 bg-[#08090C] border-b border-white/8"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Architectural Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8 border-b border-white/8 pb-10">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0066FF]" />
              <span className="font-mono text-xs tracking-widest text-[#0066FF] uppercase">
                // 03 SELECTED WORK
              </span>
            </div>
            <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-extrabold text-white tracking-tight leading-[0.95]">
              ENGINEERED PLATFORMS.
            </h2>
          </div>
          <div className="max-w-md">
            <p className="text-sm sm:text-base text-[#8A92A0] font-light leading-relaxed">
              A curated archive of mission-critical production platforms, high-velocity web systems, and enterprise automation engineered for measurable performance and operational resilience.
            </p>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* MONUMENTAL FLAGSHIP CASE STUDY (01: SHRI GURUDEV ASHRAM) */}
        {/* ========================================================================= */}
        <div className="mb-24 sm:mb-32" data-flagship="true">
          {/* Top Architectural Telemetry Bar */}
          <div className="flex items-center justify-between gap-4 pb-4 border-b border-white/8 mb-6 font-mono text-xs uppercase tracking-wider">
            <div className="flex items-center gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0066FF]" />
              <span className="text-[#0066FF] font-semibold">CASE STUDY // 01</span>
            </div>
            <span className="hidden sm:inline-block text-[#8A92A0]">
              CULTURAL HERITAGE &amp; DEVOTIONAL ECOSYSTEM
            </span>
            <span className="text-[#8A92A0]">
              PRODUCTION • 2025
            </span>
          </div>

          {/* Asymmetric Case Study Enclosure (Architectural Plate + Dossier) */}
          <div
            ref={featuredRef}
            className="border border-white/10 bg-[#0B0D13] grid grid-cols-1 lg:grid-cols-12 overflow-hidden transition-all duration-300"
          >
            {/* Visual Plate (Desktop: 7 cols, Mobile: full width) */}
            <div
              className="lg:col-span-7 xl:col-span-7 relative overflow-hidden bg-[#060709] group cursor-pointer border-b lg:border-b-0 lg:border-r border-white/10"
              onClick={() => setSelectedCaseStudy(featuredProject)}
              onMouseEnter={() => onCursorChange?.('image', 'EXPLORE')}
              onMouseLeave={() => onCursorChange?.('default')}
            >
              <div className="relative aspect-[16/10] sm:aspect-[16/10] lg:aspect-auto lg:h-full min-h-[300px] sm:min-h-[420px] lg:min-h-[540px] overflow-hidden">
                <img
                  ref={featuredImgRef}
                  src={featuredProject.image}
                  alt={featuredProject.title}
                  className="w-full h-full object-cover object-center transform-gpu will-change-transform transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />

                {/* Ambient vignette gradient for legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#08090C] via-transparent to-transparent opacity-80 pointer-events-none" />

                {/* Top Deliverable Badges */}
                <div className="absolute top-4 left-4 sm:top-6 sm:left-6 flex flex-wrap gap-2 pointer-events-none">
                  {['WEB PLATFORM', 'DONATION ENGINE', 'WORKFLOW AUTOMATION'].map((badge) => (
                    <span
                      key={badge}
                      className="px-3 py-1 bg-[#08090C]/90 backdrop-blur-sm border border-white/10 text-[10px] font-mono tracking-wider text-white/90 uppercase"
                    >
                      {badge}
                    </span>
                  ))}
                </div>

                {/* Bottom Status Bar inside visual plate */}
                <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 flex items-center justify-between pointer-events-none">
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-[#08090C]/85 backdrop-blur-sm border border-white/10 font-mono text-[10px] sm:text-[11px] text-white/80">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>STATUS: LIVE PRODUCTION DEPLOYMENT</span>
                  </div>

                  <span className="hidden sm:inline-flex items-center gap-1.5 font-mono text-[11px] text-white/80 bg-[#08090C]/85 backdrop-blur-sm px-3 py-1.5 border border-white/10 group-hover:text-white transition-colors">
                    <span>EXPLORE ARCHIVE</span>
                    <ArrowUpRight size={12} className="text-[#0066FF]" />
                  </span>
                </div>
              </div>
            </div>

            {/* Specification Dossier (Desktop: 5 cols, Mobile: full width) */}
            <div className="lg:col-span-5 xl:col-span-5 p-6 sm:p-8 md:p-10 lg:p-12 flex flex-col justify-between bg-[#0B0D13]">
              <div>
                <span className="font-mono text-xs text-[#0066FF] tracking-widest uppercase block mb-3 font-semibold">
                  01 // FLAGSHIP ARCHITECTURE
                </span>
                <h3 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-[1.05] mb-4">
                  {featuredProject.title}
                </h3>
                <p className="text-sm sm:text-base text-[#8A92A0] font-light leading-relaxed mb-8">
                  {featuredProject.description}
                </p>

                {/* Deliverables Telemetry Breakdown */}
                <div className="space-y-4 pt-6 border-t border-white/8 mb-8">
                  <div className="space-y-1">
                    <div className="font-mono text-xs font-semibold text-white/90 uppercase tracking-wider flex items-center gap-2">
                      <span className="text-[#0066FF]">01 /</span>
                      <span>TRANSACTION ARCHITECTURE</span>
                    </div>
                    <p className="font-mono text-xs text-[#8A92A0] leading-relaxed pl-6">
                      Razorpay multi-currency gateway with automated 80G tax compliance records.
                    </p>
                  </div>

                  <div className="space-y-1">
                    <div className="font-mono text-xs font-semibold text-white/90 uppercase tracking-wider flex items-center gap-2">
                      <span className="text-[#0066FF]">02 /</span>
                      <span>CLOUD TOPOLOGY</span>
                    </div>
                    <p className="font-mono text-xs text-[#8A92A0] leading-relaxed pl-6">
                      Vercel edge network paired with OVHCloud high-reliability infrastructure.
                    </p>
                  </div>

                  <div className="space-y-1">
                    <div className="font-mono text-xs font-semibold text-white/90 uppercase tracking-wider flex items-center gap-2">
                      <span className="text-[#0066FF]">03 /</span>
                      <span>DYNAMIC PIPELINES</span>
                    </div>
                    <p className="font-mono text-xs text-[#8A92A0] leading-relaxed pl-6">
                      Dynamic satsang schedules, localized content delivery, and live event broadcasting.
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Controls */}
              <div className="pt-6 border-t border-white/8 flex flex-wrap items-center gap-4">
                <MagneticButton
                  variant="primary"
                  className="px-6 py-3.5 text-xs font-mono tracking-widest uppercase"
                  onClick={() => setSelectedCaseStudy(featuredProject)}
                >
                  <span>EXPLORE CASE STUDY</span>
                  <ArrowUpRight size={14} />
                </MagneticButton>

                {featuredProject.url && (
                  <a
                    href={featuredProject.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full border border-white/15 hover:border-white/30 text-[#8A92A0] hover:text-white font-mono text-xs tracking-widest transition-colors"
                    title="Launch Live Project"
                  >
                    <span>LIVE SITE</span>
                    <ExternalLink size={12} />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* EDITORIAL PROJECTS ARCHIVE LIST (PROJECTS 02 THROUGH 06) */}
        {/* ========================================================================= */}
        <div className="flex flex-col">
          <div className="hidden md:flex items-center justify-between pb-4 border-b border-white/10 font-mono text-xs text-[#8A92A0] uppercase tracking-widest">
            <span>INDEX // PRODUCTION ARCHIVE</span>
            <span>DISCIPLINE // TIMELINE &amp; STATUS</span>
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
