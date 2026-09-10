import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { openBookingModal } from './CalendlyModal';

export interface ServiceItem {
  id: string;
  code: string;
  category: string;
  discipline: string;
  title: string;
  tagline: string;
  deliverables: string[];
  mediaType: 'image' | 'video';
  mediaSrc: string;
  posterSrc?: string;
  fallbackSrc: string;
}

const servicesList: ServiceItem[] = [
  {
    id: 'google-meta-ads',
    code: '01',
    category: 'Campaign',
    discipline: 'Paid Acquisition & Search',
    title: 'Google & Meta Ads',
    tagline:
      'High-intent search capture on Google paired with algorithmic creative testing on Meta to drive scalable, compounding ROI.',
    deliverables: [
      'Algorithmic Bidding',
      'Creative Testing Matrix',
      'Attribution Modeling',
      'Predictable ROAS',
    ],
    mediaType: 'image',
    mediaSrc: '/Photos/google ads.png',
    fallbackSrc: '/Photos/google ads.png',
  },
  {
    id: 'custom-websites',
    code: '02',
    category: 'Digital Engineering',
    discipline: 'Flagship Digital Platforms',
    title: 'Custom Websites & Apps',
    tagline:
      'Bespoke, high-performance web applications and digital flagships engineered with Swiss precision to maximize conversion rates.',
    deliverables: [
      'Swiss Editorial Typography',
      'Sub-Second Cold Load Speeds',
      'Conversion-Optimized UX',
      'Custom React Platforms',
    ],
    mediaType: 'image',
    mediaSrc: '/Photos/Website.png',
    fallbackSrc: '/Photos/Website.png',
  },
  {
    id: 'whatsapp-automation',
    code: '03',
    category: 'Pipeline Automation',
    discipline: 'CRM & Lead Conversion',
    title: 'CRM & WhatsApp Automation',
    tagline:
      'Zero lead drop-off. 24/7 automated WhatsApp triggers, CRM pipeline synchronization, and instant calendar booking qualification flows.',
    deliverables: [
      '<60s WhatsApp Triggers',
      'Qualification Bots',
      'HubSpot / CRM Bi-Directional Sync',
      'Zero Pipeline Drop-off',
    ],
    mediaType: 'image',
    mediaSrc: '/Photos/whatsapp.png',
    fallbackSrc: '/Photos/whatsapp.png',
  },
  {
    id: 'instagram-management',
    code: '04',
    category: 'Editorial & Brand',
    discipline: 'Authority & Organic Positioning',
    title: 'Content Strategy & Social',
    tagline:
      'Cinematic short-form assets, editorial visual grids, and executive thought leadership that converts passive attention into qualified inbound deals.',
    deliverables: [
      'Cinematic Short-Form Video',
      'Editorial Visual Systems',
      'Founder Authority Positioning',
      'Inbound Deal Flow',
    ],
    mediaType: 'image',
    mediaSrc: '/Photos/content.png',
    fallbackSrc: '/Photos/content.png',
  },
  {
    id: 'ai-automation',
    code: '05',
    category: 'AI Operations',
    discipline: 'Intelligent Operational Systems',
    title: 'AI Workflows & Operations',
    tagline:
      'Custom autonomous AI agents, intelligent customer routing pipelines, and automated operational workflows that save dozens of manual hours weekly.',
    deliverables: [
      'Autonomous AI Support Agents',
      'Automated Proposal Generation',
      'Internal Knowledge Base AI',
      '40+ Hours Saved / Week',
    ],
    mediaType: 'image',
    mediaSrc: '/Photos/ai workflow.png',
    fallbackSrc: '/Photos/ai workflow.png',
  },
  {
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
    mediaType: 'image',
    mediaSrc: '/Photos/growth strategy.png',
    fallbackSrc: '/Photos/growth strategy.png',
  },
];

/**
 * Individual Service Showcase Entry
 * Layout:
 * - Picture on the LEFT side of the screen (portrait image)
 * - Content of the service on the RIGHT side of the screen
 * - Primary service heading slides alternatingly:
 *   - Even services (01, 03, 05) slide from Left to Right
 *   - Odd services (02, 04) slide from Right to Left
 */
