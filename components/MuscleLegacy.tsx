import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const MuscleLegacy: React.FC = () => {
  const trackRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [scrollDelta, setScrollDelta] = useState(0);

  useEffect(() => {
    const calcOverflow = () => {
      if (contentRef.current) {
        const contentHeight = contentRef.current.offsetHeight;
        const windowHeight = window.innerHeight;
        const overflow = Math.max(0, contentHeight - windowHeight + 48);
        setScrollDelta(overflow);
      }
    };
    calcOverflow();
    window.addEventListener('resize', calcOverflow);
    return () => window.removeEventListener('resize', calcOverflow);
  }, []);

  /* ==========================================================================
     SCROLL MATH (Hero Shrink Effect for FAQ):
     - target: trackRef (height: 280vh)
     - offset: ['start start', 'end end']
     - start start = 0px scroll (Client Work enters docked fullscreen at scale 1.0)
     - 0 -> 0.52 = smoothly pans vertically to reveal laptop showcase and posters
     - 0.52 -> 0.68 = holds full scale (1.0) with ample reading time
     - 0.68 -> 1.0 = scales down smoothly to 0.72 as FAQ section ascends over it
     ========================================================================== */
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start start', 'end end'],
  });

  // Vertical scroll panning so laptop showcase and posters are 100% visible
  const contentY = useTransform(
    scrollYProgress,
    [0, 0.52, 0.68, 1],
    [0, -scrollDelta, -scrollDelta, -scrollDelta]
  );

  // Visibly scale down from 1.0 to 0.72 as FAQ ascends
  const scale = useTransform(scrollYProgress, [0, 0.68, 1], [1, 1, 0.72]);

  // Corner radius transforms during exit
  const borderRadius = useTransform(
    scrollYProgress,
    [0, 0.68, 0.90],
    ['0px', '0px', '40px']
  );

  // Elevation shadow during exit
  const boxShadow = useTransform(
    scrollYProgress,
    [0, 0.68, 0.90],
    [
      '0px 0px 0px rgba(0,0,0,0)',
      '0px 0px 0px rgba(0,0,0,0)',
      '0px 35px 110px -10px rgba(0,0,0,0.95), 0px 0px 0px 1px rgba(255,255,255,0.18)',
    ]
  );

  // Subtle dimming overlay as it shrinks for FAQ
  const dimOpacity = useTransform(scrollYProgress, [0.68, 0.95], [0, 0.35]);

  // Centered at 0vw so "Client work" is 100% visible immediately, then gently slides as user explores
  const headlineX = useTransform(scrollYProgress, [0, 0.52], ['0vw', '25vw']);

  return (
    <section
      ref={trackRef}
      id="client-work"
      className="relative z-60 w-full h-[280vh] bg-[#07080a] select-none"
    >
      {/* Pinned Sticky Viewport Window */}
      <div className="sticky top-0 w-full h-screen overflow-hidden flex items-start justify-center p-0 z-0 bg-transparent">
        
        {/* Subtle Ambient Spatial Depth Grid (visible when card shrinks away from edges) */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_38%,_rgba(255,255,255,0.08)_0%,_transparent_65%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff0d_1px,transparent_1px)] [background-size:32px_32px] opacity-50 pointer-events-none" />

        {/* The Scaling Client Work Canvas */}
        <motion.div
          style={{
            scale,
            borderRadius,
            boxShadow,
            transformOrigin: 'center 42%',
          }}
          className="relative w-full h-full overflow-hidden flex flex-col justify-start px-5 sm:px-10 lg:px-14 py-6 sm:py-8 lg:py-10 will-change-transform bg-[#E5E3DD] text-[#111111] pointer-events-auto border-t border-black/15"
        >
          {/* Scroll-Driven Dimming Overlay */}
          <motion.div
            style={{ opacity: dimOpacity }}
            className="absolute inset-0 bg-black pointer-events-none z-20"
          />

          <motion.div
            ref={contentRef}
            style={{ y: contentY }}
            className="w-full max-w-[1400px] mx-auto flex flex-col justify-start relative z-10 will-change-transform"
          >
            {/* ====================================================================
                1. SECTION HEADING: "Client work"
                - Large, bold display typography moving Left to Right on scroll
                - Starts centered (0vw) so heading is NEVER cut off or hidden
                ==================================================================== */}
            <div className="w-full mb-5 sm:mb-7">
              {/* Top thick rule */}
              <div className="w-full border-t-2 border-black mb-2 sm:mb-3" />

              {/* Section metadata Swiss bar */}
              <div className="w-full flex items-center justify-between py-1.5 sm:py-2 text-[11px] sm:text-xs font-mono tracking-[0.14em] uppercase text-neutral-800">
                <span className="font-medium">AGENCIGROW®</span>
                <span className="text-neutral-600">[ 04 / CLIENT WORK ]</span>
                <span className="text-neutral-600 hidden sm:inline-block">FEATURED CASE STUDY</span>
              </div>

              <div className="w-full border-b border-black/20 mb-2 sm:mb-3" />

              {/* Dramatically Oversized Display Headline: Centered and fully visible */}
              <div className="w-screen relative left-1/2 -translate-x-1/2 overflow-hidden py-1 sm:py-2 flex justify-center pointer-events-none select-none">
                <motion.div
                  style={{ x: headlineX }}
                  className="whitespace-nowrap will-change-transform flex justify-center"
                >
                  <h2 className="text-[14vw] sm:text-[15vw] md:text-[16vw] font-bold tracking-[-0.04em] leading-[0.88] text-black font-sans inline-block">
                    Client work
                  </h2>
                </motion.div>
              </div>

              {/* Bottom thick rule under sliding headline */}
              <div className="w-full border-b-2 border-black mt-2 sm:mt-3" />
            </div>

            {/* ====================================================================
                2. FEATURED PROJECT: "Muscle Legacy"
                - Smaller than "Client work" (analogous to "Google & Meta Ads" under "Services")
                - Complete authentic case study layout and assets
                ==================================================================== */}
            <div className="w-full">
              {/* Top Metadata Row: [ CLIENT WORK ] and GYM / FITNESS BRAND */}
              <div className="w-full flex items-center justify-between text-[11px] sm:text-xs font-mono uppercase tracking-[0.14em] text-neutral-500 mb-4 sm:mb-6">
                <div className="flex items-center gap-2">
                  <span>[ CLIENT WORK ]</span>
                  <img
                    src="/Photos/Muscle_legacy_logo_nobg.png"
                    alt="Muscle Legacy Logo"
                    className="h-4 sm:h-5 w-auto object-contain opacity-75 inline-block"
                  />
                </div>
                <span>GYM / FITNESS BRAND</span>
              </div>

              {/* Headline & Description Row */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-10 items-start mb-4 sm:mb-6">
                {/* Title on Left: "Muscle Legacy" */}
                <div className="lg:col-span-6">
                  <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.85rem] font-serif text-neutral-900 tracking-tight font-normal leading-[1.05]">
                    Muscle Legacy
                  </h3>
                </div>

                {/* Description on Right */}
                <div className="lg:col-span-6 flex items-center">
                  <p className="text-neutral-700 font-sans text-xs sm:text-sm md:text-base leading-relaxed max-w-xl">
                    A gym built on discipline, community and progress. We designed and developed their website and manage their social media to strengthen their brand, grow their audience and attract the right members.
                  </p>
                </div>
              </div>

              {/* Deliverables & Action Row */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
                {/* Deliverables Tags */}
                <div className="text-[10px] sm:text-[11px] md:text-xs font-mono uppercase tracking-[0.12em] text-neutral-600 flex flex-wrap items-center gap-x-2.5 sm:gap-x-3 gap-y-1">
                  <span>WEBSITE DESIGN</span>
                  <span className="text-neutral-400">/</span>
                  <span>INSTAGRAM MANAGEMENT</span>
                  <span className="text-neutral-400">/</span>
                  <span>CONTENT STRATEGY</span>
                  <span className="text-neutral-400">/</span>
                  <span>BRAND POSITIONING</span>
                </div>

                {/* View Website Button */}
                <div>
                  <a
                    href="https://musclelegacy.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-black text-white px-4 py-2 text-xs font-mono uppercase tracking-[0.12em] hover:bg-neutral-800 transition-colors shadow-sm whitespace-nowrap"
                  >
                    <span>VIEW WEBSITE</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Divider Line */}
              <div className="w-full border-t border-black/20 my-6 sm:my-8" />

              {/* Showcase Row: Laptop (musclelegacy_1) + 3 Vertical Posters (musclelegacy_2, 3, 4) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-5 items-center mb-6 sm:mb-8">
                {/* Laptop Mockup (musclelegacy_1) */}
                <div className="lg:col-span-5 flex items-center justify-center">
                  <div className="w-full relative overflow-hidden group">
                    <img
                      src="/Photos/musclelegacy_1.webp"
                      alt="Muscle Legacy Website Laptop Showcase"
                      className="w-full h-auto object-contain transition-transform duration-500 ease-out group-hover:scale-[1.01]"
                      loading="eager"
                    />
                  </div>
                </div>

                {/* 3 Vertical Posters (musclelegacy_2, musclelegacy_3, musclelegacy_4) */}
                <div className="lg:col-span-7 grid grid-cols-3 gap-2.5 sm:gap-3.5 items-center">
                  {/* Poster 01 */}
                  <div className="w-full aspect-[3/4] sm:aspect-[4/5] overflow-hidden bg-black/5 group relative shadow-sm border border-black/10">
                    <img
                      src="/Photos/musclelegacy_2.webp"
                      alt="Muscle Legacy Discipline Today"
                      className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                      loading="lazy"
                    />
                  </div>

                  {/* Poster 02 */}
                  <div className="w-full aspect-[3/4] sm:aspect-[4/5] overflow-hidden bg-black/5 group relative shadow-sm border border-black/10">
                    <img
                      src="/Photos/musclelegacy_3.webp"
                      alt="Muscle Legacy Progress Lives Here"
                      className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                      loading="lazy"
                    />
                  </div>

                  {/* Poster 03 */}
                  <div className="w-full aspect-[3/4] sm:aspect-[4/5] overflow-hidden bg-black/5 group relative shadow-sm border border-black/10">
                    <img
                      src="/Photos/musclelegacy_4.webp"
                      alt="Muscle Legacy A Stronger You"
                      className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>

              {/* Bottom Editorial Statements Row */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-10 items-start pt-1 pb-4">
                <div className="lg:col-span-5">
                  <h4 className="font-serif text-xl sm:text-2xl md:text-3xl text-neutral-900 leading-[1.18] tracking-tight font-normal">
                    A digital presence<br />
                    as strong as their community.
                  </h4>
                </div>

                <div className="lg:col-span-7 flex items-center">
                  <p className="text-neutral-700 font-sans text-xs sm:text-sm leading-relaxed max-w-xl">
                    From a performance-focused website to a consistent and engaging social presence, we helped Muscle Legacy build a brand that reflects their values—discipline, progress and community.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default MuscleLegacy;
