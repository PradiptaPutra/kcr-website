import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, CheckCircle, WhatsappLogo } from '@phosphor-icons/react';
import { kcrData } from '../data/kcrData';
import SEO from '../components/SEO';
import ProductCard from '../components/ProductCard';
import Button from '../components/Button';
import StickyMediaScrollSection from '../components/StickyMediaScrollSection';
import { trackEvent } from '../utils/analytics';

const Home: React.FC = () => {
  const [heroIndex, setHeroIndex] = useState(0);
  const [activeSolution, setActiveSolution] = useState(0);
  
  const solutionImages = [
    "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&q=75&w=1400",
    "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=75&w=1400",
    "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=75&w=1400",
    "https://images.unsplash.com/photo-1497215842964-222b430dc094?auto=format&fit=crop&q=75&w=1400"
  ];

  const fadeInUp = {
    initial: { y: 20, opacity: 0 },
    whileInView: { y: 0, opacity: 1 },
    viewport: { once: true },
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as any }
  };

  const featuredProductIds = [14, 8, 91]; // Prime CP, Incore IST, Bara-01
  const featuredProducts = kcrData.catalogProducts.filter(p => featuredProductIds.includes(p.id));

  const handleWhatsApp = (context: string) => {
    trackEvent('whatsapp_cta_click', { location: context });
    const message = encodeURIComponent(`Halo KCR Furniture, saya ingin konsultasi mengenai proyek furnitur.`);
    window.open(`https://wa.me/${kcrData.contact.whatsapp}?text=${message}`, '_blank');
  };

  return (
    <div className="bg-[#F5F5F0]">
      <SEO 
        title="Produsen Furnitur Kantor & Custom Furniture Bekasi | KCR Furniture"
        description="KCR Furniture (PT. Karya Cipta Raharja) adalah produsen furnitur kantor Bekasi & interior fit-out contractor Indonesia. Spesialis mass production furniture & custom furniture premium sejak 2006."
        keywords="Produsen Furnitur Kantor, Custom Furniture Bekasi, Interior Fit-out Contractor Indonesia, Mass Production Furniture, Furniture Kantor, Office Furniture, Workstation, Meja Eksekutif, Hospitality Furniture, Furniture Hotel, CNC Furniture, KCR Furniture"
        canonicalUrl="/"
        ogImage={kcrData.images.hero[0]}
      />

      {/* 1. HERO - Asymmetrical Industrial Grid */}
      <section className="relative min-h-[100vh] w-full flex flex-col lg:flex-row bg-[#F5F5F0]">
        
        {/* Vertical Spacer for Fixed Navbar on Mobile (Desktop navbar is absolute) */}
        <div className="h-[72px] w-full lg:hidden shrink-0" />

        {/* Left Side: Technical Authority */}
        <div className="w-full lg:w-[45%] flex flex-col justify-center px-8 md:px-16 xl:px-24 py-16 lg:py-32 bg-[#F5F5F0] z-10 relative">
          {/* CAD/Technical Decor */}
          <div className="absolute top-24 lg:top-32 left-8 md:left-16 xl:left-24 flex items-center gap-4 opacity-40 hidden md:flex">
            <div className="w-8 h-px bg-[#1A1C19]" />
          </div>

          <motion.div
             initial={{ opacity: 0, x: -30 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
             className="mt-8 lg:mt-0"
          >
             <span className="text-[9px] text-brand font-bold tracking-[0.4em] uppercase mb-8 block">{kcrData.company.branding}</span>
             
             <h1 className="framer-h1 text-[#1A1C19] mb-10">
             <motion.span 
               initial={{ y: 60, opacity: 0 }} 
               animate={{ y: 0, opacity: 1 }} 
               transition={{ duration: 1.2, delay: 0.7, ease: [0.16, 1, 0.3, 1] }} 
               className="block"
              >
                Produsen Furnitur Kantor
              </motion.span>
             <motion.span 
               initial={{ y: 60, opacity: 0 }} 
               animate={{ y: 0, opacity: 0.9 }} 
               transition={{ duration: 1.2, delay: 0.9, ease: [0.16, 1, 0.3, 1] }} 
               className="block font-serif-italic text-brand"
              >
                & Custom Furniture Bekasi.
              </motion.span>
           </h1>

            <motion.p 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ duration: 1.5, delay: 1.2 }} 
            className="text-[#1A1C19]/60 text-[16px] md:text-[18px] mb-14 max-w-md font-light leading-relaxed"
           >
             Mitra pengadaan furnitur sistem perkantoran dan hospitality premium. Merealisasikan desain dalam volume masif melalui presisi teknologi CNC standar Eropa.
           </motion.p>

             <div className="flex flex-col sm:flex-row items-start gap-4 w-full sm:w-auto">
                <Button 
                  variant="primary" 
                  size="lg" 
                  className="w-full sm:w-auto px-10 py-5 flex items-center justify-center gap-3 shadow-xl shadow-brand/10"
                  onClick={() => handleWhatsApp('hero')}
                >
                  <WhatsappLogo size={22} weight="fill" />
                  Konsultasi Proyek
                </Button>
                <Link to="/catalog" onClick={() => trackEvent('hero_cta_click', { target: 'catalog' })} className="w-full sm:w-auto">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto px-10 py-5 border-[#1A1C19]/20 text-[#1A1C19] hover:bg-[#1A1C19] hover:text-white">
                    Katalog Produk
                  </Button>
                </Link>
             </div>
          </motion.div>
        </div>

        {/* Right Side: Showcase */}
        <div className="w-full lg:w-[55%] relative min-h-[50vh] flex-1 lg:min-h-screen bg-[#1A1C19] overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div 
              key={heroIndex}
              initial={{ scale: 1.05, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="absolute inset-0"
            >
               <img
                 className="w-full h-full object-cover"
                 src={kcrData.images.hero[heroIndex]}
                 alt={`KCR Furniture Project - ${heroIndex + 1}`}
                 loading={heroIndex === 0 ? 'eager' : 'lazy'}
                 fetchPriority={heroIndex === 0 ? 'high' : 'auto'}
                 decoding="async"
                 sizes="(min-width: 1024px) 55vw, 100vw"
               />
               <div className="absolute inset-0 bg-black/10" />
            </motion.div>
          </AnimatePresence>

          {/* Vertical Index Indicator */}
          <div className="absolute right-6 md:right-12 top-1/2 -translate-y-1/2 z-30 flex flex-col items-center gap-6 bg-black/20 backdrop-blur-md py-6 px-3 rounded-full border border-white/10">
            {kcrData.images.hero.map((_, idx) => (
              <button
                key={`hero-idx-${idx}`}
                onClick={() => {
                  setHeroIndex(idx);
                  trackEvent('hero_slide_change', { direction: 'index', index: idx + 1 });
                }}
                className={`font-serif text-[12px] md:text-[14px] transition-all duration-500 ${idx === heroIndex ? 'text-white scale-125' : 'text-white/40 hover:text-white/80'}`}
                aria-label={`Show hero slide ${idx + 1}`}
              >
                0{idx + 1}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 1.5. BRUTALIST TICKER */}
      <div className="bg-[#1A1C19] py-5 overflow-hidden flex whitespace-nowrap border-b border-white/5">
        <motion.div 
          animate={{ x: ["0%", "-50%"] }}
          transition={{ ease: "linear", duration: 35, repeat: Infinity }}
          className="flex items-center text-white font-bold uppercase tracking-[0.25em] text-[10px] md:text-[11px] w-max"
        >
          <div className="flex items-center gap-10 px-5">
            <span>• EUROPEAN CNC PRECISION</span>
            <span>• PLYWOOD & HMR CORE</span>
            <span>• POLYURETHANE FINISH</span>
            <span>• 500+ WORKSTATION DEPLOYMENT</span>
            <span>• BEA CUKAI PURWAKARTA</span>
            <span>• DIRECT MANUFACTURER</span>
            <span>• MASS PRODUCTION CAPABILITY</span>
          </div>
          <div className="flex items-center gap-10 px-5">
            <span>• EUROPEAN CNC PRECISION</span>
            <span>• PLYWOOD & HMR CORE</span>
            <span>• POLYURETHANE FINISH</span>
            <span>• 500+ WORKSTATION DEPLOYMENT</span>
            <span>• BEA CUKAI PURWAKARTA</span>
            <span>• DIRECT MANUFACTURER</span>
            <span>• MASS PRODUCTION CAPABILITY</span>
          </div>
        </motion.div>
      </div>

      {/* 2. MANIFESTO - Typographic Editorial */}
      <section className="section-space-lg framer-container overflow-hidden render-auto bg-[#F5F5F0]">
        <div className="max-w-6xl mx-auto relative">
          <motion.div 
             initial={{ opacity: 0, scale: 0.8 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true }}
             transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
             className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-brand/5 rounded-full blur-3xl -z-10 pointer-events-none"
          />

          <motion.div {...fadeInUp} className="text-center mb-16 md:mb-24">
            <span className="framer-label text-brand mb-10 block tracking-[0.5em] opacity-80">01 / FILOSOFI KAMI</span>
            <h2 className="font-serif text-[42px] md:text-[64px] lg:text-[88px] leading-[1.05] text-[#1A1C19] tracking-[-0.02em]">
              Interior Fit-out Contractor <br className="hidden md:block" /> 
              & <span className="font-serif-italic text-brand font-light">Mass Production Furniture.</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-20 items-start">
            <motion.div {...fadeInUp} transition={{ delay: 0.1 }} className="md:col-span-5 md:col-start-2">
              <p className="text-[20px] md:text-[24px] text-[#1A1C19] font-medium leading-relaxed tracking-tight">
                Kami percaya bahwa ruang kerja yang luar biasa dimulai dari akurasi pada detail terkecil.
              </p>
            </motion.div>
            
            <motion.div {...fadeInUp} transition={{ delay: 0.2 }} className="md:col-span-5">
              <p className="text-[15px] md:text-[16px] text-[#1A1C19]/60 leading-relaxed mb-10 font-light">
                Lebih dari sekadar memproduksi furnitur, KCR Furniture bersama fasilitas manufaktur AMS merekayasa solusi tata ruang skala masif. Pendekatan berbasis data dan teknologi CNC kami memberikan identitas visual yang kuat dan produktivitas maksimal bagi setiap bisnis yang kami sentuh.
              </p>
              
              <Link to="/about" className="group inline-flex items-center gap-6 hover:text-brand transition-all">
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#1A1C19] group-hover:text-brand transition-colors">EKSPLORASI STANDAR KUALITAS</span>
                <span className="w-10 h-10 rounded-full border border-[#1A1C19]/15 flex items-center justify-center group-hover:bg-brand group-hover:border-brand group-hover:text-white transition-all">
                  <ArrowUpRight size={16} className="group-hover:translate-x-[1px] group-hover:-translate-y-[1px] transition-transform" />
                </span>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. SOLUTIONS - INTERACTIVE BANDS */}
      <section className="relative bg-[#1A1C19] text-white min-h-screen flex flex-col overflow-hidden">
         <AnimatePresence>
            <motion.img 
              key={activeSolution}
              src={solutionImages[activeSolution]}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 0.4, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0 w-full h-full object-cover"
            />
         </AnimatePresence>
         <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent" />
         
         <div className="framer-container relative z-10 py-24 md:py-32 lg:py-40 flex-1 flex flex-col justify-center">
            <span className="framer-label text-brand mb-12 block tracking-[0.5em]">02 / SOLUSI INDUSTRI</span>
            <div className="flex flex-col border-t border-white/20">
               {[
                 { title: "Executive & Corporate Space", desc: "Sistem workstation dan furnitur eksekutif yang dirancang untuk produktivitas tinggi dan penguatan identitas korporasi.", link: "/catalog?industry=office" },
                 { title: "Hospitality & Resort", desc: "Solusi furnitur kustom dengan durabilitas standar hotel bintang lima dan estetika premium yang tak lekang oleh waktu.", link: "/catalog?industry=hospitality" },
                 { title: "Public & Government Institution", desc: "Pengadaan furnitur berwibawa untuk instansi publik dengan kepastian kualitas material dan presisi produksi massal.", link: "/catalog?industry=government" }
               ].map((sol, idx) => (
                 <Link 
                   key={idx}
                   to={sol.link}
                   onMouseEnter={() => setActiveSolution(idx)}
                   className="group relative flex flex-col md:flex-row md:items-center justify-between py-8 md:py-12 border-b border-white/20 transition-all duration-500 hover:px-6 md:hover:px-8"
                 >
                   <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                   
                   <div className="flex items-center gap-4 md:gap-8 relative z-10 w-full md:w-[60%]">
                     <span className="font-serif text-xl md:text-2xl opacity-40 group-hover:text-brand group-hover:opacity-100 transition-colors shrink-0">0{idx + 1}</span>
                     <h3 className="font-serif text-2xl md:text-3xl lg:text-[44px] uppercase tracking-tighter group-hover:translate-x-4 transition-transform duration-500 line-clamp-1">{sol.title}</h3>
                   </div>
                   
                   <div className="mt-4 md:mt-0 flex items-center justify-between md:justify-end gap-6 md:gap-8 relative z-10 w-full md:w-[40%]">
                     <p className="text-[13px] md:text-sm text-white/70 max-w-[280px] md:opacity-0 group-hover:opacity-100 transition-all duration-500 lg:block text-left md:text-right leading-relaxed">
                       {sol.desc}
                     </p>
                     <div className="w-10 h-10 md:w-12 md:h-12 shrink-0 rounded-full border border-white/30 flex items-center justify-center group-hover:bg-brand group-hover:border-brand transition-all">
                       <ArrowUpRight size={18} className="group-hover:text-white transition-colors" />
                     </div>
                   </div>
                 </Link>
               ))}
            </div>
         </div>
      </section>

      {/* 4. STRATEGIC ADVANTAGES */}
      <section className="section-padding framer-container render-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 items-center">
          <motion.div {...fadeInUp} className="lg:col-span-6 order-2 lg:order-1">
             <div className="relative aspect-square rounded-[8px] overflow-hidden shadow-premium group">
                 <img src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=75&w=1200" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-[2s] group-hover:scale-105" alt="Craftsmanship" loading="lazy" decoding="async" sizes="(min-width: 1024px) 40vw, 100vw" />
                <div className="absolute inset-0 bg-brand/10 mix-blend-multiply" />
             </div>
          </motion.div>

          <motion.div {...fadeInUp} className="lg:col-span-5 lg:col-start-8 order-1 lg:order-2">
            <span className="framer-label text-brand mb-10 block tracking-[0.5em]">STRATEGIC EDGE</span>
            <h2 className="framer-h2 mb-14 text-[#1A1C19]">Mengapa Memilih <br/><span className="font-serif-italic text-brand">KCR Furniture?</span></h2>
            
            <div className="space-y-16">
              {[
                { t: 'European Standard', d: 'Pemanfaatan mesin CNC canggih menjamin detail sempurna dan presisi tinggi pada setiap produk.' },
                { t: 'Customized Design', d: 'Adaptasi desain yang fleksibel untuk memenuhi identitas visual unik perusahaan Anda.' },
                { t: 'Direct Manufacturer', d: 'Fasilitas produksi mandiri memberikan kontrol penuh atas kualitas dan waktu pengiriman.' }
              ].map((adv, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group"
                >
                  <h4 className="font-serif text-2xl mb-4 group-hover:text-brand transition-colors flex items-center gap-6">
                    <span className="w-12 h-px bg-brand/20 group-hover:w-16 transition-all" />
                    {adv.t}
                  </h4>
                  <p className="framer-body !text-sm pl-16 opacity-60 leading-relaxed">{adv.d}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* 5. MANUFACTURING POWER - STICKY SCROLL */}
      <StickyMediaScrollSection
        label="04 / KAPASITAS MANUFAKTUR"
        imageSrc="https://images.unsplash.com/photo-1565689157206-0fddef7589a2?auto=format&fit=crop&q=75&w=1400"
        imageAlt="AMS Manufacturing CNC"
        imageBadge="PT Afan Maju Sejahtera (AMS)"
        imageHeadline="Infrastruktur produksi mandiri seluas 2HA di Bekasi, Indonesia."
        cta={(
          <button
            className="cta-primary flex items-center gap-3 w-max"
            onClick={() => handleWhatsApp('mfg_sticky')}
          >
            <WhatsappLogo size={20} weight="fill" />
            Jadwalkan Kunjungan Pabrik
          </button>
        )}
      >
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ margin: '-20%' }}>
          <h3 className="font-serif text-4xl lg:text-[44px] text-[#1A1C19] mb-6 leading-tight">Presisi CNC <br/>Standar Eropa.</h3>
          <p className="text-[16px] text-[#1A1C19]/70 leading-relaxed mb-8">
            Investasi pada mesin CNC mutakhir memastikan toleransi milimeter yang ketat pada setiap pemotongan kayu. Akurasi ini sangat krusial untuk perakitan yang presisi dalam proyek berskala besar.
          </p>
          <div className="flex items-center gap-4 text-brand font-bold text-[11px] uppercase tracking-[0.2em]">
            <CheckCircle size={20} weight="fill" /> Akurasi Mutlak
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ margin: '-20%' }}>
          <h3 className="font-serif text-4xl lg:text-[44px] text-[#1A1C19] mb-6 leading-tight">Cost Engineering <br/>Ahli.</h3>
          <p className="text-[16px] text-[#1A1C19]/70 leading-relaxed mb-8">
            Kami sangat memahami batasan anggaran proyek korporasi. Tim engineer kami secara aktif merekomendasikan alternatif material (Plywood, MDF, HMR, MFC) dan teknik finishing tanpa mengorbankan estetika desain awal.
          </p>
          <div className="flex items-center gap-4 text-brand font-bold text-[11px] uppercase tracking-[0.2em]">
            <CheckCircle size={20} weight="fill" /> Optimalisasi Budget
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ margin: '-20%' }}>
          <h3 className="font-serif text-4xl lg:text-[44px] text-[#1A1C19] mb-6 leading-tight">Skalabilitas <br/>Roll-out.</h3>
          <p className="text-[16px] text-[#1A1C19]/70 leading-relaxed mb-8">
            Mulai dari produksi 50 hingga 1.000+ unit workstation, rantai pasokan dan jalur perakitan kami dirancang secara khusus untuk menangani pengadaan massal dengan kepastian waktu pengiriman.
          </p>
          <div className="flex items-center gap-4 text-brand font-bold text-[11px] uppercase tracking-[0.2em]">
            <CheckCircle size={20} weight="fill" /> Volume Skala Proyek
          </div>
        </motion.div>
      </StickyMediaScrollSection>

      {/* Mobile fallback for Manufacturing Power */}
      <section className="section-space-sm bg-white lg:hidden border-t border-[#1a1c19]/5">
         <div className="framer-container">
            <span className="framer-label text-brand mb-10 block tracking-[0.5em]">04 / KAPASITAS MANUFAKTUR</span>
            <div className="aspect-[4/3] mb-10 rounded-[4px] overflow-hidden relative">
               <img src="https://images.unsplash.com/photo-1565689157206-0fddef7589a2?auto=format&fit=crop&q=75&w=900" className="w-full h-full object-cover grayscale" alt="AMS Manufacturing CNC" loading="lazy" decoding="async" sizes="100vw" />
               <div className="absolute inset-0 bg-black/40" />
               <div className="absolute bottom-6 left-6 right-6">
                 <span className="bg-brand text-white text-[9px] font-bold uppercase tracking-[0.2em] px-3 py-1.5 rounded-full">
                   PT AMS (Bekasi)
                 </span>
               </div>
            </div>

            <div className="space-y-10 mb-10">
               <div>
                 <h3 className="font-serif text-[28px] text-[#1A1C19] mb-4 leading-tight">Presisi CNC Eropa.</h3>
                 <p className="text-[15px] text-[#1A1C19]/70 leading-relaxed mb-4">
                   Toleransi milimeter ketat untuk perakitan yang presisi dalam proyek berskala besar.
                 </p>
                 <div className="flex items-center gap-3 text-brand font-bold text-[10px] uppercase tracking-[0.2em]">
                   <CheckCircle size={16} weight="fill" /> Akurasi Mutlak
                 </div>
               </div>

               <div>
                 <h3 className="font-serif text-[28px] text-[#1A1C19] mb-4 leading-tight">Cost Engineering.</h3>
                 <p className="text-[15px] text-[#1A1C19]/70 leading-relaxed mb-4">
                   Rekomendasi material dan teknik untuk mengoptimalkan anggaran proyek.
                 </p>
                 <div className="flex items-center gap-3 text-brand font-bold text-[10px] uppercase tracking-[0.2em]">
                   <CheckCircle size={16} weight="fill" /> Optimalisasi Budget
                 </div>
               </div>

               <div>
                 <h3 className="font-serif text-[28px] text-[#1A1C19] mb-4 leading-tight">Skalabilitas Roll-out.</h3>
                 <p className="text-[15px] text-[#1A1C19]/70 leading-relaxed mb-4">
                   Rantai pasokan khusus untuk menangani pengadaan massal tepat waktu.
                 </p>
                 <div className="flex items-center gap-3 text-brand font-bold text-[10px] uppercase tracking-[0.2em]">
                   <CheckCircle size={16} weight="fill" /> Volume Skala Proyek
                 </div>
               </div>
            </div>

            <button 
              className="cta-primary flex items-center gap-3 w-full justify-center" 
              onClick={() => handleWhatsApp('mfg_mobile')}
            >
              <WhatsappLogo size={20} weight="fill" />
              Jadwalkan Kunjungan Pabrik
            </button>
         </div>
      </section>
      {/* 6. PROJECT FOCUS - Full Width Magazine */}
      <section className="relative w-full overflow-hidden min-h-[80vh] flex items-center">
          <div className="absolute inset-0">
             <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=75&w=1600" className="w-full h-full object-cover grayscale opacity-50" alt="Corporate Project" loading="lazy" decoding="async" sizes="100vw" />
             <div className="absolute inset-0 bg-[#1A1C19]/80 mix-blend-multiply" />
             <div className="absolute inset-0 bg-gradient-to-r from-[#1A1C19] via-[#1A1C19]/90 to-[#1A1C19]/20" />
          </div>
          
          <div className="framer-container section-space-md relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <motion.div {...fadeInUp} className="text-white lg:col-span-6">
              <p className="framer-label !text-brand mb-6 !opacity-100 tracking-[0.4em]">STUDI KASUS PROYEK</p>
              <h3 className="font-serif text-[40px] md:text-[56px] leading-[1.05] mb-8">Portfolio Realisasi <br/>Skala Nasional.</h3>
              <p className="text-[16px] text-white/70 leading-relaxed max-w-lg mb-12">Dari instansi pemerintah hingga tech-hub modern, jelajahi bagaimana solusi furnitur kami mentransformasi ruang kerja menjadi lebih produktif.</p>
              <Link to="/case-studies" className="inline-flex items-center gap-4 text-[12px] font-bold uppercase tracking-[0.25em] text-white hover:text-brand transition-colors group">
                Eksplorasi Portfolio <ArrowUpRight size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </Link>
            </motion.div>
            
            <motion.div {...fadeInUp} transition={{ delay: 0.2 }} className="lg:col-span-5 lg:col-start-8 bg-[#F5F5F0] p-10 md:p-14 rounded-[4px] shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-bl-full -z-10 group-hover:scale-150 transition-transform duration-700" />
              <p className="framer-label text-brand mb-4 !opacity-100 tracking-[0.3em]">SOLUSI KUSTOM</p>
              <h3 className="font-serif text-[32px] md:text-[40px] leading-[1.1] mb-6 text-[#1A1C19]">Cost Engineering <br/>untuk Budget Proyek.</h3>
              <p className="text-[15px] text-[#1A1C19]/70 leading-relaxed mb-10">Kami menyesuaikan material dan teknik produksi untuk mencapai estetika maksimal dalam batas anggaran proyek Anda.</p>
              <Link to="/services" className="cta-secondary inline-flex w-max">
                Pelajari Solusi Kustom
              </Link>
            </motion.div>
          </div>
      </section>

      {/* 7. FEATURED PRODUCTS PREVIEW */}
      <section className="section-padding bg-[#F8F6F1] border-y border-[#1A1C19]/5 render-auto relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-white/50 -skew-x-12 translate-x-20 pointer-events-none" />
        <div className="framer-container relative z-10">
          <motion.div {...fadeInUp} className="mb-24 text-center max-w-3xl mx-auto">
            <span className="framer-label text-brand mb-6 block tracking-[0.5em]">SIGNATURE COLLECTIONS</span>
            <h2 className="font-serif text-[40px] md:text-[56px] leading-tight mb-8">Koleksi <span className="font-serif-italic text-brand">Masterpiece.</span></h2>
            <p className="text-[16px] text-[#1A1C19]/60 leading-relaxed mb-10">Sistem furnitur yang paling sering dispesifikasikan oleh firma arsitek dan desainer interior untuk proyek-proyek prestisius dengan tuntutan presisi manufaktur yang tinggi.</p>
            <Link to="/catalog" className="cta-secondary inline-flex w-max">
              Eksplorasi Katalog Teknis
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {featuredProducts.map((p, idx) => (
              <ProductCard 
                key={p.id}
                id={p.id}
                category={p.category}
                name={p.name}
                specs={p.specs}
                price={p.price}
                price_tax={p.price_tax}
                img={p.img}
                index={idx}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 8. FINAL CTA - Cinematic Dark */}
      <section className="section-space-lg bg-[#1A1C19] text-white text-center relative render-auto overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=75&w=1600"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-luminosity"
          loading="lazy"
          decoding="async"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1C19] via-[#1A1C19]/80 to-transparent" />
        
        <motion.div {...fadeInUp} className="framer-container relative z-10">
            <span className="framer-label text-brand mb-8 block tracking-[0.5em] opacity-80">SIAP BERKOLABORASI</span>
            <h2 className="font-serif text-[48px] md:text-[72px] leading-[1.05] tracking-[-0.03em] mb-8">
              Wujudkan Ruang Kerja <br className="hidden md:block"/>
              <span className="font-serif-italic text-brand">Skala Proyek Anda.</span>
            </h2>
            <p className="mx-auto max-w-2xl text-[18px] md:text-[20px] leading-relaxed text-white/60 mb-14 font-light">
              Dapatkan dukungan teknis, estimasi biaya massal, dan konsultasi manufaktur langsung dari tim engineer kami di Bekasi.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <button 
                className="bg-brand text-white px-10 py-5 rounded-[4px] text-[11px] font-bold uppercase tracking-[0.25em] flex items-center justify-center gap-4 hover:bg-white hover:text-[#1A1C19] transition-colors shadow-2xl w-full sm:w-auto" 
                onClick={() => handleWhatsApp('final_cta')}
              >
                <WhatsappLogo size={22} weight="fill" />
                Mulai Konsultasi Proyek
              </button>
              <Link to="/services" className="cta-secondary !bg-white/10 !text-white !border-white/20 hover:!bg-white hover:!text-[#1A1C19]">
                Lihat Layanan
              </Link>
            </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Home;
