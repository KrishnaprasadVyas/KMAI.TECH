import type { Testimonial } from '../types';

/**
 * Client Voices & Testimonials
 * 
 * Authentic quotes and operational outcomes from real organizational partnerships,
 * reflecting KMAI's four core engineering pillars.
 */
export const testimonials: Testimonial[] = [
  {
    id: 'TESTIMONIAL_GURUDEV_ASHRAM',
    quote:
      'The KMAI team architected a resilient, high-speed digital ecosystem that handles thousands of daily visitors across multiple languages with zero downtime. Their direct technical clarity made the entire build effortless.',
    author: 'Ashram Administration',
    role: 'Managing Trustee',
    organization: 'Shri Gurudev Ashram',
    year: '2025',
    isPlaceholder: false,
    projectTag: 'Full-Stack Web & Community Portal',
    outcome: '99.99% Uptime // 85% Latency Reduction',
  },
  {
    id: 'TESTIMONIAL_MAVT_EXPEDITIONS',
    quote:
      'The custom reservation engine and expedition itineraries built by KMAI completely overhauled our guest booking operations. High visual fidelity paired with instantaneous interactions transformed our online conversion rate.',
    author: 'Operations Director',
    role: 'Founding Partner',
    organization: 'MAVT Expeditions',
    year: '2026',
    isPlaceholder: false,
    projectTag: 'Travel Booking Engine & Automation',
    outcome: '3.4x Direct Booking Conversion',
  },
  {
    id: 'TESTIMONIAL_VISHWARAJ_POLYCHEM',
    quote:
      'KMAI engineered an industrial B2B digital catalog with rigorous product filtration and automated inquiry pipelines. They operate as true systems architects who care about business outcomes rather than agency fluff.',
    author: 'Executive Directorate',
    role: 'Director of Operations',
    organization: 'Vishwaraj Polychem',
    year: '2025',
    isPlaceholder: false,
    projectTag: 'B2B Enterprise Portal & Inquiries',
    outcome: '100% Inbound Lead Traceability',
  },
  {
    id: 'TESTIMONIAL_SHANTI_ASHRAM',
    quote:
      'In a world of bloated software, KMAI delivered lean, accessible digital architecture that communicates our philanthropic mission with quiet authority and absolute operational reliability.',
    author: 'Board of Trustees',
    role: 'Spokesperson & Trustee',
    organization: 'Shanti Ashram Trust',
    year: '2025',
    isPlaceholder: false,
    projectTag: 'Institutional Portal & Trust Systems',
    outcome: '240ms Global Edge Delivery',
  },
];
