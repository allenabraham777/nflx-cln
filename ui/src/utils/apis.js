import config from "config";
import axios from "axios";

export const getGenres = () =>
  axios.get(
    `${config.application.tmdb.baseUrl}/genre/movie/list?api_key=${config.application.tmdb.apiKey}`
  );

function sendMovieRequest(paging, page) {
  if (!this.api) return [];
  return axios.get(`${this.api}${paging ? `&page=${page}` : ""}`);
}

export const getTrendingMovies = (type) => {
  const api = `${config.application.tmdb.baseUrl}/trending/${type}/week?api_key=${config.application.tmdb.apiKey}`;
  return sendMovieRequest.bind({ api });
};

export const getMoviesByGenre = (type, genre) => {
  const api = `${config.application.tmdb.baseUrl}/discover/${type}?api_key=${config.application.tmdb.apiKey}&with_genres=${genre}`;
  return sendMovieRequest.bind({ api });
};

export const getCoverImage = (movieId, type) => {
  const api = config.application.tmdb.titleImagesUrl(movieId, type);
  return axios.get(api);
};

export const getVideo = (movieId, type) => {
  const api = config.application.tmdb.videosUrl(movieId, type);
  return axios.get(api);
};

export const addVideoToFavourite = (email, movie) =>
  axios.post(`${config.api.url}/user/movies`, { email, data: movie });

export const getFavourites = (email) =>
  axios.get(`${config.api.url}/user/${email}/movies`);

export const deleteVideoFromFavourites = (email, movieId) =>
  axios.delete(`${config.api.url}/user/${email}/movies/${movieId}`);

export default {
  getGenres,
  getTrendingMovies,
  getMoviesByGenre,
  getCoverImage,
  getVideo,
  addVideoToFavourite,
  getFavourites,
  deleteVideoFromFavourites,
};
