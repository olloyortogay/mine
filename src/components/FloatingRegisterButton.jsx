import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UserPlus } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const FloatingRegisterButton = () => {
    const { t } = useTranslation();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // Show button when scrolled down 300px
            setIsVisible(window.scrollY > 300);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.a
                    href="/register"
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0, x: 100 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0, x: 100 }}
                    transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 20
                    }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="fixed bottom-8 right-8 z-50 w-16 h-16 bg-gradient-to-br from-primary to-orange-600 rounded-full flex items-center justify-center shadow-2xl shadow-primary/50 hover:shadow-primary/70 transition-shadow group"
                    title={t('hero.cta')}
                >
                    <UserPlus className="w-8 h-8 text-white group-hover:scale-110 transition-transform" />

                    {/* Pulsing ring effect */}
                    <motion.div
                        className="absolute inset-0 rounded-full border-4 border-primary"
                        animate={{
                            scale: [1, 1.3, 1],
                            opacity: [0.8, 0, 0.8]
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />
                </motion.a>
            )}
        </AnimatePresence>
    );
};

export default FloatingRegisterButton;
