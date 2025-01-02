import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import movieService from '../services/movieService';
import newsService from '../services/newsService';
import MovieCard from '../components/MovieCard';
import NewsCard from '../components/NewsCard';
import AdSpace from '../components/AdSpace';
import GameSection from '../components/GameSection';
import Carousel from '../components/Carousel';

export default function Home() {
    const [data, setData] = useState({
        movies: [],
        topMovies: [],
        news: [],
        featuredMovies: [],
        loading: true,
        error: null
    });
    const [movies2024, setMovies2024] = useState([]);
    const [movies2025, setMovies2025] = useState([]);
    const [activeTab, setActiveTab] = useState('2024');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [movies, news, featuredMovies, topMovies] = await Promise.all([
                    movieService.getMovies({ page: 1, limit: 5 }),
                    newsService.getLatestNews(5),
                    movieService.getFeaturedMovies(),
                    movieService.getTopMovies(10)
                ]);

                setData({
                    movies: movies.movies || movies,
                    news,
                    featuredMovies,
                    topMovies,
                    loading: false,
                    error: null
                });
            } catch (error) {
                console.error('Error fetching home data:', error);
                setData(prev => ({
                    ...prev,
                    loading: false,
                    error: error.message
                }));
            }
        };

        fetchData();
    }, []);

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
                console.error('Error loading movies:', error);
            }
        };

        fetchMovies();
    }, []);

    if (data.loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="text-xl">جاري التحميل...</div>
            </div>
        );
    }

    const currentMovies = activeTab === '2024' ? movies2024 : movies2025;

    return (
        <div className="container mx-auto px-4 py-8">
            <section className="mb-12">
                <Carousel movies={data.featuredMovies} />
            </section>

            <section className="mb-12">
                <div className="flex justify-between items-center mb-6">
                    <Link to="/movies" className="text-blue-600 hover:text-blue-800">
                        عرض الكل
                    </Link>
                    <h2 className="text-2xl font-bold">أحدث الأفلام</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {data.movies.map(movie => (
                        <MovieCard key={movie._id} movie={movie} />
                    ))}
                </div>
            </section>

            <section className="mb-12">
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
                                key={movie.englishTitle}
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
            </section>

            <section className="mb-12">
                <GameSection />
            </section>

            <section className="mb-12">
                <AdSpace size="large" provider="propeller" />
            </section>

            <section>
                <div className="flex justify-between items-center mb-6">
                    <Link to="/news" className="text-blue-600 hover:text-blue-800">
                        عرض الكل
                    </Link>
                    <h2 className="text-2xl font-bold">آخر الأخبار</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {data.news.map(news => (
                        <NewsCard key={news._id} news={news} />
                    ))}
                </div>
            </section>

            <section className="mt-12">
                <AdSpace size="large" provider="propeller" />
            </section>
        </div>
    );
}  