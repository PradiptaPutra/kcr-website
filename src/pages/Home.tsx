import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CaretRight, CaretLeft, ArrowUpRight } from '@phosphor-icons/react';
import { kcrData } from '../data/kcrData';
import SEO from '../components/SEO';

const Home: React.FC = () => {
  const [heroIndex, setHeroIndex] = useState(0);
  
  const heroImages = kcrData.images.hero;

  const fadeInUp = {
    initial: { y: 20, opacity: 0 },
    whileInView: { y: 0, opacity: 1 },
    viewport: { once: true, margin: "-20px" },
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as any }
  };

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
        title="Kontraktor Bangunan & Spesialis Shotcrete Indonesia"
        description="PT. KARYA CIPTA RAHARJA (KCR) adalah Kontraktor Bangunan BUMN dan Spesialis Shotcrete Indonesia. Kami menghadirkan solusi konstruksi presisi, sistem prefabrikasi modern, dan manajemen teknis saksama sejak 2006."
        keywords="Kontraktor Bangunan, Spesialis Shotcrete, Sistem Prefabrikasi, Kontraktor BUMN, Shotcrete Indonesia, Prefab Building System, Konstruksi Indonesia"
        canonicalUrl="/"
        ogImage={kcrData.images.hero[0]}
      >
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </SEO>

      {/* 1. HERO */}
      <section className="relative h-screen w-full overflow-hidden bg-[#1a1c19] flex items-center justify-center">
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

        <div className="relative z-10 text-center px-6">
           <motion.span initial={{ opacity: 0 }} animate={{ opacity: 0.6 }} transition={{ delay: 0.3 }} className="framer-label text-white mb-8 block tracking-[0.8em]">EST. 2006</motion.span>
           <h1 className="framer-h1 text-white mb-12">
             <motion.span initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5 }} className="block">Integritas <span className="italic font-serif">Struktural</span></motion.span>
             <motion.span initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 0.8 }} transition={{ delay: 0.6 }} className="block font-serif italic text-white/80">di Setiap Proyek.</motion.span>
           </h1>
           <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
             <Link to="/portfolio" className="framer-btn !border-white/40 !text-white hover:!bg-white hover:!text-[#2A2C2B]">
               Lihat Proyek Kami
             </Link>
           </motion.div>
        </div>

        <div className="absolute bottom-12 right-12 z-20 flex items-center gap-8">
          <button 
            onClick={() => setHeroIndex(prev => (prev === 0 ? heroImages.length - 1 : prev - 1))} 
            className="text-white/40 hover:text-white transition-all"
            aria-label="Previous Hero Image"
          >
            <CaretLeft weight="light" size={24} />
          </button>
          <button 
            onClick={() => setHeroIndex(prev => (prev === heroImages.length - 1 ? 0 : prev + 1))} 
            className="text-white/40 hover:text-white transition-all"
            aria-label="Next Hero Image"
          >
            <CaretRight weight="light" size={24} />
          </button>
        </div>
      </section>

      {/* 2. NARRATIVE */}
      <section className="py-32 framer-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <motion.div {...fadeInUp} className="lg:col-span-5 border-l-2 border-brand pl-10 py-2">
            <span className="framer-label text-brand mb-8 block">01 / FILOSOFI</span>
            <h2 className="framer-h2 leading-tight text-[#2A2C2B]">
              Standar baru dalam <br/> 
              <span className="italic text-brand font-serif text-[1.1em]">eksekusi teknis.</span>
            </h2>
          </motion.div>
          
          <motion.div {...fadeInUp} className="lg:col-span-6 lg:col-start-7">
            <p className="framer-body !text-[18px] mb-10 text-[#2A2C2B]/90">
              {kcrData.company.description}
            </p>
            <p className="framer-body mb-12">
              {kcrData.company.introduction}
            </p>
            <Link to="/about" className="framer-label group flex items-center gap-4 hover:text-brand transition-all !opacity-100">
              Tentang Kami <CaretRight weight="bold" className="group-hover:translate-x-2 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 3. SOLUTIONS */}
      <section className="py-32 framer-container border-t border-[#2A2C2B]/5">
        <motion.div {...fadeInUp} className="mb-20">
          <span className="framer-label text-brand mb-6 block">02 / LAYANAN</span>
          <h2 className="framer-h2 text-[#2A2C2B]">Spesialisasi Kami</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {kcrData.services.map((s, idx) => (
            <motion.div 
              key={s.id}
              {...fadeInUp}
              className="bg-white p-12 border-[0.5px] border-[#2A2C2B]/10 rounded-[12px] flex flex-col gap-8 group hover:border-brand transition-all duration-500"
            >
              <div className="flex justify-between items-start">
                <span className="framer-label text-brand !opacity-100">0{idx + 1}</span>
                <div className="w-10 h-10 border border-[#2A2C2B]/10 rounded-full flex items-center justify-center group-hover:bg-[#2A2C2B] group-hover:text-white transition-all">
                  <ArrowUpRight weight="light" size={20} />
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <h3 className="font-serif text-[28px] text-[#2A2C2B] uppercase tracking-tight">{s.title}</h3>
                <p className="framer-body !text-[15px] opacity-80">{s.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 4. ARCHIVES */}
      <section className="py-32 bg-[#2A2C2B] text-[#F5F5F0]">
        <div className="framer-container">
          <motion.div {...fadeInUp} className="mb-24 flex justify-between items-end border-b border-white/10 pb-10">
            <h2 className="framer-h1 !text-[42px] text-white">Selected Projects</h2>
            <span className="framer-label !text-white/40">2021 — 2024</span>
          </motion.div>

          <div className="grid grid-cols-1 gap-20">
            {kcrData.images.portfolio.map((p) => (
              <motion.article 
                key={p.id}
                {...fadeInUp}
                className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center group"
              >
                <div className="lg:col-span-7 overflow-hidden rounded-[8px]">
                  <img src={p.img} alt={`KCR Project Archive: ${p.title} - ${p.category}`} className="w-full aspect-[16/9] object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700" />
                </div>
                <div className="lg:col-span-4 lg:col-start-9 flex flex-col gap-6">
                  <span className="framer-label !text-[#F5F5F0] !opacity-100 font-bold">{p.year} / {p.category}</span>
                  <h3 className="font-serif text-[32px] leading-tight text-white">{p.title}</h3>
                  <p className="framer-body !text-white/50">{p.client}</p>
                  <Link to="/portfolio" className="framer-label !text-white hover:text-brand transition-all flex items-center gap-3">
                    View Case Study <CaretRight weight="bold" />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CTA */}
      <section className="py-40 framer-container text-center relative overflow-hidden">
        <motion.div {...fadeInUp}>
          <span className="framer-label text-brand mb-8 block tracking-[0.8em]">KOLABORASI</span>
          <h2 className="framer-h1 mb-16 text-[#2A2C2B]">Mari membangun <span className="italic font-serif text-brand">legacy</span> bersama.</h2>
          <Link to="/contact" className="framer-btn !bg-[#2A2C2B] !text-white hover:!bg-brand border-none">
            Hubungi Tim Ahli Kami
          </Link>
        </motion.div>
      </section>
    </div>
  );
};

export default Home;
