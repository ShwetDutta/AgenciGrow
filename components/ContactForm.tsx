import React, { useState, useEffect } from 'react';
import { Send, CheckCircle, Loader2 } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { motion } from 'framer-motion';

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
      <section id="contact" className="py-32 bg-[#0B0B0E] text-center scroll-mt-24">
        <div className="max-w-xl mx-auto px-6">
          <div className="w-24 h-24 bg-[#C63AFF]/10 rounded-full flex items-center justify-center mx-auto mb-10">
            <CheckCircle className="text-[#C63AFF] w-12 h-12" />
          </div>
          <h2 className="text-4xl font-black text-white mb-6">Message Sent.</h2>
          <p className="text-[#B5B5C0] mb-12 text-xl font-light">We'll respond within 24 hours.</p>
          <button 
            onClick={() => setStatus('idle')}
            className="px-12 py-5 bg-gradient-to-r from-[#C63AFF] to-[#7B4DFF] text-white rounded-sm font-black uppercase tracking-widest hover:brightness-110 transition-all"
          >
            Send Another
          </button>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="py-32 bg-[#0B0B0E] scroll-mt-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="bg-[#0F0F14] rounded-3xl p-10 md:p-20 flex flex-col lg:flex-row gap-20 text-white overflow-hidden relative shadow-2xl border border-white/5">
          <div className="flex-1 relative z-10">
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="text-5xl md:text-7xl font-black mb-10 tracking-tighter leading-[0.95]"
            >
              Let's build your <br/>
              <span className="text-[#C63AFF]">growth engine.</span>
            </motion.h2>
            <p className="text-[#B5B5C0] text-xl font-light mb-14 leading-relaxed max-w-md">
              Have a specific question or custom requirement? Send us a direct message and our strategy team will reach out shortly.
            </p>
            <div className="flex items-center gap-6 group">
              <div className="w-16 h-16 bg-white/5 rounded-xl flex items-center justify-center group-hover:bg-[#C63AFF] transition-colors">
                <Send className="w-6 h-6 text-[#C63AFF] group-hover:text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-black text-[#8E8E9F] uppercase tracking-[0.3em] mb-1">Direct Line</span>
                <span className="text-xl font-bold">agencigrowofficial@gmail.com</span>
              </div>
            </div>
          </div>
          
          <div className="flex-1 relative z-10">
            <form onSubmit={handleSubmit} className="bg-[#0B0B0E] rounded-2xl p-8 md:p-12 space-y-8 shadow-2xl border border-white/10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-[10px] font-black text-white uppercase mb-3 tracking-widest">Full Name</label>
                  <input required type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Jane Doe" className="w-full px-6 py-4 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#C63AFF] transition-all" />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-white uppercase mb-3 tracking-widest">Work Email</label>
                  <input required type="email" name="email" value={formData.email} onChange={handleChange} placeholder="jane@company.com" className="w-full px-6 py-4 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#C63AFF] transition-all" />
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-black text-white uppercase mb-3 tracking-widest">Company</label>
                <input required type="text" name="company" value={formData.company} onChange={handleChange} placeholder="Acme Corp" className="w-full px-6 py-4 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#C63AFF] transition-all" />
              </div>
              <div>
                <label className="block text-[10px] font-black text-white uppercase mb-3 tracking-widest">Message</label>
                <textarea required name="message" value={formData.message} onChange={handleChange} rows={4} placeholder="Your goals..." className="w-full px-6 py-4 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#C63AFF] transition-all resize-none"></textarea>
              </div>

              <button disabled={status === 'sending'} type="submit" className="w-full py-6 bg-gradient-to-r from-[#C63AFF] to-[#7B4DFF] text-white rounded-lg font-black text-sm uppercase tracking-widest hover:brightness-110 transition-all flex items-center justify-center gap-4 shadow-xl">
                {status === 'sending' ? <Loader2 className="animate-spin" /> : <>Send Message <Send size={18}/></>}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;