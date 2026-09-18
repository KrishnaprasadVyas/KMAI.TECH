import type { Service } from '../types';

export const services: Service[] = [
  {
    number: '01',
    title: 'SOFTWARE ARCHITECTURE',
    summary: 'Custom full-stack web platforms, internal systems, and mission-critical engines.',
    description:
      'We architect, engineer, and deploy tailor-made web platforms, operational dashboards, and resilient business backbones engineered for speed, high uptime, and zero operational friction.',
    deliverables: [
      'Full-Stack Web Applications & High-Concurrency APIs',
      'Internal Operations Tooling & Executive Dashboards',
      'Database Modeling, Microservices & Cloud Architecture',
      'Automated Testing, CI/CD Pipelines & DevOps Infrastructure'
    ],
    tools: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Express', 'Docker', 'Vercel']
  },
  {
    number: '02',
    title: 'BESPOKE WEB DESIGN',
    summary: 'High-performance websites designed to project authority and convert visitors.',
    description:
      'Award-level digital experiences combining bespoke creative direction, fluid GPU-accelerated motion design, meticulous typography, and instant sub-second page loads.',
    deliverables: [
      'Editorial Studio & Brand Portfolio Platforms',
      'High-Conversion B2B Marketing Systems',
      'Interactive Web Experiences & Kinetic Motion Choreography',
      'Lighthouse 100 Performance & Technical SEO Engineering'
    ],
    tools: ['Tailwind CSS', 'GSAP', 'Vite', 'Lenis', 'Next.js', 'Figma']
  },
  {
    number: '03',
    title: 'BUSINESS AUTOMATION',
    summary: 'Self-driving operational pipelines that eliminate manual bottlenecks.',
    description:
      'We eliminate human error and repetitive overhead by interconnecting payment gateways, CRMs, ERPs, messaging bots, and internal accounting systems into self-driving business workflows.',
    deliverables: [
      'Automated Invoicing, Payment & Tax Exemption Engines',
      'Multi-Channel Customer Onboarding & Notification Dispatch',
      'CRM, Webhook & Complex Third-Party API Orchestration',
      'Continuous Telemetry, Data Extraction & Analytics Automation'
    ],
    tools: ['Cloudflare Workers', 'Serverless APIs', 'Webhooks', 'Stripe / Razorpay', 'Supabase']
  },
  {
    number: '04',
    title: 'AI SOLUTIONS',
    summary: 'Practical intelligent systems integrated into real business operations.',
    description:
      'We bypass superficial AI hype to engineer concrete operational leverage: intelligent retrieval-augmented generation (RAG), autonomous support triage, structured document parsing, and custom LLM workflows.',
    deliverables: [
      'Custom LLM Integration & Production Prompt Pipelines',
      'Intelligent Knowledge Retrieval & Vector RAG Architectures',
      'Autonomous Customer Support & Internal Triage Agents',
      'Automated Document Classification & Entity Extraction Engines'
    ],
    tools: ['OpenAI / Claude APIs', 'Vector Embeddings', 'Python', 'Node.js', 'LangChain']
  }
];
