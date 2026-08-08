import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const editorialServices = ['STRATEGY', 'SYSTEMS', 'AUTOMATION', 'WEB', 'PAID MEDIA'];

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);

  // Parallax scroll controls
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  });

  const headlineY = useTransform(scrollYProgress, [0, 1], ['0%', '-6%']);
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '10%']);
  const bgTextX = useTransform(scrollYProgress, [0, 1], ['0%', '-6%']);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-[100dvh] lg:h-[100dvh] flex flex-col justify-between bg-[#000000] text-[#F5F5F2] pt-20 sm:pt-24 lg:pt-22 pb-5 sm:pb-6 lg:pb-6 px-6 sm:px-10 lg:px-16 overflow-hidden z-10 select-none"
    >
      {/* Subtle Oversized Background Typography */}
      <motion.div
        aria-hidden="true"
        style={{ x: bgTextX }}
        className="absolute inset-0 pointer-events-none overflow-hidden z-0 flex items-center justify-center"
      >
        <span
          className="
            text-[23vw]
            font-heading
            font-serif
            uppercase
            tracking-[-0.07em]
            leading-none
            text-white/[0.09]
            whitespace-nowrap
            select-none
            translate-y-[-2%]"
        >
          AGENCIGROW
        </span>
      </motion.div>

      {/* Hero Content Wrapper */}
      <div className="max-w-7xl mx-auto w-full relative z-10 flex flex-col justify-between flex-1 h-full">
        
        {/* Top Editorial Metadata Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center justify-between pb-3 sm:pb-4 border-b border-white/10 text-[10px] sm:text-xs font-mono uppercase tracking-[0.3em] text-gray-400 mb-2 sm:mb-4 lg:mb-4"
        >
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-white/80 animate-pulse" />
            <span>CHENNAI • INDIA</span>
          </div>

          <div className="hidden sm:block text-gray-500 tracking-[0.4em] text-[9px] sm:text-[10px]">
            STRATEGY / SYSTEMS / SCALE
          </div>

          <div className="flex items-center gap-4 sm:gap-6 text-gray-500">
            <span>EST. 2026</span>
          </div>
        </motion.div>

        {/* Main Editorial Headline & Integrated Image Composition */}
        <div className="relative my-auto py-2 sm:py-3">
          
          {/* Main Headline Stack with Layered Composition */}
          <motion.div style={{ y: headlineY }} className="relative z-20 space-y-0.5 sm:space-y-1">
            
            {/* Line 1: BUILD */}
            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: '100%', opacity: 0 }}
                animate={{ y: '0%', opacity: 1 }}
                transition={{ duration: 0.85, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="text-5xl sm:text-7xl md:text-8xl lg:text-[5.5rem] xl:text-[6.8rem] 2xl:text-[7.6rem] font-heading font-serif font-normal uppercase tracking-tighter leading-[0.86] text-white"
              >
                BUILD
              </motion.h1>
            </div>

            {/* Line 2: WHAT */}
            <div className="overflow-hidden pl-6 sm:pl-16 md:pl-28 lg:pl-36">
              <motion.h1
                initial={{ y: '100%', opacity: 0 }}
                animate={{ y: '0%', opacity: 1 }}
                transition={{ duration: 0.85, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="text-4xl sm:text-6xl md:text-7xl lg:text-[4.8rem] xl:text-[6rem] 2xl:text-[6.8rem] font-heading font-serif font-normal uppercase italic tracking-tighter leading-[0.86] text-gray-400"
              >
                WHAT
              </motion.h1>
            </div>

            {/* Line 3: COMPOUNDS. */}
            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: '100%', opacity: 0 }}
                animate={{ y: '0%', opacity: 1 }}
                transition={{ duration: 0.85, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="text-5xl sm:text-7xl md:text-8xl lg:text-[5.5rem] xl:text-[6.8rem] 2xl:text-[7.6rem] font-heading font-serif font-normal uppercase tracking-tighter leading-[0.86] text-white"
              >
                COMPOUNDS.
              </motion.h1>
            </div>

          </motion.div>

          {/* Substantially Larger Editorial Image Layered Over Typography */}
          <motion.div
            style={{ y: imageY }}
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-1/2 -translate-y-[60%] sm:-translate-y-[88%] lg:-translate-y-[90%] right-0 sm:right-4 md:right-8 lg:right-12 xl:right-16 z-30 pointer-events-none"
          >
            <div className="relative w-32 h-44 sm:w-48 sm:h-64 md:w-56 md:h-76 lg:w-64 lg:h-84 xl:w-72 xl:h-92 rounded-xs border border-white/15 bg-black shadow-[0_25px_60px_rgba(0,0,0,0.9)] overflow-hidden">
              <img
                src="/Photos/Hero-page-card.jpeg"
                alt="AgenciGrow Strategy"
                className="w-full h-full object-cover filter contrast-[1.05] brightness-[0.92]"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-white/5 pointer-events-none" />
            </div>
          </motion.div>

        </div>

        {/* Bottom Editorial Service Labels */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="pt-4 sm:pt-5 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-[10px] sm:text-xs font-mono uppercase tracking-[0.3em] text-gray-400 relative z-20"
        >
          {editorialServices.map((service, idx) => (
            <React.Fragment key={service}>
              <span className="hover:text-white transition-colors cursor-default">{service}</span>
              {idx < editorialServices.length - 1 && <span className="text-gray-600 hidden sm:inline">•</span>}
            </React.Fragment>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;

