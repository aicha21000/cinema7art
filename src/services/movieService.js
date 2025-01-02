const API_BASE_URL = `${import.meta.env.VITE_FRONT_URL}`;

class MovieService {
    constructor() {
        this.movies = [];
        this.newReleases = [];
        this.initialized = false;
        this.dataPath = `${API_BASE_URL}/output`;
        console.log(this.dataPath);
        this.cache = {
            newReleases: new Map(),
            genres: null,
            lastUpdate: null,
            metrics: {
                loadTime: 0,
                filterTime: 0,
                cacheHits: 0,
                cacheMisses: 0
            }
        };
        this.CACHE_DURATION = 5 * 60 * 1000;
        
        // Préchargement intelligent
        this.preloadTimeout = null;
        this.PRELOAD_DELAY = 2000; // 2 secondes
    }

    isCacheValid() {
        return this.cache.lastUpdate && 
               (Date.now() - this.cache.lastUpdate) < this.CACHE_DURATION;
    }

    getCacheKey(options) {
        return JSON.stringify(options);
    }

    async preloadData() {
        if (this.preloadTimeout) clearTimeout(this.preloadTimeout);
        
        this.preloadTimeout = setTimeout(async () => {
            console.log('Preloading data...');
            const startTime = performance.now();
            
            try {
                // Précharger les données courantes
                await this.initialize();
                
                // Précharger les données futures
                const futureOptions = {
                    includeUpcoming: true,
                    daysRange: 90
                };
                await this.getNewReleases(futureOptions);
                
                const endTime = performance.now();
                console.log(`Preload completed in ${endTime - startTime}ms`);
            } catch (error) {
                console.error('Preload failed:', error);
            }
        }, this.PRELOAD_DELAY);
    }

    async initialize() {
        if (this.initialized) return;

        try {
            // Charger les films réguliers
            const moviesResponse = await fetch(`${this.dataPath}/movies.json`);
            if (!moviesResponse.ok) throw new Error('Erreur lors du chargement des films');
            this.movies = await moviesResponse.json();

            // Charger les nouveaux films
            const newReleasesResponse = await fetch(`${this.dataPath}/new_releases.json`);
            if (newReleasesResponse.ok) {
                this.newReleases = await newReleasesResponse.json();
            }

            this.initialized = true;
        } catch (error) {
            console.error('Error loading movies:', error);
            this.movies = [];
            this.newReleases = [];
            this.initialized = true;
        }
    }

