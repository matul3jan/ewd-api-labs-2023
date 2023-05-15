import accountService from "../services";

export default (dependencies) => {
    const createAccount = async (request, response) => {
        const { firstName, lastName, email, password } = request.body;
        const account = await accountService.registerAccount(firstName, lastName, email, password, dependencies);
        if (account instanceof Error) {
            response.status(500).json({ error: account.message });
        } else {
            response.status(201).json(account);
        }
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
            const id = request.params.id;
            const { firstName, lastName, email, password } = request.body;
            const account = await accountService.updateAccount(id, firstName, lastName, email, password, dependencies);
            response.status(200).json(account);
        } catch (error) {
            response.status(400);
        }
    };

    const authenticateAccount = async (request, response) => {
        try {
            const { email, password } = request.body;
            const { token, account } = await accountService.authenticate(email, password, dependencies);
            delete account.password;
            response.status(200).json({ token: `BEARER ${token}`, user: account });
        } catch (error) {
            response.status(401).json({ error: 'Unauthorised' });
        }
    };

    const verify = async (request, response, next) => {
        try {
            const authHeader = request.headers.authorization;
            const accessToken = authHeader ? authHeader.split(" ")[1] : null;
            await accountService.verifyToken(accessToken, dependencies);
            next();
        } catch (err) {
            //Token Verification Failed
            response.status(401).json({ error: 'Unauthorised' });
            next(new Error(`Verification Failed ${err.message}`));
        }
    };

    const addFavourite = async (request, response, next) => {
        try {
            const { movieId } = request.body;
            const id = request.params.id;
            const account = await accountService.addFavourite(id, movieId, dependencies);
            response.status(200).json(account);
        } catch (err) {
            next(new Error(`Invalid Data ${err.message}`));
        }
    };

    const getFavourites = async (request, response, next) => {
        try {
            const id = request.params.id;
            const favourites = await accountService.getFavourites(id, dependencies);
            response.status(200).json(favourites);
        } catch (err) {
            next(new Error(`Invalid Data ${err.message}`));
        }
    };

    return {
        createAccount,
        getAccount,
        listAccounts,
        updateAccount,
        authenticateAccount,
        verify,
        addFavourite,
        getFavourites
    };
};
