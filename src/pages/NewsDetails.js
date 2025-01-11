import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import newsService from '../services/NewsService';

function NewsDetails() {
    const { id } = useParams();
    const [newsItem, setNewsItem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchNewsItem = async () => {
            try {
                const data = await newsService.getNewsById(id);
                setNewsItem(data);
            } catch (error) {
                console.error('Error fetching news item:', error);
                setError('Une erreur est survenue lors du chargement de l\'actualité');
            } finally {
                setLoading(false);
            }
        };

        fetchNewsItem();
    }, [id]);

    if (loading) return <div className="text-center py-8">Chargement...</div>;
    if (error) return <div className="text-center py-8 text-red-500">{error}</div>;

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            {newsItem && (
                <>
                    <h1 className="text-3xl font-bold mb-4">{newsItem.arabicTitle}</h1>
                    <img src={newsItem.image} alt={newsItem.arabicTitle} className="w-full h-auto mb-4" />
                    <p className="text-gray-700">{newsItem.arabicContent}</p>
                    <div className="text-sm text-gray-500 mt-4">
                        Source: {newsItem.source}
                    </div>
                    {newsItem.isExclusive && (
                        <div className="text-blue-600 text-sm font-medium mt-2">
                            Exclusif
                        </div>
                    )}
                </>
            )}
        </div>
    );
}

export default NewsDetails; 