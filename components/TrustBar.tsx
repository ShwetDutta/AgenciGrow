import React from 'react';
import { motion } from 'framer-motion';
import { UserCheck, Layers, RefreshCw, Zap } from 'lucide-react';

const stats = [
  {
    icon: <UserCheck className="w-4 h-4 text-[#C9CDD3]" />,
    label: "Founder-Led Delivery",
    sub: "Direct access, zero middlemen"
  },
  {
    icon: <Layers className="w-4 h-4 text-[#C9CDD3]" />,
    label: "Modular Growth Engine",
    sub: "Ads, Automations, Pages & AI"
  },
  {
    icon: <RefreshCw className="w-4 h-4 text-[#C9CDD3]" />,
    label: "Single Flexible Retainer",
    sub: "Adapt services as you scale"
  },
  {
    icon: <Zap className="w-4 h-4 text-[#C9CDD3]" />,
    label: "High-Intent Focus",
    sub: "Engineered for actual revenue"
  }
];

const TrustBar: React.FC = () => {
  return (
    <section className="bg-[#0D0D0F] border-y border-white/5 py-6 sm:py-8 relative z-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 items-center justify-between">
          {stats.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="flex items-center gap-3 sm:gap-4 p-3 rounded-xl bg-white/[0.015] border border-white/5"
            >
              <div 
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center flex-shrink-0 liquid-glass border border-white/10"
                style={{ background: 'rgba(201, 205, 211, 0.04)' }}
              >
                {item.icon}
              </div>
              <div className="min-w-0">
                <h4 className="text-xs sm:text-sm font-medium text-[#F5F5F2] font-body tracking-tight truncate">
                  {item.label}
                </h4>
                <p className="text-[11px] text-[#8B8F96] font-body font-light truncate">
                  {item.sub}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustBar;
