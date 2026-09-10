import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { openBookingModal } from './CalendlyModal';

interface SwissMenuModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SwissMenuModal: React.FC<SwissMenuModalProps> = ({ isOpen, onClose }) => {
  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const navLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'Services', href: '#services' },
    { name: 'About', href: '#about' },
    { name: 'Process', href: '#process' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleNavigate = (href: string) => {
    onClose();
    if (href === '#contact') {
      // Small timeout so modal animation completes smoothly before booking opens
      setTimeout(() => {
        openBookingModal();
      }, 150);
      return;
    }

    if (href === '#hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) {
      const offset = 60;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          onClick={onClose}
          className="fixed inset-0 z-[9999] bg-neutral-900/75 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 lg:p-10 select-none"
        >
          {/* Floating Swiss Card matching SwissAgency-3 reference image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 14 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 14 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-5xl h-[86vh] max-h-[780px] min-h-[480px] bg-[#000000] text-white rounded-2xl sm:rounded-3xl border border-white/20 p-6 sm:p-10 lg:p-12 flex flex-col justify-between shadow-[0_30px_90px_rgba(0,0,0,0.85)] overflow-hidden"
          >
            {/* Top Bar matching reference: Left Brand • Center Agency Type • Right Close */}
            <div className="w-full">
              <div className="flex items-center justify-between pb-3.5 sm:pb-4 text-xs sm:text-sm font-sans tracking-tight text-white">
                <span className="font-normal text-white tracking-tight">AgenciGrow®</span>
                <span className="font-normal text-neutral-400">Boutique Agency</span>
                <button
                  onClick={onClose}
                  className="font-normal text-white hover:text-neutral-400 transition-colors cursor-pointer py-1 px-1 tracking-tight"
                  aria-label="Close menu"
                >
                  Close
                </button>
              </div>

              {/* Hairline Rule */}
              <div className="w-full border-b border-white/20" />
            </div>

            {/* Generous Swiss Negative Space in the middle */}
            <div className="flex-1 min-h-[40px] sm:min-h-[80px]" />

            {/* Bottom Stacked Typographic Rows matching reference */}
            <div className="w-full">
              <div className="w-full divide-y divide-white/20 border-t border-b border-white/20">
                {navLinks.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => handleNavigate(item.href)}
                    className="w-full text-left py-3 sm:py-4 lg:py-5 group flex items-center justify-between cursor-pointer transition-colors"
                  >
                    <span className="text-3xl sm:text-5xl lg:text-6xl font-sans font-normal tracking-tight text-white group-hover:text-neutral-400 transition-colors">
                      {item.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SwissMenuModal;
