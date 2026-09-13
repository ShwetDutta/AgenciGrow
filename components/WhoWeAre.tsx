import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const WhoWeAre: React.FC = () => {
  const trackRef = useRef<HTMLDivElement>(null);

  /* ==========================================================================
     SCROLL MATH (Hero Shrink & Reveal Effect):
     - target: trackRef (height: 250vh)
     - offset: ['start start', 'end end']
     - start start = 0px scroll (Who We Are enters docked fullscreen)
     - 0 -> 0.48 = stays full scale (1.0) while user views Who We Are
     - 0.48 -> 1.0 = scales down smoothly to 0.72 as What We Believe ascends
     ========================================================================== */
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start start', 'end end'],
  });

  // Scale down from 1.0 to 0.72 as What We Believe section ascends
  const scale = useTransform(scrollYProgress, [0, 0.48, 1], [1, 1, 0.72]);

  // Corner radius transforms from 0px (edge-to-edge) up to 40px
  const borderRadius = useTransform(scrollYProgress, [0, 0.48, 0.85], ['0px', '0px', '40px']);

  // Elevation shadow as it shrinks into a floating card
  const boxShadow = useTransform(
    scrollYProgress,
    [0, 0.48, 0.85],
    [
      '0px 0px 0px rgba(0,0,0,0)',
      '0px 0px 0px rgba(0,0,0,0)',
      '0px 35px 110px -10px rgba(0,0,0,0.95), 0px 0px 0px 1px rgba(255,255,255,0.18)',
    ]
  );

  // Subtle dimming overlay
  const dimOpacity = useTransform(scrollYProgress, [0.48, 0.95], [0, 0.35]);

  // Horizontal motion for the oversized display headline as user scrolls
  const whoTitleX = useTransform(scrollYProgress, [0, 1], ['40vw', '-40vw']);

  return (
    <section
      ref={trackRef}
      id="about"
      className="relative z-40 w-full h-[250vh] bg-[#07080a] select-none -mt-[100vh]"
    >
      {/* Pinned Sticky Viewport Window */}
      <div className="sticky top-0 w-full h-screen h-[100dvh] overflow-hidden flex items-center justify-center p-0 z-0 bg-[#07080a]">
        {/* Subtle Ambient Spatial Depth Grid (visible when card shrinks away from edges) */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_38%,_rgba(255,255,255,0.08)_0%,_transparent_65%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff0d_1px,transparent_1px)] [background-size:32px_32px] opacity-50 pointer-events-none" />

        {/* The Scaling Who We Are Canvas */}
        <motion.div
          style={{
            scale,
            borderRadius,
            boxShadow,
            transformOrigin: 'center 42%',
          }}
          className="relative w-full h-full overflow-hidden flex flex-col justify-between px-4 xs:px-6 sm:px-10 lg:px-14 pt-12 sm:pt-6 lg:pt-8 pb-3 sm:pb-6 will-change-transform bg-[#E5E3DD] text-[#111111]"
        >
          {/* Scroll-Driven Dimming Overlay */}
          <motion.div
            style={{ opacity: dimOpacity }}
            className="absolute inset-0 bg-black pointer-events-none z-20"
          />

          <div className="w-full max-w-[1440px] mx-auto flex flex-col justify-between h-full relative z-10 overflow-y-auto sm:overflow-visible scrollbar-none pr-0.5 sm:pr-0">
            {/* Top divider & category row */}
            <div className="w-full">
              <div className="w-full border-t-2 border-black" />
              <div className="w-full flex items-center justify-between py-1.5 sm:py-2.5 text-[10px] sm:text-xs font-mono tracking-[0.14em] uppercase text-neutral-800">
                <span className="font-medium">
                  AGENCIGROW®
                </span>
                <span className="text-neutral-600 hidden sm:inline-block">
                  GROWTH SYSTEMS AGENCY
                </span>
              </div>
              <div className="w-full border-b-2 border-black" />
            </div>

            {/* Dramatically Oversized Bold Display Headline: "Who We Are" */}
            <div className="w-full overflow-hidden py-1 sm:py-2 flex justify-center pointer-events-none select-none my-auto">
              <motion.div
                style={{ x: whoTitleX }}
                className="whitespace-nowrap will-change-transform flex justify-center"
              >
                <h2 className="text-[17vw] sm:text-[19vw] md:text-[20vw] font-bold tracking-[-0.04em] leading-[0.82] text-black font-grotesk inline-block">
                  Who We Are
                </h2>
              </motion.div>
            </div>

            <div className="w-full border-b-2 border-black mb-2 sm:mb-4" />

            {/* Two-Column Open Editorial Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 lg:gap-12 pt-1 pb-2">
              {/* Left Column: Large Serif Statement */}
              <div className="lg:col-span-6">
                <h3 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-[2.4vw] font-serif font-normal tracking-[-0.03em] leading-[1.12] text-black">
                  We build brands that deserve to be remembered.
                </h3>
              </div>

              {/* Right Column: Supporting Story Copy */}
              <div className="lg:col-span-6 space-y-2 sm:space-y-4">
                <p className="text-sm xs:text-base sm:text-lg md:text-[1.15rem] lg:text-[1.25rem] font-grotesk font-normal text-black leading-[1.35] tracking-[-0.015em]">
                  Traditional agencies pitch with senior leadership, then quietly delegate your campaigns to inexperienced interns. We rejected that model completely.
                </p>
                <p className="text-xs sm:text-sm md:text-[0.9375rem] font-grotesk font-normal text-neutral-700 leading-[1.55] tracking-[-0.01em]">
                  At AgenciGrow, every growth vector—from algorithmic Meta and Google ad buying to custom-engineered web platforms and automated WhatsApp CRM pipelines—is personally architected by the founder. You receive institutional strategic clarity with zero communication friction.
                </p>
              </div>
            </div>

            {/* Bottom Border and Swiss Metadata Row */}
            <div className="w-full pt-1 pb-1 sm:pb-0">
              <div className="w-full border-b-2 border-black" />
              <div className="w-full pt-2 sm:pt-2.5 flex items-center justify-between text-[9px] sm:text-[11px] font-mono tracking-[0.14em] uppercase text-neutral-600">
                <span className="text-neutral-700 font-medium">Zurich // Global</span>
                <span className="text-neutral-500">Scroll to reveal What We Believe ↓</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhoWeAre;
