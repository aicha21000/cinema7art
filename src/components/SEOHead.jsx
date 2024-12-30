import { Helmet } from 'react-helmet-async';

export default function SEOHead({
    title,
    description,
    keywords,
    image,
    url,
    type = 'article',
    date = new Date().toISOString()
}) {
    const siteName = "سينما أمريكية";
    const defaultDescription = "موقع عربي متخصص في السينما الأمريكية، أخبار الأفلام والمسلسلات، مراجعات، تقييمات وأكثر";
    const defaultImage = "/logo.png";
    const baseUrl = "https://cinema7art.com";
    const fullUrl = url ? `${baseUrl}${url}` : baseUrl;

    // Log des valeurs des balises og
    console.log('Open Graph Tags:', {
        title,
        description,
        image,
        url: fullUrl,
        type,
        date,
        siteName
    });

    return (
        <Helmet>
            {/* Meta tags de base */}
            <title>{title ? `${title} | ${siteName}` : siteName}</title>
            <meta name="description" content={description || defaultDescription} />
            <meta name="keywords" content={keywords} />

            {/* Open Graph / Facebook */}
            <meta property="og:title" content={title} />
            <meta property="og:site_name" content={siteName} />
            <meta property="og:url" content={fullUrl} />
            <meta property="og:description" content={description || defaultDescription} />
            <meta property="og:type" content={type} />
            <meta property="og:locale" content="ar_AR" />

            {/* Image tags - Utilisation directe de l'URL de l'image */}
            <meta property="og:image" content={image} />
            <meta property="og:image:url" content={image} />
            <meta property="og:image:secure_url" content={image} />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
            <meta property="og:image:type" content="image/jpeg" />
            <meta property="og:image:alt" content={title} />

            {/* Article specific */}
            <meta property="article:published_time" content={date} />
            <meta property="article:modified_time" content={date} />
            <meta property="article:author" content="Cinema7Art" />
            <meta property="article:publisher" content="https://www.facebook.com/cinema7art" />
            <meta property="article:section" content="أخبار السينما" />

            {/* Facebook App ID */}
            <meta property="fb:app_id" content="919869716781070" />

            {/* Twitter Card */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description || defaultDescription} />
            <meta name="twitter:image" content={image} />

            {/* Canonical URL */}
            <link rel="canonical" href={fullUrl} />
        </Helmet>
    );
} 