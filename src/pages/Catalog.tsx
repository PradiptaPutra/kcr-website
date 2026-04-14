import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { kcrData } from '../data/kcrData';
import SEO from '../components/SEO';
import ProductCard from '../components/ProductCard';
import PageHeader from '../components/PageHeader';

const Catalog: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('all');

  const tabTransition = { type: "spring", stiffness: 500, damping: 35 } as any;

  const interiorCategories = [
    { id: 'all', l: 'Semua Produk' },
    { id: 'workstations', l: 'Workstations' },
    { id: 'executive', l: 'Executive & Meeting' },
    { id: 'hospitality', l: 'Hospitality & Custom' },
  ];

  return (
    <div className="bg-[#F5F5F0] min-h-screen pt-24 pb-32 selection:bg-[#1a1c19] selection:text-white">
      <SEO 
        title="Katalog Furnitur Kantor & Hospitality | KCR Furniture"
        description="Jelajahi katalog furnitur lengkap KCR Furniture. Dari workstation modern and meja eksekutif hingga furnitur hotel custom berkualitas tinggi."
        keywords="Furnitur Kantor, Workstation, Meja Eksekutif, Meeting Table, Furnitur Hotel, KCR Furniture Catalog"
        canonicalUrl="/catalog"
      />
      
      <div className="relative overflow-hidden">
        <PageHeader 
          label="01 / KATALOG PRODUK"
          title="Koleksi"
          subtitle={<>Furnitur Kantor <span className="text-brand font-serif-italic">&</span> Hospitality.</>}
          description="Manufaktur furnitur presisi dengan teknologi CNC standar Eropa untuk ruang kerja and hospitality yang inspiratif."
        />
        {/* Floating Decor */}
        <motion.div 
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 right-[10%] w-32 h-32 border border-brand/10 rounded-full hidden lg:block"
        />
      </div>

      {/* SUB-CATEGORY FILTER */}
      <section className="sticky top-[72px] z-30 bg-[#F5F5F0]/70 backdrop-blur-2xl border-b border-[#1a1c19]/5 mb-20 py-2">
        <div className="framer-container flex flex-wrap gap-x-12 gap-y-4">
          {interiorCategories.map((t) => (
            <motion.button 
              key={t.id} 
              onClick={() => setActiveSection(t.id)} 
              whileHover={{ x: 2 }}
              className={`framer-label relative pb-4 pt-4 transition-opacity duration-300 ${activeSection === t.id ? 'opacity-100 !text-brand' : 'opacity-30 hover:opacity-100'}`}
            >
              {t.l}
              {activeSection === t.id && (
                <motion.div 
                  layoutId="catalog-underline" 
                  className="absolute bottom-0 left-0 w-full h-px bg-brand" 
                  transition={tabTransition}
                />
              )}
            </motion.button>
          ))}
        </div>
      </section>

      <section className="framer-container">
        <AnimatePresence mode="popLayout">
          <motion.div 
            key={activeSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
          >
            {(activeSection === 'all' || activeSection === 'workstations') && kcrData.products.workstations.map((p, idx) => (
              <ProductCard 
                key={p.series} 
                {...p} 
                label="Team Performance" 
                index={idx} 
                ctaLink="/contact"
              />
            ))}
            
            {(activeSection === 'all' || activeSection === 'executive') && kcrData.products.executive.map((p, idx) => (
              <ProductCard 
                key={p.series} 
                {...p} 
                label="Executive Suite" 
                index={idx} 
                ctaLink="/contact"
              />
            ))}

            {(activeSection === 'all' || activeSection === 'hospitality') && kcrData.products.hospitality.map((p, idx) => (
              <ProductCard 
                key={p.series} 
                {...p} 
                label="Hospitality & Custom" 
                index={idx} 
                ctaLink="/contact"
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </section>

      {/* Ornament Footer */}
      <section className="mt-40 md:mt-60 framer-container flex flex-col items-center">
         <div className="ornament-line" />
         <p className="framer-label !text-[9px] opacity-20 mt-12 tracking-[1.5em]">Collections Archive</p>
      </section>
    </div>
  );
};

export default Catalog;
