import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const editorialPrinciples = [
  {
    code: '01 / STRATEGY',
    title: 'Strategy First',
    description: 'Every project begins with understanding the business before building the solution.'
  },
  {
    code: '02 / ARCHITECTURE',
    title: 'Systems Thinking',
    description: 'Marketing, automation, websites, and content should work together instead of existing separately.'
  },
  {
    code: '03 / METRICS',
    title: 'Measured Growth',
    description: 'Every decision is refined through data, iteration, and long term thinking.'
  },
  {
    code: '04 / EXPANSION',
    title: 'Built to Scale',
    description: 'Everything we build is designed to continue creating value as your business grows.'
  }
];

const editorialLabels = ['STRATEGY', 'SYSTEMS', 'AUTOMATION', 'WEB', 'PAID MEDIA'];

const About: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);

  // Smooth multi-layer parallax scrolling
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  // Layered parallax transformations
  const bgTextX = useTransform(scrollYProgress, [0, 1], ['0%', '-8%']);
  const vintageImageY = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);
  const heroChessY = useTransform(scrollYProgress, [0, 1], ['-6%', '14%']);
  const heroChessRotate = useTransform(scrollYProgress, [0, 1], [-2, 4]);
  const boardPhotoY = useTransform(scrollYProgress, [0, 1], ['3%', '-6%']);

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative py-20 sm:py-32 md:py-44 bg-[#000000] text-[#F5F5F2] overflow-hidden scroll-mt-12 border-t border-white/10 z-10 select-none"
    >
      {/* 1. OVERSIZED BACKGROUND TYPOGRAPHY: STRATEGY (6-8% Opacity) */}
      <motion.div
        aria-hidden="true"
        style={{ x: bgTextX }}
        className="absolute inset-0 pointer-events-none overflow-hidden z-0"
      >
        <span
          className="
            absolute
            left-0
            right-0
            top-1/2
            -translate-y-1/2
            text-[18vw]
            sm:text-[21vw]
            font-heading
            font-serif
            uppercase
            tracking-[-0.06em]
            leading-none
            text-white/[0.06]
            whitespace-nowrap
            text-center
          "
        >
          STRATEGY
        </span>
      </motion.div>

      {/* 2. IMAGE 2: VINTAGE-CHESS (Large Faded Editorial Illustration in Background) */}
      <motion.div
        style={{ y: vintageImageY }}
        aria-hidden="true"
        className="absolute -top-12 -right-16 sm:-right-24 w-[24rem] sm:w-[36rem] md:w-[48rem] aspect-square pointer-events-none z-0 opacity-15 filter grayscale contrast-150 mix-blend-screen overflow-hidden"
      >
        <img
          src="/Photos/vintage-chess.jpeg"
          alt=""
          className="w-full h-full object-cover rounded-full filter blur-[1px] opacity-80"
        />
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 relative z-10">
        
        {/* EDITORIAL HEADER LINE: Magazine Metadata */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-8 sm:pb-16 border-b border-white/10 text-[9px] sm:text-xs font-mono uppercase tracking-[0.25em] sm:tracking-[0.35em] text-gray-400">
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-white animate-pulse" />
            <span>WHY AGENCIGROW</span>
          </div>

          <div className="flex items-center gap-4 sm:gap-6 text-gray-500">
            <span>CHENNAI • INDIA</span>
            <span className="hidden sm:inline">•</span>
            <span>EST. 2026</span>
          </div>
        </div>

        {/* ASYMMETRICAL EDITORIAL HERO COMPOSITION */}
        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center pt-10 sm:pt-20 pb-12 sm:pb-24">
          
          {/* Left/Center Column: High Fashion Serif Headline & Narrow Paragraph */}
          <div className="lg:col-span-8 z-20 space-y-8 sm:space-y-14">
            
            {/* Headline revealed line-by-line */}
            <div className="space-y-1 sm:space-y-2 overflow-hidden font-heading font-serif">
              <motion.div
                initial={{ y: '100%', opacity: 0 }}
                whileInView={{ y: '0%', opacity: 1 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="text-[2.75rem] xs:text-5xl sm:text-7xl md:text-8xl lg:text-[7rem] xl:text-[8.5rem] font-normal uppercase tracking-tighter leading-[0.88] text-white"
              >
                GROWTH
              </motion.div>
              
              <motion.div
                initial={{ y: '100%', opacity: 0 }}
                whileInView={{ y: '0%', opacity: 1 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.9, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
                className="text-[2.75rem] xs:text-5xl sm:text-7xl md:text-8xl lg:text-[7rem] xl:text-[8.5rem] font-normal uppercase tracking-tighter leading-[0.88] text-gray-400 pl-4 sm:pl-16 italic"
              >
                IS
              </motion.div>

              <motion.div
                initial={{ y: '100%', opacity: 0 }}
                whileInView={{ y: '0%', opacity: 1 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.9, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
                className="text-[2.75rem] xs:text-5xl sm:text-7xl md:text-8xl lg:text-[7rem] xl:text-[8.5rem] font-normal uppercase tracking-tighter leading-[0.88] text-white"
              >
                DESIGNED.
              </motion.div>
            </div>

            {/* Editorial Paragraph - Narrow width & generous line spacing */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.85, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-md sm:max-w-lg pt-2 sm:pt-4 pl-4 sm:pl-8 border-l border-white/20 space-y-4"
            >
              <p className="text-sm sm:text-lg lg:text-xl font-light font-body text-gray-300 leading-relaxed tracking-tight">
                Growth isn't accidental. It's built through thoughtful strategy, connected systems, and consistent execution. At AgenciGrow, every website, automation, campaign, and decision works together to create sustainable business growth instead of short term wins.
              </p>
            </motion.div>
          </div>

          {/* Right Floating Visual: IMAGE 1 - CHESS-PIECE (Hero Visual) */}
          <motion.div
            style={{ y: heroChessY, rotate: heroChessRotate }}
            className="lg:col-span-4 relative flex items-center justify-center lg:justify-end min-h-[260px] sm:min-h-[400px] lg:min-h-[580px] z-20"
          >
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut' }}
              className="relative w-full max-w-[260px] sm:max-w-sm md:max-w-md lg:max-w-xl aspect-square flex items-center justify-center"
            >
              <img
                src="/Photos/chess-piece.jpg"
                alt="AgenciGrow Hero Strategic Chess Piece"
                className="w-full h-full object-contain grayscale contrast-[1.65] brightness-110 mix-blend-screen pointer-events-none select-none"
                loading="lazy"
              />
            </motion.div>
          </motion.div>

        </div>

        {/* INTERMEDIATE EDITORIAL STRIP: IMAGE 3 - CHESS-BOARD (Small Tightly Cropped Accent) */}
        <div className="my-8 sm:my-16 py-8 sm:py-12 border-y border-white/10 grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-center">
          
          <div className="md:col-span-6 flex items-center gap-4 sm:gap-6">
            {/* Tightly cropped small editorial photo accent */}
            <motion.div
              style={{ y: boardPhotoY }}
              className="w-20 h-20 sm:w-32 sm:h-32 flex-shrink-0 overflow-hidden rounded-sm grayscale contrast-125 border border-white/20 p-1 bg-black"
            >
              <img
                src="/Photos/chess-board.jpeg"
                alt="AgenciGrow Strategic Execution"
                className="w-full h-full object-cover filter brightness-90 hover:scale-105 transition-transform duration-700"
              />
            </motion.div>

            <div className="space-y-1 text-xs font-mono uppercase tracking-widest text-gray-400">
              <span className="block text-white font-medium">[ EVERY MOVE MATTERS ]</span>
              <p className="text-[10px] text-gray-500 lowercase tracking-normal font-body">
                interconnected execution across all growth touchpoints
              </p>
            </div>
          </div>

          {/* Magazine Capabilities Tags */}
          <div className="md:col-span-6 flex flex-wrap items-center justify-start md:justify-end gap-x-4 sm:gap-x-6 gap-y-2 text-[9px] sm:text-xs font-mono uppercase tracking-[0.2em] sm:tracking-[0.3em] text-gray-400">
            {editorialLabels.map((label, idx) => (
              <React.Fragment key={label}>
                <span className="hover:text-white transition-colors cursor-default">{label}</span>
                {idx < editorialLabels.length - 1 && <span className="text-gray-600">•</span>}
              </React.Fragment>
            ))}
          </div>

        </div>

        {/* FOUR MINIMALIST EDITORIAL PRINCIPLES */}
        <div className="pt-8 sm:pt-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.7 }}
            className="mb-8 sm:mb-12 flex items-center justify-between text-[10px] sm:text-xs font-mono uppercase tracking-[0.25em] text-gray-500"
          >
            <span>CORE ARCHITECTURE</span>
            <span>SYSTEM PRINCIPLES</span>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-10">
            {editorialPrinciples.map((principle, idx) => (
              <motion.div
                key={principle.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col justify-start group"
              >
                <div className="border-b border-white/15 pb-3 mb-4 sm:mb-6 flex items-center justify-between">
                  <span className="text-xs font-mono text-gray-500 tracking-widest uppercase">
                    {principle.code}
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-600 group-hover:bg-white transition-colors" />
                </div>

                <h3 className="text-lg sm:text-2xl font-body font-medium text-white mb-2 sm:mb-3 tracking-tight group-hover:text-gray-300 transition-colors">
                  {principle.title}
                </h3>

                <p className="text-xs sm:text-sm font-body font-light text-gray-400 leading-relaxed">
                  {principle.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default About;
