import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Strategy, Buildings, Factory, CheckCircle, WhatsappLogo } from '@phosphor-icons/react';
import { kcrData } from '../data/kcrData';
import SEO from '../components/SEO';
import PageHeader from '../components/PageHeader';
import { trackEvent } from '../utils/analytics';

const Services: React.FC = () => {
  const fadeInUp = {
    initial: { y: 40, opacity: 0 },
    whileInView: { y: 0, opacity: 1 },
    viewport: { once: true },
    transition: { duration: 1, ease: [0.16, 1, 0.3, 1] as any }
  };

  const handleWhatsApp = () => {
    trackEvent('whatsapp_cta_click', { location: 'services_page' });
    const message = encodeURIComponent(`Halo KCR Furniture, saya ingin bertanya mengenai layanan proyek.`);
    window.open(`https://wa.me/${kcrData.contact.whatsapp}?text=${message}`, '_blank');
  };

  return (
    <div className="bg-[#F5F5F0] min-h-screen pt-24 pb-20 md:pb-32 selection:bg-[#1A1C19] selection:text-white">
      <SEO 
        title="Interior Fit-out Contractor Indonesia & Custom Furniture Bekasi | KCR Furniture"
        description="KCR Furniture adalah interior fit-out contractor Indonesia & produsen custom furniture Bekasi. Spesialis furniture kantor premium & mass production furniture dengan presisi CNC."
        keywords="Interior Fit-out Contractor Indonesia, Custom Furniture Bekasi, Produsen Furnitur Kantor, Mass Production Furniture, Furniture Kantor, Office Furniture Solutions, Custom Hotel Furniture, Interior Fitout, CNC Woodworking, KCR Furniture Services"
        canonicalUrl="/services"
      />

      <div className="relative overflow-hidden">
        <PageHeader 
          label="03 / LAYANAN INTERIOR"
          title="Interior Fit-out"
          subtitle={<>Contractor <span className="text-brand font-serif-italic">Indonesia.</span></>}
          description="Menghadirkan keahlian manufaktur furnitur tingkat tinggi dan solusi interior fit-out untuk ruang kerja dan hospitality dengan standar kualitas internasional."
        />
      </div>

      {/* Grid of Main Services */}
      <section className="framer-container mb-32 md:mb-56">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[#1A1C19]/5 border border-[#1A1C19]/5 rounded-[4px] overflow-hidden">
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
                {service.id === 'mass-production' && <Factory weight="light" size={48} />}
                {service.id === 'custom-furniture' && <Buildings weight="light" size={48} />}
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

      {/* NEW: Manufacturing Capacity & B2B Section */}
      <section className="framer-container mb-32 md:mb-56">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Manufacturing Focus */}
          <motion.div 
            {...fadeInUp}
            className="bg-white p-12 md:p-16 border border-[#1A1C19]/5 rounded-[4px] shadow-premium space-y-12"
          >
            <div className="space-y-4">
              <span className="framer-label text-brand tracking-[0.4em]">MANUFACTURING EXCELLENCE</span>
              <h3 className="font-serif text-3xl md:text-4xl">Custom Furniture Bekasi & Mass Production</h3>
              <p className="framer-body opacity-60 leading-relaxed">Didukung oleh pabrik AMS di Bekasi dengan mesin CNC mutakhir untuk menjamin mass production furniture tepat waktu.</p>
            </div>
            
            <div className="p-8 bg-[#F5F5F0] rounded-[4px] space-y-6">
              <p className="text-[13px] leading-relaxed opacity-80">Kami menangani volume produksi massal untuk kebutuhan workstations kantor, furnitur hotel, hingga custom joinery dalam jumlah besar dengan konsistensi kualitas standar Eropa.</p>
              <div className="flex flex-wrap gap-3 pt-4 border-t border-[#1A1C19]/5">
                {["Kapasitas Massal", "Presisi CNC", "Cost Engineering", "Kontrol Kualitas Ketat"].map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <CheckCircle size={14} className="text-brand" weight="fill" />
                    <span className="text-[10px] font-bold uppercase tracking-widest opacity-60">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* B2B Partnership */}
          <motion.div 
            {...fadeInUp}
            transition={{ delay: 0.2 }}
            className="bg-[#1A1C19] text-white p-12 md:p-16 border border-white/5 rounded-[4px] shadow-premium space-y-12"
          >
            <div className="space-y-4">
              <span className="framer-label text-brand tracking-[0.4em]">B2B & CONTRACT</span>
              <h3 className="font-serif text-3xl md:text-4xl">Kemitraan Strategis</h3>
              <p className="framer-body !text-white/75 leading-relaxed">Solusi furnitur khusus untuk arsitek, desainer interior, kontraktor, dan pengembang properti.</p>
            </div>
            
            <div className="p-8 bg-white/5 rounded-[4px] space-y-6">
              <p className="text-[13px] leading-relaxed text-white/80">Dari konsultasi teknis hingga instalasi di lokasi, tim kami memastikan setiap detail spesifikasi teknis terpenuhi sesuai standar proyek profesional.</p>
              <div className="flex flex-wrap gap-3 pt-4 border-t border-white/10">
                {["Korporasi", "Hospitality", "Instansi Pemerintah", "Retail Chain"].map((cat) => (
                  <div key={cat} className="flex items-center gap-2">
                    <CheckCircle size={14} className="text-brand" weight="fill" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-white/75">{cat}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Engineering Capabilities */}
      <section className="bg-[#1A1C19] py-24 md:py-40 text-white overflow-hidden relative">
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
                      <p className="framer-body !text-white/70 leading-relaxed">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="lg:col-span-5 lg:col-start-8">
              <div className="aspect-[4/5] bg-white/5 rounded-[4px] overflow-hidden relative group shadow-2xl">
                <img src={kcrData.capabilities[0].img} className="w-full h-full object-cover grayscale opacity-30 group-hover:grayscale-0 group-hover:opacity-60 transition-all duration-[2s]" alt="CNC Capability" loading="lazy" decoding="async" />
                <div className="absolute inset-0 bg-brand/10 mix-blend-multiply group-hover:opacity-0 transition-opacity duration-1000" />
                <div className="absolute bottom-12 left-12 right-12 p-10 bg-black/40 backdrop-blur-md border border-white/10 rounded-[4px]">
                   <p className="font-serif text-xl !text-white italic leading-relaxed">"Integrasi teknologi CNC memastikan setiap detail furnitur memiliki akurasi milimeter dan konsistensi kualitas."</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-36 framer-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mx-auto max-w-6xl rounded-[20px] border border-[#1A1C19]/10 bg-gradient-to-br from-white via-[#F8F6F1] to-[#EFE8DD] p-8 md:p-12 lg:p-16 shadow-premium"
        >
          <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_auto] gap-10 lg:gap-16 items-end">
            <div>
              <p className="framer-label text-brand mb-5 !opacity-100">KONSULTASI PROYEK</p>
              <h2 className="font-serif text-[32px] md:text-[44px] leading-[1.08] tracking-[-0.03em] text-[#1A1C19] mb-6">
                Konsultasi Desain <span className="font-serif-italic text-brand">&</span> Manufaktur.
              </h2>
              <p className="text-[15px] md:text-[17px] leading-relaxed text-[#1A1C19]/70 max-w-3xl">
                Tim KCR siap membantu dari pemilihan material, prototyping, hingga instalasi akhir untuk memastikan ruang Anda fungsional dan estetis.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col gap-4">
              <button
                onClick={handleWhatsApp}
                className="cta-primary flex items-center justify-center gap-3"
              >
                <WhatsappLogo size={20} weight="fill" />
                Konsultasi Proyek
              </button>
              <Link
                to="/catalog"
                className="cta-secondary"
              >
                Lihat Katalog
              </Link>
            </div>
          </div>
        </motion.div>
      </section>

      <section className="framer-container pb-20">
        <div className="rounded-[12px] border border-[#1A1C19]/10 bg-white p-5">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#1A1C19]/60 mb-3">Jelajahi Juga</p>
          <div className="flex flex-wrap gap-3">
            <Link to="/catalog" className="cta-secondary !px-5 !py-2 !text-[9px] !tracking-[0.16em]">Katalog Produk</Link>
            <Link to="/case-studies" className="cta-secondary !px-5 !py-2 !text-[9px] !tracking-[0.16em]">Case Studies</Link>
            <Link to="/contact" className="cta-primary !px-5 !py-2 !text-[9px] !tracking-[0.16em]">Hubungi Tim</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
