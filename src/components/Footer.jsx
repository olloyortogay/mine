import { useTranslation } from 'react-i18next';
import { Instagram, Send } from 'lucide-react';

const Footer = () => {
    const { t } = useTranslation();
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-dark text-gray-400 py-12 border-t border-white/10">
            <div className="container">
                <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                    {/* Logo & Desc */}
                    <div className="text-center md:text-left">
                        <div className="text-2xl font-black tracking-tighter text-white flex items-center justify-center md:justify-start gap-2 mb-4">
                            <img src="/logo.png" alt="Logo" className="w-10 h-10 object-contain" />
                            {t('common.brand')}
                        </div>
                        <p>{t('footer.desc')}</p>
                    </div>

                    {/* Socials */}
                    <div className="flex items-center gap-6">
                        {/* Telegram replaces Facebook */}
                        <a href="https://t.me/turkdunyasi_on" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#0088cc] hover:text-white transition-all transform hover:-translate-y-1" title="Telegram">
                            <Send size={20} />
                        </a>
                        {/* Updated Instagram */}
                        <a href="https://www.instagram.com/turkdunyasi2026/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#E1306C] hover:text-white transition-all transform hover:-translate-y-1" title="Instagram">
                            <Instagram size={20} />
                        </a>
                        {/* X stays */}
                        <a href="https://x.com/olloyortogay" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-black hover:text-white transition-all transform hover:-translate-y-1" title="X (Twitter)">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
                            </svg>
                        </a>
                        {/* LinkedIn Removed */}
                    </div>
                </div>

                <div className="border-t border-white/10 mt-12 pt-8 text-center text-sm">
                    © {currentYear} {t('common.brand')}. {t('footer.rights')}
                </div>
            </div>
        </footer>
    );
};

export default Footer;
