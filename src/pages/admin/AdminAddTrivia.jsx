import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function AdminAddTrivia() {
    const { movieId } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [movie, setMovie] = useState(null);
    const [trivia, setTrivia] = useState({
        content: '',
        source: '',
        category: '',
        isVerified: true
    });

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const token = localStorage.getItem('adminToken');
                const response = await axios.get(`/api/admin/movies/${movieId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setMovie(response.data);
            } catch (error) {
                setError('فشل في تحميل بيانات الفيلم');
                console.error('Error fetching movie:', error);
            }
        };

        fetchMovie();
    }, [movieId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const token = localStorage.getItem('adminToken');
            await axios.post('/api/admin/trivia', {
                ...trivia,
                movie: movieId
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            navigate('/admin/trivia');
        } catch (error) {
            setError(error.response?.data?.message || 'حدث خطأ في إضافة المعلومة');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-6">
                <h1 className="text-2xl font-bold">إضافة معلومة جديدة</h1>
                {movie && (
                    <span className="text-gray-600">
                        للفيلم: {movie.arabicTitle}
                    </span>
                )}
            </div>

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-gray-700 mb-2">المحتوى</label>
                    <textarea
                        value={trivia.content}
                        onChange={(e) => setTrivia({ ...trivia, content: e.target.value })}
                        className="w-full p-2 border rounded"
                        rows="4"
                        required
                    />
                </div>

                <div>
                    <label className="block text-gray-700 mb-2">المصدر (اختياري)</label>
                    <input
                        type="text"
                        value={trivia.source}
                        onChange={(e) => setTrivia({ ...trivia, source: e.target.value })}
                        className="w-full p-2 border rounded"
                    />
                </div>

                <div>
                    <label className="block text-gray-700 mb-2">التصنيف</label>
                    <select
                        value={trivia.category}
                        onChange={(e) => setTrivia({ ...trivia, category: e.target.value })}
                        className="w-full p-2 border rounded"
                        required
                    >
                        <option value="">اختر التصنيف</option>
                        <option value="production">إنتاج</option>
                        <option value="casting">اختيار الممثلين</option>
                        <option value="script">السيناريو</option>
                        <option value="effects">المؤثرات</option>
                        <option value="other">أخرى</option>
                    </select>
                </div>

                <div className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        checked={trivia.isVerified}
                        onChange={(e) => setTrivia({ ...trivia, isVerified: e.target.checked })}
                        id="isVerified"
                    />
                    <label htmlFor="isVerified" className="text-gray-700">
                        معلومة موثقة
                    </label>
                </div>

                <div className="flex justify-end space-x-4">
                    <button
                        type="button"
                        onClick={() => navigate('/admin/trivia')}
                        className="px-4 py-2 text-gray-600 hover:text-gray-800"
                    >
                        إلغاء
                    </button>
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-blue-300"
                    >
                        {loading ? 'جاري الإضافة...' : 'إضافة المعلومة'}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default AdminAddTrivia; 