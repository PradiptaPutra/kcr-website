import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CaretDown, MapPin, Phone, Envelope } from '@phosphor-icons/react';
import { kcrData } from '../data/kcrData';
import SEO from '../components/SEO';

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
    const subject = encodeURIComponent(`Inquiry: ${formData.get('category')} - ${formData.get('name')}`);
    const body = encodeURIComponent(`Nama: ${formData.get('name')}\nEmail: ${formData.get('email')}\nKategori: ${formData.get('category')}\n\nDetail:\n${formData.get('details')}`);
    window.location.href = `mailto:${kcrData.contact.emails[1]}?subject=${subject}&body=${body}`;
  };

  return (
    <div className="bg-[#F5F5F0] min-h-screen pt-32 pb-40 selection:bg-[#2A2C2B] selection:text-white">
      <SEO 
        title="Hubungi KCR | Konsultasi Proyek BUMN & Spesialis Shotcrete"
        description="Hubungi PT. KARYA CIPTA RAHARJA untuk konsultasi teknis proyek konstruksi Anda. Kami siap melayani kebutuhan kontraktor bangunan BUMN dan spesialis shotcrete di Indonesia."
        keywords="Kontak KCR, Hubungi Kontraktor BUMN, Konsultasi Proyek, Spesialis Shotcrete Indonesia"
        canonicalUrl="/contact"
        aeoAnswer="Hubungi PT. KARYA CIPTA RAHARJA di (021) 84598590 atau kunjungi kantor pusat kami di Bekasi untuk konsultasi teknis. Sebagai Spesialis Shotcrete Indonesia dan Kontraktor Bangunan BUMN, tim ahli kami siap mendampingi perencanaan struktur, penganggaran proyek (RAB), dan eksekusi lapangan dengan standar ketepatan tinggi."
      />

      <section className="framer-container">
        {/* 1. HEADER - Minimal & Strong */}
        <motion.div {...fadeInUp} className="max-w-3xl mb-24">
          <span className="framer-label text-brand mb-6 block tracking-[0.6em]">Get in Touch</span>
          <h1 className="framer-h1 !text-[48px] md:!text-[64px] mb-8">
            Mari mulai diskusi <br />
            <span className="italic font-serif text-brand">teknis Anda.</span>
          </h1>
          <p className="framer-body !text-[18px] max-w-xl">
            Sampaikan visi proyek Anda. Tim ahli kami siap membantu mengejawantahkan rencana tersebut menjadi realitas struktural yang presisi.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          {/* 2. LEFT: CONTACT DETAILS & IMAGE */}
          <div className="lg:col-span-5 space-y-16">
            <motion.div {...fadeInUp} transition={{ delay: 0.2 }} className="space-y-12">
              <div className="flex gap-6 items-start">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center border-[0.5px] border-[#2A2C2B]/10 flex-shrink-0">
                  <MapPin weight="light" size={20} className="text-brand" />
                </div>
                <div>
                  <h3 className="framer-label !opacity-100 mb-3">Kantor Pusat</h3>
                  <p className="framer-body !text-[14px] leading-relaxed max-w-xs">{kcrData.contact.address}</p>
                </div>
              </div>

              <div className="flex gap-6 items-start">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center border-[0.5px] border-[#2A2C2B]/10 flex-shrink-0">
                  <Envelope weight="light" size={20} className="text-brand" />
                </div>
                <div>
                  <h3 className="framer-label !opacity-100 mb-3">Email Inkuiri</h3>
                  <p className="framer-body !text-[14px]">{kcrData.contact.emails[1]}</p>
                  <p className="framer-body !text-[14px]">{kcrData.contact.emails[0]}</p>
                </div>
              </div>

              <div className="flex gap-6 items-start">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center border-[0.5px] border-[#2A2C2B]/10 flex-shrink-0">
                  <Phone weight="light" size={20} className="text-brand" />
                </div>
                <div>
                  <h3 className="framer-label !opacity-100 mb-3">Telepon</h3>
                  <p className="framer-body !text-[14px]">{kcrData.contact.phones[0]}</p>
                </div>
              </div>
            </motion.div>

            <motion.div {...fadeInUp} transition={{ delay: 0.4 }} className="aspect-[4/3] bg-[#e5e5e0] rounded-[8px] overflow-hidden hidden lg:block">
              <img 
                src="https://images.pexels.com/photos/6794929/pexels-photo-6794929.jpeg" 
                className="w-full h-full object-cover opacity-80" 
                alt="Studio"
              />
            </motion.div>
          </div>

          {/* 3. RIGHT: CLEAN FORM PORTAL */}
          <motion.div {...fadeInUp} transition={{ delay: 0.3 }} className="lg:col-span-7">
            <div className="bg-white p-8 md:p-16 rounded-[12px] border-[0.5px] border-[#2A2C2B]/10 shadow-sm relative">
              <h2 className="font-serif text-[28px] mb-12 text-[#2A2C2B]">Formulir Inkuiri Teknis</h2>
              
              <form onSubmit={handleSubmit} className="space-y-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="flex flex-col gap-3">
                    <label className="framer-label !text-[10px]">Nama Lengkap</label>
                    <input name="name" type="text" required className="bg-transparent border-b-[0.5px] border-[#2A2C2B]/20 py-2 focus:outline-none focus:border-brand transition-all framer-body !text-[#2A2C2B]" placeholder="Contoh: Budi Santoso" />
                  </div>
                  <div className="flex flex-col gap-3">
                    <label className="framer-label !text-[10px]">Alamat Email</label>
                    <input name="email" type="email" required className="bg-transparent border-b-[0.5px] border-[#2A2C2B]/20 py-2 focus:outline-none focus:border-brand transition-all framer-body !text-[#2A2C2B]" placeholder="email@perusahaan.com" />
                  </div>
                </div>

                <div className="flex flex-col gap-3 relative">
                  <label className="framer-label !text-[10px]">Kategori Proyek</label>
                  <select name="category" required className="bg-transparent border-b-[0.5px] border-[#2A2C2B]/20 py-2 focus:outline-none appearance-none cursor-pointer framer-body !text-[#2A2C2B]">
                    <option value="" disabled selected>Pilih layanan utama</option>
                    <option value="BUILDING">Building Contractor</option>
                    <option value="SHOTCRETE">Shotcrete Specialist</option>
                    <option value="PREFAB">Prefab Building System</option>
                    <option value="INTERIOR">Interior & Furniture</option>
                  </select>
                  <CaretDown weight="light" size={16} className="absolute right-0 bottom-3 opacity-30 pointer-events-none" />
                </div>

                <div className="flex flex-col gap-3">
                  <label className="framer-label !text-[10px]">Detail Permintaan</label>
                  <textarea name="details" required rows={4} className="bg-transparent border-b-[0.5px] border-[#2A2C2B]/20 py-2 focus:outline-none focus:border-brand transition-all resize-none framer-body !text-[#2A2C2B]" placeholder="Ceritakan kebutuhan RAB atau spesifikasi proyek Anda..." />
                </div>

                <div className="pt-6">
                  <button type="submit" className="framer-btn w-full justify-center group !bg-[#2A2C2B] !text-white border-none hover:!bg-brand">
                    <span>Kirim Pesan</span>
                    <ArrowRight weight="bold" size={16} className="ml-4 group-hover:translate-x-2 transition-transform" />
                  </button>
                  <p className="text-[10px] uppercase tracking-widest text-[#2A2C2B]/30 mt-6 text-center">
                    Kami akan merespons permintaan Anda dalam 1-2 hari kerja.
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
