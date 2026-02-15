import { useEffect } from 'react';
import { useParams, Outlet, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Layout from './Layout';

const LanguageLayout = () => {
    const { lang } = useParams();
    const { i18n } = useTranslation();
    const navigate = useNavigate();
    const supportedLangs = ['en', 'es', 'it', 'sk', 'de', 'pt'];

    useEffect(() => {
        // Validate language
        if (!supportedLangs.includes(lang)) {
            // If invalid lang, redirect to default (en) or 404
            // For now, redirect to 'en' preserving the rest of path if possible? 
            // Or just 'en' home.
            navigate('/en', { replace: true });
            return;
        }

        if (i18n.language !== lang) {
            i18n.changeLanguage(lang);
        }
    }, [lang, i18n, navigate]);

    if (!supportedLangs.includes(lang)) return null;

    return (
        <Layout>
            <Outlet />
        </Layout>
    );
};

export default LanguageLayout;
