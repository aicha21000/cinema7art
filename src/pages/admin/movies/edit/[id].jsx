import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import MovieService from '../../../../src/services/movie-service';

function AdminEditMovie() {
    const router = useRouter();
    const { id } = router.query;
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');
    const [movie, setMovie] = useState({
        englishTitle: '',
        arabicTitle: '',
        description: '',
        releaseDate: '',
        genre: [],
        poster: '',
        trailer: '',
        actors: [],
        crew: []
    });

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const movieData = await MovieService.getMovieById(id);
                setMovie(movieData);
                console.log("movieData", movieData);
            } catch (error) {
                setError('فشل في تحميل بيانات الفيلم');
            } finally {
                setLoading(false);
            }
        };

        fetchMovie();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        setError('');

        try {
            await MovieService.updateMovie(id, movie);
            router.push('/admin/movies');
        } catch (error) {
            setError('فشل في تحديث بيانات الفيلم');
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="text-center py-8">جاري التحميل...</div>;

    return (
        <div className="max-w-3xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">تعديل بيانات الفيلم</h1>
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                    {error}
                </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-gray-700 mb-2">العنوان</label>
                    <input
                        type="text"
                        value={movie.englishTitle}
                        onChange={(e) => setMovie({ ...movie, englishTitle: e.target.value })}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <div>
                    <label className="block text-gray-700 mb-2">العنوان بالعربية</label>
                    <input
                        type="text"
                        value={movie.arabicTitle}
                        onChange={(e) => setMovie({ ...movie, arabicTitle: e.target.value })}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <div>
                    <label className="block text-gray-700 mb-2">الوصف</label>
                    <textarea
                        value={movie.description}
                        onChange={(e) => setMovie({ ...movie, description: e.target.value })}
                        className="w-full p-2 border rounded"
                        rows="4"
                        required
                    />
                </div>
                <div>
                    <label className="block text-gray-700 mb-2">تاريخ الإصدار</label>
                    <input
                        type="date"
                        value={movie.releaseDate}
                        onChange={(e) => setMovie({ ...movie, releaseDate: e.target.value })}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <div>
                    <label className="block text-gray-700 mb-2">الممثلون</label>
                    <div className="space-y-4">
                        <div>
                            <input
                                type="text"
                                value={movie.actors.map(actor => actor.name).join(', ')}
                                onChange={(e) => {
                                    const updatedCast = movie.actors.map(a =>
                                        a.id === actor._id ? { ...a, name: e.target.value } : a
                                    );
                                    setMovie({ ...movie, actors: updatedCast });
                                }}
                                placeholder="ابحث عن ممثل..."
                                className="w-full p-2 border rounded"
                            />
                        </div>
                        <div className="space-y-2">
                            {movie.actors.map(actor => (
                                <div key={actor.id} className="flex items-center gap-4 bg-gray-50 p-2 rounded">
                                    <span>{actor.name}</span>
                                    <input
                                        type="text"
                                        value={actor.role}
                                        onChange={(e) => {
                                            const updatedCast = movie.actors.map(a =>
                                                a.id === actor.id ? { ...a, role: e.target.value } : a
                                            );
                                            setMovie({ ...movie, actors: updatedCast });
                                        }}
                                        placeholder="الدور..."
                                        className="flex-1 p-1 border rounded"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => {
                                            const updatedCast = movie.actors.filter(a => a.id !== actor.id);
                                            setMovie({ ...movie, actors: updatedCast });
                                        }}
                                        className="text-red-600 hover:text-red-800"
                                    >
                                        حذف
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div>
                    <label className="block text-gray-700 mb-2">رابط المقطع الدعائي</label>
                    <input
                        type="url"
                        value={movie.trailer}
                        onChange={(e) => setMovie({ ...movie, trailer: e.target.value })}
                        className="w-full p-2 border rounded"
                    />
                </div>
                <div className="flex justify-end space-x-4">
                    <button
                        type="button"
                        onClick={() => router.push('/admin/movies')}
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

export default AdminEditMovie; 