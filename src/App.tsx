import { useState, useCallback, useEffect } from 'react';
import { useSmoothScroll } from './hooks/useSmoothScroll';
import { Preloader } from './components/layout/Preloader';
import { CustomCursor } from './components/common/CustomCursor';
import { Navbar } from './components/layout/Navbar';
import { BrowserRouter, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AppRouter } from './router';
import { Footer } from './components/layout/Footer';

function ScrollToHash() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        const timer = setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 120);
        return () => clearTimeout(timer);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
}

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
    <HelmetProvider>
      <BrowserRouter>
        <ScrollToHash />
        <div className="relative min-h-screen bg-[#05070B] text-white selection:bg-[#006EFF] selection:text-white">
          {/* Background Noise Texture */}
          <div className="noise-overlay" />

          {/* Cinematic Branded Preloader */}
          {!isLoaded && <Preloader onComplete={() => setIsLoaded(true)} />}

          {/* Custom Mouse Follower Cursor (Desktop only) */}
          <CustomCursor cursorState={cursorState} />

          {/* Minimal Fixed Navigation */}
          <Navbar onCursorChange={handleCursorChange} />

          {/* Main Experience Stream */}
          <main className="w-full relative z-10">
            <AppRouter isLoaded={isLoaded} onCursorChange={handleCursorChange} />
          </main>

          {/* 12 // Footer */}
          <Footer onCursorChange={handleCursorChange} />
        </div>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
