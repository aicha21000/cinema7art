import React, { useEffect, useState } from 'react';
import News from './News';

function NewsComponent() {
    const [newsData, setNewsData] = useState([]);
    const newsInstance = new News();

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const allNews = await newsInstance.getAllNews();
                setNewsData(allNews);
            } catch (error) {
                console.error('Error fetching news:', error);
            }
        };

        fetchNews();
    }, [newsInstance]);

    return (
        <div>
            <h1>Actualités</h1>
            <ul>
                {newsData.map((newsItem, index) => (
                    <li key={index}>{newsItem.title}</li>
                ))}
            </ul>
        </div>
    );
}

export default NewsComponent; 