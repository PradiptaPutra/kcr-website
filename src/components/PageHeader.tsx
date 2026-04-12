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
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as any }
  };

  return (
    <section className={`framer-container pt-20 mb-20 ${className}`}>
      <motion.div 
        {...fadeInUp}
        className="max-w-3xl"
      >
        <span className="framer-label text-brand mb-6 block tracking-[0.4em]">{label}</span>
        <h1 className="framer-h2 !text-[36px] md:!text-[48px] mb-6 leading-tight">
          {title} {subtitle && <span className="italic text-brand font-serif">{subtitle}</span>}
        </h1>
        {description && (
          <p className="framer-body !text-[16px] max-w-2xl opacity-60">
            {description}
          </p>
        )}
      </motion.div>
    </section>
  );
};

export default PageHeader;
