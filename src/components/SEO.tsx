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
  googleVerification?: string;
  robots?: string;
  children?: React.ReactNode;
}

const SEO: React.FC<SEOProps> = ({
  title,
  description,
  canonicalUrl,
  ogType = 'website',
  ogImage,
  keywords,
  googleVerification,
  robots = 'index, follow',
  children,
}) => {
  const siteName = kcrData.company.name;
  const fullTitle = title 
    ? (title.toLowerCase().includes(siteName.toLowerCase()) ? title : `${title} | ${siteName}`)
    : `${siteName} | ${kcrData.company.tagline}`;
  const defaultDescription = kcrData.company.description;
  const metaDescription = description || defaultDescription;
  const url = canonicalUrl && canonicalUrl !== '/' 
    ? `https://kcrfurniture.com${canonicalUrl}` 
    : 'https://kcrfurniture.com';
  const image = ogImage || 'https://kcrfurniture.com/logo.png';
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: kcrData.company.name,
    url: 'https://kcrfurniture.com',
    logo: 'https://kcrfurniture.com/logo.png',
    description: kcrData.company.tagline,
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'customer support',
        ...(kcrData.contact.phones.length > 0 && { telephone: kcrData.contact.phones[0] }),
        areaServed: 'ID',
        availableLanguage: ['id', 'en'],
      },
    ],
  };
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: kcrData.company.name,
    url: 'https://kcrfurniture.com',
    inLanguage: 'id-ID',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://kcrfurniture.com/catalog?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: kcrData.company.fullName,
    address: {
      '@type': 'PostalAddress',
      streetAddress: kcrData.contact.address,
      addressLocality: 'Bekasi',
      addressRegion: 'Jawa Barat',
      postalCode: '17426',
      addressCountry: 'ID',
    },
    telephone: kcrData.contact.phones[0],
    email: 'info@kcrfurniture.com',
    url: 'https://kcrfurniture.com',
    areaServed: {
      '@type': 'Country',
      name: 'Indonesia',
    },
    priceRange: 'Rp',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '08:00',
        closes: '17:00',
      },
    ],
  };

  return (
    <Helmet>
      {/* Standard Metadata */}
      <title>{fullTitle}</title>
      <meta name="description" content={metaDescription} />
      {keywords && <meta name="keywords" content={keywords} />}
      {googleVerification && <meta name="google-site-verification" content={googleVerification} />}
      <link rel="canonical" href={url} />
      <meta name="robots" content={robots} />

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
      <script type="application/ld+json">{JSON.stringify(localBusinessSchema)}</script>
      
      {children}
    </Helmet>
  );
};

export default SEO;
