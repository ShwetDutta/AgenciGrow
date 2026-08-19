import React, { useState, useEffect } from 'react';
import { X, ArrowUpRight, Menu } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { MetallicLogo } from './MetallicLogo';
import { openBookingModal } from './CalendlyModal';

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Process', href: '#process' },
    { name: 'Work', href: '#work' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Contact', href: '#contact' },
  ];

  const fullNavLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Process', href: '#process' },
    { name: 'Work', href: '#work' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Contact', href: '#contact' },
  ];

  const socialLinks = [
    { name: 'Instagram', href: 'https://www.instagram.com/agencigrow?igsh=Mzh2cTVvejh1Y25x' },
    { name: 'LinkedIn', href: 'https://www.linkedin.com/company/agencigrow/?viewAsMember=true' },
    { name: 'Email', href: 'mailto:shwetdutta29@gmail.com' },
    { name: 'WhatsApp', href: 'https://wa.me/' },
  ];

  const scrollTo = (href: string) => {
    setIsMobileMenuOpen(false);
    if (href === '#contact' || href === '#booking') {
      openBookingModal();
      return;
    }
    if (href === '#hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const id = href.replace('#', '');
    const el = document.getElementById(id);
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
    <>
      {/* Clean Editorial Desktop & Mobile Fixed Navbar Header */}
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 border-b border-white/10 ${
          isScrolled
            ? 'bg-black/90 backdrop-blur-md py-3 sm:py-4'
            : 'bg-black/70 backdrop-blur-sm py-4 sm:py-5 lg:py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 flex items-center justify-between">
          {/* Logo / Wordmark */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2 group hover:opacity-90 transition-opacity duration-200 z-50 min-h-[44px] min-w-[44px]"
            aria-label="AgenciGrow Home"
          >
            <MetallicLogo size="sm" />
          </a>

          {/* Center Navigation Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-5 lg:gap-9 xl:gap-10 font-body">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo(link.href);
                }}
                className="text-xs uppercase tracking-[0.18em] text-gray-400 hover:text-white transition-colors duration-200 font-medium cursor-pointer py-2"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right CTA Button (Desktop) */}
          <div className="hidden md:flex items-center">
            <button
              onClick={openBookingModal}
              className="inline-flex items-center gap-2 px-5 lg:px-6 py-2.5 lg:py-3 bg-white text-black hover:bg-gray-200 text-xs font-semibold font-body uppercase tracking-wider rounded-full transition-all duration-300 shadow-xl cursor-pointer hover:scale-[1.02] group min-h-[44px]"
            >
              <span>BOOK A CALL</span>
              <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>

          {/* Mobile Actions: CTA + Menu Toggle */}
          <div className="md:hidden flex items-center gap-2.5">
            <button
              onClick={openBookingModal}
              className="inline-flex items-center gap-1 px-3.5 py-2 bg-white text-black text-[11px] font-semibold font-body uppercase tracking-wider rounded-full min-h-[44px] cursor-pointer"
            >
              <span>CALL</span>
              <ArrowUpRight className="w-3 h-3 stroke-[2.5]" />
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="flex items-center justify-center gap-1.5 text-xs font-mono uppercase tracking-widest text-gray-300 hover:text-white px-3.5 py-2 rounded-full border border-white/20 bg-white/5 cursor-pointer transition-colors min-h-[44px] min-w-[44px]"
              aria-label="Toggle Navigation Menu"
            >
              <span>{isMobileMenuOpen ? 'CLOSE' : 'MENU'}</span>
              {isMobileMenuOpen ? (
                <X className="w-4 h-4" />
              ) : (
                <Menu className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Full-Screen Editorial Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[100] bg-[#000000] text-[#F5F5F2] flex flex-col justify-between p-5 sm:p-8 lg:p-16 overflow-y-auto"
          >
            {/* Overlay Top Bar */}
            <div className="flex items-center justify-between pb-4 sm:pb-6 border-b border-white/10 max-w-7xl mx-auto w-full">
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setIsMobileMenuOpen(false);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="flex items-center gap-2 min-h-[44px]"
              >
                <span className="text-xl sm:text-2xl font-body font-normal text-white tracking-tight">
                  AgenciGrow<span className="text-gray-500 font-light">.</span>
                </span>
              </a>

              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-11 h-11 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 transition-colors cursor-pointer min-w-[44px] min-h-[44px]"
                aria-label="Close Navigation Menu"
              >
                <X className="w-5 h-5 stroke-[2]" />
              </button>
            </div>

            {/* Overlay Navigation Body */}
            <div className="max-w-7xl mx-auto w-full my-auto py-6 sm:py-8 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              
              {/* Left Side: Brand Tagline & Social Connections */}
              <div className="md:col-span-5 space-y-6 hidden sm:block">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-gray-500 block mb-2">
                    AGENCIGROW
                  </span>
                  <p className="text-sm sm:text-base lg:text-lg font-body font-light text-gray-300 leading-snug">
                    Predictable revenue systems & high-converting acquisition infrastructure.
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 space-y-2">
                  <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-gray-500 block mb-2">
                    CONNECT
                  </span>
                  <div className="flex flex-col space-y-2 font-body">
                    {socialLinks.map((social) => (
                      <a
                        key={social.name}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-gray-400 hover:text-white transition-colors inline-flex items-center gap-1.5 w-fit min-h-[36px]"
                      >
                        <span>{social.name}</span>
                        <ArrowUpRight className="w-3.5 h-3.5 opacity-50" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Side / Mobile Center: Vertically Stacked Editorial Links */}
              <div className="md:col-span-7 flex flex-col space-y-2 sm:space-y-4">
                {fullNavLinks.map((link, index) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollTo(link.href);
                    }}
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.25, delay: index * 0.03 }}
                    className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-serif font-normal uppercase tracking-tight text-white hover:text-gray-400 transition-colors block cursor-pointer py-1.5 min-h-[44px] flex items-center"
                  >
                    {link.name}
                  </motion.a>
                ))}
              </div>

            </div>

            {/* Overlay Footer & Primary CTA */}
            <div className="max-w-7xl mx-auto w-full pt-4 sm:pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  openBookingModal();
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white text-black hover:bg-gray-200 text-xs font-semibold font-body uppercase tracking-wider rounded-full transition-all duration-200 cursor-pointer shadow-lg min-h-[48px]"
              >
                <span>BOOK A CALL</span>
                <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
              </button>

              <span className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-gray-500 text-center sm:text-left">
                © 2026 AGENCIGROW. ALL RIGHTS RESERVED.
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
