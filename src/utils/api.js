import axios from 'axios';
import { API_BASE_URL } from '../config';

const api = axios.create({
    baseURL: API_BASE_URL,
});

export const fetchJson = async (path) => {
    try {
        const response = await fetch(path);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching JSON:', error);
        throw error;
    }
};

export default api; 