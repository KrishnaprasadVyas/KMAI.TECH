import React, { useState } from 'react';
import { technologies } from '../../data/technologies';
import { Terminal, Code, Database, Smartphone, Zap } from 'lucide-react';

interface TechnologyProps {
  onCursorChange?: (variant: 'default' | 'button' | 'project' | 'image' | 'footer', text?: string) => void;
}

export const Technology: React.FC<TechnologyProps> = ({ onCursorChange }) => {
  const [activeTech, setActiveTech] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  const categories = [
    { name: 'ALL', icon: null },
    { name: 'Frontend', icon: <Code size={14} /> },
    { name: 'Backend', icon: <Terminal size={14} /> },
    { name: 'Database', icon: <Database size={14} /> },
    { name: 'Mobile', icon: <Smartphone size={14} /> },
    { name: 'Motion & Ecosystem', icon: <Zap size={14} /> },
  ];

  const filteredTechnologies =
    selectedCategory === 'ALL'
      ? technologies
      : technologies.filter((t) => t.category === selectedCategory);

  return (
    <section
      id="technology"
      className="relative py-28 md:py-40 px-6 md:px-12 bg-[#05070B] border-b border-white/5 overflow-hidden"
    >
      {/* Subtle radial glow in background */}
      <div className="absolute top-1/2 right-1/4 w-[400px] h-[400px] rounded-full bg-[#006EFF]/10 blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-6 border-b border-white/10 pb-8">
          <div>
            <span className="font-mono text-xs tracking-widest text-[#006EFF] uppercase block mb-3">
              // ENGINEERING STACK
            </span>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-tight">
              THE TOOLS BEHIND THE WORK
            </h2>
          </div>
          <p className="max-w-md text-sm sm:text-base text-[#A0A7B1] font-light">
            A curated, battle-tested modern stack chosen for reliability, high runtime performance, and long-term maintainability.
          </p>
        </div>

        {/* Category Filter Chips */}
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.name}
              type="button"
              onClick={() => setSelectedCategory(cat.name)}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-mono text-xs tracking-wider transition-all duration-300 ${
                selectedCategory === cat.name
                  ? 'bg-[#006EFF] text-white shadow-[0_0_15px_rgba(0,110,255,0.4)]'
                  : 'bg-[#08111F] text-[#A0A7B1] hover:text-white border border-white/5'
              }`}
            >
              {cat.icon}
              <span>{cat.name}</span>
            </button>
          ))}
        </div>

        {/* Interactive Monochrome Typographic System */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredTechnologies.map((tech) => {
            const isHovered = activeTech === tech.name;

            return (
              <div
                key={tech.name}
                className="group relative p-6 sm:p-8 rounded-2xl bg-[#08111F]/50 hover:bg-[#08111F] border border-white/5 hover:border-[#006EFF]/50 transition-all duration-300 cursor-pointer overflow-hidden select-none"
                onMouseEnter={() => {
                  setActiveTech(tech.name);
                  onCursorChange?.('button');
                }}
                onMouseLeave={() => {
                  setActiveTech(null);
                  onCursorChange?.('default');
                }}
              >
                {/* Background blue glow upon hover */}
                <div
                  className={`absolute -top-12 -right-12 w-28 h-28 rounded-full bg-[#006EFF]/20 blur-xl transition-opacity duration-300 ${
                    isHovered ? 'opacity-100' : 'opacity-0'
                  }`}
                />

                <div className="relative z-10 flex flex-col justify-between h-full">
                  <div>
                    <span className="font-mono text-[10px] tracking-widest text-[#758BAA] group-hover:text-[#006EFF] uppercase transition-colors block mb-2">
                      {tech.category}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-[#CBD5E1] group-hover:text-white transition-colors tracking-tight">
                      {tech.name}
                    </h3>
                  </div>

                  <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between">
                    <span className="font-mono text-xs text-[#A0A7B1] group-hover:text-[#F3F5F7] transition-colors">
                      {tech.tagline}
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-[#006EFF] group-hover:shadow-[0_0_8px_#006EFF] transition-all" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Engineering Philosophy Note */}
        <div className="mt-16 p-8 rounded-2xl bg-[#08111F]/30 border border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <span className="w-3 h-3 rounded-full bg-[#006EFF] shadow-[0_0_10px_#006EFF] animate-pulse" />
            <p className="text-sm md:text-base text-[#CBD5E1] font-light">
              <strong className="text-white font-medium">Zero Bloat Policy:</strong> We choose dependencies with strict performance budgets, prioritizing CSS transforms and GPU acceleration.
            </p>
          </div>
          <div className="font-mono text-xs text-[#006EFF] tracking-wider shrink-0">
            60FPS RUNTIME ASSURANCE
          </div>
        </div>
      </div>
    </section>
  );
};
