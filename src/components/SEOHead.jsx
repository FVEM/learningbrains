import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

const LOCALE_MAP = {
    en: 'en_US',
    es: 'es_ES',
    it: 'it_IT',
    sk: 'sk_SK',
    de: 'de_DE',
    pt: 'pt_PT',
};

const SEOHead = ({
    title,
    description,
    keywords,
    path = '',
    schema,
    image,
    type = 'website',
    noindex = false,
}) => {
    const { i18n } = useTranslation();

    const siteUrl = 'https://learningbrains.eu';
    const defaultImage = `${siteUrl}/social-preview.png`;

    const languages = ['en', 'es', 'it', 'sk', 'de', 'pt'];
    const currentLang = languages.includes(i18n.language) ? i18n.language : 'en';

    // Ensure path starts with / but doesn't end with / (normalization)
    const normalizedPath = path.startsWith('/') ? path : `/${path}`;
    const cleanPath = normalizedPath === '/' ? '' : normalizedPath.replace(/\/+$/, '');

    // Construct canonical URL
    const canonicalUrl = `${siteUrl}/${currentLang}${cleanPath}`;

    // Avoid duplicating "| Learning Brains" if title already includes the brand name
    const fullTitle = !title
        ? 'Learning Brains – Industrial Reskilling'
        : title.toLowerCase().includes('learning brains')
            ? title
            : `${title} | Learning Brains`;

    const metaDescription =
        description ||
        'Integrated On-the-job Learning Systems for Industrial Reskilling. Bridging the gap between theory and industrial practice.';

    const defaultKeywords =
        'Learning Brains, Erasmus+, VET, vocational education training, AI, artificial intelligence, on-the-job learning, industrial reskilling, SMEs, Europe, upskilling';

    const resolvedImage = image
        ? image.startsWith('http')
            ? image
            : `${siteUrl}${image.startsWith('/') ? '' : '/'}${image}`
        : defaultImage;

    // Generate BreadcrumbList schema for internal pages
    const breadcrumbSchema = cleanPath
        ? {
              '@context': 'https://schema.org',
              '@type': 'BreadcrumbList',
              itemListElement: [
                  {
                      '@type': 'ListItem',
                      position: 1,
                      name: 'Learning Brains',
                      item: `${siteUrl}/${currentLang}`,
                  },
                  {
                      '@type': 'ListItem',
                      position: 2,
                      name: title || cleanPath.replace(/^\//, ''),
                      item: canonicalUrl,
                  },
              ],
          }
        : null;

    return (
        <Helmet htmlAttributes={{ lang: currentLang }}>
            <title>{fullTitle}</title>
            <meta name="description" content={metaDescription} />
            <meta name="keywords" content={keywords || defaultKeywords} />

            {noindex ? (
                <meta name="robots" content="noindex, nofollow" />
            ) : (
                <link rel="canonical" href={canonicalUrl} />
            )}

            {/* Hreflang Tags for all language variants */}
            {!noindex &&
                languages.map((lang) => (
                    <link
                        key={lang}
                        rel="alternate"
                        hrefLang={lang}
                        href={`${siteUrl}/${lang}${cleanPath}`}
                    />
                ))}

            {/* x-default points to English */}
            {!noindex && (
                <link rel="alternate" hrefLang="x-default" href={`${siteUrl}/en${cleanPath}`} />
            )}

            {/* Open Graph */}
            <meta property="og:locale" content={LOCALE_MAP[currentLang] || currentLang} />
            <meta property="og:type" content={type} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={metaDescription} />
            <meta property="og:url" content={canonicalUrl} />
            <meta property="og:image" content={resolvedImage} />
            <meta property="og:site_name" content="Learning Brains" />

            {/* Twitter Card */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={metaDescription} />
            <meta name="twitter:image" content={resolvedImage} />

            {/* Structured Data (JSON-LD) */}
            {schema && (
                <script type="application/ld+json">
                    {JSON.stringify(schema)}
                </script>
            )}
            {breadcrumbSchema && (
                <script type="application/ld+json">
                    {JSON.stringify(breadcrumbSchema)}
                </script>
            )}
        </Helmet>
    );
};

export default SEOHead;
