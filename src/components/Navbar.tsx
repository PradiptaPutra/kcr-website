import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { List, X, InstagramLogo, CaretDown } from '@phosphor-icons/react';
import { motion, AnimatePresence } from 'framer-motion';
import { kcrData } from '../data/kcrData';

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;

      window.requestAnimationFrame(() => {
        setScrolled((prev) => {
          const y = window.scrollY;
          return prev ? y > 12 : y > 28;
        });
        ticking = false;
      });
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setActiveDropdown(null);
  }, [location.pathname, location.search]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  const links = [
    { 
      n: 'Solusi Proyek', 
      p: '/catalog',
      subLinks: [
        { n: 'Solusi Perkantoran', p: '/catalog?category=workstations' },
        { n: 'Solusi Perhotelan', p: '/catalog?category=hospitality' },
        { n: 'Instansi Pemerintah', p: '/catalog?category=executive' },
        { n: 'Ruang Edukasi', p: '/catalog?category=others' },
      ]
    },
    { n: 'Profil', p: '/about' },
    { n: 'Layanan', p: '/services' },
    { n: 'Kontak', p: '/contact' },
  ];

  const isScrolled = scrolled || isOpen;
  
  const navContainerClasses = isScrolled
    ? 'w-full bg-[#F5F5F0]/92 supports-[backdrop-filter]:bg-[#F5F5F0]/84 supports-[backdrop-filter]:backdrop-blur-xl border-b border-[#1A1C19]/10 px-6 md:px-12 xl:px-16 shadow-[0_6px_18px_rgba(26,28,25,0.06)]'
    : 'w-full bg-[#F5F5F0]/90 supports-[backdrop-filter]:bg-[#F5F5F0]/80 supports-[backdrop-filter]:backdrop-blur-xl border-b border-[#1A1C19]/8 px-6 md:px-12 xl:px-16';

  const textColor = 'text-[#1A1C19]';

  return (
    <>
      <nav className="fixed inset-x-0 top-0 z-[10000]">
        <div
          className={`mx-auto flex items-center h-[64px] md:h-[72px] transition-[margin,width,border-radius,padding,background-color,backdrop-filter,box-shadow] duration-[350ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${navContainerClasses}`}
        >
          <div className="w-full flex justify-between items-center relative">
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
                onMouseEnter={() => l.subLinks && setActiveDropdown(l.n)}
                onMouseLeave={() => setActiveDropdown(null)}
                className="relative py-4"
              >
                <Link 
                  to={l.p} 
                  className={`framer-label !font-bold transition-all duration-500 flex items-center gap-1.5 py-2 px-3 rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand ${textColor} ${location.pathname === l.p || (l.subLinks && l.subLinks.some(s => location.pathname + location.search === s.p)) ? 'opacity-100 bg-[#1A1C19]/5' : 'opacity-60 hover:opacity-100 hover:bg-[#1A1C19]/5'}`}
                  aria-current={location.pathname === l.p ? 'page' : undefined}
                >
                  {l.n}
                  {l.subLinks && <CaretDown size={12} weight="bold" className={`transition-transform duration-300 ${activeDropdown === l.n ? 'rotate-180' : ''}`} />}
                </Link>

                {l.subLinks && (
                  <AnimatePresence>
                    {activeDropdown === l.n && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="absolute top-full left-0 mt-1 min-w-[220px] bg-white rounded-xl shadow-xl border border-[#1A1C19]/5 py-3 overflow-hidden"
                      >
                        {l.subLinks.map((sub) => (
                          <Link
                            key={sub.n}
                            to={sub.p}
                            className="block px-6 py-3 text-[11px] font-bold uppercase tracking-[0.15em] text-[#1A1C19]/70 hover:text-brand hover:bg-[#F5F5F0] transition-colors"
                          >
                            {sub.n}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </motion.div>
            ))}
          </div>

          <div className="hidden lg:block">
            <Link
              to="/contact"
              className="cta-primary !px-6 !py-2.5 !text-[9px] !tracking-[0.2em]"
            >
              Konsultasi Proyek
            </Link>
          </div>
          
          <button 
            className={`lg:hidden z-[110] transition-colors duration-500 rounded-full p-1.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand ${textColor}`} 
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? <X weight="light" size={26} /> : <List weight="light" size={26} />}
          </button>
          </div>
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
                <div className="flex flex-col gap-6">
                  {links.map((l, i) => (
                    <motion.div
                      key={l.n}
                      initial={{ x: -30, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.1 * i, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                      className="flex flex-col gap-4"
                    >
                      <Link 
                        to={l.p} 
                        className={`font-serif text-[32px] sm:text-[40px] transition-all leading-tight block tracking-tight rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand ${location.pathname === l.p ? 'text-[#1A1C19]' : 'text-[#1A1C19]/45 hover:text-[#1A1C19]/75'}`}
                        aria-current={location.pathname === l.p ? 'page' : undefined}
                      >
                        {l.n}
                      </Link>
                      
                      {l.subLinks && (
                        <div className="flex flex-col gap-3 pl-4 border-l border-[#1A1C19]/10 ml-1">
                          {l.subLinks.map((sub) => (
                            <Link
                              key={sub.n}
                              to={sub.p}
                              className="text-[13px] font-bold uppercase tracking-[0.2em] text-[#1A1C19]/60 hover:text-brand transition-colors py-1"
                            >
                              {sub.n}
                            </Link>
                          ))}
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="mt-12 flex flex-col gap-12">
                <div>
                  <span className="framer-label opacity-20 mb-6 block tracking-[0.6em] text-[10px]">Media Sosial</span>
                  <div className="flex gap-8">
                    <a href="#" className="w-12 h-12 rounded-full border border-[#1A1C19]/10 flex items-center justify-center opacity-40 hover:opacity-100 hover:border-[#1A1C19] transition-all">
                      <InstagramLogo size={24} weight="light" />
                    </a>
                  </div>
                </div>

                <Link
                  to="/contact"
                  className="cta-primary w-full text-center"
                >
                  Konsultasi Proyek
                </Link>

                <div className="mt-4 pt-8 border-t border-[#1A1C19]/5">
                  <p className="text-[10px] text-[#1A1C19]/40 uppercase tracking-[0.2em] font-medium leading-relaxed">
                    {kcrData.company.branding}
                  </p>
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
