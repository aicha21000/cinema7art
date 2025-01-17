import React from "react";
import moviesData from '../data/movies.json';
import axios from 'axios';


class MovieService {
    constructor() {
        this.movies = [];
        this.initialized = false;
        this.localURL = '/movies.json'; // Chemin relatif à partir du dossier public
        this.baseURL = `${process.env.NEXT_PUBLIC_API_URL}/movies`; // Assurez-vous que l'URL est correcte
    }

    async initialize() {
        if (this.initialized) return;

        try {
            const response = await fetch(this.localURL);
            if (!response.ok) throw new Error('Erreur lors du chargement des films');
            this.movies = await response.json();
            this.initialized = true;
        } catch (error) {
            this.movies = [];
            this.initialized = true;
        }
    }

    async getMovies(page = 1, genre = '') {
        await this.initialize();

        let filteredMovies = moviesData;
        if (genre) {
            filteredMovies = filteredMovies.filter(movie => movie.genre.includes(genre));
        }

        const pageSize = 20;
        const start = (page - 1) * pageSize;
        const end = start + pageSize;

        return {
            movies: filteredMovies.slice(start, end),
            pagination: {
                page,
                totalPages: Math.ceil(filteredMovies.length / pageSize),
                total: filteredMovies.length
            }
        };
    }

    async getMovie(englishTitle) {
        await this.initialize();
        return moviesData.find(movie => movie.englishTitle.toLowerCase() === englishTitle.toLowerCase());
    }

    async getMovieById(id) {
        await this.initialize();
        return moviesData.find(movie => movie._id === id);

        
        
    }

    async getRelatedMovies(englishTitle, limit = 4) {
        await this.initialize();
        const movie = await this.getMovie(englishTitle);
        if (!movie) return [];

        return moviesData.filter(m => 
            m.englishTitle !== englishTitle && 
            m.genre.some(g => movie.genre.includes(g))
        ).slice(0, limit);
    }


    async searchMovies(query) {
        try {
            // Filtrer les acteurs en fonction du terme de recherche
            const filteredMovies = moviesData.filter(movie =>
                movie.englishTitle.toLowerCase().includes(query.toLowerCase())
            );
            console.log('Filtered movies:', filteredMovies);
            return filteredMovies;
        } catch (error) {
            console.error('Error searching actors:', error);
            throw error;
        }
    }


    async getGenres() {
        await this.initialize();
        const genres = new Set();
        moviesData.forEach(movie => {
            movie.genre.forEach(g => genres.add(g));
        });
        return Array.from(genres).sort();
    }

    async getTopMovies(limit = 10) {
        await this.initialize();
        return moviesData
            .sort((a, b) => b.rating - a.rating)
            .slice(0, limit);
    }



    async getNewReleases() {
        await this.initialize();
        return moviesData.filter(movie => movie.isNewRelease);
    }

    async get2024Movies() {
        await this.initialize();
        return moviesData.filter(movie => movie.releaseYear === 2024);
    }

    async get2025Movies() {
        await this.initialize();
        return moviesData.filter(movie => movie.releaseYear === 2025);
    }

    async searchGlobal(query) {
        try {
            const response = await moviesData.filter(movie =>
                movie.englishTitle.toLowerCase().includes(query.toLowerCase()) ||
                movie.arabicTitle.toLowerCase().includes(query.toLowerCase())
            );
            return response; // Assurez-vous que cela renvoie un tableau de films
        } catch (error) {
            console.error('Error searching movies:', error);
            throw error;
        }
    }

}

export default new MovieService(); 