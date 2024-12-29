import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function AdminEditMovie() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');
    const [movie, setMovie] = useState({
        arabicTitle: '',
        englishTitle: '',
        description: '',
        releaseYear: new Date().getFullYear(),
        director: '',
        genre: [],
        poster: '',
        trailer: '',
        actors: []
    });

    const [actorSearch, setActorSearch] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const token = localStorage.getItem('adminToken');
                const response = await axios.get(`/api/movies/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setMovie(response.data);
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
            const token = localStorage.getItem('adminToken');
            await axios.put(`/api/movies/${id}`, movie, {
                headers: { Authorization: `Bearer ${token}` }
            });
            navigate('/admin/movies');
        } catch (error) {
            setError(error.response?.data?.message || 'حدث خطأ في تحديث الفيلم');
        } finally {
            setSaving(false);
        }
    };

    const searchActors = async (query) => {
        if (query.length < 2) {
            setSearchResults([]);
            return;
        }

        try {
            const response = await axios.get(`/api/actors/search?q=${query}`);
            setSearchResults(response.data);
        } catch (error) {
            console.error('Error searching actors:', error);
        }
    };

    const handleActorSelect = (actor) => {
        if (!movie.actors.find(a => a._id === actor._id)) {
            setMovie({
                ...movie,
                actors: [...movie.actors, {
                    _id: actor._id,
                    name: actor.name,
                    arabicName: actor.arabicName,
                    role: ''
                }]
            });
        }
        setActorSearch('');
        setSearchResults([]);
    };

    const handleRemoveActor = (actorId) => {
        setMovie({
            ...movie,
            actors: movie.actors.filter(a => a._id !== actorId)
        });
    };

    const genres = ['Action', 'Adventure', 'Comedy', 'Crime', 'Drama', 'Fantasy', 'Horror', 'Mystery', 'Romance', 'Sci-Fi', 'Thriller', 'Musical'];

    if (loading) return <div className="text-center py-8">جاري التحميل...</div>;

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">تعديل فيلم</h1>

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                        <label className="block text-gray-700 mb-2">العنوان بالإنجليزية</label>
                        <input
                            type="text"
                            value={movie.englishTitle}
                            onChange={(e) => setMovie({ ...movie, englishTitle: e.target.value })}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
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

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                        <label className="block text-gray-700 mb-2">سنة الإصدار</label>
                        <input
                            type="number"
                            value={movie.releaseYear}
                            onChange={(e) => setMovie({ ...movie, releaseYear: e.target.value })}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 mb-2">المخرج</label>
                        <input
                            type="text"
                            value={movie.director}
                            onChange={(e) => setMovie({ ...movie, director: e.target.value })}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 mb-2">رابط الملصق</label>
                        <input
                            type="url"
                            value={movie.poster}
                            onChange={(e) => setMovie({ ...movie, poster: e.target.value })}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-gray-700 mb-2">الممثلون</label>
                    <div className="space-y-4">
                        <div>
                            <input
                                type="text"
                                value={actorSearch}
                                onChange={(e) => {
                                    setActorSearch(e.target.value);
                                    searchActors(e.target.value);
                                }}
                                placeholder="ابحث عن ممثل..."
                                className="w-full p-2 border rounded"
                            />
                            {searchResults.length > 0 && (
                                <div className="absolute bg-white border rounded mt-1 p-2 shadow-lg max-h-48 overflow-auto">
                                    {searchResults.map(actor => (
                                        <div
                                            key={actor._id}
                                            onClick={() => handleActorSelect(actor)}
                                            className="p-2 hover:bg-gray-100 cursor-pointer"
                                        >
                                            {actor.arabicName} ({actor.name})
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="space-y-2">
                            {movie.actors.map(actor => (
                                <div key={actor._id} className="flex items-center gap-4 bg-gray-50 p-2 rounded">
                                    <span>{actor.arabicName}</span>
                                    <input
                                        type="text"
                                        value={actor.role}
                                        onChange={(e) => {
                                            const updatedActors = movie.actors.map(a =>
                                                a._id === actor._id ? { ...a, role: e.target.value } : a
                                            );
                                            setMovie({ ...movie, actors: updatedActors });
                                        }}
                                        placeholder="الدور..."
                                        className="flex-1 p-1 border rounded"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveActor(actor._id)}
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

                <div className="flex items-center">
                    <input
                        type="checkbox"
                        checked={movie.isNewRelease}
                        onChange={(e) => setMovie({ ...movie, isNewRelease: e.target.checked })}
                        className="ml-2"
                    />
                    <label className="text-gray-700">فيلم جديد</label>
                </div>

                <div className="flex justify-end space-x-4">
                    <button
                        type="button"
                        onClick={() => navigate('/admin/movies')}
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