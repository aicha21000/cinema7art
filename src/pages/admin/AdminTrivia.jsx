import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function AdminTrivia() {
    const [trivia, setTrivia] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedMovie, setSelectedMovie] = useState('');
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        fetchMovies();
    }, []);

    useEffect(() => {
        if (selectedMovie) {
            fetchTrivia();
        }
    }, [selectedMovie]);

    const fetchMovies = async () => {
        try {
            const token = localStorage.getItem('adminToken');
            const response = await axios.get('/api/admin/movies', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setMovies(response.data);
        } catch (error) {
            console.error('Error fetching movies:', error);
        }
    };

    const fetchTrivia = async () => {
        try {
            const token = localStorage.getItem('adminToken');
            const response = await axios.get(`/api/admin/trivia/movie/${selectedMovie}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setTrivia(response.data);
        } catch (error) {
            console.error('Error fetching trivia:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('هل أنت متأكد من حذف هذه المعلومة؟')) {
            try {
                const token = localStorage.getItem('adminToken');
                await axios.delete(`/api/admin/trivia/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                fetchTrivia();
            } catch (error) {
                console.error('Error deleting trivia:', error);
            }
        }
    };

    const handleVerify = async (id) => {
        try {
            const token = localStorage.getItem('adminToken');
            await axios.put(`/api/admin/trivia/${id}/verify`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchTrivia();
        } catch (error) {
            console.error('Error verifying trivia:', error);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                    <h1 className="text-2xl font-bold">إدارة المعلومات والحقائق</h1>
                    <select
                        value={selectedMovie}
                        onChange={(e) => setSelectedMovie(e.target.value)}
                        className="p-2 border rounded-md"
                    >
                        <option value="">اختر فيلماً</option>
                        {movies.map(movie => (
                            <option key={movie._id} value={movie._id}>
                                {movie.arabicTitle}
                            </option>
                        ))}
                    </select>
                </div>
                {selectedMovie && (
                    <Link
                        to={`/admin/trivia/add/${selectedMovie}`}
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                    >
                        إضافة معلومة جديدة
                    </Link>
                )}
            </div>

            {selectedMovie ? (
                loading ? (
                    <div className="text-center py-8">جاري التحميل...</div>
                ) : (
                    <div className="grid grid-cols-1 gap-4">
                        {trivia.map((item) => (
                            <div key={item._id} className="bg-white rounded-lg shadow p-4">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="text-gray-800 mb-2">{item.content}</p>
                                        {item.source && (
                                            <p className="text-sm text-gray-500">
                                                المصدر: {item.source}
                                            </p>
                                        )}
                                        <div className="text-sm text-blue-600 mt-2">
                                            {item.category === 'production' && 'إنتاج'}
                                            {item.category === 'casting' && 'اختيار الممثلين'}
                                            {item.category === 'script' && 'السيناريو'}
                                            {item.category === 'effects' && 'المؤثرات'}
                                            {item.category === 'other' && 'أخرى'}
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <Link
                                            to={`/admin/trivia/edit/${item._id}`}
                                            className="text-indigo-600 hover:text-indigo-900"
                                        >
                                            تعديل
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(item._id)}
                                            className="text-red-600 hover:text-red-900"
                                        >
                                            حذف
                                        </button>
                                        {!item.isVerified && (
                                            <button
                                                onClick={() => handleVerify(item._id)}
                                                className="text-green-600 hover:text-green-900"
                                            >
                                                تأكيد
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                        {trivia.length === 0 && (
                            <div className="text-center py-8 text-gray-500">
                                لا توجد معلومات لهذا الفيلم
                            </div>
                        )}
                    </div>
                )
            ) : (
                <div className="text-center py-8 text-gray-500">
                    اختر فيلماً لعرض معلوماته
                </div>
            )}
        </div>
    );
}

export default AdminTrivia; 