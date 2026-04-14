import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Strategy, Desktop, ShieldCheck, Ruler, Buildings, CompassTool, Factory, ArrowRight } from '@phosphor-icons/react';
import { kcrData } from '../data/kcrData';
import SEO from '../components/SEO';
import PageHeader from '../components/PageHeader';

const Services: React.FC = () => {
  const fadeInUp = {
    initial: { y: 40, opacity: 0 },
    whileInView: { y: 0, opacity: 1 },
    viewport: { once: true },
    transition: { duration: 1, ease: [0.16, 1, 0.3, 1] as any }
  };

  return (
    <div className="bg-[#F5F5F0] min-h-screen pt-24 pb-20 md:pb-32 selection:bg-[#1A1C19] selection:text-white">
      <SEO 
        title="Layanan Furnitur Kantor & Hospitality Premium | KCR Furniture"
        description="Layanan KCR Furniture mencakup desain and manufaktur furnitur kantor modular, solusi furniture hotel custom, hingga interior fit-out eksekutif dengan teknologi CNC presisi."
        keywords="Furniture Kantor, Office Furniture Solutions, Custom Hotel Furniture, Interior Fitout, CNC Woodworking, KCR Furniture Services"
        canonicalUrl="/services"
      />

      <div className="relative overflow-hidden">
        <PageHeader 
          label="03 / LAYANAN INTERIOR"
          title="Solusi Furnitur"
          subtitle={<>& Interior <span className="text-brand font-serif-italic">Terintegrasi.</span></>}
          description="Menghadirkan keahlian manufaktur furnitur tingkat tinggi untuk ruang kerja and hospitality dengan standar kualitas internasional."
        />
      </div>

      {/* Grid of Main Services */}
      <section className="framer-container mb-32 md:mb-56">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[#1A1C19]/5 border border-[#1A1C19]/5 rounded-[4px] overflow-hidden">
          {kcrData.services.map((service, idx) => (
            <motion.article 
              key={service.id} 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.8 }}
              className="group bg-white p-12 flex flex-col gap-12 hover:bg-brand transition-all duration-700 h-full"
            >
              <div className="text-brand opacity-40 group-hover:text-white group-hover:opacity-100 transition-all duration-700">
                {service.id === 'office-solutions' && <Desktop weight="light" size={48} />}
                {service.id === 'hospitality-custom' && <Buildings weight="light" size={48} />}
                {service.id === 'cnc-manufacturing' && <Factory weight="light" size={48} />}
                {service.id === 'interior-fitout' && <Strategy weight="light" size={48} />}
              </div>
              <div className="space-y-6">
                <h3 className="font-serif text-[26px] tracking-tight group-hover:text-white transition-colors duration-700">{service.title}</h3>
                <p className="framer-body !text-sm text-[#1A1C19]/60 group-hover:text-white/70 transition-colors duration-700 leading-relaxed">{service.description}</p>
              </div>
              
              {service.subItems && (
                <div className="flex flex-wrap gap-2 mt-auto pt-6 border-t border-[#1A1C19]/5 group-hover:border-white/10">
                  {service.subItems.map(item => (
                    <span key={item} className="text-[9px] bg-[#F5F5F0] text-brand px-3 py-1.5 rounded-full font-bold uppercase tracking-wider group-hover:bg-white/10 group-hover:text-white transition-all">{item}</span>
                  ))}
                </div>
              )}
            </motion.article>
          ))}
        </div>
      </section>

      {/* Engineering Capabilities */}
      <section className="bg-[#1A1C19] py-32 md:py-56 text-white overflow-hidden relative">
        <div className="framer-container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 items-center">
            <div className="lg:col-span-6">
              <span className="framer-label text-brand mb-10 block tracking-[0.5em]">MANUFACTURING & PRECISION</span>
              <h2 className="framer-h2 text-white mb-16">Teknologi Canggih <br/><span className="font-serif-italic text-brand">Kualitas Terjamin.</span></h2>
              <div className="space-y-16">
                {kcrData.capabilities.map((item, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0, x: -30 }} 
                    whileInView={{ opacity: 1, x: 0 }} 
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.2, duration: 1 }}
                    className="flex gap-10 group"
                  >
                    <div className="text-4xl font-serif italic text-brand opacity-20 group-hover:opacity-100 transition-opacity duration-700 shrink-0">0{i+1}</div>
                    <div className="space-y-4">
                      <h4 className="font-serif text-2xl group-hover:text-brand transition-colors duration-700">{item.title}</h4>
                      <p className="framer-body !text-white/40 leading-relaxed">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="lg:col-span-5 lg:col-start-8">
              <div className="aspect-[4/5] bg-white/5 rounded-[4px] overflow-hidden relative group shadow-2xl">
                <img src={kcrData.capabilities[0].img} className="w-full h-full object-cover grayscale opacity-30 group-hover:grayscale-0 group-hover:opacity-60 transition-all duration-[2s]" alt="CNC Capability" loading="lazy" />
                <div className="absolute inset-0 bg-brand/10 mix-blend-multiply group-hover:opacity-0 transition-opacity duration-1000" />
                <div className="absolute bottom-12 left-12 right-12 p-10 bg-black/40 backdrop-blur-md border border-white/10 rounded-[4px]">
                   <p className="font-serif text-xl !text-white italic leading-relaxed">"Integrasi teknologi CNC memastikan setiap detail furnitur memiliki akurasi milimeter and konsistensi kualitas."</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 md:py-56 framer-container text-center">
         <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1 }}>
            <div className="ornament-line mx-auto mb-16" />
            <h2 className="framer-h2 mb-10 text-[#1A1C19]">Konsultasi Desain <span className="font-serif-italic text-brand">&</span> Manufaktur.</h2>
            <p className="framer-body max-w-2xl mx-auto mb-16 !text-lg opacity-60 text-[#1A1C19]">Tim KCR siap membantu mulai dari pemilihan material, prototyping, hingga instalasi akhir untuk memastikan ruang Anda fungsional and estetis.</p>
            <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
               <Link to="/contact" className="framer-btn !bg-[#1A1C19] !text-white !border-[#1A1C19] hover:scale-105">Minta Penawaran Interior</Link>
               <Link to="/catalog" className="framer-label group flex items-center gap-4 hover:text-brand transition-all !opacity-100 uppercase font-bold tracking-[0.4em]">
                 Lihat Katalog <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
               </Link>
            </div>
         </motion.div>
      </section>
    </div>
  );
};

export default Services;
