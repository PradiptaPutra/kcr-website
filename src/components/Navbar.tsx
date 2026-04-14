import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { List, X, MagnifyingGlass, InstagramLogo, LinkedinLogo } from '@phosphor-icons/react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => setIsOpen(false), [location.pathname]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  const links = [
    { n: 'Produk', p: '/catalog' },
    { n: 'Proyek', p: '/portfolio' },
    { n: 'Profil', p: '/about' },
    { n: 'Layanan', p: '/services' },
    { n: 'Kontak', p: '/contact' },
  ];

  // Logic: Use a clean background without bottom border to avoid "white line" glitches on scroll
  const navBg = (scrolled || isOpen) 
    ? 'bg-[#F5F5F0]/90 backdrop-blur-2xl shadow-sm' 
    : 'bg-transparent';

  const isHomeHero = isHome && !scrolled && !isOpen;
  const textColor = isHomeHero ? 'text-white' : 'text-[#1A1C19]';

  return (
    <>
      <nav 
        className={`fixed top-0 w-full z-[10000] flex items-center transition-all duration-700 h-[72px] ${navBg}`}
      >
        <div className="framer-container w-full flex justify-between items-center relative">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link 
              to="/" 
              aria-label="KCR Furniture Home" 
              className={`text-[16px] font-serif font-bold tracking-[0.5em] z-[110] transition-colors duration-500 uppercase ${textColor}`}
            >
              KCR FURNITURE
            </Link>
          </motion.div>

          <div className="hidden lg:flex items-center gap-10 absolute left-1/2 -translate-x-1/2">
            {links.map((l, i) => (
              <motion.div
                key={l.n}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 * i, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link 
                  to={l.p} 
                  className={`framer-label !font-bold transition-all duration-500 relative py-2 ${textColor} ${location.pathname === l.p ? 'opacity-100' : 'opacity-40 hover:opacity-100'}`}
                >
                  {l.n}
                  {location.pathname === l.p && (
                    <motion.div 
                      layoutId="nav-underline" 
                      className="absolute bottom-0 left-0 w-full h-px bg-current"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              </motion.div>
            ))}
          </div>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className={`hidden lg:flex items-center gap-8 ${textColor}`}
          >
            <button 
              className="opacity-40 hover:opacity-100 transition-opacity"
              aria-label="Search"
            >
              <MagnifyingGlass weight="light" size={20} />
            </button>
          </motion.div>

          <button 
            className={`lg:hidden z-[110] transition-colors duration-500 ${textColor}`} 
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? <X weight="light" size={26} /> : <List weight="light" size={26} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 bg-[#F5F5F0] z-[90] flex flex-col pt-32 pb-12 px-8 sm:px-12 lg:hidden overflow-y-auto"
          >
            <div className="flex flex-col gap-10">
              <div>
                <span className="framer-label opacity-20 mb-8 block tracking-[0.6em] text-[10px]">Navigasi</span>
                <div className="flex flex-col gap-8">
                  {links.map((l, i) => (
                    <motion.div
                      key={l.n}
                      initial={{ x: -30, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.1 * i, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <Link 
                        to={l.p} 
                        className={`font-serif text-[40px] sm:text-[56px] transition-all leading-tight block tracking-tight ${location.pathname === l.p ? 'text-[#1A1C19]' : 'text-[#1A1C19]/30'}`}
                      >
                        {l.n}
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="mt-12 flex flex-col gap-12">
                <div>
                  <span className="framer-label opacity-20 mb-6 block tracking-[0.6em] text-[10px]">Pencarian</span>
                  <div className="relative">
                    <input 
                      type="text" 
                      placeholder="Cari produk furnitur..."
                      className="w-full bg-transparent border-b border-[#1A1C19]/10 py-4 text-[18px] focus:outline-none focus:border-[#1A1C19]/40 transition-all font-sans"
                    />
                    <MagnifyingGlass className="absolute right-0 top-1/2 -translate-y-1/2 opacity-20" size={24} />
                  </div>
                </div>

                <div>
                  <span className="framer-label opacity-20 mb-6 block tracking-[0.6em] text-[10px]">Media Sosial</span>
                  <div className="flex gap-8">
                    <a href="#" className="w-12 h-12 rounded-full border border-[#1A1C19]/10 flex items-center justify-center opacity-40 hover:opacity-100 hover:border-[#1A1C19] transition-all">
                      <InstagramLogo size={24} weight="light" />
                    </a>
                    <a href="#" className="w-12 h-12 rounded-full border border-[#1A1C19]/10 flex items-center justify-center opacity-40 hover:opacity-100 hover:border-[#1A1C19] transition-all">
                      <LinkedinLogo size={24} weight="light" />
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
