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
    const fullImage = image ? (image.startsWith('http') ? image : `${baseUrl}${image}`) : `${baseUrl}${defaultImage}`;

    return (
        <Helmet>
            <title>{title ? `${title} | ${siteName}` : siteName}</title>

            {/* Meta tags de base */}
            <meta name="title" content={title} />
            <meta name="description" content={description || defaultDescription} />
            <meta name="keywords" content={keywords} />

            {/* Open Graph / Facebook */}
            <meta property="og:locale" content="ar_AR" />
            <meta property="og:type" content={type} />
            <meta property="og:url" content={fullUrl} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description || defaultDescription} />
            <meta property="og:image" content={fullImage} />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
            <meta property="og:site_name" content={siteName} />
            <meta property="article:published_time" content={date} />
            <meta property="article:modified_time" content={date} />
            <meta property="article:author" content="Cinema7Art" />
            <meta property="article:section" content="أخبار السينما" />
            <meta property="fb:app_id" content="919869716781070" />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:url" content={fullUrl} />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description || defaultDescription} />
            <meta name="twitter:image" content={fullImage} />

            {/* Autres meta tags */}
            <meta name="robots" content="max-image-preview:large" />
            <link rel="canonical" href={fullUrl} />

            {/* Preload de l'image pour Facebook */}
            <link rel="preload" as="image" href={fullImage} />
        </Helmet>
    );
} 