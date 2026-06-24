import React from 'react';
import { Linkedin, Instagram, ArrowUpRight } from 'lucide-react';
import { MetallicLogo } from './MetallicLogo';

const Footer: React.FC = () => {
  const scrollToSection = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      const offset = 100;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <footer className="bg-[#0A0A0B] text-[#F5F5F2] pt-24 pb-16 border-t border-white/5 relative z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 pb-20 border-b border-white/5">
          
          {/* Brand Column */}
          <div className="space-y-6 pt-2">
            
            <p className="text-[#8B8F96] text-xs font-body font-light leading-relaxed max-w-xs">
              We are a founder-led growth partner. We build predictable marketing and operations systems to grow your business on autopilot.
            </p>

            <div className="flex space-x-4">
              <a 
                href="https://www.linkedin.com/company/agencigrow/?viewAsMember=true" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#F5F5F2] hover:text-[#0A0A0B] transition-colors duration-200"
                title="Follow us on LinkedIn"
              >
                <Linkedin size={15} />
              </a>

              <a 
                href="https://www.instagram.com/agencigrow?igsh=Mzh2cTVvejh1Y25x" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#F5F5F2] hover:text-[#0A0A0B] transition-colors duration-200"
                title="Follow us on Instagram"
              >
                <Instagram size={15} />
              </a>
            </div>
          </div>

          {/* Solutions Column */}
          <div>
            <h4 className="text-[#C9CDD3] font-semibold text-xs tracking-wider uppercase mb-6 font-body">Solutions</h4>
            <ul className="space-y-4 text-xs font-body font-light text-[#8B8F96]">
              <li>
                <a href="#services" onClick={(e) => scrollToSection(e, 'services')} className="hover:text-[#F5F5F2] transition-colors">Paid Ads</a>
              </li>
              <li>
                <a href="#services" onClick={(e) => scrollToSection(e, 'services')} className="hover:text-[#F5F5F2] transition-colors">Landing Pages</a>
              </li>
              <li>
                <a href="#services" onClick={(e) => scrollToSection(e, 'services')} className="hover:text-[#F5F5F2] transition-colors">CRM & WhatsApp Automation</a>
              </li>
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h4 className="text-[#C9CDD3] font-semibold text-xs tracking-wider uppercase mb-6 font-body">Company</h4>
            <ul className="space-y-4 text-xs font-body font-light text-[#8B8F96]">
              <li>
                <a href="#process" onClick={(e) => scrollToSection(e, 'process')} className="hover:text-[#F5F5F2] transition-colors">How We Work</a>
              </li>
              <li>
                <a href="#booking" onClick={(e) => scrollToSection(e, 'booking')} className="hover:text-[#F5F5F2] transition-colors">Book a Call</a>
              </li>
            </ul>
          </div>

          {/* CTA Box Column */}
          <div 
            className="p-8 border border-white/5 rounded-2xl flex flex-col justify-between liquid-glass"
            style={{ background: 'rgba(201, 205, 211, 0.02)' }}
          >
            <div>
              <h4 className="text-lg font-medium text-[#F5F5F2] mb-3 font-heading leading-tight">
                Ready to scale?<br />Let's talk growth.
              </h4>
              <p className="text-[#8B8F96] text-[11px] font-body font-light leading-relaxed mb-6">
                Stop guessing and start engineering. Secure your dedicated strategy call.
              </p>
            </div>
            
            <a 
              href="#booking" 
              onClick={(e) => scrollToSection(e, 'booking')}
              className="liquid-glass-strong w-full py-3.5 text-center text-xs font-semibold tracking-wider uppercase text-[#F5F5F2] inline-flex items-center justify-center gap-2"
            >
              <span>Book a Call</span>
              <ArrowUpRight size={13} />
            </a>
          </div>

        </div>
        
        {/* Footer Bottom */}
        <div className="pt-10 flex flex-col sm:flex-row justify-between items-center gap-6 relative z-10">
          <p className="text-[#8B8F96] text-xs font-body font-light">
            © 2026 AgenciGrow.
          </p>
          <div className="flex gap-8 text-xs font-body font-light text-[#8B8F96]">
            <a href="#" className="hover:text-[#F5F5F2] transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-[#F5F5F2] transition-colors">Terms of Service</a>
          </div>
        </div>

      </div>
      
      {/* Giant Metallic Display Logo */}
      <MetallicLogo size="footer" />
    </footer>
  );
};

export default Footer;
