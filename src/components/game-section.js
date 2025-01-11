import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaGamepad, FaQuestionCircle, FaTrophy, FaBrain } from 'react-icons/fa';

function GameSection() {
    const [activeGame, setActiveGame] = useState(null);
    const navigate = useNavigate();

    const games = [
        {
            id: 'movie-quiz',
            title: 'اختبار خبير السينما',
            icon: <FaBrain className="w-6 h-6" />,
            description: 'اختبر معرفتك في تاريخ السينما العالمية مع أكثر من 200 سؤال في 10 فئات مختلفة',
            color: 'from-blue-500 to-blue-600',
            link: '/games/movie-quiz'
        },
        {
            id: 'guess-scene',
            title: 'خمن المشهد',
            icon: <FaGamepad className="w-6 h-6" />,
            description: 'تحدي تخمين الفيلم من خلال مشاهد مميزة. هل تستطيع التعرف على الأفلام الشهيرة؟',
            color: 'from-purple-500 to-purple-600',
            link: '/games/guess-scene'
        },
        {
            id: 'daily-trivia',
            title: 'التحدي اليومي',
            icon: <FaTrophy className="w-6 h-6" />,
            description: 'تحدي يومي جديد مع 3 أسئلة سريعة. نافس الآخرين وحقق أعلى النتائج',
            color: 'from-green-500 to-green-600',
            link: '/games/trivia-challenge'
        },
        {
            id: 'movie-quotes',
            title: 'اقتباسات سينمائية',
            icon: <FaQuestionCircle className="w-6 h-6" />,
            description: 'اختبر معرفتك بأشهر الاقتباسات في تاريخ السينما. من قال هذه العبارة الشهيرة؟',
            color: 'from-red-500 to-red-600',
            link: '/games/movie-quotes'
        }
    ];

    const handleGameClick = (link) => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });

        setTimeout(() => {
            navigate(link);
        }, 300);
    };

    return (
        <div className="bg-gray-900 text-white rounded-lg p-6 shadow-xl">
            <h2 className="text-2xl font-bold mb-6 text-right">ألعاب واختبارات</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {games.map(game => (
                    <div
                        key={game.id}
                        onClick={() => handleGameClick(game.link)}
                        className="group relative bg-gradient-to-br rounded-lg p-4 hover:scale-105 transition-all duration-300 cursor-pointer"
                        style={{ background: `linear-gradient(to bottom right, var(--tw-gradient-stops))` }}
                        onMouseEnter={() => setActiveGame(game.id)}
                        onMouseLeave={() => setActiveGame(null)}
                    >
                        <div className={`absolute inset-0 rounded-lg bg-gradient-to-br ${game.color} opacity-75 group-hover:opacity-100 transition-opacity`}></div>
                        <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="text-white group-hover:scale-110 transition-transform">
                                    {game.icon}
                                </div>
                                <h3 className="font-bold text-right flex-1">{game.title}</h3>
                            </div>
                            <p className="text-gray-100 text-sm text-right">{game.description}</p>
                        </div>
                        <div className={`absolute bottom-0 left-0 h-1 bg-white transition-all duration-300 ${activeGame === game.id ? 'w-full' : 'w-0'}`} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default GameSection; 