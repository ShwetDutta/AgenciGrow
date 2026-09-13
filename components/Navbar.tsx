import React, { useState, useEffect } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { openBookingModal } from './CalendlyModal';
import SwissMenuModal from './SwissMenuModal';

export const openNavMenu = () => {
  window.dispatchEvent(new CustomEvent('open-nav-menu'));
};

interface NavbarProps {
  theme?: 'dark' | 'light';
}

export const Navbar: React.FC<NavbarProps> = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleOpen = () => setIsMenuOpen(true);
    window.addEventListener('open-nav-menu', handleOpen);
    return () => window.removeEventListener('open-nav-menu', handleOpen);
  }, []);

  return (
    <>
      {/* Permanent Fixed Top Bar: Sticky in one place from Hero to Footer */}
      <header
        className="fixed top-0 left-0 right-0 z-[100] w-full px-5 sm:px-10 lg:px-14 py-3.5 select-none bg-[#07080a]/90 backdrop-blur-md text-[#EDEDED] border-b border-white/10 shadow-lg transition-colors"
      >
        <div className="w-full max-w-[1440px] mx-auto flex items-center justify-between">
          
          {/* Left Brand Wordmark */}
          <div className="flex items-center gap-2">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-xs sm:text-sm font-sans tracking-tight text-white hover:text-neutral-300 transition-colors font-medium"
            >
              <span>AgenciGrow®</span>
            </a>
          </div>

          {/* Center Agency Type */}
          <div className="text-xs font-sans tracking-tight text-neutral-400">
            Boutique Agency
          </div>

          {/* Right Menu & Booking Actions */}
          <div className="flex items-center gap-4 sm:gap-6">
            <button
              onClick={openBookingModal}
              className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-neutral-300 hover:text-white transition-colors cursor-pointer"
            >
              <span>BOOK CALL</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => setIsMenuOpen(true)}
              className="text-xs sm:text-sm font-sans tracking-tight text-white hover:text-neutral-300 transition-colors cursor-pointer min-h-[36px] px-1 flex items-center font-medium"
              aria-label="Open Navigation Menu"
            >
              Menu
            </button>
          </div>

        </div>
      </header>

      {/* Expanded Swiss Card Navigation Modal */}
      <SwissMenuModal
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
      />
    </>
  );
};

export default Navbar;
