import { Helmet } from 'react-helmet-async';

export default function SEOHead({
    title,
    description,
    keywords,
    url,
    type = 'article',
    date = new Date().toISOString()
}) {
    const siteName = "سينما أمريكية";
    const baseUrl = "https://cinema7art.com";
    const fullUrl = url ? `${baseUrl}${url}` : baseUrl;

    return (
        <Helmet>
            <title>{title ? `${title} | ${siteName}` : siteName}</title>
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />
            <link rel="canonical" href={fullUrl} />
        </Helmet>
    );
} 