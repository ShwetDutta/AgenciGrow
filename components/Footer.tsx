import React, { useState } from 'react';
import { ArrowRight, X } from 'lucide-react';

const Footer: React.FC = () => {
  const [activeModal, setActiveModal] = useState<'privacy' | 'terms' | null>(null);

  const scrollToSection = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    if (id === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      const offset = 80;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <footer className="bg-[#000000] text-[#F5F5F2] pt-12 pb-12 relative z-10 overflow-hidden font-body">
      
      {/* 1. Pre-Footer Featured Cards */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 mb-16 sm:mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-6">
          
          {/* Card 1: Billboard / Contact Us */}
          <div className="relative min-h-[480px] sm:min-h-[540px] lg:min-h-[600px] rounded-[28px] sm:rounded-[36px] overflow-hidden flex flex-col justify-between p-8 sm:p-12 lg:p-14 group border border-white/10 shadow-2xl">
            {/* Background Image */}
            <img 
              src="public/Photos/billboard_agencigrow.png" 
              alt="AgenciGrow Billboard"
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover object-center z-0 transition-transform duration-700 group-hover:scale-105"
            />
            
            {/* Subtle Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 z-0 pointer-events-none" />

            {/* Top Spacer for flex alignment */}
            <div className="relative z-10" />

            {/* Bottom Content / Pill CTA */}
            <div className="relative z-10 pt-8">
              <a 
                href="#contact" 
                onClick={(e) => scrollToSection(e, 'contact')}
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full border border-white/40 bg-white/15 backdrop-blur-md text-white font-medium text-lg sm:text-xl hover:bg-white hover:text-black transition-all duration-300 transform hover:scale-[1.02] shadow-xl group/btn"
              >
                <span>Contact us</span>
                <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover/btn:translate-x-1" />
              </a>
            </div>
          </div>

          {/* Card 2: Instagram / Go to Insta */}
          <div className="relative min-h-[480px] sm:min-h-[540px] lg:min-h-[600px] rounded-[28px] sm:rounded-[36px] overflow-hidden flex flex-col justify-between p-8 sm:p-12 lg:p-14 group border border-white/10 shadow-2xl">
            {/* Background Image */}
            <img 
              src="public/Photos/Agencigrow instagram page.png" 
              alt="AgenciGrow Instagram"
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover object-center z-0 transition-transform duration-700 group-hover:scale-105"
            />
            
            {/* Subtle Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 z-0 pointer-events-none" />

            {/* Top Spacer for flex alignment */}
            <div className="relative z-10" />

            {/* Bottom Content / Pill CTA */}
            <div className="relative z-10 pt-8">
              <a 
                href="https://www.instagram.com/agencigrow?igsh=Mzh2cTVvejh1Y25x" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full border border-white/40 bg-white/15 backdrop-blur-md text-white font-medium text-lg sm:text-xl hover:bg-white hover:text-black transition-all duration-300 transform hover:scale-[1.02] shadow-xl group/btn"
              >
                <span>Go to Insta</span>
                <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover/btn:translate-x-1" />
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* 2. Main Footer Footer Section */}
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12">
        
        {/* Top Navigation Row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-white/10 text-sm text-[#A1A1A1] font-normal">
          
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 sm:gap-8">
            <a href="#" onClick={(e) => scrollToSection(e, 'top')} className="hover:text-white transition-colors">Home</a>
            <a href="#about" onClick={(e) => scrollToSection(e, 'about')} className="hover:text-white transition-colors">About</a>
            <a href="#services" onClick={(e) => scrollToSection(e, 'services')} className="hover:text-white transition-colors">Services</a>
            <a href="#process" onClick={(e) => scrollToSection(e, 'process')} className="hover:text-white transition-colors">Process</a>
            <a href="#work" onClick={(e) => scrollToSection(e, 'work')} className="hover:text-white transition-colors">Work</a>
            <a href="#faq" onClick={(e) => scrollToSection(e, 'faq')} className="hover:text-white transition-colors">FAQ</a>
            <a href="#contact" onClick={(e) => scrollToSection(e, 'contact')} className="hover:text-white transition-colors">Contact</a>
          </div>

          <div className="text-xs sm:text-sm text-[#888888]">
            © Copyrights AgenciGrow
          </div>

        </div>

        {/* Middle Massive Title */}
        <div className="py-6 sm:py-10 text-center select-none overflow-hidden">
          <h1 className="text-[13vw] sm:text-[13.5vw] font-body font-normal text-[#FFFFFF] leading-none tracking-[-0.04em] w-full">
            AgenciGrow
          </h1>
        </div>

        {/* Bottom Social & Legal Links */}
        <div className="pt-4 sm:pt-6 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs sm:text-sm text-[#888888]">
          <a 
            href="https://www.linkedin.com/company/agencigrow/?viewAsMember=true" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hover:text-white transition-colors"
          >
            LinkedIn
          </a>
          <a 
            href="https://www.instagram.com/agencigrow?igsh=Mzh2cTVvejh1Y25x" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hover:text-white transition-colors"
          >
            Instagram
          </a>
          <button 
            onClick={() => setActiveModal('privacy')} 
            className="hover:text-white transition-colors cursor-pointer bg-transparent border-0 p-0"
          >
            Privacy Policy
          </button>
          <button 
            onClick={() => setActiveModal('terms')} 
            className="hover:text-white transition-colors cursor-pointer bg-transparent border-0 p-0"
          >
            Terms & Conditions
          </button>
        </div>

      </div>

      {/* Modal for Privacy Policy / Terms */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#121214] border border-white/10 rounded-2xl p-6 sm:p-8 max-w-xl w-full text-white relative shadow-2xl">
            <button 
              onClick={() => setActiveModal(null)} 
              className="absolute top-4 right-4 text-gray-400 hover:text-white p-2"
            >
              <X size={20} />
            </button>
            <h3 className="text-2xl font-heading mb-4">
              {activeModal === 'privacy' ? 'Privacy Policy' : 'Terms & Conditions'}
            </h3>
            <div className="text-sm text-gray-300 space-y-3 max-h-96 overflow-y-auto pr-2 font-light">
              {activeModal === 'privacy' ? (
                <>
                  <p>AgenciGrow respects your privacy. We collect minimal information required to deliver growth services, handle client inquiries, and optimize campaign performance.</p>
                  <p>Your data is never sold to third parties. Information provided via forms or calendar scheduling is stored securely and used exclusively for partner communications.</p>
                </>
              ) : (
                <>
                  <p>By using the AgenciGrow website and engaging our services, you agree to our standard partner terms and retainer scope agreements.</p>
                  <p>All client strategies, custom web builds, and automation workflows are governed by individual master service agreements tailored to your specific engagement.</p>
                </>
              )}
            </div>
            <button 
              onClick={() => setActiveModal(null)} 
              className="mt-6 px-6 py-2.5 bg-white text-black font-semibold rounded-full text-xs uppercase tracking-wider hover:bg-gray-200 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}

    </footer>
  );
};

export default Footer;
