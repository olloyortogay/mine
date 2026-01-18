import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const FAQ = () => {
    const { t } = useTranslation();
    const [activeIndex, setActiveIndex] = useState(null);

    const faqs = t('faq.questions', { returnObjects: true });

    return (
        <section id="faq" className="section-padding bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
            <div className="container max-w-3xl">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold mb-4 text-dark dark:text-white">{t('faq.title')}</h2>
                    <p className="text-xl text-gray-500 dark:text-gray-400">{t('faq.subtitle')}</p>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            viewport={{ margin: "-20%" }}
                            className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden"
                        >
                            <motion.button
                                onClick={() => setActiveIndex(activeIndex === idx ? null : idx)}
                                className="w-full px-8 py-6 flex items-center justify-between text-left hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                                whileHover={{ x: 5 }}
                            >
                                <span className="font-bold text-lg text-dark dark:text-white">{faq.q}</span>
                                <motion.div
                                    animate={{ rotate: activeIndex === idx ? 90 : 0 }}
                                    transition={{ duration: 0.3, ease: "easeOut" }}
                                    className="flex-shrink-0"
                                >
                                    {activeIndex === idx ? (
                                        <Minus className="w-6 h-6 text-primary" />
                                    ) : (
                                        <Plus className="w-6 h-6 text-gray-400" />
                                    )}
                                </motion.div>
                            </motion.button>
                            <AnimatePresence mode="wait">
                                {activeIndex === idx && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                                        className="bg-gray-50 dark:bg-gray-800 px-8"
                                    >
                                        <div className="py-6 text-gray-600 dark:text-gray-300 border-t border-gray-100 dark:border-gray-700 leading-relaxed text-lg">
                                            {faq.a}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQ;
