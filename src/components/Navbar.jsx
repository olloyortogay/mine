import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Menu, X, Instagram, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from './Button';

import { useLocation } from 'react-router-dom';

const Navbar = () => {
    const { t, i18n } = useTranslation();
    const { pathname } = useLocation();
    const [scrolled, setScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    // Force "scrolled" look (dark text, bg) if on non-home pages like /register
    const isDarkHeader = scrolled || pathname !== '/';

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            const offset = 80;
            const bodyRect = document.body.getBoundingClientRect().top;
            const elementRect = element.getBoundingClientRect().top;
            const elementPosition = elementRect - bodyRect;
            const offsetPosition = elementPosition - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
            setIsOpen(false);
        }
    };

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isDarkHeader
                ? 'bg-white/60 dark:bg-black/60 backdrop-blur-2xl border-b border-white/20 dark:border-white/10 shadow-xl py-3'
                : 'bg-transparent py-7'
                }`}
        >
            <div className="container flex items-center justify-between">
                {/* Logo */}
                <a
                    href="#"
                    onClick={(e) => {
                        e.preventDefault();
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className={`text-2xl font-black tracking-tighter flex items-center gap-2 ${isDarkHeader ? 'text-dark dark:text-white' : 'text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]'}`}
                >
                    <img src="/logo.png" alt="Logo" className="w-10 h-10 object-contain" />
                    {t('common.brand')}
                </a>

                {/* Desktop Nav */}
                <nav className={`hidden md:flex items-center gap-8 ${isDarkHeader ? 'text-dark dark:text-white' : 'text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]'}`}>
                    <button onClick={() => scrollToSection('hero')} className="font-medium hover:text-primary transition-colors">{t('navbar.nav1')}</button>
                    <button onClick={() => scrollToSection('features')} className="font-medium hover:text-primary transition-colors">{t('navbar.nav2')}</button>
                    <button onClick={() => scrollToSection('powerup')} className="font-medium hover:text-primary transition-colors">{t('navbar.nav5')}</button>
                    <button onClick={() => scrollToSection('pricing')} className="font-medium hover:text-primary transition-colors">{t('navbar.nav3')}</button>
                    <button onClick={() => scrollToSection('contact')} className="font-medium hover:text-primary transition-colors">{t('navbar.nav4')}</button>
                </nav>

                {/* Actions */}
                <div className="hidden md:flex items-center gap-4 relative">
                    {/* 1. Instagram Link */}
                    <a
                        href="https://www.instagram.com/turkdunyasi2026/"


                        rel="noopener noreferrer"
                        className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all shadow-lg ${isDarkHeader ? 'border-[#E1306C] text-[#E1306C] hover:bg-[#E1306C]/10' : 'border-white text-white hover:bg-white/20'}`}
                        title="Instagram"
                    >
                        <Instagram size={20} />
                    </a>

                    {/* 2. Telegram Link */}
                    <a
                        href="https://t.me/turkdunyasi_on"


                        rel="noopener noreferrer"
                        className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all shadow-lg ${isDarkHeader ? 'border-[#0088cc] text-[#0088cc] hover:bg-[#0088cc]/10' : 'border-white text-white hover:bg-white/20'}`}
                        title="Telegram"
                    >
                        <Send size={20} />
                    </a>

                    {/* 3. Language Toggle */}
                    <button
                        onClick={() => i18n.changeLanguage(i18n.language === 'tr' ? 'uz' : 'tr')}
                        className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all shadow-lg overflow-hidden ${isDarkHeader ? 'border-primary hover:bg-primary/10' : 'border-white hover:bg-white/20'}`}
                        title={i18n.language === 'tr' ? "Tilni o'zgartirish" : "Dil değiştir"}
                    >
                        {i18n.language === 'tr' ? (
                            <img src="https://flagcdn.com/w80/tr.png" alt="TR" className="w-full h-full object-cover" />
                        ) : (
                            <img src="https://flagcdn.com/w80/uz.png" alt="UZ" className="w-full h-full object-cover" />
                        )}
                    </button>

                    {/* 4. Animated Theme Toggle */}
                    <AnimatePresence>
                        {isDarkHeader && (
                            <motion.button
                                initial={{ opacity: 0, scale: 0, x: -10 }}
                                animate={{ opacity: 1, scale: 1, x: 0 }}
                                exit={{ opacity: 0, scale: 0, x: -10 }}
                                onClick={() => {
                                    if (document.documentElement.classList.contains('dark')) {
                                        document.documentElement.classList.remove('dark');
                                        localStorage.theme = 'light';
                                    } else {
                                        document.documentElement.classList.add('dark');
                                        localStorage.theme = 'dark';
                                    }
                                }}
                                className="absolute left-[calc(100%+16px)] w-12 h-12 rounded-full border-2 border-primary text-primary hover:bg-primary/10 flex items-center justify-center transition-all text-xl shadow-lg shadow-primary/20 bg-white dark:bg-gray-900"
                                title="Mavzuni o'zgartirish"
                            >
                                <span className="block dark:hidden">🌙</span>
                                <span className="hidden dark:block">☀️</span>
                            </motion.button>
                        )}
                    </AnimatePresence>
                </div>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className={`md:hidden p-2 rounded-lg transition-colors ${scrolled ? 'text-dark dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800' : 'text-white hover:bg-white/10'}`}
                >
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="absolute top-full left-0 right-0 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 p-5 md:hidden flex flex-col gap-4 shadow-lg"
                        >
                            <button onClick={() => scrollToSection('hero')} className="block py-2 font-medium text-left dark:text-gray-200">{t('navbar.nav1')}</button>
                            <button onClick={() => scrollToSection('features')} className="block py-2 font-medium text-left dark:text-gray-200">{t('navbar.nav2')}</button>
                            <button onClick={() => scrollToSection('powerup')} className="block py-2 font-medium text-left dark:text-gray-200">{t('navbar.nav5')}</button>
                            <button onClick={() => scrollToSection('pricing')} className="block py-2 font-medium text-left dark:text-gray-200">{t('navbar.nav3')}</button>
                            <button onClick={() => scrollToSection('contact')} className="block py-2 font-medium text-left dark:text-gray-200">{t('navbar.nav4')}</button>

                            <div className="flex items-center justify-between py-2 border-t border-gray-100 dark:border-gray-800 mt-2">
                                <span className="text-sm text-gray-500">{t('navbar.dark_mode')}</span>
                                <button
                                    onClick={() => {
                                        document.documentElement.classList.toggle('dark');
                                        localStorage.theme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
                                    }}
                                    className="p-2 bg-gray-100 dark:bg-gray-800 rounded-full"
                                >
                                    <span className="dark:hidden">🌙</span>
                                    <span className="hidden dark:block">☀️</span>
                                </button>
                            </div>

                            <div className="flex items-center gap-4 py-4 border-b border-gray-100 dark:border-gray-800">
                                <a
                                    href="https://www.instagram.com/turkdunyasi2026/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-[#E1306C]/10 text-[#E1306C] font-bold"
                                >
                                    <Instagram size={20} /> Instagram
                                </a>
                                <a
                                    href="https://t.me/turkdunyasi_on"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-[#0088cc]/10 text-[#0088cc] font-bold"
                                >
                                    <Send size={20} /> Telegram
                                </a>
                            </div>

                            <div className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-800 mb-2">
                                <span className="text-sm text-gray-500">{t('navbar.language')}</span>
                                <button
                                    onClick={() => i18n.changeLanguage(i18n.language === 'tr' ? 'uz' : 'tr')}
                                    className="font-bold flex items-center gap-2 px-4 py-2 rounded-xl border-2 border-primary/20 bg-primary/5 text-primary"
                                >
                                    {i18n.language === 'tr' ? 'TURKCHA 🇹🇷' : 'O\'ZBEKCHA 🇺🇿'}
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </header>
    );
};

export default Navbar;
