import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CaretRight, CaretLeft, ArrowUpRight } from '@phosphor-icons/react';
import { kcrData } from '../data/kcrData';
import SEO from '../components/SEO';
import ProductCard from '../components/ProductCard';

const Home: React.FC = () => {
  const [heroIndex, setHeroIndex] = useState(0);
  
  const fadeInUp = {
    initial: { y: 20, opacity: 0 },
    whileInView: { y: 0, opacity: 1 },
    viewport: { once: true },
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as any }
  };

  return (
    <div className="bg-[#F5F5F0]">
      <SEO 
        title="High-End Office & Hospitality Furniture Solutions"
        description="KCR Furniture (PT. KARYA CIPTA RAHARJA) adalah penyedia furnitur kantor eksekutif and hospitality premium. Manufaktur presisi dengan teknologi CNC standar Eropa sejak 2006."
        keywords="Furniture Kantor, Office Furniture, Workstation, Meja Eksekutif, Hospitality Furniture, Furniture Hotel, CNC Furniture, KCR Furniture"
        canonicalUrl="/"
        ogImage={kcrData.images.hero[0]}
      />

      {/* 1. HERO */}
      <section className="relative h-screen w-full overflow-hidden bg-[#1a1c19] flex flex-col items-center">
        <motion.div 
          key={heroIndex}
          initial={{ scale: 1.05, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.5 }}
          transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] as any }}
          className="absolute inset-0"
        >
          <img className="w-full h-full object-cover" src={kcrData.images.hero[heroIndex]} alt={`KCR Furniture Project - ${heroIndex + 1}`} />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40" />
        </motion.div>

        {/* Vertical Spacer for Fixed Navbar */}
        <div className="h-[72px] w-full shrink-0" />

        {/* Main Content - Pushed to center of remaining space */}
        <div className="relative z-10 text-center px-6 max-w-5xl flex-1 flex flex-col justify-center items-center">
           <motion.span initial={{ opacity: 0 }} animate={{ opacity: 0.6 }} transition={{ delay: 0.5 }} className="framer-label text-white mb-8 block tracking-[0.8em]">EST. 2006</motion.span>
           <h1 className="framer-h1 text-white mb-8">
             <motion.span initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.7 }} className="block">Desain Tanpa <span className="italic font-serif">Kompromi</span>,</motion.span>
             <motion.span initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 0.8 }} transition={{ delay: 0.9 }} className="block font-serif italic text-white/80">Presisi Tanpa Henti.</motion.span>
           </h1>
           <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }} className="text-white/60 text-lg mb-12 max-w-2xl mx-auto font-light leading-relaxed">
             Penyedia Solusi Furnitur Kantor & Hospitality premium dengan manufaktur mandiri berbasis teknologi CNC standar Eropa.
           </motion.p>
           <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3 }} className="flex flex-col sm:flex-row items-center justify-center gap-6">
             <Link to="/contact" className="framer-btn !bg-brand !text-white border-none hover:scale-105 transition-transform px-10">
               Konsultasi Interior Gratis
             </Link>
             <Link to="/catalog" className="framer-btn !border-white/40 !text-white hover:!bg-white hover:!text-[#2A2C2B] px-10">
               Lihat Katalog Produk
             </Link>
           </motion.div>
        </div>

        {/* Trust Indicators */}
        <div className="relative z-20 w-full hidden md:block pb-12 shrink-0">
          <div className="framer-container">
            <div className="grid grid-cols-3 gap-12 border-t border-white/10 pt-10">
              <div className="text-center">
                <span className="block text-white text-3xl font-serif mb-2">17+</span>
                <span className="text-white/40 uppercase tracking-widest text-xs">Tahun Pengalaman</span>
              </div>
              <div className="text-center">
                <span className="block text-white text-3xl font-serif mb-2">CNC</span>
                <span className="text-white/40 uppercase tracking-widest text-xs">Teknologi Presisi</span>
              </div>
              <div className="text-center">
                <span className="block text-white text-3xl font-serif mb-2">CUSTOM</span>
                <span className="text-white/40 uppercase tracking-widest text-xs">Solusi Terpersonalisasi</span>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 z-30 flex justify-between px-8 pointer-events-none">
          <button 
            onClick={() => setHeroIndex(prev => (prev === 0 ? kcrData.images.hero.length - 1 : prev - 1))} 
            className="text-white/20 hover:text-white transition-all pointer-events-auto p-4"
            aria-label="Previous Hero Image"
          >
            <CaretLeft weight="light" size={32} />
          </button>
          <button 
            onClick={() => setHeroIndex(prev => (prev === kcrData.images.hero.length - 1 ? 0 : prev + 1))} 
            className="text-white/20 hover:text-white transition-all pointer-events-auto p-4"
            aria-label="Next Hero Image"
          >
            <CaretRight weight="light" size={32} />
          </button>
        </div>
      </section>

      {/* 2. NARRATIVE */}
      <section className="py-20 md:py-32 framer-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <motion.div {...fadeInUp} className="lg:col-span-5 border-l-2 border-brand pl-10 py-2">
            <span className="framer-label text-brand mb-8 block">01 / MENGAPA KCR FURNITURE</span>
            <h2 className="framer-h2 leading-tight text-[#2A2C2B]">
              Keahlian Manufaktur untuk <br/> 
              <span className="italic text-brand font-serif text-[1.1em]">Ruang Masa Depan.</span>
            </h2>
          </motion.div>
          
          <motion.div {...fadeInUp} transition={{ delay: 0.2 }} className="lg:col-span-6 lg:col-start-7">
            <p className="framer-body !text-[18px] mb-10 text-[#2A2C2B] font-medium">
              Kami memahami bahwa ruang kerja and hospitality yang baik adalah perpaduan antara estetika, fungsi, and kenyamanan jangka panjang.
            </p>
            <p className="framer-body mb-10">
              Sebagai **Spesialis Furnitur Presisi**, KCR mengintegrasikan desain modern dengan teknologi CNC standar Eropa. Kami tidak hanya menyediakan produk, tetapi memberikan solusi tata ruang yang meningkatkan produktivitas and mencerminkan prestise brand Anda.
            </p>
            <Link to="/about" className="framer-label group flex items-center gap-4 hover:text-brand transition-all !opacity-100">
              Pelajari Standar Manufaktur Kami <CaretRight weight="bold" className="group-hover:translate-x-2 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 3. SOLUTIONS */}
      <section className="py-20 md:py-32 framer-container border-t border-[#2A2C2B]/5">
        <motion.div {...fadeInUp} className="mb-20">
          <span className="framer-label text-brand mb-6 block">02 / SOLUSI</span>
          <h2 className="framer-h2 text-[#2A2C2B]">Fokus Pada Kualitas & Estetika</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Link to="/services" className="block group">
            <motion.div 
              {...fadeInUp}
              className="bg-white p-12 border-[0.5px] border-[#2A2C2B]/10 rounded-[12px] flex flex-col gap-8 group-hover:border-brand transition-all duration-500 h-full"
            >
              <div className="flex justify-between items-start">
                <span className="framer-label text-brand !opacity-100">01</span>
                <div className="w-10 h-10 border border-[#2A2C2B]/10 rounded-full flex items-center justify-center group-hover:bg-[#2A2C2B] group-hover:text-white transition-all">
                  <ArrowUpRight weight="light" size={20} />
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <h3 className="font-serif text-[28px] text-[#2A2C2B] uppercase tracking-tight">Furnitur Kantor Modular</h3>
                <p className="framer-body !text-[15px] opacity-80">Sistem workstation and meja eksekutif yang fleksibel, dirancang untuk mendukung dinamika kerja modern and kolaborasi tim.</p>
              </div>
            </motion.div>
          </Link>

          <Link to="/services" className="block group">
            <motion.div 
              {...fadeInUp}
              transition={{ delay: 0.1 }}
              className="bg-white p-12 border-[0.5px] border-[#2A2C2B]/10 rounded-[12px] flex flex-col gap-8 group-hover:border-brand transition-all duration-500 h-full"
            >
              <div className="flex justify-between items-start">
                <span className="framer-label text-brand !opacity-100">02</span>
                <div className="w-10 h-10 border border-[#2A2C2B]/10 rounded-full flex items-center justify-center group-hover:bg-[#2A2C2B] group-hover:text-white transition-all">
                  <ArrowUpRight weight="light" size={20} />
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <h3 className="font-serif text-[28px] text-[#2A2C2B] uppercase tracking-tight">Hospitality & Hotel Custom</h3>
                <p className="framer-body !text-[15px] opacity-80">Menyediakan rangkaian tempat tidur, furnitur kamar, and dining sets custom dengan detail premium untuk hotel and resort.</p>
              </div>
            </motion.div>
          </Link>

          <Link to="/catalog" className="block group">
            <motion.div 
              {...fadeInUp}
              transition={{ delay: 0.2 }}
              className="bg-white p-12 border-[0.5px] border-[#2A2C2B]/10 rounded-[12px] flex flex-col gap-8 group-hover:border-brand transition-all duration-500 h-full"
            >
              <div className="flex justify-between items-start">
                <span className="framer-label text-brand !opacity-100">03</span>
                <div className="w-10 h-10 border border-[#2A2C2B]/10 rounded-full flex items-center justify-center group-hover:bg-[#2A2C2B] group-hover:text-white transition-all">
                  <ArrowUpRight weight="light" size={20} />
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <h3 className="font-serif text-[28px] text-[#2A2C2B] uppercase tracking-tight">Manufaktur CNC Presisi</h3>
                <p className="framer-body !text-[15px] opacity-80">Teknologi pemotongan and pengerjaan kayu berbasis CNC memastikan akurasi milimeter and konsistensi kualitas pada setiap unit produk.</p>
              </div>
            </motion.div>
          </Link>

          <Link to="/catalog" className="block group">
            <motion.div 
              {...fadeInUp}
              transition={{ delay: 0.3 }}
              className="bg-white p-12 border-[0.5px] border-[#2A2C2B]/10 rounded-[12px] flex flex-col gap-8 group-hover:border-brand transition-all duration-500 h-full"
            >
              <div className="flex justify-between items-start">
                <span className="framer-label text-brand !opacity-100">04</span>
                <div className="w-10 h-10 border border-[#2A2C2B]/10 rounded-full flex items-center justify-center group-hover:bg-[#2A2C2B] group-hover:text-white transition-all">
                  <ArrowUpRight weight="light" size={20} />
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <h3 className="font-serif text-[28px] text-[#2A2C2B] uppercase tracking-tight">Fit-Out Interior Eksekutif</h3>
                <p className="framer-body !text-[15px] opacity-80">Layanan menyeluruh mulai dari perencanaan layout hingga instalasi furnitur untuk menciptakan ruang interior yang kohesif and profesional.</p>
              </div>
            </motion.div>
          </Link>
        </div>
      </section>

      {/* 4. STRATEGIC ADVANTAGES */}
      <section className="py-20 md:py-32 bg-white relative overflow-hidden">
        <div className="framer-container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <motion.div {...fadeInUp} className="lg:col-span-6">
              <span className="framer-label text-brand mb-8 block tracking-[0.6em]">KEUNGGULAN STRATEGIS</span>
              <h2 className="framer-h2 mb-12 text-[#2A2C2B]">Mengapa Memilih <br/><span className="italic font-serif text-brand">KCR Furniture?</span></h2>
              <div className="space-y-10">
                <div className="flex gap-6">
                  <div className="w-12 h-12 rounded-full bg-[#F5F5F0] flex items-center justify-center flex-shrink-0 text-brand font-serif text-xl italic">1</div>
                  <div>
                    <h3 className="font-serif text-2xl text-[#2A2C2B] mb-2">European Standard Precision</h3>
                    <p className="framer-body !text-sm text-[#2A2C2B]/60">Pemanfaatan mesin CNC canggih dengan standar Eropa menjamin setiap produk memiliki detail yang sempurna and presisi tinggi yang sulit dicapai secara manual.</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="w-12 h-12 rounded-full bg-[#F5F5F0] flex items-center justify-center flex-shrink-0 text-brand font-serif text-xl italic">2</div>
                  <div>
                    <h3 className="font-serif text-2xl text-[#2A2C2B] mb-2">Customized Engineering</h3>
                    <p className="framer-body !text-sm text-[#2A2C2B]/60">Kami mampu mengadaptasi desain and material sesuai dengan kebutuhan spesifik proyek, anggaran klien, and identitas visual perusahaan Anda.</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="w-12 h-12 rounded-full bg-[#F5F5F0] flex items-center justify-center flex-shrink-0 text-brand font-serif text-xl italic">3</div>
                  <div>
                    <h3 className="font-serif text-2xl text-[#2A2C2B] mb-2">Mandiri & Terintegrasi</h3>
                    <p className="framer-body !text-sm text-[#2A2C2B]/60">Dengan fasilitas produksi sendiri, kami memiliki kontrol penuh terhadap lini masa produksi and standar kualitas, memastikan pengiriman tepat waktu.</p>
                  </div>
                </div>
              </div>
            </motion.div>
            <motion.div {...fadeInUp} transition={{ delay: 0.3 }} className="lg:col-span-5 lg:col-start-8">
              <div className="relative aspect-[4/5] rounded-[24px] overflow-hidden shadow-2xl group">
                <img src={kcrData.images.hero[1]} alt="KCR Manufacturing Process" className="w-full h-full object-cover" loading="lazy" />
                <div className="absolute bottom-8 left-8 right-8 p-8 bg-white/90 backdrop-blur-md rounded-xl">
                  <p className="framer-body !text-brand italic font-serif text-lg mb-2">"Presisi bukan sekadar angka, melainkan dedikasi kami untuk menghadirkan kualitas terbaik di setiap sudut ruangan Anda."</p>
                  <p className="framer-label !text-[#2A2C2B] !opacity-100">— Tim Produksi KCR</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 5. TRUSTED BY */}
      <section className="py-16 md:py-24 border-y border-[#2A2C2B]/5 bg-[#F5F5F0]/50">
        <div className="framer-container text-center">
          <span className="framer-label text-[#2A2C2B]/40 mb-12 block tracking-[0.4em]">DIPERCAYA OLEH MITRA STRATEGIS</span>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-40 hover:opacity-100 transition-opacity duration-500 grayscale">
             <div className="font-serif text-2xl tracking-tighter">BUMN <span className="text-brand">Financial</span></div>
             <div className="font-serif text-2xl tracking-tighter">Sektor <span className="text-brand">Perbankan</span></div>
             <div className="font-serif text-2xl tracking-tighter">Industri <span className="text-brand">Kreatif</span></div>
             <div className="font-serif text-2xl tracking-tighter">Luxury <span className="text-brand">Hotels</span></div>
          </div>
        </div>
      </section>

      {/* 6. ARCHIVES */}
      <section className="py-20 md:py-32 bg-[#2A2C2B] text-[#F5F5F0]">
        <div className="framer-container">
          <motion.div {...fadeInUp} className="mb-24 flex flex-col md:flex-row justify-between items-start md:items-end border-b border-white/10 pb-10 gap-6">
            <h2 className="framer-h1 !text-[42px] text-white">Bukti Nyata Karya Kami</h2>
            <Link to="/portfolio" className="framer-label !text-white hover:text-brand transition-all flex items-center gap-3">
              Lihat Semua Proyek <CaretRight weight="bold" />
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {kcrData.images.portfolio.map((p, idx) => (
              <ProductCard 
                key={p.id}
                series={p.title}
                img={p.img}
                description={p.client}
                label={`${p.year} / ${p.category}`}
                index={idx}
                ctaLink="/portfolio"
              />
            ))}
          </div>
        </div>
      </section>

      {/* 5. CTA */}
      <section className="py-24 md:py-40 framer-container text-center relative overflow-hidden">
        <motion.div {...fadeInUp}>
          <span className="framer-label text-brand mb-8 block tracking-[0.8em]">KONSULTASI</span>
          <h2 className="framer-h1 mb-8 text-[#2A2C2B]">Wujudkan Ruang Kerja <span className="italic font-serif text-brand">Impian Anda.</span></h2>
          <p className="framer-body max-w-2xl mx-auto mb-16 text-[#2A2C2B]/70">
            Dapatkan konsultasi desain and penawaran harga custom dari tim ahli kami untuk transformasi interior kantor atau hotel Anda.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link to="/contact" className="framer-btn !bg-[#2A2C2B] !text-white hover:!bg-brand border-none px-12">
              Mulai Konsultasi Gratis
            </Link>
            <a href="mailto:info@karyaciptaraharja.com" className="framer-label hover:text-brand transition-all flex items-center gap-2">
              Atau kirim email penawaran <CaretRight weight="bold" />
            </a>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Home;
