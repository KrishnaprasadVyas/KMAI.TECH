import type { Service } from '../types';

export const services: Service[] = [
  {
    number: '01',
    title: 'SOFTWARE DEVELOPMENT',
    summary: 'Custom software systems built around the way your business actually works.',
    description:
      'We architect, engineer, and deploy tailor-made web platforms, dashboards, and internal business backbones engineered for speed, high uptime, and zero friction.',
    deliverables: [
      'Full-Stack Web Applications',
      'Internal Tooling & Operations Dashboards',
      'API Architecture & Microservices',
      'Database Modeling & Security'
    ],
    tools: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Express']
  },
  {
    number: '02',
    title: 'WEB DESIGN & DEVELOPMENT',
    summary: 'High-performance websites designed to look exceptional and convert visitors.',
    description:
      'Award-level digital experiences combining bespoke creative direction, fluid motion design, meticulous typography, and rapid load times.',
    deliverables: [
      'Editorial & Studio Portfolio Websites',
      'High-Conversion Marketing Platforms',
      'Interactive Web Experiences & Motion Design',
      'Full SEO & Performance Optimization'
    ],
    tools: ['Tailwind CSS', 'GSAP', 'Vite', 'Lenis', 'Next.js']
  },
  {
    number: '03',
    title: 'BUSINESS AUTOMATION',
    summary: 'Remove repetitive work and build systems that allow businesses to operate smarter.',
    description:
      'We eliminate bottlenecks by interconnecting payment gateways, CRMs, ERPs, messaging bots, and internal spreadsheets into self-driving business pipelines.',
    deliverables: [
      'Payment & Invoice Reconciliation Workflows',
      'Automated Customer Onboarding & Notifications',
      'CRM, Webhook & Third-Party Integrations',
      'Data Extraction & Reporting Automation'
    ],
    tools: ['Cloudflare Workers', 'Webhooks', 'Serverless', 'CRMs', 'Zapier/Make']
  },
  {
    number: '04',
    title: 'AI SOLUTIONS',
    summary: 'Practical intelligent systems integrated into real business workflows.',
    description:
      'We bypass AI hype to deliver tangible enterprise value: intelligent document search, agentic data processors, automated customer triage, and customized LLM systems.',
    deliverables: [
      'Custom LLM Integration & Prompt Pipelines',
      'Intelligent Knowledge Bases & RAG Systems',
      'Automated Support & Workflow Assistants',
      'Data Classification & Entity Extraction'
    ],
    tools: ['OpenAI / Claude APIs', 'Vector Embeddings', 'Python', 'Node.js']
  },
  {
    number: '05',
    title: 'DIGITAL PRODUCTS',
    summary: 'End-to-end mobile and digital products engineered from idea to scale.',
    description:
      'From UX wireframing and user research through to production mobile apps, we shape raw concepts into scalable, intuitive digital businesses.',
    deliverables: [
      'Cross-Platform iOS & Android Apps',
      'SaaS Product Architecture & MVP Builds',
      'User Journey Mapping & UI/UX Design',
      'Subscription & Billing Systems'
    ],
    tools: ['React Native', 'Expo', 'Supabase', 'Zustand', 'Stripe/Razorpay']
  },
  {
    number: '06',
    title: 'CUSTOM SYSTEMS',
    summary: 'Bespoke infrastructure, specialized engines, and mission-critical logic.',
    description:
      'When off-the-shelf tools fail to meet specialized industry requirements, we develop dedicated software engines, custom algorithms, and robust cloud configurations.',
    deliverables: [
      'Legacy System Modernization',
      'High-Concurrency Cloud Deployments',
      'Multi-Tenant Architecture',
      'Custom Analytics & Telemetry Engines'
    ],
    tools: ['Docker', 'AWS / OVH / Vercel', 'Redis', 'MongoDB', 'PostgreSQL']
  }
];
