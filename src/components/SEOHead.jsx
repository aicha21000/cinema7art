import { Helmet } from 'react-helmet-async';

export default function SEOHead({
    title,
    description,
    keywords,
    image,
    url
}) {
    const siteName = "سينما أمريكية";
    const defaultDescription = "موقع عربي متخصص في السينما الأمريكية، أخبار الأفلام والمسلسلات، مراجعات، تقييمات وأكثر";
    const defaultImage = "/logo.png";
    const baseUrl = "https://votre-domaine.com";

    return (
        <Helmet>
            {/* Tags de base */}
            <title>{title ? `${title} | ${siteName}` : siteName}</title>
            <meta name="description" content={description || defaultDescription} />
            <meta name="keywords" content={keywords} />

            {/* Open Graph */}
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description || defaultDescription} />
            <meta property="og:image" content={image || `${baseUrl}${defaultImage}`} />
            <meta property="og:url" content={url || baseUrl} />
            <meta property="og:type" content="website" />
            <meta property="og:site_name" content={siteName} />

            {/* Twitter Card */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description || defaultDescription} />
            <meta name="twitter:image" content={image || `${baseUrl}${defaultImage}`} />

            {/* Tags supplémentaires pour le SEO */}
            <meta name="robots" content="index, follow" />
            <meta name="language" content="ar" />
            <link rel="canonical" href={url || baseUrl} />
        </Helmet>
    );
} 