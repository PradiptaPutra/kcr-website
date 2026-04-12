import React from 'react';
import { motion } from 'framer-motion';
import { Buildings, HardHat, CompassTool, ShieldCheck, Factory, Ruler } from '@phosphor-icons/react';
import { kcrData } from '../data/kcrData';
import SEO from '../components/SEO';
import PageHeader from '../components/PageHeader';

const About: React.FC = () => {
  const fadeInUp = {
    initial: { y: 20, opacity: 0 },
    whileInView: { y: 0, opacity: 1 },
    viewport: { once: true },
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as any }
  };

  return (
    <div className="bg-[#F5F5F0] min-h-screen pt-20 md:pt-24 pb-24 selection:bg-[#2A2C2B] selection:text-white">
      <SEO 
        title="Profil Perusahaan"
        description="Pelajari sejarah PT. KARYA CIPTA RAHARJA sejak 2006 sebagai pionir teknologi konstruksi modern, Spesialis Shotcrete Indonesia, and Kontraktor Bangunan BUMN terpercaya."
        keywords="Sejarah PT KCR, Visi Misi Kontraktor, Manajemen Konstruksi, Tim Ahli Shotcrete"
        canonicalUrl="/about"
      />

      <PageHeader 
        label="02 / PROFIL PERUSAHAAN"
        title="Dedikasi Teknis"
        subtitle="& Integritas Struktural."
        description="Lebih dari sekadar membangun, kami menciptakan fondasi yang kokoh untuk masa depan infrastruktur Indonesia melalui manajemen saksama."
      />

      {/* 1. ORIGINS & HISTORY */}
      <section className="framer-container mb-32 md:mb-48">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <motion.div {...fadeInUp} className="lg:col-span-6">
            <div className="aspect-[4/5] bg-[#1a1c19] overflow-hidden rounded-2xl shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1541888946425-d81bb19480c5?auto=format&fit=crop&q=80&w=1200" 
                className="w-full h-full object-cover opacity-80" 
                alt="History of KCR" 
              />
            </div>
          </motion.div>
          <motion.div {...fadeInUp} transition={{ delay: 0.2 }} className="lg:col-span-6 space-y-10">
            <span className="framer-label text-brand block border-b border-brand/20 pb-4">SEJARAH PEMBENTUKAN</span>
            <h2 className="framer-h2">Pionir Teknologi <br/><span className="italic text-brand font-serif">Konstruksi Modern.</span></h2>
            <div className="space-y-6 framer-body !text-lg text-[#2A2C2B]">
              <p>{kcrData.company.description}</p>
              <p>{kcrData.company.introduction}</p>
              <div className="p-8 bg-white border border-brand/10 rounded-xl">
                <p className="italic font-serif text-[20px] text-brand leading-relaxed">
                  "{kcrData.company.specialization}"
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. VISION & VALUES */}
      <section className="bg-[#2A2C2B] text-white py-24 md:py-48 relative overflow-hidden">
        <div className="framer-container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start mb-32">
            <motion.div {...fadeInUp}>
              <span className="framer-label text-brand mb-8 block tracking-[0.6em]">VISI STRATEGIS</span>
              <h2 className="framer-h1 text-white mb-10 !text-[48px] md:!text-[64px]">
                Solusi untuk <br/><span className="italic text-brand font-serif text-display">Masa Depan.</span>
              </h2>
              <p className="framer-body !text-white/60 !text-xl max-w-lg leading-relaxed">
                {kcrData.company.vision}
              </p>
            </motion.div>
            <motion.div {...fadeInUp} className="aspect-video bg-white/5 rounded-2xl overflow-hidden border border-white/10 lg:mt-24 shadow-2xl">
               <img src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover opacity-50" alt="Future Vision" />
            </motion.div>
          </div>

          <div className="border-t border-white/10 pt-20">
            <span className="framer-label text-white/20 mb-16 block tracking-[0.4em]">PILAR KEUNGGULAN KAMI</span>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
              {[
                { icon: <Factory size={40} />, title: "Infrastruktur Vital", desc: "Berpengalaman dalam proyek skala besar seperti PLTU, Pelabuhan, and Gedung Perkantoran BUMN." },
                { icon: <ShieldCheck size={40} />, title: "Standar Keamanan", desc: "Prioritas nol kecelakaan (Zero Accident) dengan kepatuhan ketat terhadap protokol K3 nasional." },
                { icon: <Ruler size={40} />, title: "Akurasi Teknis", desc: "Menggunakan peralatan and metode termodern untuk memastikan hasil kerja yang presisi and tahan lama." }
              ].map((item, i) => (
                <motion.div 
                  key={i} 
                  {...fadeInUp}
                  transition={{ delay: i * 0.2 }}
                  className="space-y-6"
                >
                  <div className="text-brand opacity-80">{item.icon}</div>
                  <h4 className="font-serif text-2xl uppercase tracking-tight">{item.title}</h4>
                  <p className="framer-body !text-white/40">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. CAPABILITIES GRID */}
      <section className="py-24 md:py-48 framer-container">
        <motion.div {...fadeInUp} className="text-center mb-24">
          <span className="framer-label text-brand mb-6 block tracking-[0.8em]">CORE CAPABILITIES</span>
          <h2 className="framer-h2 text-[#2A2C2B]">Kapasitas Operasional Kami</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
           {[ 
             { icon: <HardHat weight="light" size={48} />, t: 'Ekselerasi Proyek', d: 'Metode kerja and manajemen lapangan yang memastikan percepatan progres tanpa mengabaikan aspek teknis.' },
             { icon: <CompassTool weight="light" size={48} />, t: 'Manajemen Kimia', d: 'Distribusi and aplikasi bahan kimia konstruksi khusus untuk perlindungan and perkuatan struktur.' },
             { icon: <Buildings weight="light" size={48} />, t: 'Solusi Turnkey', d: 'Layanan menyeluruh mulai dari pengerjaan struktur beton hingga interior fit-out and fabrikasi furnitur.' }
           ].map((i, idx) => (
             <motion.div 
               key={i.t} 
               {...fadeInUp}
               transition={{ delay: idx * 0.2 }}
               className="bg-white p-12 border border-[#2A2C2B]/5 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 group"
             >
                <div className="text-brand mb-8 group-hover:scale-110 transition-transform duration-500">{i.icon}</div>
                <h3 className="font-serif text-2xl text-[#2A2C2B] mb-4 uppercase tracking-tight">{i.t}</h3>
                <p className="framer-body !text-sm">{i.d}</p>
             </motion.div>
           ))}
        </div>
      </section>
    </div>
  );
};

export default About;
