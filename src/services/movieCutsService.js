import axios from 'axios';

const TMDB_ACCESS_TOKEN = import.meta.env.VITE_TMDB_ACCESS_TOKEN;
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE = 'https://image.tmdb.org/t/p/original';

const headers = {
    'Authorization': `Bearer ${TMDB_ACCESS_TOKEN}`,
    'Content-Type': 'application/json'
};

const movieCutsService = {
    getMovieCuts: async () => {
        try {
            // Charger les films depuis votre JSON local
            const response = await fetch('/output/movies.json');
            const allMovies = await response.json();
            
            // Sélectionner 5 films aléatoires
            const selectedMovies = allMovies
                .sort(() => Math.random() - 0.5)
                .slice(0, 5);

            // Pour chaque film, récupérer ses images depuis TMDB
            const moviesWithCuts = await Promise.all(
                selectedMovies.map(async (movie) => {
                    // Rechercher le film sur TMDB pour obtenir son ID
                    const searchResponse = await axios.get(
                        `${BASE_URL}/search/movie?query=${encodeURIComponent(movie.englishTitle)}`,
                        { headers }
                    );

                    const tmdbMovie = searchResponse.data.results[0];
                    if (!tmdbMovie) {
                        throw new Error(`Movie not found: ${movie.englishTitle}`);
                    }

                    // Récupérer les images du film
                    const { data: { backdrops } } = await axios.get(
                        `${BASE_URL}/movie/${tmdbMovie.id}/images`,
                        { headers }
                    );

                    // Prendre les 2 premières images de type backdrop
                    const cuts = backdrops
                        .slice(0, 2)
                        .map(backdrop => `${IMAGE_BASE}${backdrop.file_path}`);

                    return {
                        title: movie.englishTitle,
                        cuts: cuts,
                        hint: movie.description,
                        year: movie.releaseYear
                    };
                })
            );

            return moviesWithCuts;
        } catch (error) {
            console.error('Error fetching movie cuts:', error);
            return [];
        }
    }
};

export default movieCutsService; 