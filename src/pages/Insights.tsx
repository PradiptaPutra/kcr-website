import React from 'react';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import PageHeader from '../components/PageHeader';
import { kcrData } from '../data/kcrData';

const Insights: React.FC = () => {
  const fadeInUp = {
    initial: { y: 20, opacity: 0 },
    whileInView: { y: 0, opacity: 1 },
    viewport: { once: true },
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as any },
  };

  return (
    <div className="bg-[#F5F5F0] min-h-screen pt-24 pb-24 md:pb-40 selection:bg-[#1A1C19] selection:text-white">
      <SEO
        title="Workspace Insights | KCR Furniture"
        description="Insight, panduan, dan catatan implementasi untuk pengembangan ruang kerja dan hospitality."
        keywords="workspace insights, office furniture guide, fit-out implementation"
        canonicalUrl="/insights"
      />

      <PageHeader
        label="08 / INSIGHTS"
        title="Knowledge"
        subtitle={<><span className="text-brand font-serif-italic">Hub</span></>}
        description="Panduan praktis untuk membantu tim proyek mengambil keputusan desain dan implementasi lebih cepat."
      />

      <section className="framer-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {kcrData.insights.map((item, idx) => (
          <motion.article
            key={item.id}
            {...fadeInUp}
            transition={{ delay: idx * 0.07 }}
            className="bg-white border border-[#1A1C19]/10 rounded-[4px] p-8 shadow-premium h-full flex flex-col"
          >
            <div className="mb-6 flex items-center justify-between">
              <span className="text-[10px] uppercase tracking-[0.2em] text-brand font-bold">{item.type}</span>
              <span className="text-[10px] uppercase tracking-[0.12em] text-[#1A1C19]/45">{item.readTime}</span>
            </div>
            <h3 className="font-serif text-[28px] leading-tight text-[#1A1C19] mb-5">{item.title}</h3>
            <p className="text-[14px] leading-relaxed text-[#1A1C19]/70">{item.summary}</p>
            <div className="mt-auto pt-8">
              <span className="inline-flex rounded-full border border-[#1A1C19]/15 px-4 py-2 text-[10px] uppercase tracking-[0.2em] text-[#1A1C19]/70">
                Coming soon
              </span>
            </div>
          </motion.article>
        ))}
      </section>
    </div>
  );
};

export default Insights;
