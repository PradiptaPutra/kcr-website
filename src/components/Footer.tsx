import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUp, InstagramLogo } from '@phosphor-icons/react';
import { kcrData } from '../data/kcrData';

const Footer: React.FC = () => {
  const handleBackToTop = () => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
  };

  return (
    <footer className="bg-[#1a1c19] text-[#F5F5F0] relative overflow-hidden border-t-[0.5px] border-white/5">
      <div className="framer-container pt-16 pb-10 relative z-10">
        
        {/* MIDDLE ROW: Navigation Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-y-12 gap-x-8 mb-20">
          <div className="flex flex-col gap-6">
            <p className="framer-label text-brand !text-[10px]">Layanan</p>
            <ul className="flex flex-col gap-3 font-sans font-normal text-[13px] opacity-75">
              <li><Link to="/services" className="silent-hover">Furnitur Kantor</Link></li>
              <li><Link to="/services" className="silent-hover">Hospitality Custom</Link></li>
              <li><Link to="/services" className="silent-hover">Manufaktur CNC</Link></li>
              <li><Link to="/services" className="silent-hover">Interior Fit-Out</Link></li>
            </ul>
          </div>

          <div className="flex flex-col gap-6">
            <p className="framer-label text-brand !text-[10px]">Solusi Industri</p>
            <ul className="flex flex-col gap-3 font-sans font-normal text-[13px] opacity-75">
              <li><Link to="/catalog?category=workstations" className="silent-hover">Solusi Perkantoran</Link></li>
              <li><Link to="/catalog?category=hospitality" className="silent-hover">Solusi Perhotelan</Link></li>
              <li><Link to="/catalog?category=executive" className="silent-hover">Instansi Pemerintah</Link></li>
              <li><Link to="/catalog?category=others" className="silent-hover">Ruang Edukasi</Link></li>
            </ul>
          </div>

          <div className="flex flex-col gap-6">
            <p className="framer-label text-brand !text-[10px]">Eksplorasi</p>
            <ul className="flex flex-col gap-3 font-sans font-normal text-[13px] opacity-75">
              <li><Link to="/contact" className="silent-hover">Konsultasi Proyek</Link></li>
              <li><Link to="/case-studies" className="silent-hover">Studi Kasus</Link></li>
              <li><Link to="/insights" className="silent-hover">Wawasan Industri</Link></li>
              <li><Link to="/professional" className="silent-hover">Professional Program</Link></li>
            </ul>
          </div>

          <div className="flex flex-col gap-6">
            <p className="framer-label text-brand !text-[10px]">Terhubung</p>
            <ul className="flex flex-col gap-3 font-sans font-normal text-[13px] opacity-75">
              <li><a href="#" aria-label="Follow us on Instagram" className="flex items-center gap-2 silent-hover"><InstagramLogo weight="light" size={16} /> Instagram</a></li>
            </ul>
          </div>

          <div className="lg:col-span-2 flex flex-col gap-6 lg:pl-12 lg:border-l-[0.5px] border-white/5">
            <p className="framer-label text-brand !text-[10px]">Kantor Pusat</p>
            <div className="flex flex-col gap-6 font-sans font-normal text-[13px] opacity-75 leading-relaxed max-w-sm">
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
            <div className="space-y-1">
              <h3 className="text-[22px] font-serif font-normal tracking-tighter text-white uppercase">KCR FURNITURE</h3>
              <p className="text-[9px] text-brand/80 font-medium tracking-[0.2em] uppercase">{kcrData.company.branding}</p>
            </div>
              <p className="text-[10px] text-white/60 uppercase tracking-[0.25em] sm:tracking-[0.4em] leading-relaxed">
              © {new Date().getFullYear()} KCR FURNITURE.<br className="md:hidden"/> ALL RIGHTS RESERVED.
            </p>
          </div>

          <button 
            onClick={handleBackToTop}
            className="group flex w-full md:w-auto justify-between md:justify-start items-center gap-4 text-[10px] uppercase tracking-[0.25em] sm:tracking-[0.4em] text-white/60 hover:text-white transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
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
