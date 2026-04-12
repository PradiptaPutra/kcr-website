import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CaretRight, CaretLeft, ArrowUpRight } from '@phosphor-icons/react';
import { kcrData } from '../data/kcrData';
import SEO from '../components/SEO';
import ProductCard from '../components/ProductCard';

const Home: React.FC = () => {
  const [heroIndex, setHeroIndex] = useState(0);
  
  const fadeInUp = {
    initial: { y: 20, opacity: 0 },
    whileInView: { y: 0, opacity: 1 },
    viewport: { once: true },
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as any }
  };

  const heroImages = kcrData.images.hero;

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://karyaciptaraharja.com/#organization",
        "name": "PT. KARYA CIPTA RAHARJA",
        "alternateName": "KCR",
        "url": "https://karyaciptaraharja.com",
        "description": kcrData.company.description,
        "foundingDate": "2006",
        "contactPoint": [
          {
            "@type": "ContactPoint",
            "telephone": "+62-21-8459-8590",
            "contactType": "customer service",
            "areaServed": "ID",
            "availableLanguage": ["Indonesian", "English"]
          }
        ]
      },
      {
        "@type": "ConstructionBusiness",
        "@id": "https://karyaciptaraharja.com/#localbusiness",
        "name": "PT. KARYA CIPTA RAHARJA",
        "parentOrganization": { "@id": "https://karyaciptaraharja.com/#organization" },
        "image": kcrData.images.hero,
        "telephone": "(021) 84598590",
        "email": "info@karyaciptaraharja.com",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Jl. Dirgantara Raya Blok A No. 7, BDP – Jatisari– Jatiasih",
          "addressLocality": "Bekasi",
          "addressRegion": "Jawa Barat",
          "postalCode": "17426",
          "addressCountry": "ID"
        },
        "url": "https://karyaciptaraharja.com"
      }
    ]
  };

  return (
    <div className="bg-[#F5F5F0]">
      <SEO 
        title="Kontraktor Bangunan & Spesialis Shotcrete Terpercaya"
        description="PT. KARYA CIPTA RAHARJA (KCR) adalah kontraktor andalan dan Spesialis Shotcrete Indonesia. Kami memberikan solusi bangunan presisi, sistem prefab modern, and manajemen yang rapi sejak 2006."
        keywords="Kontraktor Bangunan, Spesialis Shotcrete, Sistem Prefabrikasi, Kontraktor Terpercaya, Shotcrete Indonesia, Bangunan Prefab"
        canonicalUrl="/"
        ogImage={kcrData.images.hero[0]}
      >
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </SEO>

      {/* 1. HERO */}
      <section className="relative h-screen w-full overflow-hidden bg-[#1a1c19] flex flex-col items-center">
        <motion.div 
          key={heroIndex}
          initial={{ scale: 1.05, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.5 }}
          transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] as any }}
          className="absolute inset-0"
        >
          <img className="w-full h-full object-cover" src={heroImages[heroIndex]} alt={`KCR Construction Project - ${heroIndex + 1}`} />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40" />
        </motion.div>

        {/* Vertical Spacer for Fixed Navbar */}
        <div className="h-[72px] w-full shrink-0" />

        {/* Main Content - Pushed to center of remaining space */}
        <div className="relative z-10 text-center px-6 max-w-5xl flex-1 flex flex-col justify-center items-center">
           <motion.span initial={{ opacity: 0 }} animate={{ opacity: 0.6 }} transition={{ delay: 0.5 }} className="framer-label text-white mb-8 block tracking-[0.8em]">EST. 2006</motion.span>
           <h1 className="framer-h1 text-white mb-8">
             <motion.span initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.7 }} className="block">Bangun Tanpa <span className="italic font-serif">Kompromi</span>,</motion.span>
             <motion.span initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 0.8 }} transition={{ delay: 0.9 }} className="block font-serif italic text-white/80">Presisi Tanpa Henti.</motion.span>
           </h1>
           <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }} className="text-white/60 text-lg mb-12 max-w-2xl mx-auto font-light leading-relaxed">
             Mitra Kontraktor & Spesialis Shotcrete terpercaya dengan pengalaman 17+ tahun dalam membangun infrastruktur and Proyek Strategis Nasional.
           </motion.p>
           <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3 }} className="flex flex-col sm:flex-row items-center justify-center gap-6">
             <Link to="/contact" className="framer-btn !bg-brand !text-white border-none hover:scale-105 transition-transform px-10">
               Konsultasi Proyek Gratis
             </Link>
             <Link to="/portfolio" className="framer-btn !border-white/40 !text-white hover:!bg-white hover:!text-[#2A2C2B] px-10">
               Lihat Portofolio Kami
             </Link>
           </motion.div>
        </div>

        {/* Trust Indicators - Authority & Social Proof at the very bottom */}
        <div className="relative z-20 w-full hidden md:block pb-12 shrink-0">
          <div className="framer-container">
            <div className="grid grid-cols-3 gap-12 border-t border-white/10 pt-10">
              <div className="text-center">
                <span className="block text-white text-3xl font-serif mb-2">17+</span>
                <span className="text-white/40 uppercase tracking-widest text-xs">Tahun Pengalaman</span>
              </div>
              <div className="text-center">
                <span className="block text-white text-3xl font-serif mb-2">100+</span>
                <span className="text-white/40 uppercase tracking-widest text-xs">Proyek Selesai</span>
              </div>
              <div className="text-center">
                <span className="block text-white text-3xl font-serif mb-2">BUMN</span>
                <span className="text-white/40 uppercase tracking-widest text-xs">Mitra Terpercaya</span>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Buttons - Moved to sides for better accessibility and zero overlap */}
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 z-30 flex justify-between px-8 pointer-events-none">
          <button 
            onClick={() => setHeroIndex(prev => (prev === 0 ? heroImages.length - 1 : prev - 1))} 
            className="text-white/20 hover:text-white transition-all pointer-events-auto p-4"
            aria-label="Previous Hero Image"
          >
            <CaretLeft weight="light" size={32} />
          </button>
          <button 
            onClick={() => setHeroIndex(prev => (prev === heroImages.length - 1 ? 0 : prev + 1))} 
            className="text-white/20 hover:text-white transition-all pointer-events-auto p-4"
            aria-label="Next Hero Image"
          >
            <CaretRight weight="light" size={32} />
          </button>
        </div>
      </section>

      {/* 2. NARRATIVE - Jobs to Be Done & Authority */}
      <section className="py-20 md:py-32 framer-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <motion.div {...fadeInUp} className="lg:col-span-5 border-l-2 border-brand pl-10 py-2">
            <span className="framer-label text-brand mb-8 block">01 / MENGAPA KAMI</span>
            <h2 className="framer-h2 leading-tight text-[#2A2C2B]">
              Keahlian Teknis untuk <br/> 
              <span className="italic text-brand font-serif text-[1.1em]">Struktur Masa Depan.</span>
            </h2>
          </motion.div>
          
          <motion.div {...fadeInUp} transition={{ delay: 0.2 }} className="lg:col-span-6 lg:col-start-7">
            <p className="framer-body !text-[18px] mb-10 text-[#2A2C2B] font-medium">
              Kami memahami bahwa setiap proyek konstruksi adalah investasi besar yang menuntut keamanan tanpa celah and ketepatan waktu.
            </p>
            <p className="framer-body mb-10">
              Sebagai **Spesialis Shotcrete Indonesia**, KCR tidak hanya sekadar membangun, tetapi memberikan solusi perkuatan struktur yang telah teruji pada Proyek Strategis Nasional. Kami menggabungkan metode konvensional yang rapi dengan inovasi sistem prefabrikasi untuk efisiensi maksimal.
            </p>
            <Link to="/about" className="framer-label group flex items-center gap-4 hover:text-brand transition-all !opacity-100">
              Pelajari Standar Kualitas Kami <CaretRight weight="bold" className="group-hover:translate-x-2 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 3. SOLUTIONS - Benefits Oriented (JTBD) */}
      <section className="py-20 md:py-32 framer-container border-t border-[#2A2C2B]/5">
        <motion.div {...fadeInUp} className="mb-20">
          <span className="framer-label text-brand mb-6 block">02 / SOLUSI</span>
          <h2 className="framer-h2 text-[#2A2C2B]">Fokus Pada Hasil & Keamanan</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Link to="/services" className="block group">
            <motion.div 
              {...fadeInUp}
              className="bg-white p-12 border-[0.5px] border-[#2A2C2B]/10 rounded-[12px] flex flex-col gap-8 group-hover:border-brand transition-all duration-500 h-full"
            >
              <div className="flex justify-between items-start">
                <span className="framer-label text-brand !opacity-100">01</span>
                <div className="w-10 h-10 border border-[#2A2C2B]/10 rounded-full flex items-center justify-center group-hover:bg-[#2A2C2B] group-hover:text-white transition-all">
                  <ArrowUpRight weight="light" size={20} />
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <h3 className="font-serif text-[28px] text-[#2A2C2B] uppercase tracking-tight">Manajemen Proyek Terpadu</h3>
                <p className="framer-body !text-[15px] opacity-80">Dari tahap perencanaan hingga serah terima, kami memastikan kontrol kualitas yang ketat sehingga proyek Anda selesai tepat waktu tanpa pembengkakan biaya.</p>
              </div>
            </motion.div>
          </Link>

          <Link to="/services" className="block group">
            <motion.div 
              {...fadeInUp}
              transition={{ delay: 0.1 }}
              className="bg-white p-12 border-[0.5px] border-[#2A2C2B]/10 rounded-[12px] flex flex-col gap-8 group-hover:border-brand transition-all duration-500 h-full"
            >
              <div className="flex justify-between items-start">
                <span className="framer-label text-brand !opacity-100">02</span>
                <div className="w-10 h-10 border border-[#2A2C2B]/10 rounded-full flex items-center justify-center group-hover:bg-[#2A2C2B] group-hover:text-white transition-all">
                  <ArrowUpRight weight="light" size={20} />
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <h3 className="font-serif text-[28px] text-[#2A2C2B] uppercase tracking-tight">Proteksi Lereng & Infrastruktur</h3>
                <p className="framer-body !text-[15px] opacity-80">Spesialisasi Shotcrete kami memberikan keamanan ekstra pada area rawan longsor and dinding terowongan dengan aplikasi beton semprot yang presisi.</p>
              </div>
            </motion.div>
          </Link>

          <Link to="/catalog" className="block group">
            <motion.div 
              {...fadeInUp}
              transition={{ delay: 0.2 }}
              className="bg-white p-12 border-[0.5px] border-[#2A2C2B]/10 rounded-[12px] flex flex-col gap-8 group-hover:border-brand transition-all duration-500 h-full"
            >
              <div className="flex justify-between items-start">
                <span className="framer-label text-brand !opacity-100">03</span>
                <div className="w-10 h-10 border border-[#2A2C2B]/10 rounded-full flex items-center justify-center group-hover:bg-[#2A2C2B] group-hover:text-white transition-all">
                  <ArrowUpRight weight="light" size={20} />
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <h3 className="font-serif text-[28px] text-[#2A2C2B] uppercase tracking-tight">Konstruksi Prefab Modern</h3>
                <p className="framer-body !text-[15px] opacity-80">Percepat waktu pembangunan hingga 40% dengan sistem rangka baja ringan prefabrikasi yang akurat and efisien untuk berbagai jenis bangunan.</p>
              </div>
            </motion.div>
          </Link>

          <Link to="/catalog" className="block group">
            <motion.div 
              {...fadeInUp}
              transition={{ delay: 0.3 }}
              className="bg-white p-12 border-[0.5px] border-[#2A2C2B]/10 rounded-[12px] flex flex-col gap-8 group-hover:border-brand transition-all duration-500 h-full"
            >
              <div className="flex justify-between items-start">
                <span className="framer-label text-brand !opacity-100">04</span>
                <div className="w-10 h-10 border border-[#2A2C2B]/10 rounded-full flex items-center justify-center group-hover:bg-[#2A2C2B] group-hover:text-white transition-all">
                  <ArrowUpRight weight="light" size={20} />
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <h3 className="font-serif text-[28px] text-[#2A2C2B] uppercase tracking-tight">Fit-Out Interior Eksekutif</h3>
                <p className="framer-body !text-[15px] opacity-80">Menciptakan ruang kerja yang produktif dengan furnitur custom berkualitas tinggi yang mencerminkan prestise and profesionalisme perusahaan Anda.</p>
              </div>
            </motion.div>
          </Link>
        </div>
      </section>

      {/* 4. STRATEGIC ADVANTAGES - Authority & Loss Aversion */}
      <section className="py-20 md:py-32 bg-white relative overflow-hidden">
        <div className="framer-container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <motion.div {...fadeInUp} className="lg:col-span-6">
              <span className="framer-label text-brand mb-8 block tracking-[0.6em]">KEUNGGULAN STRATEGIS</span>
              <h2 className="framer-h2 mb-12 text-[#2A2C2B]">Mengapa Proyek Besar <br/><span className="italic font-serif text-brand">Mempercayakan KCR?</span></h2>
              <div className="space-y-10">
                <div className="flex gap-6">
                  <div className="w-12 h-12 rounded-full bg-[#F5F5F0] flex items-center justify-center flex-shrink-0 text-brand font-serif text-xl italic">1</div>
                  <div>
                    <h3 className="font-serif text-2xl text-[#2A2C2B] mb-2">Zero Delay Management</h3>
                    <p className="framer-body !text-sm text-[#2A2C2B]/60">Kami menggunakan sistem manajemen lapangan yang rapi untuk menghindari hambatan operasional yang sering kali menyebabkan pembengkakan biaya pada proyek konstruksi.</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="w-12 h-12 rounded-full bg-[#F5F5F0] flex items-center justify-center flex-shrink-0 text-brand font-serif text-xl italic">2</div>
                  <div>
                    <h3 className="font-serif text-2xl text-[#2A2C2B] mb-2">Sertifikasi & Standar Nasional</h3>
                    <p className="framer-body !text-sm text-[#2A2C2B]/60">Kepatuhan ketat terhadap standar teknis and K3, memastikan setiap struktur yang kami bangun memiliki daya tahan jangka panjang and keamanan maksimal.</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="w-12 h-12 rounded-full bg-[#F5F5F0] flex items-center justify-center flex-shrink-0 text-brand font-serif text-xl italic">3</div>
                  <div>
                    <h3 className="font-serif text-2xl text-[#2A2C2B] mb-2">Teknologi Shotcrete Teruji</h3>
                    <p className="framer-body !text-sm text-[#2A2C2B]/60">Sebagai spesialis, kami memiliki peralatan and tim ahli yang mampu menangani medan tersulit sekalipun, mulai dari lereng curam hingga terowongan.</p>
                  </div>
                </div>
              </div>
            </motion.div>
            <motion.div {...fadeInUp} transition={{ delay: 0.3 }} className="lg:col-span-5 lg:col-start-8">
              <div className="relative aspect-[4/5] rounded-[24px] overflow-hidden shadow-2xl group">
                <img src={kcrData.images.hero[2]} alt="KCR Field Operation" className="w-full h-full object-cover" loading="lazy" />
                <div className="absolute bottom-8 left-8 right-8 p-8 bg-white/90 backdrop-blur-md rounded-xl">
                  <p className="framer-body !text-brand italic font-serif text-lg mb-2">"Keamanan bukan sekadar opsi, melainkan pondasi utama dari setiap jengkal beton yang kami aplikasikan."</p>
                  <p className="framer-label !text-[#2A2C2B] !opacity-100">— Tim Teknis KCR</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 5. TRUSTED BY - Social Proof */}
      <section className="py-16 md:py-24 border-y border-[#2A2C2B]/5 bg-[#F5F5F0]/50">
        <div className="framer-container text-center">
          <span className="framer-label text-[#2A2C2B]/40 mb-12 block tracking-[0.4em]">DIPERCAYA OLEH MITRA STRATEGIS</span>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-40 hover:opacity-100 transition-opacity duration-500 grayscale">
             <div className="font-serif text-2xl tracking-tighter">BUMN <span className="text-brand">Karya</span></div>
             <div className="font-serif text-2xl tracking-tighter">Sektor <span className="text-brand">Energi</span></div>
             <div className="font-serif text-2xl tracking-tighter">Industri <span className="text-brand">Nasional</span></div>
             <div className="font-serif text-2xl tracking-tighter">Swasta <span className="text-brand">Logistik</span></div>
          </div>
        </div>
      </section>

      {/* 6. ARCHIVES - Proof of Competence */}
      <section className="py-20 md:py-32 bg-[#2A2C2B] text-[#F5F5F0]">
        <div className="framer-container">
          <motion.div {...fadeInUp} className="mb-24 flex flex-col md:flex-row justify-between items-start md:items-end border-b border-white/10 pb-10 gap-6">
            <h2 className="framer-h1 !text-[42px] text-white">Bukti Nyata Karya Kami</h2>
            <Link to="/portfolio" className="framer-label !text-white hover:text-brand transition-all flex items-center gap-3">
              Lihat Semua Proyek <CaretRight weight="bold" />
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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

      {/* 5. CTA - Reciprocity & Loss Aversion */}
      <section className="py-24 md:py-40 framer-container text-center relative overflow-hidden">
        <motion.div {...fadeInUp}>
          <span className="framer-label text-brand mb-8 block tracking-[0.8em]">KONSULTASI</span>
          <h2 className="framer-h1 mb-8 text-[#2A2C2B]">Jangan Biarkan Proyek Anda <span className="italic font-serif text-brand">Terhambat.</span></h2>
          <p className="framer-body max-w-2xl mx-auto mb-16 text-[#2A2C2B]/70">
            Dapatkan analisis teknis and konsultasi anggaran awal gratis dari tim ahli kami untuk memastikan proyek Anda berjalan efisien sejak hari pertama.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link to="/contact" className="framer-btn !bg-[#2A2C2B] !text-white border-none px-12">
              Mulai Konsultasi Gratis
            </Link>
            <a href="mailto:info@karyaciptaraharja.com" className="framer-label hover:text-brand transition-all flex items-center gap-2">
              Atau kirim email penawaran <CaretRight weight="bold" />
            </a>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Home;
