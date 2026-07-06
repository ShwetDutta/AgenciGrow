import React, { useRef, useState, useEffect } from 'react';
import { Search, Target, Layers, TrendingUp, Database, MessageSquare } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface ServiceItem {
  icon: React.ReactNode;
  category: string;
  title: string;
  body: string;
}

const serviceList: ServiceItem[] = [
  {
    icon: <Search className="w-5 h-5 text-[#C9CDD3]" />,
    category: 'Paid Search',
    title: 'Demand Capture & SEO',
    body: 'Capture high-intent search traffic with technical SEO, keyword targeting, and Google Ads. Engineered to attract qualified leads actively searching for your services and drive direct sales.'
  },
  {
    icon: <Target className="w-5 h-5 text-[#C9CDD3]" />,
    category: 'Meta Ads',
    title: 'Social Scaling & Funnels',
    body: 'Scale your brand on Instagram and Facebook using feed-disrupting visual campaigns. We optimize creative assets and retargeting funnels to capture attention and convert passive scrollers into customers.'
  },
  {
    icon: <Layers className="w-5 h-5 text-[#C9CDD3]" />,
    category: 'Landing Pages',
    title: 'Conversion-First Design',
    body: 'Sleek, high-performance landing pages custom-coded in React and styled with Tailwind CSS. Designed with blazing-fast speeds and high-converting copy to turn clicks into valuable customer actions.'
  },
  {
    icon: <TrendingUp className="w-5 h-5 text-[#C9CDD3]" />,
    category: 'Funnels',
    title: 'Pre-Qualification Pathways',
    body: 'Multi-stage digital pathways designed to systematically qualify and educate prospects. Turn cold traffic into warm, high-value client relationships by resolving objections and building trust automatically.'
  },
  {
    icon: <Database className="w-5 h-5 text-[#C9CDD3]" />,
    category: 'CRM',
    title: 'Pipeline & Automation Architecture',
    body: 'Streamline your sales pipeline with customized CRM tools, email workflows, and integrations. We construct automated workflows and marketing analytics to give you full attribution and clear growth visibility.'
  },
  {
    icon: <MessageSquare className="w-5 h-5 text-[#C9CDD3]" />,
    category: 'WhatsApp Automation',
    title: 'Conversational Lead Nurturing',
    body: 'Nurture leads 24/7 with instant automated WhatsApp triggers and interactive chat pathways. Engage with prospects instantly, qualify incoming opportunities, and schedule strategy calls on autopilot.'
  }
];

// Helper function to calculate premium card styling based on spotlight distance
const getCardStyle = (dist: number) => {
  const maxDist = 220; // transition boundary
  const absDist = Math.abs(dist);
  const f = Math.max(0, 1 - absDist / maxDist);
  // smoothstep easing
  const easeF = f * f * (3 - 2 * f);

  const opacity = 0.35 + easeF * 0.65;
  const scale = 0.9 + easeF * 0.1;
  const translateZ = easeF * 60;

  return {
    opacity,
    transform: `perspective(1000px) rotateX(8deg) rotateY(-8deg) translateZ(${translateZ}px) scale(${scale})`,
    filter: 'none', // Omit dynamic blur filters completely to maximize GPU scrolling performance
    borderColor: `rgba(255, 255, 255, ${0.05 + easeF * 0.17})`,
    boxShadow: `0 15px 45px rgba(0,0,0,${0.6 + easeF * 0.25})`,
    zIndex: easeF > 0.5 ? 20 : 5
  };
};

