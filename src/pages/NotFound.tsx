import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Compass } from 'lucide-react';
import { SEO } from '../components/common/SEO';
import { trackEvent } from '../utils/analytics';

import type { CursorVariant } from '../components/common/CustomCursor';

interface NotFoundProps {
  onCursorChange: (variant: CursorVariant, text?: string) => void;
}

const NotFound: React.FC<NotFoundProps> = ({ onCursorChange }) => {
  useEffect(() => {
    trackEvent('404_error', { path: window.location.pathname });
  }, []);

  return (
    <div className="pt-32 pb-24 min-h-[80vh] bg-[#05070B] flex flex-col items-center justify-center">
      <SEO 
        title="Page Not Found — KMAI.tech" 
        description="The page you are looking for does not exist." 
      />
      <div className="max-w-2xl mx-auto px-6 text-center space-y-8 animate-[fadeIn_0.5s_ease-out]">
        
        <div className="flex justify-center">
          <div className="w-20 h-20 rounded-full bg-[#08111F] border border-white/10 flex items-center justify-center">
            <Compass size={32} className="text-[#006EFF]" />
          </div>
        </div>
        
        <div>
          <h1 className="text-6xl md:text-8xl font-extrabold text-white tracking-tighter mb-4">
            404
          </h1>
          <h2 className="font-mono text-sm tracking-widest text-[#006EFF] uppercase mb-6">
            // DESTINATION UNKNOWN
          </h2>
          <p className="text-[#A0A7B1] text-lg font-light leading-relaxed mb-10">
            The page you are looking for has been moved, deleted, or never existed in the first place.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <Link
            to="/"
            onMouseEnter={() => onCursorChange('button')}
            onMouseLeave={() => onCursorChange('default')}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#006EFF] hover:bg-[#1683FF] text-white font-mono text-xs tracking-widest uppercase transition-all duration-300 shadow-[0_0_25px_rgba(0,110,255,0.3)]"
          >
            <ArrowLeft size={16} />
            RETURN TO HOMEPAGE
          </Link>
          <a
            href="/#contact"
            onMouseEnter={() => onCursorChange('button')}
            onMouseLeave={() => onCursorChange('default')}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-transparent hover:bg-white/5 border border-white/20 text-white font-mono text-xs tracking-widest uppercase transition-all duration-300"
          >
            CONTACT US
          </a>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
