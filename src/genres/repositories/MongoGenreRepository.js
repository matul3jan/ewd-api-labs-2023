import mongoose from 'mongoose';
import Genre from '../../genres/entities/Genre';
import GenreRepository from './Repository';
import { genres } from '../genresData';

export default class extends GenreRepository {

    constructor() {
        super();
        const genresSchema = new mongoose.Schema({
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

    loadGenres() {
        this.model.insertMany(genres);
    }
}