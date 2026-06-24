import React from 'react';
import { Check, Info } from 'lucide-react';
import { motion } from 'framer-motion';

const Booking: React.FC = () => {
  return (
    <section id="booking" className="py-28 bg-[#0A0A0B] relative z-10 scroll-mt-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* Left Column: 3-step Checklist */}
          <div className="space-y-10">
            <div>
              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#8B8F96] mb-4"
              >
                // Take Action
              </motion.p>
              <motion.h3 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="text-4xl md:text-5xl lg:text-6xl font-heading text-[#F5F5F2] tracking-tight leading-[1.12]"
              >
                Map your growth roadmap.
              </motion.h3>
            </div>

            <div className="space-y-6">
              <div 
                className="p-8 rounded-2xl liquid-glass border border-white/5"
                style={{ background: 'rgba(201, 205, 211, 0.02)' }}
              >
                <h4 className="text-lg font-medium text-[#F5F5F2] mb-6 flex items-center gap-3 font-body">
                  <div 
                    className="w-8 h-8 rounded-lg flex items-center justify-center liquid-glass border border-white/10 text-[#C9CDD3]"
                    style={{ background: 'rgba(201, 205, 211, 0.05)' }}
                  >
                    <Check className="w-4 h-4 stroke-[2.5]" />
                  </div>
                  <span>Our 3-Step Process:</span>
                </h4>
                
                <ul className="space-y-6">
                  {[
                    {
                      title: "Discovery Meeting",
                      desc: "Deep dive into your goals and bottlenecks to understand what is keeping growth stuck."
                    },
                    {
                      title: "Custom Growth Roadmap",
                      desc: "A tailored proposal mapping out the exact systems you need, in what order, and why."
                    },
                    {
                      title: "Systems-First Approach",
                      desc: "We build and execute custom roadmap systems built around how your business actually works."
                    }
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-4">
                      <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center text-xs text-[#C9CDD3] mt-1 flex-shrink-0 border border-white/10 font-body">
                        {idx + 1}
                      </div>
                      <div>
                        <h5 className="text-sm font-medium text-[#F5F5F2] mb-1 font-body">
                          {item.title}
                        </h5>
                        <p className="text-xs text-[#8B8F96] font-light leading-relaxed font-body">
                          {item.desc}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex items-center gap-3 text-[#8B8F96] px-4 font-body">
                <div className="text-[#C9CDD3]"><Info className="w-4 h-4" /></div>
                <span className="text-[11px] uppercase tracking-widest font-medium">Limited to 4 strategy sessions per week.</span>
              </div>
            </div>
          </div>

          {/* Right Column: Calendly embed inside liquid glass container */}
          <div 
            className="rounded-3xl shadow-2xl border border-white/5 overflow-hidden relative min-h-[600px] md:min-h-[700px] liquid-glass p-1"
            style={{ background: 'rgba(201, 205, 211, 0.02)' }}
          >
            <iframe 
              src="https://calendly.com/shwetdutta/30min" 
              width="100%" 
              height="650" 
              frameBorder="0"
              title="Calendly Booking"
              className="w-full rounded-2xl bg-transparent opacity-90"
              style={{ filter: "invert(1) hue-rotate(180deg) brightness(0.9) contrast(1.1)" }} // Keeps Calendly widget dark & premium!
            ></iframe>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Booking;
