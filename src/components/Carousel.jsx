import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

function Carousel({ movies }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prevIndex) =>
                prevIndex === movies.length - 1 ? 0 : prevIndex + 1
            );
        }, 5000);

        return () => clearInterval(timer);
    }, [movies.length]);

    if (!movies || movies.length === 0) return null;

    return (
        <div className="relative h-[500px] overflow-hidden rounded-xl">
            <AnimatePresence initial={false}>
                <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0"
                >
                    <div className="relative h-full">
                        <img
                            src={movies[currentIndex].poster}
                            alt={movies[currentIndex].title}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                            <h2 className="text-4xl font-bold mb-4">{movies[currentIndex].arabicTitle}</h2>
                            <p className="text-lg mb-4 line-clamp-2">{movies[currentIndex].overview}</p>
                            <Link
                                to={`/movies/${movies[currentIndex]._id}`}
                                className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
                            >
                                عرض التفاصيل
                            </Link>
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* Navigation Dots */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                {movies.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`w-3 h-3 rounded-full transition-all ${index === currentIndex ? 'bg-white scale-125' : 'bg-white/50'
                            }`}
                    />
                ))}
            </div>

            {/* Navigation Arrows */}
            <button
                onClick={() => setCurrentIndex(prev => prev === 0 ? movies.length - 1 : prev - 1)}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
            >
                ←
            </button>
            <button
                onClick={() => setCurrentIndex(prev => prev === movies.length - 1 ? 0 : prev + 1)}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
            >
                →
            </button>
        </div>
    );
}

export default Carousel; 