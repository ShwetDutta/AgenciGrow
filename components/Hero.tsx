import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, Menu } from 'lucide-react';
import { openBookingModal } from './CalendlyModal';
import SwissMenuModal from './SwissMenuModal';

const Hero: React.FC = () => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
      {/* Pinned Sticky Viewport Window */}
      <div className="sticky top-0 w-full h-screen overflow-hidden flex items-center justify-center p-0 z-0 bg-[#07080a]">
        
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
          className="relative w-full h-full overflow-hidden flex flex-col justify-between p-5 sm:p-10 lg:p-14 will-change-transform bg-neutral-900 border border-white/15"
        >
          {/* Fullscreen High-Resolution Editorial Background Image from Unsplash */}
          <img
            src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=2560&q=85"
            alt="AgenciGrow Editorial Architecture"
            className="absolute inset-0 w-full h-full object-cover filter grayscale contrast-125 brightness-75 scale-105 pointer-events-none"
            referrerPolicy="no-referrer"
          />

          {/* Vignette Scrim Layer */}
          <div className="absolute inset-0 bg-radial-[circle_at_center,_transparent_0%,_rgba(0,0,0,0.75)_100%] pointer-events-none" />

          {/* Scroll-Driven Dimming Overlay */}
          <motion.div
            style={{ opacity: dimOpacity }}
            className="absolute inset-0 bg-black pointer-events-none z-10"
          />

          {/* Top Swiss Metadata Line & Collapsed Navbar */}
          <div className="relative z-20 w-full">
            <div className="flex items-center justify-between pb-3 sm:pb-4 text-xs sm:text-sm font-sans tracking-tight">
              <span className="font-normal text-white">Form</span>
              <span className="font-normal text-neutral-400">Follows</span>
              
              {/* Top Right Collapsed Navbar Trigger (Three Lines) */}
              <button
                onClick={() => setIsMenuOpen(true)}
                className="inline-flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/10 hover:bg-white text-white hover:text-black border border-white/20 transition-all duration-200 cursor-pointer backdrop-blur-md group shadow-sm"
                aria-label="Open Navigation Menu"
              >
                <Menu className="w-4 h-4 transition-transform group-hover:scale-110" />
              </button>
            </div>
            {/* Hairline Rule */}
            <div className="w-full border-b border-white/20" />
          </div>

          {/* Center Oversized Typographic Track with Scroll Drift & Fade */}
          <motion.div
            style={{
              opacity: contentOpacity,
              y: contentTranslateY,
            }}
            className="relative z-20 my-auto py-6 sm:py-12 overflow-hidden w-full"
          >
            {/* Giant Horizontal Moving Wordmark */}
            <motion.div
              style={{ x: textXTranslation }}
              className="flex items-center gap-10 sm:gap-20 whitespace-nowrap will-change-transform"
            >
              <h1
                className="text-[20vw] sm:text-[19vw] lg:text-[18vw] font-serif font-normal text-white leading-[0.80] tracking-[-0.035em] select-none"
                style={{ fontFamily: '"Bodoni Moda", "Playfair Display", Georgia, serif' }}
              >
                AgenciGrow
              </h1>
              <span
                className="text-[20vw] sm:text-[19vw] lg:text-[18vw] font-serif font-normal text-white/40 leading-[0.80] tracking-[-0.035em] select-none"
                style={{ fontFamily: '"Bodoni Moda", "Playfair Display", Georgia, serif' }}
              >
                Noble
              </span>
              <span
                className="text-[20vw] sm:text-[19vw] lg:text-[18vw] font-serif font-normal text-white leading-[0.80] tracking-[-0.035em] select-none"
                style={{ fontFamily: '"Bodoni Moda", "Playfair Display", Georgia, serif' }}
              >
                AgenciGrow
              </span>
            </motion.div>

            {/* Subtitle statement */}
            <p className="mt-8 sm:mt-12 lg:mt-16 text-sm sm:text-base lg:text-lg text-neutral-300 font-sans font-light max-w-2xl leading-relaxed">
              We design and engineer compounding revenue systems: high-converting web applications, precision Meta & Google ad funnels, and automated WhatsApp CRM pipelines.
            </p>
          </motion.div>

          {/* Bottom Action Bar */}
          <div className="relative z-20 w-full">
            <div className="w-full border-b border-white/20 mb-5 sm:mb-6" />

            <div className="flex items-center justify-end text-white">
              <button
                onClick={openBookingModal}
                className="inline-flex items-center justify-between gap-3 px-5 py-2.5 rounded-full bg-white text-black hover:bg-neutral-200 text-xs font-mono uppercase tracking-wider transition-all duration-200 cursor-pointer min-h-[42px] shadow-lg font-medium"
              >
                <span>Book Consultation</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </motion.div>
      </div>

      {/* Expanded Swiss Navigation Modal matching reference design */}
      <SwissMenuModal
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
      />
    </section>
  );
};

export default Hero;
