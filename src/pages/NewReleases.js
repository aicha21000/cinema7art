import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import movieService from '../services/movieService';
import MovieCard from '../components/MovieCard';
import LoadingSpinner from '../components/LoadingSpinner';

export default function NewReleases() {
    const [movies2024, setMovies2024] = useState([]);
    const [movies2025, setMovies2025] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [activeTab, setActiveTab] = useState('2024');

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const [movies24, movies25] = await Promise.all([
                    movieService.get2024Movies(),
                    movieService.get2025Movies()
                ]);
                setMovies2024(movies24);
                setMovies2025(movies25);
            } catch (error) {
                setError('فشل في تحميل الأفلام');
                console.error('Error loading movies:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchMovies();
    }, []);

    if (loading) return <LoadingSpinner />;

    const currentMovies = activeTab === '2024' ? movies2024 : movies2025;

    return (
        <div className="space-y-6">
            <div className="flex gap-4 border-b">
                <button
                    className={`px-4 py-2 font-bold ${activeTab === '2024'
                        ? 'text-blue-600 border-b-2 border-blue-600'
                        : 'text-gray-600'
                        }`}
                    onClick={() => setActiveTab('2024')}
                >
                    أفلام 2024
                    <span className="mr-2 text-sm text-gray-500">
                        ({movies2024.length})
                    </span>
                </button>
                <button
                    className={`px-4 py-2 font-bold ${activeTab === '2025'
                        ? 'text-blue-600 border-b-2 border-blue-600'
                        : 'text-gray-600'
                        }`}
                    onClick={() => setActiveTab('2025')}
                >
                    أفلام 2025
                    <span className="mr-2 text-sm text-gray-500">
                        ({movies2025.length})
                    </span>
                </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {currentMovies.map(movie => (
                    <motion.div
                        key={movie._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <MovieCard movie={movie} />
                    </motion.div>
                ))}
            </div>

            {currentMovies.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                    لا توجد أفلام {activeTab === '2025' ? 'قادمة' : 'حالية'}
                </div>
            )}
        </div>
    );
} 