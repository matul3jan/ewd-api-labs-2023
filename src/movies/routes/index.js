import express from 'express';
import MoviesController from '../controllers';

const createMoviesRouter = (dependencies) => {
    const router = express.Router();
    const moviesController = MoviesController(dependencies);

    router.route('/').get(moviesController.find);
    router.route('/:id').get(moviesController.getMovie);
    router.route('/upcoming').get(moviesController.getUpcomingMovies);

    return router;
};

export default createMoviesRouter;
