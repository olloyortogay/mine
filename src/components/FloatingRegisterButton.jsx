import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const FloatingRegisterButton = () => {
    const { t, i18n } = useTranslation();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsVisible(window.scrollY > 300);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const examLabel = i18n.language === 'tr' ? 'Konuşma Sınavı' : 'Imtihon markazi';
    const registerLabel = i18n.language === 'tr' ? "Ro'yxatdan o'tish" : "Ro'yxatdan o'tish";

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, y: 80 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 80 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    className="fixed bottom-0 left-0 right-0 z-50 flex gap-3 p-3 sm:hidden"
                    style={{
                        background: 'linear-gradient(to top, rgba(0,0,0,0.92) 60%, transparent)',
                        paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 12px)'
                    }}
                >
                    {/* Ro'yxatdan o'tish */}
                    <motion.a
                        href="/register"
                        target="_blank"
                        rel="noopener noreferrer"
                        whileTap={{ scale: 0.96 }}
                        className="flex-1 flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold py-3.5 rounded-2xl text-sm shadow-lg shadow-red-900/50 transition-colors"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" /></svg>
                        {registerLabel}
                    </motion.a>

                    {/* Imtihon markazi */}
                    <motion.a
                        href="https://sinav.turkdunyasi.uz"
                        target="_blank"
                        rel="noopener noreferrer"
                        whileTap={{ scale: 0.96 }}
                        className="flex-1 flex items-center justify-center gap-2 bg-white/10 backdrop-blur-md border border-white/30 text-white font-bold py-3.5 rounded-2xl text-sm shadow-lg transition-colors hover:bg-white/20 relative overflow-hidden"
                    >
                        {/* Ping dot */}
                        <span className="relative flex h-2.5 w-2.5 flex-shrink-0">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
                        </span>
                        {examLabel}
                    </motion.a>
                </motion.div>
            )}

            {/* Desktop: sadece sağ alt köşe floating butonu */}
            {isVisible && (
                <motion.a
                    key="desktop-float"
                    href="/register"
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0, x: 100 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0, x: 100 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="hidden sm:flex fixed bottom-8 right-8 z-50 w-16 h-16 bg-gradient-to-br from-red-600 to-orange-600 rounded-full items-center justify-center shadow-2xl shadow-red-900/50 hover:shadow-red-600/70 transition-shadow group"
                    title={t('hero.cta')}
                >
                    <svg className="w-7 h-7 text-white group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" /></svg>
                    {/* Pulsing ring */}
                    <motion.div
                        className="absolute inset-0 rounded-full border-4 border-red-500"
                        animate={{ scale: [1, 1.3, 1], opacity: [0.8, 0, 0.8] }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                    />
                </motion.a>
            )}
        </AnimatePresence>
    );
};

export default FloatingRegisterButton;

