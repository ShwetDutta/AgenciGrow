import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

const About: React.FC = () => {
  return (
    <section id="about" className="py-32 bg-[#0F172A] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row gap-24 items-center">
          <div className="lg:w-1/2">
            <motion.span 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-[#00D094] font-black text-xs uppercase tracking-[0.4em] mb-6 block"
            >
              The Philosophy
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-5xl lg:text-7xl font-black text-[#F8FAFC] mb-12 tracking-tighter leading-[0.95]"
            >
              Capital Efficiency <br/> over <span className="text-[#00D094]">Vanity Metrics.</span>
            </h2>
            <div className="space-y-8 text-xl text-[#94A3B8] font-light leading-relaxed">
              <p>
                The digital marketplace is flooded with "experts" selling clicks. At AgenciGrow, we sell outcomes. Every strategy we deploy is designed to maximize the spread between acquisition cost and lifetime value.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
                {[
                  'Zero-Waste Media Buying',
                  'Topic Authority Moats',
                  'Unit-Economic Focused',
                  'Technical SEO Integrity'
                ].map((item, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-4 py-4 px-6 bg-white/5 border border-white/10 rounded-xl"
                  >
                    <CheckCircle2 className="text-[#00D094] w-5 h-5" />
                    <span className="text-[#F8FAFC] text-sm font-bold uppercase tracking-widest">{item}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="lg:w-1/2 relative">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="relative z-10 p-4 border border-white/10 bg-white/5 rounded-3xl overflow-hidden shadow-2xl"
            >
              <img 
                src="https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=1674" 
                alt="Growth Team" 
                className="w-full h-auto aspect-[4/5] object-cover rounded-2xl grayscale"
              />
              <div className="absolute inset-0 bg-[#0F172A]/40 transition-all"></div>
            </motion.div>
            <div className="absolute -top-12 -right-12 w-64 h-64 bg-[#00D094]/10 rounded-full blur-[60px] -z-0"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;