import React from 'react';
import { motion } from 'framer-motion';

const WhoWeAre: React.FC = () => {
  return (
    <section id="about" className="py-28 bg-[#0A0A0B] relative z-10 scroll-mt-12 overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        
        {/* Header Block */}
        <div className="max-w-4xl mb-20">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#8B8F96] mb-4 font-body"
          >
            // WHO WE ARE
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-heading text-[#F5F5F2] tracking-tight leading-[1.12]"
          >
            The agency we wished existed when we started.
          </motion.h2>
        </div>

        {/* 3 Columns/Paragraphs Block */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-4"
          >
            <span className="text-xs font-semibold text-[#8B8F96] uppercase tracking-[0.2em] font-body block opacity-40">01 / GENUINE STRATEGY</span>
            <p className="text-sm md:text-base text-[#C9CDD3] font-body font-light leading-relaxed">
              AgenciGrow was founded to disrupt the traditional digital marketing paradigm. Instead of selling cookie-cutter templates or generic tactics, we engineer custom systems. We combine technical SEO, custom web design, and precise paid traffic funnels to capture high-intent search queries and transform them into predictable business growth.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="space-y-4"
          >
            <span className="text-xs font-semibold text-[#8B8F96] uppercase tracking-[0.2em] font-body block opacity-40">02 / FOUNDER-LED</span>
            <p className="text-sm md:text-base text-[#C9CDD3] font-body font-light leading-relaxed">
              We are a dedicated, founder-led team of digital growth specialists. This structure guarantees that senior strategists are directly crafting your marketing channels, writing copy, and building systems. Decisions are made fast, communications are crystal clear, and your systems are never diluted by layers of corporate management.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-4"
          >
            <span className="text-xs font-semibold text-[#8B8F96] uppercase tracking-[0.2em] font-body block opacity-40">03 / UNIFIED FOCUS</span>
            <p className="text-sm md:text-base text-[#C9CDD3] font-body font-light leading-relaxed">
              By limiting our active client roster, we provide unparalleled attention to your brand. We dedicate ourselves to thoroughly understanding your business model, customer touchpoints, and conversion bottlenecks before launching a single paid campaign. This exhaustive preparation ensures we build genuine trust and long-term search authority.
            </p>
          </motion.div>
        </div>

        {/* Small line beneath */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-20 pt-8 border-t border-white/5"
        >
          <p className="text-xs md:text-sm text-[#8B8F96] font-body font-light tracking-wide italic flex items-center gap-2">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#C9CDD3]/60 animate-pulse" />
            Currently working hands-on with a small number of businesses, by design.
          </p>
        </motion.div>

      </div>
    </section>
  );
};

export default WhoWeAre;
