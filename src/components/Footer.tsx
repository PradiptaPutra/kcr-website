import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUp, InstagramLogo, LinkedinLogo } from '@phosphor-icons/react';
import { kcrData } from '../data/kcrData';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#1a1c19] text-[#F5F5F0] relative overflow-hidden border-t-[0.5px] border-white/5">
      <div className="framer-container pt-16 pb-10 relative z-10">
        
        {/* MIDDLE ROW: Navigation Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-y-12 gap-x-8 mb-20">
          <div className="flex flex-col gap-6">
            <p className="framer-label text-brand !text-[10px]">Layanan</p>
            <ul className="flex flex-col gap-3 font-sans font-normal text-[13px] opacity-50">
              <li><Link to="/services" className="silent-hover">Kontraktor Bangunan</Link></li>
              <li><Link to="/services" className="silent-hover">Spesialis Shotcrete</Link></li>
              <li><Link to="/services" className="silent-hover">Sistem Prefabrikasi</Link></li>
            </ul>
          </div>

          <div className="flex flex-col gap-6">
            <p className="framer-label text-brand !text-[10px]">Eksplorasi</p>
            <ul className="flex flex-col gap-3 font-sans font-normal text-[13px] opacity-50">
              <li><Link to="/catalog" className="silent-hover">Katalog Produk</Link></li>
              <li><Link to="/portfolio" className="silent-hover">Arsip Proyek</Link></li>
              <li><Link to="/contact" className="silent-hover">Konsultasi</Link></li>
            </ul>
          </div>

          <div className="flex flex-col gap-6">
            <p className="framer-label text-brand !text-[10px]">Terhubung</p>
            <ul className="flex flex-col gap-3 font-sans font-normal text-[13px] opacity-50">
              <li><a href="#" aria-label="Follow us on Instagram" className="flex items-center gap-2 silent-hover"><InstagramLogo weight="light" size={16} /> Instagram</a></li>
              <li><a href="#" aria-label="Follow us on LinkedIn" className="flex items-center gap-2 silent-hover"><LinkedinLogo weight="light" size={16} /> LinkedIn</a></li>
            </ul>
          </div>

          <div className="lg:col-span-2 flex flex-col gap-6 lg:pl-12 lg:border-l-[0.5px] border-white/5">
            <p className="framer-label text-brand !text-[10px]">Kantor Pusat</p>
            <div className="flex flex-col gap-6 font-sans font-normal text-[13px] opacity-50 leading-relaxed max-w-sm">
              <p>{kcrData.contact.address}</p>
              <div className="flex flex-wrap gap-6 text-[11px] tracking-widest font-medium uppercase opacity-80">
                <a href={`tel:${kcrData.contact.phones[0]}`} className="text-brand">T. {kcrData.contact.phones[0]}</a>
                <a href={`mailto:${kcrData.contact.emails[1]}`} className="text-brand">E. {kcrData.contact.emails[1]}</a>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10 pt-10 border-t-[0.5px] border-white/5">
          <div className="flex flex-col gap-4">
            <h3 className="text-[22px] font-serif font-normal tracking-tighter text-white">KCR</h3>
            <p className="text-[10px] text-white/20 uppercase tracking-[0.4em] leading-relaxed">
              © {new Date().getFullYear()} PT. KARYA CIPTA RAHARJA.<br className="md:hidden"/> ALL RIGHTS RESERVED.
            </p>
          </div>

          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
            className="group flex items-center gap-4 text-[10px] uppercase tracking-[0.4em] text-white/30 hover:text-white transition-all"
            aria-label="Back to top"
          >
            <span>Back to Top</span>
            <div className="w-10 h-10 rounded-full border-[0.5px] border-white/10 flex items-center justify-center group-hover:border-brand transition-all">
              <ArrowUp weight="light" size={18} aria-hidden="true" />
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
