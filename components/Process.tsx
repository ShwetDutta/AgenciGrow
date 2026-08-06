import React from 'react';
import { motion } from 'framer-motion';
import { Search, Compass, Layers, Rocket, TrendingUp } from 'lucide-react';

const processSteps = [
  {
    number: "01",
    title: "Discovery & Audit",
    icon: <Search className="w-5 h-5 text-[#C9CDD3]" />,
    desc: "We analyze your current customer acquisition, conversion bottlenecks, sales pipeline leakage, and existing metrics to identify where growth is stuck."
  },
  {
    number: "02",
    title: "Custom Strategy & Roadmap",
    icon: <Compass className="w-5 h-5 text-[#C9CDD3]" />,
    desc: "We architect a bespoke growth blueprint tailored to your unit economics — choosing the exact mix of ads, landing pages, and WhatsApp/CRM triggers needed."
  },
  {
    number: "03",
    title: "System Build & Creative",
    icon: <Layers className="w-5 h-5 text-[#C9CDD3]" />,
    desc: "We write conversion-focused copy, design high-converting React landing pages, craft disruption ad creatives, and set up automated CRM workflows."
  },
  {
    number: "04",
    title: "Precision Launch",
    icon: <Rocket className="w-5 h-5 text-[#C9CDD3]" />,
    desc: "We deploy high-intent search campaigns and targeted Meta ad funnels, connecting analytics tracking for 100% lead attribution and speed."
  },
  {
    number: "05",
    title: "Optimize & Scale",
    icon: <TrendingUp className="w-5 h-5 text-[#C9CDD3]" />,
    desc: "We continuously test ad variations, optimize landing page conversion rates, and refine WhatsApp nurture flows to lower your acquisition cost as budget scales."
  }
];

const Process: React.FC = () => {
  return (
    <section id="process" className="py-24 sm:py-32 bg-[#0A0A0B] relative z-10 scroll-mt-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#8B8F96] mb-4 font-body"
          >
            // RIGOROUS PROCESS
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading text-[#F5F5F2] tracking-tight leading-[1.12] mb-6"
          >
            How we engineer<br />predictable growth.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-base sm:text-lg text-[#8B8F96] font-body font-light leading-relaxed"
          >
            Every client system is built through a structured 5-stage execution process. No guesswork, no random experiments — just methodical engineering.
          </motion.p>
        </div>

        {/* Process Flow Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {processSteps.map((step, idx) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="p-6 rounded-2xl liquid-glass border border-white/5 hover:border-white/15 transition-all duration-300 flex flex-col justify-between group"
              style={{ background: 'rgba(201, 205, 211, 0.02)' }}
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-xs font-mono font-semibold text-[#8B8F96] tracking-wider">
                    {step.number}
                  </span>
                  <div 
                    className="w-9 h-9 rounded-lg flex items-center justify-center border border-white/10 group-hover:border-white/20 transition-colors"
                    style={{ background: 'rgba(201, 205, 211, 0.04)' }}
                  >
                    {step.icon}
                  </div>
                </div>

                <h3 className="text-lg font-medium text-[#F5F5F2] mb-3 font-body leading-snug">
                  {step.title}
                </h3>

                <p className="text-xs text-[#8B8F96] font-body font-light leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Process;
