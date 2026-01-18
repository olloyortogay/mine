import { useState } from 'react';
import { motion } from 'framer-motion';
import Button from './Button';
import { Send, Phone, Mail, MapPin } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const ContactForm = ({ selectedPlan }) => {
    const { t } = useTranslation();
    const [formState, setFormState] = useState('idle'); // idle, loading, success, error

    const [phone, setPhone] = useState('+998 ');

    const handlePhoneChange = (e) => {
        let input = e.target.value;

        // Agar foydalanuvchi hamma narsani o'chirib tashlamoqchi bo'lsa
        if (input.length < 5) {
            setPhone('+998 ');
            return;
        }

        // Prefiksni majburiy saqlash
        if (!input.startsWith('+998 ')) {
            input = '+998 ' + input.replace(/^\+?998\s?/, '');
        }

        // Faqat raqamlarni ajratib olish (+998 dan keyingilarini)
        const digits = input.substring(5).replace(/\D/g, '');

        let formatted = '+998 ';
        if (digits.length > 0) {
            formatted += digits.substring(0, 2);
        }
        if (digits.length > 2) {
            formatted += '-' + digits.substring(2, 5);
        }
        if (digits.length > 5) {
            formatted += '-' + digits.substring(5, 7);
        }
        if (digits.length > 7) {
            formatted += '-' + digits.substring(7, 9);
        }

        // Maksimal 9 ta raqam
        if (digits.length <= 9) {
            setPhone(formatted);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormState('loading');

        const formData = new FormData(e.target);
        const params = new URLSearchParams();
        params.append('Name', formData.get('userName'));
        params.append('Phone', phone);
        params.append('Message', formData.get('userMessage') || '');
        if (selectedPlan) {
            params.append('Plan', `${selectedPlan.title} (${selectedPlan.price})`);
        }

        try {
            await fetch('https://script.google.com/macros/s/AKfycbwSNOVDFnAJtQk-PPZKJHEWyB96hFs8oem7uF0bQDXswSPxIZX9I76lU1Dh0CtFpoEe/exec', {
                method: 'POST',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: params.toString(),
            });

            setFormState('success');
        } catch (error) {
            console.error('Submission error:', error);
            setFormState('success');
        }
    };

    return (
        <section id="contact" className="section-padding bg-dark text-white relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/10 rounded-full blur-[100px] -translate-x-1/2 translate-y-1/2"></div>

            <div className="container relative z-10">
                <div className="grid md:grid-cols-2 gap-16 items-center">

                    {/* Left: Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ margin: "-50px" }}
                    >
                        <h2 className="text-5xl font-black mb-8">{t('contact.title')}</h2>
                        <p className="text-xl text-gray-400 mb-12">
                            {t('contact.subtitle')}
                        </p>

                        <div className="space-y-8">
                            <div className="flex items-center gap-6">
                                <div className="w-14 h-14 bg-white/10 rounded-full flex items-center justify-center text-primary">
                                    <Phone className="w-6 h-6" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-400 uppercase tracking-widest font-bold mb-1">{t('contact.phone')}</p>
                                    <p className="text-xl font-medium">{t('contact.phone_val')}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-6">
                                <div className="w-14 h-14 bg-white/10 rounded-full flex items-center justify-center text-primary">
                                    <Mail className="w-6 h-6" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-400 uppercase tracking-widest font-bold mb-1">{t('contact.email')}</p>
                                    <p className="text-xl font-medium">{t('contact.email_val')}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-6">
                                <div className="w-14 h-14 bg-white/10 rounded-full flex items-center justify-center text-primary">
                                    <MapPin className="w-6 h-6" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-400 uppercase tracking-widest font-bold mb-1">{t('contact.location')}</p>
                                    <p className="text-xl font-medium">{t('contact.location_val')}</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right: Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ margin: "-50px" }}
                        transition={{ delay: 0.2 }}
                        className="bg-white/5 p-8 rounded-3xl border border-white/10 backdrop-blur-sm"
                    >
                        {formState === 'success' ? (
                            <div className="text-center py-12">
                                <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <Send className="w-10 h-10 text-white" />
                                </div>
                                <h3 className="text-2xl font-bold mb-2">{t('contact.form.success_title')}</h3>
                                <p className="text-gray-400">{t('contact.form.success_msg')}</p>
                                <Button onClick={() => setFormState('idle')} variant="outline" className="mt-6">
                                    {t('contact.form.new_msg')}
                                </Button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                    viewport={{ margin: "-50px" }}
                                >
                                    {selectedPlan && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            className="mb-6 p-4 rounded-xl bg-primary/10 border border-primary/20 flex flex-col gap-1"
                                        >
                                            <p className="text-xs text-primary font-bold uppercase tracking-widest">{t('contact.form.selected_plan')}</p>
                                            <p className="text-xl font-black">{selectedPlan.title} <span className="text-sm font-normal opacity-60">({selectedPlan.price})</span></p>
                                        </motion.div>
                                    )}
                                    <label className="block text-sm font-medium text-gray-300 mb-2">{t('contact.form.name')}</label>
                                    <motion.input
                                        type="text"
                                        name="userName"
                                        required
                                        placeholder={t('contact.form.placeholder_name')}
                                        className="w-full px-4 py-4 rounded-xl bg-white/5 border border-white/10 focus:border-primary outline-none text-white placeholder-gray-500 transition-colors"
                                        whileFocus={{ scale: 1.02, borderColor: "#E30A17" }}
                                    />
                                </motion.div>
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 }}
                                    viewport={{ margin: "-50px" }}
                                >
                                    <label className="block text-sm font-medium text-gray-300 mb-2">{t('contact.form.phone_label')}</label>
                                    <motion.input
                                        type="tel"
                                        name="userPhone"
                                        value={phone}
                                        onChange={handlePhoneChange}
                                        required
                                        placeholder={t('contact.form.placeholder_phone')}
                                        className="w-full px-4 py-4 rounded-xl bg-white/5 border border-white/10 focus:border-primary outline-none text-white placeholder-gray-500 transition-colors"
                                        whileFocus={{ scale: 1.02, borderColor: "#E30A17" }}
                                    />
                                </motion.div>
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5 }}
                                    viewport={{ margin: "-50px" }}
                                >
                                    <label className="block text-sm font-medium text-gray-300 mb-2">{t('contact.form.message')}</label>
                                    <motion.textarea
                                        name="userMessage"
                                        rows="4"
                                        placeholder={t('contact.form.placeholder_msg')}
                                        className="w-full px-4 py-4 rounded-xl bg-white/5 border border-white/10 focus:border-primary outline-none text-white placeholder-gray-500 transition-colors"
                                        whileFocus={{ scale: 1.02, borderColor: "#E30A17" }}
                                    ></motion.textarea>
                                </motion.div>
                                <motion.div
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <Button
                                        variant="primary"
                                        className="w-full justify-center py-4 text-lg font-bold shadow-lg shadow-primary/30"
                                    >
                                        {formState === 'loading' ? t('contact.form.sending') : t('contact.form.send')}
                                    </Button>
                                </motion.div>
                            </form>
                        )}
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default ContactForm;
