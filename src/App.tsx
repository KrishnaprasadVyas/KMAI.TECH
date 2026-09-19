import { useState, useCallback } from 'react';
import { useSmoothScroll } from './hooks/useSmoothScroll';
import { CustomCursor } from './components/common/CustomCursor';
import type { CursorState, CursorVariant } from './components/common/CustomCursor';
import { Navbar } from './components/layout/Navbar';
import { DennisPreloader } from './components/layout/DennisPreloader';
import { Hero } from './components/sections/Hero';
import { IntroStatement } from './components/sections/IntroStatement';
import { SelectedWork } from './components/sections/SelectedWork';
import { Services } from './components/sections/Services';
import { About } from './components/sections/About';
import { Process } from './components/sections/Process';
import { Testimonials } from './components/sections/Testimonials';
import { Contact } from './components/sections/Contact';
import { Footer } from './components/layout/Footer';

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
    <div className="relative min-h-screen bg-[#F2F0EA] text-[#0A0C0F] selection:bg-[#216BFF] selection:text-white font-body">
      {/* Custom Mouse Follower Cursor (Desktop only) */}
      <CustomCursor cursorState={cursorState} />

      {/* Dennis Snellenberg Time-Based Preloader — renders above everything, slides up on exit */}
      {isIntroActive && <DennisPreloader onComplete={handleIntroComplete} />}

      {/* Minimal Floating Navigation (logo + burger + contact CTA) */}
      <Navbar onCursorChange={handleCursorChange} isIntroActive={isIntroActive} />

      {/* Main Experience Stream */}
      <main className="w-full">
        {/* 01 — Hero */}
        <Hero isLoaded={true} onCursorChange={handleCursorChange} />

        {/* 02 — Manifesto */}
        <IntroStatement />

        {/* 03 — Selected Work */}
        <SelectedWork onCursorChange={handleCursorChange} />

        {/* 04 — Services */}
        <Services onCursorChange={handleCursorChange} />

        {/* 05 — Studio / Founders */}
        <About onCursorChange={handleCursorChange} />

        {/* 06 — Process */}
        <Process onCursorChange={handleCursorChange} />

        {/* 07 — Client Voices */}
        <Testimonials onCursorChange={handleCursorChange} />

        {/* 08 — Climax Contact */}
        <Contact onCursorChange={handleCursorChange} />
      </main>

      {/* 09 — Minimal Footer */}
      <Footer onCursorChange={handleCursorChange} />
    </div>
  );
}

export default App;
