import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Strategy, HardHat, ShieldCheck, Ruler } from '@phosphor-icons/react';
import { kcrData } from '../data/kcrData';
import SEO from '../components/SEO';
import PageHeader from '../components/PageHeader';

const Services: React.FC = () => {
  return (
    <div className="bg-[#F5F5F0] min-h-screen pt-24 pb-32 selection:bg-[#1a1c19] selection:text-white">
      <SEO 
        title="Layanan Spesialis Shotcrete & Kontraktor BUMN"
        description="Layanan PT. KARYA CIPTA RAHARJA mencakup kontraktor bangunan BUMN, spesialis shotcrete untuk stabilitas lereng and terowongan, sistem prefabrikasi baja ringan, serta interior fit-out eksekutif."
        keywords="Spesialis Shotcrete Indonesia, Kontraktor Bangunan BUMN, Prefab Building System, Interior Fitout, Stabilitas Lereng, Konstruksi Terowongan"
        canonicalUrl="/services"
      />

      <PageHeader 
        label="03 / LAYANAN KAMI"
        title="Solusi Konstruksi &"
        subtitle="Shotcrete Terpercaya."
        description="Kami menawarkan layanan konstruksi lengkap, mulai dari spesialis beton semprot (shotcrete) untuk memperkuat infrastruktur hingga pembangunan gedung secara keseluruhan."
      />

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
              <div className="text-brand opacity-40 group-hover:opacity-100 transition-opacity">
                {idx === 0 && <Strategy weight="light" size={40} />}
                {idx === 1 && <HardHat weight="light" size={40} />}
                {idx === 2 && <ShieldCheck weight="light" size={40} />}
                {idx === 3 && <Ruler weight="light" size={40} />}
              </div>
              <h3 className="font-serif text-[24px] tracking-tight">{service.title}</h3>
              <p className="framer-body !text-sm opacity-60 leading-relaxed">{service.description}</p>
              <div className="mt-auto pt-6 border-t border-[#1a1c19]/5">
                 <span className="text-[10px] font-bold uppercase tracking-widest text-brand">Expertise 0{idx+1}</span>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* Value Prop */}
      <section className="bg-[#1a1c19] py-40 text-white overflow-hidden relative">
        <div className="framer-container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-6">
              <span className="framer-label text-brand mb-8 block">STANDAR KAMI</span>
              <h2 className="framer-h1 text-white mb-12">Mengapa Memilih <br/><span className="italic text-brand font-serif">Keahlian KCR?</span></h2>
              <div className="space-y-12">
                {[ 
                  { t: 'Manajemen Lapangan Rapi', d: 'Kami mengutamakan kebersihan and keteraturan area kerja untuk efisiensi maksimal.' },
                  { t: 'Ketepatan Waktu (Zero Delay)', d: 'Komitmen penuh pada jadwal proyek yang telah disepakati bersama.' },
                  { t: 'Integritas Struktur', d: 'Hanya menggunakan material and teknik terbaik untuk keamanan jangka panjang.' }
                ].map((item, i) => (
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
                      <h4 className="font-serif text-2xl mb-4">{item.t}</h4>
                      <p className="framer-body !text-white/40">{item.d}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="lg:col-span-5 lg:col-start-8">
              <div className="aspect-[4/5] bg-white/5 rounded-2xl overflow-hidden relative group">
                <img src="https://images.pexels.com/photos/8961394/pexels-photo-8961394.jpeg" className="w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000" alt="Service Detail" />
                <div className="absolute inset-0 bg-brand/20 mix-blend-multiply" />
                <div className="absolute bottom-10 left-10 right-10 p-8 bg-black/40 backdrop-blur-md border border-white/10 rounded-xl">
                   <p className="framer-body !text-white italic">"Kualitas adalah hasil dari manajemen yang disiplin and keahlian teknis yang terasah."</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute -bottom-20 -right-20 text-[20vw] font-serif opacity-[0.02] pointer-events-none select-none uppercase tracking-tighter">Services</div>
      </section>

      {/* CTA */}
      <section className="py-40 framer-container text-center">
         <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="framer-h2 mb-10">Siap Memulai Proyek Anda?</h2>
            <p className="framer-body max-w-xl mx-auto mb-16 opacity-60">Hubungi tim ahli kami untuk konsultasi teknis and penawaran harga yang kompetitif untuk kebutuhan shotcrete and konstruksi Anda.</p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
               <Link to="/contact" className="framer-btn !bg-[#1a1c19] !text-white">Konsultasi Gratis</Link>
               <Link to="/portfolio" className="framer-btn">Lihat Portofolio</Link>
            </div>
         </motion.div>
      </section>
    </div>
  );
};

export default Services;
