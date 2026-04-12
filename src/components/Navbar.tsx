import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { List, X, MagnifyingGlass } from '@phosphor-icons/react';
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
              className="opacity-40 transition-opacity"
              aria-label="Search"
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

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 bg-[#F5F5F0] z-[90] flex flex-col justify-center px-12 lg:hidden"
          >
            <div className="flex flex-col gap-8">
              <span className="framer-label opacity-20 mb-4 tracking-[0.6em]">Navigasi</span>
              {links.map((l, i) => (
                <motion.div
                  key={l.n}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.1 * i }}
                >
                  <Link 
                    to={l.p} 
                    className={`font-serif text-[42px] transition-all leading-tight ${location.pathname === l.p ? 'text-[#1a1c19]' : 'text-[#1a1c19]/40'}`}
                  >
                    {l.n}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
