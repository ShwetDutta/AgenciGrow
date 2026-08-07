import React, { useState, useEffect } from 'react';
import { Plus, X, ArrowUpRight, Menu, Minus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { MetallicLogo } from './MetallicLogo';
import { openBookingModal } from './CalendlyModal';

const Navbar: React.FC = () => {
  const [isHeroCardOpen, setIsHeroCardOpen] = useState(false);
  const [isFullMenuOpen, setIsFullMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setIsScrolled(true);
        setIsHeroCardOpen(false); // Close hero card when scrolling down
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    { name: 'LinkedIn', href: 'https://www.linkedin.com' },
    { name: 'Email', href: 'mailto:shwetdutta29@gmail.com' },
    { name: 'WhatsApp', href: 'https://wa.me/' },
  ];

  const scrollTo = (href: string) => {
    setIsHeroCardOpen(false);
    setIsFullMenuOpen(false);
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
      {/* Outer Fixed Header Layer */}
      <header className="fixed top-0 inset-x-0 z-50 pointer-events-none p-4 sm:p-6 md:p-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between relative">
          
          {/* Top Left Logo (Visible when NOT scrolled) */}
          <AnimatePresence>
            {!isScrolled && (
              <motion.a
                href="#"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                onClick={(e) => {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="pointer-events-auto flex items-center gap-2 group hover:opacity-90 transition-opacity duration-200 z-50"
              >
                <MetallicLogo size="sm" />
              </motion.a>
            )}
          </AnimatePresence>

          {/* Top Right Action Area */}
          <div className="pointer-events-auto ml-auto flex items-center gap-4 relative z-50">
            {/* Separate "Book a Call" CTA Button (Visible at top when NOT scrolled) */}
            <AnimatePresence>
              {!isScrolled && (
                <motion.button
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  onClick={openBookingModal}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-white hover:bg-gray-200 text-black rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-300 shadow-xl font-body cursor-pointer transform hover:scale-[1.03]"
                >
                  <span>Book a call</span>
                  <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
                </motion.button>
              )}
            </AnimatePresence>

            {/* Floating Top-Right Circular + / X Button (Appears ONLY when scrolled OR when full menu is open) */}
            <AnimatePresence>
              {(isScrolled || isFullMenuOpen) && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.6, rotate: -45 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 0.6, rotate: 45 }}
                  transition={{ duration: 0.3, ease: 'backOut' }}
                  onClick={() => setIsFullMenuOpen(!isFullMenuOpen)}
                  className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white text-black flex items-center justify-center flex-shrink-0 hover:scale-110 transition-transform duration-300 shadow-2xl focus:outline-none cursor-pointer"
                  aria-label={isFullMenuOpen ? 'Close Menu' : 'Open Menu'}
                  title={isFullMenuOpen ? 'Close Menu' : 'Menu'}
                >
                  {isFullMenuOpen ? (
                    <X className="w-6 h-6 sm:w-7 sm:h-7 stroke-[2.5] transition-transform duration-300" />
                  ) : (
                    <Plus className="w-6 h-6 sm:w-7 sm:h-7 stroke-[2.5] transition-transform duration-300" />
                  )}
                </motion.button>
              )}
            </AnimatePresence>
          </div>

        </div>

        {/* Dead-Center Floating Hero Navbar & Expanded Dropdown Card */}
        <AnimatePresence>
          {!isScrolled && (
            <motion.div
              initial={{ opacity: 0, y: -20, x: "-50%", scale: 0.95 }}
              animate={{ opacity: 1, y: 0, x: "-50%", scale: 1 }}
              exit={{ opacity: 0, y: -20, x: "-50%", scale: 0.95 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="pointer-events-auto fixed left-1/2 top-4 sm:top-6 md:top-8 z-50 w-[90%] max-w-xs sm:max-w-sm md:max-w-md"
            >
              {!isHeroCardOpen ? (
                /* Collapsed Hero Pill Navbar */
                <button
                  onClick={() => setIsHeroCardOpen(true)}
                  className="w-full flex items-center justify-between gap-10 sm:gap-14 px-6 sm:px-8 py-3 rounded-full bg-[#18181b]/85 backdrop-blur-xl border border-white/15 shadow-2xl hover:border-white/30 hover:bg-[#202024]/90 transition-all duration-300 cursor-pointer group text-left"
                  title="Open Navigation Menu"
                >
                  <span className="text-sm sm:text-base font-body font-normal text-white tracking-tight">
                    AgenciGrow<span className="text-gray-400 font-light">.</span>
                  </span>

                  <div className="flex items-center justify-center text-white/80 group-hover:text-white transition-colors">
                    <Menu className="w-5 h-5 stroke-[1.75]" />
                  </div>
                </button>
              ) : (
                /* Expanded Floating Menu Card */
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.96 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  className="w-full rounded-3xl bg-[#141416]/95 backdrop-blur-2xl border border-white/15 shadow-2xl overflow-hidden text-white flex flex-col"
                >
                  {/* Header Row */}
                  <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
                    <span className="text-base sm:text-lg font-body font-normal text-white tracking-tight">
                      AgenciGrow<span className="text-gray-400 font-light">.</span>
                    </span>

                    <button
                      onClick={() => setIsHeroCardOpen(false)}
                      className="p-1 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                      aria-label="Collapse Menu"
                    >
                      <Minus className="w-5 h-5 stroke-[2]" />
                    </button>
                  </div>

                  {/* Nav Links List */}
                  <div className="divide-y divide-white/10 font-body">
                    {navLinks.map((link) => (
                      <a
                        key={link.name}
                        href={link.href}
                        onClick={(e) => {
                          e.preventDefault();
                          scrollTo(link.href);
                        }}
                        className="px-6 py-3.5 text-base sm:text-lg font-normal text-white hover:text-gray-300 hover:bg-white/5 transition-colors block cursor-pointer"
                      >
                        {link.name}
                      </a>
                    ))}
                  </div>

                  {/* Bottom CTA Buttons Row */}
                  <div className="p-4 sm:p-5 grid grid-cols-2 gap-3 border-t border-white/10 bg-black/40">
                    <a
                      href="#contact"
                      onClick={(e) => {
                        e.preventDefault();
                        scrollTo('#contact');
                      }}
                      className="py-3 px-3 sm:px-4 bg-white hover:bg-gray-200 text-black font-semibold text-[11px] sm:text-xs tracking-wider uppercase rounded-xl text-center font-body shadow-md transition-all duration-200 flex items-center justify-center cursor-pointer"
                    >
                      Schedule a Call
                    </a>
                    <a
                      href="#contact"
                      onClick={(e) => {
                        e.preventDefault();
                        scrollTo('#contact');
                      }}
                      className="py-3 px-3 sm:px-4 bg-white/10 hover:bg-white/20 text-white border border-white/15 font-semibold text-[11px] sm:text-xs tracking-wider uppercase rounded-xl text-center font-body transition-all duration-200 flex items-center justify-center cursor-pointer"
                    >
                      Start a Project
                    </a>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Fullscreen Full-Bleed Menu Overlay (Triggered when scrolled and + button is clicked) */}
      <AnimatePresence>
        {isFullMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="fixed inset-0 z-40 bg-[#0A0A0B] text-white flex flex-col justify-between p-8 sm:p-14 lg:p-20 overflow-y-auto"
          >
            {/* Top Spacer to clear header height */}
            <div className="h-16 sm:h-20" />

            {/* Main Full-Screen Layout */}
            <div className="max-w-7xl mx-auto w-full my-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
              
              {/* Left Side: Brand Statement & Socials */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="lg:col-span-5 flex flex-col justify-between space-y-8"
              >
                <div>
                  <span className="text-xs font-mono uppercase tracking-widest text-gray-500 block mb-3">
                    AgenciGrow
                  </span>
                  <p className="text-xl sm:text-2xl md:text-3xl font-body font-light text-gray-300 leading-snug tracking-[-0.02em]">
                    Predictable revenue systems & high-converting acquisition infrastructure.
                  </p>
                </div>

                {/* Quick CTA Actions */}
                <div className="flex flex-wrap gap-4 pt-2">
                  <a
                    href="#contact"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollTo('#contact');
                    }}
                    className="px-6 py-3 bg-white text-black hover:bg-gray-200 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 shadow-lg font-body inline-flex items-center gap-2"
                  >
                    <span>Schedule a Call</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                  <a
                    href="#contact"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollTo('#contact');
                    }}
                    className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 font-body inline-flex items-center gap-2 border border-white/10"
                  >
                    <span>Start a Project</span>
                  </a>
                </div>

                {/* Social Links */}
                <div className="pt-6 border-t border-white/10 space-y-3">
                  <span className="text-xs font-mono uppercase tracking-widest text-gray-500 block mb-2">
                    Connect
                  </span>
                  <div className="flex flex-col space-y-2">
                    {socialLinks.map((social) => (
                      <a
                        key={social.name}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-lg sm:text-xl font-body text-gray-400 hover:text-white transition-colors duration-200 inline-flex items-center gap-2 group w-fit"
                      >
                        <span>{social.name}</span>
                        <ArrowUpRight className="w-4 h-4 opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" />
                      </a>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Right Side: Large Display Navigation Links */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.15 }}
                className="lg:col-span-7 flex flex-col items-start lg:items-end space-y-3 sm:space-y-4"
              >
                {fullNavLinks.map((link, index) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollTo(link.href);
                    }}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 + index * 0.04 }}
                    className="text-3xl sm:text-5xl md:text-6xl font-body font-normal text-white hover:text-gray-400 transition-colors duration-200 tracking-[-0.03em] leading-tight block cursor-pointer group"
                  >
                    <span className="inline-block group-hover:translate-x-2 transition-transform duration-300">
                      {link.name}
                    </span>
                  </motion.a>
                ))}
              </motion.div>
            </div>

            {/* Bottom Footer Info */}
            <div className="max-w-7xl mx-auto w-full pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-gray-500 gap-4">
              <span>© {new Date().getFullYear()} AgenciGrow. All Rights Reserved.</span>
              <span>Growth Systems Engineering</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
