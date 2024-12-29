import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import newsService from '../services/newsService';
import { FaFacebookSquare } from 'react-icons/fa';
import { Helmet } from 'react-helmet-async';

export default function NewsDetail() {
    const { id } = useParams();
    const [news, setNews] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const shareUrl = `${window.location.origin}/news/${id}`;

    useEffect(() => {
        const fetchNewsDetail = async () => {
            try {
                setLoading(true);
                const newsItem = await newsService.getNewsById(id);
                setNews(newsItem);
            } catch (error) {
                console.error('Error fetching news detail:', error);
                setError('حدث خطأ أثناء تحميل الخبر');
            } finally {
                setLoading(false);
            }
        };

        fetchNewsDetail();
    }, [id]);

    const shareOnFacebook = () => {
        window.open(
            `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
            'facebook-share-dialog',
            'width=626,height=436'
        );
    };

    if (loading) return <div className="text-center py-8">جاري التحميل...</div>;
    if (error) return <div className="text-center text-red-600 py-8">{error}</div>;
    if (!news) return <div className="text-center py-8">الخبر غير موجود</div>;

    return (
        <>
            <Helmet>
                <meta property="og:url" content={`https://cinema7art.com/news/${id}`} />
                <meta property="og:type" content="article" />
                <meta property="og:title" content={news.arabicTitle} />
                <meta property="og:description" content={news.arabicContent.substring(0, 200)} />
                {news.image && <meta property="og:image" content={news.image} />}
                <meta property="fb:app_id" content="919869716781070" />
                <meta property="og:site_name" content="سينما7" />
                <meta property="og:locale" content="ar_AR" />
            </Helmet>

            <article className="container mx-auto px-4 py-8">
                <Link to="/news" className="text-blue-600 hover:text-blue-800 mb-4 block">
                    ← العودة إلى الأخبار
                </Link>

                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    {news.image && (
                        <div className="aspect-video">
                            <img
                                src={news.image}
                                alt={news.arabicTitle}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    )}

                    <div className="p-6">
                        <div className="flex items-center justify-between mb-4">
                            <span className={`px-3 py-1 rounded-full text-sm ${news.reliability === 'reliable'
                                ? 'bg-green-100 text-green-800'
                                : news.reliability === 'unconfirmed'
                                    ? 'bg-yellow-100 text-yellow-800'
                                    : 'bg-red-100 text-red-800'
                                }`}>
                                {news.reliability === 'reliable' ? 'موثوق'
                                    : news.reliability === 'unconfirmed' ? 'غير مؤكد'
                                        : 'شائعة'}
                            </span>
                            <span className="text-gray-500 text-sm">{news.source}</span>
                        </div>

                        <h1 className="text-3xl font-bold mb-4 text-right">
                            {news.arabicTitle}
                        </h1>

                        <p className="text-gray-600 mb-6 text-right leading-relaxed">
                            {news.arabicContent}
                        </p>

                        {news.isExclusive && (
                            <div className="text-blue-600 text-sm font-medium text-right mb-4">
                                حصري
                            </div>
                        )}

                        <div className="text-gray-500 text-sm text-right">
                            {new Date(news.date).toLocaleDateString('ar-EG', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}
                        </div>

                        {news.sourceUrl && (
                            <a
                                href={news.sourceUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:text-blue-800 text-sm block mt-4 text-right"
                            >
                                المصدر الأصلي للخبر →
                            </a>
                        )}
                    </div>
                </div>

                <div className="mt-8 flex justify-center">
                    <button
                        onClick={shareOnFacebook}
                        className="bg-blue-600 text-white px-6 py-3 rounded-lg flex items-center gap-2 hover:bg-blue-700"
                    >
                        <FaFacebookSquare size={24} />
                        <span>مشاركة على فيسبوك</span>
                    </button>
                </div>
            </article>
        </>
    );
} 