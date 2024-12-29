import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import newsService from '../services/newsService';

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
            } catch (error) {
                console.error('Error loading news:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    if (loading) {
        return <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
        </div>;
    }

    if (!news) {
        return <div className="text-center p-4">Article non trouvé</div>;
    }

    return (
        <div className="max-w-7xl mx-auto p-4 flex flex-col lg:flex-row gap-8">
            {/* Article principal */}
            <article className="lg:w-2/3 rtl">
                <img
                    src={news.image}
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
    );
} 