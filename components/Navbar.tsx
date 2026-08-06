import React, { useState } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { MetallicLogo } from './MetallicLogo';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Process', href: '#process' },
    { name: 'Work', href: '#work' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Contact', href: '#contact' },
  ];

  const scrollTo = (id: string) => {
    const el = document.getElementById(id.replace('#', ''));
    if (el) {
      const offset = 80;
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
    <nav className="fixed top-2 sm:top-4 left-0 right-0 z-50 px-3 sm:px-4 md:px-8 lg:px-16 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between relative h-10 sm:h-12">
        
        {/* Left Side: AgenciGrow Logo */}
        <a 
          href="#" 
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className="flex items-center gap-2 z-20 group hover:opacity-90 transition-opacity duration-200"
        >
          <MetallicLogo size="sm" />
        </a>

        {/* Center: Desktop glass pill with text links */}
        <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 items-center liquid-glass-border py-1.5 px-6 z-10" style={{ background: 'rgba(201, 205, 211, 0.03)' }}>
          <div className="flex items-center space-x-6 xl:space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
                className="text-[12px] font-medium tracking-wide text-[#C9CDD3] hover:text-[#F5F5F2] transition-colors font-body duration-200 py-1"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>

        {/* Right Side: White pill button Book a Call */}
        <div className="hidden md:block z-10">
          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); scrollTo('#contact'); }}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#F5F5F2] hover:bg-[#C9CDD3] text-[#0A0A0B] rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-300 transform hover:translate-y-[-1px] shadow-lg font-body"
          >
            <span>Book a Call</span>
            <ArrowUpRight size={14} className="stroke-[2.5]" />
          </a>
        </div>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden w-10 h-10 rounded-full flex items-center justify-center liquid-glass-border text-[#C9CDD3] hover:text-[#F5F5F2] transition-colors"
          style={{ background: 'rgba(201, 205, 211, 0.05)' }}
        >
          {isOpen ? <X size={18} /> : <Menu size={18} />}
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
            className="lg:hidden mt-2 p-5 rounded-2xl liquid-glass border border-white/10 flex flex-col gap-3"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
                className="text-sm font-medium text-[#C9CDD3] hover:text-[#F5F5F2] py-2 transition-colors border-b border-white/5 font-body"
              >
                {link.name}
              </a>
            ))}
            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); scrollTo('#contact'); }}
              className="mt-2 w-full text-center py-3 bg-[#F5F5F2] text-[#0A0A0B] rounded-full text-xs font-semibold tracking-wider uppercase inline-flex items-center justify-center gap-2 font-body"
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
