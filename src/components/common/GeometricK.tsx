import React from 'react';

interface GeometricKProps {
  className?: string;
  size?: number;
  theme?: 'light' | 'dark'; // 'light' is for Paper canvas (#F2F0EA); 'dark' is for Navy canvas (#101827)
  glow?: boolean;
  variant?: 'mark' | 'badge';
}

export const GeometricK: React.FC<GeometricKProps> = ({
  className = '',
  size = 32,
  theme = 'light',
}) => {
  const spineColor = theme === 'light' ? '#0A0C0F' : '#F2F0EA';
  const armColor = '#216BFF'; // Electric Blue graphic accent
  const legColor = theme === 'light' ? '#0A0C0F' : '#F2F0EA';

  return (
    <div
      className={`inline-flex items-center justify-center select-none ${className}`}
      style={{ width: size, height: size }}
      aria-label="KMAI Geometric Emblem"
      role="img"
    >
      <svg
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
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
