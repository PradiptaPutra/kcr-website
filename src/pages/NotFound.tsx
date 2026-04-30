import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';

const NotFound: React.FC = () => {
  return (
    <div className="bg-[#F5F5F0] min-h-[80vh] pt-24 pb-32 flex flex-col items-center justify-center selection:bg-[#1A1C19] selection:text-white">
      <SEO
        title="Halaman Tidak Ditemukan | KCR Furniture"
        description="Maaf, halaman yang Anda cari tidak ditemukan di KCR Furniture."
        canonicalUrl="/404"
      />
      
      <div className="framer-container text-center max-w-2xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="framer-label text-brand mb-6 block tracking-[0.5em]">ERROR 404</span>
          <h1 className="font-serif text-[60px] md:text-[80px] leading-tight text-[#1A1C19] mb-6">
            Halaman Tidak <br/><span className="font-serif-italic text-brand">Ditemukan.</span>
          </h1>
          <p className="text-[16px] text-[#1A1C19]/60 leading-relaxed mb-10">
            Maaf, kami tidak dapat menemukan halaman yang Anda tuju. Halaman mungkin telah dipindahkan atau URL yang dimasukkan salah.
          </p>
          <Link to="/" className="cta-primary inline-flex">
            Kembali ke Beranda
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;
