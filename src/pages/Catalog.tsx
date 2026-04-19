import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import { kcrData } from '../data/kcrData';
import SEO from '../components/SEO';
import ProductCard from '../components/ProductCard';
import PageHeader from '../components/PageHeader';
import { trackEvent } from '../utils/analytics';

const Catalog: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [activeSection, setActiveSection] = useState<string>('all');
  const [activeIndustry, setActiveIndustry] = useState<string>('all');
  const [query, setQuery] = useState('');
  const [sortBy, setSortBy] = useState<'default' | 'price_asc' | 'price_desc' | 'name_asc' | 'newest'>('default');

  const interiorCategories = [
    { id: 'all', l: 'Semua Kategori' },
    { id: 'workstations', l: 'Workstations' },
    { id: 'executive', l: 'Executive' },
    { id: 'hospitality', l: 'Hospitality' },
    { id: 'others', l: 'Others' },
  ];

  const industryCategories = [
    { id: 'all', l: 'Semua Industri' },
    { id: 'office', l: 'Office' },
    { id: 'hospitality', l: 'Hospitality' },
    { id: 'government', l: 'Government' },
    { id: 'education', l: 'Education' },
  ];

  const normalizeCategoryParam = (value: string | null): string => {
    if (!value) return 'all';
    const normalized = value.toLowerCase();
    if (normalized === 'all') return 'all';
    if (normalized.includes('workstation')) return 'workstations';
    if (normalized.includes('executive')) return 'executive';
    if (normalized.includes('hospitality')) return 'hospitality';
    if (normalized.includes('other')) return 'others';
    return 'all';
  };

  const normalizeIndustryParam = (value: string | null): string => {
    if (!value) return 'all';
    const normalized = value.toLowerCase();
    const valid = ['office', 'hospitality', 'government', 'education'];
    return valid.includes(normalized) ? normalized : 'all';
  };

  useEffect(() => {
    const categoryParam = normalizeCategoryParam(searchParams.get('category'));
    const industryParam = normalizeIndustryParam(searchParams.get('industry'));
    const queryParam = searchParams.get('q') ?? '';
    const sortParam = (searchParams.get('sort') as typeof sortBy) ?? 'default';
    const allowedSort = ['default', 'price_asc', 'price_desc', 'name_asc', 'newest'];

    setActiveSection(categoryParam);
    setActiveIndustry(industryParam);
    setQuery(queryParam);
    setSortBy(allowedSort.includes(sortParam) ? sortParam : 'default');
  }, [searchParams]);

  const getFilteredProducts = () => {
    let products = kcrData.catalogProducts;

    // Filter by Category
    if (activeSection !== 'all') {
      if (activeSection === 'workstations') {
        products = products.filter(p => p.category === 'Workstation');
      } else if (activeSection === 'executive') {
        const executiveCategories = ['Meja Kerja', 'Meja Meeting', 'Credenza'];
        products = products.filter(p => executiveCategories.includes(p.category));
      } else if (activeSection === 'hospitality') {
        const hospitalityCategories = ['Coffee Table', 'Kursi Makan', 'Meja Makan', 'Wardrobe', 'Side Table', 'Side Drawer', 'Tempat Tidur', 'Sofa'];
        products = products.filter(p => hospitalityCategories.includes(p.category));
      } else if (activeSection === 'others') {
        const othersCategories = ['Mobile Drawer', 'Meja Belajar Sekolah', 'Daun Pintu'];
        products = products.filter(p => othersCategories.includes(p.category));
      }
    }

    // Filter by Industry
    if (activeIndustry !== 'all') {
      products = products.filter(p => 
        p.industries && p.industries.some(i => i.toLowerCase() === activeIndustry.toLowerCase())
      );
    }
    
    return products;
  };

  const searchedProducts = getFilteredProducts().filter((product) => {
    if (!query.trim()) return true;
    const q = query.trim().toLowerCase();
    return (
      product.name.toLowerCase().includes(q) ||
      product.category.toLowerCase().includes(q) ||
      product.specs.toLowerCase().includes(q)
    );
  });

  const filteredProducts = [...searchedProducts].sort((a, b) => {
    if (sortBy === 'price_asc') return a.price_tax - b.price_tax;
    if (sortBy === 'price_desc') return b.price_tax - a.price_tax;
    if (sortBy === 'name_asc') return a.name.localeCompare(b.name);
    if (sortBy === 'newest') return b.id - a.id;
    return a.id - b.id;
  });

  const clearFilters = () => {
    setActiveSection('all');
    setActiveIndustry('all');
    setQuery('');
    setSortBy('default');
  };

  return (
    <div className="bg-[#F5F5F0] min-h-screen pt-24 pb-32 selection:bg-[#1a1c19] selection:text-white">
      <SEO 
        title="Katalog Furnitur Kantor & Hospitality | KCR Furniture"
        description="Jelajahi katalog furnitur lengkap KCR Furniture. Dari workstation modern dan meja eksekutif hingga furnitur hotel custom berkualitas tinggi."
        keywords="Furnitur Kantor, Workstation, Meja Eksekutif, Meeting Table, Furnitur Hotel, KCR Furniture Catalog"
        canonicalUrl="/catalog"
      />
      
      <div className="relative overflow-hidden">
        <PageHeader 
          label="01 / KATALOG PRODUK"
          title="Koleksi"
          subtitle={<>Furnitur Kantor <span className="text-brand font-serif-italic">&</span> Hospitality.</>}
          description="Manufaktur furnitur presisi dengan teknologi CNC standar Eropa untuk ruang kerja dan hospitality yang inspiratif."
        />
      </div>

      {/* FILTER SECTION */}
      <section className="md:sticky top-[64px] md:top-[72px] z-30 bg-[#F5F5F0]/95 md:bg-[#F5F5F0]/80 md:backdrop-blur-2xl border-b border-[#1a1c19]/10 mb-10 md:mb-20 py-6">
        <div className="framer-container space-y-6">
          {/* CATEGORY FILTER */}
          <div className="flex flex-col gap-3">
            <span className="framer-label !text-[9px] opacity-40 uppercase tracking-[0.2em]">Kategori</span>
            <div className="flex flex-wrap gap-x-3 gap-y-2">
              {interiorCategories.map((t) => (
                <motion.button 
                  key={t.id} 
                  onClick={() => {
                    setActiveSection(t.id);
                    trackEvent('catalog_category_filter_change', { filter: t.id });
                  }} 
                  whileHover={{ y: -1 }}
                  className={`relative rounded-full border px-4 py-2 text-[10px] font-bold uppercase tracking-[0.15em] transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand ${activeSection === t.id ? 'text-brand bg-brand/10 border-brand/30 shadow-sm' : 'text-[#1A1C19]/60 bg-white border-[#1A1C19]/10 hover:text-[#1A1C19] hover:border-[#1A1C19]/30'}`}
                  role="tab"
                  aria-selected={activeSection === t.id}
                >
                  {t.l}
                </motion.button>
              ))}
            </div>
          </div>

          {/* INDUSTRY FILTER */}
          <div className="flex flex-col gap-3">
            <span className="framer-label !text-[9px] opacity-40 uppercase tracking-[0.2em]">Industri</span>
            <div className="flex flex-wrap gap-x-3 gap-y-2">
              {industryCategories.map((t) => (
                <motion.button 
                  key={t.id} 
                  onClick={() => {
                    setActiveIndustry(t.id);
                    trackEvent('catalog_industry_filter_change', { filter: t.id });
                  }} 
                  whileHover={{ y: -1 }}
                  className={`relative rounded-full border px-4 py-2 text-[10px] font-bold uppercase tracking-[0.15em] transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand ${activeIndustry === t.id ? 'text-brand bg-brand/10 border-brand/30 shadow-sm' : 'text-[#1A1C19]/60 bg-white border-[#1A1C19]/10 hover:text-[#1A1C19] hover:border-[#1A1C19]/30'}`}
                  role="tab"
                  aria-selected={activeIndustry === t.id}
                >
                  {t.l}
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="framer-container">
        <div className="mb-10 grid grid-cols-1 gap-4 lg:grid-cols-[1fr_auto_auto] lg:items-center">
          <label className="flex items-center gap-3 rounded-[4px] border border-[#1A1C19]/10 bg-white px-4 py-3">
            <span className="framer-label !text-[8px] !opacity-80 !tracking-[0.25em]">Search</span>
            <input
              type="text"
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                trackEvent('catalog_search', { query: event.target.value });
              }}
              placeholder="Cari berdasarkan nama produk, kategori, atau spesifikasi..."
              className="w-full bg-transparent text-[13px] text-[#1A1C19] placeholder:text-[#1A1C19]/35 focus:outline-none"
            />
          </label>

          <select
            value={sortBy}
            onChange={(event) => {
              const value = event.target.value as typeof sortBy;
              setSortBy(value);
              trackEvent('catalog_sort_change', { sort: value });
            }}
            className="rounded-[4px] border border-[#1A1C19]/10 bg-white px-4 py-3 text-[12px] uppercase tracking-[0.15em] text-[#1A1C19] focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
            aria-label="Sort products"
          >
            <option value="default">Default order</option>
            <option value="newest">Terbaru</option>
            <option value="price_asc">Harga: Rendah ke Tinggi</option>
            <option value="price_desc">Harga: Tinggi ke Rendah</option>
            <option value="name_asc">Nama: A-Z</option>
          </select>

          <button
            onClick={clearFilters}
            className="rounded-[4px] border border-[#1A1C19]/15 px-4 py-3 text-[11px] uppercase tracking-[0.2em] text-[#1A1C19]/75 transition hover:bg-[#1A1C19] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
          >
            Reset Filter
          </button>
        </div>

        <div className="mb-12 flex items-center justify-between gap-4">
          <span className="framer-label !text-[10px] opacity-60 uppercase tracking-[0.25em]">Hasil Pencarian ({filteredProducts.length})</span>
        </div>
        
        <AnimatePresence mode="popLayout">
          <motion.div 
            key={`${activeSection}-${activeIndustry}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8 md:gap-12"
          >
            {filteredProducts.length > 0 ? (
              filteredProducts.map((p, idx) => (
                <ProductCard 
                  key={p.id} 
                  {...p} 
                  index={idx} 
                  activeIndustry={activeIndustry}
                />
              ))
            ) : (
              <div className="col-span-full rounded-[4px] border border-dashed border-[#1A1C19]/20 bg-white p-10 text-center">
                <p className="font-serif text-2xl text-[#1A1C19]">Produk tidak ditemukan</p>
                <p className="mt-3 text-[13px] text-[#1A1C19]/60">Coba gunakan kata kunci atau kategori yang berbeda.</p>
                <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
                  <button
                    onClick={clearFilters}
                    className="cta-secondary !px-4 !py-2 !text-[9px] !tracking-[0.16em]"
                  >
                    Reset Filter
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </section>

      {/* Ornament Footer */}
      <section className="mt-40 md:mt-60 framer-container flex flex-col items-center">
         <div className="ornament-line" />
         <p className="framer-label !text-[9px] opacity-20 mt-12 tracking-[1.5em]">KCR FURNITURE COLLECTIONS</p>
      </section>
    </div>
  );
};

export default Catalog;