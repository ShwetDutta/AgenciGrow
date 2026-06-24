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
              AgenciGrow started because most "growth agencies" sell the same three tactics to every client and call it strategy. We didn't want to build that.
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
              We're a small, founder-led team — which means decisions get made fast, and nothing gets diluted by layers of management before it reaches you.
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
              Being early means we don't have a hundred clients pulling our attention in different directions. Right now, we have room to actually understand your business before we touch a single ad or page — and we'd rather earn that trust properly than fake a track record we don't have yet.
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
