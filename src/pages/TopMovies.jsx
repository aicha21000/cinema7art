import { useState, useEffect } from 'react';
import MovieCard from '../components/MovieCard.jsx';
import movieService from '../services/movieService';

function TopMovies() {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchTopMovies = async () => {
            try {
                const topMovies = await movieService.getTopMovies();
                setMovies(topMovies);
            } catch (error) {
                setError('فشل في تحميل الأفلام');
                console.error('Error fetching top movies:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchTopMovies();
    }, []);

    if (loading) return <div className="text-center py-8">جاري التحميل...</div>;

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">أفضل الأفلام</h1>

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
                    لا توجد أفلام متوفرة
                </div>
            )}
        </div>
    );
}

export default TopMovies; 