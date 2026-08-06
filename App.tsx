import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TrustBar from './components/TrustBar';
import About from './components/About';
import Services from './components/Services';
import Process from './components/Process';
import Work from './components/Work';
import FAQ from './components/FAQ';
import BookingAndContact from './components/BookingAndContact';
import Footer from './components/Footer';

const App: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

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

  return (
    <div className="min-h-screen flex flex-col bg-[#000000] text-[#F5F5F2] selection:bg-[#A88B91] selection:text-[#000000] overflow-x-hidden relative">
      
      {/* Scroll Progress indicator down the right edge */}
      <div className="scroll-progress-container">
        <div 
          className="scroll-progress-bar h-full" 
          style={{ transform: `scaleY(${scrollProgress})` }}
        />
      </div>

      {/* 1. Navbar */}
      <Navbar />

      <main className="flex-grow">
        {/* 2. Hero */}
        <Hero />

        {/* 3. Trust / Stats bar */}
        <TrustBar />

        {/* 4. About / Why AgenciGrow */}
        <About />

        {/* 5. Services */}
        <Services />

        {/* 6. Process */}
        <Process />

        {/* 7. Work (light version) */}
        <Work />

        {/* 8. FAQ */}
        <FAQ />

        {/* 9. Contact + Book a Meeting */}
        <BookingAndContact />
      </main>

      {/* 10. Footer */}
      <Footer />
    </div>
  );
};

export default App;
