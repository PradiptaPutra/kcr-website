import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Envelope, CaretRight, InstagramLogo, LinkedinLogo } from '@phosphor-icons/react';
import { kcrData } from '../data/kcrData';
import SEO from '../components/SEO';
import PageHeader from '../components/PageHeader';

const Contact: React.FC = () => {
  const [formStep, setFormStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    service: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form Submitted:', formData);
    setFormStep(3);
  };

  const fadeInUp = {
    initial: { y: 20, opacity: 0 },
    whileInView: { y: 0, opacity: 1 },
    viewport: { once: true },
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as any }
  };

  return (
    <div className="bg-[#F5F5F0] min-h-screen pt-20 md:pt-24 pb-24 md:pb-40 selection:bg-[#1a1c19] selection:text-white">
      <SEO 
        title="Hubungi Kami | KCR Furniture"
        description="Mulai konsultasi furnitur and interior Anda hari ini. Tim ahli KCR Furniture siap membantu mewujudkan ruang kerja and hospitality yang inspiratif."
        keywords="Kontak KCR, Furniture Office, Konsultasi Interior, Custom Furniture Indonesia, KCR Furniture Contact"
        canonicalUrl="/contact"
      />

      <PageHeader 
        label="05 / KONTAK"
        title="Mari Berdiskusi"
        subtitle="& Berkolaborasi."
        description="Punya pertanyaan tentang produk atau butuh penawaran custom? Kami siap mendengarkan and memberikan solusi furnitur terbaik untuk Anda."
      />

      <section className="framer-container grid grid-cols-1 lg:grid-cols-12 gap-20">
        
        {/* 1. CONTACT INFO */}
        <div className="lg:col-span-4 space-y-16">
          <motion.div {...fadeInUp}>
            <span className="framer-label text-brand mb-8 block tracking-[0.4em]">KANTOR PUSAT</span>
            <div className="flex gap-6 items-start">
               <MapPin weight="light" size={24} className="text-brand shrink-0" />
               <p className="framer-body !text-[15px] opacity-70 leading-relaxed">
                 {kcrData.contact.address}
               </p>
            </div>
          </motion.div>

          <motion.div {...fadeInUp} transition={{ delay: 0.1 }}>
            <span className="framer-label text-brand mb-8 block tracking-[0.4em]">KOMUNIKASI</span>
            <div className="space-y-6">
               <div className="flex gap-6 items-center">
                  <Phone weight="light" size={24} className="text-brand shrink-0" />
                  <a href={`tel:${kcrData.contact.phones[0]}`} className="framer-body !text-[15px] hover:text-brand transition-colors">{kcrData.contact.phones[0]}</a>
               </div>
               <div className="flex gap-6 items-center">
                  <Envelope weight="light" size={24} className="text-brand shrink-0" />
                  <div className="flex flex-col gap-1">
                    {kcrData.contact.emails.map(email => (
                      <a key={email} href={`mailto:${email}`} className="framer-body !text-[15px] hover:text-brand transition-colors">{email}</a>
                    ))}
                  </div>
               </div>
            </div>
          </motion.div>

          <motion.div {...fadeInUp} transition={{ delay: 0.2 }}>
            <span className="framer-label text-brand mb-8 block tracking-[0.4em]">SOCIAL MEDIA</span>
            <div className="flex gap-4">
               <a href="#" className="w-12 h-12 rounded-full border border-[#1a1c19]/10 flex items-center justify-center hover:bg-brand hover:text-white hover:border-brand transition-all duration-500">
                 <InstagramLogo weight="light" size={24} />
               </a>
               <a href="#" className="w-12 h-12 rounded-full border border-[#1a1c19]/10 flex items-center justify-center hover:bg-brand hover:text-white hover:border-brand transition-all duration-500">
                 <LinkedinLogo weight="light" size={24} />
               </a>
            </div>
          </motion.div>
        </div>

        {/* 2. CONTACT FORM */}
        <motion.div 
          {...fadeInUp} 
          transition={{ delay: 0.3 }}
          className="lg:col-span-7 lg:col-start-6 bg-white p-10 md:p-16 rounded-[24px] border border-[#1a1c19]/5 shadow-sm"
        >
          {formStep === 1 && (
            <form onSubmit={(e) => { e.preventDefault(); setFormStep(2); }} className="space-y-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="flex flex-col gap-3">
                  <label className="framer-label !text-[10px] opacity-40">NAMA LENGKAP</label>
                  <input 
                    required
                    type="text" 
                    placeholder="John Doe"
                    className="w-full bg-transparent border-b border-[#1a1c19]/10 py-3 text-[15px] focus:outline-none focus:border-brand transition-all font-sans"
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <label className="framer-label !text-[10px] opacity-40">ALAMAT EMAIL</label>
                  <input 
                    required
                    type="email" 
                    placeholder="john@company.com"
                    className="w-full bg-transparent border-b border-[#1a1c19]/10 py-3 text-[15px] focus:outline-none focus:border-brand transition-all font-sans"
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="flex flex-col gap-3">
                  <label className="framer-label !text-[10px] opacity-40">NAMA PERUSAHAAN</label>
                  <input 
                    type="text" 
                    placeholder="Company Name"
                    className="w-full bg-transparent border-b border-[#1a1c19]/10 py-3 text-[15px] focus:outline-none focus:border-brand transition-all font-sans"
                    onChange={(e) => setFormData({...formData, company: e.target.value})}
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <label className="framer-label !text-[10px] opacity-40">MINAT LAYANAN</label>
                  <select 
                    required
                    className="w-full bg-transparent border-b border-[#1a1c19]/10 py-3 text-[15px] focus:outline-none focus:border-brand transition-all font-sans appearance-none"
                    onChange={(e) => setFormData({...formData, service: e.target.value})}
                  >
                    <option value="">Pilih Layanan...</option>
                    <option value="Furnitur Kantor">Furnitur Kantor</option>
                    <option value="Hospitality Custom">Hospitality Custom</option>
                    <option value="Manufaktur CNC">Manufaktur CNC</option>
                    <option value="Interior Fit-Out">Interior Fit-Out</option>
                  </select>
                </div>
              </div>
              <button className="w-full py-6 bg-[#1a1c19] text-white rounded-xl text-sm font-bold uppercase tracking-[0.2em] hover:bg-brand transition-all shadow-xl shadow-[#1a1c19]/10 flex items-center justify-center gap-4 group">
                Lanjutkan <CaretRight weight="bold" className="group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          )}

          {formStep === 2 && (
            <form onSubmit={handleSubmit} className="space-y-10 animate-fade-in">
               <div className="flex flex-col gap-3">
                  <label className="framer-label !text-[10px] opacity-40">PESAN / KEBUTUHAN PROYEK</label>
                  <textarea 
                    required
                    rows={6}
                    placeholder="Ceritakan detail proyek atau produk yang Anda butuhkan..."
                    className="w-full bg-transparent border border-[#1a1c19]/10 p-6 rounded-xl text-[15px] focus:outline-none focus:border-brand transition-all font-sans resize-none"
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                  />
                </div>
                <div className="flex flex-col gap-4">
                  <button className="w-full py-6 bg-[#1a1c19] text-white rounded-xl text-sm font-bold uppercase tracking-[0.2em] hover:bg-brand transition-all shadow-xl shadow-[#1a1c19]/10">
                    Kirim Pesan Sekarang
                  </button>
                  <button 
                    type="button" 
                    onClick={() => setFormStep(1)}
                    className="framer-label !text-[10px] opacity-40 hover:opacity-100 transition-opacity"
                  >
                    KEMBALI KE SEBELUMNYA
                  </button>
                </div>
            </form>
          )}

          {formStep === 3 && (
            <div className="text-center py-20 animate-fade-in">
               <div className="w-20 h-20 bg-[#F5F5F0] rounded-full flex items-center justify-center mx-auto mb-8">
                  <CaretRight weight="bold" size={32} className="text-brand -rotate-45" />
               </div>
               <h3 className="font-serif text-3xl mb-4 text-[#1a1c19]">Terima Kasih!</h3>
               <p className="framer-body opacity-60 max-w-sm mx-auto mb-10">Pesan Anda telah kami terima. Consultant design kami akan menghubungi Anda dalam 1x24 jam kerja.</p>
               <button 
                onClick={() => setFormStep(1)}
                className="framer-label text-brand hover:underline"
               >
                 Kirim Pesan Lainnya
               </button>
            </div>
          )}
        </motion.div>

      </section>

      {/* 3. MAP PLACEHOLDER */}
      <section className="mt-32 md:mt-60 framer-container">
         <motion.div 
            {...fadeInUp}
            className="w-full aspect-[21/9] bg-[#e5e5e0] rounded-[32px] overflow-hidden grayscale contrast-[0.8] opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-1000 cursor-crosshair border border-[#1a1c19]/5 shadow-2xl"
         >
            <img src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=80&w=2000" className="w-full h-full object-cover" alt="Map Location" />
         </motion.div>
      </section>
    </div>
  );
};

export default Contact;
