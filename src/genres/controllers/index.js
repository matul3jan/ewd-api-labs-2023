import genreService from "../services";

export default (dependencies) => {
    const listGenres = async (request, response) => {
        const genres = await genreService.find(dependencies);
        response.status(200).json(genres);
    };

    return {
        listGenres,
    };
};
