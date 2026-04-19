import React from 'react';
import { motion } from 'framer-motion';
import { Desktop, Factory, CompassTool } from '@phosphor-icons/react';
import { kcrData } from '../data/kcrData';
import SEO from '../components/SEO';
import PageHeader from '../components/PageHeader';

const About: React.FC = () => {
  const fadeInUp = {
    initial: { y: 40, opacity: 0 },
    whileInView: { y: 0, opacity: 1 },
    viewport: { once: true },
    transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] as any }
  };

  return (
    <div className="bg-[#F5F5F0] min-h-screen pt-20 md:pt-24 pb-20 md:pb-32 selection:bg-[#1A1C19] selection:text-white">
      <SEO 
        title="Tentang Kami | KCR Furniture"
        description="Pelajari sejarah KCR Furniture (PT. KARYA CIPTA RAHARJA) sejak 2006 sebagai penyedia solusi furnitur kantor dan hospitality premium dengan teknologi CNC standar Eropa."
        keywords="Furniture Kantor, Office Furniture, Workstation, Meja Eksekutif, Hospitality Furniture, Furniture Hotel, CNC Furniture, KCR Furniture Profile"
        canonicalUrl="/about"
        ogImage={kcrData.images.hero[1]}
      />

        <PageHeader 
          label="02 / PROFIL PERUSAHAAN"
          title="Dedikasi pada"
          subtitle={<>Kualitas <span className="text-brand font-serif-italic">&</span> Presisi.</>}
          description="Sejak 2006, kami telah bertransformasi menjadi mitra terpercaya dalam penyediaan furnitur dan solusi interior berkualitas tinggi untuk sektor korporasi dan hospitality."
      />

      {/* Origins */}
      <section className="framer-container mb-32 md:mb-48">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 lg:gap-32 items-center">
          <motion.div {...fadeInUp} className="lg:col-span-6 relative">
            <div className="aspect-[4/5] bg-[#1A1C19] overflow-hidden rounded-[4px] shadow-premium">
              <img src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover opacity-90 transition-transform duration-[3s] hover:scale-110" alt="KCR Manufacturing" loading="lazy" decoding="async" />
            </div>
            <div className="absolute -top-10 -right-10 w-40 h-40 border border-brand/20 rounded-full hidden xl:block" />
          </motion.div>
          <motion.div {...fadeInUp} transition={{ delay: 0.2 }} className="lg:col-span-6">
            <span className="framer-label text-brand mb-10 block tracking-[0.5em]">SEJARAH & FILOSOFI</span>
            <div className="mb-4">
              <span className="text-[10px] text-brand/80 font-bold uppercase tracking-[0.2em]">{kcrData.company.branding}</span>
            </div>
            <h2 className="framer-h2 mb-12">
              Inovasi Manufaktur <br/><span className="font-serif-italic text-brand">untuk Ruang Inspiratif.</span>
            </h2>
            <div className="space-y-10">
              <p className="framer-body !text-lg leading-relaxed text-[#1A1C19]/80">
                KCR Furniture (PT. KARYA CIPTA RAHARJA) telah hadir sejak 2006 sebagai kurator dan distributor furnitur premium. Sejak 2015, lini produksi kami didukung penuh oleh PT Afan Maju Sejahtera (AMS) yang berlokasi di Babelan, Bekasi.
              </p>
              <p className="framer-body leading-relaxed">
                Sinergi ini memungkinkan kami mengontrol kualitas dari hulu ke hilir—mulai dari pemilihan material seperti Plywood, MDF, HMR, MFC, hingga Solid Wood, dengan opsi finishing high-end seperti Lacquer, Veneer, dan Polyurethane (PU) menggunakan teknologi CNC standar Eropa.
              </p>
              <div className="pt-10 border-t border-[#1A1C19]/5">
                <p className="font-serif text-[22px] italic text-brand leading-relaxed">
                  "Spesialisasi kami mencakup Mass Production furnitur sistem kantor (Incore, Prime, Moderna, Forma Series) dan Hospitality (Bara & Cosmo Series)."
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Vision */}
      <section className="bg-[#1A1C19] text-white py-24 md:py-40 relative overflow-hidden">
        {/* Background Decor */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-white/[0.02] -skew-x-12 translate-x-1/2" />
        
        <div className="framer-container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start mb-40">
            <motion.div {...fadeInUp}>
              <span className="framer-label text-brand mb-12 block tracking-[0.5em]">VISI & MISI</span>
              <h2 className="framer-h2 text-white mb-12">
                Menjadi Mitra <br/><span className="font-serif-italic text-brand text-[1.1em]">Interior Utama.</span>
              </h2>
              <p className="framer-body !text-white/70 !text-lg max-w-md leading-relaxed">{kcrData.company.vision}</p>
            </motion.div>
            <motion.div {...fadeInUp} className="aspect-video bg-black overflow-hidden radius-organic-wide border border-white/10 lg:ml-auto w-full shadow-2xl">
               <img src="https://images.unsplash.com/photo-1497215842964-222b430dc094?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover opacity-40 grayscale hover:opacity-60 hover:grayscale-0 transition-all duration-[2s]" alt="Vision" loading="lazy" decoding="async" />
            </motion.div>
          </div>

          <motion.div {...fadeInUp} className="border-t border-white/10 pt-24">
            <span className="framer-label text-white/20 mb-16 block tracking-[0.5em]">FOKUS LAYANAN</span>
            <div className="space-y-0">
              {kcrData.services.map((service, idx) => (
                <div key={idx} className="flex flex-col md:flex-row gap-8 py-14 border-b border-white/5 group hover:bg-white/[0.02] px-6 md:px-10 transition-all duration-700">
                  <div className="md:w-1/6 text-[12px] font-serif italic text-brand">0{idx+1}</div>
                  <div className="md:w-3/6 font-serif text-[32px] text-white group-hover:translate-x-4 transition-transform duration-700">{service.title}</div>
                  <div className="md:w-2/6 framer-body !text-white/55 flex items-center gap-4 group-hover:text-white/80 transition-colors">
                    {service.description}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="py-24 md:py-40 framer-container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-20">
           {[ 
             { icon: <Factory weight="light" size={48} />, t: 'Manufaktur Mandiri', d: 'Fasilitas produksi sendiri memastikan kontrol kualitas penuh dan ketepatan waktu pengiriman.' },
             { icon: <CompassTool weight="light" size={48} />, t: 'CNC Precision', d: 'Teknologi CNC standar Eropa menjamin akurasi milimeter dan konsistensi pada setiap unit produk.' },
             { icon: <Desktop weight="light" size={48} />, t: 'Custom Design', d: 'Kemampuan adaptasi desain dan material untuk memenuhi kebutuhan spesifik dan identitas brand Anda.' }
           ].map((i, idx) => (
             <motion.div 
               key={idx}
               {...fadeInUp}
               transition={{ delay: idx * 0.15 }}
               className="flex flex-col gap-10 group"
             >
                <div className="text-brand opacity-40 group-hover:opacity-100 transition-opacity duration-700">{i.icon}</div>
                <div className="space-y-6">
                  <h3 className="font-serif text-[28px] group-hover:text-brand transition-colors duration-700">{i.t}</h3>
                  <p className="framer-body !text-sm leading-relaxed">{i.d}</p>
                </div>
                <div className="w-12 h-px bg-brand/20 group-hover:w-full transition-all duration-1000" />
             </motion.div>
           ))}
        </div>
      </section>
    </div>
  );
};

export default About;
