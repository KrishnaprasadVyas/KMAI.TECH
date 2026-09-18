import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

const Home = lazy(() => import('../pages/Home'));
const ProjectDetail = lazy(() => import('../pages/ProjectDetail'));
const StartProject = lazy(() => import('../pages/StartProject'));
const NotFound = lazy(() => import('../pages/NotFound'));

interface AppRouterProps {
  isLoaded: boolean;
  onCursorChange: (variant: 'default' | 'project' | 'button' | 'image' | 'footer', text?: string) => void;
}

export const AppRouter: React.FC<AppRouterProps> = ({ isLoaded, onCursorChange }) => {
  return (
    <Suspense fallback={null}>
      <Routes>
        <Route path="/" element={<Home isLoaded={isLoaded} onCursorChange={onCursorChange} />} />
        <Route path="/work/:slug" element={<ProjectDetail onCursorChange={onCursorChange} />} />
        <Route path="/start-a-project" element={<StartProject onCursorChange={onCursorChange} />} />
        <Route path="*" element={<NotFound onCursorChange={onCursorChange} />} />
      </Routes>
    </Suspense>
  );
};
