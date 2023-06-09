import express from 'express';
import ArtistsController from '../controllers/index.js';
import AccountsController from '../../accounts/controllers/index.js';

const createRouter = (dependencies) => {
    const router = express.Router();
    const accountsController = AccountsController(dependencies);
    const artistsController = ArtistsController();

    router.route('/*').all(accountsController.verify); // require token for all routes

    router.route('/').get(artistsController.listArtists);
    router.route('/:id').get(artistsController.getArtist);

    return router;
};

export default createRouter;