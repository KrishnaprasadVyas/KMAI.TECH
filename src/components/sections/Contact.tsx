import React, { useState } from 'react';
import { Check, Copy } from 'lucide-react';

export const Contact: React.FC = () => {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [selectedDiscipline, setSelectedDiscipline] = useState('High-Concurrency Web Platform');
  const [scopeDetails, setScopeDetails] = useState('');
  const [budgetRange, setBudgetRange] = useState('$25k – $50k');
  const [timeline, setTimeline] = useState('4–8 Weeks');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('contact@kmai.tech');
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <section
      id="contact"
      className="relative scroll-mt-20 w-full py-24 sm:py-32 px-6 sm:px-10 md:px-16 border-b border-[#15130F]/15 bg-drafting-grid"
    >
      <div className="w-full max-w-[1540px] mx-auto">
        {/* Section Header */}
        <div className="flex flex-wrap items-end justify-between gap-4 pb-8 mb-16 border-b border-[#15130F]/15 font-mono text-xs text-[#636059]">
          <div>
            <div className="text-[#FF3B1F] uppercase tracking-widest text-[11px] mb-1">
              + COMMISSION DISPATCH
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#15130F] font-normal tracking-tight">
              Initiate System Specification
            </h2>
          </div>
          <div className="text-right text-[11px]">
            <div>COMMISSION PROTOCOL</div>
            <div className="text-[#15130F] font-semibold">
              CHATBOT-STYLE INTAKE
            </div>
          </div>
        </div>

        {/* 12-Column Asymmetric Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left 5 Cols: Direct Technical Tone & Channels */}
          <div className="lg:col-span-5 space-y-8">
            <p className="font-sans text-lg sm:text-xl text-[#15130F] font-normal leading-relaxed">
              No sales rep, no calendar links. Complete the three-step intake, and a systems architect responds with a technical build plan within 24 hours.
            </p>

            <div className="border border-[#15130F] bg-[#F3EFE7] p-6 space-y-4">
              <div className="font-mono text-xs text-[#636059] uppercase tracking-wider">
                DIRECT ARCHITECT DISPATCH
              </div>
              <div className="flex items-center justify-between">
                <span className="font-serif text-2xl text-[#15130F] font-medium">
                  contact@kmai.tech
                </span>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="px-3 py-1 border border-[#15130F]/30 hover:border-[#15130F] text-[#15130F] font-mono text-xs flex items-center gap-1.5 transition-colors"
                >
                  {isCopied ? <Check size={12} className="text-[#FF3B1F]" /> : <Copy size={12} />}
                  <span>{isCopied ? 'COPIED' : 'COPY'}</span>
                </button>
              </div>
              <div className="font-mono text-[11px] text-[#636059] border-t border-[#15130F]/10 pt-3">
                NDA provided upon specification submission. All technical IP remains strictly client-owned.
              </div>
            </div>
          </div>

          {/* Right 7 Cols: The Conversational Spec Intake */}
          <div className="lg:col-span-7 border border-[#15130F] bg-[#F3EFE7] p-6 sm:p-10 relative">
            {/* Corner Registration Marks */}
            <span className="absolute top-1.5 left-2 font-mono text-[9px] text-[#15130F]/40 select-none">+</span>
            <span className="absolute top-1.5 right-2 font-mono text-[9px] text-[#15130F]/40 select-none">+</span>
            <span className="absolute bottom-1.5 left-2 font-mono text-[9px] text-[#15130F]/40 select-none">+</span>
            <span className="absolute bottom-1.5 right-2 font-mono text-[9px] text-[#15130F]/40 select-none">+</span>

            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Step Indicators */}
                <div className="flex items-center justify-between border-b border-[#15130F]/15 pb-4 font-mono text-xs">
                  <div className="flex items-center gap-3">
                    <span className={`px-2 py-0.5 border ${step === 1 ? 'border-[#FF3B1F] text-[#FF3B1F] font-bold' : 'border-[#15130F]/20 text-[#636059]'}`}>
                      STEP 01: IDENTITY
                    </span>
                    <span className={`px-2 py-0.5 border ${step === 2 ? 'border-[#FF3B1F] text-[#FF3B1F] font-bold' : 'border-[#15130F]/20 text-[#636059]'}`}>
                      STEP 02: SCOPE
                    </span>
                    <span className={`px-2 py-0.5 border ${step === 3 ? 'border-[#FF3B1F] text-[#FF3B1F] font-bold' : 'border-[#15130F]/20 text-[#636059]'}`}>
                      STEP 03: BUDGET
                    </span>
                  </div>
                  <span className="text-[#636059]">SPEC-INTAKE // V2</span>
                </div>

                {/* Step 1: Identity & Organization */}
                {step === 1 && (
                  <div className="space-y-6">
                    <div>
                      <label className="block font-mono text-xs uppercase tracking-wider text-[#636059] mb-2">
                        01 // Who is commissioning this specification?
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Your Name & Organization"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-transparent border-b-2 border-[#15130F] py-3 font-serif text-2xl sm:text-3xl text-[#15130F] focus:outline-none focus:border-[#FF3B1F] placeholder:text-[#15130F]/20"
                      />
                    </div>

                    <div>
                      <label className="block font-mono text-xs uppercase tracking-wider text-[#636059] mb-2">
                        02 // Where should we transmit the architectural plan?
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="engineer@company.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-transparent border-b-2 border-[#15130F] py-3 font-serif text-2xl sm:text-3xl text-[#15130F] focus:outline-none focus:border-[#FF3B1F] placeholder:text-[#15130F]/20"
                      />
                    </div>

                    <div className="pt-4 flex justify-end">
                      <button
                        type="button"
                        disabled={!name || !email}
                        onClick={() => setStep(2)}
                        className="px-6 py-3 border border-[#15130F] bg-[#15130F] text-[#F3EFE7] hover:bg-[#FF3B1F] hover:border-[#FF3B1F] font-mono text-xs tracking-widest uppercase transition-colors disabled:opacity-30 disabled:pointer-events-none"
                      >
                        PROCEED TO SYSTEM SCOPE
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 2: System Scope */}
                {step === 2 && (
                  <div className="space-y-6">
                    <div>
                      <label className="block font-mono text-xs uppercase tracking-wider text-[#636059] mb-3">
                        03 // What system discipline are we architecting?
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {[
                          'High-Concurrency Web Platform',
                          'Operational Middleware & Invoicing',
                          'Applied AI & Machine Intelligence',
                          'Cross-Platform Native Application',
                        ].map((item) => (
                          <button
                            key={item}
                            type="button"
                            onClick={() => setSelectedDiscipline(item)}
                            className={`px-4 py-3 border text-left font-mono text-xs tracking-wider uppercase transition-colors ${
                              selectedDiscipline === item
                                ? 'border-[#FF3B1F] bg-[#FF3B1F]/10 text-[#FF3B1F] font-bold'
                                : 'border-[#15130F]/20 text-[#15130F] hover:border-[#15130F]'
                            }`}
                          >
                            [ {item} ]
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block font-mono text-xs uppercase tracking-wider text-[#636059] mb-2">
                        04 // Core throughput targets, APIs, or architectural constraints:
                      </label>
                      <textarea
                        rows={3}
                        placeholder="e.g. 50k daily active users, automated webhook reconciliation with Stripe, sub-20ms edge latency..."
                        value={scopeDetails}
                        onChange={(e) => setScopeDetails(e.target.value)}
                        className="w-full bg-transparent border border-[#15130F]/30 p-3 font-sans text-sm text-[#15130F] focus:outline-none focus:border-[#FF3B1F] placeholder:text-[#15130F]/30"
                      />
                    </div>

                    <div className="pt-4 flex justify-between">
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="px-4 py-2 border border-[#15130F]/30 text-[#15130F] font-mono text-xs uppercase tracking-wider"
                      >
                        [ BACK ]
                      </button>
                      <button
                        type="button"
                        onClick={() => setStep(3)}
                        className="px-6 py-3 border border-[#15130F] bg-[#15130F] text-[#F3EFE7] hover:bg-[#FF3B1F] hover:border-[#FF3B1F] font-mono text-xs tracking-widest uppercase transition-colors"
                      >
                        PROCEED TO ALLOCATION
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 3: Budget Range & The Stamped Approval Send Action */}
                {step === 3 && (
                  <div className="space-y-6">
                    <div>
                      <label className="block font-mono text-xs uppercase tracking-wider text-[#636059] mb-3">
                        05 // Expected investment & deployment target:
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {['$15k - $25k', '$25k - $50k', '$50k - $100k', '$100k+'].map(
                          (tier) => (
                            <button
                              key={tier}
                              type="button"
                              onClick={() => setBudgetRange(tier)}
                              className={`px-3 py-3 border text-center font-mono text-xs uppercase tracking-wider transition-colors ${
                                budgetRange === tier
                                  ? 'border-[#FF3B1F] bg-[#FF3B1F]/10 text-[#FF3B1F] font-bold'
                                  : 'border-[#15130F]/20 text-[#15130F] hover:border-[#15130F]'
                              }`}
                            >
                              {tier}
                            </button>
                          )
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block font-mono text-xs uppercase tracking-wider text-[#636059] mb-3">
                        06 // Delivery urgency:
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {['Immediate (<30d)', 'Target (<60d)', 'Flexible'].map((time) => (
                          <button
                            key={time}
                            type="button"
                            onClick={() => setTimeline(time)}
                            className={`px-3 py-3 border text-center font-mono text-xs uppercase tracking-wider transition-colors ${
                              timeline === time
                                ? 'border-[#FF3B1F] bg-[#FF3B1F]/10 text-[#FF3B1F] font-bold'
                                : 'border-[#15130F]/20 text-[#15130F] hover:border-[#15130F]'
                            }`}
                          >
                            {time}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* The Signature Send Action: Stamped Approval Mark */}
                    <div className="pt-6 border-t border-[#15130F]/15 flex flex-col sm:flex-row items-center justify-between gap-6">
                      <button
                        type="button"
                        onClick={() => setStep(2)}
                        className="px-4 py-2 border border-[#15130F]/30 text-[#15130F] font-mono text-xs uppercase tracking-wider"
                      >
                        [ BACK ]
                      </button>

                      <button
                        type="submit"
                        className="w-full sm:w-auto px-8 py-5 border-2 border-[#FF3B1F] text-[#FF3B1F] hover:bg-[#FF3B1F] hover:text-[#F3EFE7] -rotate-1 hover:rotate-0 transition-all duration-200 font-mono text-xs font-bold tracking-widest uppercase text-center shadow-[2px_2px_0_#FF3B1F]"
                      >
                        <div>&#9733; APPROVED FOR TRANSMISSION &#9733;</div>
                        <div className="text-[10px] opacity-80 mt-1 font-normal">
                          STAMP NO. KM-SPEC-2026 // DISPATCH SPEC
                        </div>
                      </button>
                    </div>
                  </div>
                )}
              </form>
            ) : (
              /* Transmitted Stamped Receipt */
              <div className="py-12 px-6 border-2 border-[#FF3B1F] -rotate-1 text-center space-y-6">
                <div className="inline-block px-4 py-1.5 bg-[#FF3B1F] text-[#F3EFE7] font-mono text-xs tracking-widest uppercase font-bold">
                  &#10003; SPECIFICATION TRANSMITTED
                </div>
                <h3 className="font-serif text-3xl sm:text-4xl text-[#15130F] font-normal">
                  Redline Spec Received.
                </h3>
                <p className="font-sans text-base text-[#15130F]/80 max-w-md mx-auto">
                  A systems architect has received your submission for <strong>{name}</strong> ({email}). We review technical feasibility and reply within 24 hours.
                </p>
                <div className="font-mono text-xs text-[#636059] border-t border-[#FF3B1F]/30 pt-4">
                  STAMP: APPROVED // STATUS: IN QUEUE // REF: KM-2026-X
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
