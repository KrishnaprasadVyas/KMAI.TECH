import React, { useState, useEffect } from 'react';
import { ArrowRight, Mail, MessageCircle, AlertCircle, CheckCircle2 } from 'lucide-react';
import { submitEnquiry, type EnquiryPayload } from '../services/api';
import { SEO } from '../components/common/SEO';
import { trackEvent } from '../utils/analytics';

interface StartProjectProps {
  onCursorChange: (variant: 'default' | 'project' | 'button' | 'image' | 'footer', text?: string) => void;
}

const StartProject: React.FC<StartProjectProps> = ({ onCursorChange }) => {
  const [formData, setFormData] = useState<EnquiryPayload>({
    name: '',
    email: '',
    company: '',
    projectType: 'Web Platform',
    budgetRange: 'Under $10k',
    timeline: 'Flexible',
    description: '',
    preferredContact: 'Email'
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic Client-Side Validation
    if (!formData.name || !formData.email || !formData.description) {
      setStatus('error');
      setErrorMessage('Please fill in all required fields (Name, Email, Description).');
      trackEvent('form_error', { errorType: 'validation' });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setStatus('error');
      setErrorMessage('Please enter a valid email address.');
      trackEvent('form_error', { errorType: 'invalid_email' });
      return;
    }

    setStatus('submitting');
    trackEvent('start_project_form_submit');

    const result = await submitEnquiry(formData);

    if (result.success) {
      setStatus('success');
      setFormData({
        name: '',
        email: '',
        company: '',
        projectType: 'Web Platform',
        budgetRange: 'Under $10k',
        timeline: 'Flexible',
        description: '',
        preferredContact: 'Email'
      });
      trackEvent('submit_enquiry_success');
    } else {
      setStatus('error');
      setErrorMessage(result.message);
      trackEvent('submit_enquiry_failed', { message: result.message });
    }
  };

  return (
    <div className="pt-32 pb-24 min-h-screen bg-[#05070B]">
      <SEO 
        title="Start a Project — KMAI.tech" 
        description="Enquire about starting a digital project with KMAI.tech." 
        canonicalUrl="/start-a-project"
      />
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        
        {/* Header */}
        <div className="mb-16 text-center">
          <span className="font-mono text-xs tracking-widest text-[#006EFF] uppercase block mb-4">
            // PROJECT ENQUIRY
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight leading-tight mb-6">
            TELL US ABOUT <br /> YOUR VISION.
          </h1>
          <p className="text-base sm:text-lg text-[#A0A7B1] font-light leading-relaxed max-w-2xl mx-auto">
            Fill out the form below to help us understand your requirements. We aim to respond within 24-48 business hours.
          </p>
        </div>

        {/* Fallback Direct Contact */}
        <div className="flex flex-col sm:flex-row justify-center gap-6 mb-16">
          <a
            href="mailto:hello@kmai.tech"
            onClick={() => trackEvent('click_email')}
            className="w-full sm:w-auto flex items-center justify-center gap-3 px-6 py-3 rounded-xl bg-[#08111F] border border-white/10 hover:border-[#006EFF]/50 text-white transition-colors"
          >
            <Mail size={16} className="text-[#006EFF]" />
            <span className="font-mono text-xs tracking-widest uppercase">hello@kmai.tech</span>
          </a>
          <a
            href="https://wa.me/message/XXXXXX"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent('click_whatsapp')}
            className="w-full sm:w-auto flex items-center justify-center gap-3 px-6 py-3 rounded-xl bg-[#08111F] border border-white/10 hover:border-[#25D366]/50 text-white transition-colors"
          >
            <MessageCircle size={16} className="text-[#25D366]" />
            <span className="font-mono text-xs tracking-widest uppercase">WhatsApp</span>
          </a>
        </div>

        {/* Form Container */}
        <div className="bg-[#08111F]/40 border border-white/5 p-6 md:p-10 rounded-[2rem]">
          {status === 'success' ? (
            <div className="text-center py-20 animate-[fadeIn_0.5s_ease-out]">
              <div className="w-16 h-16 rounded-full bg-[#006EFF]/20 flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 size={32} className="text-[#006EFF]" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Enquiry Submitted</h3>
              <p className="text-[#A0A7B1] font-light leading-relaxed max-w-md mx-auto">
                Thank you for reaching out. We have received your project details and will be in touch shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8 animate-[fadeIn_0.5s_ease-out]">
              
              {/* Error Message */}
              {status === 'error' && (
                <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 flex items-start gap-3 text-red-400">
                  <AlertCircle size={18} className="shrink-0 mt-0.5" />
                  <p className="text-sm font-medium">{errorMessage}</p>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Name */}
                <div className="space-y-2">
                  <label htmlFor="name" className="block font-mono text-xs text-[#A0A7B1] tracking-widest uppercase">Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-[#05070B] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#006EFF] transition-colors"
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label htmlFor="email" className="block font-mono text-xs text-[#A0A7B1] tracking-widest uppercase">Email *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-[#05070B] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#006EFF] transition-colors"
                  />
                </div>

                {/* Company (Optional) */}
                <div className="space-y-2">
                  <label htmlFor="company" className="block font-mono text-xs text-[#A0A7B1] tracking-widest uppercase">Organization (Optional)</label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full bg-[#05070B] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#006EFF] transition-colors"
                  />
                </div>

                {/* Project Type */}
                <div className="space-y-2">
                  <label htmlFor="projectType" className="block font-mono text-xs text-[#A0A7B1] tracking-widest uppercase">Project Type *</label>
                  <select
                    id="projectType"
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleChange}
                    className="w-full bg-[#05070B] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#006EFF] transition-colors appearance-none"
                  >
                    <option value="Web Platform">Web Platform / Site</option>
                    <option value="Mobile App">Mobile App</option>
                    <option value="Business Automation">Business Automation</option>
                    <option value="AI Integration">AI Integration</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {/* Budget Range */}
                <div className="space-y-2">
                  <label htmlFor="budgetRange" className="block font-mono text-xs text-[#A0A7B1] tracking-widest uppercase">Budget Range *</label>
                  <select
                    id="budgetRange"
                    name="budgetRange"
                    value={formData.budgetRange}
                    onChange={handleChange}
                    className="w-full bg-[#05070B] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#006EFF] transition-colors appearance-none"
                  >
                    <option value="Under $5k">Under $5k</option>
                    <option value="$5k - $10k">$5k - $10k</option>
                    <option value="$10k - $25k">$10k - $25k</option>
                    <option value="$25k+">$25k+</option>
                  </select>
                </div>

                {/* Timeline */}
                <div className="space-y-2">
                  <label htmlFor="timeline" className="block font-mono text-xs text-[#A0A7B1] tracking-widest uppercase">Timeline *</label>
                  <select
                    id="timeline"
                    name="timeline"
                    value={formData.timeline}
                    onChange={handleChange}
                    className="w-full bg-[#05070B] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#006EFF] transition-colors appearance-none"
                  >
                    <option value="Asap">ASAP</option>
                    <option value="1-2 Months">1 - 2 Months</option>
                    <option value="3+ Months">3+ Months</option>
                    <option value="Flexible">Flexible</option>
                  </select>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <label htmlFor="description" className="block font-mono text-xs text-[#A0A7B1] tracking-widest uppercase">Project Details *</label>
                <textarea
                  id="description"
                  name="description"
                  required
                  rows={5}
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe your goals, challenges, and any specific requirements..."
                  className="w-full bg-[#05070B] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#006EFF] transition-colors resize-y"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-4 flex flex-col sm:flex-row justify-end">
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  onMouseEnter={() => onCursorChange('button')}
                  onMouseLeave={() => onCursorChange('default')}
                  className={`w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-[#006EFF] text-white font-mono text-sm tracking-widest uppercase transition-all duration-300 ${
                    status === 'submitting' ? 'opacity-70 cursor-not-allowed' : 'hover:bg-[#1683FF] shadow-[0_0_25px_rgba(0,110,255,0.3)]'
                  }`}
                >
                  {status === 'submitting' ? 'SUBMITTING...' : 'SUBMIT ENQUIRY'}
                  {!status.includes('submitting') && <ArrowRight size={16} />}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default StartProject;
