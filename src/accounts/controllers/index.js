import accountService from "../services";

export default (dependencies) => {
    const createAccount = async (request, response) => {
        const { firstName, lastName, email, password } = request.body;
        const account = await accountService.registerAccount(firstName, lastName, email, password, dependencies);
        response.status(201).json(account);
    };

    const getAccount = async (request, response) => {
        const accountId = request.params.id;
        const account = await accountService.getAccount(accountId, dependencies);
        response.status(200).json(account);
    };

    const listAccounts = async (request, response) => {
        const accounts = await accountService.find(dependencies);
        response.status(200).json(accounts);
    };

    const updateAccount = async (request, response) => {
        try {
            const id = +request.params.id;
            const { firstName, lastName, email, password } = request.body;
            const account = await accountService.updateAccount(id, firstName, lastName, email, password, dependencies);
            response.status(200).json(account);
        } catch (error) {
            response.status(400);
        }
    };

    return {
        createAccount,
        getAccount,
        listAccounts,
        updateAccount,
    };
};
