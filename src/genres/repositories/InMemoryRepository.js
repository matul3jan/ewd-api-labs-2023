import GenreRepository from './Repository';

export default class extends GenreRepository {
    constructor() {
        super();
        this.index = 1;
        this.data = {};
    }
    find() {
        return Promise.resolve(this.dataAsArray());
    }
    dataAsArray() {
        return Object.keys(this.data).map(key => this.data[key]);
    }
}