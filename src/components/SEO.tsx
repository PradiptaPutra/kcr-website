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
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: kcrData.company.name,
    url: 'https://karyaciptaraharja.com',
    logo: 'https://karyaciptaraharja.com/logo.png',
    description: kcrData.company.tagline,
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'customer support',
        telephone: kcrData.contact.phones[0],
        email: kcrData.contact.emails[1],
        areaServed: 'ID',
        availableLanguage: ['id', 'en'],
      },
    ],
  };
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: kcrData.company.name,
    url: 'https://karyaciptaraharja.com',
    inLanguage: 'id-ID',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://karyaciptaraharja.com/catalog?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <Helmet>
      {/* Standard Metadata */}
      <title>{fullTitle}</title>
      <meta name="description" content={metaDescription} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={url} />
      <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content="id_ID" />
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

      <script type="application/ld+json">{JSON.stringify(organizationSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(websiteSchema)}</script>
      
      {children}
    </Helmet>
  );
};

export default SEO;