const ServiceEntry: React.FC<{
  service: ServiceItem;
  index: number;
}> = ({ service, index }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mediaError, setMediaError] = useState(false);

  // Safe URI encoding for filenames with spaces
  const currentSrc = mediaError ? service.fallbackSrc : service.mediaSrc;
  const safeSrc = encodeURI(currentSrc);

  // Scroll tracking for alternating horizontal slide
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Alternating direction:
  // Even services (01, 03, 05) slide from Left to Right
  // Odd services (02, 04) slide from Right to Left
  const isLeftToRight = index % 2 === 0;
  const headingX = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    isLeftToRight ? ['-25%', '0%', '25%'] : ['25%', '0%', '-25%']
  );

  return (
    <article
      ref={containerRef}
      id={`service-${service.id}`}
      className="w-full py-8 sm:py-12 lg:py-16"
    >
      {/* Top divider rule */}
      <div className="w-full border-t-2 border-black mb-6 sm:mb-8 lg:mb-12" />

      {/* Split Grid: Left Portrait Picture, Right Service Content */}
      <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-8 sm:gap-10 lg:gap-16 items-center">
        
        {/* LEFT: Full Image Container (Uncropped, Full Size, No Black Borders) */}
        <div className="w-full md:col-span-6 lg:col-span-6 flex justify-center items-center">
          <div
            onClick={openBookingModal}
            className="relative w-fit max-w-[560px] cursor-pointer group will-change-transform flex items-center justify-center bg-transparent"
          >
            <img
              src={safeSrc}
              alt={service.title}
              onError={() => {
                if (!mediaError) setMediaError(true);
              }}
              className="w-full max-w-[560px] h-auto block object-contain shadow-2xl group-hover:scale-[1.01] transition-transform duration-500 ease-out"
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
        <div className="w-full md:col-span-6 lg:col-span-6 flex flex-col justify-center">
          
          {/* Category & Index Header Row */}
          <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-black/15">
            <span className="text-xs sm:text-sm font-mono tracking-widest text-neutral-600 font-bold uppercase">
              [ {service.code} // 06 ]
            </span>
            <span className="text-xs sm:text-sm font-sans tracking-wider text-neutral-900 font-semibold uppercase">
              {service.category}
            </span>
          </div>

          {/* Discipline Tag */}
          <div className="pt-3 sm:pt-4 text-xs sm:text-sm font-mono tracking-wider text-neutral-500 uppercase">
            {service.discipline}
          </div>

          {/* Primary Service Title with dynamic alternating slide */}
          <div className="w-full overflow-visible my-2 sm:my-3">
            <motion.div
              style={{ x: headingX }}
              className="will-change-transform inline-block"
            >
              <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-bold tracking-[-0.03em] leading-[1.06] text-black font-sans mb-2 sm:mb-3">
                {service.title}
              </h3>
            </motion.div>
          </div>

          {/* Tagline / Description */}
          <p className="text-base sm:text-lg lg:text-xl text-neutral-700 font-sans leading-relaxed mb-6 sm:mb-8 max-w-xl">
            {service.tagline}
          </p>

          {/* Deliverables / Capabilities List */}
          <div className="w-full pt-4 sm:pt-6 border-t border-black/15 mb-6 sm:mb-8">
            <div className="text-[11px] sm:text-xs font-mono uppercase tracking-widest text-neutral-500 mb-3 sm:mb-4">
              Deliverables & Capabilities
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
              {service.deliverables.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center space-x-2.5 text-xs sm:text-sm text-neutral-800 font-sans"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-black/70 flex-shrink-0" />
                  <span className="font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action CTA Button */}
          <div className="pt-2">
            <button
              onClick={openBookingModal}
              className="inline-flex items-center justify-between gap-4 px-6 py-3.5 bg-black text-white rounded-full text-xs sm:text-sm font-mono uppercase tracking-wider font-semibold hover:bg-neutral-800 transition-colors shadow-sm group/btn"
            >
              <span>Book Strategy Call</span>
              <span className="group-hover/btn:translate-x-1 transition-transform">→</span>
            </button>
          </div>

        </div>

      </div>
    </article>
  );
};

/**
 * Services Component
 * Direct translation of the "Selected Projects" section from the SwissAgency reference video:
 * 1. Large editorial section heading with bold display typography ("Services") moving Left to Right on scroll
 * 2. Continuous, intentional vertical sequence of 6 large cinematic service entries
 * 3. Primary service headings move alternatingly (right-to-left, left-to-right) opposite to one another
 * 4. Minimalist typography, bold dark divider rules, and high-impact cinematic media
 */
const Services: React.FC = () => {
  const headerRef = useRef<HTMLDivElement>(null);

  // Scroll physics for the massive introductory "Services" display headline
  // User requested: "Services" travels all the way from Left End to Right End
  const { scrollYProgress: headerScrollProgress } = useScroll({
    target: headerRef,
    offset: ['start end', 'end start'],
  });

  // Travels all the way from Left End to Right End as user scrolls through the header
  const headlineX = useTransform(headerScrollProgress, [0, 1], ['-60vw', '60vw']);

  return (
    <section
      id="services"
      className="relative w-full bg-[#E5E3DD] text-[#111111] px-5 sm:px-10 lg:px-14 pt-8 sm:pt-12 lg:pt-14 pb-12 sm:pb-16 select-none overflow-hidden"
    >
      <div className="w-full max-w-[1440px] mx-auto">
        
        {/* ====================================================================
            1. EDITORIAL SECTION HEADING (Thick dark rules, bold dark text)
            - Oversized bold display typography: Just "Services"
            - Travels all the way from Left End to Right End
            ==================================================================== */}
        <div ref={headerRef} className="w-full mb-4 sm:mb-6">
          {/* Top thick, dark rule */}
          <div className="w-full border-t-2 border-black mb-3 sm:mb-4" />

          {/* Dramatically Oversized Display Headline: Just "Services" traveling all the way from Left to Right */}
          <div className="w-screen relative left-1/2 -translate-x-1/2 overflow-hidden py-1 sm:py-2 flex justify-center pointer-events-none select-none">
            <motion.div
              style={{ x: headlineX }}
              className="whitespace-nowrap will-change-transform flex justify-center"
            >
              <h2 className="text-[22vw] sm:text-[23vw] md:text-[24vw] font-bold tracking-[-0.04em] leading-[0.82] text-black font-sans inline-block">
                Services
              </h2>
            </motion.div>
          </div>
        </div>

        {/* ====================================================================
            2. SEQUENCE OF LARGE, VISUALLY DOMINANT SERVICE ENTRIES
            - Clean editorial layout: category, title, media, paragraph
            - Thick, dark divider lines
            ==================================================================== */}
        <div className="w-full flex flex-col pb-10 sm:pb-16">
          {servicesList.slice(0, 5).map((service, index) => (
            <ServiceEntry
              key={service.id}
              service={service}
              index={index}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default Services;
