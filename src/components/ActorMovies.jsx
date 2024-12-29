import React from 'react';
import { Link } from 'react-router-dom';

export default function ActorMovies({ movies }) {
    if (!movies || movies.length === 0) return null;

    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-bold">الأفلام</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {movies.map((movie, index) => (
                    <Link
                        key={`${movie.title}-${index}`}
                        to={`/movies/${encodeURIComponent(movie.title)}`}
                        className="block group"
                    >
                        <div className="aspect-[2/3] rounded-lg overflow-hidden mb-2">
                            <img
                                src={movie.poster}
                                alt={movie.arabicTitle}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                                onError={(e) => {
                                    e.target.src = '/placeholder-movie.jpg'; // Image par défaut si l'image est invalide
                                }}
                            />
                        </div>
                        <h3 className="font-bold text-lg mb-1">{movie.arabicTitle}</h3>
                        <p className="text-sm text-gray-600">{movie.role}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
} 