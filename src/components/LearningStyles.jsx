import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const LearningStyles = () => {
    const { t } = useTranslation();

    const styles = [
        { title: t('styles.s1_title'), desc: t('styles.s1_desc'), delay: 0 },
        { title: t('styles.s2_title'), desc: t('styles.s2_desc'), delay: 0.1 },
        { title: t('styles.s3_title'), desc: t('styles.s3_desc'), delay: 0.2 },
        { title: t('styles.s4_title'), desc: t('styles.s4_desc'), delay: 0.3 }
    ];

    return (
        <section className="py-24 bg-white dark:bg-gray-900 overflow-hidden relative transition-colors duration-300">
            <div className="container relative z-10">
                <div className="text-left mb-12">
                    <h2 className="text-4xl md:text-5xl font-black mb-6 text-dark dark:text-white">{t('styles.title')}</h2>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {styles.map((style, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: style.delay, duration: 0.5 }}
                            viewport={{ margin: "-50px" }}
                            className="flex flex-col items-start group"
                        >
                            <div className="relative mb-6 pl-2">
                                <div className="absolute -inset-4 bg-gradient-to-br from-primary/40 to-accent/40 rounded-full blur-xl opacity-70 group-hover:opacity-100 transition-opacity duration-500"></div>
                                <Check size={48} className="text-dark dark:text-white relative z-10" strokeWidth={2.5} />
                            </div>

                            <h3 className="text-2xl font-bold mb-3 text-dark dark:text-white">{style.title}</h3>
                            <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg">
                                {style.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Background Gradient Blob (Optional aesthetic touch) */}
            <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-primary/5 dark:bg-primary/10 rounded-full blur-[100px] pointer-events-none"></div>
        </section>
    );
};

export default LearningStyles;
