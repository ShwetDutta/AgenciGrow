import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { openBookingModal } from './CalendlyModal';

interface SupportingItem {
  label: string;
  description: string;
}

interface ProcessStepData {
  number: string;
  title: string;
  subLabel: string;
  paragraph1: string;
  paragraph2: string;
  supportingHeader: string;
  supportingItems: SupportingItem[];
  closingStatement?: string;
}

const stepsData: ProcessStepData[] = [
  {
    number: '01',
    title: 'Discovery Call',
    subLabel: 'Business strategy & alignment',
    paragraph1:
      'Our projects always begin by gaining a deep understanding of your business goals, customer needs, applicable acquisition channels, and operational unit economics. We meet directly with key stakeholders to immerse ourselves in your business and evaluate your current commercial reality.',
    paragraph2:
      "This qualitative and analytical inquiry unlocks insights, opportunities, and friction points businesses typically haven't considered. We land on an informed hypothesis about where to focus the work to ensure every system deployed is feasible, highly profitable, and engineered for scalable customer acquisition.",
    supportingHeader: 'WHAT WE WANT TO UNDERSTAND',
    supportingItems: [
      {
        label: 'BUSINESS',
        description:
          'What you sell, who you sell it to, and how the business currently generates and collects revenue.',
      },
      {
        label: 'CURRENT POSITION',
        description:
          'Where growth is coming from today, where pipeline leaks occur, and where friction exists.',
      },
      {
        label: 'OBJECTIVES',
        description:
          'What the business actually wants to achieve over the coming quarter and long-term horizon.',
      },
      {
        label: 'CONSTRAINTS',
        description:
          'The practical operational limitations, unit margins, and conditions we need to work within.',
      },
    ],
  },
  {
    number: '02',
    title: 'Strategy & Analysis',
    subLabel: 'Diagnostic & commercial fit',
    paragraph1:
      'We schedule a deep-dive strategy session to examine the business from the inside out. We audit current ad spend, conversion friction across landing pages, lead response times, and customer lifetime value to map where revenue is being lost.',
    paragraph2:
      "We identify the real constraints and determine where we can create immediate, compounding impact. Crucially, we evaluate whether AgenciGrow can genuinely move the needle—if there isn't an authentic, high-margin fit, we will tell you directly rather than recommend an unviable solution.",
    supportingHeader: 'WHAT WE EXAMINE',
    supportingItems: [
      {
        label: '01 — ACQUISITION',
        description:
          'Current advertising channels, traffic sources, customer acquisition costs, and inbound lead quality.',
      },
      {
        label: '02 — CONVERSION',
        description:
          'Landing pages, offer structure, speed-to-lead response times, and sales pipeline conversion friction.',
      },
      {
        label: '03 — RETENTION',
        description:
          'Customer lifetime value, repeat transaction cycles, and automated downstream revenue opportunities.',
      },
      {
        label: '04 — OPERATIONS',
        description:
          'Existing CRM workflows, team routing protocols, and areas where manual bottlenecks cap growth.',
      },
    ],
  },
  {
    number: '03',
    title: 'Custom Proposal',
    subLabel: 'Commercial architecture & scope',
    paragraph1:
      'Once we understand the exact constraints and opportunity, we build a proposal engineered around your specific business conditions and growth objectives. Every recommendation is designed around what you actually need—not a predetermined package.',
    paragraph2:
      'Your custom scope outlines the exact revenue architecture: targeted acquisition channels, automated WhatsApp & CRM pipelines, creative sprint cadence, and transparent unit economics engineered for compounding enterprise value.',
    supportingHeader: 'WHAT YOU RECEIVE',
    supportingItems: [
      {
        label: 'TAILORED STRATEGY',
        description:
          'A dedicated growth roadmap built around the actual unit economics and opportunities identified.',
      },
      {
        label: 'SCOPE OF WORK',
        description:
          'A clear, exhaustive definition of what we will build, automate, and manage—and why.',
      },
      {
        label: 'PRIORITIES',
        description:
          'The highest-impact revenue levers we believe should be implemented and validated first.',
      },
      {
        label: 'INVESTMENT',
        description:
          'Transparent pricing based on the scope and requirements of the business, with zero hidden fees.',
      },
    ],
    closingStatement:
      'No generic packages. No unnecessary retainers. Just a system built around the business.',
  },
];

/**
 * Our Process / How We Work Section
 *
 * Swiss Editorial Grid Architecture:
 * - Column 1 (Left): Oversized numerical anchor (01, 02, 03) sticky throughout each step.
 * - Columns 2 & 3 (Right): Solid black horizontal rule (`border-t-2 border-black`)
 *   spanning across the content columns, aligned with the top of the number.
 * - Content Layers:
 *     1. Main heading (bold Swiss grotesk) + descriptor label
 *     2. Primary and secondary editorial explanations
 *     3. Supporting deliverables/breakdown list with thin rules
 *     4. Editorial serif closing statement on Step 03
 * - Scroll mechanics untouched: exact same 1:1 scroll progression and sticky runway.
 */
