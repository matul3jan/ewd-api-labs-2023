import artistsService from "../services";

export default () => {
    const listArtists = async (request, response) => {
        const { page } = request.query;
        const artists = await artistsService.find(page);
        response.status(200).json(artists);
    };

    const getArtist = async (request, response) => {
        const artistId = request.params.id;
        const artist = await artistsService.getArtist(artistId);
        response.status(200).json(artist);
    };

    return {
        listArtists,
        getArtist
    };
};
