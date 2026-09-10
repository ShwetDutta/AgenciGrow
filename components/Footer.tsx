import React, { useState } from 'react';
import { ArrowUpRight, X } from 'lucide-react';
import { openBookingModal } from './CalendlyModal';

const Footer: React.FC = () => {
  const [activeModal, setActiveModal] = useState<'privacy' | 'terms' | null>(null);

  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      id="contact"
      className="relative w-full bg-[#0A0A0A] text-[#EDEDED] rounded-t-[28px] sm:rounded-t-[36px] border-t border-white/10 overflow-hidden select-none shadow-2xl p-5 sm:p-10 lg:p-14 -mt-6 sm:-mt-8 z-10"
    >
      <div className="w-full max-w-[1440px] mx-auto flex flex-col justify-between min-h-[60vh] sm:min-h-[70vh]">
        
        {/* Top Tagline */}
        <div className="flex items-center justify-between pb-6 text-xs font-sans text-neutral-400">
          <span>Inquiries & Partnerships</span>
          <span className="font-mono text-xs uppercase tracking-widest text-neutral-500">
            [ ACCEPTING SELECT CLIENTS ]
          </span>
        </div>

        {/* Massive Headline & Billboard Grid */}
        <div className="my-auto py-8 sm:py-12 lg:py-16 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-7 flex flex-col justify-center">
            <h2 className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-[4.5rem] xl:text-[5.4rem] 2xl:text-[6.2rem] font-sans font-normal text-white leading-[0.96] tracking-tight">
              Drop us a line<br />
              if you want to collab.
            </h2>

            <div className="mt-8 sm:mt-12 flex flex-wrap items-center gap-4 sm:gap-6">
              <button
                onClick={openBookingModal}
                className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white text-black hover:bg-neutral-200 text-xs sm:text-sm font-sans font-medium uppercase tracking-wider transition-colors cursor-pointer min-h-[44px]"
              >
                <span>Reserve a Consultation</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>

              <a
                href="mailto:shwetdutta29@gmail.com"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-white/25 text-white hover:bg-white/10 text-xs sm:text-sm font-sans tracking-wider transition-colors min-h-[44px]"
              >
                <span>shwetdutta29@gmail.com</span>
              </a>
            </div>
          </div>

          {/* Right: Billboard AgenciGrow Image */}
          <div className="lg:col-span-5 flex items-center justify-center lg:justify-end">
            <div className="relative w-full max-w-[520px] rounded-2xl overflow-hidden border border-white/15 bg-neutral-900 shadow-2xl group">
              <img
                src="/Photos/billboard-agencigrow.png"
                alt="AgenciGrow Billboard"
                className="w-full h-auto object-cover block group-hover:scale-[1.02] transition-transform duration-700 ease-out"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>

        {/* Bottom Swiss Meta Grid (Exact Reference Video 00:13 Style: Hairline Rule + Left / Center / Right Columns) */}
        <div className="w-full">
          {/* Hairline Rule */}
          <div className="w-full border-b border-white/15 mb-6 sm:mb-8" />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-start sm:items-end text-xs font-sans text-neutral-400">
            
            {/* Left: Copyright */}
            <div className="space-y-1">
              <span className="text-neutral-500 block">Copyright 2026</span>
              <span className="text-white block font-medium">AgenciGrow®</span>
            </div>

            {/* Center: Location & Founder */}
            <div className="space-y-1 sm:text-center">
              <span className="text-neutral-500 block">Location & Philosophy</span>
              <span className="text-white block">Chennai • Direct Founder Execution</span>
            </div>

            {/* Right: Socials & Policies */}
            <div className="space-y-1 sm:text-right flex flex-col sm:items-end">
              <div className="flex items-center gap-4 text-white">
                <a
                  href="https://www.instagram.com/agencigrow?igsh=Mzh2cTVvejh1Y25x"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-neutral-400 transition-colors"
                >
                  Instagram ↗
                </a>
                <a
                  href="https://www.linkedin.com/company/agencigrow/?viewAsMember=true"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-neutral-400 transition-colors"
                >
                  LinkedIn ↗
                </a>
              </div>
              <div className="flex items-center gap-3 text-[11px] text-neutral-500 pt-1">
                <button
                  onClick={() => setActiveModal('privacy')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Privacy
                </button>
                <span>•</span>
                <button
                  onClick={() => setActiveModal('terms')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Terms
                </button>
                <span>•</span>
                <a
                  href="#"
                  onClick={scrollToTop}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Top ↑
                </a>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* Modal for Privacy Policy / Terms */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#141414] border border-white/15 rounded-xl p-6 sm:p-8 max-w-xl w-full text-white relative shadow-2xl">
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-4 right-4 text-neutral-400 hover:text-white p-2 min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer"
            >
              <X size={20} />
            </button>
            <h3 className="text-xl sm:text-2xl font-serif mb-4">
              {activeModal === 'privacy' ? 'Privacy Policy' : 'Terms & Conditions'}
            </h3>
            <div className="text-xs sm:text-sm text-neutral-300 space-y-3 max-h-80 sm:max-h-96 overflow-y-auto pr-2 font-sans font-light leading-relaxed">
              {activeModal === 'privacy' ? (
                <>
                  <p>AgenciGrow respects your privacy. We collect minimal information required to deliver growth services, handle client inquiries, and optimize campaign performance.</p>
                  <p>Your data is never sold to third parties. Information provided via forms or calendar scheduling is stored securely and used exclusively for partner communications.</p>
                </>
              ) : (
                <>
                  <p>By using the AgenciGrow website and engaging our services, you agree to our standard partner terms and retainer scope agreements.</p>
                  <p>All client strategies, custom web builds, and automation workflows are governed by individual master service agreements tailored to your specific engagement.</p>
                </>
              )}
            </div>
            <button
              onClick={() => setActiveModal(null)}
              className="mt-6 px-6 py-2.5 bg-white text-black font-mono font-medium rounded-full text-xs uppercase tracking-wider hover:bg-neutral-200 transition-colors min-h-[44px] cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}

    </footer>
  );
};

export default Footer;
