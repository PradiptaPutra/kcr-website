import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, MapPin, Phone, Envelope, CheckCircle, Sparkle } from '@phosphor-icons/react';
import { kcrData } from '../data/kcrData';
import SEO from '../components/SEO';

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
  const progress = (step / totalSteps) * 100;

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
    
    // Simulate a polished sending state for "Tactile Feedback" and "Peak-End Rule"
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const subject = encodeURIComponent(`Inquiry: ${formData.category} - ${formData.name}`);
    const body = encodeURIComponent(`Nama: ${formData.name}\nEmail: ${formData.email}\nKategori: ${formData.category}\n\nDetail:\n${formData.details}`);
    
    window.location.href = `mailto:${kcrData.contact.emails[1]}?subject=${subject}&body=${body}`;
    setIsSubmitting(false);
  };

  // Interaction Design: Tactile motion for buttons
  const buttonVariants = {
    hover: { scale: 1.02, backgroundColor: "#B8860B" },
    tap: { scale: 0.98 }
  };

  return (
    <div className="bg-[#F5F5F0] min-h-screen pt-32 pb-40 selection:bg-[#2A2C2B] selection:text-white">
      <SEO 
        title="Hubungi Kami | Konsultasi Proyek Gratis"
        description="Punya rencana proyek? Mari ngobrol. Tim KCR siap mendengarkan dan memberikan solusi konstruksi terbaik untuk Anda."
        keywords="Kontak KCR, Hubungi Kontraktor BUMN, Konsultasi Proyek, Spesialis Shotcrete Indonesia"
        canonicalUrl="/contact"
        aeoAnswer="Hubungi PT. KARYA CIPTA RAHARJA di (021) 84598590 atau kunjungi kantor pusat kami di Bekasi untuk konsultasi teknis. Sebagai Spesialis Shotcrete Indonesia dan Kontraktor Bangunan BUMN, tim ahli kami siap mendampingi perencanaan struktur, penganggaran proyek (RAB), dan eksekusi lapangan dengan standar ketepatan tinggi."
      />

      <section className="framer-container">
        {/* 1. HEADER - Reciprocity Trigger */}
        <motion.div {...fadeInUp} className="max-w-3xl mb-24">
          <div className="flex items-center gap-3 mb-6">
            <span className="framer-label text-brand block tracking-[0.6em]">HUBUNGI KAMI</span>
            <div className="h-[1px] w-12 bg-brand/30" />
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="px-3 py-1 bg-brand/10 rounded-full flex items-center gap-2"
            >
              <Sparkle size={14} className="text-brand" weight="fill" />
              <span className="text-[10px] font-bold text-brand tracking-widest uppercase">Konsultasi Gratis</span>
            </motion.div>
          </div>
          <h1 className="framer-h1 !text-[48px] md:!text-[64px] mb-8 leading-[1.1]">
            Konsultasi Teknis <br />
            <span className="italic font-serif text-brand">untuk Proyek Presisi.</span>
          </h1>
          <p className="framer-body !text-[18px] max-w-xl">
            Hindari hambatan teknis dan pembengkakan biaya. Tim ahli KCR siap membantu Anda merencanakan struktur yang aman, efisien, dan tepat waktu.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          {/* 2. LEFT: CONTACT DETAILS & IMAGE */}
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

            <motion.div {...fadeInUp} transition={{ delay: 0.4 }} className="aspect-[4/3] bg-[#e5e5e0] rounded-[12px] overflow-hidden hidden lg:block border-[0.5px] border-[#2A2C2B]/5">
              <img 
                src="https://images.pexels.com/photos/6794929/pexels-photo-6794929.jpeg" 
                className="w-full h-full object-cover grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-1000 ease-in-out" 
                alt="KCR Workspace"
              />
            </motion.div>
          </div>

          {/* 3. RIGHT: MULTI-STEP HIGH CONVERTING FORM */}
          <motion.div {...fadeInUp} transition={{ delay: 0.3 }} className="lg:col-span-7">
            <div className="bg-white rounded-[16px] border-[0.5px] border-[#2A2C2B]/10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden relative">
              
              {/* Goal-Gradient Indicator (Progress Bar) */}
              <div className="h-1.5 w-full bg-[#F5F5F0]">
                <motion.div 
                  className="h-full bg-brand" 
                  initial={{ width: "0%" }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5, ease: "circOut" }}
                />
              </div>

              <div className="p-8 md:p-16">
                <div className="flex justify-between items-center mb-12">
                  <h2 className="font-serif text-[28px] text-[#2A2C2B]">
                    {step === 1 && "Mulai dari sini"}
                    {step === 2 && "Detail proyek"}
                    {step === 3 && "Informasi kontak"}
                  </h2>
                  <span className="framer-label !text-[10px] bg-[#F5F5F0] px-3 py-1 rounded-full">
                    Langkah {step} dari {totalSteps}
                  </span>
                </div>
                
                <form onSubmit={(e) => e.preventDefault()} className="space-y-10 min-h-[320px] flex flex-col justify-between">
                  <AnimatePresence mode="wait">
                    {step === 1 && (
                      <motion.div 
                        key="step1"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-8"
                      >
                        {/* Commitment & Consistency: Start with a simple choice */}
                        <div className="flex flex-col gap-5">
                          <label className="framer-label !text-[11px] text-[#2A2C2B]/60 uppercase tracking-widest">Pilih Jenis Layanan</label>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {[
                              { id: 'SHOTCRETE', label: 'Shotcrete Specialist', icon: '🏗️' },
                              { id: 'BUILDING', label: 'Building Contractor', icon: '🏢' },
                              { id: 'PREFAB', label: 'Prefab Building', icon: '🏠' },
                              { id: 'INTERIOR', label: 'Interior & Furniture', icon: '🛋️' },
                            ].map((cat) => (
                              <button
                                key={cat.id}
                                type="button"
                                onClick={() => {
                                  setFormData(prev => ({ ...prev, category: cat.id }));
                                  setTimeout(nextStep, 300);
                                }}
                                className={`flex items-center gap-4 p-5 rounded-xl border-[0.5px] transition-all text-left ${
                                  formData.category === cat.id 
                                    ? 'border-brand bg-brand/5 shadow-sm' 
                                    : 'border-[#2A2C2B]/10 hover:border-brand/40 hover:bg-[#F5F5F0]'
                                }`}
                              >
                                <span className="text-xl">{cat.icon}</span>
                                <span className="font-medium text-[#2A2C2B]">{cat.label}</span>
                                {formData.category === cat.id && (
                                  <CheckCircle weight="fill" className="ml-auto text-brand" size={20} />
                                )}
                              </button>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {step === 2 && (
                      <motion.div 
                        key="step2"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-8"
                      >
                        <div className="flex flex-col gap-4">
                          <label className="framer-label !text-[11px] text-[#2A2C2B]/60 uppercase tracking-widest">Apa yang bisa kami bantu?</label>
                          <textarea 
                            name="details" 
                            required 
                            rows={6} 
                            value={formData.details}
                            onChange={handleInputChange}
                            className="bg-[#F5F5F0]/50 border-[0.5px] border-[#2A2C2B]/10 rounded-xl p-5 focus:outline-none focus:border-brand focus:bg-white transition-all resize-none framer-body !text-[#2A2C2B] placeholder:opacity-30" 
                            placeholder="Ceritakan kebutuhan proyek Anda, lokasi, atau estimasi luas bangunan..." 
                          />
                        </div>
                      </motion.div>
                    )}

                    {step === 3 && (
                      <motion.div 
                        key="step3"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-10"
                      >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                          <div className="flex flex-col gap-3 group">
                            <label className="framer-label !text-[11px] text-[#2A2C2B]/60 uppercase tracking-widest transition-colors group-focus-within:text-brand">Nama Lengkap</label>
                            <input 
                              name="name" 
                              type="text" 
                              required 
                              value={formData.name}
                              onChange={handleInputChange}
                              className="bg-transparent border-b-[0.5px] border-[#2A2C2B]/20 py-2 focus:outline-none focus:border-brand transition-all framer-body !text-[#2A2C2B]" 
                              placeholder="Budi Santoso" 
                            />
                          </div>
                          <div className="flex flex-col gap-3 group">
                            <label className="framer-label !text-[11px] text-[#2A2C2B]/60 uppercase tracking-widest transition-colors group-focus-within:text-brand">Alamat Email</label>
                            <input 
                              name="email" 
                              type="email" 
                              required 
                              value={formData.email}
                              onChange={handleInputChange}
                              className="bg-transparent border-b-[0.5px] border-[#2A2C2B]/20 py-2 focus:outline-none focus:border-brand transition-all framer-body !text-[#2A2C2B]" 
                              placeholder="budi@perusahaan.com" 
                            />
                          </div>
                        </div>
                        <div className="p-4 bg-[#F5F5F0] rounded-xl flex items-start gap-4">
                          <CheckCircle className="text-green-600 mt-1" size={18} weight="fill" />
                          <p className="text-[12px] text-[#2A2C2B]/60 leading-relaxed">
                            Hampir selesai! Data Anda akan kami gunakan hanya untuk keperluan konsultasi proyek ini.
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="flex items-center gap-4 pt-6 border-t-[0.5px] border-[#2A2C2B]/5">
                    {step > 1 && (
                      <motion.button
                        type="button"
                        onClick={prevStep}
                        whileHover={{ x: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center justify-center w-12 h-12 rounded-xl border-[0.5px] border-[#2A2C2B]/10 hover:bg-[#F5F5F0] transition-colors"
                      >
                        <ArrowLeft size={18} className="text-[#2A2C2B]" />
                      </motion.button>
                    )}
                    
                    {step < totalSteps ? (
                      <motion.button
                        type="button"
                        onClick={nextStep}
                        disabled={step === 1 && !formData.category}
                        variants={buttonVariants}
                        whileHover="hover"
                        whileTap="tap"
                        className={`framer-btn flex-1 justify-center !bg-[#2A2C2B] !text-white border-none disabled:opacity-30 disabled:pointer-events-none transition-all`}
                      >
                        <span>Lanjutkan</span>
                        <ArrowRight weight="bold" size={16} className="ml-4" />
                      </motion.button>
                    ) : (
                      <motion.button
                        type="submit"
                        onClick={handleSubmit}
                        disabled={isSubmitting || !formData.name || !formData.email}
                        variants={buttonVariants}
                        whileHover="hover"
                        whileTap="tap"
                        className={`framer-btn flex-1 justify-center !bg-[#2A2C2B] !text-white border-none group relative overflow-hidden`}
                      >
                        {isSubmitting ? (
                          <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex items-center gap-3"
                          >
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            <span>Menyiapkan Email...</span>
                          </motion.div>
                        ) : (
                          <>
                            <span>Kirim Pesan</span>
                            <ArrowRight weight="bold" size={16} className="ml-4 group-hover:translate-x-2 transition-transform" />
                          </>
                        )}
                      </motion.button>
                    )}
                  </div>
                </form>

                {/* Social Proof & Trust */}
                <p className="text-[10px] uppercase tracking-[0.2em] text-[#2A2C2B]/30 mt-8 text-center flex items-center justify-center gap-4">
                  <span className="h-[1px] w-8 bg-[#2A2C2B]/10" />
                  Mendukung Pembangunan Indonesia Sejak 2011
                  <span className="h-[1px] w-8 bg-[#2A2C2B]/10" />
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
