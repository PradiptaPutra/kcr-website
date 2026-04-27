import React from 'react';
import { Helmet } from 'react-helmet-async';
import { kcrData } from '../data/kcrData';

interface SchemaProps {
  type: 'Organization' | 'Product' | 'LocalBusiness' | 'Service';
  data?: any;
}

const SchemaWrapper: React.FC<SchemaProps> = ({ type, data }) => {
  const getOrganizationSchema = () => ({
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": kcrData.company.name,
    "url": "https://karyaciptaraharja.com",
    "description": kcrData.company.description,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": kcrData.contact.address,
      "addressLocality": "Bekasi",
      "addressRegion": "Jawa Barat",
      "postalCode": "17426",
      "addressCountry": "ID"
    },
    "contactPoint": (kcrData.contact.phones || []).map(phone => ({
      "@type": "ContactPoint",
      "telephone": phone,
      "contactType": "customer service",
      "areaServed": "ID",
      "availableLanguage": ["Indonesian", "English"]
    }))
  });

  const getProductSchema = (productData: any) => ({
    "@context": "https://schema.org",
    "@type": "Product",
    "name": productData.name,
    "image": `https://karyaciptaraharja.com${productData.img}`,
    "description": productData.specs,
    "brand": {
      "@type": "Brand",
      "name": "KCR Furniture"
    },
    "manufacturer": {
      "@type": "Organization",
      "name": "PT Afan Maju Sejahtera (AMS)",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": kcrData.contact.address,
        "addressLocality": "Bekasi",
        "addressRegion": "Jawa Barat",
        "postalCode": "17426",
        "addressCountry": "ID"
      }
    },
    "offers": {
      "@type": "Offer",
      "price": productData.price,
      "priceCurrency": "IDR",
      "availability": "https://schema.org/InStock"
    }
  });

  const getServiceSchema = (serviceData: any) => ({
    "@context": "https://schema.org",
    "@type": "Service",
    "name": serviceData.title,
    "description": serviceData.description,
    "provider": {
      "@type": "LocalBusiness",
      "name": kcrData.company.name,
      "address": kcrData.contact.address
    },
    "areaServed": "ID"
  });

  const getSchema = () => {
    switch (type) {
      case 'Organization':
        return getOrganizationSchema();
      case 'Product':
        return getProductSchema(data);
      case 'Service':
        return getServiceSchema(data);
      default:
        return getOrganizationSchema();
    }
  };

  const schema = getSchema();

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
};

export default SchemaWrapper;
