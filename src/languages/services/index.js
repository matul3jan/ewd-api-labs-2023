import axios from 'axios';

const FIND_URL = () => `https://api.themoviedb.org/3/configuration/languages?api_key=${process.env.TMDB_KEY}&language=en-US`;

export default {
    find: async () => {
        const response = await axios.get(FIND_URL());
        return response.data;
    },
};