    async getMovies(page = 1, genre = '') {
        await this.initialize();
        
        let filteredMovies = this.movies;
        if (genre) {
            filteredMovies = filteredMovies.filter(movie => 
                movie.genre.includes(genre)
            );
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
        return this.movies.find(movie => 
            movie.englishTitle === englishTitle || 
            movie.englishTitle.toLowerCase() === englishTitle.toLowerCase()
        );
    }

    async getNewReleases(options = {}) {
        const startTime = performance.now();
        await this.initialize();
        
        const cacheKey = this.getCacheKey(options);
        if (this.cache.newReleases.has(cacheKey) && this.isCacheValid()) {
            this.cache.metrics.cacheHits++;
            return this.cache.newReleases.get(cacheKey);
        }

        this.cache.metrics.cacheMisses++;

        const {
            sortBy = 'releaseDate',
            sortOrder = 'desc',
            includeUpcoming = false,
            daysRange = 30
        } = options;

        const today = new Date();
        const rangeDate = new Date(today);
        rangeDate.setDate(today.getDate() - daysRange);
        const futureDate = includeUpcoming ? 
            new Date(today.setDate(today.getDate() + 30)) : today;

        // Utiliser les données optimisées
        let filteredMovies = this.movies.filter(movie => {
            const releaseDate = movie.parsedReleaseDate;
            return releaseDate && 
                   !isNaN(releaseDate.getTime()) && 
                   releaseDate >= rangeDate && 
                   releaseDate <= futureDate;
        });

        // Tri optimisé avec données pré-calculées
        filteredMovies.sort((a, b) => {
            const aValue = sortBy === 'releaseDate' ? a.parsedReleaseDate : a.rating;
            const bValue = sortBy === 'releaseDate' ? b.parsedReleaseDate : b.rating;
            return sortOrder === 'desc' ? bValue - aValue : aValue - bValue;
        });

        this.cache.newReleases.set(cacheKey, filteredMovies);
        
        const endTime = performance.now();
        this.cache.metrics.filterTime = endTime - startTime;

        console.log('Performance metrics:', {
            filterTime: this.cache.metrics.filterTime,
            resultCount: filteredMovies.length,
            cacheHits: this.cache.metrics.cacheHits,
            cacheMisses: this.cache.metrics.cacheMisses
        });

        return filteredMovies;
    }

    async getUpcomingReleases() {
        await this.initialize();
        const today = new Date();
        const thirtyDaysFromNow = new Date();
        thirtyDaysFromNow.setDate(today.getDate() + 30);
        
        return this.movies
            .filter(movie => {
                const releaseDate = new Date(movie.releaseDate);
                return releaseDate > today && releaseDate <= thirtyDaysFromNow;
            })
            .sort((a, b) => new Date(a.releaseDate) - new Date(b.releaseDate));
    }

    async getRelatedMovies(englishTitle, limit = 4) {
        await this.initialize();
        const movie = await this.getMovie(englishTitle);
        if (!movie) return [];

        return this.movies
            .filter(m => 
                m.englishTitle !== englishTitle && 
                m.genre.some(g => movie.genre.includes(g))
            )
            .slice(0, limit);
    }

    async searchMovies(query) {
        await this.initialize();
        const searchTerm = query.toLowerCase();
        return this.movies.filter(movie =>
            movie.englishTitle.toLowerCase().includes(searchTerm) ||
            movie.arabicTitle.includes(searchTerm)
        );
    }

    async getGenres() {
        await this.initialize();
        // Extraire tous les genres uniques
        const genres = new Set();
        this.movies.forEach(movie => {
            movie.genre.forEach(g => genres.add(g));
        });
        return Array.from(genres).sort();
    }

    async getFavorites() {
        const favoritesStr = localStorage.getItem('favorites') || '[]';
        const favoriteIds = JSON.parse(favoritesStr);
        await this.initialize();
        return this.movies.filter(movie => favoriteIds.includes(movie._id));
    }

    toggleFavorite(movieId) {
        const favoritesStr = localStorage.getItem('favorites') || '[]';
        const favorites = JSON.parse(favoritesStr);
        const index = favorites.indexOf(movieId);
        
        if (index === -1) {
            favorites.push(movieId);
        } else {
            favorites.splice(index, 1);
        }
        
        localStorage.setItem('favorites', JSON.stringify(favorites));
        return favorites.includes(movieId);
    }

    isFavorite(movieId) {
        const favoritesStr = localStorage.getItem('favorites') || '[]';
        const favorites = JSON.parse(favoritesStr);
        return favorites.includes(movieId);
    }

    clearCache() {
        this.cache.newReleases.clear();
        this.cache.genres = null;
        this.cache.lastUpdate = null;
        this.initialized = false;
    }

    getMetrics() {
        return {
            ...this.cache.metrics,
            cacheSize: this.cache.newReleases.size,
            moviesCount: this.movies.length,
            initialized: this.initialized,
            cacheValid: this.isCacheValid()
        };
    }

    async getNewReleases() {
        await this.initialize();
        
        // Trier par date de sortie
        return this.newReleases.sort((a, b) => {
            const dateA = new Date(a.releaseDate);
            const dateB = new Date(b.releaseDate);
            return dateA - dateB;
        });
    }

    async getMoviesByYear(year) {
        await this.initialize();
        return this.newReleases.filter(movie => movie.releaseYear === year);
    }

    async get2024Movies() {
        return this.getMoviesByYear(2024);
    }

    async get2025Movies() {
        return this.getMoviesByYear(2025);
    }

    async getFeaturedMovies() {
        await this.initialize();
        // Sélectionner les 5 films les plus récents avec une bonne note
        return this.movies
            .sort((a, b) => b.rating - a.rating)
            .slice(0, 5);
    }

    async getTopMovies(limit = 10) {
        await this.initialize();
        // Retourner les films les mieux notés
        return this.movies
            .sort((a, b) => b.rating - a.rating)
            .slice(0, limit);
    }
}

export default new MovieService(); 