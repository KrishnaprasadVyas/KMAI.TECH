import React, { useEffect, useMemo } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { ExternalLink, CheckCircle, Layers, Activity, ArrowRight } from 'lucide-react';
import { projects } from '../data/projects';
import { SEO } from '../components/common/SEO';
import { trackEvent } from '../utils/analytics';

interface ProjectDetailProps {
  onCursorChange: (variant: 'default' | 'project' | 'button' | 'image' | 'footer', text?: string) => void;
}

const ProjectDetail: React.FC<ProjectDetailProps> = ({ onCursorChange }) => {
  const { slug } = useParams<{ slug: string }>();
  
  const project = useMemo(() => projects.find((p) => p.slug === slug), [slug]);
  const relatedProjects = useMemo(() => {
    if (!project) return [];
    return projects.filter(p => p.category === project.category && p.id !== project.id).slice(0, 2);
  }, [project]);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (project) {
      trackEvent('view_project', { slug: project.slug });
    }
  }, [project]);

  if (!project) {
    return <Navigate to="/404" replace />;
  }

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: `${project.title} - KMAI.tech Case Study`,
    image: `https://kmai.tech${project.ogImage || project.image}`,
    author: {
      '@type': 'Organization',
      name: 'KMAI.tech',
    },
    publisher: {
      '@type': 'Organization',
      name: 'KMAI.tech',
      logo: {
        '@type': 'ImageObject',
        url: 'https://kmai.tech/logo.png', // Assuming a logo exists
      },
    },
    description: project.description,
  };

  return (
    <div className="pt-32 pb-24 min-h-screen bg-[#05070B]">
      <SEO
        title={`${project.title} — KMAI.tech`}
        description={project.description}
        canonicalUrl={`/work/${project.slug}`}
        ogImage={project.ogImage || project.image}
        schema={schema}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-16 md:space-y-24">
        
        {/* Title & Metadata Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="font-mono text-sm text-[#006EFF] font-bold">
                PROJECT // {project.number}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-white/30" />
              <span className="font-mono text-xs text-[#A0A7B1] uppercase">
                {project.category}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-white/30" />
              <span className="font-mono text-xs text-[#A0A7B1]">
                YEAR {project.year}
              </span>
            </div>
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-tight leading-[1.1]">
              {project.title}
            </h1>
          </div>

          {project.url && (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent('click_live_project', { slug: project.slug })}
              onMouseEnter={() => onCursorChange('button')}
              onMouseLeave={() => onCursorChange('default')}
              className="inline-flex shrink-0 items-center gap-2.5 px-8 py-4 rounded-full bg-[#006EFF] hover:bg-[#1683FF] text-white font-mono text-sm tracking-widest uppercase transition-all duration-300 shadow-[0_0_25px_rgba(0,110,255,0.3)]"
            >
              <span>OPEN LIVE PROJECT</span>
              <ExternalLink size={16} />
            </a>
          )}
        </div>

        {/* Eager Load Hero Image */}
        <div 
          className="w-full rounded-2xl md:rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl bg-[#05070B]"
          onMouseEnter={() => onCursorChange('image')}
          onMouseLeave={() => onCursorChange('default')}
        >
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-auto max-h-[80vh] object-cover"
            // Eager loading for LCP
            loading="eager" 
          />
        </div>

        {/* Detailed Project Breakdown Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Story & Scope (Challenge/Solution) */}
          <div className="lg:col-span-8 space-y-12">
            
            {project.challenge && (
              <div>
                <h3 className="font-mono text-sm text-[#006EFF] tracking-widest uppercase mb-5 flex items-center gap-3">
                  <Activity size={16} />
                  THE CHALLENGE
                </h3>
                <p className="text-[#A0A7B1] text-lg sm:text-xl leading-relaxed font-light">
                  {project.challenge}
                </p>
              </div>
            )}
            
            {project.solution && (
              <div>
                <h3 className="font-mono text-sm text-[#006EFF] tracking-widest uppercase mb-5 flex items-center gap-3">
                  <Layers size={16} />
                  THE SOLUTION
                </h3>
                <p className="text-[#A0A7B1] text-lg sm:text-xl leading-relaxed font-light">
                  {project.solution}
                </p>
              </div>
            )}

            {!project.challenge && !project.solution && (
              <div>
                <h3 className="font-mono text-sm text-[#006EFF] tracking-widest uppercase mb-5 flex items-center gap-3">
                  <Layers size={16} />
                  SYSTEM ARCHITECTURE &amp; SCOPE
                </h3>
                <p className="text-[#A0A7B1] text-lg sm:text-xl leading-relaxed font-light">
                  {project.description}
                </p>
              </div>
            )}

            {/* Key Features */}
            {(project.keyFeatures || project.deliverables) && (
              <div className="pt-4 border-t border-white/5">
                <h4 className="font-mono text-sm text-white font-bold tracking-widest uppercase mb-6">
                  KEY FEATURES &amp; DELIVERABLES
                </h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {(project.keyFeatures || project.deliverables)?.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-base text-[#CBD5E1]">
                      <CheckCircle size={18} className="text-[#006EFF] shrink-0 mt-1" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Technical Specifications */}
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-[#08111F]/60 p-6 md:p-8 rounded-3xl border border-white/5">
              <span className="font-mono text-xs text-[#A0A7B1] tracking-widest uppercase block mb-5">
                PRODUCTION STACK
              </span>
              <div className="flex flex-wrap gap-2.5">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3.5 py-2 rounded-xl bg-[#0E1E38] border border-[#162F54] text-xs font-mono text-[#38BDF8]"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {project.outcome && (
                <div className="border-t border-white/10 mt-8 pt-8">
                  <span className="font-mono text-xs text-[#A0A7B1] tracking-widest uppercase block mb-4">
                    DELIVERABLE / OUTCOME
                  </span>
                  <p className="text-base text-white leading-relaxed font-medium">
                    {project.outcome}
                  </p>
                </div>
              )}

              <div className="border-t border-white/10 mt-8 pt-8 space-y-4 font-mono text-sm">
                <div className="flex justify-between items-center text-[#A0A7B1]">
                  <span>STATUS</span>
                  <span className={`px-3 py-1 rounded-full text-[10px] tracking-wider uppercase font-bold ${
                    project.status === 'COMPLETED'
                      ? 'bg-[#14532D]/60 text-[#4ADE80] border border-[#22C55E]/30'
                      : 'bg-[#1E3A8A]/60 text-[#60A5FA] border border-[#006EFF]/30'
                  }`}>
                    {project.status}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Lazy Loaded Secondary Images */}
        {project.images?.secondary && project.images.secondary.length > 0 && (
          <div className="pt-16 border-t border-white/5 space-y-12">
            <div className="flex items-center gap-4">
               <span className="font-mono text-sm text-[#006EFF] font-bold">
                // VISUAL EVIDENCE
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {project.images.secondary.map((imgSrc, idx) => (
                <div
                  key={idx}
                  className="w-full rounded-2xl overflow-hidden border border-white/10 bg-[#05070B] shadow-lg"
                  onMouseEnter={() => onCursorChange('image')}
                  onMouseLeave={() => onCursorChange('default')}
                >
                  <img
                    src={imgSrc}
                    alt={`${project.title} detailed screen ${idx + 1}`}
                    className="w-full h-auto object-cover"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Related Projects */}
        {relatedProjects.length > 0 && (
          <div className="pt-24 border-t border-white/5">
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-10">
              RELATED PROJECTS
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {relatedProjects.map(rp => (
                <Link
                  key={rp.id}
                  to={`/work/${rp.slug}`}
                  onMouseEnter={() => onCursorChange('project')}
                  onMouseLeave={() => onCursorChange('default')}
                  className="group block relative overflow-hidden rounded-2xl border border-white/10 bg-[#08111F]/50 aspect-video"
                >
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-500 z-10" />
                  <img
                    src={rp.image}
                    alt={rp.title}
                    className="absolute inset-0 w-full h-full object-cover scale-100 group-hover:scale-105 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 z-20 flex flex-col justify-end p-8 bg-gradient-to-t from-black/90 via-black/40 to-transparent">
                    <span className="font-mono text-xs text-[#006EFF] mb-2">{rp.category}</span>
                    <h4 className="text-2xl font-bold text-white mb-2">{rp.title}</h4>
                    <span className="inline-flex items-center gap-2 font-mono text-xs text-white/70 group-hover:text-white transition-colors">
                      VIEW CASE STUDY <ArrowRight size={14} />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="pt-24 pb-12 flex justify-center border-t border-white/5">
          <Link
            to="/start-a-project"
            onMouseEnter={() => onCursorChange('button')}
            onMouseLeave={() => onCursorChange('default')}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white font-mono text-sm tracking-widest uppercase transition-all duration-300"
          >
            START A SIMILAR PROJECT
            <ArrowRight size={16} className="text-[#006EFF]" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
