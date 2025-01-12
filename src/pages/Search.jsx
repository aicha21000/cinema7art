import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MovieCard from '../components/MovieCard';
import ActorCard from '../components/ActorCard';
import NewsCard from '../components/NewsCard';
import movieService from '../services/movieService';
import actorService from '../services/actorService';
import newsService from '../services/news-service';

function Search() {
    const { query } = useParams();
    const [movies, setMovies] = useState([]);
    const [actors, setActors] = useState([]);
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState(query || '');

    const handleSearch = async () => {
        try {
            setLoading(true);
            const actorResults = await actorService.searchGlobal(searchTerm);
            const movieResults = await movieService.searchGlobal(searchTerm);
            const newsResults = await newsService.searchGlobal(searchTerm);

            setActors(actorResults);
            setMovies(movieResults);
            setNews(newsResults);
        } catch (error) {
            setError('فشل في البحث');
            console.error('Error searching:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        handleSearch();
    }, [searchTerm]);

    if (loading) return <div className="text-center py-8">جاري البحث...</div>;

    return (
        <div className="space-y-6">
            <h2 className="text-xl font-bold">نتائج البحث عن: {searchTerm}</h2>

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                    {error}
                </div>
            )}

            <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="ابحث عن الأفلام أو الممثلين أو الأخبار..."
                className="p-2 border rounded-md w-64"
            />
            <button onClick={handleSearch} className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                بحث
            </button>

            <h3 className="text-lg font-semibold">الأفلام</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {movies.map(movie => (
                    <MovieCard key={movie._id} movie={movie} />
                ))}
            </div>

            <h3 className="text-lg font-semibold">الممثلون</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {actors.map(actor => (
                    <ActorCard key={actor.id} actor={actor} />
                ))}
            </div>

            <h3 className="text-lg font-semibold">الأخبار</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {news.map(article => (
                    <NewsCard key={article._id} news={article} />
                ))}
            </div>

            {movies.length === 0 && actors.length === 0 && news.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                    لم يتم العثور على نتائج
                </div>
            )}
        </div>
    );
}

export default Search; 