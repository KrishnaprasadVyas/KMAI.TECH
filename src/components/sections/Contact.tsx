import React, { useState } from 'react';
import { ArrowUpRight, Check, Copy } from 'lucide-react';
import type { CursorVariant } from '../common/CustomCursor';
import { CurvedHorizon } from '../common/CurvedHorizon';
import { RoundedButton } from '../common/RoundedButton';
import { Magnetic } from '../common/Magnetic';

interface ContactProps {
  onCursorChange?: (variant: CursorVariant, text?: string) => void;
}

export const Contact: React.FC<ContactProps> = ({ onCursorChange }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isCopied, setIsCopied] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const endpoint = import.meta.env.VITE_CONTACT_ENDPOINT || '/api/contact';
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error || 'Failed to submit inquiry.');
      }

      setIsSubmitted(true);
    } catch (err: unknown) {
      console.error('[Contact Form] Submission error:', err);
      setErrorMessage(
        err instanceof Error
          ? err.message
          : 'Unable to send message. Please email Kmai.tech.support@gmail.com directly.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('Kmai.tech.support@gmail.com');
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="relative w-full bg-[#F2F0EA]">
      {/* Dennis Snellenberg Signature Curved Horizon Transition */}
      <CurvedHorizon fillColor="#07090E" />

      <section
        id="contact"
        data-theme="dark"
        className="relative scroll-mt-0 w-full bg-[#07090E] text-[#F5F5F7] pt-12 sm:pt-16 md:pt-20 pb-24 sm:pb-32 md:pb-40 px-6 sm:px-10 md:px-16"
      >
      <div className="w-full max-w-[1540px] mx-auto">
        {/* Monumental Climax Statement */}
        <div className="mb-10 sm:mb-14">
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
                <Magnetic strength={0.3}>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    onMouseEnter={() => onCursorChange?.('button')}
                    onMouseLeave={() => onCursorChange?.('default')}
                    className="group inline-flex items-center gap-3 font-display text-xl sm:text-2xl font-bold text-white hover:text-[#216BFF] transition-colors py-1"
                  >
                    <span>Kmai.tech.support@gmail.com</span>
                    {isCopied ? (
                      <Check size={16} className="text-emerald-400" />
                    ) : (
                      <Copy size={16} className="text-white/40 group-hover:text-white transition-colors" />
                    )}
                  </button>
                </Magnetic>
              </div>

              <div>
                <span className="font-body text-xs text-[#8E939E] block mb-1">Direct inquiries</span>
                <p className="font-body text-base text-white/80">
                  Response within 24 hours.
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

                {errorMessage && (
                  <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-200 text-sm font-body">
                    <p>{errorMessage}</p>
                    <p className="mt-1 text-xs text-white/60">
                      You can also email us directly at{' '}
                      <a href="mailto:Kmai.tech.support@gmail.com" className="text-[#216BFF] underline">
                        Kmai.tech.support@gmail.com
                      </a>
                    </p>
                  </div>
                )}

                <div className="pt-4">
                  <RoundedButton
                    type="submit"
                    backgroundColor="#216BFF"
                    hoverTextColor="white"
                    restTextColor="#F2F0EA"
                    disabled={isSubmitting}
                    onMouseEnter={() => onCursorChange?.('button')}
                    onMouseLeave={() => onCursorChange?.('default')}
                    className="border-white/30 px-8 py-4 text-base tracking-normal font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="inline-flex items-center gap-3">
                      <span>{isSubmitting ? 'Sending inquiry...' : 'Send inquiry'}</span>
                      <ArrowUpRight size={18} className={isSubmitting ? 'animate-pulse' : ''} />
                    </span>
                  </RoundedButton>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
    </div>
  );
};
