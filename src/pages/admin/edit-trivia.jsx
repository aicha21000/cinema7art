import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

function AdminEditTrivia() {
    const router = useRouter();
    const { id } = router.query;
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
                setTrivia(response.data);
            } catch (error) {
                setError('فشل في تحميل بيانات المعلومة');
            } finally {
                setLoading(false);
            }
        };

        fetchTrivia();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        setError('');

        try {
            const token = localStorage.getItem('adminToken');
            await axios.put(`/api/admin/trivia/${id}`, trivia, {
                headers: { Authorization: `Bearer ${token}` }
            });
            router.push('/admin/trivia');
        } catch (error) {
            setError('فشل في تحديث بيانات المعلومة');
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="text-center py-8">جاري التحميل...</div>;

    return (
        <div className="max-w-3xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">تعديل المعلومة</h1>
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
                        onClick={() => router.push('/admin/trivia')}
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