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
    "contactPoint": kcrData.contact.phones.map(phone => ({
      "@type": "ContactPoint",
      "telephone": phone,
      "contactType": "customer service",
      "areaServed": "ID",
      "availableLanguage": ["Indonesian", "English"]
    }))
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

  const schema = type === 'Organization' ? getOrganizationSchema() : getServiceSchema(data);

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
};

export default SchemaWrapper;
