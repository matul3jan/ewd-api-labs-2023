import express from 'express';
import AccountsController from '../controllers';

const createRouter = (dependencies) => {
    const router = express.Router();
    const accountsController = AccountsController(dependencies);

    router.route('/').get(accountsController.listAccounts);
    router.route('/').post(accountsController.createAccount);
    router.route('/:id').get(accountsController.getAccount);
    router.route('/:id').put(accountsController.updateAccount);

    return router;
};

export default createRouter;