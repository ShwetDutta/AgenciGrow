import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Check, ExternalLink, ShieldCheck, Zap, Layers, Sparkles } from 'lucide-react';

export interface CaseStudyOutcome {
  metric: string;
  label: string;
}

export interface CaseStudy {
  id: string;
  clientNumber: string;
  client: string;
  category: string;
  badge?: string;
  logo?: string;
  logoAlt?: string;
  description: string;
  scope: string[];
  outcomes: CaseStudyOutcome[];
  images?: string[];
  url?: string;
  testimonial?: {
    quote: string;
    author: string;
    role: string;
  };
}

export const caseStudies: CaseStudy[] = [
  {
    id: "muscle-legacy",
    clientNumber: "01",
    client: "Muscle Legacy",
    category: "HIGH-END FITNESS & GYM BRAND",
    badge: "CLIENT PARTNER 01",
    logo: "/Photos/muscle-legacy-logo.png",
    logoAlt: "Muscle Legacy Brand Mark",
    description: "Built a custom, high-converting website for Muscle Legacy and managing their complete Instagram presence—handling end-to-end content strategy, on-site filming, post-production editing, and consistent posting.",
    scope: [
      "Custom high-converting website build",
      "Full-service Instagram management",
      "On-site content filming & video production",
      "Post-production video editing & grading",
      "Strategic content planning & posting",
      "Brand aesthetics & digital experience"
    ],
    outcomes: [
      { metric: "3.4x", label: "Increase in Online Inquiries & Reach" },
      { metric: "Full-Service", label: "Filming, Editing & Daily Management" },
      { metric: "100%", label: "Custom Conversion-Focused Website" }
    ],
    images: [] // Supports project images/screenshots; fallback is an intentional system architecture visual
  }
];

// Fallback Brand Logo Component for Muscle Legacy if image is loading or omitted
const MuscleLegacyBrandLogo: React.FC<{ className?: string }> = ({ className = "h-10" }) => (
  <div className={`flex items-center gap-3 select-none ${className}`}>
    <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#F5F5F2" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 5v14M18 5v14M2 9h4M18 9h4M2 15h4M18 15h4M6 12h12" />
      </svg>
    </div>
    <div className="flex flex-col">
      <span className="font-heading text-lg tracking-wider text-[#F5F5F2] uppercase font-bold leading-none">
        Muscle Legacy
      </span>
      <span className="text-[9px] font-body text-[#8B8F96] tracking-[0.25em] uppercase mt-1 font-medium">
        Fitness & Performance
      </span>
    </div>
  </div>
);

