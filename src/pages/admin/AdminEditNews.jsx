import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import newsService from '../../services/newsService';
import { FaBold, FaItalic, FaUnderline, FaListUl, FaListOl, FaQuoteRight, FaLink } from 'react-icons/fa';

export default function AdminEditNews() {
    const { id } = useParams();
    const navigate = useNavigate();
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
                const article = await newsService.getNewsById(id);
                console.log('Article chargé:', article);
                if (!article) {
                    setError('لم يتم العثور على الخبر');
                    return;
                }
                setNews(article);
                console.log('État news après setNews:', article);

                // Charger tous les articles non validés
                const unvalidatedNews = await newsService.getUnvalidatedNews();
                setAllNews(unvalidatedNews);
            } catch (error) {
                setError('فشل في تحميل بيانات الخبر');
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchNews();
    }, [id]);

    // Ajouter un useEffect pour surveiller les changements de l'état news
    useEffect(() => {
        console.log('État news actualisé:', news);
    }, [news]);

    // Fonction pour appliquer le formatage
    const applyFormatting = (format) => {
        const textarea = textareaRef.current;
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const selectedText = news.arabicContent.substring(start, end);
        let newText = '';

        switch (format) {
            case 'bold':
                newText = `**${selectedText}**`;
                break;
            case 'italic':
                newText = `*${selectedText}*`;
                break;
            case 'underline':
                newText = `__${selectedText}__`;
                break;
            case 'ul':
                newText = `\n- ${selectedText}`;
                break;
            case 'ol':
                newText = `\n1. ${selectedText}`;
                break;
            case 'quote':
                newText = `\n> ${selectedText}`;
                break;
            case 'link':
                const url = prompt('أدخل الرابط:', 'https://');
                if (url) {
                    newText = `[${selectedText}](${url})`;
                }
                break;
            default:
                return;
        }

        const newContent =
            news.arabicContent.substring(0, start) +
            newText +
            news.arabicContent.substring(end);

        setNews({ ...news, arabicContent: newContent });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('=== DÉBUT SOUMISSION ADMIN ===');
        console.log('Event:', e.type);
        console.log('ID Article:', id);
        console.log('Données du formulaire:', news);

        try {
            setSaving(true);
            console.log('Appel à updateNews avec ID:', id);
            const response = await newsService.updateNews(id, news);
            console.log('Réponse du serveur:', response);

            setSuccessMessage('تم تحديث المقال بنجاح');

            setTimeout(() => {
                navigate('/admin/news');
            }, 2000);

        } catch (error) {
            console.error('=== ERREUR DE SOUMISSION ADMIN ===');
            console.error('Type:', error.name);
            console.error('Message:', error.message);
            console.error('Stack:', error.stack);
            setError('حدث خطأ أثناء التحديث');
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="text-center py-8">جاري التحميل...</div>;

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">تعديل الخبر</h1>

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                </div>
            )}

            {successMessage && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                    {successMessage}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-8">
                    {/* Colonne de gauche - Version anglaise en lecture seule */}
                    <div className="bg-blue-50 p-6 rounded-lg shadow">
                        <h2 className="text-xl font-bold mb-6 text-blue-800">Version originale (Anglais)</h2>

                        <div className="mb-6">
                            <h3 className="font-medium text-blue-700 mb-2">Titre</h3>
                            <div className="bg-white p-4 rounded border border-blue-200">
                                <p className="text-lg">{news.title}</p>
                            </div>
                        </div>

                        <div>
                            <h3 className="font-medium text-blue-700 mb-2">Contenu</h3>
                            <div className="bg-white p-4 rounded border border-blue-200"
                                style={{ minHeight: textareaRef.current ? textareaRef.current.scrollHeight : 'auto' }}>
                                <p className="whitespace-pre-wrap text-gray-800">{news.content}</p>
                            </div>
                        </div>
                    </div>

                    {/* Colonne de droite - Version arabe éditable */}
                    <div className="bg-green-50 p-6 rounded-lg shadow">
                        <h2 className="text-xl font-bold mb-6 text-green-800 text-right">النسخة العربية</h2>

                        <div>
                            <label className="block text-green-700 mb-2 text-right">العنوان</label>
                            <input
                                type="text"
                                value={news.arabicTitle}
                                onChange={(e) => setNews({ ...news, arabicTitle: e.target.value })}
                                className="w-full p-4 border border-green-200 rounded bg-white text-right"
                                required
                                dir="rtl"
                            />
                        </div>

                        <div className="mt-6">
                            <label className="block text-green-700 mb-2 text-right">المحتوى</label>
                            <div className="flex gap-2 mb-2 bg-white p-2 rounded border border-green-200">
                                <button
                                    type="button"
                                    onClick={() => applyFormatting('bold')}
                                    className="p-2 hover:bg-green-100 rounded"
                                    title="غامق"
                                >
                                    <FaBold />
                                </button>
                                <button
                                    type="button"
                                    onClick={() => applyFormatting('italic')}
                                    className="p-2 hover:bg-green-100 rounded"
                                    title="مائل"
                                >
                                    <FaItalic />
                                </button>
                                <button
                                    type="button"
                                    onClick={() => applyFormatting('underline')}
                                    className="p-2 hover:bg-green-100 rounded"
                                    title="تحته خط"
                                >
                                    <FaUnderline />
                                </button>
                                <div className="border-r border-gray-300 mx-2" />
                                <button
                                    type="button"
                                    onClick={() => applyFormatting('ul')}
                                    className="p-2 hover:bg-green-100 rounded"
                                    title="قائمة نقطية"
                                >
                                    <FaListUl />
                                </button>
                                <button
                                    type="button"
                                    onClick={() => applyFormatting('ol')}
                                    className="p-2 hover:bg-green-100 rounded"
                                    title="قائمة رقمية"
                                >
                                    <FaListOl />
                                </button>
                                <div className="border-r border-gray-300 mx-2" />
                                <button
                                    type="button"
                                    onClick={() => applyFormatting('quote')}
                                    className="p-2 hover:bg-green-100 rounded"
                                    title="اقتباس"
                                >
                                    <FaQuoteRight />
                                </button>
                                <button
                                    type="button"
                                    onClick={() => applyFormatting('link')}
                                    className="p-2 hover:bg-green-100 rounded"
                                    title="رابط"
                                >
                                    <FaLink />
                                </button>
                            </div>
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
                    </div>
                </div>

                <div className="flex justify-end space-x-4 mt-6">
                    <button
                        type="button"
                        onClick={() => navigate('/admin/news')}
                        className="px-6 py-3 text-gray-600 hover:text-gray-800 bg-white rounded shadow"
                    >
                        إلغاء
                    </button>
                    <button
                        type="submit"
                        disabled={saving}
                        className="bg-green-600 text-white px-6 py-3 rounded shadow hover:bg-green-700 disabled:bg-green-300"
                        onClick={() => console.log('Bouton de soumission cliqué')}
                    >
                        {saving ? 'جاري الحفظ...' : 'حفظ التغييرات'}
                    </button>
                </div>
            </form>
        </div>
    );
} 