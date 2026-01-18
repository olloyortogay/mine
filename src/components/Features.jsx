import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Smile, Zap, Clock, Globe } from 'lucide-react';

const Features = () => {
    const { t } = useTranslation();

    const features = [
        {
            icon: <Smile className="w-10 h-10 text-white" />,
            title: t('features.f1_title'),
            description: t('features.f1_desc'),
            color: "bg-primary"
        },
        {
            icon: <Zap className="w-10 h-10 text-white" />,
            title: t('features.f2_title'),
            description: t('features.f2_desc'),
            color: "bg-secondary"
        },
        {
            icon: <Clock className="w-10 h-10 text-white" />,
            title: t('features.f3_title'),
            description: t('features.f3_desc'),
            color: "bg-red-400"
        },
        {
            icon: <Globe className="w-10 h-10 text-white" />,
            title: t('features.f4_title'),
            description: t('features.f4_desc'),
            color: "bg-accent"
        }
    ];

    return (
        <section id="features" className="section-padding bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
            <div className="container">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-black mb-6 text-dark dark:text-white">{t('features.title')}</h2>
                    <div className="w-24 h-2 bg-primary mx-auto rounded-full"></div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{
                                delay: idx * 0.15,
                                duration: 0.6,
                                ease: [0.25, 0.1, 0.25, 1]
                            }}
                            viewport={{ margin: "-50px" }}
                            whileHover={{ y: -8 }}
                            className="bg-white dark:bg-gray-900 p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-shadow duration-300 text-center group border border-gray-100 dark:border-gray-700"
                        >
                            <motion.div
                                className={`${feature.color} w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-6 shadow-lg`}
                                whileHover={{ scale: 1.1 }}
                            >
                                {feature.icon}
                            </motion.div>
                            <h3 className="text-2xl font-bold mb-4 text-dark dark:text-white">{feature.title}</h3>
                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed font-medium">{feature.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;
