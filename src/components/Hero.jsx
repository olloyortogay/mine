import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import Button from './Button';

const slides = [
    {
        image: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&q=80&w=1920", // Istanbul Galata Tower
        accentColor: "#E30A17"
    },
    {
        image: "https://images.unsplash.com/photo-1542833278-f4deb3180291?auto=format&fit=crop&q=80&w=1920", // Hot air balloons (User provided link)
        accentColor: "#F2C511"
    },
    {
        image: "https://images.unsplash.com/photo-1623439844752-524658b16ce6?auto=format&fit=crop&q=80&w=1920", // City by water (User provided link)
        accentColor: "#FFFFFF"
    }
];

const Hero = () => {
    const { t } = useTranslation();
    const { scrollY } = useScroll();
    const y = useTransform(scrollY, [0, 300], [0, 100]);
    const opacity = useTransform(scrollY, [0, 200], [1, 0]);

    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 8000);
        return () => clearInterval(timer);
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: [0.25, 0.1, 0.25, 1]
            }
        }
    };

    const buttonVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
        },
        hover: {
            scale: 1.05,
            transition: { duration: 0.2 }
        },
        tap: { scale: 0.95 }
    };

    return (
        <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-dark text-white pt-20 transition-colors duration-300">
            {/* High-Resolution Animated Background Slideshow */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentSlide}
                    className="absolute inset-0 z-0 bg-gradient-to-br from-[#1a0404] to-[#450a0a]"
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                >
                    <div className="absolute inset-0 bg-black/40 z-10"></div> {/* Dark Overlay */}
                    <img
                        src={slides[currentSlide].image}
                        alt="Istanbul Landmark"
                        loading="eager"
                        className="w-full h-full object-cover relative z-10"
                        onError={(e) => {
                            e.target.style.display = 'none';
                        }}
                    />
                </motion.div>
            </AnimatePresence>

            {/* Glowing Blobs for extra "motion" feel */}
            <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] mix-blend-screen animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-accent/10 rounded-full blur-[100px] mix-blend-screen animate-pulse delay-700"></div>

            <motion.div
                className="container relative z-10 text-center px-4"
                style={{ y, opacity }}
            >
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                >
                    <motion.h1
                        variants={itemVariants}
                        className="text-5xl md:text-7xl lg:text-9xl font-heading font-black mb-8 leading-tight text-white"
                        style={{
                            textShadow: '2px 2px 0px rgba(0,0,0,1), 4px 4px 0px rgba(0,0,0,0.5), 0 10px 20px rgba(0,0,0,0.8)',
                            filter: 'drop-shadow(0 0 15px rgba(0,0,0,0.9))'
                        }}
                    >
                        {t('hero.title')}
                    </motion.h1>

                    <motion.p
                        variants={itemVariants}
                        className="text-xl md:text-3xl text-white mb-12 max-w-4xl mx-auto leading-relaxed font-black"
                        style={{
                            textShadow: '1px 1px 0px rgba(0,0,0,1), 0 5px 10px rgba(0,0,0,0.9)',
                            backgroundColor: 'rgba(0,0,0,0.2)',
                            display: 'inline-block',
                            padding: '10px 20px',
                            borderRadius: '15px',
                            backdropBlur: 'sm'
                        }}
                    >
                        {t('hero.subtitle')}
                    </motion.p>

                    <motion.div
                        variants={itemVariants}
                        className="flex flex-col sm:flex-row gap-6 justify-center items-center"
                    >
                        <motion.div
                            variants={buttonVariants}
                            whileHover="hover"
                            whileTap="tap"
                        >
                            <a href="/register" target="_blank" rel="noopener noreferrer">
                                <Button
                                    variant="primary"
                                    className="text-xl px-12 py-5 rounded-full shadow-2xl text-dark border-none font-bold transition-colors duration-1000"
                                    style={{ backgroundColor: slides[currentSlide].accentColor }}
                                >
                                    {t('hero.cta')}
                                </Button>
                            </a>
                        </motion.div>
                        <motion.div
                            variants={buttonVariants}
                            whileHover="hover"
                            whileTap="tap"
                        >
                            <Button variant="outline" className="text-xl px-12 py-5 rounded-full border-2 border-white text-white hover:bg-white hover:text-dark transition-all font-bold backdrop-blur-md shadow-[0_0_20px_rgba(0,0,0,0.3)]">
                                {t('hero.more_info')}
                            </Button>
                        </motion.div>
                    </motion.div>
                </motion.div>
            </motion.div>
        </section>
    );
};

export default Hero;
