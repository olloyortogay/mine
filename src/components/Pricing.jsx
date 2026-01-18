import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import Button from './Button';
import { Check } from 'lucide-react';

const Pricing = ({ onSelectPlan }) => {
    const { t } = useTranslation();

    const handleSelect = (plan) => {
        if (onSelectPlan) {
            onSelectPlan({
                title: plan.title,
                price: plan.price
            });
        }

        const contactElement = document.getElementById('contact');
        if (contactElement) {
            const offset = 80;
            const bodyRect = document.body.getBoundingClientRect().top;
            const elementRect = contactElement.getBoundingClientRect().top;
            const elementPosition = elementRect - bodyRect;
            const offsetPosition = elementPosition - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };

    const plans = [
        {
            title: t('pricing.p1_title'),
            price: t('pricing.p1_price'),
            desc: t('pricing.p1_desc'),
            features: ["Temel Gramer", "Haftada 2 ders", "Online Materyal"],
            popular: false
        },
        {
            title: t('pricing.p2_title'),
            price: t('pricing.p2_price'),
            desc: t('pricing.p2_desc'),
            features: ["Orta Seviye Gramer", "Haftada 3 ders", "Konuşma Kulübü", "Sertifika"],
            popular: true
        },
        {
            title: t('pricing.p3_title'),
            price: t('pricing.p3_price'),
            desc: t('pricing.p3_desc'),
            features: ["İleri Seviye", "Özel Ders", "Sınırsız Erişim", "VIP Destek"],
            popular: false
        }
    ];

    return (
        <section id="pricing" className="section-padding bg-white dark:bg-gray-900 relative transition-colors duration-300">
            <div className="container">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold mb-4 text-dark dark:text-white">{t('pricing.title')}</h2>
                    <p className="text-xl text-gray-500 dark:text-gray-400">Bütçenize uygun paketi seçin.</p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 items-start">
                    {plans.map((plan, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{
                                delay: idx * 0.15,
                                duration: 0.6,
                                ease: [0.25, 0.1, 0.25, 1]
                            }}
                            viewport={{ margin: "-50px" }}
                            whileHover={{
                                y: plan.popular ? -5 : -10,
                                scale: plan.popular ? 1.02 : 1.05
                            }}
                            className={`p-8 rounded-3xl border-2 flex flex-col h-full ${plan.popular
                                ? 'border-primary bg-white dark:bg-gray-800 shadow-2xl scale-105 z-10'
                                : 'border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-lg hover:shadow-2xl hover:border-primary/50'
                                }`}
                        >
                            {plan.popular && (
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: idx * 0.2 + 0.5, type: "spring" }}
                                    className="bg-primary text-white text-xs font-bold px-4 py-1 rounded-full w-max mx-auto mb-4 tracking-widest uppercase"
                                >
                                    Popüler
                                </motion.div>
                            )}
                            <h3 className="text-2xl font-bold mb-2 text-center text-dark dark:text-white">{plan.title}</h3>
                            <div className="text-5xl font-black text-primary mb-4 text-center tracking-tight">{plan.price}</div>
                            <p className="text-gray-500 dark:text-gray-400 mb-8 text-center">{plan.desc}</p>

                            <ul className="space-y-4 mb-8 flex-1">
                                {plan.features.map((feat, fIdx) => (
                                    <motion.li
                                        key={fIdx}
                                        initial={{ opacity: 0, x: -10 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ delay: idx * 0.2 + fIdx * 0.1 }}
                                        viewport={{}}
                                        className="flex items-center gap-3"
                                    >
                                        <div className="w-6 h-6 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center text-primary flex-shrink-0">
                                            <Check size={14} strokeWidth={3} />
                                        </div>
                                        <span className="text-gray-700 dark:text-gray-300 font-medium">{feat}</span>
                                    </motion.li>
                                ))}
                            </ul>

                            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                <Button
                                    onClick={() => handleSelect(plan)}
                                    variant={plan.popular ? 'primary' : 'outline'}
                                    className="w-full justify-center text-lg py-4"
                                >
                                    {t('pricing.btn_select')}
                                </Button>
                            </motion.div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Pricing;
