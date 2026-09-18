import React, { useState } from 'react';
import { ArrowUpRight, Check, Copy } from 'lucide-react';

interface ContactProps {
  onCursorChange?: (variant: 'default' | 'button' | 'project' | 'image' | 'footer', text?: string) => void;
}

export const Contact: React.FC<ContactProps> = ({ onCursorChange }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;
    setIsSubmitted(true);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('contact@kmai.tech');
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <section id="contact" className="relative scroll-mt-24 w-full py-28 sm:py-36 md:py-48 px-6 sm:px-10 md:px-16">
      <div className="w-full max-w-[1540px] mx-auto">
        {/* Monumental Climax Statement */}
        <div className="mb-20 sm:mb-28">
          <h2 className="font-display font-extrabold uppercase text-white tracking-[-0.05em] leading-[0.88] text-[48px] xs:text-[60px] sm:text-[80px] md:text-[104px] lg:text-[128px] xl:text-[144px]">
            LET'S BUILD
            <br />
            SOMETHING
            <br />
            <span className="text-white/40">IMPOSSIBLE.</span>
          </h2>
        </div>

        {/* 12-Column Asymmetric Direct Inquiry Spread */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start">
          {/* Left Column: Direct Reach-out */}
          <div className="lg:col-span-5 space-y-8">
            <p className="font-body text-lg sm:text-xl text-[#8E939E] font-normal leading-relaxed">
              We partner with ambitious founders, cultural institutions, and growing enterprises. Tell us about your project or reach out directly.
            </p>

            <div className="space-y-4 pt-4">
              <div>
                <span className="font-body text-xs text-[#8E939E] block mb-1">Direct email</span>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  onMouseEnter={() => onCursorChange?.('button')}
                  onMouseLeave={() => onCursorChange?.('default')}
                  className="group inline-flex items-center gap-3 font-display text-xl sm:text-2xl font-bold text-white hover:text-[#216BFF] transition-colors"
                >
                  <span>contact@kmai.tech</span>
                  {isCopied ? (
                    <Check size={16} className="text-emerald-400" />
                  ) : (
                    <Copy size={16} className="text-white/40 group-hover:text-white transition-colors" />
                  )}
                </button>
              </div>

              <div>
                <span className="font-body text-xs text-[#8E939E] block mb-1">Direct inquiries</span>
                <p className="font-body text-base text-white/80">
                  Response within 24 hours. Confidential NDA provided upon request.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Clean, Open Inquiry Form (Zero Dashboard Clutter) */}
          <div className="lg:col-span-7">
            {isSubmitted ? (
              <div className="py-16 space-y-4">
                <h3 className="font-display text-3xl font-bold text-white">
                  Inquiry received.
                </h3>
                <p className="font-body text-lg text-[#8E939E]">
                  Thank you for reaching out, {name}. A senior technical partner will review your project and get back to you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="space-y-2">
                  <label htmlFor="contact-name" className="font-body text-sm text-[#8E939E]">
                    Your name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Jane Doe"
                    className="w-full pb-3 pt-1 bg-transparent border-b border-white/20 focus:border-white text-white font-body text-lg placeholder:text-white/20 focus:outline-none transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="contact-email" className="font-body text-sm text-[#8E939E]">
                    Email address
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="jane@company.com"
                    className="w-full pb-3 pt-1 bg-transparent border-b border-white/20 focus:border-white text-white font-body text-lg placeholder:text-white/20 focus:outline-none transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="contact-message" className="font-body text-sm text-[#8E939E]">
                    About your project
                  </label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Describe your goals, timeline, and scope..."
                    className="w-full pb-3 pt-1 bg-transparent border-b border-white/20 focus:border-white text-white font-body text-lg placeholder:text-white/20 focus:outline-none resize-none transition-colors"
                  />
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    onMouseEnter={() => onCursorChange?.('button')}
                    onMouseLeave={() => onCursorChange?.('default')}
                    className="inline-flex items-center gap-3 px-8 py-4 rounded-[2px] bg-white hover:bg-[#216BFF] text-[#07090E] hover:text-white font-body text-base font-medium tracking-normal transition-colors duration-200"
                  >
                    <span>Send inquiry</span>
                    <ArrowUpRight size={18} />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
