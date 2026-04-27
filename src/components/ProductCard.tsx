import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowsOut, ArrowRight, Check, WhatsappLogo } from '@phosphor-icons/react';
import { createPortal } from 'react-dom';
import { getProjectTags, getIndustryBadge, kcrData } from '../data/kcrData';
import { trackEvent } from '../utils/analytics';

interface ProductCardProps {
  id: number;
  category: string;
  name: string;
  specs: string;
  price: number;
  price_tax: number;
  img: string;
  assets?: string[];
  index?: number;
  activeIndustry?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ 
  id,
  category,
  name, 
  specs,
  img, 
  assets = [],
  index = 0,
  activeIndustry = 'all'
}) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [currentAssetIndex, setCurrentAssetIndex] = useState(0);
  const triggerRef = useRef<HTMLButtonElement>(null);
  
  const allAssets = assets.length > 0 ? assets : [img];
  const currentAsset = allAssets[currentAssetIndex];
  const isVideo = currentAsset.toLowerCase().endsWith('.mp4');
  
  // Find first image for poster
  const posterImage = allAssets.find(asset => !asset.toLowerCase().endsWith('.mp4')) || allAssets[0];

  const retailTags = getProjectTags(category);
  const industryBadge = getIndustryBadge(activeIndustry);

  const closeDrawer = () => {
    setIsDrawerOpen(false);
    setCurrentAssetIndex(0);
    requestAnimationFrame(() => triggerRef.current?.focus());
  };

  useEffect(() => {
    if (isDrawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isDrawerOpen]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (!isDrawerOpen) return;

      if (event.key === 'Escape') {
        closeDrawer();
      } else if (event.key === 'ArrowRight') {
        setCurrentAssetIndex((prev) => (prev === allAssets.length - 1 ? 0 : prev + 1));
      } else if (event.key === 'ArrowLeft') {
        setCurrentAssetIndex((prev) => (prev === 0 ? allAssets.length - 1 : prev - 1));
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isDrawerOpen, allAssets.length]);

  const fadeInUp = {
    initial: { y: 30, opacity: 0 },
    whileInView: { y: 0, opacity: 1 },
    viewport: { once: true },
    transition: { duration: 0.8, delay: (index % 6) * 0.1, ease: [0.16, 1, 0.3, 1] as any }
  };

  const handleInquiry = () => {
    trackEvent('product_inquiry_click', { product_id: id, product_name: name, industry: activeIndustry });
    const message = encodeURIComponent(`Halo KCR Furniture, saya tertarik dengan produk ${name} untuk kebutuhan proyek saya. Mohon informasi lebih lanjut mengenai spesifikasi dan penawaran harganya.`);
    window.open(`https://wa.me/${kcrData.contact.whatsapp}?text=${message}`, '_blank');
  };

  const modalContent = (
    <AnimatePresence>
      {isDrawerOpen && (
        <div className="fixed inset-0 z-[100000] flex items-center justify-center p-3 md:p-8">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeDrawer}
            className="absolute inset-0 bg-[#1A1C19]/80 backdrop-blur-xl"
          />
          
          {/* Modal Container */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-6xl max-h-[92vh] bg-[#F5F5F0] rounded-[8px] shadow-2xl overflow-hidden flex flex-col lg:flex-row"
            role="dialog"
            aria-modal="true"
            aria-label={`Detail produk ${name}`}
          >
            {/* Close Button */}
            <button 
              onClick={closeDrawer}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20 w-12 h-12 sm:w-10 sm:h-10 rounded-full bg-[#1A1C19]/5 border border-[#1A1C19]/10 flex items-center justify-center hover:bg-[#1A1C19] hover:text-white transition-all group focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
              aria-label="Close product details"
            >
              <X size={18} weight="bold" className="group-hover:rotate-90 transition-transform duration-500" />
            </button>

            {/* Left: Product Visual */}
            <div className="lg:w-3/5 bg-white flex items-center justify-center p-10 sm:p-12 lg:p-20 relative overflow-hidden">
              <div className="absolute top-12 left-12">
                 <span className="framer-label text-brand text-[10px] tracking-[0.5em] block mb-2">
                   {industryBadge ? industryBadge.toUpperCase() : category.toUpperCase()}
                 </span>
                 <div className="h-px w-12 bg-brand/30" />
              </div>
              
              {isVideo ? (
                <motion.video
                  key={currentAsset}
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                  src={currentAsset}
                  className="w-full h-full object-contain max-h-[56vh] lg:max-h-[60vh]"
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  poster={posterImage}
                />
              ) : (
                <motion.img 
                  key={currentAsset}
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                  src={currentAsset} 
                  alt={name} 
                  className="w-full h-full object-contain max-h-[56vh] lg:max-h-[60vh]" 
                  loading="lazy"
                  decoding="async"
                  sizes="(min-width: 1024px) 60vw, 100vw"
                />
              )}

              {/* Gallery Navigation */}
              {allAssets.length > 1 && (
                <>
                  <div className="absolute bottom-6 sm:bottom-12 left-0 right-0 flex justify-center gap-2 px-10">
                    {allAssets.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentAssetIndex(idx)}
                        className={`h-1 transition-all duration-500 rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand ${idx === currentAssetIndex ? 'w-6 sm:w-8 bg-brand' : 'w-1.5 sm:w-2 bg-[#1A1C19]/10 hover:bg-[#1A1C19]/30'}`}
                        aria-label={`Go to asset ${idx + 1}`}
                      />
                    ))}
                  </div>
                  
                  {/* Next/Prev Buttons */}
                  <div className="absolute inset-y-0 left-2 right-2 sm:left-4 sm:right-4 flex items-center justify-between pointer-events-none">
                    <button
                      onClick={() => setCurrentAssetIndex((prev) => (prev === 0 ? allAssets.length - 1 : prev - 1))}
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/40 sm:bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-[#1A1C19] hover:bg-white transition-all pointer-events-auto shadow-lg sm:shadow-xl active:scale-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
                      aria-label="Previous asset"
                    >
                      <ArrowRight size={18} weight="bold" className="rotate-180" />
                    </button>
                    <button
                      onClick={() => setCurrentAssetIndex((prev) => (prev === allAssets.length - 1 ? 0 : prev + 1))}
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/40 sm:bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-[#1A1C19] hover:bg-white transition-all pointer-events-auto shadow-lg sm:shadow-xl active:scale-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
                      aria-label="Next asset"
                    >
                      <ArrowRight size={18} weight="bold" />
                    </button>
                  </div>
                </>
              )}
            </div>

            {/* Right: Info Panel */}
            <div className="lg:w-2/5 flex flex-col min-h-0 bg-[#F5F5F0]">
              <div className="flex-grow overflow-y-auto px-6 md:px-10 py-10 md:py-14">
                <div className="space-y-12">
                  {/* Header */}
                  <div className="space-y-4">
                    <h2 className="font-serif text-4xl md:text-5xl font-medium text-[#1A1C19] leading-tight">{name}</h2>
                    <p className="text-[13px] text-[#1A1C19]/40 font-mono tracking-widest border-l-2 border-brand pl-4 uppercase">Reference Series</p>
                  </div>

                  {/* Technical Specs */}
                  <div className="space-y-6">
                    <span className="framer-label text-[10px] tracking-[0.4em] opacity-50 block mb-4">SPECIFICATIONS</span>
                    <div className="p-6 bg-[#1A1C19]/5 rounded-[4px] border border-[#1A1C19]/5">
                      <p className="text-[15px] text-[#1A1C19] leading-relaxed font-medium">
                        {specs}
                      </p>
                    </div>
                    <div className="space-y-3">
                      <span className="framer-label text-[9px] tracking-[0.28em] !opacity-80">COCOK UNTUK</span>
                      <div className="flex flex-wrap gap-2">
                        {retailTags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full border border-[#1A1C19]/15 bg-white px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-[#1A1C19]/75"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="rounded-[4px] border border-[#1A1C19]/10 bg-white p-3">
                        <p className="text-[9px] uppercase tracking-[0.2em] text-[#1A1C19]/50 mb-1">Lead Time</p>
                        <p className="text-[12px] font-semibold text-[#1A1C19]/80">7-14 Hari</p>
                      </div>
                      <div className="rounded-[4px] border border-[#1A1C19]/10 bg-white p-3">
                        <p className="text-[9px] uppercase tracking-[0.2em] text-[#1A1C19]/50 mb-1">Garansi</p>
                        <p className="text-[12px] font-semibold text-[#1A1C19]/80">12 Bulan</p>
                      </div>
                      <div className="rounded-[4px] border border-[#1A1C19]/10 bg-white p-3">
                        <p className="text-[9px] uppercase tracking-[0.2em] text-[#1A1C19]/50 mb-1">Layanan</p>
                        <p className="text-[12px] font-semibold text-[#1A1C19]/80">Instalasi</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 opacity-60">
                      <Check size={16} className="text-brand" weight="bold" />
                      <span className="text-[10px] font-bold uppercase tracking-widest">Precision CNC Standard</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Area (Sticky-like at bottom of panel) */}
              <div className="p-6 md:p-10 bg-white/50 backdrop-blur-sm border-t border-[#1A1C19]/5 space-y-4">
                <button 
                  onClick={handleInquiry}
                  className="w-full flex items-center justify-center gap-4 bg-[#1A1C19] text-white py-5 rounded-[4px] font-bold uppercase tracking-[0.18em] sm:tracking-[0.24em] text-[10px] sm:text-[11px] hover:bg-brand transition-all shadow-xl active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
                  aria-label={`Inquire about ${name} via WhatsApp`}
                >
                  <WhatsappLogo size={20} weight="fill" />
                  Tanya via WhatsApp
                </button>

                <p className="text-[10px] text-center text-[#1A1C19]/55 uppercase tracking-widest font-medium">
                  Tersedia untuk pengadaan massal & kustomisasi spesifikasi
                </p>
                <Link
                  to="/contact"
                  state={{ product: name, context: 'catalog_modal' }}
                  onClick={() => {
                    trackEvent('product_contact_form_click', { product_id: id, product_name: name });
                    closeDrawer();
                  }}
                  className="w-full flex items-center justify-center rounded-[4px] border border-[#1A1C19]/15 bg-white py-3 text-[10px] font-bold uppercase tracking-[0.18em] text-[#1A1C19]/80 transition hover:border-brand hover:text-brand focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
                  aria-label={`Fill project form for ${name}`}
                >
                  Isi Form Proyek
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  return (
    <>
      <motion.div 
        {...fadeInUp}
        className="p-6 md:p-8 bg-white border border-[#1A1C19]/5 rounded-[4px] shadow-premium hover:shadow-premium-hover transition-all duration-700 flex flex-col h-full group"
      >
        <div 
          className="aspect-[4/3] overflow-hidden mb-6 md:mb-8 bg-[#f0f0eb] cursor-zoom-in relative shadow-sm rounded-[4px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
          onClick={() => {
            setIsDrawerOpen(true);
            trackEvent('product_modal_open', { product_id: id, source: 'image' });
          }}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              setIsDrawerOpen(true);
              trackEvent('product_modal_open', { product_id: id, source: 'image_keyboard' });
            }
          }}
          aria-label={`View details for ${name}`}
        >
             {allAssets[0].toLowerCase().endsWith('.mp4') ? (
               <video
                 src={allAssets[0]}
                 className="w-full h-full object-cover transition-transform duration-[1.5s] ease-[var(--ease-out)] group-hover:scale-110"
                 autoPlay
                 loop
                 muted
                 playsInline
                 preload="metadata"
                 poster={posterImage}
               />
             ) : (
               <img 
                 src={allAssets[0]} 
                 alt={name} 
                 className="w-full h-full object-cover transition-transform duration-[1.5s] ease-[var(--ease-out)] group-hover:scale-110" 
                 loading="lazy"
                 decoding="async"
                 sizes="(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 100vw"
               />
             )}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-[#1A1C19]/10 transition-all duration-700 flex items-center justify-center">
             <div className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 transition-all duration-700 shadow-2xl">
                <ArrowsOut size={24} className="text-white" weight="light" />
             </div>
          </div>
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            <span className="bg-white/80 backdrop-blur-md px-3 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-widest text-brand border border-brand/10">
              {industryBadge || category}
            </span>
            {allAssets.length > 1 && (
              <span className="bg-[#1A1C19]/80 backdrop-blur-md px-3 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-widest text-white w-max">
                {allAssets.length} {allAssets.filter(a => a.endsWith('.mp4')).length > 0 ? 'Assets' : 'Photos'}
              </span>
            )}
          </div>
        </div>
        
        <div className="flex-grow flex flex-col text-left">
          <h4 className="font-serif text-[22px] md:text-[24px] mb-2 text-[#1A1C19] tracking-tight font-medium leading-tight group-hover:text-brand transition-colors duration-500">{name}</h4>
          <p className="text-[12px] text-[#1A1C19]/40 mb-6 font-mono uppercase tracking-tighter line-clamp-1">{specs}</p>
          
            <div className="mt-auto space-y-4">
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="rounded-[4px] border border-[#1A1C19]/10 bg-[#F5F5F0] px-2 py-2">
                  <p className="text-[8px] uppercase tracking-[0.16em] text-[#1A1C19]/55">Lead Time</p>
                  <p className="text-[10px] font-bold text-[#1A1C19]/80">7-14 Hari</p>
                </div>
                <div className="rounded-[4px] border border-[#1A1C19]/10 bg-[#F5F5F0] px-2 py-2">
                  <p className="text-[8px] uppercase tracking-[0.16em] text-[#1A1C19]/55">MOQ</p>
                  <p className="text-[10px] font-bold text-[#1A1C19]/80">1 Unit</p>
                </div>
                <div className="rounded-[4px] border border-[#1A1C19]/10 bg-[#F5F5F0] px-2 py-2">
                  <p className="text-[8px] uppercase tracking-[0.16em] text-[#1A1C19]/55">Garansi</p>
                  <p className="text-[10px] font-bold text-[#1A1C19]/80">12 Bulan</p>
                </div>
              </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-6 border-t border-[#1A1C19]/5">
              <button 
                onClick={handleInquiry}
                className="w-full flex items-center justify-center gap-2 py-4 px-4 rounded-full transition-all bg-[#1A1C19] text-white hover:bg-brand shadow-lg shadow-[#1A1C19]/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
                aria-label={`Inquire about ${name} via WhatsApp`}
              >
                <WhatsappLogo size={13} weight="fill" />
                <span className="text-[9px] uppercase tracking-[0.2em] font-bold">WhatsApp</span>
              </button>
              <button 
                ref={triggerRef}
                onClick={() => {
                  setIsDrawerOpen(true);
                  trackEvent('product_modal_open', { product_id: id, source: 'button' });
                }}
                className="w-full flex items-center justify-between group/btn py-4 px-4 rounded-full transition-all border border-[#1A1C19]/20 bg-white text-[#1A1C19] hover:border-brand hover:text-brand cursor-pointer shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
                aria-label={`View specifications and details for ${name}`}
              >
                  <span className="text-[9px] uppercase tracking-[0.18em] font-bold">Spek</span>
                <div className="w-5 h-5 rounded-full flex items-center justify-center transition-all bg-[#1A1C19]/5 group-hover/btn:bg-brand/15">
                  <ArrowRight weight="bold" size={11} />
                </div>
              </button>
            </div>
          </div>
        </div>
      </motion.div>
      {typeof document !== 'undefined' ? createPortal(modalContent, document.body) : null}
    </>
  );
};

export default ProductCard;
