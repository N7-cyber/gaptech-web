import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GaptechLogo from './assets/logo_gaptech.png';
import { 
  Sun, Moon, Menu, X, Cpu, Code, Lightbulb, 
  CheckCircle2, ChevronDown, Wrench, Smartphone, Globe, 
  ArrowRight, MessageCircle, MapPin, Mail, Phone
} from 'lucide-react';

// --- FADE UP ANIMATION VARIANT ---
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);

  // --- MODAL STATE ---
  const [isWebModalOpen, setIsWebModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState("");

  const closeWebModal = () => {
    setIsWebModalOpen(false);
    setSelectedService("");
  };

  // Toggle Dark Mode
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Smooth Scroll Implementation
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => { document.documentElement.style.scrollBehavior = 'auto'; };
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'FAQ', href: '#faq' },
  ];

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className={`min-h-screen font-sans transition-colors duration-300 ${isDarkMode ? 'dark bg-[#0F172A] text-slate-50' : 'bg-[#F8FAFC] text-slate-900'}`}>
      
      {/* GLOBAL STYLES FOR MARQUEE */}
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
        body { font-family: 'Inter', sans-serif; overflow-x: hidden; }
        .marquee-container { display: flex; overflow: hidden; user-select: none; gap: 2rem; }
        .marquee-content { display: flex; flex-shrink: 0; min-width: 100%; justify-content: space-around; gap: 2rem; animation: scroll 20s linear infinite; }
        @keyframes scroll { from { transform: translateX(0); } to { transform: translateX(calc(-100% - 2rem)); } }
        .glass-nav { backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); }
        .text-gradient { background: linear-gradient(135deg, #2563EB 0%, #22C55E 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
      `}} />

      {/* 1. NAVBAR */}
      <nav className={`fixed w-full z-50 transition-all duration-300 glass-nav ${isDarkMode ? 'bg-[#0F172A]/80 border-b border-white/10' : 'bg-white/80 border-b border-slate-200'}`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo(0,0)}>
              <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-br from-blue-600/20 to-green-500/20 border border-white/10 shadow-lg backdrop-blur-md overflow-hidden">
                <img src={GaptechLogo} alt="Gaptech Logo" className="w-full h-full object-contain scale-[2]" />
              </div>
              <span className="font-bold text-xl tracking-tight">Gaptech</span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <a key={link.name} href={link.href} className="text-sm font-medium hover:text-blue-500 transition-colors">
                  {link.name}
                </a>
              ))}
            </div>

            {/* Right Actions */}
            <div className="hidden md:flex items-center space-x-4">
              <button onClick={() => setIsDarkMode(!isDarkMode)} className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors">
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              <a href="#contact" className="px-5 py-2.5 rounded-full text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white shadow-[0_0_15px_rgba(37,99,235,0.3)] transition-all">
                Konsultasi Gratis
              </a>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center gap-4">
              <button onClick={() => setIsDarkMode(!isDarkMode)} className="p-2">
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              <button onClick={toggleMenu} className="p-2">
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }} 
              animate={{ opacity: 1, height: 'auto' }} 
              exit={{ opacity: 0, height: 0 }}
              className={`md:hidden border-b ${isDarkMode ? 'bg-[#0F172A] border-white/10' : 'bg-white border-slate-200'}`}
            >
              <div className="px-6 py-4 space-y-4 flex flex-col">
                {navLinks.map((link) => (
                  <a key={link.name} href={link.href} onClick={toggleMenu} className="text-base font-medium">
                    {link.name}
                  </a>
                ))}
                <a href="#contact" onClick={toggleMenu} className="text-center w-full px-5 py-3 rounded-xl text-sm font-medium bg-blue-600 text-white mt-4">
                  Konsultasi Gratis
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* 2. HERO SECTION */}
      <section id="home" className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden flex items-center min-h-screen">
        {/* Background Gradients */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] -z-10" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-[120px] -z-10" />
        
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 w-full">
          <motion.div 
            initial="hidden" animate="visible" variants={staggerContainer}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-500 text-sm font-medium mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              Gaptech: Ubah Gaptek Jadi Tech-Savvy
            </motion.div>
            
            <motion.h1 variants={fadeUp} className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-[1.1]">
              Bingung Teknologi? <br />
              <span className="text-gradient">Kami Bantu.</span>
            </motion.h1>
            
            <motion.p variants={fadeUp} className={`text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              Gaptech membantu Anda memperbaiki perangkat, membuat website, dan memahami teknologi tanpa ribet. Solusi digital satu pintu untuk semua kebutuhan Anda.
            </motion.p>
            
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="#contact" className="w-full sm:w-auto px-8 py-4 rounded-full text-base font-semibold bg-blue-600 hover:bg-blue-700 text-white shadow-[0_0_20px_rgba(37,99,235,0.4)] transition-all flex items-center justify-center gap-2 group">
                Konsultasi Sekarang
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a href="#services" className={`w-full sm:w-auto px-8 py-4 rounded-full text-base font-semibold border transition-all ${isDarkMode ? 'border-slate-700 hover:bg-slate-800 text-white' : 'border-slate-300 hover:bg-slate-100 text-slate-900'}`}>
                Lihat Layanan
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 9. MARQUEE SECTION (Moved up for aesthetic tech vibe) */}
      <div className={`py-6 border-y ${isDarkMode ? 'border-white/5 bg-white/[0.02]' : 'border-slate-200 bg-slate-50'} overflow-hidden`}>
        <div className="marquee-container">
          <div className="marquee-content items-center">
            {['Servis Laptop', 'Website UMKM', 'Konsultasi Teknologi', 'Rakit PC Custom', 'Digitalisasi Bisnis', 'Perbaikan Bug', 'Optimasi SEO'].map((text, i) => (
              <span key={i} className="text-xl md:text-2xl font-bold text-transparent bg-clip-text" style={{ WebkitTextStroke: isDarkMode ? '1px rgba(255,255,255,0.2)' : '1px rgba(0,0,0,0.2)'}}>
                {text} <span className="text-blue-500 mx-4">•</span>
              </span>
            ))}
          </div>
          <div className="marquee-content items-center" aria-hidden="true">
            {['Servis Laptop', 'Website UMKM', 'Konsultasi Teknologi', 'Rakit PC Custom', 'Digitalisasi Bisnis', 'Perbaikan Bug', 'Optimasi SEO'].map((text, i) => (
              <span key={i} className="text-xl md:text-2xl font-bold text-transparent bg-clip-text" style={{ WebkitTextStroke: isDarkMode ? '1px rgba(255,255,255,0.2)' : '1px rgba(0,0,0,0.2)'}}>
                {text} <span className="text-blue-500 mx-4">•</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* 3. ABOUT SECTION */}
      <section id="about" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer} className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold mb-6">Mengenal Gaptech Lebih Dekat</motion.h2>
              <motion.p variants={fadeUp} className={`text-lg leading-relaxed mb-8 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                Gaptech adalah layanan teknologi yang membantu individu dan bisnis memahami serta memanfaatkan teknologi dengan lebih mudah. Dengan pendekatan yang ramah dan solusi praktis, kami hadir untuk memperbaiki perangkat, membangun solusi digital, dan memberikan edukasi bagi siapa saja.
              </motion.p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { title: "Praktis & Efisien", desc: "Solusi langsung ke inti masalah tanpa bahasa teknis yang rumit." },
                  { title: "Harga Terjangkau", desc: "Transparan di awal, ramah untuk kantong pelajar & UMKM." },
                  { title: "Profesional", desc: "Dikerjakan oleh teknisi dan developer berpengalaman." },
                  { title: "Edukasi", desc: "Kami tidak hanya memperbaiki, tapi juga mengedukasi." }
                ].map((item, i) => (
                  <motion.div key={i} variants={fadeUp} className={`p-4 rounded-2xl border ${isDarkMode ? 'border-white/10 bg-white/5' : 'border-slate-200 bg-white'}`}>
                    <CheckCircle2 className="w-6 h-6 text-green-500 mb-3" />
                    <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
                    <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
            
            <motion.div variants={fadeUp} className="relative aspect-square md:aspect-[4/3] lg:aspect-square rounded-3xl overflow-hidden border border-white/10">
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-600 to-green-400 opacity-20 z-10" />
              {/* Abstract Code/Tech visual placeholder */}
              <div className={`w-full h-full flex items-center justify-center p-8 ${isDarkMode ? 'bg-[#1E293B]' : 'bg-slate-100'}`}>
                <div className="w-full h-full rounded-2xl border border-white/10 bg-black/40 shadow-2xl overflow-hidden flex flex-col relative">
                   <div className="h-8 bg-black/60 flex items-center px-4 gap-2 border-b border-white/10">
                     <div className="w-3 h-3 rounded-full bg-red-500"/>
                     <div className="w-3 h-3 rounded-full bg-yellow-500"/>
                     <div className="w-3 h-3 rounded-full bg-green-500"/>
                   </div>
                   <div className="p-6 font-mono text-sm sm:text-base text-green-400 opacity-70 flex-1 flex flex-col gap-2">
                     <p>{`> Initializing Gaptech Systems...`}</p>
                     <p>{`> Loading hardware diagnostics... [OK]`}</p>
                     <p>{`> Deploying web solutions... [OK]`}</p>
                     <p className="text-blue-400">{`> const mission = "Empower users";`}</p>
                     <p className="text-blue-400">{`> execute(mission);`}</p>
                     <p className="mt-4 animate-pulse">_</p>
                   </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 4. SERVICES SECTION */}
      <section id="services" className={`py-24 ${isDarkMode ? 'bg-[#0B1121]' : 'bg-slate-50'}`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Layanan Utama Kami</h2>
            <p className={`text-lg ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              Solusi end-to-end untuk semua masalah teknologi Anda, dari perangkat keras hingga kehadiran digital.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Service 1 */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
              className={`group p-8 rounded-3xl border transition-all hover:-translate-y-2 ${isDarkMode ? 'bg-[#0F172A] border-slate-800 hover:border-blue-500/50' : 'bg-white border-slate-200 hover:shadow-xl hover:border-blue-200'}`}>
              <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Wrench className="w-7 h-7 text-blue-500" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Gap-Fix</h3>
              <p className={`mb-6 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>Solusi Perangkat Keras. Perbaiki perangkat Anda agar kembali optimal.</p>
              <ul className="space-y-3 mb-8">
                {['Servis Laptop & PC', 'Ganti Sparepart', 'Deep Cleaning', 'Rakit PC Custom'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-sm font-medium">{item}</span>
                  </li>
                ))}
              </ul>
              <button onClick={() => { setSelectedService('Gap-Fix'); setIsWebModalOpen(true); }} className="w-full py-3 rounded-xl font-semibold text-center transition-colors bg-blue-600 hover:bg-blue-700 text-white mt-auto shadow-lg shadow-blue-500/30">
                Mulai Gap-Fix
              </button>
            </motion.div>

            {/* Service 2 */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
              className={`group p-8 rounded-3xl border transition-all hover:-translate-y-2 relative overflow-hidden ${isDarkMode ? 'bg-[#1E293B] border-blue-500/30' : 'bg-blue-50 border-blue-200 hover:shadow-xl'}`}>
              <div className="absolute top-0 right-0 p-3 bg-blue-600 text-white text-xs font-bold rounded-bl-2xl">POPULER</div>
              <div className="w-14 h-14 rounded-2xl bg-blue-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Code className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Gap-Dev</h3>
              <p className={`mb-6 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>Solusi Software & Web. Bangun kehadiran digital bisnis Anda.</p>
              <ul className="space-y-3 mb-8">
                {['Pembuatan Website UMKM', 'Landing Page Bisnis', 'Website Portofolio', 'Optimasi SEO & Bug Fix'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-blue-500 flex-shrink-0" />
                    <span className="text-sm font-medium">{item}</span>
                  </li>
                ))}
              </ul>
              <button onClick={() => { setSelectedService('Gap-Dev'); setIsWebModalOpen(true); }} className="w-full py-3 rounded-xl font-semibold text-center transition-colors bg-blue-600 hover:bg-blue-700 text-white mt-auto shadow-lg shadow-blue-500/30">
                Mulai Gap-Dev
              </button>
            </motion.div>

            {/* Service 3 */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}
              className={`group p-8 rounded-3xl border transition-all hover:-translate-y-2 ${isDarkMode ? 'bg-[#0F172A] border-slate-800 hover:border-green-500/50' : 'bg-white border-slate-200 hover:shadow-xl hover:border-green-200'}`}>
              <div className="w-14 h-14 rounded-2xl bg-green-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Lightbulb className="w-7 h-7 text-green-500" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Gap-Consult</h3>
              <p className={`mb-6 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>Konsultan Digital. Panduan tepat untuk kebutuhan teknologi Anda.</p>
              <ul className="space-y-3 mb-8">
                {['Rekomendasi Beli Laptop', 'Konsultasi Digitalisasi', 'Edukasi Teknologi', 'Perencanaan Arsitektur Web'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-sm font-medium">{item}</span>
                  </li>
                ))}
              </ul>
              <button onClick={() => { setSelectedService('Gap-Consult'); setIsWebModalOpen(true); }} className="w-full py-3 rounded-xl font-semibold text-center transition-colors bg-blue-600 hover:bg-blue-700 text-white mt-auto shadow-lg shadow-blue-500/30">
                Mulai Gap-Consult
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 6. WORKFLOW SECTION */}
      <section className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
             <h2 className="text-3xl md:text-4xl font-bold mb-4">Cara Kerja Kami</h2>
             <p className={`text-lg ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>Proses yang jelas dan transparan dari awal hingga akhir.</p>
          </div>

          <div className="relative">
            {/* Line connector for desktop */}
            <div className={`hidden md:block absolute top-1/2 left-0 w-full h-0.5 -translate-y-1/2 ${isDarkMode ? 'bg-slate-800' : 'bg-slate-200'}`} />
            
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
              {[
                { step: "01", title: "Konsultasi", desc: "Ceritakan kendala atau kebutuhan Anda." },
                { step: "02", title: "Analisis", desc: "Kami menganalisis dan memberi estimasi." },
                { step: "03", title: "Solusi", desc: "Perencanaan dan kesepakatan solusi." },
                { step: "04", title: "Eksekusi", desc: "Proses pengerjaan / perbaikan dilakukan." },
                { step: "05", title: "Support", desc: "Garansi dan dukungan berkelanjutan." },
              ].map((item, i) => (
                <motion.div 
                  key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className="relative z-10 flex flex-col items-center text-center group"
                >
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center font-bold text-xl mb-6 transition-colors duration-300 border-4 ${isDarkMode ? 'bg-[#0F172A] border-slate-800 text-blue-500 group-hover:border-blue-500' : 'bg-white border-slate-200 text-blue-600 group-hover:border-blue-500'}`}>
                    {item.step}
                  </div>
                  <h4 className="text-lg font-bold mb-2">{item.title}</h4>
                  <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 7. PORTFOLIO SECTION */}
      <section id="portfolio" className={`py-24 ${isDarkMode ? 'bg-[#0B1121]' : 'bg-slate-50'}`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
           <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Portofolio & Studi Kasus</h2>
              <p className={`text-lg ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                Hasil kerja nyata kami membantu individu dan bisnis bertransformasi.
              </p>
            </div>
            <a href="#contact" className="text-blue-500 font-medium hover:text-blue-400 flex items-center gap-2">
              Mulai Proyek Anda <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "E-Commerce UMKM Kopi", category: "Web Development", imgGradient: "from-orange-500 to-amber-600" },
              { title: "Custom Build PC Content Creator", category: "Hardware (Gap-Fix)", imgGradient: "from-purple-600 to-blue-600" },
              { title: "Landing Page Startup SaaS", category: "Web Development", imgGradient: "from-blue-500 to-cyan-400" },
              { title: "Deep Cleaning & Upgrade SSD", category: "Hardware (Gap-Fix)", imgGradient: "from-slate-600 to-slate-800" },
              { title: "Website Portofolio Fotografer", category: "Web Development", imgGradient: "from-pink-500 to-rose-500" },
              { title: "Sistem Manajemen Inventori", category: "Software Custom", imgGradient: "from-green-500 to-emerald-600" },
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className={`group rounded-3xl overflow-hidden border cursor-pointer ${isDarkMode ? 'border-white/10 bg-[#1E293B]' : 'border-slate-200 bg-white'}`}
              >
                {/* Image Placeholder with Gradient */}
                <div className={`aspect-video w-full bg-gradient-to-br ${item.imgGradient} relative overflow-hidden`}>
                   <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                   <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="px-4 py-2 bg-white/20 backdrop-blur-md rounded-full text-white text-sm font-medium border border-white/30">
                        Lihat Detail
                      </span>
                   </div>
                </div>
                <div className="p-6">
                  <div className="text-xs font-semibold text-blue-500 mb-2">{item.category}</div>
                  <h4 className="text-xl font-bold">{item.title}</h4>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. TESTIMONIALS */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Apa Kata Mereka?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { text: "Servis laptop saya cepat dan dijelaskan dengan sangat jelas tanpa istilah ribet. Mantap Gaptech!", name: "Budi Santoso", role: "Mahasiswa" },
              { text: "Website bisnis kopi saya jadi terlihat jauh lebih profesional. Penjualan online meningkat drastis.", name: "Siti Aminah", role: "Owner UMKM" },
              { text: "Konsultasi rakit PC-nya juara! Disarankan spesifikasi yang pas dengan budget, gak asal mahal.", name: "Reza Pahlevi", role: "Freelance Designer" }
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className={`p-8 rounded-3xl border ${isDarkMode ? 'bg-[#0F172A] border-slate-800' : 'bg-white border-slate-200'}`}
              >
                <div className="flex gap-1 mb-6 text-yellow-500">
                  {[...Array(5)].map((_, j) => (
                    <svg key={j} className="w-5 h-5 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                  ))}
                </div>
                <p className={`text-lg mb-8 leading-relaxed ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>"{item.text}"</p>
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${isDarkMode ? 'bg-slate-800 text-white' : 'bg-slate-200 text-slate-800'}`}>
                    {item.name.charAt(0)}
                  </div>
                  <div>
                    <h5 className="font-bold">{item.name}</h5>
                    <p className={`text-sm ${isDarkMode ? 'text-slate-500' : 'text-slate-500'}`}>{item.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. FAQ SECTION */}
      <section id="faq" className={`py-24 ${isDarkMode ? 'bg-[#0B1121]' : 'bg-slate-50'}`}>
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
             <h2 className="text-3xl md:text-4xl font-bold mb-4">Pertanyaan Populer</h2>
             <p className={`text-lg ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>Hal yang sering ditanyakan seputar layanan Gaptech.</p>
          </div>

          <div className="space-y-4">
            {[
              { q: "Apakah bisa konsultasi sebelum servis atau buat web?", a: "Tentu! Kami sangat menyarankan Anda berkonsultasi terlebih dahulu secara GRATIS. Kami akan analisis masalah Anda sebelum memberikan rekomendasi." },
              { q: "Apakah Gaptech melayani pembuatan website untuk UMKM?", a: "Ya, kami memiliki paket khusus untuk UMKM yang terjangkau namun tetap profesional dan mobile-friendly." },
              { q: "Berapa lama proses servis laptop?", a: "Tergantung kerusakan. Untuk deep cleaning atau upgrade biasanya selesai dalam 1 hari kerja. Kerusakan hardware berat bisa memakan waktu 3-5 hari." },
              { q: "Apakah bisa rakit PC custom sesuai budget?", a: "Sangat bisa. Beritahu kami budget dan kebutuhan Anda (gaming, editing, atau office), kami akan merakitkan spesifikasi terbaik untuk Anda." }
            ].map((faq, i) => (
              <div key={i} className={`rounded-2xl border overflow-hidden transition-all ${isDarkMode ? 'border-slate-800 bg-[#0F172A]' : 'border-slate-200 bg-white'}`}>
                <button 
                  onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
                >
                  <span className="font-semibold text-lg">{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${activeFaq === i ? 'rotate-180 text-blue-500' : 'text-slate-400'}`} />
                </button>
                <AnimatePresence>
                  {activeFaq === i && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                      <div className={`px-6 pb-5 pt-0 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 11. CONTACT SECTION */}
      <section id="contact" className="py-24 relative">
        <div className="absolute inset-0 bg-blue-600/5 -z-10" />
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className={`rounded-3xl border overflow-hidden ${isDarkMode ? 'bg-[#0F172A] border-white/10' : 'bg-white border-slate-200 shadow-2xl'}`}>
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Contact Info */}
              <div className={`p-10 md:p-16 ${isDarkMode ? 'bg-[#1E293B]' : 'bg-blue-600 text-white'}`}>
                <h3 className={`text-3xl font-bold mb-4 ${!isDarkMode && 'text-white'}`}>Hubungi Kami</h3>
                <p className={`mb-12 text-lg ${isDarkMode ? 'text-slate-400' : 'text-blue-100'}`}>Punya masalah teknologi? Jangan sungkan untuk menghubungi tim Gaptech. Kami siap membantu Anda.</p>
                
                <div className="space-y-8">
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-xl ${isDarkMode ? 'bg-[#0F172A] text-blue-500' : 'bg-white/10 text-white'}`}><MapPin className="w-6 h-6" /></div>
                    <div>
                      <h4 className={`font-semibold text-lg mb-1 ${!isDarkMode && 'text-white'}`}>Lokasi</h4>
                      <p className={isDarkMode ? 'text-slate-400' : 'text-blue-100'}>Jl. Teknologi No. 12, Jakarta Selatan<br/>Indonesia 12345</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-xl ${isDarkMode ? 'bg-[#0F172A] text-blue-500' : 'bg-white/10 text-white'}`}><Mail className="w-6 h-6" /></div>
                    <div>
                      <h4 className={`font-semibold text-lg mb-1 ${!isDarkMode && 'text-white'}`}>Email</h4>
                      <p className={isDarkMode ? 'text-slate-400' : 'text-blue-100'}>contact.gaptech@gmail.com</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-xl ${isDarkMode ? 'bg-[#0F172A] text-blue-500' : 'bg-white/10 text-white'}`}><Phone className="w-6 h-6" /></div>
                    <div>
                      <h4 className={`font-semibold text-lg mb-1 ${!isDarkMode && 'text-white'}`}>WhatsApp</h4>
                      <p className={isDarkMode ? 'text-slate-400' : 'text-blue-100'}>+62 887 4364 21551</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="p-10 md:p-16">
                <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Nama Lengkap</label>
                      <input type="text" className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${isDarkMode ? 'bg-[#1E293B] border-slate-700 focus:bg-[#0F172A]' : 'bg-slate-50 border-slate-200 focus:bg-white'}`} placeholder="Budi Santoso" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Email / WhatsApp</label>
                      <input type="text" className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${isDarkMode ? 'bg-[#1E293B] border-slate-700 focus:bg-[#0F172A]' : 'bg-slate-50 border-slate-200 focus:bg-white'}`} placeholder="budi@email.com" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Layanan yang dibutuhkan</label>
                    <select className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${isDarkMode ? 'bg-[#1E293B] border-slate-700 focus:bg-[#0F172A]' : 'bg-slate-50 border-slate-200 focus:bg-white'}`}>
                      <option>Servis Hardware (Gap-Fix)</option>
                      <option>Pembuatan Website (Gap-Dev)</option>
                      <option>Konsultasi (Gap-Consult)</option>
                      <option>Lainnya</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Pesan</label>
                    <textarea rows="4" className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${isDarkMode ? 'bg-[#1E293B] border-slate-700 focus:bg-[#0F172A]' : 'bg-slate-50 border-slate-200 focus:bg-white'}`} placeholder="Ceritakan detail masalah atau kebutuhan Anda..."></textarea>
                  </div>
                  <button className="w-full py-4 rounded-xl font-bold text-white bg-blue-600 hover:bg-blue-700 transition-colors">
                    Kirim Pesan
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 12. FOOTER */}
      <footer className={`pt-20 pb-10 border-t ${isDarkMode ? 'border-slate-800 bg-[#0B1121]' : 'border-slate-200 bg-slate-50'}`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-6 cursor-pointer" onClick={() => window.scrollTo(0,0)}>
                <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-br from-blue-600/20 to-green-500/20 border border-white/10 shadow-lg backdrop-blur-md overflow-hidden">
                  <img src={GaptechLogo} alt="Gaptech Logo" className="w-full h-full object-contain scale-[2]" />
                </div>
                <span className="font-bold text-2xl tracking-tight">Gaptech</span>
              </div>
              <p className={`max-w-sm text-lg ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                Gaptech: Ubah Gaptek Jadi Tech-Savvy. Solusi digital terpercaya untuk perangkat dan kehadiran online Anda.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-6">Layanan</h4>
              <ul className={`space-y-4 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                <li><a href="#services" className="hover:text-blue-500 transition-colors">Gap-Fix (Hardware)</a></li>
                <li><a href="#services" className="hover:text-blue-500 transition-colors">Gap-Dev (Website)</a></li>
                <li><a href="#services" className="hover:text-blue-500 transition-colors">Gap-Consult (Konsultan)</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-6">Perusahaan</h4>
              <ul className={`space-y-4 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                <li><a href="#about" className="hover:text-blue-500 transition-colors">Tentang Kami</a></li>
                <li><a href="#portfolio" className="hover:text-blue-500 transition-colors">Portofolio</a></li>
                <li><a href="#faq" className="hover:text-blue-500 transition-colors">FAQ</a></li>
                <li><a href="#contact" className="hover:text-blue-500 transition-colors">Kontak</a></li>
              </ul>
            </div>
          </div>
          <div className={`pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4 ${isDarkMode ? 'border-slate-800 text-slate-500' : 'border-slate-200 text-slate-500'}`}>
            <p>© 2026 Gaptech. All rights reserved.</p>
            <div className="flex space-x-6">
              {[
                { name: 'Twitter', url: 'https://x.com/Gaptech_Idn' },
                { name: 'YouTube', url: 'https://youtube.com/@gaptech_id-m9g?si=sTzgdXmUKV880rbh' },
                { name: 'Instagram', url: 'https://www.instagram.com/gaptech.official?igsh=MWd0cmxraWFocWYxMA==' },
                { name: 'LinkedIn', url: 'https://www.linkedin.com/in/gaptech-id-12b6483bb' },
                { name: 'Facebook', url: 'https://www.facebook.com/profile.php?id=61576426597404' },
                { name: 'TikTok', url: 'https://www.tiktok.com/@gaptech.official?_r=1&_t=ZS-95CCYRCcYz9' }
              ].map((social) => (
                <a key={social.name} href={social.url} target="_blank" rel="noreferrer" className="hover:text-blue-500 transition-colors">
                  {social.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* --- POPUP / MODAL GAP-DEV --- */}
      <AnimatePresence>
        {isWebModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            {/* Background Overlay */}
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={closeWebModal}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            
            {/* Modal Content */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }} 
              animate={{ opacity: 1, scale: 1, y: 0 }} 
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className={`relative w-full max-w-lg p-8 rounded-3xl shadow-2xl overflow-hidden border ${isDarkMode ? 'bg-[#0F172A] border-slate-700' : 'bg-white border-slate-200'}`}
            >
              {/* Tombol Close (X) */}
              <button onClick={closeWebModal} className={`absolute top-6 right-6 p-2 rounded-full transition-colors ${isDarkMode ? 'hover:bg-slate-800 text-slate-400' : 'hover:bg-slate-100 text-slate-500'}`}>
                <X className="w-5 h-5" />
              </button>

              <div className="w-16 h-16 rounded-2xl bg-blue-600 flex items-center justify-center mb-6 shadow-lg shadow-blue-500/30">
                <Code className="w-8 h-8 text-white" />
              </div>
              
              <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold mb-3 bg-blue-100 text-blue-700 dark:bg-blue-900/80 dark:text-blue-100">
                {selectedService || 'Gap-Dev'}
              </span>
              <h3 className="text-2xl font-bold mb-3">Estimasi Harga {selectedService || 'Layanan'}</h3>
              <p className={`mb-6 leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                Karena setiap layanan itu unik, harga akan disesuaikan dengan tingkat kesulitan dan fitur yang kamu butuhkan. 
                <br/><br/>
                Yuk, isi spesifikasi website impianmu di form berikut agar kami bisa memberikan estimasi harga terbaik!
              </p>

              <div className="space-y-3">
                {/* GANTI LINK "HREF" DI BAWAH INI DENGAN LINK GOOGLE FORM KAMU NANTI */}
                <a href="https://forms.gle/link-google-form-kamu-disini" target="_blank" rel="noreferrer" onClick={closeWebModal} className="w-full flex items-center justify-center gap-2 py-4 rounded-xl font-bold text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/20">
                  📝 Isi Form Spesifikasi
                </a>
                
                <a href={`https://wa.me/62887436421551?text=${encodeURIComponent(`Halo Gaptech, saya ingin konsultasi ${selectedService || 'layanan'}.`)}`} target="_blank" rel="noreferrer" className={`w-full flex items-center justify-center gap-2 py-4 rounded-xl font-bold border transition-colors ${isDarkMode ? 'border-slate-700 hover:bg-slate-800 text-slate-300' : 'border-slate-300 hover:bg-slate-50 text-slate-700'}`}>
                  💬 Tanya Admin Dulu
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* FLOATING WHATSAPP BUTTON */}
      <a 
        href="https://wa.me/62887436421551" 
        target="_blank" 
        rel="noreferrer"
        className="fixed bottom-6 right-6 w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full flex items-center justify-center shadow-2xl z-50 hover:scale-110 transition-transform cursor-pointer"
        aria-label="Chat WhatsApp"
      >
        <MessageCircle className="w-7 h-7" />
        <span className="absolute -top-1 -right-1 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500 border-2 border-white"></span>
        </span>
      </a>

    </div>
  );
}