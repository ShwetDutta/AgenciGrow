import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { MessageSquare, Map } from 'lucide-react';
import SideRays from './SideRays';

const steps = [
  {
    icon: <MessageSquare className="w-5 h-5 text-[#C9CDD3]" />,
    title: 'Discovery Call',
    body: 'A comprehensive, free 30-minute growth assessment where we analyze your current marketing challenges, sales pipelines, and conversion barriers. Together, we will pinpoint exactly where your client acquisition is hitting a ceiling, evaluate your digital search engine optimization (SEO) visibility, and outline a clear direction to unlock predictable revenue on autopilot.'
  },
  {
    icon: <Map className="w-5 h-5 text-[#C9CDD3]" />,
    title: 'Custom Growth Roadmap',
    body: 'A bespoke, detailed digital growth plan built specifically for your business model. This strategic roadmap maps out the essential marketing funnels, search engine optimization frameworks, conversion-first custom landing pages, and automated CRM workflows you need to implement, detailed with clear timelines and key performance indicators.'
  }
];

const About: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="process" className="py-28 bg-[#0A0A0B] relative z-10 scroll-mt-12 overflow-hidden">
      {/* Premium Side Rays Background */}
      <div className="absolute inset-0 z-0 opacity-45 pointer-events-none">
        <SideRays
          speed={1.5}
          rayColor1="#5227FF"
          rayColor2="#B497CF"
          intensity={1.5}
          spread={2.5}
          origin="top-right"
          tilt={10}
          saturation={1.5}
          blend={0.6}
          falloff={1.4}
          opacity={1.0}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        
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
            We are a highly dedicated growth partner committed to engineering predictable marketing and operations systems for your business. By avoiding generic templates and layers of corporate account management, we work directly as a hand-on extension of your team. From custom-coded web designs and technical SEO to multi-stage high-intent ad funnels, we build every asset from the ground up. The senior growth strategists who architect your roadmap are the same specialists who write the copy, optimize the landing pages, integrate your CRM pipelines, and scale your automated campaigns.
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
