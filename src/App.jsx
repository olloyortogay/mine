import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Lenis from 'lenis';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Pricing from './components/Pricing';
import PowerUp from './components/PowerUp';
import FAQ from './components/FAQ';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import Register from './pages/Register';

// Scroll to top on route change (for Register page)
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function AppContent() {
  const { t, i18n } = useTranslation();
  const [selectedPlan, setSelectedPlan] = useState(null);

  useEffect(() => {
    // Initialize Lenis for smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 font-body text-dark dark:text-white overflow-x-hidden transition-colors duration-300">
      <Helmet>
        <title>{t('hero.title')} | Türk Dünyası</title>
        <meta name="description" content={t('hero.subtitle')} />
        <html lang={i18n.language} />
      </Helmet>

      <Navbar />
      <ScrollToTop />

      <Routes>
        <Route path="/" element={
          <main>
            <Hero />
            <Features />
            <Pricing onSelectPlan={setSelectedPlan} />
            <PowerUp />
            <FAQ />
            <ContactForm selectedPlan={selectedPlan} />
          </main>
        } />
        <Route path="/register" element={
          <main>
            <Register />
          </main>
        } />
      </Routes>

      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