const Process: React.FC = () => {
  return (
    <section id="process" className="w-full select-none pt-12 sm:pt-16 lg:pt-20 pb-20 sm:pb-32">
      <div className="w-full max-w-[1440px] mx-auto flex flex-col">
        {/* Top Section Label: "FROM START TO FINISH" */}
        <div className="text-[11px] sm:text-xs font-mono uppercase tracking-[0.2em] text-neutral-600 mb-10 sm:mb-14 lg:mb-16">
          FROM START TO FINISH
        </div>

        {/* Sequential Process Steps */}
        <div className="flex flex-col">
          {stepsData.map((step) => (
            <article
              key={step.number}
              id={`process-step-${step.number}`}
              className="w-full grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 lg:gap-14 min-h-[85vh] sm:min-h-[90vh] lg:min-h-[95vh] pt-6 sm:pt-8 lg:pt-10 pb-20 sm:pb-28 lg:pb-36"
            >
              {/* Column 1: Number — Sits cleanly on the left with NO line above it */}
              <div className="md:col-span-3 lg:col-span-3 relative">
                <div className="sticky top-[64px] sm:top-[74px] lg:top-[84px] z-10 select-none">
                  <span className="font-grotesk font-bold tracking-[-0.05em] leading-[0.74] text-black text-7xl sm:text-8xl md:text-[8.5rem] lg:text-[10.5rem] xl:text-[12rem] block">
                    {step.number}
                  </span>
                </div>
              </div>

              {/* Columns 2 & 3: Content block with crisp solid black line starting at the title and spanning to the right edge */}
              <div className="md:col-span-9 lg:col-span-9 border-t-2 border-black pt-5 sm:pt-6 lg:pt-7">
                {/* Primary Section: Title + Subtitle & Narrative Paragraphs */}
                <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 lg:gap-12 items-start">
                  
                  {/* Title & Subtitle */}
                  <div className="md:col-span-5 lg:col-span-5 flex flex-col justify-start">
                    <h4 className="text-2xl sm:text-3xl md:text-[2.1rem] lg:text-[2.4rem] font-grotesk font-bold tracking-[-0.03em] leading-[1.12] text-black">
                      {step.title}
                    </h4>
                    <div className="text-sm sm:text-base font-grotesk font-medium text-neutral-600 mt-2 sm:mt-2.5">
                      {step.subLabel}
                    </div>
                  </div>

                  {/* Primary Narrative Paragraphs */}
                  <div className="md:col-span-7 lg:col-span-7 flex flex-col space-y-4 sm:space-y-5">
                    <p className="font-grotesk font-normal text-sm sm:text-base md:text-[0.975rem] text-neutral-700 leading-[1.68] tracking-[-0.01em]">
                      {step.paragraph1}
                    </p>
                    <p className="font-grotesk font-normal text-sm sm:text-base md:text-[0.975rem] text-neutral-700 leading-[1.68] tracking-[-0.01em]">
                      {step.paragraph2}
                    </p>
                  </div>

                </div>

                {/* Supporting Details / Editorial Breakdown Layer */}
                <div className="mt-10 sm:mt-12 lg:mt-14 pt-8 sm:pt-10 border-t border-black/15">
                  <div className="text-[11px] sm:text-xs font-mono uppercase tracking-[0.18em] text-neutral-600 mb-6 sm:mb-8">
                    {step.supportingHeader}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 lg:gap-x-14 gap-y-6 sm:gap-y-8">
                    {step.supportingItems.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex flex-col space-y-2 pb-5 border-b border-black/10"
                      >
                        <div className="font-mono text-xs sm:text-[13px] font-bold text-black uppercase tracking-[0.06em]">
                          {item.label}
                        </div>
                        <p className="font-grotesk font-normal text-xs sm:text-sm text-neutral-700 leading-[1.62]">
                          {item.description}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Editorial Serif Closing Statement (for Step 03) */}
                  {step.closingStatement && (
                    <div className="mt-8 sm:mt-10 pt-6 border-t border-black/15">
                      <p className="font-serif italic text-xl sm:text-2xl md:text-[1.75rem] text-black leading-snug">
                        "{step.closingStatement}"
                      </p>
                    </div>
                  )}
                </div>

              </div>
            </article>
          ))}
        </div>

        {/* Minimal Swiss Closing Action & Natural Handoff to Next Section */}
        <div className="w-full pt-12 sm:pt-16 pb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border-t border-black/15 mt-8 sm:mt-12">
          <div className="space-y-1">
            <div className="font-mono text-[11px] sm:text-xs uppercase tracking-[0.14em] text-neutral-600">
              Stage 01
            </div>
            <div className="font-serif text-xl sm:text-2xl md:text-3xl text-black">
              It begins with a 30-minute discovery conversation.
            </div>
          </div>
          <button
            onClick={openBookingModal}
            className="inline-flex items-center gap-3 px-6 sm:px-7 py-3.5 bg-black text-white hover:bg-neutral-800 transition-colors text-xs font-mono uppercase tracking-[0.14em] group cursor-pointer"
          >
            <span>Book Discovery Call</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>

      </div>
    </section>
  );
};

export default Process;
