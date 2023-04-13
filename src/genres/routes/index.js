import express from 'express';
import GenresController from '../controllers';

const createRouter = (dependencies) => {
    const router = express.Router();
    const genresController = GenresController(dependencies);

    router.route('/').get(genresController.listGenres);

    return router;
};

export default createRouter;