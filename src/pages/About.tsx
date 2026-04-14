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
    transition: { duration: 1, ease: [0.22, 1, 0.36, 1] as any }
  };

  return (
    <div className="bg-[#F5F5F0] min-h-screen pt-20 md:pt-24 pb-20 md:pb-32 selection:bg-[#1a1c19] selection:text-white">
      <SEO 
        title="Tentang Kami | KCR Furniture"
        description="Pelajari sejarah KCR Furniture (PT. KARYA CIPTA RAHARJA) sejak 2006 sebagai penyedia solusi furnitur kantor and hospitality premium dengan teknologi CNC standar Eropa."
        keywords="Furniture Kantor, Office Furniture, Workstation, Meja Eksekutif, Hospitality Furniture, Furniture Hotel, CNC Furniture, KCR Furniture Profile"
        canonicalUrl="/about"
        ogImage={kcrData.images.hero[1]}
      />

      <PageHeader 
        label="02 / PROFIL PERUSAHAAN"
        title="Dedikasi pada"
        subtitle="Kualitas & Presisi."
        description="Sejak 2006, kami telah bertransformasi menjadi mitra terpercaya dalam penyediaan furnitur and solusi interior berkualitas tinggi untuk sektor korporasi and hospitality."
      />

      {/* Origins */}
      <section className="framer-container mb-24 md:mb-40">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
          <motion.div {...fadeInUp} className="lg:col-span-6 relative">
            <div className="aspect-[4/5] bg-[#1a1c19] overflow-hidden">
              <img src="/assets/images/overview/INTERIOR_FITOUT_cropped.jpg" className="w-full h-full object-cover" alt="KCR Manufacturing" loading="lazy" />
            </div>
          </motion.div>
          <motion.div {...fadeInUp} transition={{ delay: 0.2, duration: 1 }} className="lg:col-span-6">
            <span className="framer-label opacity-30 mb-8 block framer-border pb-4">Sejarah & Filosofi</span>
            <h2 className="framer-h2 mb-10">
              Inovasi Manufaktur <br/><span className="italic text-brand font-serif">untuk Ruang Inspiratif.</span>
            </h2>
            <div className="space-y-8 framer-body max-w-md">
              <p>{kcrData.company.description}</p>
              <p>{kcrData.company.introduction}</p>
              <p className="italic font-serif text-[18px] pt-6 border-l-[0.5px] border-brand pl-8">{kcrData.company.specialization}</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Vision */}
      <section className="bg-[#1a1c19] text-[#F5F5F0] py-24 md:py-40">
        <div className="framer-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start mb-32">
            <motion.div {...fadeInUp}>
              <span className="framer-label text-brand mb-12 block">VISI & MISI</span>
              <h2 className="framer-h1 text-white mb-10">
                Menjadi Mitra <br/><span className="italic text-brand font-serif">Interior Utama.</span>
              </h2>
              <p className="framer-body !text-white/50 max-w-sm">{kcrData.company.vision}</p>
            </motion.div>
            <motion.div {...fadeInUp} className="aspect-video bg-black overflow-hidden border-[0.5px] border-white/10 lg:ml-auto w-full">
               <img src="/assets/images/workstation/WORKSTATION_MODERNA_cropped.jpg" className="w-full h-full object-cover opacity-60" alt="Vision" loading="lazy" />
            </motion.div>
          </div>

          <motion.div {...fadeInUp} className="border-t-[0.5px] border-white/10 pt-20">
            <span className="framer-label text-white/20 mb-12 block tracking-[0.4em]">Fokus Layanan</span>
            <div className="space-y-0">
              {kcrData.services.map((service, idx) => (
                <div key={idx} className="flex flex-col md:flex-row gap-6 py-10 border-b-[0.5px] border-white/5 group hover:bg-white/[0.02] px-6 transition-colors duration-500">
                  <div className="md:w-1/6 text-[11px] uppercase tracking-[0.3em] font-medium text-brand">0{idx+1}</div>
                  <div className="md:w-3/6 font-serif text-[28px] text-white group-hover:text-brand transition-colors duration-500">{service.title}</div>
                  <div className="md:w-2/6 framer-body !text-white/40 hidden md:block">{service.description}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="py-24 md:py-40 framer-container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
           {[ 
             { icon: <Factory weight="light" size={40} />, t: 'Manufaktur Mandiri', d: 'Fasilitas produksi sendiri memastikan kontrol kualitas penuh and ketepatan waktu pengiriman.' },
             { icon: <CompassTool weight="light" size={40} />, t: 'CNC Precision', d: 'Teknologi CNC standar Eropa menjamin akurasi milimeter and konsistensi pada setiap unit produk.' },
             { icon: <Desktop weight="light" size={40} />, t: 'Custom Design', d: 'Kemampuan adaptasi desain and material untuk memenuhi kebutuhan spesifik and identitas brand Anda.' }
           ].map((i, idx) => (
             <motion.div 
               key={idx}
               {...fadeInUp}
               transition={{ delay: idx * 0.1, duration: 1 }}
               className="flex flex-col gap-6"
             >
                <div className="text-brand">{i.icon}</div>
                <h3 className="font-serif text-2xl">{i.t}</h3>
                <p className="framer-body !text-sm">{i.d}</p>
             </motion.div>
           ))}
        </div>
      </section>
    </div>
  );
};

export default About;
