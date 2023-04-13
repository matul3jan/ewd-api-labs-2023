import axios from 'axios';

const GET_URL = (id) => `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.TMDB_KEY}`;
const FIND_URL = (q) => `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TMDB_KEY}&language=en-US&include_adult=false&include_video=false&${q}`;
const GET_UPCOMING_URL = `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.TMDB_KEY}&language=en-US&include_adult=false&include_video=false`;

export default {
    getMovie: async (movieId) => {
        const response = await axios.get(GET_URL(movieId));
        return response.data;
    },
    find: async (query) => {
        const response = await axios.get(FIND_URL(query));
        return response.data;
    },
    findUpcoming: async () => {
        const response = await axios.get(GET_UPCOMING_URL);
        return response.data;
    }
};
