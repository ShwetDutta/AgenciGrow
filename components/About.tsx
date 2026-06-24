import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { MessageSquare, Map } from 'lucide-react';

const steps = [
  {
    icon: <MessageSquare className="w-5 h-5 text-[#C9CDD3]" />,
    title: 'Discovery Call',
    body: 'A free 30-minute session to map your goals, your current bottlenecks, and where growth is actually stuck.'
  },
  {
    icon: <Map className="w-5 h-5 text-[#C9CDD3]" />,
    title: 'Custom Growth Roadmap',
    body: 'A tailored plan covering exactly which systems you need, in what order, and why — before anything gets built.'
  }
];

const About: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="process" className="py-28 bg-[#0A0A0B] relative z-10 scroll-mt-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Header Block */}
        <div className="max-w-3xl mb-20">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#8B8F96] mb-4"
          >
            // How We Work
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-heading text-[#F5F5F2] tracking-tight leading-[1.12] mb-8"
          >
            Built on a real process,<br />not a guess.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-base md:text-lg text-[#8B8F96] font-body font-light leading-relaxed max-w-2xl"
          >
            We're early — and that's exactly why we work harder on yours. No account managers, no outsourced execution. The people building your growth system are the people you talk to.
          </motion.p>
        </div>

        {/* 2 Grid Cards */}
        <div 
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {steps.map((step, idx) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: idx * 0.2, ease: "easeOut" }}
              className="liquid-glass p-8 flex flex-col justify-between h-full border border-white/5 transition-all duration-300 hover:scale-[1.01] hover:border-white/10"
              style={{ background: 'rgba(201, 205, 211, 0.02)' }}
            >
              <div>
                {/* Icon box */}
                <div 
                  className="w-10 h-10 rounded-lg flex items-center justify-center liquid-glass border border-white/10 mb-8"
                  style={{ background: 'rgba(201, 205, 211, 0.05)' }}
                >
                  {step.icon}
                </div>
                
                <h3 className="text-2xl font-medium tracking-wide text-[#F5F5F2] mb-4 font-body">
                  {step.title}
                </h3>
                <p className="text-sm md:text-base text-[#8B8F96] font-light leading-relaxed font-body">
                  {step.body}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default About;
