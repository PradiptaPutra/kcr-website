import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { kcrData } from '../data/kcrData';
import SEO from '../components/SEO';
import ProductCard from '../components/ProductCard';
import PageHeader from '../components/PageHeader';

const Catalog: React.FC = () => {
  const [mainPillar, setMainPillar] = useState<'infrastructure' | 'interior'>('infrastructure');
  const [activeSection, setActiveSection] = useState<string>('all');

  const tabTransition = { type: "spring", stiffness: 500, damping: 35 } as any;

  const infrastructureCategories = [
    { id: 'all', l: 'Semua Layanan' },
    { id: 'structural', l: 'Konstruksi & Sipil' },
    { id: 'chemical', l: 'Kimia Konstruksi' },
    { id: 'manufacturing', l: 'Manufaktur & CNC' },
  ];

  const interiorCategories = [
    { id: 'all', l: 'Semua Produk' },
    { id: 'workstations', l: 'Workstations' },
    { id: 'executive', l: 'Executive & Meeting' },
    { id: 'hospitality', l: 'Hospitality & Custom' },
  ];

  const categories = mainPillar === 'infrastructure' ? infrastructureCategories : interiorCategories;

  const handlePillarChange = (pillar: 'infrastructure' | 'interior') => {
    setMainPillar(pillar);
    setActiveSection('all');
  };

  return (
    <div className="bg-[#F5F5F0] min-h-screen pt-24 pb-32 selection:bg-[#1a1c19] selection:text-white">
      <SEO 
        title="Katalog Solusi Terpadu | Konstruksi & Interior"
        description="Jelajahi katalog lengkap PT. KARYA CIPTA RAHARJA. Dari sistem prefabrikasi and shotcrete hingga furnitur kantor eksekutif and workstation modern."
        keywords="Sistem Prefabrikasi, Shotcrete, Furnitur Kantor, Workstation, Meeting Table, Katalog Konstruksi Indonesia"
        canonicalUrl="/catalog"
      />
      
      <PageHeader 
        label="01 / KATALOG TERPADU"
        title="Solusi"
        subtitle={<>Konstruksi <span className="text-[#1a1c19] font-sans italic-none">&</span> Interior Presisi.</>}
        description="Integrasi layanan teknik konstruksi modern dengan manufaktur furniture berbasis teknologi CNC standar Eropa."
      />

      {/* PILLAR SWITCHER */}
      <section className="framer-container mb-12">
        <div className="flex gap-4 border-b border-[#1a1c19]/5">
          <button 
            onClick={() => handlePillarChange('infrastructure')}
            className={`pb-6 px-4 text-sm uppercase tracking-widest font-bold transition-all relative ${mainPillar === 'infrastructure' ? 'text-brand' : 'text-[#1a1c19]/30 hover:text-[#1a1c19]/60'}`}
          >
            Teknik & Konstruksi
            {mainPillar === 'infrastructure' && <motion.div layoutId="pillar-line" className="absolute bottom-0 left-0 w-full h-1 bg-brand" />}
          </button>
          <button 
            onClick={() => handlePillarChange('interior')}
            className={`pb-6 px-4 text-sm uppercase tracking-widest font-bold transition-all relative ${mainPillar === 'interior' ? 'text-brand' : 'text-[#1a1c19]/30 hover:text-[#1a1c19]/60'}`}
          >
            Furniture & Interior
            {mainPillar === 'interior' && <motion.div layoutId="pillar-line" className="absolute bottom-0 left-0 w-full h-1 bg-brand" />}
          </button>
        </div>
      </section>

      {/* SUB-CATEGORY FILTER */}
      <section className="sticky top-[72px] z-30 bg-[#F5F5F0]/80 backdrop-blur-xl border-b border-[#1a1c19]/5 mb-20">
        <div className="framer-container py-5 flex flex-wrap gap-x-10 gap-y-3">
          {categories.map((t) => (
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

      <AnimatePresence mode="wait">
        
        {/* PILLAR 1: INFRASTRUCTURE & CONSTRUCTION */}
        {mainPillar === 'infrastructure' && (
          <motion.section 
            key="infrastructure-pillar"
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
            className="framer-container"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {activeSection === 'all' || activeSection === 'structural' ? (
                <>
                  <ProductCard 
                    series="Prefab Building"
                    img={kcrData.services[0].img}
                    description={kcrData.services[0].description}
                    label="Structural System"
                    ctaLink="/contact"
                  />
                  <ProductCard 
                    series="Civil & Interior Fit-Out"
                    img={kcrData.services[5].img}
                    description={kcrData.services[5].description}
                    label="Architectural"
                    ctaLink="/contact"
                  />
                </>
              ) : null}

              {activeSection === 'all' || activeSection === 'chemical' ? (
                <>
                  {kcrData.services.slice(1, 5).map((s, idx) => (
                    <ProductCard 
                      key={s.id}
                      series={s.title}
                      img={s.img}
                      description={s.description}
                      label="Chemical Construction"
                      index={idx}
                      ctaLink="/contact"
                    />
                  ))}
                </>
              ) : null}

              {activeSection === 'all' || activeSection === 'manufacturing' ? (
                <>
                  {kcrData.capabilities.map((c, idx) => (
                    <ProductCard 
                      key={c.title}
                      series={c.title}
                      img={c.img}
                      description={c.description}
                      label="Engineering"
                      index={idx}
                      ctaLink="/contact"
                    />
                  ))}
                </>
              ) : null}
            </div>
          </motion.section>
        )}

        {/* PILLAR 2: FURNITURE & INTERIOR */}
        {mainPillar === 'interior' && (
          <motion.section 
            key="interior-pillar"
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
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
        )}

      </AnimatePresence>
    </div>
  );
};

export default Catalog;
