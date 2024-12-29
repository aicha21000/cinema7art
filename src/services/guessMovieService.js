import axios from 'axios';

const TMDB_ACCESS_TOKEN = import.meta.env.VITE_TMDB_ACCESS_TOKEN;
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE = 'https://image.tmdb.org/t/p/original';

const headers = {
    'Authorization': `Bearer ${TMDB_ACCESS_TOKEN}`,
    'Content-Type': 'application/json'
};

const movieScenes = {
    "The Dark Knight": {
        scenes: [
            "/movie-scenes/dark-knight/bank-scene.jpg",
            "/movie-scenes/dark-knight/joker-scene.jpg"
        ],
        hints: [
            "فيلم من سنة 2008",
            "من إخراج Christopher Nolan",
            "Action, Crime, Drama",
            "Christian Bale"
        ]
    },
    "Inception": {
        scenes: [
            "/movie-scenes/inception/city-fold.jpg",
            "/movie-scenes/inception/hallway.jpg"
        ],
        hints: [
            "فيلم من سنة 2010",
            "من إخراج Christopher Nolan",
            "Action, Sci-Fi",
            "Leonardo DiCaprio"
        ]
    },
    // Ajoutez d'autres films...
};

const guessMovieService = {
    getMovieScenes: async () => {
        try {
            // Charger les films depuis votre JSON local
            const response = await fetch('/output/movies.json');
            const allMovies = await response.json();
            
            // Filtrer les films qui ont des scènes dans notre base
            const availableMovies = allMovies
                .filter(movie => movieScenes[movie.englishTitle])
                .map(movie => ({
                    title: movie.englishTitle,
                    scenes: movieScenes[movie.englishTitle].scenes,
                    hints: movieScenes[movie.englishTitle].hints
                }))
                .sort(() => Math.random() - 0.5)
                .slice(0, 5);

            return availableMovies;
        } catch (error) {
            console.error('Error fetching movie scenes:', error);
            return [];
        }
    }
};

export default guessMovieService; 