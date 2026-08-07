import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Mail, ExternalLink } from 'lucide-react';

export const CALENDLY_URL = "https://calendly.com/shwetdutta/30min";
export const DIRECT_EMAIL = "agencigrowofficial@gmail.com";

// Global helper function to trigger the modal from anywhere in the app
export const openBookingModal = () => {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('open-booking-modal'));
  }
};

interface CalendlyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CalendlyModal: React.FC<CalendlyModalProps> = ({ isOpen, onClose }) => {
  // Prevent body scrolling when modal is open
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

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto">
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md cursor-pointer"
          />

          {/* Modal Card Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-4xl bg-[#121215] border border-white/15 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden z-10 flex flex-col max-h-[92vh] text-white"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 sm:px-8 sm:py-5 border-b border-white/10 bg-[#16161a]">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-white/10 border border-white/15 flex items-center justify-center text-white">
                  <Calendar className="w-4 h-4 stroke-[2]" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-body font-medium text-white tracking-tight leading-snug">
                    Schedule a Discovery Call
                  </h3>
                  <p className="text-xs font-body text-gray-400 font-light hidden sm:block">
                    30-min strategy session with AgenciGrow
                  </p>
                </div>
              </div>

              {/* Close Button */}
              <button
                onClick={onClose}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white flex items-center justify-center transition-all duration-200 cursor-pointer"
                aria-label="Close booking modal"
              >
                <X className="w-5 h-5 stroke-[2]" />
              </button>
            </div>

            {/* Modal Body - Embedded Calendly Iframe */}
            <div className="relative w-full flex-1 bg-[#0A0A0B] min-h-[500px] sm:min-h-[580px] overflow-hidden">
              <iframe
                src={`${CALENDLY_URL}?hide_landing_page_details=1&hide_gdpr_banner=1&background_color=0a0a0b&text_color=ffffff&primary_color=ffffff`}
                width="100%"
                height="100%"
                className="w-full h-full border-0 min-h-[520px] sm:min-h-[600px]"
                title="Schedule a Call with AgenciGrow"
              />
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-3.5 sm:px-8 border-t border-white/10 bg-[#16161a] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-body text-gray-400">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                AgenciGrow Growth Systems
              </span>

              <a
                href={`mailto:${DIRECT_EMAIL}`}
                className="inline-flex items-center gap-1.5 text-gray-300 hover:text-white transition-colors underline-offset-4 hover:underline"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Prefer email? {DIRECT_EMAIL}</span>
                <ExternalLink className="w-3 h-3 opacity-60" />
              </a>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CalendlyModal;
