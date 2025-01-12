import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import NewsService from '../../../services/news-service';
import { FaBold, FaItalic, FaUnderline, FaListUl, FaListOl, FaQuoteRight, FaLink } from 'react-icons/fa';

export default function AdminEditNews() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');
    const [allNews, setAllNews] = useState([]);
    const [news, setNews] = useState({
        title: '',
        arabicTitle: '',
        content: '',
        arabicContent: '',
        image: '',
        source: '',
        sourceUrl: '',
        reliability: 'unconfirmed',
        isExclusive: false
    });
    const [successMessage, setSuccessMessage] = useState('');

    // Fonction pour ajuster la hauteur du textarea
    const adjustTextareaHeight = (textarea) => {
        if (textarea) {
            textarea.style.height = 'auto';
            textarea.style.height = `${textarea.scrollHeight}px`;
        }
    };

    // Référence au textarea
    const textareaRef = useRef(null);

    // Ajuster la hauteur quand le contenu change
    useEffect(() => {
        adjustTextareaHeight(textareaRef.current);
    }, [news.arabicContent]);

    // Ajuster la hauteur initiale une fois que les données sont chargées
    useEffect(() => {
        if (!loading && textareaRef.current) {
            adjustTextareaHeight(textareaRef.current);
        }
    }, [loading]);




    useEffect(() => {
        const fetchNews = async () => {
            try {
                setLoading(true);
                // Charger l'article à éditer
                const article = await NewsService.getNewsById(id);
                console.log('Article chargé:', article);
                if (!article) {
                    setError('لم يتم العثور على الخبر');
                    return;
                }
                setNews(article);
                console.log('État news après setNews:', article);

                // Charger tous les articles non validés
                const unvalidatedNews = await NewsService.getUnvalidatedNews();
                setAllNews(unvalidatedNews);
                console.log('État allNews après setAllNews:', unvalidatedNews);
            } catch (error) {
                setError('فشل في تحميل البيانات');
                console.error('Error fetching news:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchNews();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        setError('');

        try {
            await NewsService.updateNews(id, news);
            navigate('/admin/news');
            setSuccessMessage('تم حفظ التغييرات بنجاح');
        } catch (error) {
            setError('فشل في حفظ التغييرات');
            console.error('Error updating news:', error);
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="text-center py-8">جاري التحميل...</div>;

    return (
        <div className="max-w-3xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">تعديل الخبر</h1>
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                    {error}
                </div>
            )}
            {successMessage && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                    {successMessage}
                </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-gray-700 mb-2">العنوان</label>
                    <input
                        type="text"
                        value={news.title}
                        onChange={(e) => setNews({ ...news, title: e.target.value })}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <div>
                    <label className="block text-gray-700 mb-2">المحتوى</label>
                    <textarea
                        ref={textareaRef}
                        value={news.arabicContent}
                        onChange={(e) => {
                            setNews({ ...news, arabicContent: e.target.value });
                            adjustTextareaHeight(e.target);
                        }}
                        className="w-full p-4 border border-green-200 rounded bg-white text-right"
                        required
                        dir="rtl"
                        style={{ overflow: 'hidden' }}
                    />
                </div>
                <div className="flex justify-end space-x-4 mt-6">
                    <button
                        type="submit"
                        disabled={saving}
                        className="bg-green-600 text-white px-6 py-3 rounded shadow hover:bg-green-700 disabled:bg-green-300"
                    >
                        {saving ? 'جاري الحفظ...' : 'حفظ التغييرات'}
                    </button>
                </div>
            </form>
        </div>
    );
} 