import axios from 'axios';

const GET_URL = (id) => `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.TMDB_KEY}`;
const FIND_URL = (page) => `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TMDB_KEY}&language=en-US&include_adult=false&include_video=false&page=${page}`;
const GET_UPCOMING_URL = (page) => `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.TMDB_KEY}&language=en-US&include_adult=false&include_video=false&page=${page}`;
const GET_IMAGES = (id) => `https://api.themoviedb.org/3/movie/${id}/images?api_key=${process.env.TMDB_KEY}`;
const GET_REVIEWS = (id) => `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${process.env.TMDB_KEY}`;
const GET_RECOMMENDATIONS = (id) => `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${process.env.TMDB_KEY}`;
const GET_SIMILAR = (id) => `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${process.env.TMDB_KEY}`;
const GET_CREDITS = (id) => `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.TMDB_KEY}`;

export default {
    getMovie: async (movieId) => {
        const response = await axios.get(GET_URL(movieId));
        return response.data;
    },
    find: async (page) => {
        const response = await axios.get(FIND_URL(page));
        return response.data;
    },
    findUpcoming: async (page) => {
        const response = await axios.get(GET_UPCOMING_URL(page));
        return response.data;
    },
    getImages: async (movieId) => {
        const response = await axios.get(GET_IMAGES(movieId));
        return response.data;
    },
    getReviews: async (movieId) => {
        const response = await axios.get(GET_REVIEWS(movieId));
        return response.data;
    },
    getRecommendations: async (movieId) => {
        const response = await axios.get(GET_RECOMMENDATIONS(movieId));
        return response.data;
    },
    getSimilar: async (movieId) => {
        const response = await axios.get(GET_SIMILAR(movieId));
        return response.data;
    },
    getCredits: async (movieId) => {
        const response = await axios.get(GET_CREDITS(movieId));
        return response.data;
    }
};
