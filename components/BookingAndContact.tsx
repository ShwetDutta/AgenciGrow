import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Check, Info, Send, CheckCircle, Loader2, Calendar, Mail } from 'lucide-react';
import emailjs from '@emailjs/browser';
import BorderGlow from './BorderGlow';

const SERVICE_ID = 'service_bhp5uad';
const TEMPLATE_ID = 'template_imbvi0n';
const PUBLIC_KEY = 'hskHvipGSlSKBgJaE';

// CALENDLY EMBED URL CONSTANT FOR EASY SWAPPING
export const CALENDLY_URL = "https://calendly.com/shwetdutta/30min";
export const DIRECT_EMAIL = "agencigrowofficial@gmail.com";

const BookingAndContact: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'calendar' | 'form'>('calendar');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });

  useEffect(() => {
    emailjs.init(PUBLIC_KEY);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleMailtoFallback = () => {
    const subject = encodeURIComponent(`AgenciGrow Inquiry - ${formData.name || 'Growth Engine'}`);
    const body = encodeURIComponent(
      `Name: ${formData.name || 'N/A'}\n` +
      `Email: ${formData.email || 'N/A'}\n` +
      `Company: ${formData.company || 'N/A'}\n\n` +
      `Message:\n${formData.message || ''}`
    );
    window.location.href = `mailto:${DIRECT_EMAIL}?subject=${subject}&body=${body}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const templateParams = {
        name: formData.name,
        from_name: formData.name,
        email: formData.email,
        from_email: formData.email,
        reply_to: formData.email,
        company: formData.company,
        message: formData.message,
      };

      const response = await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);
      if (response.status === 200 || response.text === 'OK') {
        setStatus('success');
        setFormData({ name: '', email: '', company: '', message: '' });
      } else {
        throw new Error(`EmailJS failed with status: ${response.status}`);
      }
    } catch (err) {
      console.error('Submission error:', err);
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="py-24 sm:py-32 bg-[#0A0A0B] relative z-10 scroll-mt-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Header Block */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#8B8F96] mb-4 font-body"
          >
            // GET IN TOUCH & BOOK
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading text-[#F5F5F2] tracking-tight leading-[1.12] mb-6"
          >
            Let's map your growth engine.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-base sm:text-lg text-[#8B8F96] font-body font-light leading-relaxed"
          >
            Book a 30-minute discovery session directly on our calendar, or send a message below to discuss your business requirements.
          </motion.p>
        </div>

        {/* Combined 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Expectations & Direct Info */}
          <div className="lg:col-span-5 space-y-8">
            <BorderGlow
              borderRadius={24}
              glowColor="262 70 65"
              backgroundColor="#0C0C0E"
              glowRadius={40}
              edgeSensitivity={30}
              colors={['#5227FF', '#B497CF', '#F5F5F2']}
              className="w-full"
            >
              <div className="p-6 sm:p-8 space-y-6">
                <h4 className="text-lg font-medium text-[#F5F5F2] flex items-center gap-3 font-body">
                  <div 
                    className="w-8 h-8 rounded-lg flex items-center justify-center liquid-glass border border-white/10 text-[#C9CDD3]"
                    style={{ background: 'rgba(201, 205, 211, 0.05)' }}
                  >
                    <Check className="w-4 h-4 stroke-[2.5]" />
                  </div>
                  <span>On Our 30-Min Growth Call:</span>
                </h4>
                
                <ul className="space-y-5">
                  {[
                    {
                      title: "1. Growth Assessment",
                      desc: "We analyze your current lead sources, conversion bottlenecks, and customer acquisition costs."
                    },
                    {
                      title: "2. Custom Roadmap",
                      desc: "We outline the exact ad channels, landing page improvements, and WhatsApp automations you need."
                    },
                    {
                      title: "3. Direct Execution Plan",
                      desc: "Clear timelines and unit economics breakdown with zero pushy sales talk."
                    }
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3.5">
                      <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center text-xs text-[#C9CDD3] mt-0.5 flex-shrink-0 border border-white/10 font-mono">
                        {idx + 1}
                      </div>
                      <div>
                        <h5 className="text-sm font-medium text-[#F5F5F2] mb-0.5 font-body">
                          {item.title}
                        </h5>
                        <p className="text-xs text-[#8B8F96] font-body font-light leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </BorderGlow>

            <div className="p-6 rounded-2xl liquid-glass border border-white/5 space-y-4" style={{ background: 'rgba(201, 205, 211, 0.02)' }}>
              <div className="flex items-center gap-3 text-[#8B8F96] font-body">
                <Info className="w-4 h-4 text-[#C9CDD3] flex-shrink-0" />
                <span className="text-xs font-medium uppercase tracking-wider">Limited to 4 strategy sessions per week.</span>
              </div>
              <div className="pt-3 border-t border-white/5 flex items-center gap-3 text-xs text-[#C9CDD3] font-body">
                <Mail className="w-4 h-4 text-[#C9CDD3]" />
                <span>Direct Email: <a href={`mailto:${DIRECT_EMAIL}`} className="underline hover:text-[#F5F5F2]">{DIRECT_EMAIL}</a></span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Tabbed Booking & Form Box */}
          <div className="lg:col-span-7">
            
            {/* Tabs toggle */}
            <div className="flex items-center gap-2 mb-6 p-1.5 rounded-xl bg-white/[0.03] border border-white/10 w-fit">
              <button
                onClick={() => setActiveTab('calendar')}
                className={`px-5 py-2.5 rounded-lg text-xs font-semibold tracking-wider uppercase font-body transition-all duration-200 inline-flex items-center gap-2 ${
                  activeTab === 'calendar'
                    ? 'bg-[#F5F5F2] text-[#0A0A0B] shadow-md'
                    : 'text-[#8B8F96] hover:text-[#F5F5F2]'
                }`}
              >
                <Calendar size={13} />
                <span>Book Calendar Call</span>
              </button>

              <button
                onClick={() => setActiveTab('form')}
                className={`px-5 py-2.5 rounded-lg text-xs font-semibold tracking-wider uppercase font-body transition-all duration-200 inline-flex items-center gap-2 ${
                  activeTab === 'form'
                    ? 'bg-[#F5F5F2] text-[#0A0A0B] shadow-md'
                    : 'text-[#8B8F96] hover:text-[#F5F5F2]'
                }`}
              >
                <Send size={13} />
                <span>Send Quick Message</span>
              </button>
            </div>

            <BorderGlow
              borderRadius={24}
              glowColor="262 70 65"
              backgroundColor="#0C0C0E"
              glowRadius={40}
              edgeSensitivity={30}
              colors={['#5227FF', '#B497CF', '#F5F5F2']}
              className="w-full min-h-[580px] p-1"
            >
              {activeTab === 'calendar' ? (
                /* Calendly Widget Placeholder & Embed with required data-calendly-url attribute */
                <div 
                  data-calendly-url={CALENDLY_URL} 
                  className="w-full h-full min-h-[580px] rounded-2xl overflow-hidden relative"
                >
                  <iframe 
                    src={CALENDLY_URL} 
                    width="100%" 
                    height="620" 
                    frameBorder="0"
                    title="Calendly Booking"
                    className="w-full h-full rounded-2xl bg-transparent opacity-90 min-h-[580px]"
                    style={{ filter: "invert(1) hue-rotate(180deg) brightness(0.9) contrast(1.1)" }}
                  />
                </div>
              ) : (
                /* Contact Form */
                <div className="p-6 sm:p-10 text-[#F5F5F2]">
                  {status === 'success' ? (
                    <div className="text-center py-12">
                      <div 
                        className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-6 liquid-glass border border-white/10 text-[#C9CDD3]"
                        style={{ background: 'rgba(201, 205, 211, 0.05)' }}
                      >
                        <CheckCircle className="w-7 h-7 stroke-[1.5]" />
                      </div>
                      <h3 className="text-2xl font-heading text-[#F5F5F2] mb-2">Message Delivered.</h3>
                      <p className="text-[#8B8F96] text-sm font-body font-light mb-8">We will review your details and respond within 24 hours.</p>
                      <button 
                        onClick={() => setStatus('idle')}
                        className="liquid-glass-strong px-6 py-3 text-xs font-semibold tracking-wider uppercase text-[#F5F5F2]"
                      >
                        Send Another
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label htmlFor="booking-fullname" className="block text-[10px] font-medium text-[#8B8F96] uppercase mb-1.5 tracking-wider font-body">Your Name</label>
                          <input 
                            id="booking-fullname"
                            required 
                            type="text" 
                            name="name" 
                            value={formData.name} 
                            onChange={handleChange} 
                            placeholder="" 
                            className="w-full px-4 py-3 rounded-xl bg-white/[0.02] border border-white/10 text-sm text-[#F5F5F2] focus:outline-none focus:border-[#C9CDD3] focus:ring-1 focus:ring-[#C9CDD3]/20 transition-all font-body font-light" 
                          />
                        </div>
                        <div>
                          <label htmlFor="booking-workemail" className="block text-[10px] font-medium text-[#8B8F96] uppercase mb-1.5 tracking-wider font-body">Work Email</label>
                          <input 
                            id="booking-workemail"
                            required 
                            type="email" 
                            name="email" 
                            value={formData.email} 
                            onChange={handleChange} 
                            placeholder="" 
                            className="w-full px-4 py-3 rounded-xl bg-white/[0.02] border border-white/10 text-sm text-[#F5F5F2] focus:outline-none focus:border-[#C9CDD3] focus:ring-1 focus:ring-[#C9CDD3]/20 transition-all font-body font-light" 
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="booking-company" className="block text-[10px] font-medium text-[#8B8F96] uppercase mb-1.5 tracking-wider font-body">Company / Website</label>
                        <input 
                          id="booking-company"
                          required 
                          type="text" 
                          name="company" 
                          value={formData.company} 
                          onChange={handleChange} 
                          placeholder="" 
                          className="w-full px-4 py-3 rounded-xl bg-white/[0.02] border border-white/10 text-sm text-[#F5F5F2] focus:outline-none focus:border-[#C9CDD3] focus:ring-1 focus:ring-[#C9CDD3]/20 transition-all font-body font-light" 
                        />
                      </div>

                      <div>
                        <label htmlFor="booking-message" className="block text-[10px] font-medium text-[#8B8F96] uppercase mb-1.5 tracking-wider font-body">What is currently not working in your marketing / growth?</label>
                        <textarea 
                          id="booking-message"
                          required 
                          name="message" 
                          value={formData.message} 
                          onChange={handleChange} 
                          rows={4} 
                          placeholder="" 
                          className="w-full px-4 py-3 rounded-xl bg-white/[0.02] border border-white/10 text-sm text-[#F5F5F2] focus:outline-none focus:border-[#C9CDD3] focus:ring-1 focus:ring-[#C9CDD3]/20 transition-all resize-none font-body font-light"
                        />
                      </div>

                      {status === 'error' && (
                        <div className="p-4 rounded-xl border border-red-500/20 bg-red-500/[0.03] space-y-2">
                          <p className="text-xs text-red-400 font-body">
                            Form delivery paused. Click below to send directly via email:
                          </p>
                          <button
                            type="button"
                            onClick={handleMailtoFallback}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#F5F5F2] text-[#0A0A0B] text-xs font-semibold uppercase tracking-wider"
                          >
                            <span>Send via Email</span>
                            <Send size={11} />
                          </button>
                        </div>
                      )}

                      <button 
                        disabled={status === 'sending'} 
                        type="submit" 
                        className="w-full py-3.5 liquid-glass-strong text-[#F5F5F2] font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2"
                      >
                        {status === 'sending' ? (
                          <Loader2 className="animate-spin w-4 h-4" />
                        ) : (
                          <>
                            <span>Send Message</span>
                            <Send size={12} />
                          </>
                        )}
                      </button>
                    </form>
                  )}
                </div>
              )}
            </BorderGlow>

          </div>

        </div>

      </div>
    </section>
  );
};

export default BookingAndContact;
