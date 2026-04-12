import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SEO from '../components/SEO';
import ProductCard from '../components/ProductCard';
import PageHeader from '../components/PageHeader';
import { kcrData } from '../data/kcrData';

const Portfolio: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('SEMUA');

  const projectCategories = ['INDUSTRIAL', 'KOMERSIAL', 'RESIDENSIAL', 'INFRASTRUKTUR', 'INTERIOR'];
  
  const projects = kcrData.images.portfolio.map(p => ({
    client: p.client,
    project: p.title,
    year: p.year,
    category: p.category.toUpperCase(),
    img: p.img
  }));

  const filteredProjects = activeCategory === 'SEMUA'
    ? projects
    : projects.filter((project) => project.category === activeCategory);

  return (
    <div className="bg-[#F5F5F0] min-h-screen pt-20 md:pt-24 pb-24 md:pb-40 selection:bg-[#2A2C2B] selection:text-white">
      <SEO 
        title="Portofolio Spesialis Shotcrete & Kontraktor BUMN"
        description="Lihat berbagai proyek sukses yang telah kami kerjakan. Bukti nyata kualitas kerja kami sebagai kontraktor dan spesialis shotcrete yang terpercaya."
        keywords="Portofolio Kontraktor, Proyek Shotcrete, Proyek BUMN, Konstruksi Gedung, PT KCR"
        canonicalUrl="/portfolio"
      />

      <PageHeader 
        label="04 / PORTOFOLIO"
        title="Hasil Karya"
        subtitle="& Pengalaman Kami."
        description="Setiap proyek adalah bukti nyata komitmen kami terhadap kualitas dan ketepatan waktu. Lihat lebih dekat beberapa pekerjaan terbaik yang telah kami selesaikan."
      />

      {/* 2. STICKY FILTER */}
      <section className="sticky top-[72px] z-30 bg-[#F5F5F0]/80 backdrop-blur-xl border-y-[0.5px] border-[#2A2C2B]/5 mb-12 md:mb-24">
        <div className="framer-container py-5 flex flex-wrap items-center gap-x-10 gap-y-3">
          <button 
            onClick={() => setActiveCategory('SEMUA')}
            className={`framer-label transition-all duration-500 relative pb-1 ${activeCategory === 'SEMUA' ? 'opacity-100 text-[#2A2C2B]' : 'opacity-60 hover:opacity-100'}`}
          >
            Semua ({projects.length})
            {activeCategory === 'SEMUA' && <motion.div layoutId="underline" className="absolute bottom-0 left-0 w-full h-[1.5px] bg-brand" />}
          </button>
          {projectCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`framer-label transition-all duration-500 relative pb-1 ${activeCategory === cat ? 'opacity-100 text-[#2A2C2B]' : 'opacity-60 hover:opacity-100'}`}
            >
              {cat}
              {activeCategory === cat && <motion.div layoutId="underline" className="absolute bottom-0 left-0 w-full h-[1.5px] bg-brand" />}
            </button>
          ))}
        </div>
      </section>

      {/* 3. PROJECT GRID */}
      <section className="framer-container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((p, idx) => (
              <ProductCard 
                key={`${p.client}-${idx}`}
                series={p.client}
                img={p.img}
                description={p.project}
                label={`${p.year} / ${p.category}`}
                index={idx}
                ctaLink="/contact"
              />
            ))}
          </AnimatePresence>
        </div>
      </section>

      {/* 4. FOOTER LINE */}
      <section className="mt-32 md:mt-60 framer-container">
        <div className="flex flex-col items-center">
           <div className="w-px h-32 bg-gradient-to-b from-[#2A2C2B]/10 to-transparent" />
           <p className="framer-label opacity-20 mt-12 tracking-[1em]">Archives</p>
        </div>
      </section>
    </div>
  );
};

export default Portfolio;
