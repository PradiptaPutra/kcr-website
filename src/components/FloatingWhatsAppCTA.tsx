import React from 'react';
import { WhatsappLogo } from '@phosphor-icons/react';
import { kcrData } from '../data/kcrData';
import { trackEvent } from '../utils/analytics';

const FloatingWhatsAppCTA: React.FC = () => {
  const handleClick = () => {
    trackEvent('whatsapp_cta_click', { location: 'floating_cta' });
    const message = encodeURIComponent('Halo KCR Furniture, saya ingin konsultasi proyek furnitur.');
    window.open(`https://wa.me/${kcrData.contact.whatsapp}?text=${message}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-5 right-5 z-[9999] inline-flex items-center gap-2 rounded-full border border-[#1A1C19]/10 bg-white px-4 py-2 shadow-xl shadow-[#1A1C19]/10 transition hover:-translate-y-0.5 hover:bg-[#1A1C19] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
      aria-label="Hubungi KCR Furniture via WhatsApp"
    >
      <WhatsappLogo size={18} weight="fill" />
      <span className="text-[10px] font-bold uppercase tracking-[0.16em]">WhatsApp</span>
    </button>
  );
};

export default FloatingWhatsAppCTA;
