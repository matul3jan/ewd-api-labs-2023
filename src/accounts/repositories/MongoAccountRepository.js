import mongoose from 'mongoose';
import Account from '../../accounts/entities/Account.js';
import AccountRepository from './Repository.js';

export default class extends AccountRepository {

    constructor() {
        super();
        const accountsSchema = new mongoose.Schema({
            firstName: String,
            lastName: String,
            email: { type: String, unique: true, index: true },
            password: String,
            favourites: [Number]
        });
        this.model = mongoose.model('Account', accountsSchema);
    }

    async persist(accountEntity) {
        const { firstName, lastName, email, password } = accountEntity;
        const result = new this.model({ firstName, lastName, email, password });
        try {
            await result.save();
            accountEntity.id = result.id;
            return accountEntity;
        } catch (error) {
            return error;
        }
    }

    async merge(accountEntity) {
        const { id, firstName, lastName, email, password, favourites } = accountEntity;
        await this.model.findByIdAndUpdate(id, { firstName, lastName, email, password, favourites });
        return accountEntity;
    }

    async remove(userId) {
        return this.model.findOneAndDelete(userId);
    }

    async get(userId) {
        const result = await this.model.findById(userId);
        const { id, firstName, lastName, email, password, favourites } = result;
        return new Account(id, firstName, lastName, email, password, favourites);
    }

    async getByEmail(userEmail) {
        const result = await this.model.findOne({ email: userEmail.toLowerCase() });
        return new Account(result.id, result.firstName, result.lastName, result.email, result.password, result.favourites);
    }

    async find() {
        const accounts = await this.model.find();
        return accounts.map((result) => {
            return new Account(result.id, result.firstName, result.lastName, result.email, result.password, result.favourites);
        });
    }
}