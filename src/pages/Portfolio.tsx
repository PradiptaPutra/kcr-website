import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from '@phosphor-icons/react';
import SEO from '../components/SEO';

const Portfolio: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('SEMUA');

  const projectCategories = ['INDUSTRIAL', 'KOMERSIAL', 'RESIDENSIAL', 'INFRASTRUKTUR'];
  
  const projects = [
    { client: 'SEKTOR SWASTA', project: 'Shotcrete & Fondasi Dalam', year: '2023', category: 'INDUSTRIAL', img: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=1200' },
    { client: 'MITRA BUMN', project: 'Konstruksi Gedung Bertingkat', year: '2022', category: 'INFRASTRUKTUR', img: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=1200' },
    { client: 'PUSAT KOMERSIAL', project: 'Sistem Bangunan Prefabrikasi', year: '2023', category: 'KOMERSIAL', img: 'https://images.unsplash.com/photo-1518005020251-58296437f38d?auto=format&fit=crop&q=80&w=1200' },
    { client: 'KOMPLEKS RESIDENSIAL', project: 'Perumahan Light Steel Frame', year: '2022', category: 'RESIDENSIAL', img: 'https://images.unsplash.com/photo-1590644365607-1c5a519a7a37?auto=format&fit=crop&q=80&w=1200' },
    { client: 'GUDANG INDUSTRIAL', project: 'Floor Hardening & Pelapisan Epoksi', year: '2023', category: 'INDUSTRIAL', img: 'https://images.unsplash.com/photo-1581094288338-2314dddb7ec4?auto=format&fit=crop&q=80&w=1200' },
    { client: 'PERUSAHAAN NEGARA', project: 'Perbaikan Struktural & Waterproofing', year: '2021', category: 'INFRASTRUKTUR', img: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=1200' },
  ];

  const filteredProjects = activeCategory === 'SEMUA'
    ? projects
    : projects.filter((project) => project.category === activeCategory);

  return (
    <div className="bg-[#F5F5F0] min-h-screen pt-32 pb-40 selection:bg-[#2A2C2B] selection:text-white">
      <SEO 
        title="Arsip Proyek & Portofolio"
        description="Eksplorasi portofolio proyek strategis PT. KARYA CIPTA RAHARJA, mendemonstrasikan kapabilitas sebagai Spesialis Shotcrete Indonesia dan Kontraktor Bangunan BUMN."
        keywords="Portofolio Kontraktor, Proyek Shotcrete, Proyek BUMN, Konstruksi Gedung, PT KCR"
        canonicalUrl="/portfolio"
        aeoAnswer="Portofolio PT. KARYA CIPTA RAHARJA mencakup berbagai Proyek Strategis Nasional dan infrastruktur vital di seluruh Indonesia. Sebagai Kontraktor Bangunan BUMN dan Spesialis Shotcrete terpercaya, kami mendemonstrasikan integritas struktural, presisi, dan efisiensi dalam setiap pembangunan gedung komersial, fasilitas industrial, hingga stabilisasi lereng infrastruktur."
      />

      {/* 1. EDITORIAL HEADER */}
      <section className="framer-container mb-32">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl border-l-[0.5px] border-[#2A2C2B]/10 pl-10"
        >
          <span className="framer-label text-brand mb-10 block opacity-100">04 / Archives</span>
          <h1 className="framer-h1">Portofolio Spesialis Shotcrete Indonesia <br/><span className="italic text-brand font-serif">& Kontraktor Bangunan BUMN.</span></h1>
          <p className="framer-body !text-[18px] max-w-xl mt-12 leading-relaxed">
            Eksplorasi kumpulan proyek strategis kami yang mendemonstrasikan kapabilitas sebagai spesialis shotcrete Indonesia dan mitra kontraktor bangunan BUMN tepercaya dengan integritas struktural di seluruh Indonesia.
          </p>
        </motion.div>
      </section>

      {/* 2. STICKY FILTER */}
      <section className="sticky top-[72px] z-30 bg-[#F5F5F0]/80 backdrop-blur-xl border-y-[0.5px] border-[#2A2C2B]/5 mb-24">
        <div className="framer-container py-5 flex flex-wrap items-center gap-x-10 gap-y-3">
          <button 
            onClick={() => setActiveCategory('SEMUA')}
            className={`framer-label transition-all duration-500 relative pb-1 ${activeCategory === 'SEMUA' ? 'opacity-100 text-[#2A2C2B]' : 'opacity-40 hover:opacity-100'}`}
          >
            Semua ({projects.length})
            {activeCategory === 'SEMUA' && <motion.div layoutId="underline" className="absolute bottom-0 left-0 w-full h-[1.5px] bg-brand" />}
          </button>
          {projectCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`framer-label transition-all duration-500 relative pb-1 ${activeCategory === cat ? 'opacity-100 text-[#2A2C2B]' : 'opacity-40 hover:opacity-100'}`}
            >
              {cat}
              {activeCategory === cat && <motion.div layoutId="underline" className="absolute bottom-0 left-0 w-full h-[1.5px] bg-brand" />}
            </button>
          ))}
        </div>
      </section>

      {/* 3. PROJECT LIST */}
      <section className="framer-container">
        <div className="flex flex-col gap-40">
          <AnimatePresence mode="wait">
            {filteredProjects.map((p, idx) => (
              <motion.article 
                key={`${p.client}-${idx}`}
                layout
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-end group"
              >
                <div className="lg:col-span-7 overflow-hidden bg-[#e5e5e0] aspect-[16/9]">
                  <img src={p.img} alt={p.project} className="w-full h-full object-cover transition-transform duration-[2s]" />
                </div>

                <div className="lg:col-span-4 lg:col-start-9 flex flex-col gap-10 pb-6 border-b-[0.5px] border-[#2A2C2B]/10">
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-4">
                      <span className="framer-label text-brand opacity-100 font-bold">{p.year}</span>
                      <div className="w-6 h-[0.5px] bg-[#2A2C2B]/20" />
                      <span className="framer-label opacity-60 font-bold">{p.category}</span>
                    </div>
                    <h2 className="font-serif text-[32px] leading-[1.1] uppercase tracking-tight text-[#2A2C2B]">
                      {p.client}
                    </h2>
                    <p className="framer-body !text-[15px]">{p.project}</p>
                  </div>
                  
                  <div className="flex justify-between items-center">
                     <span className="framer-label opacity-30 !text-[9px]">Case Study 0{idx + 1}</span>
                     <motion.div 
                       whileHover={{ x: 5, y: -5 }}
                       className="w-12 h-12 rounded-full border-[0.5px] border-[#2A2C2B]/10 flex items-center justify-center cursor-pointer hover:bg-[#2A2C2B] hover:text-white transition-all duration-500"
                     >
                        <ArrowUpRight weight="light" size={24} />
                     </motion.div>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>
      </section>

      {/* 4. FOOTER LINE */}
      <section className="mt-60 framer-container">
        <div className="flex flex-col items-center">
           <div className="w-px h-32 bg-gradient-to-b from-[#2A2C2B]/10 to-transparent" />
           <p className="framer-label opacity-20 mt-12 tracking-[1em]">Archives</p>
        </div>
      </section>
    </div>
  );
};

export default Portfolio;
