import { useState } from 'react';
import { useRouter } from 'next/router';
import movieService from '../../../src/services/movie-service';

function AdminAddMovie() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            await movieService.addMovie(movie);
            router.push('/admin/movies');
        } catch (error) {
            setError('فشل في إضافة الفيلم');
            console.error('Error adding movie:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">إضافة فيلم جديد</h1>
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
                        value={movie.englishTitletitle}
                        onChange={(e) => setMovie({ ...movie, englishTitletitle: e.target.value })}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
            </form>
        </div>
    );
}

export default AdminAddMovie; 