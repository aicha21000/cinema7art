import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import newsService from '../services/news-service';
import NewsCard from '../components/NewsCard';

export default function News() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [page, setPage] = useState(1);
    const [category, setCategory] = useState('');
    const [pagination, setPagination] = useState(null);
    const [news, setNews] = useState([]);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await newsService.getNews(page, category);
                setNews(response.news);
                setPagination(response.pagination);
            } catch (error) {
                console.error('Error loading news:', error);
                setError('Une erreur est survenue lors du chargement des actualités');
            } finally {
                setLoading(false);
            }
        };

        fetchNews();
    }, [page, category]);

    if (loading) return <div className="text-center py-8">Chargement...</div>;
    if (error) return <div className="text-center py-8 text-red-500">{error}</div>;

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Actualités Cinéma</h1>
                <div className="flex gap-4">
                    <select
                        value={category}
                        onChange={(e) => {
                            setCategory(e.target.value);
                            setPage(1);
                        }}
                        className="px-4 py-2 border rounded-md"
                    >
                        <option value="">جميع الفئات</option>
                        <option value="movie">أفلام</option>
                        <option value="actor">ممثلون</option>
                        <option value="award">جوائز</option>
                        <option value="industry">صناعة السينما</option>
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {news.map(item => (
                    <NewsCard key={item._id} news={item} />
                ))}
            </div>

            {news.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                    لا توجد أخبار {category && 'في هذه الفئة'}
                </div>
            )}

            {pagination && pagination.totalPages > 1 && (
                <div className="flex justify-center gap-2 mt-8">
                    {[...Array(pagination.totalPages)].map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setPage(i + 1)}
                            className={`px-4 py-2 rounded ${page === i + 1
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-200 hover:bg-gray-300'
                                }`}
                        >
                            {i + 1}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}