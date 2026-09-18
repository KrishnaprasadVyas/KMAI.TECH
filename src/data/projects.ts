import type { Project } from '../types';

export const projects: Project[] = [
  {
    id: 1,
    slug: 'shri-gurudev-ashram',
    number: '01',
    title: 'Shri Gurudev Ashram',
    category: 'Web Platform / Donation System',
    year: '2025',
    status: 'COMPLETED',
    shortDescription: 'Comprehensive spiritual digital platform & donor management ecosystem.',
    description:
      'A complete digital platform for Shri Gurudev Ashram combining spiritual content, online donations, donor management, events, activities, and automated fundraising workflows.',
    url: 'https://shrigurudevashram.org/',
    image: '/projects/gurudev-ashram.svg',
    technologies: [
      'React',
      'Tailwind CSS',
      'Node.js',
      'Express',
      'MongoDB',
      'Razorpay',
      'Firebase',
      'Vercel',
      'OVHCloud'
    ],
    featured: true,
    deliverables: [
      'Online Donation Engine with Razorpay Gateway',
      'Automated 80G Tax Exemption Receipts & Donor Portal',
      'Dynamic Event & Satsang Activity Schedules',
      'Cloud Architecture on Vercel & OVHCloud'
    ],
    highlight: 'Flagship Community & Fundraising Engine'
  },
  {
    id: 2,
    slug: 'shanti-ashram-trust',
    number: '02',
    title: 'Shanti Ashram Trust',
    category: 'Web Platform',
    year: '2025',
    status: 'COMPLETED',
    shortDescription: 'Accessible digital presence communicating humanitarian mission & initiatives.',
    description:
      "A modern digital presence built for Shanti Ashram Trust, designed to communicate the organization's mission and humanitarian activities through a clean and accessible web experience.",
    url: 'https://shantiashramtrust.org/',
    image: '/projects/shanti-ashram.svg',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'Cloudflare'],
    featured: false,
    deliverables: [
      'Editorial Storytelling & Initiatives Showcase',
      'High-Accessibility Accessible Web Layout',
      'Lightning-Fast Global CDN Edge Delivery'
    ],
    highlight: 'Humanitarian Mission Showcase'
  },
  {
    id: 3,
    slug: 'mavt',
    number: '03',
    title: 'MAVT',
    category: 'Travel Platform',
    year: '2026',
    status: 'ONGOING',
    shortDescription: 'Curated pilgrimage journeys with end-to-end booking and itinerary systems.',
    description:
      'A digital travel platform designed around pilgrimage and travel experiences, with a focus on structured journeys, booking flows and a modern user experience.',
    url: 'https://mavt.in/',
    image: '/projects/mavt.svg',
    technologies: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Node.js', 'Supabase'],
    featured: false,
    deliverables: [
      'Multi-Leg Pilgrimage Itinerary Planner',
      'Interactive Seat & Departure Booking Flow',
      'Real-Time Passenger Management Dashboard'
    ],
    highlight: 'Experiential Journey Commerce'
  },
  {
    id: 4,
    slug: 'shri-gurudev-ashram-app',
    number: '04',
    title: 'Shri Gurudev Ashram App',
    category: 'Mobile Application',
    year: '2026',
    status: 'ONGOING',
    shortDescription: 'Mobile ecosystem featuring yatra booking, donations, and collector workflows.',
    description:
      'A mobile application ecosystem for the Shri Gurudev Ashram community featuring yatra booking, donations, profiles, notifications and collector workflows.',
    // Note: No public URL currently exists as specified in brief
    image: '/projects/gurudev-app.svg',
    technologies: [
      'React Native',
      'Expo',
      'Expo Router',
      'TypeScript',
      'Supabase',
      'Zustand',
      'React Query'
    ],
    featured: false,
    deliverables: [
      'Cross-Platform iOS & Android Native Build',
      'Offline-First Collector & Donation Sync',
      'Push Notifications & Spiritual Community Feed'
    ],
    highlight: 'Native Mobile Ecosystem'
  },
  {
    id: 5,
    slug: 'priya-surana',
    number: '05',
    title: 'Priya Surana',
    category: 'Professional Website',
    year: '2025',
    status: 'COMPLETED',
    shortDescription: 'Academic research, publications, and professional identity archive.',
    description:
      'A professional personal website designed to present research, academic work, expertise and professional identity through a clean digital experience.',
    url: 'https://www.priyasurana.in/',
    image: '/projects/priya-surana.svg',
    technologies: ['React', 'Tailwind CSS', 'TypeScript', 'GSAP', 'Vercel'],
    featured: false,
    deliverables: [
      'Curated Academic Paper & Publication Directory',
      'Editorial Typography & Minimalist Aesthetics',
      'Instant Search & Paper Filtering'
    ],
    highlight: 'Academic Identity Archive'
  },
  {
    id: 6,
    slug: 'vishwaraj-polychem',
    number: '06',
    title: 'Vishwaraj Polychem',
    category: 'Industrial Manufacturing Website',
    year: '2026',
    status: 'MOSTLY COMPLETED',
    shortDescription: 'Engineering capabilities, product specifications, and global client portfolio.',
    description:
      'A premium industrial manufacturing website for Vishwaraj Polychem, presenting products, industries, engineering capabilities, clients and manufacturing expertise.',
    url: 'https://www.vishwarajpolychem.com/',
    image: '/projects/vishwaraj.svg',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'GSAP', 'Vite'],
    featured: false,
    deliverables: [
      'Technical Chemical Specification Catalog',
      'B2B RFQ (Request for Quote) Inquiry Funnel',
      'Global Export & Logistics Overview'
    ],
    highlight: 'Enterprise Industrial Showcase'
  }
];
