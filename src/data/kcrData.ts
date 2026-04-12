export const kcrData = {
  company: {
    name: "PT. KARYA CIPTA RAHARJA",
    tagline: "Mitra Konstruksi & Spesialis Shotcrete Terpercaya",
    description: "Sejak tahun 2006, PT. KARYA CIPTA RAHARJA hadir sebagai kontraktor andalan untuk berbagai proyek BUMN and swasta. Kami bangga dikenal sebagai Spesialis Shotcrete Indonesia yang selalu mengutamakan kualitas, keamanan, and hasil kerja rapi dalam setiap proyek infrastruktur.",
    introduction: "Pengalaman panjang kami terbukti lewat berbagai keterlibatan dalam Proyek Strategis Nasional (PSN). Filosofi kami sangat sederhana: membangun struktur yang kuat, aman, and efisien.",
    specialization: "Selain ahli dalam aplikasi beton semprot (Shotcrete), KCR juga berinovasi dengan sistem bangunan prefabrikasi baja ringan and manufaktur interior berbasis teknologi CNC standar Eropa.",
    vision: "Visi kami adalah menjadi kontraktor pilihan utama yang memberikan solusi konstruksi menyeluruh—mulai dari pengerjaan struktur bangunan, spesialisasi teknis, hingga penyediaan interior and furnitur berkualitas."
  },
  
  services: [
    {
      id: "prefab-construction",
      title: "Prefab Building Construction",
      description: "Sistem bangunan prefabrikasi menggunakan teknologi Light Steel Frame sebagai struktur dinding inti. Sangat efisien untuk pembangunan cepat dengan akurasi tinggi.",
      subItems: ["Building Camps", "Ready-to-live Houses"],
      img: "https://images.unsplash.com/photo-1513828583688-c52646db42da?auto=format&fit=crop&q=80&w=1200"
    },
    {
      id: "shotcrete-specialist",
      title: "Shotcrete (Beton Semprot)",
      description: "Aplikasi beton sistem spray untuk area sulit. Layanan mencakup Wet Shotcrete, Dry Shotcrete, Soilnailing, and Ready Pack Mortar.",
      subItems: ["Soilnailing", "Ready Pack Mortar", "Slope Stabilization"],
      img: "https://images.unsplash.com/photo-1541888946425-d81bb19480c5?auto=format&fit=crop&q=80&w=1200"
    },
    {
      id: "fireproofing",
      title: "Fireproofing Systems",
      description: "Material pelindung struktur baja dari api, dihitung berdasarkan fire rating. Menggunakan Fermiculite Base, Intumescent, and Dense Concrete.",
      subItems: ["Fermiculite Base", "Intumescent Paint"],
      img: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&q=80&w=1200"
    },
    {
      id: "waterproofing",
      title: "Waterproofing Solutions",
      description: "Sistem perlindungan kebocoran bangunan yang terintegrasi. Mencakup metode Integral, Membrane, Coating, and Waterstop.",
      subItems: ["Integral & Membrane", "Coating Systems"],
      img: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=1200"
    },
    {
      id: "flooring",
      title: "Industrial Flooring",
      description: "Aplikasi lantai beton pelindung untuk ketahanan benturan and bahan kimia. Menggunakan Floorhardener, Epoxy Coating, and Self Levelling.",
      subItems: ["Floorhardener", "Epoxy Coating"],
      img: "https://images.unsplash.com/photo-1567789884554-0b844b597180?auto=format&fit=crop&q=80&w=1200"
    },
    {
      id: "civil-interior",
      title: "Interior Fit-Out & Civil",
      description: "Eksekusi komprehensif pekerjaan sipil, arsitektural, and interior fit-out untuk ruang komersial and residensial.",
      subItems: ["Civil Works", "Full Fit-Out"],
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
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2000",
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=2000",
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=2000"
    ],
    catalog: {
      prefab: "https://images.unsplash.com/photo-1513828583688-c52646db42da?auto=format&fit=crop&q=80&w=1200",
      shotcrete: "https://images.unsplash.com/photo-1541888946425-d81bb19480c5?auto=format&fit=crop&q=80&w=1200",
      chemicals: "https://images.unsplash.com/photo-1567789884554-0b844b597180?auto=format&fit=crop&q=80&w=1200",
      furniture: "/assets/images/overview/INTERIOR_FITOUT_cropped.jpg"
    },
    portfolio: [
      { id: '01', year: '2023', category: 'Industrial', title: 'Logistics Warehouse', client: 'Sektor Swasta', img: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=1200" },
      { id: '02', year: '2022', category: 'Shotcrete', title: 'Slope Stabilization', client: 'Proyek Nasional', img: "https://images.unsplash.com/photo-1541888946425-d81bb19480c5?auto=format&fit=crop&q=80&w=1200" },
      { id: '03', year: '2023', category: 'Interior', title: 'Fit-Out Interior Eksekutif', client: 'BUMN Financial', img: "/assets/images/workstation/EXECUTIVEDESK_PRIME_SERIES_cropped.jpg" }
    ]
  },

  contact: {
    address: "Jl. Dirgantara Raya Blok A No. 7, BDP – Jatisari– Jatiasih– Bekasi 17426",
    phones: ["(021) 84598590"],
    emails: ["kcraharja@yahoo.com", "info@karyaciptaraharja.com"]
  }
};
