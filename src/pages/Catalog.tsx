import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Plus, Minus } from '@phosphor-icons/react';
import { kcrData } from '../data/kcrData';
import SEO from '../components/SEO';

const Catalog: React.FC = () => {
  const [mainPillar, setMainPillar] = useState<'infrastructure' | 'interior'>('infrastructure');
  const [activeSection, setActiveSection] = useState<string>('all');
  const [expandedSeries, setExpandedSeries] = useState<string | null>(null);

  const fadeInUp = {
    initial: { y: 20, opacity: 0 },
    whileInView: { y: 0, opacity: 1 },
    viewport: { once: true },
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as any }
  };

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
    <div className="bg-[#F5F5F0] min-h-screen pt-40 pb-32 selection:bg-[#1a1c19] selection:text-white">
      <SEO 
        title="Katalog Solusi Terpadu | Struktur & Interior"
        description="Jelajahi katalog lengkap PT. KARYA CIPTA RAHARJA. Dari sistem prefabrikasi dan shotcrete hingga furnitur kantor eksekutif dan workstation modern."
        keywords="Sistem Prefabrikasi, Shotcrete, Furnitur Kantor, Workstation, Meeting Table, Katalog Konstruksi Indonesia"
        canonicalUrl="/catalog"
      />
      
      <section className="framer-container mb-24">
        <motion.div {...fadeInUp} className="max-w-4xl border-l-[0.5px] border-[#1a1c19]/10 pl-10">
          <span className="framer-label text-brand mb-10 block">01 / KATALOG TERPADU</span>
          <h1 className="framer-h1">Solusi <span className="italic text-brand font-serif">Struktural</span> & <br/>Interior Berkualitas.</h1>
        </motion.div>
      </section>

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
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
            className="framer-container"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
              <div className="lg:col-span-4 space-y-6">
                <div className="mb-12">
                  <h3 className="framer-h2 !text-[32px] mb-4">Executive Desks</h3>
                  <p className="framer-body !text-sm opacity-60">Sistem meja kerja eksekutif yang memadukan prestise dengan kenyamanan ergonomis maksimal.</p>
                </div>
                {kcrData.products.executiveDesks.map((s) => (
                  <motion.div 
                    layout
                    key={s.series} 
                    className={`p-8 border-[0.5px] rounded-[16px] cursor-pointer transition-all duration-500 ${expandedSeries === s.series ? 'bg-white border-brand shadow-xl' : 'bg-white/40 border-[#1a1c19]/10 hover:border-brand/40'}`} 
                    onClick={() => setExpandedSeries(expandedSeries === s.series ? null : s.series)}
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-serif text-[22px] tracking-tight">{s.series}</span>
                      <motion.div animate={{ rotate: expandedSeries === s.series ? 180 : 0 }}>
                        {expandedSeries === s.series ? <Minus weight="light" /> : <Plus weight="light" />}
                      </motion.div>
                    </div>
                    <AnimatePresence>
                      {expandedSeries === s.series && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                          <div className="mt-8 space-y-6">
                            <p className="text-[13px] leading-relaxed opacity-70">{s.description}</p>
                            <div className="grid grid-cols-1 gap-4">
                              {s.models.map(m => (
                                <div key={m.name} className="p-4 bg-[#F5F5F0] rounded-lg">
                                  <p className="font-bold text-[12px] uppercase text-[#1a1c19] mb-1">{m.name}</p>
                                  <p className="text-[11px] opacity-50">Dimensi: {m.dim}</p>
                                </div>
                              ))}
                            </div>
                            <div className="pt-4 border-t border-[#1a1c19]/5">
                              <p className="text-[10px] uppercase font-bold text-brand mb-3">Fitur Utama</p>
                              <div className="flex flex-wrap gap-2">
                                {s.accessories.map(a => <span key={a} className="text-[9px] bg-brand/10 text-brand px-3 py-1.5 rounded-full font-bold">{a}</span>)}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>
              <div className="lg:col-span-8">
                <div className="sticky top-40 space-y-12">
                  <AnimatePresence mode="wait">
                    <motion.div 
                      key={expandedSeries || 'default'}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.5 }}
                      className="relative group"
                    >
                      <div className="bg-[#e5e5e0] aspect-[16/10] rounded-[24px] overflow-hidden shadow-2xl border border-white/20">
                        <img 
                          src={(kcrData.products.executiveDesks.find(s => s.series === expandedSeries) as any)?.img || images.furniture} 
                          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
                          alt={expandedSeries || "Executive Furniture"} 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        
                        {expandedSeries && (
                          <div className="absolute bottom-0 left-0 right-0 p-10 bg-gradient-to-t from-black/60 to-transparent text-white">
                            <span className="framer-label !text-brand mb-2 block">Premium Collection</span>
                            <h4 className="font-serif text-[42px] leading-tight">{expandedSeries}</h4>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  </AnimatePresence>

                  {!expandedSeries && (
                    <div className="grid grid-cols-2 gap-8">
                      {kcrData.products.executiveDesks.slice(0, 2).map((s: any) => (
                        <motion.div 
                          key={s.series} 
                          whileHover={{ y: -8 }}
                          onClick={() => setExpandedSeries(s.series)}
                          className="aspect-square rounded-[20px] overflow-hidden cursor-pointer group relative shadow-lg"
                        >
                          <img src={s.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={s.series} />
                          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
                          <div className="absolute bottom-6 left-6 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                            <p className="framer-label !text-white text-[10px]">{s.series}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                  
                  {expandedSeries && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="p-10 border border-brand/20 bg-brand/5 rounded-[24px] backdrop-blur-sm"
                    >
                      <p className="framer-label text-brand mb-4">Informasi Tambahan</p>
                      <p className="text-[14px] leading-relaxed opacity-60">
                        Setiap unit {expandedSeries} dapat dikustomisasi dalam hal pemilihan warna laminate, tipe handle, hingga integrasi sistem kelistrikan sesuai kebutuhan spesifik kantor Anda. Hubungi tim teknis kami untuk katalog material lengkap.
                      </p>
                    </motion.div>
                  )}
                </div>
              </div>
            </div>
          </motion.section>
        )}

        {activeSection === 'workstation' && (
          <motion.section 
            key="workstation" 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            className="framer-container"
          >
             <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-start">
                <div className="lg:col-span-4 space-y-8">
                   <h3 className="framer-h2 !text-[32px]">Workstation Systems</h3>
                   <p className="framer-body !text-sm opacity-60 leading-relaxed">Koleksi modular yang dirancang untuk mendukung kolaborasi tim tanpa batas, efisiensi ruang, dan manajemen kabel yang rapi.</p>
                   <Link to="/contact" className="framer-btn !py-4 !px-8 inline-block">Konsultasi Layout Kantor</Link>
                </div>
                <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                  {kcrData.products.workstations.map((s, idx) => (
                    <motion.div 
                      key={s.series} 
                      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }}
                      className="bg-white p-10 border border-[#1a1c19]/5 rounded-[20px] shadow-sm hover:shadow-xl transition-all group"
                    >
                      <div className="aspect-[16/10] overflow-hidden rounded-[12px] mb-8 bg-[#f5f5f0]">
                        <img src={s.img} alt={s.series} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                      </div>
                      <span className="framer-label text-brand mb-6 block">Koleksi 0{idx+1}</span>
                      <h4 className="font-serif text-[24px] mb-4 group-hover:text-brand transition-colors">{s.series}</h4>
                      <p className="text-[13px] opacity-50 mb-8 leading-relaxed">{s.description}</p>
                      <div className="space-y-3">
                        {s.models.map(m => (
                          <div key={m.name} className="flex justify-between items-center py-3 border-b border-[#1a1c19]/5 text-[12px]">
                            <span className="font-bold">{m.name}</span>
                            <span className="opacity-40">{m.dim || m.capacity}</span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
             </div>
          </motion.section>
        )}

        {activeSection === 'meeting' && (
          <motion.section 
            key="meeting" 
            initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }}
            className="framer-container"
          >
             <div className="bg-[#1a1c19] text-white p-12 md:p-24 rounded-[32px] overflow-hidden relative">
                <div className="relative z-10 flex flex-col lg:flex-row gap-16">
                  <div className="max-w-2xl flex-1">
                    <span className="framer-label text-brand mb-8 block">THE BOARDROOM</span>
                    <h3 className="framer-h1 !text-[48px] text-white mb-12">Meeting Tables <span className="italic font-serif text-brand">Collection.</span></h3>
                    
                    <div className="space-y-16">
                      {kcrData.products.meetingTables.map((s) => (
                        <div key={s.series}>
                          <h4 className="framer-label !text-white/30 mb-8 border-b border-white/10 pb-4">{s.series}</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            {s.models.map(m => (
                              <div key={m.name} className="group">
                                <p className="text-brand uppercase tracking-widest text-[10px] font-bold mb-4">{m.name}</p>
                                <p className="text-[24px] font-serif mb-2">{m.dim}</p>
                                <p className="text-white/40 text-[12px]">{m.capacity || m.finishes}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="aspect-[4/5] bg-white/5 rounded-2xl overflow-hidden shadow-2xl">
                       <img src={(kcrData.products.meetingTables[0] as any).img} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000" alt="Meeting Table" />
                    </div>
                  </div>
                </div>
                <div className="absolute -bottom-10 -right-10 text-[20vw] font-serif opacity-[0.03] pointer-events-none select-none">FERMI</div>
             </div>
          </motion.section>
        )}

        {activeSection === 'hospitality' && (
          <motion.section 
            key="hospitality" 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="framer-container"
          >
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
                {kcrData.products.hospitality.map((s) => (
                  <div key={s.series} className="flex flex-col gap-10">
                    <div className="aspect-[16/10] bg-[#e5e5e0] rounded-[16px] overflow-hidden group">
                      <motion.img 
                        src={(s as any).img} 
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.8 }}
                        className="w-full h-full object-cover" 
                        alt={s.series} 
                      />
                    </div>
                    <div>
                      <h3 className="font-serif text-[32px] mb-6">{s.series}</h3>
                      <div className="grid grid-cols-1 gap-4">
                        {s.models.map(m => (
                          <div key={m.name} className="flex justify-between items-baseline p-6 border border-[#1a1c19]/5 rounded-xl bg-white/50">
                            <span className="font-bold text-[14px] uppercase">{m.name}</span>
                            <span className="text-[12px] opacity-40">{m.dim}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
             </div>
             <div className="p-12 border-t border-[#1a1c19]/10 bg-white/30 rounded-[24px]">
                <p className="framer-label mb-10 text-center">Produk Pelengkap Lainnya</p>
                <div className="flex flex-wrap justify-center gap-4">
                   {kcrData.products.additional.items.map(i => (
                     <motion.span 
                        key={i} 
                        whileHover={{ scale: 1.05, backgroundColor: '#1a1c19', color: '#fff' }}
                        className="px-10 py-4 border border-[#1a1c19]/10 rounded-full text-[12px] font-bold transition-colors cursor-default"
                      >
                        {i}
                      </motion.span>
                   ))}
                </div>
             </div>
          </motion.section>
        )}

        {(activeSection === 'prefab' || activeSection === 'shotcrete' || activeSection === 'chemicals') && (
          <motion.section 
            key="other" 
            initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }}
            className="framer-container"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
              <div className="bg-[#e5e5e0] aspect-[16/10] rounded-[16px] overflow-hidden shadow-2xl">
                <motion.img 
                  src={images[activeSection as keyof typeof images]} 
                  className="w-full h-full object-cover" 
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 1.5 }}
                  alt="Solution" 
                />
              </div>
              <div className="space-y-10">
                <span className="framer-label text-brand">Spesialisasi Teknis</span>
                <h2 className="font-serif text-[48px] text-[#1a1c19] leading-[1.1]">Spesialis <br/><span className="italic font-serif text-brand uppercase">{activeSection}</span></h2>
                <p className="framer-body !text-[18px] opacity-70 leading-relaxed">Kami menghadirkan solusi teknis kelas dunia yang telah teruji untuk infrastruktur vital nasional, menjamin durabilitas jangka panjang dan keamanan struktural.</p>
                <div className="flex flex-col gap-6">
                  <Link to="/contact" className="framer-btn !py-5 !px-12 inline-block">Minta Penawaran Teknik</Link>
                  <p className="text-[11px] opacity-40 italic">* Layanan tersedia untuk seluruh wilayah Indonesia.</p>
                </div>
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
};
export default Catalog;
