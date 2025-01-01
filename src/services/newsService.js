import { fetchJson } from '../utils/api';
import { NEWS_JSON_PATH } from '../config';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL;

class NewsService {
    constructor() {
        this.news = [];
        this.initialized = false;
        this.baseURL = API_BASE_URL;
    }

    async resetCache() {
        this.initialized = false;
        await this.initialize();
    }

    async initialize() {
        if (this.initialized) return;

        try {
            const response = await fetch(`${API_BASE_URL}/news`);
            console.log('Response status:', response.status);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            console.log('Parsed data:', data ? 'valid' : 'null');
            
            if (!Array.isArray(data)) {
                throw new Error('Invalid news data format');
            }
            
            this.news = data;
            this.initialized = true;
            console.log('Loaded news:', this.news.length, 'items');
        } catch (error) {
            console.error('Failed to load news:', error);
            this.news = [];
            this.initialized = true;
        }
    }

    async getAllNews() {
        await this.initialize();
        return this.news;
    }

    async getNews(page = 1, limit = 40) {
        try {
            const news = await this.getAllNews();
            console.log("Getting news, total items:", news.length);

            // S'assurer que page et limit sont des nombres
            const pageNum = parseInt(page) || 1;
            const limitNum = parseInt(limit) || 40;

            // Calculer les indices pour la pagination
            const startIndex = (pageNum - 1) * limitNum;
            const endIndex = startIndex + limitNum;

            const paginationInfo = {
                startIndex,
                endIndex,
                page: pageNum,
                limit: limitNum
            };
            console.log("Pagination:", paginationInfo);

            // Retourner la page demandée
            const paginatedNews = news.slice(startIndex, endIndex);
            console.log("Returning paginated news:", paginatedNews.length, "items");

            return {
                news: paginatedNews,
                total: news.length,
                page: pageNum,
                totalPages: Math.ceil(news.length / limitNum)
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

    async getReliableNews() {
        await this.initialize();
        return this.news.filter(news => news.reliability === 'reliable');
    }

    async searchNews(query) {
        await this.initialize();
        const searchTerm = query.toLowerCase();
        return this.news.filter(news =>
            news.title.toLowerCase().includes(searchTerm) ||
            news.arabicTitle.includes(searchTerm) ||
            news.content.toLowerCase().includes(searchTerm) ||
            news.arabicContent.includes(searchTerm)
        );
    }

    async getNewsBySource(source) {
        await this.initialize();
        return this.news.filter(news => 
            news.source.toLowerCase() === source.toLowerCase()
        );
    }

    async getNewsById(id) {
        try {
            console.log('Fetching news with ID:', id);
            const response = await fetch(`${API_BASE_URL}/news/${id}`);
            console.log('Response status:', response.status);
            if (!response.ok) {
                throw new Error('Article non trouvé');
            }
            const data = await response.json();
            console.log('Received data:', data);
            return data;
        } catch (error) {
            console.error('Error fetching news by id:', error);
            throw error;
        }
    }

    async deleteNews(id) {
        try {
            const response = await fetch(`/api/news/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    // Ajouter ici les headers d'authentification si nécessaire
                }
            });

            if (!response.ok) {
                throw new Error('Failed to delete news');
            }

            return true;
        } catch (error) {
            console.error('Error deleting news:', error);
            throw error;
        }
    }

    async updateNews(id, newsData) {
        try {
            const response = await axios.put(`${this.baseURL}/news/${id}`, newsData, {
                headers: this.getHeaders()
            });
            return response.data;
        } catch (error) {
            console.error('Erreur lors de la mise à jour:', error);
            throw new Error(error.response?.data?.message || 'Erreur lors de la mise à jour');
        }
    }

    async getUnvalidatedNews() {
        const token = localStorage.getItem('adminToken');
        if (!token) {
            throw new Error('Non authentifié');
        }

        const response = await fetch(`${API_BASE_URL}/news/unvalidated`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Erreur lors du chargement des articles non validés');
        }

        const data = await response.json();
        if (!Array.isArray(data)) {
            console.error('Invalid data format:', data);
            return [];
        }

        return data;
    }

    async validateNews(id) {
        const token = localStorage.getItem('adminToken');
        const response = await fetch(`${API_BASE_URL}/news/validate/${id}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.json();
    }

    getHeaders() {
        const token = localStorage.getItem('adminToken');
        return {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        };
    }
}

export default new NewsService(); 