import axios from 'axios';
import actorsData from '../data/actors.json';

const API_BASE_URL = `${process.env.NEXT_PUBLIC_FRONT_URL}`;
class ActorService {
    constructor() {
        this.actors = [];
        this.initialized = false;
        this.dataPath = `${API_BASE_URL}`;
        this.localURL = "../../output";
    }

   async initialize() {
       if (this.initialized) return;

       try {
           const response = await fetch(`${this.localURL}/actors.json`);
           if (!response.ok) {
               throw new Error('Erreur lors du chargement des acteurs');
           }
           this.actors = await response.json();
           this.initialized = true;
       } catch (error) {
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
                actor.arabicName.includes(term) ||
                actor.id.includes(term)
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
    //get actor by name
    async getActor(name) {
        await this.initialize();

        const filteredActors = actorsData.filter(actor =>
        actor.name.toLowerCase().includes(name.toLowerCase())
            );
        const actor = filteredActors[0]
        

        if (actor) {
            actor.movies = actor.movies.map(movie => {
                return {
                    ...movie,
                    englishTitle: movie.englishTitle || '',
                    arabicTitle: movie.arabicTitle || '',
                    poster: movie.poster || '',
                    role: movie.role || '',

                };
            });
        }

        return actor;
    }




    //get actor by id

    async getActorById(id) {
        await this.initialize();
        const actor = this.actors.find(actor => 
            actor.id === id
        );
        if (actor) {
            actor.id = id;
        }
        return actor;
    } catch(error) {
        console.error('Error getting actor by id:', error);
        throw error;
    }

    async updateActor(id, actor) {
        await this.initialize();
        const index = this.actors.findIndex(actor => actor.id === id);
        if (index !== -1) {
            this.actors[index] = actor;
        }
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
        try {
            // Filtrer les acteurs en fonction du terme de recherche
            const filteredActors = actorsData.filter(actor =>
                actor.name.toLowerCase().includes(query.toLowerCase())
            );
            console.log('Filtered actors:', filteredActors);
            return filteredActors;
        } catch (error) {
            console.error('Error searching actors:', error);
            throw error;
        }
    }
}

export default new ActorService(); 