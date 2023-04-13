import moviesService from "./../services";

export default (dependencies) => {

    const getMovie = async (request, response) => {
        const movieId = request.params.id;
        const movie = await moviesService.getMovie(movieId, dependencies);
        response.status(200).json(movie);
    };

    const find = async (request, response) => {
        const query = request.query;
        const movies = await moviesService.find(query, dependencies);
        response.status(200).json(movies);
    };

    const getUpcomingMovies = async (request, response) => {
        const movies = await moviesService.findUpcoming(dependencies);
        response.status(200).json(movies);
    };

    return {
        getMovie,
        find,
        getUpcomingMovies,
    };
};
