import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { openBookingModal } from './CalendlyModal';
import SwissMenuModal from './SwissMenuModal';

const Manifesto: React.FC = () => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  /* ==========================================================================
     SCROLL MATH (Identical to Hero):
     - target: trackRef (height: 200vh)
     - offset: ['start start', 'end end']
     - start start = 0px scroll (manifesto enters docked fullscreen at top)
     - end end = 100vh scroll (manifesto completes scale-down as next section ascends)
     ========================================================================== */
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start start', 'end end'],
  });

  // Visibly scale down from 1.0 (fullscreen edge-to-edge) down to 0.70 as next section ascends
  const scale = useTransform(scrollYProgress, [0, 0.6, 1], [1, 0.78, 0.70]);

  // Corner radius transforms quickly from 0px (edge-to-edge) up to 40px
  const borderRadius = useTransform(scrollYProgress, [0, 0.35], ['0px', '40px']);

  // Subtle dimming overlay from 0 to 0.45 to push card back in 3D space
  const dimOpacity = useTransform(scrollYProgress, [0, 0.8], [0, 0.45]);

  // Content drift and opacity maintain legibility while adding spatial depth
  const contentOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.7]);
  const contentTranslateY = useTransform(scrollYProgress, [0, 1], [0, -40]);

  // Crisp perimeter illumination & deep elevation shadow as it shrinks into a card
  const boxShadow = useTransform(
    scrollYProgress,
    [0, 0.35],
    [
      '0px 0px 0px rgba(0,0,0,0)',
      '0px 30px 100px -10px rgba(0,0,0,0.95), 0px 0px 0px 1px rgba(255,255,255,0.18)'
    ]
  );

  return (
    <section
      ref={trackRef}
      id="manifesto"
      className="relative z-20 w-full h-[200vh] bg-[#07080a] select-none -mt-[100vh]"
    >
      {/* Pinned Sticky Viewport Window */}
      <div className="sticky top-0 w-full h-screen overflow-hidden flex items-center justify-center p-0 z-0 bg-[#07080a]">
        
        {/* Subtle Ambient Spatial Depth Grid (visible when manifesto card shrinks away from edges) */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_38%,_rgba(255,255,255,0.08)_0%,_transparent_65%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff0d_1px,transparent_1px)] [background-size:32px_32px] opacity-50 pointer-events-none" />

        {/* The Scaling Manifesto Canvas */}
        <motion.div
          style={{
            scale,
            borderRadius,
            boxShadow,
            transformOrigin: 'center 38%',
          }}
          className="relative w-full h-full overflow-hidden flex flex-col justify-between p-5 sm:p-10 lg:p-14 will-change-transform bg-[#0A0A0A] text-[#EDEDED]"
        >
          {/* Scroll-Driven Dimming Overlay */}
          <motion.div
            style={{ opacity: dimOpacity }}
            className="absolute inset-0 bg-black pointer-events-none z-10"
          />

          {/* Top Swiss Control Bar (Integrated Navbar) */}
          <div className="relative z-20 w-full max-w-[1440px] mx-auto">
            <div className="flex items-center justify-between pb-3 sm:pb-3.5 border-b border-white/10">
              
              {/* Left Brand Wordmark */}
              <div className="flex items-center gap-2">
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="text-xs sm:text-sm font-sans tracking-tight text-white hover:text-neutral-300 transition-colors font-medium"
                >
                  <span>AgenciGrow®</span>
                </a>
              </div>

              {/* Center Agency Type */}
              <div className="text-xs font-sans text-neutral-400 tracking-tight">
                Boutique Agency
              </div>

              {/* Right Menu & Booking Actions */}
              <div className="flex items-center gap-3 sm:gap-5">
                <button
                  onClick={openBookingModal}
                  className="hidden md:inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-neutral-300 hover:text-white transition-colors cursor-pointer"
                >
                  <span>Book Call</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => setIsMenuOpen(true)}
                  className="text-xs sm:text-sm font-sans tracking-tight text-white hover:text-neutral-300 transition-colors cursor-pointer min-h-[36px] px-2 flex items-center"
                  aria-label="Open Navigation Menu"
                >
                  Menu
                </button>
              </div>

            </div>
          </div>

          {/* Center Monumental Headline with Scroll Drift & Subtle Fade */}
          <motion.div
            style={{
              opacity: contentOpacity,
              y: contentTranslateY,
            }}
            className="relative z-20 my-auto py-6 sm:py-10 w-full max-w-[1440px] mx-auto"
          >
            <div className="max-w-6xl">
              <h2 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-sans font-normal text-white leading-[1.08] tracking-tight">
                Welcome to AgenciGrow® Where brands are born and taken to new heights through creative growth systems. It’s a fight against mediocrity and wasted ad spend. We create compounding value for you, your customers, and beyond.
              </h2>
            </div>
          </motion.div>

          {/* Bottom Swiss Editorial Metadata Bar */}
          <div className="relative z-20 w-full max-w-[1440px] mx-auto">
            <div className="w-full border-b border-white/10 mb-4 sm:mb-5" />
            <div className="flex items-center justify-between text-xs font-sans text-neutral-400">
              <span className="font-mono text-neutral-500 uppercase tracking-wider">[01 / Manifesto]</span>
              <span className="hidden sm:inline font-mono text-neutral-500 uppercase tracking-wider">Creative Growth Architecture</span>
              <span className="font-mono text-neutral-400 uppercase tracking-wider">Scroll To Explore Services ↓</span>
            </div>
          </div>

        </motion.div>
      </div>

      {/* Expanded Swiss Navigation Modal */}
      <SwissMenuModal
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
      />
    </section>
  );
};

export default Manifesto;
