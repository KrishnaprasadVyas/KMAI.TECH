import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { projects } from '../../data/projects';
import type { Project } from '../../types';
import { CaseStudyModal } from '../projects/CaseStudyModal';
import { RoundedButton } from '../common/RoundedButton';
import type { CursorVariant } from '../common/CustomCursor';
import { useIsTouchDevice, usePrefersReducedMotion } from '../../hooks/useMediaQuery';
import { ExternalLink } from 'lucide-react';
import { scrollToTarget } from '../../utils/scroll';

interface SelectedWorkProps {
  onCursorChange?: (variant: CursorVariant, text?: string) => void;
}

// ── Floating cursor-following project preview (desktop only) ─────────────────
function FloatingPreview({
  projects,
  activeIdx,
}: {
  projects: Project[];
  activeIdx: number | null;
}) {
  const isTouch = useIsTouchDevice();
  const prefersReduced = usePrefersReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const wasVisibleRef = useRef(false);
  const mousePosRef = useRef({ x: 0, y: 0 });

  // Always track mouse so position is current when hover begins
  useEffect(() => {
    const track = (e: MouseEvent) => {
      mousePosRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', track, { passive: true });
    return () => window.removeEventListener('mousemove', track);
  }, []);

  // GSAP quickTo — smooth inertia following with viewport clamping & flipping
  useEffect(() => {
    if (isTouch || prefersReduced) return;
    const el = containerRef.current;
    if (!el) return;

    gsap.set(el, { opacity: 0, scale: 0.9 });

    const xTo = gsap.quickTo(el, 'x', { duration: 0.55, ease: 'power3.out' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.55, ease: 'power3.out' });

    const handleMove = (e: MouseEvent) => {
      const cardW = el.offsetWidth || 340;
      const cardH = el.offsetHeight || 255;

      // Position to the right by default
      let targetX = e.clientX + 24;

      // If it would overflow right boundary, flip to left of cursor
      if (targetX + cardW > window.innerWidth - 20) {
        targetX = e.clientX - cardW - 24;
      }

      // Hard clamp inside screen horizontal boundaries
      targetX = Math.max(20, Math.min(targetX, window.innerWidth - cardW - 20));

      // Vertically center with top/bottom padding
      let targetY = e.clientY - cardH / 2;
      targetY = Math.max(20, Math.min(targetY, window.innerHeight - cardH - 20));

      xTo(targetX);
      yTo(targetY);
    };

    window.addEventListener('mousemove', handleMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMove);
  }, [isTouch, prefersReduced]);

  // Show / hide with scale
  useEffect(() => {
    if (isTouch || prefersReduced) return;
    const el = containerRef.current;
    if (!el) return;

    if (activeIdx !== null) {
      if (!wasVisibleRef.current) {
        const cardW = el.offsetWidth || 340;
        const cardH = el.offsetHeight || 255;
        let startX = mousePosRef.current.x + 24;
        if (startX + cardW > window.innerWidth - 20) {
          startX = mousePosRef.current.x - cardW - 24;
        }
        startX = Math.max(20, Math.min(startX, window.innerWidth - cardW - 20));
        let startY = mousePosRef.current.y - cardH / 2;
        startY = Math.max(20, Math.min(startY, window.innerHeight - cardH - 20));

        gsap.set(el, { x: startX, y: startY });
      }
      gsap.to(el, { opacity: 1, scale: 1, duration: 0.35, ease: 'power3.out', overwrite: 'auto' });
      wasVisibleRef.current = true;
    } else if (wasVisibleRef.current) {
      gsap.to(el, { opacity: 0, scale: 0.9, duration: 0.2, ease: 'power2.in', overwrite: 'auto' });
      wasVisibleRef.current = false;
    }
  }, [activeIdx, isTouch, prefersReduced]);

  if (isTouch || prefersReduced) return null;

  const idx = activeIdx ?? 0;

  return (
    <div
      ref={containerRef}
      className="fixed top-0 left-0 z-[8800] pointer-events-none will-change-transform"
      style={{ opacity: 0 }}
      aria-hidden="true"
    >
      {/* Premium editorial preview card */}
      <div
        className="relative overflow-hidden"
        style={{
          width: 'clamp(280px, 22vw, 420px)',
          aspectRatio: '4/3',
          borderRadius: '2px',
          boxShadow: '0 24px 64px rgba(0,0,0,0.22), 0 4px 16px rgba(0,0,0,0.12)',
        }}
      >
        {/* Slide track — all images, transforms to active */}
        <div
          className="absolute inset-0 will-change-transform"
          style={{
            display: 'flex',
            width: `${projects.length * 100}%`,
            height: '100%',
            transform: `translate3d(-${idx * (100 / projects.length)}%, 0, 0)`,
            transition: 'transform 0.55s cubic-bezier(0.76, 0, 0.24, 1)',
          }}
        >
          {projects.map((p) => (
            <div
              key={p.id}
              className="relative flex-shrink-0 h-full overflow-hidden"
              style={{ width: `${100 / projects.length}%` }}
            >
              <img
                src={p.image}
                alt={p.title}
                className="w-full h-full object-cover"
                draggable={false}
              />
              {/* Editorial overlay — gradient from bottom */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            </div>
          ))}
        </div>

        {/* Project title in card — editorial label at bottom-left */}
        <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
          <div className="font-display text-xs font-bold uppercase tracking-[0.15em] text-white/50 mb-1">
            {projects[idx]?.category}
          </div>
          <div className="font-display text-sm font-extrabold uppercase tracking-tight text-white leading-tight">
            {projects[idx]?.title}
          </div>
        </div>

        {/* Hairline top border accent */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-white/20 z-10" />
      </div>
    </div>
  );
}

// ── Main SelectedWork section ─────────────────────────────────────────────────
export const SelectedWork: React.FC<SelectedWorkProps> = ({ onCursorChange }) => {
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<Project | null>(null);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const isTouch = useIsTouchDevice();
  const prefersReduced = usePrefersReducedMotion();

  const titleRefs = useRef<(HTMLElement | null)[]>([]);
  const metaRefs = useRef<(HTMLElement | null)[]>([]);

  const scrollToContact = () => {
    scrollToTarget('#contact');
  };

  // GSAP inertia shift on hover — title left, meta right
  useEffect(() => {
    if (prefersReduced || isTouch) return;
    projects.forEach((_, idx) => {
      const title = titleRefs.current[idx];
      const meta = metaRefs.current[idx];
      if (!title || !meta) return;
      if (hoveredIdx === idx) {
        gsap.to(title, { x: -12, duration: 0.5, ease: 'power3.out', overwrite: 'auto' });
        gsap.to(meta, { x: 12, duration: 0.5, ease: 'power3.out', overwrite: 'auto' });
      } else {
        gsap.to(title, { x: 0, duration: 0.4, ease: 'power3.out', overwrite: 'auto' });
        gsap.to(meta, { x: 0, duration: 0.4, ease: 'power3.out', overwrite: 'auto' });
      }
    });
  }, [hoveredIdx, prefersReduced, isTouch]);

  return (
    <section
      id="work"
      data-theme="light"
      className="relative scroll-mt-0 w-full pt-16 sm:pt-20 md:pt-24 pb-24 sm:pb-32 md:pb-40 bg-[#F2F0EA]"
    >
      <div className="w-full max-w-[1540px] mx-auto px-6 sm:px-10 md:px-16">

        {/* ── Section header ──────────────────────────────────────── */}
        <div className="mb-16 sm:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#0A0C0F]/[0.1]">
          <h2 className="font-display font-extrabold uppercase text-[#0A0C0F] tracking-[-0.04em] leading-[0.92] text-[48px] xs:text-[60px] sm:text-[76px] md:text-[96px] lg:text-[112px]">
            SELECTED<br />WORK
          </h2>
          <p className="font-body text-base sm:text-lg text-[#595D65] max-w-xs font-normal leading-relaxed self-end">
            A selection of recent work.
          </p>
        </div>

        {/* ── Project rows ────────────────────────────────────────── */}
        <div className="w-full">
          {projects.map((project, idx) => {
            const isHovered = hoveredIdx === idx;
            const isDimmed = hoveredIdx !== null && !isHovered;

            return (
              <article
                key={project.id}
                onClick={() => setSelectedCaseStudy(project)}
                onMouseEnter={(e) => {
                  if (isTouch) return;
                  const rect = e.currentTarget.getBoundingClientRect();
                  if (rect.right - e.clientX > 320) {
                    onCursorChange?.('project', 'VIEW');
                    setHoveredIdx(idx);
                  }
                }}
                onMouseMove={(e) => {
                  if (isTouch) return;
                  const rect = e.currentTarget.getBoundingClientRect();
                  const distFromRight = rect.right - e.clientX;
                  // If moving towards the action buttons area on the right, dismiss preview
                  if (distFromRight < 300) {
                    if (hoveredIdx === idx) {
                      setHoveredIdx(null);
                      onCursorChange?.('default');
                    }
                  } else {
                    if (hoveredIdx !== idx) {
                      setHoveredIdx(idx);
                      onCursorChange?.('project', 'VIEW');
                    }
                  }
                }}
                onMouseLeave={() => {
                  onCursorChange?.('default');
                  setHoveredIdx(null);
                }}
                className={`group relative border-b border-[#0A0C0F]/[0.1] cursor-pointer transition-opacity duration-500 ${
                  isDimmed ? 'opacity-[0.15]' : 'opacity-100'
                }`}
              >
                {/* Mobile: full-bleed image above title */}
                {isTouch && (
                  <div className="w-full aspect-video overflow-hidden -mx-0">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                      draggable={false}
                      loading="lazy"
                    />
                  </div>
                )}

                {/* Row layout */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-6 py-8 sm:py-10 md:py-12">
                  {/* Title — clamped so it never clips, always fits row */}
                  <div className="flex-1 min-w-0">
                    <h3
                      ref={(el) => { titleRefs.current[idx] = el; }}
                      className="font-display font-extrabold uppercase text-[#0A0C0F] tracking-tight leading-[0.95] will-change-transform truncate"
                      style={{
                        fontSize: 'clamp(28px, 4.5vw, 72px)',
                        transition: prefersReduced ? 'none' : undefined,
                      }}
                    >
                      {project.title}
                    </h3>
                    <p className="font-body text-sm text-[#595D65] mt-2 font-normal leading-snug max-w-md">
                      {project.shortDescription}
                    </p>
                  </div>

                  {/* Meta — category + links, NO dates (dismisses preview on hover) */}
                  <div
                    ref={(el) => { metaRefs.current[idx] = el; }}
                    onMouseEnter={() => {
                      setHoveredIdx(null);
                      onCursorChange?.('default');
                    }}
                    className="flex items-center gap-4 sm:gap-6 shrink-0 will-change-transform"
                  >
                    <div className="text-right hidden sm:block">
                      <div className="font-body text-sm text-[#595D65] font-normal leading-snug max-w-[180px] text-right">
                        {project.category}
                      </div>
                    </div>

                    {project.url && (
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        onMouseEnter={() => {
                          setHoveredIdx(null);
                          onCursorChange?.('button');
                        }}
                        onMouseLeave={() => {
                          onCursorChange?.('default');
                        }}
                        className="w-10 h-10 rounded-full border border-[#0A0C0F]/20 bg-white/70 hover:bg-[#0A0C0F] hover:text-white hover:border-[#0A0C0F] text-[#333] flex items-center justify-center transition-all duration-300 flex-shrink-0 shadow-sm hover:scale-105"
                        title="Open live site"
                        aria-label={`Open ${project.title} live site`}
                      >
                        <ExternalLink size={14} />
                      </a>
                    )}

                    {/* Obvious, clickable View Project button */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedCaseStudy(project);
                      }}
                      onMouseEnter={() => {
                        setHoveredIdx(null);
                        onCursorChange?.('button');
                      }}
                      onMouseLeave={() => {
                        onCursorChange?.('default');
                      }}
                      className="group/btn flex items-center gap-2 px-4 py-2 rounded-full border border-[#0A0C0F]/25 bg-white/90 hover:bg-[#216BFF] hover:border-[#216BFF] text-[#0A0C0F] hover:text-white transition-all duration-300 shadow-sm hover:shadow-md hover:scale-105 cursor-pointer select-none"
                      aria-label={`View ${project.title}`}
                    >
                      <span className="font-poppins font-bold text-[11px] sm:text-xs uppercase tracking-wider">
                        View
                      </span>
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 14 14"
                        fill="none"
                        className="transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
                      >
                        <path
                          d="M2 12L12 2M12 2H5M12 2V9"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* ── CTA ─────────────────────────────────────────────────── */}
        <div className="mt-20 sm:mt-28 flex justify-center">
          <RoundedButton
            backgroundColor="#216BFF"
            hoverTextColor="white"
            restTextColor="#0A0C0F"
            onClick={scrollToContact}
            onMouseEnter={() => onCursorChange?.('button')}
            onMouseLeave={() => onCursorChange?.('default')}
            className="text-xs sm:text-sm uppercase tracking-widest"
          >
            <span>More Work</span>
          </RoundedButton>
        </div>
      </div>

      {/* ── Floating preview (desktop, lower z than custom cursor) ── */}
      <FloatingPreview projects={projects} activeIdx={hoveredIdx} />

      {/* ── Case study modal ─────────────────────────────────────── */}
      <CaseStudyModal
        project={selectedCaseStudy}
        onClose={() => setSelectedCaseStudy(null)}
        onCursorChange={onCursorChange}
      />
    </section>
  );
};
