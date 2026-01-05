import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Logo = () => (
  <div className="flex items-center gap-2 group cursor-pointer select-none">
    <div className="flex items-center">
      <span className="text-2xl font-extrabold tracking-tight">
        <span style={{ color: '#00D094' }}>Agenci</span>
        <span className="text-[#F8FAFC]">Grow</span>
      </span>
      <div className="ml-1 flex items-center translate-y-[2px]">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M13 11L18 6M18 6H13M18 6V11" stroke="#00D094" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M7 17L12 12M12 12H7M12 12V17" stroke="#00D094" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.6"/>
        </svg>
      </div>
    </div>
  </div>
);

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  const navLinks = [
    { name: 'Services', href: '#services' },
    { name: 'About', href: '#about' },
    { name: 'Results', href: '#case-studies' },
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
    <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
      scrolled || isOpen ? 'nav-glass py-4' : 'bg-transparent py-8'
    }`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex justify-between items-center relative z-[110]">
        <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
          <Logo />
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-12">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
              className={`text-[11px] font-black uppercase tracking-[0.2em] transition-all hover:translate-y-[-1px] ${
                scrolled ? 'text-[#94A3B8] hover:text-[#00D094]' : 'text-[#F8FAFC]/70 hover:text-[#00D094]'
              }`}
            >
              {link.name}
            </a>
          ))}
          <a
            href="#booking"
            onClick={(e) => { e.preventDefault(); scrollTo('#booking'); }}
            className={`px-8 py-3 rounded-sm text-[11px] font-black uppercase tracking-[0.15em] transition-all shadow-lg ${
              scrolled 
                ? 'bg-[#00D094] text-[#0F172A] hover:bg-white hover:text-[#0F172A]' 
                : 'bg-[#00D094] text-[#0F172A] hover:bg-[#F8FAFC]'
            }`}
          >
            Book Strategy Call
          </a>
        </div>

        {/* Mobile Toggle Button */}
        <button 
          onClick={() => setIsOpen(!isOpen)} 
          className="md:hidden p-2 text-[#F8FAFC] hover:text-[#00D094] transition-colors"
          aria-label="Toggle Menu"
        >
          {isOpen ? <X size={32} /> : <Menu size={32} />}
        </button>
      </div>

      {/* Full Screen Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden fixed inset-0 bg-[#0F172A] z-[90] h-screen w-screen flex flex-col justify-center items-center overflow-y-auto px-6"
          >
            <div className="flex flex-col items-center gap-10 py-20">
              {navLinks.map((link, idx) => (
                <motion.a
                  key={link.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  href={link.href}
                  className="text-4xl text-[#F8FAFC] font-black tracking-tighter hover:text-[#00D094] transition-colors"
                  onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
                >
                  {link.name}
                </motion.a>
              ))}
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.05 }}
                className="mt-6"
              >
                <a
                  href="#booking"
                  className="px-10 py-5 bg-[#00D094] text-[#0F172A] font-black text-lg rounded-sm shadow-2xl hover:bg-white transition-all uppercase tracking-widest"
                  onClick={(e) => { e.preventDefault(); scrollTo('#booking'); }}
                >
                  Book Strategy Call
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;