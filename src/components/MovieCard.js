// MovieCard.js

import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function MovieCard({ movie }) {
    return (
        <Link to={`/movies/${movie._id}`}>
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow w-40">
                <div className="relative aspect-[2/3]">
                    <img
                        src={movie.poster}
                        alt={`ملصق فيلم ${movie.arabicTitle}`}
                        loading="lazy"
                        width="160"
                        height="240"
                        className="w-full h-full object-cover absolute inset-0"
                    />
                    {movie.isNewRelease && (
                        <span className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 text-sm rounded">
                            New
                        </span>
                    )}
                </div>
                <div className="p-2">
                    <h3 className="font-bold text-sm mb-1 truncate">
                        {movie.englishTitle}
                    </h3>
                    <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-500">
                            {movie.releaseYear}
                        </span>
                        <div className="flex items-center gap-1">
                            <span className="text-yellow-500">★</span>
                            <span>{movie.rating}</span>
                        </div>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-1">
                        {movie.genre.slice(0, 2).map(g => (
                            <span
                                key={g}
                                className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
                            >
                                {g}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </Link>
    );
}

MovieCard.propTypes = {
    movie: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        poster: PropTypes.string.isRequired,
        arabicTitle: PropTypes.string.isRequired,
        englishTitle: PropTypes.string.isRequired,
        genre: PropTypes.arrayOf(PropTypes.string),
        releaseYear: PropTypes.number,
        rating: PropTypes.number,
        isNewRelease: PropTypes.bool,
    }).isRequired,
};
