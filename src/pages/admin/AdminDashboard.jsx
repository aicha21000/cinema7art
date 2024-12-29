import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '../../components/AdminLayout';

function AdminDashboard() {
    const [stats, setStats] = useState({
        totalMovies: 0,
        totalActors: 0,
        totalNews: 0
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await fetch('/api/admin/stats');
                if (!response.ok) throw new Error('فشل في تحميل الإحصائيات');
                const data = await response.json();
                setStats(data);
            } catch (error) {
                setError('فشل في تحميل الإحصائيات');
                console.error('Error fetching stats:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    const cards = [
        {
            title: 'الأفلام',
            count: stats.totalMovies,
            icon: 'movie',
            link: '/admin/movies',
            color: 'bg-blue-500'
        },
        {
            title: 'الممثلون',
            count: stats.totalActors,
            icon: 'person',
            link: '/admin/actors',
            color: 'bg-green-500'
        },
        {
            title: 'الأخبار',
            count: stats.totalNews,
            icon: 'article',
            link: '/admin/news',
            color: 'bg-purple-500'
        }
    ];

    if (loading) return <div className="text-center py-8">جاري التحميل...</div>;

    return (
        <AdminLayout>
            <div className="space-y-6">
                <h1 className="text-3xl font-bold">لوحة التحكم</h1>

                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                        {error}
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {cards.map(card => (
                        <Link
                            key={card.title}
                            to={card.link}
                            className="block"
                        >
                            <div className={`${card.color} text-white rounded-lg shadow-lg p-6 hover:opacity-90 transition-opacity`}>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-lg font-semibold">{card.title}</p>
                                        <h3 className="text-3xl font-bold mt-2">{card.count}</h3>
                                    </div>
                                    <span className="material-icons text-4xl opacity-80">
                                        {card.icon}
                                    </span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-xl font-bold mb-4">إضافة محتوى جديد</h2>
                        <div className="space-y-4">
                            <Link
                                to="/admin/movies/add"
                                className="block bg-blue-50 text-blue-600 p-4 rounded hover:bg-blue-100"
                            >
                                <div className="flex items-center gap-3">
                                    <span className="material-icons">add_circle</span>
                                    إضافة فيلم جديد
                                </div>
                            </Link>
                            <Link
                                to="/admin/actors/add"
                                className="block bg-green-50 text-green-600 p-4 rounded hover:bg-green-100"
                            >
                                <div className="flex items-center gap-3">
                                    <span className="material-icons">add_circle</span>
                                    إضافة ممثل جديد
                                </div>
                            </Link>
                            <Link
                                to="/admin/news/add"
                                className="block bg-purple-50 text-purple-600 p-4 rounded hover:bg-purple-100"
                            >
                                <div className="flex items-center gap-3">
                                    <span className="material-icons">add_circle</span>
                                    إضافة خبر جديد
                                </div>
                            </Link>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-xl font-bold mb-4">روابط سريعة</h2>
                        <div className="space-y-4">
                            <Link
                                to="/"
                                target="_blank"
                                className="block bg-gray-50 p-4 rounded hover:bg-gray-100"
                            >
                                <div className="flex items-center gap-3">
                                    <span className="material-icons">public</span>
                                    عرض الموقع
                                </div>
                            </Link>
                            <Link
                                to="/admin/movies"
                                className="block bg-gray-50 p-4 rounded hover:bg-gray-100"
                            >
                                <div className="flex items-center gap-3">
                                    <span className="material-icons">movie</span>
                                    إدارة الأفلام
                                </div>
                            </Link>
                            <Link
                                to="/admin/actors"
                                className="block bg-gray-50 p-4 rounded hover:bg-gray-100"
                            >
                                <div className="flex items-center gap-3">
                                    <span className="material-icons">person</span>
                                    إدارة الممثلين
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}

export default AdminDashboard; 