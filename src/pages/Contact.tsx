import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { MapPin, CaretRight, InstagramLogo, CheckCircle, Info } from '@phosphor-icons/react';
import { kcrData } from '../data/kcrData';
import SEO from '../components/SEO';
import PageHeader from '../components/PageHeader';
import { trackEvent } from '../utils/analytics';

const Contact: React.FC = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const isProfessionalMode = query.get('mode') === 'professional';
  const [formStep, setFormStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    service: '',
    message: '',
    productContext: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [referenceId, setReferenceId] = useState('');

  // Goal-Gradient Effect: Initialize context from navigation state
  useEffect(() => {
    if (isProfessionalMode) {
      setFormData((prev) => ({
        ...prev,
        service: prev.service || 'Professional Program',
        productContext: prev.productContext || 'Professional Program inquiry (B2B priority lane).'
      }));
    }

    if (location.state && typeof location.state === 'object' && 'product' in location.state && location.state.product) {
      const { product, material, color } = location.state;
      const contextStr = `Inquiry regarding ${product}${material ? ` (Material: ${material})` : ''}${color ? ` (Base Color: ${color})` : ''}`;
      setFormData(prev => ({ 
        ...prev, 
        productContext: contextStr,
        service: prev.service || 'Interior Fit-Out'
      }));
    }
  }, [isProfessionalMode, location.state]);

  const validateStepOne = () => {
    const nextErrors: Record<string, string> = {};
    if (!formData.name.trim()) nextErrors.name = 'Nama wajib diisi.';
    if (!formData.email.trim()) {
      nextErrors.email = 'Email wajib diisi.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      nextErrors.email = 'Format email tidak valid.';
    }
    if (!formData.service.trim()) nextErrors.service = 'Pilih layanan terlebih dahulu.';

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const validateStepTwo = () => {
    const nextErrors: Record<string, string> = {};
    if (!formData.message.trim()) nextErrors.message = 'Detail kebutuhan proyek wajib diisi.';
    if (formData.message.trim().length < 20) nextErrors.message = 'Tuliskan minimal 20 karakter untuk memperjelas kebutuhan.';
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStepTwo()) return;
    const id = `KCR-${Date.now().toString().slice(-6)}`;
    setReferenceId(id);
    trackEvent('contact_form_submit', {
      service: formData.service || 'unspecified',
      has_product_context: Boolean(formData.productContext),
    });
    setFormStep(3);
  };

  const fadeInUp = {
    initial: { y: 20, opacity: 0 },
    whileInView: { y: 0, opacity: 1 },
    viewport: { once: true },
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as any }
  };

  const steps = [
    { id: 1, name: 'Profile' },
    { id: 2, name: 'Project Context' },
    { id: 3, name: 'Complete' }
  ];

  return (
    <div className="bg-[#F5F5F0] min-h-screen pt-20 md:pt-24 pb-24 md:pb-40 selection:bg-[#1a1c19] selection:text-white">
      <SEO 
        title="Hubungi Kami | KCR Furniture"
        description="Mulai konsultasi furnitur dan interior Anda hari ini. Tim ahli KCR Furniture siap membantu mewujudkan ruang kerja dan hospitality yang inspiratif."
        keywords="Kontak KCR, Furniture Office, Konsultasi Proyek, Custom Furniture Indonesia, KCR Furniture Contact"
        canonicalUrl="/contact"
      />

        <PageHeader 
          label="05 / KONTAK"
          title="Mari Berdiskusi"
          subtitle={<>& Berkolaborasi <span className="text-brand font-serif-italic">Secara Teknik.</span></>}
          description="Punya pertanyaan tentang produk atau butuh penawaran custom? Kami siap mendengarkan dan memberikan solusi furnitur terbaik untuk Anda."
        />

      <section className="framer-container grid grid-cols-1 lg:grid-cols-12 gap-20">
        
        {/* 1. CONTACT INFO & REGIONAL HUBS */}
        <div className="lg:col-span-4 space-y-16">
          <motion.div {...fadeInUp}>
            <span className="framer-label text-brand mb-8 block tracking-[0.4em]">REGIONAL HUBS</span>
            <div className="space-y-12">
              {(kcrData.contact.locations || []).map((loc: any) => (
                <div key={loc.city} className="space-y-4">
                  <h4 className="font-serif text-lg font-medium text-[#1A1C19] flex items-center gap-3">
                    <MapPin weight="light" size={20} className="text-brand" />
                    {loc.city}
                  </h4>
                  <div className="pl-8 space-y-2">
                    <p className="framer-body !text-[13px] opacity-60 leading-relaxed">{loc.address}</p>
                    <div className="flex flex-col gap-1">
                      <a href={`tel:${loc.phone}`} className="text-[11px] font-mono hover:text-brand transition-colors">{loc.phone}</a>
                      <a href={`mailto:${loc.email}`} className="text-[11px] font-mono hover:text-brand transition-colors lowercase">{loc.email}</a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div {...fadeInUp} transition={{ delay: 0.2 }}>
            <span className="framer-label text-brand mb-8 block tracking-[0.4em]">SOCIAL MEDIA</span>
            <div className="flex gap-4">
               <a href="#" className="w-12 h-12 rounded-full border border-[#1a1c19]/10 flex items-center justify-center hover:bg-brand hover:text-white hover:border-brand transition-all duration-500">
                 <InstagramLogo weight="light" size={24} />
               </a>
            </div>
          </motion.div>
        </div>

        {/* 2. CONTACT FORM WITH GOAL-GRADIENT */}
        <motion.div 
          {...fadeInUp} 
          transition={{ delay: 0.3 }}
          className="lg:col-span-7 lg:col-start-6 bg-white p-6 sm:p-10 md:p-16 rounded-[4px] border border-[#1a1c19]/5 shadow-premium"
        >
          {isProfessionalMode && formStep < 3 && (
            <div className="mb-8 rounded-[4px] border border-brand/20 bg-brand/10 px-5 py-4">
              <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-brand mb-2">Professional Fast Track</p>
              <p className="text-[13px] text-[#1A1C19]/70 leading-relaxed">
                Anda menggunakan jalur prioritas B2B. Tim kami akan memprioritaskan respons dan menugaskan account lead khusus.
              </p>
            </div>
          )}
          {/* Progress Bar (Goal-Gradient) */}
          <div className="flex items-center gap-4 mb-16 border-b border-[#1a1c19]/5 pb-10">
            {steps.map((s, i) => (
              <React.Fragment key={s.id}>
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full border flex items-center justify-center text-[10px] font-bold transition-all duration-500 ${formStep >= s.id ? 'bg-[#1a1c19] border-[#1a1c19] text-white' : 'border-[#1a1c19]/10 text-[#1a1c19]/20'}`}>
                    {formStep > s.id ? <CheckCircle size={16} /> : s.id}
                  </div>
                  <span className={`framer-label !text-[9px] ${formStep >= s.id ? 'opacity-100 !text-[#1a1c19]' : 'opacity-20'}`}>{s.name}</span>
                </div>
                {i < steps.length - 1 && <div className="flex-grow h-px bg-[#1a1c19]/5 mx-2" />}
              </React.Fragment>
            ))}
          </div>

          {/* Context Alert (Context Bridge) */}
          {formData.productContext && formStep < 3 && (
            <motion.div 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="mb-12 p-6 bg-brand/5 border border-brand/10 rounded-[4px] flex gap-4 items-start"
            >
              <Info size={24} className="text-brand shrink-0" weight="light" />
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-widest text-brand block">Project Blueprint Context</span>
                <p className="text-[13px] text-[#1a1c19]/70 leading-relaxed font-medium">{formData.productContext}</p>
              </div>
            </motion.div>
          )}

          <AnimatePresence mode="wait">
            {formStep === 1 && (
              <motion.form 
                key="step1"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                 onSubmit={(e) => {
                  e.preventDefault();
                  if (!validateStepOne()) return;
                  setFormStep(2);
                  trackEvent('contact_form_step', { step: 2 });
                }} 
                 className="space-y-10"
               >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="flex flex-col gap-3">
                    <label className="framer-label !text-[10px] opacity-40">NAMA LENGKAP</label>
                    <input 
                      required
                      type="text" 
                      placeholder="John Doe"
                      className={`w-full bg-transparent border-b py-3 text-[15px] transition-all font-sans focus:outline-none focus:border-brand ${errors.name ? 'border-red-500' : 'border-[#1a1c19]/10'}`}
                      value={formData.name}
                      onChange={(e) => {
                        setFormData({...formData, name: e.target.value});
                        if (errors.name) setErrors((prev) => ({ ...prev, name: '' }));
                      }}
                    />
                    {errors.name && <p className="text-[12px] text-red-600">{errors.name}</p>}
                  </div>
                  <div className="flex flex-col gap-3">
                    <label className="framer-label !text-[10px] opacity-40">ALAMAT EMAIL</label>
                    <input 
                      required
                      type="email" 
                      placeholder="john@company.com"
                      className={`w-full bg-transparent border-b py-3 text-[15px] transition-all font-sans focus:outline-none focus:border-brand ${errors.email ? 'border-red-500' : 'border-[#1a1c19]/10'}`}
                      value={formData.email}
                      onChange={(e) => {
                        setFormData({...formData, email: e.target.value});
                        if (errors.email) setErrors((prev) => ({ ...prev, email: '' }));
                      }}
                    />
                    {errors.email && <p className="text-[12px] text-red-600">{errors.email}</p>}
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="flex flex-col gap-3">
                    <label className="framer-label !text-[10px] opacity-40">NAMA PERUSAHAAN</label>
                    <input 
                      type="text" 
                      placeholder="Company Name"
                      className="w-full bg-transparent border-b border-[#1a1c19]/10 py-3 text-[15px] focus:outline-none focus:border-brand transition-all font-sans"
                      value={formData.company}
                      onChange={(e) => setFormData({...formData, company: e.target.value})}
                    />
                  </div>
                  <div className="flex flex-col gap-3">
                    <label className="framer-label !text-[10px] opacity-40">MINAT LAYANAN</label>
                    <select 
                      required
                      className={`w-full bg-transparent border-b py-3 text-[15px] transition-all font-sans appearance-none focus:outline-none focus:border-brand ${errors.service ? 'border-red-500' : 'border-[#1a1c19]/10'}`}
                      value={formData.service}
                      onChange={(e) => {
                        setFormData({...formData, service: e.target.value});
                        if (errors.service) setErrors((prev) => ({ ...prev, service: '' }));
                      }}
                    >
                      <option value="">Pilih Layanan...</option>
                      <option value="Furnitur Kantor">Furnitur Kantor</option>
                      <option value="Hospitality Custom">Hospitality Custom</option>
                      <option value="Manufaktur CNC">Manufaktur CNC</option>
                       <option value="Interior Fit-Out">Interior Fit-Out</option>
                       <option value="Professional Program">Professional Program (B2B)</option>
                     </select>
                    {errors.service && <p className="text-[12px] text-red-600">{errors.service}</p>}
                  </div>
                </div>
                <button className="w-full py-6 bg-[#1a1c19] text-white rounded-[4px] text-[11px] font-bold uppercase tracking-[0.3em] hover:bg-brand transition-all shadow-xl shadow-[#1a1c19]/10 flex items-center justify-center gap-4 group">
                  Lanjutkan Proyek <CaretRight weight="bold" className="group-hover:translate-x-1 transition-transform" />
                </button>
              </motion.form>
            )}

            {formStep === 2 && (
              <motion.form 
                key="step2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                onSubmit={handleSubmit} 
                className="space-y-10"
              >
                <div className="flex flex-col gap-3 text-left">
                    <label className="framer-label !text-[10px] opacity-40">PESAN / KEBUTUHAN TEKNIK</label>
                    <textarea 
                      required
                      rows={6}
                      placeholder="Ceritakan detail proyek atau produk yang Anda butuhkan..."
                      className={`w-full bg-transparent border p-6 rounded-[4px] text-[15px] focus:outline-none focus:border-brand transition-all font-sans resize-none ${errors.message ? 'border-red-500' : 'border-[#1a1c19]/10'}`}
                      value={formData.message}
                      onChange={(e) => {
                        setFormData({...formData, message: e.target.value});
                        if (errors.message) setErrors((prev) => ({ ...prev, message: '' }));
                      }}
                    />
                    {errors.message && <p className="text-[12px] text-red-600">{errors.message}</p>}
                  </div>
                  <div className="flex flex-col gap-4">
                    <button className="w-full py-6 bg-[#1a1c19] text-white rounded-[4px] text-[11px] font-bold uppercase tracking-[0.3em] hover:bg-brand transition-all shadow-xl shadow-[#1a1c19]/10">
                      Ajukan Blueprint Teknik
                    </button>
                    <button 
                      type="button" 
                      onClick={() => setFormStep(1)}
                      className="framer-label !text-[10px] opacity-40 hover:opacity-100 transition-opacity"
                    >
                      KEMBALI KE SEBELUMNYA
                    </button>
                  </div>
              </motion.form>
            )}

            {formStep === 3 && (
              <motion.div 
                key="step3"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-20"
              >
                <div className="w-20 h-20 bg-[#F5F5F0] rounded-full flex items-center justify-center mx-auto mb-8">
                    <CheckCircle weight="fill" size={48} className="text-brand" />
                </div>
                <h3 className="font-serif text-3xl mb-4 text-[#1a1c19]">Permintaan Berhasil</h3>
                <p className="text-[11px] uppercase tracking-[0.22em] text-brand mb-5">Reference: {referenceId}</p>
                <p className="framer-body opacity-60 max-w-sm mx-auto mb-8 leading-relaxed">Pesan Anda telah kami terima. Konsultan desain kami akan menyiapkan draf blueprint dan menghubungi Anda dalam 1x24 jam.</p>
                <div className="mx-auto mb-10 max-w-md rounded-[4px] border border-[#1A1C19]/10 bg-[#F5F5F0] p-5 text-left">
                  <p className="text-[11px] uppercase tracking-[0.2em] text-[#1A1C19]/60 mb-2">Next Steps</p>
                  <ol className="space-y-2 text-[13px] text-[#1A1C19]/70">
                    <li>1. Tim kami meninjau kebutuhan proyek Anda.</li>
                    <li>2. Anda menerima draft rekomendasi desain awal.</li>
                    <li>3. Sesi konsultasi teknis dijadwalkan bersama tim KCR.</li>
                  </ol>
                </div>
                <button 
                  onClick={() => {
                    setFormStep(1);
                    setReferenceId('');
                    setErrors({});
                    setFormData({ name: '', email: '', company: '', service: '', message: '', productContext: '' });
                  }}
                  className="framer-label text-brand hover:underline"
                >
                  Ajukan Proyek Lainnya
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

      </section>
    </div>
  );
};

export default Contact;
