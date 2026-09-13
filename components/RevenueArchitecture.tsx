import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { openBookingModal } from './CalendlyModal';

const RevenueArchitecture: React.FC = () => {
  const trackRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [mediaError, setMediaError] = useState(false);
  const [scrollDelta, setScrollDelta] = useState(0);

  useEffect(() => {
    const calcOverflow = () => {
      if (contentRef.current) {
        const contentHeight = contentRef.current.offsetHeight;
        const windowHeight = window.innerHeight;
        // Calculate difference if card content exceeds viewport height on compact screens
        const overflow = Math.max(0, contentHeight - windowHeight + 36);
        setScrollDelta(overflow);
      }
    };
    calcOverflow();
    window.addEventListener('resize', calcOverflow);
    return () => window.removeEventListener('resize', calcOverflow);
  }, []);

  /* ==========================================================================
     SCROLL MATH (Hero Shrink & Reveal Effect):
     - target: trackRef (height: 320vh)
     - offset: ['start start', 'end end']
     - start start = 0px scroll (Revenue Architecture enters docked fullscreen)
     - 0 -> 0.45 = smoothly pans vertically if content exceeds viewport so the full image
                   and all deliverables are 100% revealed at identical full size
     - 0.45 -> 0.70 = holds full scale (1.0) with ample viewing time
     - 0.70 -> 1.0 = scales down smoothly to 0.72 as About section ascends
     ========================================================================== */
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start start', 'end end'],
  });

  // Vertical scroll panning to ensure the entire image is 100% revealed before shrinking
  const contentY = useTransform(
    scrollYProgress,
    [0, 0.45, 0.70, 1],
    [0, -scrollDelta, -scrollDelta, -scrollDelta]
  );

  // Scale down from 1.0 to 0.72 only after full image is revealed and inspected
  const scale = useTransform(scrollYProgress, [0, 0.70, 1], [1, 1, 0.72]);

  // Corner radius transforms from 0px (edge-to-edge) up to 40px
  const borderRadius = useTransform(scrollYProgress, [0, 0.70, 0.94], ['0px', '0px', '40px']);

  // Elevation shadow as it shrinks into a floating card
  const boxShadow = useTransform(
    scrollYProgress,
    [0, 0.70, 0.94],
    [
      '0px 0px 0px rgba(0,0,0,0)',
      '0px 0px 0px rgba(0,0,0,0)',
      '0px 35px 110px -10px rgba(0,0,0,0.95), 0px 0px 0px 1px rgba(255,255,255,0.18)',
    ]
  );

  // Subtle dimming overlay
  const dimOpacity = useTransform(scrollYProgress, [0.70, 0.95], [0, 0.35]);

  // Scroll-driven horizontal slide from Right to Left for Service 06
  // Controlled range (-12% to 12%) so text stays comfortably framed on compact viewports
  const headingX = useTransform(
    scrollYProgress,
    [0, 0.35, 0.70],
    ['12%', '0%', '-12%']
  );

  const service = {
    id: 'growth-systems',
    code: '06',
    category: 'Commercial Strategy',
    discipline: 'Full-Stack Growth Engineering',
    title: 'Revenue Architecture',
    tagline:
      'The compounding revenue engine: paid advertising, high-converting digital flagships, automated CRM pipelines, and retention mechanisms unified.',
    deliverables: [
      'Unit Economics & LTV Tuning',
      'Attribution Stack',
      'Compounding Growth Roadmap',
      'Dedicated Growth Pod',
    ],
    mediaType: 'image' as const,
    mediaSrc: '/Photos/growth strategy.png',
    fallbackSrc: '/Photos/growth strategy.png',
  };

  const safeSrc = encodeURI(mediaError ? service.fallbackSrc : service.mediaSrc);

  return (
    <section
      ref={trackRef}
      id="revenue-architecture"
      className="relative z-30 w-full h-[320vh] bg-[#07080a] select-none"
    >
      {/* Pinned Sticky Viewport Window */}
      <div className="sticky top-0 w-full h-screen h-[100dvh] overflow-hidden flex items-center justify-center p-0 z-0 bg-[#07080a]">
        {/* Subtle Ambient Spatial Depth Grid (visible when card shrinks away from edges) */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_38%,_rgba(255,255,255,0.08)_0%,_transparent_65%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff0d_1px,transparent_1px)] [background-size:32px_32px] opacity-50 pointer-events-none" />

        {/* The Scaling Revenue Architecture Canvas */}
        <motion.div
          style={{
            scale,
            borderRadius,
            boxShadow,
            transformOrigin: 'center 42%',
          }}
          className="relative w-full h-full overflow-hidden flex flex-col justify-between px-4 xs:px-6 sm:px-10 lg:px-14 pt-12 sm:pt-6 lg:pt-8 pb-3 sm:pb-5 lg:pb-6 will-change-transform bg-[#E5E3DD] text-[#111111]"
        >
          {/* Scroll-Driven Dimming Overlay */}
          <motion.div
            style={{ opacity: dimOpacity }}
            className="absolute inset-0 bg-black pointer-events-none z-20"
          />

          <motion.div
            ref={contentRef}
            style={{ y: contentY }}
            className="w-full max-w-[1440px] mx-auto flex flex-col justify-between min-h-full relative z-10 py-1 sm:py-2 will-change-transform"
          >
            {/* Top divider */}
            <div className="w-full border-t-2 border-black" />

            {/* Split Layout: Picture on Left, Content on Right (matching Services 01-05 exactly) */}
            <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 lg:gap-16 items-center flex-1 my-3 sm:my-6">
              
              {/* LEFT: Full Image Container (Matches Services 01-05 in size exactly) */}
              <div className="w-full lg:col-span-6 flex justify-center items-center">
                <div
                  onClick={openBookingModal}
                  className="relative w-full max-w-[560px] cursor-pointer group will-change-transform flex items-center justify-center bg-transparent"
                >
                  <img
                    src={safeSrc}
                    alt={service.title}
                    onError={() => {
                      if (!mediaError) setMediaError(true);
                    }}
                    className="w-full h-auto max-h-[460px] sm:max-h-[520px] block object-contain shadow-xl rounded-xl group-hover:scale-[1.01] transition-transform duration-500 ease-out"
                    referrerPolicy="no-referrer"
                  />

                  {/* Hover overlay button hint without full-card dark gradient */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none flex items-end justify-start p-4 sm:p-6">
                    <span className="text-white text-xs font-mono tracking-wider uppercase bg-black/85 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 shadow-xl">
                      Book Consultation ↗
                    </span>
                  </div>
                </div>
              </div>

              {/* RIGHT: Service Content */}
              <div className="w-full lg:col-span-6 flex flex-col justify-center">
                
                {/* Category Header Row */}
                <div className="flex items-center pb-2.5 sm:pb-3 border-b border-black/15">
                  <span className="text-xs sm:text-sm font-sans tracking-wider text-neutral-900 font-semibold uppercase">
                    {service.category}
                  </span>
                </div>

                {/* Discipline Tag */}
                <div className="pt-2.5 sm:pt-3 text-[11px] sm:text-xs font-mono tracking-wider text-neutral-500 uppercase">
                  {service.discipline}
                </div>

                {/* Primary Service Title with dynamic alternating slide */}
                <div className="w-full overflow-hidden my-1.5 sm:my-3 py-1">
                  <motion.div
                    style={{ x: headingX }}
                    className="will-change-transform inline-block max-w-full"
                  >
                    <h3 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-[3.1rem] font-bold tracking-[-0.03em] leading-[1.08] text-black font-sans mb-1 sm:mb-2">
                      {service.title}
                    </h3>
                  </motion.div>
                </div>

                {/* Tagline / Description */}
                <p className="text-sm xs:text-base sm:text-lg text-neutral-700 font-sans leading-relaxed mb-3 sm:mb-5 max-w-xl">
                  {service.tagline}
                </p>

                {/* Deliverables / Capabilities List */}
                <div className="w-full pt-3 sm:pt-4 border-t border-black/15 mb-3 sm:mb-5">
                  <div className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-neutral-500 mb-2 sm:mb-3">
                    Deliverables & Capabilities
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-2.5">
                    {service.deliverables.map((item, i) => (
                      <div
                        key={i}
                        className="flex items-center space-x-2 text-xs sm:text-sm text-neutral-800 font-sans"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-black/70 flex-shrink-0" />
                        <span className="font-medium">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action CTA Button */}
                <div className="pt-1">
                  <button
                    onClick={openBookingModal}
                    className="w-full sm:w-auto inline-flex items-center justify-between sm:justify-start gap-4 px-5 sm:px-6 py-3 sm:py-3.5 bg-black text-white rounded-full text-xs sm:text-sm font-mono uppercase tracking-wider font-semibold hover:bg-neutral-800 transition-all active:scale-95 shadow-sm min-h-[44px] cursor-pointer group/btn"
                  >
                    <span>Book Strategy Call</span>
                    <span className="group-hover/btn:translate-x-1 transition-transform">→</span>
                  </button>
                </div>

              </div>

            </div>

            {/* Bottom divider line & metadata */}
            <div className="w-full mt-3 sm:mt-5 pb-1 sm:pb-0">
              <div className="w-full border-b-2 border-black" />
              <div className="w-full pt-2 sm:pt-2.5 flex items-center justify-between text-[10px] sm:text-xs font-mono text-neutral-600">
                <span className="uppercase tracking-widest text-neutral-700 font-medium">Zurich // Global</span>
                <span className="uppercase tracking-widest text-neutral-500">AgenciGrow® Systems Architecture</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default RevenueArchitecture;
