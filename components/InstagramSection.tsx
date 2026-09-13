import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

export const InstagramSection: React.FC = () => {
  const instagramUrl = 'https://www.instagram.com/agencigrow?igsh=Mzh2cTVvejh1Y25x';

  return (
    <section
      id="instagram"
      aria-label="Instagram Presence"
      className="relative w-full bg-[#0A0A0A] text-[#EDEDED] p-4 xs:p-6 sm:p-10 lg:p-14 select-none overflow-hidden"
    >
      <div className="w-full max-w-[1440px] mx-auto flex flex-col justify-between">
        
        {/* Top Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center pb-4 sm:pb-6 text-xs font-sans text-neutral-400 border-b border-white/10"
        >
          <div className="flex items-center gap-2">
            <span className="font-medium text-white tracking-tight">AgenciGrow®</span>
            <span className="text-neutral-600">/</span>
            <span>Social Presence</span>
          </div>
        </motion.div>

        {/* Massive Headline & Image Grid — Matched directly to "Drop us a line" section */}
        <div className="my-auto py-6 sm:py-12 lg:py-16 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left: Massive Swiss Headline, Supporting Copy, and CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col justify-center"
          >
            <h2 className="text-3xl xs:text-4xl sm:text-6xl md:text-7xl lg:text-[4.5rem] xl:text-[5.4rem] 2xl:text-[6.2rem] font-sans font-normal text-white leading-[0.96] tracking-tight">
              follow us on<br />
              instagram
            </h2>

            <p className="mt-4 sm:mt-8 text-neutral-400 font-sans text-sm sm:text-base lg:text-lg font-light leading-relaxed max-w-lg">
              More of the work, ideas and systems behind AgenciGrow.
            </p>

            <div className="mt-6 sm:mt-12 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-6 py-3.5 rounded-full bg-white text-black hover:bg-neutral-200 text-xs sm:text-sm font-sans font-medium uppercase tracking-wider transition-all active:scale-95 cursor-pointer min-h-[44px]"
              >
                <span>FOLLOW ON INSTAGRAM</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>

              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full border border-white/25 text-white hover:bg-white/10 text-xs sm:text-sm font-sans tracking-wider transition-all active:scale-95 min-h-[44px]"
              >
                <span className="font-mono text-xs text-neutral-400">@agencigrow</span>
              </a>
            </div>
          </motion.div>

          {/* Right: Instagram Page Hero Visual Artwork */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex items-center justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-[520px] rounded-2xl overflow-hidden border border-white/15 bg-neutral-900 shadow-2xl group">
              <img
                src="/Photos/instagram-page.png"
                alt="AgenciGrow on Instagram"
                className="w-full h-auto object-cover block group-hover:scale-[1.02] transition-transform duration-700 ease-out"
                referrerPolicy="no-referrer"
              />
            </div>
          </motion.div>

        </div>

      </div>

      {/* Deliberate Chapter Divider into Final CTA ("Drop us a line if you want to collab.") */}
      <div className="w-full max-w-[1440px] mx-auto border-b border-white/10" />
    </section>
  );
};
export default InstagramSection;
