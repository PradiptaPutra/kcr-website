export const kcrData = {
  company: {
    name: "PT. KARYA CIPTA RAHARJA",
    tagline: "Kontraktor Bangunan BUMN & Spesialis Shotcrete Indonesia",
    description: "Sejak 2006, PT. KARYA CIPTA RAHARJA telah mendedikasikan diri sebagai Kontraktor Bangunan BUMN dan Spesialis Shotcrete Indonesia dengan keahlian teknis serta integritas material tinggi. Kami mengukuhkan standar kualitas yang tak kenal kompromi sebagai mitra tepercaya bagi proyek infrastruktur vital di Indonesia.",
    introduction: "Reputasi kami ditempa melalui eksekusi presisi pada berbagai Proyek Strategis Nasional (PSN). Sebagai Kontraktor Bangunan BUMN yang berpengalaman, filosofi kami sederhana: menghadirkan solusi konstruksi yang tak hanya kokoh secara struktural, namun juga efisien secara substansial melalui manajemen teknis yang saksama.",
    specialization: "KCR mengejawantahkan inovasi melalui layanan Spesialis Shotcrete Indonesia dan sistem bangunan prefabrikasi (Prefab Building) berbasis Rangka Baja Ringan—sebuah evolusi dalam kecepatan, presisi, dan estetika konstruksi industrial modern.",
    vision: "Visi kami adalah menjadi pionir solusi konstruksi terintegrasi yang mendefinisikan ulang standar 'Building Contractor' melalui sinergi produk unggulan dan dedikasi teknis sebagai mitra utama BUMN."
  },
  services: [
    {
      id: "building-contractor",
      title: "KONTRAKTOR BANGUNAN BUMN",
      description: "Manajemen konstruksi komprehensif sebagai kontraktor bangunan BUMN yang memadukan ketelitian arsitektural dengan integritas struktural tingkat tinggi pada proyek skala nasional."
    },
    {
      id: "shotcrete-specialist",
      title: "SPESIALIS SHOTCRETE INDONESIA",
      description: "Layanan spesialis aplikasi beton semprot (Shotcrete) di Indonesia untuk stabilitas lereng, terowongan, dan perkuatan infrastruktur dengan durabilitas jangka panjang berstandar internasional."
    },
    {
      id: "prefab-building",
      title: "PREFAB BUILDING SYSTEM",
      description: "Transformasi ruang melalui sistem prefabrikasi baja ringan yang mengedepankan efisiensi waktu tanpa mereduksi kualitas."
    },
    {
      id: "interior-fitout",
      title: "INTERIOR & FURNITURE",
      description: "Pengerjaan interior kelas atas dan furnitur kustom yang dirancang untuk merefleksikan prestise ruang komersial dan eksekutif."
    }
  ],
  products: {
    executiveDesks: [
      {
        series: "INCORE SERIES",
        models: [
          { name: "Incore IST 01 - 24", dim: "240 x 240 x 75" },
          { name: "Incore IST 02 - 24", dim: "270 x 240 x 75" }
        ]
      }
    ],
    workstations: [
      {
        series: "MODERNA SERIES",
        models: [
          { name: "Moderna MSA", capacity: "4,6,8 Px" }
        ]
      }
    ]
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
