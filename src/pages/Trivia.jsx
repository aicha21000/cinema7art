import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import TriviaCard from '../components/TriviaCard.jsx';

function Trivia() {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [trivia, setTrivia] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [movieRes, triviaRes] = await Promise.all([
                    axios.get(`/api/movies/${id}`),
                    axios.get(`/api/trivia/movie/${id}${selectedCategory ? `?category=${selectedCategory}` : ''}`)
                ]);
                setMovie(movieRes.data);
                setTrivia(triviaRes.data.trivia);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id, selectedCategory]);

    if (loading) return <div className="text-center py-8">جاري التحميل...</div>;
    if (!movie) return <div className="text-center py-8">لم يتم العثور على الفيلم</div>;

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold mb-2">{movie.arabicTitle}</h1>
                    <p className="text-gray-600">{movie.englishTitle}</p>
                </div>
                <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="p-2 border rounded-md"
                >
                    <option value="">كل الأنواع</option>
                    <option value="production">إنتاج</option>
                    <option value="casting">اختيار الممثلين</option>
                    <option value="script">السيناريو</option>
                    <option value="effects">المؤثرات</option>
                    <option value="other">أخرى</option>
                </select>
            </div>

            <div className="grid grid-cols-1 gap-4">
                {trivia.length > 0 ? (
                    trivia.map(item => (
                        <TriviaCard key={item._id} trivia={item} />
                    ))
                ) : (
                    <div className="text-center py-8 text-gray-500">
                        لا توجد معلومات متوفرة{selectedCategory && ' في هذا التصنيف'}
                    </div>
                )}
            </div>

            {movie.poster && (
                <div className="fixed bottom-4 left-4 w-24">
                    <img
                        src={movie.poster}
                        alt={movie.arabicTitle}
                        className="w-full rounded-lg shadow-lg"
                    />
                </div>
            )}
        </div>
    );
}

export default Trivia; 