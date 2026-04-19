import React from 'react';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import PageHeader from '../components/PageHeader';
import { kcrData } from '../data/kcrData';

const CaseStudies: React.FC = () => {
  const fadeInUp = {
    initial: { y: 20, opacity: 0 },
    whileInView: { y: 0, opacity: 1 },
    viewport: { once: true },
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as any },
  };

  return (
    <div className="bg-[#F5F5F0] min-h-screen pt-24 pb-24 md:pb-40 selection:bg-[#1A1C19] selection:text-white">
      <SEO
        title="Project Case Studies | KCR Furniture"
        description="Lihat studi kasus implementasi furnitur KCR untuk kantor, hospitality, dan ruang publik."
        keywords="case studies furniture, office project, hospitality fit-out"
        canonicalUrl="/case-studies"
      />

      <PageHeader
        label="07 / CASE STUDIES"
        title="Project"
        subtitle={<><span className="text-brand font-serif-italic">Outcomes</span></>}
        description="Ringkasan proyek dengan cakupan, timeline, dan hasil terukur."
      />

      <section className="framer-container space-y-10">
        {kcrData.caseStudies.map((study, idx) => (
          <motion.article
            key={study.id}
            {...fadeInUp}
            transition={{ delay: idx * 0.08 }}
            className="bg-white border border-[#1A1C19]/10 rounded-[4px] p-6 md:p-10 shadow-premium"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-5 grid grid-cols-2 gap-4">
                <img src={study.beforeImage} alt={`${study.title} before`} className="w-full h-52 object-cover rounded-[4px]" loading="lazy" decoding="async" />
                <img src={study.afterImage} alt={`${study.title} after`} className="w-full h-52 object-cover rounded-[4px]" loading="lazy" decoding="async" />
              </div>
              <div className="lg:col-span-7 space-y-5">
                <p className="framer-label text-brand">{study.industry}</p>
                <h3 className="font-serif text-3xl text-[#1A1C19]">{study.title}</h3>
                <p className="text-[14px] text-[#1A1C19]/75 leading-relaxed">{study.scope}</p>
                <div className="inline-flex rounded-full bg-[#1A1C19]/5 px-4 py-2 text-[11px] uppercase tracking-[0.2em] text-[#1A1C19]/70">
                  Timeline: {study.timeline}
                </div>
                <ul className="space-y-2 pt-2">
                  {study.outcomes.map((outcome) => (
                    <li key={outcome} className="text-[13px] text-[#1A1C19]/80 leading-relaxed border-l-2 border-brand pl-3">
                      {outcome}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.article>
        ))}
      </section>
    </div>
  );
};

export default CaseStudies;
