import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import tr from './locales/tr.json';
import uz from './locales/uz.json';

i18n
    .use(initReactI18next)
    .init({
        resources: {
            tr: { translation: tr },
            uz: { translation: uz }
        },
        lng: "tr", // Default mainly Turkish as per request
        fallbackLng: "tr",
        interpolation: {
            escapeValue: false
        }
    });

export default i18n;
