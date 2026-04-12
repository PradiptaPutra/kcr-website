import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from '@phosphor-icons/react';

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
  accessories?: string[];
  index?: number;
  layout?: 'grid' | 'row';
  onImageClick?: (img: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ 
  series, 
  img, 
  description, 
  label, 
  models, 
  accessories,
  index = 0,
  layout = 'grid',
  onImageClick
}) => {
  const fadeInUp = {
    initial: { y: 20, opacity: 0 },
    whileInView: { y: 0, opacity: 1 },
    viewport: { once: true },
    transition: { duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] as any }
  };

  if (layout === 'row') {
    return (
      <motion.article 
        {...fadeInUp}
        className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center group"
      >
        <div 
          className="lg:col-span-7 overflow-hidden rounded-[8px] bg-[#e5e5e0] cursor-zoom-in"
          onClick={() => onImageClick && onImageClick(img)}
        >
          <img 
            src={img} 
            alt={series} 
            className="w-full aspect-[16/9] object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" 
          />
        </div>
        <div className="lg:col-span-4 lg:col-start-9 flex flex-col gap-6">
          {label && <span className="framer-label text-brand">{label}</span>}
          <h3 className="font-serif text-[32px] leading-tight text-[#1a1c19]">{series}</h3>
          {description && <p className="framer-body !text-[15px] text-[#1a1c19]/80 leading-relaxed">{description}</p>}
          
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

          <div className="flex items-center gap-3 text-brand mt-4">
            <span className="text-[11px] uppercase tracking-tighter font-bold">Minta Penawaran</span>
            <ArrowRight weight="bold" size={16} />
          </div>
        </div>
      </motion.article>
    );
  }

  return (
    <motion.div 
      {...fadeInUp}
      className="bg-white p-8 md:p-10 border border-[#1a1c19]/10 rounded-[20px] shadow-sm flex flex-col h-full"
    >
      <div 
        className="aspect-[16/10] overflow-hidden rounded-[12px] mb-8 bg-[#f5f5f0] cursor-zoom-in"
        onClick={() => onImageClick && onImageClick(img)}
      >
        <img 
          src={img} 
          alt={series} 
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" 
        />
      </div>
      
      {label && <span className="framer-label text-brand mb-4 block tracking-wider">{label}</span>}
      <h4 className="font-serif text-[28px] mb-4 text-[#1a1c19]">{series}</h4>
      
      {description && (
        <p className="text-[14px] text-[#1a1c19]/70 mb-8 leading-relaxed flex-grow">
          {description}
        </p>
      )}
      
      {models && models.length > 0 && (
        <div className="space-y-3 mb-8">
          {models.slice(0, 3).map(m => (
            <div key={m.name} className="flex justify-between items-center py-3 border-b border-[#1a1c19]/10 text-[12px]">
              <span className="font-bold">{m.name}</span>
              <span className="text-[#1a1c19]/60">{m.dim || m.capacity || m.finishes}</span>
            </div>
          ))}
          {models.length > 3 && (
            <p className="text-[10px] text-[#1a1c19]/40 italic">+{models.length - 3} model lainnya</p>
          )}
        </div>
      )}

      {accessories && accessories.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-8">
          {accessories.map(a => (
            <span key={a} className="text-[9px] bg-[#F5F5F0] text-[#1a1c19] px-2 py-1 rounded-full font-medium">
              {a}
            </span>
          ))}
        </div>
      )}

      <div className="flex items-center gap-3 text-brand mt-auto pt-4 border-t border-[#1a1c19]/10">
        <span className="text-[11px] uppercase tracking-tighter font-bold">Detail Produk</span>
        <ArrowRight weight="bold" size={16} />
      </div>
    </motion.div>
  );
};

export default ProductCard;
