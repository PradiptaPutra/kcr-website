import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowsOut, ChatTeardropText } from '@phosphor-icons/react';
import { useNavigate } from 'react-router-dom';

interface Model {
  name: string;
  dim?: string;
  capacity?: string;
  finishes?: string;
}

interface ProductCardProps {
  series: string;
  img: string;
  description?: string;
  label?: string;
  models?: Model[];
  index?: number;
  layout?: 'grid' | 'row';
  ctaLink?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ 
  series, 
  img, 
  description, 
  label, 
  models, 
  index = 0,
  layout = 'grid',
  ctaLink
}) => {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const navigate = useNavigate();

  // Prevent scroll when lightbox is open
  useEffect(() => {
    if (isLightboxOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isLightboxOpen]);

  const fadeInUp = {
    initial: { y: 20, opacity: 0 },
    whileInView: { y: 0, opacity: 1 },
    viewport: { once: true },
    transition: { duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] as any }
  };

  const handleCTANavigate = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (ctaLink) {
      navigate(ctaLink);
      window.scrollTo(0, 0);
    }
  };

  const Lightbox = () => (
    <AnimatePresence>
      {isLightboxOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[999999] bg-[#0a0a0a] flex flex-col backdrop-blur-2xl pointer-events-auto"
        >
          {/* Top Navigation */}
          <div className="flex justify-between items-center p-6 md:px-12 md:py-8 text-white z-[100]">
            <div className="flex flex-col gap-1">
              <span className="text-brand uppercase tracking-[0.4em] text-[9px] font-bold">{label || 'PRODUCT VIEW'}</span>
              <h2 className="font-serif text-xl md:text-2xl">{series}</h2>
            </div>
            
            <button 
              className="w-12 h-12 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-all border border-white/10 text-white/60 hover:text-white group"
              onClick={() => setIsLightboxOpen(false)}
            >
              <X size={24} weight="light" className="group-hover:rotate-90 transition-transform duration-500" />
            </button>
          </div>

          {/* Immersive Image Viewer */}
          <div 
            className="flex-grow relative overflow-hidden flex items-center justify-center p-4 md:p-12"
            onClick={() => setIsLightboxOpen(false)}
          >
            <div className="relative w-full h-full flex items-center justify-center">
              <img 
                src={img} 
                alt={series} 
                className="max-w-full max-h-full object-contain object-left select-none shadow-2xl scale-[1.12] origin-left"
              />
            </div>
          </div>

          {/* Content Overlay */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-8 md:p-12 bg-gradient-to-t from-black via-black/80 to-transparent text-white z-50 pointer-events-auto"
          >
            <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-end gap-12">
              <div className="flex-1 max-w-2xl text-left">
                {description && <p className="font-serif text-lg md:text-xl text-white/70 leading-relaxed mb-8 italic">"{description}"</p>}
                
                {/* MINTA PENAWARAN INSIDE GALLERY */}
                <button 
                  onClick={handleCTANavigate}
                  className="flex items-center gap-4 bg-brand text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest text-[11px] hover:bg-[#B8860B] transition-all shadow-xl shadow-brand/20"
                >
                  <ChatTeardropText size={20} weight="fill" />
                  Minta Penawaran
                </button>
              </div>
              
              {models && models.length > 0 && (
                <div className="w-full md:w-auto min-w-[320px] space-y-4 text-left">
                  <p className="framer-label text-white/20 text-[9px] tracking-[0.4em]">TECHNICAL SPECS</p>
                  <div className="grid grid-cols-1 gap-2">
                    {models.map(m => (
                      <div key={m.name} className="flex justify-between items-center py-2 border-b border-white/10">
                        <span className="text-white/90 text-xs font-bold">{m.name}</span>
                        <span className="text-brand/60 text-[10px] ml-10 font-mono uppercase">{m.dim || m.capacity || m.finishes}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  const cardInner = (
    <>
      <div 
        className="aspect-[16/10] overflow-hidden rounded-[12px] mb-8 bg-[#f5f5f0] cursor-zoom-in group relative"
        onClick={() => setIsLightboxOpen(true)}
      >
        <img 
          src={img} 
          alt={series} 
          className="w-full h-full object-cover object-left transition-transform duration-1000 group-hover:scale-125 scale-[1.12] origin-left" 
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500 flex items-center justify-center">
           <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 transition-all duration-500 shadow-2xl">
              <ArrowsOut size={24} className="text-white" weight="light" />
           </div>
        </div>
      </div>
      
      <div className="flex-grow flex flex-col">
        {label && <span className="framer-label text-brand mb-4 block tracking-wider text-[10px]">{label}</span>}
        <h4 className="font-serif text-[26px] mb-4 text-[#1a1c19] tracking-tight">{series}</h4>
        
        {description && (
          <p className="text-[14px] text-[#1a1c19]/70 mb-8 leading-relaxed">
            {description}
          </p>
        )}
        
        {models && models.length > 0 && (
          <div className="space-y-3 mb-8">
            {models.slice(0, 3).map(m => (
              <div key={m.name} className="flex justify-between items-center py-3 border-b border-[#1a1c19]/5 text-[11px]">
                <span className="font-bold">{m.name}</span>
                <span className="text-[#1a1c19]/50">{m.dim || m.capacity || m.finishes}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-auto pt-6 border-t border-[#1a1c19]/5 relative z-10">
        <button 
          onClick={() => setIsLightboxOpen(true)}
          className="w-full flex items-center justify-between group/btn py-3.5 px-5 rounded-xl transition-all bg-[#1a1c19] text-white hover:bg-brand cursor-pointer shadow-lg shadow-[#1a1c19]/10 hover:shadow-brand/20"
        >
          <span className="text-[10px] uppercase tracking-widest font-bold">Detail Produk</span>
          <div className="w-6 h-6 rounded-full flex items-center justify-center transition-all bg-white/10 group-hover/btn:bg-white/20">
            <ArrowsOut weight="bold" size={12} />
          </div>
        </button>
      </div>
    </>
  );

  return (
    <>
      <motion.div 
        {...fadeInUp}
        className={layout === 'row' ? "w-full" : "bg-white p-8 md:p-10 border border-[#1a1c19]/5 rounded-[20px] shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col h-full"}
      >
        {layout === 'row' ? (
          <article className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-7">
              <div 
                className="overflow-hidden rounded-[8px] bg-[#e5e5e0] cursor-zoom-in relative group shadow-lg"
                onClick={() => setIsLightboxOpen(true)}
              >
                <img 
                  src={img} 
                  alt={series} 
                  className="w-full aspect-[16/9] object-cover object-left transition-all duration-1000 group-hover:scale-110 scale-[1.12] origin-left" 
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 transition-all duration-500">
                    <ArrowsOut size={32} className="text-white" weight="light" />
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-4 lg:col-start-9 flex flex-col gap-6">
              {label && <span className="framer-label text-brand text-[10px] tracking-[0.3em]">{label}</span>}
              <h3 className="font-serif text-[36px] leading-tight text-[#1a1c19] tracking-tight">{series}</h3>
              {description && <p className="framer-body !text-[16px] text-[#1a1c19]/80 leading-relaxed">{description}</p>}
              
              {models && models.length > 0 && (
                <div className="space-y-2 mt-4">
                  {models.map(m => (
                    <div key={m.name} className="flex justify-between items-center py-2 border-b border-[#1a1c19]/10 text-[12px]">
                      <span className="font-bold">{m.name}</span>
                      <span className="text-[#1a1c19]/60">{m.dim || m.capacity || m.finishes}</span>
                    </div>
                  ))}
                </div>
              )}

              <button 
                onClick={() => setIsLightboxOpen(true)}
                className="flex items-center justify-between group/btn py-5 px-8 rounded-full border transition-all mt-6 shadow-xl shadow-[#1a1c19]/5 border-brand text-brand hover:bg-brand hover:text-white cursor-pointer"
              >
                <span className="text-[11px] uppercase tracking-widest font-bold">Detail Produk</span>
                <ArrowsOut weight="bold" size={16} className="ml-4 group-hover/btn:scale-110 transition-transform" />
              </button>
            </div>
          </article>
        ) : cardInner}
      </motion.div>
      <Lightbox />
    </>
  );
};

export default ProductCard;
