import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Envelope, ArrowRight } from '@phosphor-icons/react';
import { kcrData } from '../data/kcrData';
import SEO from '../components/SEO';
import PageHeader from '../components/PageHeader';

const Contact: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: '',
    details: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const subject = encodeURIComponent(`Inquiry: ${formData.category} - ${formData.name}`);
    const body = encodeURIComponent(`Nama: ${formData.name}\nEmail: ${formData.email}\nKategori: ${formData.category}\n\nDetail:\n${formData.details}`);
    
    window.location.href = `mailto:${kcrData.contact.emails[1]}?subject=${subject}&body=${body}`;
    setIsSubmitting(false);
  };

  const fadeInUp = {
    initial: { y: 20, opacity: 0 },
    whileInView: { y: 0, opacity: 1 },
    viewport: { once: true },
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as any }
  };

  return (
    <div className="bg-[#F5F5F0] min-h-screen pt-24 pb-20 md:pb-40 selection:bg-[#2A2C2B] selection:text-white">
      <SEO 
        title="Hubungi Kami | Konsultasi Proyek Gratis"
        description="Punya rencana proyek? Mari ngobrol. Tim KCR siap mendengarkan and memberikan solusi konstruksi terbaik untuk Anda."
        keywords="Kontak KCR, Hubungi Kontraktor BUMN, Konsultasi Proyek, Spesialis Shotcrete Indonesia"
        canonicalUrl="/contact"
      />

      <PageHeader 
        label="HUBUNGI KAMI"
        title="Mari Diskusikan"
        subtitle="Proyek Anda."
        description="Tim ahli kami siap memberikan solusi teknis and estimasi biaya yang akurat untuk kebutuhan konstruksi Anda."
      />

      <section className="framer-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          
          {/* LEFT: Contact Information */}
          <div className="lg:col-span-4 space-y-10 md:space-y-12">
            <motion.div {...fadeInUp} className="space-y-8 md:space-y-10">
              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center border border-[#1a1c19]/10 shrink-0">
                  <MapPin size={24} className="text-brand" weight="light" />
                </div>
                <div>
                  <h3 className="framer-label !opacity-100 mb-2">Kantor Pusat</h3>
                  <p className="framer-body !text-sm leading-relaxed">{kcrData.contact.address}</p>
                </div>
              </div>

              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center border border-[#1a1c19]/10 shrink-0">
                  <Envelope size={24} className="text-brand" weight="light" />
                </div>
                <div>
                  <h3 className="framer-label !opacity-100 mb-2">Email</h3>
                  <p className="framer-body !text-sm">{kcrData.contact.emails[1]}</p>
                  <p className="framer-body !text-sm opacity-50">{kcrData.contact.emails[0]}</p>
                </div>
              </div>

              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center border border-[#1a1c19]/10 shrink-0">
                  <Phone size={24} className="text-brand" weight="light" />
                </div>
                <div>
                  <h3 className="framer-label !opacity-100 mb-2">Telepon</h3>
                  <p className="framer-body !text-sm">{kcrData.contact.phones[0]}</p>
                </div>
              </div>
            </motion.div>

            <motion.div {...fadeInUp} transition={{ delay: 0.2 }} className="p-8 bg-[#1a1c19] rounded-2xl text-white">
               <p className="framer-label !text-brand mb-4">Jam Operasional</p>
               <p className="font-serif text-xl italic mb-2">Senin — Jumat</p>
               <p className="text-white/50 text-sm">08:00 - 17:00 WIB</p>
            </motion.div>
          </div>

          {/* RIGHT: Simple Contact Form */}
          <div className="lg:col-span-8">
            <motion.div 
              {...fadeInUp} 
              className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-[#1a1c19]/5"
            >
              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="framer-label !text-[10px] !opacity-100">Nama Lengkap</label>
                  <input 
                    required
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full bg-[#F5F5F0]/50 border-b border-[#1a1c19]/10 py-4 px-4 focus:border-brand transition-colors outline-none font-serif italic text-lg"
                    placeholder="Contoh: Bpk. Heru"
                  />
                </div>

                <div className="space-y-2">
                  <label className="framer-label !text-[10px] !opacity-100">Alamat Email</label>
                  <input 
                    required
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full bg-[#F5F5F0]/50 border-b border-[#1a1c19]/10 py-4 px-4 focus:border-brand transition-colors outline-none font-serif italic text-lg"
                    placeholder="nama@perusahaan.com"
                  />
                </div>

                <div className="md:col-span-2 space-y-2">
                  <label className="framer-label !text-[10px] !opacity-100">Kategori Layanan</label>
                  <select 
                    required
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full bg-[#F5F5F0]/50 border-b border-[#1a1c19]/10 py-4 px-4 focus:border-brand transition-colors outline-none font-serif italic text-lg appearance-none cursor-pointer"
                  >
                    <option value="">Pilih layanan...</option>
                    <option value="Kontraktor Bangunan">Kontraktor Bangunan</option>
                    <option value="Spesialis Shotcrete">Spesialis Shotcrete</option>
                    <option value="Sistem Prefabrikasi">Sistem Prefabrikasi</option>
                    <option value="Interior & Furnitur">Interior & Furnitur</option>
                  </select>
                </div>

                <div className="md:col-span-2 space-y-2">
                  <label className="framer-label !text-[10px] !opacity-100">Pesan / Detail Proyek</label>
                  <textarea 
                    required
                    name="details"
                    value={formData.details}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full bg-[#F5F5F0]/50 border-b border-[#1a1c19]/10 py-4 px-4 focus:border-brand transition-colors outline-none font-serif italic text-lg resize-none"
                    placeholder="Ceritakan singkat rencana proyek Anda..."
                  />
                </div>

                <div className="md:col-span-2 pt-4">
                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full md:w-auto px-12 py-5 bg-brand text-white rounded-full font-bold uppercase tracking-widest text-[11px] hover:bg-[#2A2C2B] transition-all flex items-center justify-center gap-4 group"
                  >
                    {isSubmitting ? 'Mengirim...' : (
                      <>
                        Kirim Pesan Melalui Email
                        <ArrowRight className="group-hover:translate-x-2 transition-transform" weight="bold" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>

        </div>
      </section>
    </div>
  );
};

export default Contact;
