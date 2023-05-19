import AccountsRepositoryInMemory from "../accounts/repositories/InMemoryRepository.js";
import AccountsRepositoryMongo from "../accounts/repositories/MongoAccountRepository.js";
import GenresRepositoryInMemory from "../genres/repositories/InMemoryRepository.js";
import GenresRepositoryMongo from "../genres/repositories/MongoGenreRepository.js";
import AccountSchema from '../accounts/validators/index.js';
import Authenticator from '../accounts/security/BCryptAuthenticator.js';
import TokenManager from './../accounts/security/JWTToken.js';

const buildDependencies = () => {

    const dependencies = {
        accountSchema: AccountSchema,
        authenticator: new Authenticator(),
        tokenManager: new TokenManager()
    };

    if (process.env.DATABASE_DIALECT === "in-memory") {
        dependencies.accountsRepository = new AccountsRepositoryInMemory();
        dependencies.genresRepository = new GenresRepositoryInMemory();
    } else if (process.env.DATABASE_DIALECT === "mongo") {
        dependencies.accountsRepository = new AccountsRepositoryMongo();
        dependencies.genresRepository = new GenresRepositoryMongo();
    } else if (process.env.DATABASE_DIALECT === "mysql") {
        throw new Error('Add MySQL support');
    } else {
        throw new Error('Add DB Support to project');
    }

    return dependencies;
};

export default buildDependencies;
