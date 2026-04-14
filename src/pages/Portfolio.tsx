import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SEO from '../components/SEO';
import ProductCard from '../components/ProductCard';
import PageHeader from '../components/PageHeader';

const Portfolio: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('SEMUA');

  const projectCategories = ['OFFICE', 'HOSPITALITY', 'INTERIOR', 'CUSTOM'];
  
  const projects = [
    { 
      client: 'BUMN FINANCIAL', 
      project: 'Fit-Out Interior Eksekutif', 
      year: '2023', 
      category: 'INTERIOR', 
      img: '/assets/images/workstation/EXECUTIVEDESK_PRIME_SERIES_cropped.jpg' 
    },
    { 
      client: 'TECH STARTUP HQ', 
      project: 'Modular Workstation System', 
      year: '2023', 
      category: 'OFFICE', 
      img: '/assets/images/workstation/WORKSTATION_MODERNA_cropped.jpg' 
    },
    { 
      client: 'LUXURY HOTEL', 
      project: 'Custom Guest Room Furniture', 
      year: '2022', 
      category: 'HOSPITALITY', 
      img: '/assets/images/overview/COSMO_BEDSERIES_cropped.jpg' 
    },
    { 
      client: 'CORPORATE OFFICE', 
      project: 'Boardroom & Meeting Systems', 
      year: '2023', 
      category: 'OFFICE', 
      img: '/assets/images/overview/FERMI_ST3_cropped.jpg' 
    },
    { 
      client: 'BOUTIQUE RESIDENCE', 
      project: 'Bespoke Wardrobe & Cabinetry', 
      year: '2022', 
      category: 'CUSTOM', 
      img: '/assets/images/overview/MODERNA_SERIES_cropped.jpg' 
    },
    { 
      client: 'CO-WORKING SPACE', 
      project: 'Flexible Workstations & Pods', 
      year: '2023', 
      category: 'OFFICE', 
      img: '/assets/images/workstation/WORKSTATION_FORMA_cropped.jpg' 
    },
    { 
      client: 'GOVERNMENT OFFICE', 
      project: 'Executive Suite Furnishing', 
      year: '2021', 
      category: 'OFFICE', 
      img: '/assets/images/workstation/PRIME_SERIES_cropped.jpg' 
    },
  ];

  const filteredProjects = activeCategory === 'SEMUA'
    ? projects
    : projects.filter((project) => project.category === activeCategory);

  return (
    <div className="bg-[#F5F5F0] min-h-screen pt-20 md:pt-24 pb-24 md:pb-40 selection:bg-[#1A1C19] selection:text-white">
      <SEO 
        title="Portofolio Proyek | KCR Furniture"
        description="Lihat berbagai proyek furnitur kantor and hospitality sukses yang telah kami kerjakan. Bukti nyata kualitas manufaktur furnitur KCR."
        keywords="Portofolio Furnitur, Office Furniture Project, Hospitality Furniture, Custom Furniture Indonesia, KCR Furniture"
        canonicalUrl="/portfolio"
      />

      <div className="relative overflow-hidden">
        <PageHeader 
          label="04 / PORTOFOLIO"
          title="Hasil Karya"
          subtitle={<>& Pengalaman <span className="text-brand font-serif-italic">Kami.</span></>}
          description="Setiap proyek adalah bukti nyata komitmen kami terhadap kualitas and ketepatan waktu. Lihat lebih dekat beberapa pekerjaan furnitur terbaik yang telah kami selesaikan."
        />
      </div>

      {/* STICKY FILTER */}
      <section className="sticky top-[72px] z-30 bg-[#F5F5F0]/70 backdrop-blur-2xl border-y border-[#1A1C19]/5 mb-16 md:mb-24 py-2">
        <div className="framer-container flex flex-wrap items-center gap-x-12 gap-y-4">
          <button 
            onClick={() => setActiveCategory('SEMUA')}
            className={`framer-label transition-all duration-500 relative pb-4 pt-4 ${activeCategory === 'SEMUA' ? 'opacity-100 !text-brand' : 'opacity-30 hover:opacity-100'}`}
          >
            Semua ({projects.length})
            {activeCategory === 'SEMUA' && <motion.div layoutId="portfolio-underline" className="absolute bottom-0 left-0 w-full h-px bg-brand" />}
          </button>
          {projectCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`framer-label transition-all duration-500 relative pb-4 pt-4 ${activeCategory === cat ? 'opacity-100 !text-brand' : 'opacity-30 hover:opacity-100'}`}
            >
              {cat}
              {activeCategory === cat && <motion.div layoutId="portfolio-underline" className="absolute bottom-0 left-0 w-full h-px bg-brand" />}
            </button>
          ))}
        </div>
      </section>

      {/* PROJECT GRID */}
      <section className="framer-container">
        <AnimatePresence mode="popLayout">
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
          >
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
          </motion.div>
        </AnimatePresence>
      </section>

      {/* ORNAMENT FOOTER */}
      <section className="mt-40 md:mt-60 framer-container">
        <div className="flex flex-col items-center">
           <div className="ornament-line" />
           <p className="framer-label !text-[9px] opacity-20 mt-12 tracking-[1.5em]">Archives</p>
        </div>
      </section>
    </div>
  );
};

export default Portfolio;
