import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MagnifyingGlass, X, ArrowRight, Package, HardHat } from '@phosphor-icons/react';
import { useNavigate } from 'react-router-dom';
import { kcrData } from '../data/kcrData';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<{
    type: 'product' | 'service';
    title: string;
    path: string;
    category?: string;
  }[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      setQuery('');
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const q = query.toLowerCase();
    const searchResults: typeof results = [];

    // Search Services
    kcrData.services.forEach(s => {
      if (s.title.toLowerCase().includes(q) || s.description.toLowerCase().includes(q)) {
        searchResults.push({ type: 'service', title: s.title, path: '/services' });
      }
    });

    // Search Products
    Object.entries(kcrData.products).forEach(([cat, prods]) => {
      if (Array.isArray(prods)) {
        prods.forEach(p => {
          if (p.series.toLowerCase().includes(q) || (p.description && p.description.toLowerCase().includes(q))) {
            searchResults.push({ 
              type: 'product', 
              title: p.series, 
              path: '/catalog',
              category: cat.charAt(0).toUpperCase() + cat.slice(1)
            });
          }
        });
      }
    });

    setResults(searchResults.slice(0, 8));
  }, [query]);

  const handleNavigate = (path: string) => {
    navigate(path);
    onClose();
    window.scrollTo(0, 0);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100000] bg-[#1a1c19]/95 backdrop-blur-xl flex justify-center p-4 md:p-20"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            className="w-full max-w-3xl flex flex-col gap-8"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex justify-between items-center text-white">
              <span className="framer-label text-brand tracking-[0.4em]">Pencarian Global</span>
              <button onClick={onClose} className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-all">
                <X size={20} />
              </button>
            </div>

            <div className="relative">
              <MagnifyingGlass className="absolute left-6 top-1/2 -translate-y-1/2 text-brand" size={24} />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Cari produk, layanan, atau solusi teknis..."
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-6 pl-16 pr-8 text-xl text-white placeholder:text-white/20 outline-none focus:border-brand/50 transition-all font-serif italic"
              />
            </div>

            <div className="flex-grow overflow-y-auto pr-4 no-scrollbar">
              {results.length > 0 ? (
                <div className="flex flex-col gap-2">
                  <span className="framer-label text-white/20 text-[10px] mb-4 block tracking-[0.2em]">Hasil Pencarian ({results.length})</span>
                  {results.map((r, i) => (
                    <button
                      key={i}
                      onClick={() => handleNavigate(r.path)}
                      className="w-full flex items-center justify-between p-6 rounded-xl bg-white/5 hover:bg-brand group transition-all text-left"
                    >
                      <div className="flex items-center gap-6">
                        <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/40 group-hover:text-white transition-colors">
                          {r.type === 'product' ? <Package size={20} /> : <HardHat size={20} />}
                        </div>
                        <div>
                          <span className="text-[10px] uppercase tracking-widest text-brand group-hover:text-white/60 transition-colors font-bold block mb-1">
                            {r.type === 'product' ? `Produk / ${r.category}` : 'Layanan Teknik'}
                          </span>
                          <h3 className="text-white text-lg font-serif">{r.title}</h3>
                        </div>
                      </div>
                      <ArrowRight className="text-white opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all" />
                    </button>
                  ))}
                </div>
              ) : query.trim() ? (
                <div className="text-center py-20">
                  <p className="text-white/40 italic">Tidak ada hasil ditemukan untuk "{query}"</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-8 rounded-2xl bg-white/5 border border-white/5">
                    <span className="framer-label text-brand text-[10px] mb-4 block">Saran Produk</span>
                    <div className="flex flex-col gap-3">
                      {['Prime Series', 'Moderna Series', 'Fermi Series'].map(s => (
                        <button key={s} onClick={() => setQuery(s)} className="text-white/60 hover:text-white text-left text-sm transition-colors flex items-center gap-2">
                          <ArrowRight size={12} className="text-brand" /> {s}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="p-8 rounded-2xl bg-white/5 border border-white/5">
                    <span className="framer-label text-brand text-[10px] mb-4 block">Saran Layanan</span>
                    <div className="flex flex-col gap-3">
                      {['Shotcrete', 'Prefabrication', 'Interior'].map(s => (
                        <button key={s} onClick={() => setQuery(s)} className="text-white/60 hover:text-white text-left text-sm transition-colors flex items-center gap-2">
                          <ArrowRight size={12} className="text-brand" /> {s}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SearchModal;
