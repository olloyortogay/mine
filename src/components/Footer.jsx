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
                    </div>
                </div>

                <div className="border-t border-white/10 mt-12 pt-8 text-center text-sm">
                    © {currentYear} {t('common.brand')}.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
