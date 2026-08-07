import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Process from './components/Process';
import Work from './components/Work';
import FAQ from './components/FAQ';
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

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleOpenModal = () => setIsBookingOpen(true);
    window.addEventListener('open-booking-modal', handleOpenModal);
    return () => window.removeEventListener('open-booking-modal', handleOpenModal);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#000000] text-[#F5F5F2] selection:bg-[#A88B91] selection:text-[#000000] overflow-x-hidden relative">
      
      {/* Scroll Progress indicator down the right edge */}
      <div className="scroll-progress-container">
        <div 
          className="scroll-progress-bar h-full" 
          style={{ transform: `scaleY(${scrollProgress})` }}
        />
      </div>

      {/* Global Calendly Popup Modal */}
      <CalendlyModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
      />

      {/* 1. Navbar */}
      <Navbar />

      <main className="flex-grow">
        {/* 2. Hero */}
        <Hero />

        {/* 3. About / Why AgenciGrow */}
        <About />

        {/* 4. Services */}
        <Services />

        {/* 5. Process */}
        <Process />

        {/* 6. Work (light version) */}
        <Work />

        {/* 7. FAQ */}
        <FAQ />
      </main>

      {/* 8. Footer */}
      <Footer />
    </div>
  );
};

export default App;
