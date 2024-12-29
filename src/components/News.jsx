import { useState, useEffect } from 'react';
import newsService from '../services/newsService';
import NewsCard from './NewsCard';
import Pagination from './Pagination';

export default function News() {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const itemsPerPage = 10;

    useEffect(() => {
        const fetchNews = async () => {
            try {
                setLoading(true);
                console.log('Fetching page', currentPage, 'with', itemsPerPage, 'items per page');

                const result = await newsService.getNews(currentPage, itemsPerPage);
                console.log('Fetch result:', result);

                if (result && Array.isArray(result.news)) {
                    setNews(result.news);
                    setTotalPages(result.totalPages);

                    if (currentPage > result.totalPages) {
                        setCurrentPage(1);
                    }
                } else {
                    console.error('Invalid result structure:', result);
                    setError('هيكل البيانات غير صالح');
                }
            } catch (error) {
                console.error('Error in fetchNews:', error);
                setError('حدث خطأ أثناء تحميل الأخبار');
            } finally {
                setLoading(false);
            }
        };

        fetchNews();
    }, [currentPage, itemsPerPage]);

    const handlePageChange = (page) => {
        const pageNum = parseInt(page);
        if (pageNum >= 1 && pageNum <= totalPages) {
            setCurrentPage(pageNum);
        }
    };

    if (loading) return <div className="text-center py-8">جاري التحميل...</div>;
    if (error) return <div className="text-center text-red-600 py-8">{error}</div>;
    if (!news?.length) return <div className="text-center py-8">لا توجد أخبار متاحة</div>;

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8 text-right">آخر الأخبار</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {news.map(item => (
                    <NewsCard key={item._id} news={item} />
                ))}
            </div>

            {totalPages > 1 && (
                <div className="mt-8">
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                </div>
            )}
        </div>
    );
} 