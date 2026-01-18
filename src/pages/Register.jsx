import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { User, Phone, BookOpen, Send, CheckCircle2, Layers } from 'lucide-react';
import Button from '../components/Button';

const Register = () => {
    const { t } = useTranslation();
    const [formState, setFormState] = useState('idle'); // idle, loading, success
    const [phone, setPhone] = useState('');

    const handlePhoneChange = (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.startsWith('998')) value = value.slice(3);
        if (value.length > 9) value = value.slice(0, 9);

        let formatted = '+998 ';
        if (value.length > 0) formatted += value.slice(0, 2);
        if (value.length > 2) formatted += '-' + value.slice(2, 5);
        if (value.length > 5) formatted += '-' + value.slice(5, 7);
        if (value.length > 7) formatted += '-' + value.slice(7, 9);

        setPhone(formatted);
    };

    const plans = [
        { title: t('pricing.p1_title'), price: t('pricing.p1_price') },
        { title: t('pricing.p2_title'), price: t('pricing.p2_price') },
        { title: t('pricing.p3_title'), price: t('pricing.p3_price') }
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormState('loading');

        const formData = new FormData(e.target);
        const params = new URLSearchParams();
        params.append('Name', formData.get('userName'));
        params.append('Phone', phone);
        params.append('Plan', formData.get('userPlan'));
        params.append('Message', formData.get('userReason'));
        params.append('Source', 'Registration Page');

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
            setFormState('success'); // Still show success for no-cors
        }
    };

    if (formState === 'success') {
        return (
            <div className="pt-32 pb-20 min-h-[80vh] flex items-center justify-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="max-w-md w-full mx-auto p-12 rounded-3xl bg-white dark:bg-gray-800 shadow-2xl text-center border border-gray-100 dark:border-gray-700"
                >
                    <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle2 size={40} className="text-green-500" />
                    </div>
                    <h2 className="text-3xl font-black mb-4 dark:text-white">{t('register.success')}</h2>
                    <Button
                        variant="primary"
                        onClick={() => window.location.href = '/'}
                        className="mx-auto mt-8"
                    >
                        {t('navbar.nav1')}
                    </Button>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="pt-32 pb-20 min-h-screen relative overflow-hidden bg-gray-50 dark:bg-gray-950">
            {/* Background Decorations */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2"></div>

            <div className="container relative z-10">
                <div className="max-w-2xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-12"
                    >
                        <h1 className="text-4xl md:text-6xl font-black mb-6 dark:text-white">{t('register.title')}</h1>
                        <p className="text-xl text-gray-500 dark:text-gray-400">
                            {t('register.subtitle')}
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="p-8 md:p-12 rounded-[40px] bg-white dark:bg-gray-900 shadow-2xl border border-gray-100 dark:border-gray-800"
                    >
                        <form onSubmit={handleSubmit} className="space-y-8">
                            {/* Name */}
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-primary dark:text-primary">
                                    <User size={16} /> {t('register.name')}
                                </label>
                                <input
                                    required
                                    name="userName"
                                    type="text"
                                    placeholder={t('contact.form.placeholder_name')}
                                    className="w-full px-6 py-4 rounded-2xl bg-gray-50 dark:bg-gray-800 border-2 border-transparent focus:border-primary outline-none transition-all dark:text-white"
                                />
                            </div>

                            {/* Phone */}
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-primary dark:text-primary">
                                    <Phone size={16} /> {t('register.phone')}
                                </label>
                                <input
                                    required
                                    type="tel"
                                    value={phone}
                                    onChange={handlePhoneChange}
                                    placeholder={t('contact.form.placeholder_phone')}
                                    className="w-full px-6 py-4 rounded-2xl bg-gray-50 dark:bg-gray-800 border-2 border-transparent focus:border-primary outline-none transition-all dark:text-white"
                                />
                            </div>

                            {/* Plan Selection */}
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-primary dark:text-primary">
                                    <Layers size={16} /> {t('register.plan_label')}
                                </label>
                                <div className="relative group">
                                    <select
                                        required
                                        name="userPlan"
                                        className="w-full px-6 py-4 rounded-2xl bg-gray-50 dark:bg-gray-800 border-2 border-transparent focus:border-primary outline-none transition-all dark:text-white appearance-none cursor-pointer"
                                    >
                                        <option value="" disabled selected>{t('register.select_placeholder')}</option>
                                        {plans.map((plan, idx) => (
                                            <option key={idx} value={`${plan.title} (${plan.price})`}>
                                                {plan.title} - {plan.price}
                                            </option>
                                        ))}
                                    </select>
                                    <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 group-focus-within:text-primary transition-colors">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="m6 9 6 6 6-6" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            {/* Reason */}
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-primary dark:text-primary">
                                    <BookOpen size={16} /> {t('register.reason_label')}
                                </label>
                                <div className="relative group">
                                    <select
                                        required
                                        name="userReason"
                                        className="w-full px-6 py-4 rounded-2xl bg-gray-50 dark:bg-gray-800 border-2 border-transparent focus:border-primary outline-none transition-all dark:text-white appearance-none cursor-pointer"
                                    >
                                        <option value="" disabled selected>{t('register.select_placeholder')}</option>
                                        <option value={t('register.reason_opt1')}>{t('register.reason_opt1')}</option>
                                        <option value={t('register.reason_opt2')}>{t('register.reason_opt2')}</option>
                                        <option value={t('register.reason_opt3')}>{t('register.reason_opt3')}</option>
                                    </select>
                                    <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 group-focus-within:text-primary transition-colors">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="m6 9 6 6 6-6" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            <Button
                                type="submit"
                                variant="primary"
                                className="w-full justify-center py-5 text-xl"
                                disabled={formState === 'loading'}
                            >
                                {formState === 'loading' ? t('contact.form.sending') : (
                                    <>
                                        {t('register.submit')} <Send size={20} className="group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </Button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Register;
