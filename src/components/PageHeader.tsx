import React from 'react';
import { motion } from 'framer-motion';

interface PageHeaderProps {
  label: string;
  title: string;
  subtitle?: string | React.ReactNode;
  description?: string;
  className?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ 
  label, 
  title, 
  subtitle, 
  description,
  className = ""
}) => {
  const fadeInUp = {
    initial: { y: 10, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as any }
  };

  return (
    <section className={`framer-container pt-8 md:pt-12 mb-8 md:mb-12 ${className}`}>
      <motion.div 
        {...fadeInUp}
        className="max-w-4xl border-b border-[#1a1c19]/5 pb-10"
      >
        <div className="flex flex-col gap-3">
          <span className="text-[10px] uppercase tracking-[0.4em] text-brand font-bold opacity-80">{label}</span>
          <div className="flex flex-col md:flex-row md:items-baseline gap-x-4">
            <h1 className="font-serif text-[24px] md:text-[32px] text-[#1a1c19]">
              {title} {subtitle && <span className="italic text-brand">{subtitle}</span>}
            </h1>
          </div>
          {description && (
            <p className="text-[13px] opacity-40 max-w-xl leading-relaxed mt-2">
              {description}
            </p>
          )}
        </div>
      </motion.div>
    </section>
  );
};

export default PageHeader;
