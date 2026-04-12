import React from 'react';
import { Helmet } from 'react-helmet-async';
import { kcrData } from '../data/kcrData';

interface SEOProps {
  title?: string;
  description?: string;
  canonicalUrl?: string;
  ogType?: string;
  ogImage?: string;
  keywords?: string;
  children?: React.ReactNode;
}

const SEO: React.FC<SEOProps> = ({
  title,
  description,
  canonicalUrl,
  ogType = 'website',
  ogImage,
  keywords,
  children,
}) => {
  const siteName = kcrData.company.name;
  const fullTitle = title ? `${title} | ${siteName}` : `${siteName} | ${kcrData.company.tagline}`;
  const defaultDescription = kcrData.company.description;
  const metaDescription = description || defaultDescription;
  const url = canonicalUrl ? `https://karyaciptaraharja.com${canonicalUrl}` : 'https://karyaciptaraharja.com';
  const image = ogImage || 'https://karyaciptaraharja.com/logo.png'; 

  return (
    <Helmet>
      {/* Standard Metadata */}
      <title>{fullTitle}</title>
      <meta name="description" content={metaDescription} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={url} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={image} />
      
      {children}
    </Helmet>
  );
};

export default SEO;
