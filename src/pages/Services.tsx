import React from 'react';
import { motion } from 'framer-motion';
import { Buildings, HardHat, CompassTool, ShieldCheck, Ruler, Strategy, ArrowDownRight } from '@phosphor-icons/react';
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
    <div className="bg-[#F5F5F0] min-h-screen pt-20 md:pt-24 pb-24 selection:bg-[#2A2C2B] selection:text-white">
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

      {/* 1. MAIN SERVICES GRID */}
      <section className="framer-container mb-40">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {kcrData.services.map((service, idx) => (
            <motion.article 
              key={service.id} 
              {...fadeInUp}
              transition={{ delay: idx * 0.1, duration: 0.8 }}
              className="group bg-white border border-[#1a1c19]/10 p-10 flex flex-col gap-8 hover:border-brand transition-all duration-700 rounded-2xl shadow-sm hover:shadow-2xl"
            >
              <div className="flex justify-between items-start">
                <div className="text-brand opacity-40 group-hover:opacity-100 transition-opacity">
                  {idx === 0 && <Buildings weight="light" size={48} />}
                  {idx === 1 && <HardHat weight="light" size={48} />}
                  {idx === 2 && <ShieldCheck weight="light" size={48} />}
                  {idx === 3 && <CompassTool weight="light" size={48} />}
                  {idx === 4 && <Ruler weight="light" size={48} />}
                  {idx === 5 && <Strategy weight="light" size={48} />}
                </div>
                <ArrowDownRight size={24} className="text-[#1a1c19]/10 group-hover:text-brand transition-all" />
              </div>
              <div className="space-y-4">
                <h3 className="font-serif text-[26px] tracking-tight text-[#2A2C2B] uppercase">{service.title}</h3>
                <p className="framer-body !text-sm leading-relaxed">{service.description}</p>
              </div>
              
              {service.subItems && (
                <div className="flex flex-wrap gap-2 mt-auto pt-6 border-t border-[#1a1c19]/5">
                  {service.subItems.map(item => (
                    <span key={item} className="text-[10px] bg-[#F5F5F0] text-brand px-3 py-1.5 rounded-full font-bold uppercase tracking-wider">{item}</span>
                  ))}
                </div>
              )}
            </motion.article>
          ))}
        </div>
      </section>

      {/* 2. ENGINEERING AUTHORITY */}
      <section className="bg-[#2A2C2B] py-24 md:py-48 text-white overflow-hidden relative">
        <div className="framer-container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-center">
            <div className="lg:col-span-6 space-y-12">
              <span className="framer-label text-brand block tracking-[0.6em]">ENGINEERING & MANUFACTURING</span>
              <h2 className="framer-h1 text-white !text-[48px] md:!text-[64px]">Presisi Mesin <br/><span className="italic text-brand font-serif">Kualitas Manusia.</span></h2>
              <div className="space-y-12">
                {kcrData.capabilities.map((item, i) => (
                  <motion.div 
                    key={item.title} 
                    initial={{ opacity: 0, x: -20 }} 
                    whileInView={{ opacity: 1, x: 0 }} 
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.2 }}
                    className="flex gap-8"
                  >
                    <div className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center text-brand font-serif italic text-2xl shrink-0">{i+1}</div>
                    <div className="space-y-2">
                      <h4 className="font-serif text-2xl uppercase tracking-tight">{item.title}</h4>
                      <p className="framer-body !text-white/40">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="lg:col-span-5 lg:col-start-8">
              <div className="aspect-[4/5] bg-white/5 rounded-3xl overflow-hidden relative group shadow-2xl border border-white/10">
                <img src={kcrData.capabilities[0].img} className="w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-[2s]" alt="CNC Capability" />
                <div className="absolute inset-0 bg-brand/20 mix-blend-multiply" />
                <div className="absolute bottom-10 left-10 right-10 p-10 bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl">
                   <p className="framer-body !text-white italic text-lg leading-relaxed">"Integrasi teknologi CNC memastikan setiap detail furnitur and komponen prefabrikasi memiliki akurasi milimeter."</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
