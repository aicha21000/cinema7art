import { useState, useEffect } from 'react';
import AdminLayout from '../../src/components/admin/admin-layout';
import NewsService from '../../src/services/news-service';
import Link from 'next/link';

function AdminUnvalidatedNews() {
    const [unvalidatedNews, setUnvalidatedNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Fonction pour tronquer le texte
    const truncateText = (text, maxLength = 200) => {
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength).trim() + '...';
    };

    useEffect(() => {
        loadUnvalidatedNews();
    }, []);

    const loadUnvalidatedNews = async () => {
        try {
            const news = await NewsService.getUnvalidatedNews();
            if (!Array.isArray(news)) {
                console.error('Invalid news data:', news);
                setUnvalidatedNews([]);
                setError('Format de données invalide');
                return;
            }
            setUnvalidatedNews(news);
        } catch (error) {
            console.error('Error loading unvalidated news:', error);
            setError('Erreur lors du chargement des articles non validés');
            setUnvalidatedNews([]);
        } finally {
            setLoading(false);
        }
    };

    const handleValidate = async (id) => {
        const confirmed = window.confirm('Êtes-vous sûr de vouloir valider cet article ?');
        if (!confirmed) return;

        try {
            setLoading(true);
            await NewsService.validateNews(id);
            setError('');
            alert('Article validé avec succès');
            // Recharger la liste après validation
            await loadUnvalidatedNews();
        } catch (error) {
            setError('Erreur lors de la validation');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className="text-center py-8">جاري التحميل...</div>;

    return (
        <AdminLayout>
            <div className="space-y-6">
                <h1 className="text-3xl font-bold">Articles non validés</h1>

                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                        {error}
                    </div>
                )}

                <div className="grid gap-6">
                    {unvalidatedNews.map(news => (
                        <div key={news._id} className="bg-white p-6 rounded-lg shadow">
                            <div className="flex justify-between items-start">
                                <div>
                                    <div className="flex items-center gap-2">
                                        <h2 className="text-xl font-semibold mb-2">{news.arabicTitle}</h2>
                                        <span className="text-sm px-2 py-1 rounded bg-yellow-100 text-yellow-800">
                                            Non validé
                                        </span>
                                    </div>
                                    <p className="text-gray-600 mb-4" dir="rtl">
                                        {truncateText(news.arabicContent)}
                                    </p>

                                    <div className="flex gap-4 text-sm text-gray-500">
                                        <span>Source: {news.source}</span>
                                        <span>Date: {new Date(news.date).toLocaleDateString()}</span>
                                    </div>
                                </div>

                                {news.image && (
                                    <img
                                        src={news.image}
                                        alt={news.title}
                                        className="w-32 h-32 object-cover rounded"
                                    />
                                )}
                            </div>

                            <div className="mt-4 flex gap-4">
                                <button
                                    onClick={() => handleValidate(news._id)}
                                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                                    disabled={loading}
                                >
                                    {loading ? 'Validation...' : 'Valider'}
                                </button>

                                <Link className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" href={`/admin/news/edit/${news._id}`}>
                                    Modifier
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

                {unvalidatedNews.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                        Aucun article à valider
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}

export default AdminUnvalidatedNews; 