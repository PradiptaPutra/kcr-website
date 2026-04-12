import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from '@phosphor-icons/react';
import { kcrData } from '../data/kcrData';
import SEO from '../components/SEO';
import ProductCard from '../components/ProductCard';
import PageHeader from '../components/PageHeader';

const Catalog: React.FC = () => {
  const [mainPillar, setMainPillar] = useState<'infrastructure' | 'interior'>('infrastructure');
  const [activeSection, setActiveSection] = useState<string>('all');

  const images = kcrData.images.catalog;
  const tabTransition = { type: "spring", stiffness: 500, damping: 35 } as any;

  const infrastructureCategories = [
    { id: 'all', l: 'Semua Struktur' },
    { id: 'prefab', l: 'Prefabrikasi', img: images.prefab, c: 'Light Steel Frame System' },
    { id: 'shotcrete', l: 'Shotcrete', img: images.shotcrete, c: 'Beton Semprot Spesialis' },
    { id: 'chemicals', l: 'Kimia Konstruksi', img: images.chemicals, c: 'Technical Floor & Repair' },
  ];

  const interiorCategories = [
    { id: 'all', l: 'Semua Interior' },
    { id: 'furniture', l: 'Executive Desks', img: '/assets/images/overview/INTERIOR_FITOUT_cropped.jpg', c: 'Executive Office Systems' },
    { id: 'workstation', l: 'Workstations', img: '/assets/images/workstation/WORKSTATION_FORMA_cropped.jpg', c: 'Team Performance Systems' },
    { id: 'meeting', l: 'Meeting Tables', img: '/assets/images/overview/FERMI_RMT01_cropped.jpg', c: 'Boardroom Solutions' },
    { id: 'hospitality', l: 'Hospitality', img: '/assets/images/overview/HOSPITALITY_OTHERS_cropped.jpg', c: 'Dining & Bed Series' },
  ];

  const categories = mainPillar === 'infrastructure' ? infrastructureCategories : interiorCategories;

  const handlePillarChange = (pillar: 'infrastructure' | 'interior') => {
    setMainPillar(pillar);
    setActiveSection('all');
  };

  return (
    <div className="bg-[#F5F5F0] min-h-screen pt-24 pb-32 selection:bg-[#1a1c19] selection:text-white">
      <SEO 
        title="Katalog Solusi Terpadu | Struktur & Interior"
        description="Jelajahi katalog lengkap PT. KARYA CIPTA RAHARJA. Dari sistem prefabrikasi dan shotcrete hingga furnitur kantor eksekutif dan workstation modern."
        keywords="Sistem Prefabrikasi, Shotcrete, Furnitur Kantor, Workstation, Meeting Table, Katalog Konstruksi Indonesia"
        canonicalUrl="/catalog"
      />
      
      <PageHeader 
        label="01 / KATALOG TERPADU"
        title="Solusi"
        subtitle={<>Struktural <span className="text-[#1a1c19] font-sans italic-none">&</span> Interior Berkualitas.</>}
        description="Jelajahi koleksi lengkap kami untuk kebutuhan infrastruktur strategis dan solusi interior kantor modern."
      />

      <section className="framer-container mb-12">
        <div className="flex gap-4 border-b border-[#1a1c19]/5">
          <button 
            onClick={() => handlePillarChange('infrastructure')}
            className={`pb-6 px-4 text-sm uppercase tracking-widest font-bold transition-all relative ${mainPillar === 'infrastructure' ? 'text-brand' : 'text-[#1a1c19]/30 hover:text-[#1a1c19]/60'}`}
          >
            Struktur & Infrastruktur
            {mainPillar === 'infrastructure' && <motion.div layoutId="pillar-line" className="absolute bottom-0 left-0 w-full h-1 bg-brand" />}
          </button>
          <button 
            onClick={() => handlePillarChange('interior')}
            className={`pb-6 px-4 text-sm uppercase tracking-widest font-bold transition-all relative ${mainPillar === 'interior' ? 'text-brand' : 'text-[#1a1c19]/30 hover:text-[#1a1c19]/60'}`}
          >
            Interior & Furniture
            {mainPillar === 'interior' && <motion.div layoutId="pillar-line" className="absolute bottom-0 left-0 w-full h-1 bg-brand" />}
          </button>
        </div>
      </section>

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
        {activeSection === 'all' && (
          <motion.section 
            key={`${mainPillar}-all`}
            initial={{ opacity: 0, y: 10 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: -10 }} 
            className="framer-container"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
              {categories.slice(1).map((card) => (
                <motion.button 
                  key={card.id} 
                  onClick={() => setActiveSection(card.id)} 
                  whileHover={{ y: -10 }}
                  className="text-left group"
                >
                  <div className="aspect-[16/10] overflow-hidden rounded-[8px] mb-8 bg-[#e5e5e0]">
                    <motion.img 
                      src={card.img} 
                      className="w-full h-full object-cover" 
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.8 }}
                      alt={card.l} 
                    />
                  </div>
                  <span className="framer-label text-brand mb-4 block">Sub-Kategori</span>
                  <h2 className="font-serif text-[28px] text-[#1a1c19] mb-2">{card.l}</h2>
                  <p className="framer-body !text-[14px] opacity-50 mb-6">{card.c}</p>
                  <div className="flex items-center gap-3 text-brand">
                    <span className="text-[11px] uppercase tracking-tighter font-bold">Lihat Detail</span>
                    <ArrowRight weight="bold" size={16} />
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.section>
        )}

        {activeSection === 'furniture' && (
          <motion.section 
            key="furniture" 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            className="framer-container"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {kcrData.products.executiveDesks.map((s, idx) => (
                <ProductCard 
                  key={s.series}
                  {...s}
                  label="Executive Collection"
                  index={idx}
                />
              ))}
            </div>
          </motion.section>
        )}

        {activeSection === 'workstation' && (
          <motion.section 
            key="workstation" 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            className="framer-container"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {kcrData.products.workstations.map((s, idx) => (
                <ProductCard 
                  key={s.series}
                  {...s}
                  label="Team Performance"
                  index={idx}
                />
              ))}
            </div>
          </motion.section>
        )}

        {activeSection === 'meeting' && (
          <motion.section 
            key="meeting" 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            className="framer-container"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {kcrData.products.meetingTables.map((s, idx) => (
                <ProductCard 
                  key={s.series}
                  {...s}
                  label="Boardroom Solutions"
                  index={idx}
                />
              ))}
            </div>
          </motion.section>
        )}

        {activeSection === 'hospitality' && (
          <motion.section 
            key="hospitality" 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            className="framer-container"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {kcrData.products.hospitality.map((s, idx) => (
                <ProductCard 
                  key={s.series}
                  {...s}
                  label="Hospitality Series"
                  index={idx}
                />
              ))}
            </div>
          </motion.section>
        )}

        {(activeSection === 'prefab' || activeSection === 'shotcrete' || activeSection === 'chemicals') && (
          <motion.section 
            key={activeSection}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            className="framer-container"
          >
            <div className="max-w-4xl mx-auto">
              <ProductCard 
                series={`Spesialis ${activeSection.toUpperCase()}`}
                img={images[activeSection as keyof typeof images]}
                description="Kami menghadirkan solusi teknis kelas dunia yang telah teruji untuk infrastruktur vital nasional, menjamin durabilitas jangka panjang dan keamanan struktural."
                label="Spesialisasi Teknis"
                layout="row"
              />
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Catalog;
