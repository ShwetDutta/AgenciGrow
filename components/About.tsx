import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

const About: React.FC = () => {
  return (
    <section id="about" className="py-32 bg-[#0F0F14] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row gap-24 items-center">
          <div className="lg:w-1/2">
            <motion.span 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-[#d62cab] font-black text-xs uppercase tracking-[0.4em] mb-6 block"
            >
              The Philosophy
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-5xl lg:text-7xl font-black text-white mb-12 tracking-tighter leading-[0.95]"
            >
              Systems over Clicks. <br /> Your <span className="text-[#d62cab]">Growth Partner.</span>
            </motion.h2>
            <div className="space-y-8 text-xl text-[#B5B5C0] font-light leading-relaxed">
              <p>
                Most businesses don't have a marketing problem—they have a systems problem. At AgenciGrow, we build the systems behind your marketing and operations so growth becomes predictable and scalable.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
                {[
                  'Predictable Lead Generation',
                  'Automated Follow-ups',
                  'Eliminated Ad Waste',
                  'Custom Growth Roadmap'
                ].map((item, i) => (
                  <motion.div 
                    key={item}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-4 py-4 px-6 bg-white/5 border border-white/10 rounded-xl"
                  >
                    <CheckCircle2 className="text-[#d62cab] w-5 h-5" />
                    <span className="text-white text-sm font-bold uppercase tracking-widest">{item}</span>
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
              <div className="absolute inset-0 bg-[#0B0B0E]/40 transition-all"></div>
            </motion.div>
            <div className="absolute -top-12 -right-12 w-64 h-64 bg-[#d62cab]/10 rounded-full blur-[60px] -z-0"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;