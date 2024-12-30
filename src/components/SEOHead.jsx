import { Helmet } from 'react-helmet-async';

export default function SEOHead({
    title,
    description,
    keywords,
    image,
    url,
    type = 'article'
}) {
    const siteName = "سينما أمريكية";
    const defaultDescription = "موقع عربي متخصص في السينما الأمريكية، أخبار الأفلام والمسلسلات، مراجعات، تقييمات وأكثر";
    const defaultImage = "/logo.png";
    const baseUrl = "https://cinema7art.com";
    const fullUrl = url ? `${baseUrl}${url}` : baseUrl;
    const fullImage = image ? (image.startsWith('http') ? image : `${baseUrl}${image}`) : `${baseUrl}${defaultImage}`;

    return (
        <Helmet>
            {/* Tags de base */}
            <title>{title ? `${title} | ${siteName}` : siteName}</title>
            <meta name="description" content={description || defaultDescription} />
            <meta name="keywords" content={keywords} />

            {/* Open Graph - Optimisé pour le partage Facebook */}
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description || defaultDescription} />
            <meta property="og:image" content={fullImage} />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
            <meta property="og:url" content={fullUrl} />
            <meta property="og:type" content={type} />
            <meta property="og:site_name" content={siteName} />
            <meta property="fb:app_id" content="919869716781070" />
            <meta property="og:locale" content="ar_AR" />
            <meta property="article:published_time" content={new Date().toISOString()} />
            <meta property="article:author" content="Cinema7Art" />
            <meta property="article:section" content="أخبار السينما" />
            <meta property="og:updated_time" content={new Date().toISOString()} />

            {/* Twitter Card */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description || defaultDescription} />
            <meta name="twitter:image" content={fullImage} />

            {/* Balises supplémentaires pour le SEO */}
            <meta name="robots" content="max-image-preview:large" />
            <meta name="language" content="ar" />
            <link rel="canonical" href={fullUrl} />
        </Helmet>
    );
} 