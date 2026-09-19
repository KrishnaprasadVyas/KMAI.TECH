import React from 'react';

interface CurvedHorizonProps {
  className?: string;
  fillColor?: string;
}

/**
 * A clean static CSS arch that transitions the background between sections.
 * Replaced the buggy GSAP ScrollTrigger SVG path animation which caused
 * an abrupt straightening artifact. A simple border-radius approach achieves
 * the same visual intent — graceful concave sweep into the dark section —
 * without any animation glitches.
 */
export const CurvedHorizon: React.FC<CurvedHorizonProps> = ({
  className = '',
  fillColor = '#07090E',
}) => {
  return (
    <div
      className={`relative w-full overflow-hidden pointer-events-none -mb-[1px] ${className}`}
      style={{ height: 'clamp(56px, 10vw, 120px)' }}
      aria-hidden="true"
    >
      <div
        className="absolute bottom-0 left-[-5%] w-[110%] h-full"
        style={{
          backgroundColor: fillColor,
          borderTopLeftRadius: '50% clamp(40px, 8vw, 100px)',
          borderTopRightRadius: '50% clamp(40px, 8vw, 100px)',
        }}
      />
    </div>
  );
};
