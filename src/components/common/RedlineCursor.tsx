import React, { useEffect, useRef, useState } from 'react';

interface RedlineCursorProps {
  isHolding?: boolean;
  holdProgress?: number; // 0 to 1
  holdFrameIndex?: number;
  totalFrames?: number;
}

export const RedlineCursor: React.FC<RedlineCursorProps> = ({
  isHolding = false,
  holdProgress = 0,
  holdFrameIndex = 0,
  totalFrames = 3,
}) => {
  const [isTouch] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia('(pointer: coarse)').matches : false
  );
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isOverInspectable, setIsOverInspectable] = useState(false);
  const [inspectLabel, setInspectLabel] = useState<string | null>(null);
  const rafId = useRef<number | null>(null);
  const targetPos = useRef({ x: -100, y: -100 });
  const currentPos = useRef({ x: -100, y: -100 });

  useEffect(() => {
    // Disable custom cursor listeners on touch devices
    if (isTouch) return;

    const handlePointerMove = (e: PointerEvent) => {
      targetPos.current = { x: e.clientX, y: e.clientY };

      // Check if hovering over inspectable element
      const target = e.target as HTMLElement | null;
      const inspectableEl = target?.closest('[data-mask-reveal="true"]') as HTMLElement | null;

      if (inspectableEl) {
        setIsOverInspectable(true);
        const label = inspectableEl.getAttribute('data-spec-label') || 'INSPECT';
        setInspectLabel(label);

        // Update relative CSS custom properties on the inspectable element
        const rect = inspectableEl.getBoundingClientRect();
        const relX = e.clientX - rect.left;
        const relY = e.clientY - rect.top;
        inspectableEl.style.setProperty('--mask-x', `${relX}px`);
        inspectableEl.style.setProperty('--mask-y', `${relY}px`);
        inspectableEl.style.setProperty('--mask-radius', '88px');
      } else {
        setIsOverInspectable(false);
        setInspectLabel(null);
      }
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });

    // Smooth RAF cursor lerp
    const lerp = (a: number, b: number, n: number) => (1 - n) * a + n * b;

    const render = () => {
      // Faster lerp for tight drafting precision
      currentPos.current.x = lerp(currentPos.current.x, targetPos.current.x, 0.45);
      currentPos.current.y = lerp(currentPos.current.y, targetPos.current.y, 0.45);

      setPos({
        x: Math.round(currentPos.current.x),
        y: Math.round(currentPos.current.y),
      });

      rafId.current = requestAnimationFrame(render);
    };

    rafId.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [isTouch]);

  if (isTouch) return null;

  // Ring circumference calculation for hold progress
  const radius = isOverInspectable ? 44 : 14;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - holdProgress * circumference;

  return (
    <div
      className="pointer-events-none fixed z-[99999] top-0 left-0 transition-opacity duration-200"
      style={{
        transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
        opacity: pos.x > 0 ? 1 : 0,
      }}
      aria-hidden="true"
    >
      {/* Reticle / Lens Outer Container */}
      <div
        className={`relative -top-1/2 -left-1/2 flex items-center justify-center transition-all duration-200 ease-out ${
          isOverInspectable ? 'w-44 h-44 -mt-22 -ml-22' : 'w-8 h-8 -mt-4 -ml-4'
        }`}
      >
        {/* Loupe Lens Circle */}
        <div
          className={`absolute inset-0 rounded-full border transition-all duration-200 ${
            isOverInspectable
              ? 'border-[#FF3B1F] bg-[#FF3B1F]/[0.02] shadow-[0_0_0_1px_rgba(255,59,31,0.2)]'
              : 'border-[#15130F]/60'
          }`}
        />

        {/* Hold-to-View SVG Progress Ring */}
        <svg
          className="absolute inset-0 w-full h-full -rotate-90"
          viewBox={`0 0 ${(radius + 4) * 2} ${(radius + 4) * 2}`}
        >
          <circle
            cx={radius + 4}
            cy={radius + 4}
            r={radius}
            fill="none"
            stroke="#FF3B1F"
            strokeWidth={isOverInspectable ? '2' : '1.5'}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="square"
            className="transition-all duration-75"
          />
        </svg>

        {/* Center Drafting Crosshair */}
        <div className="relative flex items-center justify-center">
          <div
            className={`w-[1px] ${
              isOverInspectable ? 'h-6 bg-[#FF3B1F]' : 'h-3 bg-[#15130F]'
            }`}
          />
          <div
            className={`absolute h-[1px] ${
              isOverInspectable ? 'w-6 bg-[#FF3B1F]' : 'w-3 bg-[#15130F]'
            }`}
          />
        </div>

        {/* Inspection Markings on Loupe Perimeter */}
        {isOverInspectable && (
          <>
            {/* Top tick */}
            <div className="absolute top-0 w-[1px] h-2 bg-[#FF3B1F]" />
            {/* Bottom tick */}
            <div className="absolute bottom-0 w-[1px] h-2 bg-[#FF3B1F]" />
            {/* Left tick */}
            <div className="absolute left-0 h-[1px] w-2 bg-[#FF3B1F]" />
            {/* Right tick */}
            <div className="absolute right-0 h-[1px] w-2 bg-[#FF3B1F]" />

            {/* Readout Tag */}
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap bg-[#15130F] text-[#F3EFE7] px-2 py-0.5 font-mono text-[9px] tracking-widest uppercase border border-[#FF3B1F]">
              {isHolding ? (
                <span className="text-[#FF3B1F]">
                  SCRUBBING [{holdFrameIndex + 1}/{totalFrames}]
                </span>
              ) : (
                <span>
                  {inspectLabel} // HOLD TO SCRUB
                </span>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
