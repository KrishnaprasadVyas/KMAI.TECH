import { useState, useCallback, useEffect } from 'react';
import { BrowserRouter, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { useSmoothScroll } from './hooks/useSmoothScroll';
import { CustomCursor } from './components/common/CustomCursor';
import type { CursorState, CursorVariant } from './components/common/CustomCursor';
import { Navbar } from './components/layout/Navbar';
import { DennisPreloader } from './components/layout/DennisPreloader';
import { AppRouter } from './router';
import { Footer } from './components/layout/Footer';
import { scrollToTarget } from './utils/scroll';

function ScrollToHash() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const timer = setTimeout(() => {
        scrollToTarget(hash);
      }, 140);
      return () => clearTimeout(timer);
    } else {
      scrollToTarget(0, { immediate: true });
    }
  }, [pathname, hash]);

  return null;
}

export function App() {
  const [cursorState, setCursorState] = useState<CursorState>({
    variant: 'default',
  });

  // Enable Lenis smooth scrolling across the experience
  useSmoothScroll(true);

  const handleCursorChange = useCallback(
    (variant: CursorVariant, text?: string) => {
      setCursorState({ variant, text });
    },
    []
  );

  const [isIntroActive, setIsIntroActive] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const completed = sessionStorage.getItem('kmai_intro_completed') === 'true';
      return !prefersReduced && !completed;
    }
    return false;
  });

  const handleIntroComplete = useCallback(() => {
    setIsIntroActive(false);
  }, []);

  return (
    <HelmetProvider>
      <BrowserRouter>
        <ScrollToHash />
        <div className="relative min-h-screen bg-[#F2F0EA] text-[#0A0C0F] selection:bg-[#216BFF] selection:text-white font-body">
          {/* Custom Mouse Follower Cursor (Desktop only) */}
          <CustomCursor cursorState={cursorState} />

          {/* Dennis Snellenberg Time-Based Preloader — renders above everything, slides up on exit */}
          {isIntroActive && <DennisPreloader onComplete={handleIntroComplete} />}

          {/* Minimal Floating Navigation (logo + burger + contact CTA) */}
          <Navbar onCursorChange={handleCursorChange} isIntroActive={isIntroActive} />

          {/* Main Experience Stream */}
          <main className="w-full relative z-10 min-h-screen">
            <AppRouter isLoaded={!isIntroActive} onCursorChange={handleCursorChange} />
          </main>

          {/* Minimal Footer */}
          <Footer onCursorChange={handleCursorChange} />
        </div>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
