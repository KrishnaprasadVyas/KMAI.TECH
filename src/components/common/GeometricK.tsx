import React from 'react';

interface GeometricKProps {
  className?: string;
  size?: number;
  theme?: 'light' | 'dark'; // 'light' is for Paper canvas (#F2F0EA); 'dark' is for Navy canvas (#101827)
  glow?: boolean;
  variant?: 'mark' | 'badge' | 'monumental' | 'aperture';
}

export const GeometricK: React.FC<GeometricKProps> = ({
  className = '',
  size = 24,
  theme = 'light',
  variant = 'mark',
}) => {
  const spineColor = theme === 'light' ? '#0A0C0F' : '#F2F0EA';
  const armColor = '#216BFF'; // Electric Blue graphic accent
  const legColor = theme === 'light' ? '#0A0C0F' : '#F2F0EA';

  const isMonumental = variant === 'monumental' || variant === 'aperture';
  const width = isMonumental ? '100%' : Math.round(size * (104 / 154));
  const height = isMonumental ? '100%' : size;

  return (
    <div
      className={`inline-flex items-center justify-center select-none shrink-0 ${className}`}
      style={{ width, height }}
      aria-label="KMAI Geometric Emblem"
      role="img"
    >
      <svg
        viewBox="48 22 104 154"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full block"
      >
        {/* 1. Monolithic Vertical Spine (Sharp Architectural Polygon) */}
        <polygon
          points="48,32 56,24 64,24 64,176 56,176 48,168"
          fill={spineColor}
        />

        {/* 2. Upper Diagonal Arm (Sharp 45° Miter Polygon, Electric Blue Accent) */}
        <polygon
          points="64,98 132,30 148,30 148,46 80,114 64,114"
          fill={armColor}
        />

        {/* 3. Lower Diagonal Leg (Sharp 45° Miter Polygon) */}
        <polygon
          points="72,106 134,168 150,168 150,152 88,90 72,106"
          fill={legColor}
        />

        {/* 4. Precision Geometric Terminal Diamond Anchor */}
        <polygon points="148,22 152,26 148,30 144,26" fill="#216BFF" />
      </svg>
    </div>
  );
};
