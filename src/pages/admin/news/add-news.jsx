import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NewsService from '../../../services/news-service';
import MovieService from '../../../services/movieService';
import ActorService from '../../../services/actorService';

function AdminAddNews() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [movies, setMovies] = useState([]);
    const [actors, setActors] = useState([]);
    const [news, setNews] = useState({
        title: '',
        arabicTitle: '',
        content: '',
        category: 'movie',
        image: '',
        relatedMovies: [],
        relatedActors: []
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [moviesData, actorsData] = await Promise.all([
                    MovieService.getMovies(),
                    ActorService.getActors()
                ]);
                setMovies(moviesData);
                setActors(actorsData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            await NewsService.addNews(news);
            navigate('/admin/news');
        } catch (error) {
            setError('فشل في إضافة الخبر');
            console.error('Error adding news:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleRelatedMoviesChange = (e) => {
        const selectedMovies = Array.from(e.target.selectedOptions, option => {
            const movie = movies.find(m => m._id === option.value);
            return {
                _id: movie._id,
                englishTitle: movie.englishTitle,
                arabicTitle: movie.arabicTitle,
                poster: movie.poster
            };
        });
        setNews({ ...news, relatedMovies: selectedMovies });
    };

    const handleRelatedActorsChange = (e) => {
        const selectedActors = Array.from(e.target.selectedOptions, option => {
            const actor = actors.find(a => a._id === option.value);
            return {
                _id: actor._id,
                name: actor.name,
                arabicName: actor.arabicName,
                photo: actor.photo
            };
        });
        setNews({ ...news, relatedActors: selectedActors });
    };

    return (
        <div className="max-w-3xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">إضافة خبر جديد</h1>

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
                        value={news.title}
                        onChange={(e) => setNews({ ...news, title: e.target.value })}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>

                <div>
                    <label className="block text-gray-700 mb-2">المحتوى</label>
                    <textarea
                        value={news.content}
                        onChange={(e) => setNews({ ...news, content: e.target.value })}
                        className="w-full p-2 border rounded h-32"
                        required
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-gray-700 mb-2">التصنيف</label>
                        <select
                            value={news.category}
                            onChange={(e) => setNews({ ...news, category: e.target.value })}
                            className="w-full p-2 border rounded"
                            required
                        >

                        </select>
                    </div>

                    <div>
                        <label className="block text-gray-700 mb-2">صورة الخبر</label>
                        <input
                            type="url"
                            value={news.image}
                            onChange={(e) => setNews({ ...news, image: e.target.value })}
                            className="w-full p-2 border rounded"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-gray-700 mb-2">الأفلام المتعلقة</label>
                        <select
                            multiple
                            value={news.relatedMovies.map(m => m._id)}
                            onChange={handleRelatedMoviesChange}
                            className="w-full p-2 border rounded h-32"
                        >
                            {movies.map(movie => (
                                <option key={movie._id} value={movie._id}>
                                    {movie.arabicTitle}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-gray-700 mb-2">الممثلون المتعلقون</label>
                        <select
                            multiple
                            value={news.relatedActors.map(a => a._id)}
                            onChange={handleRelatedActorsChange}
                            className="w-full p-2 border rounded h-32"
                        >
                            {actors.map(actor => (
                                <option key={actor._id} value={actor._id}>
                                    {actor.arabicName}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="flex justify-end space-x-4">
                    <button
                        type="button"
                        onClick={() => router.push('/admin/news')}
                        className="px-4 py-2 text-gray-600 hover:text-gray-800"
                    >
                        إلغاء
                    </button>
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-blue-300"
                    >
                        {loading ? 'جاري الإضافة...' : 'إضافة الخبر'}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default AdminAddNews; 