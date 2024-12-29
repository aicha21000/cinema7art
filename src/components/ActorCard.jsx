import { Link } from 'react-router-dom';

export default function ActorCard({ actor }) {
    return (
        <Link
            to={`/actors/${encodeURIComponent(actor.name)}`}
            className="block group"
        >
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative pb-[100%]">
                    <img
                        src={actor.photo}
                        alt={actor.arabicName}
                        className="absolute top-0 left-0 w-full h-full object-cover"
                    />
                </div>
                <div className="p-4">
                    <h3 className="font-bold text-lg mb-1 truncate">
                        {actor.arabicName}
                    </h3>
                    <p className="text-gray-600 text-sm mb-2 truncate">
                        {actor.name}
                    </p>
                    <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">
                            {actor.movies.length} فيلم
                        </span>
                        {actor.awards?.length > 0 && (
                            <div className="flex items-center gap-1">
                                <span className="material-icons text-yellow-500">
                                    emoji_events
                                </span>
                                <span>{actor.awards.length}</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Link>
    );
} 