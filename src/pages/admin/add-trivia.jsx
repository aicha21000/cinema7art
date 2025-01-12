import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

function AdminAddTrivia() {
    const router = useRouter();
    const { movieId } = router.query;
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
                console.error('Error fetching movie:', error);
            }
        };

        fetchMovie();
    }, [movieId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const token = localStorage.getItem('adminToken');
            await axios.post('/api/admin/trivia', trivia, {
                headers: { Authorization: `Bearer ${token}` }
            });
            router.push('/admin/trivia');
        } catch (error) {
            setError('فشل في إضافة المعلومة');
            console.error('Error adding trivia:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">إضافة معلومة جديدة</h1>
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                    {error}
                </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-gray-700 mb-2">المحتوى</label>
                    <textarea
                        value={trivia.content}
                        onChange={(e) => setTrivia({ ...trivia, content: e.target.value })}
                        className="w-full p-2 border rounded"
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
                        onClick={() => router.push('/admin/trivia')}
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