import React from 'react';
import { motion } from 'framer-motion';
import { Search, MousePointer2, Layers } from 'lucide-react';

const services = [
  {
    icon: <Search size={28} />,
    title: 'Topical SEO',
    desc: 'Architecting authoritative content moats that define market leadership and drive cost-free customer acquisition.',
    tag: 'Long-term Equity'
  },
  {
    icon: <MousePointer2 size={28} />,
    title: 'Precision Paid',
    desc: 'Algorithmic media deployment focused on unit economics. We optimize for margin, not just clicks.',
    tag: 'Immediate Velocity'
  },
  {
    icon: <Layers size={28} />,
    title: 'Conversion Systems',
    desc: 'Full-funnel optimization to eliminate drop-off. Turning high-intent traffic into compounding revenue.',
    tag: 'Operational Alpha'
  }
];

const Services: React.FC = () => {
  return (
    <section id="services" className="py-32 bg-[#0B0B0E]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="max-w-3xl mb-24">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-[#C63AFF] font-black text-xs uppercase tracking-[0.4em] mb-4 block"
          >
            Core Competencies
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-5xl lg:text-7xl font-black text-white mb-8 leading-[1]"
          >
            Growth is a Science, <br /> 
            <span className="text-[#C63AFF]">Not an Accident.</span>
          </motion.h2>
          <p className="text-[#B5B5C0] text-xl font-light leading-relaxed">
            Our methodology is modular yet integrated. We deploy growth architectures designed to be managed like a high-yield investment portfolio.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {services.map((s, i) => (
            <motion.div 
              key={s.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="group p-12 bg-white/5 rounded-2xl border border-white/10 hover:border-[#C63AFF]/50 hover:shadow-[0_0_30px_rgba(198,58,255,0.15)] transition-all duration-500 relative overflow-hidden"
            >
              <div className="w-16 h-16 bg-[#0B0B0E] text-[#C63AFF] rounded-xl flex items-center justify-center mb-10 group-hover:bg-[#C63AFF] group-hover:text-white transition-all">
                {s.icon}
              </div>
              
              <div className="text-[10px] font-black text-[#8E8E9F] uppercase tracking-widest mb-4">
                {s.tag}
              </div>
              
              <h3 className="text-3xl font-black text-white mb-6 tracking-tight">{s.title}</h3>
              
              <p className="text-[#B5B5C0] text-lg leading-relaxed font-light">
                {s.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;