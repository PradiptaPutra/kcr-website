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
    initial: { y: 30, opacity: 0 },
    whileInView: { y: 0, opacity: 1 },
    viewport: { once: true },
    transition: { duration: 1, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] as any }
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
          className="fixed inset-0 z-[999999] bg-[#0a0a0a] flex flex-col backdrop-blur-3xl pointer-events-auto"
        >
          {/* Top Navigation */}
          <div className="flex justify-between items-center p-6 md:px-12 md:py-8 text-white z-[100]">
            <div className="flex flex-col gap-1">
              <span className="text-brand uppercase tracking-[0.4em] text-[9px] font-bold">{label || 'PRODUCT VIEW'}</span>
              <h2 className="font-serif text-xl md:text-3xl">{series}</h2>
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
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full h-full flex items-center justify-center"
            >
              <img 
                src={img} 
                alt={series} 
                className="max-w-full max-h-full object-contain select-none shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)]"
              />
            </motion.div>
          </div>

          {/* Content Overlay */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 1 }}
            className="p-8 md:p-12 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/90 to-transparent text-white z-50 pointer-events-auto"
          >
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-end gap-16">
              <div className="flex-1 max-w-2xl text-left">
                {description && <p className="font-serif text-xl md:text-2xl text-white/80 leading-relaxed mb-10 font-light">"{description}"</p>}
                
                <button 
                  onClick={handleCTANavigate}
                  className="flex items-center gap-6 bg-brand text-white px-10 py-5 rounded-full font-bold uppercase tracking-widest text-[11px] hover:bg-[#A67C52] transition-all shadow-2xl shadow-brand/20 active:scale-95"
                >
                  <ChatTeardropText size={24} weight="fill" />
                  Request Technical Consultation
                </button>
              </div>
              
              {models && models.length > 0 && (
                <div className="w-full md:w-auto min-w-[360px] space-y-6 text-left bg-white/5 p-8 rounded-2xl backdrop-blur-md border border-white/10">
                  <p className="framer-label text-white/40 text-[9px] tracking-[0.5em]">TECHNICAL SPECIFICATIONS</p>
                  <div className="grid grid-cols-1 gap-2">
                    {models.map(m => (
                      <div key={m.name} className="flex justify-between items-center py-3 border-b border-white/5">
                        <span className="text-white/90 text-[13px] font-medium">{m.name}</span>
                        <span className="text-brand text-[11px] ml-10 font-mono uppercase tracking-tighter opacity-80">{m.dim || m.capacity || m.finishes}</span>
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
        className="aspect-[4/5] overflow-hidden rounded-[4px] mb-8 bg-[#f0f0eb] cursor-zoom-in group relative shadow-premium"
        onClick={() => setIsLightboxOpen(true)}
      >
        <img 
          src={img} 
          alt={series} 
          className="w-full h-full object-cover transition-transform duration-[1.5s] ease-[var(--ease-out)] group-hover:scale-110" 
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-[#1A1C19]/10 transition-all duration-700 flex items-center justify-center">
           <div className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 transition-all duration-700">
              <ArrowsOut size={24} className="text-white" weight="light" />
           </div>
        </div>
      </div>
      
      <div className="flex-grow flex flex-col">
        {label && <span className="framer-label text-brand mb-4 block tracking-[0.4em]">{label}</span>}
        <h4 className="font-serif text-[28px] mb-4 text-[#1A1C19] tracking-tight font-medium leading-tight">{series}</h4>
        
        {description && (
          <p className="text-[15px] text-[#1A1C19]/60 mb-10 leading-relaxed max-w-[90%]">
            {description}
          </p>
        )}
      </div>

      <div className="mt-auto pt-8 border-t border-[#1A1C19]/5 relative z-10">
        <button 
          onClick={() => setIsLightboxOpen(true)}
          className="w-full flex items-center justify-between group/btn py-4.5 px-6 rounded-full transition-all bg-transparent border border-[#1A1C19]/10 text-[#1A1C19] hover:bg-[#1A1C19] hover:text-white cursor-pointer"
        >
          <span className="text-[10px] uppercase tracking-[0.4em] font-bold">Detail Koleksi</span>
          <div className="w-8 h-8 rounded-full flex items-center justify-center transition-all bg-[#1A1C19]/5 group-hover/btn:bg-white/20">
            <ArrowsOut weight="bold" size={14} />
          </div>
        </button>
      </div>
    </>
  );

  return (
    <>
      <motion.div 
        {...fadeInUp}
        className={layout === 'row' ? "w-full" : "bg-white p-10 border border-[#1A1C19]/5 rounded-[4px] shadow-premium hover:shadow-premium-hover transition-all duration-700 flex flex-col h-full"}
      >
        {layout === 'row' ? (
          <article className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-7">
              <div 
                className="overflow-hidden rounded-[4px] bg-[#f0f0eb] cursor-zoom-in relative group shadow-premium"
                onClick={() => setIsLightboxOpen(true)}
              >
                <img 
                  src={img} 
                  alt={series} 
                  className="w-full aspect-[16/10] object-cover transition-all duration-[1.5s] ease-[var(--ease-out)] group-hover:scale-105" 
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-[#1A1C19]/10 transition-all duration-700 flex items-center justify-center">
                  <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 transition-all duration-700">
                    <ArrowsOut size={32} className="text-white" weight="light" />
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-4 lg:col-start-9 flex flex-col gap-6">
              {label && <span className="framer-label text-brand text-[10px] tracking-[0.5em]">{label}</span>}
              <h3 className="font-serif text-[42px] leading-[1.1] text-[#1A1C19] tracking-tight font-medium">{series}</h3>
              {description && <p className="framer-body !text-[17px] text-[#1A1C19]/60 leading-relaxed font-light">{description}</p>}
              
              {models && models.length > 0 && (
                <div className="space-y-3 mt-6 border-y border-[#1A1C19]/5 py-6">
                  {models.map(m => (
                    <div key={m.name} className="flex justify-between items-center text-[12px]">
                      <span className="font-bold uppercase tracking-widest text-[10px] opacity-40">{m.name}</span>
                      <span className="text-[#1A1C19] font-mono">{m.dim || m.capacity || m.finishes}</span>
                    </div>
                  ))}
                </div>
              )}

              <button 
                onClick={() => setIsLightboxOpen(true)}
                className="flex items-center justify-between group/btn py-6 px-10 rounded-full border transition-all mt-8 border-brand text-brand hover:bg-brand hover:text-white cursor-pointer shadow-xl shadow-brand/5 hover:shadow-brand/20"
              >
                <span className="text-[11px] uppercase tracking-[0.4em] font-bold">Detail Koleksi</span>
                <ArrowsOut weight="bold" size={18} className="ml-4 group-hover/btn:rotate-45 transition-transform duration-500" />
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
