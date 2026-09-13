import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Manifesto: React.FC = () => {
  const trackRef = useRef<HTMLDivElement>(null);

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
      <div className="sticky top-0 w-full h-screen h-[100dvh] overflow-hidden flex items-center justify-center p-0 z-0 bg-[#07080a]">
        
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
          className="relative w-full h-full overflow-hidden flex flex-col justify-between p-4 xs:p-6 sm:p-10 lg:p-14 will-change-transform bg-[#0A0A0A] text-[#EDEDED]"
        >
          {/* Scroll-Driven Dimming Overlay */}
          <motion.div
            style={{ opacity: dimOpacity }}
            className="absolute inset-0 bg-black pointer-events-none z-10"
          />

          {/* Top spacer for persistent fixed navbar */}
          <div className="relative z-20 w-full pt-12 sm:pt-14" />

          {/* Center Monumental Headline with Scroll Drift & Subtle Fade */}
          <motion.div
            style={{
              opacity: contentOpacity,
              y: contentTranslateY,
            }}
            className="relative z-20 my-auto py-4 sm:py-8 lg:py-10 w-full max-w-[1440px] mx-auto overflow-y-auto sm:overflow-visible max-h-[68vh] sm:max-h-none scrollbar-none"
          >
            <div className="max-w-6xl pr-1 sm:pr-0">
              <h2 className="text-[1.65rem] xs:text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-sans font-normal text-white leading-[1.12] sm:leading-[1.08] tracking-tight">
                Welcome to AgenciGrow® Where brands are born and taken to new heights through creative growth systems. It’s a fight against mediocrity and wasted ad spend. We create compounding value for you, your customers, and beyond.
              </h2>
            </div>
          </motion.div>

          {/* Bottom Swiss Editorial Metadata Bar */}
          <div className="relative z-20 w-full max-w-[1440px] mx-auto pb-1 sm:pb-0">
            <div className="w-full border-b border-white/10 mb-3 sm:mb-5" />
            <div className="flex flex-wrap items-center justify-between gap-2 text-[10px] sm:text-xs font-sans text-neutral-400">
              <span className="font-mono text-neutral-500 uppercase tracking-wider">[01 / Manifesto]</span>
              <span className="hidden md:inline font-mono text-neutral-500 uppercase tracking-wider">Creative Growth Architecture</span>
              <span className="font-mono text-neutral-400 uppercase tracking-wider">Scroll To Explore Services ↓</span>
            </div>
          </div>

        </motion.div>
      </div>
    </section>
  );
};

export default Manifesto;
