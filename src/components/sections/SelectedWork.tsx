import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, ExternalLink } from 'lucide-react';
import { projects } from '../../data/projects';
import type { Project } from '../../types';
import { ProjectItem } from '../projects/ProjectItem';
import { ProjectPreview } from '../projects/ProjectPreview';
import { CaseStudyModal } from '../projects/CaseStudyModal';

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
          scale: 1.05,
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
    <section id="work" className="relative scroll-mt-20 w-full">
      {/* ========================================================================= */}
      {/* AREA 03: SELECTED WORK INTRODUCTION (EDITORIAL PAPER CANVAS) */}
      {/* ========================================================================= */}
      <div id="work-intro" className="w-full bg-[#F2F0EA] text-[#0A0C0F] pt-24 sm:pt-32 md:pt-36 pb-16 sm:pb-20 md:pb-24 px-5 sm:px-8 md:px-12 border-b border-[#D6D2C9]">
        <div className="w-full max-w-[1540px] mx-auto">
          {/* Category Monospace Label */}
          <div className="mb-6">
            <span className="font-mono text-[11px] sm:text-[12px] uppercase tracking-[0.08em] text-[#73777F]">
              [ 01 / SELECTED WORK ]
            </span>
          </div>

          {/* Asymmetric 12-Column Headline & Thesis */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end">
            <div className="lg:col-span-8">
              <h2 className="font-display font-extrabold uppercase text-[#0A0C0F] tracking-[-0.04em] leading-[0.92] text-[36px] xs:text-[44px] sm:text-[58px] md:text-[72px] lg:text-[80px]">
                ARCHITECTED DIGITAL SYSTEMS.
              </h2>
            </div>

            <div className="lg:col-span-4 flex flex-col justify-end">
              <p className="font-body text-[16px] sm:text-[18px] md:text-[20px] leading-[1.35] text-[#0A0C0F] font-normal">
                A curated archive of mission-critical production platforms, high-velocity web experiences, and enterprise automation engineered for measurable performance and architectural longevity.
              </p>

              <div className="font-mono text-[11px] text-[#73777F] tracking-[0.08em] uppercase mt-6 pt-6 border-t border-[#D6D2C9] flex items-center justify-between">
                <span>FLAGSHIP RELEASE</span>
                <span>2025 EDITION</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* AREA 04: MONUMENTAL FLAGSHIP PLATE (01: SHRI GURUDEV ASHRAM — NAVY CANVAS) */}
      {/* ========================================================================= */}
      <div className="w-full bg-[#101827] text-[#F2F0EA] py-16 sm:py-24 md:py-28 px-5 sm:px-8 md:px-12 border-b border-[#2A303B]">
        <div className="w-full max-w-[1540px] mx-auto" data-flagship="true">
          {/* Top Architectural Telemetry Bar */}
          <div className="flex items-center justify-between gap-4 pb-4 sm:pb-6 border-b border-[#2A303B] mb-8 sm:mb-12 font-mono text-[11px] sm:text-[12px] uppercase tracking-[0.08em]">
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-[#216BFF]" />
              <span className="text-[#216BFF] font-semibold">PROJECT 01 // FLAGSHIP ARCHITECTURE</span>
            </div>
            <span className="hidden md:inline-block text-[#73777F]">
              CULTURAL HERITAGE &amp; DEVOTIONAL ECOSYSTEM
            </span>
            <span className="text-[#73777F]">
              PRODUCTION RELEASE // 2025
            </span>
          </div>

          {/* Asymmetric 12-Column Editorial Spread: Visual Plate + Specification Dossier */}
          <div
            ref={featuredRef}
            className="grid grid-cols-1 lg:grid-cols-12 overflow-hidden"
          >
            {/* Visual Plate (Desktop: 7 cols) */}
            <div
              className="lg:col-span-7 relative border border-[#2A303B] overflow-hidden bg-[#0A0D14] group cursor-pointer"
              onClick={() => setSelectedCaseStudy(featuredProject)}
              onMouseEnter={() => onCursorChange?.('image', 'EXPLORE')}
              onMouseLeave={() => onCursorChange?.('default')}
            >
              <div className="relative aspect-[16/10] w-full min-h-[300px] sm:min-h-[420px] lg:min-h-[520px] overflow-hidden">
                <img
                  ref={featuredImgRef}
                  src={featuredProject.image}
                  alt={featuredProject.title}
                  className="w-full h-full object-cover object-center transform-gpu will-change-transform transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />

                {/* Overlaid Rectangular Deliverable Badges (2px radius, no glow) */}
                <div className="absolute top-4 left-4 sm:top-6 sm:left-6 flex flex-wrap gap-2 pointer-events-none">
                  {['WEB PLATFORM', 'DONATION ENGINE', 'WORKFLOW AUTOMATION'].map((badge) => (
                    <span
                      key={badge}
                      className="px-2.5 py-1 bg-[#101827]/90 border border-[#2A303B] text-[10px] font-mono tracking-wider text-[#F2F0EA] uppercase rounded-[2px]"
                    >
                      {badge}
                    </span>
                  ))}
                </div>

                {/* Bottom Status Bar inside visual plate */}
                <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 flex items-center justify-between pointer-events-none">
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-[#101827]/90 border border-[#2A303B] font-mono text-[10px] sm:text-[11px] text-[#F2F0EA]/90 rounded-[2px]">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>STATUS: LIVE PRODUCTION DEPLOYMENT</span>
                  </div>

                  <span className="hidden sm:inline-flex items-center gap-1.5 font-mono text-[11px] text-white/90 bg-[#101827]/90 px-3 py-1.5 border border-[#2A303B] rounded-[2px]">
                    <span>EXPLORE CASE STUDY</span>
                    <ArrowUpRight size={12} className="text-[#216BFF]" />
                  </span>
                </div>
              </div>
            </div>

            {/* Specification Dossier (Desktop: 5 cols) */}
            <div className="lg:col-span-5 p-6 sm:p-8 md:p-10 lg:p-12 flex flex-col justify-between border border-[#2A303B] lg:border-l-0 bg-[#0E1523]">
              <div>
                <span className="font-mono text-[11px] text-[#216BFF] tracking-[0.08em] uppercase block mb-3 font-semibold">
                  01 // PRODUCTION DOSSIER
                </span>
                <h3 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-[1.0] mb-4">
                  {featuredProject.title}
                </h3>
                <p className="font-body text-[14px] sm:text-[15px] text-[#73777F] leading-relaxed mb-8">
                  {featuredProject.description}
                </p>

                {/* Deliverables Breakdown with 1px borders */}
                <div className="space-y-4 pt-6 border-t border-[#2A303B] mb-8">
                  <div className="space-y-1">
                    <div className="font-mono text-xs font-semibold text-white/90 uppercase tracking-wider flex items-center gap-2">
                      <span className="text-[#216BFF]">01 /</span>
                      <span>TRANSACTION ARCHITECTURE</span>
                    </div>
                    <p className="font-mono text-xs text-[#73777F] leading-relaxed pl-6">
                      Razorpay multi-currency gateway with automated 80G tax compliance records.
                    </p>
                  </div>

                  <div className="space-y-1">
                    <div className="font-mono text-xs font-semibold text-white/90 uppercase tracking-wider flex items-center gap-2">
                      <span className="text-[#216BFF]">02 /</span>
                      <span>CLOUD TOPOLOGY</span>
                    </div>
                    <p className="font-mono text-xs text-[#73777F] leading-relaxed pl-6">
                      Vercel edge network paired with OVHCloud high-reliability infrastructure.
                    </p>
                  </div>

                  <div className="space-y-1">
                    <div className="font-mono text-xs font-semibold text-white/90 uppercase tracking-wider flex items-center gap-2">
                      <span className="text-[#216BFF]">03 /</span>
                      <span>DYNAMIC PIPELINES</span>
                    </div>
                    <p className="font-mono text-xs text-[#73777F] leading-relaxed pl-6">
                      Dynamic satsang schedules, localized content delivery, and live event broadcasting.
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Controls (Rectangular buttons, 2px radius, no pills) */}
              <div className="pt-6 border-t border-[#2A303B] flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={() => setSelectedCaseStudy(featuredProject)}
                  onMouseEnter={() => onCursorChange?.('button')}
                  onMouseLeave={() => onCursorChange?.('default')}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-[2px] bg-[#216BFF] hover:bg-[#0D43B8] text-white font-body text-[13px] font-medium tracking-wide transition-colors duration-200"
                >
                  <span>EXPLORE CASE STUDY</span>
                  <ArrowUpRight size={14} />
                </button>

                {featuredProject.url && (
                  <a
                    href={featuredProject.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onMouseEnter={() => onCursorChange?.('button')}
                    onMouseLeave={() => onCursorChange?.('default')}
                    className="inline-flex items-center gap-2 px-5 py-3.5 rounded-[2px] border border-[#2A303B] hover:border-[#73777F] text-[#F2F0EA] font-body text-[13px] font-medium tracking-wide transition-colors duration-200"
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
      </div>

      {/* ========================================================================= */}
      {/* EDITORIAL PROJECTS ARCHIVE LIST (PROJECTS 02 THROUGH 06 — NAVY CONTINUATION) */}
      {/* ========================================================================= */}
      <div className="w-full bg-[#101827] text-[#F2F0EA] py-16 sm:py-20 md:py-24 px-5 sm:px-8 md:px-12">
        <div className="w-full max-w-[1540px] mx-auto">
          <div className="flex flex-col">
            <div className="hidden md:flex items-center justify-between pb-4 border-b border-[#2A303B] font-mono text-xs text-[#73777F] uppercase tracking-[0.08em]">
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
