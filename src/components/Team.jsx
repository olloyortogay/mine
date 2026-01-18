import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const Team = () => {
    const { t } = useTranslation();

    const team = [
        { name: "Ayşe Yılmaz", role: t('team.role1'), img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300&h=300" },
        { name: "Mehmet Demir", role: t('team.role2'), img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=300&h=300" },
        { name: "Zeynep Kaya", role: t('team.role3'), img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=300&h=300" },
        { name: "Ali Çelik", role: t('team.role4'), img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=300&h=300" }
    ];

    return (
        <section className="section-padding bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
            <div className="container">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold mb-4 text-dark dark:text-white">{t('team.title')}</h2>
                    <p className="text-xl text-gray-500 dark:text-gray-400">{t('team.desc')}</p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {team.map((member, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{
                                delay: idx * 0.1,
                                duration: 0.6,
                                ease: [0.25, 0.1, 0.25, 1]
                            }}
                            viewport={{ margin: "-50px" }}
                            whileHover={{ y: -10 }}
                            className="bg-white dark:bg-gray-900 p-8 rounded-3xl shadow-sm hover:shadow-2xl transition-shadow duration-300 text-center border border-gray-100 dark:border-gray-700 group"
                        >
                            <div className="w-32 h-32 mx-auto mb-6 relative overflow-hidden rounded-full">
                                <motion.img
                                    src={member.img}
                                    alt={member.name}
                                    className="w-full h-full rounded-full object-cover border-4 border-white dark:border-gray-800 shadow-lg relative z-10"
                                    whileHover={{ scale: 1.1 }}
                                    transition={{ duration: 0.3 }}
                                />
                            </div>
                            <h3 className="text-xl font-bold mb-1 text-dark dark:text-white">{member.name}</h3>
                            <p className="text-primary font-medium tracking-wide text-sm uppercase">{member.role}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Team;
