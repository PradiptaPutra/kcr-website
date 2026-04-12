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
  /** 
   * AEO (Answer Engine Optimization) summary: 
   * A concise 40-60 word definitive answer for AI/LLM extraction.
   */
  aeoAnswer?: string;
}

const SEO: React.FC<SEOProps> = ({
  title,
  description,
  canonicalUrl,
  ogType = 'website',
  ogImage,
  keywords,
  aeoAnswer,
}) => {
  const siteName = kcrData.company.name;
  const fullTitle = title ? `${title} | ${siteName}` : `${siteName} | ${kcrData.company.tagline}`;
  const defaultDescription = kcrData.company.description;
  const metaDescription = description || defaultDescription;
  const url = canonicalUrl ? `https://karyaciptaraharja.com${canonicalUrl}` : 'https://karyaciptaraharja.com';
  const image = ogImage || 'https://karyaciptaraharja.com/logo.png';

  // 2026 Structured Data: Organization & Service Schema
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://karyaciptaraharja.com/#organization",
        "name": kcrData.company.name,
        "url": "https://karyaciptaraharja.com",
        "logo": {
          "@type": "ImageObject",
          "url": "https://karyaciptaraharja.com/logo.png"
        },
        "description": kcrData.company.description,
        "address": {
          "@type": "PostalAddress",
          "streetAddress": kcrData.contact.address,
          "addressLocality": "Bekasi",
          "addressRegion": "Jawa Barat",
          "postalCode": "17426",
          "addressCountry": "ID"
        },
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": kcrData.contact.phones[0],
          "contactType": "technical support",
          "email": kcrData.contact.emails[0],
          "areaServed": "ID",
          "availableLanguage": ["id", "en"]
        },
        "foundingDate": "2006"
      },
      ...kcrData.services.map(service => ({
        "@type": "Service",
        "serviceType": service.title,
        "provider": { "@id": "https://karyaciptaraharja.com/#organization" },
        "description": service.description,
        "areaServed": "ID"
      }))
    ]
  };

  return (
    <Helmet>
      {/* Standard Metadata */}
      <title>{fullTitle}</title>
      <meta name="description" content={metaDescription} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={url} />

      {/* AEO / GEO Optimization: Explicit "Answer" for AI Agents */}
      {aeoAnswer && <meta name="aeo-answer" content={aeoAnswer} />}
      <meta name="abstract" content={aeoAnswer || metaDescription} />

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

      {/* Structured Data Injection */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
};

export default SEO;
