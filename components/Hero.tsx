import React, { useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';
import FadingVideo from './FadingVideo';

// BlurText component for word-by-word reveal
export const BlurText: React.FC<{ text: string; className?: string }> = ({ text, className = "" }) => {
  const words = text.split(' ');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <span ref={ref} className={`${className} flex flex-wrap justify-center gap-x-4 gap-y-2`}>
      {words.map((word, index) => (
        <motion.span
          key={index}
          initial={{ filter: 'blur(12px)', opacity: 0, y: 15 }}
          animate={isInView ? { filter: 'blur(0px)', opacity: 1, y: 0 } : {}}
          transition={{
            duration: 0.8,
            delay: index * 0.08,
            ease: [0.215, 0.61, 0.355, 1],
          }}
          className="inline-block"
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
};

const Hero: React.FC = () => {
  const arrowControls = useAnimation();
  const heroRef = useRef(null);

  useEffect(() => {
    // Traces the arrow line once on load
    arrowControls.start({
      strokeDashoffset: 0,
      transition: { duration: 1.8, ease: [0.25, 1, 0.5, 1] }
    });
  }, [arrowControls]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 100;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <section 
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center bg-[#0A0A0B] overflow-hidden pt-32 pb-24"
    >
      {/* Background Cinematic Video with custom JS crossfade */}
      <FadingVideo 
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260418_080021_d598092b-c4c2-4e53-8e46-94cf9064cd50.mp4"
        className="absolute left-1/2 top-0 -translate-x-1/2 object-cover object-top z-0 select-none pointer-events-none"
        style={{ width: "120%", height: "120%", opacity: 0 }}
      />

      {/* Signature Element: A thin metallic-silver line, shaped like the arrow, traces itself in once on page load */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] sm:w-[380px] md:w-[500px] lg:w-[700px] h-[250px] sm:h-[380px] md:h-[500px] lg:h-[700px] opacity-[0.14] pointer-events-none select-none z-0">
        <svg viewBox="0 0 100 100" className="w-full h-full text-[#C9CDD3]" fill="none" xmlns="http://www.w3.org/2000/svg">
          <motion.path
            d="M 15,85 L 80,20 M 80,20 H 40 M 80,20 V 60"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ strokeDasharray: "300", strokeDashoffset: "300" }}
            animate={arrowControls}
          />
          <motion.path
            d="M 30,85 L 85,30 M 85,30 H 55 M 85,30 V 60"
            stroke="currentColor"
            strokeWidth="0.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.6"
            initial={{ strokeDasharray: "300", strokeDashoffset: "300" }}
            animate={arrowControls}
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full relative z-10">
        <div className="max-w-4xl flex flex-col items-center text-center mx-auto">
          
          {/* Badge */}
          <motion.div
            initial={{ filter: 'blur(10px)', opacity: 0, y: 20 }}
            animate={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="mb-8"
          >
            <span className="font-heading italic text-lg sm:text-xl md:text-2xl text-[#C9CDD3] tracking-wide pb-1.5 border-b border-[#C9CDD3]/30">
              Growth Partner, Not Just an Agency
            </span>
          </motion.div>

          {/* Headline (BlurText word-by-word reveal, font-heading, no italics) */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-heading text-[#F5F5F2] tracking-tight leading-[1.1] mb-8">
            <BlurText text="Most businesses don't have a marketing problem. They have no system." />
          </h1>

          {/* Subheading */}
          <motion.p
            initial={{ filter: 'blur(10px)', opacity: 0, y: 20 }}
            animate={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
            className="text-sm sm:text-base md:text-lg lg:text-xl text-[#E2E4E9] font-body italic font-light leading-relaxed max-w-2xl mb-12"
          >
            We build the roadmap first, then the ads, automation, and pages to run it, built around how your business actually works, not a template.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ filter: 'blur(10px)', opacity: 0, y: 20 }}
            animate={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1, ease: "easeOut" }}
            className="flex flex-col sm:flex-row items-center gap-6 justify-center w-full sm:w-auto px-4"
          >
            <a
              href="#booking"
              onClick={(e) => { e.preventDefault(); scrollToSection('booking'); }}
              className="liquid-glass-strong w-full sm:w-auto px-8 py-4 text-xs font-semibold tracking-wider uppercase text-[#F5F5F2] inline-flex items-center justify-center gap-2"
            >
              <span>Book a Free Discovery Call</span>
              <ArrowRight size={14} />
            </a>

            <button
              onClick={() => scrollToSection('services')}
              className="text-xs font-semibold tracking-wider uppercase text-[#8B8F96] hover:text-[#F5F5F2] inline-flex items-center gap-1.5 transition-colors duration-200 py-3"
            >
              <span>See How It Works</span>
              <ChevronDown size={14} className="animate-bounce" />
            </button>
          </motion.div>


        </div>
      </div>
    </section>
  );
};

export default Hero;