// Interactive 3D Card with Tilt and Glow effect on Hover
const InteractiveCard3D: React.FC<{
  service: ServiceItem;
  isActive: boolean;
  style?: React.CSSProperties;
  isMobile?: boolean;
}> = ({ service, isActive, style, isMobile = false }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile || !isActive || !cardRef.current) return;
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Direct DOM styling for 60fps performance
    const rotateX = ((centerY - y) / centerY) * 12;
    const rotateY = ((x - centerX) / centerX) * 12;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(60px) scale(1.02)`;
    card.style.borderColor = 'rgba(255, 255, 255, 0.22)';
    card.style.boxShadow = '0 25px 60px -10px rgba(0,0,0,0.8), 0 0 30px rgba(255,255,255,0.03)';
  };

  const handleMouseLeave = () => {
    if (isMobile || !cardRef.current) return;
    const card = cardRef.current;
    // Clear custom style properties set by mouse move so they fall back to react style props
    card.style.transform = '';
    card.style.borderColor = '';
    card.style.boxShadow = '';
  };

  const defaultStyle: React.CSSProperties = isMobile ? {
    opacity: 1,
    transform: 'none',
    borderColor: 'rgba(255, 255, 255, 0.15)',
    boxShadow: '0 10px 30px rgba(0,0,0,0.6)',
    filter: 'none',
    zIndex: 1
  } : {
    opacity: isActive ? 1 : 0.35,
    transform: isActive 
      ? 'perspective(1000px) rotateX(8deg) rotateY(-8deg) translateZ(40px) scale(1.02)' 
      : 'perspective(1000px) rotateX(8deg) rotateY(-8deg) translateZ(0px) scale(0.9)',
    borderColor: isActive ? 'rgba(255, 255, 255, 0.15)' : 'rgba(255, 255, 255, 0.05)',
    boxShadow: isActive ? '0 20px 40px rgba(0,0,0,0.8)' : '0 10px 30px rgba(0,0,0,0.6)',
    filter: 'none',
    zIndex: isActive ? 10 : 1
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`w-full max-w-[500px] rounded-[24px] p-6 sm:p-8 flex flex-col justify-between border select-none transition-all duration-300 ease-out ${
        isActive 
          ? 'border-white/15' 
          : 'pointer-events-none'
      }`}
      style={{
        background: 'rgba(12, 12, 13, 0.92)',
        backdropFilter: isMobile ? 'none' : 'blur(10px)',
        WebkitBackdropFilter: isMobile ? 'none' : 'blur(10px)',
        height: isMobile ? 'auto' : '240px',
        willChange: isMobile ? 'none' : 'transform, opacity',
        transitionProperty: isMobile ? 'all' : 'border-color, background-color', // Disable transform transition on desktop to prevent scroll stutter
        ...defaultStyle,
        ...style
      }}
    >
      {/* Card Header */}
      <div className="flex items-start justify-between gap-4">
        <div 
          className="w-11 h-11 rounded-xl flex items-center justify-center border border-white/10"
          style={{ background: 'rgba(255, 255, 255, 0.03)' }}
        >
          {service.icon}
        </div>
        <span className="px-3 py-1 rounded-full text-[10px] font-medium tracking-wider uppercase text-[#8B8F96] border border-white/5 bg-white/[0.01]">
          {service.category}
        </span>
      </div>

      {/* Card Body */}
      <div className="mt-6">
        <h3 className="text-lg md:text-xl font-body font-medium text-[#F5F5F2] leading-snug mb-2">
          {service.title}
        </h3>
        <p className="text-xs md:text-sm text-[#8B8F96] font-light leading-relaxed font-body">
          {service.body}
        </p>
      </div>
    </div>
  );
};

const Services: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);
  const bgTextRef = useRef<HTMLHeadingElement>(null);
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 1024;
    }
    return false;
  });
  const [scrollProgress, setScrollProgress] = useState(0);
  const [dimensions, setDimensions] = useState({ startY: 0, focusY: 0 });

  // Split left (0, 2, 4) and right (1, 3, 5) indexes
  const leftCards = serviceList.filter((_, i) => i % 2 === 0);
  const rightCards = serviceList.filter((_, i) => i % 2 !== 0);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        startY: window.innerHeight * 0.22,
        focusY: window.innerHeight * 0.44
      });
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isMobile || window.innerWidth < 1024) return;

    const ctx = gsap.context(() => {
      // Reset background text style
      gsap.set(bgTextRef.current, { scale: 0.95, opacity: 0.1 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=2200", // Compact and smooth pinning scroll length
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          onUpdate: (self) => {
            // Progress goes from 0 to 1; we map it to 0..5 with a beautiful hold at the last card
            setScrollProgress(Math.min(5, self.progress * 5.4));
          }
        }
      });

      // Animate Background text scale & opacity
      tl.to(bgTextRef.current, {
        scale: 1.05,
        opacity: 0.28,
        ease: "power1.inOut"
      }, 0);
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, [isMobile]);

  // Derived state calculations for premium spotlight alignment
  const activeCardIndex = Math.round(scrollProgress);
  const t = Math.min(Math.max(scrollProgress, 0), 5);

  const slotLeft = t / 2;
  const leftCenterOffset = slotLeft * 352 + 120;

  const slotRight = (t - 1) / 2;
  const rightCenterOffset = slotRight * 352 + 120;

  const leftTranslationY = dimensions.focusY - dimensions.startY - leftCenterOffset;
  const rightTranslationY = dimensions.focusY - dimensions.startY - rightCenterOffset;

  return (
    <section 
      id="services" 
      ref={sectionRef} 
      className="relative z-10 bg-[#080808] overflow-hidden"
      style={{ height: isMobile ? 'auto' : '100vh' }}
    >
      {isMobile ? (
        /* Mobile Layout: Touch-friendly vertical list with active animations */
        <div className="py-24 px-6 max-w-xl mx-auto flex flex-col items-center">
          
          {/* Header */}
          <div className="text-center mb-16">
            <span className="text-[11px] font-semibold tracking-[0.3em] uppercase text-[#8B8F96] block mb-4">
              // WHAT WE DO
            </span>
            <h2 className="text-3xl sm:text-4xl font-heading italic text-[#F5F5F2] tracking-tight leading-tight">
              Growth is a system,<br />not a guessing game.
            </h2>
          </div>

          {/* Cards List */}
          <div className="space-y-6 w-full flex flex-col items-center">
            {serviceList.map((service) => (
              <div
                key={service.title}
                className="w-full flex justify-center"
              >
                <InteractiveCard3D 
                  service={service} 
                  isActive={true} 
                  isMobile={true}
                />
              </div>
            ))}
          </div>

          <div className="w-full text-center mt-16 max-w-lg">
            <p className="text-base sm:text-lg md:text-xl text-[#C9CDD3] italic font-light font-body leading-relaxed">
              Every business gets a different mix of these, decided after we understand yours.
            </p>
          </div>

        </div>
      ) : (
        /* Desktop/Tablet: Immersive Sticky 3D Parallax Reveal Experience */
        <div className="sticky top-0 h-screen w-full flex flex-col justify-between py-12 px-8 lg:px-16 pointer-events-none select-none">
          
          {/* Eyebrow placed at top center */}
          <div className="w-full text-center z-30 pt-4">
            <span className="text-[11px] font-semibold tracking-[0.3em] uppercase text-[#8B8F96]">
              // WHAT WE DO
            </span>
          </div>

          {/* Locked background story text */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 px-4">
            <h2 
              ref={bgTextRef}
              className="text-5xl md:text-6xl lg:text-[6.5rem] font-heading italic text-[#F5F5F2] text-center max-w-5xl tracking-tight leading-[1.05]"
              style={{ willChange: 'transform, opacity' }}
            >
              Growth is a system,<br />not a guessing game.
            </h2>
          </div>

          {/* Left and Right scrolling parallax columns */}
          <div className="max-w-7xl mx-auto w-full h-full grid grid-cols-12 gap-8 items-start relative z-10">
            
            {/* Left Column (Cards 1, 3, 5 -> indexes 0, 2, 4) */}
            <div className="col-span-5 h-full overflow-visible relative flex flex-col justify-start">
              <div 
                ref={leftColRef} 
                className="flex flex-col gap-28 pointer-events-auto"
                style={{ 
                  transform: `translateY(${leftTranslationY}px)`,
                  top: `${dimensions.startY}px`,
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  willChange: 'transform'
                }}
              >
                {leftCards.map((service, i) => {
                  const originalIndex = i * 2;
                  const dist = (i * 352 + 120) - leftCenterOffset;
                  const cardStyle = getCardStyle(dist);
                  return (
                    <div 
                      key={service.title} 
                      className="w-full flex justify-end pr-4"
                    >
                      <InteractiveCard3D 
                        service={service} 
                        isActive={activeCardIndex === originalIndex}
                        style={cardStyle}
                      />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Empty Center spacer */}
            <div className="col-span-2 h-full" />

            {/* Right Column (Cards 2, 4, 6 -> indexes 1, 3, 5) */}
            <div className="col-span-5 h-full overflow-visible relative flex flex-col justify-start">
              <div 
                ref={rightColRef} 
                className="flex flex-col gap-28 pointer-events-auto"
                style={{ 
                  transform: `translateY(${rightTranslationY}px)`,
                  top: `${dimensions.startY}px`,
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  willChange: 'transform'
                }}
              >
                {rightCards.map((service, i) => {
                  const originalIndex = i * 2 + 1;
                  const dist = (i * 352 + 120) - rightCenterOffset;
                  const cardStyle = getCardStyle(dist);
                  return (
                    <div 
                      key={service.title} 
                      className="w-full flex justify-start pl-4"
                    >
                      <InteractiveCard3D 
                        service={service} 
                        isActive={activeCardIndex === originalIndex}
                        style={cardStyle}
                      />
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Stencil footnote */}
          <div className="w-full text-center z-30 pb-8 max-w-3xl mx-auto">
            <p className="text-lg md:text-xl lg:text-2xl text-[#C9CDD3] italic font-light font-body leading-relaxed px-6">
              Every business gets a different mix of these, decided after we understand yours.
            </p>
          </div>

        </div>
      )}
    </section>
  );
};

export default Services;
