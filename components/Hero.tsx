import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Target } from 'lucide-react';

const Hero: React.FC = () => {
  const scrollToContact = (e: React.MouseEvent) => {
    e.preventDefault();
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center pt-32 bg-[#0F172A] overflow-hidden">
      {/* Refined Animated Accents */}
      <motion.div 
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.1, 0.15, 0.1]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="blob w-[800px] h-[800px] bg-[#00D094] top-[-20%] right-[-10%] blur-[120px]"
      />
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.05, 0.08, 0.05]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="blob w-[600px] h-[600px] bg-[#1E293B] bottom-[-10%] left-[-10%] blur-[100px]"
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10 w-full">
        <div className="flex flex-col lg:flex-row items-center gap-20">
          <div className="flex-[1.2]">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-4 mb-8"
            >
              <span className="w-12 h-[1px] bg-[#00D094]"></span>
              <span className="text-[#00D094] text-[11px] font-black uppercase tracking-[0.4em]">Growth Architecture</span>
            </motion.div>
            
            <h1 className="text-6xl md:text-[6.5rem] font-black text-[#F8FAFC] tracking-tighter leading-[0.9] mb-10">
              <motion.span 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="block"
              >
                Performance
              </motion.span>
              <motion.span 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="block text-[#00D094]"
              >
                Engineered
              </motion.span>
              <motion.span 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="block flex items-center gap-4"
              >
                Revenue <div className="h-[2px] w-24 bg-[#00D094] hidden md:block"></div>
              </motion.span>
            </h1>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-[#94A3B8] font-light leading-relaxed max-w-2xl mb-14"
            >
              We bridge the gap between creative capital and algorithmic precision. AgenciGrow builds compounding growth systems for category leaders through high-intent SEO and data-backed media.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap items-center gap-8"
            >
              <a
                href="#contact"
                onClick={scrollToContact}
                className="btn-premium px-12 py-6 bg-[#00D094] text-[#0F172A] rounded-sm font-black text-sm uppercase tracking-[0.1em] hover:bg-[#F8FAFC] flex items-center gap-4 shadow-2xl"
              >
                SEND US A MESSAGE
                <ArrowRight size={20} />
              </a>
              <div className="flex items-center gap-4 text-[#94A3B8]">
                <div className="flex flex-col">
                  <span className="text-xl font-black text-[#F8FAFC]">4.2x</span>
                  <span className="text-[10px] font-black uppercase tracking-widest">Avg Portfolio ROAS</span>
                </div>
                <div className="w-[1px] h-10 bg-[#E5E7EB]/10"></div>
                <div className="flex flex-col">
                  <span className="text-xl font-black text-[#F8FAFC]">184%</span>
                  <span className="text-[10px] font-black uppercase tracking-widest">Year-on-Year Alpha</span>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, type: "spring" }}
            className="flex-1 relative"
          >
            <div className="relative z-10 p-4 border border-white/5 bg-white/5 backdrop-blur-2xl rounded-2xl shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2426" 
                alt="Growth Metrics" 
                className="w-full h-auto rounded-xl grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-700"
              />
              <div className="absolute top-10 -right-10 bg-[#00D094] p-6 rounded-lg shadow-2xl animate-bounce-slow text-[#0F172A]">
                <Target className="w-8 h-8" />
              </div>
            </div>
            <div className="absolute -bottom-10 -left-10 w-40 h-40 border-l border-b border-[#00D094]/20 -z-10"></div>
          </motion.div>
        </div>
      </div>

      <style>{`
        .animate-bounce-slow {
          animation: bounce-slow 4s infinite;
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
      `}</style>
    </section>
  );
};

export default Hero;