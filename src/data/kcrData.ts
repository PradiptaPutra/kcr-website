export const kcrData = {
  company: {
    name: "KCR FURNITURE",
    fullName: "PT. KARYA CIPTA RAHARJA",
    manufacturer: "PT Afan Maju Sejahtera (AMS)",
    established: 2015,
    location: "Bekasi, Indonesia",
    tagline: "High-End Office & Hospitality Furniture Solutions",
    description: "PT Afan Maju Sejahtera (AMS) adalah manufaktur furniture custom dan mass production yang berbasis di Bekasi sejak 2015. Kami menyediakan solusi manufaktur dan pembangunan custom dengan pendekatan cost engineering, menggunakan teknologi CNC standar Eropa untuk menjamin akurasi dan kuantitas produksi massal yang konsisten.",
    introduction: "Kami menguasai pengolahan berbagai material premium dan finishing kelas atas untuk memenuhi standar proyek korporasi dan hospitality internasional.",
    branding: "Manufactured by AMS & Distributed by KCR Furniture",
    materials: ["Plywood", "MDF", "HMR", "MFC", "Solid Wood"],
    finishes: ["HPL", "NC Spray Paint", "Melamine", "Veneer", "Polyurethane (PU)", "Lacquer", "Lacquer Casting"],
    vision: "Menjadi mitra manufaktur furnitur pilihan utama di Indonesia dengan mengutamakan akurasi produksi dan kapasitas massal yang konsisten.",
    specialization: "Spesialisasi kami mencakup Mass Production furnitur kantor (Series: Moderna, Forma, Lamina, Proxima, Incore, Prime, Luna, Nova) dan Hospitality (Series: Bara, Cosmo, Fermi)."
  },
  
  services: [
    {
      id: "mass-production",
      title: "Mass Production",
      description: "Produksi furnitur skala besar dengan konsistensi kualitas tinggi menggunakan sistem manufaktur berbasis CNC standar Eropa.",
      subItems: ["Workstations", "System Furniture", "Standardized Units", "Modular Desking"],
      img: "/assets/images/products/MODERNA_MSA_4PX.jpg"
    },
    {
      id: "custom-furniture",
      title: "Custom Furniture",
      description: "Pembuatan furnitur kustom sesuai spesifikasi desain, material, dan finishing khusus (Veneer, Lacquer, PU) untuk proyek unik.",
      subItems: ["Executive Desks", "Hospitality Units", "Signature Pieces", "Bespoke Joinery"],
      img: "/assets/images/products/PRIME_CP.jpg"
    },
    {
      id: "interior-fitout",
      title: "Interior Fit-Out",
      description: "Solusi pembangunan interior menyeluruh termasuk MEP dan instalasi furnitur untuk ruang komersial, perbankan, dan instansi pemerintah.",
      subItems: ["Office Fit-out", "Commercial Space", "Public Institutions", "Hospitality Fit-out"],
      img: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200"
    }
  ],

  capabilities: [
    {
      title: "Advanced CNC Woodworking",
      description: "Akurasi milimeter untuk pemotongan, pengeboran, dan routing material kayu olahan menggunakan mesin CNC standar Eropa.",
      img: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=1200"
    },
    {
      title: "Premium Finishing",
      description: "Keahlian finishing beragam mulai dari NC Spray Paint, Polyurethane (PU), hingga teknik High-End Lacquer Casting.",
      img: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=1200"
    }
  ],

  products: {
    workstations: [
      {
        series: "MODERNA SERIES",
        img: "/assets/images/products/MODERNA_MSA_4PX.jpg",
        description: "Sistem workstation modern dengan kaki metal yang sleek, dirancang untuk kolaborasi tim dengan manajemen kabel terintegrasi.",
        features: ["Integrated Cable Management", "Acoustic Screen Options", "Modular Benchings"],
        materials: ["MFC E1 Grade", "Powder Coated Steel"],
        startingPrice: 13250000,
        models: [
          { name: "MSA (A-Leg)", capacity: "4-8 Persons" },
          { name: "MSB (U-Leg)", capacity: "4-8 Persons" },
          { name: "MSC (O-Leg)", capacity: "4-8 Persons" }
        ]
      },
      {
        series: "FORMA SERIES",
        img: "/assets/images/products/FORMA_FWA.jpg",
        description: "Sistem modular dengan fleksibilitas konfigurasi tinggi. Sangat praktis untuk pertumbuhan tim yang dinamis.",
        features: ["High Flexibility", "Ergonomic Edge", "Quick Assembly"],
        materials: ["HPL Finish", "Steel Frame", "Fabric Partition"],
        startingPrice: 5400000,
        models: [
          { name: "FWA (Single)", dim: "120 x 60 x 75" },
          { name: "FWB (Back-to-Back)", capacity: "2-8 Persons" },
          { name: "FWC (L-Shape)", capacity: "2-8 Persons" },
          { name: "FWD (Cross)", capacity: "4 Persons" }
        ]
      },
      {
        series: "LAMINA SERIES",
        img: "/assets/images/products/FST_01.png",
        description: "Menyediakan keseragaman bagi staff perkantoran dengan fungsi penyimpanan yang optimal dan desain clean build.",
        features: ["Clean Aesthetics", "Ample Storage", "Cost Efficient"],
        materials: ["MFC Wood Grain", "Metal Base"],
        startingPrice: 9700000,
        models: [
          { name: "FST-1/2 (Staff)", dim: "160 x 70 x 75" },
          { name: "FST-3/4 (Supervisor)", dim: "180 x 90 x 75" },
          { name: "FST-5/6 (Manager)", dim: "200 x 86 x 75" }
        ]
      },
      {
        series: "PROXIMA SERIES",
        img: "/assets/images/products/PROXIMA_01.jpg",
        description: "Meja kerja personal dengan laci gantung yang efisien, cocok untuk area staff dengan ruang terbatas.",
        features: ["Compact Design", "Hanging Pedestal", "Sturdy Build"],
        materials: ["MFC E1", "Metal C-Leg"],
        startingPrice: 10850000,
        models: [
          { name: "Proxima-01", dim: "140 x 70 x 75" }
        ]
      }
    ],
    executive: [
      {
        series: "PRIME SERIES",
        img: "/assets/images/products/PRIME_CP.jpg",
        description: "Meja eksekutif premium dengan finishing veneer kayu alami dan detail leather inlay yang mewah.",
        features: ["Veneer Finish", "Leather Inlay", "Hidden Power Access"],
        materials: ["Walnut/Teak Veneer", "Solid Wood Edging"],
        startingPrice: 35800000,
        models: [
          { name: "CP Series (Compact)", dim: "220-260 cm" },
          { name: "EX Series (Executive)", dim: "200-240 cm" }
        ]
      },
      {
        series: "INCORE SERIES",
        img: "/assets/images/products/INCORE_IST_01.jpg",
        description: "Meja kerja personal executive dengan desain standalone yang kokoh dan laci penyimpanan besar.",
        features: ["Standalone Design", "Large Storage", "HPL Premium"],
        materials: ["Plywood / HMR", "HPL Finish"],
        startingPrice: 15800000,
        models: [
          { name: "IST-01 (Side Return)", dim: "160-240 cm" },
          { name: "IST-02 (Standard)", dim: "160-240 cm" }
        ]
      },
      {
        series: "LUNA SERIES",
        img: "/assets/images/products/LUNA_LST.jpg",
        description: "Desain meja modern dengan kurva minimalis, memberikan kesan luas dan profesional di ruang kerja.",
        features: ["Curved Edge", "Minimalist Leg", "Media Ready"],
        materials: ["MFC / HPL", "Custom Finish"],
        startingPrice: 15800000,
        models: [
          { name: "LST Series", dim: "160-200 cm" }
        ]
      },
      {
        series: "NOVA SERIES",
        img: "/assets/images/products/NOVE_NST.jpg",
        description: "Seri meja kantor dengan penekanan pada fungsionalitas dan garis desain yang tegas.",
        features: ["Geometric Profile", "Solid Construction", "Varied Sizes"],
        materials: ["MFC E1", "Aluminium Trim"],
        startingPrice: 16000000,
        models: [
          { name: "NST Series", dim: "160-200 cm" }
        ]
      }
    ],
    meeting: [
       {
        series: "FERMI SERIES",
        img: "/assets/images/products/FERMI_ST_03.jpg",
        description: "Sistem meja meeting skala besar untuk boardroom dan ruang kolaborasi interaktif.",
        features: ["Boardroom Solution", "Integrated Connectivity", "Custom Sizes"],
        materials: ["Veneer / HPL", "Heavy Duty Metal Frame"],
        startingPrice: 7200000,
        models: [
          { name: "Fermi ST-01/02/03", capacity: "6-16 Persons" },
          { name: "Fermi RMT01 (Round)", dim: "120 cm" }
        ]
      },
      {
        series: "LUNA MEETING",
        img: "/assets/images/products/LUNA_LMT.jpg",
        description: "Meja rapat dengan desain kaki yang unik untuk memberikan ruang kaki yang maksimal bagi peserta rapat.",
        features: ["Ergonomic Support", "Sleek Design"],
        materials: ["MFC / HPL"],
        startingPrice: 15900000,
        models: [
          { name: "LMT Series", dim: "280-360 cm" }
        ]
      },
      {
        series: "NOVA MEETING",
        img: "/assets/images/products/NOVE_MT.jpg",
        description: "Meja meeting modular yang dapat dikonfigurasi ulang sesuai kebutuhan ruang presentasi.",
        features: ["Modular Configuration", "Durable Surface"],
        materials: ["MFC / HPL"],
        startingPrice: 15100000,
        models: [
          { name: "NMT Series", dim: "240-300 cm" }
        ]
      }
    ],
    hospitality: [
      {
        series: "COSMO SERIES",
        img: "/assets/images/products/DIVAN_01.jpg",
        description: "Koleksi furnitur kamar tidur hotel dengan headboard custom dan side tables senada.",
        features: ["Hotel Grade Durability", "Custom Upholstery", "Ambient Lighting Ready"],
        materials: ["Fabric", "Plywood / Solid Wood", "High Density Foam"],
        startingPrice: 24000000,
        models: [
          { name: "Cosmo Bed (Dipan)", size: "King / Queen" },
          { name: "CSD Side Drawer", dim: "50 x 40 x 40" }
        ]
      },
      {
        series: "BARA SERIES",
        img: "/assets/images/products/BARA_02.png",
        description: "Set meja makan kayu solid dengan desain timeless untuk restoran dan residential premium.",
        features: ["Solid Wood Construction", "Natural Finishing", "Ergonomic Chairs"],
        materials: ["Solid Teak / Mahogany", "Natural Oil / NC Finish"],
        startingPrice: 8250000,
        models: [
          { name: "Bara Dining Table", capacity: "4-8 Persons" },
          { name: "KM Dining Chair", dim: "45 x 45 x 90" }
        ]
      },
      {
        series: "VALO CREDENZA",
        img: "/assets/images/products/VALO_01.jpg",
        description: "Kabinet penyimpanan dengan desain minimalis yang cocok sebagai pelengkap ruang kerja maupun lounge.",
        features: ["Soft Close Hinges", "Clean Profile"],
        materials: ["MFC / HPL"],
        startingPrice: 4450000,
        models: [
          { name: "Valo-01/02/03/04", dim: "80-130 cm" },
          { name: "Valo-CRB04", dim: "200 cm" }
        ]
      }
    ]
  },

  catalogProducts: [
    { id: 1, industries: ['Office', 'Education'], category: "Meja Kerja", series: "Lamina", name: "Lamina FST-1", specs: "1600 (P) x 700 (L) x 750 (T) mm", price: 9700000, price_tax: 10767000, img: "/assets/images/products/LAMINA_FST_1.jpg" },
    { id: 2, industries: ['Office', 'Education'], category: "Meja Kerja", series: "Lamina", name: "Lamina FST-2", specs: "Meja: 1600 (P) x 700 (L) x 750 (T) mm", price: 14100000, price_tax: 15651000, img: "/assets/images/products/LAMINA_FST_2.png" },
    { id: 3, industries: ['Office', 'Education'], category: "Meja Kerja", series: "Lamina", name: "Lamina FST-3", specs: "1800 (P) x 900 (L) x 750 (T) mm", price: 13100000, price_tax: 14541000, img: "/assets/images/products/LAMINA_FST_2.png" },
    { id: 4, industries: ['Office', 'Education'], category: "Meja Kerja", series: "Lamina", name: "Lamina FST-4", specs: "2000 (P) x 860 (L) x 750 (T) mm", price: 16500000, price_tax: 18315000, img: "/assets/images/products/LAMINA_FST_4.jpg" },
    { id: 5, industries: ['Office', 'Education'], category: "Meja Kerja", series: "Lamina", name: "Lamina FST-5", specs: "2000 (P) x 860 (L) x 750 (T) mm", price: 32625000, price_tax: 36213750, img: "/assets/images/products/LAMINA_FST_5.jpg" },
    { id: 6, industries: ['Office', 'Education'], category: "Meja Kerja", series: "Lamina", name: "Lamina FST-6", specs: "Meja: 2000 (P) x 860 (L) x 750 (T) mm", price: 42700000, price_tax: 47397000, img: "/assets/images/products/LAMINA_FST_6.jpg" },
    { id: 7, industries: ['Office', 'Education'], category: "Meja Kerja", series: "Proxima", name: "PROXIMA-01", specs: "Meja: 1400 (P) x 700 (L) x 750 (T) mm", price: 10850000, price_tax: 12043500, img: "/assets/images/products/PROXIMA_01.jpg" },
    { id: 8, industries: ['Office', 'Government'], category: "Meja Kerja", series: "Incore", name: "IST-01-24", specs: "Meja: 2400 (P) x 900 (L) x 750 (T) mm", price: 25400000, price_tax: 28194000, img: "/assets/images/products/INCORE_IST_01.jpg" },
    { id: 9, industries: ['Office', 'Government'], category: "Meja Kerja", series: "Incore", name: "IST-01-20", specs: "Meja: 2000 (P) x 800 (L) x 750 (T) mm", price: 21100000, price_tax: 23421000, img: "/assets/images/products/INCORE_IST_01.jpg" },
    { id: 10, industries: ['Office', 'Government'], category: "Meja Kerja", series: "Incore", name: "IST-01-16", specs: "Meja: 1600 (P) x 700 (L) x 750 (T) mm", price: 18000000, price_tax: 19980000, img: "/assets/images/products/INCORE_IST_01.jpg" },
    { id: 11, industries: ['Office', 'Government'], category: "Meja Kerja", series: "Incore", name: "IST-02-24", specs: "Meja: 2400 (P) x 900 (L) x 750 (T) mm", price: 22600000, price_tax: 25086000, img: "/assets/images/products/INCORE_IST_02.jpg" },
    { id: 12, industries: ['Office', 'Government'], category: "Meja Kerja", series: "Incore", name: "IST-02-20", specs: "Meja: 2000 (P) x 800 (L) x 750 (T) mm", price: 18500000, price_tax: 20535000, img: "/assets/images/products/INCORE_IST_02.jpg" },
    { id: 13, industries: ['Office', 'Government'], category: "Meja Kerja", series: "Incore", name: "IST-02-16", specs: "Meja: 1600 (P) x 700 (L) x 750 (T) mm", price: 15800000, price_tax: 17538000, img: "/assets/images/products/INCORE_IST_02.jpg" },
    { id: 14, industries: ['Office', 'Government'], category: "Meja Kerja", series: "Prime", name: "CP-01-24", specs: "2600 (P) x 900 (L) x 750 (T) mm", price: 42400000, price_tax: 47064000, img: "/assets/images/products/PRIME_CP.jpg" },
    { id: 15, industries: ['Office', 'Government'], category: "Meja Kerja", series: "Prime", name: "CP-02-22", specs: "2400 (P) x 900 (L) x 750 (T) mm", price: 38000000, price_tax: 42180000, img: "/assets/images/products/PRIME_CP.jpg" },
    { id: 16, industries: ['Office', 'Government'], category: "Meja Kerja", series: "Prime", name: "CP-03-20", specs: "2200 (P) x 900 (L) x 750 (T) mm", price: 35800000, price_tax: 39738000, img: "/assets/images/products/PRIME_CP.jpg" },
    { id: 17, industries: ['Office', 'Government'], category: "Meja Kerja", series: "Prime", name: "EX-01-24", specs: "Meja: 2400 (P) x 900 (L) x 750 (T) mm", price: 51240000, price_tax: 56876400, img: "/assets/images/products/PRIME_EX.jpg" },
    { id: 18, industries: ['Office', 'Government'], category: "Meja Kerja", series: "Prime", name: "EX-02-22", specs: "Meja: 2200 (P) x 900 (L) x 750 (T) mm", price: 46970000, price_tax: 52136700, img: "/assets/images/products/PRIME_EX.jpg" },
    { id: 19, industries: ['Office', 'Government'], category: "Meja Kerja", series: "Prime", name: "EX-03-20", specs: "Meja: 2000 (P) x 900 (L) x 750 (T) mm", price: 42700000, price_tax: 47397000, img: "/assets/images/products/PRIME_EX.jpg" },
    { id: 20, industries: ['Office', 'Government'], category: "Meja Kerja", series: "Luna", name: "LST-01", specs: "Meja: 2000 (P) x 800 (L) x 750 (T) mm", price: 19700000, price_tax: 21867000, img: "/assets/images/products/LUNA_LST.jpg" },
    { id: 21, industries: ['Office', 'Government'], category: "Meja Kerja", series: "Luna", name: "LST-02", specs: "Meja: 1800 (P) x 800 (L) x 750 (T) mm", price: 17700000, price_tax: 19647000, img: "/assets/images/products/LUNA_LST.jpg" },
    { id: 22, industries: ['Office', 'Government'], category: "Meja Kerja", series: "Luna", name: "LST-03", specs: "Meja: 1600 (P) x 800 (L) x 750 (T) mm", price: 15800000, price_tax: 17538000, img: "/assets/images/products/LUNA_LST.jpg" },
    { id: 23, industries: ['Office', 'Government'], category: "Meja Kerja", series: "Nova", name: "NST-01", specs: "Meja: 2000 (P) x 800 (L) x 750 (T) mm", price: 20000000, price_tax: 22200000, img: "/assets/images/products/NOVE_NST.jpg" },
    { id: 24, industries: ['Office', 'Government'], category: "Meja Kerja", series: "Nova", name: "NST-02", specs: "Meja: 1800 (P) x 800 (L) x 750 (T) mm", price: 17900000, price_tax: 19869000, img: "/assets/images/products/NOVE_NST.jpg" },
    { id: 25, industries: ['Office', 'Government'], category: "Meja Kerja", series: "Nova", name: "NST-03", specs: "Meja: 1600 (P) x 800 (L) x 750 (T) mm", price: 16000000, price_tax: 17760000, img: "/assets/images/products/NOVE_NST.jpg" },
    { id: 26, industries: ['Office', 'Education'], category: "Meja Kerja", series: "Moderna", name: "MST - 02", specs: "1800 (P) x 900 (L) x 750 (T) mm", price: 14200000, price_tax: 15762000, img: "/assets/images/products/MST_02.jpg" },
    { id: 27, industries: ['Office', 'Education'], category: "Workstation", series: "Forma", name: "Forma FWA", specs: "1200 (P) x 600 (L) x 750 (T) mm", price: 5400000, price_tax: 5994000, img: "/assets/images/products/FORMA_FWA.jpg" },
    { id: 28, industries: ['Office', 'Education'], category: "Workstation", series: "Forma", name: "Forma FWB-2px", specs: "1600 (P) x 1200 (L) x 750 (T) mm", price: 9800000, price_tax: 10878000, img: "/assets/images/products/FORMA_FWB.jpg" },
    { id: 29, industries: ['Office', 'Education'], category: "Workstation", series: "Forma", name: "Forma FWB-4px", specs: "2800 (P) x 1200 (L) x 750 (T) mm", price: 17775000, price_tax: 19730250, img: "/assets/images/products/FORMA_FWB.jpg" },
    { id: 30, industries: ['Office', 'Education'], category: "Workstation", series: "Forma", name: "Forma FWB-6px", specs: "4400 (P) x 1200 (L) x 750 (T) mm", price: 27220000, price_tax: 30214200, img: "/assets/images/products/FORMA_FWB_6PX.jpg" },
    { id: 31, industries: ['Office', 'Education'], category: "Workstation", series: "Forma", name: "Forma FWB-8px", specs: "6000 (P) x 1200 (L) x 750 (T) mm", price: 37500000, price_tax: 41625000, img: "/assets/images/products/FORMA_FWB_8PX.jpg" },
    { id: 32, industries: ['Office', 'Education'], category: "Workstation", series: "Forma", name: "Forma FWC-2px", specs: "1880 (P) x 1840 (L) x 750 (T) mm", price: 18700000, price_tax: 20757000, img: "/assets/images/products/FORMA_FWC_2PX.jpg" },
    { id: 33, industries: ['Office', 'Education'], category: "Workstation", series: "Forma", name: "Forma FWC-4px", specs: "3080 (P) x 1840 (L) x 750 (T) mm", price: 27650000, price_tax: 30691500, img: "/assets/images/products/FORMA_FWC_4PX.jpg" },
    { id: 34, industries: ['Office', 'Education'], category: "Workstation", series: "Forma", name: "Forma FWC-6px", specs: "4280 (P) x 1840 (L) x 750 (T) mm", price: 34250000, price_tax: 38017500, img: "/assets/images/products/FORMA_FWC_6PX.jpg" },
    { id: 35, industries: ['Office', 'Education'], category: "Workstation", series: "Forma", name: "Forma FWC-8px", specs: "5480 (P) x 1840 (L) x 750 (T) mm", price: 42000000, price_tax: 46620000, img: "/assets/images/products/FORMA_FWC_8PX.jpg" },
    { id: 36, industries: ['Office', 'Education'], category: "Workstation", series: "Forma", name: "Forma FWD-2px", specs: "1200 (P) x 1200 (L) x 750 (T) mm", price: 8550000, price_tax: 9490500, img: "/assets/images/products/FORMA_FWD_2PX.jpg" },
    { id: 37, industries: ['Office', 'Education'], category: "Workstation", series: "Forma", name: "Forma FWD-4px", specs: "2400 (P) x 1200 (L) x 750 (T) mm", price: 16500000, price_tax: 18315000, img: "/assets/images/products/FORMA_FWD_4PX.jpg" },
    { id: 38, industries: ['Office', 'Education'], category: "Workstation", series: "Forma", name: "Forma FWD-6px", specs: "3600 (P) x 1200 (L) x 750 (T) mm", price: 24375000, price_tax: 27056250, img: "/assets/images/products/FORMA_FWD_6PX.jpg" },
    { id: 39, industries: ['Office', 'Education'], category: "Workstation", series: "Forma", name: "Forma FWD-8px", specs: "4800 (P) x 1200 (L) x 750 (T) mm", price: 32250000, price_tax: 35797500, img: "/assets/images/products/FORMA_FWD_8PX.jpg" },
    { id: 40, industries: ['Office', 'Education'], category: "Workstation", series: "Moderna", name: "Moderna MSA-4px", specs: "2400 (P) x 1200 (L) x 750 (T) mm", price: 13250000, price_tax: 14707500, img: "/assets/images/products/MODERNA_MSA_4PX.jpg" },
    { id: 41, industries: ['Office', 'Education'], category: "Workstation", series: "Moderna", name: "Moderna MSA-6px", specs: "3600 (P) x 1200 (L) x 750 (T) mm", price: 20625000, price_tax: 22893750, img: "/assets/images/products/MODERNA_MSA_6PX.jpg" },
    { id: 42, industries: ['Office', 'Education'], category: "Workstation", series: "Moderna", name: "Moderna MSA-8px", specs: "4800 (P) x 1200 (L) x 750 (T) mm", price: 27875000, price_tax: 30941250, img: "/assets/images/products/MODERNA_MSA_8PX.jpg" },
    { id: 43, industries: ['Office', 'Education'], category: "Workstation", series: "Moderna", name: "Moderna MSB-4px", specs: "2400 (P) x 1200 (L) x 750 (T) mm", price: 15900000, price_tax: 17649000, img: "/assets/images/products/MODERNA_MSB_4PX.jpg" },
    { id: 44, industries: ['Office', 'Education'], category: "Workstation", series: "Moderna", name: "Moderna MSB-6px", specs: "3600 (P) x 1200 (L) x 750 (T) mm,", price: 24200000, price_tax: 26862000, img: "/assets/images/products/MODERNA_MSB_6PX.jpg" },
    { id: 45, industries: ['Office', 'Education'], category: "Workstation", series: "Moderna", name: "Moderna MSB-8px", specs: "4800 (P) x 1200 (L) x 750 (T) mm", price: 32125000, price_tax: 35658750, img: "/assets/images/products/MODERNA_MSB_8PX.jpg" },
    { id: 46, industries: ['Office', 'Education'], category: "Workstation", series: "Moderna", name: "Moderna MSC-4px", specs: "2400 (P) x 1200 (L) x 750 (T) mm", price: 16500000, price_tax: 18315000, img: "/assets/images/products/MODERNA_MSC_4PX.jpg" },
    { id: 47, industries: ['Office', 'Education'], category: "Workstation", series: "Moderna", name: "Moderna MSC-6px", specs: "3600 (P) x 1200 (L) x 750 (T) mm", price: 24700000, price_tax: 27417000, img: "/assets/images/products/MODERNA_MSC_6PX.jpg" },
    { id: 48, industries: ['Office', 'Education'], category: "Workstation", series: "Moderna", name: "Moderna MSC-8px", specs: "4800 (P) x 1200 (L) x 750 (T) mm", price: 32675000, price_tax: 36269250, img: "/assets/images/products/MODERNA_MSC_8PX.jpg" },
    { id: 49, industries: ['Office', 'Education'], category: "Mobile Drawer", series: "Moderna", name: "MD-01", specs: "450 (P) x 450 (L) x 600 (T) mm", price: 2660000, price_tax: 2952600, img: "/assets/images/products/MD_01.jpg" },
    { id: 50, industries: ['Office', 'Education'], category: "Mobile Drawer", series: "Moderna", name: "MD-02", specs: "450 (P) x 450 (L) x 600 (T) mm", price: 2350000, price_tax: 2608500, img: "/assets/images/products/MD_02.jpg" },
    { id: 51, industries: ['Office', 'Education'], category: "Mobile Drawer", series: "Moderna", name: "MD-03", specs: "400 (P) x 470 (L) x 590 (T) mm", price: 2160000, price_tax: 2397600, img: "/assets/images/products/MD_03.jpg" },
    { id: 52, industries: ['Office', 'Hospitality', 'Government'], category: "Credenza", series: "Valo", name: "VALO-01", specs: "1300 (P) x 400 (L) x 900 (T) mm", price: 5750000, price_tax: 6382500, img: "/assets/images/products/VALO_01.jpg" },
    { id: 53, industries: ['Office', 'Hospitality', 'Government'], category: "Credenza", series: "Valo", name: "VALO-02", specs: "800 (P) x 400 (L) x 900 (T) mm", price: 4450000, price_tax: 4939500, img: "/assets/images/products/VALO_02.jpg" },
    { id: 54, industries: ['Office', 'Hospitality', 'Government'], category: "Credenza", series: "Valo", name: "VALO-03", specs: "1300 (P) x 400 (L) x 900 (T) mm", price: 5750000, price_tax: 6382500, img: "/assets/images/products/VALO_03.jpg" },
    { id: 55, industries: ['Office', 'Hospitality', 'Government'], category: "Credenza", series: "Valo", name: "VALO-04", specs: "800 (P) x 400 (L) x 900 (T) mm", price: 4450000, price_tax: 4939500, img: "/assets/images/products/VALO_04.jpg" },
    { id: 56, industries: ['Office', 'Hospitality', 'Government'], category: "Credenza", series: "Valo", name: "VALO-CRB04", specs: "2000 (P) x 400 (L) x 900 (T) mm", price: 8840000, price_tax: 9812400, img: "/assets/images/products/VALO_CRB_04.jpg" },
    { id: 57, industries: ['Office', 'Hospitality', 'Government'], category: "Meja Meeting", series: "Fermi", name: "FERMI-01", specs: "2400 (P) x 1200 (L) x 750 (T)", price: 11950000, price_tax: 13264500, img: "/assets/images/products/FERMI_01.jpg" },
    { id: 58, industries: ['Office', 'Hospitality', 'Government'], category: "Meja Meeting", series: "Fermi", name: "FERMI-02", specs: "Diameter = 1200 mm", price: 10850000, price_tax: 12043500, img: "/assets/images/products/FERMI_02.jpg" },
    { id: 59, industries: ['Office', 'Hospitality', 'Government'], category: "Meja Meeting", series: "Fermi", name: "FERMI-03", specs: "Diameter = 1000 mm", price: 7200000, price_tax: 7992000, img: "/assets/images/products/FERMI_03.jpg" },
    { id: 60, industries: ['Office', 'Hospitality', 'Government'], category: "Meja Meeting", series: "Fermi", name: "FERMI-ST-01-6px", specs: "2400 (P) x 1200 (L) x 750 (T) mm", price: 10400000, price_tax: 11544000, img: "/assets/images/products/FERMI_ST_01.jpg" },
    { id: 61, industries: ['Office', 'Hospitality', 'Government'], category: "Meja Meeting", series: "Fermi", name: "FERMI-ST-01-10px", specs: "2800 (P) x 1200 (L) x 750 (T) mm", price: 12500000, price_tax: 13875000, img: "/assets/images/products/FERMI_ST_01.jpg" },
    { id: 62, industries: ['Office', 'Hospitality', 'Government'], category: "Meja Meeting", series: "Fermi", name: "FERMI-ST-01-12px", specs: "3600 (P) x 1200 (L) x 750 (T) mm", price: 17600000, price_tax: 19536000, img: "/assets/images/products/FERMI_ST_01.jpg" },
    { id: 63, industries: ['Office', 'Hospitality', 'Government'], category: "Meja Meeting", series: "Fermi", name: "FERMI-ST-01-16px", specs: "5000 (P) x 1200 (L) x 750 (T) mm", price: 21300000, price_tax: 23643000, img: "/assets/images/products/FERMI_ST_01.jpg" },
    { id: 64, industries: ['Office', 'Hospitality', 'Government'], category: "Meja Meeting", series: "Fermi", name: "FERMI-ST-02 6px", specs: "2400 (P) x 1200 (L) x 750 (T) mm", price: 13600000, price_tax: 15096000, img: "/assets/images/products/FERMI_ST_02.jpg" },
    { id: 65, industries: ['Office', 'Hospitality', 'Government'], category: "Meja Meeting", series: "Fermi", name: "FERMI-ST-02 10px", specs: "2800 (P) x 1200 (L) x 750 (T) mm", price: 15500000, price_tax: 17205000, img: "/assets/images/products/FERMI_ST_02.jpg" },
    { id: 66, industries: ['Office', 'Hospitality', 'Government'], category: "Meja Meeting", series: "Fermi", name: "FERMI-ST-02 12px", specs: "3600 (P) x 1200 (L) x 750 (T) mm", price: 19000000, price_tax: 21090000, img: "/assets/images/products/FERMI_ST_02.jpg" },
    { id: 67, industries: ['Office', 'Hospitality', 'Government'], category: "Meja Meeting", series: "Fermi", name: "FERMI-ST-02 16px", specs: "5000 (P) x 1200 (L) x 750 (T) mm", price: 26400000, price_tax: 29304000, img: "/assets/images/products/FERMI_ST_02.jpg" },
    { id: 68, industries: ['Office', 'Hospitality', 'Government'], category: "Meja Meeting", series: "Fermi", name: "FERMI-ST-03 6px", specs: "2400 (P) x 1200 (L) x 750 (T) mm", price: 11440000, price_tax: 12698400, img: "/assets/images/products/FERMI_ST_03.jpg" },
    { id: 69, industries: ['Office', 'Hospitality', 'Government'], category: "Meja Meeting", series: "Fermi", name: "FERMI-ST-03 10px", specs: "2800 (P) x 1200 (L) x 750 (T) mm", price: 13300000, price_tax: 14763000, img: "/assets/images/products/FERMI_ST_03.jpg" },
    { id: 70, industries: ['Office', 'Hospitality', 'Government'], category: "Meja Meeting", series: "Fermi", name: "FERMI-ST-03 12px", specs: "3600 (P) x 1200 (L) x 750 (T) mm", price: 17100000, price_tax: 18981000, img: "/assets/images/products/FERMI_ST_03.jpg" },
    { id: 71, industries: ['Office', 'Hospitality', 'Government'], category: "Meja Meeting", series: "Fermi", name: "FERMI-ST-03 16px", specs: "5000 (P) x 1200 (L) x 750 (T) mm", price: 23700000, price_tax: 26307000, img: "/assets/images/products/FERMI_ST_03.jpg" },
    { id: 72, industries: ['Office', 'Government'], category: "Meja Meeting", series: "Luna", name: "LMT-01", specs: "2800 (P) x 1200 (L) x 750 (T) mm", price: 15900000, price_tax: 17649000, img: "/assets/images/products/LUNA_LMT.jpg" },
    { id: 73, industries: ['Office', 'Government'], category: "Meja Meeting", series: "Luna", name: "LMT-02", specs: "3000 (P) x 1200 (L) x 750 (T) mm", price: 17100000, price_tax: 18981000, img: "/assets/images/products/LUNA_LMT.jpg" },
    { id: 74, industries: ['Office', 'Government'], category: "Meja Meeting", series: "Luna", name: "LMT-03", specs: "3600 (P) x 1200 (L) x 750 (T) mm", price: 18200000, price_tax: 20202000, img: "/assets/images/products/LUNA_LMT.jpg" },
    { id: 75, industries: ['Office', 'Government'], category: "Meja Meeting", series: "Nova", name: "NMT-01", specs: "2400 (P) x 1200 (L) x 750 (T) mm", price: 15100000, price_tax: 16761000, img: "/assets/images/products/NOVE_MT.jpg" },
    { id: 76, industries: ['Office', 'Government'], category: "Meja Meeting", series: "Nova", name: "NMT-02", specs: "2800 (P) x 1200 (L) x 750 (T) mm", price: 17300000, price_tax: 19203000, img: "/assets/images/products/NOVE_MT.jpg" },
    { id: 77, industries: ['Office', 'Government'], category: "Meja Meeting", series: "Nova", name: "NMT-03", specs: "3000 (P) x 1200 (L) x 750 (T) mm", price: 18700000, price_tax: 20757000, img: "/assets/images/products/NOVE_MT.jpg" },
    { id: 78, industries: ['Office', 'Hospitality', 'Government'], category: "Coffee Table", series: "Verne", name: "VERNE-01", specs: "1200 (P) x 700 (L) x 450 (T) mm", price: 13000000, price_tax: 14430000, img: "/assets/images/products/VERNE_01.jpg" },
    { id: 79, industries: ['Office', 'Hospitality', 'Government'], category: "Coffee Table", series: "Verne", name: "VERNE-02", specs: "900 (P) x 900 (L) x 450 (T) mm", price: 9900000, price_tax: 10989000, img: "/assets/images/products/VERNE_02.jpg" },
    { id: 80, industries: ['Office', 'Hospitality', 'Government'], category: "Coffee Table", series: "Bohr", name: "BOHR-01", specs: "1200 (P) x 600 (L) x 450 (T) mm", price: 9900000, price_tax: 10989000, img: "/assets/images/products/BOHR_01.jpg" },
    { id: 81, industries: ['Office', 'Hospitality', 'Government'], category: "Coffee Table", series: "Bohr", name: "BOHR-02", specs: "1200 (P) x 600 (L) x 450 (T) mm", price: 8100000, price_tax: 8991000, img: "/assets/images/products/BOHR_02.jpg" },
    { id: 82, industries: ['Office', 'Hospitality', 'Government'], category: "Coffee Table", series: "Bohr", name: "BOHR-03", specs: "800 (P) x 400 (L) x 450 (T)", price: 5200000, price_tax: 5772000, img: "/assets/images/products/BOHR_03.jpg" },
    { id: 83, industries: ['Office', 'Hospitality', 'Government'], category: "Coffee Table", series: "Bohr", name: "BOHR-04", specs: "1200 (P) x 600 (L) x 450 (T) mm", price: 5750000, price_tax: 6382500, img: "/assets/images/products/BOHR_04.jpg" },
    { id: 84, industries: ['Office', 'Hospitality', 'Government'], category: "Coffee Table", series: "Bohr", name: "BOHR-05", specs: "Diameter = 600 mm", price: 7300000, price_tax: 8103000, img: "/assets/images/products/BOHR_05.jpg" },
    { id: 85, industries: ['Office', 'Hospitality', 'Government'], category: "Coffee Table", series: "Bohr", name: "BOHR-06", specs: "1200 (P) x 600 (L) x 450 (T) mm", price: 7850000, price_tax: 8713500, img: "/assets/images/products/BOHR_06.jpg" },
    { id: 86, industries: ['Education'], category: "Meja Belajar Sekolah", series: "Standard", name: "MB-01", specs: "600 (P) x 550 (L) x 690 (T) mm", price: 1670000, price_tax: 1853700, img: "/assets/images/products/MB_01.jpg" },
    { id: 87, industries: ['Education'], category: "Meja Belajar Sekolah", series: "Standard", name: "MB-02", specs: "600 (P) x 550 (L) x 720 (T) mm", price: 1880000, price_tax: 2086800, img: "/assets/images/products/MB_02.jpg" },
    { id: 88, industries: ['Education'], category: "Meja Belajar Sekolah", series: "Standard", name: "MB-03", specs: "600 (P) x 600 (L) x 750 (T) mm", price: 2100000, price_tax: 2331000, img: "/assets/images/products/MB_03.jpg" },
    { id: 89, industries: ['Hospitality'], category: "Kursi Makan", series: "Bara", name: "KM-01", specs: "Keseluruhan: 450 (P) x 450 (L) x 900 (L) mm", price: 2640000, price_tax: 2930400, img: "/assets/images/products/KM_01.jpg" },
    { id: 90, industries: ['Hospitality'], category: "Kursi Makan", series: "Bara", name: "KM - 02", specs: "Keseluruhan: 450 (P) x 450 (L) x 800 (L) mm", price: 2300000, price_tax: 2553000, img: "/assets/images/products/KM_02.jpg" },
    { id: 91, industries: ['Hospitality'], category: "Meja Makan", series: "Bara", name: "BARA-01", specs: "1800 (P) x 1000 (L) x 750 (T) mm", price: 10725000, price_tax: 11904750, img: "/assets/images/products/BARA_01.jpg" },
    { id: 92, industries: ['Hospitality'], category: "Meja Makan", series: "Bara", name: "BARA-01 4px", specs: "1600 (P) x 1000 (L) x 750 (T) mm", price: 9600000, price_tax: 10656000, img: "/assets/images/products/BARA_01.jpg" },
    { id: 93, industries: ['Hospitality'], category: "Meja Makan", series: "Bara", name: "BARA-01 6px", specs: "1800 (P) x 1200 (L) x 750 (T) mm", price: 12870000, price_tax: 14285700, img: "/assets/images/products/BARA_01.jpg" },
    { id: 94, industries: ['Hospitality'], category: "Meja Makan", series: "Bara", name: "BARA-01 8px", specs: "2200 (P) x 1200 (L) x 750 (T) mm", price: 15730000, price_tax: 17460300, img: "/assets/images/products/BARA_01.jpg" },
    { id: 95, industries: ['Hospitality'], category: "Meja Makan", series: "Bara", name: "BARA-02 4px", specs: "1600 (P) x 1000 (L) x 750 (T) mm", price: 8250000, price_tax: 9157500, img: "/assets/images/products/BARA_02.jpg" },
    { id: 96, industries: ['Hospitality'], category: "Meja Makan", series: "Bara", name: "BARA-02 6px", specs: "1800 (P) x 1200 (L) x 750 (T) mm", price: 9300000, price_tax: 10323000, img: "/assets/images/products/BARA_02.jpg" },
    { id: 97, industries: ['Hospitality'], category: "Meja Makan", series: "Bara", name: "BARA-02 8px", specs: "2200 (P) x 1200 (L) x 750 (T) mm", price: 11350000, price_tax: 12598500, img: "/assets/images/products/BARA_02.jpg" },
    { id: 98, industries: ['Hospitality'], category: "Meja Makan", series: "Bara", name: "BARA-03 4px", specs: "1600 (P) x 1000 (L) x 750 (T) mm", price: 8500000, price_tax: 9435000, img: "/assets/images/products/BARA_03.jpg" },
    { id: 99, industries: ['Hospitality'], category: "Meja Makan", series: "Bara", name: "BARA-03 6px", specs: "1800 (P) x 1200 (L) x 750 (T) mm", price: 9200000, price_tax: 10212000, img: "/assets/images/products/BARA_03.jpg" },
    { id: 100, industries: ['Hospitality'], category: "Meja Makan", series: "Bara", name: "BARA-03 8px", specs: "2200 (P) x 1200 (L) x 750 (T) mm", price: 10600000, price_tax: 11766000, img: "/assets/images/products/BARA_03.jpg" },
    { id: 101, industries: ['Hospitality'], category: "Wardrobe", series: "Hyla", name: "HYLA-01", specs: "1200 (P) x 600 (L) x 2300 (T)", price: 14700000, price_tax: 16317000, img: "/assets/images/products/HYLA_01.jpg" },
    { id: 102, industries: ['Hospitality'], category: "Wardrobe", series: "Hyla", name: "HYLA-02", specs: "1200 (P) x 600 (L) x 2300 (T)", price: 10550000, price_tax: 11710500, img: "/assets/images/products/HYLA_02.jpg" },
    { id: 103, industries: ['Hospitality'], category: "Side Table", series: "Rivera", name: "RIVERA-01", specs: "500 (P) x 400 (L) x 500 (T) mm", price: 2750000, price_tax: 3052500, img: "/assets/images/products/RIVERA_01.jpg" },
    { id: 104, industries: ['Hospitality'], category: "Side Table", series: "Rivera", name: "RIVERA-02", specs: "850 (P) x 400 (L) x 520 (T) mm", price: 3700000, price_tax: 4107000, img: "/assets/images/products/RIVERA_02.jpg" },
    { id: 105, industries: ['Hospitality'], category: "Mobile Drawer", series: "Cosmo", name: "CSD-03", specs: "500 (P) x 400 (L) x 400 (T) mm", price: 2750000, price_tax: 3052500, img: "/assets/images/products/CSD_01.jpg" },
    { id: 106, industries: ['Hospitality'], category: "Tempat Tidur", series: "Cosmo", name: "DIPAN-01", specs: "Dipan: 2020 (P) x 2020 (L) x 300 (T) mm", price: 31750000, price_tax: 35242500, img: "/assets/images/products/DIVAN_01.jpg" },
    { id: 107, industries: ['Hospitality'], category: "Tempat Tidur", series: "Cosmo", name: "DIPAN-02", specs: "Dipan: 2020 (P) x 1820 (L) x 300 (T) mm", price: 24000000, price_tax: 26640000, img: "/assets/images/products/DIVAN_02.jpg" },
    { id: 108, industries: ['Hospitality'], category: "Tempat Tidur", series: "Cosmo", name: "DIPAN-03", specs: "Dipan: 2020 (P) x 2020 (L) x 300 (T) mm", price: 34875000, price_tax: 38711250, img: "/assets/images/products/DIVAN_03.jpg" },
    { id: 109, industries: ['Hospitality'], category: "Tempat Tidur", series: "Cosmo", name: "DIPAN-04", specs: "Dipan: 2020 (P) x 1820 (L) x 300 (T) mm", price: 27125000, price_tax: 30108750, img: "/assets/images/products/DIVAN_04.jpg" },
    { id: 110, industries: ['Office', 'Hospitality', 'Government'], category: "Sofa", series: "RD", name: "RD-03", specs: "Keseluruhan: 2200 (P) x 830 (L) x 770 (T) mm", price: 23650000, price_tax: 26251500, img: "/assets/images/products/RD_03.jpg" },
    { id: 111, industries: ['Office', 'Hospitality', 'Government'], category: "Sofa", series: "RD", name: "RD-01", specs: "Keseluruhan: 920 (P) x 830 (L) x 770 (T) mm", price: 10980000, price_tax: 12187800, img: "/assets/images/products/RD_01.jpg" },
    { id: 112, industries: ['Office', 'Hospitality', 'Government'], category: "Sofa", series: "SRK", name: "SRK-L", specs: "Panjang Sofa: 2400 + 2000 mm", price: 47275000, price_tax: 52475250, img: "/assets/images/products/SRK_L.jpg" },
    { id: 113, industries: ['Office', 'Hospitality', 'Government'], category: "Daun Pintu", series: "Standard", name: "DT-01", specs: "2200 (P) x 820 (T) x 36 (L)", price: 5600000, price_tax: 6216000, img: "/assets/images/products/DT_01.jpg" },
    { id: 114, industries: ['Office', 'Hospitality', 'Government'], category: "Daun Pintu", series: "Standard", name: "DT-02", specs: "2200 (P) x 820 (T) x 36 (L)", price: 6230000, price_tax: 6915300, img: "/assets/images/products/DT_02.jpg" },
    { id: 115, industries: ['Office', 'Hospitality', 'Government'], category: "Daun Pintu", series: "Standard", name: "DT-03", specs: "2200 (P) x 820 (T) x 36 (L)", price: 6500000, price_tax: 7215000, img: "/assets/images/products/DT_03.jpg" },
    { id: 116, industries: ['Office', 'Hospitality', 'Government'], category: "Daun Pintu", series: "Standard", name: "DT-04", specs: "2200 (P) x 820 (T) x 36 (L)", price: 6300000, price_tax: 6993000, img: "/assets/images/products/DT_04.jpg" },
    { id: 117, industries: ['Hospitality', 'Office'], category: "Kursi", series: "Kursi Kayu", name: "KH-01", specs: "Kursi Hadap / Kursi Cafe Kayu", price: 1850000, price_tax: 2053500, img: "/assets/images/products/KH_01.png" },
    { id: 118, industries: ['Hospitality', 'Office'], category: "Kursi", series: "Kursi Kayu", name: "KH-02", specs: "Kursi Hadap / Kursi Cafe Kayu", price: 1950000, price_tax: 2164500, img: "/assets/images/products/KH_02.png" },
    { id: 119, industries: ['Hospitality', 'Office'], category: "Kursi", series: "Kursi Kayu", name: "KH-03", specs: "Kursi Hadap / Kursi Cafe Kayu", price: 1750000, price_tax: 1942500, img: "/assets/images/products/KH_03.png" },
    { id: 120, industries: ['Hospitality', 'Office'], category: "Kursi", series: "Kursi Kayu", name: "KJ-01", specs: "Kursi Jengki Kayu Solid", price: 2250000, price_tax: 2497500, img: "/assets/images/products/KJ_01.png" },
    { id: 121, industries: ['Hospitality', 'Office'], category: "Kursi", series: "Kursi Kayu", name: "KM-01", specs: "Kursi Makan Kayu Modern", price: 2150000, price_tax: 2386500, img: "/assets/images/products/KM_CHAIR_01.png" },
  ],

  images: {
    hero: [
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=90&w=2200",
      "https://images.unsplash.com/photo-1497215842964-222b430dc094?auto=format&fit=crop&q=90&w=2200",
      "https://images.unsplash.com/photo-1497366412874-3415097a27e7?auto=format&fit=crop&q=90&w=2200"
    ],
    catalog: {
      workstations: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&q=80&w=1200",
      executive: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200",
      hospitality: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=1200",
      furniture: "https://images.unsplash.com/photo-1531973576160-7125cd663d86?auto=format&fit=crop&q=80&w=1200"
    }
  },

  contact: {
    address: "Jl. Dirgantara Raya Blok A No. 7, BDP – Jatisari– Jatiasih– Bekasi 17426",
    phones: ["(021) 84598590"],
    whatsapp: "6282359440670",
    emails: ["kcraharja@yahoo.com", "info@karyaciptaraharja.com"],
    locations: [
      {
        city: "Jakarta (HQ)",
        address: "Jl. Dirgantara Raya Blok A No. 7, BDP – Jatisari – Jatiasih – Bekasi 17426",
        phone: "(021) 84598590",
        email: "info@karyaciptaraharja.com"
      },
      {
        city: "Solo & Yogyakarta",
        address: "Area Solo - Yogyakarta Regional Hub",
        phone: "(021) 84598590",
        email: "solo.yogya@karyaciptaraharja.com"
      },
      {
        city: "Bali",
        address: "Bali Regional Office & Showroom Hub",
        phone: "(021) 84598590",
        email: "bali@karyaciptaraharja.com"
      },
      {
        city: "Kalimantan Hub",
        address: "Kalimantan Project Coordination Center",
        phone: "(021) 84598590",
        email: "kalimantan@karyaciptaraharja.com"
      }
    ]
  },

  caseStudies: [
    {
      id: "cs-bea-cukai",
      title: "Kantor Bea Cukai Purwakarta",
      industry: "Government Institution",
      scope: "Pekerjaan Interior Fit-Out lengkap mencakup custom furniture, wall padding, dan backdrop lobby yang merepresentasikan identitas institusi.",
      timeline: "8 Weeks",
      outcomes: [
        "Desain interior yang formal dan profesional",
        "Pemanfaatan ruang lobby yang lebih efisien",
        "Akurasi detail pada backdrop logo institusi"
      ],
      beforeImage: "/assets/images/projects/BEACUKAI_BEFORE.jpg",
      afterImage: "/assets/images/projects/BEACUKAI_AFTER.jpg"
    },
    {
      id: "cs-ilab",
      title: "iLab Entrepreneurship Space",
      industry: "Education / Tech Hub",
      scope: "Pembangunan ruang kerja kolaboratif dan area workshop dengan konsep open-space dan furnitur dinamis.",
      timeline: "6 Weeks",
      outcomes: [
        "Menciptakan lingkungan kerja yang mendorong kreativitas",
        "Fleksibilitas layout untuk berbagai jenis workshop",
        "Integrasi sistem kabel yang rapi pada setiap workstation"
      ],
      beforeImage: "/assets/images/projects/ILAB_BEFORE.jpg",
      afterImage: "/assets/images/projects/ILAB_AFTER.jpg"
    }
  ],

  insights: [
    {
      id: "insight-layout-strategy",
      title: "Workspace Layout Strategy for Hybrid Teams",
      type: "Guide",
      summary: "How to balance focus areas, collaboration points, and circulation flow in one floorplate.",
      readTime: "6 min read"
    },
    {
      id: "insight-material-spec",
      title: "Material Specification Checklist for Office Fit-Out",
      type: "Implementation Notes",
      summary: "A practical spec checklist to reduce revision loops during procurement and installation.",
      readTime: "8 min read"
    },
    {
      id: "insight-hospitality-durability",
      title: "Durability Planning for Hospitality Furniture",
      type: "Insights",
      summary: "Selecting finishes and joinery standards that hold up under high-frequency operations.",
      readTime: "5 min read"
    }
    ],

    professionalProgram: {
    benefits: [
      "Respons Prioritas 24 Jam: Dedicated account lead untuk setiap proyek.",
      "Cost Engineering: Optimalisasi spesifikasi material sesuai anggaran.",
      "Kapasitas Manufaktur Massal: Dukungan penuh pabrik AMS Bekasi.",
      "Instalasi Profesional: Tim lapangan berpengalaman untuk roll-out nasional.",
      "Akses Blueprint & CAD: Memudahkan integrasi desain bagi arsitek."
    ],
    process: [
      "Consultation: Diskusi awal mengenai lingkup dan kebutuhan proyek.",
      "Technical Proposal: Penyerahan draf spesifikasi dan estimasi biaya.",
      "Manufacturing: Produksi presisi dengan teknologi CNC.",
      "Logistics & Installation: Pengiriman dan pemasangan tepat waktu."
    ]
    },
    industrySolutions: {
      Office: {
        headline: "Solusi Ruang Kerja Korporasi Modern",
        description: "Sistem workstation dan furnitur kantor modular yang dirancang untuk meningkatkan produktivitas, kolaborasi tim, dan efisiensi operasional perusahaan.",
        contextualMessage: "Optimalkan performa tim dengan lingkungan kerja yang ergonomis dan profesional."
      },
      Hospitality: {
        headline: "Eksklusivitas untuk Industri Hospitality",
        description: "Furnitur premium dengan standar ketahanan hotel berbintang. Menggunakan finishing high-end untuk menciptakan pengalaman tamu yang tak terlupakan.",
        contextualMessage: "Hadirkan kenyamanan dan kemewahan yang tahan lama bagi tamu properti Anda."
      },
      Government: {
        headline: "Keandalan untuk Instansi Pemerintah",
        description: "Furnitur dengan desain formal dan material berkualitas tinggi yang memenuhi standar pengadaan institusi publik dan perkantoran pemerintahan.",
        contextualMessage: "Wujudkan ruang publik yang representatif, berwibawa, dan tahan lama."
      },
      Education: {
        headline: "Infrastruktur Edukasi yang Inspiratif",
        description: "Solusi meja belajar dan furnitur ruang kelas yang fleksibel, mendukung metode pembelajaran aktif dan memiliki ketahanan tinggi terhadap penggunaan harian.",
        contextualMessage: "Dukung perkembangan generasi masa depan dengan fasilitas belajar yang berkualitas."
      }
    },
    };

