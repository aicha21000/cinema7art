import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function AdminEditTrivia() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');
    const [movie, setMovie] = useState(null);
    const [trivia, setTrivia] = useState({
        content: '',
        source: '',
        category: '',
        isVerified: false,
        movie: ''
    });

    useEffect(() => {
        const fetchTrivia = async () => {
            try {
                const token = localStorage.getItem('adminToken');
                const response = await axios.get(`/api/admin/trivia/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const triviaData = response.data;
                setTrivia(triviaData);

                // Charger les informations du film
                const movieResponse = await axios.get(`/api/admin/movies/${triviaData.movie}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setMovie(movieResponse.data);
            } catch (error) {
                setError('فشل في تحميل البيانات');
                console.error('Error fetching trivia:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchTrivia();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            const token = localStorage.getItem('adminToken');
            await axios.put(`/api/admin/trivia/${id}`, trivia, {
                headers: { Authorization: `Bearer ${token}` }
            });
            navigate('/admin/trivia');
        } catch (error) {
            setError(error.response?.data?.message || 'حدث خطأ في تحديث المعلومة');
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="text-center py-8">جاري التحميل...</div>;

    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-6">
                <h1 className="text-2xl font-bold">تعديل معلومة</h1>
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
                        value={trivia.source || ''}
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
                        disabled={saving}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-blue-300"
                    >
                        {saving ? 'جاري الحفظ...' : 'حفظ التغييرات'}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default AdminEditTrivia; 