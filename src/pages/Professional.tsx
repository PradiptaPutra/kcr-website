import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import { kcrData } from '../data/kcrData';

const Professional: React.FC = () => {
  const fadeInUp = {
    initial: { y: 20, opacity: 0 },
    whileInView: { y: 0, opacity: 1 },
    viewport: { once: true },
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as any },
  };

  return (
    <div className="bg-[#F5F5F0] min-h-screen pt-24 pb-24 md:pb-40 selection:bg-[#1A1C19] selection:text-white">
      <SEO
        title="KCR Professional Program | B2B Project Pathway"
        description="Program B2B KCR untuk procurement, fit-out, dan rollout multi-lokasi dengan respon prioritas 24 jam."
        keywords="KCR Professional Program, B2B furniture, office fit-out, procurement"
        canonicalUrl="/professional"
      />

      <section className="framer-container grid grid-cols-1 lg:grid-cols-12 gap-10 mb-20">
        <motion.article {...fadeInUp} className="lg:col-span-7 bg-white border border-[#1A1C19]/10 rounded-[4px] p-8 md:p-12 shadow-premium">
          <p className="framer-label text-brand mb-6 block">Program Benefits</p>
          <ul className="space-y-4">
            {(kcrData.professionalProgram?.benefits || []).map((benefit) => (
              <li key={benefit} className="text-[15px] text-[#1A1C19]/80 leading-relaxed border-b border-[#1A1C19]/5 pb-4">
                {benefit}
              </li>
            ))}
          </ul>
        </motion.article>

        <motion.article {...fadeInUp} transition={{ delay: 0.1 }} className="lg:col-span-5 bg-[#1A1C19] text-white rounded-[4px] p-8 md:p-12 shadow-premium space-y-8">
          <p className="framer-label text-brand">Fast Track Inquiry</p>
          <h3 className="font-serif text-3xl leading-tight">Dedicated B2B Support in 24 Hours</h3>
          <p className="text-[14px] text-white/70 leading-relaxed">
            Kirim brief proyek Anda melalui jalur profesional untuk mendapatkan respons prioritas dan account lead dedicated.
          </p>
          <Link
            to="/contact?mode=professional"
            className="inline-flex items-center justify-center rounded-full bg-brand px-8 py-4 text-[10px] font-bold uppercase tracking-[0.25em] text-white transition hover:bg-white hover:text-[#1A1C19]"
          >
            Start Professional Inquiry
          </Link>
        </motion.article>
      </section>

      <section className="framer-container">
        <motion.div {...fadeInUp} className="bg-white border border-[#1A1C19]/10 rounded-[4px] p-8 md:p-12 shadow-premium">
          <p className="framer-label text-brand mb-8 block">How it Works</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {(kcrData.professionalProgram?.process || []).map((step, index) => (
              <div key={step} className="border border-[#1A1C19]/10 rounded-[4px] p-6">
                <p className="text-[11px] uppercase tracking-[0.25em] text-brand mb-2">Step {index + 1}</p>
                <p className="text-[14px] text-[#1A1C19]/80 leading-relaxed">{step}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Professional;
