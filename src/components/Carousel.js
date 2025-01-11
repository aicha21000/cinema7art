// Carousel.js
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import movieService from '../services/movieService'; // Assurez-vous que le chemin est correct

function Carousel() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [movies2025, setMovies2025] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const movies25 = await movieService.get2025Movies();
                setMovies2025(movies25);
            } catch (error) {
                setError('فشل في تحميل أفلام 2025');
                console.error('Error loading 2025 movies:', error);
            }
        };

        fetchMovies();
    }, []);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prevIndex) =>
                prevIndex === movies2025.length - 1 ? 0 : prevIndex + 1
            );
        }, 5000);

        return () => clearInterval(timer);
    }, [movies2025.length]);

    if (!movies2025 || movies2025.length === 0) return <div className="text-center py-8">لا توجد أفلام 2025</div>;

    return (
        <div className="relative h-[500px] overflow-hidden rounded-xl shadow-lg">
            <AnimatePresence initial={false}>
                <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0 flex"
                >
                    <div className="w-1/2 h-full">
                        <img
                            src={movies2025[currentIndex].poster}
                            alt={movies2025[currentIndex].englishTitle}
                            className="w-full h-full object-cover object-center rounded-l-xl"
                            style={{ objectPosition: 'center top' }}
                        />
                    </div>
                    <div className="w-1/2 h-full flex flex-col justify-center bg-gradient-to-t from-black/80 to-transparent p-8 text-white rounded-r-xl">
                        <h2 className="text-4xl font-bold mb-4">{movies2025[currentIndex].englishTitle}</h2>
                        <p className="text-lg mb-4 line-clamp-2">{movies2025[currentIndex].description}</p>
                        <a className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition" href={`/movies/${movies2025[currentIndex]._id}`}>
                            عرض التفاصيل
                        </a>
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* Navigation Dots */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                {movies2025.map((_, index) => (
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
                onClick={() => setCurrentIndex(prev => prev === 0 ? movies2025.length - 1 : prev - 1)}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition"
            >
                ←
            </button>
            <button
                onClick={() => setCurrentIndex(prev => prev === movies2025.length - 1 ? 0 : prev + 1)}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition"
            >
                →
            </button>
        </div>
    );
}

export default Carousel; 