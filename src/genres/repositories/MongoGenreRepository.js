import mongoose from 'mongoose';
import Genre from '../../genres/entities/Genre.js';
import GenreRepository from './Repository.js';
import { genres } from '../genresData.js';

export default class extends GenreRepository {

    constructor() {
        super();
        const genresSchema = new mongoose.Schema({
            id: Number,
            name: String,
        });
        this.model = mongoose.model('Genre', genresSchema);
        this.loadGenres();
    }

    async find() {
        const genres = await this.model.find();
        return genres.map((result) => {
            return new Genre(result.id, result.name);
        });
    }

    async loadGenres() {
        try {
            await this.model.deleteMany({});
            await this.model.insertMany(genres);
        } catch (error) {
            console.error('Failed to load genres:', error);
        }
    }
}