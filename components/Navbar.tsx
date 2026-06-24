import React, { useState } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { MetallicLogo } from './MetallicLogo';

export const LogoArrow = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="navPinkGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#d62cab" />
        <stop offset="100%" stopColor="#37052f" />
      </linearGradient>
      <linearGradient id="navGreyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#444141" />
        <stop offset="100%" stopColor="#fffefe" />
      </linearGradient>
    </defs>
    <path d="M13 11L18 6M18 6H13M18 6V11" stroke="url(#navPinkGradient)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M7 17L12 12M12 12H7M12 12V17" stroke="url(#navGreyGradient)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.8"/>
  </svg>
);

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Services', href: '#services' },
    { name: 'Process', href: '#process' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  const scrollTo = (id: string) => {
    const el = document.getElementById(id.replace('#', ''));
    if (el) {
      const offset = 100;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-4 left-0 right-0 z-50 px-4 md:px-8 lg:px-16 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between relative h-12">
        
        {/* Left Side: Premium AgenciGrow Logo with Gradient Text and Dual Metallic Arrows */}
        <a 
          href="#" 
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className="flex items-center gap-2 z-20 group hover:opacity-90 transition-opacity duration-200"
        >
          <MetallicLogo size="sm" />
        </a>

        {/* Center: Desktop liquid-glass pill with text links - Absolutely centered */}
        <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center liquid-glass-border py-1.5 px-6 z-10" style={{ background: 'rgba(201, 205, 211, 0.03)' }}>
          <div className="flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
                className="text-[13px] font-medium tracking-wide text-[#C9CDD3] hover:text-[#F5F5F2] transition-colors font-body duration-200 py-1"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>

        {/* Right Side: White pill button Book a Call + Arrow icon */}
        <div className="hidden md:block z-10">
          <a
            href="#booking"
            onClick={(e) => { e.preventDefault(); scrollTo('#booking'); }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#F5F5F2] hover:bg-[#C9CDD3] text-[#0A0A0B] rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-300 transform hover:translate-y-[-1px] shadow-lg"
          >
            <span>Book a Call</span>
            <ArrowUpRight size={14} className="stroke-[2.5]" />
          </a>
        </div>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden w-11 h-11 rounded-full flex items-center justify-center liquid-glass-border text-[#C9CDD3] hover:text-[#F5F5F2] transition-colors"
          style={{ background: 'rgba(201, 205, 211, 0.05)' }}
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

      </div>

      {/* Mobile expanded menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden mt-3 p-6 rounded-2xl liquid-glass border border-white/10 flex flex-col gap-4"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
                className="text-base font-medium text-[#C9CDD3] hover:text-[#F5F5F2] py-2 transition-colors border-b border-white/5"
              >
                {link.name}
              </a>
            ))}
            <a
              href="#booking"
              onClick={(e) => { e.preventDefault(); scrollTo('#booking'); }}
              className="mt-2 w-full text-center py-3 bg-[#F5F5F2] text-[#0A0A0B] rounded-full text-sm font-semibold tracking-wider uppercase inline-flex items-center justify-center gap-2"
            >
              <span>Book a Call</span>
              <ArrowUpRight size={14} />
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
