import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

const SEOHead = ({ title, description, path = '' }) => {
    const { i18n } = useTranslation();
    const location = useLocation();

    // Default site URL - change this to your custom domain in production
    const siteUrl = 'https://learningbrains.vercel.app';

    const languages = ['en', 'es', 'it', 'sk', 'de', 'pt'];
    const currentLang = i18n.language;

    // Ensure path starts with / but doesn't end with / (normalization)
    const normalizedPath = path.startsWith('/') ? path : `/${path}`;
    const cleanPath = normalizedPath === '/' ? '' : normalizedPath;

    // Construct canonical URL
    const canonicalUrl = `${siteUrl}/${currentLang}${cleanPath}`;

    return (
        <Helmet>
            <title>{title ? `${title} | Learning Brains` : 'Learning Brains - Industrial Reskilling'}</title>
            <meta name="description" content={description || "Integrated On-the-job Learning Systems for Industrial Reskilling. Bridging the gap between theory and industrial practice."} />

            <link rel="canonical" href={canonicalUrl} />

            {/* Hreflang Tags for all language variants */}
            {languages.map((lang) => (
                <link
                    key={lang}
                    rel="alternate"
                    hrefLang={lang}
                    href={`${siteUrl}/${lang}${cleanPath}`}
                />
            ))}

            {/* x-default points to English usually, or a root selector page */}
            <link rel="alternate" hrefLang="x-default" href={`${siteUrl}/en${cleanPath}`} />

            <meta property="og:locale" content={currentLang} />
            <meta property="og:type" content="website" />
            <meta property="og:title" content={title || 'Learning Brains'} />
            <meta property="og:description" content={description} />
            <meta property="og:url" content={canonicalUrl} />
            <meta property="og:site_name" content="Learning Brains" />
        </Helmet>
    );
};

export default SEOHead;
