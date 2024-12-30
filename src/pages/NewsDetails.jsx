import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import newsService from '../services/newsService';
import ShareButtons from '../components/ShareButtons';
import SEOHead from '../components/SEOHead';

function SidebarArticle({ article }) {
    return (
        <Link to={`/news/${article._id}`} className="flex gap-4 mb-6 hover:bg-gray-50 p-2 rounded">
            <img
                src={article.image}
                alt={article.arabicTitle}
                className="w-24 h-24 object-cover rounded"
            />
            <div className="flex-1">
                <h3 className="font-bold text-sm mb-2 line-clamp-2">
                    {article.arabicTitle}
                </h3>
                <span className="text-xs text-gray-600">
                    {new Date(article.date).toLocaleDateString('ar-SA')}
                </span>
            </div>
        </Link>
    );
}

export default function NewsDetails() {
    const [news, setNews] = useState(null);
    const [popularNews, setPopularNews] = useState([]);
    const [latestNews, setLatestNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [fullImageUrl, setFullImageUrl] = useState('');
    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const [article, latest, popular] = await Promise.all([
                    newsService.getNewsById(id),
                    newsService.getLatestNews(5),
                    newsService.getReliableNews()
                ]);

                setNews(article);
                setLatestNews(latest.filter(n => n._id !== id));
                setPopularNews(popular.filter(n => n._id !== id).slice(0, 5));

                // Définir l'URL de l'image
                const imageUrl = article.image.startsWith('http')
                    ? article.image
                    : `https://cinema7art.com${article.image}`;
                setFullImageUrl(imageUrl);
            } catch (error) {
                console.error('Error loading news:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    // Vérification de l'image
    useEffect(() => {
        if (fullImageUrl) {
            const img = new Image();
            img.src = fullImageUrl;
            img.onload = () => {
                console.log('Image chargée avec succès');
            };
            img.onerror = () => {
                console.error('Erreur de chargement de l\'image');
            };
        }
    }, [fullImageUrl]);

    useEffect(() => {
        if (news) {
            // S'assurer que l'URL de l'image est absolue
            const imageUrl = news.image.startsWith('http')
                ? news.image
                : `https://cinema7art.com${news.image}`;

            // Créer ou mettre à jour les meta tags
            const metaTags = [
                { property: 'og:title', content: news.arabicTitle },
                { property: 'og:description', content: news.arabicContent.substring(0, 300) + '...' },
                { property: 'og:url', content: `https://cinema7art.com/news/${news._id}` },
                { property: 'og:type', content: 'article' },
                { property: 'og:image', content: imageUrl },
                { property: 'og:image:width', content: '1200' },
                { property: 'og:image:height', content: '630' },
                { property: 'og:site_name', content: 'سينما أمريكية' },
                { property: 'article:published_time', content: news.date },
                { property: 'article:author', content: 'Cinema7Art' },
                { property: 'article:section', content: 'أخبار السينما' }
            ];

            // Mettre à jour ou créer les meta tags
            metaTags.forEach(({ property, content }) => {
                // Supprimer l'ancien meta tag s'il existe
                const existingMeta = document.querySelector(`meta[property="${property}"]`);
                if (existingMeta) {
                    existingMeta.remove();
                }

                // Créer un nouveau meta tag
                const meta = document.createElement('meta');
                meta.setAttribute('property', property);
                meta.setAttribute('content', content);
                document.head.appendChild(meta);

                console.log(`Meta tag updated - ${property}:`, content);
            });

            // Vérifier l'accessibilité de l'image
            const img = new Image();
            img.onload = () => console.log('Image accessible:', imageUrl);
            img.onerror = () => console.error('Image inaccessible:', imageUrl);
            img.src = imageUrl;
        }
    }, [news]);

    if (loading) {
        return <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
        </div>;
    }

    if (!news) {
        return <div className="text-center p-4">Article non trouvé</div>;
    }

    return (
        <>
            <SEOHead
                title={news.arabicTitle}
                description={news.arabicContent.substring(0, 300) + '...'}
                image={news.image}
                url={`/news/${news._id}`}
                type="article"
                date={news.date}
            />

            <div className="max-w-7xl mx-auto p-4 flex flex-col lg:flex-row gap-8">
                {/* Article principal */}
                <article className="lg:w-2/3 rtl">
                    <img
                        src={fullImageUrl}
                        alt={news.arabicTitle}
                        className="w-full h-[400px] object-cover rounded-lg mb-6"
                    />

                    <div className="space-y-4 text-right">
                        <h1 className="text-3xl font-bold mb-4">{news.arabicTitle}</h1>

                        <div className="flex justify-end gap-4 text-sm text-gray-600">
                            <span>{new Date(news.date).toLocaleDateString('ar-SA')}</span>
                            <span>{news.source}</span>
                        </div>

                        <div className="prose prose-lg max-w-none">
                            {news.arabicContent.split('\n').map((paragraph, index) => (
                                <p key={index} className="mb-4 leading-relaxed">
                                    {paragraph}
                                </p>
                            ))}
                        </div>

                        <div className="flex justify-end gap-2 mt-6">
                            {news.isExclusive && (
                                <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-sm">
                                    حصري
                                </span>
                            )}
                            <span className={`px-2 py-1 rounded text-sm ${news.reliability === 'reliable'
                                ? 'bg-green-100 text-green-800'
                                : news.reliability === 'unconfirmed'
                                    ? 'bg-yellow-100 text-yellow-800'
                                    : 'bg-gray-100 text-gray-800'
                                }`}>
                                {news.reliability === 'reliable' ? 'موثوق' :
                                    news.reliability === 'unconfirmed' ? 'غير مؤكد' :
                                        'إشاعة'}
                            </span>
                        </div>

                        <ShareButtons
                            url={`https://cinema7art.com/news/${news._id}`}
                            title={news.arabicTitle}
                            description={news.arabicContent.substring(0, 300) + '...'}
                            image={fullImageUrl}
                        />
                    </div>
                </article>

                {/* Ligne verticale */}
                <div className="hidden lg:block w-px bg-gray-200 mx-4"></div>

                {/* Barre latérale */}
                <aside className="lg:w-1/3 rtl">
                    {/* Articles les plus récents */}
                    <div className="mb-8">
                        <h2 className="text-xl font-bold mb-4 text-right">
                            أحدث الأخبار
                        </h2>
                        <div className="space-y-4">
                            {latestNews.map(article => (
                                <SidebarArticle key={article._id} article={article} />
                            ))}
                        </div>
                    </div>

                    {/* Articles populaires */}
                    <div>
                        <h2 className="text-xl font-bold mb-4 text-right">
                            الأكثر قراءة
                        </h2>
                        <div className="space-y-4">
                            {popularNews.map(article => (
                                <SidebarArticle key={article._id} article={article} />
                            ))}
                        </div>
                    </div>
                </aside>
            </div>
        </>
    );
} 