export interface EcommerceLink {
  platform: string;
  url: string;
  productUrl: string;
}

const projectTagsByCategory: Record<string, string[]> = {
  'Meja Kerja': ['Korporasi', 'Executive Office', 'Ruang Kerja Presisi'],
  Workstation: ['Kapasitas Massal', 'Open Plan Office', 'Pusat Inovasi'],
  'Meja Makan': ['Restoran', 'Hospitality', 'Hunian Premium'],
  'Coffee Table': ['Lobby', 'Lounge', 'Area Resepsionis'],
  Sofa: ['Executive Lounge', 'Area Tunggu', 'Ruang Santai'],
  'Tempat Tidur': ['Hotel', 'Resort', 'Suite Mewah'],
  Wardrobe: ['Kamar Hotel', 'Apartemen Service', 'Bespoke Storage']
};

export const getProjectTags = (category: string): string[] =>
  projectTagsByCategory[category] ?? ['Proyek Korporasi', 'Hospitality', 'Instansi'];

export const getIndustryBadge = (industry: string): string | null => {
  const badges: Record<string, string> = {
    office: 'Corporate Standard',
    hospitality: 'Hospitality Grade',
    government: 'Government Spec',
    education: 'Educational Standard',
  };
  return badges[industry.toLowerCase()] || null;
};

export const getMarketplaceLinksForProduct = (_productName: string): EcommerceLink[] => {
  return [];
};
