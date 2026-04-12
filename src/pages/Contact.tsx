import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, MapPin, Phone, Envelope, CheckCircle } from '@phosphor-icons/react';
import { kcrData } from '../data/kcrData';
import SEO from '../components/SEO';
import PageHeader from '../components/PageHeader';

const Contact: React.FC = () => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: '',
    details: ''
  });

  const totalSteps = 3;

  const fadeInUp = {
    initial: { y: 20, opacity: 0 },
    whileInView: { y: 0, opacity: 1 },
    viewport: { once: true },
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as any }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const nextStep = () => setStep(s => Math.min(s + 1, totalSteps));
  const prevStep = () => setStep(s => Math.max(s - 1, 1));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    const subject = encodeURIComponent(`Inquiry: ${formData.category} - ${formData.name}`);
    const body = encodeURIComponent(`Nama: ${formData.name}\nEmail: ${formData.email}\nKategori: ${formData.category}\n\nDetail:\n${formData.details}`);
    window.location.href = `mailto:${kcrData.contact.emails[1]}?subject=${subject}&body=${body}`;
    setIsSubmitting(false);
  };

  return (
    <div className="bg-[#F5F5F0] min-h-screen pt-24 pb-40 selection:bg-[#2A2C2B] selection:text-white">
      <SEO 
        title="Hubungi Kami | Konsultasi Proyek Gratis"
        description="Punya rencana proyek? Mari ngobrol. Tim KCR siap mendengarkan and memberikan solusi konstruksi terbaik untuk Anda."
        keywords="Kontak KCR, Hubungi Kontraktor BUMN, Konsultasi Proyek, Spesialis Shotcrete Indonesia"
        canonicalUrl="/contact"
      />

      <PageHeader 
        label="HUBUNGI KAMI"
        title="Konsultasi Teknis"
        subtitle="untuk Proyek Presisi."
        description="Hindari hambatan teknis and pembengkakan biaya. Tim ahli KCR siap membantu Anda merencanakan struktur yang aman, efisien, and tepat waktu."
      />

      <section className="framer-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          <div className="lg:col-span-5 space-y-16">
            <motion.div {...fadeInUp} transition={{ delay: 0.2 }} className="space-y-12">
              <div className="flex gap-6 items-start group cursor-default">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center border-[0.5px] border-[#2A2C2B]/10 flex-shrink-0 transition-all duration-300 group-hover:border-brand/50 group-hover:shadow-sm">
                  <MapPin weight="light" size={20} className="text-brand" />
                </div>
                <div>
                  <h3 className="framer-label !opacity-100 mb-3 group-hover:text-brand transition-colors">Kantor Pusat</h3>
                  <p className="framer-body !text-[14px] leading-relaxed max-w-xs">{kcrData.contact.address}</p>
                </div>
              </div>

              <div className="flex gap-6 items-start group cursor-default">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center border-[0.5px] border-[#2A2C2B]/10 flex-shrink-0 transition-all duration-300 group-hover:border-brand/50 group-hover:shadow-sm">
                  <Envelope weight="light" size={20} className="text-brand" />
                </div>
                <div>
                  <h3 className="framer-label !opacity-100 mb-3 group-hover:text-brand transition-colors">Email Inkuiri</h3>
                  <p className="framer-body !text-[14px]">{kcrData.contact.emails[1]}</p>
                  <p className="framer-body !text-[14px] opacity-60">{kcrData.contact.emails[0]}</p>
                </div>
              </div>

              <div className="flex gap-6 items-start group cursor-default">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center border-[0.5px] border-[#2A2C2B]/10 flex-shrink-0 transition-all duration-300 group-hover:border-brand/50 group-hover:shadow-sm">
                  <Phone weight="light" size={20} className="text-brand" />
                </div>
                <div>
                  <h3 className="framer-label !opacity-100 mb-3 group-hover:text-brand transition-colors">Telepon</h3>
                  <p className="framer-body !text-[14px]">{kcrData.contact.phones[0]}</p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              {...fadeInUp} 
              transition={{ delay: 0.4 }}
              className="aspect-[4/5] bg-[#1a1c19] rounded-2xl overflow-hidden relative group"
            >
              <img src="https://images.pexels.com/photos/3862132/pexels-photo-3862132.jpeg" className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-1000" alt="Office" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-8 left-8 right-8">
                 <p className="framer-label !text-brand mb-2">Operational Hours</p>
                 <p className="text-white font-serif text-xl italic">Senin — Jumat, 08:00 - 17:00 WIB</p>
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-7">
            <motion.div 
              {...fadeInUp}
              transition={{ delay: 0.3 }}
              className="bg-white border-[0.5px] border-[#2A2C2B]/10 rounded-2xl p-8 md:p-12 shadow-sm"
            >
              <div className="flex items-center justify-between mb-16">
                 <div>
                    <h2 className="font-serif text-3xl mb-2">Kirim Pesan</h2>
                    <p className="text-[13px] opacity-40 italic">Step {step} of {totalSteps}</p>
                 </div>
                 <div className="flex gap-4">
                    <button onClick={prevStep} disabled={step === 1} className={`w-10 h-10 rounded-full border border-[#2A2C2B]/10 flex items-center justify-center transition-all ${step === 1 ? 'opacity-20' : 'hover:bg-[#2A2C2B] hover:text-white'}`}>
                       <ArrowLeft size={18} />
                    </button>
                    <button onClick={nextStep} disabled={step === totalSteps} className={`w-10 h-10 rounded-full border border-[#2A2C2B]/10 flex items-center justify-center transition-all ${step === totalSteps ? 'opacity-20' : 'hover:bg-[#2A2C2B] hover:text-white'}`}>
                       <ArrowRight size={18} />
                    </button>
                 </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-12">
                 <AnimatePresence mode="wait">
                    {step === 1 && (
                      <motion.div 
                        key="step1" 
                        initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                        className="space-y-10"
                      >
                         <div className="space-y-4">
                            <label className="framer-label !text-[10px] !opacity-100">Siapa Nama Anda?</label>
                            <input 
                              type="text" 
                              name="name"
                              value={formData.name}
                              onChange={handleInputChange}
                              placeholder="Masukkan nama lengkap..." 
                              className="w-full bg-transparent border-b border-[#2A2C2B]/10 py-4 focus:border-brand transition-colors outline-none text-xl font-serif italic" 
                            />
                         </div>
                         <div className="space-y-4">
                            <label className="framer-label !text-[10px] !opacity-100">Alamat Email?</label>
                            <input 
                              type="email" 
                              name="email"
                              value={formData.email}
                              onChange={handleInputChange}
                              placeholder="nama@email.com" 
                              className="w-full bg-transparent border-b border-[#2A2C2B]/10 py-4 focus:border-brand transition-colors outline-none text-xl font-serif italic" 
                            />
                         </div>
                      </motion.div>
                    )}

                    {step === 2 && (
                      <motion.div 
                        key="step2" 
                        initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                        className="space-y-10"
                      >
                         <label className="framer-label !text-[10px] !opacity-100">Apa Kebutuhan Anda?</label>
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {['Kontraktor Bangunan', 'Spesialis Shotcrete', 'Sistem Prefabrikasi', 'Interior & Furnitur'].map(cat => (
                              <button 
                                key={cat}
                                type="button"
                                onClick={() => setFormData(p => ({ ...p, category: cat }))}
                                className={`p-6 border rounded-xl text-left transition-all ${formData.category === cat ? 'border-brand bg-brand/5' : 'border-[#2A2C2B]/10 hover:border-brand/40'}`}
                              >
                                 <p className={`text-[13px] font-bold ${formData.category === cat ? 'text-brand' : 'opacity-40'}`}>{cat}</p>
                              </button>
                            ))}
                         </div>
                      </motion.div>
                    )}

                    {step === 3 && (
                      <motion.div 
                        key="step3" 
                        initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                        className="space-y-10"
                      >
                         <div className="space-y-4">
                            <label className="framer-label !text-[10px] !opacity-100">Detail Proyek / Pesan</label>
                            <textarea 
                              name="details"
                              value={formData.details}
                              onChange={handleInputChange}
                              rows={4}
                              placeholder="Ceritakan sedikit tentang proyek Anda..." 
                              className="w-full bg-transparent border-b border-[#2A2C2B]/10 py-4 focus:border-brand transition-colors outline-none text-xl font-serif italic resize-none" 
                            />
                         </div>
                         <button 
                           type="submit"
                           disabled={isSubmitting}
                           className="w-full bg-brand text-white py-6 rounded-xl font-bold uppercase tracking-widest text-[11px] hover:bg-[#B8860B] transition-all flex items-center justify-center gap-4 group"
                         >
                            {isSubmitting ? 'Mengirim...' : (
                              <>
                                Kirim Pesan Melalui Email
                                <ArrowRight className="group-hover:translate-x-2 transition-transform" />
                              </>
                            )}
                         </button>
                         <div className="flex items-center gap-4 justify-center py-4 bg-brand/5 rounded-lg border border-brand/10">
                            <CheckCircle size={18} className="text-brand" />
                            <p className="text-[10px] font-bold uppercase tracking-widest text-brand">Kami akan membalas dalam 24 jam kerja</p>
                         </div>
                      </motion.div>
                    )}
                 </AnimatePresence>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
