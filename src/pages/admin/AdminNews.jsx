import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import newsService from '../../services/newsService';

function AdminNewsCard({ news, onDelete }) {
    return (
        <div className="bg-white shadow rounded-lg p-4 flex flex-col">
            <img
                src={news.image}
                alt={news.arabicTitle}
                className="w-full h-48 object-cover rounded-lg mb-4"
            />

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
                <Link
                    to={`/admin/news/edit/${news._id}`}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    تعديل
                </Link>
                <button
                    onClick={() => onDelete(news._id)}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                    حذف
                </button>
            </div>
        </div>
    );
}

export default function AdminNews() {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all'); // all, exclusive, reliable
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchNews();
    }, []);

    const fetchNews = async () => {
        try {
            setLoading(true);
            const response = await newsService.getAllNews();
            setNews(response);
        } catch (error) {
            console.error('Error fetching news:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('هل أنت متأكد من حذف هذا المقال؟')) {
            try {
                // Implémenter la suppression ici
                await newsService.deleteNews(id);
                setNews(news.filter(item => item._id !== id));
            } catch (error) {
                console.error('Error deleting news:', error);
            }
        }
    };

    const filteredNews = news.filter(item => {
        let matchesFilter = true;
        if (filter === 'exclusive') matchesFilter = item.isExclusive;
        if (filter === 'reliable') matchesFilter = item.reliability === 'reliable';

        const matchesSearch =
            item.arabicTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.arabicContent.toLowerCase().includes(searchTerm.toLowerCase());

        return matchesFilter && matchesSearch;
    });

    if (loading) {
        return <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
        </div>;
    }

    return (
        <div className="max-w-7xl mx-auto p-4">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">إدارة الأخبار</h1>
                <Link
                    to="/admin/news/create"
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                    إضافة خبر جديد
                </Link>
            </div>

            <div className="flex gap-4 mb-6">
                <input
                    type="text"
                    placeholder="بحث..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="flex-1 p-2 border rounded rtl"
                />
                <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="p-2 border rounded rtl"
                >
                    <option value="all">جميع الأخبار</option>
                    <option value="exclusive">الأخبار الحصرية</option>
                    <option value="reliable">الأخبار الموثوقة</option>
                </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredNews.map(item => (
                    <AdminNewsCard
                        key={item._id}
                        news={item}
                        onDelete={handleDelete}
                    />
                ))}
            </div>
        </div>
    );
} 