import React from 'react';
import Navbar from './Navbar';
import WhatWeBelieve from './WhatWeBelieve';
import Process from './Process';

/**
 * ProcessCanvas Component
 *
 * Houses:
 * 1. Light Navbar
 * 2. What We Believe (Chapter 02)
 * 3. Process / How We Work (Chapter 03 with Steps 01, 02, and 03)
 *
 * Sits at z-50 with -mt-[100vh] to seamlessly reveal over the receding Who We Are card.
 * All content flows naturally in standard page layout with zero artificial shrink or black gaps after 03.
 */
const ProcessCanvas: React.FC = () => {
  return (
    <div
      id="process-canvas"
      className="relative z-50 w-full bg-[#E5E3DD] text-[#111111] rounded-t-[36px] sm:rounded-t-[48px] -mt-[100vh] border-t border-black/15 shadow-[0_-35px_90px_rgba(0,0,0,0.85)] flex flex-col items-center"
    >
      {/* Sticky Top Control Bar inside the beige canvas */}
      <Navbar theme="light" />

      <main className="flex-grow flex flex-col w-full px-5 sm:px-10 lg:px-14 pt-6 sm:pt-8">
        {/* Chapter 02: What We Believe (Flows naturally into Process) */}
        <WhatWeBelieve />

        {/* Chapter 03: Process / How We Work (Steps 01, 02, and 03) */}
        <Process />
      </main>
    </div>
  );
};

export default ProcessCanvas;

