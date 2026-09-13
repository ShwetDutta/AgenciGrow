import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const MuscleLegacy: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // Dynamic horizontal movement for "Client work" headline as user scrolls naturally
  const headlineX = useTransform(scrollYProgress, [0, 1], ['-5vw', '15vw']);

  return (
    <section
      ref={sectionRef}
      id="client-work"
      className="relative z-60 w-full bg-[#E5E3DD] text-[#111111] border-t border-black/15 px-5 sm:px-10 lg:px-14 py-8 sm:py-12 lg:py-16 flex flex-col items-center select-none"
    >
      <div className="w-full max-w-[1400px] mx-auto flex flex-col justify-start relative z-10">
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
            <span className="text-neutral-600 hidden sm:inline-block">FEATURED CASE STUDY</span>
          </div>

          <div className="w-full border-b border-black/20 mb-2 sm:mb-3" />

          {/* Dramatically Oversized Display Headline: Centered and fully visible */}
          <div className="w-full overflow-hidden py-1 sm:py-2 flex justify-center pointer-events-none select-none">
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
          {/* Top Metadata Row: Muscle Legacy Logo and GYM / FITNESS BRAND */}
          <div className="w-full flex items-center justify-between text-[11px] sm:text-xs font-mono uppercase tracking-[0.14em] text-neutral-500 mb-4 sm:mb-6">
            <div className="flex items-center gap-2">
              <img
                src="/Photos/Muscle_legacy_logo_nobg.png"
                alt="Muscle Legacy Logo"
                className="h-4 sm:h-5 w-auto object-contain opacity-75 inline-block"
              />
            </div>
            <span>GYM / FITNESS BRAND</span>
          </div>

          {/* Headline & Description Row */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-4 lg:gap-10 items-start mb-4 sm:mb-6">
            {/* Title on Left: "Muscle Legacy" */}
            <div className="lg:col-span-6">
              <h3 className="text-3xl xs:text-4xl sm:text-5xl lg:text-[3.85rem] font-serif text-neutral-900 tracking-tight font-normal leading-[1.05]">
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
            <div className="text-[10px] sm:text-[11px] md:text-xs font-mono uppercase tracking-[0.12em] text-neutral-600 flex flex-wrap items-center gap-x-2 sm:gap-x-3 gap-y-1">
              <span>WEBSITE DESIGN</span>
              <span className="text-neutral-400">/</span>
              <span>INSTAGRAM MANAGEMENT</span>
              <span className="text-neutral-400">/</span>
              <span>CONTENT STRATEGY</span>
              <span className="text-neutral-400">/</span>
              <span>BRAND POSITIONING</span>
            </div>

            {/* View Website Button */}
            <div className="pt-1 sm:pt-0">
              <a
                href="https://musclelegacy.in"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-black text-white px-4 py-2.5 text-xs font-mono uppercase tracking-[0.12em] hover:bg-neutral-800 transition-colors shadow-sm whitespace-nowrap min-h-[44px]"
              >
                <span>VIEW WEBSITE</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Divider Line */}
          <div className="w-full border-t border-black/20 my-5 sm:my-8" />

          {/* Showcase Row: Laptop (musclelegacy_1) + 3 Vertical Posters (musclelegacy_2, 3, 4) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5 items-center mb-6 sm:mb-8">
            {/* Laptop Mockup (musclelegacy_1) */}
            <div className="lg:col-span-5 flex items-center justify-center">
              <div className="w-full relative overflow-hidden group">
                <img
                  src="/Photos/musclelegacy_1.webp"
                  alt="Muscle Legacy Website Laptop Showcase"
                  className="w-full h-auto max-h-[380px] sm:max-h-[480px] object-contain transition-transform duration-500 ease-out group-hover:scale-[1.01]"
                  loading="eager"
                />
              </div>
            </div>

            {/* 3 Vertical Posters (musclelegacy_2, musclelegacy_3, musclelegacy_4) */}
            <div className="lg:col-span-7 grid grid-cols-3 gap-2 sm:gap-3.5 items-center">
              {/* Poster 01 */}
              <div className="w-full aspect-[3/4] sm:aspect-[4/5] overflow-hidden bg-black/5 group relative shadow-sm border border-black/10 rounded-sm">
                <img
                  src="/Photos/musclelegacy_2.webp"
                  alt="Muscle Legacy Discipline Today"
                  className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                  loading="lazy"
                />
              </div>

              {/* Poster 02 */}
              <div className="w-full aspect-[3/4] sm:aspect-[4/5] overflow-hidden bg-black/5 group relative shadow-sm border border-black/10 rounded-sm">
                <img
                  src="/Photos/musclelegacy_3.webp"
                  alt="Muscle Legacy Progress Lives Here"
                  className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                  loading="lazy"
                />
              </div>

              {/* Poster 03 */}
              <div className="w-full aspect-[3/4] sm:aspect-[4/5] overflow-hidden bg-black/5 group relative shadow-sm border border-black/10 rounded-sm">
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
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-4 lg:gap-10 items-start pt-1 pb-4">
            <div className="lg:col-span-5">
              <h4 className="font-serif text-lg xs:text-xl sm:text-2xl md:text-3xl text-neutral-900 leading-[1.18] tracking-tight font-normal">
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
      </div>
    </section>
  );
};

export default MuscleLegacy;
