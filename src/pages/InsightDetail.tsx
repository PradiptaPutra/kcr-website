import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Calendar, User, ShareNetwork } from '@phosphor-icons/react';
import SEO from '../components/SEO';
import { kcrData } from '../data/kcrData';

import DOMPurify from 'dompurify';

const InsightDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const insight = kcrData.insights.find((item) => item.id === id);

  useEffect(() => {
    if (!insight) {
      navigate('/404', { replace: true });
    }
    window.scrollTo(0, 0);
  }, [insight, navigate]);

  if (!insight) return null;

  const fadeInUp = {
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as any },
  };

  return (
    <div className="bg-[#F5F5F0] min-h-screen pt-32 pb-24 md:pb-40 selection:bg-[#1A1C19] selection:text-white">
      <SEO
        title={`${insight.title} | KCR Furniture Insights`}
        description={insight.summary}
        keywords={`furniture insights, ${insight.type}, office design, ${id}`}
        canonicalUrl={`/insights/${id}`}
      />

      <article className="framer-container max-w-4xl mx-auto">
        {/* Back Link */}
        <motion.div {...fadeInUp} className="mb-12">
          <Link
            to="/insights"
            className="inline-flex items-center text-[10px] uppercase tracking-[0.2em] text-[#1A1C19]/45 hover:text-brand transition-colors group"
          >
            <ArrowLeft className="w-3 h-3 mr-2 transform group-hover:-translate-x-1 transition-transform" />
            Back to Insights
          </Link>
        </motion.div>

        {/* Header */}
        <header className="mb-16">
          <motion.div {...fadeInUp} transition={{ delay: 0.1 }}>
            <span className="text-[10px] uppercase tracking-[0.3em] text-brand font-bold mb-6 block">
              08 / {insight.type}
            </span>
            <h1 className="font-serif text-[42px] md:text-[64px] leading-[1.1] text-[#1A1C19] mb-8">
              {insight.title}
            </h1>
          </motion.div>

          <motion.div
            {...fadeInUp}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap items-center gap-y-4 gap-x-8 pt-8 border-t border-[#1A1C19]/10"
          >
            <div className="flex items-center text-[11px] uppercase tracking-[0.15em] text-[#1A1C19]/60">
              <User size={14} weight="light" className="mr-2 text-brand" />
              {insight.author || 'KCR Editorial'}
            </div>
            <div className="flex items-center text-[11px] uppercase tracking-[0.15em] text-[#1A1C19]/60">
              <Calendar size={14} weight="light" className="mr-2 text-brand" />
              {insight.publishedAt || 'April 2024'}
            </div>
            <div className="flex items-center text-[11px] uppercase tracking-[0.15em] text-[#1A1C19]/60">
              <Clock size={14} weight="light" className="mr-2 text-brand" />
              {insight.readTime}
            </div>
            <button 
              className="ml-auto flex items-center text-[11px] uppercase tracking-[0.15em] text-[#1A1C19]/60 hover:text-brand transition-colors"
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: insight.title,
                    url: window.location.href,
                  });
                }
              }}
            >
              <ShareNetwork size={14} weight="light" className="mr-2" />
              Share
            </button>
          </motion.div>
        </header>

        {/* Content */}
        <motion.div
          {...fadeInUp}
          transition={{ delay: 0.3 }}
          className="article-content mb-24 break-words [&_img]:max-w-full [&_img]:h-auto [&_img]:rounded-lg"
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(insight.content || '') }}
        />

        {/* Footer / CTA */}
        <motion.div
          {...fadeInUp}
          transition={{ delay: 0.4 }}
          className="bg-white border border-[#1A1C19]/10 rounded-[4px] p-8 md:p-16 text-center"
        >
          <h3 className="font-serif text-[24px] md:text-[32px] text-[#1A1C19] mb-6">Butuh konsultasi proyek?</h3>
          <p className="text-[16px] text-[#1A1C19]/70 mb-10 max-w-xl mx-auto">
            Tim teknis kami siap membantu Anda mengoptimalkan spesifikasi furnitur dan layout ruang untuk hasil terbaik.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/contact"
              className="bg-brand text-white px-10 py-4 rounded-full text-[12px] uppercase tracking-[0.2em] font-bold hover:bg-[#1A1C19] transition-colors w-full sm:w-auto text-center"
            >
              Hubungi Kami
            </Link>
            <Link
              to="/catalog"
              className="border border-[#1A1C19]/15 px-10 py-4 rounded-full text-[12px] uppercase tracking-[0.2em] font-bold hover:bg-[#1A1C19]/5 transition-colors w-full sm:w-auto text-center"
            >
              Lihat Katalog
            </Link>
          </div>
        </motion.div>

        {/* Related Insights */}
        <div className="mt-24 md:mt-32">
          <h2 className="font-serif text-[28px] md:text-[32px] text-[#1A1C19] mb-8 md:mb-12">Related Insights</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {kcrData.insights
              .filter((item) => item.id !== id)
              .slice(0, 2)
              .map((item) => (
                <Link
                  key={item.id}
                  to={`/insights/${item.id}`}
                  className="bg-white border border-[#1A1C19]/10 rounded-[4px] p-6 md:p-8 hover:shadow-premium transition-shadow flex flex-col group"
                >
                  <span className="text-[10px] uppercase tracking-[0.2em] text-brand font-bold mb-4 block">
                    {item.type}
                  </span>
                  <h4 className="font-serif text-[20px] md:text-[24px] text-[#1A1C19] mb-4 group-hover:text-brand transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-[14px] text-[#1A1C19]/60 line-clamp-2">
                    {item.summary}
                  </p>
                </Link>
              ))}
          </div>
        </div>
      </article>
    </div>
  );
};

export default InsightDetail;
