import axios from 'axios';
import config from '../config';

const API_BASE_URL = config.REACT_APP_API_BASE_URL;
const baseURL = `${API_BASE_URL}/api/news`;
console.log(baseURL);

class NewsService {
    constructor() {
        this.news = [];
        this.initialized = false;
        this.baseURL = baseURL;
    }

    async initialize() {
        if (this.initialized) return;

        try {
            const response = await axios.get(this.baseURL);
            if (response.status !== 200) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = response.data;
            if (!Array.isArray(data)) {
                throw new Error('Invalid news data format');
            }

            this.news = data;
            this.initialized = true;
        } catch (error) {
            console.error('Failed to load news:', error);
            this.news = [];
            this.initialized = true;
        }
    }

    async resetCache() {
        this.initialized = false;
        await this.initialize();
    }

    async getAllNews() {
        await this.initialize();
        return this.news;
    }

    async getNewsById(newsId) {
        try {
            const response = await axios.get(`${this.baseURL}/${newsId}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching news with id ${newsId}:`, error);
            throw error;
        }
    }

    async getNews(page = 1, limit = 40) {
        try {
            await this.initialize();
            const pageNum = parseInt(page) || 1;
            const limitNum = parseInt(limit) || 40;

            const startIndex = (pageNum - 1) * limitNum;
            const endIndex = startIndex + limitNum;

            const paginatedNews = this.news.slice(startIndex, endIndex);

            return {
                news: paginatedNews,
                total: this.news.length,
                page: pageNum,
                totalPages: Math.ceil(this.news.length / limitNum),
            };
        } catch (error) {
            console.error("Error getting news:", error);
            throw error;
        }
    }

    async getLatestNews(limit = 5) {
        await this.initialize();
        return this.news.slice(0, Math.min(limit, this.news.length));
    }

    async getExclusiveNews() {
        await this.initialize();
        return this.news.filter(news => news.isExclusive);
    }

    async searchNews(query) {
        const response = await axios.get(`${this.baseURL}/search`, { params: { query } });
        return response.data;
    }

    async addNews(news) {
        try {
            const response = await axios.post(`${this.baseURL}`, news);
            return response.data;
        } catch (error) {
            console.error('Error adding news:', error);
            throw error;
        }
    }

    async deleteNews(id) {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('Non authentifié');
        }

        try {
            const response = await axios.delete(`${this.baseURL}/${id}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            console.log('Response from delete:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error deleting news:', error);
            throw error;
        }
    }

    async updateNews(id, newsData) {
        try {
            const response = await axios.put(`${this.baseURL}/${id}`, newsData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error updating news:', error);
            throw new Error(error.response?.data?.message || 'Error updating news');
        }
    }

    async getUnvalidatedNews() {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('Non authentifié');
        }

        try {
            const response = await axios.get(`${this.baseURL}/unvalidated`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching unvalidated news:', error);
            throw error;
        }
    }

    async validateNews(id) {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.post(`${this.baseURL}/validate/${id}`, {}, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            return response.data;
        } catch (error) {
            console.error('Error validating news:', error);
            throw error;
        }
    }

    async unvalidateNews(id) {
        try {
            const response = await axios.put(`${this.baseURL}/unvalidate/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error unvalidating news:', error);
            throw error;
        }
    }

    async searchGlobal(query) {
        try {
            const response = await axios.get(`${this.baseURL}/search/${encodeURIComponent(query)}`);
            return response.data;
        } catch (error) {
            console.error('Error searching news:', error);
            throw error;
        }
    }
}

export default new NewsService(); 