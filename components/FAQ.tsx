import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';

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
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-20 sm:py-32 md:py-40 bg-[#000000] text-[#F5F5F2] relative z-10 scroll-mt-12 border-t border-white/10 overflow-hidden select-none font-body">
      
      {/* Oversized Background Typography */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 flex items-center justify-center">
        <span className="text-[18vw] sm:text-[22vw] font-heading font-serif uppercase tracking-[-0.07em] leading-none text-white/[0.04] whitespace-nowrap select-none">
          QUESTIONS
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 relative z-10">
        
        {/* Large Editorial Headline */}
        <div className="mb-12 sm:mb-20 lg:mb-24 font-heading font-serif">
          <div className="flex items-center gap-2 text-[9px] sm:text-xs font-mono uppercase tracking-[0.25em] sm:tracking-[0.3em] text-gray-400 mb-4 sm:mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-white/80" />
            <span>TRANSPARENCY & CLARITY</span>
          </div>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xl xs:text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-normal uppercase tracking-tighter text-white leading-[0.9]"
          >
            FREQUENTLY<br />
            <span className="text-gray-400 italic font-serif">ASKED</span><br />
            QUESTIONS.
          </motion.h2>
        </div>

        {/* FAQ Accordion List */}
        <div className="border-t border-white/15">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="border-b border-white/15 py-5 sm:py-8 lg:py-10 transition-colors duration-200"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full text-left flex items-start sm:items-center justify-between gap-3 sm:gap-8 group focus:outline-none cursor-pointer min-h-[44px]"
                >
                  <div className="flex items-start sm:items-center gap-3 sm:gap-8 min-w-0 pr-2">
                    <span className="font-mono text-xs sm:text-sm text-gray-500 uppercase tracking-widest shrink-0 pt-1 sm:pt-0 w-6 sm:w-10">
                      {faq.num}
                    </span>
                    <span className="text-base sm:text-xl md:text-2xl lg:text-3xl font-body font-normal text-white tracking-[-0.01em] group-hover:text-gray-300 transition-colors leading-snug">
                      {faq.question}
                    </span>
                  </div>

                  <motion.div
                    animate={{ rotate: isOpen ? 135 : 0 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="shrink-0 w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full border border-white/10 group-hover:border-white/30 transition-colors bg-white/5"
                  >
                    <Plus className="w-4 h-4 sm:w-5 sm:h-5 text-white stroke-[2]" />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="pt-3 sm:pt-6 pl-9 sm:pl-18 max-w-3xl text-xs sm:text-base md:text-lg text-gray-400 font-light leading-relaxed">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default FAQ;


