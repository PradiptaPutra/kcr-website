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
    "url": "https://kcrfurniture.com",
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
    "image": productData.img.startsWith('http') ? productData.img : `https://kcrfurniture.com${productData.img}`,
    "description": productData.specs,
    "brand": {
      "@type": "Brand",
      "name": "KCR Furniture"
    },
    "sku": `KCR-${productData.id}`,
    "mpn": productData.id.toString(),
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
      "availability": productData.price > 0 ? "https://schema.org/InStock" : "https://schema.org/PreOrder",
      "url": `https://kcrfurniture.com/catalog?q=${encodeURIComponent(productData.name)}`,
      "priceValidUntil": "2026-12-31",
      "itemCondition": "https://schema.org/NewCondition"
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
