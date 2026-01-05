import React from 'react';
import { Linkedin, Twitter, Instagram, Calendar } from 'lucide-react';
import { Logo } from './Navbar';

const Footer: React.FC = () => {
  const scrollToBooking = (e: React.MouseEvent) => {
    e.preventDefault();
    const bookingSection = document.getElementById('booking');
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[#0F172A] text-[#F8FAFC] pt-32 pb-16 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20 pb-24 border-b border-white/5">
          <div className="space-y-10">
            <Logo light={true} />
            <p className="text-[#94A3B8] text-sm leading-relaxed font-medium max-w-xs">
              Next-gen growth engineering for category-defining brands. We turn marketing into a compounding investment.
            </p>
            <div className="flex space-x-6">
              {[Linkedin, Twitter, Instagram].map((Icon, i) => (
                <a key={i} href="#" className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center hover:bg-[#00D094] hover:text-[#0F172A] transition-all">
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-[#00D094] font-black uppercase tracking-[0.4em] text-[10px] mb-10">Solutions</h4>
            <ul className="space-y-6 text-[#94A3B8] text-xs font-black uppercase tracking-widest">
              <li><a href="#services" className="hover:text-[#F8FAFC] transition-colors">Search Dominance</a></li>
              <li><a href="#services" className="hover:text-[#F8FAFC] transition-colors">Performance Media</a></li>
              <li><a href="#services" className="hover:text-[#F8FAFC] transition-colors">Funnel Architecture</a></li>
              <li><a href="#services" className="hover:text-[#F8FAFC] transition-colors">Alpha Audits</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[#00D094] font-black uppercase tracking-[0.4em] text-[10px] mb-10">Company</h4>
            <ul className="space-y-6 text-[#94A3B8] text-xs font-black uppercase tracking-widest">
              <li><a href="#about" className="hover:text-[#F8FAFC] transition-colors">Our Method</a></li>
              <li><a href="#case-studies" className="hover:text-[#F8FAFC] transition-colors">The Vault</a></li>
              <li><a href="#booking" className="hover:text-[#F8FAFC] transition-colors">Strategy Call</a></li>
              <li><a href="#contact" className="hover:text-[#F8FAFC] transition-colors">Careers</a></li>
            </ul>
          </div>

          <div className="bg-white/5 p-10 border border-white/5 rounded-2xl flex flex-col justify-between">
            <div>
              <h4 className="text-[#F8FAFC] font-black text-2xl mb-6 leading-tight">Ready to Scale? <br/> Let's Talk Growth.</h4>
              <p className="text-[#94A3B8] mb-10 text-[11px] font-medium leading-relaxed">Stop guessing and start engineering your revenue. Secure your dedicated strategy call with our lead growth architects below.</p>
            </div>
            <a 
              href="#booking" 
              onClick={scrollToBooking}
              className="flex items-center justify-between gap-4 w-full bg-[#00D094] text-[#0F172A] py-6 px-8 rounded-lg font-black text-[14px] uppercase tracking-[0.05em] hover:bg-white transition-all shadow-xl group text-left leading-tight"
            >
              <span>
                BOOK<br/>
                YOUR<br/>
                STRATEGY<br/>
                CALL
              </span>
              <Calendar size={24} className="group-hover:scale-110 transition-transform opacity-80" />
            </a>
          </div>
        </div>
        
        <div className="pt-16 flex flex-col md:flex-row justify-between items-center gap-10">
          <p className="text-[#94A3B8] text-[10px] font-black tracking-[0.4em] uppercase">
            © {new Date().getFullYear()} AgenciGrow. Engineered Growth.
          </p>
          <div className="flex gap-12 text-[10px] font-black text-[#94A3B8] uppercase tracking-[0.4em]">
            <a href="#" className="hover:text-[#00D094] transition-colors">Privacy Moat</a>
            <a href="#" className="hover:text-[#00D094] transition-colors">Legal Framework</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;