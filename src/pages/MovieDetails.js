import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import movieService from '../services/movieService';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import MovieCard from '../components/MovieCard.js';
import SEOHead from '../components/SEOHead.js';




function MovieDetails() {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [relatedMovies, setRelatedMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const movieData = await movieService.getMovieById(id);
                setMovie(movieData);

                if (movieData) {
                    const relatedData = await movieService.getRelatedMovies(movieData.englishTitle);
                    setRelatedMovies(relatedData);
                }
            } catch (error) {
                setError('فشل في تحميل تفاصيل الفيلم');
                console.error('Error fetching movie details:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    if (loading) return <LoadingSpinner />;
    if (!movie) return <ErrorMessage message="لم يتم العثور على الفيلم" />;

    return (
        <>
            <SEOHead
                title={movie.englishTitle}
                description={movie.description}
                image={movie.poster}
                keywords={`${movie.arabicTitle}, ${movie.englishTitle}, فيلم, مراجعة`}
            />

            <div className="max-w-6xl mx-auto space-y-8">
                <article>
                    <h1 className="text-3xl font-bold">{movie.englishTitle}</h1>
                    <section>
                        <h2 className="text-2xl font-bold">تفاصيل الفيلم</h2>
                        <div className="md:flex gap-8">
                            <div className="md:w-1/3">
                                <img
                                    src={movie.poster}
                                    alt={movie.englishTitle}
                                    className="w-full rounded-lg shadow-lg"
                                />
                            </div>
                            <div className="md:w-2/3 space-y-4">
                                <div className="flex items-center gap-4 text-sm">
                                    <span>{movie.releaseYear}</span>
                                    <span>•</span>
                                    <div className="flex items-center gap-1">
                                        <span className="text-yellow-500">★</span>
                                        <span>{movie.rating}</span>
                                    </div>
                                    <span>•</span>
                                    <span>{movie.views.toLocaleString()} views</span>
                                </div>

                                <div className="flex flex-wrap gap-2">
                                    {movie.genre.map(g => (
                                        <span
                                            key={g}
                                            className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full"
                                        >
                                            {g}
                                        </span>
                                    ))}
                                </div>

                                <div>
                                    <h3 className="font-bold mb-2">المخرج</h3>
                                    <p>{movie.director}</p>
                                </div>

                                <div>
                                    <h3 className="font-bold mb-2">القصة</h3>
                                    <p className="text-gray-600 leading-relaxed">{movie.description}</p>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section>
                        <h2 className="text-2xl font-bold">طاقم التمثيل</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                            {movie.actors.map(actor => (
                                <Link
                                    key={actor.name}
                                    to={`/actors/${encodeURIComponent(actor.name)}`}
                                    className="block group"
                                >
                                    <div className="aspect-square rounded-full overflow-hidden mb-2">
                                        <img
                                            src={actor.profile_path}
                                            alt={actor.arabicName}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                                        />
                                    </div>
                                    <h3 className="font-bold text-center">{actor.arabicName}</h3>
                                    <p className="text-sm text-gray-600 text-center">{actor.role}</p>
                                </Link>
                            ))}
                        </div>
                    </section>
                    <section>
                        <h2 className="text-2xl font-bold">المقطع الدعائي</h2>
                        {movie.trailer && (
                            <div className="aspect-video">
                                <iframe
                                    src={`https://www.youtube.com/embed/${movie.trailer.split('v=')[1]}`}
                                    title="Movie Trailer"
                                    className="w-full h-full rounded-lg"
                                    allowFullScreen
                                ></iframe>
                            </div>
                        )}
                    </section>
                    <section>
                        <h2 className="text-2xl font-bold">أفلام مشابهة</h2>
                        {relatedMovies.length > 0 ? (
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {relatedMovies.map(movie => (
                                    <MovieCard key={movie._id} movie={movie} />
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-500">لا توجد أفلام مشابهة</p>
                        )}
                    </section>
                </article>
            </div>
        </>
    );
}

export default MovieDetails; 