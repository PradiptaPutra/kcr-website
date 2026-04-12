import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { List, X, MagnifyingGlass, InstagramLogo, LinkedinLogo } from '@phosphor-icons/react';
import { motion, AnimatePresence } from 'framer-motion';
import SearchModal from './SearchModal';

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => setIsOpen(false), [location.pathname]);

  useEffect(() => {
    if (isOpen || isSearchOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, isSearchOpen]);

  const links = [
    { n: 'Produk', p: '/catalog' },
    { n: 'Proyek', p: '/portfolio' },
    { n: 'Profil', p: '/about' },
    { n: 'Layanan', p: '/services' },
    { n: 'Kontak', p: '/contact' },
  ];

  // Logic: Transparent by default, subtle blur only when scrolled or menu is open
  const navBg = (scrolled || isOpen) 
    ? 'bg-[#F5F5F0]/80 backdrop-blur-xl' 
    : 'bg-transparent';

  // Logic: Text is white ONLY on the home hero (not scrolled, home page). Everything else is darker for visibility.
  const isHomeHero = isHome && !scrolled && !isOpen;
  const textColor = isHomeHero ? 'text-white' : 'text-[#2A2C2B]';

  return (
    <>
      <nav 
        className={`fixed top-0 w-full z-[10000] flex items-center transition-all duration-500 h-[72px] ${navBg}`}
      >
        <div className="framer-container w-full flex justify-between items-center relative">
          <Link to="/" aria-label="KCR Home" className={`text-[18px] font-serif font-normal tracking-[0.4em] z-[110] transition-colors duration-500 ${textColor}`}>
            KCR
          </Link>

          <div className="hidden lg:flex items-center gap-12 absolute left-1/2 -translate-x-1/2">
            {links.map((l) => (
              <Link 
                key={l.n} 
                to={l.p} 
                className={`framer-label font-bold transition-all duration-500 silent-hover ${textColor} ${location.pathname === l.p ? 'opacity-100 border-b border-current' : 'opacity-60'}`}
              >
                {l.n}
              </Link>
            ))}
          </div>
          <div className={`hidden lg:flex items-center gap-8 ${textColor}`}>
            <button 
              className="opacity-40 hover:opacity-100 transition-opacity"
              aria-label="Search"
              onClick={() => setIsSearchOpen(true)}
            >
              <MagnifyingGlass weight="light" size={20} />
            </button>
          </div>

          <button 
            className={`lg:hidden z-[110] transition-colors duration-500 ${textColor}`} 
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? <X weight="light" size={26} /> : <List weight="light" size={26} />}
          </button>
        </div>
      </nav>

      {/* Global Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-[#F5F5F0] z-[90] flex flex-col pt-32 pb-12 px-8 sm:px-12 lg:hidden overflow-y-auto"
          >
            <div className="flex flex-col gap-10">
              <div>
                <span className="framer-label opacity-20 mb-6 block tracking-[0.6em] text-[10px]">Navigasi</span>
                <div className="flex flex-col gap-6">
                  {links.map((l, i) => (
                    <motion.div
                      key={l.n}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.1 * i }}
                    >
                      <Link 
                        to={l.p} 
                        className={`font-serif text-[32px] sm:text-[42px] transition-all leading-tight block ${location.pathname === l.p ? 'text-[#1a1c19]' : 'text-[#1a1c19]/40'}`}
                      >
                        {l.n}
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="mt-8 flex flex-col gap-8">
                <div>
                  <span className="framer-label opacity-20 mb-4 block tracking-[0.6em] text-[10px]">Pencarian</span>
                  <div 
                    className="relative cursor-text"
                    onClick={() => {
                      setIsOpen(false);
                      setIsSearchOpen(true);
                    }}
                  >
                    <div className="w-full bg-transparent border-b border-[#1a1c19]/10 py-3 text-[15px] opacity-40 font-sans">
                      Cari produk atau layanan...
                    </div>
                    <MagnifyingGlass className="absolute right-0 top-1/2 -translate-y-1/2 opacity-20" size={20} />
                  </div>
                </div>

                <div>
                  <span className="framer-label opacity-20 mb-4 block tracking-[0.6em] text-[10px]">Media Sosial</span>
                  <div className="flex gap-6">
                    <a href="#" className="w-10 h-10 rounded-full border border-[#1a1c19]/10 flex items-center justify-center opacity-60 hover:opacity-100 transition-all">
                      <InstagramLogo size={20} weight="light" />
                    </a>
                    <a href="#" className="w-10 h-10 rounded-full border border-[#1a1c19]/10 flex items-center justify-center opacity-60 hover:opacity-100 transition-all">
                      <LinkedinLogo size={20} weight="light" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
