import express from 'express';
import LanguagesController from '../controllers';
import AccountsController from '../../accounts/controllers';

const createRouter = (dependencies) => {
    const router = express.Router();
    const accountsController = AccountsController(dependencies);
    const languagesController = LanguagesController();

    router.route('/*').all(accountsController.verify); // require token for all routes

    router.route('/').get(languagesController.listLanguages);

    return router;
};

export default createRouter;