// Individual Case Study Component
const CaseStudyCard: React.FC<{ caseStudy: CaseStudy }> = ({ caseStudy }) => {
  const [logoError, setLogoError] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const hasImages = caseStudy.images && caseStudy.images.length > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="w-full bg-[#080809] border border-white/10 rounded-3xl p-6 sm:p-10 lg:p-12 relative overflow-hidden"
    >
      {/* Background Subtle Gradient Glow */}
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-white/[0.015] rounded-full blur-3xl pointer-events-none" />

      {/* Main Grid: Left Primary (Identity + Scope) | Right Secondary (Proof + Outcomes) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        
        {/* LEFT / PRIMARY AREA */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-8">
          
          {/* Header Metadata */}
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6">
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-mono tracking-[0.2em] text-[#8B8F96] uppercase bg-white/5 border border-white/10 px-3 py-1 rounded-full">
                  CLIENT {caseStudy.clientNumber}
                </span>
                {caseStudy.badge && (
                  <span className="text-[10px] font-body tracking-[0.15em] text-[#C9CDD3] uppercase bg-white/[0.03] border border-white/5 px-3 py-1 rounded-full">
                    {caseStudy.badge}
                  </span>
                )}
              </div>

              {caseStudy.url && (
                <a
                  href={caseStudy.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-body text-[#8B8F96] hover:text-[#F5F5F2] uppercase tracking-wider transition-colors group"
                >
                  <span>{caseStudy.url.replace(/^https?:\/\//, '')}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              )}
            </div>

            {/* Client Logo & Title Block */}
            <div className="pt-2">
              <div className="mb-4">
                {caseStudy.logo && !logoError ? (
                  <img
                    src={caseStudy.logo}
                    alt={caseStudy.logoAlt || `${caseStudy.client} logo`}
                    onError={() => setLogoError(true)}
                    className="h-10 sm:h-12 w-auto object-contain max-w-[220px]"
                  />
                ) : (
                  <MuscleLegacyBrandLogo />
                )}
              </div>

              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-heading text-[#F5F5F2] tracking-tight mb-2">
                {caseStudy.client}
              </h3>
              <p className="text-xs sm:text-sm font-body text-[#8B8F96] uppercase tracking-[0.2em] font-medium">
                {caseStudy.category}
              </p>
            </div>

            {/* Description / Challenge */}
            <p className="text-sm sm:text-base text-[#C9CDD3] font-body font-light leading-relaxed">
              {caseStudy.description}
            </p>
          </div>

          {/* Scope Delivered */}
          <div className="pt-6 border-t border-white/10 space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#8B8F96] font-body flex items-center gap-2">
                <Layers className="w-3.5 h-3.5 text-[#8B8F96]" />
                <span>System Delivered & Scope</span>
              </h4>
              <span className="text-[10px] text-[#8B8F96] font-mono">
                {caseStudy.scope.length} MODULES
              </span>
            </div>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              {caseStudy.scope.map((item, idx) => (
                <li 
                  key={idx} 
                  className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/15 transition-colors group"
                >
                  <div className="w-4 h-4 rounded-full bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:border-white/30 transition-colors">
                    <Check className="w-2.5 h-2.5 text-[#F5F5F2]" />
                  </div>
                  <span className="text-xs text-[#C9CDD3] font-body font-light leading-snug">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Testimonial Optional */}
          {caseStudy.testimonial && (
            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 italic text-xs text-[#C9CDD3] font-body">
              "{caseStudy.testimonial.quote}"
              <div className="mt-2 text-[10px] uppercase font-semibold text-[#8B8F96] not-italic">
                — {caseStudy.testimonial.author}, {caseStudy.testimonial.role}
              </div>
            </div>
          )}

          {/* Live Action Button */}
          {caseStudy.url && (
            <div className="pt-2">
              <a
                href={caseStudy.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 hover:border-white/30 text-xs font-semibold text-[#F5F5F2] uppercase tracking-widest font-body transition-all group"
              >
                <span>Explore Live System</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#8B8F96] group-hover:text-[#F5F5F2] transition-colors" />
              </a>
            </div>
          )}
        </div>

        {/* RIGHT / SECONDARY AREA */}
        <div className="lg:col-span-5 flex flex-col space-y-8 h-full justify-between">
          
          {/* PROOF VISUAL AREA */}
          <div className="w-full bg-[#030304] border border-white/10 rounded-2xl p-5 sm:p-6 relative overflow-hidden group">
            {/* Visual Frame Header */}
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10 text-[10px] font-mono tracking-widest text-[#8B8F96] uppercase">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500/80 animate-pulse" />
                <span>SELECTED SYSTEM ARCHITECTURE</span>
              </div>
              <span>PROVED // ML-01</span>
            </div>

            {hasImages ? (
              <div className="space-y-4">
                <div className="aspect-[16/10] w-full rounded-xl overflow-hidden border border-white/10 bg-black/40 relative">
                  <img
                    src={caseStudy.images![activeImageIndex]}
                    alt={`${caseStudy.client} project screenshot ${activeImageIndex + 1}`}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                {caseStudy.images!.length > 1 && (
                  <div className="flex gap-2 overflow-x-auto pb-1">
                    {caseStudy.images!.map((img, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveImageIndex(i)}
                        className={`w-14 h-10 rounded-lg overflow-hidden border transition-all ${
                          i === activeImageIndex ? 'border-white/80 opacity-100' : 'border-white/10 opacity-50 hover:opacity-80'
                        }`}
                      >
                        <img src={img} alt="" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              /* Intentional Dark Blueprint / Visual Placeholder State */
              <div className="relative aspect-[16/10] w-full rounded-xl bg-[#0B0B0D] border border-white/10 p-5 flex flex-col justify-between overflow-hidden">
                {/* Subtle Grid Background */}
                <div 
                  className="absolute inset-0 opacity-10 pointer-events-none"
                  style={{
                    backgroundImage: 'radial-gradient(#FFFFFF 1px, transparent 1px)',
                    backgroundSize: '16px 16px'
                  }}
                />

                {/* Blueprint Top Tag */}
                <div className="relative z-10 flex items-center justify-between text-[10px] font-mono text-[#8B8F96]">
                  <span className="bg-white/5 px-2 py-0.5 rounded border border-white/10 text-[#C9CDD3]">
                    CUSTOM WEBSITE + INSTAGRAM MANAGEMENT
                  </span>
                  <ShieldCheck className="w-4 h-4 text-emerald-400/80" />
                </div>

                {/* Center Funnel Visualization Mockup */}
                <div className="relative z-10 my-auto py-2 grid grid-cols-3 gap-2 text-center">
                  <div className="p-2.5 rounded-lg bg-white/[0.03] border border-white/10 flex flex-col items-center">
                    <Zap className="w-4 h-4 text-[#C9CDD3] mb-1" />
                    <span className="text-[10px] font-body text-[#F5F5F2] font-medium">Custom Web</span>
                    <span className="text-[9px] text-[#8B8F96] mt-0.5">High Convert</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-white/[0.03] border border-white/10 flex flex-col items-center">
                    <Sparkles className="w-4 h-4 text-[#C9CDD3] mb-1" />
                    <span className="text-[10px] font-body text-[#F5F5F2] font-medium">Film & Edit</span>
                    <span className="text-[9px] text-[#8B8F96] mt-0.5">High Quality</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-white/[0.03] border border-white/10 flex flex-col items-center">
                    <Check className="w-4 h-4 text-emerald-400 mb-1" />
                    <span className="text-[10px] font-body text-[#F5F5F2] font-medium">IG Growth</span>
                    <span className="text-[9px] text-[#8B8F96] mt-0.5">Daily Posting</span>
                  </div>
                </div>

                {/* Blueprint Footer */}
                <div className="relative z-10 flex items-center justify-between text-[10px] font-body text-[#8B8F96] pt-2 border-t border-white/5">
                  <span className="font-mono text-[#C9CDD3]">SYSTEM VERIFIED</span>
                  <span className="text-emerald-400 font-medium">100% OPERATIONAL</span>
                </div>
              </div>
            )}
          </div>

          {/* KEY OUTCOMES / METRICS BLOCK */}
          <div className="bg-[#050506] border border-white/10 p-6 sm:p-8 rounded-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h4 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#8B8F96] font-body">
                Key Outcomes
              </h4>
              <span className="text-[10px] font-mono text-[#8B8F96] uppercase">VERIFIED METRICS</span>
            </div>

            <div className="space-y-6 divide-y divide-white/10">
              {caseStudy.outcomes.map((item, idx) => (
                <div key={idx} className={idx === 0 ? "" : "pt-6"}>
                  <div className="text-4xl sm:text-5xl lg:text-6xl font-heading text-[#F5F5F2] font-normal tracking-tight leading-none mb-2">
                    {item.metric}
                  </div>
                  <p className="text-xs sm:text-sm font-body text-[#8B8F96] font-light leading-snug">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </motion.div>
  );
};

const Work: React.FC = () => {
  const [activeClient, setActiveClient] = useState<string>(caseStudies[0].id);

  const selectedStudy = caseStudies.find(cs => cs.id === activeClient) || caseStudies[0];

  return (
    <section id="work" className="py-24 sm:py-32 bg-[#0A0A0B] relative z-10 scroll-mt-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* SECTION INTRO (Upper 25-30%) */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#8B8F96] mb-4 font-body"
          >
            // CLIENT WORK & PROOF
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading text-[#F5F5F2] tracking-tight leading-[1.12] mb-6"
          >
            Deep-dive client partnerships.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-base sm:text-lg text-[#8B8F96] font-body font-light leading-relaxed"
          >
            “We focus on building deep, high-impact growth systems for a small number of active client relationships rather than maintaining a vanity portfolio wall.”
          </motion.p>
        </div>

        {/* CLIENT SELECTOR / NAVIGATION (Dynamically supports 1 or multiple clients) */}
        {caseStudies.length > 1 ? (
          <div className="flex items-center gap-3 overflow-x-auto pb-4 mb-8 no-scrollbar">
            {caseStudies.map((study) => {
              const isActive = study.id === activeClient;
              return (
                <button
                  key={study.id}
                  onClick={() => setActiveClient(study.id)}
                  className={`px-5 py-2.5 rounded-full text-xs font-body font-medium transition-all duration-300 flex items-center gap-2.5 flex-shrink-0 border ${
                    isActive
                      ? 'bg-white text-black border-white shadow-lg'
                      : 'bg-white/5 text-[#8B8F96] hover:text-[#F5F5F2] border-white/10 hover:border-white/20'
                  }`}
                >
                  <span className={`text-[10px] font-mono ${isActive ? 'text-black/60' : 'text-[#8B8F96]'}`}>
                    {study.clientNumber}
                  </span>
                  <span>{study.client}</span>
                </button>
              );
            })}
          </div>
        ) : (
          <div className="flex items-center gap-3 mb-8">
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-body text-[#C9CDD3]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span className="font-mono text-[10px] text-[#8B8F96]">FEATURED CASE STUDY 01</span>
              <span className="text-[#8B8F96]">•</span>
              <span className="font-semibold text-[#F5F5F2]">MUSCLE LEGACY</span>
            </div>
          </div>
        )}

        {/* CASE STUDY DISPLAY (Data-driven component rendering) */}
        <AnimatePresence mode="wait">
          <CaseStudyCard key={selectedStudy.id} caseStudy={selectedStudy} />
        </AnimatePresence>

      </div>
    </section>
  );
};

export default Work;
