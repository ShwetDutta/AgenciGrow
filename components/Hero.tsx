import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { openBookingModal } from './CalendlyModal';

const Hero: React.FC = () => {
  const trackRef = useRef<HTMLDivElement>(null);

  /* ==========================================================================
     SCROLL MATH:
     - target: trackRef (height: 200vh)
     - offset: ['start start', 'end end']
     - start start = 0px scroll (hero enters viewport top)
     - end end = 100vh scroll (bottom of track reaches bottom of viewport)
     ========================================================================== */
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start start', 'end end'],
  });

  // Visibly scale down from 1.0 (fullscreen edge-to-edge) down to 0.72 as next section ascends
  const scale = useTransform(scrollYProgress, [0, 0.6, 1], [1, 0.78, 0.70]);

  // Corner radius transforms quickly from 0px (edge-to-edge) up to 40px
  const borderRadius = useTransform(scrollYProgress, [0, 0.35], ['0px', '40px']);

  // Subtle dimming overlay from 0 to 0.45 to push hero back in 3D space without wiping out content
  const dimOpacity = useTransform(scrollYProgress, [0, 0.8], [0, 0.45]);

  // Horizontal motion of the Didone typographic track
  const textXTranslation = useTransform(scrollYProgress, [0, 1], ['0%', '-30%']);

  // Maintain legibility of hero text while adding depth translation
  const contentOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.6]);
  const contentTranslateY = useTransform(scrollYProgress, [0, 1], [0, -50]);

  // Crisp perimeter illumination & deep elevation shadow as it shrinks into a card
  const boxShadow = useTransform(
    scrollYProgress,
    [0, 0.35],
    [
      '0px 0px 0px rgba(0,0,0,0)',
      '0px 30px 100px -10px rgba(0,0,0,0.95), 0px 0px 0px 1px rgba(255,255,255,0.22)'
    ]
  );

  return (
    <section
      ref={trackRef}
      id="hero"
      className="relative w-full h-[200vh] bg-[#07080a] select-none"
    >
      {/* Pinned Sticky Viewport Window - uses 100dvh for mobile dynamic toolbar awareness */}
      <div className="sticky top-0 w-full h-screen h-[100dvh] overflow-hidden flex items-center justify-center p-0 z-0 bg-[#07080a]">
        
        {/* Subtle Ambient Spatial Depth Grid (visible when hero card shrinks away from edges) */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_38%,_rgba(255,255,255,0.08)_0%,_transparent_65%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff0d_1px,transparent_1px)] [background-size:32px_32px] opacity-50 pointer-events-none" />

        {/* The Scaling Canvas */}
        <motion.div
          style={{
            scale,
            borderRadius,
            boxShadow,
            transformOrigin: 'center 38%',
          }}
          className="relative w-full h-full overflow-hidden flex flex-col justify-between p-4 xs:p-6 sm:p-10 lg:p-14 will-change-transform bg-neutral-900 border border-white/15"
        >
          {/* Fullscreen High-Resolution Editorial Background Image from Unsplash - art-directed position for mobile landscape & portrait */}
          <img
            src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=2560&q=85"
            alt="AgenciGrow Editorial Architecture"
            className="absolute inset-0 w-full h-full object-cover object-[50%_35%] filter grayscale contrast-125 brightness-75 scale-105 pointer-events-none"
            referrerPolicy="no-referrer"
          />

          {/* Vignette Scrim Layer */}
          <div className="absolute inset-0 bg-radial-[circle_at_center,_transparent_0%,_rgba(0,0,0,0.75)_100%] pointer-events-none" />

          {/* Scroll-Driven Dimming Overlay */}
          <motion.div
            style={{ opacity: dimOpacity }}
            className="absolute inset-0 bg-black pointer-events-none z-10"
          />

          {/* Top spacer for persistent fixed navbar */}
          <div className="relative z-20 w-full pt-12 sm:pt-14" />

          {/* Center Oversized Typographic Track with Scroll Drift & Fade */}
          <motion.div
            style={{
              opacity: contentOpacity,
              y: contentTranslateY,
            }}
            className="relative z-20 my-auto py-2 sm:py-6 overflow-visible w-full"
          >
            {/* Giant Horizontal Moving Wordmark */}
            <motion.div
              style={{ x: textXTranslation }}
              className="flex items-center gap-6 sm:gap-14 lg:gap-20 whitespace-nowrap will-change-transform overflow-visible"
            >
              <h1
                className="text-[21vw] sm:text-[19vw] lg:text-[18vw] font-serif font-normal text-white leading-[1.05] tracking-[-0.035em] select-none py-2"
                style={{ fontFamily: '"Bodoni Moda", "Playfair Display", Georgia, serif' }}
              >
                AgenciGrow
              </h1>
            </motion.div>
          </motion.div>

          {/* Bottom Action Bar */}
          <div className="relative z-20 w-full pb-2 sm:pb-0">
            <div className="w-full border-b border-white/20 mb-3 sm:mb-5 lg:mb-6" />

            <div className="flex items-center justify-between sm:justify-end text-white gap-3">
              <span className="text-[10px] sm:hidden font-mono uppercase tracking-widest text-neutral-400">
                Zurich // Global
              </span>
              <button
                onClick={openBookingModal}
                className="inline-flex items-center justify-between gap-2.5 sm:gap-3 px-4 sm:px-5 py-2.5 rounded-full bg-white text-black hover:bg-neutral-200 text-xs font-mono uppercase tracking-wider transition-all duration-200 cursor-pointer min-h-[44px] shadow-lg font-medium active:scale-95"
              >
                <span>Book Consultation</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
