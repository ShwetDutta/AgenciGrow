import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import About from './components/About';
import Booking from './components/Booking';
import ContactForm from './components/ContactForm';
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
    <div className="min-h-screen flex flex-col bg-[#0A0A0B] text-[#F5F5F2] selection:bg-[#A88B91] selection:text-[#0A0A0B] overflow-x-hidden relative">
      
      {/* Thin vertical scroll-progress indicator down the right edge, filled in metallic silver */}
      <div className="scroll-progress-container">
        <div 
          className="scroll-progress-bar h-full" 
          style={{ transform: `scaleY(${scrollProgress})` }}
        />
      </div>

      <Navbar />
      <main className="flex-grow">
        <Hero />
        <Services />
        <About />
        <Booking />
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
};

export default App;
