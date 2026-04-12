import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, CaretDown, MapPin, Phone, Envelope } from '@phosphor-icons/react';
import { kcrData } from '../data/kcrData';
import SEO from '../components/SEO';
import PageHeader from '../components/PageHeader';

const Contact: React.FC = () => {
  const fadeInUp = {
    initial: { y: 20, opacity: 0 },
    whileInView: { y: 0, opacity: 1 },
    viewport: { once: true },
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as any }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const subject = encodeURIComponent(`Project Inquiry: ${formData.get('category')} - ${formData.get('name')}`);
    const body = encodeURIComponent(`Nama: ${formData.get('name')}\nEmail: ${formData.get('email')}\nKategori: ${formData.get('category')}\n\nDetail:\n${formData.get('details')}`);
    window.location.href = `mailto:${kcrData.contact.emails[1]}?subject=${subject}&body=${body}`;
  };

  return (
    <div className="bg-[#F5F5F0] min-h-screen pt-20 md:pt-24 pb-24 selection:bg-[#2A2C2B] selection:text-white">
      <SEO 
        title="Kontak & Konsultasi"
        description="Hubungi tim teknis PT. KARYA CIPTA RAHARJA untuk konsultasi arsitektural, evaluasi struktural, and penawaran proyek konstruksi."
        keywords="Kontak KCR, Hubungi Kontraktor BUMN, Konsultasi Proyek, Spesialis Shotcrete Indonesia"
        canonicalUrl="/contact"
      />

      <PageHeader 
        label="05 / KONTAK"
        title="Hubungi"
        subtitle="& Inkuiri Teknik."
        description="Mari diskusikan visi proyek Anda. Tim ahli kami siap membantu mengejawantahkan rencana tersebut menjadi realitas struktural yang presisi."
      />

      <section className="framer-container mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          {/* 1. CONTACT INFO */}
          <div className="lg:col-span-5 space-y-16">
            <motion.div {...fadeInUp} transition={{ delay: 0.2 }} className="space-y-12">
              <div className="flex gap-8 items-start">
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center border border-brand/10 flex-shrink-0 shadow-sm">
                  <MapPin weight="light" size={24} className="text-brand" />
                </div>
                <div className="space-y-3">
                  <h3 className="framer-label !text-brand !opacity-100">Kantor Pusat</h3>
                  <p className="framer-body !text-[15px] leading-relaxed max-w-xs">{kcrData.contact.address}</p>
                </div>
              </div>

              <div className="flex gap-8 items-start">
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center border border-brand/10 flex-shrink-0 shadow-sm">
                  <Envelope weight="light" size={24} className="text-brand" />
                </div>
                <div className="space-y-3">
                  <h3 className="framer-label !text-brand !opacity-100">Email Inkuiri</h3>
                  <div className="flex flex-col gap-1">
                    <a href={`mailto:${kcrData.contact.emails[1]}`} className="framer-body !text-[15px] hover:text-brand transition-colors">{kcrData.contact.emails[1]}</a>
                    <a href={`mailto:${kcrData.contact.emails[0]}`} className="framer-body !text-[15px] hover:text-brand transition-colors opacity-60">{kcrData.contact.emails[0]}</a>
                  </div>
                </div>
              </div>

              <div className="flex gap-8 items-start">
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center border border-brand/10 flex-shrink-0 shadow-sm">
                  <Phone weight="light" size={24} className="text-brand" />
                </div>
                <div className="space-y-3">
                  <h3 className="framer-label !text-brand !opacity-100">Telepon</h3>
                  <p className="framer-body !text-[15px] font-medium">{kcrData.contact.phones[0]}</p>
                </div>
              </div>
            </motion.div>

            <motion.div {...fadeInUp} transition={{ delay: 0.4 }} className="aspect-video bg-white rounded-2xl overflow-hidden shadow-2xl border border-[#1a1c19]/5 group relative">
              <img 
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200" 
                className="w-full h-full object-cover opacity-80 transition-all duration-[2s] group-hover:scale-110" 
                alt="Studio Atmosphere"
              />
              <div className="absolute inset-0 bg-brand/10 mix-blend-multiply opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
            </motion.div>
          </div>

          {/* 2. INQUIRY FORM */}
          <motion.div {...fadeInUp} transition={{ delay: 0.3 }} className="lg:col-span-7">
            <div className="bg-white p-10 md:p-20 rounded-3xl border border-brand/10 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand/5 rounded-full -mr-16 -mt-16 blur-3xl" />
              <h2 className="font-serif text-[32px] mb-12 text-[#2A2C2B] tracking-tight">Formulir Inkuiri Teknis</h2>
              
              <form onSubmit={handleSubmit} className="space-y-12 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div className="flex flex-col gap-4 group">
                    <label className="framer-label !text-[10px] group-focus-within:text-brand transition-colors">Nama Lengkap</label>
                    <input name="name" type="text" required className="bg-transparent border-b border-[#2A2C2B]/10 py-3 focus:outline-none focus:border-brand transition-all framer-body !text-[#2A2C2B] placeholder:opacity-20" placeholder="Nama Anda" />
                  </div>
                  <div className="flex flex-col gap-4 group">
                    <label className="framer-label !text-[10px] group-focus-within:text-brand transition-colors">Alamat Email</label>
                    <input name="email" type="email" required className="bg-transparent border-b border-[#2A2C2B]/10 py-3 focus:outline-none focus:border-brand transition-all framer-body !text-[#2A2C2B] placeholder:opacity-20" placeholder="email@perusahaan.com" />
                  </div>
                </div>

                <div className="flex flex-col gap-4 relative group">
                  <label className="framer-label !text-[10px] group-focus-within:text-brand transition-colors">Kategori Proyek</label>
                  <div className="relative">
                    <select name="category" required className="w-full bg-transparent border-b border-[#2A2C2B]/10 py-3 focus:outline-none appearance-none cursor-pointer framer-body !text-[#2A2C2B]">
                      <option value="" disabled selected>Pilih layanan utama</option>
                      <option value="BUILDING">Building Contractor</option>
                      <option value="SHOTCRETE">Shotcrete Specialist</option>
                      <option value="PREFAB">Prefab Building System</option>
                      <option value="INTERIOR">Interior & Furniture</option>
                    </select>
                    <CaretDown weight="light" size={18} className="absolute right-0 bottom-4 opacity-30 pointer-events-none group-focus-within:text-brand transition-colors" />
                  </div>
                </div>

                <div className="flex flex-col gap-4 group">
                  <label className="framer-label !text-[10px] group-focus-within:text-brand transition-colors">Detail Permintaan</label>
                  <textarea name="details" required rows={5} className="bg-transparent border-b border-[#2A2C2B]/10 py-3 focus:outline-none focus:border-brand transition-all resize-none framer-body !text-[#2A2C2B] placeholder:opacity-20" placeholder="Ceritakan kebutuhan teknis, lokasi, atau anggaran proyek Anda..." />
                </div>

                <div className="pt-8 border-t border-[#2A2C2B]/5">
                  <button type="submit" className="framer-btn w-full justify-center group !bg-[#2A2C2B] !text-white border-none hover:!bg-brand transition-all py-6 shadow-xl shadow-brand/10">
                    <span className="text-[13px] tracking-[0.4em]">Kirim Inkuiri Sekarang</span>
                    <ArrowUpRight weight="bold" size={20} className="ml-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </button>
                  <p className="text-[10px] uppercase tracking-[0.3em] text-[#2A2C2B]/30 mt-8 text-center font-medium">
                    Estimasi respons: 1-2 hari kerja untuk tinjauan teknis awal.
                  </p>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
