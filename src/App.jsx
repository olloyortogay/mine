import { useEffect, useState, lazy, Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Lenis from 'lenis';

// 1. Sentry Importu
import * as Sentry from "@sentry/react";

// 2. Sentry Başlatma (Mühür Vuruldu!)
Sentry.init({
  dsn: "https://e0f9b32fb69582961bfc226256fbf6ce@o4511270006947840.ingest.de.sentry.io/4511274873454672",
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration(),
  ],
  tracesSampleRate: 1.0,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
});

// Critical above-the-fold components
import Navbar from './components/Navbar';
import Hero from './components/Hero';

// Below-the-fold components
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

const PageLoader = () => (
  <div style={{ minHeight: '200px' }} aria-hidden="true" />
);

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
    return () => { lenis.destroy(); };
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
            <Suspense fallback={<PageLoader />}>
              <Features />
              <Pricing onSelectPlan={setSelectedPlan} />
              <PowerUp />
              <FAQ />
              <ContactForm selectedPlan={selectedPlan} />
            </Suspense>
          </main>
        } />
        <Route path="/register" element={<main><Suspense fallback={<PageLoader />}><Register /></Suspense></main>} />
        <Route path="/blog" element={<main><Suspense fallback={<PageLoader />}><Blog /></Suspense></main>} />
        <Route path="/quiz" element={<main><Suspense fallback={<PageLoader />}><Quiz /></Suspense></main>} />
      </Routes>

      <Suspense fallback={null}>
        <FloatingRegisterButton />
        <Footer />
      </Suspense>
    </div>
  );
}

// 4. Sentry Error Boundary
const SentryApp = Sentry.withProfiler(AppContent);

function App() {
  return (
    <Router>
      <SentryApp />
    </Router>
  );
}

export default App;