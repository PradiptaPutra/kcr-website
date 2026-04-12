import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Plus, Minus } from '@phosphor-icons/react';
import { kcrData } from '../data/kcrData';
import SEO from '../components/SEO';

const Catalog: React.FC = () => {
  const [activeSection, setActiveSection] = useState<'all' | 'prefab' | 'shotcrete' | 'chemicals' | 'furniture'>('all');
  const [expandedSeries, setExpandedSeries] = useState<string | null>(null);

  const fadeInUp = {
    initial: { y: 20, opacity: 0 },
    whileInView: { y: 0, opacity: 1 },
    viewport: { once: true },
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } // Using ease-out from skill doc
  };

  const images = kcrData.images.catalog;

  const tabTransition = { type: "spring", stiffness: 500, damping: 35 };

  return (
    <div className="bg-[#F5F5F0] min-h-screen pt-40 pb-32 selection:bg-[#1a1c19] selection:text-white">
      <SEO 
        title="Produk & Layanan Kami"
        description="Jelajahi berbagai layanan dan produk unggulan dari PT. KARYA CIPTA RAHARJA, mulai dari konstruksi hingga furnitur kantor berkualitas."
        keywords="Sistem Prefabrikasi, Shotcrete, Kimia Konstruksi, Furnitur Kantor, Katalog Solusi Konstruksi"
        canonicalUrl="/catalog"
        aeoAnswer="Katalog solusi konstruksi PT. KARYA CIPTA RAHARJA menyediakan teknologi infrastruktur terintegrasi meliputi Sistem Bangunan Prefabrikasi, aplikasi Spesialis Shotcrete, produk kimia konstruksi (Technical Floor & Repair), hingga Executive Office Furniture. Solusi kami dirancang untuk mendukung efisiensi pengerjaan dan durabilitas maksimal bagi proyek BUMN maupun swasta."
      />
      
      <section className="framer-container mb-24">
        <motion.div {...fadeInUp} className="max-w-4xl border-l-[0.5px] border-[#1a1c19]/10 pl-10">
          <span className="framer-label text-brand mb-10 block">01 / PRODUK & LAYANAN</span>
          <h1 className="framer-h1">Pilihan Solusi <br/><span className="italic text-brand font-serif">Terbaik untuk Proyek Anda.</span></h1>
        </motion.div>
      </section>

      <section className="sticky top-[72px] z-30 bg-[#F5F5F0]/80 backdrop-blur-xl border-y-[0.5px] border-[#1a1c19]/5 mb-20">
        <div className="framer-container py-5 flex flex-wrap gap-x-10 gap-y-3">
          {[
            { id: 'all', l: 'Semua' },
            { id: 'prefab', l: 'Prefabrikasi' },
            { id: 'shotcrete', l: 'Shotcrete' },
            { id: 'chemicals', l: 'Kimia' },
            { id: 'furniture', l: 'Executive Desks' },
            { id: 'workstation', l: 'Workstations' },
            { id: 'meeting', l: 'Meeting Tables' },
            { id: 'hospitality', l: 'Hospitality' },
          ].map((t) => (
            <motion.button 
              key={t.id} 
              onClick={() => setActiveSection(t.id as any)} 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={tabTransition}
              className={`framer-label relative pb-2 transition-opacity duration-200 ${activeSection === t.id ? 'opacity-100 font-bold' : 'opacity-30 hover:opacity-60'}`}
            >
              {t.l}
              {activeSection === t.id && (
                <motion.div 
                  layoutId="catalog-underline" 
                  className="absolute bottom-0 left-0 w-full h-[1.5px] bg-brand" 
                  transition={tabTransition}
                />
              )}
            </motion.button>
          ))}
        </div>
      </section>

      <AnimatePresence mode="wait">
        {activeSection === 'all' && (
          <motion.section 
            key="all" 
            initial={{ opacity: 0, y: 10 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: -10 }} 
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }} 
            className="framer-container"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { id: 'prefab', l: 'Prefabrikasi', img: images.prefab, c: 'Light Steel Frame System' },
                { id: 'shotcrete', l: 'Shotcrete', img: images.shotcrete, c: 'Beton Semprot Spesialis' },
                { id: 'chemicals', l: 'Kimia Konstruksi', img: images.chemicals, c: 'Technical Floor & Repair' },
                { id: 'furniture', l: 'Produk Furnitur', img: images.furniture, c: 'Executive Office Systems' },
              ].map((card) => (
                <motion.button 
                  key={card.id} 
                  onClick={() => setActiveSection(card.id as any)} 
                  whileHover={{ y: -8 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  className="text-left group flex flex-col gap-6"
                >
                  <div className="bg-[#e5e5e0] aspect-[4/5] overflow-hidden rounded-[4px]">
                    <motion.img 
                      src={card.img} 
                      className="w-full h-full object-cover" 
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                      alt={card.l} 
                    />
                  </div>
                  <div className="flex flex-col gap-3">
                    <h2 className="font-serif text-[24px] text-[#1a1c19]">{card.l}</h2>
                    <p className="framer-body !text-[12px] opacity-40">{card.c}</p>
                    <div className="flex items-center gap-2 group-hover:text-brand transition-colors">
                      <ArrowRight weight="light" size={24} className="text-brand opacity-50 group-hover:opacity-100 transition-opacity" />
                      <span className="text-[10px] uppercase tracking-widest font-bold opacity-0 group-hover:opacity-100 transition-opacity">Explore</span>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.section>
        )}

        {activeSection === 'furniture' && (
          <motion.section 
            key="furniture" 
            initial={{ opacity: 0, x: 20 }} 
            animate={{ opacity: 1, x: 0 }} 
            exit={{ opacity: 0, x: -20 }} 
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }} 
            className="framer-container"
          >
            <div className="space-y-32">
              <div>
                <motion.h3 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.3 }}
                  className="framer-label mb-12 framer-border-struct !border-x-0 !border-t-0 pb-6"
                >
                  Executive Series
                </motion.h3>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                  <div className="lg:col-span-4 space-y-6">
                    {kcrData.products.executiveDesks.map((s) => (
                      <motion.div 
                        layout
                        key={s.series} 
                        className={`p-8 border-[0.5px] rounded-[12px] cursor-pointer relative overflow-hidden transition-colors duration-300 ${expandedSeries === s.series ? 'bg-white border-brand' : 'bg-white/50 border-[#1a1c19]/10 hover:border-brand/40'}`} 
                        onClick={() => setExpandedSeries(expandedSeries === s.series ? null : s.series)}
                      >
                        <div className="flex justify-between items-center relative z-10">
                          <span className="font-serif text-[24px]">{s.series}</span>
                          <motion.div
                            animate={{ rotate: expandedSeries === s.series ? 180 : 0 }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                          >
                            {expandedSeries === s.series ? <Minus weight="light" /> : <Plus weight="light" />}
                          </motion.div>
                        </div>
                        <AnimatePresence>
                          {expandedSeries === s.series && (
                            <motion.div 
                              initial={{ height: 0, opacity: 0 }} 
                              animate={{ height: 'auto', opacity: 1 }} 
                              exit={{ height: 0, opacity: 0 }} 
                              transition={{ type: "spring", stiffness: 300, damping: 30 }}
                              className="overflow-hidden relative z-10"
                            >
                              <div className="mt-8 space-y-4">
                                <p className="text-[12px] opacity-60 mb-6">{s.description}</p>
                                {s.models.map(m => (
                                  <motion.div 
                                    key={m.name} 
                                    initial={{ x: -10, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    className="framer-body !text-[13px] border-t-[0.5px] border-[#1a1c19]/5 pt-4"
                                  >
                                    <p className="font-medium text-[#1a1c19] mb-1">{m.name}</p>
                                    <p>Dim: {m.dim}</p>
                                  </motion.div>
                                ))}
                                <div className="mt-6 pt-4 border-t border-brand/10">
                                  <p className="text-[10px] uppercase font-bold text-brand mb-2">Features</p>
                                  <div className="flex flex-wrap gap-2">
                                    {s.accessories.map(a => (
                                      <motion.span 
                                        key={a} 
                                        whileHover={{ scale: 1.05 }}
                                        className="text-[10px] bg-brand/5 px-2 py-1 rounded"
                                      >
                                        {a}
                                      </motion.span>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    ))}
                  </div>
                  <div className="lg:col-span-8 grid grid-cols-2 gap-8 items-start">
                    <motion.div 
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-[#e5e5e0] aspect-[4/5] rounded-[4px] overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-500"
                    >
                      <img src={images.furniture} className="w-full h-full object-cover" alt="Furniture 1" />
                    </motion.div>
                    <motion.div 
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.1 }}
                      className="bg-[#e5e5e0] aspect-[4/5] rounded-[4px] overflow-hidden mt-16 shadow-sm hover:shadow-xl transition-shadow duration-500"
                    >
                      <img src="https://images.pexels.com/photos/4985341/pexels-photo-4985341.jpeg" className="w-full h-full object-cover" alt="Furniture 2" />
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>
        )}

        {activeSection === 'workstation' && (
          <motion.section 
            key="workstation" 
            initial={{ opacity: 0, x: 20 }} 
            animate={{ opacity: 1, x: 0 }} 
            exit={{ opacity: 0, x: -20 }} 
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }} 
            className="framer-container"
          >
             <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
               {kcrData.products.workstations.map((s, idx) => (
                  <motion.div 
                    key={s.series} 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1, type: "spring", stiffness: 300, damping: 25 }}
                    whileHover={{ y: -5 }}
                    className="bg-white p-10 border border-[#1a1c19]/5 rounded-[12px] shadow-sm hover:shadow-md transition-shadow"
                  >
                    <span className="framer-label text-brand mb-4 block">{s.series}</span>
                    <p className="framer-body !text-[14px] mb-8">{s.description}</p>
                    <div className="space-y-4">
                       {s.models.map(m => (
                         <div key={m.name} className="flex justify-between text-[13px] border-b border-[#1a1c19]/5 pb-2">
                            <span className="font-medium">{m.name}</span>
                            <span className="opacity-40">{m.dim || m.capacity}</span>
                         </div>
                       ))}
                    </div>
                  </motion.div>
               ))}
             </div>
          </motion.section>
        )}

        {activeSection === 'meeting' && (
          <motion.section 
            key="meeting" 
            initial={{ opacity: 0, scale: 0.98 }} 
            animate={{ opacity: 1, scale: 1 }} 
            exit={{ opacity: 0, scale: 0.98 }} 
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }} 
            className="framer-container"
          >
             <div className="max-w-4xl mx-auto space-y-12">
               {kcrData.products.meetingTables.map((s) => (
                 <motion.div 
                  key={s.series} 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  className="bg-[#1a1c19] text-white p-16 rounded-[12px]"
                 >
                    <h2 className="font-serif text-[32px] mb-12 border-b border-white/10 pb-6">{s.series}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                       {s.models.map(m => (
                         <div key={m.name} className="space-y-4">
                            <h3 className="text-brand uppercase tracking-widest text-[12px]">{m.name}</h3>
                            <p className="text-[20px] font-serif">{m.dim}</p>
                            <p className="text-white/40 text-[13px]">{m.capacity || m.finishes}</p>
                         </div>
                       ))}
                    </div>
                 </motion.div>
               ))}
             </div>
          </motion.section>
        )}

        {activeSection === 'hospitality' && (
          <motion.section 
            key="hospitality" 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: -20 }} 
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }} 
            className="framer-container"
          >
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                {kcrData.products.hospitality.map(s => (
                  <motion.div 
                    key={s.series} 
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    className="bg-white p-12 border border-[#1a1c19]/5 rounded-[12px] shadow-sm"
                  >
                    <h3 className="font-serif text-[28px] mb-8">{s.series}</h3>
                    <div className="space-y-6">
                      {s.models.map(m => (
                        <div key={m.name} className="flex flex-col gap-2">
                          <span className="font-medium text-[#1a1c19]">{m.name}</span>
                          <span className="text-[13px] opacity-40">{m.dim}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
             </div>
             <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mt-20 p-12 border-t border-[#1a1c19]/10"
             >
                <p className="framer-label mb-8">Additional Products</p>
                <div className="flex flex-wrap gap-4">
                   {kcrData.products.additional.items.map(i => (
                     <motion.span 
                        key={i} 
                        whileHover={{ scale: 1.1, backgroundColor: '#3d443a' }}
                        className="px-6 py-3 bg-[#1a1c19] text-white rounded-full text-[12px] cursor-default transition-colors"
                      >
                        {i}
                      </motion.span>
                   ))}
                </div>
             </motion.div>
          </motion.section>
        )}

        {(activeSection === 'prefab' || activeSection === 'shotcrete' || activeSection === 'chemicals') && (
          <motion.section 
            key="other" 
            initial={{ opacity: 0, scale: 0.95 }} 
            animate={{ opacity: 1, scale: 1 }} 
            exit={{ opacity: 0, scale: 0.95 }} 
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }} 
            className="framer-container"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <motion.div 
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="bg-[#e5e5e0] aspect-[16/10] rounded-[4px] overflow-hidden"
              >
                <motion.img 
                  src={images[activeSection as keyof typeof images]} 
                  className="w-full h-full object-cover" 
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                  alt="Solution" 
                />
              </motion.div>
              <motion.div 
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="space-y-10"
              >
                <h2 className="font-serif text-[40px] text-[#1a1c19] leading-tight">Spesialis <br/><span className="italic font-serif text-brand">{activeSection.toUpperCase()}</span></h2>
                <p className="framer-body">Layanan teknis kami mencakup solusi komprehensif untuk infrastruktur modern dengan durabilitas material maksimal.</p>
                <Link to="/contact" className="framer-btn inline-block">Minta Penawaran Teknik</Link>
              </motion.div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
};
export default Catalog;
