import { useState, useCallback } from 'react';
import { useSmoothScroll } from './hooks/useSmoothScroll';
import { Preloader } from './components/layout/Preloader';
import { CustomCursor } from './components/common/CustomCursor';
import { Navbar } from './components/layout/Navbar';
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
  const [isLoaded, setIsLoaded] = useState(false);
  const [cursorState, setCursorState] = useState<{
    variant: 'default' | 'project' | 'button' | 'image' | 'footer';
    text?: string;
  }>({
    variant: 'default',
  });

  // Enable Lenis smooth scrolling once preloader finishes
  useSmoothScroll(isLoaded);

  const handleCursorChange = useCallback(
    (variant: 'default' | 'project' | 'button' | 'image' | 'footer', text?: string) => {
      setCursorState({ variant, text });
    },
    []
  );

  return (
    <div className="relative min-h-screen bg-[#F2F0EA] text-[#0A0C0F] selection:bg-[#216BFF] selection:text-white font-body">
      {/* Cinematic Branded Preloader */}
      {!isLoaded && <Preloader onComplete={() => setIsLoaded(true)} />}

      {/* Custom Mouse Follower Cursor (Desktop only) */}
      <CustomCursor cursorState={cursorState} />

      {/* Minimal Floating Navigation */}
      <Navbar onCursorChange={handleCursorChange} />

      {/* Main Experience Stream */}
      <main className="w-full relative z-10">
        {/* 01 — Hero */}
        <Hero isLoaded={isLoaded} onCursorChange={handleCursorChange} />

        {/* 02 — Manifesto */}
        <IntroStatement />

        {/* 03 — Selected Work (The Hero of the Website) */}
        <SelectedWork onCursorChange={handleCursorChange} />

        {/* 04 — Services (The 4 Core Pillars) */}
        <Services onCursorChange={handleCursorChange} />

        {/* 05 — Studio / Founders */}
        <About onCursorChange={handleCursorChange} />

        {/* 06 — Process (Continuous Motion Sequence) */}
        <Process />

        {/* 07 — Client Voices (Editorial Quotes) */}
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
