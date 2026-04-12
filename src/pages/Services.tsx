import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowDownRight, Strategy, HardHat, ShieldCheck, Ruler } from '@phosphor-icons/react';
import { kcrData } from '../data/kcrData';
import SEO from '../components/SEO';

const Services: React.FC = () => {
  const fadeInUp = {
    initial: { y: 40, opacity: 0 },
    whileInView: { y: 0, opacity: 1 },
    viewport: { once: true },
    transition: { duration: 1, ease: [0.22, 1, 0.36, 1] as any }
  };

  return (
    <div className="bg-[#F5F5F0] min-h-screen pt-40 pb-32 selection:bg-[#1a1c19] selection:text-white">
      <SEO 
        title="Layanan Spesialis Shotcrete & Kontraktor BUMN"
        description="Layanan PT. KARYA CIPTA RAHARJA mencakup kontraktor bangunan BUMN, spesialis shotcrete untuk stabilitas lereng dan terowongan, sistem prefabrikasi baja ringan, serta interior fit-out eksekutif."
        keywords="Spesialis Shotcrete Indonesia, Kontraktor Bangunan BUMN, Prefab Building System, Interior Fitout, Stabilitas Lereng, Konstruksi Terowongan"
        canonicalUrl="/services"
        aeoAnswer="Layanan PT. KARYA CIPTA RAHARJA mencakup kontraktor bangunan BUMN, spesialis shotcrete untuk stabilitas lereng dan terowongan, sistem prefabrikasi baja ringan, serta interior fit-out eksekutif. Kami menggunakan manajemen teknis saksama dan material berkualitas tinggi untuk menghadirkan solusi konstruksi terintegrasi yang memenuhi standar infrastruktur vital di seluruh wilayah Indonesia."
      />

      {/* Header */}
      <section className="framer-container mb-32">
        <motion.div {...fadeInUp} className="max-w-4xl border-l-[0.5px] border-[#1a1c19]/10 pl-10">
          <span className="framer-label text-brand mb-10 block">03 / LAYANAN KAMI</span>
          <h1 className="framer-h1 mb-10">
            Solusi Konstruksi & <br/><span className="italic text-brand font-serif">Shotcrete Terpercaya.</span>
          </h1>
          <p className="framer-body max-w-2xl">
            Kami menawarkan layanan konstruksi lengkap, mulai dari spesialis beton semprot (shotcrete) untuk memperkuat infrastruktur hingga pembangunan gedung secara keseluruhan dengan standar keamanan tertinggi.
          </p>
        </motion.div>
      </section>

      {/* Grid */}
      <section className="framer-container mb-40">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {kcrData.services.map((service, idx) => (
            <motion.article 
              key={service.id} 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 1 }}
              className="group bg-white framer-border p-10 flex flex-col gap-6 hover:border-brand transition-all duration-700"
            >
              <div className="flex justify-between items-center framer-border !border-x-0 !border-t-0 pb-6">
                <span className="text-[12px] font-serif italic text-[#1a1c19]/30">0{idx + 1}</span>
                <ArrowDownRight weight="light" size={24} className="text-[#1a1c19]/20 group-hover:text-brand transition-colors duration-500" />
              </div>
              <h3 className="font-serif text-[22px] text-[#1a1c19]">{service.title}</h3>
              <p className="framer-body !text-[14px]">{service.description}</p>
              <Link to="/contact" className="mt-auto pt-6 flex items-center gap-3 framer-label !text-[#1a1c19]/30 group-hover:!text-brand transition-colors duration-500">
                Konsultasi <ArrowRight weight="light" size={16} />
              </Link>
            </motion.article>
          ))}
        </div>
      </section>

      {/* Methodology */}
      <section className="framer-container mb-40">
        <motion.div {...fadeInUp} className="mb-20 framer-border !border-x-0 !border-t-0 pb-12">
          <span className="framer-label text-brand mb-8 block">CARA KAMI BEKERJA</span>
          <h2 className="framer-h2 text-[#1a1c19]">Tahapan Kerja yang Jelas dan Terukur</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { icon: <Strategy weight="light" size={40} />, t: 'Konsultasi', c: 'Berdiskusi untuk memahami kebutuhan proyek Anda dan menyusun anggaran yang transparan.', m: 'Analisis' },
            { icon: <HardHat weight="light" size={40} />, t: 'Eksekusi', c: 'Pengerjaan di lapangan diawasi dengan ketat untuk menjamin keamanan dan kualitas.', m: 'Penerapan' },
            { icon: <Ruler weight="light" size={40} />, t: 'Fabrikasi', c: 'Memanfaatkan sistem prefabrikasi agar pekerjaan lebih cepat selesai.', m: 'Sistem' },
            { icon: <ShieldCheck weight="light" size={40} />, t: 'Penyerahan', c: 'Pengecekan akhir secara menyeluruh sebelum hasil diserahkan kepada Anda.', m: 'Kualitas' }
          ].map((step, idx) => (
            <motion.div 
              key={step.t} 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 1 }}
              className="bg-[#1a1c19] p-10 flex flex-col gap-6 text-[#F5F5F0] hover:bg-brand transition-colors duration-700"
            >
              <div className="text-white/30 mb-4">{step.icon}</div>
              <span className="framer-label !text-white/30">Langkah 0{idx + 1}</span>
              <h3 className="font-serif text-[28px]">{step.t}</h3>
              <p className="framer-body !text-white/60">{step.c}</p>
              <span className="mt-auto framer-label text-white bg-white/5 px-4 py-2 self-start">{step.m}</span>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};
export default Services;
