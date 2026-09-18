import React from 'react';

interface SectionLabelProps {
  number: string;
  label: string;
  className?: string;
}

export const SectionLabel: React.FC<SectionLabelProps> = ({ number, label, className = '' }) => {
  return (
    <div className={`flex items-center gap-3 font-mono text-xs tracking-widest text-[#006EFF] uppercase ${className}`}>
      <span className="text-[#006EFF]/60">{number}</span>
      <span className="text-[#006EFF]/30">/</span>
      <span>{label}</span>
    </div>
  );
};
