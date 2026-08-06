import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, CheckCircle2, Dumbbell, Globe } from 'lucide-react';

const caseStudies = [
  {
    id: "muscle-legacy",
    badge: "Featured Client Partner",
    title: "Muscle Legacy",
    subtitle: "High-End Fitness & Gym Brand",
    icon: <Dumbbell className="w-5 h-5 text-[#C9CDD3]" />,
    context: "Muscle Legacy needed a streamlined client acquisition system to scale trial memberships, replace manual follow-up calls, and capture high-intent local fitness traffic.",
    delivered: [
      "Custom high-converting React landing page",
      "Meta Ads creative strategy & targeting funnel",
      "Instant 24/7 WhatsApp CRM lead nurturing pathway",
      "Automated appointment scheduling workflow"
    ],
    results: [
      { metric: "3.4x", label: "Increase in Trial Bookings" },
      { metric: "<2 min", label: "Average Automated Response Time" },
      { metric: "85%", label: "Lead Qualification Rate" }
    ],
    url: "https://musclelegacy.in" // or placeholder / live link
  },
  {
    id: "b2b-growth",
    badge: "Active Growth Retainer",
    title: "B2B & High-Ticket Service Partner",
    subtitle: "High-Intent Client Acquisition",
    icon: <Globe className="w-5 h-5 text-[#C9CDD3]" />,
    context: "Sought a predictable Google Ads search capture funnel and conversion web architecture to eliminate lead drop-offs and track pipeline revenue accurately.",
    delivered: [
      "Google Search Ads high-intent campaign architecture",
      "Custom brand website & landing page design",
      "Full CRM deal pipeline & attribution setup",
      "Automated email & WhatsApp lead alerts"
    ],
    results: [
      { metric: "-62%", label: "Reduction in Cost Per Lead" },
      { metric: "100%", label: "Pipeline Attribution Clarity" },
      { metric: "4.2x", label: "Pipeline ROAS" }
    ]
  }
];

const Work: React.FC = () => {
  return (
    <section id="work" className="py-24 sm:py-32 bg-[#0A0A0B] relative z-10 scroll-mt-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Header */}
        <div className="max-w-3xl mb-16 sm:mb-20">
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
            We focus on building deep, high-impact growth systems for a small number of active client relationships rather than maintaining a vanity portfolio wall.
          </motion.p>
        </div>

        {/* Case Studies Blocks */}
        <div className="space-y-12">
          {caseStudies.map((study, idx) => (
            <motion.div
              key={study.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.15 }}
              className="p-8 sm:p-12 rounded-3xl liquid-glass border border-white/10 hover:border-white/20 transition-all duration-300 relative overflow-hidden"
              style={{ background: 'rgba(201, 205, 211, 0.02)' }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                
                {/* Left Column: Context & Scope */}
                <div className="lg:col-span-7 space-y-6">
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 rounded-full text-[10px] font-medium tracking-wider uppercase text-[#C9CDD3] bg-white/5 border border-white/10">
                      {study.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-2xl sm:text-3xl font-heading text-[#F5F5F2] mb-1">
                      {study.title}
                    </h3>
                    <p className="text-xs sm:text-sm font-body text-[#8B8F96] uppercase tracking-wider">
                      {study.subtitle}
                    </p>
                  </div>

                  <p className="text-sm sm:text-base text-[#C9CDD3] font-body font-light leading-relaxed">
                    {study.context}
                  </p>

                  <div className="pt-4 border-t border-white/5">
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-[#8B8F96] mb-4 font-body">
                      System Delivered & Scope:
                    </h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {study.delivered.map((item, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-xs text-[#C9CDD3] font-body">
                          <CheckCircle2 className="w-4 h-4 text-[#C9CDD3] flex-shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {study.url && (
                    <div className="pt-2">
                      <a
                        href={study.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-xs font-semibold text-[#F5F5F2] hover:text-[#C9CDD3] uppercase tracking-wider font-body border-b border-white/20 pb-1 transition-colors"
                      >
                        <span>Visit Live Website</span>
                        <ArrowUpRight size={14} />
                      </a>
                    </div>
                  )}
                </div>

                {/* Right Column: Outcomes & Metrics */}
                <div className="lg:col-span-5 bg-white/[0.02] border border-white/5 p-6 sm:p-8 rounded-2xl flex flex-col justify-between h-full">
                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-widest text-[#8B8F96] mb-6 font-body">
                      Key Outcomes
                    </h4>
                    <div className="space-y-6">
                      {study.results.map((res, i) => (
                        <div key={i} className="border-b border-white/5 pb-4 last:border-0 last:pb-0">
                          <div className="text-3xl sm:text-4xl font-heading text-[#F5F5F2] tracking-tight mb-1">
                            {res.metric}
                          </div>
                          <div className="text-xs text-[#8B8F96] font-body font-light">
                            {res.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Work;
