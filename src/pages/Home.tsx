import React from 'react';
import { SEO } from '../components/common/SEO';
import { Hero } from '../components/sections/Hero';
import { IntroStatement } from '../components/sections/IntroStatement';
import { SelectedWork } from '../components/sections/SelectedWork';
import { Services } from '../components/sections/Services';
import { About } from '../components/sections/About';
import { Process } from '../components/sections/Process';
import { Testimonials } from '../components/sections/Testimonials';
import { Contact } from '../components/sections/Contact';
import type { CursorVariant } from '../components/common/CustomCursor';

interface HomeProps {
  isLoaded: boolean;
  onCursorChange: (variant: CursorVariant, text?: string) => void;
}

const Home: React.FC<HomeProps> = ({ isLoaded, onCursorChange }) => {
  return (
    <>
      <SEO
        title="KMAI.tech — Creative Technology Studio"
        description="KMAI is an independent creative technology studio engineering custom software, bespoke web experiences, and operational automation."
        canonicalUrl="/"
      />

      {/* 01 // Hero */}
      <Hero isLoaded={isLoaded} onCursorChange={onCursorChange} />

      {/* 02 // Manifesto */}
      <IntroStatement />

      {/* 03 // Selected Work */}
      <SelectedWork onCursorChange={onCursorChange} />

      {/* 04 // Services (Capabilities) */}
      <Services onCursorChange={onCursorChange} />

      {/* 05 // About (The Studio) */}
      <About onCursorChange={onCursorChange} />

      {/* 06 // Process */}
      <Process onCursorChange={onCursorChange} />

      {/* 07 // Client Voices */}
      <Testimonials onCursorChange={onCursorChange} />

      {/* 08 // Contact */}
      <Contact onCursorChange={onCursorChange} />
    </>
  );
};

export default Home;
