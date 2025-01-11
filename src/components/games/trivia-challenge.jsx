import { useState, useEffect } from 'react';
import { FaTrophy, FaRedo, FaClock } from 'react-icons/fa';
import gameService from '../../services/game-service';

function TriviaChallenge() {
    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [showResults, setShowResults] = useState(false);
    const [timeLeft, setTimeLeft] = useState(30);
    const [isActive, setIsActive] = useState(true);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [fact, setFact] = useState('');

    useEffect(() => {
        const dailyTrivia = gameService.getDailyTrivia();
        setQuestions(dailyTrivia.questions);
    }, []);

    useEffect(() => {
        if (isActive && timeLeft > 0) {
            const timer = setInterval(() => {
                setTimeLeft(prev => {
                    if (prev <= 1) {
                        handleTimeout();
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [isActive, timeLeft]);

    const handleTimeout = () => {
        setIsActive(false);
        setFact(questions[currentQuestion].fact);
        setTimeout(handleNextQuestion, 2000);
    };

    const handleAnswer = (selectedIndex) => {
        if (!isActive) return;

        setSelectedAnswer(selectedIndex);
        setIsActive(false);
        setFact(questions[currentQuestion].fact);

        if (questions[currentQuestion].correct === selectedIndex) {
            setScore(score + 1);
        }

        setTimeout(handleNextQuestion, 2000);
    };

    const handleNextQuestion = () => {
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(prev => prev + 1);
            setSelectedAnswer(null);
            setTimeLeft(30);
            setIsActive(true);
            setFact('');
        } else {
            setShowResults(true);
        }
    };

    const restartQuiz = () => {
        const dailyTrivia = gameService.getDailyTrivia();
        setQuestions(dailyTrivia.questions);
        setCurrentQuestion(0);
        setScore(0);
        setShowResults(false);
        setSelectedAnswer(null);
        setTimeLeft(30);
        setIsActive(true);
        setFact('');
    };

    if (questions.length === 0) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (showResults) {
        return (
            <div className="container mx-auto p-4">
                <div className="bg-gray-900 text-white rounded-lg p-8 text-center">
                    <FaTrophy className={`w-16 h-16 mx-auto mb-4 ${score === 3 ? 'text-yellow-400' :
                        score === 2 ? 'text-gray-400' :
                            'text-bronze-400'
                        }`} />
                    <h2 className="text-3xl font-bold mb-4">نتيجة التحدي اليومي</h2>
                    <p className="text-2xl mb-4">
                        لقد أجبت على {score} من {questions.length} أسئلة بشكل صحيح
                    </p>
                    <button
                        onClick={restartQuiz}
                        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        <FaRedo className="inline-block ml-2" />
                        حاول مرة أخرى
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4">
            <div className="bg-gray-900 text-white rounded-lg p-6">
                <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-2">
                        <FaClock className="text-blue-500" />
                        <span className={`font-bold ${timeLeft <= 10 ? 'text-red-500' : 'text-blue-500'}`}>
                            {timeLeft}
                        </span>
                    </div>
                    <span className="text-gray-400">سؤال {currentQuestion + 1} من {questions.length}</span>
                </div>

                <h2 className="text-2xl font-bold mb-6 text-right">
                    {questions[currentQuestion].question}
                </h2>

                <div className="grid grid-cols-1 gap-4">
                    {questions[currentQuestion].options.map((option, index) => (
                        <button
                            key={index}
                            onClick={() => handleAnswer(index)}
                            disabled={!isActive}
                            className={`p-4 rounded-lg text-right transition-all duration-300 ${!isActive
                                ? index === questions[currentQuestion].correct
                                    ? 'bg-green-600'
                                    : index === selectedAnswer
                                        ? 'bg-red-600'
                                        : 'bg-gray-800'
                                : 'bg-gray-800 hover:bg-gray-700'
                                }`}
                        >
                            {option}
                        </button>
                    ))}
                </div>

                {fact && (
                    <div className="mt-4 p-4 bg-blue-900 rounded-lg">
                        <p className="text-blue-100">{fact}</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default TriviaChallenge; 