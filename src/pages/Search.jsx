import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MovieCard from '../components/MovieCard.jsx';
import movieService from '../services/movieService';

function Search() {
    const { query } = useParams();
    const navigate = useNavigate();
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchInput, setSearchInput] = useState(query || '');

    useEffect(() => {
        if (query) {
            searchMovies(query);
        } else {
            setLoading(false);
        }
    }, [query]);

    const searchMovies = async (searchQuery) => {
        try {
            setLoading(true);
            const results = await movieService.searchMovies(searchQuery);
            setMovies(results);
        } catch (error) {
            setError('فشل في البحث عن الأفلام');
            console.error('Error searching movies:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (searchInput.trim()) {
            navigate(`/search/${encodeURIComponent(searchInput.trim())}`);
        }
    };

    if (loading) return <div className="text-center py-8">جاري البحث...</div>;

    return (
        <div className="space-y-6">
            <div className="max-w-2xl mx-auto">
                <form onSubmit={handleSubmit} className="flex gap-2">
                    <input
                        type="text"
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        placeholder="ابحث عن فيلم أو ممثل..."
                        className="flex-1 p-2 border rounded-md"
                    />
                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
                    >
                        بحث
                    </button>
                </form>
            </div>

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                    {error}
                </div>
            )}

            {query && (
                <h2 className="text-xl font-bold">
                    نتائج البحث عن: {query}
                    {movies.length > 0 && ` (${movies.length} نتيجة)`}
                </h2>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {movies.map(movie => (
                    <MovieCard key={movie._id} movie={movie} />
                ))}
            </div>

            {query && movies.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                    لم يتم العثور على نتائج
                </div>
            )}
        </div>
    );
}

export default Search; 