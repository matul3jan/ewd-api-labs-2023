import axios from 'axios';

const FIND_URL = (page) => `https://api.themoviedb.org/3/person/popular?api_key=${process.env.TMDB_KEY}&language=en-US&page=${page}`;
const GET_URL = (artistId) => `https://api.themoviedb.org/3/person/${artistId}?api_key=${process.env.TMDB_KEY}`;

export default {
    find: async (page) => {
        const response = await axios.get(FIND_URL(page));
        return response.data;
    },
    getArtist: async (artistId) => {
        const response = await axios.get(GET_URL(artistId));
        return response.data;
    }
};