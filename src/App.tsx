import { useState, useCallback } from 'react';
import { useSmoothScroll } from './hooks/useSmoothScroll';
import { Preloader } from './components/layout/Preloader';
import { CustomCursor } from './components/common/CustomCursor';
import { Navbar } from './components/layout/Navbar';
import { Hero } from './components/sections/Hero';
import { SelectedWork } from './components/sections/SelectedWork';
import { IntroStatement } from './components/sections/IntroStatement';
import { WorkMarquee } from './components/sections/WorkMarquee';
import { Services } from './components/sections/Services';
import { About } from './components/sections/About';
import { Process } from './components/sections/Process';
import { Technology } from './components/sections/Technology';
import { Testimonials } from './components/sections/Testimonials';
import { TrustClients } from './components/sections/TrustClients';
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

      {/* Minimal Fixed Editorial Navigation */}
      <Navbar onCursorChange={handleCursorChange} />

      {/* Main Experience Stream */}
      <main className="w-full relative z-10">
        {/* 01 // Hero (Paper Canvas) */}
        <Hero isLoaded={isLoaded} onCursorChange={handleCursorChange} />

        {/* 02 // Selected Work (Intro on Paper + Project 01 Flagship on Navy) */}
        <SelectedWork onCursorChange={handleCursorChange} />

        {/* 03 // Manifesto Statement */}
        <IntroStatement />

        {/* 04 // Work Marquee Ticker */}
        <WorkMarquee />

        {/* 05 // Capabilities (The 4 Core Architectural Pillars) */}
        <Services onCursorChange={handleCursorChange} />

        {/* 06 // About Studio & Team */}
        <About onCursorChange={handleCursorChange} />

        {/* 07 // How We Build (Process) */}
        <Process />

        {/* 08 // Technologies */}
        <Technology onCursorChange={handleCursorChange} />

        {/* 09 // Minh Pham Inspired Editorial Testimonials */}
        <Testimonials onCursorChange={handleCursorChange} />

        {/* 10 // Trust & Real Organizations */}
        <TrustClients />

        {/* 11 // Monumental Contact CTA */}
        <Contact onCursorChange={handleCursorChange} />
      </main>

      {/* 12 // Footer */}
      <Footer onCursorChange={handleCursorChange} />
    </div>
  );
}

export default App;
