import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

interface ServiceItem {
  id: string;
  subtitle: string;
  title: string;
  description: string;
  mediaType: 'image' | 'video';
  mediaSrc: string;
  isFullWidth: boolean;
}

const servicesData: ServiceItem[] = [
  {
    id: 'google-meta-ads',
    subtitle: 'Search & Social Acquisition',
    title: 'Google & Meta Ads',
    description: 'Capture high-intent search queries on Google and scale brand demand on Meta with precision-targeted funnels that drive real, measurable ROI.',
    mediaType: 'image',
    mediaSrc: '/Photos/Google%20and%20meta%20ads.png',
    isFullWidth: true,
  },
  {
    id: 'whatsapp-automation',
    subtitle: '24/7 Automated Funnels',
    title: 'CRM & WhatsApp Automation',
    description: 'Automate lead follow-ups 24/7 with instant WhatsApp triggers, CRM pipeline synchronization, and interactive chat flows that qualify leads before you hop on a call.',
    mediaType: 'image',
    mediaSrc: '/Photos/whatsapp%20automation.png',
    isFullWidth: false,
  },
  {
    id: 'custom-websites',
    subtitle: 'High-Converting Web Experiences',
    title: 'Landing Pages & Custom Websites',
    description: 'Bespoke, blazing-fast landing pages and custom websites custom-coded to maximize conversion rates and turn traffic into loyal clients.',
    mediaType: 'video',
    mediaSrc: '/Photos/custom%20websites.mp4',
    isFullWidth: false,
  },
  {
    id: 'instagram-management',
    subtitle: 'Visual Content & Strategy',
    title: 'Instagram & Social Media Management',
    description: 'Consistent, high-impact content strategy and visual positioning for Instagram. Build organic trust, establish industry authority, and convert followers into clients.',
    mediaType: 'image',
    mediaSrc: '/Photos/Inatagram%20managementt.png',
    isFullWidth: true,
  },
  {
    id: 'ai-automation',
    subtitle: 'Intelligent Systems & Workflows',
    title: 'AI Automation & Workflows',
    description: 'Custom AI integration and automated operational workflows to streamline internal tasks, speed up response times, and save hours of manual labor every week.',
    mediaType: 'image',
    mediaSrc: '/Photos/ai%20automation%20and%20workflows.png',
    isFullWidth: false,
  },
  {
    id: 'growth-systems',
    subtitle: 'Full-Stack Revenue Engineering',
    title: 'Growth Systems & Strategy',
    description: 'End-to-end growth engineering, brand positioning, and high-converting acquisition systems designed to scale revenue predictably.',
    mediaType: 'image',
    mediaSrc: '/Photos/systems%20and%20strategy.jpeg',
    isFullWidth: false,
  },
];

const ServiceCard: React.FC<{ service: ServiceItem }> = ({ service }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  // Parallax scroll progress calculation
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'end start'],
  });

  // Smooth vertical parallax movement (increased capacity)
  const y = useTransform(scrollYProgress, [0, 1], ['-22%', '22%']);

  const scrollToContact = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById('contact');
    if (el) {
      const offset = 80;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div
      ref={cardRef}
      className={`relative rounded-[28px] sm:rounded-[36px] overflow-hidden group border border-white/10 shadow-2xl bg-[#0a0a0c] cursor-pointer ${
        service.isFullWidth
          ? 'col-span-12 min-h-[480px] sm:min-h-[560px] lg:min-h-[620px]'
          : 'col-span-12 lg:col-span-6 min-h-[440px] sm:min-h-[500px] lg:min-h-[540px]'
      }`}
    >
      {/* Media with Parallax - Increased headroom for deeper motion */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          style={{ y }}
          className="absolute -top-[22.5%] -bottom-[22.5%] left-0 right-0 w-full h-[145%]"
        >
          {service.mediaType === 'video' ? (
            <video
              src={service.mediaSrc}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover object-center"
            />
          ) : (
            <img
              src={service.mediaSrc}
              alt={service.title}
              className="w-full h-full object-cover object-center"
            />
          )}
        </motion.div>
      </div>

      {/* Subtle Top Gradient Shadow for Title Legibility */}
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/75 to-transparent z-0 pointer-events-none" />

      {/* Top Header Content - Title in exact font style */}
      <div className="relative z-10 p-6 sm:p-10">
        <h3 className="text-2xl sm:text-3xl md:text-4xl font-body font-normal text-white leading-[1.15] tracking-[-0.03em] drop-shadow-md">
          {service.title}
        </h3>
      </div>

      {/* Hover Info Overlay - Lower Half (No Blur, Sharp Image view with gradient background) */}
      <div className="absolute inset-x-0 bottom-0 z-20 p-6 sm:p-10 bg-gradient-to-t from-black/95 via-black/80 to-transparent transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out flex flex-col justify-end rounded-b-[28px] sm:rounded-b-[36px]">
        <div className="space-y-3">
          <h4 className="text-xl sm:text-2xl font-body font-normal text-white tracking-[-0.03em] leading-snug">
            {service.title}
          </h4>

          <p className="text-sm sm:text-base text-gray-200 font-body font-light leading-relaxed max-w-2xl">
            {service.description}
          </p>

          <div className="pt-2">
            <a
              href="#contact"
              onClick={scrollToContact}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/40 bg-white/20 hover:bg-white hover:text-black text-white font-medium text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 shadow-xl"
            >
              <span>Get Started</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

const Services: React.FC = () => {
  return (
    <section
      id="services"
      className="py-24 sm:py-32 bg-[#000000] text-[#F5F5F2] relative z-10 scroll-mt-12 border-t border-white/10 font-body"
    >
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12">
        {/* Header - Matching FAQ section exact font style */}
        <div className="mb-12 sm:mb-20">
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-body font-normal tracking-[-0.03em] text-white">
            Services
          </h2>
        </div>

        {/* 6 Services Grid Layout (1 - 2 - 1 - 2) */}
        <div className="grid grid-cols-12 gap-6 sm:gap-8">
          {servicesData.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
