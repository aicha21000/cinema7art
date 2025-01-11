import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import MovieCard from '../components/MovieCard.js';
import SearchBar from '../components/SearchBar';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import movieService from '../services/movieService';

function Movies() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [page, setPage] = useState(parseInt(searchParams.get('page')) || 1);
    const [totalPages, setTotalPages] = useState(0);
    const [genre, setGenre] = useState(searchParams.get('genre') || '');
    const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');

   




    useEffect(() => {
        fetchMovies();
        // Mettre à jour l'URL
        const params = new URLSearchParams();
        if (page > 1) params.set('page', page);
        if (genre) params.set('genre', genre);
        setSearchParams(params);
    }, [page, genre]);

    const fetchMovies = async () => {
        try {
            const response = await movieService.getMovies(page, genre);
            setMovies(response.movies);
            setTotalPages(response.pagination.totalPages);
        } catch (error) {
            setError('فشل في تحميل الأفلام');
            console.error('Error fetching movies:', error);
        } finally {
            setLoading(false);
        }
    };

    const genres = [
        'Action', 'Adventure', 'Comedy', 'Crime', 'Drama', 'Fantasy',
        'Horror', 'Mystery', 'Romance', 'Sci-Fi', 'Thriller', 'Musical'
    ];

    if (loading) return <div className="text-center py-8">جاري التحميل...</div>;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">الأفلام</h1>
                <select
                    value={genre}
                    onChange={(e) => {
                        setGenre(e.target.value);
                        setPage(1);
                    }}
                    className="p-2 border rounded-md"
                >
                    <option value="">كل الأنواع</option>
                    {genres.map(g => (
                        <option key={g} value={g}>{g}</option>
                    ))}
                </select>
            </div>

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                    {error}
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {movies.map(movie => (
                    <MovieCard key={movie._id} movie={movie} />
                ))}
            </div>

            {movies.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                    لا توجد أفلام {genre && 'في هذا النوع'}
                </div>
            )}

            {totalPages > 1 && (
                <div className="flex justify-center gap-2 mt-8">
                    {[...Array(totalPages)].map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setPage(i + 1)}
                            className={`px-4 py-2 rounded ${page === i + 1 ? 'bg-blue-600 text-white' : 'bg-gray-200'
                                }`}
                        >
                            {i + 1}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Movies; 