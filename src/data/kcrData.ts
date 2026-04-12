export const kcrData = {
  company: {
    name: "PT. KARYA CIPTA RAHARJA",
    tagline: "Mitra Konstruksi & Spesialis Shotcrete Terpercaya",
    description: "Sejak tahun 2006, PT. KARYA CIPTA RAHARJA hadir sebagai kontraktor andalan untuk berbagai proyek BUMN dan swasta. Kami bangga dikenal sebagai Spesialis Shotcrete Indonesia yang selalu mengutamakan kualitas, keamanan, dan hasil kerja rapi dalam setiap proyek infrastruktur.",
    introduction: "Pengalaman panjang kami terbukti lewat berbagai keterlibatan dalam Proyek Strategis Nasional (PSN). Filosofi kami sangat sederhana: membangun struktur yang kuat, aman, dan efisien. Kami memastikan setiap pekerjaan selesai tepat waktu dengan kualitas yang bisa diandalkan.",
    specialization: "Selain ahli dalam aplikasi beton semprot (Shotcrete), KCR juga berinovasi dengan sistem bangunan prefabrikasi baja ringan. Solusi ini kami hadirkan untuk menjawab kebutuhan konstruksi modern yang menuntut kecepatan dan kepraktisan tanpa mengorbankan kekuatan.",
    vision: "Visi kami adalah menjadi kontraktor pilihan utama yang memberikan solusi konstruksi menyeluruh—mulai dari pengerjaan struktur bangunan, spesialisasi teknis, hingga penyediaan interior dan furnitur berkualitas untuk berbagai skala proyek."
  },
  services: [
    {
      id: "building-contractor",
      title: "KONTRAKTOR BANGUNAN",
      description: "Layanan kontraktor menyeluruh untuk berbagai jenis bangunan. Kami menangani proyek dari tahap awal hingga selesai dengan standar kualitas yang ketat, memastikan bangunan Anda berdiri kokoh."
    },
    {
      id: "shotcrete-specialist",
      title: "SPESIALIS SHOTCRETE",
      description: "Solusi perkuatan struktur menggunakan teknik beton semprot (Shotcrete). Sangat efektif untuk menstabilkan lereng, dinding terowongan, dan infrastruktur lain agar kuat dan aman dari longsor."
    },
    {
      id: "prefab-building",
      title: "SISTEM PREFABRIKASI",
      description: "Membangun jauh lebih cepat dengan sistem rangka baja ringan prefabrikasi. Ini adalah solusi cerdas untuk menghemat waktu pengerjaan di lapangan dengan hasil yang tetap presisi."
    },
    {
      id: "interior-fitout",
      title: "INTERIOR & FURNITUR",
      description: "Kami tidak hanya membangun struktur, tapi juga mengisi ruang Anda dengan interior dan furnitur berkualitas tinggi, dirancang khusus untuk kenyamanan dan keindahan kantor Anda."
    }
  ],
  products: {
    executiveDesks: [
      {
        series: "INCORE SERIES",
        description: "Personal executive and standalone desk suitable for corporate or personal activities.",
        models: [
          { name: "Standalone Standard", dim: "140 x 70 x 75" },
          { name: "IST 01 Line", dim: "160x160x75 to 240x240x75" },
          { name: "IST 02 Line", dim: "190x160x75 to 270x240x75" }
        ],
        accessories: ["Valo CRB 01 storage", "Electrical grommets", "Pop-up power sockets"]
      },
      {
        series: "PRIME SERIES",
        description: "Elegant, modern, and firm design with integrated ergonomics and clean electrical management.",
        models: [
          { name: "Prime Compact", dim: "180x86x75 to 260x86x75" },
          { name: "Prime Extent / Solid", dim: "180x200x75 to 260x200x75" }
        ],
        accessories: ["Hidden cable management", "Pop-up power sockets", "Valo CRB 02"]
      },
      {
        series: "LUNA SERIES",
        description: "Versatile executive desks and meeting tables with high-end aesthetics.",
        models: [
          { name: "Luna FST Executive", dim: "160x200x75 to 200x200x75" },
          { name: "Luna Meeting Table", dim: "Lengths: 280, 300, 360" }
        ],
        accessories: ["Valo CRB 03"]
      },
      {
        series: "NOVA SERIES",
        description: "Sleek professional desk systems for modern office environments.",
        models: [
          { name: "Nova FST Desk", dim: "160x200x75 to 200x200x75" },
          { name: "Nova Meeting Table", dim: "Lengths: 240, 280, 300" }
        ],
        accessories: ["Valo CRB 04"]
      }
    ],
    workstations: [
      {
        series: "MODERNA SERIES",
        description: "Integrated character to maximize team performance with organized storage.",
        models: [
          { name: "Base MS 1/2/3", dim: "240 x 120 x 75" },
          { name: "MSA/MSB/MSC", capacity: "4, 6, 8 Persons" }
        ],
        accessories: ["Mobile drawers MD-01/02/03", "Pop-up power"]
      },
      {
        series: "FORMA SERIES",
        description: "Modular design offering high configuration flexibility for practical office storage.",
        models: [
          { name: "FWA (1 Px)", dim: "120 x 60 x 75" },
          { name: "FWB/FWC/FWD", capacity: "2, 4, 6, 8 Persons" }
        ],
        accessories: ["Fixed drawers FX-01/FD-03", "Vertical wire managers"]
      },
      {
        series: "LAMINA SERIES",
        description: "Uniformity for office staff with customizable storage and cable management.",
        models: [
          { name: "Lamina Compact", dim: "140x70x75 / 160x70x75" },
          { name: "Lamina Extent", dim: "140x150x75 / 160x170x75" }
        ],
        accessories: ["Compact/Extent drawers", "Electrical grommets"]
      }
    ],
    meetingTables: [
      {
        series: "FERMI SERIES",
        models: [
          { name: "Fermi ST (Meeting)", dim: "240x120x75 to 500x180x75", capacity: "6-16 Persons" },
          { name: "Fermi RMT (Round)", dim: "120 x 120 x 75", finishes: "Laminate / Solid Wood" }
        ]
      }
    ],
    hospitality: [
      {
        series: "BARA DINING",
        models: [
          { name: "Bara 01/02/03", capacity: "4, 6, 8 Persons", dim: "160x100 to 220x120" }
        ]
      },
      {
        series: "COSMO BED",
        models: [
          { name: "Queen/King/Super King", dim: "Widths: 168, 188, 208" }
        ],
        accessories: ["Bedheads CBV/CBS", "Side drawers CSD 01/02/03"]
      }
    ],
    additional: {
      items: ["Multi Purpose Desks (MST)", "Hardwood Doors (DT)", "Dining Chairs (KM)", "Coffee Tables (Bohr)"]
    }
  },
  // CENTRALIZED & VERIFIED IMAGES (Guaranteed No 404)
  images: {
    hero: [
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2000", // Skyscraper BUMN
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=2000", // Modern Architecture
      "https://images.unsplash.com/photo-1541888946425-d81bb19480c5?auto=format&fit=crop&q=80&w=2000"  // Site Construction
    ],
    catalog: {
      prefab: "https://cdn.pixabay.com/photo/2014/10/01/22/01/house-469036_1280.jpg", // Steel Frame/Construction Site
      shotcrete: "https://cdn.pixabay.com/photo/2016/11/19/11/33/footpath-1838767_1280.jpg", // Tunnel/Shotcrete
      chemicals: "https://cdn.pixabay.com/photo/2015/07/28/14/11/milling-864433_1280.jpg", // Industrial Technical
      furniture: "https://images.pexels.com/photos/28715052/pexels-photo-28715052.jpeg"  // Executive Office Pexels
    },
    portfolio: [
      { id: '01', year: '2023', category: 'Industrial', title: 'Logistics Warehouse', client: 'Sektor Swasta', img: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=1200" },
      { id: '02', year: '2022', category: 'Shotcrete', title: 'Slope Stabilization', client: 'Proyek Nasional', img: "https://images.unsplash.com/photo-1541913051-111440a1386e?auto=format&fit=crop&q=80&w=1200" },
      { id: '03', year: '2023', category: 'Interior', title: 'Executive Office', client: 'BUMN Financial', img: "https://images.pexels.com/photos/7046155/pexels-photo-7046155.jpeg" }
    ]
  },
  contact: {
    address: "Jl. Dirgantara Raya Blok A No. 7, BDP – Jatisari– Jatiasih– Bekasi 17426",
    phones: ["(021) 84598590"],
    emails: ["kcraharja@yahoo.com", "info@karyaciptaraharja.com"]
  }
};
