import React from 'react';
import { Check, Info } from 'lucide-react';
import { motion } from 'framer-motion';

const Booking: React.FC = () => {
  return (
    <section id="booking" className="py-32 bg-[#0F0F14] scroll-mt-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          <div className="space-y-12">
            <div>
              <motion.span 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="text-[#C63AFF] font-black text-xs uppercase tracking-[0.4em] mb-6 block"
              >
                Take Action
              </motion.span>
              <motion.h3 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="text-5xl md:text-7xl font-black text-white mb-8 leading-[0.95] tracking-tighter"
              >
                Map Your <br /><span className="text-[#C63AFF]">Growth Blueprint.</span>
              </motion.h3>
              <p className="text-xl text-[#B5B5C0] font-light leading-relaxed mb-8">
                A 30-minute high-impact session to dissect your current acquisition channels and identify your untapped profit margins. No fluff, just technical strategy.
              </p>
            </div>

            <div className="space-y-6">
              <div className="p-10 rounded-2xl bg-white/5 border border-white/10 shadow-sm">
                <h4 className="text-xl font-black text-white mb-8 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#C63AFF]/10 flex items-center justify-center text-[#C63AFF]">
                    <Check className="w-6 h-6" />
                  </div>
                  Ideal for Brands that:
                </h4>
                <ul className="space-y-6">
                  {[
                    "Have a validated product/market fit",
                    "Are generating $20k+ monthly recurring revenue",
                    "Seek data-backed clarity on their scale potential"
                  ].map((item, i) => (
                    <li key={i} className="text-[#B5B5C0] flex items-start gap-4 font-medium">
                      <div className="w-2 h-2 rounded-full bg-[#C63AFF] mt-2.5 flex-shrink-0"></div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex items-center gap-3 text-[#8E8E9F] font-bold px-4">
                <div className="text-[#C63AFF]"><Info className="w-5 h-5" /></div>
                <span className="text-xs uppercase tracking-widest">Limited to 4 strategy sessions per week.</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-2xl border border-white/10 overflow-hidden relative min-h-[750px]">
            <iframe 
              src="https://calendly.com/shwetdutta/30min" 
              width="100%" 
              height="750" 
              frameBorder="0"
              title="Calendly Booking"
              className="w-full"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Booking;