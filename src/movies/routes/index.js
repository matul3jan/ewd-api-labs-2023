import express from 'express';
import MoviesController from '../controllers';
import AccountsController from '../../accounts/controllers';

const createMoviesRouter = (dependencies) => {
    const router = express.Router();
    const moviesController = MoviesController();
    const accountsController = AccountsController(dependencies);

    router.route('/*').all(accountsController.verify); // require token for all routes

    router.route('/upcoming').get(moviesController.getUpcomingMovies);

    router.route('/:id').get(moviesController.getMovie);
    router.route('/:id/images').get(moviesController.getImages);
    router.route('/:id/reviews').get(moviesController.getReviews);
    router.route('/:id/recommendations').get(moviesController.getRecommendations);
    router.route('/:id/similar').get(moviesController.getSimilar);
    router.route('/:id/credits').get(moviesController.getCredits);

    // This must always be last
    router.route('/').get(moviesController.find);

    return router;
};

export default createMoviesRouter;
