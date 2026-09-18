import React from 'react';

interface AccentLineProps {
  active?: boolean;
  className?: string;
}

export const AccentLine: React.FC<AccentLineProps> = ({ active = false, className = '' }) => {
  return (
    <div
      className={`h-[1.5px] bg-gradient-to-r from-[#006EFF] to-[#38BDF8] transition-all duration-500 ${
        active ? 'w-full' : 'w-0'
      } ${className}`}
    />
  );
};
