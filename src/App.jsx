import { useEffect, useState, lazy, Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Lenis from 'lenis';

// Critical above-the-fold components — load eagerly
import Navbar from './components/Navbar';
import Hero from './components/Hero';

// Below-the-fold components — lazy loaded (reduces initial JS bundle)
const Features = lazy(() => import('./components/Features'));
const Pricing = lazy(() => import('./components/Pricing'));
const PowerUp = lazy(() => import('./components/PowerUp'));
const FAQ = lazy(() => import('./components/FAQ'));
const ContactForm = lazy(() => import('./components/ContactForm'));
const Footer = lazy(() => import('./components/Footer'));
const FloatingRegisterButton = lazy(() => import('./components/FloatingRegisterButton'));
const Register = lazy(() => import('./pages/Register'));
const Blog = lazy(() => import('./pages/Blog'));
const Quiz = lazy(() => import('./pages/Quiz'));

// Lightweight loading fallback — prevents layout shift
const PageLoader = () => (
  <div style={{ minHeight: '200px' }} aria-hidden="true" />
);

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

      {/* Navbar always visible — no lazy */}
      <Navbar />
      <ScrollToTop />

      <Routes>
        <Route path="/" element={
          <main>
            {/* Hero is critical — no suspense wrapper needed */}
            <Hero />

            {/* Below-the-fold sections — lazy loaded */}
            <Suspense fallback={<PageLoader />}>
              <Features />
              <Pricing onSelectPlan={setSelectedPlan} />
              <PowerUp />
              <FAQ />
              <ContactForm selectedPlan={selectedPlan} />
            </Suspense>
          </main>
        } />
        <Route path="/register" element={
          <main>
            <Suspense fallback={<PageLoader />}>
              <Register />
            </Suspense>
          </main>
        } />
        <Route path="/blog" element={
          <main>
            <Suspense fallback={<PageLoader />}>
              <Blog />
            </Suspense>
          </main>
        } />
        <Route path="/quiz" element={
          <main>
            <Suspense fallback={<PageLoader />}>
              <Quiz />
            </Suspense>
          </main>
        } />
      </Routes>

      <Suspense fallback={null}>
        <FloatingRegisterButton />
        <Footer />
      </Suspense>
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
