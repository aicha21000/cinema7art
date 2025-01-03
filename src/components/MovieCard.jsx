import { Link } from 'react-router-dom';

export default function MovieCard({ movie }) {
    return (
        <Link
            to={`/movies/${encodeURIComponent(movie.englishTitle)}`}
            className="group"
        >
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative aspect-[2/3]">
                    <img
                        src={movie.poster}
                        alt={`ملصق فيلم ${movie.arabicTitle}`}
                        loading="lazy"
                        width="300"
                        height="450"
                        className="w-full h-full object-cover absolute inset-0"
                    />
                    {movie.isNewRelease && (
                        <span className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 text-sm rounded">
                            New
                        </span>
                    )}
                </div>
                <div className="p-4">
                    <h3 className="font-bold text-lg mb-1 truncate">
                        {movie.englishTitle}
                    </h3>
                    <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">
                            {movie.releaseYear}
                        </span>
                        <div className="flex items-center gap-2">
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