import { useState, useEffect } from 'react';
import { FaTrophy, FaRedo, FaArrowRight, FaQuoteLeft, FaQuoteRight, FaFilm } from 'react-icons/fa';
import gameService from '../../services/game-service';

function MovieQuotes() {
    const [quotes, setQuotes] = useState([]);
    const [currentQuote, setCurrentQuote] = useState(0);
    const [userAnswer, setUserAnswer] = useState('');
    const [result, setResult] = useState(null);
    const [score, setScore] = useState(0);
    const [showResults, setShowResults] = useState(false);
    const [suggestions, setSuggestions] = useState([]);

    useEffect(() => {
        setQuotes(gameService.getRandomQuotes(5));
    }, []);

    const handleInputChange = (e) => {
        const value = e.target.value;
        setUserAnswer(value);

        if (value.length > 2) {
            // Filtrer les suggestions basées sur l'entrée utilisateur
            const filtered = gameService.getMovieSuggestions(value);
            setSuggestions(filtered);
        } else {
            setSuggestions([]);
        }
    };

    const handleSuggestionClick = (movie) => {
        setUserAnswer(movie);
        setSuggestions([]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const result = gameService.checkQuote(quotes[currentQuote].id, userAnswer);
        setResult(result);
        if (result.correct) setScore(score + 1);
        setSuggestions([]);

        setTimeout(() => {
            if (currentQuote < quotes.length - 1) {
                setCurrentQuote(currentQuote + 1);
                setUserAnswer('');
                setResult(null);
            } else {
                setShowResults(true);
            }
        }, 2000);
    };

    const restartQuiz = () => {
        setQuotes(gameService.getRandomQuotes(5));
        setCurrentQuote(0);
        setUserAnswer('');
        setResult(null);
        setScore(0);
        setShowResults(false);
        setSuggestions([]);
    };

    if (quotes.length === 0) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex justify-center items-center">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (showResults) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 py-8">
                <div className="container mx-auto px-4">
                    <div className="max-w-2xl mx-auto bg-gray-800 rounded-2xl shadow-2xl p-8 text-center">
                        <FaTrophy className={`w-24 h-24 mx-auto mb-6 ${score === quotes.length ? 'text-yellow-400' :
                            score >= quotes.length * 0.6 ? 'text-gray-400' :
                                'text-bronze-400'
                            }`} />
                        <h2 className="text-4xl font-bold text-white mb-4">النتيجة النهائية</h2>
                        <p className="text-3xl mb-4 text-blue-400">
                            {score} من {quotes.length}
                        </p>
                        <p className="text-xl text-gray-400 mb-8">
                            {score === quotes.length ? 'رائع! أنت خبير حقيقي في السينما!' :
                                score >= quotes.length * 0.6 ? 'جيد جداً! استمر في المشاهدة' :
                                    'حاول مشاهدة المزيد من الأفلام الكلاسيكية'}
                        </p>
                        <div className="flex justify-center gap-4">
                            <button
                                onClick={restartQuiz}
                                className="flex items-center gap-2 bg-blue-600 text-white px-8 py-3 rounded-xl hover:bg-blue-500 transition-colors"
                            >
                                <FaRedo className="w-5 h-5" />
                                حاول مرة أخرى
                            </button>
                            <button
                                onClick={() => window.location.href = '/games'}
                                className="flex items-center gap-2 bg-gray-700 text-white px-8 py-3 rounded-xl hover:bg-gray-600 transition-colors"
                            >
                                <FaArrowRight className="w-5 h-5" />
                                عودة للألعاب
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 py-8">
            <div className="container mx-auto px-4">
                <div className="max-w-3xl mx-auto">
                    <div className="bg-gray-800 rounded-2xl shadow-2xl overflow-hidden">
                        <div className="p-6 bg-gray-900">
                            <div className="flex justify-between items-center">
                                <span className="text-gray-400">اقتباس {currentQuote + 1} من {quotes.length}</span>
                                <span className="text-blue-400">النتيجة: {score}</span>
                            </div>
                        </div>

                        <div className="p-8">
                            <div className="mb-8 relative">
                                <FaQuoteRight className="absolute top-0 right-0 text-blue-500/20 text-4xl transform -translate-y-2" />
                                <p className="text-2xl text-white text-center px-12 leading-relaxed">
                                    {quotes[currentQuote]?.quote}
                                </p>
                                <FaQuoteLeft className="absolute bottom-0 left-0 text-blue-500/20 text-4xl transform translate-y-2" />
                            </div>

                            <form onSubmit={handleSubmit} className="relative">
                                <input
                                    type="text"
                                    value={userAnswer}
                                    onChange={handleInputChange}
                                    placeholder="اكتب اسم الفيلم..."
                                    className="w-full p-4 rounded-xl bg-gray-700 text-white mb-4 text-right placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    dir="rtl"
                                />

                                {suggestions.length > 0 && (
                                    <div className="absolute w-full bg-gray-700 rounded-xl mt-1 shadow-lg z-10">
                                        {suggestions.map((movie, index) => (
                                            <button
                                                key={index}
                                                type="button"
                                                onClick={() => handleSuggestionClick(movie)}
                                                className="w-full p-3 text-right text-white hover:bg-gray-600 transition-colors"
                                            >
                                                {movie}
                                            </button>
                                        ))}
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    className="w-full bg-blue-600 text-white px-6 py-4 rounded-xl hover:bg-blue-500 transition-colors flex items-center justify-center gap-2"
                                >
                                    <FaFilm className="w-5 h-5" />
                                    تحقق من إجابتك
                                </button>
                            </form>

                            {result && (
                                <div className={`mt-6 p-4 rounded-xl ${result.correct ? 'bg-green-600/20 border border-green-500/30' : 'bg-red-600/20 border border-red-500/30'}`}>
                                    <p className="text-lg text-center mb-2 ${result.correct ? 'text-green-400' : 'text-red-400'}">
                                        {result.correct ? 'إجابة صحيحة!' : `الإجابة الصحيحة هي: ${result.answer}`}
                                    </p>
                                    <p className="text-gray-400 text-center text-sm">
                                        قالها {result.character} في عام {result.year}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MovieQuotes; 