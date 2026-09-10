import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Manifesto from './components/Manifesto';
import Services from './components/Services';
import RevenueArchitecture from './components/RevenueArchitecture';
import WhoWeAre from './components/WhoWeAre';
import WhatWeBelieve from './components/WhatWeBelieve';
import Process from './components/Process';
import FAQ from './components/FAQ';
import ClosingTicker from './components/ClosingTicker';
import Footer from './components/Footer';
import CalendlyModal from './components/CalendlyModal';

const App: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress(window.scrollY / totalHeight);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleOpenModal = () => setIsBookingOpen(true);
    window.addEventListener('open-booking-modal', handleOpenModal);
    return () => window.removeEventListener('open-booking-modal', handleOpenModal);
  }, []);

  return (
    <div className="min-h-screen bg-[#07080a] text-[#111111] selection:bg-[#111111] selection:text-[#FFFFFF] w-full overflow-x-clip flex flex-col items-center">
      
      {/* Top Precision Scroll Progress Bar */}
      <div 
        className="fixed top-0 left-0 right-0 h-[2px] bg-white/10 z-[9999] pointer-events-none"
      >
        <div 
          className="h-full bg-white origin-left transition-transform duration-75"
          style={{ transform: `scaleX(${scrollProgress})` }}
        />
      </div>

      {/* Global Calendly Consultation Modal */}
      <CalendlyModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
      />

      {/* ====================================================================
          1. HERO SECTION: FULLSCREEN SCALE-DOWN ON SCROLL
          - Starts at 100vw and 100vh with high-resolution editorial visual.
          - As user scrolls, it scales down smoothly (1.0 -> 0.70), corners round up
            (0px -> 40px), and dims to create spatial depth.
          ==================================================================== */}
      <Hero />

      {/* ====================================================================
          2. MANIFESTO SECTION: FULLSCREEN SCALE-DOWN ON SCROLL
          - z-index: 20 places it directly above the shrinking hero (-mt-[100vh]).
          - As user scrolls down, it scales down smoothly (1.0 -> 0.70), corners round up
            (0px -> 40px), and creates the exact same shrink and reveal effect.
          ==================================================================== */}
      <Manifesto />

      {/* ====================================================================
          3. SERVICES CANVAS: SELECTED PROJECTS
          - z-index: 30 places it directly above the shrinking Manifesto section.
          - -mt-[100vh] seamlessly overlaps the receding Manifesto card as user scrolls.
          - rounded-t-[36px] sm:rounded-t-[48px] provides the physical card overlap.
          - Houses the light Navbar and the 6 Services entries.
          ==================================================================== */}
      <div className="relative z-30 w-full bg-[#E5E3DD] text-[#111111] rounded-t-[36px] sm:rounded-t-[48px] -mt-[100vh] border-t border-black/15 shadow-[0_-35px_90px_rgba(0,0,0,0.85)] flex flex-col items-center">
        {/* Sticky Top Control Bar inside the beige canvas */}
        <Navbar theme="light" />

        <div className="w-full">
          {/* Services Section: Exact Selected Projects sequence */}
          <Services />
        </div>
      </div>

      {/* ====================================================================
          4. REVENUE ARCHITECTURE: THE 6TH SERVICE WITH HERO SHRINK & REVEAL
          - Pinned sticky 200vh track in dark #07080a space.
          - The 6th Service "Revenue Architecture" seamlessly docks and scales down
            (1.0 -> 0.72) with rounded corners (0px -> 40px) and deep elevation shadow.
          ==================================================================== */}
      <RevenueArchitecture />

      {/* ====================================================================
          5. WHO WE ARE: CHAPTER 01 WITH HERO SHRINK EFFECT
          - Sits at z-40, reveals over RevenueArchitecture with -mt-[100vh].
          - Scales down (1.0 -> 0.72) with rounded corners and elevation shadow.
          ==================================================================== */}
      <WhoWeAre />

      {/* ====================================================================
          6. WHAT WE BELIEVE & FAQ CANVAS: CHAPTER 02 (THE REVEAL)
          - z-index: 50 places it directly above the shrinking Who We Are card.
          - -mt-[100vh] seamlessly overlaps the receding card as user scrolls.
          - rounded-t-[36px] sm:rounded-t-[48px] creates physical card reveal.
          - Houses What We Believe, FAQ, Ticker, and Footer.
          ==================================================================== */}
      <div className="relative z-50 w-full bg-[#E5E3DD] text-[#111111] rounded-t-[36px] sm:rounded-t-[48px] -mt-[100vh] border-t border-black/15 shadow-[0_-35px_90px_rgba(0,0,0,0.85)] flex flex-col items-center">
        {/* Sticky Top Control Bar inside the beige canvas */}
        <Navbar theme="light" />

        <main className="flex-grow flex flex-col w-full px-5 sm:px-10 lg:px-14 pt-6 sm:pt-8">
          {/* Chapter 02: What We Believe */}
          <WhatWeBelieve />

          {/* Chapter 03: Process / How We Work */}
          <Process />

          {/* FAQ: Clean Swiss Accordion List */}
          <FAQ />

          {/* Pre-Closing Typographic Ticker */}
          <ClosingTicker />
        </main>

        {/* Dark Closing Statement & Collaboration Grid */}
        <Footer />
      </div>

    </div>
  );
};

export default App;
