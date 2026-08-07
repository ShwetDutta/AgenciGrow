import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';

const faqs = [
  {
    question: "What is included in the AgenciGrow retainer?",
    answer: "Our retainer covers all core growth capabilities: Paid Advertising (Google & Meta Ads), Custom Landing Pages & Websites, CRM & WhatsApp Automation, Instagram/Social Content Strategy, and AI Workflows. Rather than charging per service, we allocate focus dynamically to whatever channel moves the needle most for your business each month."
  },
  {
    question: "How does working with a solo founder work in practice?",
    answer: "You get direct access to the person actually building and optimizing your growth channels — no account managers relaying messages, no inexperienced junior staff, and zero handoff delays. All strategy, copy, coding, and media buying are handled directly by the founder."
  },
  {
    question: "What are the onboarding timelines and how fast do we launch?",
    answer: "Following our 30-minute discovery call, strategy & system build typically takes 5–7 business days. This includes setting up custom landing pages, tracking pixels, ad creatives, and WhatsApp CRM triggers before campaign go-live."
  },
  {
    question: "What are your payment terms and contract lengths?",
    answer: "We operate on a simple, transparent monthly retainer model. We do not lock you into rigid 12-month agency contracts — we earn your business month after month through tangible pipeline growth and clear ROI."
  },
  {
    question: "How does day-to-day communication work?",
    answer: "We set up a dedicated 1-on-1 WhatsApp channel for real-time quick updates and queries, along with weekly asynchronous Loom metric walkthroughs and bi-weekly strategic sync calls."
  }
];

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  const toggleAll = () => {
    if (openIndex === null) {
      setOpenIndex(0);
    } else {
      setOpenIndex(null);
    }
  };

  return (
    <section id="faq" className="py-24 sm:py-32 bg-[#000000] text-[#F5F5F2] relative z-10 scroll-mt-12 border-t border-white/10 font-body">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12">
        
        {/* Header Row - Editorial Serif Font */}
        <div className="flex items-center justify-between gap-6 mb-12 sm:mb-16 font-heading font-serif">
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-normal uppercase tracking-tighter text-white leading-tight">
            Frequently Asked Questions
          </h2>

          {/* Top-right circular button from reference screenshot */}
          <button
            onClick={toggleAll}
            className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white text-black flex items-center justify-center flex-shrink-0 hover:scale-105 transition-transform duration-300 shadow-xl cursor-pointer"
            title="Toggle questions"
          >
            <motion.div
              animate={{ rotate: openIndex !== null ? 135 : 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <Plus className="w-6 h-6 sm:w-7 sm:h-7 stroke-[2.5]" />
            </motion.div>
          </button>
        </div>

        {/* Clean Line-separated Accordion List */}
        <div className="border-t border-white/20">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="border-b border-white/20 py-6 sm:py-8 transition-colors duration-200"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full text-left flex items-center justify-between gap-6 group focus:outline-none cursor-pointer"
                >
                  <span className="text-xl sm:text-2xl md:text-3xl font-body font-normal text-white tracking-[-0.02em] group-hover:text-gray-300 transition-colors">
                    {faq.question}
                  </span>

                  {/* Icon with spin effect turning + into x/- */}
                  <motion.div
                    animate={{ rotate: isOpen ? 135 : 0 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center"
                  >
                    <Plus className="w-6 h-6 sm:w-8 sm:h-8 text-white stroke-[2]" />
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
                      <div className="pt-4 sm:pt-6 pb-2 text-base sm:text-lg text-gray-400 font-light leading-relaxed max-w-4xl">
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

