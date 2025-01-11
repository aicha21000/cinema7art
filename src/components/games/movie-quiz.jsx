import { useState, useEffect } from 'react';
import { FaTrophy, FaRedo, FaClock, FaArrowRight, FaFilm } from 'react-icons/fa';
import quizService from '../../services/quiz-service';

const MovieQuiz = () => {
    const [currentCategory, setCurrentCategory] = useState(null);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [questions, setQuestions] = useState([]);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [isAnswered, setIsAnswered] = useState(false);
    const [fact, setFact] = useState('');
    const [timeLeft, setTimeLeft] = useState(30);
    const [showCategorySelect, setShowCategorySelect] = useState(true);

    useEffect(() => {
        if (!showCategorySelect && !showResult && timeLeft > 0) {
            const timer = setInterval(() => {
                setTimeLeft(prev => {
                    if (prev <= 1) {
                        handleTimeUp();
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [showCategorySelect, showResult, timeLeft]);

    const handleTimeUp = () => {
        if (!isAnswered) {
            setIsAnswered(true);
            setFact(questions[currentQuestion].fact);
            setTimeout(() => {
                if (currentQuestion + 1 < questions.length) {
                    nextQuestion();
                } else {
                    setShowResult(true);
                }
            }, 2000);
        }
    };

    const selectCategory = (categoryId) => {
        const category = quizService.getCategoryById(categoryId);
        setCurrentCategory(category);
        setQuestions(quizService.shuffleQuestions(category.questions));
        setShowCategorySelect(false);
    };

    const nextQuestion = () => {
        setCurrentQuestion(prev => prev + 1);
        setSelectedAnswer(null);
        setIsAnswered(false);
        setFact('');
        setTimeLeft(30);
    };

    const handleAnswer = (selectedIndex) => {
        if (isAnswered) return;

        setSelectedAnswer(selectedIndex);
        setIsAnswered(true);
        setFact(questions[currentQuestion].fact);

        if (questions[currentQuestion].correct === selectedIndex) {
            setScore(score + 1);
        }

        setTimeout(() => {
            if (currentQuestion + 1 < questions.length) {
                nextQuestion();
            } else {
                setShowResult(true);
            }
        }, 2000);
    };

    const restartQuiz = () => {
        setShowCategorySelect(true);
        setCurrentQuestion(0);
        setScore(0);
        setShowResult(false);
        setSelectedAnswer(null);
        setIsAnswered(false);
        setFact('');
        setTimeLeft(30);
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 py-8">
            {showCategorySelect ? (
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto bg-gray-800 rounded-2xl shadow-2xl overflow-hidden">
                        <div className="p-8 text-center">
                            <FaFilm className="w-16 h-16 mx-auto text-blue-500 mb-6" />
                            <h1 className="text-4xl font-bold text-white mb-4">اختبار خبير السينما</h1>
                            <p className="text-gray-400 mb-8 text-lg">اختر فئة واختبر معرفتك بتاريخ السينما العالمية</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-8 bg-gray-900 rounded-t-3xl">
                            {quizService.getMovieExpertQuiz().categories.map(category => (
                                <button
                                    key={category.id}
                                    onClick={() => selectCategory(category.id)}
                                    className="group relative overflow-hidden rounded-xl p-6 bg-gradient-to-br from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 transition-all duration-300 shadow-lg"
                                >
                                    <div className="relative z-10">
                                        <h3 className="text-xl font-bold text-white mb-2 text-right">{category.title}</h3>
                                        <p className="text-blue-100 text-sm text-right opacity-90">
                                            {category.questions.length} سؤال
                                        </p>
                                    </div>
                                    <div className="absolute bottom-0 right-0 w-32 h-32 bg-blue-400 rounded-full opacity-20 transform translate-x-16 translate-y-16 group-hover:translate-x-8 group-hover:translate-y-8 transition-transform duration-300" />
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            ) : !showResult ? (
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto bg-gray-800 rounded-2xl shadow-2xl overflow-hidden">
                        <div className="p-6 bg-gray-900">
                            <div className="flex justify-between items-center mb-4">
                                <div className="flex items-center gap-3">
                                    <FaClock className="text-blue-500" />
                                    <span className={`text-2xl font-bold ${timeLeft <= 10 ? 'text-red-500' : 'text-blue-500'}`}>
                                        {timeLeft}
                                    </span>
                                </div>
                                <h2 className="text-xl font-bold text-white">{currentCategory.title}</h2>
                            </div>
                            <div className="w-full bg-gray-700 rounded-full h-2">
                                <div
                                    className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                                    style={{ width: `${(currentQuestion / questions.length) * 100}%` }}
                                />
                            </div>
                        </div>

                        <div className="p-8">
                            <h3 className="text-2xl text-white mb-8 text-right leading-relaxed">
                                {questions[currentQuestion].question}
                            </h3>

                            <div className="grid gap-4">
                                {questions[currentQuestion].options.map((option, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleAnswer(index)}
                                        disabled={isAnswered}
                                        className={`p-4 rounded-xl text-right transition-all duration-300 transform hover:scale-102 ${isAnswered
                                            ? index === questions[currentQuestion].correct
                                                ? 'bg-green-600 text-white'
                                                : index === selectedAnswer
                                                    ? 'bg-red-600 text-white'
                                                    : 'bg-gray-700 text-gray-300'
                                            : 'bg-gray-700 hover:bg-gray-600 text-white'
                                            }`}
                                    >
                                        {option}
                                    </button>
                                ))}
                            </div>

                            {fact && (
                                <div className="mt-6 p-4 bg-blue-900/50 rounded-xl border border-blue-500/30">
                                    <p className="text-blue-100 text-right">{fact}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            ) : (
                <div className="container mx-auto px-4">
                    <div className="max-w-2xl mx-auto bg-gray-800 rounded-2xl shadow-2xl p-8 text-center">
                        <FaTrophy className={`w-24 h-24 mx-auto mb-6 ${score === questions.length ? 'text-yellow-400' :
                            score >= questions.length * 0.7 ? 'text-gray-400' :
                                'text-bronze-400'
                            }`} />
                        <h2 className="text-4xl font-bold text-white mb-4">النتيجة النهائية</h2>
                        <p className="text-3xl mb-4 text-blue-400">
                            {score} من {questions.length}
                        </p>
                        <p className="text-xl text-gray-400 mb-8">
                            {score === questions.length ? 'مذهل! أنت خبير سينمائي حقيقي!' :
                                score >= questions.length * 0.7 ? 'أداء رائع! أنت على الطريق الصحيح' :
                                    'حاول مرة أخرى لتحسين نتيجتك'}
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
            )}
        </div>
    );
};

export default MovieQuiz; 