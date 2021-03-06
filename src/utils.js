import APIKEY from './apikey.json'

const BASE_SEARCH_URL = "https://api.themoviedb.org/3/search/movie"
const BASE_MOVIE_URL = "https://api.themoviedb.org/3/movie"
const BASE_URL_TRENDING = 'https://api.themoviedb.org/3/trending'


export const searchMovies = async (query, pageNum) => {
    const movies = fetch(`${BASE_SEARCH_URL}?query=${query}&api_key=${APIKEY.key}&page=${pageNum}`)
        .then(res => res.json())
        .catch(err => console.log(err))

    return await movies
}


export const getMovie = async (movieId) => {
    const movies = fetch(`${BASE_MOVIE_URL}/${movieId}?api_key=${APIKEY.key}`)
        .then(res => res.json())
        .catch(err => console.log(err))

    return await movies
}

export const getReviews = async (movieId) => {
    const movies = fetch(`${BASE_MOVIE_URL}/${movieId}/reviews?api_key=${APIKEY.key}`)
        .then(res => res.json())
        .catch(err => console.log(err))

    return await movies
}

export const getSimilarMovies = async (movieId) => {
    const movies = fetch(`${BASE_MOVIE_URL}/${movieId}/similar?api_key=${APIKEY.key}`)
        .then(res => res.json())
        .catch(err => console.log(err))

    return await movies
}

export const getNowPlayingMovies = async (pageNum) => {
    const movies = fetch(`${BASE_MOVIE_URL}/now_playing?api_key=${APIKEY.key}&page=${pageNum}`)
        .then(res => res.json())
        .catch(err => console.log(err))

    return await movies
}

export const getTopRatedMovies = async (pageNum) => {
    const movies = fetch(`${BASE_MOVIE_URL}/top_rated?api_key=${APIKEY.key}&page=${pageNum}`)
        .then(res => res.json())
        .catch(err => console.log(err))

    return await movies
}

export const getUpcomingMovies = async (pageNum) => {
    const movies = fetch(`${BASE_MOVIE_URL}/upcoming?api_key=${APIKEY.key}&page=${pageNum}`)
        .then(res => res.json())
        .catch(err => console.log(err))

    return await movies
}

export const getRecommendedMovies = async (movieId) => {
    const movies = fetch(`${BASE_MOVIE_URL}/${movieId}/recommendations?api_key=${APIKEY.key}`)
        .then(res => res.json())
        .catch(err => console.log(err))

    return await movies
}

export const getPopularMovies = async (pageNum) => {
    const movies = fetch(`${BASE_MOVIE_URL}/popular?api_key=${APIKEY.key}&page=${pageNum}`)
        .then(res => res.json())
        .catch(err => console.log(err))

    return await movies
}

export const getTrendingMovies = async (pageNum) => {
    const movies = fetch(`${BASE_URL_TRENDING}/movie/week?api_key=${APIKEY.key}&page=${pageNum}`)
        .then(res => res.json())
        .catch(err => console.log(err))

    return await movies
}


export const saveState = (state) => {
    try {
        const stringifiedState = JSON.stringify(state)
        localStorage.setItem("moviesState", stringifiedState)
    } catch (err) {
        return undefined
    }
}

export const loadState = () => {
    try {
        const state = localStorage.getItem("moviesState")
        if (state === null) {
            return {}
        }
        return JSON.parse(state)
    } catch (err) {
        return undefined
    }
}
