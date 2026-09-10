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

const Navbar: React.FC<NavbarProps> = ({ theme = 'dark' }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleOpen = () => setIsMenuOpen(true);
    window.addEventListener('open-nav-menu', handleOpen);
    return () => window.removeEventListener('open-nav-menu', handleOpen);
  }, []);

  const isLight = theme === 'light';

  return (
    <>
      {/* Swiss Sticky Top Bar (Left Brand • Center Boutique Agency • Right Menu) */}
      <header
        className={`sticky top-0 z-40 w-full px-5 sm:px-10 lg:px-14 py-3 sm:py-3.5 select-none transition-colors ${
          isLight
            ? 'bg-[#E5E3DD]/95 backdrop-blur-md text-[#111111] border-b border-black/10 shadow-sm'
            : 'bg-[#0A0A0A] text-[#EDEDED] border-b border-white/10 shadow-md'
        }`}
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
              className={`text-xs sm:text-sm font-sans tracking-tight transition-colors font-medium ${
                isLight ? 'text-[#111111] hover:text-neutral-600' : 'text-white hover:text-neutral-300'
              }`}
            >
              <span>AgenciGrow®</span>
            </a>
          </div>

          {/* Center Agency Type */}
          <div className={`text-xs font-sans tracking-tight ${isLight ? 'text-neutral-500' : 'text-neutral-400'}`}>
            Boutique Agency
          </div>

          {/* Right Menu & Booking Actions */}
          <div className="flex items-center gap-3 sm:gap-5">
            <button
              onClick={openBookingModal}
              className={`hidden md:inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer ${
                isLight ? 'text-neutral-700 hover:text-black' : 'text-neutral-300 hover:text-white'
              }`}
            >
              <span>Book Call</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => setIsMenuOpen(true)}
              className={`text-xs sm:text-sm font-sans tracking-tight transition-colors cursor-pointer min-h-[36px] px-2 flex items-center ${
                isLight ? 'text-[#111111] hover:text-neutral-600' : 'text-white hover:text-neutral-300'
              }`}
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
