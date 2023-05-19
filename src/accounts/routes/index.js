import express from 'express';
import AccountsController from '../controllers/index.js';
import ValidationController from '../controllers/ValidationController.js';

const createRouter = (dependencies) => {
    const router = express.Router();
    const accountsController = AccountsController(dependencies);
    const validationController = ValidationController(dependencies);

    router.route('/').get(accountsController.listAccounts);
    router.route('/').post(validationController.validateAccount, accountsController.createAccount);
    router.route('/:id').get(accountsController.getAccount);
    router.route('/:id').put(accountsController.updateAccount);
    router.route('/:id/favourites').get(accountsController.getFavourites);
    router.route('/:id/favourites').post(accountsController.addFavourite);
    router.route('/:id/favourites').delete(accountsController.removeFavourite);
    router.route('/security/token').post(accountsController.authenticateAccount);

    return router;
};

export default createRouter;