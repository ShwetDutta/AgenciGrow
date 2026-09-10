import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const ClosingTicker: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  // Smooth horizontal scroll movement matching 00:11 - 00:12 in reference video
  const xTranslation = useTransform(scrollYProgress, [0, 1], ['-5%', '-40%']);

  return (
    <div
      ref={containerRef}
      className="relative bg-[#E5E3DD] text-[#111111] overflow-hidden select-none py-16 sm:py-24 border-b border-black/15"
    >
      <div className="w-full overflow-hidden">
        <motion.div
          style={{ x: xTranslation }}
          className="flex items-center gap-12 sm:gap-24 whitespace-nowrap will-change-transform"
        >
          <span
            className="text-[22vw] sm:text-[21vw] lg:text-[20vw] font-serif font-normal text-[#111111] leading-[0.80] tracking-[-0.035em]"
            style={{ fontFamily: '"Bodoni Moda", "Playfair Display", Georgia, serif' }}
          >
            AgenciGrow.
          </span>
          <span
            className="text-[22vw] sm:text-[21vw] lg:text-[20vw] font-serif font-normal text-neutral-400/80 leading-[0.80] tracking-[-0.035em]"
            style={{ fontFamily: '"Bodoni Moda", "Playfair Display", Georgia, serif' }}
          >
            Noble.
          </span>
          <span
            className="text-[22vw] sm:text-[21vw] lg:text-[20vw] font-serif font-normal text-[#111111] leading-[0.80] tracking-[-0.035em]"
            style={{ fontFamily: '"Bodoni Moda", "Playfair Display", Georgia, serif' }}
          >
            AgenciGrow.
          </span>
        </motion.div>
      </div>
    </div>
  );
};

export default ClosingTicker;
