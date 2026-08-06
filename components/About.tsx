import React from 'react';
import { motion } from 'framer-motion';
import { UserCheck, ShieldCheck, Cpu, MapPin } from 'lucide-react';

const pillars = [
  {
    icon: <UserCheck className="w-5 h-5 text-[#C9CDD3]" />,
    title: "Direct Founder Access",
    desc: "No account managers proxying messages or junior interns running your campaigns. You work directly with the founder crafting the strategy, writing the copy, and executing the builds."
  },
  {
    icon: <ShieldCheck className="w-5 h-5 text-[#C9CDD3]" />,
    title: "One Modular Retainer",
    desc: "Instead of paying separate fees for web design, ad managers, and automation agencies, get everything under one flexible, unified retainer that adapts to your immediate priorities."
  },
  {
    icon: <Cpu className="w-5 h-5 text-[#C9CDD3]" />,
    title: "Custom Systems, Zero Templates",
    desc: "We don't sell generic marketing checklists. We engineer bespoke customer acquisition pathways tailored specifically to your offer, unit economics, and target audience."
  }
];

const About: React.FC = () => {
  return (
    <section id="about" className="py-24 sm:py-32 bg-[#0A0A0B] relative z-10 scroll-mt-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-2 mb-4"
          >
            <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#8B8F96] font-body">
              // WHY AGENCIGROW
            </span>
            <span className="inline-flex items-center gap-1 text-[11px] font-medium text-[#C9CDD3]/80 bg-white/5 px-2.5 py-0.5 rounded-full border border-white/10 font-body">
              <MapPin className="w-3 h-3 text-[#C9CDD3]" /> Chennai, India & Global
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading text-[#F5F5F2] tracking-tight leading-[1.12] mb-6"
          >
            One founder. Direct access.<br />
            Total accountability.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-base sm:text-lg text-[#C9CDD3] font-body font-light leading-relaxed"
          >
            Traditional agencies lock you into rigid scopes, hand your account off to inexperienced juniors, and hide behind corporate account managers. At AgenciGrow, you get a dedicated growth partner who designs the strategy, writes the copy, codes the conversion pages, and manages the ad spend directly.
          </motion.p>
        </div>

        {/* 3 Pillar Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((pillar, idx) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: idx * 0.15 }}
              className="p-8 rounded-2xl liquid-glass border border-white/5 hover:border-white/15 transition-all duration-300 flex flex-col justify-between"
              style={{ background: 'rgba(201, 205, 211, 0.02)' }}
            >
              <div>
                <div 
                  className="w-11 h-11 rounded-xl flex items-center justify-center liquid-glass border border-white/10 mb-6"
                  style={{ background: 'rgba(201, 205, 211, 0.05)' }}
                >
                  {pillar.icon}
                </div>
                <h3 className="text-xl font-medium text-[#F5F5F2] mb-3 font-body">
                  {pillar.title}
                </h3>
                <p className="text-sm text-[#8B8F96] font-body font-light leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer Note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
        >
          <p className="text-xs sm:text-sm text-[#8B8F96] font-body font-light flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-[#C9CDD3] animate-pulse" />
            Working hands-on with a intentionally limited roster of partners to preserve execution quality.
          </p>
        </motion.div>

      </div>
    </section>
  );
};

export default About;
