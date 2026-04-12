import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SEO from '../components/SEO';
import ProductCard from '../components/ProductCard';
import PageHeader from '../components/PageHeader';
import { kcrData } from '../data/kcrData';

const Catalog: React.FC = () => {
  const [activeSection, setActiveSection] = useState<'all' | 'workstation' | 'executive' | 'hospitality'>('all');

  return (
    <div className="bg-[#F5F5F0] min-h-screen pt-20 md:pt-24 pb-24 md:pb-40 selection:bg-[#2A2C2B] selection:text-white">
      <SEO 
        title="Katalog Sistem & Produk"
        description="Jelajahi koleksi furnitur eksekutif and sistem workstation kami yang dirancang dengan presisi and estetika tinggi."
        keywords="Furnitur Kantor, Meja Eksekutif, Workstation Modular, Interior Kantor, KCR Produk"
        canonicalUrl="/catalog"
      />

      <PageHeader 
        label="01 / KATALOG"
        title="Sistem Spasial"
        subtitle="& Produk Interior."
        description="Integrasi desain arsitektural and manufaktur presisi dalam setiap komponen furnitur untuk ruang kerja modern."
      />

      {/* 2. STICKY FILTER */}
      <section className="sticky top-[72px] z-30 bg-[#F5F5F0]/80 backdrop-blur-xl border-y-[0.5px] border-[#2A2C2B]/5 mb-12 md:mb-24">
        <div className="framer-container py-5 flex flex-wrap items-center gap-x-10 gap-y-3">
          {[
            { id: 'all', l: 'Semua Koleksi' },
            { id: 'workstation', l: 'Workstations' },
            { id: 'executive', l: 'Executive Series' },
            { id: 'hospitality', l: 'Hospitality & Bed' },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveSection(t.id as any)}
              className={`framer-label transition-all duration-500 relative pb-1 ${activeSection === t.id ? 'opacity-100 text-[#2A2C2B]' : 'opacity-60 hover:opacity-100'}`}
            >
              {t.l}
              {activeSection === t.id && <motion.div layoutId="underline" className="absolute bottom-0 left-0 w-full h-[1.5px] bg-brand" />}
            </button>
          ))}
        </div>
      </section>

      {/* 3. PRODUCT GRID */}
      <section className="framer-container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          <AnimatePresence mode="popLayout">
            {(activeSection === 'all' || activeSection === 'workstation') && kcrData.products.workstations.map((p, idx) => (
              <ProductCard 
                key={p.series}
                series={p.series}
                img={p.img || kcrData.images.catalog.furniture}
                description={p.description}
                label="Workstation Systems"
                models={p.models}
                index={idx}
                ctaLink="/contact"
              />
            ))}
            
            {(activeSection === 'all' || activeSection === 'executive') && kcrData.products.executive.map((p, idx) => (
              <ProductCard 
                key={p.series}
                series={p.series}
                img={p.img || kcrData.images.catalog.furniture}
                description={p.description}
                label="Executive Series"
                models={p.models}
                index={idx}
                ctaLink="/contact"
              />
            ))}

            {(activeSection === 'all' || activeSection === 'hospitality') && kcrData.products.hospitality.map((p, idx) => (
              <ProductCard 
                key={p.series}
                series={p.series}
                img={p.img || kcrData.images.catalog.furniture}
                description={p.description}
                label="Hospitality & Custom"
                models={p.models}
                index={idx}
                ctaLink="/contact"
              />
            ))}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
};

export default Catalog;
