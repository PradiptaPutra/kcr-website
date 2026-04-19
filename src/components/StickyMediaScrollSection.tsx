import React from 'react';

interface StickyMediaScrollSectionProps {
  label: string;
  imageSrc: string;
  imageAlt: string;
  imageBadge: string;
  imageHeadline: string;
  children: React.ReactNode;
  cta?: React.ReactNode;
}

const StickyMediaScrollSection: React.FC<StickyMediaScrollSectionProps> = ({
  label,
  imageSrc,
  imageAlt,
  imageBadge,
  imageHeadline,
  children,
  cta,
}) => {
  return (
    <section className="relative bg-white hidden lg:block border-t border-[#1a1c19]/5">
      <div className="grid grid-cols-2 items-start">
        <div className="sticky top-0 h-screen overflow-hidden relative">
          <img
            src={imageSrc}
            alt={imageAlt}
            className="absolute inset-0 w-full h-full object-cover grayscale"
            loading="lazy"
            decoding="async"
            sizes="50vw"
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute bottom-16 left-16 right-16">
            <span className="bg-brand text-white text-[10px] font-bold uppercase tracking-[0.2em] px-4 py-2 rounded-full">
              {imageBadge}
            </span>
            <p className="font-serif text-white text-[32px] mt-6 max-w-sm leading-tight">
              {imageHeadline}
            </p>
          </div>
        </div>

        <div className="px-16 xl:px-24 py-24">
          <span className="framer-label text-brand mb-20 block tracking-[0.5em]">{label}</span>
          <div className="section-stack-lg">{children}</div>
          {cta ? <div className="pt-8">{cta}</div> : null}
        </div>
      </div>
    </section>
  );
};

export default StickyMediaScrollSection;
