import { useState, useCallback } from 'react';
import { useSmoothScroll } from './hooks/useSmoothScroll';
import { RedlineCursor } from './components/common/RedlineCursor';
import { Navbar } from './components/layout/Navbar';
import { Hero } from './components/sections/Hero';
import { SelectedWork } from './components/sections/SelectedWork';
import { Services } from './components/sections/Services';
import { About } from './components/sections/About';
import { Contact } from './components/sections/Contact';
import { Footer } from './components/layout/Footer';

export function App() {
  const [holdState, setHoldState] = useState({
    isHolding: false,
    progress: 0,
    frame: 0,
    total: 3,
  });

  // Enable Lenis smooth scrolling
  useSmoothScroll(true);

  const handleHoldStateChange = useCallback(
    (isHolding: boolean, progress: number, frame: number, total: number) => {
      setHoldState({ isHolding, progress, frame, total });
    },
    []
  );

  return (
    <div className="relative min-h-screen bg-[#F3EFE7] text-[#15130F] selection:bg-[#FF3B1F] selection:text-[#F3EFE7] font-sans antialiased">
      {/* Precision Drafting Loupe & Mask Cursor */}
      <RedlineCursor
        isHolding={holdState.isHolding}
        holdProgress={holdState.progress}
        holdFrameIndex={holdState.frame}
        totalFrames={holdState.total}
      />

      {/* Print-Shop Spec Navbar */}
      <Navbar />

      {/* Main Experience Stream */}
      <main className="w-full relative z-10">
        {/* 01 — Orchestrated Plotter Hero */}
        <Hero />

        {/* 02 — Continuous Horizontal Work Reel with Mask Reveal & Hold-to-View */}
        <SelectedWork onHoldStateChange={handleHoldStateChange} />

        {/* 03 — Uneven-Width Capabilities Rows (Unnumbered) */}
        <Services />

        {/* 04 — Engineering Personnel Register */}
        <About />

        {/* 05 — Chatbot-Style Conversational Intake & Stamped Approval */}
        <Contact />
      </main>

      {/* Colophon Footer */}
      <Footer />
    </div>
  );
}

export default App;
