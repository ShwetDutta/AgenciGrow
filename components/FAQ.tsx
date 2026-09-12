import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Plus } from 'lucide-react';
import { openBookingModal } from './CalendlyModal';

const faqs = [
  {
    num: "01",
    question: "What is included in the AgenciGrow retainer?",
    answer: "Our retainer covers all core growth capabilities: Paid Advertising (Google & Meta Ads), Custom Landing Pages & Websites, CRM & WhatsApp Automation, Instagram/Social Content Strategy, and AI Workflows. Rather than charging per service, we allocate focus dynamically to whatever channel moves the needle most for your business each month."
  },
  {
    num: "02",
    question: "How does working with a solo founder work in practice?",
    answer: "You get direct access to the person actually building and optimizing your growth channels — no account managers relaying messages, no inexperienced junior staff, and zero handoff delays. All strategy, copy, coding, and media buying are handled directly by the founder."
  },
  {
    num: "03",
    question: "What are the onboarding timelines and how fast do we launch?",
    answer: "Following our 30-minute discovery call, strategy & system build typically takes 5–7 business days. This includes setting up custom landing pages, tracking pixels, ad creatives, and WhatsApp CRM triggers before campaign go-live."
  },
  {
    num: "04",
    question: "What are your payment terms and contract lengths?",
    answer: "We operate on a simple, transparent monthly retainer model. We do not lock you into rigid 12-month agency contracts — we earn your business month after month through tangible pipeline growth and clear ROI."
  },
  {
    num: "05",
    question: "How does day to day communication work?",
    answer: "We set up a dedicated 1-on-1 WhatsApp channel for real-time quick updates and queries, along with weekly asynchronous Loom metric walkthroughs and bi-weekly strategic sync calls."
  },
  {
    num: "06",
    question: "What types of businesses do you work with?",
    answer: "We specialize in B2B service agencies, SaaS startups, high-growth e-commerce brands, and professional services looking to build predictable client acquisition systems and scalable digital infrastructure."
  }
];

const FAQ: React.FC = () => {
  const trackRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [scrollDelta, setScrollDelta] = useState(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

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
  }, [openIndex]);

  /* ==========================================================================
     SCROLL MATH (Hero Shrink & Reveal Effect):
     - target: trackRef (height: 300vh)
     - offset: ['start start', 'end end']
     - 0 -> 0.28 = Ascends from 100vh to 0vh as Muscle Legacy shrinks in background
     - 0.28 -> 0.72 = Docks fullscreen at scale 1.0; content pans to reveal questions
     - 0.72 -> 1.0 = Scales down smoothly to 0.72 as Closing Footer ascends
     ========================================================================== */
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start start', 'end end'],
  });

  // Physical card rise: ascends from bottom of viewport over shrinking Muscle Legacy
  const entryY = useTransform(scrollYProgress, [0, 0.28], ['100vh', '0vh']);

  // Vertical scroll panning so all FAQ items are reachable
  const contentY = useTransform(
    scrollYProgress,
    [0.28, 0.62, 0.72, 1],
    [0, -scrollDelta, -scrollDelta, -scrollDelta]
  );

  // Scale down from 1.0 to 0.72 as Closing Footer ascends
  const scale = useTransform(scrollYProgress, [0, 0.28, 0.72, 1], [1, 1, 1, 0.72]);

  // Corner radius transforms during entrance and exit
  const borderRadius = useTransform(
    scrollYProgress,
    [0, 0.28, 0.72, 0.92],
    ['48px', '0px', '0px', '40px']
  );

  // Elevation shadow during entrance and exit
  const boxShadow = useTransform(
    scrollYProgress,
    [0, 0.28, 0.72, 0.92],
    [
      '0px -35px 90px rgba(0,0,0,0.85)',
      '0px 0px 0px rgba(0,0,0,0)',
      '0px 0px 0px rgba(0,0,0,0)',
      '0px 35px 110px -10px rgba(0,0,0,0.95), 0px 0px 0px 1px rgba(255,255,255,0.18)',
    ]
  );

  // Subtle dimming overlay
  const dimOpacity = useTransform(scrollYProgress, [0.72, 0.95], [0, 0.35]);

  return (
    <section
      ref={trackRef}
      id="faq"
      className="relative z-80 w-full h-[300vh] bg-[#07080a] select-none -mt-[100vh]"
    >
      {/* Pinned Sticky Viewport Window */}
      <div className="sticky top-0 w-full h-screen overflow-hidden flex items-start justify-center p-0 z-0 bg-transparent pointer-events-none">
        
        {/* Subtle Ambient Spatial Depth Grid (visible when card shrinks away from edges) */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_38%,_rgba(255,255,255,0.08)_0%,_transparent_65%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff0d_1px,transparent_1px)] [background-size:32px_32px] opacity-50 pointer-events-none" />

        {/* The Scaling FAQ Canvas */}
        <motion.div
          style={{
            y: entryY,
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
            className="w-full max-w-[1440px] mx-auto flex flex-col justify-between relative z-10 will-change-transform"
          >
            {/* Top Header Label */}
            <div className="w-full mb-4 sm:mb-6">
              <div className="flex items-center justify-between pb-2 text-xs sm:text-sm font-sans text-neutral-600">
                <span>Frequently Asked Inquiries</span>
                <span className="font-mono text-xs uppercase tracking-widest text-neutral-500">[ 06 ANSWERS ]</span>
              </div>
              <div className="w-full border-b border-black/15" />
            </div>

            {/* Section Headline */}
            <div className="mb-6 sm:mb-8">
              <h2 className="text-2xl sm:text-4xl lg:text-6xl font-sans font-normal text-[#111111] tracking-tight max-w-4xl">
                Everything you need to know about the retainer.
              </h2>
            </div>

            {/* Swiss Accordion List */}
            <div className="divide-y divide-black/15 border-b border-black/15">
              {faqs.map((faq, idx) => {
                const isOpen = openIndex === idx;

                return (
                  <div
                    key={faq.num}
                    className="py-4 sm:py-5 group cursor-pointer transition-colors duration-200"
                    onClick={() => toggle(idx)}
                  >
                    <div className="flex items-start justify-between gap-4 sm:gap-8">
                      {/* Left: Number + Question */}
                      <div className="flex items-baseline gap-4 sm:gap-6 min-w-0">
                        <span className="font-mono text-xs sm:text-sm text-neutral-500 uppercase tracking-widest shrink-0">
                          {faq.num}
                        </span>

                        <h3 className="text-base sm:text-xl md:text-2xl font-sans font-normal text-[#111111] tracking-tight group-hover:text-neutral-600 transition-colors">
                          {faq.question}
                        </h3>
                      </div>

                      {/* Right: Plus / Minus Toggle Button */}
                      <div className="shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-black/15 flex items-center justify-center group-hover:border-black transition-colors">
                        <motion.div
                          animate={{ rotate: isOpen ? 45 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-black" />
                        </motion.div>
                      </div>
                    </div>

                    {/* Animated Accordion Body */}
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="mt-3 pl-8 sm:pl-10 text-xs sm:text-sm md:text-[0.95rem] font-sans font-light text-neutral-600 leading-relaxed max-w-3xl">
                            {faq.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

            {/* Bottom Banner */}
            <div className="pt-6 sm:pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs font-mono uppercase tracking-widest text-neutral-500">
              <span>HAVE A SPECIFIC QUESTION NOT LISTED?</span>

              <button
                onClick={openBookingModal}
                className="text-black hover:underline cursor-pointer min-h-[44px] flex items-center"
              >
                Ask the founder directly ↗
              </button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;
