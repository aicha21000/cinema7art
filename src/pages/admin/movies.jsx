import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import movieService from '../../services/movieService';

function AdminMovies() {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        fetchMovies();
    }, [page, searchTerm]);

    const fetchMovies = async () => {
        try {
            const response = await movieService.getMovies(page, searchTerm);
            setMovies(response.movies);
            setTotalPages(response.pagination.totalPages);
        } catch (error) {
            setError('فشل في تحميل الأفلام');
            console.error('Error fetching movies:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('هل أنت متأكد من حذف هذا الفيلم؟')) {
            try {
                await movieService.deleteMovie(id);
                fetchMovies();
            } catch (error) {
                setError('فشل في حذف الفيلم');
            }
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        setPage(1);
        fetchMovies();
    };

    if (loading) return <div className="text-center py-8">جاري التحميل...</div>;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">إدارة الأفلام</h1>
                <Link className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600" href="/admin/movies/add">
                    إضافة فيلم جديد
                </Link>
            </div>

            <form onSubmit={handleSearch} className="flex gap-2">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="ابحث عن فيلم..."
                    className="flex-1 p-2 border rounded-md"
                />
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    بحث
                </button>
            </form>

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                    {error}
                </div>
            )}

            <div className="grid grid-cols-1 gap-4">
                {movies.map(movie => (
                    <div key={movie._id} className="bg-white rounded-lg shadow-md p-6">
                        <div className="flex justify-between items-start">
                            <div className="flex gap-4">
                                <img
                                    src={movie.poster}
                                    alt={movie.arabicTitle}
                                    className="w-24 h-24 object-cover rounded-full"
                                />
                                <div>
                                    <h2 className="text-xl font-bold mb-2">{movie.arabicTitle}</h2>
                                    <p className="text-gray-600">{movie.englishTitle}</p>
                                    <div className="mt-2 text-sm text-gray-500">
                                        {movie.genre.join(', ')}
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <Link className="text-blue-600 hover:text-blue-800" href={`/admin/movies/edit/${movie._id}`}>
                                    تعديل
                                </Link>
                                <button
                                    onClick={() => handleDelete(movie._id)}
                                    className="text-red-600 hover:text-red-800"
                                >
                                    حذف
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {movies.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                    لا توجد أفلام {searchTerm && 'مطابقة لبحثك'}
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

export default AdminMovies; 