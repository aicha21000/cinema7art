import { useState, useEffect } from 'react';
import GuessMovieService from '../../services/guess-movie-service';
import { FaTrophy, FaRedo, FaLightbulb } from 'react-icons/fa';

function GuessMovie() {
    const [movies, setMovies] = useState([]);
    const [currentMovie, setCurrentMovie] = useState(0);
    const [score, setScore] = useState(0);
    const [selectedChoice, setSelectedChoice] = useState('');
    const [currentHint, setCurrentHint] = useState(0);
    const [showHint, setShowHint] = useState(false);
    const [gameOver, setGameOver] = useState(false);
    const [feedback, setFeedback] = useState('');
    const [loading, setLoading] = useState(true);
    const [attemptsLeft, setAttemptsLeft] = useState(2);

    useEffect(() => {
        const loadMovies = async () => {
            try {
                const movieScenes = await GuessMovieService.getAllGames();
                setMovies(movieScenes);
            } catch (error) {
                console.error('Error loading movies:', error);
            } finally {
                setLoading(false);
            }
        };

        loadMovies();
    }, []);

    const handleChoice = (choice) => {
        const currentAnswer = movies[currentMovie].choices.find(c => c.isValid).text.toLowerCase();
        if (choice.toLowerCase() === currentAnswer) {
            setScore(score + 1);
            setFeedback('إجابة صحيحة!');
            setTimeout(() => {
                moveToNextQuestion();
            }, 1500);
        } else {
            setAttemptsLeft(attemptsLeft - 1);
            if (attemptsLeft - 1 <= 0) {
                setFeedback('انتهت المحاولات! الانتقال للسؤال التالي.');
                setTimeout(() => {
                    moveToNextQuestion();
                }, 1500);
            } else {
                setFeedback('حاول مرة أخرى');
                setTimeout(() => {
                    setFeedback('');
                }, 1500);
            }
        }
    };

    const moveToNextQuestion = () => {
        if (currentMovie < movies.length - 1) {
            setCurrentMovie(currentMovie + 1);
            setSelectedChoice('');
            setShowHint(false);
            setCurrentHint(0);
            setFeedback('');
            setAttemptsLeft(2);
        } else {
            setGameOver(true);
        }
    };

    const showNextHint = () => {
        if (currentHint < movies[currentMovie].hints.length - 1) {
            setCurrentHint(currentHint + 1);
        }
        setShowHint(true);
    };

    const handleRetry = () => {
        setCurrentMovie(0);
        setScore(0);
        setSelectedChoice('');
        setShowHint(false);
        setCurrentHint(0);
        setFeedback('');
        setGameOver(false);
        setAttemptsLeft(2);
    };

    if (loading) {
        return <div className="text-center py-8">جاري التحميل...</div>;
    }

    if (gameOver) {
        return (
            <div className="max-w-3xl mx-auto py-8 px-4">
                <div className="bg-gray-900 text-white rounded-lg p-8 text-center">
                    <FaTrophy className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
                    <h2 className="text-3xl font-bold mb-4">انتهت اللعبة!</h2>
                    <p className="text-2xl mb-6">
                        نتيجتك: {score} من {movies.length}
                    </p>
                    <button
                        onClick={handleRetry}
                        className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg text-lg font-medium mx-auto transition-colors"
                    >
                        <FaRedo />
                        العب مرة أخرى
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto py-8 px-4">
            <div className="bg-gray-900 text-white rounded-lg overflow-hidden">
                <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <span className="text-gray-400">فيلم {currentMovie + 1} من {movies.length}</span>
                        <span className="text-gray-400">النتيجة: {score}</span>
                        <span className="text-gray-400">محاولات متبقية: {attemptsLeft}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                        {movies[currentMovie]?.scenes.map((scene, index) => (
                            <div key={index} className="aspect-video rounded-lg overflow-hidden">
                                <img
                                    src={scene}
                                    alt={`مشهد ${index + 1}`}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        ))}
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                        {movies[currentMovie]?.choices.map((choice, index) => (
                            <button
                                key={index}
                                onClick={() => handleChoice(choice.text)}
                                className="bg-gray-800 hover:bg-gray-700 px-6 py-3 rounded-lg font-medium transition-colors"
                            >
                                {choice.text}
                            </button>
                        ))}
                    </div>

                    <button
                        type="button"
                        onClick={showNextHint}
                        className="bg-gray-800 hover:bg-gray-700 px-6 py-3 rounded-lg font-medium transition-colors"
                    >
                        <FaLightbulb />
                    </button>

                    {showHint && (
                        <div className="mt-4 space-y-2">
                            {movies[currentMovie].hints.slice(0, currentHint + 1).map((hint, index) => (
                                <div key={index} className="p-3 bg-gray-800 rounded-lg">
                                    <p className="text-gray-300 text-right">
                                        {hint}
                                    </p>
                                </div>
                            ))}
                        </div>
                    )}

                    {feedback && (
                        <div className={`mt-4 p-4 rounded-lg text-center ${feedback === 'إجابة صحيحة!' ? 'bg-green-600' : 'bg-red-600'
                            }`}>
                            {feedback}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default GuessMovie; 