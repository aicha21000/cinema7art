class ActorService {
    constructor() {
        this.actors = [];
        this.initialized = false;
        this.dataPath = '/output';
    }

    async initialize() {
        if (this.initialized) return;

        try {
            const response = await fetch(`${this.dataPath}/actors.json`);
            if (!response.ok) {
                throw new Error('Erreur lors du chargement des acteurs');
            }
            this.actors = await response.json();
            this.initialized = true;
        } catch (error) {
            console.error('Error loading actors:', error);
            this.actors = [];
            this.initialized = true;
        }
    }

    async getActors(page = 1, searchTerm = '') {
        await this.initialize();
        
        let filteredActors = this.actors;
        if (searchTerm) {
            const term = searchTerm.toLowerCase();
            filteredActors = filteredActors.filter(actor =>
                actor.name.toLowerCase().includes(term) ||
                actor.arabicName.includes(term)
            );
        }

        const pageSize = 20;
        const start = (page - 1) * pageSize;
        const end = start + pageSize;

        return {
            actors: filteredActors.slice(start, end),
            pagination: {
                page,
                totalPages: Math.ceil(filteredActors.length / pageSize),
                total: filteredActors.length
            }
        };
    }

    async getActor(name) {
        await this.initialize();
        const actor = this.actors.find(actor => 
            actor.name === name || 
            actor.name.toLowerCase() === name.toLowerCase()
        );
        
        if (actor) {
            console.log('Movies before mapping:', actor.movies); // Pour le débogage
            actor.movies = actor.movies.map(movie => {
                console.log('Processing movie:', movie); // Pour le débogage
                return {
                    ...movie,
                    englishTitle: movie.englishTitle || '',
                    arabicTitle: movie.arabicTitle || '',
                    poster: movie.poster || '',
                    role: movie.role || ''
                };
            });
            console.log('Movies after mapping:', actor.movies); // Pour le débogage
        }
        
        return actor;
    }

    async getPopularActors(limit = 10) {
        await this.initialize();
        return this.actors
            .sort((a, b) => b.movies.length - a.movies.length)
            .slice(0, limit);
    }

    async getAwardWinningActors() {
        await this.initialize();
        return this.actors
            .filter(actor => actor.awards && actor.awards.length > 0)
            .sort((a, b) => b.awards.length - a.awards.length);
    }

    async searchActors(query) {
        await this.initialize();
        const searchTerm = query.toLowerCase();
        return this.actors.filter(actor =>
            actor.name.toLowerCase().includes(searchTerm) ||
            actor.arabicName.includes(searchTerm)
        );
    }
}

export default new ActorService(); 