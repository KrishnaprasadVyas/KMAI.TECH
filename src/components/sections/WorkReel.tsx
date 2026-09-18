import React, { useRef, useState, useEffect, useCallback } from 'react';
import { projects } from '../../data/projects';
import { ExternalLink } from 'lucide-react';

interface WorkReelProps {
  onHoldStateChange?: (isHolding: boolean, progress: number, frame: number, total: number) => void;
}

export const WorkReel: React.FC<WorkReelProps> = ({ onHoldStateChange }) => {
  const reelRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  // Per-project active frame index during hold-to-view scrubbing
  const [activeFrames, setActiveFrames] = useState<Record<number, number>>({});
  const [activeHoldingId, setActiveHoldingId] = useState<number | null>(null);
  const [holdProgress, setHoldProgress] = useState(0);
  const holdRaf = useRef<number | null>(null);
  const holdStartTime = useRef<number | null>(null);

  // Horizontal wheel conversion
  const handleWheel = (e: React.WheelEvent) => {
    if (!reelRef.current) return;
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      reelRef.current.scrollLeft += e.deltaY * 0.9;
    }
  };

  // Drag-to-scroll mouse handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    // Avoid initiating drag if clicking direct interactive links
    if ((e.target as HTMLElement).closest('a, button')) return;
    isDragging.current = true;
    if (reelRef.current) {
      startX.current = e.pageX - reelRef.current.offsetLeft;
      scrollLeft.current = reelRef.current.scrollLeft;
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !reelRef.current) return;
    e.preventDefault();
    const x = e.pageX - reelRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5;
    reelRef.current.scrollLeft = scrollLeft.current - walk;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  // Hold-to-view scrub engine
  const startHold = useCallback(
    (projectId: number, totalFrames: number) => {
      setActiveHoldingId(projectId);
      setHoldProgress(0);
      holdStartTime.current = performance.now();

      const SCRUB_DURATION = 1800; // ms per full loop

      const step = (time: number) => {
        if (!holdStartTime.current) return;
        const elapsed = time - holdStartTime.current;
        const progress = (elapsed % SCRUB_DURATION) / SCRUB_DURATION;
        const frame = Math.floor(progress * totalFrames);

        setHoldProgress(progress);
        setActiveFrames((prev) => ({ ...prev, [projectId]: frame }));
        onHoldStateChange?.(true, progress, frame, totalFrames);

        holdRaf.current = requestAnimationFrame(step);
      };

      holdRaf.current = requestAnimationFrame(step);
    },
    [onHoldStateChange]
  );

  const stopHold = useCallback(() => {
    if (holdRaf.current) {
      cancelAnimationFrame(holdRaf.current);
      holdRaf.current = null;
    }
    holdStartTime.current = null;
    setActiveHoldingId(null);
    setHoldProgress(0);
    onHoldStateChange?.(false, 0, 0, 1);
  }, [onHoldStateChange]);

  useEffect(() => {
    return () => {
      if (holdRaf.current) cancelAnimationFrame(holdRaf.current);
    };
  }, []);

  const scrollByAmount = (offset: number) => {
    if (reelRef.current) {
      reelRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative w-full overflow-hidden select-none">
      {/* Reel Header Technical Controls */}
      <div className="w-full max-w-[1540px] mx-auto px-6 sm:px-10 md:px-16 mb-6 flex flex-wrap justify-between items-end gap-4">
        <div>
          <div className="font-mono text-xs text-[#FF3B1F] uppercase tracking-wider mb-1 flex items-center gap-2">
            <span>+ DRAWING REEL: 01 TO 06</span>
            <span>// HORIZONTAL SPEC DISPATCH</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#15130F] font-normal tracking-tight">
            Selected Architectural Works
          </h2>
        </div>

        {/* Discovery & Navigation Affordances */}
        <div className="flex items-center gap-6 font-mono text-xs text-[#636059]">
          <div className="hidden sm:flex items-center gap-2">
            <span className="w-2 h-2 rounded-full border border-[#FF3B1F]" />
            <span>DRAG / WHEEL HORIZONTALLY // PRESS &amp; HOLD TO SCRUB</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => scrollByAmount(-480)}
              className="px-3 py-1 border border-[#15130F]/30 hover:border-[#15130F] text-[#15130F] uppercase tracking-widest text-[10px] hover:bg-[#15130F] hover:text-[#F3EFE7] transition-colors"
              aria-label="Previous tear-sheet"
            >
              [ PREV ]
            </button>
            <button
              type="button"
              onClick={() => scrollByAmount(480)}
              className="px-3 py-1 border border-[#15130F]/30 hover:border-[#15130F] text-[#15130F] uppercase tracking-widest text-[10px] hover:bg-[#15130F] hover:text-[#F3EFE7] transition-colors"
              aria-label="Next tear-sheet"
            >
              [ NEXT ]
            </button>
          </div>
        </div>
      </div>

      {/* The Continuous Horizontal Reel Container */}
      <div
        ref={reelRef}
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        className="flex gap-8 overflow-x-auto scrollbar-none px-6 sm:px-10 md:px-16 py-4 cursor-grab active:cursor-grabbing"
      >
        {projects.map((project) => {
          const frames = project.frames || [project.image];
          const currentFrameIndex = activeFrames[project.id] || 0;
          const currentImage = frames[currentFrameIndex] || project.image;
          const isThisHolding = activeHoldingId === project.id;

          return (
            <article
              key={project.id}
              className="flex-shrink-0 w-[84vw] xs:w-[76vw] sm:w-[540px] md:w-[620px] lg:w-[700px] border border-[#15130F] bg-[#F3EFE7] p-5 sm:p-7 flex flex-col justify-between relative"
            >
              {/* Corner Registration Marks */}
              <span className="absolute top-1.5 left-2 font-mono text-[9px] text-[#15130F]/40 select-none">
                +
              </span>
              <span className="absolute top-1.5 right-2 font-mono text-[9px] text-[#15130F]/40 select-none">
                +
              </span>
              <span className="absolute bottom-1.5 left-2 font-mono text-[9px] text-[#15130F]/40 select-none">
                +
              </span>
              <span className="absolute bottom-1.5 right-2 font-mono text-[9px] text-[#15130F]/40 select-none">
                +
              </span>

              {/* Tear-Sheet Spec Header Block */}
              <div className="pb-4 mb-4 border-b border-[#15130F]/15 flex justify-between items-start font-mono text-xs">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[#FF3B1F]">
                      {project.specNo || `KM-${project.number}`}
                    </span>
                    <span className="text-[#636059]">
                      // {project.category}
                    </span>
                  </div>
                  <h3 className="font-serif text-2xl sm:text-3xl text-[#15130F] font-normal tracking-tight mt-1">
                    {project.title}
                  </h3>
                </div>

                <div className="text-right text-[11px] text-[#636059]">
                  <div>YEAR: {project.year}</div>
                  <div className="text-[#15130F] font-semibold">
                    [{project.status}]
                  </div>
                </div>
              </div>

              {/* Interactive Viewport: Dual-Layer Mask Reveal & Hold-to-View */}
              <div
                data-mask-reveal="true"
                data-spec-label={project.title}
                onPointerDown={() => startHold(project.id, frames.length)}
                onPointerUp={stopHold}
                onPointerLeave={stopHold}
                className="relative w-full h-[280px] xs:h-[340px] sm:h-[380px] md:h-[420px] bg-[#15130F] overflow-hidden cursor-crosshair border border-[#15130F]"
              >
                {/* 1. Base Layer: Authentic High-Res Capture */}
                <img
                  src={currentImage}
                  alt={project.title}
                  loading="lazy"
                  className="w-full h-full object-cover select-none pointer-events-none transition-opacity duration-150"
                />

                {/* 2. Annotated Blueprint Layer: Revealed STRICTLY through mask cursor */}
                <div className="mask-reveal-layer absolute inset-0 bg-[#15130F]/95 text-[#F3EFE7] p-6 flex flex-col justify-between pointer-events-none z-10 select-none">
                  {/* Top Wireframe Ticks */}
                  <div className="flex justify-between items-start font-mono text-[10px] text-[#FF3B1F]">
                    <span>// BLUEPRINT REDLINE INSPECTION</span>
                    <span>SCALE: 1:1 // DP</span>
                  </div>

                  {/* Redline Architectural Wireframe & Callouts */}
                  <div className="space-y-2 font-mono text-xs">
                    <div className="border border-[#FF3B1F]/60 p-3 bg-[#FF3B1F]/[0.04]">
                      <div className="text-[#FF3B1F] font-bold text-[11px] mb-1">
                        SPECIFICATION MEASUREMENTS
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-[10px] text-[#F3EFE7]/90">
                        <div>DIM: {project.dimensions || '1440 × 900'}</div>
                        <div>LATENCY: {project.latency || '< 16ms'}</div>
                        <div className="col-span-2 text-[#FF3B1F]">
                          STACK: {project.technologies.slice(0, 4).join(', ')}
                        </div>
                      </div>
                    </div>

                    {/* Redline Engineer Notes */}
                    <div className="space-y-1">
                      {project.redlineNotes?.map((note, idx) => (
                        <div
                          key={idx}
                          className="text-[#FF3B1F] font-mono text-[10px] tracking-wide"
                        >
                          {note}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Dimension Guideline */}
                  <div className="flex justify-between items-end font-mono text-[9px] text-[#F3EFE7]/60 border-t border-[#FF3B1F]/40 pt-2">
                    <span>|&larr; VIEWPORT BOUNDARY &rarr;|</span>
                    <span className="text-[#FF3B1F]">ACTIVE LOUPE INSPECTION</span>
                  </div>
                </div>

                {/* Hold-to-View Affordance Badge */}
                <div className="absolute bottom-3 right-3 z-20 pointer-events-none bg-[#15130F]/90 border border-[#FF3B1F] px-2.5 py-1 text-[#F3EFE7] font-mono text-[10px] flex items-center gap-2">
                  <div className="relative w-3.5 h-3.5 flex items-center justify-center">
                    <svg className="w-full h-full -rotate-90" viewBox="0 0 20 20">
                      <circle
                        cx="10"
                        cy="10"
                        r="8"
                        fill="none"
                        stroke="rgba(255,255,255,0.2)"
                        strokeWidth="2"
                      />
                      <circle
                        cx="10"
                        cy="10"
                        r="8"
                        fill="none"
                        stroke="#FF3B1F"
                        strokeWidth="2"
                        strokeDasharray={2 * Math.PI * 8}
                        strokeDashoffset={
                          2 * Math.PI * 8 -
                          (isThisHolding ? holdProgress : 0) * (2 * Math.PI * 8)
                        }
                      />
                    </svg>
                  </div>
                  <span>
                    {isThisHolding
                      ? `FRAME ${currentFrameIndex + 1}/${frames.length}`
                      : 'HOLD TO SCRUB REEL'}
                  </span>
                </div>
              </div>

              {/* Tear-Sheet Footer Narrative & External Link */}
              <div className="mt-5 pt-4 border-t border-[#15130F]/15 flex flex-col sm:flex-row justify-between sm:items-end gap-4">
                <p className="font-sans text-sm text-[#15130F]/80 leading-relaxed max-w-md">
                  {project.shortDescription}
                </p>

                {project.url && (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-[#15130F] hover:text-[#FF3B1F] transition-colors border-b border-[#15130F] hover:border-[#FF3B1F] pb-0.5 self-start sm:self-end"
                  >
                    <span>Inspect Production</span>
                    <ExternalLink size={12} />
                  </a>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
};
