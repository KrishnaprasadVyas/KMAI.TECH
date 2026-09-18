import type { TechnologyItem } from '../types';

export const technologies: TechnologyItem[] = [
  { name: 'React', category: 'Frontend', tagline: 'Component Architecture' },
  { name: 'Next.js', category: 'Frontend', tagline: 'SSR & Edge Streaming' },
  { name: 'TypeScript', category: 'Frontend', tagline: 'Type-Safe Engineering' },
  { name: 'Tailwind CSS', category: 'Frontend', tagline: 'Modern Utility Styling' },
  { name: 'GSAP', category: 'Motion & Ecosystem', tagline: 'Kinetic Motion & Timelines' },
  { name: 'Lenis', category: 'Motion & Ecosystem', tagline: '60fps Smooth Scrolling' },
  { name: 'React Native', category: 'Mobile', tagline: 'Native iOS & Android' },
  { name: 'Expo', category: 'Mobile', tagline: 'Mobile Build Ecosystem' },
  { name: 'Node.js', category: 'Backend', tagline: 'High-Concurrency Runtime' },
  { name: 'Express', category: 'Backend', tagline: 'Robust RESTful APIs' },
  { name: 'Supabase', category: 'Database', tagline: 'Postgres & Realtime Edge' },
  { name: 'MongoDB', category: 'Database', tagline: 'Document Data Store' },
  { name: 'Firebase', category: 'Database', tagline: 'Auth & Cloud Functions' },
  { name: 'Razorpay', category: 'Infra / Payment' as any, tagline: 'Secure Indian & Global Payments' },
  { name: 'Vercel / Cloudflare', category: 'Infra / Payment' as any, tagline: 'Global Edge Network' },
];
