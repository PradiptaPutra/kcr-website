import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useSearchParams } from 'react-router-dom';
import { kcrData } from '../data/kcrData';
import SEO from '../components/SEO';
import ProductCard from '../components/ProductCard';
import PageHeader from '../components/PageHeader';
import { trackEvent } from '../utils/analytics';

const ALLOWED_SORT = ['default', 'price_asc', 'price_desc', 'name_asc', 'newest'] as const;

const Catalog: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeSection, setActiveSection] = useState<string>('all');
  const [activeIndustry, setActiveIndustry] = useState<string>('all');
  const [query, setQuery] = useState('');
  const [sortBy, setSortBy] = useState<'default' | 'price_asc' | 'price_desc' | 'name_asc' | 'newest'>('default');

  const interiorCategories = [
    { id: 'all', l: 'Semua Koleksi' },
    { id: 'workstations', l: 'Workstations & System Furniture' },
    { id: 'executive', l: 'Executive & Private Office' },
    { id: 'hospitality', l: 'Hospitality & Commercial' },
    { id: 'apartment_villa', l: 'Bespoke Apartment & Vila' },
    { id: 'others', l: 'Specialized & Technical Units' },
  ];

  const industryCategories = [
    { id: 'all', l: 'Semua Industri' },
    { id: 'office', l: 'Perkantoran' },
    { id: 'hospitality', l: 'Hospitality' },
    { id: 'government', l: 'Pemerintahan' },
  ];

  const normalizeCategoryParam = (value: string | null): string => {
    if (!value) return 'all';
    const normalized = value.toLowerCase();
    if (normalized === 'all') return 'all';
    if (normalized.includes('workstation')) return 'workstations';
    if (normalized.includes('executive')) return 'executive';
    if (normalized.includes('hospitality')) return 'hospitality';
    if (normalized.includes('apartment') || normalized.includes('villa')) return 'apartment_villa';
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

    setActiveSection(categoryParam);
    setActiveIndustry(industryParam);
    setQuery(queryParam);
    setSortBy(ALLOWED_SORT.includes(sortParam) ? sortParam : 'default');
  }, [searchParams]);

  const updateSearch = (next: {
    section?: string;
    industry?: string;
    q?: string;
    sort?: typeof sortBy;
  }) => {
    const merged = {
      section: next.section ?? activeSection,
      industry: next.industry ?? activeIndustry,
      q: next.q ?? query,
      sort: next.sort ?? sortBy,
    };

    setActiveSection(merged.section);
    setActiveIndustry(merged.industry);
    setQuery(merged.q);
    setSortBy(merged.sort);

    const params = new URLSearchParams();
    if (merged.section !== 'all') params.set('category', merged.section);
    if (merged.industry !== 'all') params.set('industry', merged.industry);
    if (merged.q.trim()) params.set('q', merged.q.trim());
    if (merged.sort !== 'default') params.set('sort', merged.sort);
    setSearchParams(params, { replace: true });
  };

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
      } else if (activeSection === 'apartment_villa') {
        products = products.filter(p => p.category === 'Apartement & Vila (Built-in Furniture Only)');
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
    if (sortBy === 'name_asc') return a.name.localeCompare(b.name);
    if (sortBy === 'newest') return b.id - a.id;
    return a.id - b.id;
  });

  const clearFilters = () => {
    updateSearch({ section: 'all', industry: 'all', q: '', sort: 'default' });
  };

  const selectedCategoryLabel = interiorCategories.find((item) => item.id === activeSection)?.l ?? 'Semua Kategori';
  const selectedIndustryLabel = industryCategories.find((item) => item.id === activeIndustry)?.l ?? 'Semua Industri';
  const selectedSortLabel =
    sortBy === 'name_asc'
      ? 'Nama A-Z'
      : sortBy === 'newest'
        ? 'Terbaru'
        : 'Default';

  const activeFilterChips = [
    activeSection !== 'all' ? { key: 'section', label: `Kategori: ${selectedCategoryLabel}`, onRemove: () => updateSearch({ section: 'all' }) } : null,
    activeIndustry !== 'all' ? { key: 'industry', label: `Industri: ${selectedIndustryLabel}`, onRemove: () => updateSearch({ industry: 'all' }) } : null,
    query.trim() ? { key: 'query', label: `Cari: ${query.trim()}`, onRemove: () => updateSearch({ q: '' }) } : null,
    sortBy !== 'default' ? { key: 'sort', label: `Urutkan: ${selectedSortLabel}`, onRemove: () => updateSearch({ sort: 'default' }) } : null,
  ].filter(Boolean) as Array<{ key: string; label: string; onRemove: () => void }>;

  const canonicalParams = new URLSearchParams();
  if (activeSection !== 'all') canonicalParams.set('category', activeSection);
  if (activeIndustry !== 'all') canonicalParams.set('industry', activeIndustry);
  if (query.trim()) canonicalParams.set('q', query.trim());
  if (sortBy !== 'default') canonicalParams.set('sort', sortBy);
  const canonicalQuery = canonicalParams.toString();
  const canonicalUrl = canonicalQuery ? `/catalog?${canonicalQuery}` : '/catalog';

  const filteredCatalogSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `Katalog KCR Furniture - ${selectedCategoryLabel}`,
    description: `Katalog terfilter untuk ${selectedCategoryLabel} di segmen ${selectedIndustryLabel}.`,
    url: `https://karyaciptaraharja.com${canonicalUrl}`,
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: filteredProducts.slice(0, 12).map((item, index) => ({
        '@type': 'Product',
        position: index + 1,
        name: item.name,
        category: item.category,
        image: `https://karyaciptaraharja.com${item.img}`,
        brand: {
          '@type': 'Brand',
          name: 'KCR Furniture'
        },
        manufacturer: {
          '@type': 'Organization',
          name: 'PT Afan Maju Sejahtera (AMS)',
          address: {
            '@type': 'PostalAddress',
            streetAddress: kcrData.contact.address,
            addressLocality: 'Bekasi',
            addressRegion: 'Jawa Barat',
            postalCode: '17426',
            addressCountry: 'ID'
          }
        }
      })),
    },
  };

  return (
    <div className="bg-[#F5F5F0] min-h-screen pt-24 pb-32 selection:bg-[#1a1c19] selection:text-white">
      <SEO 
        title={`Katalog Produsen Furnitur Kantor & Custom Furniture | KCR Furniture`}
        description={`Jelajahi katalog KCR Furniture, produsen furnitur kantor & custom furniture Bekasi. Temukan workstations, meja eksekutif, dan hospitality furniture untuk proyek Anda.`}
        keywords="Produsen Furnitur Kantor, Custom Furniture Bekasi, Mass Production Furniture, Interior Fit-out Contractor Indonesia, Furnitur Kantor, Workstation, Meja Eksekutif, Meeting Table, Furnitur Hotel, KCR Furniture Catalog"
        canonicalUrl={canonicalUrl}
      >
        <script type="application/ld+json">{JSON.stringify(filteredCatalogSchema)}</script>
      </SEO>
      
      <div className="relative overflow-hidden">
        <PageHeader 
          label="01 / KATALOG PRODUK"
          title="Koleksi"
          subtitle={<>Furnitur Kantor <span className="text-brand font-serif-italic">&</span> Hospitality.</>}
          description="Manufaktur furnitur presisi dengan teknologi CNC standar Eropa untuk ruang kerja dan hospitality yang inspiratif."
        />
      </div>

      {/* FILTER SECTION */}
      <section className="mb-10 md:mb-20">
        <div className="framer-container">
          <div className="rounded-[18px] border border-[#1A1C19]/10 bg-[#F5F5F0]/90 px-4 py-4 shadow-[0_12px_40px_rgba(18,20,17,0.06)] backdrop-blur-xl md:px-6 md:py-5">
            <div className="grid gap-4 lg:grid-cols-2 lg:gap-6">
              <div className="space-y-3">
                <div className="space-y-1">
                  <span className="framer-label !text-[9px] opacity-45 uppercase tracking-[0.22em]">Kategori Produk</span>
                  <p className="text-[11px] text-[#1A1C19]/45">Pilih jenis produk yang ingin ditampilkan.</p>
                </div>
                <select
                  value={activeSection}
                  onChange={(event) => {
                    const value = event.target.value;
                    updateSearch({ section: value });
                    trackEvent('catalog_category_filter_change', { filter: value });
                  }}
                  className="w-full rounded-[10px] border border-[#1A1C19]/12 bg-white px-4 py-3 text-[12px] font-bold uppercase tracking-[0.14em] text-[#1A1C19] focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
                  aria-label="Pilih kategori produk"
                >
                  {interiorCategories.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.l}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-3">
                <div className="space-y-1">
                  <span className="framer-label !text-[9px] opacity-45 uppercase tracking-[0.22em]">Segmen Industri</span>
                  <p className="text-[11px] text-[#1A1C19]/45">Saring berdasarkan kebutuhan sektor proyek.</p>
                </div>
                <select
                  value={activeIndustry}
                  onChange={(event) => {
                    const value = event.target.value;
                    updateSearch({ industry: value });
                    trackEvent('catalog_industry_filter_change', { filter: value });
                  }}
                  className="w-full rounded-[10px] border border-[#1A1C19]/12 bg-white px-4 py-3 text-[12px] font-bold uppercase tracking-[0.14em] text-[#1A1C19] focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
                  aria-label="Pilih segmen industri"
                >
                  {industryCategories.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.l}
                    </option>
                  ))}
                </select>
              </div>
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
                  const nextValue = event.target.value;
                  updateSearch({ q: nextValue });
                  trackEvent('catalog_search', { query: nextValue });
                }}
              placeholder="Cari berdasarkan nama produk, kategori, atau spesifikasi..."
              className="w-full bg-transparent text-[13px] text-[#1A1C19] placeholder:text-[#1A1C19]/35 focus:outline-none"
            />
          </label>

          <select
            value={sortBy}
            onChange={(event) => {
              const value = event.target.value as typeof sortBy;
              updateSearch({ sort: value });
              trackEvent('catalog_sort_change', { sort: value });
            }}
            className="rounded-[4px] border border-[#1A1C19]/10 bg-white px-4 py-3 text-[12px] uppercase tracking-[0.15em] text-[#1A1C19] focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
            aria-label="Sort products"
          >
            <option value="default">Default order</option>
            <option value="newest">Terbaru</option>
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

        {activeFilterChips.length > 0 && (
          <div className="mb-8 flex flex-wrap items-center gap-2">
            {activeFilterChips.map((chip) => (
              <button
                key={chip.key}
                onClick={chip.onRemove}
                className="rounded-full border border-[#1A1C19]/15 bg-white px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-[#1A1C19]/80 transition hover:border-[#1A1C19]/40 hover:text-[#1A1C19] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
              >
                {chip.label} ×
              </button>
            ))}
          </div>
        )}
        
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
              <div className="col-span-full">
                <div className="rounded-[4px] border border-dashed border-[#1A1C19]/20 bg-white px-6 py-16 text-center md:p-20">
                  <div className="mx-auto max-w-2xl">
                    <p className="font-serif text-3xl text-[#1A1C19] md:text-4xl">Produk tidak ditemukan</p>
                    <p className="mt-4 text-[14px] leading-relaxed text-[#1A1C19]/60">Maaf, kami tidak dapat menemukan produk yang sesuai dengan kriteria Anda. Coba gunakan kata kunci yang lebih umum atau reset filter Anda.</p>
                    <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                      <button
                        onClick={clearFilters}
                        className="cta-secondary !px-6 !py-3 !text-[10px] !tracking-[0.2em]"
                      >
                        Reset Filter
                      </button>
                    </div>
                  </div>
                </div>

                <div className="mt-12 rounded-[18px] border border-[#1A1C19]/5 bg-white p-8 shadow-[0_20px_50px_rgba(0,0,0,0.03)] md:p-12">
                  <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
                    <div className="max-w-xl text-center md:text-left">
                      <h3 className="font-serif text-2xl text-[#1A1C19]">Belum menemukan produk yang tepat?</h3>
                      <p className="mt-3 text-[14px] leading-relaxed text-[#1A1C19]/70">
                        Konsultasikan kebutuhan technical spec Anda dengan tim engineer kami di Bekasi. Kami spesialis dalam pengembangan produk kustom dan manufaktur massal dengan akurasi tinggi.
                      </p>
                    </div>
                    <a
                      href={`https://wa.me/${kcrData.contact.whatsapp}?text=${encodeURIComponent('Halo KCR Furniture, saya ingin konsultasi kebutuhan technical spec produk furniture.')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cta-primary flex items-center gap-3 !px-8 !py-4 !text-[11px] !tracking-[0.22em]"
                    >
                      <span>WHATSAPP KONSULTASI</span>
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.16669 7H12.8334M12.8334 7L7.00002 1.16667M12.8334 7L7.00002 12.8333" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </a>
                  </div>
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
         <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
           <Link className="cta-secondary !px-5 !py-2 !text-[9px] !tracking-[0.16em]" to="/services">Layanan Proyek</Link>
           <Link className="cta-secondary !px-5 !py-2 !text-[9px] !tracking-[0.16em]" to="/case-studies">Studi Kasus</Link>
           <Link className="cta-primary !px-5 !py-2 !text-[9px] !tracking-[0.16em]" to="/contact">Konsultasi</Link>
         </div>
      </section>
    </div>
  );
};

export default Catalog;
