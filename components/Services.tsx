import React from 'react';
import { motion } from 'framer-motion';
import { Search, MousePointer2, Layers } from 'lucide-react';

const services = [
  {
    icon: <MousePointer2 size={28} />,
    title: 'High-Intent Acquisition',
    desc: 'Strategic Google and Meta Ads campaigns designed to attract customers actively searching for your services and ready to convert.',
    tag: 'Predictable Traffic'
  },
  {
    icon: <Layers size={28} />,
    title: 'Conversion Architecture',
    desc: 'Custom landing pages and sales funnel designs that eliminate drop-off and turn high-intent traffic into compounding revenue.',
    tag: 'Revenue Systems'
  },
  {
    icon: <Search size={28} />,
    title: 'Growth Infrastructure',
    desc: 'End-to-end CRM tracking, WhatsApp automation, and real-time analytics to eliminate wasted spend and follow-up gaps.',
    tag: 'Scalable Operations'
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
            className="text-[#d62cab] font-black text-xs uppercase tracking-[0.4em] mb-4 block"
          >
            Core Competencies
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-5xl lg:text-7xl font-black text-white mb-8 leading-[1]"
          >
            Growth is a System, <br /> 
            <span className="text-[#d62cab]">Not a Guessing Game.</span>
          </motion.h2>
          <p className="text-[#B5B5C0] text-xl font-light leading-relaxed">
            Most businesses don't have a marketing problem—they have a systems problem. We build the infrastructure that turns attention into predictable revenue.
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
              className="group p-12 bg-white/5 rounded-2xl border border-white/10 hover:border-[#d62cab]/50 hover:shadow-[0_0_30px_rgba(214,44,171,0.15)] transition-all duration-500 relative overflow-hidden"
            >
              <div className="w-16 h-16 bg-[#0B0B0E] text-[#d62cab] rounded-xl flex items-center justify-center mb-10 group-hover:bg-[#d62cab] group-hover:text-white transition-all">
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