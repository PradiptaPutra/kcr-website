import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'react-router-dom';
import { MagnifyingGlass, X, ArrowRight, Clock, TrendUp } from '@phosphor-icons/react';
import { kcrData } from '../data/kcrData';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[99999] flex flex-col bg-[#F5F5F0] overflow-y-auto"
        >
          {/* Header */}
          <div className="h-[100px] border-b border-[#1a1c19]/5 flex items-center px-8 md:px-12">
            <div className="max-w-7xl mx-auto w-full flex items-center gap-6">
              <MagnifyingGlass size={32} weight="light" className="text-brand" />
              <input 
                autoFocus
                type="text" 
                placeholder="Cari koleksi furnitur..."
                className="flex-grow bg-transparent text-[24px] md:text-[32px] font-serif focus:outline-none placeholder:opacity-20 text-[#1a1c19]"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button 
                onClick={onClose}
                className="w-12 h-12 rounded-full bg-white border border-[#1a1c19]/10 flex items-center justify-center hover:bg-[#1a1c19] hover:text-white transition-all group"
              >
                <X size={24} weight="light" className="group-hover:rotate-90 transition-transform duration-500" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="flex-grow p-8 md:p-20">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-20">
              
              {/* Popular Searches */}
              <div className="lg:col-span-4 space-y-12">
                <div>
                  <span className="framer-label text-brand mb-8 block tracking-[0.4em]">TRENDING</span>
                  <div className="space-y-4">
                    {['Workstation Moderna', 'Meja Eksekutif Prime', 'Cosmo Bed Series', 'Custom Hospitality'].map(s => (
                      <button 
                        key={s} 
                        className="flex items-center gap-4 text-lg hover:text-brand transition-colors group w-full text-left"
                        onClick={() => setQuery(s)}
                      >
                        <TrendUp size={20} className="opacity-20 group-hover:opacity-100" />
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="framer-label text-brand mb-8 block tracking-[0.4em]">KATEGORI</span>
                  <div className="flex flex-wrap gap-3">
                    {['Office', 'Hospitality', 'Custom', 'Interior'].map(s => (
                      <button 
                        key={s} 
                        className="px-6 py-2.5 rounded-full border border-[#1a1c19]/10 text-xs font-bold uppercase tracking-widest hover:bg-brand hover:text-white hover:border-brand transition-all"
                        onClick={() => setQuery(s)}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Suggestions / Results */}
              <div className="lg:col-span-7 lg:col-start-6">
                <span className="framer-label opacity-30 mb-8 block tracking-[0.4em]">DISARANKAN</span>
                <div className="space-y-12">
                   {[
                     { t: 'Manufaktur CNC Presisi', d: 'Teknologi CNC standar Eropa untuk detail furnitur sempurna.', p: '/services' },
                     { t: 'Katalog Office Furniture', d: 'Koleksi lengkap workstation and meja eksekutif modern.', p: '/catalog' },
                     { t: 'Portofolio Hospitality', d: 'Arsip proyek furnitur hotel and resort premium.', p: '/portfolio' }
                   ].map((item, idx) => (
                     <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        key={item.t} 
                        className="group cursor-pointer border-b border-[#1a1c19]/5 pb-8"
                      >
                       <div className="flex justify-between items-end mb-4">
                          <h3 className="font-serif text-[28px] group-hover:text-brand transition-colors">{item.t}</h3>
                          <ArrowRight size={24} className="opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all text-brand" />
                       </div>
                       <p className="framer-body !text-sm opacity-60">{item.d}</p>
                     </motion.div>
                   ))}
                </div>
              </div>

            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SearchModal;
