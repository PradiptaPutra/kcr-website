import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { CaretRight, CaretLeft, ArrowUpRight, Mouse } from '@phosphor-icons/react';
import { kcrData } from '../data/kcrData';
import SEO from '../components/SEO';
import ProductCard from '../components/ProductCard';

const Home: React.FC = () => {
  const [heroIndex, setHeroIndex] = useState(0);
  
  const fadeInUp = {
    initial: { y: 40, opacity: 0 },
    whileInView: { y: 0, opacity: 1 },
    viewport: { once: true },
    transition: { duration: 1, ease: [0.16, 1, 0.3, 1] as any }
  };

  const staggerContainer = {
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
    viewport: { once: true },
    transition: { staggerChildren: 0.1 }
  };

  return (
    <div className="bg-[#F5F5F0]">
      <SEO 
        title="High-End Office & Hospitality Furniture Solutions"
        description="KCR Furniture (PT. KARYA CIPTA RAHARJA) adalah penyedia furnitur kantor eksekutif and hospitality premium. Manufaktur presisi dengan teknologi CNC standar Eropa sejak 2006."
        keywords="Furniture Kantor, Office Furniture, Workstation, Meja Eksekutif, Hospitality Furniture, Furniture Hotel, CNC Furniture, KCR Furniture"
        canonicalUrl="/"
        ogImage={kcrData.images.hero[0]}
      />

      {/* 1. HERO */}
      <section className="relative h-screen w-full overflow-hidden bg-[#1a1c19] flex flex-col items-center">
        <AnimatePresence mode="wait">
          <motion.div 
            key={heroIndex}
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.5 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 2.5, ease: [0.16, 1, 0.3, 1] as any }}
            className="absolute inset-0"
          >
            <img className="w-full h-full object-cover" src={kcrData.images.hero[heroIndex]} alt={`KCR Furniture Project - ${heroIndex + 1}`} />
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
          </motion.div>
        </AnimatePresence>

        {/* Vertical Spacer for Fixed Navbar */}
        <div className="h-[72px] w-full shrink-0" />

        {/* Main Content */}
        <div className="relative z-10 text-center px-6 max-w-5xl flex-1 flex flex-col justify-center items-center">
           <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 1, delay: 0.5 }}
           >
             <span className="framer-label text-white/50 mb-8 block tracking-[1em] text-[10px]">ESTABLISHED 2006</span>
           </motion.div>
           
           <h1 className="framer-h1 text-white mb-10">
             <motion.span 
               initial={{ y: 60, opacity: 0 }} 
               animate={{ y: 0, opacity: 1 }} 
               transition={{ duration: 1.2, delay: 0.7, ease: [0.16, 1, 0.3, 1] }} 
               className="block"
              >
                Desain Tanpa <span className="font-serif-italic">Kompromi</span>,
              </motion.span>
             <motion.span 
               initial={{ y: 60, opacity: 0 }} 
               animate={{ y: 0, opacity: 0.9 }} 
               transition={{ duration: 1.2, delay: 0.9, ease: [0.16, 1, 0.3, 1] }} 
               className="block font-serif-italic text-white/70"
              >
                Presisi Tanpa Henti.
              </motion.span>
           </h1>

           <motion.p 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ duration: 1.5, delay: 1.2 }} 
            className="text-white/50 text-xl mb-14 max-w-2xl mx-auto font-light leading-relaxed tracking-tight"
           >
             Penyedia Solusi Furnitur Kantor & Hospitality premium dengan manufaktur mandiri berbasis teknologi CNC standar Eropa.
           </motion.p>

           <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 1, delay: 1.4 }} 
            className="flex flex-col sm:flex-row items-center justify-center gap-8"
           >
             <Link to="/contact" className="framer-btn !bg-brand !text-white !border-brand hover:!bg-[#A67C52] hover:scale-105 px-12 py-5 shadow-2xl shadow-brand/20">
               Konsultasi Interior
             </Link>
             <Link to="/catalog" className="framer-btn !border-white/20 !text-white hover:!bg-white hover:!text-[#1A1C19] px-12 py-5">
               Katalog Produk
             </Link>
           </motion.div>
        </div>

        {/* Scroll Hint */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 text-white flex flex-col items-center gap-4"
        >
          <span className="framer-label !text-white text-[9px] tracking-[0.5em]">SCROLL</span>
          <motion.div 
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <Mouse size={24} weight="light" />
          </motion.div>
        </motion.div>

        {/* Navigation Buttons */}
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 z-30 flex justify-between px-8 pointer-events-none">
          <button 
            onClick={() => setHeroIndex(prev => (prev === 0 ? kcrData.images.hero.length - 1 : prev - 1))} 
            className="text-white/10 hover:text-white transition-all pointer-events-auto p-6 group"
            aria-label="Previous Hero Image"
          >
            <CaretLeft weight="light" size={40} className="group-hover:-translate-x-2 transition-transform" />
          </button>
          <button 
            onClick={() => setHeroIndex(prev => (prev === kcrData.images.hero.length - 1 ? 0 : prev + 1))} 
            className="text-white/10 hover:text-white transition-all pointer-events-auto p-6 group"
            aria-label="Next Hero Image"
          >
            <CaretRight weight="light" size={40} className="group-hover:translate-x-2 transition-transform" />
          </button>
        </div>
      </section>

      {/* 2. NARRATIVE */}
      <section className="py-32 md:py-48 framer-container overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-center">
          <motion.div {...fadeInUp} className="lg:col-span-6 border-l border-brand/30 pl-12 py-4">
            <span className="framer-label text-brand mb-10 block tracking-[0.5em]">01 / FILOSOFI KAMI</span>
            <h2 className="framer-h2 leading-[1.05] text-[#1A1C19]">
              Mengkombinasikan <br/> 
              <span className="font-serif-italic text-brand text-[1.1em]">Seni & Teknologi.</span>
            </h2>
            <div className="mt-14 space-y-8">
              <p className="framer-body !text-[20px] text-[#1A1C19] font-medium leading-relaxed">
                Kami percaya bahwa ruang yang baik dimulai dari detail terkecil.
              </p>
              <p className="framer-body !text-lg leading-relaxed">
                Sebagai spesialis furnitur presisi, KCR mengintegrasikan desain kontemporer dengan teknologi CNC standar Eropa. Kami menciptakan solusi tata ruang yang tidak hanya fungsional, tetapi juga memberikan identitas visual yang kuat bagi bisnis Anda.
              </p>
              <Link to="/about" className="framer-label group flex items-center gap-6 hover:text-brand transition-all !opacity-100 mt-10">
                EKSPLORASI STANDAR KUALITAS <div className="w-12 h-px bg-brand/30 group-hover:w-20 transition-all" />
              </Link>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, x: 50 }}
            whileInView={{ opacity: 1, scale: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 lg:col-start-8 relative"
          >
            <div className="aspect-[3/4] rounded-[4px] overflow-hidden shadow-premium">
              <img src={kcrData.images.hero[1]} alt="Interior Detail" className="w-full h-full object-cover transition-transform duration-[3s] hover:scale-110" />
            </div>
            {/* Float Element */}
            <motion.div 
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-10 -left-10 w-48 h-48 bg-brand p-8 text-white hidden md:flex flex-col justify-end rounded-[4px] shadow-2xl"
            >
              <span className="text-4xl font-serif mb-2">17+</span>
              <span className="text-[9px] uppercase tracking-[0.3em] font-bold opacity-60">Years of Precision</span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 3. SOLUTIONS */}
      <section className="py-32 md:py-48 bg-[#1A1C19] text-white">
        <div className="framer-container">
          <motion.div {...fadeInUp} className="mb-24 flex flex-col md:flex-row justify-between items-end gap-10">
            <div>
              <span className="framer-label text-brand mb-8 block tracking-[0.5em]">02 / SOLUSI</span>
              <h2 className="framer-h2 text-white">Fokus Pada <span className="font-serif-italic">Kualitas & Estetika.</span></h2>
            </div>
            <p className="framer-body !text-white/40 max-w-sm mb-2">Empat pilar layanan kami yang dirancang untuk memenuhi standar interior kelas dunia.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 border border-white/10 rounded-[4px] overflow-hidden">
            {[
              { id: '01', t: 'Office Furniture', d: 'Sistem workstation modular and eksekutif yang meningkatkan produktivitas.', p: '/catalog' },
              { id: '02', t: 'Hospitality', d: 'Furnitur hotel custom dengan standar kemewahan and daya tahan tinggi.', p: '/services' },
              { id: '03', t: 'CNC Precision', d: 'Teknologi pemotongan kayu tercanggih untuk akurasi milimeter.', p: '/services' },
              { id: '04', t: 'Interior Fit-Out', d: 'Layanan instalasi and finishing interior menyeluruh untuk ruang komersial.', p: '/contact' }
            ].map((item, i) => (
              <motion.div 
                key={item.id}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-[#1A1C19] p-12 flex flex-col gap-16 group hover:bg-brand transition-all duration-700 h-full"
              >
                <div className="flex justify-between items-start">
                  <span className="font-serif text-3xl opacity-20 group-hover:opacity-100 transition-opacity">{item.id}</span>
                  <ArrowUpRight size={24} className="opacity-0 group-hover:opacity-100 transition-all" />
                </div>
                <div className="mt-auto">
                  <h3 className="font-serif text-2xl mb-6">{item.t}</h3>
                  <p className="text-sm text-white/40 group-hover:text-white/80 transition-colors leading-relaxed">{item.d}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. ADVANTAGES */}
      <section className="py-32 md:py-48 framer-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 items-center">
          <motion.div {...fadeInUp} className="lg:col-span-6 order-2 lg:order-1">
             <div className="relative aspect-square rounded-[4px] overflow-hidden shadow-premium">
                <img src="/assets/images/overview/PRIME_SERIES_cropped.jpg" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-[2s]" alt="Craftsmanship" />
                <div className="absolute inset-0 bg-brand/10 mix-blend-multiply" />
             </div>
          </motion.div>

          <motion.div {...fadeInUp} className="lg:col-span-5 lg:col-start-8 order-1 lg:order-2">
            <span className="framer-label text-brand mb-10 block tracking-[0.5em]">STRATEGIC EDGE</span>
            <h2 className="framer-h2 mb-14 text-[#1A1C19]">Mengapa Memilih <br/><span className="font-serif-italic text-brand">KCR Furniture?</span></h2>
            
            <div className="space-y-12">
              {[
                { t: 'European Standard', d: 'Pemanfaatan mesin CNC canggih menjamin detail sempurna and presisi tinggi pada setiap produk.' },
                { t: 'Customized Design', d: 'Adaptasi desain yang fleksibel untuk memenuhi identitas visual unik perusahaan Anda.' },
                { t: 'Direct Manufacturer', d: 'Fasilitas produksi mandiri memberikan kontrol penuh atas kualitas and waktu pengiriman.' }
              ].map((adv, i) => (
                <div key={i} className="group">
                  <h4 className="font-serif text-2xl mb-4 group-hover:text-brand transition-colors flex items-center gap-4">
                    <span className="w-8 h-px bg-brand/20 group-hover:w-12 transition-all" />
                    {adv.t}
                  </h4>
                  <p className="framer-body !text-sm pl-12 opacity-60 leading-relaxed">{adv.d}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* 5. PORTFOLIO PREVIEW */}
      <section className="py-32 md:py-48 bg-white border-y border-[#1A1C19]/5">
        <div className="framer-container">
          <motion.div {...fadeInUp} className="mb-24 flex flex-col md:flex-row justify-between items-end gap-10">
            <h2 className="framer-h2">Proyek <span className="font-serif-italic text-brand">Terpilih.</span></h2>
            <Link to="/portfolio" className="framer-label group flex items-center gap-4 hover:text-brand transition-all !opacity-100">
              LIHAT SEMUA PORTOFOLIO <div className="w-10 h-10 rounded-full border border-[#1A1C19]/10 flex items-center justify-center group-hover:bg-[#1A1C19] group-hover:text-white transition-all"><CaretRight size={16} /></div>
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {kcrData.images.portfolio.map((p, idx) => (
              <ProductCard 
                key={p.id}
                series={p.title}
                img={p.img}
                description={p.client}
                label={`${p.year} / ${p.category}`}
                index={idx}
                ctaLink="/portfolio"
              />
            ))}
          </div>
        </div>
      </section>

      {/* 6. FINAL CTA */}
      <section className="py-48 md:py-64 framer-container text-center relative">
        <motion.div {...fadeInUp}>
          <div className="ornament-line mx-auto mb-16" />
          <h2 className="framer-h1 mb-10 text-[#1A1C19]">Transformasi Ruang <br/><span className="font-serif-italic text-brand">Dimulai di Sini.</span></h2>
          <p className="framer-body max-w-2xl mx-auto mb-16 !text-lg text-[#1A1C19]/50">
            Tim desainer and teknisi kami siap membantu Anda menciptakan lingkungan kerja yang produktif and berkelas.
          </p>
          <Link to="/contact" className="framer-btn !bg-[#1A1C19] !text-white !border-[#1A1C19] hover:scale-105 shadow-premium">
            Mulai Konsultasi Gratis
          </Link>
        </motion.div>
      </section>
    </div>
  );
};

export default Home;
