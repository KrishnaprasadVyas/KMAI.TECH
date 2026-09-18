import React from 'react';
import { WorkReel } from './WorkReel';

interface SelectedWorkProps {
  onHoldStateChange?: (isHolding: boolean, progress: number, frame: number, total: number) => void;
}

export const SelectedWork: React.FC<SelectedWorkProps> = ({ onHoldStateChange }) => {
  return (
    <section
      id="work"
      className="relative scroll-mt-20 w-full py-20 sm:py-28 border-b border-[#15130F]/15 bg-[#F3EFE7]"
    >
      <WorkReel onHoldStateChange={onHoldStateChange} />
    </section>
  );
};
