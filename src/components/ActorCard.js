// MovieCard.js

import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function ActorCard({ actor }) {
    return (
        <Link to={`/actors/${actor.name}`}>
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow w-40">
                <div className="relative aspect-[2/3]">
                    <img
                        src={actor.photo}
                        alt={`صورة الممثل ${actor.arabicName}`}
                        loading="lazy"
                        width="160"
                        height="240"
                        className="w-full h-full object-cover absolute inset-0"
                    />

                </div>
                <div className="p-2">
                    <h3 className="font-bold text-sm mb-1 truncate">
                        {actor.name}
                    </h3>
                    <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-500">
                            {actor.birthDate}
                        </span>
                        <div className="flex items-center gap-1">
                            <span className="text-yellow-500">★</span>
                            <span>{actor.rating}</span>
                        </div>
                    </div>
                    <div className="mt-1 flex flex-wrap gap-1">
                        {actor.movies.slice(0, 2).map(movie => (
                            <span
                                key={movie._id}
                                className="bg-blue-100 text-blue-800 text-xs px-1 py-1 rounded"
                            >
                                {movie.title}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </Link>
    );
}

ActorCard.propTypes = {
    actor: PropTypes.shape({
        id: PropTypes.string.isRequired,
        photo: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        arabicName: PropTypes.string.isRequired,
        movies: PropTypes.arrayOf(PropTypes.shape({
            _id: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
            arabicTitle: PropTypes.string,
            poster: PropTypes.string,
            role: PropTypes.string,
        })),
        birthDate: PropTypes.string,
        rating: PropTypes.number,
    }).isRequired,
};
