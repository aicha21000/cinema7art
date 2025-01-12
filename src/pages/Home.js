import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import movieService from '../services/movieService';
import newsService from '../services/news-service';
import MovieCard from '../components/MovieCard';
import NewsCard from '../components/NewsCard';
import AdSpace from '../components/AdSpace';
import GameSection from '../components/game-section';
import Carousel from '../components/Carousel';


export default function Home() {
const [news, setNews] = useState([]);
const [pagination, setPagination] = useState(null);
const [page, setPage] = useState(1);
const [category, setCategory] = useState('');
const [loading, setLoading] = useState(true);


    const [data, setData] = useState({
        movies: [],
        topMovies: [],
        news: [],
        featuredMovies: [],
        loading: true,
        error: null
    });
    const [newReleases, setNewReleases] = useState([]);
    const [movies2024, setMovies2024] = useState([]);
    const [movies2025, setMovies2025] = useState([]);
    const [activeTab, setActiveTab] = useState('2024');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await newsService.getNews(page, category);
                setNews(response.news);
                setPagination(response.pagination);
            } catch (error) {
                console.error('Error loading news:', error);
                setError('Une erreur est survenue lors du chargement des actualités');
            } finally {
                setLoading(false);
            }
        };

        fetchNews();
    }, [page, category]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [movies, news, featuredMovies, topMovies, newReleasesData] = await Promise.all([
                    movieService.getMovies({ page: 1, limit: 5 }),
                    newsService.getLatestNews(5),
                    movieService.getFeaturedMovies(),
                    movieService.getTopMovies(10),
                    movieService.getNewReleases()
                ]);

                setData({
                    movies: movies.movies || movies,
                    news,
                    featuredMovies,
                    topMovies,
                    loading: false,
                    error: null
                });
                setNewReleases(newReleasesData);
            } catch (error) {
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

    const getEvenNumberOfMovies = (movies, columns) => {
        const maxMovies = Math.min(movies.length, 8);
        const evenMovies = maxMovies - (maxMovies % columns);
        return evenMovies;
    };

    const columns = 4; // Nombre de colonnes pour la grille
    const currentMovies = activeTab === '2024'
        ? movies2024.slice(0, getEvenNumberOfMovies(movies2024, columns))
        : movies2025.slice(0, getEvenNumberOfMovies(movies2025, columns));

    return (
        <div className="container mx-auto px-4 py-8">
            <section className="mb-12">
                <Carousel movies={newReleases} />
            </section>

            <section className="mb-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {data.movies.map(movie => (
                        <MovieCard key={movie._id} movie={movie} />
                    ))}
                </div>
            </section>

                        <section>
                <div className="flex justify-between items-center mb-6">
                   
                    <h2 className="text-2xl font-bold">آخر الأخبار</h2>
                </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {news.map(item => (
                    <NewsCard key={item._id} news={item} />
                ))}
            </div>

            {news.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                    لا توجد أخبار {category && 'في هذه الفئة'}
                </div>
            )}
            <Link to="/news" className="text-blue-600 hover:text-blue-800">
                        عرض الكل
                    </Link>
                    </section>
            <section className="mt-12">
                <AdSpace size="large" provider="propeller" />
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

                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6">
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

                    <div className="text-center mt-4">
                        <button
                            onClick={() => navigate('/new-releases')}
                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                        >
                            عرض المزيد
                        </button>
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


        </div>
    );
}  