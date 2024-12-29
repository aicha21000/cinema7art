import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import movieService from '../../services/movieService';

function AdminAddMovie() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [movie, setMovie] = useState({
        englishTitle: '',
        arabicTitle: '',
        description: '',
        releaseYear: new Date().getFullYear(),
        director: '',
        genre: [],
        actors: [],
        poster: '',
        trailer: '',
        isNewRelease: true
    });

    const genres = [
        'Action', 'Adventure', 'Comedy', 'Crime', 'Drama', 'Fantasy',
        'Horror', 'Mystery', 'Romance', 'Sci-Fi', 'Thriller', 'Musical'
    ];

    const handleActorAdd = () => {
        setMovie({
            ...movie,
            actors: [...movie.actors, {
                name: '',
                arabicName: '',
                role: '',
                profile_path: ''
            }]
        });
    };

    const handleActorChange = (index, field, value) => {
        const newActors = [...movie.actors];
        newActors[index] = { ...newActors[index], [field]: value };
        setMovie({ ...movie, actors: newActors });
    };

    const handleActorRemove = (index) => {
        setMovie({
            ...movie,
            actors: movie.actors.filter((_, i) => i !== index)
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            await movieService.addMovie(movie);
            navigate('/admin/movies');
        } catch (error) {
            setError(error.response?.data?.message || 'حدث خطأ في إضافة الفيلم');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">إضافة فيلم جديد</h1>

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
                        className="w-full p-2 border rounded h-32"
                        required
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                        <label className="block text-gray-700 mb-2">سنة الإصدار</label>
                        <input
                            type="number"
                            value={movie.releaseYear}
                            onChange={(e) => setMovie({ ...movie, releaseYear: parseInt(e.target.value) })}
                            className="w-full p-2 border rounded"
                            min="1900"
                            max={new Date().getFullYear() + 5}
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
                        <label className="block text-gray-700 mb-2">التصنيفات</label>
                        <select
                            multiple
                            value={movie.genre}
                            onChange={(e) => setMovie({
                                ...movie,
                                genre: Array.from(e.target.selectedOptions, option => option.value)
                            })}
                            className="w-full p-2 border rounded"
                            required
                        >
                            {genres.map(genre => (
                                <option key={genre} value={genre}>{genre}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div>
                    <label className="block text-gray-700 mb-2">الممثلون</label>
                    <div className="space-y-4">
                        {movie.actors.map((actor, index) => (
                            <div key={index} className="flex gap-4 items-start">
                                <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-4">
                                    <input
                                        type="text"
                                        value={actor.name}
                                        onChange={(e) => handleActorChange(index, 'name', e.target.value)}
                                        placeholder="الاسم بالإنجليزية"
                                        className="p-2 border rounded"
                                    />
                                    <input
                                        type="text"
                                        value={actor.arabicName}
                                        onChange={(e) => handleActorChange(index, 'arabicName', e.target.value)}
                                        placeholder="الاسم بالعربية"
                                        className="p-2 border rounded"
                                    />
                                    <input
                                        type="text"
                                        value={actor.role}
                                        onChange={(e) => handleActorChange(index, 'role', e.target.value)}
                                        placeholder="الدور"
                                        className="p-2 border rounded"
                                    />
                                    <input
                                        type="url"
                                        value={actor.profile_path}
                                        onChange={(e) => handleActorChange(index, 'profile_path', e.target.value)}
                                        placeholder="رابط الصورة"
                                        className="p-2 border rounded"
                                    />
                                </div>
                                <button
                                    type="button"
                                    onClick={() => handleActorRemove(index)}
                                    className="text-red-600 hover:text-red-800"
                                >
                                    حذف
                                </button>
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={handleActorAdd}
                            className="text-blue-600 hover:text-blue-800"
                        >
                            + إضافة ممثل
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

                    <div>
                        <label className="block text-gray-700 mb-2">رابط الإعلان</label>
                        <input
                            type="url"
                            value={movie.trailer}
                            onChange={(e) => setMovie({ ...movie, trailer: e.target.value })}
                            className="w-full p-2 border rounded"
                        />
                    </div>
                </div>

                <div>
                    <label className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            checked={movie.isNewRelease}
                            onChange={(e) => setMovie({ ...movie, isNewRelease: e.target.checked })}
                            className="form-checkbox"
                        />
                        <span>إصدار جديد</span>
                    </label>
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
                        disabled={loading}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-blue-300"
                    >
                        {loading ? 'جاري الإضافة...' : 'إضافة الفيلم'}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default AdminAddMovie; 