import moviesService from "./../services";

export default () => {

    const getMovie = async (request, response) => {
        const movieId = request.params.id;
        const movie = await moviesService.getMovie(movieId);
        response.status(200).json(movie);
    };

    const find = async (request, response) => {
        const { page } = request.query;
        const movies = await moviesService.find(page);
        response.status(200).json(movies);
    };

    const getUpcomingMovies = async (request, response) => {
        const { page } = request.query;
        const movies = await moviesService.findUpcoming(page);
        response.status(200).json(movies);
    };

    const getImages = async (request, response) => {
        const movieId = request.params.id;
        const images = await moviesService.getImages(movieId);
        response.status(200).json(images);
    };

    const getReviews = async (request, response) => {
        const movieId = request.params.id;
        const images = await moviesService.getReviews(movieId);
        response.status(200).json(images);
    };

    const getRecommendations = async (request, response) => {
        const movieId = request.params.id;
        const images = await moviesService.getRecommendations(movieId);
        response.status(200).json(images);
    };

    const getSimilar = async (request, response) => {
        const movieId = request.params.id;
        const images = await moviesService.getSimilar(movieId);
        response.status(200).json(images);
    };

    const getCredits = async (request, response) => {
        const movieId = request.params.id;
        const images = await moviesService.getCredits(movieId);
        response.status(200).json(images);
    };

    return {
        getMovie,
        find,
        getUpcomingMovies,
        getImages,
        getReviews,
        getRecommendations,
        getSimilar,
        getCredits
    };
};
