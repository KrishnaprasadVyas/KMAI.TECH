export interface ProjectImages {
  hero: string;
  secondary?: string[];
  mobile?: string[];
}

export interface Project {
  id: number;
  slug: string;
  number: string;
  title: string;
  category: string;
  year: string;
  status: 'COMPLETED' | 'ONGOING' | 'MOSTLY COMPLETED';
  shortDescription: string;
  description: string;
  url?: string;
  images: ProjectImages;
  image: string; // alias pointing to images.hero for compatibility
  technologies: string[];
  featured?: boolean;
  deliverables?: string[];
  highlight?: string;
}

export interface Service {
  number: string;
  title: string;
  summary: string;
  description: string;
  deliverables: string[];
  tools: string[];
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  organization: string;
  year: string;
  isPlaceholder: boolean;
  projectTag?: string;
  outcome?: string;
}

export interface TechnologyItem {
  name: string;
  category: 'Frontend' | 'Backend' | 'Database' | 'Mobile' | 'Motion & Ecosystem';
  tagline: string;
}

export interface CursorState {
  text?: string;
  variant: 'default' | 'project' | 'button' | 'image' | 'footer';
  active: boolean;
}
