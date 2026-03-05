import React from 'react';
import { TrendingUp, ArrowUpRight, Globe, Layers } from 'lucide-react';
import { motion } from 'framer-motion';

const cases = [
  {
    client: 'Nexo Health Tech',
    industry: 'Enterprise SaaS',
    challenge: 'High cost-per-lead and stagnant organic reach in a competitive sector.',
    results: '+240% Pipeline Velocity',
    icon: <Globe className="w-5 h-5" />,
  },
  {
    client: 'Lumina Home',
    industry: 'Premium D2C',
    challenge: 'Scaling spend while maintaining a 3x ROAS threshold.',
    results: '4.2x ROAS @ Scale',
    icon: <Layers className="w-5 h-5" />,
  }
];

const CaseStudies: React.FC = () => {
  return (
    <section id="case-studies" className="py-32 bg-[#0B0B0E] scroll-mt-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="max-w-3xl mb-24">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-[#d62cab] font-black text-xs uppercase tracking-[0.4em] mb-4 block"
          >
            The Results Vault
          </motion.span>
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-5xl lg:text-7xl font-black text-white mb-8 leading-[1]"
          >
            Focus on outcomes, <br />
            <span className="text-[#8E8E9F]">not just outputs.</span>
          </motion.h3>
          <p className="text-[#B5B5C0] text-xl font-light leading-relaxed">
            Real growth delivered through technical discipline and strategic foresight. We build for the long term.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {cases.map((c, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group cursor-pointer"
            >
              <div className="relative rounded-2xl overflow-hidden bg-[#0F0F14] aspect-[16/10] mb-10 border border-white/5 group-hover:shadow-[0_0_40px_rgba(214,44,171,0.1)] transition-all duration-700">
                <div className="absolute inset-0 bg-gradient-to-br from-[#d62cab]/10 to-[#0B0B0E] opacity-60 group-hover:opacity-80 transition-opacity"></div>
                
                <div className="absolute bottom-10 left-10 right-10 flex justify-between items-end">
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-lg bg-white/10 backdrop-blur-md flex items-center justify-center text-[#d62cab]">
                        {c.icon}
                      </div>
                      <span className="text-[#8E8E9F] text-sm font-bold uppercase tracking-widest">{c.industry}</span>
                    </div>
                    <h4 className="text-4xl font-black text-white">{c.client}</h4>
                  </div>
                  <div className="w-14 h-14 bg-gradient-to-br from-[#d62cab] to-[#37052f] rounded-xl flex items-center justify-center transform group-hover:rotate-12 transition-transform shadow-xl text-white">
                    <ArrowUpRight size={24} />
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 px-6">
                <div className="space-y-4">
                  <h5 className="text-white font-black text-lg">The Challenge</h5>
                  <p className="text-[#B5B5C0] leading-relaxed text-base font-light">{c.challenge}</p>
                </div>
                <div className="p-8 rounded-2xl bg-white/5 border border-white/10 flex flex-col gap-2 group-hover:bg-[#d62cab]/5 transition-colors">
                  <span className="text-[#8E8E9F] text-xs font-black uppercase tracking-widest">Key Metric</span>
                  <div className="flex items-center gap-3 text-white text-2xl font-black">
                    <TrendingUp className="w-6 h-6 text-[#d62cab]" />
                    <span>{c.results}</span>
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

export default CaseStudies;