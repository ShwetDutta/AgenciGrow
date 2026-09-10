import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const WhatWeBelieve: React.FC = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: headerRef,
    offset: ['start end', 'end start'],
  });

  // Slides smoothly across the screen as you scroll down
  const titleX = useTransform(scrollYProgress, [0, 1], ['-40vw', '40vw']);

  return (
    <section id="what-we-believe" className="relative w-full select-none">
      <div className="w-full max-w-[1440px] mx-auto flex flex-col">
        {/* Top thick, dark rule */}
        <div className="w-full border-t-2 border-black" />

        {/* Section Header System: Exact structural match to Who We Are */}
        <div className="w-full flex items-center justify-between py-2 sm:py-2.5 text-[11px] sm:text-xs font-mono tracking-[0.14em] uppercase text-neutral-800">
          <span className="font-medium">
            AGENCIGROW®
          </span>
          <span className="text-neutral-600">
            [ 02 / WHAT WE BELIEVE ]
          </span>
          <span className="text-neutral-600 hidden sm:inline-block">
            PRINCIPLES THAT DRIVE US
          </span>
        </div>

        {/* Horizontal rule directly above oversized headline */}
        <div className="w-full border-b-2 border-black" />

        {/* Dramatically Oversized Bold Display Headline: "What We Believe" */}
        <div
          ref={headerRef}
          className="w-screen relative left-1/2 -translate-x-1/2 overflow-hidden py-1 sm:py-2 flex justify-center pointer-events-none select-none"
        >
          <motion.div
            style={{ x: titleX }}
            className="whitespace-nowrap will-change-transform flex justify-center"
          >
            <h2 className="text-[17vw] sm:text-[19vw] md:text-[20vw] font-bold tracking-[-0.04em] leading-[0.82] text-black font-grotesk inline-block">
              What We Believe
            </h2>
          </motion.div>
        </div>

        {/* Bottom thick rule under the massive header */}
        <div className="w-full border-b-2 border-black mb-8 sm:mb-12 lg:mb-14" />

        {/* Two-Column Open Editorial Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 pt-2 pb-16 sm:pb-24">
          {/* Left Column: Large Serif Statement */}
          <div className="lg:col-span-6">
            <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-serif font-normal tracking-[-0.03em] leading-[1.12] text-black">
              Good design gets attention.
              <br className="hidden sm:inline" />
              Great design creates recognition.
            </h3>
          </div>

          {/* Right Column: Supporting Copy & 3 Core Principles */}
          <div className="lg:col-span-6 space-y-8 sm:space-y-10">
            <div className="space-y-4">
              <p className="text-base sm:text-lg md:text-[1.25rem] lg:text-[1.35rem] font-grotesk font-normal text-black leading-[1.35] tracking-[-0.015em]">
                A fight against mediocrity, vanity metrics, and bloated retainers. We create enterprise value for you, your customers, and beyond.
              </p>
              <p className="text-xs sm:text-sm md:text-[0.9375rem] font-grotesk font-normal text-neutral-700 leading-[1.55] tracking-[-0.01em]">
                Most agencies obsess over empty impressions and vanity likes. We obsess over contribution margin. Every creative asset deployed and pipeline automated is engineered to widen the spread between customer acquisition cost and lifetime enterprise value.
              </p>
            </div>

            {/* Three Core Principles */}
            <div className="space-y-5 pt-6 border-t border-black/15">
              <div className="space-y-1.5">
                <div className="font-mono text-[11px] sm:text-xs text-neutral-900 uppercase tracking-[0.14em] font-medium">
                  I. CAPITAL EFFICIENCY
                </div>
                <p className="text-xs sm:text-sm md:text-[0.9375rem] font-grotesk font-normal text-neutral-700 leading-[1.5] tracking-[-0.01em]">
                  Eliminating ad waste through algorithmic testing and unit economics.
                </p>
              </div>

              <div className="space-y-1.5">
                <div className="font-mono text-[11px] sm:text-xs text-neutral-900 uppercase tracking-[0.14em] font-medium">
                  II. TOPIC AUTHORITY
                </div>
                <p className="text-xs sm:text-sm md:text-[0.9375rem] font-grotesk font-normal text-neutral-700 leading-[1.5] tracking-[-0.01em]">
                  Visual prestige and editorial positioning that commands premium pricing.
                </p>
              </div>

              <div className="space-y-1.5">
                <div className="font-mono text-[11px] sm:text-xs text-neutral-900 uppercase tracking-[0.14em] font-medium">
                  III. ZERO DROP-OFF
                </div>
                <p className="text-xs sm:text-sm md:text-[0.9375rem] font-grotesk font-normal text-neutral-700 leading-[1.5] tracking-[-0.01em]">
                  Immediate 24/7 automated conversion flows across WhatsApp & CRM.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatWeBelieve;
