import React, { useState, useEffect } from 'react';
import { Send, CheckCircle, Loader2 } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { motion } from 'framer-motion';
import BorderGlow from './BorderGlow';

const SERVICE_ID = 'service_bhp5uad';
const TEMPLATE_ID = 'template_imbvi0n';
const PUBLIC_KEY = 'hskHvipGSlSKBgJaE';

const ContactForm: React.FC = () => {
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const response = await emailjs.send(SERVICE_ID, TEMPLATE_ID, formData, PUBLIC_KEY);
      if (response.status === 200) {
        setStatus('success');
        setFormData({ name: '', email: '', company: '', message: '' });
      }
    } catch (err) {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <section id="contact" className="py-28 bg-[#0A0A0B] text-center scroll-mt-12 relative z-10">
        <div className="max-w-xl mx-auto px-6">
          <div 
            className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-8 liquid-glass border border-white/10 text-[#C9CDD3]"
            style={{ background: 'rgba(201, 205, 211, 0.05)' }}
          >
            <CheckCircle className="w-8 h-8 stroke-[1.5]" />
          </div>
          <h2 className="text-3xl md:text-4xl font-heading text-[#F5F5F2] mb-4">Message Sent.</h2>
          <p className="text-[#8B8F96] mb-10 text-base font-body font-light">We'll respond within 24 hours.</p>
          <button 
            onClick={() => setStatus('idle')}
            className="liquid-glass-strong px-8 py-4 text-xs font-semibold tracking-wider uppercase text-[#F5F5F2]"
          >
            Send Another
          </button>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="py-28 bg-[#0A0A0B] scroll-mt-12 relative z-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <BorderGlow
          borderRadius={24}
          glowColor="262 70 65"
          backgroundColor="#0C0C0E"
          glowRadius={40}
          edgeSensitivity={30}
          colors={['#5227FF', '#B497CF', '#F5F5F2']}
          className="w-full"
        >
          <div className="p-8 md:p-16 flex flex-col lg:flex-row gap-16 text-[#F5F5F2]">
            
            {/* Left Column */}
            <div className="flex-1 relative z-10 flex flex-col justify-between">
              <div>
                <motion.p 
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#8B8F96] mb-4 font-body"
                >
                  // Contact Us
                </motion.p>
                <motion.h2 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="text-4xl md:text-5xl lg:text-6xl font-heading text-[#F5F5F2] tracking-tight leading-[1.12] mb-8"
                >
                  Let's build your<br />
                  growth engine.
                </motion.h2>
                <p className="text-[#8B8F96] text-sm md:text-base font-body font-light mb-12 leading-relaxed max-w-md">
                  Have a specific question or custom requirement? Send us a direct message and our strategy team will reach out shortly.
                </p>
              </div>

              <div className="flex items-center gap-4 group">
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center liquid-glass border border-white/10 group-hover:border-white/20 transition-all duration-300"
                  style={{ background: 'rgba(201, 205, 211, 0.04)' }}
                >
                  <Send className="w-5 h-5 text-[#C9CDD3]" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-semibold text-[#8B8F96] uppercase tracking-[0.25em] mb-0.5 font-body">Direct Line</span>
                  <span className="text-sm md:text-base font-medium text-[#F5F5F2] font-body">agencigrowofficial@gmail.com</span>
                </div>
              </div>
            </div>
            
            {/* Right Column / Form */}
            <div className="flex-1 relative z-10">
              <form onSubmit={handleSubmit} className="space-y-6">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] font-medium text-[#8B8F96] uppercase mb-2 tracking-wider font-body">Full Name</label>
                    <input 
                      required 
                      type="text" 
                      name="name" 
                      value={formData.name} 
                      onChange={handleChange} 
                      placeholder="" 
                      className="w-full px-5 py-3.5 rounded-xl bg-white/[0.02] border border-white/10 text-sm text-[#F5F5F2] focus:outline-none focus:border-[#C9CDD3] focus:bg-white/[0.04] transition-all font-body font-light" 
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-medium text-[#8B8F96] uppercase mb-2 tracking-wider font-body">Work Email</label>
                    <input 
                      required 
                      type="email" 
                      name="email" 
                      value={formData.email} 
                      onChange={handleChange} 
                      placeholder="" 
                      className="w-full px-5 py-3.5 rounded-xl bg-white/[0.02] border border-white/10 text-sm text-[#F5F5F2] focus:outline-none focus:border-[#C9CDD3] focus:bg-white/[0.04] transition-all font-body font-light" 
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-medium text-[#8B8F96] uppercase mb-2 tracking-wider font-body">Company</label>
                  <input 
                    required 
                    type="text" 
                    name="company" 
                    value={formData.company} 
                    onChange={handleChange} 
                    placeholder="" 
                    className="w-full px-5 py-3.5 rounded-xl bg-white/[0.02] border border-white/10 text-sm text-[#F5F5F2] focus:outline-none focus:border-[#C9CDD3] focus:bg-white/[0.04] transition-all font-body font-light" 
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-medium text-[#8B8F96] uppercase mb-2 tracking-wider font-body">What's the current state of your marketing / what's not working?</label>
                  <textarea 
                    required 
                    name="message" 
                    value={formData.message} 
                    onChange={handleChange} 
                    rows={4} 
                    placeholder="" 
                    className="w-full px-5 py-3.5 rounded-xl bg-white/[0.02] border border-white/10 text-sm text-[#F5F5F2] focus:outline-none focus:border-[#C9CDD3] focus:bg-white/[0.04] transition-all resize-none font-body font-light"
                  />
                </div>

                {status === 'error' && (
                  <p className="text-xs text-red-400 font-body">Something went wrong. Please check your network and try again.</p>
                )}

                <button 
                  disabled={status === 'sending'} 
                  type="submit" 
                  className="w-full py-4 liquid-glass-strong text-[#F5F5F2] font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2"
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
            </div>

          </div>
        </BorderGlow>
      </div>
    </section>
  );
};

export default ContactForm;
