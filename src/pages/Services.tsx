import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Strategy, HardHat, ShieldCheck, Ruler, Buildings, CompassTool } from '@phosphor-icons/react';
import { kcrData } from '../data/kcrData';
import SEO from '../components/SEO';
import PageHeader from '../components/PageHeader';

const Services: React.FC = () => {
  const fadeInUp = {
    initial: { y: 20, opacity: 0 },
    whileInView: { y: 0, opacity: 1 },
    viewport: { once: true },
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as any }
  };

  return (
    <div className="bg-[#F5F5F0] min-h-screen pt-24 pb-20 md:pb-32 selection:bg-[#1a1c19] selection:text-white">
      <SEO 
        title="Layanan Spesialis Shotcrete & Kontraktor BUMN"
        description="Layanan PT. KARYA CIPTA RAHARJA mencakup kontraktor bangunan BUMN, spesialis shotcrete untuk stabilitas lereng and terowongan, sistem prefabrikasi baja ringan, serta interior fit-out eksekutif."
        keywords="Spesialis Shotcrete Indonesia, Kontraktor Bangunan BUMN, Prefab Building System, Interior Fitout, Stabilitas Lereng, Konstruksi Terowongan"
        canonicalUrl="/services"
      />

      <PageHeader 
        label="03 / LAYANAN TEKNIK"
        title="Solusi Terpadu"
        subtitle="Struktur & Kimia Konstruksi."
        description="Menghadirkan keahlian teknis tingkat tinggi untuk pembangunan infrastruktur and perkuatan struktur dengan standar kualitas nasional."
      />

      {/* Grid of Main Services */}
      <section className="framer-container mb-20 md:mb-40">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
...          {kcrData.services.map((service, idx) => (
            <motion.article 
              key={service.id} 
              {...fadeInUp}
              transition={{ delay: idx * 0.1, duration: 0.8 }}
              className="group bg-white border border-[#1a1c19]/10 p-10 flex flex-col gap-6 hover:border-brand transition-all duration-700 rounded-2xl"
            >
              <div className="text-brand opacity-40 group-hover:opacity-100 transition-opacity">
                {idx === 0 && <Buildings weight="light" size={40} />}
                {idx === 1 && <HardHat weight="light" size={40} />}
                {idx === 2 && <ShieldCheck weight="light" size={40} />}
                {idx === 3 && <CompassTool weight="light" size={40} />}
                {idx === 4 && <Ruler weight="light" size={40} />}
                {idx === 5 && <Strategy weight="light" size={40} />}
              </div>
              <h3 className="font-serif text-[24px] tracking-tight">{service.title}</h3>
              <p className="framer-body !text-sm text-[#1a1c19]/70 leading-relaxed">{service.description}</p>
              
              {service.subItems && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {service.subItems.map(item => (
                    <span key={item} className="text-[9px] bg-[#F5F5F0] text-brand px-3 py-1.5 rounded-full font-bold uppercase tracking-wider">{item}</span>
                  ))}
                </div>
              )}
            </motion.article>
          ))}
        </div>
      </section>

      {/* Engineering Capabilities */}
      <section className="bg-[#1a1c19] py-20 md:py-40 text-white overflow-hidden relative">
        <div className="framer-container relative z-10">
          <div className="grid grid-cols-1 lg:col-cols-12 gap-16 items-center">
            <div className="lg:col-span-6">
              <span className="framer-label text-brand mb-8 block">ENGINEERING & MANUFACTURING</span>
              <h2 className="framer-h1 text-white mb-12">Presisi Mesin <br/><span className="italic text-brand font-serif">Kualitas Manusia.</span></h2>
              <div className="space-y-12">
                {kcrData.capabilities.map((item, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0, x: -20 }} 
                    whileInView={{ opacity: 1, x: 0 }} 
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.2 }}
                    className="flex gap-8"
                  >
                    <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-brand font-serif italic text-xl shrink-0">{i+1}</div>
                    <div>
                      <h4 className="font-serif text-2xl mb-4">{item.title}</h4>
                      <p className="framer-body !text-white/40">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="lg:col-span-5 lg:col-start-8">
              <div className="aspect-[4/5] bg-white/5 rounded-2xl overflow-hidden relative group">
                <img src={kcrData.capabilities[0].img} className="w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000" alt="CNC Capability" loading="lazy" />
                <div className="absolute inset-0 bg-brand/20 mix-blend-multiply" />
                <div className="absolute bottom-10 left-10 right-10 p-8 bg-black/40 backdrop-blur-md border border-white/10 rounded-xl">
                   <p className="framer-body !text-white italic">"Integrasi teknologi CNC memastikan setiap detail furnitur and komponen prefabrikasi memiliki akurasi milimeter."</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-40 framer-container text-center">
         <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="framer-h2 mb-10">Dukungan Teknik Penuh</h2>
            <p className="framer-body max-w-xl mx-auto mb-16 opacity-60 text-[#1a1c19]">Tim KCR siap membantu dari tahap Cost Engineering hingga eksekusi lapangan untuk memastikan proyek Anda efisien secara biaya and waktu.</p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
               <Link to="/contact" className="framer-btn !bg-[#1a1c19] !text-white">Minta Penawaran Teknik</Link>
               <Link to="/catalog" className="framer-btn">Lihat Katalog Produk</Link>
            </div>
         </motion.div>
      </section>
    </div>
  );
};

export default Services;
