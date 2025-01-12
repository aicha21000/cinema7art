import { useState, useEffect } from 'react';
import NewsService from '../../services/news-service';
import { Link } from 'react-router-dom';
// Fonction pour récupérer les news validées
const fetchValidatedNews = async () => {
    const response = await NewsService.getAllNews(); // Cette route renvoie les news validées
    return response;
};

// Fonction pour récupérer les news non validées
const fetchUnvalidatedNews = async () => {
    const response = await NewsService.getUnvalidatedNews(); // Ajoutez cette fonction dans votre service
    return response;
};

// Fonction pour valider une news
const validateNews = async (id) => {
    try {
        const response = await NewsService.validateNews(id);
        return response;
    } catch (error) {
        console.error('Erreur lors de la validation de la news:', error);
        throw error;
    }
};

function AdminNewsCard({ news, onDelete, onValidate }) {
    return (
        <div className="flex flex-col gap-4">
            <div className="bg-white shadow rounded-lg p-4 flex flex-col">
                {news.image && (
                    <img
                        src={news.image}
                        alt={news.arabicTitle}
                        className="w-full h-48 object-cover rounded-lg mb-4"
                    />
                )}

                <div className="flex-1 space-y-2 rtl">
                    <h3 className="font-bold text-lg mb-2">
                        {news.arabicTitle}
                    </h3>

                    <div className="text-sm text-gray-600 flex justify-between items-center">
                        <span>{news.source}</span>
                        <span>{new Date(news.date).toLocaleDateString('ar-SA')}</span>
                    </div>
                    <div className="flex gap-2">
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
                            {news.reliability}
                        </span>
                    </div>
                </div>

                <div className="flex justify-end gap-2 mt-4 border-t pt-4">
                    {onValidate && (
                        <button
                            onClick={() => onValidate(news._id)}
                            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                        >
                            تأكيد
                        </button>
                    )}
                    <Link className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" to={`/admin/edit-news/${news._id}`}>
                        تعديل
                    </Link>
                    <button
                        onClick={() => onDelete(news._id)}
                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                        {news.isValidated ? 'إلغاء التفعيل' : 'حذف'}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default function AdminNews() {
    const [validatedNews, setValidatedNews] = useState([]);
    const [unvalidatedNews, setUnvalidatedNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showValidated, setShowValidated] = useState(true);
    const [showUnvalidated, setShowUnvalidated] = useState(true);

    useEffect(() => {
        fetchNews();
    }, []);

    const fetchNews = async () => {
        try {
            setLoading(true);
            const [validatedResponse, unvalidatedResponse] = await Promise.all([
                fetchValidatedNews(),
                fetchUnvalidatedNews()
            ]);
            setValidatedNews(validatedResponse);
            setUnvalidatedNews(unvalidatedResponse);
        } catch (error) {
            console.error('Erreur lors de la récupération des actualités:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        console.log('Attempting to delete news with ID:', id);
        const newsItem = validatedNews.find(item => item._id === id) || unvalidatedNews.find(item => item._id === id);

        if (window.confirm(`هل أنت متأكد من ${newsItem.isValidated ? 'إلغاء تفعيل' : 'حذف'} هذا المقال؟`)) {
            try {
                if (newsItem.isValidated) {
                    await NewsService.unvalidateNews(id);
                    setValidatedNews(validatedNews.filter(item => item._id !== id));
                    setUnvalidatedNews([...unvalidatedNews, newsItem]);
                } else {
                    await NewsService.deleteNews(id);
                    setUnvalidatedNews(unvalidatedNews.filter(item => item._id !== id));
                }
                fetchNews();
            } catch (error) {
                console.error('Erreur lors de la suppression de l\'article:', error);
            }
        }
    };

    const handleValidate = async (id) => {
        try {
            const validatedNewsItem = await validateNews(id);
            setUnvalidatedNews(unvalidatedNews.filter(item => item._id !== id));
            setValidatedNews([...validatedNews, validatedNewsItem]);
        } catch (error) {
            console.error('Erreur lors de la validation de l\'article:', error);
        }
    };

    if (loading) {
        return <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
        </div>;
    }

    return (
        <div className="max-w-7xl mx-auto p-4">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">إدارة الأخبار</h1>
                <Link className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600" to="/admin/news/create">
                    إضافة خبر جديد
                </Link>
            </div>

            <div className="mb-4">
                <button onClick={() => setShowValidated(!showValidated)} className="w-full text-right bg-green-200 p-2 rounded">
                    {showValidated ? 'إخفاء الأخبار المؤكدة' : 'عرض الأخبار المؤكدة'}
                </button>
                {showValidated && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {validatedNews.map(item => (
                            <AdminNewsCard
                                key={item._id}
                                news={item}
                                onDelete={handleDelete}
                                onValidate={null}
                            />
                        ))}
                    </div>
                )}
            </div>

            <div>
                <button onClick={() => setShowUnvalidated(!showUnvalidated)} className="w-full text-right bg-red-200 p-2 rounded">
                    {showUnvalidated ? 'إخفاء الأخبار غير المؤكدة' : 'عرض الأخبار غير المؤكدة'}
                </button>
                {showUnvalidated && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {unvalidatedNews.map(item => (
                            <AdminNewsCard
                                key={item._id}
                                news={item}
                                onDelete={handleDelete}
                                onValidate={handleValidate}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
