import React from 'react';
import { Hero } from '../components/sections/Hero';
import { Services } from '../components/sections/Services';
import { SelectedWork } from '../components/sections/SelectedWork';
import { Results } from '../components/sections/Results';
import { WorkMarquee } from '../components/sections/WorkMarquee';
import { About } from '../components/sections/About';
import { Process } from '../components/sections/Process';
import { Technology } from '../components/sections/Technology';
import { TrustClients } from '../components/sections/TrustClients';
import { Contact } from '../components/sections/Contact';

interface HomeProps {
  isLoaded: boolean;
  onCursorChange: (variant: 'default' | 'project' | 'button' | 'image' | 'footer', text?: string) => void;
}

const Home: React.FC<HomeProps> = ({ isLoaded, onCursorChange }) => {
  return (
    <>
      {/* 01 // Hero */}
      <Hero isLoaded={isLoaded} onCursorChange={onCursorChange} />

      {/* 02 // Services (What We Build) */}
      <Services onCursorChange={onCursorChange} />

      {/* 03 // Selected Work (Dennis Snellenberg Hover Preview & Case Studies) */}
      <SelectedWork onCursorChange={onCursorChange} />
      
      {/* 04 // Selected Impact & Capabilities */}
      <Results />

      {/* 05 // Work Marquee Ticker */}
      <WorkMarquee />

      {/* 06 // Trust & Real Organizations */}
      <TrustClients />

      {/* 07 // About Studio & Team */}
      <About onCursorChange={onCursorChange} />

      {/* 08 // How We Build (Process) */}
      <Process />

      {/* 09 // Technologies */}
      <Technology onCursorChange={onCursorChange} />

      {/* 11 // Monumental Contact CTA */}
      <Contact onCursorChange={onCursorChange} />
    </>
  );
};

export default Home;
