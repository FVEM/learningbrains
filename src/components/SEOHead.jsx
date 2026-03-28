import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

const SEOHead = ({ title, description, keywords, path = '', schema }) => {
    const { i18n } = useTranslation();
    const location = useLocation();

    const siteUrl = 'https://learningbrains.eu';

    const languages = ['en', 'es', 'it', 'sk', 'de', 'pt'];
    const currentLang = i18n.language;

    // Ensure path starts with / but doesn't end with / (normalization)
    const normalizedPath = path.startsWith('/') ? path : `/${path}`;
    const cleanPath = normalizedPath === '/' ? '' : normalizedPath;

    // Construct canonical URL
    const canonicalUrl = `${siteUrl}/${currentLang}${cleanPath}`;

    const defaultKeywords = 'Learning Brains, Erasmus+, VET, vocational education training, AI, artificial intelligence, on-the-job learning, industrial reskilling, SMEs, Europe, upskilling';

    return (
        <Helmet>
            <title>{title ? `${title} | Learning Brains` : 'Learning Brains - Industrial Reskilling'}</title>
            <meta name="description" content={description || "Integrated On-the-job Learning Systems for Industrial Reskilling. Bridging the gap between theory and industrial practice."} />
            <meta name="keywords" content={keywords || defaultKeywords} />

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

            {/* x-default points to English */}
            <link rel="alternate" hrefLang="x-default" href={`${siteUrl}/en${cleanPath}`} />

            <meta property="og:locale" content={currentLang} />
            <meta property="og:type" content="website" />
            <meta property="og:title" content={title || 'Learning Brains'} />
            <meta property="og:description" content={description} />
            <meta property="og:url" content={canonicalUrl} />
            <meta property="og:site_name" content="Learning Brains" />

            {/* Structured Data (JSON-LD) */}
            {schema && (
                <script type="application/ld+json">
                    {JSON.stringify(schema)}
                </script>
            )}
        </Helmet>
    );
};

export default SEOHead;
