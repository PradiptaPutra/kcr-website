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
    initial: { y: 40, opacity: 0 },
    whileInView: { y: 0, opacity: 1 },
    viewport: { once: true },
    transition: { duration: 1, ease: [0.22, 1, 0.36, 1] as any }
  };

  const images = kcrData.images.catalog;

  return (
    <div className="bg-[#F5F5F0] min-h-screen pt-40 pb-32 selection:bg-[#1a1c19] selection:text-white">
      <SEO 
        title="Katalog Sistem & Solusi Konstruksi"
        description="Katalog solusi konstruksi terintegrasi PT. KARYA CIPTA RAHARJA meliputi sistem prefabrikasi, beton semprot (shotcrete), kimia konstruksi, dan produk furnitur eksekutif."
        keywords="Sistem Prefabrikasi, Shotcrete, Kimia Konstruksi, Furnitur Kantor, Katalog Solusi Konstruksi"
        canonicalUrl="/catalog"
        aeoAnswer="Katalog solusi konstruksi PT. KARYA CIPTA RAHARJA menyediakan teknologi infrastruktur terintegrasi meliputi Sistem Bangunan Prefabrikasi, aplikasi Spesialis Shotcrete, produk kimia konstruksi (Technical Floor & Repair), hingga Executive Office Furniture. Solusi kami dirancang untuk mendukung efisiensi pengerjaan dan durabilitas maksimal bagi proyek BUMN maupun swasta."
      />
      
      <section className="framer-container mb-24">
        <motion.div {...fadeInUp} className="max-w-4xl border-l-[0.5px] border-[#1a1c19]/10 pl-10">
          <span className="framer-label text-brand mb-10 block">01 / Katalog Solusi</span>
          <h1 className="framer-h1">Sistem <span className="italic text-brand font-serif">Struktural</span> & <br/>Interior Terpadu.</h1>
        </motion.div>
      </section>

      <section className="sticky top-[72px] z-30 bg-[#F5F5F0]/80 backdrop-blur-xl border-y-[0.5px] border-[#1a1c19]/5 mb-20">
        <div className="framer-container py-5 flex flex-wrap gap-x-10 gap-y-3">
          {[
            { id: 'all', l: 'Semua' },
            { id: 'prefab', l: 'Prefabrikasi' },
            { id: 'shotcrete', l: 'Shotcrete' },
            { id: 'chemicals', l: 'Kimia' },
            { id: 'furniture', l: 'Produk Furnitur' },
          ].map((t) => (
            <button key={t.id} onClick={() => setActiveSection(t.id as any)} className={`framer-label transition-all duration-500 relative pb-2 ${activeSection === t.id ? 'opacity-100 font-bold' : 'opacity-30 hover:opacity-100'}`}>
              {t.l}
              {activeSection === t.id && <motion.div layoutId="catalog-underline" className="absolute bottom-0 left-0 w-full h-[1.5px] bg-brand" />}
            </button>
          ))}
        </div>
      </section>

      <AnimatePresence mode="wait">
        {activeSection === 'all' && (
          <motion.section key="all" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }} className="framer-container">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { id: 'prefab', l: 'Prefabrikasi', img: images.prefab, c: 'Light Steel Frame System' },
                { id: 'shotcrete', l: 'Shotcrete', img: images.shotcrete, c: 'Beton Semprot Spesialis' },
                { id: 'chemicals', l: 'Kimia Konstruksi', img: images.chemicals, c: 'Technical Floor & Repair' },
                { id: 'furniture', l: 'Produk Furnitur', img: images.furniture, c: 'Executive Office Systems' },
              ].map((card) => (
                <button key={card.id} onClick={() => setActiveSection(card.id as any)} className="text-left group flex flex-col gap-6">
                  <div className="bg-[#e5e5e0] aspect-[4/5] overflow-hidden rounded-[4px]"><img src={card.img} className="w-full h-full object-cover transition-opacity duration-1000 hover:opacity-80" alt={card.l} /></div>
                  <div className="flex flex-col gap-3">
                    <h2 className="font-serif text-[24px] text-[#1a1c19]">{card.l}</h2>
                    <p className="framer-body !text-[12px] opacity-40">{card.c}</p>
                    <ArrowRight weight="light" size={24} className="text-brand opacity-50 group-hover:opacity-100 transition-opacity" />
                  </div>
                </button>
              ))}
            </div>
          </motion.section>
        )}

        {activeSection === 'furniture' && (
          <motion.section key="furniture" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }} className="framer-container">
            <div className="space-y-32">
              <div>
                <h3 className="framer-label opacity-30 mb-12 framer-border-struct !border-x-0 !border-t-0 pb-6">Executive Series</h3>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                  <div className="lg:col-span-4 space-y-6">
                    {kcrData.products.executiveDesks.map((s) => (
                      <div key={s.series} className={`p-8 border-[0.5px] rounded-[12px] transition-all duration-500 cursor-pointer ${expandedSeries === s.series ? 'bg-white border-brand' : 'border-[#1a1c19]/10 hover:border-[#1a1c19]/30'}`} onClick={() => setExpandedSeries(expandedSeries === s.series ? null : s.series)}>
                        <div className="flex justify-between items-center">
                          <span className="font-serif text-[24px]">{s.series}</span>
                          {expandedSeries === s.series ? <Minus weight="light" /> : <Plus weight="light" />}
                        </div>
                        <AnimatePresence>
                          {expandedSeries === s.series && (
                            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                              <div className="mt-8 space-y-4">
                                {s.models.map(m => (
                                  <div key={m.name} className="framer-body !text-[13px] border-t-[0.5px] border-[#1a1c19]/5 pt-4">
                                    <p className="font-medium text-[#1a1c19] mb-1">{m.name}</p>
                                    <p>Dim: {m.dim} cm</p>
                                  </div>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ))}
                  </div>
                  <div className="lg:col-span-8 grid grid-cols-2 gap-8">
                    <div className="bg-[#e5e5e0] aspect-[4/5] rounded-[4px] overflow-hidden"><img src={images.furniture} className="w-full h-full object-cover" alt="Furniture 1" /></div>
                    <div className="bg-[#e5e5e0] aspect-[4/5] rounded-[4px] overflow-hidden mt-16"><img src="https://images.pexels.com/photos/4985341/pexels-photo-4985341.jpeg" className="w-full h-full object-cover" alt="Furniture 2" /></div>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>
        )}

        {(activeSection === 'prefab' || activeSection === 'shotcrete' || activeSection === 'chemicals') && (
          <motion.section key="other" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }} className="framer-container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <div className="bg-[#e5e5e0] aspect-[16/10] rounded-[4px] overflow-hidden">
                <img src={images[activeSection as keyof typeof images]} className="w-full h-full object-cover" alt="Solution" />
              </div>
              <div className="space-y-10">
                <h2 className="font-serif text-[40px] text-[#1a1c19] leading-tight">Spesialis <br/><span className="italic font-serif text-brand">{activeSection.toUpperCase()}</span></h2>
                <p className="framer-body">Layanan teknis kami mencakup solusi komprehensif untuk infrastruktur modern dengan durabilitas material maksimal.</p>
                <Link to="/contact" className="framer-btn">Minta Penawaran Teknik</Link>
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
};
export default Catalog;
