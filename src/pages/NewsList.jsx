import { useState, useEffect } from 'react';
import newsService from '../services/newsService';

export default function NewsList() {
    const [news, setNews] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                setLoading(true);
                const response = await newsService.getNews(1, 40);
                setNews(response.news);
                setTotalPages(response.totalPages);
            } catch (error) {
                console.error("Error fetching news:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchNews();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {news.map(item => (
                    <NewsCard key={item._id} news={item} />
                ))}
            </div>
        </div>
    );
} 