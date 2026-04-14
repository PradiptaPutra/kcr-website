export const kcrData = {
  company: {
    name: "KCR FURNITURE",
    fullName: "PT. KARYA CIPTA RAHARJA",
    tagline: "High-End Office & Hospitality Furniture Solutions",
    description: "Sejak tahun 2006, KCR Furniture hadir sebagai penyedia solusi interior and furnitur berkualitas untuk berbagai proyek perkantoran, hotel, and residensial. Kami mengkombinasikan desain modern dengan teknologi CNC standar Eropa untuk menghasilkan produk yang presisi, estetis, and tahan lama.",
    introduction: "Kami berfokus pada penciptaan ruang kerja and hospitality yang inspiratif. Dengan fasilitas manufaktur mandiri, kami memastikan setiap produk memenuhi standar kualitas tertinggi.",
    specialization: "Spesialisasi kami mencakup manufaktur furnitur kantor (workstations, executive desks) and hospitality (custom hotel furniture) berbasis teknologi CNC standar Eropa.",
    vision: "Visi kami adalah menjadi mitra pilihan utama dalam penyediaan furnitur and solusi interior yang inovatif, fungsional, and berkelas dunia."
  },
  
  services: [
    {
      id: "office-solutions",
      title: "Office Furniture Solutions",
      description: "Desain and manufaktur furnitur kantor modular yang memaksimalkan produktivitas and kolaborasi tim.",
      subItems: ["Workstations", "Executive Desks", "Meeting Tables"],
      img: "/assets/images/workstation/WORKSTATION_MODERNA_cropped.jpg"
    },
    {
      id: "hospitality-custom",
      title: "Hospitality & Custom Furniture",
      description: "Solusi furnitur custom untuk hotel, resort, and hunian premium dengan standar kualitas tinggi.",
      subItems: ["Hotel Bed Series", "Dining Sets", "Custom Cabinetry"],
      img: "/assets/images/overview/COSMO_BEDSERIES_cropped.jpg"
    },
    {
      id: "cnc-manufacturing",
      title: "CNC Precision Manufacturing",
      description: "Produksi berbasis mesin dengan teknologi CNC standar Eropa untuk detail presisi and volume masif.",
      subItems: ["Precision Cutting", "Mass Production", "Custom Engraving"],
      img: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=1200"
    },
    {
      id: "interior-fitout",
      title: "Interior Fit-Out",
      description: "Eksekusi komprehensif pekerjaan interior fit-out untuk ruang komersial and residensial.",
      subItems: ["Layout Planning", "Furniture Installation", "Interior Finishing"],
      img: "/assets/images/overview/INTERIOR_FITOUT_cropped.jpg"
    }
  ],

  capabilities: [
    {
      title: "CNC Manufacturing",
      description: "Produksi berbasis mesin dengan teknologi CNC standar Eropa untuk detail presisi and volume masif.",
      img: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=1200"
    },
    {
      title: "Cost Engineering",
      description: "Opsi material and finishing fleksibel yang disesuaikan dengan anggaran klien tanpa mengorbankan kualitas.",
      img: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=1200"
    }
  ],

  products: {
    workstations: [
      {
        series: "MODERNA SERIES",
        img: "/assets/images/workstation/WORKSTATION_MODERNA_cropped.jpg",
        description: "Workstations memaksimalkan performa tim dengan desain terpadu and manajemen kabel rapi.",
        features: ["Neat Cable Management", "Mobile Drawers"],
        models: [
          { name: "Base MS 1/2/3", dim: "240 x 120 x 75" },
          { name: "Modular MS", capacity: "2-8 Persons" }
        ]
      },
      {
        series: "FORMA SERIES",
        img: "/assets/images/workstation/WORKSTATION_FORMA_cropped.jpg",
        description: "Desain modular yang memberikan fleksibilitas konfigurasi tinggi untuk ruang kerja fungsional.",
        features: ["Modular Design", "High Flexibility"],
        models: [
          { name: "FWA Series", capacity: "1-8 Persons" },
          { name: "FWB Series", dim: "120 x 60 x 75" }
        ]
      },
      {
        series: "LAMINA SERIES",
        img: "/assets/images/workstation/LAMINA_COMPACT_LAMINA_EXTENT_cropped.jpg",
        description: "Uniformity for office staff with customizable storage and cable management.",
        features: ["Large Storage", "Clean Build"],
        models: [
          { name: "Lamina Compact", dim: "140 x 70 x 75" },
          { name: "Lamina Extent", dim: "160 x 170 x 75" }
        ]
      }
    ],
    executive: [
      {
        series: "PRIME SERIES",
        img: "/assets/images/workstation/EXECUTIVEDESK_PRIME_SERIES_cropped.jpg",
        description: "Meja eksekutif elegan and modern, tersedia dalam konfigurasi Compact and Extent.",
        features: ["Elegant Design", "Solid Build"],
        models: [
          { name: "Prime Compact", dim: "180 x 86 x 75" },
          { name: "Prime Extent", dim: "180 x 200 x 75" }
        ]
      },
      {
        series: "INCORE SERIES",
        img: "/assets/images/overview/INCORE_SERIES_cropped.jpg",
        description: "Personal executive and standalone desk suitable for corporate or personal activities.",
        features: ["Personal Executive", "Standalone Build"],
        models: [
          { name: "Standalone Standard", dim: "140 x 70 x 75" },
          { name: "IST 01 Line", dim: "160 x 160 x 75" }
        ]
      },
      {
        series: "LUNA SERIES",
        img: "/assets/images/overview/LUNA_SERIES_cropped.jpg",
        description: "Versatile executive desks and meeting tables with high-end aesthetics.",
        features: ["Premium Aesthetics", "Functional Storage"],
        models: [{ name: "Luna FST", dim: "160 x 200 x 75" }]
      },
      {
        series: "NOVA SERIES",
        img: "/assets/images/overview/NOVA_SERIES_cropped.jpg",
        description: "Sleek professional desk systems for modern office environments.",
        features: ["Sleek Design", "Professional Finish"],
        models: [{ name: "Nova FST", dim: "160 x 200 x 75" }]
      },
      {
        series: "FERMI SERIES",
        img: "/assets/images/overview/FERMI_ST3_cropped.jpg",
        description: "Large scale meeting systems for boardroom and collaborative environments.",
        features: ["Boardroom Solution", "Collaborative Build"],
        models: [
          { name: "Fermi ST3", dim: "240 x 120 x 75" },
          { name: "Fermi RMT01 (Round)", dim: "120 x 120 x 75" }
        ]
      }
    ],
    hospitality: [
      {
        series: "COSMO BED",
        img: "/assets/images/overview/COSMO_BEDSERIES_cropped.jpg",
        description: "Tempat tidur hotel and residensial dengan headboard custom and side drawers senada.",
        features: ["Custom Bedheads", "Side Drawers CSD"],
        models: [{ name: "King Size", dim: "188 x 200" }]
      },
      {
        series: "BARA DINING",
        img: "/assets/images/overview/BARA_02_cropped.jpg",
        description: "Solid wooden dining sets for high-end hospitality projects.",
        features: ["Solid Wood", "Dining Sets"],
        models: [{ name: "Bara 02", capacity: "4-6 Persons" }]
      },
      {
        series: "HOSPITALITY CUSTOM",
        img: "/assets/images/overview/HOSPITALITY_OTHERS_cropped.jpg",
        description: "Custom hospitality solutions for diverse projects.",
        features: ["Custom Solutions", "Versatile Design"],
        models: [{ name: "Custom Series", type: "On-demand" }]
      }
    ]
  },

  images: {
    hero: [
      "/assets/images/workstation/WORKSTATION_MODERNA_cropped.jpg",
      "/assets/images/overview/INTERIOR_FITOUT_cropped.jpg",
      "/assets/images/workstation/EXECUTIVEDESK_PRIME_SERIES_cropped.jpg"
    ],
    catalog: {
      workstations: "/assets/images/workstation/WORKSTATION_MODERNA_cropped.jpg",
      executive: "/assets/images/workstation/EXECUTIVEDESK_PRIME_SERIES_cropped.jpg",
      hospitality: "/assets/images/overview/COSMO_BEDSERIES_cropped.jpg",
      furniture: "/assets/images/overview/INTERIOR_FITOUT_cropped.jpg"
    },
    portfolio: [
      { id: '01', year: '2023', category: 'Interior', title: 'Fit-Out Interior Eksekutif', client: 'BUMN Financial', img: "/assets/images/workstation/EXECUTIVEDESK_PRIME_SERIES_cropped.jpg" },
      { id: '02', year: '2022', category: 'Office', title: 'Modular Workstation Installation', client: 'Tech Startup', img: "/assets/images/workstation/WORKSTATION_MODERNA_cropped.jpg" },
      { id: '03', year: '2023', category: 'Hospitality', title: 'Hotel Furniture Supply', client: 'Luxury Hotel Chain', img: "/assets/images/overview/COSMO_BEDSERIES_cropped.jpg" }
    ]
  },

  contact: {
    address: "Jl. Dirgantara Raya Blok A No. 7, BDP – Jatisari– Jatiasih– Bekasi 17426",
    phones: ["(021) 84598590"],
    emails: ["kcraharja@yahoo.com", "info@karyaciptaraharja.com"]
  }
};
