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
                    featuredMovies: featuredMovies,
                    topMovies: topMovies,
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

    if (data.loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="text-xl">جاري التحميل...</div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Carrousel */}
            <section className="mb-12">
                <Carousel movies={data.featuredMovies} />
            </section>

            {/* Section Films Récents */}
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

            {/* Section Top 10 Films */}
            <section className="mb-12">
                <div className="flex justify-between items-center mb-6">
                    <Link to="/top-movies" className="text-blue-600 hover:text-blue-800">
                        عرض الكل
                    </Link>
                    <h2 className="text-2xl font-bold">آفضل 10 أفلام</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                    {data.topMovies.map((movie, index) => (
                        <div key={movie._id} className="relative">
                            <MovieCard movie={movie} />
                        </div>
                    ))}
                </div>
            </section>

            {/* Section Jeux */}
            <section className="mb-12">
                <GameSection />
            </section>

            {/* Espace Publicitaire */}
            <section className="mb-12">
                <AdSpace size="large" provider="propeller" />
            </section>

            {/* Section Actualités */}
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

            {/* Espace Publicitaire en bas */}
            <section className="mt-12">
                <AdSpace size="large" provider="propeller" />
            </section>
        </div>
    );
} 