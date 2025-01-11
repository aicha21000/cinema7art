// client/src/services/guess-movie-service.js
import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

class GuessMovieService {
    constructor() {
        this.baseURL = API_BASE_URL;
    }

    // Ajouter un nouveau film
    async addGuessMovie(movieData) {
        try {
            const response = await axios.post(`${this.baseURL}/api/guess`, movieData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error adding guess movie:', error);
            throw error;
        }
    }

    // Récupérer tous les jeux
    async getAllGames() {
        try {
            const response = await axios.get(`${this.baseURL}/api/guess`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching games:', error);
            throw error;
        }
    }

    // Récupérer un jeu par ID
async getGuessMovieById(id) {
    try {
        const response = await axios.get(`${this.baseURL}/api/guess/${id}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        return response.data;
    } catch (error) {
        console.error(`Error fetching guess movie with id ${id}:`, error);
        throw error;
    }
}

    // Mettre à jour un jeu
    async updateGuessMovie(id, movieData) {
        try {
            const response = await axios.put(`${this.baseURL}/api/guess/${id}`, movieData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
        return response.data;
        } catch (error) {
            console.error('Error updating guess movie:', error);
            throw error;
        }
    }

    // Supprimer un jeu
async deleteGame(id) {
    try {
            const response = await axios.delete(`${this.baseURL}/api/guess/${id}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
        });
        console.log("response", response);
        return response.data;
    } catch (error) {
        console.error(`Error deleting game with id ${id}:`, error);
        throw error;
    }
}
}

export default new GuessMovieService();