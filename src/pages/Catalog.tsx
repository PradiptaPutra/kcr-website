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
      
      <PageHeader 
        label="01 / KATALOG PRODUK"
        title="Koleksi"
        subtitle={<>Furnitur Kantor <span className="text-[#1a1c19] font-sans italic-none">&</span> Hospitality.</>}
        description="Manufaktur furnitur presisi dengan teknologi CNC standar Eropa untuk ruang kerja and hospitality yang inspiratif."
      />

      {/* SUB-CATEGORY FILTER */}
      <section className="sticky top-[72px] z-30 bg-[#F5F5F0]/80 backdrop-blur-xl border-b border-[#1a1c19]/5 mb-20">
        <div className="framer-container py-5 flex flex-wrap gap-x-10 gap-y-3">
          {interiorCategories.map((t) => (
            <motion.button 
              key={t.id} 
              onClick={() => setActiveSection(t.id)} 
              whileHover={{ x: 2 }}
              className={`framer-label relative pb-2 transition-opacity duration-200 ${activeSection === t.id ? 'opacity-100 font-bold' : 'opacity-30 hover:opacity-100'}`}
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

      <motion.section 
        initial={{ opacity: 0, y: 10 }} 
        animate={{ opacity: 1, y: 0 }}
        className="framer-container"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
        </div>
      </motion.section>
    </div>
  );
};

export default Catalog;
