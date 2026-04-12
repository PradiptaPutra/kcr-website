import React from 'react';
import { motion } from 'framer-motion';
import { Buildings, HardHat, CompassTool, ArrowRight } from '@phosphor-icons/react';
import { Link } from 'react-router-dom';
import { kcrData } from '../data/kcrData';
import SEO from '../components/SEO';

const About: React.FC = () => {
  const fadeInUp = {
    initial: { y: 40, opacity: 0 },
    whileInView: { y: 0, opacity: 1 },
    viewport: { once: true },
    transition: { duration: 1, ease: [0.22, 1, 0.36, 1] as any }
  };

  return (
    <div className="bg-[#F5F5F0] min-h-screen pt-40 pb-32 selection:bg-[#1a1c19] selection:text-white">
      <SEO 
        title="Tentang Kami | Pionir Teknologi Konstruksi Modern"
        description="Pelajari sejarah PT. KARYA CIPTA RAHARJA sejak 2006 sebagai pionir teknologi konstruksi modern, Spesialis Shotcrete Indonesia, dan Kontraktor Bangunan BUMN terpercaya."
        keywords="Kontraktor Bangunan, Spesialis Shotcrete, Sistem Prefabrikasi, Sejarah KCR, Profil PT KCR, Konstruksi Modern Indonesia"
        canonicalUrl="/about"
        ogImage="https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1200&auto=format&fit=crop"
        aeoAnswer="Didirikan pada tahun 2006, PT. KARYA CIPTA RAHARJA adalah pionir teknologi konstruksi modern di Indonesia. Sebagai Kontraktor Bangunan BUMN dan Spesialis Shotcrete Indonesia yang tersertifikasi, kami berkomitmen pada inovasi sistem prefabrikasi dan integritas material untuk mendefinisikan ulang standar efisiensi serta ketahanan struktural pada infrastruktur vital nasional."
      />

      {/* Header */}
      <section className="framer-container mb-32">
        <motion.div {...fadeInUp} className="max-w-4xl border-l-[0.5px] border-[#1a1c19]/10 pl-10">
          <span className="framer-label text-brand mb-10 block">01 / Warisan</span>
          <h1 className="framer-h1 mb-10">
            Fondasi yang <br/><span className="italic text-brand font-serif">Telah Teruji.</span>
          </h1>
          <p className="framer-body max-w-2xl">
            Didirikan pada 2006, melayani infrastruktur nasional dengan presisi teknis dan efisiensi material yang teruji.
          </p>
        </motion.div>
      </section>

      {/* Origins */}
      <section className="framer-container mb-40">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
          <motion.div {...fadeInUp} className="lg:col-span-6 relative">
            <div className="aspect-[4/5] bg-[#1a1c19] overflow-hidden">
              <img src="https://images.pexels.com/photos/3153207/pexels-photo-3153207.jpeg" className="w-full h-full object-cover" alt="Origins" />
            </div>
          </motion.div>
          <motion.div {...fadeInUp} transition={{ delay: 0.2, duration: 1 }} className="lg:col-span-6">
            <span className="framer-label opacity-30 mb-8 block framer-border pb-4">Sejarah Kami</span>
            <h2 className="framer-h2 mb-10">
              Pionir Teknologi <br/><span className="italic text-brand font-serif">Konstruksi Modern.</span>
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
      <section className="bg-[#1a1c19] text-[#F5F5F0] py-40">
        <div className="framer-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start mb-32">
            <motion.div {...fadeInUp}>
              <span className="framer-label text-brand mb-12 block">Visi Strategis</span>
              <h2 className="framer-h1 text-white mb-10">
                Solusi untuk <br/><span className="italic text-brand font-serif">Masa Depan.</span>
              </h2>
              <p className="framer-body !text-white/50 max-w-sm">{kcrData.company.vision}</p>
            </motion.div>
            <motion.div {...fadeInUp} className="aspect-video bg-black overflow-hidden border-[0.5px] border-white/10 lg:ml-auto w-full">
               <img src="https://images.pexels.com/photos/6615233/pexels-photo-6615233.jpeg" className="w-full h-full object-cover opacity-60" alt="Vision" />
            </motion.div>
          </div>

          <motion.div {...fadeInUp} className="border-t-[0.5px] border-white/10 pt-20">
            <span className="framer-label text-white/20 mb-12 block tracking-[0.4em]">Layanan Utama</span>
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
      <section className="py-40 framer-container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
           {[ 
             { icon: <HardHat weight="light" size={40} />, t: 'Ekselerasi', d: 'Kecepatan progres hingga 50% lebih cepat dengan metode fabrikasi.' },
             { icon: <CompassTool weight="light" size={40} />, t: 'Presisi', d: 'Aplikasi kimia konstruksi untuk durabilitas bangunan jangka panjang.' },
             { icon: <Buildings weight="light" size={40} />, t: 'Inovasi', d: 'Penerapan Light Steel Frame untuk solusi bangunan modern & efisien.' }
           ].map((i, idx) => (
             <motion.div 
               key={i.t} 
               initial={{ opacity: 0, y: 40 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: idx * 0.2, duration: 1 }}
               className="flex flex-col gap-8"
             >
                <div className="text-brand">{i.icon}</div>
                <h3 className="font-serif text-[24px] text-[#1a1c19]">{i.t}</h3>
                <p className="framer-body">{i.d}</p>
             </motion.div>
           ))}
        </div>
      </section>
    </div>
  );
};
export default About;
