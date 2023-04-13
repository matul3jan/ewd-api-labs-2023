import Account from '../entities/Account';

export default {
    registerAccount: async (firstName, lastName, email, password, { accountsRepository }) => {
        const account = new Account(undefined, firstName, lastName, email, password);
        return accountsRepository.persist(account);
    },
    getAccount: (accountId, { accountsRepository }) => {
        return accountsRepository.get(accountId);
    },
    find: ({ accountsRepository }) => {
        return accountsRepository.find();
    },
    findByEmail: (email, { accountsRepository }) => {
        return accountsRepository.getByEmail(email);
    },
    updateAccount: async (id, firstName, lastName, email, password, { accountsRepository }) => {
        const account = new Account(id, firstName, lastName, email, password);
        return accountsRepository.merge(account);
    },
    authenticate: async (email, password, { accountsRepository, authenticator }) => {
        const account = await accountsRepository.getByEmail(email);
        const result = await authenticator.compare(password, account.password);
        if (!result) throw new Error('Bad credentials');
        const token = JSON.stringify({ email: account.email }); // TODO: make it better
        return token;
    }
};
