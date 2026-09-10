import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section
      id="faq"
      className="relative w-full bg-[#E5E3DD] text-[#111111] overflow-hidden select-none"
    >
      <div className="w-full max-w-[1440px] mx-auto pt-4 sm:pt-8 pb-12 sm:pb-16">
        
        {/* Top Header Label */}
        <div className="w-full mb-6 sm:mb-10">
          <div className="flex items-center justify-between pb-3 text-xs sm:text-sm font-sans text-neutral-600">
            <span>Frequently Asked Inquiries</span>
            <span className="font-mono text-xs uppercase tracking-widest text-neutral-500">[ 06 ANSWERS ]</span>
          </div>

          {/* Thin Hairline Rule */}
          <div className="w-full border-b border-black/15" />
        </div>

        {/* Section Headline */}
        <div className="mb-10 sm:mb-14">
          <h2 className="text-3xl sm:text-5xl lg:text-7xl font-sans font-normal text-[#111111] tracking-tight max-w-4xl">
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
                className="py-6 sm:py-8 group cursor-pointer transition-colors duration-200"
                onClick={() => toggle(idx)}
              >
                <div className="flex items-start justify-between gap-4 sm:gap-8">
                  
                  {/* Left: Number + Question */}
                  <div className="flex items-baseline gap-4 sm:gap-6 min-w-0">
                    <span className="font-mono text-xs sm:text-sm text-neutral-500 uppercase tracking-widest shrink-0">
                      {faq.num}
                    </span>

                    <h3 className="text-lg sm:text-2xl md:text-3xl font-sans font-normal text-[#111111] tracking-tight group-hover:text-neutral-600 transition-colors">
                      {faq.question}
                    </h3>
                  </div>

                  {/* Right: Plus / Minus Toggle Button */}
                  <div className="shrink-0 w-8 h-8 rounded-full border border-black/15 flex items-center justify-center group-hover:border-black transition-colors">
                    <motion.div
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Plus className="w-4 h-4 text-black" />
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
                      <div className="mt-4 pl-8 sm:pl-10 text-xs sm:text-sm md:text-base font-sans font-light text-neutral-600 leading-relaxed max-w-3xl">
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
        <div className="pt-8 sm:pt-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-mono uppercase tracking-widest text-neutral-500">
          <span>HAVE A SPECIFIC QUESTION NOT LISTED?</span>

          <button
            onClick={openBookingModal}
            className="text-black hover:underline cursor-pointer min-h-[44px] flex items-center"
          >
            Ask the founder directly ↗
          </button>
        </div>

      </div>
    </section>
  );
};

export default FAQ;
