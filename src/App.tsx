import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AnimatePresence, motion } from 'framer-motion';
import { Analytics } from "@vercel/analytics/react";
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import SplashScreen from './components/SplashScreen';
import './index.css';

// Lazy load page components
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Services = lazy(() => import('./pages/Services'));
const Catalog = lazy(() => import('./pages/Catalog'));
const Contact = lazy(() => import('./pages/Contact'));
const Professional = lazy(() => import('./pages/Professional'));
const CaseStudies = lazy(() => import('./pages/CaseStudies'));
const Insights = lazy(() => import('./pages/Insights'));

const PageLoader = () => (
  <div className="flex items-center justify-center min-h-[60vh]">
    <div className="w-8 h-8 border-2 border-brand/20 border-t-brand rounded-full animate-spin" />
  </div>
);

const PageWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
};

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Suspense fallback={<PageLoader />}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
          <Route path="/about" element={<PageWrapper><About /></PageWrapper>} />
          <Route path="/services" element={<PageWrapper><Services /></PageWrapper>} />
          <Route path="/catalog" element={<PageWrapper><Catalog /></PageWrapper>} />
          <Route path="/contact" element={<PageWrapper><Contact /></PageWrapper>} />
          <Route path="/professional" element={<PageWrapper><Professional /></PageWrapper>} />
          <Route path="/case-studies" element={<PageWrapper><CaseStudies /></PageWrapper>} />
          <Route path="/insights" element={<PageWrapper><Insights /></PageWrapper>} />
        </Routes>
      </Suspense>
    </AnimatePresence>
  );
};

const App: React.FC = () => {
  return (
    <HelmetProvider>
      <SplashScreen />
      <Router>
        <ScrollToTop />
        <div className="flex flex-col min-h-screen relative bg-[#F5F5F0]">
          <Navbar />
          <main id="main-content" className="flex-grow">
            <AnimatedRoutes />
          </main>
          <Footer />
          <Analytics />
        </div>
      </Router>
    </HelmetProvider>
  );
};

export default App;
