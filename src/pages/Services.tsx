import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HardHat, ShieldCheck, Buildings, CompassTool, ArrowDownRight, ArrowRight } from '@phosphor-icons/react';
import { kcrData } from '../data/kcrData';
import SEO from '../components/SEO';

const Services: React.FC = () => {
  const fadeInUp = {
    initial: { y: 20, opacity: 0 },
    whileInView: { y: 0, opacity: 1 },
    viewport: { once: true },
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as any }
  };

  return (
    <div className="bg-[#F5F5F0] min-h-screen pt-32 pb-40 selection:bg-[#2A2C2B] selection:text-white">
      <SEO 
        title="Layanan & Spesialisasi"
        description="Layanan PT. KARYA CIPTA RAHARJA mencakup kontraktor bangunan BUMN, spesialis shotcrete Indonesia, sistem prefabrikasi baja ringan, serta interior fit-out eksekutif."
        keywords="Spesialis Shotcrete Indonesia, Kontraktor Bangunan BUMN, Prefab Building System, Interior Fitout"
        canonicalUrl="/services"
      />

      <section className="framer-container mb-32">
        <motion.div {...fadeInUp} className="max-w-4xl border-l-[0.5px] border-[#2A2C2B]/10 pl-10">
          <span className="framer-label text-brand mb-10 block">03 / Solusi Utama</span>
          <h1 className="framer-h1 mb-10">
            Spesialis Shotcrete Indonesia <br/><span className="italic text-brand font-serif">& Kontraktor Bangunan BUMN.</span>
          </h1>
          <p className="framer-body max-w-2xl">
            Menghadirkan layanan teknis komprehensif sebagai kontraktor bangunan BUMN dan spesialis shotcrete Indonesia untuk stabilitas infrastruktur serta pembangunan gedung strategis dengan standar durabilitas tinggi.
          </p>
        </motion.div>
      </section>

      {/* Grid of Main Services */}
      <section className="framer-container mb-40">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {kcrData.services.map((service, idx) => (
            <motion.article 
              key={service.id} 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 1 }}
              className="group bg-white border-[0.5px] border-[#2A2C2B]/10 p-10 flex flex-col gap-6 hover:border-brand transition-all duration-700 rounded-[12px]"
            >
              <div className="flex justify-between items-center border-b-[0.5px] border-[#2A2C2B]/5 pb-6">
                <span className="text-[12px] font-serif italic text-[#2A2C2B]/30">0{idx + 1}</span>
                <ArrowDownRight weight="light" size={24} className="text-[#2A2C2B]/20 group-hover:text-brand transition-colors duration-500" />
              </div>
              <div className="text-brand opacity-40 group-hover:opacity-100 transition-opacity">
                {idx === 0 && <Buildings weight="light" size={40} />}
                {idx === 1 && <HardHat weight="light" size={40} />}
                {idx === 2 && <ShieldCheck weight="light" size={40} />}
                {idx === 3 && <CompassTool weight="light" size={40} />}
              </div>
              <h3 className="font-serif text-[22px] text-[#2A2C2B] uppercase tracking-tight">{service.title}</h3>
              <p className="framer-body !text-[14px]">{service.description}</p>
              
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
      <section className="bg-[#2A2C2B] py-40 text-[#F5F5F0] overflow-hidden relative">
        <div className="framer-container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-center">
            <div className="lg:col-span-6">
              <span className="framer-label text-brand mb-8 block">ENGINEERING AUTHORITY</span>
              <h2 className="framer-h1 text-white mb-12">Presisi Mesin <br/><span className="italic text-brand font-serif">Integritas Manusia.</span></h2>
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
                    <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-brand font-serif italic text-xl shrink-0">{i+1}</div>
                    <div>
                      <h4 className="font-serif text-2xl mb-4 text-white uppercase">{item.title}</h4>
                      <p className="framer-body !text-white/40">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="lg:col-span-5 lg:col-start-8">
              <div className="aspect-[4/5] bg-white/5 rounded-[8px] overflow-hidden relative group">
                <img src={kcrData.capabilities[0].img} className="w-full h-full object-cover opacity-60" alt="Capability" loading="lazy" />
                <div className="absolute inset-0 bg-brand/10 mix-blend-multiply" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA: INTEGRATED ENDING */}
      <section className="py-48 bg-white border-t-[0.5px] border-[#2A2C2B]/10 relative overflow-hidden">
        <div className="framer-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
            <motion.div {...fadeInUp} className="lg:col-span-7">
              <span className="framer-label text-brand mb-10 block tracking-[0.6em]">04 / Engagement</span>
              <h2 className="framer-h1 !text-[42px] md:!text-[56px] leading-[1.1]">
                Siap mengejawantahkan <br/>
                <span className="italic font-serif text-brand">visi teknis</span> Anda?
              </h2>
            </motion.div>
            
            <motion.div {...fadeInUp} transition={{ delay: 0.2 }} className="lg:col-span-4 lg:col-start-9 flex flex-col gap-8">
              <p className="framer-body !text-[16px]">
                Konsultasikan kebutuhan RAB dan spesifikasi material proyek Anda bersama tim ahli kami untuk hasil yang saksama dan terukur.
              </p>
              <Link to="/contact" className="framer-btn group self-start">
                <span>Hubungi Tim Teknis</span>
                <ArrowRight weight="light" size={18} className="ml-4" />
              </Link>
            </motion.div>
          </div>
        </div>
        <div className="absolute -bottom-10 -right-10 font-serif text-[20vw] opacity-[0.02] pointer-events-none select-none whitespace-nowrap text-[#2A2C2B]">
          COLLABORATE
        </div>
      </section>
    </div>
  );
};

export default Services;
