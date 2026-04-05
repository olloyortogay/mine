import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Blog = () => {
    const { t, i18n } = useTranslation();

    // Static examples combining SEO keywords matching both languages to draw traffic
    const posts = [
        {
            id: 1,
            title: i18n.language === 'tr' ? "Türkçe Öğrenmeye Başlarken Bilmeniz Gereken 5 Şey" : "Turk tilini noldan o'rganish sirlari",
            excerpt: i18n.language === 'tr' ? "Etkili ve hızlı bir şekilde Türkçe öğrenmek için nereden başlamalısınız? İşte en çok sıfırdan başlayanların işine yarayacak taktikler." : "Turk tilini o'rganishni maqsad qildingizmi? Eng tez va samarali natijaga qanday erishishni 5 ta oltin qoida orqali tushuntiramiz.",
            category: i18n.language === 'tr' ? "Tavsiyeler" : "Maslahatlar",
            date: "14 Oct 2026",
            readTime: "4 min",
            image: "https://images.unsplash.com/photo-1546410531-f2f9f1b95f26?auto=format&fit=crop&q=70&w=800&fm=webp"
        },
        {
            id: 2,
            title: i18n.language === 'tr' ? "TÖMER Sınavına Nasıl Hazırlanılır?" : "Tysga tayyorlanish bo'yicha qo'llanma",
            excerpt: i18n.language === 'tr' ? "Türkiye'de üniversite okumak için gereken TYS ve TÖMER sınavlarına profesyonel hazırlık sürecinin adımları." : "Turkiyada o'qish uchun eng muhim hujjatlardan bo'lgan TÖMER/TYS imtihonlaridan yuqori ball olish usullari.",
            category: i18n.language === 'tr' ? "Sınavlar" : "Imtihonlar",
            date: "04 Nov 2026",
            readTime: "6 min",
            image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=70&w=800&fm=webp"
        },
        {
            id: 3,
            title: i18n.language === 'tr' ? "Online Eğitimle Dil Öğrenmenin Avantajları" : "Turk tili onlayn kurslarining afzalliklari",
            excerpt: i18n.language === 'tr' ? "Evden çıkmadan, zaman kaybetmeden Türkiye'nin en iyi hocalarından dil eğitimi almanın güzellikleri." : "Nega an'anaviy kurslardan ko'ra onlayn tarzda turk tilidan onlayn darslar olish samaraliroq? Mana faktlar.",
            category: "Online",
            date: "20 Dec 2026",
            readTime: "3 min",
            image: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&q=70&w=800&fm=webp"
        }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1, y: 0,
            transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }
        }
    };

    return (
        <section className="bg-gray-50 dark:bg-gray-900 min-h-screen pt-32 pb-20 transition-colors duration-300">
            <Helmet>
                <title>{t('blog.title')} | Turk Dunyosi</title>
                <meta name="description" content={t('blog.subtitle')} />
            </Helmet>

            <div className="container relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-5xl font-black mb-4 text-dark dark:text-white drop-shadow-sm">{t('blog.title')}</h1>
                    <p className="text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">{t('blog.subtitle')}</p>
                    <div className="w-24 h-2 bg-primary mx-auto rounded-full mt-6"></div>
                </motion.div>

                <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid md:grid-cols-2 lg:grid-cols-3 gap-10"
                >
                    {posts.map((post) => (
                        <motion.article 
                            key={post.id}
                            variants={itemVariants}
                            whileHover={{ y: -10 }}
                            className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden flex flex-col group cursor-pointer"
                        >
                            <div className="relative h-60 overflow-hidden">
                                <img 
                                    src={post.image} 
                                    alt={post.title} 
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    loading="lazy"
                                />
                                <div className="absolute top-4 left-4 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full shadow-md uppercase tracking-wider">
                                    {post.category}
                                </div>
                            </div>
                            
                            <div className="p-8 flex flex-col flex-1">
                                <div className="flex items-center gap-4 text-sm text-gray-400 font-medium mb-4">
                                    <div className="flex items-center gap-1.5"><Calendar size={16} /> {post.date}</div>
                                    <div className="flex items-center gap-1.5"><Clock size={16} /> {post.readTime}</div>
                                </div>
                                <h2 className="text-2xl font-bold text-dark dark:text-white mb-3 hover:text-primary transition-colors leading-tight">
                                    {post.title}
                                </h2>
                                <p className="text-gray-500 dark:text-gray-400 mb-6 flex-1 line-clamp-3">
                                    {post.excerpt}
                                </p>
                                
                                <div className="border-t border-gray-100 dark:border-gray-700 pt-5 mt-auto">
                                    <span className="inline-flex items-center font-bold text-primary gap-2 group-hover:underline">
                                        {t('blog.read_more')} <ArrowRight size={18} className="transform group-hover:translate-x-1 transition-transform" />
                                    </span>
                                </div>
                            </div>
                        </motion.article>
                    ))}
                </motion.div>
                
                {/* Back to Home CTA */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="text-center mt-20"
                >
                    <Link to="/" className="inline-flex items-center gap-2 px-8 py-4 bg-dark dark:bg-white text-white dark:text-dark font-bold rounded-full shadow-xl hover:scale-105 transition-transform duration-300">
                        {i18n.language === 'tr' ? "Ana Sayfaya Dön" : "Bosh Sahifaga Qaytish"}
                    </Link>
                </motion.div>
            </div>
        </section>
    );
};

export default Blog;
